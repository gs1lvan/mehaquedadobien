# Design Document

## Overview

Este diseño modifica el sistema de códigos QR existente para utilizar el formato XML estándar de la aplicación en lugar de JSON. La solución aprovecha las clases `XMLExporter` y `XMLImporter` ya implementadas, garantizando compatibilidad con la funcionalidad de importación/exportación existente. El sistema mantendrá compatibilidad retroactiva con códigos QR antiguos que usan JSON.

### Key Design Decisions

1. **Reutilizar XMLExporter/XMLImporter**: Aprovechar las clases existentes en lugar de crear nueva lógica de conversión
2. **Detección automática de formato**: Detectar si los datos son XML o JSON para mantener compatibilidad
3. **Optimización de tamaño**: Excluir imágenes y videos del XML en QR para mantener tamaños manejables
4. **Validación robusta**: Usar la validación existente de XMLImporter para garantizar integridad de datos

## Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      RecipeApp                              │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  QR Generation (Modified)                            │  │
│  │  - prepareRecipeDataForQR() → XML                    │  │
│  │  - generateQRCodeURL() → Base64(XML)                 │  │
│  │  - renderDetailQRCode()                              │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   │                                         │
│                   │ uses                                    │
│                   ▼                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  XMLExporter (Existing)                              │  │
│  │  - generateXML(recipe) → XML string                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Import Detection (Modified)                │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  checkForRecipeImport()                              │  │
│  │  - Decode Base64                                     │  │
│  │  - Detect format (XML vs JSON)                       │  │
│  │  - Route to appropriate handler                      │  │
│  └────────────┬─────────────────┬─────────────────────────┘  │
│               │                 │                            │
│               │ XML             │ JSON                       │
│               ▼                 ▼                            │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │ importRecipeFromXML │  │ importRecipeFromQR (Existing)│  │
│  │ (New)               │  │ (JSON handler)               │  │
│  └──────────┬──────────┘  └──────────────────────────────┘  │
│             │                                                │
│             │ uses                                           │
│             ▼                                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  XMLImporter (Existing)                              │  │
│  │  - parseXMLString(xml) → Recipe object               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Shared Components                          │
│                                                             │
│  - showRecipeImportModal(recipeData)                        │
│  - showNotification(message, type)                          │
│  - expandRecipeData(data) → for JSON compatibility          │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Modified QR Generation Components

#### prepareRecipeDataForQR(recipe)

**Purpose**: Generar XML optimizado para QR (sin imágenes/videos)

**Signature**:
```javascript
prepareRecipeDataForQR(recipe) → string (XML)
```

**Implementation Strategy**:
```javascript
prepareRecipeDataForQR(recipe) {
    // Create a lightweight copy without images/videos
    const lightRecipe = {
        ...recipe,
        images: [],
        videos: []
    };
    
    // Use XMLExporter to generate XML
    const xmlString = XMLExporter.generateXML(lightRecipe);
    
    return xmlString;
}
```

**Changes from Current**:
- Remove JSON generation logic
- Remove compact mode (no longer needed with XML)
- Call `XMLExporter.generateXML()` instead of `JSON.stringify()`
- Strip images and videos before export to reduce size

#### generateQRCodeURL(recipeData, size, options)

**Purpose**: Generar URL del QR con XML codificado

**Signature**:
```javascript
generateQRCodeURL(recipeData, size = 200, options = {}) → string (URL)
```

**Implementation Strategy**:
```javascript
generateQRCodeURL(recipeData, size = 200, options = {}) {
    const { errorCorrection = 'L', margin = 1 } = options;
    
    // Encode XML data in base64 for URL
    const base64Data = btoa(encodeURIComponent(recipeData));
    const targetURL = `https://guiavfr.enaire.es/#import=${base64Data}`;
    
    // Check size and warn if too large
    if (base64Data.length > 1500) {
        console.warn('[QR] Large QR code:', base64Data.length, 'characters');
    }
    
    const encodedURL = encodeURIComponent(targetURL);
    
    // Build QR API URL
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedURL}&ecc=${errorCorrection}&margin=${margin}`;
}
```

**Changes from Current**:
- No changes to signature or core logic
- Add size warning for large XML
- Keep same error correction defaults

#### renderDetailQRCode(recipe)

**Purpose**: Renderizar QR en vista de detalle

**Changes from Current**:
- Update call to `prepareRecipeDataForQR()` (now returns XML)
- Add size estimation display
- Show warning if QR will be large

### 2. New Import Components

