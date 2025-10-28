# Design Document

## Overview

Este documento describe el diseño técnico para implementar la gestión de categorías personalizadas en la aplicación de recetario. La solución permitirá a los usuarios crear, editar y eliminar categorías personalizadas, mientras mantiene las categorías predefinidas siempre disponibles. Las categorías se almacenarán en localStorage y se integrarán completamente con el sistema existente de filtros, formularios y visualización.

## Architecture

### Current State

**Categorías Hardcodeadas:**
- Definidas en `models.js` en el array `validCategories`
- Chips de filtro definidos estáticamente en `index.html`
- Selector de categorías en formulario con opciones hardcodeadas
- Validación estricta que solo acepta categorías predefinidas

**Limitaciones:**
- No se pueden agregar nuevas categorías sin modificar el código
- No hay persistencia de categorías personalizadas
- No hay interfaz para gestionar categorías

### Target State

**Sistema de Categorías Dinámico:**
- Categorías predefinidas siempre disponibles (no se pueden eliminar)
- Categorías personalizadas gestionables por el usuario
- Almacenamiento en localStorage
- Interfaz de gestión de categorías (modal)
- Generación dinámica de chips de filtro y opciones de selector
- Validación flexible que acepta categorías personalizadas

## Components and Interfaces

### 1. Category Data Model

Estructura de datos para representar una categoría:

```javascript
{
    id: string,           // ID único (slug del nombre)
    name: string,         // Nombre de la categoría
    emoji: string,        // Emoji representativo
    color: string,        // Color hex para visualización
    isPredefined: boolean, // true si es categoría predefinida
    recipeCount: number   // Número de recetas (calculado dinámicamente)
}
```

**Categorías Predefinidas:**
```javascript
const PREDEFINED_CATEGORIES = [
    { id: 'carne', name: 'Carne', emoji: '🥩', color: '#D93B30', isPredefined: true },
    { id: 'verdura', name: 'Verdura', emoji: '🥬', color: '#008A05', isPredefined: true },
    { id: 'pescado', name: 'Pescado', emoji: '🐟', color: '#0073CF', isPredefined: true },
    { id: 'fruta', name: 'Fruta', emoji: '🍎', color: '#FF8C00', isPredefined: true },
    { id: 'cereales', name: 'Cereales', emoji: '🌾', color: '#C4A053', isPredefined: true },
    { id: 'mix', name: 'Mix', emoji: '🍲', color: '#8B5CF6', isPredefined: true },
    { id: 'con-huevo', name: 'Con huevo', emoji: '🥚', color: '#FFD700', isPredefined: true },
    { id: 'pollo', name: 'Pollo', emoji: '🐔', color: '#FFA500', isPredefined: true },
    { id: 'escabeche', name: 'Escabeche', emoji: '🥒', color: '#32CD32', isPredefined: true },
    { id: 'hospital', name: 'Hospital', emoji: '🏥', color: '#FF6B6B', isPredefined: true }
];
```

**Paleta de Colores para Categorías Personalizadas:**
```javascript
const CATEGORY_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#E76F51', '#2A9D8F'
];
```

### 2. CategoryManager Class

Nueva clase para gestionar categorías:

