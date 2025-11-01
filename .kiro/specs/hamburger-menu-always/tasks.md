# Implementation Plan

- [x] 1. Update HTML structure




  - Remove duplicate button elements and simplify header structure
  - _Requirements: 1.1, 2.1, 5.4_



- [x] 1.1 Remove desktop header-actions div


  - Delete the entire `<div class="header-actions" id="header-actions">` section with all its buttons
  - Keep only the mobile menu structure as the single menu
  - _Requirements: 1.1, 5.4_



- [x] 1.2 Rename mobile menu elements to generic names





  - Rename `mobile-menu-btn` to `menu-btn`
  - Rename `mobile-menu` to `menu-dropdown`
  - Rename `mobile-menu-item` class to `menu-item`
  - Rename `mobile-menu-item-primary` to `menu-item-primary`

  - _Requirements: 2.1, 5.4_


- [ ] 1.3 Update button IDs to remove "mobile-" prefix
  - Change `mobile-theme-toggle` to `theme-toggle-btn`
  - Change `mobile-manage-categories` to `manage-categories-btn`
  - Change `mobile-import-xml` to `import-xml-btn`
  - Change `mobile-export-all` to `export-all-btn`

  - Change `mobile-new-recipe` to `new-recipe-btn`

  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 1.4 Add proper ARIA attributes
  - Add `aria-label="Menú de opciones"` to menu button
  - Add `aria-expanded="false"` to menu button
  - Add `aria-haspopup="true"` to menu button
  - Add `role="menu"` to menu dropdown


  - Add `role="menuitem"` to each menu item
  - _Requirements: 4.3, 4.4_





- [ ] 1.5 Update emoji icons for consistency
  - Change theme button emoji from 🌙 to ☀️
  - Verify all other emojis are correct



  - _Requirements: 3.1_

- [x] 2. Update CSS styles

  - Modify styles to make menu button always visible and remove responsive rules

  - _Requirements: 1.2, 2.1, 5.1_

- [ ] 2.1 Hide header-actions permanently
  - Add `.header-actions { display: none !important; }` rule
  - Remove all media queries that show/hide `.header-actions`

  - _Requirements: 1.1, 5.1_


- [ ] 2.2 Make menu button always visible
  - Change `.mobile-menu-btn` to `.menu-btn`
  - Remove `display: none` default rule
  - Set `display: block` permanently
  - Remove media queries that show/hide menu button
  - _Requirements: 2.1, 5.1_



- [ ] 2.3 Rename menu dropdown classes
  - Rename `.mobile-menu` to `.menu-dropdown` in all CSS rules
  - Rename `.mobile-menu.active` to `.menu-dropdown.active`

  - Rename `.mobile-menu-item` to `.menu-item`

  - Rename `.mobile-menu-item-primary` to `.menu-item-primary`


  - Update all related hover, active, and pseudo-class selectors
  - _Requirements: 4.5_



- [ ] 2.4 Verify z-index and positioning
  - Ensure `.menu-dropdown` has `z-index: 1000` or higher
  - Verify `position: absolute` is set correctly
  - Ensure `.header-content` has `position: relative`
  - _Requirements: 2.4_


- [-] 2.5 Clean up unused media query rules

  - Remove any remaining media queries related to header-actions visibility
  - Remove any remaining media queries related to mobile-menu-btn visibility
  - _Requirements: 5.1_

- [x] 3. Update JavaScript event listeners

  - Remove duplicate event listeners and simplify menu logic
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.2, 5.3_

- [x] 3.1 Remove duplicate desktop event listeners

  - Remove event listeners for `theme-toggle-btn` (desktop version)
  - Remove event listeners for `manage-categories-btn` (desktop version)
  - Remove event listeners for `import-xml-btn` (desktop version)
  - Remove event listeners for `export-all-btn` (desktop version)

  - Remove event listeners for `new-recipe-btn` (desktop version)
  - _Requirements: 5.2, 5.3_

