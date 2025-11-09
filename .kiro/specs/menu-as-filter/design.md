# Design Document

## Overview

This design adds the ability to convert menus into custom filters that appear on the home page alongside category filters. Users can mark specific menus as "filters" and use them to quickly filter recipes contained in those menus. This creates a flexible system for organizing recipes beyond traditional categories.

The implementation extends the existing menu and filter systems, adding a new "isFilter" property to menus and a new filter section in the home view.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Recipe List View (Home)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Filter Section                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Category Filters (existing)                       │  │  │
│  │  │  [Todos] [🍝 Pasta] [🥗 Ensaladas] ...            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Menu Filters (NEW)                                │  │  │
│  │  │  [📋 Menú Semanal] [📋 Menú Navidad] ...          │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Recipe Grid (filtered by category AND/OR menu)         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        Menus View                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Menu Card                                                │  │
│  │  📋 Menú Semanal (FILTRO ACTIVO) ✓                       │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Items...                                           │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  [🔖 Convertir en Filtro] ◄── NEW BUTTON                │  │
│  │  or                                                       │  │
│  │  [❌ Quitar de Filtros]   ◄── IF ALREADY FILTER         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User clicks "Convertir en Filtro"
       │
       ▼
RecipeApp.toggleMenuAsFilter(menuId)
       │
       ├─► Get menu from storage
       ├─► Toggle isFilter property
       ├─► Save to localStorage
       ├─► Update UI (button text, badge)
       └─► Render menus view
       
User clicks menu filter chip on home
       │
       ▼
RecipeApp.handleMenuFilterClick(menuId)
       │
       ├─► Set activeMenuFilter = menuId
       ├─► Extract recipe names from menu items
       ├─► Filter recipes by names
       ├─► Apply category filter if active (AND)
       ├─► Update recipe grid
       └─► Update active chip styling
```

## Components and Interfaces

### 1. Menu Data Model Extension

```javascript
// Existing menu structure
{
  id: 1699876543210,
  name: "Menú Semanal",
  items: [...],
  createdAt: "...",
  updatedAt: "...",
  isFilter: false  // ◄── NEW PROPERTY
}
```

### 2. New HTML Elements

#### Menu Filters Section (index.html)

```html
<!-- NEW: Menu filters section -->
<section id="menu-filter-bar" class="filter-bar hidden">
    <h2 class="filter-title">Filtrar por menú:</h2>
    <div class="filter-chips" id="menu-filter-chips">
        <!-- Dynamically populated with menu filter chips -->
    </div>
</section>
```

#### Toggle Filter Button (in menu card)

```html
<!-- NEW: Button in each menu card -->
<button class="menu-filter-toggle-btn" data-menu-id="{menuId}">
    🔖 Convertir en Filtro
</button>
<!-- OR if already filter -->
<button class="menu-filter-toggle-btn active" data-menu-id="{menuId}">
    ❌ Quitar de Filtros
</button>
```

### 3. RecipeApp Methods

#### New Methods

```javascript
/**
 * Toggle menu as filter
 * @param {number} menuId - Menu ID to toggle
 */
toggleMenuAsFilter(menuId)

/**
 * Check if menu is marked as filter
 * @param {number} menuId - Menu ID to check
 * @returns {boolean} True if menu is filter
 */
isMenuFilter(menuId)

/**
 * Get all menus marked as filters
 * @returns {Array} Array of menu objects
 */
getMenuFilters()

/**
 * Handle menu filter chip click
 * @param {number} menuId - Menu ID to filter by
 */
handleMenuFilterClick(menuId)

/**
 * Extract recipe names from menu
 * @param {Object} menu - Menu object
 * @returns {Array<string>} Array of recipe names
 */
getRecipeNamesFromMenu(menu)

/**
 * Render menu filter chips
 */
renderMenuFilterChips()

/**
 * Clear menu filter
 */
clearMenuFilter()
```

#### Modified Methods

```javascript
/**
 * Render menus - Updated to show filter toggle button
 */
renderMenus()

/**
 * Filter recipes - Updated to support menu filtering
 */
filterRecipes()

/**
 * Handle filter click - Updated to clear menu filter when "Todos" clicked
 */
