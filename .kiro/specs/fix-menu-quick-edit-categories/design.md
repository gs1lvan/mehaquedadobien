# Design Document: Fix Menu Quick Edit Categories

## Overview

This design addresses the issue where categories appear disabled in the quick edit modal even when they contain the currently edited recipe. The root cause is that menus store recipes by name (string) instead of unique IDs, making it impossible to accurately identify and count the current recipe when checking category availability.

The solution involves:
1. Migrating menu storage from recipe names to recipe IDs
2. Updating the quick edit flow to pass current recipe context
3. Modifying category availability logic to include the current recipe
4. Maintaining backward compatibility with existing menu data

## Architecture

### Current Architecture (Problem)

```
Menu Item Structure:
{
  id: "item-123",
  name: "Lunes",
  lunch: "Paella de mariscos",  // ❌ String name
  dinner: "Ensalada César"       // ❌ String name
}

Quick Edit Flow:
1. User clicks edit on "Paella de mariscos"
2. System creates tempInput with value = "Paella de mariscos"
3. System opens category selector
4. renderCategorySelectorChips() checks each category:
   - Filters recipes: menuFriendly === true && category === categoryId
   - Counts recipes in category
   - If count === 0, disables category
5. ❌ "Paella de mariscos" is not counted because:
   - It's stored as a string in the menu
   - No way to match it back to the recipe object
   - Category appears disabled even though it has this recipe
```

### Proposed Architecture (Solution)

```
Menu Item Structure (New):
{
  id: "item-123",
  name: "Lunes",
  lunchId: "recipe-456",         // ✅ Recipe ID
  lunchName: "Paella de mariscos", // ✅ Cached name for display
  dinnerId: "recipe-789",        // ✅ Recipe ID
  dinnerName: "Ensalada César"   // ✅ Cached name for display
}

Quick Edit Flow (Fixed):
1. User clicks edit on meal
2. System gets current recipe ID from menu item
3. System creates tempInput with:
   - value = recipe name (for display)
   - dataset.recipeId = recipe ID (for logic)
4. System opens category selector with currentRecipeId parameter
5. renderCategorySelectorChips(preSelect, isQuickEdit, currentRecipeId):
   - For each category, filters recipes:
     * menuFriendly === true && category === categoryId
     * OR recipe.id === currentRecipeId (include current recipe)
   - Counts recipes including current one
   - ✅ Category is enabled if it has the current recipe
```

## Components and Interfaces

### 1. Menu Item Data Model

**Current:**
```javascript
{
  id: string,
  name: string,
  lunch: string | null,    // Recipe name
  dinner: string | null    // Recipe name
}
```

**Proposed:**
```javascript
{
  id: string,
  name: string,
  // New ID-based fields (primary)
  lunchId: string | null,     // Recipe ID
  dinnerId: string | null,    // Recipe ID
  // Cached names for display (secondary)
  lunchName: string | null,   // Recipe name (cached)
  dinnerName: string | null,  // Recipe name (cached)
  // Legacy fields (for backward compatibility)
  lunch: string | null,       // Deprecated, kept for migration
  dinner: string | null       // Deprecated, kept for migration
}
```

### 1.1 Recipe Data Model (Enhanced)

**Current:**
```javascript
{
  id: string,
  name: string,
  category: string,
  ingredients: Array<{name: string, quantity: string, unit: string}>,
  sequences: Array<{description: string, ingredients: Array<string>}>,
  images: Array<{name: string, data: string}>
}
```

**Proposed:**
```javascript
{
  id: string,                    // Unique recipe ID
  name: string,
  category: string,
  ingredients: Array<{
    id: string,                  // ✅ NEW: Unique ingredient ID
    name: string,
    quantity: string,
    unit: string
  }>,
  sequences: Array<{
    id: string,                  // ✅ NEW: Unique sequence ID
    description: string,
    ingredientIds: Array<string> // ✅ NEW: Reference ingredients by ID
  }>,
  images: Array<{
    id: string,                  // ✅ NEW: Unique image ID
    name: string,
    data: string
  }>
}
```

### 1.2 Shopping List Item Data Model (Enhanced)

**Current:**
```javascript
{
  id: string,
  name: string,
  quantity: string,
  completed: boolean
}
```

**Proposed:**
```javascript
{
  id: string,
  name: string,
  quantity: string,
  completed: boolean,
  // ✅ NEW: Source tracking
  sourceType: 'manual' | 'recipe' | 'ingredient',
  sourceRecipeId: string | null,      // Recipe ID if from recipe
  sourceIngredientId: string | null,  // Ingredient ID if specific ingredient
  sourceRecipeName: string | null     // Cached recipe name for display
}
```

### 2. Quick Edit Input Element

**Current:**
```javascript
tempInput.dataset = {
  menuId: string,
  itemId: string,
  mealType: 'lunch' | 'dinner',
  dayName: string,
  isQuickEdit: 'true'
}
```

