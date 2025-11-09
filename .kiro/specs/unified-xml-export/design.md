# Design Document

## Overview

This design extends the existing XMLExporter module to support unified XML export functionality for menus and shopping lists, following the same architectural pattern established for recipe exports. The solution maintains consistency across all export operations while respecting the unique data structures of each entity type.

The implementation leverages the existing XMLExporter class structure and adds two new static methods (`exportMenu` and `exportShoppingList`) that mirror the `exportRecipe` method's behavior. This approach ensures code reusability, maintainability, and a consistent user experience.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        RecipeApp                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  User Interface Layer                                 │  │
│  │  - Export buttons in modals                          │  │
│  │  - Loading states & feedback                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Export Orchestration Layer                          │  │
│  │  - exportRecipeToXML(recipeId)                       │  │
│  │  - exportMenuToXML(menuId)         ◄── NEW           │  │
│  │  - exportShoppingListToXML(listId) ◄── NEW           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      XMLExporter (models.js)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Static Export Methods                               │  │
│  │  - exportRecipe(recipe)                              │  │
│  │  - exportMenu(menu)                ◄── NEW           │  │
│  │  - exportShoppingList(list)        ◄── NEW           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  XML Generation Methods                              │  │
│  │  - generateRecipeXML(recipe)                         │  │
│  │  - generateMenuXML(menu)           ◄── NEW           │  │
│  │  - generateShoppingListXML(list)   ◄── NEW           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Shared Utilities                                    │  │
│  │  - downloadXML(xmlString, filename)                  │  │
│  │  - escapeXML(text)                 ◄── NEW           │  │
│  │  - formatXML(xmlDoc)               ◄── NEW           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

```
User clicks Export
       │
       ▼
RecipeApp.exportMenuToXML(menuId)
       │
       ├─► Show loading state (⏳ Exportando...)
       │
       ├─► Retrieve menu data (getMenuById)
       │
       ▼
XMLExporter.exportMenu(menu)
       │
       ├─► generateMenuXML(menu)
       │   │
       │   ├─► Create XML document
       │   ├─► Add metadata
       │   ├─► Add menu items
       │   └─► Serialize to string
       │
       ├─► downloadXML(xmlString, filename)
       │   │
       │   ├─► Create Blob
       │   ├─► Create download link
       │   └─► Trigger download
       │
       ▼
RecipeApp receives success/error
       │
       ├─► Show success message
       ├─► Restore button state
       └─► Log to console
```

## Components and Interfaces

### 1. XMLExporter Extension (models.js)

#### New Static Methods

```javascript
/**
 * Export menu to XML and download
 * @param {Object} menu - Menu object to export
 * @returns {string} XML string
 * @throws {ExportError} If export fails
 */
static exportMenu(menu)

/**
 * Export shopping list to XML and download
 * @param {Object} list - Shopping list object to export
 * @returns {string} XML string
 * @throws {ExportError} If export fails
 */
static exportShoppingList(list)

/**
 * Generate XML string from a menu
 * @param {Object} menu - Menu to export
 * @returns {string} XML string
 * @throws {ExportError} If generation fails
 */
static generateMenuXML(menu)

/**
 * Generate XML string from a shopping list
 * @param {Object} list - Shopping list to export
 * @returns {string} XML string
 * @throws {ExportError} If generation fails
 */
static generateShoppingListXML(list)

/**
 * Escape special XML characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
static escapeXML(text)
```

### 2. RecipeApp Extension (script.js)

#### New Export Methods

```javascript
/**
 * Export menu to XML
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 * @param {number} menuId - Menu ID to export
 */
exportMenuToXML(menuId)

/**
 * Export shopping list to XML
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
 * @param {number} listId - Shopping list ID to export
 */
exportShoppingListToXML(listId)
```

#### Modified Methods

```javascript
// Update existing exportMenu to call exportMenuToXML
exportMenu(menuId) {
    this.exportMenuToXML(menuId);
}

// Update existing exportShoppingList to call exportShoppingListToXML
exportShoppingList(listId) {
    this.exportShoppingListToXML(listId);
}
```

### 3. UI Integration

No HTML changes required. The existing export buttons in modals will trigger the new XML export methods:

- Menu options modal: Export button already exists
- Shopping list options modal: Export button already exists

## Data Models

### Menu XML Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<menu version="1.0">
  <metadata>
    <exportDate>2025-11-08T10:30:00.000Z</exportDate>
    <exportVersion>1.0</exportVersion>
  </metadata>
  <id>1699876543210</id>
  <name>Menú Semanal Noviembre</name>
  <items>
    <item>
      <id>1</id>
      <name>Lunes</name>
      <lunch>Ensalada César</lunch>
      <dinner>Pollo al horno</dinner>
      <completed>false</completed>
    </item>
    <item>
      <id>2</id>
      <name>Martes</name>
      <lunch>Pasta carbonara</lunch>
      <dinner>Pescado a la plancha</dinner>
      <completed>false</completed>
    </item>
    <!-- More items -->
  </items>
  <createdAt>2025-11-01T08:00:00.000Z</createdAt>
  <updatedAt>2025-11-08T10:30:00.000Z</updatedAt>
