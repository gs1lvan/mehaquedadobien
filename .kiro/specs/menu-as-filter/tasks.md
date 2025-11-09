# Implementation Plan

- [x] 1. Add isFilter property to menu data model



  - Add `isFilter: false` as default property when creating new menus
  - Migrate existing menus to include isFilter property (default false)
  - Update menu creation and editing to preserve isFilter property


  - _Requirements: 1.3, 6.1, 6.2, 6.4_

- [ ] 2. Add menu filter section to home page HTML
  - Create new `<section id="menu-filter-bar">` below category filters
  - Add container `<div id="menu-filter-chips">` for filter chips


  - Add CSS styles for menu filter section
  - Hide section by default (will show when filters exist)
  - _Requirements: 2.1, 2.2, 2.5_

- [x] 3. Add toggle filter button to menu cards


  - Add button HTML in menu card template
  - Add CSS styles for button (normal and active states)
  - Position button below menu items
  - Add data-menu-id attribute for event handling
  - _Requirements: 1.1, 1.4, 7.1, 7.3_



- [ ] 4. Implement toggleMenuAsFilter method
  - Create method to toggle isFilter property on menu
  - Save updated menu to localStorage
  - Update button text and styling
  - Show/hide filter badge on menu


  - Show success toast message
  - _Requirements: 1.2, 1.3, 1.4, 5.1, 5.3, 5.4_

- [ ] 5. Implement menu filter badge display
  - Add badge HTML "(FILTRO ACTIVO) ✓" to menu header
  - Show badge only when menu.isFilter is true

  - Add CSS styling for badge

  - Update badge when filter state changes
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 6. Implement getMenuFilters and renderMenuFilterChips methods
  - Create method to get all menus where isFilter is true

  - Create method to render filter chips in home page

  - Generate chip HTML with menu icon 📋 and name
  - Add click handlers to chips
  - Show/hide menu filter section based on filter count
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_


- [-] 7. Implement menu filtering logic

  - Add activeMenuFilter property to RecipeApp state
  - Create getRecipeNamesFromMenu method to extract recipe names
  - Update filterRecipes method to support menu filtering
  - Implement case-insensitive partial matching for recipe names
  - Combine category and menu filters with AND logic

  - _Requirements: 3.1, 3.2, 3.3, 3.4, 8.1, 8.2_

- [ ] 8. Implement handleMenuFilterClick method
  - Create click handler for menu filter chips
  - Toggle activeMenuFilter state



  - Update chip active styling
  - Call filterRecipes to apply filter
  - Update recipe count display
  - _Requirements: 3.1, 3.4, 3.5, 4.1, 4.2, 4.3_



- [-] 9. Implement clearMenuFilter and integration with existing filters

  - Create method to clear active menu filter
  - Update "Todos" category button to also clear menu filter
  - Ensure menu filter is cleared when appropriate
  - Update filter state management
  - _Requirements: 4.1, 4.2, 4.4, 4.5, 8.4, 8.5_

- [ ] 10. Implement automatic cleanup when menu is deleted
  - Update deleteMenu method to check if menu is a filter
  - If menu is filter and active, clear the filter
  - Remove menu from filter chips
  - Update localStorage
  - _Requirements: 5.2, 5.5, 6.5_

- [ ] 11. Add persistence and initialization logic
  - Load menu filter state on app initialization
  - Render menu filter chips on page load if filters exist
  - Preserve isFilter property during menu import/export
  - Ensure filter state survives page reload
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 12. Test and validate menu filter functionality
  - Test converting menu to filter and back
  - Test filtering recipes by menu
  - Test combined category + menu filtering
  - Test filter persistence across page reloads
  - Test edge cases (empty menus, deleted menus, special characters)
  - Verify UI updates correctly in all scenarios
  - _Requirements: All requirements_
