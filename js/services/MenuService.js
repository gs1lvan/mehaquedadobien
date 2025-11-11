/**
 * MenuService - Manages weekly menus and meal planning
 * 
 * Handles CRUD operations for menus, meal assignments,
 * and shopping list generation from menus.
 */
export class MenuService {
    constructor(storage, eventBus = null) {
        this.storage = storage;
        this.eventBus = eventBus;
        this.storageKey = 'menus';
        this.menus = [];
        this.currentMenuId = null;
        
        // Days of the week
        this.days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        
        // Meal types
        this.meals = ['desayuno', 'comida', 'cena'];
        
        this.loadMenus();
    }

    /**
     * Load menus from storage
     */
    loadMenus() {
        try {
            const stored = this.storage.get(this.storageKey, null);
            if (stored) {
                this.menus = stored;
                console.log('[MenuService] Loaded menus:', this.menus.length);
            }
        } catch (error) {
            console.error('[MenuService] Error loading menus:', error);
            this.menus = [];
        }
    }

    /**
     * Save menus to storage
     */
    saveMenus() {
        try {
            this.storage.set(this.storageKey, this.menus);
            console.log('[MenuService] Saved menus:', this.menus.length);
        } catch (error) {
            console.error('[MenuService] Error saving menus:', error);
            throw new Error('No se pudieron guardar los menús');
        }
    }

    /**
     * Get all menus
     * @returns {Array} All menus
     */
    getAll() {
        return [...this.menus];
    }

    /**
     * Get a menu by ID
     * @param {number} id - Menu ID
     * @returns {Object|null} The menu or null if not found
     */
    getById(id) {
        return this.menus.find(menu => menu.id === id) || null;
    }

    /**
     * Create a new menu
     * @param {string} name - Name of the menu
     * @returns {Object} The created menu
     */
    create(name) {
        const menu = {
            id: Date.now(),
            name: name,
            days: this.createEmptyDays(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.menus.push(menu);
        this.saveMenus();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('menu:created', menu);
        }

        console.log('[MenuService] Created menu:', menu.id, menu.name);
        return menu;
    }

    /**
     * Create empty days structure for a menu
     * @returns {Object} Empty days structure
     */
    createEmptyDays() {
        const days = {};
        this.days.forEach(day => {
            days[day] = {
                desayuno: null,
                comida: null,
                cena: null
            };
        });
        return days;
    }

    /**
     * Update a menu
     * @param {number} id - Menu ID
     * @param {Object} updates - Updates to apply
     * @returns {Object|null} The updated menu or null if not found
     */
    update(id, updates) {
        const menu = this.getById(id);
        if (!menu) {
            console.error('[MenuService] Menu not found:', id);
            return null;
        }

        Object.assign(menu, updates);
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('menu:updated', menu);
        }

        console.log('[MenuService] Updated menu:', id);
        return menu;
    }

    /**
     * Delete a menu
     * @param {number} id - Menu ID
     * @returns {boolean} True if deleted, false if not found
     */
    delete(id) {
        const index = this.menus.findIndex(menu => menu.id === id);
        if (index === -1) {
            console.error('[MenuService] Menu not found:', id);
            return false;
        }

        const deletedMenu = this.menus[index];
        this.menus.splice(index, 1);
        this.saveMenus();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('menu:deleted', { id, menu: deletedMenu });
        }

