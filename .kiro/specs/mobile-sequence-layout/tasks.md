# Implementation Plan

- [ ] 1. Implement mobile layout restructuring for sequence items
  - Add CSS media query rules to restructure `.sequence-content` on mobile using `display: contents`
  - Set flexbox order properties for sequence elements to control positioning
  - Ensure `.sequence-step` stays on first line with order: 1
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Style sequence ingredients for mobile first-line display
  - Modify `.sequence-ingredients` to display on first line with step number
  - Set order: 2 and flex: 1 to allow ingredients to grow and fill space
  - Remove bottom margin to prevent extra spacing
  - _Requirements: 1.2, 2.3_

- [ ] 3. Position sequence actions on mobile first line
  - Set `.sequence-actions` to order: 3 for right-side positioning
  - Remove top margin override to keep actions aligned with first line
  - Ensure actions stay right-aligned using margin-left: auto
  - _Requirements: 1.3_

- [ ] 4. Move sequence description to second line on mobile
  - Set `.sequence-description` to order: 4 with flex-basis: 100%
  - Add top margin for spacing from ingredients line
  - Ensure full-width display for readability
  - _Requirements: 1.1, 1.5, 2.2, 2.3_

- [ ] 5. Position sequence duration below description on mobile
  - Set `.sequence-duration` to order: 5 with flex-basis: 100%
  - Add appropriate top margin for spacing
  - Ensure full-width display
  - _Requirements: 1.5_

- [ ] 6. Verify desktop layout remains unchanged
  - Confirm all mobile-specific rules are within @media (max-width: 768px) query
  - Test that desktop viewport maintains current horizontal layout
  - Verify no unintended style inheritance from mobile rules
  - _Requirements: 1.4_

- [ ] 7. Test responsive behavior and edge cases
  - Test layout with sequences containing no description
  - Test layout with sequences containing no duration
  - Test layout with sequences containing many ingredients (wrapping)
  - Test layout with very long ingredient names
  - Test smooth transition when resizing from desktop to mobile viewport
  - Verify edit mode is not affected by mobile layout changes
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4_