**Proposed:**
```javascript
tempInput.dataset = {
  menuId: string,
  itemId: string,
  mealType: 'lunch' | 'dinner',
  dayName: string,
  isQuickEdit: 'true',
  recipeId: string | null,      // NEW: Current recipe ID
  recipeName: string | null     // NEW: Current recipe name
}
```

### 3. Category Selector Rendering

**Current Function Signature:**
```javascript
renderCategorySelectorChips(preSelectCategory = true, isQuickEdit = false)
```

**Proposed Function Signature:**
```javascript
renderCategorySelectorChips(
  preSelectCategory = true, 
  isQuickEdit = false,
  currentRecipeId = null  // NEW: ID of recipe being edited
)
```

**Current Logic:**
```javascript
if (isQuickEdit) {
  const menuRecipes = this.recipes.filter(recipe =>
    recipe.menuFriendly === true && recipe.category === category.id
  );
  hasRecipes = menuRecipes.length > 0;
}
```

**Proposed Logic:**
```javascript
if (isQuickEdit) {
  const menuRecipes = this.recipes.filter(recipe =>
    (recipe.menuFriendly === true && recipe.category === category.id) ||
    (currentRecipeId && recipe.id === currentRecipeId && recipe.category === category.id)
  );
  hasRecipes = menuRecipes.length > 0;
}
```

### 4. Menu Manager Methods

**New Methods:**

```javascript
class MenuManager {
  /**
   * Get recipe ID from menu item meal
   * @param {Object} item - Menu item
   * @param {string} mealType - 'lunch' or 'dinner'
   * @returns {string|null} Recipe ID or null
   */
  getRecipeIdFromMeal(item, mealType) {
    const idField = mealType === 'lunch' ? 'lunchId' : 'dinnerId';
    return item[idField] || null;
  }

  /**
   * Get recipe name from menu item meal (with fallback to legacy format)
   * @param {Object} item - Menu item
   * @param {string} mealType - 'lunch' or 'dinner'
   * @returns {string|null} Recipe name or null
   */
  getRecipeNameFromMeal(item, mealType) {
    const nameField = mealType === 'lunch' ? 'lunchName' : 'dinnerName';
    const legacyField = mealType === 'lunch' ? 'lunch' : 'dinner';
    return item[nameField] || item[legacyField] || null;
  }

  /**
   * Set recipe for menu item meal
   * @param {Object} item - Menu item
   * @param {string} mealType - 'lunch' or 'dinner'
   * @param {Object} recipe - Recipe object with id and name
   */
  setRecipeForMeal(item, mealType, recipe) {
    if (mealType === 'lunch') {
      item.lunchId = recipe.id;
      item.lunchName = recipe.name;
      // Keep legacy field for compatibility
      item.lunch = recipe.name;
    } else {
      item.dinnerId = recipe.id;
      item.dinnerName = recipe.name;
      // Keep legacy field for compatibility
      item.dinner = recipe.name;
    }
  }

  /**
   * Migrate legacy menu item to new format
   * @param {Object} item - Menu item with legacy format
   * @param {Array} recipes - All available recipes
   * @returns {Object} Migrated menu item
   */
  migrateLegacyMenuItem(item, recipes) {
    // Migrate lunch
    if (item.lunch && !item.lunchId) {
      const recipe = recipes.find(r => r.name === item.lunch);
      if (recipe) {
        item.lunchId = recipe.id;
        item.lunchName = recipe.name;
      } else {
        // Recipe not found, keep as text-only
        item.lunchName = item.lunch;
        item.lunchId = null;
      }
    }

    // Migrate dinner
    if (item.dinner && !item.dinnerId) {
      const recipe = recipes.find(r => r.name === item.dinner);
      if (recipe) {
        item.dinnerId = recipe.id;
        item.dinnerName = recipe.name;
      } else {
        // Recipe not found, keep as text-only
        item.dinnerName = item.dinner;
        item.dinnerId = null;
      }
    }

    return item;
  }
}
```

## Data Flow

### Quick Edit Flow (Detailed)

```
1. User Action: Click edit button on menu meal
   ↓
2. quickEditMeal(menuId, itemId, mealType)
   - Get menu by ID
   - Get item by ID
   - Get current recipe ID: item.lunchId or item.dinnerId
   - Get current recipe name: item.lunchName or item.dinnerName
   ↓
3. Create tempInput element
   - value = recipe name (for display)
   - dataset.recipeId = recipe ID
   - dataset.recipeName = recipe name
   - dataset.isQuickEdit = 'true'
   - dataset.menuId, itemId, mealType, dayName
   ↓
4. openCategorySelectorForMenu(tempInput)
   - Extract currentRecipeId from tempInput.dataset.recipeId
   - Check if recipe has category and recipes available
   - Call renderCategorySelectorChips(false, true, currentRecipeId)
   ↓
5. renderCategorySelectorChips(false, true, currentRecipeId)
   - For each category:
     * Filter recipes: (menuFriendly && category match) OR (id === currentRecipeId && category match)
     * hasRecipes = filtered.length > 0
     * If hasRecipes: enable chip
     * If !hasRecipes: disable chip
   ↓
6. User selects category
   - If category has recipes: open recipe selector
   - If category has no recipes: set category only
   ↓
7. User selects recipe
   - Update menu item with recipe ID and name
   - Save menu
   - Refresh display
```

