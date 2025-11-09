# Implementation Plan

- [x] 1. Extend XMLImporter class with menu import functionality


  - Add `parseMenuXML(xmlString)` static method to parse menu XML structure
  - Add `importMenuFromFile(file)` static method to handle file reading and parsing
  - Validate XML root element is `<menu>`
  - Extract all menu fields: id, name, items (id, name, lunch, dinner, completed), createdAt, updatedAt
  - Handle optional metadata section
  - Parse boolean values correctly (completed)
  - _Requirements: 1.1, 1.2, 3.1, 3.3, 3.4, 4.1, 4.2, 4.3, 4.5, 6.1, 6.3, 6.4_



- [ ] 2. Extend XMLImporter class with shopping list import functionality
  - Add `parseShoppingListXML(xmlString)` static method to parse list XML structure
  - Add `importShoppingListFromFile(file)` static method to handle file reading and parsing
  - Validate XML root element is `<shoppingList>`
  - Extract all list fields: id, name, enabled, items (id, name, quantity, completed), createdAt, updatedAt
  - Handle optional metadata section


  - Parse boolean values correctly (enabled, completed)
  - _Requirements: 2.1, 2.2, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.5, 6.2, 6.3, 6.4, 6.5_

- [ ] 3. Update RecipeApp menu import to support XML
  - Modify `handleImportMenu(e)` method to detect file format (XML vs TXT)
  - Add XML import path using XMLImporter.importMenuFromFile()
  - Implement ID conflict detection and resolution (generate new ID if exists)
  - Update timestamps (createdAt, updatedAt) to import time


  - Add loading state and user feedback
  - Preserve existing TXT import functionality for backward compatibility
  - Reset file input after import (success or error)
  - _Requirements: 1.3, 1.4, 1.5, 5.1, 5.4, 7.1, 7.2, 7.3, 8.1, 8.2, 8.3, 8.5_

- [ ] 4. Update RecipeApp shopping list import to support XML
  - Modify `handleImportShoppingList(e)` method to detect file format (XML vs TXT)
  - Add XML import path using XMLImporter.importShoppingListFromFile()

  - Implement ID conflict detection and resolution (generate new ID if exists)
  - Update timestamps (createdAt, updatedAt) to import time
  - Add loading state and user feedback
  - Preserve existing TXT import functionality for backward compatibility
  - Reset file input after import (success or error)
  - _Requirements: 2.3, 2.4, 2.5, 5.2, 5.4, 7.1, 7.2, 7.3, 8.1, 8.2, 8.4, 8.5_

- [x] 5. Implement comprehensive error handling

  - Add try-catch blocks in all import methods
  - Use ImportError class for consistent error reporting
  - Validate file type, size, and structure
  - Show user-friendly error messages for common issues
  - Log detailed errors to console for debugging
  - Ensure file input is reset even on error
  - _Requirements: 1.5, 2.5, 4.4, 7.4, 8.4_

- [x] 6. Test menu XML import functionality

  - Test importing menu with multiple items
  - Test importing menu with special characters in names
  - Test ID conflict resolution (import menu with existing ID)
  - Test timestamp updates (verify createdAt/updatedAt are set to import time)
  - Test error handling with invalid XML
  - Test backward compatibility with TXT files
  - Verify success messages and UI updates
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.1, 5.4, 5.5, 6.1, 7.1, 7.2, 7.3_



- [ ] 7. Test shopping list XML import functionality
  - Test importing list with multiple items and completed states
  - Test importing list with enabled=false
  - Test ID conflict resolution (import list with existing ID)
  - Test timestamp updates (verify createdAt/updatedAt are set to import time)
  - Test error handling with invalid XML
  - Test backward compatibility with TXT files
  - Verify success messages and UI updates
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.2, 5.4, 5.5, 6.2, 7.1, 7.2, 7.3_

- [ ] 8. Validate export/import cycle completeness
  - Export a menu to XML and import it back (verify data integrity)
  - Export a shopping list to XML and import it back (verify data integrity)
  - Verify all fields are preserved (except timestamps which should update)
  - Verify IDs are handled correctly (regenerated if conflict)
  - Test with menus/lists containing special characters
  - Test with empty menus/lists
  - Document any known limitations
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
