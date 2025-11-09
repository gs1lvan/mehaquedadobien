# Implementation Plan

- [ ] 1. Modify quickEditMeal to use existing modal system
  - Update `quickEditMeal()` function to call `openCategorySelectorForMenu()` instead of creating separate flow
  - Ensure temp input element has `isQuickEdit: 'true'` flag in dataset
  - Verify all required metadata is passed (menuId, itemId, mealType, dayName)
  - _Requirements: 1.1, 2.4_

- [ ] 2. Update recipe selector confirm button to handle quick edit mode
  - Locate the confirm button event listener in the recipe selector modal setup
  - Add detection logic for `isQuickEdit` flag from input element dataset
  - Implement branching logic: if quick edit, save to menu; else update input value
  - Add menu save logic: update menu item, save to localStorage, call renderMenus()
  - Add success toast message after quick edit save
  - _Requirements: 1.4, 1.5, 3.4, 3.5, 5.1, 5.3_

- [ ] 3. Remove duplicate quick edit functions
  - Delete `openCategorySelectorForQuickEdit()` function (lines ~10375-10468)
  - Delete `openRecipeSelectorForQuickEdit()` function (lines ~10470-10650)
  - Search for any remaining references to these functions and remove them
  - _Requirements: 2.2, 2.5_

- [ ] 4. Verify event listener uniqueness
  - Test that "Ver Recetas →" button in category modal only fires once per click
  - Test that "Confirmar" button in recipe modal only fires once per click
  - If duplicates exist, implement button cloning strategy to remove old listeners
  - _Requirements: 3.1, 3.2_

- [ ] 5. Test quick edit flow end-to-end
  - Test: Click meal cell → Category modal opens
  - Test: Select category → "Ver Recetas" button appears and is enabled
  - Test: Click "Ver Recetas" → Recipe modal opens with filtered recipes
  - Test: Select recipe → Recipe highlights, confirm button enables
  - Test: Click confirm → Meal updates, modals close, success toast appears
  - Test: Verify updated value persists in localStorage
  - Test: Verify menu view updates immediately without page refresh
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.3, 5.5_

- [ ] 6. Test normal menu edit flow still works
  - Test: Open menu edit modal → Click meal input → Category modal opens
  - Test: Select category → "Ver Recetas" button appears
  - Test: Click "Ver Recetas" → Recipe modal opens
  - Test: Select recipe → Input value updates (not saved yet)
  - Test: Click "Guardar Menú" → Menu saves with updated values
  - Verify no regressions in normal edit flow
  - _Requirements: 2.1, 3.5_

- [ ] 7. Add error handling for edge cases
  - Add error handling for menu not found scenario
  - Add error handling for item not found scenario
  - Add error handling for no recipe selected scenario
  - Add error handling for localStorage save failure
  - Add warning toast for categories with no menu-friendly recipes
  - _Requirements: 1.2, 4.5_

- [ ] 8. Clean up state management
  - Review usage of `currentQuickEditInput`, `pendingMenuInput`, and `currentMenuCategoryInput`
  - Consolidate state variables if possible to reduce complexity
  - Document remaining state variables with comments
  - _Requirements: 2.4_

- [ ] 9. Add console logging for debugging
  - Add detailed console logs at each step of quick edit flow
  - Use `[Quick Edit]` prefix for easy filtering
  - Log: function entry, menu/item found, before/after update, save success
  - Consider adding DEBUG flag to enable/disable logging
  - _Requirements: 5.4_

- [ ] 10. Performance optimization
  - Verify renderMenus() completes within 500ms after quick edit
  - Consider partial menu updates instead of full re-render if performance is an issue
  - Test rapid clicking scenarios to ensure no duplicate operations
  - _Requirements: 5.4_