### Menu Loading and Migration Flow

```
1. Load menus from localStorage
   ↓
2. For each menu:
   ↓
3. For each menu item:
   - Check if item has lunchId/dinnerId (new format)
   - If NO: migrate from lunch/dinner (legacy format)
     * Find recipe by name
     * Set lunchId/dinnerId
     * Set lunchName/dinnerName
     * Keep legacy fields for compatibility
   - If YES: validate IDs still exist
     * Look up recipe by ID
     * Update cached name if recipe name changed
   ↓
4. Save migrated menus back to localStorage
   ↓
5. Render menus with new format
```

## Error Handling

### Recipe Not Found

**Scenario:** Menu references a recipe ID that no longer exists

**Handling:**
```javascript
function getRecipeForDisplay(recipeId, recipeName) {
  if (!recipeId) {
    return recipeName || 'Sin receta';
  }

  const recipe = this.getRecipeById(recipeId);
  if (recipe) {
    return recipe.name;
  }

  // Recipe deleted, show cached name with indicator
  return `${recipeName} (receta eliminada)`;
}
```

### Legacy Data Migration

**Scenario:** Menu has recipe name but no matching recipe exists

**Handling:**
```javascript
function migrateLegacyMenuItem(item, recipes) {
  if (item.lunch && !item.lunchId) {
    const recipe = recipes.find(r => r.name === item.lunch);
    if (recipe) {
      item.lunchId = recipe.id;
      item.lunchName = recipe.name;
    } else {
      // Keep as text-only entry
      item.lunchName = item.lunch;
      item.lunchId = null;
      console.warn(`Recipe not found for lunch: ${item.lunch}`);
    }
  }
  return item;
}
```

### Multiple Recipes with Same Name

**Scenario:** Multiple recipes have the same name during migration

**Handling:**
```javascript
function findRecipeByName(name, recipes) {
  const matches = recipes.filter(r => r.name === name);
  
  if (matches.length === 0) {
    return null;
  }
  
  if (matches.length === 1) {
    return matches[0];
  }
  
  // Multiple matches: prefer menu-friendly recipe
  const menuFriendly = matches.find(r => r.menuFriendly === true);
  if (menuFriendly) {
    return menuFriendly;
  }
  
  // No menu-friendly match: return first match
  console.warn(`Multiple recipes found for name: ${name}, using first match`);
  return matches[0];
}
```

## Testing Strategy

### Unit Tests

1. **Menu Item Migration**
   - Test migrating item with valid recipe names
   - Test migrating item with invalid recipe names
   - Test migrating item with multiple matching recipes
   - Test migrating already-migrated items (idempotent)

2. **Recipe ID Lookup**
   - Test getting recipe by ID (exists)
   - Test getting recipe by ID (not exists)
   - Test getting recipe name with valid ID
   - Test getting recipe name with invalid ID

3. **Category Availability**
   - Test category with current recipe only
   - Test category with current recipe + others
   - Test category with no recipes
   - Test category with other recipes but not current

### Integration Tests

1. **Quick Edit Flow**
   - Test editing meal with recipe in category
   - Test editing meal with recipe as only one in category
   - Test editing meal without recipe
   - Test changing category in quick edit
   - Test changing recipe in quick edit

2. **Menu Display**
   - Test displaying menu with new format
   - Test displaying menu with legacy format
   - Test displaying menu with mixed format
   - Test displaying menu with deleted recipes

3. **Data Persistence**
   - Test saving menu with new format
   - Test loading menu with new format
   - Test migrating and saving legacy menu
   - Test export/import with new format

### Manual Testing Checklist

- [ ] Create new menu with recipes → verify IDs are stored
- [ ] Edit existing menu meal → verify category shows as available
- [ ] Edit meal with recipe as only one in category → verify category enabled
- [ ] Delete recipe used in menu → verify menu shows "receta eliminada"
- [ ] Rename recipe used in menu → verify menu shows new name
- [ ] Import legacy menu → verify automatic migration
- [ ] Export and re-import menu → verify data integrity

## Performance Considerations

### Recipe Lookup Optimization

**Problem:** Looking up recipes by ID on every render could be slow

**Solution:** Create a recipe ID → recipe object map

```javascript
class RecipeApp {
  constructor() {
    this.recipes = [];
    this.recipeMap = new Map(); // ID → recipe object
  }

  updateRecipeMap() {
    this.recipeMap.clear();
    this.recipes.forEach(recipe => {
      this.recipeMap.set(recipe.id, recipe);
    });
  }

  getRecipeById(id) {
    return this.recipeMap.get(id) || null;
  }
}
```

### Migration Performance

**Problem:** Migrating all menus on every load could be slow

**Solution:** Add migration flag to menu object

```javascript
{
  id: "menu-123",
  name: "Semana 1",
  items: [...],
  _migrated: true  // Flag to skip migration on subsequent loads
}
```

