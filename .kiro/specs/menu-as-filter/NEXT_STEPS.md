# Next Steps: Menu as Filter Implementation

## 📊 Current Status

**Completed:** 1 of 12 tasks (8%)

### ✅ Task 1: Data Model (COMPLETED)
- Added `isFilter: false` property to menu data model
- Updated menu creation in `saveMenu()` method
- Updated menu duplication in `duplicateMenu()` method  
- Updated menu import in `parseMenuFromTXT()` method
- Property is preserved during menu editing

**Files Modified:**
- `script.js` (3 locations updated)

---

## 🎯 Remaining Tasks (2-12)

### Task 2: Add Menu Filter Section to Home Page HTML
**What to do:**
- Open `index.html`
- Find the category filters section (`<section id="filter-bar">`)
- Add new section below it:
```html
<!-- NEW: Menu filters section -->
<section id="menu-filter-bar" class="filter-bar hidden">
    <h2 class="filter-title">Filtrar por menú:</h2>
    <div class="filter-chips" id="menu-filter-chips">
        <!-- Dynamically populated -->
    </div>
</section>
```
- Add CSS in `<style>` section for `.menu-filter-bar`

**Files to modify:** `index.html`

---

### Task 3: Add Toggle Filter Button to Menu Cards
**What to do:**
- Find where menu cards are rendered in `script.js` (search for `renderMenus`)
- Add button HTML after menu items:
```html
<button class="menu-filter-toggle-btn" data-menu-id="${menu.id}">
    ${menu.isFilter ? '❌ Quitar de Filtros' : '🔖 Convertir en Filtro'}
</button>
```
- Add CSS styles for `.menu-filter-toggle-btn`
- Add click event listener

**Files to modify:** `script.js`, `index.html` (CSS)

---

### Task 4: Implement toggleMenuAsFilter Method
**What to do:**
- Add new method to `RecipeApp` class:
```javascript
toggleMenuAsFilter(menuId) {
    const menus = this.getMenusFromStorage();
    const menu = menus.find(m => m.id === menuId);
    
    if (!menu) return;
    
    // Toggle isFilter
    menu.isFilter = !menu.isFilter;
    
    // Save to localStorage
    localStorage.setItem('recetario_menus', JSON.stringify(menus));
    
    // Clear active filter if removing
    if (!menu.isFilter && this.activeMenuFilter === menuId) {
        this.clearMenuFilter();
    }
    
    // Re-render
    this.renderMenus();
    this.renderMenuFilterChips();
    
    // Toast
    const msg = menu.isFilter 
        ? `"${menu.name}" añadido a filtros`
        : `"${menu.name}" quitado de filtros`;
    this.showToast(msg, 'success');
}
```

**Files to modify:** `script.js`

---

### Task 5: Implement Menu Filter Badge
**What to do:**
- In `renderMenus()` method, add badge to menu header:
```javascript
if (menu.isFilter) {
    headerHTML += '<span class="menu-filter-badge">(FILTRO ACTIVO) ✓</span>';
}
```
- Add CSS for `.menu-filter-badge`

**Files to modify:** `script.js`, `index.html` (CSS)

---

### Task 6: Implement getMenuFilters and renderMenuFilterChips
**What to do:**
- Add methods to `RecipeApp`:
```javascript
getMenuFilters() {
    const menus = this.getMenusFromStorage();
    return menus.filter(m => m.isFilter === true);
}

renderMenuFilterChips() {
    const menuFilterBar = document.getElementById('menu-filter-bar');
    const menuFilterChips = document.getElementById('menu-filter-chips');
    
    if (!menuFilterBar || !menuFilterChips) return;
    
    const filterMenus = this.getMenuFilters();
    
    // Hide if no filters
    if (filterMenus.length === 0) {
        menuFilterBar.classList.add('hidden');
        return;
    }
    
    // Show section
    menuFilterBar.classList.remove('hidden');
    
    // Clear and populate
    menuFilterChips.innerHTML = '';
    filterMenus.forEach(menu => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip';
        chip.dataset.menuId = menu.id;
        chip.textContent = `📋 ${menu.name}`;
        
        if (this.activeMenuFilter === menu.id) {
            chip.classList.add('active');
        }
        
        chip.onclick = () => this.handleMenuFilterClick(menu.id);
        menuFilterChips.appendChild(chip);
    });
}
```

**Files to modify:** `script.js`

---