#### importRecipeFromXML(xmlString)

**Purpose**: Nueva función para importar recetas desde XML en QR

**Signature**:
```javascript
async importRecipeFromXML(xmlString) → Promise<void>
```

**Implementation**:
```javascript
async function importRecipeFromXML(xmlString) {
    try {
        console.log('[QR Import] Importing recipe from XML');
        
        // Use XMLImporter to parse XML
        const result = await XMLImporter.parseXMLString(xmlString);
        
        // Check if parsing was successful
        if (result.successful.length === 0) {
            throw new Error('No se pudo importar la receta del XML');
        }
        
        // Get the first (and should be only) recipe
        const recipeData = result.successful[0];
        
        // Show import modal for confirmation
        showRecipeImportModal(recipeData);
        
    } catch (error) {
        console.error('[QR Import] Error importing from XML:', error);
        showNotification('Error al importar receta desde XML: ' + error.message, 'error');
    }
}
```

**Key Features**:
- Reuses `XMLImporter.parseXMLString()` for parsing
- Handles errors from XMLImporter
- Shows confirmation modal before saving
- Provides detailed error messages

### 3. Modified Import Detection

#### checkForRecipeImport()

**Purpose**: Detectar y procesar datos de importación desde URL

**Current Flow**:
```
URL hash → Decode Base64 → Parse JSON → Show modal
```

**New Flow**:
```
URL hash → Decode Base64 → Detect format → Route to handler
                              ├─ XML → importRecipeFromXML()
                              └─ JSON → importRecipeFromQR()
```

**Implementation**:
```javascript
function checkForRecipeImport() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#import=')) {
        try {
            // Extract and decode data
            const base64Data = hash.substring(8);
            const decodedData = decodeURIComponent(atob(base64Data));
            
            console.log('[QR Import] Decoded data length:', decodedData.length);
            
            // Detect format
            const isXML = decodedData.trim().startsWith('<?xml') || 
                         decodedData.trim().startsWith('<recipe');
            
            if (isXML) {
                // Handle XML format (new)
                console.log('[QR Import] Detected XML format');
                importRecipeFromXML(decodedData);
            } else {
                // Handle JSON format (legacy compatibility)
                console.log('[QR Import] Detected JSON format (legacy)');
                const rawData = JSON.parse(decodedData);
                const recipeData = expandRecipeData(rawData);
                showRecipeImportModal(recipeData);
            }
            
            // Clean URL hash
            history.replaceState(null, '', window.location.pathname);
            
        } catch (error) {
            console.error('[QR Import] Error parsing data:', error);
            showNotification('Error al importar la receta. Código QR inválido.', 'error');
        }
    }
}
```

**Key Features**:
- Format detection based on content
- Backward compatibility with JSON QR codes
- Detailed logging for debugging
- Graceful error handling

### 4. Modified Modal Component

#### showRecipeImportModal(recipeData)

**Purpose**: Mostrar modal de confirmación antes de importar

**Changes Required**:
- Accept both JSON format (legacy) and Recipe object (from XML)
- Normalize data structure for display
- Handle missing fields gracefully

**Implementation**:
```javascript
function showRecipeImportModal(recipeData) {
    // Normalize data structure
    const normalizedData = {
        name: recipeData.name || 'Sin nombre',
        ingredients: recipeData.ingredients || [],
        totalTime: recipeData.totalTime || '',
        category: recipeData.category || ''
    };
    
    // Create modal (existing code)
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    // ... rest of modal creation
    
    // Update confirm handler to save Recipe object
    document.getElementById('confirm-import').addEventListener('click', () => {
        saveImportedRecipe(recipeData);
        modal.remove();
    });
}
```

#### saveImportedRecipe(recipeData)

**Purpose**: Nueva función helper para guardar receta importada

**Implementation**:
```javascript
function saveImportedRecipe(recipeData) {
    try {
        // If recipeData is already a Recipe object from XML, use it
        // Otherwise, create from JSON data (legacy)
        const newRecipe = recipeData.id ? 
            {
                ...recipeData,
                id: Date.now(), // Generate new ID
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            } :
            {
                id: Date.now(),
                name: recipeData.name,
                category: recipeData.category || '',
                ingredients: recipeData.ingredients || [],
                preparationMethod: recipeData.preparationMethod || '',
                totalTime: recipeData.totalTime || '',
                images: [],
                videos: [],
                additionSequences: [],
                kitchenAppliances: [],
                author: '',
                history: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        
        // Save to localStorage
        const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        
        // Show success and reload
        showNotification(`✓ Receta "${newRecipe.name}" importada correctamente`, 'success');
        
        if (window.recipeApp) {
            window.recipeApp.loadRecipes();
            setTimeout(() => {
                window.recipeApp.showRecipeDetail(newRecipe.id);
            }, 500);
        }
        
    } catch (error) {
        console.error('[QR Import] Error saving recipe:', error);
        showNotification('Error al guardar la receta importada', 'error');
    }
}
```

