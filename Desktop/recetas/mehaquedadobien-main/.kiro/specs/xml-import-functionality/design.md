# Design Document

## Overview

Esta funcionalidad añade capacidades bidireccionales de importación/exportación XML al sistema de recetas, permitiendo tanto importar recetas individuales o múltiples desde archivos XML, como exportar múltiples recetas (o todas) en un solo archivo. El diseño mantiene compatibilidad total con el formato XML existente y extiende la funcionalidad para manejar colecciones de recetas.

## Architecture

La funcionalidad se implementa como una extensión del sistema de exportación XML existente:

- **Frontend**: Nuevos botones de importación y exportación múltiple en la interfaz principal
- **Import Engine**: Nuevo componente XMLImporter para procesar archivos XML
- **Export Extension**: Extensión del XMLExporter existente para manejar múltiples recetas
- **File Handling**: Utilización de File API del navegador para lectura de archivos
- **Error Handling**: Sistema robusto de manejo de errores con feedback detallado

## Components and Interfaces

### 1. XML Import Engine

**Ubicación**: `models.js` - Nueva clase XMLImporter
```javascript
class XMLImporter {
    static async importFromFile(file)
    static parseXMLString(xmlString)
    static parseRecipeElement(recipeElement)
    static validateXMLStructure(xmlDoc)
}
```

### 2. Enhanced XML Export

**Ubicación**: `models.js` - Extensión de XMLExporter
```javascript
class XMLExporter {
    // Métodos existentes...
    static generateMultipleXML(recipes)
    static exportMultipleRecipes(recipes)
}
```

### 3. UI Components

**Ubicación**: `index.html` - Nuevos botones en header
```html
<!-- Botón de importación -->
<button id="import-xml-btn" class="btn-action">📥 Importar XML</button>
<input type="file" id="xml-file-input" accept=".xml" style="display: none;">

<!-- Botón de exportación múltiple -->
<button id="export-all-btn" class="btn-action">📤 Exportar Todas</button>
```

### 4. Application Logic

**Ubicación**: `script.js` - RecipeApp class extensions
```javascript
// Nuevos métodos
handleXMLImport()
handleMultipleExport()
showImportProgress(current, total)
showImportSummary(successful, failed, errors)
```

## Data Models

### XML Structure for Multiple Recipes

```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipes count="3" exported="2024-01-15T10:30:00.000Z">
    <recipe>
        <!-- Estructura de receta individual existente -->
    </recipe>
    <recipe>
        <!-- Otra receta... -->
    </recipe>
</recipes>
```

### Import Result Object

```javascript
{
    successful: Recipe[],
    failed: Array<{
        index: number,
        name: string,
        error: string
    }>,
    summary: {
        total: number,
        imported: number,
        errors: number
    }
}
```

## Error Handling

### Import Error Types
- **File Format Error**: Archivo no es XML válido
- **Structure Error**: XML no tiene la estructura esperada
- **Recipe Validation Error**: Datos de receta inválidos
- **Media Error**: Archivos multimedia corruptos
- **Storage Error**: Error al guardar en IndexedDB

### Error Recovery Strategy
- Importación continúa con otras recetas si una falla
- Errores específicos se reportan por receta
- Estado de la aplicación se mantiene consistente
- Rollback automático si falla completamente

## File Format Compatibility

### Single Recipe XML (Existing)
- Mantiene formato actual sin cambios
- Compatible con importación individual

### Multiple Recipe XML (New)
- Elemento raíz `<recipes>` con atributos de metadatos
- Cada receta individual mantiene estructura existente
- Backward compatible: archivos individuales siguen funcionando

## User Experience Flow

### Import Flow
1. Usuario hace clic en "📥 Importar XML"
2. Se abre selector de archivos (.xml only)
3. Usuario selecciona archivo
4. Sistema muestra progreso si son múltiples recetas
5. Sistema muestra resumen de importación
6. Vista de recetas se actualiza automáticamente

### Export Flow
1. Usuario hace clic en "📤 Exportar Todas"
2. Sistema detecta si hay filtros activos
3. Si hay filtros: pregunta si exportar filtradas o todas
4. Sistema genera XML con todas las recetas seleccionadas
5. Archivo se descarga automáticamente

## Performance Considerations

### Large File Handling
- Procesamiento asíncrono para archivos grandes
- Indicador de progreso para importaciones múltiples
- Límite razonable de recetas por archivo (ej: 1000)

### Memory Management
- Procesamiento por lotes para archivos muy grandes
- Liberación de memoria después de cada receta procesada
- Validación de tamaño de archivo antes de procesar

## Security Considerations

### File Validation
- Verificación de tipo MIME
- Validación de estructura XML antes de procesar
- Sanitización de datos de entrada
- Límites de tamaño de archivo

### Data Integrity
- Validación completa de cada receta antes de guardar
- Transacciones atómicas para importaciones múltiples
- Backup automático antes de importaciones grandes

## Implementation Strategy

### Phase 1: Basic Import
1. Crear XMLImporter básico para recetas individuales
2. Añadir botón de importación y file input
3. Implementar manejo básico de errores

### Phase 2: Multiple Recipe Support
1. Extender XMLImporter para múltiples recetas
2. Añadir indicadores de progreso
3. Implementar resumen de importación

### Phase 3: Enhanced Export
1. Extender XMLExporter para múltiples recetas
2. Añadir botón de exportación múltiple
3. Implementar selección de recetas filtradas vs todas

### Phase 4: Polish & Testing
1. Mejorar UX con animaciones y feedback
2. Pruebas exhaustivas con archivos grandes
3. Optimización de rendimiento

## Testing Strategy

### Unit Tests
- Parsing de XML individual y múltiple
- Validación de estructura XML
- Creación de objetos Recipe desde XML
- Manejo de errores específicos

### Integration Tests
- Flujo completo de importación/exportación
- Compatibilidad con archivos exportados previamente
- Manejo de archivos corruptos o inválidos

### Performance Tests
- Importación de archivos con 100+ recetas
- Exportación de toda la base de datos
- Uso de memoria con archivos grandes

## Backward Compatibility

### Existing XML Files
- Archivos XML individuales existentes siguen funcionando
- No se requiere migración de archivos exportados previamente
- Formato de exportación individual no cambia

### API Compatibility
- Métodos existentes de XMLExporter no cambian
- Nuevos métodos son extensiones, no reemplazos
- Funcionalidad existente permanece intacta