</menu>
```

### Shopping List XML Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<shoppingList version="1.0">
  <metadata>
    <exportDate>2025-11-08T10:30:00.000Z</exportDate>
    <exportVersion>1.0</exportVersion>
  </metadata>
  <id>1699876543210</id>
  <name>Compra Semanal</name>
  <enabled>true</enabled>
  <items>
    <item>
      <id>1</id>
      <name>Leche</name>
      <quantity>2 litros</quantity>
      <completed>false</completed>
    </item>
    <item>
      <id>2</id>
      <name>Pan</name>
      <quantity>1 barra</quantity>
      <completed>true</completed>
    </item>
    <!-- More items -->
  </items>
  <createdAt>2025-11-01T08:00:00.000Z</createdAt>
  <updatedAt>2025-11-08T10:30:00.000Z</updatedAt>
</shoppingList>
```

### Menu Data Model (JavaScript)

```javascript
{
  id: 1699876543210,           // number (timestamp)
  name: "Menú Semanal",        // string
  items: [                     // array
    {
      id: 1,                   // number
      name: "Lunes",           // string (day name)
      lunch: "Ensalada",       // string (recipe name or category)
      dinner: "Pollo",         // string (recipe name or category)
      completed: false         // boolean (inherited, not used)
    }
  ],
  createdAt: "2025-11-01T...", // ISO 8601 string
  updatedAt: "2025-11-08T..."  // ISO 8601 string
}
```

### Shopping List Data Model (JavaScript)

```javascript
{
  id: 1699876543210,           // number (timestamp)
  name: "Compra Semanal",      // string
  enabled: true,               // boolean
  items: [                     // array
    {
      id: 1,                   // number
      name: "Leche",           // string
      quantity: "2 litros",    // string
      completed: false         // boolean
    }
  ],
  createdAt: "2025-11-01T...", // ISO 8601 string
  updatedAt: "2025-11-08T..."  // ISO 8601 string
}
```

## Error Handling

### Error Types

The implementation will use the existing `ExportError` class with appropriate error codes:

```javascript
// Existing error codes in ExportError
INVALID_DATA: 'INVALID_DATA'
GENERATION_FAILED: 'GENERATION_FAILED'
DOWNLOAD_FAILED: 'DOWNLOAD_FAILED'
```

### Error Scenarios

| Scenario | Error Type | User Message | Recovery |
|----------|-----------|--------------|----------|
| Menu not found | INVALID_DATA | "Error: Menú no encontrado" | Restore button, log error |
| List not found | INVALID_DATA | "Error: Lista no encontrada" | Restore button, log error |
| XML generation fails | GENERATION_FAILED | "Error al generar XML: [details]" | Restore button, log error |
| Download fails | DOWNLOAD_FAILED | "Error al descargar archivo: [details]" | Restore button, log error |
| Invalid menu data | INVALID_DATA | "Error: Datos de menú inválidos" | Restore button, log error |
| Invalid list data | INVALID_DATA | "Error: Datos de lista inválidos" | Restore button, log error |

### Error Handling Pattern

```javascript
try {
    // Show loading state
    button.disabled = true;
    button.textContent = '⏳ Exportando...';
    
    // Validate data
    if (!entity) {
        throw new ExportError('Entity not found', ExportError.INVALID_DATA);
    }
    
    // Export
    XMLExporter.exportEntity(entity);
    
    // Show success
    this.showSuccess('¡Exportado exitosamente!');
    
} catch (error) {
    console.error('Export error:', error);
    this.showError('Error al exportar: ' + error.message);
    
} finally {
    // Restore button state
    button.disabled = false;
    button.textContent = originalText;
}
```

## Testing Strategy

### Unit Tests (Future Implementation)

```javascript
describe('XMLExporter.generateMenuXML', () => {
    it('should generate valid XML for menu with items', () => {
        const menu = createTestMenu();
        const xml = XMLExporter.generateMenuXML(menu);
        expect(xml).toContain('<?xml version="1.0"');
        expect(xml).toContain('<menu');
        expect(xml).toContain('<name>Test Menu</name>');
    });
    
    it('should escape special characters in menu names', () => {
        const menu = { name: 'Menu & <Special>' };
        const xml = XMLExporter.generateMenuXML(menu);
        expect(xml).toContain('&amp;');
        expect(xml).toContain('&lt;');
    });
    
    it('should throw error for invalid menu', () => {
        expect(() => XMLExporter.generateMenuXML(null))
            .toThrow(ExportError);
    });
});

describe('XMLExporter.generateShoppingListXML', () => {
    it('should generate valid XML for list with items', () => {
        const list = createTestList();
        const xml = XMLExporter.generateShoppingListXML(list);
        expect(xml).toContain('<?xml version="1.0"');
        expect(xml).toContain('<shoppingList');
    });
    
    it('should include completed status for items', () => {
        const list = createTestListWithCompletedItems();
        const xml = XMLExporter.generateShoppingListXML(list);
        expect(xml).toContain('<completed>true</completed>');
    });
});
```

