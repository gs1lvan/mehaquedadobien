# Design Document - Sortable List View

## Overview

This design document outlines the technical approach for implementing a sortable list view feature for the recipe application. The feature provides an alternative display mode to the existing grid view, with a sticky header and sortable columns for name and date.

## Architecture

### Component Structure

The sortable list view is integrated into the existing `RecipeApp` class and consists of:

1. **View Mode Management**: Toggle between grid and list views
2. **List View Renderer**: Specialized rendering for list items
3. **Sort Controller**: Manages sorting state and logic
4. **Sticky Header**: Fixed header with sortable column controls
5. **Persistence Layer**: LocalStorage for view mode preference

### State Management

The application maintains the following state properties:

```javascript
{
  viewMode: 'grid' | 'list',  // Current view mode
  sortBy: 'name' | 'date',    // Active sort column
  sortOrder: 'asc' | 'desc'   // Sort direction
}
```

## Components and Interfaces

### 1. View Toggle Controls

**Location**: Filter toggle container in main view

**HTML Structure**:
```html
<div class="view-toggle-buttons">
  <button id="view-grid-btn" class="btn-view-toggle active">🔲</button>
  <button id="view-list-btn" class="btn-view-toggle">☰</button>
</div>
```

**Behavior**:
- Buttons are mutually exclusive (only one active at a time)
- Active state persisted to localStorage
- Triggers re-render of recipe list

### 2. List View Header

**Location**: Above recipes grid, only visible in list mode

**HTML Structure**:
```html
<div id="list-view-header" class="list-view-header">
  <div class="list-header-img"></div>
  <div class="list-header-name" id="sort-by-name">
    NOMBRE <span class="sort-indicator"></span>
  </div>
  <div class="list-header-date" id="sort-by-date">
    FECHA <span class="sort-indicator">▼</span>
  </div>
  <div class="list-header-actions"></div>
</div>
```

**CSS Properties**:
- `position: sticky` with `top: 0` for fixed positioning
- `z-index: 10` to stay above content
- Background color distinct from data rows
- Column widths match data row columns

### 3. List Item Component

**Structure**:
```html
<div class="recipe-card list-item">
  <div class="recipe-image">
    <img src="..." alt="Recipe name">
  </div>
  <div class="recipe-content">
    <h3 class="recipe-name">Recipe Name</h3>
    <span class="recipe-date">MM/YYYY</span>
    <button class="recipe-share-btn">📤</button>
  </div>
</div>
```

**Column Layout**:
- Image: 80px fixed width
- Name: flex: 1 (expandable)
- Date: 100px fixed width
- Actions: 50px fixed width

## Data Models

### Recipe Display Data

For list view, each recipe requires:

```javascript
{
  id: string,
  name: string,
  updatedAt: Date,
  images: Array<{data: string}>,
  // ... other recipe properties
}
```

### Sort State

```javascript
{
  sortBy: 'name' | 'date',
  sortOrder: 'asc' | 'desc'
}
```

## Sorting Logic

### Sort Behavior

**Name Column**:
1. First click: A → Z (asc), show ▼
2. Second click: Z → A (desc), show ▲
3. Third click: Reset to default date sort, remove indicator

**Date Column**:
1. First click: Most recent → Oldest (desc), show ▼
2. Second click: Oldest → Most recent (asc), show ▲
3. Third click: Reset to default date sort, remove indicator

### Implementation

```javascript
toggleSort(column) {
  if (this.sortBy === column) {
    // Toggle order on same column
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    // Switch to new column with default order
    this.sortBy = column;
    this.sortOrder = column === 'name' ? 'asc' : 'desc';
  }
  this.updateSortIndicators();
  this.renderRecipeList();
}
```

### Sort Algorithm

The sorting is applied in `filterRecipes()` method:

```javascript
// Sort by name
if (this.sortBy === 'name') {
  filtered.sort((a, b) => {
    const comparison = a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
    return this.sortOrder === 'asc' ? comparison : -comparison;
  });
}

// Sort by date
if (this.sortBy === 'date') {
  filtered.sort((a, b) => {
    const aDate = new Date(a.updatedAt);
    const bDate = new Date(b.updatedAt);
    const comparison = aDate - bDate;
    return this.sortOrder === 'asc' ? comparison : -comparison;
  });
}
```

## Error Handling

### Missing DOM Elements

```javascript
if (!recipesGrid || !listHeader) {
  console.error('Required DOM elements not found');
  return;
}
```

### Invalid Sort State

Default to date descending if invalid state detected:

```javascript
if (!['name', 'date'].includes(this.sortBy)) {
  this.sortBy = 'date';
  this.sortOrder = 'desc';
}
```

### Empty Recipe List

Display appropriate empty state message based on active filters.

## Responsive Design

### Grid View Layout
- Maximum 2 columns per row on all screen sizes
- Use `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- Add `max-width` constraint to prevent more than 2 columns
- Maintain consistent card sizing

### List View Layout

#### Desktop (> 768px)
- Full list view with all columns visible
- Sticky header remains fixed on scroll
- Hover effects on sortable columns

#### Mobile (≤ 768px)
- Maintain list layout but adjust spacing
- Reduce font sizes for better fit
- Touch-friendly click targets (min 44px)

## Accessibility

### Keyboard Navigation
- Tab through view toggle buttons
- Enter/Space to activate buttons
- Tab through sortable column headers
- Enter/Space to sort

### Screen Readers
- ARIA labels on toggle buttons
- Role="button" on sortable headers
- Announce sort state changes
- Semantic HTML structure

### Visual Indicators
- Clear active state on buttons
- Sort direction arrows (▼ ▲)
- Hover states on interactive elements
- Sufficient color contrast

## Performance Considerations

### Rendering Optimization
- Only re-render when view mode or sort changes
- Use document fragments for batch DOM updates
- Avoid layout thrashing with sticky header

### Sort Performance
- Use native `Array.sort()` with efficient comparators
- Case-insensitive string comparison with `localeCompare`
- Cache date objects to avoid repeated parsing

### Memory Management
- Clean up event listeners on view mode change
- Reuse DOM elements where possible
- Limit number of rendered items if list grows large

## Testing Strategy

### Unit Tests
- Sort logic for name (A-Z, Z-A)
- Sort logic for date (newest-oldest, oldest-newest)
- Sort indicator updates
- View mode persistence

### Integration Tests
- Toggle between grid and list views
- Sort by clicking column headers
- Sticky header behavior on scroll
- Filter + sort combination

### Visual Tests
- Column alignment between header and rows
- Sticky header positioning
- Sort indicators display correctly
- Responsive layout on different screen sizes

### Accessibility Tests
- Keyboard navigation works
- Screen reader announces changes
- ARIA attributes present
- Color contrast meets WCAG AA

## Future Enhancements

### Potential Improvements
1. **Multi-column sort**: Secondary sort criteria
2. **Custom column visibility**: Show/hide columns
3. **Column resizing**: Drag to adjust widths
4. **Bulk actions**: Select multiple recipes
5. **Export sorted list**: Download as CSV/Excel
6. **Sort persistence**: Remember sort preference
7. **Virtual scrolling**: For large recipe lists
8. **Drag-to-reorder**: Manual recipe ordering

### Technical Debt
- Consider extracting list view into separate component
- Add TypeScript for better type safety
- Implement proper state management (Redux/MobX)
- Add comprehensive test coverage