## Backward Compatibility

### Reading Legacy Data

The system will support three formats:

1. **Legacy format** (old menus):
```javascript
{
  lunch: "Paella de mariscos",
  dinner: "Ensalada César"
}
```

2. **Transitional format** (during migration):
```javascript
{
  lunch: "Paella de mariscos",      // Legacy
  dinner: "Ensalada César",         // Legacy
  lunchId: "recipe-456",            // New
  lunchName: "Paella de mariscos",  // New
  dinnerId: "recipe-789",           // New
  dinnerName: "Ensalada César"      // New
}
```

3. **New format** (after migration):
```javascript
{
  lunchId: "recipe-456",
  lunchName: "Paella de mariscos",
  dinnerId: "recipe-789",
  dinnerName: "Ensalada César",
  lunch: "Paella de mariscos",      // Kept for compatibility
  dinner: "Ensalada César"          // Kept for compatibility
}
```

### Writing Data

Always write in new format with legacy fields for compatibility:

```javascript
function saveMenuItem(item, recipe, mealType) {
  if (mealType === 'lunch') {
    item.lunchId = recipe.id;
    item.lunchName = recipe.name;
    item.lunch = recipe.name;  // Legacy compatibility
  } else {
    item.dinnerId = recipe.id;
    item.dinnerName = recipe.name;
    item.dinner = recipe.name;  // Legacy compatibility
  }
}
```

## Migration Strategy

### Phase 1: Add New Fields (Non-Breaking)

- Add lunchId, lunchName, dinnerId, dinnerName fields
- Keep existing lunch, dinner fields
- Update save logic to populate both old and new fields
- No changes to read logic yet

### Phase 2: Implement Migration (Transparent)

- Add migration logic on menu load
- Migrate legacy data to new format
- Update read logic to prefer new fields with fallback to legacy
- Add migration flag to prevent repeated migrations

### Phase 3: Update Quick Edit (Fix)

- Update quickEditMeal to extract recipe ID
- Update renderCategorySelectorChips to accept currentRecipeId
- Update category availability logic to include current recipe
- Test thoroughly

### Phase 4: Deprecate Legacy Fields (Future)

- Add console warnings when legacy fields are used
- Update documentation to recommend new format
- Plan eventual removal of legacy field support (v2.0)

## Security Considerations

### Data Validation

- Validate recipe IDs exist before saving
- Sanitize recipe names before display
- Prevent XSS through recipe name injection

### Data Integrity

- Ensure recipe IDs are immutable
- Validate menu structure before saving
- Handle corrupted data gracefully

## Shopping List Integration

### Adding All Ingredients from Recipe

```javascript
/**
 * Add all ingredients from a recipe to shopping list
 * @param {string} recipeId - Recipe ID
 * @param {string} shoppingListId - Shopping list ID
 */
addRecipeToShoppingList(recipeId, shoppingListId) {
  const recipe = this.getRecipeById(recipeId);
  if (!recipe) {
    console.error('Recipe not found:', recipeId);
    return;
  }

  const shoppingList = this.getShoppingListById(shoppingListId);
  if (!shoppingList) {
    console.error('Shopping list not found:', shoppingListId);
    return;
  }

  // Add each ingredient with source tracking
  recipe.ingredients.forEach(ingredient => {
    const item = {
      id: this.generateId(),
      name: ingredient.name,
      quantity: ingredient.quantity + (ingredient.unit ? ' ' + ingredient.unit : ''),
      completed: false,
      sourceType: 'recipe',
      sourceRecipeId: recipe.id,
      sourceIngredientId: ingredient.id,
      sourceRecipeName: recipe.name
    };
    shoppingList.items.push(item);
  });

  this.saveShoppingList(shoppingList);
}
```

### Adding Single Ingredient

```javascript
/**
 * Add single ingredient from recipe to shopping list
 * @param {string} recipeId - Recipe ID
 * @param {string} ingredientId - Ingredient ID
 * @param {string} shoppingListId - Shopping list ID
 */
addIngredientToShoppingList(recipeId, ingredientId, shoppingListId) {
  const recipe = this.getRecipeById(recipeId);
  if (!recipe) return;

  const ingredient = recipe.ingredients.find(i => i.id === ingredientId);
  if (!ingredient) return;

  const shoppingList = this.getShoppingListById(shoppingListId);
  if (!shoppingList) return;

  const item = {
    id: this.generateId(),
    name: ingredient.name,
    quantity: ingredient.quantity + (ingredient.unit ? ' ' + ingredient.unit : ''),
    completed: false,
    sourceType: 'ingredient',
    sourceRecipeId: recipe.id,
    sourceIngredientId: ingredient.id,
    sourceRecipeName: recipe.name
  };

  shoppingList.items.push(item);
  this.saveShoppingList(shoppingList);
}
```

## Menu to Shopping List Conversion

### Convert Entire Menu

