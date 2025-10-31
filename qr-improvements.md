# QR Code System - Recommended Improvements

## 1. Fix Compact Mode Data Structure (CRITICAL)

### Problem
Compact mode uses abbreviated keys that import function doesn't understand.

### Solution A: Add decoder for compact format
```javascript
function checkForRecipeImport() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#import=')) {
        try {
            const base64Data = hash.substring(8);
            const jsonData = decodeURIComponent(atob(base64Data));
            const rawData = JSON.parse(jsonData);
            
            // Detect and convert compact format
            const recipeData = rawData.n ? convertCompactToFull(rawData) : rawData;
            
            showRecipeImportModal(recipeData);
            history.replaceState(null, '', window.location.pathname);
            
        } catch (error) {
            console.error('[Import] Error parsing recipe data:', error);
            showNotification('Error al importar la receta. Código QR inválido.', 'error');
        }
    } else if (hash.startsWith('#r=')) {
        // Handle ID-based import (requires backend)
        handleRecipeIdImport(hash.substring(3));
    }
}

function convertCompactToFull(compact) {
    return {
        name: compact.n,
        category: compact.c,
        ingredients: compact.i.split(';').map(item => {
            const [name, quantity, unit] = item.split('|');
            return { name, quantity, unit };
        }),
        preparationMethod: compact.p,
        totalTime: compact.t
    };
}
```

### Solution B: Remove compact mode (RECOMMENDED)
Since there's no backend to handle ID-based imports, compact mode adds complexity without benefit.

```javascript
// DELETE generateSmallQR() entirely
// Keep only full mode in prepareRecipeDataForQR()
```

---

## 2. Extract Configuration Constants

```javascript
// At top of RecipeApp class or in separate config
const QR_CONFIG = {
    API_URL: 'https://api.qrserver.com/v1/create-qr-code/',
    TARGET_URL: 'https://guiavfr.enaire.es/',
    DEFAULT_SIZE: 200,
    DEFAULT_ERROR_CORRECTION: 'M',
    DEFAULT_MARGIN: 1,
    MAX_DATA_LENGTH: 2953, // QR Version 40 with L error correction
    COMPACT_THRESHOLD: 1500, // Switch to compact if data exceeds this
    PREP_METHOD_MAX_LENGTH: 500 // Reasonable limit for preparation text
};
```

---

## 3. Add Data Validation

```javascript
/**
 * Validate recipe data structure before import
 * @param {Object} data - Recipe data to validate
 * @returns {Object} Validation result {valid: boolean, errors: string[]}
 */
function validateRecipeData(data) {
    const errors = [];
    
    if (!data || typeof data !== 'object') {
        errors.push('Datos de receta inválidos');
        return { valid: false, errors };
    }
    
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push('Nombre de receta requerido');
    }
    
    if (data.ingredients && !Array.isArray(data.ingredients)) {
        errors.push('Formato de ingredientes inválido');
    }
    
    // Validate each ingredient
    if (Array.isArray(data.ingredients)) {
        data.ingredients.forEach((ing, idx) => {
            if (!ing.name || typeof ing.name !== 'string') {
                errors.push(`Ingrediente ${idx + 1}: nombre inválido`);
            }
        });
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

// Use in importRecipeFromQR:
function importRecipeFromQR(recipeData) {
    const validation = validateRecipeData(recipeData);
    
    if (!validation.valid) {
        console.error('[Import] Validation errors:', validation.errors);
        showNotification('Datos de receta inválidos: ' + validation.errors[0], 'error');
        return;
    }
    
    // ... rest of import logic
}
```

---

## 4. Add QR Size Estimation