### Manual Testing Checklist

#### Menu Export Tests
- [ ] Export menu with multiple items
- [ ] Export menu with empty items
- [ ] Export menu with special characters in name
- [ ] Export menu with special characters in item names
- [ ] Verify XML file downloads correctly
- [ ] Verify filename format: `menu-[name]-[date].xml`
- [ ] Verify success message appears
- [ ] Verify button state restores after export
- [ ] Test error handling with invalid menu ID
- [ ] Verify console logging

#### Shopping List Export Tests
- [ ] Export list with multiple items
- [ ] Export list with completed items
- [ ] Export list with empty items
- [ ] Export list with special characters in name
- [ ] Export list with special characters in item names
- [ ] Verify XML file downloads correctly
- [ ] Verify filename format: `lista-compra-[name]-[date].xml`
- [ ] Verify success message appears
- [ ] Verify button state restores after export
- [ ] Test error handling with invalid list ID
- [ ] Verify console logging

#### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

#### XML Validation
- [ ] Validate XML structure with online validator
- [ ] Verify UTF-8 encoding
- [ ] Verify special characters are properly escaped
- [ ] Verify XML is well-formed
- [ ] Verify all required fields are present

## Implementation Notes

### Code Organization

1. **XMLExporter methods** will be added to `models.js` after the existing `exportRecipe` method
2. **RecipeApp methods** will be added to `script.js` near the existing `exportRecipeToXML` method
3. **Existing export methods** will be updated to call the new XML export methods

### Filename Format

Following the pattern established for recipes:

- **Menus**: `menu_[sanitized-name]_[id-prefix].xml`
  - Example: `menu_semanal_noviembre_16998765.xml`
  
- **Shopping Lists**: `lista_compra_[sanitized-name]_[id-prefix].xml`
  - Example: `lista_compra_semanal_16998765.xml`

### Character Sanitization

```javascript
// Sanitize name for filename
const sanitizedName = name
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();

// Get ID prefix (first 8 characters)
const idPrefix = id.toString().substring(0, 8);

// Construct filename
const filename = `menu_${sanitizedName}_${idPrefix}.xml`;
```

### XML Escaping

Special characters that need escaping in XML:
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&apos;`

The browser's native XML serializer handles this automatically, but we'll add a utility method for manual escaping if needed.

### Metadata Section

All exported XML files will include a metadata section:

```xml
<metadata>
  <exportDate>2025-11-08T10:30:00.000Z</exportDate>
  <exportVersion>1.0</exportVersion>
</metadata>
```

This enables:
- Tracking when files were exported
- Version management for future schema changes
- Compatibility checking during import

### Future Import Functionality

While this spec focuses on export, the XML structure is designed to support future import functionality:

- All IDs are preserved
- Timestamps are in ISO 8601 format
- Structure mirrors the internal data model
- Version attribute enables schema migration

## Performance Considerations

### Memory Usage

- XML generation happens in-memory
- For typical menus (7-14 items): ~2-5 KB
- For typical shopping lists (10-50 items): ~3-10 KB
- No performance concerns for typical use cases

### Browser Compatibility

- Uses standard DOM APIs (document.implementation.createDocument)
- Uses standard XMLSerializer
- Uses standard Blob and URL.createObjectURL
- Compatible with all modern browsers (Chrome, Firefox, Safari, Edge)

### Optimization Opportunities

- Reuse XML document creation logic across all export types
- Cache sanitized names if exporting multiple times
- Consider streaming for very large lists (future enhancement)

## Security Considerations

### XSS Prevention

- All user input is properly escaped in XML
- No eval() or innerHTML usage
- XML serializer handles escaping automatically

### Data Privacy

- Exports happen client-side only
- No data sent to external servers
- Files saved directly to user's device

### Input Validation

- Validate entity exists before export
- Validate entity has required fields
- Throw appropriate errors for invalid data

## Migration Path

### Phase 1: Add XML Export (This Spec)
- Add new XML export methods
- Keep existing .txt export as fallback
- Update UI to use XML export

### Phase 2: Deprecate .txt Export (Future)
- Remove .txt export code
- Update documentation

### Phase 3: Add XML Import (Future)
- Implement XML parsing
- Add import UI
- Support both old .txt and new .xml formats

## Dependencies

### Existing Code
- `XMLExporter` class in models.js
- `ExportError` class in models.js
- `RecipeApp.exportRecipeToXML()` method (as reference)
- `RecipeApp.showSuccess()` and `showError()` methods

### Browser APIs
- `document.implementation.createDocument()`
- `XMLSerializer`
- `Blob`
- `URL.createObjectURL()`
- `localStorage` (for retrieving data)

### No External Libraries Required
All functionality uses native browser APIs.