```javascript
/**
 * Convert menu to shopping list
 * @param {string} menuId - Menu ID
 * @returns {Object} New shopping list
 */
convertMenuToShoppingList(menuId) {
  const menu = this.getMenuById(menuId);
  if (!menu) {
    console.error('Menu not found:', menuId);
    return null;
  }

  // Extract all unique recipe IDs from menu
  const recipeIds = new Set();
  menu.items.forEach(item => {
    if (item.lunchId) recipeIds.add(item.lunchId);
    if (item.dinnerId) recipeIds.add(item.dinnerId);
  });

  // Create new shopping list
  const shoppingList = {
    id: this.generateId(),
    name: `Lista de ${menu.name}`,
    items: [],
    enabled: true,
    createdAt: new Date().toISOString()
  };

  // Ingredient consolidation map: name -> {quantity, unit, sources}
  const ingredientMap = new Map();

  // Process each recipe
  recipeIds.forEach(recipeId => {
    const recipe = this.getRecipeById(recipeId);
    if (!recipe) {
      console.warn('Recipe not found in menu:', recipeId);
      return;
    }

    // Add each ingredient
    recipe.ingredients.forEach(ingredient => {
      const key = ingredient.name.toLowerCase();
      
      if (ingredientMap.has(key)) {
        // Consolidate duplicate ingredients
        const existing = ingredientMap.get(key);
        existing.sources.push({
          recipeId: recipe.id,
          recipeName: recipe.name,
          ingredientId: ingredient.id
        });
        // TODO: Add quantity consolidation logic if units match
      } else {
        // New ingredient
        ingredientMap.set(key, {
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          sources: [{
            recipeId: recipe.id,
            recipeName: recipe.name,
            ingredientId: ingredient.id
          }]
        });
      }
    });
  });

  // Convert map to shopping list items
  ingredientMap.forEach(data => {
    const item = {
      id: this.generateId(),
      name: data.name,
      quantity: data.quantity + (data.unit ? ' ' + data.unit : ''),
      completed: false,
      sourceType: 'recipe',
      sourceRecipeId: data.sources[0].recipeId,
      sourceIngredientId: data.sources[0].ingredientId,
      sourceRecipeName: data.sources.map(s => s.recipeName).join(', ')
    };
    shoppingList.items.push(item);
  });

  // Save and return
  this.saveShoppingList(shoppingList);
  return shoppingList;
}
```

## Menu Filter View

### Filter Recipes by Menu

```javascript
/**
 * Get recipes from menu for filtering
 * @param {string} menuId - Menu ID
 * @returns {Array} Array of recipe objects with menu context
 */
getRecipesFromMenu(menuId) {
  const menu = this.getMenuById(menuId);
  if (!menu) return [];

  // Extract recipe IDs with context (which day/meal)
  const recipeContextMap = new Map();

  menu.items.forEach(item => {
    // Process lunch
    if (item.lunchId) {
      if (!recipeContextMap.has(item.lunchId)) {
        recipeContextMap.set(item.lunchId, {
          recipeId: item.lunchId,
          appearances: []
        });
      }
      recipeContextMap.get(item.lunchId).appearances.push({
        day: item.name,
        meal: 'lunch'
      });
    }

    // Process dinner
    if (item.dinnerId) {
      if (!recipeContextMap.has(item.dinnerId)) {
        recipeContextMap.set(item.dinnerId, {
          recipeId: item.dinnerId,
          appearances: []
        });
      }
      recipeContextMap.get(item.dinnerId).appearances.push({
        day: item.name,
        meal: 'dinner'
      });
    }
  });

  // Look up recipes and add context
  const recipes = [];
  recipeContextMap.forEach((context, recipeId) => {
    const recipe = this.getRecipeById(recipeId);
    if (recipe) {
      recipes.push({
        ...recipe,
        menuContext: {
          menuId: menu.id,
          menuName: menu.name,
          appearances: context.appearances
        }
      });
    } else {
      // Recipe deleted, add placeholder
      recipes.push({
        id: recipeId,
        name: '(Receta eliminada)',
        deleted: true,
        menuContext: {
          menuId: menu.id,
          menuName: menu.name,
          appearances: context.appearances
        }
      });
    }
  });

  return recipes;
}

/**
 * Apply menu filter to recipe list
 * @param {string} menuId - Menu ID
 */
applyMenuFilter(menuId) {
  this.activeFilters.menuId = menuId;
  
  // Get recipes from menu
  const menuRecipes = this.getRecipesFromMenu(menuId);
  
  // Render filtered view
  this.renderRecipeList(menuRecipes);
  
  // Update filter UI
  this.updateMenuFilterBadge(menuId);
}
```

### Display Menu Context in Recipe Cards

