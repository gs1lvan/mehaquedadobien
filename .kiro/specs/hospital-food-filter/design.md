# Design Document

## Overview

Esta funcionalidad añade una nueva categoría "hospital" al sistema de recetas existente, permitiendo a los usuarios clasificar y filtrar recetas apropiadas para entornos hospitalarios o dietas médicas especiales. La implementación se integra completamente con la arquitectura existente sin modificar la estructura de datos principal.

## Architecture

La funcionalidad se implementa como una extensión del sistema de categorías existente:

- **Frontend**: Modificación de componentes UI existentes para incluir la nueva categoría
- **Data Layer**: Extensión de las validaciones y mapeos de categorías
- **Storage**: Sin cambios en la estructura de almacenamiento (compatible con datos existentes)
- **Export**: Actualización de funciones de exportación XML/PDF

## Components and Interfaces

### 1. Category Management

**Ubicación**: `models.js` - Recipe class validation
```javascript
// Extensión de categorías válidas
const validCategories = [
    'carne', 'verdura', 'pescado', 'fruta', 'cereales', 'mix', 
    'con-huevo', 'pollo', 'escabeche', 'hospital', null
];
```

### 2. UI Components

**Ubicación**: `index.html` - Filter chips section
```html
<!-- Nuevo chip de filtro -->
<button class="filter-chip" data-category="hospital">
    🏥 Hospital
</button>
```

**Ubicación**: `index.html` - Form category selector
```html
<!-- Nueva opción en selector -->
<option value="hospital">🏥 Hospital</option>
```

### 3. Application Logic

**Ubicación**: `script.js` - RecipeApp class
- `getCategoryLabel()`: Añadir mapeo para categoría "hospital"
- Filtros existentes funcionarán automáticamente con la nueva categoría

### 4. Export Functions

**Ubicación**: `models.js` - PDFExporter class
```javascript
// Extensión de etiquetas de categoría
const categoryLabels = {
    // ... categorías existentes
    'hospital': '🏥 Hospital'
};
```

## Data Models

### Recipe Category Extension

La categoría "hospital" se añade como un valor válido en el enum de categorías existente:

```javascript
// Antes
category: 'carne' | 'verdura' | 'pescado' | 'fruta' | 'cereales' | 'mix' | 'con-huevo' | 'pollo' | 'escabeche' | null

// Después  
category: 'carne' | 'verdura' | 'pescado' | 'fruta' | 'cereales' | 'mix' | 'con-huevo' | 'pollo' | 'escabeche' | 'hospital' | null
```

No se requieren migraciones de datos ya que es una adición compatible hacia atrás.

## Error Handling

### Validation
- La validación existente en `Recipe.validate()` se actualiza para incluir "hospital"
- Manejo de errores existente permanece sin cambios

### Backward Compatibility
- Recetas existentes sin la nueva categoría siguen funcionando
- Datos exportados previamente siguen siendo válidos
- No se requiere migración de datos

## Testing Strategy

### Unit Tests
- Validación de categoría "hospital" en Recipe class
- Mapeo correcto en `getCategoryLabel()`
- Filtrado correcto con nueva categoría

### Integration Tests  
- Creación de receta con categoría "hospital"
- Filtrado por categoría "hospital"
- Exportación XML/PDF con nueva categoría

### UI Tests
- Visualización correcta del chip de filtro
- Selección de categoría en formulario
- Visualización en tarjetas de receta

## Implementation Notes

### Minimal Changes Required
1. **HTML**: Añadir 2 elementos (chip de filtro + opción de selector)
2. **JavaScript**: Actualizar 3 arrays/objetos de configuración
3. **Validation**: Añadir "hospital" a array de categorías válidas

### No Breaking Changes
- Estructura de datos existente permanece igual
- APIs internas no cambian
- Funcionalidad existente no se ve afectada

### Performance Impact
- Impacto mínimo: solo se añade una opción más a arrays existentes
- No afecta rendimiento de filtrado o búsqueda
- No requiere cambios en almacenamiento

## Visual Design

### Filter Chip
- Icono: 🏥 (hospital emoji)
- Texto: "Hospital"  
- Estilo: Consistente con chips existentes
- Color: Utiliza variables CSS existentes

### Category Display
- En tarjetas: "🏥 Hospital"
- En formulario: "🏥 Hospital" 
- En exports: "🏥 Hospital"
- Consistencia visual con categorías existentes