handleFilterClick(target)
```

## Data Models

### Menu Object (Extended)

```javascript
{
  id: 1699876543210,           // number
  name: "Menú Semanal",        // string
  items: [                     // array
    {
      id: 1,
      name: "Lunes",
      lunch: "Ensalada César",   // Recipe name
      dinner: "Pollo al horno",  // Recipe name
      completed: false
    }
  ],
  createdAt: "2025-11-01T...", // ISO 8601 string
  updatedAt: "2025-11-08T...", // ISO 8601 string
  isFilter: true               // NEW: boolean (default: false)
}
```

### Filter State

```javascript
// In RecipeApp class
{
  currentCategory: "all",      // existing
  activeMenuFilter: null,      // NEW: menuId or null
  sortBy: null,                // existing
  sortOrder: "asc"             // existing
}
```

## UI Design

### Menu Filter Chips

```html
<div class="filter-chips" id="menu-filter-chips">
    <button class="filter-chip" data-menu-id="123">
        📋 Menú Semanal
    </button>
    <button class="filter-chip active" data-menu-id="456">
        📋 Menú Navidad
    </button>
</div>
```

### Menu Card with Filter Badge

```html
<div class="menu-card">
    <div class="menu-header">
        <h3>
            📋 Menú Semanal 
            <span class="menu-filter-badge">(FILTRO ACTIVO) ✓</span>
        </h3>
        <button class="menu-options-btn">⚙️</button>
    </div>
    <!-- ... menu items ... -->
    <button class="menu-filter-toggle-btn active">
        ❌ Quitar de Filtros
    </button>
</div>
```

### CSS Classes

```css
/* Menu filter section */
#menu-filter-bar {
    margin-top: 1rem;
}

#menu-filter-bar.hidden {
    display: none;
}

/* Menu filter badge */
.menu-filter-badge {
    font-size: 0.8rem;
    color: var(--color-primary);
    font-weight: normal;
}

/* Filter toggle button */
.menu-filter-toggle-btn {
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    border: 2px solid var(--color-primary);
    background: white;
    color: var(--color-primary);
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
}

.menu-filter-toggle-btn:hover {
    background: var(--color-primary);
    color: white;
}

.menu-filter-toggle-btn.active {
    background: var(--color-primary);
    color: white;
}
```

## Implementation Logic

### Toggle Menu as Filter

```javascript
toggleMenuAsFilter(menuId) {
    const menus = this.getMenusFromStorage();
    const menu = menus.find(m => m.id === menuId);
    
    if (!menu) return;
    
    // Toggle isFilter property
    menu.isFilter = !menu.isFilter;
    
    // Save to localStorage
    localStorage.setItem('recetario_menus', JSON.stringify(menus));
    
    // If filter was active and we're removing it, clear the filter
    if (!menu.isFilter && this.activeMenuFilter === menuId) {
        this.clearMenuFilter();
    }
    
    // Re-render
    this.renderMenus();
    this.renderMenuFilterChips();
    
    // Show toast
    const message = menu.isFilter 
        ? `"${menu.name}" añadido a filtros`
        : `"${menu.name}" quitado de filtros`;
    this.showToast(message, 'success');
}
```

### Filter Recipes by Menu

```javascript
handleMenuFilterClick(menuId) {
    // Toggle filter
    if (this.activeMenuFilter === menuId) {
        this.clearMenuFilter();
    } else {
        this.activeMenuFilter = menuId;
        this.filterRecipes();
    }
    
    // Update chip styling
    this.renderMenuFilterChips();
}

getRecipeNamesFromMenu(menu) {
    const recipeNames = new Set();
    
    menu.items.forEach(item => {
        if (item.lunch && item.lunch.trim()) {
            recipeNames.add(item.lunch.trim().toLowerCase());
        }
        if (item.dinner && item.dinner.trim()) {
            recipeNames.add(item.dinner.trim().toLowerCase());
        }
    });
    
    return Array.from(recipeNames);
}

