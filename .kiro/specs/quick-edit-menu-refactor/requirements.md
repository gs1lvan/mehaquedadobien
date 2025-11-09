# Requirements Document

## Introduction

This feature refactors the quick edit functionality for menu items to eliminate code duplication and event listener conflicts. Currently, there are separate functions for quick edit (`openCategorySelectorForQuickEdit`, `openRecipeSelectorForQuickEdit`) that duplicate the logic of the existing menu editing system, causing conflicts when multiple event listeners are attached to the same buttons.

## Glossary

- **Quick Edit System**: The functionality that allows users to click directly on a meal cell (lunch/dinner) in the menu view to edit it without opening the full menu edit modal
- **Menu Edit System**: The existing system for editing menus through the menu modal form
- **Category Selector Modal**: The modal (`category-selector-modal`) that displays available recipe categories
- **Recipe Selector Modal**: The modal (`menu-recipe-selector-modal`) that displays recipes filtered by category
- **Meal Cell**: A clickable cell in the menu view representing either lunch or dinner for a specific day
- **Event Listener Conflict**: When multiple event listeners are attached to the same button, causing unexpected behavior

## Requirements

### Requirement 1

**User Story:** As a user, I want to click directly on a meal cell in the menu view to quickly edit it, so that I can update meals without opening the full menu edit form

#### Acceptance Criteria

1. WHEN THE user clicks on a meal cell (lunch or dinner), THE Quick Edit System SHALL open the Category Selector Modal
2. WHEN THE user selects a category in the Category Selector Modal, THE Quick Edit System SHALL display the "Ver Recetas →" button
3. WHEN THE user clicks the "Ver Recetas →" button, THE Quick Edit System SHALL open the Recipe Selector Modal with recipes filtered by the selected category
4. WHEN THE user selects a recipe and clicks "Confirmar", THE Quick Edit System SHALL update the meal cell with the selected recipe name
5. WHEN THE user selects a recipe and clicks "Confirmar", THE Quick Edit System SHALL save the updated menu to localStorage

### Requirement 2

**User Story:** As a developer, I want to reuse the existing menu editing functions for quick edit, so that I can eliminate code duplication and reduce maintenance burden

#### Acceptance Criteria

1. THE Quick Edit System SHALL use the existing `openCategorySelectorForMenu` function instead of `openCategorySelectorForQuickEdit`
2. THE Quick Edit System SHALL use the existing recipe selection logic instead of `openRecipeSelectorForQuickEdit`
3. THE Quick Edit System SHALL NOT create duplicate event listeners on modal buttons
4. THE Quick Edit System SHALL pass a flag or metadata to indicate quick edit mode to the existing functions
5. THE Quick Edit System SHALL remove the functions `openCategorySelectorForQuickEdit` and `openRecipeSelectorForQuickEdit` from the codebase

### Requirement 3

**User Story:** As a developer, I want the modal buttons to have only one event listener each, so that button clicks execute the correct action without conflicts

#### Acceptance Criteria

1. WHEN THE Category Selector Modal opens, THE Quick Edit System SHALL ensure the "Ver Recetas →" button has exactly one event listener
2. WHEN THE Recipe Selector Modal opens, THE Quick Edit System SHALL ensure the "Confirmar" button has exactly one event listener
3. THE Quick Edit System SHALL detect quick edit mode using the `isQuickEdit` flag in the input element dataset
4. WHEN THE "Confirmar" button is clicked in quick edit mode, THE Quick Edit System SHALL save the selection directly to the menu
5. WHEN THE "Confirmar" button is clicked in normal mode, THE Quick Edit System SHALL update the input field value only

### Requirement 4

**User Story:** As a user, I want visual feedback when I select a category or recipe, so that I know my selection was registered

#### Acceptance Criteria

1. WHEN THE user selects a category, THE Category Selector Modal SHALL highlight the selected category with a visual indicator
2. WHEN THE user selects a category, THE Category Selector Modal SHALL enable the "Ver Recetas →" button
3. WHEN THE user selects a recipe, THE Recipe Selector Modal SHALL highlight the selected recipe with a visual indicator
4. WHEN THE user selects a recipe, THE Recipe Selector Modal SHALL enable the "Confirmar" button
5. WHEN THE user completes the quick edit, THE Quick Edit System SHALL display a success toast message

### Requirement 5

**User Story:** As a user, I want the menu view to update immediately after I edit a meal, so that I can see my changes without refreshing the page

#### Acceptance Criteria

1. WHEN THE user completes a quick edit, THE Quick Edit System SHALL call `renderMenus()` to refresh the menu view
2. WHEN THE menu view refreshes, THE Quick Edit System SHALL preserve the expanded/collapsed state of all menus
3. WHEN THE menu view refreshes, THE Quick Edit System SHALL display the updated meal value in the correct cell
4. THE Quick Edit System SHALL complete the update within 500 milliseconds
5. THE Quick Edit System SHALL close all modals after the update is complete
