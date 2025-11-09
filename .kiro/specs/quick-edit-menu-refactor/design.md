# Design Document

## Overview

This design refactors the quick edit menu functionality to eliminate code duplication by reusing the existing menu editing system. The key insight is that quick edit and normal menu editing share the same workflow (select category → select recipe → save), so they should use the same functions with a flag to differentiate behavior.

## Architecture

### Current Architecture (Problematic)

```
quickEditMeal()
    ↓
openCategorySelectorForQuickEdit()  ← Duplicate logic
    ↓
openRecipeSelectorForQuickEdit()    ← Duplicate logic
    ↓
Save to menu + renderMenus()
```

**Problems:**
- Duplicate functions with similar logic
- Multiple event listeners on same buttons
- Event listener conflicts causing incorrect behavior
- Difficult to maintain (changes must be made in two places)

### New Architecture (Proposed)

```
quickEditMeal()
    ↓
    Creates temp input with isQuickEdit flag
    ↓
openCategorySelectorForMenu(input)  ← Reuse existing
    ↓
    Detects isQuickEdit flag
    ↓
Recipe selection modal (existing)
    ↓
    Confirm button detects isQuickEdit
    ↓
    IF isQuickEdit: Save to menu + renderMenus()
    ELSE: Update input value only
```

**Benefits:**
- Single source of truth for modal logic
- No duplicate event listeners
- Easier to maintain and debug
- Consistent behavior across edit modes

## Components and Interfaces

### Modified Functions

#### 1. `quickEditMeal(menuId, itemId, mealType)`

**Purpose:** Entry point for quick edit functionality

**Changes:**
- Keep existing logic for creating temp input
- Add `isQuickEdit: 'true'` to dataset
- Call `openCategorySelectorForMenu(tempInput)` instead of separate function
- Store reference in `this.currentQuickEditInput`

**Signature:**
```javascript
quickEditMeal(menuId, itemId, mealType) {
    // Create temp input with metadata
    const tempInput = document.createElement('input');
    tempInput.dataset.menuId = menuId;
    tempInput.dataset.itemId = itemId;
    tempInput.dataset.mealType = mealType;
    tempInput.dataset.dayName = item.name;
    tempInput.dataset.isQuickEdit = 'true'; // KEY FLAG
    
    this.currentQuickEditInput = tempInput;
    this.openCategorySelectorForMenu(tempInput);
}
```

#### 2. `openCategorySelectorForMenu(inputElement)`

**Purpose:** Open category selector modal (existing function)

**Changes:**
- Detect `isQuickEdit` flag from input dataset
- Store reference appropriately based on mode
- Existing event listeners already handle both modes

**Detection Logic:**
```javascript
const isQuickEdit = inputElement.dataset.isQuickEdit === 'true';
if (isQuickEdit) {
    this.currentQuickEditInput = inputElement;
}
```

#### 3. Recipe Selector Modal Confirm Button

**Purpose:** Handle recipe selection confirmation

**Changes:**
- Detect quick edit mode from stored input reference
- Branch behavior based on mode:
  - **Quick Edit:** Save directly to menu + renderMenus()
  - **Normal Edit:** Update input value only

**Logic:**
```javascript
confirmBtn.onclick = () => {
    const selectedRecipe = getSelectedRecipe();
    const inputElement = this.pendingMenuInput || this.currentQuickEditInput;
    
    if (inputElement.dataset.isQuickEdit === 'true') {
        // Quick edit mode: save to menu
        const menuId = parseInt(inputElement.dataset.menuId);
        const itemId = inputElement.dataset.itemId;
        const mealType = inputElement.dataset.mealType;
        
        updateMenuMeal(menuId, itemId, mealType, selectedRecipe);
        saveToLocalStorage();
        this.renderMenus();
        this.showToast('Receta actualizada', 'success');
    } else {
        // Normal mode: update input
        inputElement.value = selectedRecipe;
        inputElement.dataset.categoryId = categoryId;
    }
    
    closeModal();
};
```

### Functions to Remove

1. **`openCategorySelectorForQuickEdit(inputElement)`**
   - Lines: ~10375-10468
   - Reason: Duplicate of `openCategorySelectorForMenu`

2. **`openRecipeSelectorForQuickEdit(inputElement)`**
   - Lines: ~10470-10650
   - Reason: Duplicate logic, handled by existing recipe selector

## Data Models

### Input Element Dataset (Enhanced)

```javascript
{
    menuId: string,        // Menu ID
    itemId: string,        // Menu item (day) ID
    mealType: string,      // 'lunch' or 'dinner'
    dayName: string,       // Day name for display
    categoryId: string,    // Selected category ID
    isQuickEdit: string,   // 'true' for quick edit mode
}
```

### State Management

**Instance Variables:**
- `this.currentQuickEditInput` - Reference to temp input during quick edit
- `this.pendingMenuInput` - Reference to input for normal menu editing
- `this.currentMenuCategoryInput` - Current input being edited (legacy, may be consolidated)

**Consolidation Strategy:**
Use `this.pendingMenuInput` for both modes, detect mode via `isQuickEdit` flag.

## Error Handling

### Scenario 1: Menu Not Found
```javascript
const menu = this.getMenuById(menuId);
if (!menu) {
    console.error('[Quick Edit] Menu not found:', menuId);
    this.showToast('Error: Menú no encontrado', 'error');
    return;
}
```