```javascript
/**
 * Render recipe card with menu context
 * @param {Object} recipe - Recipe with menuContext
 */
renderRecipeCardWithMenuContext(recipe) {
  const card = this.createRecipeCard(recipe);
  
  if (recipe.menuContext) {
    // Add menu badge
    const menuBadge = document.createElement('div');
    menuBadge.className = 'recipe-menu-context-badge';
    
    const appearances = recipe.menuContext.appearances;
    const summary = appearances.map(a => 
      `${a.day} (${a.meal === 'lunch' ? 'Comida' : 'Cena'})`
    ).join(', ');
    
    menuBadge.innerHTML = `
      <span class="menu-icon">📋</span>
      <span class="menu-text">${recipe.menuContext.menuName}</span>
      <span class="menu-details" title="${summary}">
        ${appearances.length} ${appearances.length === 1 ? 'vez' : 'veces'}
      </span>
    `;
    
    card.appendChild(menuBadge);
  }
  
  return card;
}
```

## ID Generation Strategy

### Unique ID Generation

```javascript
/**
 * Generate unique ID for objects
 * @param {string} prefix - Optional prefix (e.g., 'recipe', 'ingredient')
 * @returns {string} Unique ID
 */
generateId(prefix = '') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

/**
 * Generate IDs for recipe sub-objects
 * @param {Object} recipe - Recipe object
 */
generateRecipeSubIds(recipe) {
  // Generate ingredient IDs
  if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
    recipe.ingredients.forEach(ingredient => {
      if (!ingredient.id) {
        ingredient.id = this.generateId('ing');
      }
    });
  }

  // Generate sequence IDs
  if (recipe.sequences && Array.isArray(recipe.sequences)) {
    recipe.sequences.forEach(sequence => {
      if (!sequence.id) {
        sequence.id = this.generateId('seq');
      }
      
      // Convert ingredient names to IDs if needed
      if (sequence.ingredients && Array.isArray(sequence.ingredients)) {
        sequence.ingredientIds = sequence.ingredients.map(ingName => {
          const ingredient = recipe.ingredients.find(i => i.name === ingName);
          return ingredient ? ingredient.id : null;
        }).filter(id => id !== null);
      }
    });
  }

  // Generate image IDs
  if (recipe.images && Array.isArray(recipe.images)) {
    recipe.images.forEach(image => {
      if (!image.id) {
        image.id = this.generateId('img');
      }
    });
  }

  return recipe;
}
```

## XML Export with IDs

### Recipe XML Structure

```xml
<recipe id="recipe-1699123456789-abc123">
  <name>Paella de mariscos</name>
  <category>seafood</category>
  <menuFriendly>true</menuFriendly>
  
  <ingredients>
    <ingredient id="ing-1699123456791-ghi789">
      <name>Arroz</name>
      <quantity>400</quantity>
      <unit>g</unit>
    </ingredient>
    <ingredient id="ing-1699123456792-jkl012">
      <name>Gambas</name>
      <quantity>300</quantity>
      <unit>g</unit>
    </ingredient>
  </ingredients>
  
  <sequences>
    <sequence id="seq-1699123456793-mno345">
      <description>Añadir arroz y sofreír</description>
      <duration>5</duration>
      <ingredientRefs>
        <ingredientRef id="ing-1699123456791-ghi789"/>
      </ingredientRefs>
    </sequence>
    <sequence id="seq-1699123456794-pqr678">
      <description>Añadir gambas y cocinar</description>
      <duration>10</duration>
      <ingredientRefs>
        <ingredientRef id="ing-1699123456792-jkl012"/>
      </ingredientRefs>
    </sequence>
  </sequences>
  
  <images>
    <image id="img-1699123456795-stu901">
      <name>paella.jpg</name>
      <type>image/jpeg</type>
      <data>base64encodeddata...</data>
    </image>
  </images>
</recipe>
```

### Menu XML Structure

```xml
<menu id="menu-1699123456796-vwx234">
  <name>Semana 1</name>
  <items>
    <item id="item-1699123456797-yza567">
      <name>Lunes</name>
      <lunchRecipeRef id="recipe-1699123456789-abc123"/>
      <dinnerRecipeRef id="recipe-1699123456798-bcd890"/>
    </item>
    <item id="item-1699123456799-cde123">
      <name>Martes</name>
      <lunchRecipeRef id="recipe-1699123456800-def456"/>
      <dinnerRecipeRef id="recipe-1699123456801-efg789"/>
    </item>
  </items>
</menu>
```

### Export Implementation

