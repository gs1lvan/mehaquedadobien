# Requirements Document

## Introduction

This feature improves the mobile layout of recipe sequences by repositioning the sequence description below the sequence step and ingredients, creating a more readable vertical layout instead of the current cramped horizontal arrangement.

## Glossary

- **Sequence Item**: A single step in a recipe's cooking sequence, containing a step number, ingredients, description, and actions
- **Sequence Step**: The numerical indicator (e.g., "1", "2", "3") at the beginning of each sequence item
- **Sequence Ingredients**: The list of ingredient chips displayed in each sequence step
- **Sequence Description**: The text explaining what to do with the ingredients in that step
- **Mobile Viewport**: Screen widths of 768px or less
- **Desktop Viewport**: Screen widths greater than 768px

## Requirements

### Requirement 1

**User Story:** As a mobile user viewing a recipe, I want the sequence description to appear below the ingredients on its own line, so that I can read the full text without horizontal scrolling or cramped layout

#### Acceptance Criteria

1. WHEN a user views a recipe sequence on a mobile viewport, THE Recipe App SHALL display the sequence description on a separate line below the sequence step and ingredients
2. WHEN a user views a recipe sequence on a mobile viewport, THE Recipe App SHALL maintain the sequence step number and ingredients on the first line
3. WHEN a user views a recipe sequence on a mobile viewport, THE Recipe App SHALL position the action menu button on the first line aligned to the right
4. WHEN a user views a recipe sequence on a desktop viewport, THE Recipe App SHALL maintain the current horizontal layout with all elements on one line
5. WHILE displaying sequence descriptions on mobile, THE Recipe App SHALL use the full width available for the description text

### Requirement 2

**User Story:** As a mobile user, I want the sequence layout to be visually clear and organized, so that I can easily distinguish between ingredients and instructions

#### Acceptance Criteria

1. WHEN the sequence description moves to a second line on mobile, THE Recipe App SHALL remove or hide the separator dot between ingredients and description
2. WHEN displaying sequences on mobile, THE Recipe App SHALL maintain appropriate spacing between the ingredient line and description line
3. WHEN displaying sequences on mobile, THE Recipe App SHALL ensure the description text is left-aligned and readable
4. WHEN a user switches between mobile and desktop viewports, THE Recipe App SHALL apply the appropriate layout without requiring a page refresh