        console.log('[MenuService] Deleted menu:', id);
        return true;
    }

    /**
     * Set a recipe for a specific day and meal
     * @param {number} menuId - Menu ID
     * @param {string} day - Day of the week
     * @param {string} meal - Meal type (desayuno, comida, cena)
     * @param {string} recipeId - Recipe ID
     * @returns {boolean} Success status
     */
    setRecipe(menuId, day, meal, recipeId) {
        const menu = this.getById(menuId);
        if (!menu) {
            console.error('[MenuService] Menu not found:', menuId);
            return false;
        }

        if (!this.days.includes(day)) {
            console.error('[MenuService] Invalid day:', day);
            return false;
        }

        if (!this.meals.includes(meal)) {
            console.error('[MenuService] Invalid meal:', meal);
            return false;
        }

        // Initialize day if it doesn't exist
        if (!menu.days[day]) {
            menu.days[day] = {
                desayuno: null,
                comida: null,
                cena: null
            };
        }

        menu.days[day][meal] = recipeId;
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('menu:recipeSet', { menuId, day, meal, recipeId });
        }

        console.log('[MenuService] Set recipe:', menuId, day, meal, recipeId);
        return true;
    }

    /**
     * Clear a recipe from a specific day and meal
     * @param {number} menuId - Menu ID
     * @param {string} day - Day of the week
     * @param {string} meal - Meal type
     * @returns {boolean} Success status
     */
    clearRecipe(menuId, day, meal) {
        return this.setRecipe(menuId, day, meal, null);
    }

    /**
     * Get a recipe for a specific day and meal
     * @param {number} menuId - Menu ID
     * @param {string} day - Day of the week
     * @param {string} meal - Meal type
     * @returns {string|null} Recipe ID or null
     */
    getRecipe(menuId, day, meal) {
        const menu = this.getById(menuId);
        if (!menu) {
            return null;
        }

        if (!menu.days[day] || !menu.days[day][meal]) {
            return null;
        }

        return menu.days[day][meal];
    }

    /**
     * Get all recipes used in a menu
     * @param {number} menuId - Menu ID
     * @returns {Array<string>} Array of unique recipe IDs
     */
    getRecipesForMenu(menuId) {
        const menu = this.getById(menuId);
        if (!menu) {
            return [];
        }

        const recipeIds = new Set();

        this.days.forEach(day => {
            if (menu.days[day]) {
                this.meals.forEach(meal => {
                    const recipeId = menu.days[day][meal];
                    if (recipeId) {
                        recipeIds.add(recipeId);
                    }
                });
            }
        });

        return Array.from(recipeIds);
    }

    /**
     * Get shopping list for a menu
     * @param {number} menuId - Menu ID
     * @param {Array} recipes - All recipes (to get ingredients)
     * @returns {Object} Shopping list with aggregated ingredients
     */
    getShoppingListForMenu(menuId, recipes) {
        const menu = this.getById(menuId);
        if (!menu) {
            return { items: [], recipeCount: 0 };
        }

        const recipeIds = this.getRecipesForMenu(menuId);
        const ingredientMap = new Map();

        // Aggregate ingredients from all recipes
        recipeIds.forEach(recipeId => {
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe && recipe.ingredients) {
                recipe.ingredients.forEach(ingredient => {
                    const key = ingredient.name.toLowerCase();
                    if (ingredientMap.has(key)) {
                        // Ingredient already exists, could aggregate quantities here
                        const existing = ingredientMap.get(key);
                        existing.count++;
                        existing.recipes.push(recipe.name);
                    } else {
                        ingredientMap.set(key, {
                            name: ingredient.name,
                            quantity: ingredient.quantity || '',
                            count: 1,
                            recipes: [recipe.name]
                        });
                    }
                });
            }
        });

        const items = Array.from(ingredientMap.values());

        return {
            items: items,
            recipeCount: recipeIds.length,
            menuName: menu.name
        };
    }

    /**
     * Duplicate a menu
     * @param {number} menuId - Menu ID to duplicate
     * @param {string} newName - Name for the duplicated menu
     * @returns {Object|null} The duplicated menu or null if not found
     */
    duplicate(menuId, newName) {
        const menu = this.getById(menuId);
        if (!menu) {
            console.error('[MenuService] Menu not found:', menuId);
            return null;
        }

        const duplicated = {
            id: Date.now(),
            name: newName || `${menu.name} (copia)`,
            days: JSON.parse(JSON.stringify(menu.days)), // Deep copy
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.menus.push(duplicated);
        this.saveMenus();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('menu:duplicated', { original: menu, duplicated });
        }

        console.log('[MenuService] Duplicated menu:', menuId, 'to', duplicated.id);
        return duplicated;
    }

    /**
     * Clear all recipes from a menu
     * @param {number} menuId - Menu ID
     * @returns {boolean} Success status
     */
    clearAllRecipes(menuId) {
        const menu = this.getById(menuId);
        if (!menu) {
            console.error('[MenuService] Menu not found:', menuId);
            return false;
        }

        menu.days = this.createEmptyDays();
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('menu:cleared', menu);
        }

        console.log('[MenuService] Cleared all recipes from menu:', menuId);
        return true;
    }

    /**
     * Get count of assigned meals in a menu
     * @param {number} menuId - Menu ID
     * @returns {Object} Count of assigned meals {total, assigned, percentage}
     */
    getMealCount(menuId) {
        const menu = this.getById(menuId);
        if (!menu) {
            return { total: 0, assigned: 0, percentage: 0 };
        }

        const total = this.days.length * this.meals.length; // 7 days * 3 meals = 21
        let assigned = 0;

        this.days.forEach(day => {
            if (menu.days[day]) {
                this.meals.forEach(meal => {
                    if (menu.days[day][meal]) {
                        assigned++;
                    }
                });
            }
        });

        const percentage = total > 0 ? Math.round((assigned / total) * 100) : 0;

        return { total, assigned, percentage };
    }

    /**
     * Export menu to PDF (placeholder - actual implementation would use a PDF library)
     * @param {number} menuId - Menu ID
     * @param {Array} recipes - All recipes (to get recipe names)
     * @returns {Object} Export data
     */
    exportToPDF(menuId, recipes) {
        const menu = this.getById(menuId);
        if (!menu) {
            throw new Error('Menú no encontrado');
        }

        // This would be implemented with a PDF library like jsPDF
        // For now, return structured data
        const exportData = {
            menuName: menu.name,
            createdAt: menu.createdAt,
            days: {}
        };

        this.days.forEach(day => {
            exportData.days[day] = {};
            this.meals.forEach(meal => {
                const recipeId = menu.days[day]?.[meal];
                if (recipeId) {
                    const recipe = recipes.find(r => r.id === recipeId);
                    exportData.days[day][meal] = recipe ? recipe.name : 'Receta no encontrada';
                } else {
                    exportData.days[day][meal] = null;
                }
            });
        });

        console.log('[MenuService] Exported menu to PDF:', menuId);
        return exportData;
    }

    /**
     * Export all menus
     * @returns {Object} Export data
     */
    export() {
        return {
            version: '1.0',
            exportDate: new Date().toISOString(),
            menus: this.menus
        };
    }

    /**
     * Import menus
     * @param {Object} data - Import data
     * @returns {Object} Import result {imported, skipped, errors}
     */
    import(data) {
        const result = {
            imported: 0,
            skipped: 0,
            errors: 0
        };

        try {
            if (!data || !data.menus || !Array.isArray(data.menus)) {
                throw new Error('Formato de datos inválido');
            }

            data.menus.forEach(menu => {
                try {
                    // Check if menu already exists
                    const existing = this.menus.find(m => m.id === menu.id);
                    if (existing) {
                        result.skipped++;
                        return;
                    }

                    // Add menu
                    this.menus.push(menu);
                    result.imported++;
                } catch (error) {
                    console.error('[MenuService] Error importing menu:', error);
                    result.errors++;
                }
            });

            if (result.imported > 0) {
                this.saveMenus();

                // Emit event
                if (this.eventBus) {
                    this.eventBus.emit('menu:imported', result);
                }
            }

            console.log('[MenuService] Import result:', result);
        } catch (error) {
            console.error('[MenuService] Error importing:', error);
            throw error;
        }

        return result;
    }
}

// Export singleton instance (will be initialized in App.js)
export let menuService = null;

/**
 * Initialize menu service singleton
 * @param {Object} storage - Storage manager instance
 * @param {Object} eventBus - Event bus instance
 * @returns {MenuService} Menu service instance
 */
export function initMenuService(storage, eventBus) {
    if (!menuService) {
        menuService = new MenuService(storage, eventBus);
    }
    return menuService;
}
