// ===== Menu Management =====

/**
 * MenuManager - Manages weekly menus and their items
 * Follows the same pattern as ShoppingListManager for consistency
 */
class MenuManager {
    // Constants
    static DEFAULT_DAY_NAME = 'Sin día específico';
    static DEFAULT_RECIPE = 'Sin receta';
    static COPY_SUFFIX = ' (copia)';
    static IMPORTED_MENU_NAME = 'Menú importado';
    constructor() {
        this.menus = [];
        this.currentMenuId = null;
        this.storageKey = 'recetario_menus';
        this.idCounter = 0;
        // Note: loadMenus() should be called manually after recipes are loaded
        // to enable migration from name-based to ID-based format
    }

    /**
     * Generate unique ID
     * @returns {number} Unique ID
     */
    generateId() {
        return Date.now() + (this.idCounter++);
    }

    /**
     * Create a menu item object
     * @param {Object} itemData - Item data {name, lunch, dinner}
     * @returns {Object} Menu item
     */
    createMenuItem(itemData = {}) {
        return {
            id: this.generateId(),
            name: itemData.name || MenuManager.DEFAULT_DAY_NAME,
            lunch: itemData.lunch || MenuManager.DEFAULT_RECIPE,
            dinner: itemData.dinner || MenuManager.DEFAULT_RECIPE
        };
    }