## Data Models

### XML Structure in QR (Optimized)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipe>
    <id>1730000000000</id>
    <name>Paella Valenciana</name>
    <category>main</category>
    <totalTime>1h 30min</totalTime>
    <preparationMethod>Sofreír el pollo...</preparationMethod>
    <kitchenAppliances>
        <appliance>stove</appliance>
        <appliance>paella-pan</appliance>
    </kitchenAppliances>
    <author>Chef Juan</author>
    <history>Receta tradicional...</history>
    <ingredients>
        <ingredient>
            <id>ing_1</id>
            <name>Arroz</name>
            <quantity>400</quantity>
            <unit>g</unit>
            <order>1</order>
        </ingredient>
        <ingredient>
            <id>ing_2</id>
            <name>Pollo</name>
            <quantity>300</quantity>
            <unit>g</unit>
            <order>2</order>
        </ingredient>
    </ingredients>
    <additionSequences>
        <sequence>
            <id>seq_1</id>
            <step>1</step>
            <ingredientIds>
                <ingredientId>ing_1</ingredientId>
            </ingredientIds>
            <duration>5min</duration>
            <description>Añadir arroz</description>
        </sequence>
    </additionSequences>
    <images></images>
    <videos></videos>
    <createdAt>2024-11-02T10:00:00.000Z</createdAt>
    <updatedAt>2024-11-02T10:00:00.000Z</updatedAt>