filterRecipes() {
    let filtered = [...this.recipes];
    
    // Apply category filter (existing)
    if (this.currentCategory !== 'all') {
        filtered = filtered.filter(r => r.category === this.currentCategory);
    }
    
    // Apply menu filter (NEW)
    if (this.activeMenuFilter) {
        const menu = this.getMenuById(this.activeMenuFilter);
        if (menu) {
            const recipeNames = this.getRecipeNamesFromMenu(menu);
            filtered = filtered.filter(recipe => {
                const recipeName = recipe.name.toLowerCase();
                return recipeNames.some(name => recipeName.includes(name));
            });
        }
    }
    
    // Apply sorting (existing)
    // ...
    
    // Render filtered recipes
    this.renderRecipes(filtered);
}
```

### Render Menu Filter Chips

```javascript
renderMenuFilterChips() {
    const menuFilterBar = document.getElementById('menu-filter-bar');
    const menuFilterChips = document.getElementById('menu-filter-chips');
    
    if (!menuFilterBar || !menuFilterChips) return;
    
    // Get menus marked as filters
    const filterMenus = this.getMenuFilters();
    
    // Hide section if no filter menus
    if (filterMenus.length === 0) {
        menuFilterBar.classList.add('hidden');
        return;
    }
    
    // Show section
    menuFilterBar.classList.remove('hidden');
    
    // Clear existing chips
    menuFilterChips.innerHTML = '';
    
    // Create chip for each filter menu
    filterMenus.forEach(menu => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip';
        chip.dataset.menuId = menu.id;
        chip.textContent = `📋 ${menu.name}`;
        
        // Mark as active if this is the active filter
        if (this.activeMenuFilter === menu.id) {
            chip.classList.add('active');
        }
        
        // Add click handler
        chip.onclick = () => this.handleMenuFilterClick(menu.id);
        
        menuFilterChips.appendChild(chip);
    });
}
```

## Error Handling

### Edge Cases

| Scenario | Handling |
|----------|----------|
| Menu deleted while being filter | Remove from filters automatically |
| Menu renamed | Filter continues working with new name |
| Recipe name doesn't match exactly | Use case-insensitive partial matching |
| No recipes match menu filter | Show empty state |
| Menu has no items | Show warning, don't allow as filter |
| Multiple menus with same recipes | Allow, filters work independently |

## Testing Strategy

### Manual Testing Checklist

#### Menu Filter Creation
- [ ] Click "Convertir en Filtro" on a menu
- [ ] Verify button changes to "Quitar de Filtros"
- [ ] Verify badge "(FILTRO ACTIVO) ✓" appears
- [ ] Verify menu appears in home page filters
- [ ] Verify state persists after page reload

#### Menu Filtering
- [ ] Click menu filter chip on home page
- [ ] Verify only recipes from that menu are shown
- [ ] Verify chip is marked as active
- [ ] Click chip again to deactivate
- [ ] Verify all recipes are shown again

#### Combined Filtering
- [ ] Activate a category filter
- [ ] Activate a menu filter
- [ ] Verify only recipes matching both filters are shown
- [ ] Deactivate category filter
- [ ] Verify menu filter still works
- [ ] Click "Todos" in categories
- [ ] Verify menu filter is also cleared

#### Filter Removal
- [ ] Click "Quitar de Filtros" on a menu
- [ ] Verify menu disappears from home filters
- [ ] Verify badge is removed
- [ ] Verify button changes back to "Convertir en Filtro"
- [ ] If filter was active, verify it's deactivated

#### Edge Cases
- [ ] Delete a menu that is a filter
- [ ] Verify it's removed from filters automatically
- [ ] Create menu with no items
- [ ] Try to convert to filter (should show warning)
- [ ] Test with special characters in menu/recipe names

## Performance Considerations

- Menu filter state stored in localStorage (minimal overhead)
- Recipe name extraction happens on filter activation (not on every render)
- Filter chips only rendered when menus marked as filters exist
- Case-insensitive matching uses toLowerCase() (acceptable performance)

## Future Enhancements

- Allow multiple menu filters active simultaneously
- Add "smart matching" for recipe names (fuzzy matching)
- Show recipe count in menu filter chips
- Add drag-and-drop to reorder menu filter chips
- Export/import menu filter configuration