    /**
     * Load menus from localStorage
     * @param {Function} getRecipeByName - Optional function to get recipe by name for migration
     */
    loadMenus(getRecipeByName = null) {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.menus = JSON.parse(stored);

                // Migrate old menus without enabled property
                this.menus.forEach(menu => {
                    if (menu.enabled === undefined) {
                        menu.enabled = true;
                    }
                    if (menu.isFilter === undefined) {
                        menu.isFilter = false;
                    }

                    // Add _migrated flag if not present
                    if (menu._migrated === undefined) {
                        menu._migrated = false;
                    }
                });

                // Migrate legacy menu items to ID-based format
                if (getRecipeByName) {
                    let migratedCount = 0;
                    this.menus.forEach(menu => {
                        // Skip if already migrated
                        if (menu._migrated) {
                            return;
                        }

                        // Migrate each item
                        if (menu.items && Array.isArray(menu.items)) {
                            menu.items.forEach(item => {
                                this.migrateLegacyMenuItem(item, getRecipeByName);
                            });
                        }

                        // Mark as migrated
                        menu._migrated = true;
                        migratedCount++;
                    });

                    if (migratedCount > 0) {
                        console.log(`[MenuManager] Migrated ${migratedCount} menus to ID-based format`);
                        // Save migrated menus
                        this.saveMenus();
                    }
                }

                console.log('[MenuManager] Loaded menus:', this.menus.length);
            }
        } catch (error) {
            console.error('[MenuManager] Error loading menus:', error);
            this.menus = [];
        }
    }

    /**
     * Save menus to localStorage
     */
    saveMenus() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.menus));
            console.log('[MenuManager] Saved menus:', this.menus.length);
        } catch (error) {
            console.error('[MenuManager] Error saving menus:', error);
            throw new Error('No se pudieron guardar los menús');
        }
    }

    /**
     * Create a new menu
     * @param {string} name - Name of the menu
     * @param {Array} items - Menu items (days with lunch/dinner)
     * @returns {Object} The created menu
     */
    createMenu(name, items = []) {
        const menu = {
            id: this.generateId(),
            name: name,
            items: items,
            enabled: true,
            isFilter: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.menus.push(menu);
        this.saveMenus();

        console.log('[MenuManager] Created menu:', menu.id, menu.name);
        return menu;
    }

    /**
     * Get a menu by ID
     * @param {number} id - Menu ID
     * @returns {Object|null} The menu or null if not found
     */
    getMenu(id) {
        // Convert to number for comparison to handle both string and number IDs
        const numericId = Number(id);
        return this.menus.find(menu => Number(menu.id) === numericId) || null;
    }

    /**
     * Get all menus
     * @returns {Array} All menus
     */
    getAllMenus() {
        return this.menus;
    }

    /**
     * Get enabled menus
     * @returns {Array} Enabled menus
     */
    getEnabledMenus() {
        return this.menus.filter(menu => menu.enabled !== false);
    }

    /**
     * Get disabled menus
     * @returns {Array} Disabled menus
     */
    getDisabledMenus() {
        return this.menus.filter(menu => menu.enabled === false);
    }

    /**
     * Get menus marked as filters
     * @returns {Array} Menus marked as filters
     */
    getMenuFilters() {
        return this.menus.filter(menu => menu.isFilter === true);
    }

    /**
     * Update a menu
     * @param {number} id - Menu ID
     * @param {Object} updates - Updates to apply
     * @returns {Object|null} The updated menu or null if not found
     */
    updateMenu(id, updates) {
        const menu = this.getMenu(id);
        if (!menu) {
            console.error('[MenuManager] Menu not found:', id);
            return null;
        }

        Object.assign(menu, updates);
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        console.log('[MenuManager] Updated menu:', id);
        return menu;
    }

    /**
     * Delete a menu
     * @param {number} id - Menu ID
     * @returns {boolean} True if deleted, false if not found
     */
    deleteMenu(id) {
        const index = this.menus.findIndex(menu => Number(menu.id) === Number(id));
        if (index === -1) {
            console.error('[MenuManager] Menu not found:', id);
            return false;
        }

        this.menus.splice(index, 1);
        this.saveMenus();

        console.log('[MenuManager] Deleted menu:', id);
        return true;
    }

    /**
     * Duplicate a menu
     * @param {number} id - Menu ID to duplicate
     * @returns {Object|null} The duplicated menu or null if not found
     */
    duplicateMenu(id) {
        const originalMenu = this.getMenu(id);
        if (!originalMenu) {
            console.error('[MenuManager] Menu not found:', id);
            return null;
        }

        const duplicatedMenu = {
            id: this.generateId(),
            name: `${originalMenu.name}${MenuManager.COPY_SUFFIX}`,
            items: originalMenu.items.map(item => ({ ...item, id: this.generateId() })), // Clone with new IDs
            enabled: true,
            isFilter: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.menus.push(duplicatedMenu);
        this.saveMenus();

        console.log('[MenuManager] Duplicated menu:', duplicatedMenu.id);
        return duplicatedMenu;
    }

    /**
     * Toggle enabled status of a menu
     * @param {number} id - Menu ID
     * @returns {boolean} Success status
     */
    toggleMenuEnabled(id) {
        const menu = this.getMenu(id);
        if (!menu) {
            console.error('[MenuManager] Menu not found:', id);
            return false;
        }

        menu.enabled = !menu.enabled;
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        console.log('[MenuManager] Toggled menu enabled:', id, menu.enabled);
        return true;
    }

    /**
     * Toggle menu as filter
     * @param {number} id - Menu ID
     * @returns {boolean} Success status
     */
    toggleMenuAsFilter(id) {
        const menu = this.getMenu(id);
        if (!menu) {
            console.error('[MenuManager] Menu not found:', id);
            return false;
        }

        menu.isFilter = !menu.isFilter;
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        console.log('[MenuManager] Toggled menu as filter:', id, menu.isFilter);
        return true;
    }

    /**
     * Add an item to a menu
     * @param {number} menuId - Menu ID
     * @param {Object} item - Item to add {name, lunch, dinner}
     * @returns {Object|null} The added item or null if menu not found
     */
    addItem(menuId, item) {
        const menu = this.getMenu(menuId);
        if (!menu) {
            console.error('[MenuManager] Menu not found:', menuId);
            return null;
        }

        const newItem = this.createMenuItem(item);

        menu.items.push(newItem);
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        console.log('[MenuManager] Added item to menu:', menuId, newItem.name);
        return newItem;
    }

    /**
     * Update an item in a menu
     * @param {number} menuId - Menu ID
     * @param {number} itemId - Item ID
     * @param {Object} updates - Updates to apply
     * @returns {Object|null} The updated item or null if not found
     */
    updateItem(menuId, itemId, updates) {
        const menu = this.getMenu(menuId);
        if (!menu) {
            console.error('[MenuManager] Menu not found:', menuId);
            return null;
        }

        const item = menu.items.find(i => i.id === itemId);
        if (!item) {
            console.error('[MenuManager] Item not found:', itemId);
            return null;
        }

        Object.assign(item, updates);
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        console.log('[MenuManager] Updated item:', itemId);
        return item;
    }

    /**
     * Delete an item from a menu
     * @param {number} menuId - Menu ID
     * @param {number} itemId - Item ID
     * @returns {boolean} True if deleted, false if not found
     */
    deleteItem(menuId, itemId) {
        const menu = this.getMenu(menuId);
        if (!menu) {
            console.error('[MenuManager] Menu not found:', menuId);
            return false;
        }

        const index = menu.items.findIndex(i => i.id === itemId);
        if (index === -1) {
            console.error('[MenuManager] Item not found:', itemId);
            return false;
        }

        menu.items.splice(index, 1);
        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        console.log('[MenuManager] Deleted item:', itemId);
        return true;
    }

    /**
     * Move item up in menu
     * @param {number} menuId - Menu ID
     * @param {number} itemIndex - Item index
     * @returns {boolean} Success status
     */
    moveItemUp(menuId, itemIndex) {
        if (itemIndex === 0) return false;

        const menu = this.getMenu(menuId);
        if (!menu) {
            console.error('[MenuManager] Menu not found:', menuId);
            return false;
        }

        // Swap with previous item
        [menu.items[itemIndex - 1], menu.items[itemIndex]] =
            [menu.items[itemIndex], menu.items[itemIndex - 1]];

        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        console.log('[MenuManager] Moved item up:', itemIndex);
        return true;
    }

    /**
     * Move item down in menu
     * @param {number} menuId - Menu ID
     * @param {number} itemIndex - Item index
     * @returns {boolean} Success status
     */
    moveItemDown(menuId, itemIndex) {
        const menu = this.getMenu(menuId);
        if (!menu) {
            console.error('[MenuManager] Menu not found:', menuId);
            return false;
        }

        if (itemIndex >= menu.items.length - 1) return false;

        // Swap with next item
        [menu.items[itemIndex], menu.items[itemIndex + 1]] =
            [menu.items[itemIndex + 1], menu.items[itemIndex]];

        menu.updatedAt = new Date().toISOString();
        this.saveMenus();

        console.log('[MenuManager] Moved item down:', itemIndex);
        return true;
    }

    /**
     * Get recipe names from menu (for filtering)
     * @param {Object} menu - Menu object
     * @returns {Array<string>} Array of recipe names (lowercase)
     */
    getRecipeNamesFromMenu(menu) {
        const recipeNames = new Set();

        // Helper to check if a value is a category placeholder (starts with emoji)
        const isCategoryPlaceholder = (value) => {
            if (!value) return false;
            const firstChar = value.charAt(0);
            // Check if first character is an emoji (Unicode range for emojis)
            const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
            return emojiRegex.test(firstChar) && value.split(' ').length <= 3;
        };

        menu.items.forEach(item => {
            // Add lunch recipe if not default and not a category placeholder
            if (item.lunch &&
                item.lunch !== MenuManager.DEFAULT_RECIPE &&
                !isCategoryPlaceholder(item.lunch)) {
                recipeNames.add(item.lunch.toLowerCase().trim());
            }

            // Add dinner recipe if not default and not a category placeholder
            if (item.dinner &&
                item.dinner !== MenuManager.DEFAULT_RECIPE &&
                !isCategoryPlaceholder(item.dinner)) {
                recipeNames.add(item.dinner.toLowerCase().trim());
            }
        });

        return Array.from(recipeNames);
    }

    /**
     * Get recipe metadata from menu (day, meal type)
     * @param {Object} menu - Menu object
     * @returns {Map} Map of recipe name (lowercase) to array of {day, dayNumber, mealType}
     */
    getRecipeMetadataFromMenu(menu) {
        const metadata = new Map();

        // Helper to check if a value is a category placeholder (starts with emoji)
        const isCategoryPlaceholder = (value) => {
            if (!value) return false;
            const firstChar = value.charAt(0);
            // Check if first character is an emoji (Unicode range for emojis)
            const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
            return emojiRegex.test(firstChar) && value.split(' ').length <= 3;
        };

        menu.items.forEach((item, index) => {
            const dayNumber = index + 1;
            const day = item.name || MenuManager.DEFAULT_DAY_NAME;

            // Process lunch (skip category placeholders)
            if (item.lunch &&
                item.lunch !== MenuManager.DEFAULT_RECIPE &&
                !isCategoryPlaceholder(item.lunch)) {
                const lunchName = item.lunch.toLowerCase().trim();
                if (!metadata.has(lunchName)) {
                    metadata.set(lunchName, []);
                }
                metadata.get(lunchName).push({
                    day: day,
                    dayNumber: dayNumber,
                    itemId: item.id,  // Add item.id for unique identification
                    mealType: 'lunch'
                });
            }

            // Process dinner (skip category placeholders)
            if (item.dinner &&
                item.dinner !== MenuManager.DEFAULT_RECIPE &&
                !isCategoryPlaceholder(item.dinner)) {
                const dinnerName = item.dinner.toLowerCase().trim();
                if (!metadata.has(dinnerName)) {
                    metadata.set(dinnerName, []);
                }
                metadata.get(dinnerName).push({
                    day: day,
                    dayNumber: dayNumber,
                    itemId: item.id,  // Add item.id for unique identification
                    mealType: 'dinner'
                });
            }
        });

        return metadata;
    }

    /**
     * Get categories that have recipes marked as menu
     * @param {Array} menuRecipes - Array of recipes marked as menuFriendly
     * @returns {Array} Array of category objects with recipe counts
     */
    getCategoriesWithMenuRecipes(menuRecipes) {
        const categoriesMap = new Map();

        menuRecipes.forEach(recipe => {
            const categoryId = recipe.category || 'sin-categoria';

            if (!categoriesMap.has(categoryId)) {
                categoriesMap.set(categoryId, {
                    id: categoryId,
                    count: 0,
                    recipes: []
                });
            }

            const categoryData = categoriesMap.get(categoryId);
            categoryData.count++;
            categoryData.recipes.push(recipe);
        });

        return Array.from(categoriesMap.values());
    }

    /**
     * Format menu for clipboard
     * @param {number} menuId - Menu ID
     * @returns {string} Formatted text for clipboard
     */
    formatForClipboard(menuId) {
        const menu = this.getMenu(menuId);
        if (!menu) {
            console.warn('[MenuManager] Cannot format menu: menu not found', menuId);
            return '';
        }

        const lines = [];

        // Add menu name as header
        lines.push(menu.name);
        lines.push('-----------------------------------');

        // Handle empty menu
        if (menu.items.length === 0) {
            lines.push('No hay días en este menú');
            return lines.join('\n');
        }

        // Format each day
        menu.items.forEach((item, index) => {
            const dayName = item.name || `Día ${index + 1}`;
            lines.push(`\n${dayName}:`);

            if (item.lunch && item.lunch !== MenuManager.DEFAULT_RECIPE) {
                lines.push(`  Comida: ${item.lunch}`);
            }

            if (item.dinner && item.dinner !== MenuManager.DEFAULT_RECIPE) {
                lines.push(`  Cena: ${item.dinner}`);
            }
        });

        return lines.join('\n');
    }

    /**
     * Export menu to XML format
     * @param {number} menuId - Menu ID
     * @returns {string} XML string
     */
    exportToXML(menuId) {
        const menu = this.getMenu(menuId);
        if (!menu) {
            throw new Error('Menú no encontrado');
        }

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<menu>\n';
        xml += `  <id>${menu.id}</id>\n`;
        xml += `  <name><![CDATA[${menu.name}]]></name>\n`;
        xml += `  <enabled>${menu.enabled}</enabled>\n`;
        xml += `  <isFilter>${menu.isFilter}</isFilter>\n`;
        xml += `  <createdAt>${menu.createdAt}</createdAt>\n`;
        xml += `  <updatedAt>${menu.updatedAt}</updatedAt>\n`;
        xml += '  <items>\n';

        menu.items.forEach(item => {
            xml += '    <item>\n';
            xml += `      <id>${item.id}</id>\n`;
            xml += `      <name><![CDATA[${item.name}]]></name>\n`;
            xml += `      <lunch><![CDATA[${item.lunch}]]></lunch>\n`;
            xml += `      <dinner><![CDATA[${item.dinner}]]></dinner>\n`;
            xml += '    </item>\n';
        });

        xml += '  </items>\n';
        xml += '</menu>';

        return xml;
    }

    /**
     * Import menu from XML format
     * @param {string} xmlString - XML string
     * @returns {Object} Imported menu
     */
    importFromXML(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Check for parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('Error al parsear XML: formato inválido');
        }

        const menu = {
            id: this.generateId(),
            name: xmlDoc.querySelector('name')?.textContent || MenuManager.IMPORTED_MENU_NAME,
            enabled: xmlDoc.querySelector('enabled')?.textContent === 'true',
            isFilter: false, // Don't import filter status
            items: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const itemElements = xmlDoc.querySelectorAll('item');
        itemElements.forEach(itemEl => {
            menu.items.push(this.createMenuItem({
                name: itemEl.querySelector('name')?.textContent,
                lunch: itemEl.querySelector('lunch')?.textContent,
                dinner: itemEl.querySelector('dinner')?.textContent
            }));
        });

        this.menus.push(menu);
        this.saveMenus();

        console.log('[MenuManager] Imported menu:', menu.id);
        return menu;
    }

    /**
     * Parse menu from text format
     * @param {string} text - Text content
     * @returns {Object} Parsed menu data
     */
    parseFromText(text) {
        if (!text || typeof text !== 'string') {
            throw new Error('El texto proporcionado no es válido');
        }

        const lines = text.split('\n').map(line => line.trim()).filter(line => line);

        if (lines.length === 0) {
            throw new Error('El archivo está vacío');
        }

        const menu = {
            name: lines[0], // First line is menu name
            items: []
        };

        let currentDay = null;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];

            // Skip separator lines
            if (line.match(/^-+$/)) continue;

            // Check if it's a day header (ends with :)
            if (line.endsWith(':')) {
                currentDay = {
                    name: line.slice(0, -1).trim(),
                    lunch: MenuManager.DEFAULT_RECIPE,
                    dinner: MenuManager.DEFAULT_RECIPE
                };
                menu.items.push(currentDay);
            }
            // Check if it's a meal line
            else if (currentDay && line.includes(':')) {
                const colonIndex = line.indexOf(':');
                const mealType = line.substring(0, colonIndex).trim();
                const recipeName = line.substring(colonIndex + 1).trim();

                if (mealType.toLowerCase().includes('comida')) {
                    currentDay.lunch = recipeName || MenuManager.DEFAULT_RECIPE;
                } else if (mealType.toLowerCase().includes('cena')) {
                    currentDay.dinner = recipeName || MenuManager.DEFAULT_RECIPE;
                }
            }
        }

        return menu;
    }

    /**
     * Get recipe ID from menu item meal
     * @param {Object} item - Menu item
     * @param {string} mealType - 'lunch' or 'dinner'
     * @returns {string|null} Recipe ID or null
     */
    getRecipeIdFromMeal(item, mealType) {
        if (!item) return null;

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
        if (!item) return null;

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
        if (!item || !recipe) return;

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
     * @param {Function} getRecipeByName - Function to get recipe by name
     * @returns {Object} Migrated menu item
     */
    migrateLegacyMenuItem(item, getRecipeByName) {
        if (!item) return item;

        // Migrate lunch
        if (item.lunch && !item.lunchId && item.lunch !== MenuManager.DEFAULT_RECIPE) {
            const recipe = getRecipeByName(item.lunch);
            if (recipe) {
                item.lunchId = recipe.id;
                item.lunchName = recipe.name;
                console.log(`[MenuManager] Migrated lunch: ${item.lunch} → ID: ${recipe.id}`);
            } else {
                // Recipe not found, keep as text-only
                item.lunchName = item.lunch;
                item.lunchId = null;
                console.warn(`[MenuManager] Recipe not found for lunch: ${item.lunch}`);
            }
        }

        // Migrate dinner
        if (item.dinner && !item.dinnerId && item.dinner !== MenuManager.DEFAULT_RECIPE) {
            const recipe = getRecipeByName(item.dinner);
            if (recipe) {
                item.dinnerId = recipe.id;
                item.dinnerName = recipe.name;
                console.log(`[MenuManager] Migrated dinner: ${item.dinner} → ID: ${recipe.id}`);
            } else {
                // Recipe not found, keep as text-only
                item.dinnerName = item.dinner;
                item.dinnerId = null;
                console.warn(`[MenuManager] Recipe not found for dinner: ${item.dinner}`);
            }
        }

        return item;
    }
}

// ===== End Menu Management =====

