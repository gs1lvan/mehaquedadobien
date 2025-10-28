# Implementation Plan

- [x] 1. Update data model validation to support hospital category


  - Add "hospital" to the validCategories array in Recipe class validation
  - Ensure backward compatibility with existing recipes
  - _Requirements: 1.4_



- [ ] 2. Add hospital category option to recipe form
  - [ ] 2.1 Add hospital option to category selector in HTML
    - Insert new `<option value="hospital">🏥 Hospital</option>` in recipe form


    - Position it logically within existing category options
    - _Requirements: 1.1, 1.2_
  
  - [x] 2.2 Update form validation to handle hospital category


    - Verify hospital category is properly saved when form is submitted
    - Test category selection and form submission flow
    - _Requirements: 1.4_



- [ ] 3. Add hospital filter chip to main interface
  - [ ] 3.1 Add hospital filter chip to HTML
    - Insert new filter chip button with hospital category in filter bar


    - Use consistent styling and structure with existing chips
    - _Requirements: 2.1_
  


  - [ ] 3.2 Verify filter functionality works with new category
    - Test that existing filter logic correctly handles hospital category
    - Ensure multiple filter selection works with hospital category
    - _Requirements: 2.2, 2.3, 2.4, 2.5_



- [ ] 4. Update category display and labeling
  - [x] 4.1 Add hospital category to getCategoryLabel function

    - Add mapping for "hospital" category to "🏥 Hospital" label
    - Ensure consistent display across all UI components
    - _Requirements: 3.1, 3.4_
  
  - [x] 4.2 Update PDF export category labels

    - Add hospital category to categoryLabels object in PDFExporter
    - Test PDF generation with hospital category recipes
    - _Requirements: 3.2_



- [ ] 5. Test complete hospital category functionality
  - [ ] 5.1 Test recipe creation with hospital category
    - Create new recipe with hospital category
    - Verify category is saved and displayed correctly
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [ ] 5.2 Test filtering by hospital category
    - Apply hospital filter and verify only hospital recipes show
    - Test filter combination with other categories
    - Test filter deactivation returns to full list
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ] 5.3 Test recipe editing and duplication with hospital category
    - Edit existing recipe to change category to hospital
    - Duplicate recipe with hospital category and verify category is preserved
    - _Requirements: 1.3, 3.5_
  
  - [ ] 5.4 Test export functionality with hospital category
    - Export hospital category recipe to XML and verify category field
    - Export hospital category recipe to PDF and verify category display
    - _Requirements: 3.2, 3.3_