### Scenario 2: Item Not Found
```javascript
const item = menu.items.find(i => i.id === itemId);
if (!item) {
    console.error('[Quick Edit] Item not found:', itemId);
    this.showToast('Error: Día no encontrado', 'error');
    return;
}
```

### Scenario 3: No Recipe Selected
```javascript
const selectedItem = recipeList.querySelector('.menu-recipe-item.selected');
if (!selectedItem) {
    this.showToast('Por favor selecciona una receta', 'warning');
    return;
}
```

### Scenario 4: Save Failed
```javascript
try {
    localStorage.setItem('recetario_menus', JSON.stringify(menus));
} catch (error) {
    console.error('[Quick Edit] Save failed:', error);
    this.showToast('Error al guardar el menú', 'error');
    return;
}
```

## Testing Strategy

### Unit Tests (Manual)

1. **Test Quick Edit Flow**
   - Click on lunch cell → Category modal opens
   - Select category → "Ver Recetas" button appears
   - Click "Ver Recetas" → Recipe modal opens with filtered recipes
   - Select recipe → Recipe highlights, confirm button enables
   - Click confirm → Meal updates, modal closes, toast shows

2. **Test Normal Edit Flow**
   - Open menu edit modal
   - Click on meal input → Category modal opens
   - Select category → "Ver Recetas" button appears
   - Click "Ver Recetas" → Recipe modal opens
   - Select recipe → Input value updates
   - Save menu → Menu saves correctly

3. **Test Event Listener Uniqueness**
   - Open category modal multiple times
   - Verify "Ver Recetas" button only fires once per click
   - Open recipe modal multiple times
   - Verify "Confirmar" button only fires once per click

### Integration Tests

1. **Test Data Persistence**
   - Quick edit a meal
   - Refresh page
   - Verify meal value persists

2. **Test Menu Re-rendering**
   - Expand a menu
   - Quick edit a meal in that menu
   - Verify menu stays expanded after update
   - Verify updated value displays correctly

### Edge Cases

1. **Category with No Recipes**
   - Select category with no menu-friendly recipes
   - Verify warning toast appears
   - Verify modal closes gracefully

2. **Rapid Clicking**
   - Click meal cell multiple times rapidly
   - Verify only one modal opens
   - Verify no duplicate event listeners

3. **Cancel Operations**
   - Open category modal → Close without selecting
   - Open recipe modal → Close without selecting
   - Verify no changes are saved
   - Verify state is cleaned up

## Implementation Notes

### Event Listener Management

**Problem:** Multiple calls to modal functions create duplicate listeners

**Solution:** Use event listener replacement strategy:
```javascript
// Clone button to remove all listeners
const newBtn = oldBtn.cloneNode(true);
oldBtn.parentNode.replaceChild(newBtn, oldBtn);

// Add single new listener
newBtn.onclick = handler;
```

**Alternative:** Use `once: true` option:
```javascript
button.addEventListener('click', handler, { once: true });
```

### Console Logging Strategy

Keep detailed logging for debugging:
```javascript
console.log('[Quick Edit] quickEditMeal called', {menuId, itemId, mealType});
console.log('[Quick Edit] Menu found:', menu.name);
console.log('[Quick Edit] Before update:', item.lunch);
console.log('[Quick Edit] After update:', item.lunch);
console.log('[Quick Edit] Saved to localStorage');
```

Remove or disable in production:
```javascript
const DEBUG = false;
if (DEBUG) console.log('[Quick Edit] ...');
```

### Performance Considerations

1. **Minimize Re-renders**
   - Only call `renderMenus()` after successful save
   - Consider partial updates for single menu items

2. **Modal Transitions**
   - Use 300ms delay between modal transitions
   - Prevents visual glitches and event conflicts

3. **LocalStorage Writes**
   - Batch updates if multiple meals edited
   - Consider debouncing for rapid edits

## Migration Path

### Step 1: Modify `quickEditMeal`
- Update to call `openCategorySelectorForMenu`
- Ensure `isQuickEdit` flag is set

### Step 2: Update Recipe Selector Confirm Handler
- Add quick edit detection
- Implement save logic for quick edit mode
- Test both modes work correctly

### Step 3: Remove Duplicate Functions
- Delete `openCategorySelectorForQuickEdit`
- Delete `openRecipeSelectorForQuickEdit`
- Remove any references to these functions

### Step 4: Clean Up State Variables
- Consolidate `currentQuickEditInput` and `pendingMenuInput` if possible
- Document remaining state variables

### Step 5: Testing
- Test all quick edit scenarios
- Test all normal edit scenarios
- Verify no regressions

## Design Decisions and Rationales

### Decision 1: Reuse Existing Functions
**Rationale:** Quick edit and normal edit share 90% of the same logic. Duplicating this logic creates maintenance burden and increases bug surface area.

### Decision 2: Use Flag Instead of Separate Code Path
**Rationale:** A simple boolean flag (`isQuickEdit`) is easier to understand and maintain than separate function hierarchies.

### Decision 3: Keep Temp Input Element
**Rationale:** The existing system expects an input element. Creating a temp element is simpler than refactoring the entire modal system.

### Decision 4: Clone Buttons to Remove Listeners
**Rationale:** Cloning is the most reliable way to remove all event listeners. Alternative approaches (tracking listeners, using `removeEventListener`) are more complex and error-prone.

### Decision 5: Preserve Console Logging
**Rationale:** The quick edit flow is complex. Detailed logging helps debug issues. Can be disabled in production if needed.