```javascript
class CategoryManager {
    constructor() {
        this.storageKey = 'recetario_custom_categories';
        this.predefinedCategories = PREDEFINED_CATEGORIES;
        this.customCategories = [];
        this.loadCustomCategories();
    }
    
    /**
     * Load custom categories from localStorage
     */
    loadCustomCategories() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.customCategories = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading custom categories:', error);
            this.customCategories = [];
        }
    }
    
    /**
     * Save custom categories to localStorage
     */
    saveCustomCategories() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.customCategories));
        } catch (error) {
            console.error('Error saving custom categories:', error);
            throw new Error('No se pudieron guardar las categorías');
        }
    }
    
    /**
     * Get all categories (predefined + custom)
     * @returns {Array} All categories
     */
    getAllCategories() {
        return [...this.predefinedCategories, ...this.customCategories];
    }
    
    /**
     * Get category by ID
     * @param {string} id - Category ID
     * @returns {Object|null} Category object or null
     */
    getCategoryById(id) {
        const all = this.getAllCategories();
        return all.find(cat => cat.id === id) || null;
    }
    
    /**
     * Create new custom category
     * @param {Object} categoryData - Category data (name, emoji, color)
     * @returns {Object} Created category
     */
    createCategory(categoryData) {
        // Validate name
        if (!categoryData.name || categoryData.name.trim().length < 2) {
            throw new Error('El nombre debe tener al menos 2 caracteres');
        }
        
        if (categoryData.name.length > 30) {
            throw new Error('El nombre no puede tener más de 30 caracteres');
        }
        
        // Generate ID from name (slug)
        const id = this.generateCategoryId(categoryData.name);
        
        // Check if category already exists
        if (this.getCategoryById(id)) {
            throw new Error('Ya existe una categoría con ese nombre');
        }
        
        // Create category object
        const category = {
            id: id,
            name: categoryData.name.trim(),
            emoji: categoryData.emoji || '📁',
            color: categoryData.color || CATEGORY_COLORS[0],
            isPredefined: false
        };
        
        // Add to custom categories
        this.customCategories.push(category);
        this.saveCustomCategories();
        
        return category;
    }
    
    /**
     * Update existing custom category
     * @param {string} id - Category ID
     * @param {Object} updates - Updated data
     * @returns {Object} Updated category
     */
    updateCategory(id, updates) {
        const category = this.customCategories.find(cat => cat.id === id);
        
        if (!category) {
            throw new Error('Categoría no encontrada');
        }
        
        if (category.isPredefined) {
            throw new Error('No se pueden editar categorías predefinidas');
        }
        
        // Validate new name if provided
        if (updates.name) {
            if (updates.name.trim().length < 2 || updates.name.length > 30) {
                throw new Error('El nombre debe tener entre 2 y 30 caracteres');
            }
            
            const newId = this.generateCategoryId(updates.name);
            if (newId !== id && this.getCategoryById(newId)) {
                throw new Error('Ya existe una categoría con ese nombre');
            }
            
            category.name = updates.name.trim();
            category.id = newId;
        }
        
        if (updates.emoji) {
            category.emoji = updates.emoji;
        }
        
        if (updates.color) {
            category.color = updates.color;
        }
        
        this.saveCustomCategories();
        return category;
    }
    
    /**
     * Delete custom category
     * @param {string} id - Category ID
     * @param {Array} recipes - All recipes to check usage
     * @returns {Object} Deletion result with affected recipes
     */
    deleteCategory(id, recipes) {
        const category = this.customCategories.find(cat => cat.id === id);
        
        if (!category) {
            throw new Error('Categoría no encontrada');
        }
        
        if (category.isPredefined) {
            throw new Error('No se pueden eliminar categorías predefinidas');
        }
        
        // Find recipes using this category
        const affectedRecipes = recipes.filter(recipe => recipe.category === id);
        
        // Remove category
        this.customCategories = this.customCategories.filter(cat => cat.id !== id);
        this.saveCustomCategories();
        
        return {
            deleted: true,
            affectedRecipes: affectedRecipes.length,
            affectedRecipeIds: affectedRecipes.map(r => r.id)
        };
    }
    
    /**
     * Generate category ID from name (slug)
     * @param {string} name - Category name
     * @returns {string} Category ID
     */
    generateCategoryId(name) {
        return name
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-')      // Replace non-alphanumeric with dash
            .replace(/^-+|-+$/g, '');         // Remove leading/trailing dashes
    }
    
    /**
     * Get recipe count for each category
     * @param {Array} recipes - All recipes
     * @returns {Object} Map of category ID to count
     */
    getCategoryCounts(recipes) {
        const counts = {};
        
        this.getAllCategories().forEach(cat => {
            counts[cat.id] = recipes.filter(r => r.category === cat.id).length;
        });
        
        // Count recipes without category
        counts['sin-categoria'] = recipes.filter(r => !r.category).length;
        
        return counts;
    }
}
```

### 3. UI Components

#### 3.1 Category Management Modal

Modal para gestionar categorías:

```html
<div id="category-modal" class="modal hidden">
    <div class="modal-content category-modal-content">
        <div class="modal-header">
            <h2>Gestionar Categorías</h2>
            <button id="close-category-modal" class="btn-icon">✕</button>
        </div>
        
        <div class="modal-body">
            <!-- Create new category form -->
            <div class="category-create-section">
                <h3>Crear Nueva Categoría</h3>
                <div class="category-form">
                    <input type="text" id="new-category-name" 
                           placeholder="Nombre de la categoría" 
                           maxlength="30">
                    
                    <div class="emoji-selector">
                        <label>Emoji:</label>
                        <input type="text" id="new-category-emoji" 
                               placeholder="📁" maxlength="2">
                    </div>
                    
                    <div class="color-selector">
                        <label>Color:</label>
                        <div id="color-palette" class="color-palette">
                            <!-- Color chips generated dynamically -->
                        </div>
                    </div>
                    
                    <button id="create-category-btn" class="btn-primary">
                        ➕ Crear Categoría
                    </button>
                </div>
            </div>
            
            <!-- Categories list -->
            <div class="categories-list-section">
                <h3>Categorías Predefinidas</h3>
                <div id="predefined-categories-list" class="categories-list">
                    <!-- Predefined categories -->
                </div>
                
                <h3>Categorías Personalizadas</h3>
                <div id="custom-categories-list" class="categories-list">
                    <!-- Custom categories -->
                </div>
            </div>
        </div>
    </div>
</div>
```

#### 3.2 Category Item Component

Elemento de categoría en la lista:

```html
<div class="category-item" data-category-id="{{id}}">
    <div class="category-info">
        <span class="category-emoji">{{emoji}}</span>
        <span class="category-name">{{name}}</span>
        <span class="category-badge" style="background: {{color}}"></span>
        <span class="category-count">({{recipeCount}} recetas)</span>
    </div>
    <div class="category-actions">
        <!-- Only for custom categories -->
        <button class="btn-icon btn-edit-category" title="Editar">✏️</button>
        <button class="btn-icon btn-delete-category" title="Eliminar">🗑️</button>
    </div>
</div>
```

### 4. Integration Points

#### 4.1 RecipeApp Integration

Agregar CategoryManager a RecipeApp:

```javascript
class RecipeApp {
    constructor() {
        // ... existing code ...
        this.categoryManager = new CategoryManager();
    }
    
    /**
     * Render filter chips dynamically
     */
    renderFilterChips() {
        const filterChipsContainer = document.querySelector('.filter-chips');
        if (!filterChipsContainer) return;
        
        filterChipsContainer.innerHTML = '';
        
        // "Todas" chip
        const allChip = document.createElement('button');
        allChip.className = 'filter-chip active';
        allChip.dataset.category = 'all';
        allChip.textContent = 'Todas';
        filterChipsContainer.appendChild(allChip);
        
        // Category chips
        const categories = this.categoryManager.getAllCategories();
        categories.forEach(category => {
            const chip = document.createElement('button');
            chip.className = 'filter-chip';
            chip.dataset.category = category.id;
            chip.innerHTML = `${category.emoji} ${category.name}`;
            chip.style.setProperty('--category-color', category.color);
            filterChipsContainer.appendChild(chip);
        });
        
        // "Sin categoría" chip
        const noCatChip = document.createElement('button');
        noCatChip.className = 'filter-chip';
        noCatChip.dataset.category = 'sin-categoria';
        noCatChip.textContent = '📋 Sin categoría';
        filterChipsContainer.appendChild(noCatChip);
        
        // Re-attach event listeners
        this.attachFilterChipListeners();
    }
    
    /**
     * Render category selector in form
     */
    renderCategorySelector() {
        const categorySelect = document.getElementById('recipe-category');
        if (!categorySelect) return;
        
        categorySelect.innerHTML = '<option value="">Sin categoría</option>';
        
        const categories = this.categoryManager.getAllCategories();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = `${category.emoji} ${category.name}`;
            categorySelect.appendChild(option);
        });
    }
    
    /**
     * Show category management modal
     */
    showCategoryModal() {
        const modal = document.getElementById('category-modal');
        if (modal) {
            modal.classList.remove('hidden');
            this.renderCategoryModal();
        }
    }
    
    /**
     * Handle category deletion with recipe updates
     */
    async handleDeleteCategory(categoryId) {
        const result = this.categoryManager.deleteCategory(categoryId, this.recipes);
        
        if (result.affectedRecipes > 0) {
            // Update affected recipes
            for (const recipeId of result.affectedRecipeIds) {
                const recipe = this.recipes.find(r => r.id === recipeId);
                if (recipe) {
                    recipe.category = null;
                    await this.storageManager.saveRecipe(recipe);
                }
            }
            
            // Reload recipes
            await this.loadRecipes();
        }
        
        // Update UI
        this.renderFilterChips();
        this.renderCategorySelector();
        this.renderRecipeList();
        this.renderCategoryModal();
    }
}
```