### Task 7: Implement Menu Filtering Logic
**What to do:**
- Add `activeMenuFilter: null` to RecipeApp constructor
- Add method:
```javascript
getRecipeNamesFromMenu(menu) {
    const names = new Set();
    menu.items.forEach(item => {
        if (item.lunch?.trim()) names.add(item.lunch.trim().toLowerCase());
        if (item.dinner?.trim()) names.add(item.dinner.trim().toLowerCase());
    });
    return Array.from(names);
}
```
- Update `filterRecipes()` method to include menu filtering:
```javascript
// After category filter
if (this.activeMenuFilter) {
    const menu = this.getMenuById(this.activeMenuFilter);
    if (menu) {
        const recipeNames = this.getRecipeNamesFromMenu(menu);
        filtered = filtered.filter(recipe => {
            const name = recipe.name.toLowerCase();
            return recipeNames.some(menuName => name.includes(menuName));
        });
    }
}
```

**Files to modify:** `script.js`

---

### Task 8: Implement handleMenuFilterClick
**What to do:**
- Add method:
```javascript
handleMenuFilterClick(menuId) {
    // Toggle
    if (this.activeMenuFilter === menuId) {
        this.clearMenuFilter();
    } else {
        this.activeMenuFilter = menuId;
        this.filterRecipes();
    }
    
    // Update chips
    this.renderMenuFilterChips();
}
```

**Files to modify:** `script.js`

---

### Task 9: Implement clearMenuFilter and Integration
**What to do:**
- Add method:
```javascript
clearMenuFilter() {
    this.activeMenuFilter = null;
    this.filterRecipes();
    this.renderMenuFilterChips();
}
```
- Update "Todos" button click handler to also call `clearMenuFilter()`

**Files to modify:** `script.js`

---

### Task 10: Automatic Cleanup on Menu Delete
**What to do:**
- Find `deleteMenu()` method
- Add before deletion:
```javascript
// Clear filter if this menu is active
if (menu.isFilter && this.activeMenuFilter === menuId) {
    this.clearMenuFilter();
}
```

**Files to modify:** `script.js`

---

### Task 11: Persistence and Initialization
**What to do:**
- In `init()` or constructor, call:
```javascript
this.renderMenuFilterChips();
```
- Ensure `isFilter` property is preserved in XML export/import

**Files to modify:** `script.js`, `models.js` (XMLExporter/Importer)

---

### Task 12: Testing
**What to do:**
- Test all scenarios from verification checklist
- Verify UI updates correctly
- Test edge cases
- Cross-browser testing

---

## 🚀 Quick Start for Next Session

**Copy and paste this prompt:**

```
Continúa implementando las tareas 2-12 del spec menu-as-filter.

Contexto:
- Tarea 1 ya completada (propiedad isFilter añadida al modelo)
- Spec completo en: .kiro/specs/menu-as-filter/
- Archivos a modificar: script.js, index.html

Implementa automáticamente todas las tareas restantes siguiendo el diseño documentado.
```

---

## 📁 Spec Files Reference

- **Requirements:** `.kiro/specs/menu-as-filter/requirements.md`
- **Design:** `.kiro/specs/menu-as-filter/design.md`
- **Tasks:** `.kiro/specs/menu-as-filter/tasks.md`
- **This file:** `.kiro/specs/menu-as-filter/NEXT_STEPS.md`

---

## 🎨 Visual Reference

```
HOME PAGE LAYOUT:
┌─────────────────────────────────────────┐
│ Filtrar por categoría:                  │
│ [Todos] [🍝 Pasta] [🥗 Ensaladas] ...  │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Filtrar por menú:          ◄── NEW      │
│ [📋 Menú Semanal] [📋 Menú Navidad]    │
└─────────────────────────────────────────┘

MENU CARD:
┌─────────────────────────────────────────┐
│ 📋 Menú Semanal (FILTRO ACTIVO) ✓      │
│ [items...]                              │
│ [🔖 Convertir en Filtro] ◄── NEW       │
└─────────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **State Management:** Add `activeMenuFilter: null` to RecipeApp constructor
2. **CSS:** All new CSS should go in `<style>` section of `index.html`
3. **Event Listeners:** Add in `setupEventListeners()` method
4. **Persistence:** Use existing localStorage pattern for menus
5. **Compatibility:** Ensure works with existing category filters

---

**Estimated Time:** 2-3 hours for tasks 2-12
**Complexity:** Medium (extends existing filter system)
**Risk:** Low (well-documented, follows existing patterns)