</recipe>
```

**Note**: `<images>` and `<videos>` are empty to reduce QR size

### Size Comparison

| Format | Typical Size | Base64 Encoded | QR Version |
|--------|--------------|----------------|------------|
| JSON Compact | ~300 bytes | ~400 chars | V3 (29×29) |
| JSON Full | ~500 bytes | ~700 chars | V5 (37×37) |
| XML (no images) | ~800 bytes | ~1100 chars | V7 (45×45) |
| XML (with images) | ~50KB+ | ~70KB+ | Not feasible |

**Conclusion**: XML sin imágenes es viable para QR, aunque genera códigos ligeramente más grandes que JSON compacto.

### Legacy JSON Format (Maintained for Compatibility)

```json
{
    "n": "Paella",
    "c": "main",
    "i": "Arroz|400|g;Pollo|300|g",
    "p": "Sofreír...",
    "t": "1h 30min"
}
```

## Error Handling

### Error Scenarios and Responses

| Scenario | Detection | Response |
|----------|-----------|----------|
| Invalid Base64 | `atob()` throws | "Error al decodificar el código QR" |
| Invalid XML | `DOMParser` error node | "El código QR contiene XML inválido" |
| Invalid JSON | `JSON.parse()` throws | "El código QR contiene datos inválidos" |
| Missing required fields | XMLImporter validation | "Datos de receta incompletos" |
| XML too large | Length check | Warning before generation |
| Network error (QR API) | Image load error | "Error al generar el código QR" |

### Error Handling Flow

```javascript
try {
    // Decode Base64
    const decodedData = decodeURIComponent(atob(base64Data));
    
    // Detect and parse format
    if (isXML) {
        await importRecipeFromXML(decodedData);
    } else {
        const jsonData = JSON.parse(decodedData);
        importRecipeFromQR(expandRecipeData(jsonData));
    }
    
} catch (error) {
    // Log detailed error
    console.error('[QR Import] Error:', error);
    
    // Show user-friendly message
    let message = 'Error al importar la receta';
    
    if (error.name === 'InvalidCharacterError') {
        message = 'Error al decodificar el código QR';
    } else if (error instanceof SyntaxError) {
        message = 'El código QR contiene datos inválidos';
    } else if (error.message) {
        message += ': ' + error.message;
    }
    
    showNotification(message, 'error');
}
```

## Testing Strategy

### Unit Tests

1. **XML Generation**
   - Test `prepareRecipeDataForQR()` generates valid XML
   - Verify images/videos are excluded
   - Test with minimal recipe (only required fields)
   - Test with complete recipe (all fields)

2. **Format Detection**
   - Test XML detection with `<?xml` prefix
   - Test XML detection with `<recipe>` prefix
   - Test JSON detection with `{` prefix
   - Test invalid data handling

3. **Import Processing**
   - Test XML import with valid data
   - Test JSON import (legacy compatibility)
   - Test error handling for invalid XML
   - Test error handling for invalid JSON

### Integration Tests

1. **End-to-End QR Flow**
   - Generate QR from recipe
   - Scan QR (simulate with URL)
   - Verify import modal appears
   - Confirm import
   - Verify recipe saved correctly

2. **Backward Compatibility**
   - Generate old JSON QR
   - Verify it still imports correctly
   - Verify no data loss

3. **Error Scenarios**
   - Test with corrupted Base64
   - Test with malformed XML
   - Test with malformed JSON
   - Verify appropriate error messages

### Manual Testing Checklist

- [ ] Generate QR from simple recipe (3 ingredients)
- [ ] Generate QR from complex recipe (15+ ingredients, sequences)
- [ ] Scan QR with mobile device
- [ ] Import recipe from QR
- [ ] Verify all data imported correctly
- [ ] Test with old JSON QR code
- [ ] Test error handling with invalid QR
- [ ] Verify QR size warnings work
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on different devices (Android, iOS, Desktop)

## Performance Considerations

### QR Generation

- **Current**: ~50ms (JSON generation + API call)
- **Expected**: ~100ms (XML generation + API call)
- **Impact**: Minimal, acceptable for user experience

### QR Scanning/Import

- **Current**: ~200ms (decode + parse JSON + show modal)
- **Expected**: ~300ms (decode + parse XML + show modal)
- **Impact**: Minimal, XMLImporter is already optimized

### Size Optimization

1. **Exclude large data**:
   - Images (can be 50KB+ each)
   - Videos (can be MB+)
   - Long history text (optional field)

2. **Keep essential data**:
   - Recipe metadata (name, category, time)
   - Ingredients (critical)
   - Preparation method (critical)
   - Addition sequences (important for timing)
   - Kitchen appliances (small, useful)

3. **Size limits**:
   - Target: < 2KB encoded (QR Version 7-8)
   - Warning: > 1.5KB encoded
   - Maximum: 3KB encoded (QR Version 10)

## Migration Strategy

### Phase 1: Implementation (This Spec)

1. Modify `prepareRecipeDataForQR()` to use XML
2. Add format detection to `checkForRecipeImport()`
3. Create `importRecipeFromXML()` function
4. Update documentation

### Phase 2: Testing

1. Test with various recipe types
2. Verify backward compatibility
3. Test on multiple devices
4. Gather user feedback

### Phase 3: Monitoring

1. Monitor QR generation success rate
2. Track import success/failure rates
3. Collect QR size statistics
4. Identify any issues

### Rollback Plan

If issues arise:
1. Revert `prepareRecipeDataForQR()` to JSON
2. Keep format detection (for compatibility)
3. All existing QR codes continue working
4. No data loss

## Security Considerations

### Input Validation

- XML parsing uses DOMParser (safe, no code execution)
- XMLImporter validates all fields
- No eval() or Function() calls
- Base64 decode is safe (built-in function)

### Data Sanitization

- XMLImporter sanitizes all text content
- No HTML injection possible
- No script execution possible
- localStorage is origin-isolated

### Size Limits

- Maximum QR data: 3KB (prevents DoS)
- XMLImporter has 50MB file limit (not applicable to QR)
- Browser URL length limits apply (~2000 chars)

## Future Enhancements

### Short-term (Next 3 months)

1. **QR Size Optimization**
   - Compress XML before encoding
   - Use gzip compression
   - Estimate QR version before generation

2. **Duplicate Detection**
   - Check if recipe already exists
   - Offer to update instead of create new
   - Show diff of changes

### Medium-term (3-6 months)

1. **Backend Integration**
   - Store recipes on server
   - Generate short URLs (e.g., `#r=abc123`)
   - Enable 21×21 QR codes
   - Track sharing statistics

2. **Enhanced Import**
   - Batch import multiple recipes
   - Import from URL
   - Import from clipboard

### Long-term (6+ months)

1. **Sync System**
   - Cloud storage for recipes
   - Multi-device sync
   - Collaborative recipe editing
   - Public recipe sharing

2. **Advanced QR Features**
   - Dynamic QR codes (update content)
   - QR with analytics
   - Custom QR designs
   - Print-optimized QR generation
