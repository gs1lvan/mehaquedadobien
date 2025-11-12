# Requirements Document: Fix Menu Quick Edit Categories

## Introduction

When editing meals in the menu section using quick edit functionality, categories that contain the currently assigned recipe appear semi-transparent (disabled) even though they have recipes associated with them. This occurs because the system stores recipes by name (string) instead of unique IDs, and the category availability check doesn't account for the currently edited recipe.

## Glossary

- **Recipe App**: The main recipe management application (mehaquedadobien)
- **Quick Edit**: Feature that allows editing menu meals directly from the menu view without opening the full form
- **Menu Item**: A day entry in a weekly menu containing lunch and dinner fields
- **Category Selector Modal**: Modal dialog that displays available categories for recipe selection
- **Menu-Friendly Recipe**: A recipe marked with the `menuFriendly` flag set to true
- **Recipe ID**: Unique identifier for each recipe (primary key for all recipe references)
- **Recipe Name**: String name of the recipe (display only, not used for references)
- **Ingredient ID**: Unique identifier for each ingredient within a recipe
- **Sequence ID**: Unique identifier for each sequence/step within a recipe
- **Image ID**: Unique identifier for each image within a recipe
- **Shopping List**: Collection of ingredients that can be populated from recipes or added manually
- **Menu Filter**: View that displays recipes filtered by their presence in a specific menu

## Requirements

### Requirement 1: Category Availability Detection

**User Story:** As a user editing a menu meal, I want to see the current recipe's category as available (not disabled), so that I can keep the same category or change to a different one.

#### Acceptance Criteria

1. WHEN the user clicks quick edit on a menu meal that has a recipe assigned, THE Recipe App SHALL identify the current recipe by its name
2. WHEN checking category availability in quick edit mode, THE Recipe App SHALL include the current recipe in the count of available recipes for its category
3. WHEN a category contains only the currently edited recipe, THE Recipe App SHALL display that category as enabled (not semi-transparent)
4. WHEN a category contains the currently edited recipe plus other menu-friendly recipes, THE Recipe App SHALL display that category as enabled
5. WHEN a category contains no menu-friendly recipes including the current one, THE Recipe App SHALL display that category as disabled

### Requirement 2: Object Identification by ID

**User Story:** As a developer, I want all objects (recipes, ingredients, sequences, images) to be identified by unique IDs instead of names or direct references, so that the system can accurately track and update objects even if their properties change.

#### Acceptance Criteria

1. WHEN a recipe is added to a menu, THE Recipe App SHALL store the recipe's unique ID in the menu item
2. WHEN displaying a menu meal, THE Recipe App SHALL look up the recipe by ID and display its current name
3. WHEN a recipe's name is changed, THE Recipe App SHALL update all displays automatically by looking up the current data by ID
4. WHEN an ingredient is referenced, THE Recipe App SHALL use the ingredient's unique ID within the recipe
5. WHEN a sequence is referenced, THE Recipe App SHALL use the sequence's unique ID within the recipe
6. WHEN an image is referenced, THE Recipe App SHALL use the image's unique ID within the recipe
7. WHEN importing legacy data with names instead of IDs, THE Recipe App SHALL convert names to IDs by matching against existing objects
8. IF an object name cannot be matched to an ID during import, THE Recipe App SHALL create a placeholder entry or mark it as "Object not found"

### Requirement 3: Backward Compatibility

**User Story:** As a user with existing menus, I want my current menu data to continue working after the update, so that I don't lose any of my planned meals.

#### Acceptance Criteria

1. WHEN loading a menu with recipe names (legacy format), THE Recipe App SHALL automatically convert names to IDs
2. WHEN a recipe name matches multiple recipes, THE Recipe App SHALL use the first menu-friendly match
3. WHEN a recipe name doesn't match any existing recipe, THE Recipe App SHALL preserve the name as a text-only entry
4. WHEN saving a menu, THE Recipe App SHALL always use the ID-based format
5. WHEN exporting menus, THE Recipe App SHALL include both ID and name for compatibility

### Requirement 4: Quick Edit Category Selection

**User Story:** As a user, I want the quick edit category selector to show accurate availability status, so that I can make informed decisions about which categories to choose from.

#### Acceptance Criteria

1. WHEN opening the category selector in quick edit mode, THE Recipe App SHALL pass the current recipe's ID to the rendering function
2. WHEN rendering category chips in quick edit mode, THE Recipe App SHALL check if each category contains the current recipe
3. WHEN a category contains the current recipe, THE Recipe App SHALL count it as having at least one available recipe
4. WHEN calculating hasRecipes for a category, THE Recipe App SHALL filter recipes by menuFriendly flag AND include the current recipe if it belongs to that category
5. WHEN the current recipe is not menu-friendly but is in a menu, THE Recipe App SHALL still count it as available for its category in quick edit mode

### Requirement 5: Visual Feedback

**User Story:** As a user, I want clear visual feedback about which categories have recipes available, so that I can quickly identify my options.

#### Acceptance Criteria

1. WHEN a category has menu-friendly recipes available, THE Recipe App SHALL display the category chip with full opacity (1.0)
2. WHEN a category has no menu-friendly recipes available, THE Recipe App SHALL display the category chip with reduced opacity (0.4)
3. WHEN a category is disabled, THE Recipe App SHALL show a "not-allowed" cursor on hover
4. WHEN a category is enabled, THE Recipe App SHALL show a "pointer" cursor on hover
5. WHEN a category is disabled, THE Recipe App SHALL prevent click events from triggering selection