```javascript
/**
 * Export recipe to XML with IDs
 * @param {Object} recipe - Recipe object
 * @returns {string} XML string
 */
exportRecipeToXML(recipe) {
  let xml = `<recipe id="${recipe.id}">\n`;
  xml += `  <name>${this.escapeXML(recipe.name)}</name>\n`;
  xml += `  <category>${recipe.category}</category>\n`;
  xml += `  <menuFriendly>${recipe.menuFriendly || false}</menuFriendly>\n`;
  
  // Export ingredients with IDs
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    xml += `  <ingredients>\n`;
    recipe.ingredients.forEach(ing => {
      xml += `    <ingredient id="${ing.id}">\n`;
      xml += `      <name>${this.escapeXML(ing.name)}</name>\n`;
      xml += `      <quantity>${ing.quantity || ''}</quantity>\n`;
      xml += `      <unit>${ing.unit || ''}</unit>\n`;
      xml += `    </ingredient>\n`;
    });
    xml += `  </ingredients>\n`;
  }
  
  // Export sequences with ingredient ID references
  if (recipe.sequences && recipe.sequences.length > 0) {
    xml += `  <sequences>\n`;
    recipe.sequences.forEach(seq => {
      xml += `    <sequence id="${seq.id}">\n`;
      xml += `      <description>${this.escapeXML(seq.description)}</description>\n`;
      xml += `      <duration>${seq.duration || ''}</duration>\n`;
      
      if (seq.ingredientIds && seq.ingredientIds.length > 0) {
        xml += `      <ingredientRefs>\n`;
        seq.ingredientIds.forEach(ingId => {
          xml += `        <ingredientRef id="${ingId}"/>\n`;
        });
        xml += `      </ingredientRefs>\n`;
      }
      
      xml += `    </sequence>\n`;
    });
    xml += `  </sequences>\n`;
  }
  
  // Export images with IDs
  if (recipe.images && recipe.images.length > 0) {
    xml += `  <images>\n`;
    recipe.images.forEach(img => {
      xml += `    <image id="${img.id}">\n`;
      xml += `      <name>${this.escapeXML(img.name)}</name>\n`;
      xml += `      <type>${img.type || 'image/jpeg'}</type>\n`;
      xml += `      <data>${img.data}</data>\n`;
      xml += `    </image>\n`;
    });
    xml += `  </images>\n`;
  }
  
  xml += `</recipe>`;
  return xml;
}

/**
 * Export menu to XML with recipe ID references
 * @param {Object} menu - Menu object
 * @returns {string} XML string
 */
exportMenuToXML(menu) {
  let xml = `<menu id="${menu.id}">\n`;
  xml += `  <name>${this.escapeXML(menu.name)}</name>\n`;
  xml += `  <items>\n`;
  
  menu.items.forEach(item => {
    xml += `    <item id="${item.id}">\n`;
    xml += `      <name>${this.escapeXML(item.name)}</name>\n`;
    
    if (item.lunchId) {
      xml += `      <lunchRecipeRef id="${item.lunchId}"/>\n`;
    }
    
    if (item.dinnerId) {
      xml += `      <dinnerRecipeRef id="${item.dinnerId}"/>\n`;
    }
    
    xml += `    </item>\n`;
  });
  
  xml += `  </items>\n`;
  xml += `</menu>`;
  return xml;
}
```

## XML Import with IDs

### Import Implementation