- [x] 3.2 Update mobile event listener IDs

  - Update `mobile-theme-toggle` references to `theme-toggle-btn`
  - Update `mobile-manage-categories` references to `manage-categories-btn`
  - Update `mobile-import-xml` references to `import-xml-btn`


  - Update `mobile-export-all` references to `export-all-btn`
  - Update `mobile-new-recipe` references to `new-recipe-btn`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_


- [ ] 3.3 Update menu toggle button ID
  - Change `mobile-menu-btn` references to `menu-btn`
  - Change `mobile-menu` references to `menu-dropdown`
  - _Requirements: 2.1, 2.2_


- [ ] 3.4 Add closeMenu() function
  - Create helper function to close menu and update aria-expanded
  - Call closeMenu() after each menu item action
  - _Requirements: 2.5_

- [ ] 3.5 Update ARIA attributes dynamically
  - Update `aria-expanded` to "true" when menu opens
  - Update `aria-expanded` to "false" when menu closes

  - _Requirements: 4.3_

- [ ] 3.6 Add click-outside-to-close functionality
  - Ensure document click listener closes menu when clicking outside
  - Verify menu button click doesn't trigger document listener
  - _Requirements: 2.4_

- [x] 4. Test functionality

  - Verify all features work correctly across different scenarios
  - _Requirements: All_

- [ ] 4.1 Test menu toggle
  - Click menu button → menu opens
  - Click menu button again → menu closes
  - Click outside menu → menu closes
  - _Requirements: 2.2, 2.3, 2.4_




- [ ] 4.2 Test each menu action
  - Click "☀️ Tema" → theme changes, menu closes
  - Click "🏷️ Categorías" → category manager opens, menu closes
  - Click "📥 Importar receta" → file picker opens, menu closes
  - Click "📤 Exportar todas" → export happens, menu closes
  - Click "➕ Nueva Receta" → recipe form opens, menu closes

  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4.3 Test responsive behavior


  - Test on mobile viewport (320px width)
  - Test on tablet viewport (768px width)
  - Test on desktop viewport (1920px width)
  - Verify menu button visible on all sizes
  - Verify menu works identically on all sizes

  - _Requirements: 1.2, 1.3, 2.1, 4.1_

- [ ] 4.4 Test keyboard navigation
  - Tab to menu button → button receives focus
  - Press Enter → menu opens

  - Tab through menu items → each item receives focus
  - Press Enter on item → action executes, menu closes
  - Press Escape → menu closes
  - _Requirements: 4.2, 4.3_

- [x] 4.5 Test accessibility

  - Use screen reader to verify menu announces correctly
  - Verify aria-expanded changes when menu opens/closes
  - Verify all menu items have proper roles
  - Check color contrast meets WCAG standards
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5. Verify no regressions

  - Ensure no existing functionality is broken
  - _Requirements: 3.6_

- [ ] 5.1 Check console for errors
  - Open browser console
  - Perform all menu actions
  - Verify no JavaScript errors appear
  - _Requirements: All_

- [ ] 5.2 Verify no duplicate event listeners
  - Check that actions only execute once per click
  - Verify menu closes properly after each action
  - _Requirements: 5.2, 5.3_

- [ ] 5.3 Test theme persistence
  - Change theme via menu
  - Reload page
  - Verify theme persists correctly
  - _Requirements: 3.1_

- [ ] 5.4 Test import/export functionality
  - Import XML file via menu
  - Verify recipes import correctly
  - Export all recipes via menu
  - Verify XML file downloads correctly
  - _Requirements: 3.3, 3.4_

- [ ] 5.5 Visual regression check
  - Compare menu appearance with original mobile menu
  - Verify spacing, colors, and fonts match
  - Check hover and active states
  - Verify primary button (Nueva Receta) has gradient
  - _Requirements: 4.5_