```javascript
/**
 * Estimate QR code version needed for data
 * @param {string} data - Data to encode
 * @param {string} errorCorrection - Error correction level
 * @returns {Object} {version: number, estimatedSize: string}
 */
estimateQRSize(data, errorCorrection = 'M') {
    const dataLength = data.length;
    
    // Approximate capacities for different versions (alphanumeric mode)
    const capacities = {
        'L': [25, 47, 77, 114, 154, 195, 224, 279, 335],
        'M': [20, 38, 61, 90, 122, 154, 178, 221, 262],
        'Q': [16, 29, 47, 67, 87, 108, 125, 157, 189],
        'H': [10, 20, 35, 50, 64, 84, 93, 122, 143]
    };
    
    const levels = capacities[errorCorrection] || capacities['M'];
    
    for (let i = 0; i < levels.length; i++) {
        if (dataLength <= levels[i]) {
            return {
                version: i + 1,
                estimatedSize: `${21 + (i * 4)}x${21 + (i * 4)} modules`,
                tooLarge: false
            };
        }
    }
    
    return {
        version: 40,
        estimatedSize: '177x177 modules',
        tooLarge: dataLength > 2953
    };
}
```

---

## 5. Improve Error Handling

```javascript
/**
 * Generate QR code URL with comprehensive error handling
 */
generateQRCodeURL(recipeData, size = 200, options = {}) {
    const { errorCorrection = 'M', margin = 1 } = options;
    
    // Validate inputs
    if (!recipeData || typeof recipeData !== 'string') {
        throw new Error('Invalid recipe data for QR generation');
    }
    
    if (size < 50 || size > 1000) {
        console.warn(`[QR] Size ${size} out of recommended range (50-1000), using default`);
        size = QR_CONFIG.DEFAULT_SIZE;
    }
    
    if (!['L', 'M', 'Q', 'H'].includes(errorCorrection)) {
        console.warn(`[QR] Invalid error correction '${errorCorrection}', using M`);
        errorCorrection = 'M';
    }
    
    try {
        // Encode recipe data in base64 for URL
        const base64Data = btoa(encodeURIComponent(recipeData));
        const targetURL = `${QR_CONFIG.TARGET_URL}#import=${base64Data}`;
        
        // Check if URL is too long (most browsers limit ~2000 chars)
        if (targetURL.length > 2000) {
            console.warn('[QR] Generated URL exceeds 2000 characters, may not work in all browsers');
        }
        
        const encodedURL = encodeURIComponent(targetURL);
        
        // Build QR API URL with options
        return `${QR_CONFIG.API_URL}?size=${size}x${size}&data=${encodedURL}&ecc=${errorCorrection}&margin=${margin}`;
        
    } catch (error) {
        console.error('[QR] Error generating QR URL:', error);
        throw new Error('Failed to generate QR code URL: ' + error.message);
    }
}
```

---

## 6. Add Duplicate Detection

```javascript
/**
 * Check if recipe already exists (by name similarity)
 * @param {string} name - Recipe name to check
 * @param {Array} existingRecipes - Current recipes
 * @returns {Object|null} Matching recipe or null
 */
function findDuplicateRecipe(name, existingRecipes) {
    const normalizedName = name.toLowerCase().trim();
    
    return existingRecipes.find(recipe => {
        const existingName = recipe.name.toLowerCase().trim();
        
        // Exact match
        if (existingName === normalizedName) return true;
        
        // Very similar (Levenshtein distance could be used here)
        // Simple approach: check if one contains the other
        if (existingName.includes(normalizedName) || normalizedName.includes(existingName)) {
            return existingName.length > 3; // Avoid false positives with short names
        }
        
        return false;
    });
}

// Use in importRecipeFromQR:
function importRecipeFromQR(recipeData) {
    try {
        const validation = validateRecipeData(recipeData);
        if (!validation.valid) {
            showNotification('Datos de receta inválidos: ' + validation.errors[0], 'error');
            return;
        }
        
        // Check for duplicates
        const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        const duplicate = findDuplicateRecipe(recipeData.name, recipes);
        
        if (duplicate) {
            const confirmed = confirm(
                `Ya existe una receta llamada "${duplicate.name}".\n\n` +
                `¿Deseas importar esta receta de todas formas?`
            );
            if (!confirmed) return;
        }
        
        // ... rest of import logic
    } catch (error) {
        console.error('[Import] Error importing recipe:', error);
        showNotification('Error al importar la receta', 'error');
    }
}
```

---

## 7. Add Retry Logic for QR Generation

```javascript
/**
 * Render QR code with retry logic
 */