### Requirement 6: Shopping List Integration with Recipe IDs

**User Story:** As a user, I want to add ingredients from recipes to shopping lists using recipe IDs, so that the system can automatically track which ingredients come from which recipes.

#### Acceptance Criteria

1. WHEN adding all ingredients from a recipe to a shopping list, THE Recipe App SHALL pass the recipe ID to identify the source
2. WHEN adding a single ingredient to a shopping list, THE Recipe App SHALL pass both the recipe ID and ingredient ID
3. WHEN displaying ingredients in a shopping list, THE Recipe App SHALL show which recipe they came from by looking up the recipe by ID
4. WHEN a recipe is deleted, THE Recipe App SHALL mark shopping list items from that recipe as "from deleted recipe"
5. WHEN a recipe's ingredient is modified, THE Recipe App SHALL NOT automatically update shopping list items (they are snapshots)

### Requirement 7: Menu to Shopping List Conversion

**User Story:** As a user, I want to convert a menu to a shopping list by passing recipe IDs, so that all ingredients are automatically added without manual selection.

#### Acceptance Criteria

1. WHEN converting a menu to a shopping list, THE Recipe App SHALL extract all recipe IDs from the menu items
2. WHEN processing each recipe ID, THE Recipe App SHALL look up the recipe and extract all its ingredients
3. WHEN adding ingredients to the shopping list, THE Recipe App SHALL include the recipe ID as the source
4. WHEN multiple menu items use the same recipe, THE Recipe App SHALL consolidate duplicate ingredients with quantities
5. WHEN a recipe in the menu is not found, THE Recipe App SHALL log a warning and continue with other recipes

### Requirement 8: Menu as Filter

**User Story:** As a user, I want to filter recipes by menu, so that I can see only the recipes that are included in a specific menu.

#### Acceptance Criteria

1. WHEN activating a menu filter, THE Recipe App SHALL extract all unique recipe IDs from the menu
2. WHEN composing the filtered view, THE Recipe App SHALL look up each recipe by ID and display it
3. WHEN a recipe in the menu is deleted, THE Recipe App SHALL show a placeholder or "deleted recipe" indicator
4. WHEN displaying the filtered recipes, THE Recipe App SHALL show which days/meals they appear in the menu
5. WHEN the menu filter is active, THE Recipe App SHALL hide recipes that are not in the menu

### Requirement 9: XML Export with IDs

**User Story:** As a user, I want to export recipes to XML format using IDs for all object references, so that the exported data maintains referential integrity and can be imported without data loss.

#### Acceptance Criteria

1. WHEN exporting a recipe to XML, THE Recipe App SHALL include the recipe ID in the XML structure
2. WHEN exporting ingredients, THE Recipe App SHALL include each ingredient's unique ID
3. WHEN exporting sequences, THE Recipe App SHALL include each sequence's unique ID
4. WHEN exporting sequence ingredient references, THE Recipe App SHALL use ingredient IDs instead of names
5. WHEN exporting images, THE Recipe App SHALL include each image's unique ID
6. WHEN exporting menus, THE Recipe App SHALL use recipe IDs for lunch and dinner references
7. WHEN exporting multiple recipes, THE Recipe App SHALL preserve all ID relationships

### Requirement 10: XML Import with IDs

**User Story:** As a user, I want to import recipes from XML format that uses IDs, so that all object references are correctly restored and no data is lost.

#### Acceptance Criteria

1. WHEN importing a recipe from XML, THE Recipe App SHALL parse and restore the recipe ID
2. WHEN importing ingredients, THE Recipe App SHALL parse and restore each ingredient's unique ID
3. WHEN importing sequences, THE Recipe App SHALL parse and restore each sequence's unique ID
4. WHEN importing sequence ingredient references, THE Recipe App SHALL resolve ingredient IDs to ingredient objects
5. WHEN importing images, THE Recipe App SHALL parse and restore each image's unique ID
6. WHEN importing menus, THE Recipe App SHALL resolve recipe IDs to recipe objects
7. WHEN an imported ID conflicts with an existing ID, THE Recipe App SHALL generate a new unique ID and update all references
8. WHEN importing legacy XML without IDs, THE Recipe App SHALL generate IDs automatically and convert name-based references to ID-based references

## Non-Functional Requirements

### Performance

1. Recipe ID lookup SHALL complete in less than 50ms for menus with up to 100 recipes
2. Category availability calculation SHALL complete in less than 100ms for up to 50 categories

### Data Integrity

1. Recipe IDs SHALL be immutable once assigned
2. Menu data SHALL be validated before saving to prevent orphaned references
3. Recipe name changes SHALL not affect menu integrity

### Usability

1. The transition from name-based to ID-based storage SHALL be transparent to users
2. Error messages SHALL be clear and actionable when recipe references cannot be resolved
3. The quick edit flow SHALL maintain the same user experience with improved accuracy

## Constraints

1. The solution MUST maintain backward compatibility with existing menu data
2. The solution MUST NOT require users to manually update their existing menus
3. The solution MUST work with the existing localStorage-based storage system
4. The solution MUST NOT break the existing recipe import/export functionality

## Assumptions

1. Recipe names are generally unique within the user's recipe collection
2. Users will not have more than 1000 recipes in their collection
3. The localStorage API is available and functional
4. Recipe IDs are already generated and stored in the recipe objects

## Dependencies

1. Recipe objects must have a unique `id` property
2. Menu objects must support storing recipe IDs in addition to or instead of names
3. The category manager must provide methods to get categories by recipe ID
4. The recipe service must provide methods to look up recipes by ID efficiently
