# Design Document

## Overview

This design extends the existing XMLImporter module to support unified XML import functionality for menus and shopping lists, following the same architectural pattern established for recipe imports. The solution maintains consistency across all import operations while respecting the unique data structures of each entity type.

The implementation leverages the existing XMLImporter class structure and adds two new static methods (`importMenuFromFile` and `importShoppingListFromFile`) that mirror the `importFromFile` method's behavior for recipes. This approach ensures code reusability, maintainability, and a consistent user experience.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        RecipeApp                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  User Interface Layer                                 │  │
│  │  - Import buttons in views                           │  │
│  │  - File input handlers                               │  │
│  │  - Loading states & feedback                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Import Orchestration Layer                          │  │
│  │  - handleImportMenu(e)             ◄── UPDATED       │  │
│  │  - handleImportShoppingList(e)     ◄── UPDATED       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      XMLImporter (models.js)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Static Import Methods                               │  │
│  │  - importFromFile(file)                              │  │
│  │  - importMenuFromFile(file)        ◄── NEW           │  │
│  │  - importShoppingListFromFile(file)◄── NEW           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  XML Parsing Methods                                 │  │
│  │  - parseXMLString(xmlString)                         │  │
│  │  - parseMenuXML(xmlString)         ◄── NEW           │  │
│  │  - parseShoppingListXML(xmlString) ◄── NEW           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Shared Utilities                                    │  │
│  │  - validateFile(file)                                │  │
│  │  - readFileContent(file)                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

```
User selects XML file
       │
       ▼
RecipeApp.handleImportMenu(e)
       │
       ├─► Show loading state
       │
       ├─► Get file from input
       │
       ▼
XMLImporter.importMenuFromFile(file)
       │
       ├─► validateFile(file)
       │   │
       │   ├─► Check file type (.xml)
       │   ├─► Check file size
       │   └─► Check minimum size
       │
       ├─► readFileContent(file)
       │   │
       │   └─► Read as UTF-8 text
       │
       ├─► parseMenuXML(xmlString)
       │   │
       │   ├─► Parse XML with DOMParser
       │   ├─► Validate root element
       │   ├─► Extract menu data
       │   ├─► Extract items
       │   └─► Return menu object
       │
       ▼
RecipeApp receives menu object
       │
       ├─► Check for ID conflicts
       ├─► Generate new ID if needed
       ├─► Save menu to storage
       ├─► Render menus view
       ├─► Show success message
       └─► Reset file input
```

## Components and Interfaces

### 1. XMLImporter Extension (models.js)

#### New Static Methods

```javascript
/**
 * Import menu from XML file
 * @param {File} file - XML file to import
 * @returns {Promise<Object>} Parsed menu object
 * @throws {ImportError} If import fails
 */
static async importMenuFromFile(file)

/**
 * Import shopping list from XML file
 * @param {File} file - XML file to import
 * @returns {Promise<Object>} Parsed shopping list object
 * @throws {ImportError} If import fails
 */
static async importShoppingListFromFile(file)

/**
 * Parse menu XML string
 * @param {string} xmlString - XML content as string
 * @returns {Object} Parsed menu object
 * @throws {ImportError} If parsing fails
 */
static parseMenuXML(xmlString)

/**
 * Parse shopping list XML string
 * @param {string} xmlString - XML content as string
 * @returns {Object} Parsed shopping list object
 * @throws {ImportError} If parsing fails
 */
static parseShoppingListXML(xmlString)
```

### 2. RecipeApp Updates (script.js)

#### Modified Methods

```javascript
/**
 * Handle menu import from file
 * Updated to support both XML and TXT formats
 * @param {Event} e - File input change event
 */
async handleImportMenu(e)

/**
 * Handle shopping list import from file
 * Updated to support both XML and TXT formats
 * @param {Event} e - File input change event
 */
async handleImportShoppingList(e)
```

### 3. UI Integration

No HTML changes required. The existing import buttons and file inputs will work with the new XML import functionality:

- Menu import button: Already exists in menus view
- Shopping list import button: Already exists in shopping lists view
- File inputs: Already configured to accept files

## Data Models

### Menu XML Structure (Input)

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
  </items>
  <createdAt>2025-11-01T08:00:00.000Z</createdAt>
  <updatedAt>2025-11-08T10:30:00.000Z</updatedAt>