#### 4.2 Recipe Model Update

Actualizar validación en `models.js`:

```javascript
validate() {
    if (!this.name || this.name.trim() === '') {
        throw new Error('Recipe name is required');
    }
    
    // Remove strict category validation - allow any string or null
    // Categories are now managed dynamically
    
    if (!Array.isArray(this.ingredients)) {
        throw new Error('Recipe ingredients must be an array');
    }
    
    // ... rest of validation ...
}
```

## Data Models

### localStorage Structure

```javascript
// Key: 'recetario_custom_categories'
[
    {
        "id": "postres",
        "name": "Postres",
        "emoji": "🍰",
        "color": "#FF6B6B",
        "isPredefined": false
    },
    {
        "id": "bebidas",
        "name": "Bebidas",
        "emoji": "🥤",
        "color": "#4ECDC4",
        "isPredefined": false
    }
]
```

## Error Handling

### Validation Errors

- Nombre vacío o muy corto/largo
- Categoría duplicada
- Intento de editar/eliminar categoría predefinida

### Storage Errors

- localStorage lleno
- Error al parsear JSON
- Fallback a array vacío si hay error

### User Feedback

- Mensajes de éxito al crear/editar/eliminar
- Advertencias al eliminar categorías en uso
- Confirmación antes de acciones destructivas

## Testing Strategy

### Unit Tests

1. CategoryManager.createCategory()
2. CategoryManager.updateCategory()
3. CategoryManager.deleteCategory()
4. CategoryManager.generateCategoryId()
5. CategoryManager.getCategoryCounts()

### Integration Tests

1. Crear categoría y verificar en filtros
2. Crear categoría y verificar en selector
3. Eliminar categoría y verificar recetas afectadas
4. Editar categoría y verificar actualización
5. Persistencia en localStorage

### Manual Testing

1. Crear varias categorías personalizadas
2. Asignar categorías a recetas
3. Filtrar por categorías personalizadas
4. Editar nombres y colores
5. Eliminar categorías con/sin recetas
6. Recargar aplicación y verificar persistencia
7. Exportar/importar recetas con categorías personalizadas

## Migration Strategy

### Backward Compatibility

- Las recetas existentes mantienen sus categorías
- Las categorías predefinidas siguen funcionando
- No se requiere migración de datos

### Rollout Plan

1. Implementar CategoryManager
2. Actualizar validación en Recipe model
3. Crear UI de gestión de categorías
4. Actualizar renderizado de filtros y selectores
5. Implementar persistencia en localStorage
6. Probar exhaustivamente
7. Desplegar cambios

## Performance Considerations

- CategoryManager se inicializa una vez al cargar la app
- Categorías se cargan de localStorage solo al inicio
- Renderizado de chips y selectores es eficiente (< 100 categorías)
- No hay impacto en el rendimiento de búsqueda/filtrado

## Security Considerations

- Validación de entrada para nombres de categorías
- Sanitización de emojis y colores
- Límite de 30 caracteres para nombres
- No se permite HTML en nombres de categorías

## Future Enhancements

1. **Importar/Exportar categorías** - Compartir configuración entre dispositivos
2. **Iconos personalizados** - Además de emojis, permitir iconos
3. **Categorías jerárquicas** - Subcategorías (ej: Postres > Tartas)
4. **Ordenar categorías** - Drag & drop para reordenar
5. **Categorías favoritas** - Marcar categorías más usadas
6. **Estadísticas** - Gráficos de uso de categorías
