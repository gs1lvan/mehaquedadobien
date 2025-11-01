# Implementation Plan

- [x] 1. Modify QR generation to use XML format





  - [x] 1.1 Update prepareRecipeDataForQR() to generate XML instead of JSON


    - Remove JSON generation logic (both full and compact modes)
    - Create lightweight recipe copy excluding images and videos
    - Call XMLExporter.generateXML() to generate XML string
    - Return XML string directly
    - _Requirements: 1.1, 1.3, 1.5_

  - [x] 1.2 Update renderDetailQRCode() to handle XML data


    - Update call to prepareRecipeDataForQR() expecting XML return
    - Add size estimation display showing QR module dimensions
    - Add warning message if XML exceeds 1500 characters after Base64 encoding
    - Update info text to show "Formato XML" instead of data size
    - _Requirements: 1.1, 6.1, 6.2, 6.3_

  - [x] 1.3 Remove generateSmallQR() function


    - Delete the entire generateSmallQR() method as it's no longer needed
    - Remove any references to this function in the codebase
    - _Requirements: 1.1_

  - [ ]* 1.4 Add size validation and warnings
    - Create helper function estimateQRSize(xmlString) to calculate QR version needed
    - Show warning in console if QR will be larger than Version 7 (45×45)
    - Add user-facing warning in UI if recipe is too large for optimal QR
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 2. Implement XML import functionality
  - [ ] 2.1 Create importRecipeFromXML() function
    - Create new async function in script.js after importRecipeFromQR()
    - Call XMLImporter.parseXMLString() to parse XML
    - Handle parsing result and extract first recipe from successful array
    - Show import modal with parsed recipe data
    - Add comprehensive error handling with descriptive messages
    - Log all steps with [QR Import] prefix for debugging
    - _Requirements: 3.1, 3.2, 5.4, 5.5_

  - [ ] 2.2 Create saveImportedRecipe() helper function
    - Extract save logic from importRecipeFromQR() into reusable function
    - Handle both Recipe objects (from XML) and plain objects (from JSON)
    - Generate new unique ID using Date.now()
    - Set createdAt and updatedAt timestamps
    - Save to localStorage
    - Trigger app reload and show imported recipe
    - _Requirements: 3.3, 3.4, 3.5_

- [ ] 3. Add format detection to import system
  - [ ] 3.1 Update checkForRecipeImport() with format detection
    - Add XML detection logic checking for '<?xml' or '<recipe' at start
    - Route XML data to importRecipeFromXML()
    - Route JSON data to existing importRecipeFromQR() for backward compatibility
    - Add detailed logging for detected format
    - Maintain URL hash cleanup after processing
    - _Requirements: 2.1, 2.2, 2.3, 4.1, 4.2_

  - [ ] 3.2 Enhance error handling in checkForRecipeImport()
    - Add specific error messages for Base64 decode failures
    - Add specific error messages for XML parsing failures
    - Add specific error messages for JSON parsing failures
    - Catch and handle all error types gracefully
    - Show user-friendly notifications for each error type
    - _Requirements: 2.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 4. Update import modal for compatibility
  - [ ] 4.1 Modify showRecipeImportModal() to handle both formats
    - Add data normalization at the start of the function
    - Handle Recipe objects from XML (with all fields)
    - Handle plain objects from JSON (with limited fields)
    - Safely access optional fields with fallbacks
    - Update display to show available data gracefully
    - _Requirements: 3.3, 4.3_

  - [ ] 4.2 Update confirm button handler in modal
    - Replace direct save logic with call to saveImportedRecipe()
    - Pass complete recipeData object to helper function
    - Ensure modal closes after confirmation
    - _Requirements: 3.4, 3.5_

- [ ] 5. Maintain backward compatibility with JSON QR codes
  - [ ] 5.1 Verify expandRecipeData() function works correctly
    - Test with compact JSON format (n, c, i, p, t keys)
    - Test with full JSON format (name, category, ingredients, etc.)
    - Ensure proper conversion of pipe-separated ingredients
    - _Requirements: 4.1, 4.2, 4.4_

  - [ ] 5.2 Test legacy JSON QR import flow
    - Create test QR with old JSON compact format
    - Verify detection routes to JSON handler
    - Verify import completes successfully
    - Verify no data loss occurs
    - _Requirements: 4.1, 4.2, 4.3, 4.5_

- [ ] 6. Update documentation files
  - [ ] 6.1 Update QR_IMPORT_DOCUMENTATION.md
    - Replace JSON examples with XML examples
    - Document XML structure used in QR codes
    - Add section explaining format detection
    - Add examples of both XML and JSON formats
    - Update size comparison table with XML data
    - _Requirements: 7.1, 7.3, 7.4_

  - [ ] 6.2 Update QR_IMPLEMENTATION_SUMMARY.md
    - Add section documenting XML migration
    - Update flow diagrams to show XML processing
    - Document backward compatibility with JSON
    - Update technical details section
    - _Requirements: 7.2, 7.3_

  - [ ] 6.3 Update test-qr-import.html test page
    - Add XML format test example
    - Keep JSON format test for compatibility testing
    - Add format detection demonstration
    - Update instructions to cover both formats
    - _Requirements: 7.5_

  - [ ]* 6.4 Update QR_SIZE_GUIDE.md
    - Add XML size comparisons
    - Update recommendations for XML format
    - Document size optimization strategies
    - _Requirements: 7.3_

- [ ] 7. Testing and validation
  - [ ] 7.1 Test XML QR generation
    - Generate QR from simple recipe (3 ingredients, no sequences)
    - Generate QR from complex recipe (10+ ingredients, with sequences)
    - Verify XML is valid and well-formed
    - Verify images and videos are excluded
    - Check QR size is reasonable (< 45×45 modules for typical recipes)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ] 7.2 Test XML QR import
    - Scan/load QR with XML data
    - Verify format detection identifies XML correctly
    - Verify import modal shows correct data
    - Confirm import and verify recipe saved correctly
    - Check all fields imported properly (ingredients, sequences, appliances)
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 7.3 Test backward compatibility with JSON QR
    - Create old-style JSON QR (compact format)
    - Verify format detection identifies JSON correctly
    - Verify import completes successfully
    - Verify no errors or warnings appear
    - Confirm recipe data matches original
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ] 7.4 Test error handling scenarios
    - Test with invalid Base64 data
    - Test with malformed XML
    - Test with malformed JSON
    - Test with missing required fields
    - Verify appropriate error messages shown for each case
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 7.5 Cross-browser and device testing
    - Test on Chrome desktop
    - Test on Firefox desktop
    - Test on Safari desktop
    - Test on Chrome mobile (Android)
    - Test on Safari mobile (iOS)
    - Verify QR scanning works on all platforms