</menu>
```

### Shopping List XML Structure (Input)

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
  </items>
  <createdAt>2025-11-01T08:00:00.000Z</createdAt>
  <updatedAt>2025-11-08T10:30:00.000Z</updatedAt>
</shoppingList>
```

### Menu Object (Output)

```javascript
{
  id: 1699876543210,           // number (may be regenerated if conflict)
  name: "Menú Semanal",        // string
  items: [                     // array
    {
      id: 1,                   // number
      name: "Lunes",           // string
      lunch: "Ensalada",       // string
      dinner: "Pollo",         // string
      completed: false         // boolean
    }
  ],
  createdAt: "2025-11-01T...", // ISO 8601 string (updated to import time)
  updatedAt: "2025-11-08T..."  // ISO 8601 string (updated to import time)
}
```

### Shopping List Object (Output)

```javascript
{
  id: 1699876543210,           // number (may be regenerated if conflict)
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
  createdAt: "2025-11-01T...", // ISO 8601 string (updated to import time)
  updatedAt: "2025-11-08T..."  // ISO 8601 string (updated to import time)
}
```

## Error Handling

### Error Types

The implementation will use the existing `ImportError` class with appropriate error codes:

```javascript
// Existing error codes in ImportError
INVALID_FILE: 'INVALID_FILE'
PARSING_FAILED: 'PARSING_FAILED'
INVALID_DATA: 'INVALID_DATA'
```

### Error Scenarios

| Scenario | Error Type | User Message | Recovery |
|----------|-----------|--------------|----------|
| No file selected | INVALID_FILE | "No se seleccionó ningún archivo" | Prompt user to select file |
| Invalid file type | INVALID_FILE | "El archivo debe ser XML o TXT" | Prompt user to select correct file |
| File too large | INVALID_FILE | "Archivo demasiado grande (max 50MB)" | Prompt user to select smaller file |
| Empty file | INVALID_FILE | "El archivo está vacío" | Prompt user to select valid file |
| Invalid XML structure | PARSING_FAILED | "Error al parsear XML: estructura inválida" | Show error, reset input |
| Missing required fields | INVALID_DATA | "Faltan campos requeridos en el XML" | Show error, reset input |
| Invalid root element | PARSING_FAILED | "Tipo de archivo XML no reconocido" | Show error, reset input |

### Error Handling Pattern

```javascript
try {
    // Show loading state
    this.showToast('Importando...', 'info');
    
    // Get file
    const file = e.target.files[0];
    if (!file) return;
    
    // Detect format
    const isXML = file.name.toLowerCase().endsWith('.xml');
    
    if (isXML) {
        // Import from XML
        const menu = await XMLImporter.importMenuFromFile(file);
        
        // Handle ID conflicts
        const existingMenu = this.getMenuById(menu.id);
        if (existingMenu) {
            menu.id = Date.now();
        }
        
        // Update timestamps
        menu.createdAt = new Date().toISOString();
        menu.updatedAt = new Date().toISOString();
        
        // Save and render
        this.saveMenu(menu);
        this.renderMenus();
        
        this.showToast(`Menú "${menu.name}" importado correctamente`, 'success');
    } else {
        // Use legacy TXT import
        this.importMenuFromTXT(file);
    }
    
} catch (error) {
    console.error('Import error:', error);
    this.showToast('Error al importar: ' + error.message, 'error');
    
} finally {
    // Reset file input
    e.target.value = '';
}
```

## Testing Strategy

### Manual Testing Checklist

#### Menu Import Tests
- [ ] Import menu XML with multiple items
- [ ] Import menu XML with empty items
- [ ] Import menu XML with special characters
- [ ] Import menu with existing ID (verify new ID generated)
- [ ] Import invalid XML (verify error message)
- [ ] Import TXT file (verify legacy import still works)
- [ ] Import very large menu (100+ items)
- [ ] Verify timestamps are updated to import time
- [ ] Verify success message appears
- [ ] Verify menu appears in list after import

#### Shopping List Import Tests
- [ ] Import list XML with multiple items
- [ ] Import list XML with completed items
- [ ] Import list XML with enabled=false
- [ ] Import list with existing ID (verify new ID generated)
- [ ] Import invalid XML (verify error message)
- [ ] Import TXT file (verify legacy import still works)
- [ ] Import very large list (200+ items)
- [ ] Verify timestamps are updated to import time
- [ ] Verify success message appears
- [ ] Verify list appears in view after import