```javascript
/**
 * Import recipe from XML with IDs
 * @param {string} xmlString - XML string
 * @returns {Object} Recipe object
 */
importRecipeFromXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const recipeElement = xmlDoc.querySelector('recipe');
  
  if (!recipeElement) {
    throw new Error('Invalid recipe XML');
  }
  
  // Parse recipe ID
  let recipeId = recipeElement.getAttribute('id');
  
  // Check for ID conflicts
  if (this.getRecipeById(recipeId)) {
    console.warn('Recipe ID conflict, generating new ID:', recipeId);
    recipeId = this.generateId('recipe');
  }
  
  const recipe = {
    id: recipeId,
    name: this.getElementText(recipeElement, 'name'),
    category: this.getElementText(recipeElement, 'category'),
    menuFriendly: this.getElementText(recipeElement, 'menuFriendly') === 'true',
    ingredients: [],
    sequences: [],
    images: []
  };
  
  // Parse ingredients with IDs
  const ingredientsElement = recipeElement.querySelector('ingredients');
  if (ingredientsElement) {
    const ingredientElements = ingredientsElement.querySelectorAll('ingredient');
    ingredientElements.forEach(ingElement => {
      let ingId = ingElement.getAttribute('id');
      
      // Generate new ID if missing or conflicting
      if (!ingId || this.ingredientIdExists(recipe, ingId)) {
        ingId = this.generateId('ing');
      }
      
      recipe.ingredients.push({
        id: ingId,
        name: this.getElementText(ingElement, 'name'),
        quantity: this.getElementText(ingElement, 'quantity'),
        unit: this.getElementText(ingElement, 'unit')
      });
    });
  }
  
  // Parse sequences with ingredient ID references
  const sequencesElement = recipeElement.querySelector('sequences');
  if (sequencesElement) {
    const sequenceElements = sequencesElement.querySelectorAll('sequence');
    sequenceElements.forEach(seqElement => {
      let seqId = seqElement.getAttribute('id');
      
      if (!seqId || this.sequenceIdExists(recipe, seqId)) {
        seqId = this.generateId('seq');
      }
      
      const sequence = {
        id: seqId,
        description: this.getElementText(seqElement, 'description'),
        duration: this.getElementText(seqElement, 'duration'),
        ingredientIds: []
      };
      
      // Parse ingredient references
      const ingredientRefs = seqElement.querySelectorAll('ingredientRef');
      ingredientRefs.forEach(refElement => {
        const refId = refElement.getAttribute('id');
        
        // Verify ingredient ID exists in recipe
        if (recipe.ingredients.find(i => i.id === refId)) {
          sequence.ingredientIds.push(refId);
        } else {
          console.warn('Ingredient reference not found:', refId);
        }
      });
      
      recipe.sequences.push(sequence);
    });
  }
  
  // Parse images with IDs
  const imagesElement = recipeElement.querySelector('images');
  if (imagesElement) {
    const imageElements = imagesElement.querySelectorAll('image');
    imageElements.forEach(imgElement => {
      let imgId = imgElement.getAttribute('id');
      
      if (!imgId || this.imageIdExists(recipe, imgId)) {
        imgId = this.generateId('img');
      }
      
      recipe.images.push({
        id: imgId,
        name: this.getElementText(imgElement, 'name'),
        type: this.getElementText(imgElement, 'type'),
        data: this.getElementText(imgElement, 'data')
      });
    });
  }
  
  return recipe;
}

/**
 * Import menu from XML with recipe ID references
 * @param {string} xmlString - XML string
 * @returns {Object} Menu object
 */
importMenuFromXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const menuElement = xmlDoc.querySelector('menu');
  
  if (!menuElement) {
    throw new Error('Invalid menu XML');
  }
  
  let menuId = menuElement.getAttribute('id');
  
  if (this.getMenuById(menuId)) {
    menuId = this.generateId('menu');
  }
  
  const menu = {
    id: menuId,
    name: this.getElementText(menuElement, 'name'),
    items: []
  };
  
  const itemElements = menuElement.querySelectorAll('item');
  itemElements.forEach(itemElement => {
    let itemId = itemElement.getAttribute('id');
    
    if (!itemId) {
      itemId = this.generateId('item');
    }
    
    const item = {
      id: itemId,
      name: this.getElementText(itemElement, 'name')
    };
    
    // Parse lunch recipe reference
    const lunchRef = itemElement.querySelector('lunchRecipeRef');
    if (lunchRef) {
      const lunchRecipeId = lunchRef.getAttribute('id');
      const lunchRecipe = this.getRecipeById(lunchRecipeId);
      
      if (lunchRecipe) {
        item.lunchId = lunchRecipeId;
        item.lunchName = lunchRecipe.name;
        item.lunch = lunchRecipe.name; // Legacy compatibility
      } else {
        console.warn('Lunch recipe not found:', lunchRecipeId);
        item.lunchName = '(Receta no encontrada)';
      }
    }
    
    // Parse dinner recipe reference
    const dinnerRef = itemElement.querySelector('dinnerRecipeRef');
    if (dinnerRef) {
      const dinnerRecipeId = dinnerRef.getAttribute('id');
      const dinnerRecipe = this.getRecipeById(dinnerRecipeId);
      
      if (dinnerRecipe) {
        item.dinnerId = dinnerRecipeId;
        item.dinnerName = dinnerRecipe.name;
        item.dinner = dinnerRecipe.name; // Legacy compatibility
      } else {
        console.warn('Dinner recipe not found:', dinnerRecipeId);
        item.dinnerName = '(Receta no encontrada)';
      }
    }
    
    menu.items.push(item);
  });
  
  return menu;
}

/**
 * Import legacy XML without IDs (backward compatibility)
 * @param {string} xmlString - XML string
 * @returns {Object} Recipe object with generated IDs
 */
importLegacyRecipeFromXML(xmlString) {
  // Parse legacy format
  const recipe = this.parseLegacyXML(xmlString);
  
  // Generate IDs for all objects
  recipe.id = this.generateId('recipe');
  
  recipe.ingredients = recipe.ingredients.map(ing => ({
    ...ing,
    id: this.generateId('ing')
  }));
  
  recipe.sequences = recipe.sequences.map(seq => {
    // Convert ingredient names to IDs
    const ingredientIds = seq.ingredients.map(ingName => {
      const ingredient = recipe.ingredients.find(i => i.name === ingName);
      return ingredient ? ingredient.id : null;
    }).filter(id => id !== null);
    
    return {
      ...seq,
      id: this.generateId('seq'),
      ingredientIds
    };
  });
  
  recipe.images = recipe.images.map(img => ({
    ...img,
    id: this.generateId('img')
  }));
  
  return recipe;
}
```

## Conclusion

This enhanced design provides a comprehensive solution that:

1. **Fixes the immediate issue:** Categories appear correctly in quick edit
2. **Implements ID-based architecture:** All objects use unique IDs for references
3. **Enables shopping list integration:** Track ingredient sources by recipe/ingredient ID
4. **Enables menu-to-shopping-list conversion:** Automatically extract ingredients from menu recipes
5. **Enables menu filtering:** Filter recipes by their presence in menus
6. **Enables XML export with IDs:** Preserve all ID relationships in exported data
7. **Enables XML import with IDs:** Restore all ID relationships from imported data
8. **Maintains backward compatibility:** Legacy data and XML formats are automatically migrated
9. **Improves data integrity:** References remain valid even when names change
10. **Enhances traceability:** Track where ingredients and recipes are used

The solution is robust, scalable, and provides a solid foundation for future features.
