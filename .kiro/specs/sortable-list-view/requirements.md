# Requirements Document

## Introduction

This feature adds a sortable list view for recipes with a sticky header that allows users to sort recipes by name (alphabetically) or by date (chronologically). The list view provides an alternative to the grid view, offering better scanning and organization capabilities for users managing multiple recipes.

## Glossary

- **Recipe App**: The web application that manages and displays cooking recipes
- **List View**: A vertical display mode showing recipes in rows with columns for image, name, date, and actions
- **Grid View**: The existing card-based display mode showing recipes in a grid layout
- **Sticky Header**: A table header that remains visible at the top of the viewport when scrolling
- **Sort Indicator**: Visual symbols (▼ ▲) showing the current sort direction
- **View Toggle**: UI controls that switch between Grid and List display modes

## Requirements

### Requirement 1

**User Story:** As a recipe app user, I want to switch between grid and list views, so that I can choose the display format that best suits my needs

#### Acceptance Criteria

1. THE Recipe App SHALL provide a view toggle control with two options: Grid view and List view
2. WHEN the user clicks the Grid view toggle, THE Recipe App SHALL display recipes in the existing card-based grid layout
3. WHEN the user clicks the List view toggle, THE Recipe App SHALL display recipes in a tabular list format with columns for image, name, date, and actions
4. THE Recipe App SHALL persist the selected view mode in local storage
5. WHEN the user returns to the application, THE Recipe App SHALL restore the previously selected view mode

### Requirement 2

**User Story:** As a recipe app user, I want to see a fixed header in list view, so that I can always see the column labels while scrolling through my recipes

#### Acceptance Criteria

1. WHILE the List view is active, THE Recipe App SHALL display a sticky header row with column labels
2. WHEN the user scrolls down the recipe list, THE Recipe App SHALL keep the header row visible at the top of the viewport
3. THE Recipe App SHALL style the header row with a distinct background color to differentiate it from data rows
4. THE Recipe App SHALL align header columns with their corresponding data columns in recipe rows

### Requirement 3

**User Story:** As a recipe app user, I want to sort recipes by name, so that I can quickly find recipes alphabetically

#### Acceptance Criteria

1. WHEN the user clicks the Name column header once, THE Recipe App SHALL sort recipes alphabetically from A to Z and display a downward arrow (▼) indicator
2. WHEN the user clicks the Name column header a second time, THE Recipe App SHALL sort recipes alphabetically from Z to A and display an upward arrow (▲) indicator
3. WHEN the user clicks the Name column header a third time, THE Recipe App SHALL restore the default date-based sorting and remove the sort indicator
4. THE Recipe App SHALL perform case-insensitive sorting for recipe names
5. THE Recipe App SHALL update the recipe list display immediately after each sort operation

### Requirement 4

**User Story:** As a recipe app user, I want to sort recipes by date, so that I can see my newest or oldest recipes first

#### Acceptance Criteria

1. WHEN the user clicks the Date column header once, THE Recipe App SHALL sort recipes from most recent to oldest and display a downward arrow (▼) indicator
2. WHEN the user clicks the Date column header a second time, THE Recipe App SHALL sort recipes from oldest to most recent and display an upward arrow (▲) indicator
3. WHEN the user clicks the Date column header a third time, THE Recipe App SHALL restore the default date-based sorting and remove the sort indicator
4. THE Recipe App SHALL format dates consistently in MM/YYYY format in the Date column
5. THE Recipe App SHALL update the recipe list display immediately after each sort operation

### Requirement 5

**User Story:** As a recipe app user, I want visual feedback when hovering over sortable columns, so that I know which columns are interactive

#### Acceptance Criteria

1. WHEN the user hovers over the Name column header, THE Recipe App SHALL display a hover effect indicating the column is clickable
2. WHEN the user hovers over the Date column header, THE Recipe App SHALL display a hover effect indicating the column is clickable
3. THE Recipe App SHALL use a cursor pointer style for sortable column headers
4. THE Recipe App SHALL maintain consistent hover styling across all sortable columns

### Requirement 6

**User Story:** As a recipe app user, I want the list view to display recipe information clearly, so that I can quickly scan and identify recipes

#### Acceptance Criteria

1. THE Recipe App SHALL display each recipe in a row with four columns: image thumbnail (80px), name (flexible width), date (100px), and share action (50px)
2. THE Recipe App SHALL display recipe images as thumbnails in the first column
3. WHEN a recipe has no image, THE Recipe App SHALL display a placeholder icon in the image column
4. THE Recipe App SHALL display the full recipe name in the name column with text wrapping if needed
5. THE Recipe App SHALL display a share/export icon (📤) in the action column for each recipe
6. THE Recipe App SHALL maintain consistent row heights and column alignment throughout the list