#### Error Handling Tests
- [ ] Try to import without selecting file
- [ ] Try to import non-XML/TXT file
- [ ] Try to import corrupted XML
- [ ] Try to import XML with missing required fields
- [ ] Try to import XML with wrong root element
- [ ] Verify error messages are user-friendly
- [ ] Verify file input is reset after error

#### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

## Implementation Notes

### Code Organization

1. **XMLImporter methods** will be added to `models.js` after the existing recipe import methods
2. **RecipeApp methods** will be updated in `script.js` to detect file format and route to appropriate importer
3. **Existing TXT import** will be preserved for backward compatibility

### File Format Detection

```javascript
// Detect file format by extension
const isXML = file.name.toLowerCase().endsWith('.xml');
const isTXT = file.name.toLowerCase().endsWith('.txt');

if (isXML) {
    // Use XML importer
    await XMLImporter.importMenuFromFile(file);
} else if (isTXT) {
    // Use legacy TXT importer
    this.importMenuFromTXT(file);
} else {
    throw new Error('Formato de archivo no soportado');
}
```

### ID Conflict Resolution

```javascript
// Check for ID conflicts
const existingMenu = this.getMenuById(menu.id);
if (existingMenu) {
    console.log(`Menu ID ${menu.id} already exists, generating new ID`);
    menu.id = Date.now();
    this.showToast('Se generó un nuevo ID para evitar conflictos', 'info');
}
```

### Timestamp Updates

```javascript
// Update timestamps to import time
const now = new Date().toISOString();
menu.createdAt = now;
menu.updatedAt = now;
```

### Boolean Parsing

```javascript
// Parse boolean values from XML text content
const enabled = element.textContent === 'true';
const completed = element.textContent === 'true';
```

### Metadata Handling

The metadata section is informational only and not used during import:

```javascript
// Metadata is optional and ignored during import
const metadataElement = xmlDoc.querySelector('metadata');
if (metadataElement) {
    console.log('Import metadata:', {
        exportDate: metadataElement.querySelector('exportDate')?.textContent,
        exportVersion: metadataElement.querySelector('exportVersion')?.textContent
    });
}
```

## Performance Considerations

### Memory Usage

- XML parsing happens in-memory using DOMParser
- For typical menus (7-14 items): ~2-5 KB
- For typical shopping lists (10-50 items): ~3-10 KB
- Large files (50MB limit) may take a few seconds to parse

### Browser Compatibility

- Uses standard DOMParser API
- Uses standard FileReader API
- Compatible with all modern browsers (Chrome, Firefox, Safari, Edge)

### Optimization Opportunities

- Reuse XML parsing logic across all import types
- Cache parsed XML document if multiple operations needed
- Consider streaming for very large files (future enhancement)

## Security Considerations

### XSS Prevention

- All XML content is parsed with DOMParser (safe)
- No eval() or innerHTML usage
- Text content extracted with textContent (safe)

### Data Validation

- Validate file type before processing
- Validate file size (50MB limit)
- Validate XML structure before creating objects
- Validate required fields are present

### Input Sanitization

- All text values are extracted safely with textContent
- No direct HTML injection
- IDs are validated as numbers

## Migration Path

### Phase 1: Add XML Import (This Spec)
- Add new XML import methods
- Keep existing TXT import as fallback
- Auto-detect file format

### Phase 2: Encourage XML Usage (Future)
- Update UI to recommend XML format
- Add export/import cycle documentation

### Phase 3: Deprecate TXT Import (Future)
- Mark TXT import as legacy
- Eventually remove TXT import code

## Dependencies

### Existing Code
- `XMLImporter` class in models.js
- `ImportError` class in models.js
- `RecipeApp.handleImportMenu()` method (to be updated)
- `RecipeApp.handleImportShoppingList()` method (to be updated)
- `RecipeApp.showToast()` method

### Browser APIs
- `DOMParser`
- `FileReader`
- `querySelector` / `querySelectorAll`
- `localStorage` (for saving data)

### No External Libraries Required
All functionality uses native browser APIs.