async renderDetailQRCode(recipe) {
    const qrContainer = document.getElementById('detail-qr-code');
    if (!qrContainer) return;
    
    qrContainer.innerHTML = 'Generando código QR...';
    
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
        try {
            const recipeData = this.prepareRecipeDataForQR(recipe);
            const qrUrl = this.generateQRCodeURL(recipeData, 200);
            
            // Try to load the image
            await this.loadQRImage(qrUrl, qrContainer);
            return; // Success
            
        } catch (error) {
            attempt++;
            console.warn(`[QR] Attempt ${attempt} failed:`, error);
            
            if (attempt >= maxRetries) {
                qrContainer.innerHTML = `
                    <p style="color: var(--color-danger); font-size: 0.875rem;">
                        Error al generar el código QR después de ${maxRetries} intentos
                    </p>
                    <button onclick="window.recipeApp.renderDetailQRCode(window.recipeApp.recipes.find(r => r.id === ${recipe.id}))" 
                            class="btn-secondary" style="margin-top: 12px; font-size: 0.875rem;">
                        🔄 Reintentar
                    </button>
                `;
            } else {
                // Wait before retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
}

/**
 * Load QR image with promise
 */
loadQRImage(url, container) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.style.width = '200px';
        img.style.height = '200px';
        img.alt = 'Código QR de la receta';
        
        img.onload = () => {
            container.innerHTML = '';
            container.appendChild(img);
            resolve();
        };
        
        img.onerror = () => {
            reject(new Error('Failed to load QR image'));
        };
        
        // Set timeout for loading
        setTimeout(() => reject(new Error('QR image load timeout')), 10000);
        
        img.src = url;
    });
}
```

---

## 8. Add Compression for Large Recipes

```javascript
/**
 * Compress recipe data if too large
 * @param {Object} recipe - Recipe object
 * @returns {string} Compressed JSON string
 */
prepareRecipeDataForQR(recipe, mode = 'auto') {
    // Build full data first
    const fullData = {
        name: recipe.name,
        category: recipe.category,
        ingredients: recipe.ingredients.map(i => ({
            name: i.name,
            quantity: i.quantity,
            unit: i.unit
        })),
        preparationMethod: recipe.preparationMethod,
        totalTime: recipe.totalTime
    };
    
    const fullJson = JSON.stringify(fullData);
    
    // Auto mode: decide based on size
    if (mode === 'auto') {
        const encoded = btoa(encodeURIComponent(fullJson));
        
        // If encoded data is reasonable, use full mode
        if (encoded.length < QR_CONFIG.COMPACT_THRESHOLD) {
            return fullJson;
        }
        
        console.warn('[QR] Recipe data too large, truncating preparation method');
    }
    
    // Truncate preparation method if needed
    if (recipe.preparationMethod && recipe.preparationMethod.length > QR_CONFIG.PREP_METHOD_MAX_LENGTH) {
        fullData.preparationMethod = recipe.preparationMethod.substring(0, QR_CONFIG.PREP_METHOD_MAX_LENGTH) + '...';
    }
    
    return JSON.stringify(fullData);
}
```

---

## Priority Implementation Order

1. **CRITICAL**: Fix compact mode or remove it entirely (Solution B recommended)
2. **HIGH**: Add data validation before import
3. **HIGH**: Extract configuration constants
4. **MEDIUM**: Add duplicate detection
5. **MEDIUM**: Improve error handling with retries
6. **LOW**: Add QR size estimation
7. **LOW**: Add compression for large recipes

---

## Testing Checklist

- [ ] Test QR generation with small recipe (< 5 ingredients)
- [ ] Test QR generation with large recipe (> 20 ingredients)
- [ ] Test QR generation with very long preparation method (> 1000 chars)
- [ ] Test import with valid QR data
- [ ] Test import with corrupted QR data
- [ ] Test import with duplicate recipe name
- [ ] Test import with missing required fields
- [ ] Test QR generation failure (network offline)
- [ ] Test QR scanning on mobile devices
- [ ] Test URL length limits in different browsers
