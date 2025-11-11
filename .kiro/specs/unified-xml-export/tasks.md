# Implementation Plan

- [x] 1. Extend XMLExporter class with menu export functionality


  - Add `generateMenuXML(menu)` static method to create XML structure for menus
  - Add `exportMenu(menu)` static method to generate and download menu XML
  - Include metadata section with export date and version
  - Ensure proper XML escaping for menu names and item values
  - _Requirements: 1.1, 1.2, 3.1, 3.3, 3.4, 3.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 2. Extend XMLExporter class with shopping list export functionality


  - Add `generateShoppingListXML(list)` static method to create XML structure for shopping lists
  - Add `exportShoppingList(list)` static method to generate and download list XML
  - Include enabled status and completed status for items
  - Include metadata section with export date and version
  - _Requirements: 2.1, 2.2, 3.2, 3.3, 3.4, 3.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 3. Add XML export methods to RecipeApp for menus


  - Implement `exportMenuToXML(menuId)` method in RecipeApp class
  - Add loading state management (disable button, show "⏳ Exportando...")
  - Add error handling with try-catch and ExportError
  - Add success/error message display using existing toast methods
  - Add console logging for export events
  - Update existing `exportMenu(menuId)` method to call `exportMenuToXML`
  - _Requirements: 1.1, 1.3, 1.4, 1.5, 4.1, 4.2, 4.3, 4.5_

- [x] 4. Add XML export methods to RecipeApp for shopping lists


  - Implement `exportShoppingListToXML(listId)` method in RecipeApp class
  - Add loading state management (disable button, show "⏳ Exportando...")
  - Add error handling with try-catch and ExportError
  - Add success/error message display using existing toast methods
  - Add console logging for export events
  - Update existing `exportShoppingList(listId)` method to call `exportShoppingListToXML`
  - _Requirements: 2.1, 2.3, 2.4, 2.5, 4.1, 4.2, 4.3, 4.5_

- [x] 5. Implement consistent filename generation

  - Create filename format: `menu_[sanitized-name]_[id-prefix].xml` for menus
  - Create filename format: `lista_compra_[sanitized-name]_[id-prefix].xml` for shopping lists
  - Sanitize names by replacing non-alphanumeric characters with underscores
  - Use first 8 characters of ID as prefix
  - _Requirements: 1.3, 2.3, 4.4, 6.2_

- [x] 6. Ensure XML structure includes all fields for future import compatibility

  - Verify menu XML includes: id, name, items (with id, name,lunch, dinner, completed), createdAt, updatedAt
  - Verify shopping list XML includes: id, name, enabled, items (with id, name, quantity, completed), createdAt, updatedAt
  - Add version attribute to root elements for schema versioning
  - Ensure timestamps are in ISO 8601 format
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_ 

- [x] 7. Validate and test menu export functionality


  - Test exporting menu with multiple items
  - Test exporting menu with special characters in names
  - Test error handling with invalid menu ID
  - Verify XML file downloads with correct filename
  - Verify success message appears
  - Verify button state restores correctly
  - Validate generated XML structure with online validator
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Validate and test shopping list export functionality


  - Test exporting list with multiple items including completed items
  - Test exporting list with special characters in names
  - Test error handling with invalid list ID
  - Verify XML file downloads with correct filename
  - Verify success message appears
  - Verify button state restores correctly
  - Validate generated XML structure with online validator
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_
