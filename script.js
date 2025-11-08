// ===== Debug Logging Utility =====

/**
 * Debug logger with configurable levels
 * Set DEBUG_LEVEL in localStorage to control verbosity:
 * - 0: No debug logs (production)
 * - 1: Errors only
 * - 2: Warnings and errors
 * - 3: Info, warnings, and errors (default for development)
 * - 4: Verbose (all logs including detailed parsing)
 */
const DebugLogger = {
    LEVELS: {
        NONE: 0,
        ERROR: 1,
        WARN: 2,
        INFO: 3,
        VERBOSE: 4
    },

    get level() {
        const stored = localStorage.getItem('DEBUG_LEVEL');
        return stored !== null ? parseInt(stored) : this.LEVELS.INFO;
    },

    set level(value) {
        localStorage.setItem('DEBUG_LEVEL', value.toString());
    },

    error(prefix, ...args) {
        if (this.level >= this.LEVELS.ERROR) {
            console.error(`[${prefix}]`, ...args);
        }
    },

    warn(prefix, ...args) {
        if (this.level >= this.LEVELS.WARN) {
            console.warn(`[${prefix}]`, ...args);
        }
    },

    info(prefix, ...args) {
        if (this.level >= this.LEVELS.INFO) {
            console.log(`[${prefix}]`, ...args);
        }
    },

    verbose(prefix, ...args) {
        if (this.level >= this.LEVELS.VERBOSE) {
            console.log(`[${prefix}]`, ...args);
        }
    }
};

// ===== Category Management =====

/**
 * Predefined categories that come with the application
 */
// PREDEFINED_CATEGORIES is now imported from categories.js

/**
 * Color palette for custom categories
 */
const CATEGORY_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#E76F51', '#2A9D8F'
];

/**
 * Cooking actions for sequence descriptions
 * Organized by category for better maintainability
 */
const COOKING_ACTIONS = [
    // Preparación
    { id: 'lavar', name: 'lavar', category: 'preparacion', order: 1 },
    { id: 'pelar', name: 'pelar', category: 'preparacion', order: 2 },
    { id: 'picar', name: 'picar', category: 'preparacion', order: 3 },
    { id: 'rallar', name: 'rallar', category: 'preparacion', order: 4 },
    { id: 'rebozar', name: 'rebozar', category: 'preparacion', order: 5 },
    { id: 'escaldar', name: 'escaldar', category: 'preparacion', order: 6 },

    // Cocción
    { id: 'a-la-plancha', name: 'a la plancha', category: 'coccion', order: 7 },
    { id: 'anadir', name: 'añadir', category: 'coccion', order: 8 },
    { id: 'cocer', name: 'cocer', category: 'coccion', order: 9 },
    { id: 'cocinar', name: 'cocinar', category: 'coccion', order: 10 },
    { id: 'cocinar-al-vapor', name: 'cocinar al vapor', category: 'coccion', order: 11 },
    { id: 'cubrir', name: 'cubrir', category: 'coccion', order: 12 },
    { id: 'desglasar', name: 'desglasar', category: 'coccion', order: 13 },
    { id: 'freir', name: 'freír', category: 'coccion', order: 14 },
    { id: 'gratinar', name: 'gratinar', category: 'coccion', order: 15 },
    { id: 'guisar', name: 'guisar', category: 'coccion', order: 16 },
    { id: 'hornear', name: 'hornear', category: 'coccion', order: 17 },
    { id: 'rehogar', name: 'rehogar', category: 'coccion', order: 18 },
    { id: 'reposar', name: 'reposar', category: 'coccion', order: 19 },
    { id: 'saltear', name: 'saltear', category: 'coccion', order: 20 },
    { id: 'sellar', name: 'sellar', category: 'coccion', order: 21 },
    { id: 'sofreir', name: 'sofreír', category: 'coccion', order: 22 },
    { id: 'tapar', name: 'tapar', category: 'coccion', order: 23 },
    { id: 'tostar', name: 'tostar', category: 'coccion', order: 24 },

    // Proceso
    { id: 'reducir', name: 'reducir', category: 'proceso', order: 25 },
    { id: 'retirar', name: 'retirar', category: 'proceso', order: 26 },

    // Conectores
    { id: 'y', name: 'y', category: 'conector', order: 27 },
    { id: 'coma', name: ',', category: 'conector', order: 28 }
];

/**
 * Emoji collections by category
 */
const EMOJI_CATEGORIES = {
    food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🧇', '🥞', '🧈', '🍞', '🥐', '🥖', '🥨', '🥯', '🧀', '🥗', '🥙', '🌮', '🌯', '🥪', '🍖', '🍗', '🥩', '🍠', '🥟', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🦪', '🍣', '🍤', '🍥', '🥮', '🍢', '🧆', '🥘', '🍲', '🫕', '🥣', '🥧', '🍰', '🎂', '🧁', '🍮', '🍭', '🍬', '🍫', '🍩', '🍪', '🌰', '🥜', '🍯', '🍎', '🍏', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🫘', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🫘', '🍯', '🥛', '🍼', '🫖', '☕', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊', '🥄', '🍴', '🍽️', '🥣', '🥡', '🥢', '🧂', '🚐']
};

/**
 * Default emoji if none selected
 */
const DEFAULT_EMOJI = '🐱';

/**
 * Special category ID for recipes without a category
 */
const NO_CATEGORY_ID = 'sin-categoria';

/**
 * Display text for recipes without a category
 */
const NO_CATEGORY_LABEL = 'Sin categoría';

/**
 * Kitchen appliances available for recipes
 */
const KITCHEN_APPLIANCES = [
    { id: 'batidora', name: 'Batidora', emoji: '🌀' },
    { id: 'cuchillo', name: 'Cuchillo', emoji: '🔪' },
    { id: 'freidora-aire', name: 'Freidora de aire', emoji: '💨' },
    { id: 'horno', name: 'Horno', emoji: '🔥' },
    { id: 'microondas', name: 'Microondas', emoji: '📻' },
    { id: 'olla', name: 'Olla', emoji: '🍲' },
    { id: 'olla-presion', name: 'Olla a presión', emoji: '⚡' },
    { id: 'sandwichera', name: 'Sandwichera', emoji: '🥪' },
    { id: 'sarten', name: 'Sartén', emoji: '🍳' },
    { id: 'thermomix', name: 'Thermomix', emoji: '🤖' },
    { id: 'vaporera', name: 'Vaporera', emoji: '♨️' },
    { id: 'wok', name: 'Wok', emoji: '🥘' }
];

/**
 * Predefined ingredients for autocomplete
 */
const PREDEFINED_INGREDIENTS = [
    // Pollo
    'pollo', 'pechuga', 'muslo', 'contramuslo', 'alita', 'carcasa', 'piel', 'molleja', 'hígado', 'cuello', 'patas',
    // Verduras
    'zanahoria', 'cebolla', 'ajo', 'pimiento', 'tomate', 'calabacín', 'berenjena', 'patata', 'apio', 'puerro',
    'espinaca', 'col', 'lechuga', 'pepino', 'brócoli',
    // Frutas
    'manzana', 'plátano', 'naranja', 'pera', 'limón', 'uva', 'fresa', 'melón', 'sandía', 'mango', 'piña',
    'cereza', 'kiwi', 'melocotón', 'arándano',
    // Especias
    'pimienta', 'comino', 'pimentón', 'canela', 'nuez moscada', 'clavo', 'cúrcuma', 'jengibre', 'orégano',
    'tomillo', 'romero', 'laurel', 'perejil', 'albahaca', 'cilantro'
];

/**
 * CategoryManager - Manages predefined and custom categories
 */
class CategoryManager {
    constructor() {
        this.storageKey = 'recetario_custom_categories';
        this.hiddenCategoriesKey = 'recetario_hidden_categories';
        this.predefinedCategories = PREDEFINED_CATEGORIES;
        this.customCategories = [];
        this.hiddenCategories = new Set();
        this.loadCustomCategories();
        this.loadHiddenCategories();
    }

    /**
     * Load custom categories from localStorage
     */
    loadCustomCategories() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.customCategories = JSON.parse(stored);
            }
        } catch (error) {
            console.error('[CategoryManager] Error loading custom categories:', error);
            this.customCategories = [];
        }
    }

    /**
     * Save custom categories to localStorage
     */
    saveCustomCategories() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.customCategories));
        } catch (error) {
            console.error('[CategoryManager] Error saving custom categories:', error);
            throw new Error('No se pudieron guardar las categorías');
        }
    }

    /**
     * Load hidden categories from localStorage
     */
    loadHiddenCategories() {
        try {
            const stored = localStorage.getItem(this.hiddenCategoriesKey);
            if (stored) {
                this.hiddenCategories = new Set(JSON.parse(stored));
            }
        } catch (error) {
            console.error('[CategoryManager] Error loading hidden categories:', error);
            this.hiddenCategories = new Set();
        }
    }

    /**
     * Save hidden categories to localStorage
     */
    saveHiddenCategories() {
        try {
            localStorage.setItem(this.hiddenCategoriesKey, JSON.stringify([...this.hiddenCategories]));
        } catch (error) {
            console.error('[CategoryManager] Error saving hidden categories:', error);
            throw new Error('No se pudieron guardar las categorías ocultas');
        }
    }

    /**
     * Hide a category (predefined or custom)
     * @param {string} id - Category ID
     */
    hideCategory(id) {
        this.hiddenCategories.add(id);
        this.saveHiddenCategories();
        console.log('[CategoryManager] Hidden category:', id);
    }

    /**
     * Unhide a category
     * @param {string} id - Category ID
     */
    unhideCategory(id) {
        this.hiddenCategories.delete(id);
        this.saveHiddenCategories();
        console.log('[CategoryManager] Unhidden category:', id);
    }

    /**
     * Check if a category is hidden
     * @param {string} id - Category ID
     * @returns {boolean} True if hidden
     */
    isCategoryHidden(id) {
        return this.hiddenCategories.has(id);
    }

    /**
     * Get all categories (predefined + custom), excluding hidden ones
     * @param {boolean} includeHidden - Include hidden categories (default: false)
     * @returns {Array} All categories
     */
    getAllCategories(includeHidden = false) {
        const all = [...this.predefinedCategories, ...this.customCategories];
        if (includeHidden) {
            return all;
        }
        return all.filter(cat => !this.isCategoryHidden(cat.id));
    }

    /**
     * Get only visible predefined categories
     * @returns {Array} Visible predefined categories
     */
    getVisiblePredefinedCategories() {
        return this.predefinedCategories.filter(cat => !this.isCategoryHidden(cat.id));
    }

    /**
     * Get only hidden categories
     * @returns {Array} Hidden categories
     */
    getHiddenCategories() {
        const all = [...this.predefinedCategories, ...this.customCategories];
        return all.filter(cat => this.isCategoryHidden(cat.id));
    }

    /**
     * Get category by ID (includes hidden categories)
     * @param {string} id - Category ID
     * @returns {Object|null} Category object or null
     */
    getCategoryById(id) {
        const all = this.getAllCategories(true); // Include hidden categories
        return all.find(cat => cat.id === id) || null;
    }

    /**
     * Get recipe count for each category
     * @param {Array} recipes - All recipes
     * @returns {Object} Map of category ID to count
     */
    getCategoryCounts(recipes) {
        const counts = {};

        this.getAllCategories().forEach(cat => {
            counts[cat.id] = recipes.filter(r => r.category === cat.id).length;
        });

        // Count recipes without category
        counts[NO_CATEGORY_ID] = recipes.filter(r => !r.category).length;

        return counts;
    }

    /**
     * Generate category ID from name (slug)
     * @param {string} name - Category name
     * @returns {string} Category ID
     */
    generateCategoryId(name) {
        return name
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-')      // Replace non-alphanumeric with dash
            .replace(/^-+|-+$/g, '');         // Remove leading/trailing dashes
    }

    /**
     * Create new custom category
     * @param {Object} categoryData - Category data (name, emoji, color)
     * @returns {Object} Created category
     */
    createCategory(categoryData) {
        // Validate name
        if (!categoryData.name || categoryData.name.trim().length < 2) {
            throw new Error('El nombre debe tener al menos 2 caracteres');
        }

        if (categoryData.name.length > 30) {
            throw new Error('El nombre no puede tener más de 30 caracteres');
        }

        // Generate ID from name (slug)
        const id = this.generateCategoryId(categoryData.name);

        // Check if category already exists
        if (this.getCategoryById(id)) {
            throw new Error('Ya existe una categoría con ese nombre');
        }

        // Create category object
        const category = {
            id: id,
            name: categoryData.name.trim(),
            emoji: categoryData.emoji || DEFAULT_EMOJI,
            color: categoryData.color || CATEGORY_COLORS[0],
            isPredefined: false
        };

        // Add to custom categories
        this.customCategories.push(category);
        this.saveCustomCategories();

        console.log('[CategoryManager] Created category:', category);
        return category;
    }

    /**
     * Update existing custom category
     * @param {string} id - Category ID
     * @param {Object} updates - Updated data
     * @returns {Object} Updated category
     */
    updateCategory(id, updates) {
        const categoryIndex = this.customCategories.findIndex(cat => cat.id === id);

        if (categoryIndex === -1) {
            throw new Error('Categoría no encontrada');
        }

        const category = this.customCategories[categoryIndex];

        if (category.isPredefined) {
            throw new Error('No se pueden editar categorías predefinidas');
        }

        const oldId = category.id;

        // Validate new name if provided
        if (updates.name) {
            if (updates.name.trim().length < 2 || updates.name.length > 30) {
                throw new Error('El nombre debe tener entre 2 y 30 caracteres');
            }

            const newId = this.generateCategoryId(updates.name);
            if (newId !== id && this.getCategoryById(newId)) {
                throw new Error('Ya existe una categoría con ese nombre');
            }

            category.name = updates.name.trim();
            category.id = newId;
        }

        if (updates.emoji) {
            category.emoji = updates.emoji;
        }

        if (updates.color) {
            category.color = updates.color;
        }

        this.saveCustomCategories();

        console.log('[CategoryManager] Updated category:', category);
        return { category, oldId };
    }

    /**
     * Delete category (custom or predefined - predefined ones are hidden instead)
     * @param {string} id - Category ID
     * @param {Array} recipes - All recipes to check usage
     * @returns {Object} Deletion result with affected recipes
     */
    deleteCategory(id, recipes) {
        const category = this.getCategoryById(id);

        if (!category) {
            throw new Error('Categoría no encontrada');
        }

        // Find recipes using this category
        const affectedRecipes = recipes.filter(recipe => recipe.category === id);

        // If it's a predefined category, hide it instead of deleting
        if (category.isPredefined) {
            this.hideCategory(id);
            console.log('[CategoryManager] Hidden predefined category:', id, 'Affected recipes:', affectedRecipes.length);
        } else {
            // If it's a custom category, delete it permanently
            const categoryIndex = this.customCategories.findIndex(cat => cat.id === id);
            if (categoryIndex !== -1) {
                this.customCategories.splice(categoryIndex, 1);
                this.saveCustomCategories();
                console.log('[CategoryManager] Deleted custom category:', id, 'Affected recipes:', affectedRecipes.length);
            }
        }

        return {
            deleted: true,
            isPredefined: category.isPredefined,
            affectedRecipes: affectedRecipes.length,
            affectedRecipeIds: affectedRecipes.map(r => r.id)
        };
    }
}

// ===== End Category Management =====

// ===== Shopping List Management =====

/**
 * ShoppingListManager - Manages shopping lists and their items
 */
class ShoppingListManager {
    constructor() {
        this.lists = [];
        this.currentListId = null;
        this.storageKey = 'shopping_lists';
        this.loadLists();
    }

    /**
     * Load shopping lists from localStorage
     */
    loadLists() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.lists = JSON.parse(stored);

                // Migrate old lists without enabled property
                this.lists.forEach(list => {
                    if (list.enabled === undefined) {
                        list.enabled = true;
                    }
                });

                console.log('[ShoppingListManager] Loaded lists:', this.lists.length);
            }
        } catch (error) {
            console.error('[ShoppingListManager] Error loading lists:', error);
            this.lists = [];
        }
    }

    /**
     * Save shopping lists to localStorage
     */
    saveLists() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.lists));
            console.log('[ShoppingListManager] Saved lists:', this.lists.length);
        } catch (error) {
            console.error('[ShoppingListManager] Error saving lists:', error);
            throw new Error('No se pudieron guardar las listas');
        }
    }

    /**
     * Create a new shopping list
     * @param {string} name - Name of the list
     * @returns {Object} The created list
     */
    createList(name) {
        const list = {
            id: Date.now(),
            name: name,
            items: [],
            enabled: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.lists.push(list);
        this.saveLists();

        console.log('[ShoppingListManager] Created list:', list.id, list.name);
        return list;
    }

    /**
     * Get a shopping list by ID
     * @param {number} id - List ID
     * @returns {Object|null} The list or null if not found
     */
    getList(id) {
        return this.lists.find(list => list.id === id) || null;
    }

    /**
     * Update a shopping list
     * @param {number} id - List ID
     * @param {Object} updates - Updates to apply
     * @returns {Object|null} The updated list or null if not found
     */
    updateList(id, updates) {
        const list = this.getList(id);
        if (!list) {
            console.error('[ShoppingListManager] List not found:', id);
            return null;
        }

        Object.assign(list, updates);
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        console.log('[ShoppingListManager] Updated list:', id);
        return list;
    }

    /**
     * Delete a shopping list
     * @param {number} id - List ID
     * @returns {boolean} True if deleted, false if not found
     */
    deleteList(id) {
        const index = this.lists.findIndex(list => list.id === id);
        if (index === -1) {
            console.error('[ShoppingListManager] List not found:', id);
            return false;
        }

        this.lists.splice(index, 1);
        this.saveLists();

        console.log('[ShoppingListManager] Deleted list:', id);
        return true;
    }

    /**
     * Toggle enabled status of a shopping list
     * @param {number} id - List ID
     * @returns {boolean} Success status
     */
    toggleListEnabled(id) {
        const list = this.getList(id);
        if (!list) {
            console.error('[ShoppingListManager] List not found:', id);
            return false;
        }

        list.enabled = !list.enabled;
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        console.log('[ShoppingListManager] Toggled list enabled:', id, list.enabled);
        return true;
    }

    /**
     * Add an item to a shopping list
     * @param {number} listId - List ID
     * @param {Object} item - Item to add {name, quantity}
     * @returns {Object|null} The added item or null if list not found
     */
    addItem(listId, item) {
        const list = this.getList(listId);
        if (!list) {
            console.error('[ShoppingListManager] List not found:', listId);
            return null;
        }

        const newItem = {
            id: Date.now(),
            name: item.name,
            quantity: item.quantity || '',
            completed: false
        };

        list.items.push(newItem);
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        console.log('[ShoppingListManager] Added item to list:', listId, newItem.name);
        return newItem;
    }

    /**
     * Update an item in a shopping list
     * @param {number} listId - List ID
     * @param {number} itemId - Item ID
     * @param {Object} updates - Updates to apply
     * @returns {Object|null} The updated item or null if not found
     */
    updateItem(listId, itemId, updates) {
        const list = this.getList(listId);
        if (!list) {
            console.error('[ShoppingListManager] List not found:', listId);
            return null;
        }

        const item = list.items.find(i => i.id === itemId);
        if (!item) {
            console.error('[ShoppingListManager] Item not found:', itemId);
            return null;
        }

        Object.assign(item, updates);
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        console.log('[ShoppingListManager] Updated item:', itemId);
        return item;
    }

    /**
     * Delete an item from a shopping list
     * @param {number} listId - List ID
     * @param {number} itemId - Item ID
     * @returns {boolean} True if deleted, false if not found
     */
    deleteItem(listId, itemId) {
        const list = this.getList(listId);
        if (!list) {
            console.error('[ShoppingListManager] List not found:', listId);
            return false;
        }

        const index = list.items.findIndex(i => i.id === itemId);
        if (index === -1) {
            console.error('[ShoppingListManager] Item not found:', itemId);
            return false;
        }

        list.items.splice(index, 1);
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        console.log('[ShoppingListManager] Deleted item:', itemId);
        return true;
    }

    /**
     * Toggle item completed state
     * @param {number} listId - List ID
     * @param {number} itemId - Item ID
     * @returns {boolean|null} New completed state or null if not found
     */
    toggleItemCompleted(listId, itemId) {
        const list = this.getList(listId);
        if (!list) {
            console.error('[ShoppingListManager] List not found:', listId);
            return null;
        }

        const item = list.items.find(i => i.id === itemId);
        if (!item) {
            console.error('[ShoppingListManager] Item not found:', itemId);
            return null;
        }

        item.completed = !item.completed;
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        console.log('[ShoppingListManager] Toggled item completed:', itemId, item.completed);
        return item.completed;
    }

    /**
     * Get count of completed items in a list
     * @param {number} listId - List ID
     * @returns {number} Count of completed items
     */
    getCompletedCount(listId) {
        const list = this.getList(listId);
        if (!list) return 0;
        return list.items.filter(item => item.completed).length;
    }

    /**
     * Get total count of items in a list
     * @param {number} listId - List ID
     * @returns {number} Total count of items
     */
    getTotalCount(listId) {
        const list = this.getList(listId);
        if (!list) return 0;
        return list.items.length;
    }

    /**
     * Check if all items in a list are completed
     * @param {number} listId - List ID
     * @returns {boolean} True if all items are completed
     */
    isListComplete(listId) {
        const list = this.getList(listId);
        if (!list || list.items.length === 0) return false;
        return list.items.every(item => item.completed);
    }

    /**
     * Format list for clipboard
     * @param {number} listId - List ID
     * @param {boolean} includeCompleted - Whether to include completed items (default: true)
     * @returns {string} Formatted text for clipboard
     */
    formatListForClipboard(listId, includeCompleted = true) {
        const list = this.getList(listId);
        if (!list) {
            console.warn('[ShoppingListManager] Cannot format list: list not found', listId);
            return '';
        }

        const lines = [];

        // Add list name as header
        lines.push(list.name);
        lines.push('-----------------------------------'); // Fixed separator line

        // Filter items based on completed status
        const items = includeCompleted
            ? list.items
            : list.items.filter(item => !item.completed);

        // Handle empty list
        if (items.length === 0) {
            const message = includeCompleted
                ? 'No hay elementos en esta lista'
                : 'No hay elementos pendientes';
            lines.push(message);
            return lines.join('\n');
        }

        // Format each item with conditional blank line
        items.forEach((item, index) => {
            const quantityText = item.quantity?.trim() || '';
            const quantity = quantityText ? ` - ${quantityText}` : '';
            const completedMark = item.completed ? '✓ ' : '';
            const itemLine = `${completedMark}${item.name}${quantity}`;
            lines.push(itemLine);

            // Add blank line after each item except the last one
            // BUT only if the quantity is 30 characters or more
            if (index < items.length - 1) {
                if (quantityText.length >= 30) {
                    lines.push(''); // Empty string creates a blank line
                }
            }
        });

        // Join with newline character
        return lines.join('\n');
    }
}

// ===== End Shopping List Management =====

/**
 * RecipeApp - Main application controller for Recetario Personal
 */
class RecipeApp {
    constructor() {
        this.storageManager = new StorageManager();
        this.categoryManager = new CategoryManager();
        this.shoppingListManager = new ShoppingListManager();
        this.recipes = [];
        this.activeFilters = new Set(); // Track active category filters
        this.activeTimeFilter = 'all'; // Track active time filter
        this.currentView = 'list'; // 'list', 'detail', 'form'
        this.viewMode = localStorage.getItem('viewMode') || 'grid'; // 'grid' or 'list'
        this.sortBy = 'date'; // 'name' or 'date'
        this.sortOrder = 'desc'; // 'asc' or 'desc'
        this.ingredients = []; // Current recipe ingredients
        this.editingIngredientId = null; // Track which ingredient is being edited
        this.sequences = []; // Current recipe sequences
        this.editingSequenceId = null; // Track which sequence is being edited
        this.images = []; // Current recipe images
        this.selectedAppliances = []; // Current recipe kitchen appliances

        // Image modal state
        this.modalImages = []; // Images for modal navigation
        this.currentImageIndex = 0; // Current image index in modal

        // Photo gallery state
        this.galleryState = {
            images: [],
            currentIndex: 0,
            totalImages: 0,
            recipeName: ''
        };

        // Auto-save state
        this.autoSaveTimer = null;
        this.autoSaveDelay = 2000; // 2 seconds after user stops typing
        this.isAutoSaving = false;

        // Modal stack management
        this.modalStack = []; // Track opened modals for cascade closing

        // Edge case handling: debounce modal close operations
        this.isClosingModal = false;
        this.modalCloseDebounceTime = 300; // 300ms debounce

        this.init();
    }

    async init() {
        try {
            // Initialize database
            await this.storageManager.initDB();

            // Show storage warning if using localStorage fallback
            if (this.storageManager.useLocalStorageFallback) {
                this.showStorageWarning();
            }

            // Load recipes
            await this.loadRecipes();

            // Setup event listeners
            this.setupEventListeners();

            // Setup image modal
            this.setupImageModal();

            // Initialize shopping lists
            this.initShoppingLists();

            // Initialize menus
            this.initMenus();

            // Initialize theme
            this.initTheme();

            // Render filter chips dynamically
            this.renderFilterChips();

            // Render initial view
            this.renderRecipeList();
        } catch (error) {
            console.error('[App] Error al inicializar:', error);

            // Check if it's a storage availability error
            if (error instanceof StorageError && error.code === StorageError.DB_NOT_AVAILABLE) {
                this.showError('El almacenamiento no está disponible en este navegador. No se podrán guardar recetas.');
            } else {
                this.showError('Error al inicializar la aplicación: ' + error.message);
            }
        }
    }

    // ===== Time Input Utilities =====
    // Unified functions for handling time input fields across the application

    /**
     * Parse time input fields and return formatted string
     * @param {string} idPrefix - Prefix for input IDs (e.g., 'recipe', 'sequence')
     * @returns {string} Formatted time string (e.g., "2h 30min") or empty string
     */
    parseTimeInput(idPrefix) {
        const hours = parseInt(document.getElementById(`${idPrefix}-hours`)?.value) || 0;
        const minutes = parseInt(document.getElementById(`${idPrefix}-minutes`)?.value) || 0;

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}min`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}min`;
        }

        return '';
    }

    /**
     * Populate time input fields from formatted string
     * @param {string} idPrefix - Prefix for input IDs (e.g., 'recipe', 'sequence')
     * @param {string} timeString - Formatted time string (e.g., "2h 30min")
     */
    populateTimeInput(idPrefix, timeString) {
        const hoursInput = document.getElementById(`${idPrefix}-hours`);
        const minutesInput = document.getElementById(`${idPrefix}-minutes`);

        if (!hoursInput || !minutesInput) return;

        if (timeString && timeString.trim() !== '') {
            // Parse formats like "2h 30min", "1h", "45min"
            const hoursMatch = timeString.match(/(\d+)\s*h/);
            const minutesMatch = timeString.match(/(\d+)\s*min/);

            hoursInput.value = hoursMatch ? hoursMatch[1] : '';
            minutesInput.value = minutesMatch ? minutesMatch[1] : '';
        } else {
            hoursInput.value = '';
            minutesInput.value = '';
        }
    }

    /**
     * Capitalize first letter of a string
     * @param {string} str - String to capitalize
     * @returns {string} String with first letter capitalized
     */
    capitalizeFirstLetter(str) {
        if (!str || str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Validate time input values
     * @param {string} idPrefix - Prefix for input IDs (e.g., 'recipe', 'sequence')
     * @returns {Object} Validation result with 'valid' boolean and 'errors' array
     */
    validateTimeInput(idPrefix) {
        const hours = parseInt(document.getElementById(`${idPrefix}-hours`)?.value) || 0;
        const minutes = parseInt(document.getElementById(`${idPrefix}-minutes`)?.value) || 0;

        const errors = [];

        if (hours < 0 || hours > 24) {
            errors.push('Las horas deben estar entre 0 y 24');
        }

        if (minutes < 0 || minutes > 60) {
            errors.push('Los minutos deben estar entre 0 y 60');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Format time string for display
     * @param {string} timeString - Formatted time string (e.g., "2h 30min")
     * @returns {string} Human-readable time string (e.g., "2 horas 30 minutos")
     */
    formatTimeForDisplay(timeString) {
        if (!timeString || timeString.trim() === '') {
            return '';
        }

        const hoursMatch = timeString.match(/(\d+)\s*h/);
        const minutesMatch = timeString.match(/(\d+)\s*min/);

        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

        const parts = [];

        if (hours > 0) {
            parts.push(hours === 1 ? '1 hora' : `${hours} horas`);
        }

        if (minutes > 0) {
            parts.push(`${minutes} min`);
        }

        return parts.join(' ');
    }

    /**
     * Create HTML for time input fields
     * @param {Object} config - Configuration object
     * @param {string} config.idPrefix - Prefix for input IDs
     * @param {string} config.label - Label text
     * @param {string} config.helperText - Helper text (optional)
     * @param {boolean} config.required - Whether field is required (default: false)
     * @returns {string} HTML string for time input
     */
    createTimeInput(config) {
        const { idPrefix, label, helperText = '', required = false } = config;
        const labelSuffix = required ? '' : ' (opcional)';

        return `
            <div class="form-group">
                <label>${label}${labelSuffix}</label>
                <div class="time-input-group">
                    <div class="time-input-item">
                        <span class="time-label">Horas</span>
                        <input 
                            type="number" 
                            id="${idPrefix}-hours" 
                            class="form-input time-input" 
                            placeholder="0"
                            min="0"
                            max="24"
                            autocomplete="off"
                        >
                    </div>
                    <div class="time-input-item">
                        <span class="time-label">Minutos</span>
                        <input 
                            type="number" 
                            id="${idPrefix}-minutes" 
                            class="form-input time-input" 
                            placeholder="0"
                            min="0"
                            max="60"
                            autocomplete="off"
                        >
                    </div>
                </div>
                ${helperText ? `<span class="helper-text">${helperText}</span>` : ''}
            </div>
        `;
    }

    // ===== End Time Input Utilities =====

    /**
     * Shuffle array randomly using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Load all recipes from storage
     */
    async loadRecipes() {
        try {
            this.recipes = await this.storageManager.getAllRecipes();
            // Shuffle recipes randomly on load
            this.recipes = this.shuffleArray(this.recipes);
            console.log(`Loaded ${this.recipes.length} recipes (shuffled)`);
        } catch (error) {
            console.error('Failed to load recipes:', error);
            this.showError('Error al cargar las recetas: ' + error.message);
            this.recipes = [];
        }
    }

    /**
     * Setup event listeners for UI interactions
     */
    setupEventListeners() {
        // Home link (logo)
        const homeLink = document.getElementById('home-link');
        if (homeLink) {
            homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToHome();
            });
        }

        // Filter chips (category)
        const filterChips = document.querySelectorAll('#filter-bar .filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // TEMPORALMENTE OCULTO - Time filter chips (2025-11-04)
        /*
        const timeFilterChips = document.querySelectorAll('#time-filter-chips .filter-chip');
        timeFilterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.handleTimeFilterClick(e.target);
            });
        });
        */

        // Toggle filters button
        const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
        if (toggleFiltersBtn) {
            toggleFiltersBtn.addEventListener('click', () => {
                this.toggleFilters();
            });
        }

        // Clear all filters button
        const clearAllFiltersBtn = document.getElementById('clear-all-filters-btn');
        if (clearAllFiltersBtn) {
            clearAllFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // View toggle buttons
        const viewGridBtn = document.getElementById('view-grid-btn');
        const viewListBtn = document.getElementById('view-list-btn');

        if (viewGridBtn) {
            viewGridBtn.addEventListener('click', () => {
                this.setViewMode('grid');
            });
        }

        if (viewListBtn) {
            viewListBtn.addEventListener('click', () => {
                this.setViewMode('list');
            });
        }

        // Sort buttons in list view header
        const sortByNameBtn = document.getElementById('sort-by-name');
        const sortByDateBtn = document.getElementById('sort-by-date');

        if (sortByNameBtn) {
            sortByNameBtn.addEventListener('click', () => {
                this.toggleSort('name');
            });
        }

        if (sortByDateBtn) {
            sortByDateBtn.addEventListener('click', () => {
                this.toggleSort('date');
            });
        }

        // Initialize view mode
        this.setViewMode(this.viewMode);

        // XML file input
        const xmlFileInput = document.getElementById('xml-file-input');
        if (xmlFileInput) {
            xmlFileInput.addEventListener('change', (e) => {
                this.handleXMLFileSelected(e.target.files[0]);
            });
        }

        // Menu button and dropdown
        const menuBtn = document.getElementById('menu-btn');
        const menuDropdown = document.getElementById('menu-dropdown');

        // Helper function to close menu
        const closeMenu = () => {
            if (menuDropdown) {
                menuDropdown.classList.remove('active');
                if (menuBtn) {
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        };

        if (menuBtn && menuDropdown) {
            // Toggle menu on button click
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = menuDropdown.classList.toggle('active');
                menuBtn.setAttribute('aria-expanded', isActive);
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
                    closeMenu();
                }
            });

            // Close menu with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menuDropdown.classList.contains('active')) {
                    closeMenu();
                    menuBtn.focus(); // Return focus to menu button
                }
            });
        }

        // Theme toggle button (in settings modal)
        const themeToggleBtnModal = document.getElementById('theme-toggle-btn-modal');
        if (themeToggleBtnModal) {
            themeToggleBtnModal.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
        }

        const manageCategoriesBtn = document.getElementById('manage-categories-btn');
        if (manageCategoriesBtn) {
            manageCategoriesBtn.addEventListener('click', () => {
                console.log('🔴 Abriendo category-modal');
                const modal = document.getElementById('category-modal');
                const modalBody = modal?.querySelector('.modal-body');
                console.log('🔴 Modal:', modal);
                console.log('🔴 Modal body:', modalBody);
                console.log('🔴 Computed styles:', modalBody ? window.getComputedStyle(modalBody).paddingBottom : 'N/A');
                this.showCategoryModal(true); // true = opened from settings
                closeMenu();
            });
        }

        const shoppingListsBtn = document.getElementById('shopping-lists-btn');
        if (shoppingListsBtn) {
            shoppingListsBtn.addEventListener('click', () => {
                this.showShoppingListsView();
                closeMenu();
            });
        }

        const menusBtn = document.getElementById('menus-btn');
        if (menusBtn) {
            menusBtn.addEventListener('click', () => {
                this.showMenusView();
                closeMenu();
            });
        }

        const importXmlBtn = document.getElementById('import-xml-btn');
        if (importXmlBtn) {
            importXmlBtn.addEventListener('click', () => {
                this.handleImportXMLClick();
                closeMenu();
            });
        }

        const exportAllBtn = document.getElementById('export-all-btn');
        if (exportAllBtn) {
            exportAllBtn.addEventListener('click', () => {
                this.handleExportAllClick();
                closeMenu();
            });
        }

        // Recipes button (go to home)
        const recipesBtn = document.getElementById('recipes-btn');
        if (recipesBtn) {
            recipesBtn.addEventListener('click', () => {
                this.goToHome();
                closeMenu();
            });
        }

        const newRecipeBtn = document.getElementById('new-recipe-btn');
        if (newRecipeBtn) {
            newRecipeBtn.addEventListener('click', () => {
                this.showRecipeForm();
                closeMenu();
            });
        }

        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.openSettingsModal();
                closeMenu();
            });
        }

        // New recipe button on home page
        const newRecipeBtnHome = document.getElementById('new-recipe-btn-home');
        if (newRecipeBtnHome) {
            newRecipeBtnHome.addEventListener('click', () => {
                this.showRecipeForm();
            });
        }

        // Close category modal button
        const closeCategoryModalBtn = document.getElementById('close-category-modal');
        if (closeCategoryModalBtn) {
            closeCategoryModalBtn.addEventListener('click', () => {
                this.closeCategoryModal();
            });
        }

        // Create category button
        const createCategoryBtn = document.getElementById('create-category-btn');
        if (createCategoryBtn) {
            createCategoryBtn.addEventListener('click', () => {
                this.handleCreateCategory();
            });
        }

        // Edit category modal buttons
        const closeEditCategoryModalBtn = document.getElementById('close-edit-category-modal');
        if (closeEditCategoryModalBtn) {
            closeEditCategoryModalBtn.addEventListener('click', () => {
                this.closeEditCategoryModal();
            });
        }

        const cancelEditCategoryBtn = document.getElementById('cancel-edit-category-btn');
        if (cancelEditCategoryBtn) {
            cancelEditCategoryBtn.addEventListener('click', () => {
                this.closeEditCategoryModal();
            });
        }

        const saveEditCategoryBtn = document.getElementById('save-edit-category-btn');
        if (saveEditCategoryBtn) {
            saveEditCategoryBtn.addEventListener('click', () => {
                this.handleSaveEditCategory();
            });
        }

        // Emoji picker modal buttons
        const openEmojiPickerBtn = document.getElementById('open-emoji-picker-btn');
        if (openEmojiPickerBtn) {
            openEmojiPickerBtn.addEventListener('click', () => {
                this.openEmojiPickerModal('new-category-emoji', 'new-category-emoji-value');
            });
        }

        const openEditEmojiPickerBtn = document.getElementById('open-edit-emoji-picker-btn');
        if (openEditEmojiPickerBtn) {
            openEditEmojiPickerBtn.addEventListener('click', () => {
                this.openEmojiPickerModal('edit-category-emoji', 'edit-category-emoji-value');
            });
        }

        const closeEmojiPickerModalBtn = document.getElementById('close-emoji-picker-modal');
        if (closeEmojiPickerModalBtn) {
            closeEmojiPickerModalBtn.addEventListener('click', () => {
                this.closeEmojiPickerModal();
            });
        }

        // Color picker modal buttons
        const openColorPickerBtn = document.getElementById('open-color-picker-btn');
        if (openColorPickerBtn) {
            openColorPickerBtn.addEventListener('click', () => {
                this.openColorPickerModal('new-category-color-preview', 'selected-color');
            });
        }

        const openEditColorPickerBtn = document.getElementById('open-edit-color-picker-btn');
        if (openEditColorPickerBtn) {
            openEditColorPickerBtn.addEventListener('click', () => {
                this.openColorPickerModal('edit-category-color-preview', 'edit-selected-color');
            });
        }

        const closeColorPickerModalBtn = document.getElementById('close-color-picker-modal');
        if (closeColorPickerModalBtn) {
            closeColorPickerModalBtn.addEventListener('click', () => {
                this.closeColorPickerModal();
            });
        }

        // Form event listeners
        this.setupFormEventListeners();

        // Global ESC key handler for closing modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    // ===== Category Management Functions =====

    /**
     * Render filter chips dynamically from categories
     */
    renderFilterChips() {
        const filterChipsContainer = document.querySelector('.filter-chips');
        if (!filterChipsContainer) return;

        filterChipsContainer.innerHTML = '';

        // "Limpiar" chip
        const allChip = document.createElement('button');
        allChip.className = 'filter-chip';
        if (this.activeFilters.size === 0) {
            allChip.classList.add('active');
        }
        allChip.dataset.category = 'all';
        allChip.textContent = 'Limpiar';
        filterChipsContainer.appendChild(allChip);

        // Get custom and predefined categories separately (only visible ones)
        const customCategories = this.categoryManager.customCategories.filter(
            cat => !this.categoryManager.isCategoryHidden(cat.id)
        );
        const predefinedCategories = this.categoryManager.getVisiblePredefinedCategories();

        // Custom category chips (first)
        customCategories.forEach(category => {
            const chip = document.createElement('button');
            chip.className = 'filter-chip';
            if (this.activeFilters.has(category.id)) {
                chip.classList.add('active');
            }
            chip.dataset.category = category.id;
            chip.innerHTML = `${category.emoji} ${category.name}`;
            chip.style.setProperty('--category-color', category.color);
            filterChipsContainer.appendChild(chip);
        });

        // Separator (only if there are custom categories)
        if (customCategories.length > 0) {
            const separator = document.createElement('span');
            separator.className = 'filter-separator';
            separator.textContent = '|';
            filterChipsContainer.appendChild(separator);
        }

        // Predefined category chips (after separator)
        predefinedCategories.forEach(category => {
            const chip = document.createElement('button');
            chip.className = 'filter-chip';
            if (this.activeFilters.has(category.id)) {
                chip.classList.add('active');
            }
            chip.dataset.category = category.id;
            chip.innerHTML = `${category.emoji} ${category.name}`;
            chip.style.setProperty('--category-color', category.color);
            filterChipsContainer.appendChild(chip);
        });

        // Re-attach event listeners
        this.attachFilterChipListeners();
    }

    /**
     * Attach event listeners to filter chips
     */
    attachFilterChipListeners() {
        // Category filter chips
        const filterChips = document.querySelectorAll('#filter-bar .filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // TEMPORALMENTE OCULTO - Time filter chips (2025-11-04)
        /*
        const timeFilterChips = document.querySelectorAll('#time-filter-chips .filter-chip');
        timeFilterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.handleTimeFilterClick(e.target);
            });
        });
        */
    }

    /**
     * Render category selector in form (now uses modal)
     */
    renderCategorySelector() {
        // Update display with current selection
        this.updateCategoryDisplay();

        // Add click handler to category chip to open modal
        const categoryChip = document.getElementById('recipe-category-chip');
        if (categoryChip) {
            console.log('Setting up click handler for category chip');
            categoryChip.style.cursor = 'pointer';
            // Remove any existing onclick to avoid duplicates
            categoryChip.onclick = null;
            categoryChip.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Category chip clicked');
                try {
                    this.openCategorySelectorModal();
                } catch (error) {
                    console.error('Error opening modal:', error);
                }
            };
        } else {
            console.error('recipe-category-chip not found');
        }
    }

    /**
     * Update category display chip
     */
    updateCategoryDisplay() {
        const categoryInput = document.getElementById('recipe-category');
        const displaySpan = document.getElementById('selected-category-display');
        const categoryChip = document.getElementById('recipe-category-chip');

        if (!categoryInput || !displaySpan) return;

        const selectedValue = categoryInput.value;

        if (!selectedValue) {
            displaySpan.textContent = NO_CATEGORY_LABEL;
            if (categoryChip) {
                categoryChip.dataset.category = NO_CATEGORY_ID;
                console.log('🔴 SIN CATEGORÍA - data-category asignado:', categoryChip.dataset.category);
                console.log('🔴 Elemento:', categoryChip);
            }
            return;
        }

        const category = this.categoryManager.getCategoryById(selectedValue);
        if (category) {
            displaySpan.textContent = `${category.emoji} ${category.name}`;
            if (categoryChip) {
                categoryChip.dataset.category = category.id;
            }
        } else {
            displaySpan.textContent = NO_CATEGORY_LABEL;
            if (categoryChip) {
                categoryChip.dataset.category = NO_CATEGORY_ID;
            }
        }
    }

    /**
     * Open category selector modal
     */
    openCategorySelectorModal() {
        const modal = document.getElementById('category-selector-modal');
        if (!modal) return;

        // Render categories in modal
        this.renderCategorySelectorChips();

        // Hide footer for recipe form context
        const footer = document.getElementById('category-selector-footer');
        if (footer) {
            footer.style.display = 'none';
        }

        // Show modal
        modal.classList.remove('hidden');

        // Setup close handlers
        const closeBtn = document.getElementById('close-category-selector-modal');
        const overlay = modal.querySelector('.modal-overlay');

        const closeModal = () => {
            modal.classList.add('hidden');
        };

        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }

        if (overlay) {
            overlay.onclick = closeModal;
        }
    }

    /**
     * Render category chips in selector modal
     */
    renderCategorySelectorChips(preSelectCategory = true) {
        const container = document.getElementById('category-selector-chips');
        if (!container) {
            console.error('Container category-selector-chips not found');
            return;
        }

        container.innerHTML = '';

        // Only check for current value if preSelectCategory is true (recipe form context)
        let currentValue = '';
        if (preSelectCategory) {
            const categoryInput = document.getElementById('recipe-category');
            currentValue = categoryInput ? categoryInput.value : '';
        }

        // Add all categories (including hidden ones, excluding special ones like caravana and hospital)
        const categories = this.categoryManager.getAllCategories(true)
            .filter(cat => !cat.isSpecial);

        categories.forEach(category => {
            const chip = document.createElement('button');
            chip.className = 'category-selector-chip';
            // Only pre-select if preSelectCategory is true and matches current value
            if (preSelectCategory && category.id === currentValue) {
                chip.classList.add('selected');
            }
            chip.innerHTML = `
                <span class="emoji">${category.emoji}</span>
                <span class="name">${category.name}</span>
            `;
            chip.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Remove selected class from all chips
                container.querySelectorAll('.category-selector-chip').forEach(c => c.classList.remove('selected'));

                // Add selected class to clicked chip
                chip.classList.add('selected');

                this.selectCategory(category.id);
            };
            container.appendChild(chip);
        });
    }

    /**
     * Select a category from modal
     */
    selectCategory(categoryId) {
        // Check if we're selecting for a menu item or recipe form
        if (this.currentMenuCategoryInput) {
            // Store category ID but DON'T update the input value yet
            // (will be updated when user selects a specific recipe)
            const category = this.categoryManager.getCategoryById(categoryId);
            if (category) {
                this.currentMenuCategoryInput.dataset.categoryId = categoryId;
                // Temporarily show category as placeholder
                this.currentMenuCategoryInput.placeholder = `${category.emoji} ${category.name} - Selecciona receta`;
            }

            // Store the input reference for potential recipe selection
            this.pendingMenuInput = this.currentMenuCategoryInput;

            // Check if category has menu-friendly recipes
            const menuRecipes = this.recipes.filter(recipe =>
                recipe.menuFriendly === true && recipe.category === categoryId
            );
            const hasRecipes = menuRecipes.length > 0;

            // NEW FLOW: Automatically open recipes modal if category has recipes
            if (hasRecipes) {
                // Close category selector modal
                const categorySelectorModal = document.getElementById('category-selector-modal');
                if (categorySelectorModal) {
                    categorySelectorModal.classList.add('hidden');
                }

                // ============================================
                // OPCIÓN A: Usar <select> dropdown (COMENTADO)
                // ============================================
                /*
                // Convert input to recipe selector dropdown and open it automatically
                setTimeout(() => {
                    const selectElement = this.convertInputToRecipeSelector(this.currentMenuCategoryInput, menuRecipes);

                    // Automatically open the dropdown
                    if (selectElement) {
                        // Focus and trigger click to open dropdown
                        selectElement.focus();
                        // Use a small delay to ensure the select is rendered
                        setTimeout(() => {
                            // Trigger the dropdown to open
                            selectElement.click();
                            // Alternative method for some browsers
                            if (selectElement.showPicker) {
                                selectElement.showPicker();
                            }
                        }, 50);
                    }

                    // Clear references after conversion
                    this.pendingMenuInput = null;
                    this.currentMenuCategoryInput = null;
                }, 100);
                */

                // ============================================
                // OPCIÓN B: Usar modal personalizada (ACTIVA)
                // ============================================
                setTimeout(() => {
                    this.openMenuRecipeSelectorModal(this.currentMenuCategoryInput, menuRecipes, category);
                }, 100);
            } else {
                // No recipes: Set category value and close modal
                if (category) {
                    this.currentMenuCategoryInput.value = `${category.emoji} ${category.name}`;
                    this.currentMenuCategoryInput.dataset.categoryId = categoryId;
                }

                // Close category selector modal
                const categorySelectorModal = document.getElementById('category-selector-modal');
                if (categorySelectorModal) {
                    categorySelectorModal.classList.add('hidden');
                }

                // Clear references
                this.pendingMenuInput = null;
                this.currentMenuCategoryInput = null;
            }
        } else {
            // Update recipe form
            const categoryInput = document.getElementById('recipe-category');
            if (categoryInput) {
                categoryInput.value = categoryId;
            }
            // Update display
            this.updateCategoryDisplay();

            // Close modal
            const modal = document.getElementById('category-selector-modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        }
    }

    /**
     * Render category modal content
     */
    renderCategoryModal() {
        // Set default emoji
        const emojiSpan = document.getElementById('new-category-emoji');
        const emojiHidden = document.getElementById('new-category-emoji-value');
        if (emojiSpan) {
            emojiSpan.textContent = DEFAULT_EMOJI;
        }
        if (emojiHidden) {
            emojiHidden.value = DEFAULT_EMOJI;
        }

        // Set default color
        const colorPreview = document.getElementById('new-category-color-preview');
        const colorHidden = document.getElementById('selected-color');
        const defaultColor = CATEGORY_COLORS[0];
        if (colorPreview) {
            colorPreview.style.backgroundColor = defaultColor;
        }
        if (colorHidden) {
            colorHidden.value = defaultColor;
        }

        // Render category lists
        this.renderCustomCategoriesList();
    }

    /**
     * Render custom categories list
     */
    renderCustomCategoriesList() {
        const listContainer = document.getElementById('custom-categories-list');
        const emptyState = document.getElementById('custom-categories-empty');
        const titleElement = document.getElementById('custom-categories-title');
        if (!listContainer || !emptyState) return;

        listContainer.innerHTML = '';

        // Get all custom categories
        const allCustomCategories = this.categoryManager.customCategories;

        if (allCustomCategories.length === 0) {
            // Hide entire section when empty
            if (titleElement) titleElement.style.display = 'none';
            emptyState.style.display = 'none';
            listContainer.style.display = 'none';
        } else {
            // Show section when has categories
            if (titleElement) titleElement.style.display = 'block';
            emptyState.style.display = 'none';
            listContainer.style.display = 'grid';

            const counts = this.categoryManager.getCategoryCounts(this.recipes);

            // Separate visible and hidden categories
            const visibleCategories = allCustomCategories.filter(
                cat => !this.categoryManager.isCategoryHidden(cat.id)
            );
            const hiddenCategories = allCustomCategories.filter(
                cat => this.categoryManager.isCategoryHidden(cat.id)
            );

            // Render visible categories first
            visibleCategories.forEach(category => {
                const item = this.createCustomCategoryItem(category, counts[category.id] || 0, false);
                listContainer.appendChild(item);
            });

            // Render hidden categories at the end (with hidden style)
            hiddenCategories.forEach(category => {
                const item = this.createCustomCategoryItem(category, counts[category.id] || 0, true);
                listContainer.appendChild(item);
            });
        }
    }

    /**
     * Render hidden categories list
     */
    renderHiddenCategoriesList() {
        const listContainer = document.getElementById('hidden-categories-list');
        const emptyState = document.getElementById('hidden-categories-empty');
        const titleElement = document.getElementById('hidden-categories-title');
        if (!listContainer || !emptyState) return;

        listContainer.innerHTML = '';

        const hiddenCategories = this.categoryManager.getHiddenCategories();

        if (hiddenCategories.length === 0) {
            // Hide entire section when empty
            if (titleElement) titleElement.style.display = 'none';
            emptyState.style.display = 'none';
            listContainer.style.display = 'none';
        } else {
            // Show section when has categories
            if (titleElement) titleElement.style.display = 'block';
            emptyState.style.display = 'none';
            listContainer.style.display = 'grid';

            const counts = this.categoryManager.getCategoryCounts(this.recipes);

            hiddenCategories.forEach(category => {
                const item = this.createHiddenCategoryItem(category, counts[category.id] || 0);
                listContainer.appendChild(item);
            });
        }
    }

    /**
     * Create hidden category item element with restore button
     * @param {Object} category - Category object
     * @param {number} count - Recipe count
     * @returns {HTMLElement} Category item element
     */
    createHiddenCategoryItem(category, count) {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.dataset.categoryId = category.id;

        // Category info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'category-info';

        const emoji = document.createElement('span');
        emoji.className = 'category-emoji';
        emoji.textContent = category.emoji;

        const name = document.createElement('span');
        name.className = 'category-name';
        name.textContent = category.name;

        const badge = document.createElement('span');
        badge.className = 'category-badge';
        badge.style.backgroundColor = category.color;

        const countSpan = document.createElement('span');
        countSpan.className = 'category-count';
        countSpan.textContent = `(${count} ${count === 1 ? 'receta' : 'recetas'})`;

        const menuBtn = document.createElement('button');
        menuBtn.type = 'button';
        menuBtn.className = 'btn-icon btn-category-menu';
        menuBtn.textContent = '⋮';
        menuBtn.title = 'Más opciones';
        menuBtn.setAttribute('aria-label', 'Más opciones');
        menuBtn.addEventListener('click', () => {
            this.openCategoryOptionsModal(category.id, true);
        });

        infoDiv.appendChild(emoji);
        infoDiv.appendChild(name);
        infoDiv.appendChild(badge);
        infoDiv.appendChild(countSpan);
        infoDiv.appendChild(menuBtn);

        item.appendChild(infoDiv);

        return item;
    }

    /**
     * Create custom category item element with edit/delete/hide buttons
     * @param {Object} category - Category object
     * @param {number} count - Recipe count
     * @param {boolean} isHidden - Whether the category is hidden
     * @returns {HTMLElement} Category item element
     */
    createCustomCategoryItem(category, count, isHidden = false) {
        const item = document.createElement('div');
        item.className = 'category-item';
        if (isHidden) {
            item.classList.add('category-item-hidden');
        }
        item.dataset.categoryId = category.id;

        // Category info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'category-info';

        const emoji = document.createElement('span');
        emoji.className = 'category-emoji';
        emoji.textContent = category.emoji;

        const name = document.createElement('span');
        name.className = 'category-name';
        name.textContent = category.name;

        const badge = document.createElement('span');
        badge.className = 'category-badge';
        badge.style.backgroundColor = category.color;

        const countSpan = document.createElement('span');
        countSpan.className = 'category-count';
        countSpan.textContent = `(${count} ${count === 1 ? 'receta' : 'recetas'})`;

        const menuBtn = document.createElement('button');
        menuBtn.type = 'button';
        menuBtn.className = 'btn-icon btn-category-menu';
        menuBtn.textContent = '⋮';
        menuBtn.title = 'Más opciones';
        menuBtn.setAttribute('aria-label', 'Más opciones');
        menuBtn.addEventListener('click', () => {
            this.openCategoryOptionsModal(category.id, isHidden);
        });

        infoDiv.appendChild(emoji);
        infoDiv.appendChild(name);
        infoDiv.appendChild(badge);
        infoDiv.appendChild(countSpan);
        infoDiv.appendChild(menuBtn);

        item.appendChild(infoDiv);

        return item;
    }

    /**
     * Show category management modal
     */
    showCategoryModal(fromSettings = false) {
        // Edge case: Sync modal stack before opening to ensure consistency
        this.syncModalStack();

        const modal = document.getElementById('category-modal');
        if (modal) {
            // Store the currently focused element to restore later
            modal.dataset.previousFocus = document.activeElement?.id || '';

            modal.classList.remove('hidden');
            this.renderCategoryModal();

            // Track modal opening context
            modal.dataset.openedFrom = fromSettings ? 'settings' : 'menu';

            // Add to modal stack
            this.pushModal('category-modal');

            // Add stacked class when opened from settings for proper z-index
            if (fromSettings) {
                modal.classList.add('stacked');
            }

            // Clear form
            document.getElementById('new-category-name').value = '';
            const emojiSpan = document.getElementById('new-category-emoji');
            const emojiHidden = document.getElementById('new-category-emoji-value');
            if (emojiSpan) emojiSpan.textContent = DEFAULT_EMOJI;
            if (emojiHidden) emojiHidden.value = DEFAULT_EMOJI;
            const colorPreview = document.getElementById('new-category-color-preview');
            const colorHidden = document.getElementById('selected-color');
            if (colorPreview) colorPreview.style.backgroundColor = CATEGORY_COLORS[0];
            if (colorHidden) colorHidden.value = CATEGORY_COLORS[0];
            document.getElementById('category-error').textContent = '';

            // Set focus to the first focusable element in the modal
            this.setModalFocus(modal);
        }
    }

    /**
     * Close category management modal
     */
    closeCategoryModal() {
        // Edge case: Prevent multiple rapid clicks
        if (this.isClosingModal) {
            console.log('[ModalStack] Close operation already in progress, ignoring');
            return;
        }

        const modal = document.getElementById('category-modal');
        if (!modal) return;

        // Set closing flag
        this.isClosingModal = true;

        // Get opening context to determine cascading behavior
        const openedFrom = modal.dataset.openedFrom || 'menu';

        // Restore focus to the element that opened the modal
        const previousFocusId = modal.dataset.previousFocus;

        // Close category modal
        modal.classList.add('hidden');

        // Remove stacked class if present
        modal.classList.remove('stacked');

        // Remove from modal stack
        this.popModal();

        // If opened from settings, close settings modal too (cascading close)
        if (openedFrom === 'settings') {
            this.closeSettingsModal();
        } else if (previousFocusId) {
            // Restore focus only if not cascading close
            this.restoreFocus(previousFocusId);
        }

        // Always navigate to home view
        this.goToHome();

        // Reset closing flag after debounce time
        setTimeout(() => {
            this.isClosingModal = false;
        }, this.modalCloseDebounceTime);
    }

    /**
     * Open settings modal
     */
    openSettingsModal() {
        // Edge case: Sync modal stack before opening to ensure consistency
        this.syncModalStack();

        const modal = document.getElementById('settings-modal');
        if (!modal) return;

        // Store the currently focused element to restore later
        modal.dataset.previousFocus = document.activeElement?.id || '';

        // Show modal
        modal.classList.remove('hidden');

        // Add to modal stack
        this.pushModal('settings-modal');

        // Load recipe book owner name
        const ownerInput = document.getElementById('recipe-book-owner');
        if (ownerInput) {
            const savedOwner = localStorage.getItem('recipe_book_owner') || '';
            ownerInput.value = savedOwner;

            // Save on input change
            ownerInput.addEventListener('input', (e) => {
                localStorage.setItem('recipe_book_owner', e.target.value.trim());
            });
        }

        // Setup event listeners
        const closeBtn = document.getElementById('close-settings-modal');
        const overlay = modal.querySelector('.modal-overlay');

        if (closeBtn) {
            closeBtn.onclick = () => this.closeSettingsModal();
        }

        if (overlay) {
            overlay.onclick = () => this.closeSettingsModal();
        }

        // Set focus to the first focusable element in the modal
        this.setModalFocus(modal);
    }

    /**
     * Close settings modal
     */
    closeSettingsModal() {
        // Edge case: Prevent multiple rapid clicks (but allow cascading close from category modal)
        if (this.isClosingModal && this.modalStack.includes('category-modal')) {
            console.log('[ModalStack] Close operation already in progress, ignoring');
            return;
        }

        const modal = document.getElementById('settings-modal');
        if (modal) {
            // Restore focus to the element that opened the modal
            const previousFocusId = modal.dataset.previousFocus;

            modal.classList.add('hidden');

            // Restore focus after modal is closed
            if (previousFocusId) {
                this.restoreFocus(previousFocusId);
            }
        }

        // Remove from modal stack
        this.popModal();

        // Close menu dropdown if it's open
        const menuDropdown = document.getElementById('menu-dropdown');
        const menuBtn = document.getElementById('menu-btn');
        if (menuDropdown && menuDropdown.classList.contains('active')) {
            menuDropdown.classList.remove('active');
            if (menuBtn) {
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    }

    // ===== Modal Stack Management =====

    /**
     * Add a modal to the stack when it opens
     * @param {string} modalId - The ID of the modal being opened
     */
    pushModal(modalId) {
        if (!this.modalStack.includes(modalId)) {
            this.modalStack.push(modalId);
            console.log('[ModalStack] Pushed modal:', modalId, 'Stack:', this.modalStack);
        }
    }

    /**
     * Remove the last modal from the stack when it closes
     * @returns {string|null} The ID of the removed modal, or null if stack was empty
     */
    popModal() {
        const modalId = this.modalStack.pop();
        console.log('[ModalStack] Popped modal:', modalId, 'Stack:', this.modalStack);
        return modalId || null;
    }

    /**
     * Clear all modals from the stack
     * Useful for resetting the modal state
     */
    clearModalStack() {
        console.log('[ModalStack] Clearing stack. Previous stack:', this.modalStack);
        this.modalStack = [];
    }

    /**
     * Synchronize the modal stack with the actual DOM state
     * This ensures the stack matches which modals are actually visible
     */
    syncModalStack() {
        console.log('[ModalStack] Syncing stack. Previous stack:', this.modalStack);
        this.modalStack = [];

        // Find all modals that are currently visible (not hidden)
        const visibleModals = document.querySelectorAll('.modal:not(.hidden)');
        visibleModals.forEach(modal => {
            if (modal.id) {
                this.modalStack.push(modal.id);
            }
        });

        console.log('[ModalStack] Synced stack:', this.modalStack);
    }

    /**
     * Set focus to the first focusable element in a modal
     * Accessibility: Ensures keyboard users can immediately interact with the modal
     */
    setModalFocus(modal) {
        if (!modal) return;

        // Find all focusable elements in the modal
        const focusableElements = modal.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            // Focus the first focusable element (usually the close button or first input)
            setTimeout(() => {
                focusableElements[0].focus();
            }, 100); // Small delay to ensure modal is fully rendered
        }
    }

    /**
     * Restore focus to a previously focused element
     * Accessibility: Returns focus to the element that triggered the modal
     */
    restoreFocus(elementId) {
        if (!elementId) return;

        const element = document.getElementById(elementId);
        if (element) {
            setTimeout(() => {
                element.focus();
            }, 100); // Small delay to ensure modal is fully closed
        }
    }

    /**
     * Handle ESC key press to close the topmost modal
     * Edge case: Provides keyboard accessibility for modal closing
     */
    handleEscapeKey() {
        // Prevent closing if already in progress
        if (this.isClosingModal) {
            console.log('[ModalStack] Close operation already in progress, ignoring ESC');
            return;
        }

        // Sync stack to ensure consistency
        this.syncModalStack();

        // Get the topmost modal from the stack
        if (this.modalStack.length === 0) {
            console.log('[ModalStack] No modals open, ESC ignored');
            return;
        }

        const topModalId = this.modalStack[this.modalStack.length - 1];
        console.log('[ModalStack] ESC pressed, closing topmost modal:', topModalId);

        // Close the appropriate modal based on ID
        switch (topModalId) {
            case 'category-modal':
                this.closeCategoryModal();
                break;
            case 'settings-modal':
                this.closeSettingsModal();
                break;
            case 'edit-category-modal':
                this.closeEditCategoryModal();
                break;
            case 'emoji-picker-modal':
                this.closeEmojiPickerModal();
                break;
            case 'color-picker-modal':
                this.closeColorPickerModal();
                break;
            case 'category-options-modal':
                this.closeCategoryOptionsModal();
                break;
            case 'image-modal':
                this.closeImageModal();
                break;
            case 'category-selector-modal':
                this.closeCategorySelectorModal();
                break;
            default:
                console.warn('[ModalStack] Unknown modal ID:', topModalId);
                // Try to close it anyway by hiding it
                const modal = document.getElementById(topModalId);
                if (modal) {
                    modal.classList.add('hidden');
                    this.popModal();
                }
        }
    }

    // ===== End Modal Stack Management =====

    /**
     * Collapse all expandable content in modals
     * This ensures all collapsible sections are closed when opening a modal
     */
    collapseAllExpandableContent() {
        // Collapse all shopping-list-content elements
        const allContents = document.querySelectorAll('.shopping-list-content');
        allContents.forEach(content => {
            content.classList.add('collapsed');
        });

        // Reset all expand icons
        const allExpandIcons = document.querySelectorAll('.expand-icon');
        allExpandIcons.forEach(icon => {
            icon.textContent = '▼';
        });

        // Collapse all menu-content elements (if any)
        const allMenuContents = document.querySelectorAll('.menu-content');
        allMenuContents.forEach(content => {
            content.classList.add('collapsed');
        });

        console.log('[UI] Collapsed all expandable content');
    }

    /**
     * Handle create category
     */
    handleCreateCategory() {
        const nameInput = document.getElementById('new-category-name');
        const emojiHidden = document.getElementById('new-category-emoji-value');
        const colorInput = document.getElementById('selected-color');
        const errorMessage = document.getElementById('category-error');

        if (!nameInput || !emojiHidden || !colorInput || !errorMessage) return;

        // Clear previous error
        errorMessage.textContent = '';

        try {
            // Create category
            const category = this.categoryManager.createCategory({
                name: nameInput.value,
                emoji: emojiHidden.value || DEFAULT_EMOJI,
                color: colorInput.value || CATEGORY_COLORS[0]
            });

            // Update UI
            this.renderFilterChips();
            this.renderCategorySelector();
            this.renderCustomCategoriesList();

            // Clear form
            nameInput.value = '';
            const emojiSpan = document.getElementById('new-category-emoji');
            if (emojiSpan) emojiSpan.textContent = DEFAULT_EMOJI;
            emojiHidden.value = DEFAULT_EMOJI;

            // Reset color
            const colorPreview = document.getElementById('new-category-color-preview');
            if (colorPreview) colorPreview.style.backgroundColor = CATEGORY_COLORS[0];
            colorInput.value = CATEGORY_COLORS[0];

            // Show success message
            this.showSuccess(`Categoría "${category.name}" creada correctamente`);

        } catch (error) {
            errorMessage.textContent = error.message;
        }
    }

    /**
     * Handle edit category - show edit modal
     * @param {string} categoryId - Category ID to edit
     */
    handleEditCategory(categoryId) {
        const category = this.categoryManager.getCategoryById(categoryId);
        if (!category) return;

        // Check if it's a predefined category
        if (category.isPredefined) {
            this.showError('No se pueden editar categorías predefinidas');
            return;
        }

        // Show edit modal
        this.showEditCategoryModal(category);
    }

    /**
     * Show edit category modal
     * @param {Object} category - Category to edit
     */
    showEditCategoryModal(category) {
        const modal = document.getElementById('edit-category-modal');
        if (!modal) return;

        // Populate form with current values
        document.getElementById('edit-category-name').value = category.name;
        const emojiSpan = document.getElementById('edit-category-emoji');
        const emojiHidden = document.getElementById('edit-category-emoji-value');
        if (emojiSpan) emojiSpan.textContent = category.emoji || DEFAULT_EMOJI;
        if (emojiHidden) emojiHidden.value = category.emoji || DEFAULT_EMOJI;
        const colorPreview = document.getElementById('edit-category-color-preview');
        if (colorPreview) colorPreview.style.backgroundColor = category.color;
        document.getElementById('edit-category-id').value = category.id;
        document.getElementById('edit-selected-color').value = category.color;
        document.getElementById('edit-category-error').textContent = '';

        // Show modal
        modal.classList.remove('hidden');
    }

    /**
     * Close edit category modal
     */
    closeEditCategoryModal() {
        const modal = document.getElementById('edit-category-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    /**
     * Open emoji picker modal
     * @param {string} targetSpanId - ID of the span element to update visually
     * @param {string} targetHiddenId - ID of the hidden input to store value
     */
    openEmojiPickerModal(targetSpanId, targetHiddenId) {
        const modal = document.getElementById('emoji-picker-modal');
        if (!modal) return;

        // Store target IDs
        this.emojiPickerTargetSpan = targetSpanId;
        this.emojiPickerTargetHidden = targetHiddenId;

        // Render emoji grid
        this.renderEmojiPickerModal();

        // Show modal
        modal.classList.remove('hidden');

        // Add stacked class to appear above category modal
        modal.classList.add('stacked');

        // Add to modal stack
        this.pushModal('emoji-picker-modal');
    }

    /**
     * Close emoji picker modal
     */
    closeEmojiPickerModal() {
        const modal = document.getElementById('emoji-picker-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('stacked');
        }

        // Remove from modal stack
        this.popModal();
    }

    /**
     * Render emoji picker modal content
     */
    renderEmojiPickerModal() {
        Object.keys(EMOJI_CATEGORIES).forEach(category => {
            const grid = document.querySelector(`.emoji-grid-modal[data-category="${category}"]`);
            if (!grid) return;

            grid.innerHTML = '';

            EMOJI_CATEGORIES[category].forEach(emoji => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'emoji-option';
                button.textContent = emoji;
                button.title = emoji;

                button.addEventListener('click', () => {
                    // Update visual span
                    const targetSpan = document.getElementById(this.emojiPickerTargetSpan);
                    if (targetSpan) {
                        targetSpan.textContent = emoji;
                    }

                    // Update hidden input value
                    const targetHidden = document.getElementById(this.emojiPickerTargetHidden);
                    if (targetHidden) {
                        targetHidden.value = emoji;
                    }

                    // Close modal
                    this.closeEmojiPickerModal();
                });

                grid.appendChild(button);
            });
        });
    }

    /**
     * Open color picker modal
     * @param {string} targetPreviewId - ID of the preview element to update
     * @param {string} targetHiddenId - ID of the hidden input to store value
     */
    openColorPickerModal(targetPreviewId, targetHiddenId) {
        const modal = document.getElementById('color-picker-modal');
        if (!modal) return;

        // Store target IDs
        this.colorPickerTargetPreview = targetPreviewId;
        this.colorPickerTargetHidden = targetHiddenId;

        // Render color palette
        this.renderColorPickerModal();

        // Show modal
        modal.classList.remove('hidden');

        // Add stacked class to appear above category modal
        modal.classList.add('stacked');

        // Add to modal stack
        this.pushModal('color-picker-modal');
    }

    /**
     * Close color picker modal
     */
    closeColorPickerModal() {
        const modal = document.getElementById('color-picker-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('stacked');
        }

        // Remove from modal stack
        this.popModal();
    }

    /**
     * Render color picker modal content
     */
    renderColorPickerModal() {
        const colorPalette = document.getElementById('color-palette-modal');
        if (!colorPalette) return;

        colorPalette.innerHTML = '';

        // Get current selected color
        const currentColor = document.getElementById(this.colorPickerTargetHidden)?.value;

        CATEGORY_COLORS.forEach((color) => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'color-chip';
            chip.style.backgroundColor = color;
            chip.dataset.color = color;

            // Select current color
            if (color === currentColor) {
                chip.classList.add('selected');
            }

            chip.addEventListener('click', () => {
                // Update preview
                const targetPreview = document.getElementById(this.colorPickerTargetPreview);
                if (targetPreview) {
                    targetPreview.style.backgroundColor = color;
                }

                // Update hidden input value
                const targetHidden = document.getElementById(this.colorPickerTargetHidden);
                if (targetHidden) {
                    targetHidden.value = color;
                }

                // Close modal
                this.closeColorPickerModal();
            });

            colorPalette.appendChild(chip);
        });
    }

    /**
     * Open category options modal
     * @param {string} categoryId - Category ID
     * @param {boolean} isHidden - Whether the category is currently hidden
     */
    openCategoryOptionsModal(categoryId, isHidden) {
        const modal = document.getElementById('category-options-modal');
        if (!modal) return;

        // Store category ID and hidden state
        modal.dataset.categoryId = categoryId;
        modal.dataset.isHidden = isHidden;

        // Get category to determine if it's predefined
        const category = this.categoryManager.getCategoryById(categoryId);
        const isPredefined = category?.isPredefined || false;

        // Update toggle button text
        const toggleText = document.getElementById('category-option-toggle-text');
        if (toggleText) {
            toggleText.textContent = isHidden ? 'Mostrar' : 'Ocultar';
        }

        // Show/hide delete button for predefined categories
        // Edit button is commented out in HTML
        // const editBtn = document.getElementById('category-option-edit');
        const deleteBtn = document.getElementById('category-option-delete');

        // if (editBtn) {
        //     editBtn.style.display = isPredefined ? 'none' : 'flex';
        // }
        if (deleteBtn) {
            deleteBtn.style.display = isPredefined ? 'none' : 'flex';
        }

        // Show modal
        modal.classList.remove('hidden');
        modal.classList.add('stacked');

        // Add to modal stack
        this.pushModal('category-options-modal');

        // Set focus
        this.setModalFocus(modal);

        // Setup event listeners
        this.setupCategoryOptionsListeners();
    }

    /**
     * Close category options modal
     */
    closeCategoryOptionsModal() {
        const modal = document.getElementById('category-options-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('stacked');
        }

        // Remove from modal stack
        this.popModal();
    }

    /**
     * Setup event listeners for category options modal
     */
    setupCategoryOptionsListeners() {
        const modal = document.getElementById('category-options-modal');
        if (!modal) return;

        const closeBtn = document.getElementById('close-category-options-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const editBtn = document.getElementById('category-option-edit');
        const toggleBtn = document.getElementById('category-option-toggle');
        const deleteBtn = document.getElementById('category-option-delete');

        // Remove old listeners by cloning
        if (closeBtn) {
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            newCloseBtn.addEventListener('click', () => this.closeCategoryOptionsModal());
        }

        if (overlay) {
            const newOverlay = overlay.cloneNode(true);
            overlay.parentNode.replaceChild(newOverlay, overlay);
            newOverlay.addEventListener('click', () => this.closeCategoryOptionsModal());
        }

        // Edit button commented out in HTML
        // if (editBtn) {
        //     const newEditBtn = editBtn.cloneNode(true);
        //     editBtn.parentNode.replaceChild(newEditBtn, editBtn);
        //     newEditBtn.addEventListener('click', () => {
        //         const categoryId = modal.dataset.categoryId;
        //         this.closeCategoryOptionsModal();
        //         this.handleEditCategory(categoryId);
        //     });
        // }

        if (toggleBtn) {
            const newToggleBtn = toggleBtn.cloneNode(true);
            toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
            newToggleBtn.addEventListener('click', () => {
                const categoryId = modal.dataset.categoryId;
                const isHidden = modal.dataset.isHidden === 'true';
                this.closeCategoryOptionsModal();

                if (isHidden) {
                    this.handleRestoreCategory(categoryId);
                } else {
                    this.handleHideCategory(categoryId);
                }
            });
        }

        if (deleteBtn) {
            const newDeleteBtn = deleteBtn.cloneNode(true);
            deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
            newDeleteBtn.addEventListener('click', () => {
                const categoryId = modal.dataset.categoryId;
                this.closeCategoryOptionsModal();
                this.handleDeleteCategory(categoryId);
            });
        }
    }

    /**
     * Handle save edited category
     */
    async handleSaveEditCategory() {
        const nameInput = document.getElementById('edit-category-name');
        const emojiHidden = document.getElementById('edit-category-emoji-value');
        const colorInput = document.getElementById('edit-selected-color');
        const categoryIdInput = document.getElementById('edit-category-id');
        const errorMessage = document.getElementById('edit-category-error');

        if (!nameInput || !emojiHidden || !colorInput || !categoryIdInput || !errorMessage) return;

        const categoryId = categoryIdInput.value;

        // Clear previous error
        errorMessage.textContent = '';

        try {
            // Update category
            const oldId = categoryId;
            const result = this.categoryManager.updateCategory(categoryId, {
                name: nameInput.value.trim(),
                emoji: emojiHidden.value.trim() || DEFAULT_EMOJI,
                color: colorInput.value || CATEGORY_COLORS[0]
            });

            // If ID changed (name changed), update all recipes
            if (result.oldId !== result.category.id) {
                for (const recipe of this.recipes) {
                    if (recipe.category === result.oldId) {
                        recipe.category = result.category.id;
                        await this.storageManager.saveRecipe(recipe);
                    }
                }

                // Reload recipes
                await this.loadRecipes();
            }

            // Update UI
            this.renderFilterChips();
            this.renderCategorySelector();
            this.renderRecipeList();
            this.renderCustomCategoriesList();

            // Close modal
            this.closeEditCategoryModal();

            // Show success message
            this.showSuccess(`Categoría actualizada correctamente`);

        } catch (error) {
            errorMessage.textContent = error.message;
        }
    }

    /**
     * Handle delete/hide category
     * @param {string} categoryId - Category ID to delete/hide
     */
    async handleDeleteCategory(categoryId) {
        const category = this.categoryManager.getCategoryById(categoryId);
        if (!category) return;

        // Count affected recipes
        const affectedCount = this.recipes.filter(r => r.category === categoryId).length;

        // Confirm deletion/hiding
        const action = category.isPredefined ? 'ocultar' : 'eliminar';
        let message = `¿Estás seguro de que quieres ${action} la categoría "${category.name}"?`;
        if (affectedCount > 0) {
            message += `\n\n${affectedCount} ${affectedCount === 1 ? 'receta' : 'recetas'} ${affectedCount === 1 ? 'usa' : 'usan'} esta categoría y ${affectedCount === 1 ? 'pasará' : 'pasarán'} a "${NO_CATEGORY_LABEL}".`;
        }
        if (category.isPredefined) {
            message += '\n\nPodrás restaurarla desde la sección "Categorías ocultas".';
        }

        if (!confirm(message)) return;

        try {
            // Delete/hide category
            const result = this.categoryManager.deleteCategory(categoryId, this.recipes);

            // Update affected recipes
            if (result.affectedRecipes > 0) {
                for (const recipeId of result.affectedRecipeIds) {
                    const recipe = this.recipes.find(r => r.id === recipeId);
                    if (recipe) {
                        recipe.category = null;
                        await this.storageManager.saveRecipe(recipe);
                    }
                }

                // Reload recipes
                await this.loadRecipes();
            }

            // Update UI
            this.renderFilterChips();
            this.renderCategorySelector();
            this.renderRecipeList();
            this.renderCustomCategoriesList();

            // Show success message
            const actionText = result.isPredefined ? 'ocultada' : 'eliminada';
            this.showSuccess(`Categoría "${category.name}" ${actionText} correctamente`);

        } catch (error) {
            this.showError('Error al eliminar la categoría: ' + error.message);
        }
    }

    /**
     * Handle hide category
     * @param {string} categoryId - Category ID to hide
     */
    async handleHideCategory(categoryId) {
        const category = this.categoryManager.getCategoryById(categoryId);
        if (!category) return;

        // Count affected recipes
        const affectedCount = this.recipes.filter(r => r.category === categoryId).length;

        // Confirm hiding
        let message = `¿Estás seguro de que quieres ocultar la categoría "${category.name}"?`;
        if (affectedCount > 0) {
            message += `\n\n${affectedCount} ${affectedCount === 1 ? 'receta se ocultará' : 'recetas se ocultarán'} junto con esta categoría.`;
        }
        message += '\n\nPodrás restaurarla desde la sección "Categorías ocultas".';

        if (!confirm(message)) return;

        try {
            // Hide category (recipes keep their category, just won't be visible)
            this.categoryManager.hideCategory(categoryId);

            // Update UI
            this.renderFilterChips();
            this.renderCategorySelector();
            this.renderRecipeList();
            this.renderCustomCategoriesList();

            // Show success message
            const recipesText = affectedCount > 0 ? ` (${affectedCount} ${affectedCount === 1 ? 'receta ocultada' : 'recetas ocultadas'})` : '';
            this.showSuccess(`Categoría "${category.name}" ocultada correctamente${recipesText}`);

        } catch (error) {
            this.showError('Error al ocultar la categoría: ' + error.message);
        }
    }

    /**
     * Handle restore category
     * @param {string} categoryId - Category ID to restore
     */
    async handleRestoreCategory(categoryId) {
        const category = this.categoryManager.getCategoryById(categoryId);
        if (!category) return;

        try {
            // Unhide category
            this.categoryManager.unhideCategory(categoryId);

            // Update UI
            this.renderFilterChips();
            this.renderCategorySelector();
            this.renderRecipeList();
            this.renderCustomCategoriesList();

            // Show success message
            this.showSuccess(`Categoría "${category.name}" restaurada correctamente`);

        } catch (error) {
            this.showError('Error al restaurar la categoría: ' + error.message);
        }
    }

    // ===== End Category Management Functions =====

    /**
     * Setup form-specific event listeners
     * Requirements: 1.1, 1.3, 3.1, 3.2, 9.1, 9.3
     */
    setupFormEventListeners() {
        // Close form button
        const closeFormBtn = document.getElementById('close-form-btn');
        if (closeFormBtn) {
            closeFormBtn.addEventListener('click', () => {
                this.closeRecipeForm();
            });
        }

        // Cancel form button
        const cancelFormBtn = document.getElementById('cancel-form-btn');
        if (cancelFormBtn) {
            cancelFormBtn.addEventListener('click', () => {
                this.closeRecipeForm();
            });
        }

        // Form submission
        const recipeForm = document.getElementById('recipe-form');
        if (recipeForm) {
            recipeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        // Save button at top (form-actions)
        const saveRecipeBtnTop = document.getElementById('save-recipe-btn-top');
        if (saveRecipeBtnTop) {
            saveRecipeBtnTop.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        // Name field validation (real-time) - now using contenteditable h2
        const nameInput = document.getElementById('recipe-name');
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                this.validateNameField();
            });

            nameInput.addEventListener('blur', () => {
                this.validateNameField();
            });

            // Prevent line breaks in contenteditable
            nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    nameInput.blur();
                }
            });
        }

        // Ingredient management event listeners
        // Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
        this.setupIngredientEventListeners();

        // Sequence management event listeners
        // Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
        this.setupSequenceEventListeners();

        // Multimedia management event listeners
        // Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
        this.setupMultimediaEventListeners();

        // Time input validation event listeners
        this.setupTimeInputValidation();

        // Cooking action buttons event listeners
        this.setupCookingActionButtons();

        // Collapsible sections event listeners
        this.setupCollapsibleSections();

        // Kitchen appliances chips
        this.renderKitchenAppliancesChips();

        // Checkbox badge toggles
        this.setupCheckboxBadges();
    }

    /**
     * Setup cooking action buttons event listeners
     */
    setupCookingActionButtons() {
        const cookingButtonsContainer = document.getElementById('cooking-actions-buttons');
        const ingredientButtonsContainer = document.getElementById('ingredient-action-buttons');
        let descriptionTextarea = document.getElementById('sequence-description');

        if (!descriptionTextarea || !cookingButtonsContainer) return;

        // Clone textarea to remove all previous event listeners
        const newTextarea = descriptionTextarea.cloneNode(true);
        descriptionTextarea.parentNode.replaceChild(newTextarea, descriptionTextarea);
        descriptionTextarea = newTextarea;

        // Render cooking action buttons dynamically
        this.renderCookingActionButtons();

        // Render ingredient buttons dynamically
        this.renderIngredientButtons();

        // Get all buttons from both containers
        const getAllButtons = () => {
            const cookingButtons = Array.from(cookingButtonsContainer.querySelectorAll('.cooking-action-btn'));
            const ingredientButtons = ingredientButtonsContainer ?
                Array.from(ingredientButtonsContainer.querySelectorAll('.cooking-action-btn')) : [];
            return [...ingredientButtons, ...cookingButtons];
        };

        let allButtons = getAllButtons();
        let currentSuggestedButton = null;

        // Clone and replace cooking buttons to remove old listeners
        cookingButtonsContainer.querySelectorAll('.cooking-action-btn').forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            newButton.addEventListener('click', () => {
                this.insertActionIntoTextarea(newButton.dataset.action, descriptionTextarea);
                if (currentSuggestedButton) {
                    currentSuggestedButton.classList.remove('suggested');
                    currentSuggestedButton = null;
                }
            });
        });

        // New autocomplete: highlight matching button as user types
        descriptionTextarea.addEventListener('input', () => {
            // Update used actions (green marking)
            this.updateUsedCookingActions();

            // Clear previous suggestion
            if (currentSuggestedButton) {
                currentSuggestedButton.classList.remove('suggested');
                currentSuggestedButton = null;
            }

            // Refresh button list in case ingredients changed
            allButtons = getAllButtons();

            // Find and highlight suggested button
            currentSuggestedButton = this.findSuggestedButton(descriptionTextarea, allButtons);
            if (currentSuggestedButton) {
                currentSuggestedButton.classList.add('suggested');
            }
        });

        // Handle Enter/Tab to accept suggestion
        descriptionTextarea.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === 'Tab') && currentSuggestedButton) {
                e.preventDefault();
                // Replace the partial word with the complete action
                this.insertActionIntoTextarea(currentSuggestedButton.dataset.action, descriptionTextarea, true);
                currentSuggestedButton.classList.remove('suggested');
                currentSuggestedButton = null;
            }
        });

        // Setup writing assistant collapsible
        const writingAssistantSection = document.getElementById('writing-assistant-section');
        const writingAssistantHeader = writingAssistantSection?.querySelector('.collapsible-header');
        if (writingAssistantHeader) {
            writingAssistantHeader.addEventListener('click', () => {
                writingAssistantSection.classList.toggle('collapsed');
            });
        }

        console.log('[CookingActions] Cooking action buttons initialized');
    }

    /**
     * Render cooking action buttons dynamically from COOKING_ACTIONS constant
     */
    renderCookingActionButtons() {
        const cookingButtonsContainer = document.getElementById('cooking-actions-buttons');
        if (!cookingButtonsContainer) return;

        // Clear existing buttons
        cookingButtonsContainer.innerHTML = '';

        // Sort by order and render
        const sortedActions = [...COOKING_ACTIONS].sort((a, b) => a.order - b.order);

        sortedActions.forEach(action => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'cooking-action-btn';
            button.dataset.action = action.name;
            button.dataset.category = action.category;
            button.textContent = action.name;

            cookingButtonsContainer.appendChild(button);
        });
    }

    /**
     * Render ingredient buttons dynamically
     */
    renderIngredientButtons() {
        const ingredientButtonsContainer = document.getElementById('ingredient-action-buttons');
        const descriptionTextarea = document.getElementById('sequence-description');
        if (!ingredientButtonsContainer) return;

        // Clear existing ingredient buttons
        ingredientButtonsContainer.innerHTML = '';

        // Add ingredient buttons
        this.ingredients.forEach(ingredient => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'cooking-action-btn ingredient-btn';
            button.dataset.action = ingredient.name;
            button.textContent = ingredient.name;

            // Add click handler
            if (descriptionTextarea) {
                button.addEventListener('click', () => {
                    this.insertActionIntoTextarea(ingredient.name, descriptionTextarea);
                });
            }

            ingredientButtonsContainer.appendChild(button);
        });
    }

    /**
     * Find suggested button based on current text
     */
    findSuggestedButton(textarea, buttons) {
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPos);

        // Get the current word being typed
        const words = textBeforeCursor.split(/[\s,]+/);
        const currentWord = words[words.length - 1].toLowerCase();

        if (currentWord.length < 2) {
            return null;
        }

        // Find first button that matches
        for (const button of buttons) {
            const action = button.dataset.action.toLowerCase();
            if (action.startsWith(currentWord) && action !== currentWord) {
                return button;
            }
        }

        return null;
    }

    /**
     * Insert action into textarea at cursor position
     * If there's a partial word, it will be replaced
     */
    insertActionIntoTextarea(action, textarea, replacePartialWord = false) {
        const currentValue = textarea.value;
        const cursorPos = textarea.selectionStart;
        let textBefore = currentValue.substring(0, cursorPos);
        const textAfter = currentValue.substring(cursorPos);

        // If replacing partial word, remove the current word being typed
        if (replacePartialWord) {
            // Find the start of the current word
            let wordStart = cursorPos;
            while (wordStart > 0 && !/[\s,]/.test(currentValue[wordStart - 1])) {
                wordStart--;
            }
            // Remove the partial word
            textBefore = currentValue.substring(0, wordStart);
        }

        // Check if we need to capitalize (start of text or after period)
        const shouldCapitalize = textBefore.length === 0 ||
            textBefore.trimEnd().endsWith('.') ||
            textBefore.trimEnd().endsWith('!') ||
            textBefore.trimEnd().endsWith('?');

        // Capitalize first letter if needed
        if (shouldCapitalize && action.length > 0) {
            action = action.charAt(0).toUpperCase() + action.slice(1);
        }

        // Add space before if needed (only if not replacing partial word)
        const needsSpaceBefore = !replacePartialWord && textBefore.length > 0 && !textBefore.endsWith(' ') && !textBefore.endsWith('\n');
        const prefix = needsSpaceBefore ? ' ' : '';

        // Update textarea value
        textarea.value = textBefore + prefix + action + textAfter;

        // Set cursor position after inserted text
        const newCursorPos = textBefore.length + prefix.length + action.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);

        // Focus textarea
        textarea.focus();

        // Update used buttons
        this.updateUsedCookingActions();
    }

    /**
     * Update cooking action buttons to show which ones are used
     */
    updateUsedCookingActions() {
        const descriptionTextarea = document.getElementById('sequence-description');
        const actionButtons = document.querySelectorAll('.cooking-action-btn');

        if (!descriptionTextarea) return;

        const description = descriptionTextarea.value.toLowerCase();

        actionButtons.forEach(button => {
            const action = button.dataset.action.toLowerCase();

            // Check if the action is in the description
            if (description.includes(action)) {
                button.classList.add('used');
            } else {
                button.classList.remove('used');
            }
        });
    }

    /**
     * Setup collapsible sections event listeners
     */
    setupCollapsibleSections() {
        // Appliances section
        const appliancesSectionTitle = document.getElementById('appliances-section-title');
        if (appliancesSectionTitle) {
            appliancesSectionTitle.addEventListener('click', () => {
                this.toggleCollapsibleSection('appliances');
            });
        }

        // Ingredients section
        const ingredientsSectionTitle = document.getElementById('ingredients-section-title');
        if (ingredientsSectionTitle) {
            ingredientsSectionTitle.addEventListener('click', () => {
                this.toggleCollapsibleSection('ingredients');
            });
        }

        // Sequences section
        const sequencesSectionTitle = document.getElementById('sequences-section-title');
        if (sequencesSectionTitle) {
            sequencesSectionTitle.addEventListener('click', () => {
                this.toggleCollapsibleSection('sequences');
            });
        }

        // Additional info section
        const additionalInfoSectionTitle = document.getElementById('additional-info-section-title');
        if (additionalInfoSectionTitle) {
            additionalInfoSectionTitle.addEventListener('click', () => {
                this.toggleCollapsibleSection('additional-info');
            });
        }

        // Multimedia section
        const multimediaSectionTitle = document.getElementById('multimedia-section-title');
        if (multimediaSectionTitle) {
            multimediaSectionTitle.addEventListener('click', () => {
                this.toggleCollapsibleSection('multimedia');
            });
        }
    }

    /**
     * Setup checkbox badge toggles
     * Makes badges clickeable to toggle checkbox state
     */
    setupCheckboxBadges() {
        const badgeContainers = document.querySelectorAll('.checkbox-badge-container');

        badgeContainers.forEach(container => {
            container.addEventListener('click', () => {
                const checkboxId = container.dataset.checkbox;
                const checkbox = document.getElementById(checkboxId);

                if (checkbox) {
                    // Toggle checkbox state
                    checkbox.checked = !checkbox.checked;

                    // Toggle active class on container
                    if (checkbox.checked) {
                        container.classList.add('active');
                    } else {
                        container.classList.remove('active');
                    }
                }
            });
        });
    }

    /**
     * Toggle collapsible section
     * @param {string} sectionName - Name of the section to toggle
     */
    toggleCollapsibleSection(sectionName) {
        const title = document.getElementById(`${sectionName}-section-title`);
        const content = document.getElementById(`${sectionName}-collapsible-content`);

        if (!title || !content) return;

        const isCollapsed = title.classList.contains('collapsed');

        if (isCollapsed) {
            // Close all other sections first
            const allSections = ['appliances', 'ingredients', 'sequences', 'additional-info', 'multimedia'];
            allSections.forEach(section => {
                if (section !== sectionName) {
                    this.setCollapsibleSectionState(section, true);
                }
            });

            // Expand this section
            title.classList.remove('collapsed');
            content.classList.remove('collapsed');
        } else {
            // Collapse
            title.classList.add('collapsed');
            content.classList.add('collapsed');
        }
    }

    /**
     * Set collapsible section state
     * @param {string} sectionName - Name of the section
     * @param {boolean} collapsed - Whether to collapse or expand
     */
    setCollapsibleSectionState(sectionName, collapsed) {
        const title = document.getElementById(`${sectionName}-section-title`);
        const content = document.getElementById(`${sectionName}-collapsible-content`);

        if (!title || !content) return;

        if (collapsed) {
            title.classList.add('collapsed');
            content.classList.add('collapsed');

            // If collapsing sequences section, also collapse writing assistant
            if (sectionName === 'sequences') {
                const writingAssistant = document.getElementById('writing-assistant-section');
                if (writingAssistant) {
                    writingAssistant.classList.add('collapsed');
                }
            }
        } else {
            title.classList.remove('collapsed');
            content.classList.remove('collapsed');
        }
    }

    /**
     * Setup ingredient management event listeners
     * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
     */
    setupIngredientEventListeners() {
        // Add ingredient button
        const addIngredientBtn = document.getElementById('add-ingredient-btn');
        if (addIngredientBtn) {
            addIngredientBtn.addEventListener('click', () => {
                this.handleAddIngredient();
            });
        }

        // Allow Enter key to add ingredient (except for ingredient-name which has autocomplete)
        const ingredientInputs = document.querySelectorAll('.ingredient-input');
        ingredientInputs.forEach(input => {
            // Skip ingredient-name input as it has special autocomplete handling
            if (input.id === 'ingredient-name') return;

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleAddIngredient();
                }
            });
        });

        // Setup autocomplete for ingredient name input
        this.setupIngredientAutocomplete();
    }

    /**
     * Setup autocomplete for ingredient name input
     */
    setupIngredientAutocomplete() {
        const nameInput = document.getElementById('ingredient-name');
        const autocompleteDiv = document.getElementById('ingredient-autocomplete');

        if (!nameInput || !autocompleteDiv) {
            console.warn('[Autocomplete] Ingredient name input or autocomplete div not found');
            return;
        }

        // Remove existing listeners to avoid duplicates
        const newNameInput = nameInput.cloneNode(true);
        nameInput.parentNode.replaceChild(newNameInput, nameInput);
        const nameInputRef = document.getElementById('ingredient-name');

        let currentSuggestionIndex = -1;

        // Show autocomplete on input
        nameInputRef.addEventListener('input', () => {
            const value = nameInputRef.value.trim().toLowerCase();

            // Hide if less than 2 characters
            if (value.length < 2) {
                autocompleteDiv.style.display = 'none';
                return;
            }

            // Filter predefined ingredients (only match from the start)
            const matches = PREDEFINED_INGREDIENTS.filter(ingredient =>
                ingredient.toLowerCase().startsWith(value)
            );

            // Show suggestions if there are matches
            if (matches.length > 0) {
                this.showIngredientAutocomplete(nameInputRef, autocompleteDiv, matches);
                currentSuggestionIndex = -1;
            } else {
                autocompleteDiv.style.display = 'none';
            }
        });

        // Keyboard navigation
        nameInputRef.addEventListener('keydown', (e) => {
            const isAutocompleteVisible = autocompleteDiv && autocompleteDiv.style.display !== 'none';
            const suggestions = autocompleteDiv.querySelectorAll('.autocomplete-item');

            if (e.key === 'Enter') {
                // If autocomplete is visible and a suggestion is selected
                if (isAutocompleteVisible && currentSuggestionIndex >= 0) {
                    e.preventDefault();
                    suggestions[currentSuggestionIndex].click();
                    return;
                }
                // If autocomplete is NOT visible, add the ingredient
                if (!isAutocompleteVisible) {
                    e.preventDefault();
                    this.handleAddIngredient();
                    return;
                }
            }

            // Only handle arrow keys if autocomplete is visible
            if (!isAutocompleteVisible) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentSuggestionIndex = (currentSuggestionIndex + 1) % suggestions.length;
                this.highlightSuggestion(suggestions, currentSuggestionIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentSuggestionIndex = currentSuggestionIndex <= 0 ? suggestions.length - 1 : currentSuggestionIndex - 1;
                this.highlightSuggestion(suggestions, currentSuggestionIndex);
            } else if (e.key === 'Escape') {
                autocompleteDiv.style.display = 'none';
                currentSuggestionIndex = -1;
            }
        });

        // Close autocomplete when clicking outside
        const closeAutocomplete = (e) => {
            if (!nameInputRef.contains(e.target) && !autocompleteDiv.contains(e.target)) {
                autocompleteDiv.style.display = 'none';
                currentSuggestionIndex = -1;
            }
        };

        // Store reference to remove later if needed
        if (!this._ingredientAutocompleteClickHandler) {
            this._ingredientAutocompleteClickHandler = closeAutocomplete;
            document.addEventListener('click', closeAutocomplete);
        }

        console.log('[Autocomplete] Ingredient autocomplete initialized successfully');
    }

    /**
     * Show ingredient autocomplete suggestions
     * @param {HTMLElement} input - Input element
     * @param {HTMLElement} container - Autocomplete container
     * @param {Array} suggestions - Array of suggestion strings
     */
    showIngredientAutocomplete(input, container, suggestions) {
        container.innerHTML = '';

        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = this.capitalizeFirstLetter(suggestion);

            item.addEventListener('click', () => {
                input.value = this.capitalizeFirstLetter(suggestion);
                container.style.display = 'none';
                input.focus();
            });

            container.appendChild(item);
        });

        container.style.display = 'block';
    }

    /**
     * Highlight suggestion at index
     * @param {NodeList} suggestions - List of suggestion elements
     * @param {number} index - Index to highlight
     */
    highlightSuggestion(suggestions, index) {
        suggestions.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Setup sequence management event listeners
     * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
     */
    setupSequenceEventListeners() {
        // Add sequence button
        const addSequenceBtn = document.getElementById('add-sequence-btn');
        if (addSequenceBtn) {
            addSequenceBtn.addEventListener('click', () => {
                this.handleAddSequence();
            });
        }
    }

    /**
     * Setup multimedia management event listeners
     * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
     */
    setupMultimediaEventListeners() {
        // Upload image button
        const uploadImageBtn = document.getElementById('upload-image-btn');
        const imageUploadInput = document.getElementById('image-upload');

        if (uploadImageBtn && imageUploadInput) {
            uploadImageBtn.addEventListener('click', () => {
                imageUploadInput.click();
            });

            imageUploadInput.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files);
            });
        }
    }

    /**
     * Setup time input validation event listeners
     * Validates time inputs in real-time and marks invalid fields
     */
    setupTimeInputValidation() {
        // Recipe time inputs (Tiempo Total)
        const recipeHours = document.getElementById('recipe-hours');
        const recipeMinutes = document.getElementById('recipe-minutes');

        if (recipeHours) {
            recipeHours.addEventListener('input', () => {
                this.validateTimeField(recipeHours, 0, 24);
            });
            recipeHours.addEventListener('blur', () => {
                this.validateTimeField(recipeHours, 0, 24);
            });
        }

        if (recipeMinutes) {
            recipeMinutes.addEventListener('input', () => {
                this.validateTimeField(recipeMinutes, 0, 60);
            });
            recipeMinutes.addEventListener('blur', () => {
                this.validateTimeField(recipeMinutes, 0, 60);
            });
        }

        // Sequence time inputs (Duración)
        const sequenceHours = document.getElementById('sequence-hours');
        const sequenceMinutes = document.getElementById('sequence-minutes');

        if (sequenceHours) {
            sequenceHours.addEventListener('input', () => {
                this.validateTimeField(sequenceHours, 0, 24);
            });
            sequenceHours.addEventListener('blur', () => {
                this.validateTimeField(sequenceHours, 0, 24);
            });
        }

        if (sequenceMinutes) {
            sequenceMinutes.addEventListener('input', () => {
                this.validateTimeField(sequenceMinutes, 0, 60);
            });
            sequenceMinutes.addEventListener('blur', () => {
                this.validateTimeField(sequenceMinutes, 0, 60);
            });
        }
    }

    /**
     * Validate a time field and mark it as invalid if out of range
     * @param {HTMLElement} field - Input field to validate
     * @param {number} min - Minimum allowed value
     * @param {number} max - Maximum allowed value
     */
    validateTimeField(field, min, max) {
        const value = parseInt(field.value);

        // If empty, remove invalid class
        if (field.value === '' || isNaN(value)) {
            field.classList.remove('invalid');
            field.title = '';
            return;
        }

        // Check if value is out of range
        if (value < min || value > max) {
            field.classList.add('invalid');
            field.title = `El valor debe estar entre ${min} y ${max}`;
        } else {
            field.classList.remove('invalid');
            field.title = '';
        }
    }

    /**
     * Toggle filters visibility
     */
    toggleFilters() {
        const filtersContainer = document.getElementById('filters-container');
        const toggleBtn = document.getElementById('toggle-filters-btn');
        const clearBtn = document.getElementById('clear-all-filters-btn');

        if (!filtersContainer || !toggleBtn) return;

        const isHidden = filtersContainer.classList.contains('hidden');

        if (isHidden) {
            // Opening filters
            filtersContainer.classList.remove('hidden');
            toggleBtn.textContent = '✖️ Cerrar filtros';
            // Show clear button if filters are active
            // TEMPORALMENTE OCULTO - Referencia a activeTimeFilter (2025-11-04)
            if (clearBtn && (this.activeFilters.size > 0 /* || this.activeTimeFilter !== 'all' */)) {
                clearBtn.classList.remove('hidden');
            }
        } else {
            // Closing filters - just hide, don't clear
            filtersContainer.classList.add('hidden');
            toggleBtn.textContent = '🔍 Filtros';

            // Hide clear button
            if (clearBtn) {
                clearBtn.classList.add('hidden');
            }
        }
    }

    /**
     * Update clear button visibility based on active filters
     */
    updateClearButtonVisibility() {
        const clearBtn = document.getElementById('clear-all-filters-btn');
        const filtersContainer = document.getElementById('filters-container');

        if (!clearBtn) return;

        // Show button only if filters are visible and there are active filters
        // TEMPORALMENTE OCULTO - Referencia a activeTimeFilter (2025-11-04)
        const hasActiveFilters = this.activeFilters.size > 0 /* || this.activeTimeFilter !== 'all' */;
        const filtersVisible = filtersContainer && !filtersContainer.classList.contains('hidden');

        if (hasActiveFilters && filtersVisible) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    /**
     * Clear all filters (category and time)
     */
    clearAllFilters() {
        // Clear category filters
        this.activeFilters.clear();

        // TEMPORALMENTE OCULTO - Clear time filter (2025-11-04)
        /*
        this.activeTimeFilter = 'all';
        */

        // Update UI - category chips
        const categoryChips = document.querySelectorAll('#filter-bar .filter-chip');
        categoryChips.forEach(chip => {
            if (chip.dataset.category === 'all') {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        // TEMPORALMENTE OCULTO - Update UI - time chips (2025-11-04)
        /*
        const timeChips = document.querySelectorAll('#time-filter-chips .filter-chip');
        timeChips.forEach(chip => {
            if (chip.dataset.time === 'all') {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });
        */

        // Hide clear button
        const clearBtn = document.getElementById('clear-all-filters-btn');
        if (clearBtn) {
            clearBtn.classList.add('hidden');
        }

        // Clear category marks (remove red borders)
        this.markAvailableCategoriesByTime();

        // Update clear button visibility
        this.updateClearButtonVisibility();

        // Render all recipes
        this.renderRecipeList();
    }

    /**
     * Handle filter chip click - implements multiple filter logic
     * Requirements: 10.2, 10.3, 10.4, 10.5
     */
    handleFilterClick(chip) {
        const category = chip.dataset.category;

        // Handle "all" filter - clear all filters
        if (category === 'all') {
            this.clearFilters();
            return;
        }

        // Toggle filter
        if (this.activeFilters.has(category)) {
            this.activeFilters.delete(category);
            chip.classList.remove('active');
        } else {
            this.activeFilters.add(category);
            chip.classList.add('active');
        }

        // Update "all" chip state
        const allChip = document.querySelector('.filter-chip[data-category="all"]');
        if (this.activeFilters.size === 0) {
            allChip.classList.add('active');
        } else {
            allChip.classList.remove('active');
        }

        // Update clear button visibility
        this.updateClearButtonVisibility();

        // Apply filters and update view
        this.renderRecipeList();
    }

    /**
     * Clear all active filters
     * Requirements: 10.5
     */
    clearFilters() {
        this.activeFilters.clear();

        // Update UI - remove active class from all chips except "all"
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(chip => {
            if (chip.dataset.category === 'all') {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        // Render all recipes
        this.renderRecipeList();
    }

    // TEMPORALMENTE OCULTO - Handle time filter chip click (2025-11-04)
    /*
    handleTimeFilterClick(chip) {
        const timeFilter = chip.dataset.time;

        // Update active time filter
        this.activeTimeFilter = timeFilter;

        // Update UI - remove active class from all time chips
        const timeChips = document.querySelectorAll('#time-filter-chips .filter-chip');
        timeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        // Mark available categories based on time filter
        this.markAvailableCategoriesByTime();

        // Update clear button visibility
        this.updateClearButtonVisibility();

        // Apply filters and update view
        this.renderRecipeList();
    }

    markAvailableCategoriesByTime() {
        const categoryChips = document.querySelectorAll('#filter-bar .filter-chip:not([data-category="all"])');
        
        // If no time filter is active, remove all marks
        if (this.activeTimeFilter === 'all') {
            categoryChips.forEach(chip => {
                chip.classList.remove('has-time-recipes');
            });
            return;
        }

        // Get recipes that match the time filter
        const recipesInTimeRange = this.recipes.filter(recipe => {
            const totalMinutes = this.parseTimeToMinutes(recipe.totalTime);
            
            if (this.activeTimeFilter === 'none') {
                return totalMinutes === null;
            }
            
            if (totalMinutes === null) return false;

            const filterValue = this.activeTimeFilter;
            if (filterValue === '15') return totalMinutes <= 15;
            if (filterValue === '30') return totalMinutes <= 30;
            if (filterValue === '45') return totalMinutes <= 45;
            if (filterValue === '60') return totalMinutes <= 60;
            if (filterValue === '120') return totalMinutes <= 120;
            if (filterValue === '180') return totalMinutes <= 180;
            
            return false;
        });

        // Mark categories that have recipes in this time range
        categoryChips.forEach(chip => {
            const category = chip.dataset.category;
            const hasRecipes = recipesInTimeRange.some(recipe => {
                if (category === NO_CATEGORY_ID) {
                    return !recipe.category;
                }
                return recipe.category === category;
            });

            if (hasRecipes) {
                chip.classList.add('has-time-recipes');
            } else {
                chip.classList.remove('has-time-recipes');
            }
        });
    }
    */

    /**
     * Parse time string to minutes
     * @param {string} timeString - Time string like "2h 30min", "1h", "45min"
     * @returns {number} Total minutes or null if no time
     */
    parseTimeToMinutes(timeString) {
        if (!timeString || timeString.trim() === '') {
            return null;
        }

        const hoursMatch = timeString.match(/(\d+)\s*h/);
        const minutesMatch = timeString.match(/(\d+)\s*min/);

        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

        return hours * 60 + minutes;
    }

    /**
     * Filter recipes based on active filters
     * Requirements: 10.2, 10.3, 10.4
     * @returns {Recipe[]} Filtered recipes
     */
    filterRecipes() {
        let filtered = this.recipes;

        // Filter out recipes from hidden categories
        filtered = filtered.filter(recipe => {
            // If recipe has no category, it's always visible
            if (!recipe.category) return true;
            // Only show recipes from visible categories
            return !this.categoryManager.isCategoryHidden(recipe.category);
        });

        // Apply category filter
        if (this.activeFilters.size > 0) {
            filtered = filtered.filter(recipe => {
                // Separate special filters (AND logic) from regular category filters (OR logic)
                const specialFilters = ['caravana', 'hospital', 'menu'];
                const activeSpecialFilters = Array.from(this.activeFilters).filter(f => specialFilters.includes(f));
                const activeCategoryFilters = Array.from(this.activeFilters).filter(f => !specialFilters.includes(f));

                // Check special filters (must match ALL - AND logic)
                let specialFiltersMatch = true;

                if (activeSpecialFilters.includes('caravana')) {
                    if (recipe.caravanFriendly !== true) {
                        specialFiltersMatch = false;
                    }
                }

                if (activeSpecialFilters.includes('hospital')) {
                    if (recipe.hospitalFriendly !== true) {
                        specialFiltersMatch = false;
                    }
                }

                if (activeSpecialFilters.includes('menu')) {
                    if (recipe.menuFriendly !== true) {
                        specialFiltersMatch = false;
                    }
                }

                // If special filters don't match, exclude recipe
                if (!specialFiltersMatch) {
                    return false;
                }

                // If only special filters are active (no category filters), include recipe
                if (activeCategoryFilters.length === 0) {
                    return true;
                }

                // Check category filters (must match ANY - OR logic)
                let categoryMatch = false;

                // Check NO_CATEGORY_ID filter
                if (activeCategoryFilters.includes(NO_CATEGORY_ID) && (recipe.category === null || recipe.category === undefined)) {
                    categoryMatch = true;
                }

                // Check if recipe category matches any active category filter
                if (recipe.category && activeCategoryFilters.includes(recipe.category)) {
                    categoryMatch = true;
                }

                return categoryMatch;
            });
        }

        // TEMPORALMENTE OCULTO - Apply time filter (2025-11-04)
        /*
        if (this.activeTimeFilter !== 'all') {
            filtered = filtered.filter(recipe => {
                const totalMinutes = this.parseTimeToMinutes(recipe.totalTime);

                // Handle "none" filter - recipes without time
                if (this.activeTimeFilter === 'none') {
                    return totalMinutes === null;
                }

                // If recipe has no time, don't include it in time-based filters
                if (totalMinutes === null) {
                    return false;
                }

                // Handle specific time filters (acumulativo: muestra recetas <= tiempo seleccionado)
                // Ejemplo: filtro 30min muestra recetas de 0-30min
                if (this.activeTimeFilter === '15') {
                    return totalMinutes <= 15;
                } else if (this.activeTimeFilter === '30') {
                    return totalMinutes <= 30;
                } else if (this.activeTimeFilter === '45') {
                    return totalMinutes <= 45;
                } else if (this.activeTimeFilter === '60') {
                    return totalMinutes <= 60;
                } else if (this.activeTimeFilter === '120') {
                    // Rango específico: entre 1h y 2h
                    return totalMinutes <= 120;
                } else if (this.activeTimeFilter === '180') {
                    return totalMinutes <= 180;
                }

                return true;
            });

            // Sort by proximity to selected time filter (only if not manually sorting)
            if (this.activeTimeFilter !== 'none' && this.sortBy === 'date' && this.sortOrder === 'desc') {
                const targetMinutes = parseInt(this.activeTimeFilter);
                
                filtered.sort((a, b) => {
                    const aMinutes = this.parseTimeToMinutes(a.totalTime) || 0;
                    const bMinutes = this.parseTimeToMinutes(b.totalTime) || 0;
                    
                    // Calculate distance from target time
                    const aDistance = Math.abs(aMinutes - targetMinutes);
                    const bDistance = Math.abs(bMinutes - targetMinutes);
                    
                    // Sort by closest to target time
                    return aDistance - bDistance;
                });
            }
        }
        */

        // Apply manual sorting (name or date)
        if (this.sortBy === 'name') {
            filtered.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                if (this.sortOrder === 'asc') {
                    return nameA.localeCompare(nameB);
                } else {
                    return nameB.localeCompare(nameA);
                }
            });
        } else if (this.sortBy === 'date') {
            filtered.sort((a, b) => {
                const aDate = new Date(a.updatedAt);
                const bDate = new Date(b.updatedAt);

                if (this.sortOrder === 'asc') {
                    return aDate - bDate; // Oldest first
                } else {
                    return bDate - aDate; // Most recent first
                }
            });
        }

        return filtered;
    }

    /**
     * Set view mode (grid or list)
     * @param {string} mode - 'grid' or 'list'
     */
    setViewMode(mode) {
        this.viewMode = mode;
        localStorage.setItem('viewMode', mode);

        // Update button states
        const viewGridBtn = document.getElementById('view-grid-btn');
        const viewListBtn = document.getElementById('view-list-btn');
        const recipesGrid = document.getElementById('recipes-grid');
        const listHeader = document.getElementById('list-view-header');

        if (viewGridBtn && viewListBtn) {
            if (mode === 'grid') {
                viewGridBtn.classList.add('active');
                viewListBtn.classList.remove('active');
            } else {
                viewGridBtn.classList.remove('active');
                viewListBtn.classList.add('active');
            }
        }

        // Update grid class and header visibility
        if (recipesGrid) {
            if (mode === 'list') {
                recipesGrid.classList.add('list-view');
                if (listHeader) listHeader.classList.remove('hidden');
            } else {
                recipesGrid.classList.remove('list-view');
                if (listHeader) listHeader.classList.add('hidden');
            }
        }

        // Re-render recipes
        this.renderRecipeList();
    }

    /**
     * Toggle sort order for a column
     * @param {string} column - 'name' or 'date'
     */
    toggleSort(column) {
        // If clicking the same column, cycle through: asc -> desc -> reset
        if (this.sortBy === column) {
            if (this.sortOrder === 'asc') {
                this.sortOrder = 'desc';
            } else if (this.sortOrder === 'desc') {
                // Reset to default (date, desc)
                this.sortBy = 'date';
                this.sortOrder = 'desc';
            }
        } else {
            // If clicking a different column, set it as active with default order
            this.sortBy = column;
            this.sortOrder = column === 'name' ? 'asc' : 'desc';
        }

        // Update sort indicators
        this.updateSortIndicators();

        // Re-render recipes
        this.renderRecipeList();
    }

    /**
     * Update sort indicator arrows in header
     */
    updateSortIndicators() {
        const nameIndicator = document.querySelector('#sort-by-name .sort-indicator');
        const dateIndicator = document.querySelector('#sort-by-date .sort-indicator');

        if (nameIndicator) {
            if (this.sortBy === 'name') {
                nameIndicator.textContent = this.sortOrder === 'asc' ? '▲' : '▼';
            } else {
                nameIndicator.textContent = '';
            }
        }

        if (dateIndicator) {
            if (this.sortBy === 'date') {
                dateIndicator.textContent = this.sortOrder === 'asc' ? '▲' : '▼';
            } else {
                dateIndicator.textContent = '';
            }
        }
    }

    /**
     * Render the recipe list view
     */
    renderRecipeList() {
        const recipesGrid = document.getElementById('recipes-grid');
        const emptyState = document.getElementById('empty-state');

        if (!recipesGrid || !emptyState) {
            console.error('Required DOM elements not found');
            return;
        }

        // Menu is always visible now

        // Get filtered recipes
        const filteredRecipes = this.filterRecipes();

        // Clear grid
        recipesGrid.innerHTML = '';

        // Show empty state if no recipes
        if (filteredRecipes.length === 0) {
            emptyState.classList.remove('hidden');
            recipesGrid.style.display = 'none';

            // Hide recipe counter
            const recipeCounter = document.getElementById('recipe-counter');
            if (recipeCounter) {
                recipeCounter.style.display = 'none';
            }

            // Update empty state message based on filters
            if (this.activeFilters.size > 0) {
                const emptyStateTitle = emptyState.querySelector('h3');
                const emptyStateText = emptyState.querySelector('p');
                if (emptyStateTitle) emptyStateTitle.textContent = 'No se encontraron recetas';
                if (emptyStateText) emptyStateText.textContent = 'No hay recetas que coincidan con los filtros seleccionados';
            } else {
                const emptyStateTitle = emptyState.querySelector('h3');
                const emptyStateText = emptyState.querySelector('p');
                if (emptyStateTitle) emptyStateTitle.textContent = 'No hay recetas todavía';
                if (emptyStateText) emptyStateText.textContent = 'Comienza creando tu primera receta';
            }
            return;
        }

        // Hide empty state and show grid
        emptyState.classList.add('hidden');
        recipesGrid.style.display = 'grid';

        // Show and update recipe counter
        const recipeCounter = document.getElementById('recipe-counter');
        if (recipeCounter) {
            recipeCounter.style.display = 'inline-block';
        }
        this.updateRecipeCounter(filteredRecipes.length, this.recipes.length);

        // Render recipe cards
        filteredRecipes.forEach(recipe => {
            const card = this.createRecipeCard(recipe);
            recipesGrid.appendChild(card);
        });
    }

    /**
     * Update recipe counter display
     * @param {number} count - Number of recipes displayed
     * @param {number} total - Total number of recipes
     */
    updateRecipeCounter(count, total) {
        const counterText = document.getElementById('recipe-count-text');
        if (!counterText) return;

        // Show "X de Y recetas" format
        const recetasText = total === 1 ? 'receta' : 'recetas';
        const text = `${count} de ${total} ${recetasText}`;
        counterText.textContent = text;
    }

    /**
     * Create an action badge with consistent accessibility features
     * @param {Object} config - Badge configuration
     * @param {string} config.className - CSS class name
     * @param {string} config.title - Tooltip text
     * @param {string} config.ariaLabel - Accessibility label
     * @param {Function} config.onClick - Click handler
     * @param {boolean} config.stopPropagation - Whether to stop event propagation (default: true)
     * @returns {HTMLElement} Badge element
     */
    createActionBadge({ className, title, ariaLabel, onClick, stopPropagation = true }) {
        const badge = document.createElement('div');
        badge.className = className;
        badge.title = title;
        badge.setAttribute('role', 'button');
        badge.setAttribute('tabindex', '0');
        badge.setAttribute('aria-label', ariaLabel);

        // Click handler
        badge.addEventListener('click', (e) => {
            if (stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            onClick(e);
        });

        // Keyboard accessibility
        badge.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (stopPropagation) {
                    e.stopPropagation();
                }
                onClick(e);
            }
        });

        return badge;
    }

    /**
     * Create a recipe list item (for list view)
     * @param {Recipe} recipe - Recipe to display
     * @returns {HTMLElement} Recipe list item element
     */
    createRecipeListItem(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card list-item';
        card.dataset.recipeId = recipe.id;

        // Add highlight class if this is the recently saved recipe
        if (this.lastSavedRecipeId && recipe.id === this.lastSavedRecipeId) {
            card.classList.add('recipe-card-highlight');
            setTimeout(() => {
                card.classList.remove('recipe-card-highlight');
                this.lastSavedRecipeId = null;
            }, 2000);
        }

        // Create thumbnail image
        const imageDiv = document.createElement('div');
        imageDiv.className = 'recipe-image';

        if (recipe.images && recipe.images.length > 0) {
            const img = document.createElement('img');
            img.src = recipe.images[0].data;
            img.alt = recipe.name;
            imageDiv.appendChild(img);
        } else {
            imageDiv.textContent = '📷';
            imageDiv.style.display = 'flex';
            imageDiv.style.alignItems = 'center';
            imageDiv.style.justifyContent = 'center';
            imageDiv.style.fontSize = '2rem';
            imageDiv.style.background = 'var(--color-background-secondary)';
        }

        // Create content section
        const contentDiv = document.createElement('div');
        contentDiv.className = 'recipe-content';

        // Recipe name
        const nameH3 = document.createElement('h3');
        nameH3.className = 'recipe-name';
        nameH3.textContent = recipe.name;

        // Create inline badges container (after name)
        const inlineBadgesContainer = document.createElement('div');
        inlineBadgesContainer.style.display = 'flex';
        inlineBadgesContainer.style.gap = 'var(--spacing-xs)';
        inlineBadgesContainer.style.marginTop = 'var(--spacing-xs)';

        // Add caravan badge if recipe is caravan friendly
        if (recipe.caravanFriendly === true) {
            const caravanBadge = document.createElement('span');
            caravanBadge.className = 'recipe-total-time';
            caravanBadge.textContent = '🚐';
            caravanBadge.title = 'Apto para caravana';
            inlineBadgesContainer.appendChild(caravanBadge);
        }

        // Add hospital badge if recipe is hospital friendly
        if (recipe.hospitalFriendly === true) {
            const hospitalBadge = document.createElement('span');
            hospitalBadge.className = 'recipe-total-time';
            hospitalBadge.textContent = '🏥';
            hospitalBadge.title = 'Apto para hospital';
            inlineBadgesContainer.appendChild(hospitalBadge);
        }

        // Add menu badge if recipe is menu friendly
        if (recipe.menuFriendly === true) {
            const menuBadge = document.createElement('span');
            menuBadge.className = 'recipe-total-time';
            menuBadge.textContent = '🍽️';
            menuBadge.title = 'Para menú';
            inlineBadgesContainer.appendChild(menuBadge);
        }

        // Recipe date (MM/YYYY format)
        const dateSpan = document.createElement('span');
        dateSpan.className = 'recipe-date';
        const date = new Date(recipe.updatedAt);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        dateSpan.textContent = `${month}/${year}`;

        // Share button
        const shareBtn = document.createElement('button');
        shareBtn.className = 'recipe-share-btn';
        shareBtn.textContent = '📤';
        shareBtn.title = 'Compartir receta';
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.shareRecipe(recipe.id);
        });

        contentDiv.appendChild(nameH3);
        if (inlineBadgesContainer.children.length > 0) {
            contentDiv.appendChild(inlineBadgesContainer);
        }
        contentDiv.appendChild(dateSpan);
        contentDiv.appendChild(shareBtn);

        card.appendChild(imageDiv);
        card.appendChild(contentDiv);

        // Click handler for the whole row (except share button)
        card.addEventListener('click', () => {
            this.showRecipeDetail(recipe.id);
        });

        return card;
    }

    /**
     * Create a recipe card element
     * @param {Recipe} recipe - Recipe to display
     * @returns {HTMLElement} Recipe card element
     */
    createRecipeCard(recipe) {
        // Check if we're in list view mode
        if (this.viewMode === 'list') {
            return this.createRecipeListItem(recipe);
        }

        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.dataset.recipeId = recipe.id;

        // Add highlight class if this is the recently saved recipe
        if (this.lastSavedRecipeId && recipe.id === this.lastSavedRecipeId) {
            card.classList.add('recipe-card-highlight');
            // Remove the highlight after animation completes
            setTimeout(() => {
                card.classList.remove('recipe-card-highlight');
                this.lastSavedRecipeId = null;
            }, 2000);
        }

        // Create image section
        const imageDiv = document.createElement('div');
        imageDiv.className = 'recipe-image';

        if (recipe.images && recipe.images.length > 0) {
            // Create carousel container
            const carouselContainer = document.createElement('div');
            carouselContainer.className = 'recipe-image-carousel';
            carouselContainer.dataset.currentIndex = '0';
            carouselContainer.dataset.totalImages = recipe.images.length;

            // Create images wrapper
            const imagesWrapper = document.createElement('div');
            imagesWrapper.className = 'carousel-images';

            // Add all images
            recipe.images.forEach((image, index) => {
                const img = document.createElement('img');
                img.src = image.data;
                img.alt = `${recipe.name} - Imagen ${index + 1}`;
                img.className = index === 0 ? 'active' : '';
                imagesWrapper.appendChild(img);
            });

            carouselContainer.appendChild(imagesWrapper);

            // Add navigation arrows if more than one image
            if (recipe.images.length > 1) {
                // Previous button
                const prevBtn = document.createElement('button');
                prevBtn.className = 'carousel-btn carousel-prev';
                prevBtn.innerHTML = '‹';
                prevBtn.setAttribute('aria-label', 'Imagen anterior');
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.navigateCarousel(carouselContainer, -1);
                });

                // Next button
                const nextBtn = document.createElement('button');
                nextBtn.className = 'carousel-btn carousel-next';
                nextBtn.innerHTML = '›';
                nextBtn.setAttribute('aria-label', 'Imagen siguiente');
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.navigateCarousel(carouselContainer, 1);
                });

                // Dots indicator
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'carousel-dots';
                recipe.images.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.className = index === 0 ? 'dot active' : 'dot';
                    dot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.goToCarouselImage(carouselContainer, index);
                    });
                    dotsContainer.appendChild(dot);
                });

                carouselContainer.appendChild(prevBtn);
                carouselContainer.appendChild(nextBtn);
                carouselContainer.appendChild(dotsContainer);

                // Add touch support for mobile
                this.addCarouselTouchSupport(carouselContainer);
            }

            imageDiv.appendChild(carouselContainer);
        }

        // Create badges container for dynamic stacking
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'recipe-badges-container';

        // Add time badge if totalTime exists
        if (recipe.totalTime && recipe.totalTime.trim() !== '') {
            const timeBadge = document.createElement('div');
            timeBadge.className = 'recipe-time-badge modal-trigger modal-trigger--badge';
            timeBadge.textContent = recipe.totalTime;
            timeBadge.setAttribute('aria-label', `Tiempo de preparación: ${recipe.totalTime}`);
            badgesContainer.appendChild(timeBadge);
        }

        // Add special badges (caravan, hospital, menu) using data-driven approach
        const specialBadges = [
            {
                condition: recipe.caravanFriendly,
                type: 'caravan',
                emoji: '🚐',
                title: 'Apto para caravana',
                ariaLabel: 'Receta apta para caravana'
            },
            {
                condition: recipe.hospitalFriendly,
                type: 'hospital',
                emoji: '🏥',
                title: 'Apto para hospital',
                ariaLabel: 'Receta apta para hospital'
            },
            {
                condition: recipe.menuFriendly,
                type: 'menu',
                emoji: '🍽️',
                title: 'Para menú',
                ariaLabel: 'Receta para menú'
            }
        ];

        specialBadges.forEach(({ condition, type, emoji, title, ariaLabel }) => {
            if (condition) {
                const badge = document.createElement('div');
                badge.className = `recipe-${type}-badge-image modal-trigger modal-trigger--badge modal-trigger--badge-xl`;
                badge.textContent = emoji;
                badge.title = title;
                badge.setAttribute('role', 'img');
                badge.setAttribute('aria-label', ariaLabel);
                badgesContainer.appendChild(badge);
            }
        });

        // Only append container if it has badges
        if (badgesContainer.children.length > 0) {
            imageDiv.appendChild(badgesContainer);
        }

        // Action badges removed - copy ingredients badge eliminated

        // Easter egg: Invisible options badge (transparent but functional)
        const optionsBadge = this.createActionBadge({
            className: 'recipe-options-badge recipe-options-badge-hidden',
            title: 'Más opciones',
            ariaLabel: `Opciones para ${recipe.name}`,
            onClick: (e) => this.showRecipeOptionsModal(recipe.id),
            stopPropagation: true
        });
        imageDiv.appendChild(optionsBadge);

        // Create content section
        const contentDiv = document.createElement('div');
        contentDiv.className = 'recipe-content';

        // Recipe name
        const nameH3 = document.createElement('h3');
        nameH3.className = 'recipe-name';
        nameH3.textContent = recipe.name;

        // Recipe category
        const categorySpan = document.createElement('span');
        categorySpan.className = 'recipe-category';

        if (recipe.category) {
            categorySpan.dataset.category = recipe.category;
            categorySpan.textContent = this.getCategoryLabel(recipe.category);
        } else {
            categorySpan.textContent = NO_CATEGORY_LABEL;
        }

        // Recipe preview (ingredients)
        const previewP = document.createElement('p');
        previewP.className = 'recipe-preview';

        if (recipe.ingredients && recipe.ingredients.length > 0) {
            const ingredientNames = recipe.ingredients
                .map(ing => ing.name)
                .join(', ');
            previewP.textContent = ingredientNames;
        } else {
            previewP.textContent = 'Sin ingredientes';
        }

        // Assemble card
        contentDiv.appendChild(nameH3);
        contentDiv.appendChild(categorySpan);
        contentDiv.appendChild(previewP);

        card.appendChild(imageDiv);
        card.appendChild(contentDiv);

        // Add click handler
        card.addEventListener('click', () => {
            this.showRecipeDetail(recipe.id);
        });

        return card;
    }

    /**
     * Get display label for category
     * @param {string} category - Category code
     * @returns {string} Display label
     */
    getCategoryLabel(category) {
        const categoryObj = this.categoryManager.getCategoryById(category);
        if (categoryObj) {
            return `${categoryObj.emoji} ${categoryObj.name}`;
        }
        // Category not found (may have been deleted)
        return '❓ Categoría no encontrada';
    }

    /**
     * Get category emoji
     * @param {string} category - Category ID
     * @returns {string} Category emoji
     */
    getCategoryEmoji(category) {
        const categoryObj = this.categoryManager.getCategoryById(category);
        if (categoryObj) {
            return categoryObj.emoji;
        }
        // Category not found
        return '❓';
    }

    /**
     * Show recipe form for creating or editing a recipe
     * Requirements: 1.1, 9.1
     * @param {string|null} recipeId - Recipe ID for editing, null for creating new
     */
    showRecipeForm(recipeId = null) {
        // Hide all other views
        const listView = document.getElementById('recipe-list-view');
        const detailView = document.getElementById('recipe-detail-view');
        if (listView) {
            listView.classList.add('hidden');
        }
        if (detailView) {
            detailView.classList.add('hidden');
        }

        // Menu remains visible in form view

        // Hide filter toggle container
        const filterToggleContainer = document.querySelector('.filter-toggle-container');
        if (filterToggleContainer) {
            filterToggleContainer.classList.add('hidden');
        }

        // Hide filter bars
        const filterBar = document.getElementById('filter-bar');
        if (filterBar) {
            filterBar.classList.add('hidden');
        }
        const timeFilterBar = document.getElementById('time-filter-bar');
        if (timeFilterBar) {
            timeFilterBar.classList.add('hidden');
        }

        // Show form view
        const formView = document.getElementById('recipe-form-view');
        if (formView) {
            formView.classList.remove('hidden');
        }

        // Update form title (now it's the recipe-name editable h2)
        const formTitle = document.getElementById('recipe-name');
        if (formTitle) {
            formTitle.textContent = recipeId ? 'Editar Receta' : 'Nueva Receta';
            // Add editing-mode class to apply hover styles permanently
            formTitle.classList.add('editing-mode');
        }

        // If editing, load recipe data first (before reset to avoid flashing empty state)
        if (recipeId) {
            this.loadRecipeIntoForm(recipeId);
        } else {
            // Only reset if creating new recipe
            this.resetForm();
        }

        // Render category selector with current categories
        this.renderCategorySelector();

        // Set collapsible sections state based on create/edit mode
        // Collapsed when editing, expanded when creating
        const isEditing = recipeId !== null;
        this.setCollapsibleSectionState('ingredients', isEditing);
        this.setCollapsibleSectionState('sequences', isEditing);
        this.setCollapsibleSectionState('additional-info', isEditing);
        this.setCollapsibleSectionState('multimedia', isEditing);

        // Show/hide action buttons based on edit mode
        const formActions = document.getElementById('form-actions');
        if (formActions) {
            if (isEditing) {
                formActions.style.display = 'flex';
            } else {
                formActions.style.display = 'none';
            }
        }

        // Update current view state
        this.currentView = 'form';
        this.currentRecipeId = recipeId;

        // Re-initialize ingredient autocomplete to ensure it works
        setTimeout(() => {
            this.setupIngredientAutocomplete();
            // Re-initialize cooking action buttons for edit mode
            this.setupCookingActionButtons();
        }, 100);

        // Scroll to top
        window.scrollTo(0, 0);
    }

    /**
     * Close recipe form and return to detail view (if editing) or list view (if creating)
     * Requirements: 6.4
     */
    closeRecipeForm() {
        // Confirm if there are unsaved changes
        const form = document.getElementById('recipe-form');
        if (form && this.hasUnsavedChanges()) {
            if (!confirm('¿Descartar los cambios no guardados?')) {
                return;
            }
        }

        // Store the recipe ID before any changes
        const editingRecipeId = this.currentRecipeId;

        // Hide form view
        const formView = document.getElementById('recipe-form-view');
        if (formView) {
            formView.classList.add('hidden');
        }

        // Remove editing-mode class from form title
        const formTitle = document.getElementById('recipe-name');
        if (formTitle) {
            formTitle.classList.remove('editing-mode');
        }

        // If we were editing a recipe, show its detail view
        if (editingRecipeId) {
            const recipe = this.recipes.find(r => r.id === editingRecipeId);
            if (recipe) {
                // Reset form before showing detail
                this.resetForm();

                // Show recipe detail (pass the ID, not the object)
                this.showRecipeDetail(editingRecipeId);
                return;
            }
        }

        // Reset form for new recipe case
        this.resetForm();

        // Otherwise, show list view (for new recipes or if recipe not found)
        const listView = document.getElementById('recipe-list-view');
        if (listView) {
            listView.classList.remove('hidden');
        }

        // Show filter toggle container
        const filterToggleContainer = document.querySelector('.filter-toggle-container');
        if (filterToggleContainer) {
            filterToggleContainer.classList.remove('hidden');
        }

        // Show filter bars
        const filterBar = document.getElementById('filter-bar');
        if (filterBar) {
            filterBar.classList.remove('hidden');
        }
        const timeFilterBar = document.getElementById('time-filter-bar');
        if (timeFilterBar) {
            timeFilterBar.classList.remove('hidden');
        }

        // Show recipe counter
        const recipeCounter = document.getElementById('recipe-counter');
        if (recipeCounter) {
            recipeCounter.style.display = 'inline-block';
            recipeCounter.classList.remove('hidden');
        }

        // Menu is always visible

        // Update current view state
        this.currentView = 'list';
        this.currentRecipeId = null;

        // Render recipe list to ensure counter is updated
        this.renderRecipeList();

        // Scroll to top
        window.scrollTo(0, 0);
    }

    /**
     * Reset form to initial state
     */
    resetForm() {
        const form = document.getElementById('recipe-form');
        if (form) {
            form.reset();
        }

        // Clear error messages
        const errorMessage = document.getElementById('name-error');
        if (errorMessage) {
            errorMessage.textContent = '';
        }

        const ingredientError = document.getElementById('ingredient-error');
        if (ingredientError) {
            ingredientError.textContent = '';
        }

        // Reset ingredients
        this.ingredients = [];
        this.editingIngredientId = null;
        this.renderIngredientsList();

        // Reset sequences
        this.sequences = [];
        this.editingSequenceId = null;
        this.renderSequencesList();

        // Reset multimedia
        this.images = [];
        this.renderImagesPreview();

        // Clear multimedia error messages
        const imageError = document.getElementById('image-error');
        if (imageError) {
            imageError.textContent = '';
        }

        // Reset kitchen appliances
        this.selectedAppliances = [];
        this.renderKitchenAppliancesChips();

        // Reset form state
        this.formInitialState = this.getFormState();
    }

    /**
     * Get current form state for change detection
     * @returns {object} Form state
     */
    getFormState() {
        return {
            name: document.getElementById('recipe-name')?.textContent.trim() || '',
            category: document.getElementById('recipe-category')?.value || '',
            preparationMethod: document.getElementById('preparation-method')?.value || ''
        };
    }

    /**
     * Check if form has unsaved changes
     * @returns {boolean} True if there are unsaved changes
     */
    hasUnsavedChanges() {
        if (!this.formInitialState) {
            return false;
        }

        const currentState = this.getFormState();
        return JSON.stringify(currentState) !== JSON.stringify(this.formInitialState);
    }

    // ===== Kitchen Appliances Management =====

    /**
     * Render kitchen appliances chips
     */
    renderKitchenAppliancesChips() {
        const container = document.getElementById('kitchen-appliances-chips');
        if (!container) return;

        container.innerHTML = '';

        KITCHEN_APPLIANCES.forEach(appliance => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'appliance-chip';
            chip.dataset.applianceId = appliance.id;
            chip.innerHTML = `<span class="chip-emoji">${appliance.emoji}</span> ${appliance.name}`;

            // Mark as selected if in selectedAppliances array
            if (this.selectedAppliances.includes(appliance.id)) {
                chip.classList.add('selected');
            }

            // Add click handler
            chip.addEventListener('click', () => {
                this.toggleAppliance(appliance.id);
            });

            container.appendChild(chip);
        });
    }

    /**
     * Toggle appliance selection
     * @param {string} applianceId - Appliance ID to toggle
     */
    toggleAppliance(applianceId) {
        const index = this.selectedAppliances.indexOf(applianceId);

        if (index > -1) {
            // Remove from selection
            this.selectedAppliances.splice(index, 1);
        } else {
            // Add to selection
            this.selectedAppliances.push(applianceId);
        }

        // Re-render chips to update visual state
        this.renderKitchenAppliancesChips();
    }

    // ===== End Kitchen Appliances Management =====

    /**
     * Validate name field with comprehensive checks
     * Requirements: 1.3
     * @returns {boolean} True if valid
     */
    validateNameField() {
        const nameInput = document.getElementById('recipe-name');

        if (!nameInput) {
            console.error('[Validation] Name input element not found');
            return false;
        }

        const name = nameInput.textContent.trim();

        // Check minimum length
        if (name.length > 0 && name.length < 3) {
            nameInput.style.borderColor = 'var(--color-danger)';
            console.warn('[Validation] Recipe name too short:', name.length);
            return false;
        }

        // Check maximum length
        if (name.length > 100) {
            nameInput.style.borderColor = 'var(--color-danger)';
            console.warn('[Validation] Recipe name too long:', name.length);
            return false;
        }

        // Check for invalid characters (optional - only allow alphanumeric, spaces, and common punctuation)
        if (name.length > 0) {
            const validNamePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s\-.,()&]+$/;
            if (!validNamePattern.test(name)) {
                nameInput.style.borderColor = 'var(--color-danger)';
                console.warn('[Validation] Recipe name contains invalid characters');
                return false;
            }
        }

        // Valid
        nameInput.style.borderColor = '';
        console.log('[Validation] Recipe name is valid:', name);
        return true;
    }

    /**
     * Generate automatic recipe name with autonumeric suffix
     * @returns {string} Auto-generated name like "GonsoReceta 1"
     */
    generateAutoRecipeName() {
        // Find existing GonsoReceta names
        const gonsoRecipes = this.recipes.filter(recipe =>
            recipe.name.startsWith('GonsoReceta ')
        );

        // Extract numbers from existing names
        const numbers = gonsoRecipes.map(recipe => {
            const match = recipe.name.match(/GonsoReceta (\d+)/);
            return match ? parseInt(match[1]) : 0;
        });

        // Find the next available number
        let nextNumber = 1;
        if (numbers.length > 0) {
            nextNumber = Math.max(...numbers) + 1;
        }

        return `GonsoReceta ${nextNumber}`;
    }

    /**
     * Handle form submission
     * Requirements: 1.1, 1.2, 1.3, 3.3, 6.3, 6.5, 9.2, 9.5
     */
    async handleFormSubmit() {
        // Check if name is empty and generate auto name if needed
        const nameInput = document.getElementById('recipe-name');
        if (nameInput && (!nameInput.textContent || nameInput.textContent.trim() === '' || nameInput.textContent === 'Nueva Receta' || nameInput.textContent === 'Editar Receta')) {
            // Generate auto name: GonsoReceta [number]
            const autoName = this.generateAutoRecipeName();
            nameInput.textContent = autoName;
            console.log(`Auto-generated recipe name: ${autoName}`);
        }

        // Validate name field (should pass now with auto-generated name)
        if (!this.validateNameField()) {
            // Scroll to name field
            document.getElementById('recipe-name')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Validate time fields - if empty, set default to 59 minutes
        const hoursInput = document.getElementById('recipe-hours');
        const minutesInput = document.getElementById('recipe-minutes');

        const hoursValue = hoursInput?.value?.trim();
        const minutesValue = minutesInput?.value?.trim();

        // Parse values (empty = 0)
        let hours = hoursValue ? parseInt(hoursValue) : 0;
        let minutes = minutesValue ? parseInt(minutesValue) : 0;

        // If both are empty/0, set default to 59 minutes
        if (hours === 0 && minutes === 0) {
            minutes = 59;
            if (minutesInput) {
                minutesInput.value = '59';
            }
            console.log('Auto-set time to 59 minutes (default)');
        }

        // Validate ranges
        if (isNaN(hours) || hours < 0 || hours > 24) {
            this.showError('Las horas deben estar entre 0 y 24');
            hoursInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (isNaN(minutes) || minutes < 0 || minutes > 59) {
            this.showError('Los minutos deben estar entre 0 y 59');
            minutesInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Get form data
        const formData = this.getFormData();

        // Validate category is selected
        const categoryInput = document.getElementById('recipe-category');
        if (!categoryInput || !categoryInput.value) {
            this.showError('Por favor, selecciona una categoría para la receta');
            const categoryChip = document.getElementById('recipe-category-chip');
            categoryChip?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Show loading state
        const saveBtn = document.getElementById('save-recipe-btn');
        const originalText = saveBtn?.textContent;
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.textContent = '💾 Guardando...';
        }

        try {
            // Save recipe and get the ID
            const savedRecipeId = await this.saveRecipe(formData);

            // Show success message
            this.showSuccess('¡Receta guardada exitosamente!');

            // Store the ID for highlighting
            this.lastSavedRecipeId = savedRecipeId;

            // Reload recipes and close form
            await this.loadRecipes();
            this.renderRecipeList();
            this.closeRecipeForm();
        } catch (error) {
            console.error('Error saving recipe:', error);
            this.showError('Error al guardar la receta: ' + error.message);
        } finally {
            // Restore button state
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.textContent = originalText;
            }
        }
    }

    /**
     * Save recipe to storage
     * Requirements: 1.2, 1.4, 3.3, 6.3, 6.5, 9.2, 9.5
     * @param {object} formData - Form data to save
     * @returns {Promise<string>} Recipe ID
     */
    async saveRecipe(formData) {
        try {
            // Capitalize first letter of recipe name
            const capitalizedName = this.capitalizeFirstLetter(formData.name.trim());

            // Create or update recipe
            let recipe;

            if (this.currentRecipeId) {
                // Editing existing recipe - load and update
                const existingRecipe = this.recipes.find(r => r.id === this.currentRecipeId);
                if (!existingRecipe) {
                    throw new Error('Receta no encontrada');
                }

                // Update recipe data
                recipe = new Recipe({
                    id: existingRecipe.id,
                    name: capitalizedName,
                    category: formData.category || null,
                    totalTime: formData.totalTime,
                    caravanFriendly: formData.caravanFriendly || false,
                    hospitalFriendly: formData.hospitalFriendly || false,
                    menuFriendly: formData.menuFriendly || false,
                    preparationMethod: formData.preparationMethod,
                    kitchenAppliances: formData.kitchenAppliances || [],
                    author: formData.author,
                    history: formData.history,
                    ingredients: formData.ingredients,
                    additionSequences: formData.additionSequences,
                    images: formData.images,
                    createdAt: existingRecipe.createdAt,
                    updatedAt: new Date()
                });
            } else {
                // Creating new recipe
                recipe = new Recipe({
                    name: capitalizedName,
                    category: formData.category || null,
                    totalTime: formData.totalTime,
                    caravanFriendly: formData.caravanFriendly || false,
                    hospitalFriendly: formData.hospitalFriendly || false,
                    menuFriendly: formData.menuFriendly || false,
                    preparationMethod: formData.preparationMethod,
                    kitchenAppliances: formData.kitchenAppliances || [],
                    author: formData.author,
                    history: formData.history,
                    ingredients: formData.ingredients,
                    additionSequences: formData.additionSequences,
                    images: formData.images,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            // Save to storage
            const recipeId = await this.storageManager.saveRecipe(recipe);

            console.log('Recipe saved successfully:', recipeId);

            return recipeId;
        } catch (error) {
            console.error('Error in saveRecipe:', error);
            throw error;
        }
    }

    /**
     * Auto-save recipe with debounce
     * Saves the recipe automatically after user stops editing
     */
    scheduleAutoSave() {
        // Only auto-save when editing an existing recipe
        if (!this.currentRecipeId) {
            return;
        }

        // Clear existing timer
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }

        // Schedule new auto-save
        this.autoSaveTimer = setTimeout(async () => {
            await this.performAutoSave();
        }, this.autoSaveDelay);
    }

    /**
     * Perform the actual auto-save operation
     */
    async performAutoSave() {
        // Only auto-save when editing
        if (!this.currentRecipeId || this.isAutoSaving) {
            return;
        }

        try {
            this.isAutoSaving = true;

            // Get form data
            const formData = this.getFormData();

            // Validate minimum requirements (at least a name)
            if (!formData.name || formData.name.trim() === '') {
                return; // Don't auto-save if no name
            }

            // Save recipe silently
            await this.saveRecipe(formData);

            // Update the recipe in memory
            await this.loadRecipes();

            // Show subtle feedback
            this.showAutoSaveIndicator();

            console.log('[AutoSave] Recipe auto-saved:', this.currentRecipeId);
        } catch (error) {
            console.error('[AutoSave] Error auto-saving recipe:', error);
            // Don't show error to user for auto-save failures
        } finally {
            this.isAutoSaving = false;
        }
    }

    /**
     * Show auto-save indicator
     */
    showAutoSaveIndicator() {
        const formTitle = document.getElementById('form-title');
        if (!formTitle) return;

        const originalText = formTitle.textContent;
        formTitle.textContent = '✓ Guardado automáticamente';
        formTitle.style.color = '#10b981';

        setTimeout(() => {
            formTitle.textContent = originalText;
            formTitle.style.color = '';
        }, 2000);
    }

    /**
     * Get form data
     * Requirements: 1.2, 3.3, 5.3, 9.2
     * @returns {object} Form data
     */
    getFormData() {
        return {
            name: document.getElementById('recipe-name')?.textContent.trim() || '',
            category: document.getElementById('recipe-category')?.value || null,
            totalTime: this.parseTimeInput('recipe'),
            caravanFriendly: document.getElementById('recipe-caravan-friendly')?.checked || false,
            hospitalFriendly: document.getElementById('recipe-hospital-friendly')?.checked || false,
            menuFriendly: document.getElementById('recipe-menu-friendly')?.checked || false,
            preparationMethod: document.getElementById('preparation-method')?.value.trim() || '',
            kitchenAppliances: this.selectedAppliances,
            author: document.getElementById('recipe-author')?.value.trim() || '',
            history: document.getElementById('recipe-history')?.value.trim() || '',
            ingredients: this.ingredients,
            additionSequences: this.sequences,
            images: this.images
        };
    }

    /**
     * Handle adding a new ingredient
     * Requirements: 2.1, 2.2, 2.3
     */
    handleAddIngredient() {
        // Get input values
        const nameInput = document.getElementById('ingredient-name');
        const quantityInput = document.getElementById('ingredient-quantity');
        const unitSelect = document.getElementById('ingredient-unit');
        const errorMessage = document.getElementById('ingredient-error');

        if (!nameInput || !quantityInput || !unitSelect || !errorMessage) {
            return;
        }

        const name = nameInput.value.trim();
        const quantity = parseFloat(quantityInput.value);
        const unit = unitSelect.value;

        // Validate ingredient data
        errorMessage.textContent = '';

        if (!name) {
            errorMessage.textContent = 'El nombre del ingrediente es obligatorio';
            nameInput.focus();
            return;
        }

        // Quantity is optional, but if provided must be valid
        if (quantityInput.value && (isNaN(quantity) || quantity <= 0)) {
            errorMessage.textContent = 'La cantidad debe ser un número mayor que 0';
            quantityInput.focus();
            return;
        }

        // Unit is now optional - can be empty

        // Create new ingredient
        const ingredient = new Ingredient({
            name: name,
            quantity: quantity || 0,
            unit: unit || '',
            order: this.ingredients.length
        });

        // Add to ingredients array
        this.ingredients.push(ingredient);

        // Clear input fields
        nameInput.value = '';
        quantityInput.value = '';
        unitSelect.value = '';
        nameInput.focus();

        // Re-render ingredients list
        this.renderIngredientsList();

        // Update sequence ingredient selector
        this.updateSequenceIngredientSelector();

        // Update ingredient buttons for autocomplete
        this.renderIngredientButtons();
    }

    /**
     * Render the ingredients list
     * Requirements: 2.2, 2.3, 2.4, 2.5
     */
    renderIngredientsList() {
        const ingredientsList = document.getElementById('ingredients-list');
        const ingredientsEmpty = document.getElementById('ingredients-empty');

        if (!ingredientsList || !ingredientsEmpty) {
            return;
        }

        // Clear list
        ingredientsList.innerHTML = '';

        // Show/hide empty state
        if (this.ingredients.length === 0) {
            ingredientsEmpty.classList.remove('hidden');
            return;
        }

        ingredientsEmpty.classList.add('hidden');

        // Render each ingredient
        this.ingredients.forEach((ingredient, index) => {
            const item = this.createIngredientItem(ingredient, index);
            ingredientsList.appendChild(item);
        });
    }

    /**
     * Create an ingredient item element
     * Requirements: 2.2, 2.3, 2.4, 2.5
     * @param {Ingredient} ingredient - Ingredient to display
     * @param {number} index - Index in the array
     * @returns {HTMLElement} Ingredient item element
     */
    createIngredientItem(ingredient, index) {
        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.dataset.ingredientId = ingredient.id;

        // Check if this ingredient is being edited
        const isEditing = this.editingIngredientId === ingredient.id;

        if (isEditing) {
            item.classList.add('editing');
        }

        // Order number
        const orderDiv = document.createElement('div');
        orderDiv.className = 'ingredient-order';
        orderDiv.textContent = (index + 1) + '.';

        if (isEditing) {
            // Edit mode
            const editForm = document.createElement('div');
            editForm.className = 'ingredient-edit-form';

            // Name input
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.className = 'form-input';
            nameInput.value = ingredient.name;
            nameInput.dataset.field = 'name';

            // Quantity input
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.className = 'form-input';
            quantityInput.value = ingredient.quantity;
            quantityInput.min = '0';
            quantityInput.step = '0.01';
            quantityInput.dataset.field = 'quantity';

            // Unit select
            const unitSelect = document.createElement('select');
            unitSelect.className = 'form-select';
            unitSelect.dataset.field = 'unit';

            const units = [
                { value: '', label: 'Seleccionar' },
                { value: 'g', label: 'g (gramos)' },
                { value: 'kg', label: 'kg (kilogramos)' },
                { value: 'ml', label: 'ml (mililitros)' },
                { value: 'l', label: 'l (litros)' },
                { value: 'taza', label: 'taza' },
                { value: 'cucharada', label: 'cucharada' },
                { value: 'cucharadita', label: 'cucharadita' },
                { value: 'pizca', label: 'pizca' },
                { value: 'unidad', label: 'unidad' },
                { value: 'al gusto', label: 'al gusto' }
            ];

            units.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit.value;
                option.textContent = unit.label;
                if (unit.value === ingredient.unit) {
                    option.selected = true;
                }
                unitSelect.appendChild(option);
            });

            editForm.appendChild(nameInput);
            editForm.appendChild(quantityInput);
            editForm.appendChild(unitSelect);

            // Actions
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'ingredient-actions';

            // Save button
            const saveBtn = document.createElement('button');
            saveBtn.type = 'button';
            saveBtn.className = 'btn-ingredient-action btn-save';
            saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            saveBtn.title = 'Guardar';
            saveBtn.addEventListener('click', () => {
                this.handleSaveIngredient(ingredient.id, {
                    name: nameInput.value.trim(),
                    quantity: parseFloat(quantityInput.value),
                    unit: unitSelect.value
                });
            });

            // Cancel button
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'btn-ingredient-action btn-cancel';
            cancelBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            cancelBtn.title = 'Cancelar';
            cancelBtn.addEventListener('click', () => {
                this.handleCancelEditIngredient();
            });

            actionsDiv.appendChild(saveBtn);
            actionsDiv.appendChild(cancelBtn);

            item.appendChild(orderDiv);
            item.appendChild(editForm);
            item.appendChild(actionsDiv);
        } else {
            // View mode
            const infoDiv = document.createElement('div');
            infoDiv.className = 'ingredient-info';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'ingredient-name';
            nameDiv.textContent = ingredient.name;

            // Actions
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'ingredient-actions';

            // Move up button
            const upBtn = document.createElement('button');
            upBtn.type = 'button';
            upBtn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--move';
            upBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
            upBtn.title = 'Mover arriba';
            upBtn.setAttribute('aria-label', 'Mover ingrediente arriba');
            upBtn.disabled = index === 0;
            upBtn.addEventListener('click', () => {
                this.handleMoveIngredient(index, 'up');
            });

            // Move down button
            const downBtn = document.createElement('button');
            downBtn.type = 'button';
            downBtn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--move';
            downBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
            downBtn.title = 'Mover abajo';
            downBtn.setAttribute('aria-label', 'Mover ingrediente abajo');
            downBtn.disabled = index === this.ingredients.length - 1;
            downBtn.addEventListener('click', () => {
                this.handleMoveIngredient(index, 'down');
            });

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--edit';
            editBtn.textContent = '✎';
            editBtn.title = 'Editar';
            editBtn.setAttribute('aria-label', 'Editar ingrediente');
            editBtn.addEventListener('click', () => {
                this.handleEditIngredient(ingredient.id);
            });

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--delete';
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.title = 'Eliminar';
            deleteBtn.setAttribute('aria-label', 'Eliminar ingrediente');
            deleteBtn.addEventListener('click', () => {
                this.handleDeleteIngredient(ingredient.id);
            });

            actionsDiv.appendChild(upBtn);
            actionsDiv.appendChild(downBtn);
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);

            const quantityDiv = document.createElement('div');
            quantityDiv.className = 'ingredient-quantity';

            // Format quantity display: don't show 0, use dash for empty required fields
            let quantityText = '';
            if (ingredient.quantity && ingredient.quantity > 0) {
                quantityText = ingredient.quantity.toString();
                if (ingredient.unit) {
                    quantityText += ` ${ingredient.unit}`;
                }
            } else if (ingredient.unit) {
                // Only unit, no quantity
                quantityText = ingredient.unit;
            } else {
                // No quantity and no unit - show dash
                quantityText = '-';
            }

            quantityDiv.textContent = quantityText;

            // Create separator
            const separator = document.createElement('span');
            separator.className = 'ingredient-separator';
            separator.textContent = '|';

            infoDiv.appendChild(nameDiv);
            infoDiv.appendChild(separator);
            infoDiv.appendChild(quantityDiv);
            infoDiv.appendChild(actionsDiv);

            item.appendChild(orderDiv);
            item.appendChild(infoDiv);
        }

        return item;
    }

    /**
     * Handle editing an ingredient
     * Requirements: 2.5
     * @param {string} ingredientId - Ingredient ID to edit
     */
    handleEditIngredient(ingredientId) {
        this.editingIngredientId = ingredientId;
        this.renderIngredientsList();
    }

    /**
     * Handle saving an edited ingredient
     * Requirements: 2.5
     * @param {string} ingredientId - Ingredient ID to save
     * @param {object} data - Updated ingredient data
     */
    handleSaveIngredient(ingredientId, data) {
        // Validate data
        if (!data.name || !data.name.trim()) {
            alert('El nombre del ingrediente es obligatorio');
            return;
        }

        // Quantity is optional, but if provided must be valid
        if (data.quantity && data.quantity <= 0) {
            alert('La cantidad debe ser un número mayor que 0');
            return;
        }

        // Unit is now optional - can be empty

        // Find and update ingredient
        const ingredient = this.ingredients.find(ing => ing.id === ingredientId);
        if (ingredient) {
            ingredient.name = data.name.trim();
            ingredient.quantity = data.quantity || 0;
            ingredient.unit = data.unit || '';
        }

        // Exit edit mode
        this.editingIngredientId = null;
        this.renderIngredientsList();

        // Update sequence ingredient selector (for adding new sequences)
        this.updateSequenceIngredientSelector();

        // Update sequences that reference this ingredient
        // This ensures the ingredient name is updated in sequence chips immediately
        this.renderSequencesList();
    }

    /**
     * Handle canceling ingredient edit
     * Requirements: 2.5
     */
    handleCancelEditIngredient() {
        this.editingIngredientId = null;
        this.renderIngredientsList();
    }

    /**
     * Handle deleting an ingredient
     * Requirements: 2.4
     * @param {string} ingredientId - Ingredient ID to delete
     */
    handleDeleteIngredient(ingredientId) {
        if (!confirm('¿Estás seguro de que quieres eliminar este ingrediente?')) {
            return;
        }

        // Remove ingredient from array
        this.ingredients = this.ingredients.filter(ing => ing.id !== ingredientId);

        // Update order numbers
        this.ingredients.forEach((ing, index) => {
            ing.order = index;
        });

        // Remove ingredient from all sequences
        this.sequences.forEach(sequence => {
            sequence.ingredientIds = sequence.ingredientIds.filter(id => id !== ingredientId);
        });

        // Re-render lists
        this.renderIngredientsList();
        this.renderSequencesList();

        // Update ingredient buttons for autocomplete
        this.renderIngredientButtons();
    }

    /**
     * Handle moving an ingredient up or down
     * Requirements: 2.3
     * @param {number} index - Current index of ingredient
     * @param {string} direction - 'up' or 'down'
     */
    handleMoveIngredient(index, direction) {
        if (direction === 'up' && index > 0) {
            // Swap with previous ingredient
            [this.ingredients[index], this.ingredients[index - 1]] =
                [this.ingredients[index - 1], this.ingredients[index]];
        } else if (direction === 'down' && index < this.ingredients.length - 1) {
            // Swap with next ingredient
            [this.ingredients[index], this.ingredients[index + 1]] =
                [this.ingredients[index + 1], this.ingredients[index]];
        }

        // Update order numbers
        this.ingredients.forEach((ing, idx) => {
            ing.order = idx;
        });

        // Re-render list
        this.renderIngredientsList();

        // Update sequence ingredient selector
        this.updateSequenceIngredientSelector();

        // Re-render sequences to show updated ingredient numbers
        this.renderSequencesList();
    }

    /**
     * Update the sequence ingredient selector with current ingredients
     * Requirements: 4.1
     */
    updateSequenceIngredientSelector() {
        const chipsContainer = document.getElementById('sequence-ingredients-chips');
        if (!chipsContainer) {
            return;
        }

        // Clear current chips
        chipsContainer.innerHTML = '';

        // If no ingredients, show message
        if (this.ingredients.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'sequence-ingredients-chips-empty';
            emptyMessage.textContent = 'No hay ingredientes (opcional)';
            chipsContainer.appendChild(emptyMessage);
            return;
        }

        // Add chip for each ingredient
        this.ingredients.forEach((ingredient, index) => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'sequence-ingredient-chip';
            chip.dataset.ingredientId = ingredient.id;

            const quantityText = ingredient.quantity > 0
                ? `${ingredient.quantity} ${ingredient.unit}`
                : ingredient.unit;
            chip.textContent = `${ingredient.name}${quantityText ? ` (${quantityText})` : ''}`;

            // Toggle selection on click
            chip.addEventListener('click', () => {
                chip.classList.toggle('selected');
            });

            chipsContainer.appendChild(chip);
        });
    }

    /**
     * Handle adding a new sequence
     * Requirements: 4.1, 4.2
     */
    handleAddSequence() {
        const chipsContainer = document.getElementById('sequence-ingredients-chips');
        const descriptionTextarea = document.getElementById('sequence-description');
        const errorMessage = document.getElementById('sequence-error');

        if (!chipsContainer || !descriptionTextarea || !errorMessage) {
            return;
        }

        // Get selected ingredient IDs from chips
        const selectedChips = chipsContainer.querySelectorAll('.sequence-ingredient-chip.selected');
        const ingredientIds = Array.from(selectedChips).map(chip => chip.dataset.ingredientId);
        const duration = this.parseTimeInput('sequence');
        const description = descriptionTextarea.value.trim();

        // Validate
        errorMessage.textContent = '';

        // Note: Ingredients are now optional for sequences
        // Users can add sequences without selecting ingredients

        // Create new sequence
        const sequence = new Sequence({
            step: this.sequences.length + 1,
            ingredientIds: ingredientIds,
            description: description,
            duration: duration
        });

        // Add to sequences array
        this.sequences.push(sequence);

        // Clear inputs - deselect all chips
        selectedChips.forEach(chip => chip.classList.remove('selected'));
        this.populateTimeInput('sequence', '');
        descriptionTextarea.value = '';

        // Clear used cooking actions
        this.updateUsedCookingActions();

        // Re-render sequences list
        this.renderSequencesList();
    }

    /**
     * Render the sequences list
     * Requirements: 4.2, 4.3, 4.4, 4.5
     */
    renderSequencesList() {
        const sequencesList = document.getElementById('sequences-list');
        const sequencesEmpty = document.getElementById('sequences-empty');

        if (!sequencesList || !sequencesEmpty) {
            return;
        }

        // Clear list
        sequencesList.innerHTML = '';

        // Show/hide empty state
        if (this.sequences.length === 0) {
            sequencesEmpty.classList.remove('hidden');
            return;
        }

        sequencesEmpty.classList.add('hidden');

        // Render each sequence
        this.sequences.forEach((sequence, index) => {
            const item = this.createSequenceItem(sequence, index);
            sequencesList.appendChild(item);
        });
    }

    /**
     * Create a sequence item element
     * Requirements: 4.2, 4.3, 4.4, 4.5
     * @param {Sequence} sequence - Sequence to display
     * @param {number} index - Index in the array
     * @returns {HTMLElement} Sequence item element
     */
    createSequenceItem(sequence, index) {
        const item = document.createElement('div');
        item.className = 'sequence-item';
        item.dataset.sequenceId = sequence.id;

        const isEditing = this.editingSequenceId === sequence.id;

        if (isEditing) {
            item.classList.add('editing');
        }

        // Step number
        const stepDiv = document.createElement('div');
        stepDiv.className = 'sequence-step';
        stepDiv.textContent = (index + 1);

        if (isEditing) {
            // Edit mode
            const editForm = document.createElement('div');
            editForm.className = 'sequence-edit-form';

            // Ingredients chips selector
            const ingredientsChipsContainer = document.createElement('div');
            ingredientsChipsContainer.className = 'sequence-ingredients-chips-edit';
            ingredientsChipsContainer.id = `edit-chips-${sequence.id}`;

            this.ingredients.forEach((ingredient, idx) => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'sequence-ingredient-chip';
                chip.dataset.ingredientId = ingredient.id;
                chip.textContent = `${idx + 1}. ${ingredient.name}`;

                // Mark as selected if ingredient is in sequence
                if (sequence.ingredientIds.includes(ingredient.id)) {
                    chip.classList.add('selected');
                }

                // Toggle selection on click
                chip.addEventListener('click', () => {
                    chip.classList.toggle('selected');
                });

                ingredientsChipsContainer.appendChild(chip);
            });

            // Duration inputs (hours and minutes)
            const durationContainer = document.createElement('div');
            durationContainer.className = 'time-input-group';

            const hoursContainer = document.createElement('div');
            hoursContainer.className = 'time-input-item';
            const hoursLabel = document.createElement('span');
            hoursLabel.className = 'time-label';
            hoursLabel.textContent = 'Horas';
            const hoursInput = document.createElement('input');
            hoursInput.type = 'number';
            hoursInput.className = 'form-input time-input';
            hoursInput.id = `edit-sequence-hours-${sequence.id}`;
            hoursInput.placeholder = '0';
            hoursInput.min = '0';
            hoursInput.max = '24';
            hoursContainer.appendChild(hoursLabel);
            hoursContainer.appendChild(hoursInput);

            const minutesContainer = document.createElement('div');
            minutesContainer.className = 'time-input-item';
            const minutesLabel = document.createElement('span');
            minutesLabel.className = 'time-label';
            minutesLabel.textContent = 'Minutos';
            const minutesInput = document.createElement('input');
            minutesInput.type = 'number';
            minutesInput.className = 'form-input time-input';
            minutesInput.id = `edit-sequence-minutes-${sequence.id}`;
            minutesInput.placeholder = '0';
            minutesInput.min = '0';
            minutesInput.max = '60';
            minutesContainer.appendChild(minutesLabel);
            minutesContainer.appendChild(minutesInput);

            durationContainer.appendChild(hoursContainer);
            durationContainer.appendChild(minutesContainer);

            // Populate time values
            if (sequence.duration && sequence.duration.trim() !== '') {
                const hoursMatch = sequence.duration.match(/(\d+)\s*h/);
                const minutesMatch = sequence.duration.match(/(\d+)\s*min/);
                if (hoursMatch) hoursInput.value = hoursMatch[1];
                if (minutesMatch) minutesInput.value = minutesMatch[1];
            }

            // Add validation listeners for edit mode time inputs
            hoursInput.addEventListener('input', () => {
                this.validateTimeField(hoursInput, 0, 24);
            });
            hoursInput.addEventListener('blur', () => {
                this.validateTimeField(hoursInput, 0, 24);
            });

            minutesInput.addEventListener('input', () => {
                this.validateTimeField(minutesInput, 0, 60);
            });
            minutesInput.addEventListener('blur', () => {
                this.validateTimeField(minutesInput, 0, 60);
            });

            // Description textarea
            const descriptionTextarea = document.createElement('textarea');
            descriptionTextarea.className = 'form-textarea';
            descriptionTextarea.value = sequence.description || '';
            descriptionTextarea.rows = 3;
            descriptionTextarea.placeholder = 'Descripción de la secuencia...';

            editForm.appendChild(ingredientsChipsContainer);
            editForm.appendChild(durationContainer);
            editForm.appendChild(descriptionTextarea);

            // Actions
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'sequence-actions';

            // Save button
            const saveBtn = document.createElement('button');
            saveBtn.type = 'button';
            saveBtn.className = 'btn-sequence-action btn-save';
            saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            saveBtn.title = 'Guardar';
            saveBtn.addEventListener('click', () => {
                // Get selected ingredient IDs from chips
                const selectedChips = ingredientsChipsContainer.querySelectorAll('.sequence-ingredient-chip.selected');
                const ingredientIds = Array.from(selectedChips).map(chip => chip.dataset.ingredientId);

                // Parse time from edit fields
                const hours = parseInt(hoursInput.value) || 0;
                const minutes = parseInt(minutesInput.value) || 0;
                let duration = '';
                if (hours > 0 && minutes > 0) {
                    duration = `${hours}h ${minutes}min`;
                } else if (hours > 0) {
                    duration = `${hours}h`;
                } else if (minutes > 0) {
                    duration = `${minutes}min`;
                }

                this.handleSaveSequence(sequence.id, {
                    ingredientIds: ingredientIds,
                    duration: duration,
                    description: descriptionTextarea.value.trim()
                });
            });

            // Cancel button
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'btn-sequence-action btn-cancel';
            cancelBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            cancelBtn.title = 'Cancelar';
            cancelBtn.addEventListener('click', () => {
                this.handleCancelEditSequence();
            });

            actionsDiv.appendChild(saveBtn);
            actionsDiv.appendChild(cancelBtn);

            item.appendChild(stepDiv);
            item.appendChild(editForm);
            item.appendChild(actionsDiv);
        } else {
            // View mode
            const contentDiv = document.createElement('div');
            contentDiv.className = 'sequence-content';

            // Ingredients tags
            const ingredientsDiv = document.createElement('div');
            ingredientsDiv.className = 'sequence-ingredients';

            sequence.ingredientIds.forEach(ingredientId => {
                const ingredient = this.ingredients.find(ing => ing.id === ingredientId);
                if (ingredient) {
                    const tag = document.createElement('span');
                    tag.className = 'sequence-ingredient-tag';
                    tag.textContent = ingredient.name;
                    ingredientsDiv.appendChild(tag);
                }
            });

            contentDiv.appendChild(ingredientsDiv);

            // Description
            if (sequence.description) {
                const descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'sequence-description';
                descriptionDiv.textContent = sequence.description;
                contentDiv.appendChild(descriptionDiv);
            }

            // Duration
            if (sequence.duration) {
                const durationDiv = document.createElement('div');
                durationDiv.className = 'sequence-duration';
                const formattedDuration = this.formatTimeForDisplay(sequence.duration);
                durationDiv.textContent = `⏱️ ${formattedDuration}`;
                contentDiv.appendChild(durationDiv);
            }

            // Actions
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'sequence-actions';

            // Only show move buttons if there are multiple sequences
            if (this.sequences.length > 1) {
                // Move up button
                const upBtn = document.createElement('button');
                upBtn.type = 'button';
                upBtn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--move';
                upBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
                upBtn.title = 'Mover arriba';
                upBtn.setAttribute('aria-label', 'Mover secuencia arriba');
                upBtn.disabled = index === 0;
                upBtn.addEventListener('click', () => {
                    this.handleMoveSequence(index, 'up');
                });

                // Move down button
                const downBtn = document.createElement('button');
                downBtn.type = 'button';
                downBtn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--move';
                downBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
                downBtn.title = 'Mover abajo';
                downBtn.setAttribute('aria-label', 'Mover secuencia abajo');
                downBtn.disabled = index === this.sequences.length - 1;
                downBtn.addEventListener('click', () => {
                    this.handleMoveSequence(index, 'down');
                });

                actionsDiv.appendChild(upBtn);
                actionsDiv.appendChild(downBtn);
            }

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--edit';
            editBtn.textContent = '✎';
            editBtn.title = 'Editar';
            editBtn.setAttribute('aria-label', 'Editar secuencia');
            editBtn.addEventListener('click', () => {
                this.handleEditSequence(sequence.id);
            });

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--delete';
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.title = 'Eliminar';
            deleteBtn.setAttribute('aria-label', 'Eliminar secuencia');
            deleteBtn.addEventListener('click', () => {
                this.handleDeleteSequence(sequence.id);
            });

            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);

            item.appendChild(stepDiv);
            item.appendChild(contentDiv);
            item.appendChild(actionsDiv);
        }

        return item;
    }

    /**
     * Populate sequence form fields for editing
     * @param {Sequence} sequence - Sequence to edit
     */
    populateSequenceForEdit(sequence) {
        // Populate ingredient chips
        const chipsContainer = document.getElementById('sequence-ingredients-chips');
        if (chipsContainer) {
            const chips = chipsContainer.querySelectorAll('.sequence-ingredient-chip');
            chips.forEach(chip => {
                if (sequence.ingredientIds.includes(chip.dataset.ingredientId)) {
                    chip.classList.add('selected');
                } else {
                    chip.classList.remove('selected');
                }
            });
        }

        // Populate time using unified function
        this.populateTimeInput('sequence', sequence.duration || '');

        // Populate description
        const descriptionTextarea = document.getElementById('sequence-description');
        if (descriptionTextarea) {
            descriptionTextarea.value = sequence.description || '';
        }
    }

    /**
     * Handle editing a sequence
     * Requirements: 4.5
     * @param {string} sequenceId - Sequence ID to edit
     */
    handleEditSequence(sequenceId) {
        this.editingSequenceId = sequenceId;
        this.renderSequencesList();
    }

    /**
     * Handle saving an edited sequence
     * Requirements: 4.5
     * @param {string} sequenceId - Sequence ID to save
     * @param {object} data - Updated sequence data
     */
    handleSaveSequence(sequenceId, data) {
        // Validate
        if (!data.ingredientIds || data.ingredientIds.length === 0) {
            alert('Debes seleccionar al menos un ingrediente');
            return;
        }

        // Find and update sequence
        const sequence = this.sequences.find(seq => seq.id === sequenceId);
        if (sequence) {
            sequence.ingredientIds = data.ingredientIds;
            sequence.duration = data.duration || '';
            sequence.description = data.description;
        }

        // Exit edit mode
        this.editingSequenceId = null;
        this.renderSequencesList();
    }

    /**
     * Handle canceling sequence edit
     * Requirements: 4.5
     */
    handleCancelEditSequence() {
        this.editingSequenceId = null;
        this.renderSequencesList();
    }

    /**
     * Handle deleting a sequence
     * Requirements: 4.4
     * @param {string} sequenceId - Sequence ID to delete
     */
    handleDeleteSequence(sequenceId) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta secuencia?')) {
            return;
        }

        // Remove sequence from array
        this.sequences = this.sequences.filter(seq => seq.id !== sequenceId);

        // Update step numbers
        this.sequences.forEach((seq, index) => {
            seq.step = index + 1;
        });

        // Re-render list
        this.renderSequencesList();
    }

    /**
     * Handle moving a sequence up or down
     * Requirements: 4.3
     * @param {number} index - Current index of sequence
     * @param {string} direction - 'up' or 'down'
     */
    handleMoveSequence(index, direction) {
        if (direction === 'up' && index > 0) {
            // Swap with previous sequence
            [this.sequences[index], this.sequences[index - 1]] =
                [this.sequences[index - 1], this.sequences[index]];
        } else if (direction === 'down' && index < this.sequences.length - 1) {
            // Swap with next sequence
            [this.sequences[index], this.sequences[index + 1]] =
                [this.sequences[index + 1], this.sequences[index]];
        }

        // Update step numbers
        this.sequences.forEach((seq, idx) => {
            seq.step = idx + 1;
        });

        // Re-render list
        this.renderSequencesList();
    }

    /**
     * Load recipe data into form for editing
     * Requirements: 6.1
     * @param {string} recipeId - Recipe ID to load
     */
    async loadRecipeIntoForm(recipeId) {
        try {
            const recipe = this.recipes.find(r => r.id === recipeId);

            if (!recipe) {
                throw new Error('Receta no encontrada');
            }

            // Populate form fields
            const nameInput = document.getElementById('recipe-name');
            if (nameInput) {
                nameInput.textContent = recipe.name || 'Editar Receta';

                // Focus on name input and position cursor at the end
                setTimeout(() => {
                    nameInput.focus();
                    // Move cursor to the end of the text
                    const range = document.createRange();
                    const selection = window.getSelection();
                    range.selectNodeContents(nameInput);
                    range.collapse(false); // false = collapse to end
                    selection.removeAllRanges();
                    selection.addRange(range);
                }, 100);
            }

            const categoryInput = document.getElementById('recipe-category');
            if (categoryInput) {
                categoryInput.value = recipe.category || '';
            }

            // Update category display
            this.updateCategoryDisplay();

            // Populate time using unified function
            this.populateTimeInput('recipe', recipe.totalTime || '');

            // Populate caravan friendly checkbox and badge
            const caravanCheckbox = document.getElementById('recipe-caravan-friendly');
            if (caravanCheckbox) {
                caravanCheckbox.checked = recipe.caravanFriendly || false;
                const caravanContainer = document.querySelector('[data-checkbox="recipe-caravan-friendly"]');
                if (caravanContainer) {
                    if (caravanCheckbox.checked) {
                        caravanContainer.classList.add('active');
                    } else {
                        caravanContainer.classList.remove('active');
                    }
                }
            }

            // Populate hospital friendly checkbox and badge
            const hospitalCheckbox = document.getElementById('recipe-hospital-friendly');
            if (hospitalCheckbox) {
                hospitalCheckbox.checked = recipe.hospitalFriendly || false;
                const hospitalContainer = document.querySelector('[data-checkbox="recipe-hospital-friendly"]');
                if (hospitalContainer) {
                    if (hospitalCheckbox.checked) {
                        hospitalContainer.classList.add('active');
                    } else {
                        hospitalContainer.classList.remove('active');
                    }
                }
            }

            // Populate menu friendly checkbox and badge
            const menuCheckbox = document.getElementById('recipe-menu-friendly');
            if (menuCheckbox) {
                menuCheckbox.checked = recipe.menuFriendly || false;
                const menuContainer = document.querySelector('[data-checkbox="recipe-menu-friendly"]');
                if (menuContainer) {
                    if (menuCheckbox.checked) {
                        menuContainer.classList.add('active');
                    } else {
                        menuContainer.classList.remove('active');
                    }
                }
            }

            const methodTextarea = document.getElementById('preparation-method');
            if (methodTextarea) {
                methodTextarea.value = recipe.preparationMethod || '';
            }

            const authorInput = document.getElementById('recipe-author');
            if (authorInput) {
                authorInput.value = recipe.author || '';
            }

            const historyTextarea = document.getElementById('recipe-history');
            if (historyTextarea) {
                historyTextarea.value = recipe.history || '';
            }

            // Load ingredients
            this.ingredients = recipe.ingredients ? [...recipe.ingredients] : [];
            this.renderIngredientsList();

            // Load sequences
            this.sequences = recipe.additionSequences ? [...recipe.additionSequences] : [];
            this.updateSequenceIngredientSelector();
            this.renderSequencesList();

            // Load multimedia
            this.images = recipe.images ? [...recipe.images] : [];
            this.renderImagesPreview();

            // Load kitchen appliances
            this.selectedAppliances = recipe.kitchenAppliances ? [...recipe.kitchenAppliances] : [];
            this.renderKitchenAppliancesChips();

            // Store initial state
            this.formInitialState = this.getFormState();

        } catch (error) {
            console.error('Error loading recipe:', error);
            this.showError('Error al cargar la receta: ' + error.message);
            this.closeRecipeForm();
        }
    }

    /**
     * Handle image upload with enhanced error handling
     * Requirements: 5.1, 5.2, 5.3, 5.4, 1.3
     * @param {FileList} files - Files to upload
     */
    async handleImageUpload(files) {
        const errorMessage = document.getElementById('image-error');
        if (errorMessage) {
            errorMessage.textContent = '';
        }

        if (!files || files.length === 0) {
            console.warn('[Upload] No files selected for image upload');
            return;
        }

        console.log('[Upload] Iniciando carga de', files.length, 'imagen(es)');

        // Show loading state
        const uploadBtn = document.getElementById('upload-image-btn');
        const originalText = uploadBtn?.textContent;
        if (uploadBtn) {
            uploadBtn.disabled = true;
            uploadBtn.textContent = '⏳ Procesando...';
        }

        let successCount = 0;
        let errorCount = 0;
        const errors = [];

        try {
            for (const file of files) {
                try {
                    console.log('[Upload] Procesando imagen:', file.name);

                    // Validate file
                    this.validateImageFile(file);

                    // Convert to Base64 with compression
                    const mediaFile = await this.processImageFile(file);

                    // Add to images array
                    this.images.push(mediaFile);
                    successCount++;

                    console.log('[Upload] Imagen procesada exitosamente:', file.name);
                } catch (error) {
                    errorCount++;
                    console.error('[Upload] Error procesando imagen:', file.name, error);
                    errors.push(`${file.name}: ${error.message}`);

                    if (errorMessage) {
                        errorMessage.textContent = `Error con ${file.name}: ${error.message}`;
                    }
                }
            }

            // Clear file input
            const imageUploadInput = document.getElementById('image-upload');
            if (imageUploadInput) {
                imageUploadInput.value = '';
            }

            // Re-render images preview
            this.renderImagesPreview();

            // Show summary message
            if (successCount > 0 && errorCount === 0) {
                this.showSuccess(`${successCount} imagen(es) cargada(s) exitosamente`);
            } else if (successCount > 0 && errorCount > 0) {
                this.showWarning(`${successCount} imagen(es) cargada(s), ${errorCount} con errores`);
            } else if (errorCount > 0) {
                this.showError(`Error al cargar todas las imágenes`);
            }

        } catch (error) {
            console.error('[Upload] Error general al cargar imágenes:', error);
            this.showError('Error al cargar imágenes: ' + error.message);
            if (errorMessage) {
                errorMessage.textContent = 'Error al cargar imágenes: ' + error.message;
            }
        } finally {
            // Restore button state
            if (uploadBtn) {
                uploadBtn.disabled = false;
                uploadBtn.textContent = originalText;
            }
        }
    }

    /**
     * Validate image file with comprehensive checks
     * Requirements: 5.2, 1.3
     * @param {File} file - File to validate
     * @throws {MediaError} If validation fails
     */
    validateImageFile(file) {
        console.log('[Validation] Validando imagen:', file.name, 'Tipo:', file.type, 'Tamaño:', file.size);

        // Check if file exists
        if (!file) {
            console.error('[Validation] No file provided');
            throw new MediaError(
                'No se proporcionó ningún archivo',
                MediaError.INVALID_FORMAT
            );
        }

        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!validTypes.includes(file.type.toLowerCase())) {
            console.warn('[Validation] Invalid image format:', file.type);
            throw new MediaError(
                `Formato no soportado: ${file.type}. Use JPEG, PNG o WebP`,
                MediaError.INVALID_FORMAT
            );
        }

        // Check file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            console.warn('[Validation] Image too large:', sizeMB, 'MB');
            throw new MediaError(
                `La imagen es demasiado grande (${sizeMB}MB). Máximo 10MB`,
                MediaError.FILE_TOO_LARGE
            );
        }

        // Check minimum size (avoid empty files)
        if (file.size < 100) {
            console.warn('[Validation] Image too small:', file.size, 'bytes');
            throw new MediaError(
                'El archivo parece estar vacío o corrupto',
                MediaError.INVALID_FORMAT
            );
        }

        console.log('[Validation] Imagen válida:', file.name);
    }

    /**
     * Process image file - convert to Base64 with compression
     * Requirements: 5.3, 5.4
     * @param {File} file - File to process
     * @returns {Promise<MediaFile>} Processed media file
     */
    async processImageFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const img = new Image();

                    img.onload = () => {
                        try {
                            console.log('[Processing] Comprimiendo imagen:', img.width, 'x', img.height);

                            // Create canvas for compression
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');

                            if (!ctx) {
                                throw new Error('No se pudo crear el contexto del canvas');
                            }

                            // Calculate new dimensions (max 1920px)
                            let width = img.width;
                            let height = img.height;
                            const maxDimension = 1920;

                            if (width > maxDimension || height > maxDimension) {
                                if (width > height) {
                                    height = (height / width) * maxDimension;
                                    width = maxDimension;
                                } else {
                                    width = (width / height) * maxDimension;
                                    height = maxDimension;
                                }
                                console.log('[Processing] Redimensionando a:', Math.round(width), 'x', Math.round(height));
                            }

                            canvas.width = width;
                            canvas.height = height;

                            // Draw and compress
                            ctx.drawImage(img, 0, 0, width, height);

                            // Convert to Base64 with 80% quality
                            const compressedData = canvas.toDataURL('image/jpeg', 0.8);

                            console.log('[Processing] Imagen comprimida. Tamaño original:', file.size, 'Tamaño comprimido:', compressedData.length);

                            // Create MediaFile
                            const mediaFile = new MediaFile({
                                name: file.name,
                                type: 'image/jpeg',
                                data: compressedData,
                                size: compressedData.length
                            });

                            resolve(mediaFile);
                        } catch (error) {
                            reject(new MediaError(
                                'Error al comprimir imagen: ' + error.message,
                                MediaError.COMPRESSION_FAILED
                            ));
                        }
                    };

                    img.onerror = () => {
                        reject(new MediaError(
                            'Error al cargar imagen',
                            MediaError.UPLOAD_FAILED
                        ));
                    };

                    img.src = e.target.result;
                } catch (error) {
                    reject(new MediaError(
                        'Error al procesar imagen: ' + error.message,
                        MediaError.UPLOAD_FAILED
                    ));
                }
            };

            reader.onerror = () => {
                reject(new MediaError(
                    'Error al leer archivo',
                    MediaError.UPLOAD_FAILED
                ));
            };

            reader.readAsDataURL(file);
        });
    }

    /**
     * Render images preview
     * Requirements: 5.5
     */
    renderImagesPreview() {
        const imagesPreview = document.getElementById('images-preview');
        const imagesEmpty = document.getElementById('images-empty');

        if (!imagesPreview || !imagesEmpty) {
            return;
        }

        // Clear preview
        imagesPreview.innerHTML = '';

        // Show/hide empty state
        if (this.images.length === 0) {
            imagesEmpty.classList.remove('hidden');
            imagesPreview.style.display = 'none';
            return;
        }

        imagesEmpty.classList.add('hidden');
        imagesPreview.style.display = 'grid';

        // Render each image
        this.images.forEach((image, index) => {
            const previewItem = this.createMediaPreviewItem(image, index, 'image');
            imagesPreview.appendChild(previewItem);
        });
    }

    /**
     * Create media preview item
     * Requirements: 5.5
     * @param {MediaFile} mediaFile - Media file to preview
     * @param {number} index - Index in array
     * @param {string} type - 'image'
     * @returns {HTMLElement} Preview item element
     */
    createMediaPreviewItem(mediaFile, index, type) {
        const item = document.createElement('div');
        item.className = 'media-preview-item';
        item.dataset.mediaId = mediaFile.id;

        // Preview container
        const previewContainer = document.createElement('div');
        previewContainer.className = 'media-preview-container';

        const img = document.createElement('img');
        img.src = mediaFile.data;
        img.alt = mediaFile.name;
        img.className = 'media-preview-image';
        previewContainer.appendChild(img);

        // Action buttons overlay
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'media-actions';

        // Only show move buttons if there are multiple images
        const hasMultipleImages = this.images.length > 1;

        if (hasMultipleImages) {
            const moveUpBtn = document.createElement('button');
            moveUpBtn.type = 'button';
            moveUpBtn.className = 'media-move-btn media-move-up';
            moveUpBtn.textContent = '▲';
            moveUpBtn.title = 'Mover arriba';
            moveUpBtn.addEventListener('click', () => {
                this.handleMoveMedia(mediaFile.id, type, 'up');
            });

            const moveDownBtn = document.createElement('button');
            moveDownBtn.type = 'button';
            moveDownBtn.className = 'media-move-btn media-move-down';
            moveDownBtn.textContent = '▼';
            moveDownBtn.title = 'Mover abajo';
            moveDownBtn.addEventListener('click', () => {
                this.handleMoveMedia(mediaFile.id, type, 'down');
            });

            actionsDiv.appendChild(moveUpBtn);
            actionsDiv.appendChild(moveDownBtn);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'media-delete-btn modal-trigger modal-trigger--icon modal-trigger--delete';
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.title = 'Eliminar';
        deleteBtn.setAttribute('aria-label', 'Eliminar multimedia');
        deleteBtn.addEventListener('click', () => {
            this.handleDeleteMedia(mediaFile.id, type);
        });

        actionsDiv.appendChild(deleteBtn);

        // File info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'media-info';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'media-name';
        nameSpan.textContent = mediaFile.name;
        nameSpan.title = mediaFile.name;

        const sizeSpan = document.createElement('span');
        sizeSpan.className = 'media-size';
        sizeSpan.textContent = this.formatFileSize(mediaFile.size);

        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(sizeSpan);

        item.appendChild(previewContainer);
        item.appendChild(actionsDiv);
        item.appendChild(infoDiv);

        return item;
    }

    /**
     * Handle deleting a media file
     * Requirements: 5.5
     * @param {string} mediaId - Media file ID to delete
     * @param {string} type - 'image'
     */
    handleDeleteMedia(mediaId, type) {
        if (!confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
            return;
        }

        this.images = this.images.filter(img => img.id !== mediaId);
        this.renderImagesPreview();
    }

    /**
     * Handle moving a media file up or down
     * @param {string} mediaId - Media file ID to move
     * @param {string} type - 'image'
     * @param {string} direction - 'up' or 'down'
     */
    handleMoveMedia(mediaId, type, direction) {
        const currentIndex = this.images.findIndex(img => img.id === mediaId);

        if (currentIndex === -1) return;

        // Calculate new index
        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        // Check bounds
        if (newIndex < 0 || newIndex >= this.images.length) return;

        // Swap elements
        const temp = this.images[currentIndex];
        this.images[currentIndex] = this.images[newIndex];
        this.images[newIndex] = temp;

        // Re-render
        this.renderImagesPreview();
    }

    /**
     * Format file size for display
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted size
     */
    formatFileSize(bytes) {
        if (bytes < 1024) {
            return bytes + ' B';
        } else if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(1) + ' KB';
        } else {
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        }
    }

    /**
     * Show recipe detail view
     * Requirements: 3.4, 4.4, 5.5, 6.1, 9.4
     * @param {string} recipeId - Recipe ID to display
     */
    showRecipeDetail(recipeId) {
        // Find recipe
        const recipe = this.recipes.find(r => r.id === recipeId);

        if (!recipe) {
            this.showError('Receta no encontrada');
            return;
        }

        // Menu remains visible in detail view

        // Hide list and form views
        const listView = document.getElementById('recipe-list-view');
        const formView = document.getElementById('recipe-form-view');
        if (listView) listView.classList.add('hidden');
        if (formView) formView.classList.add('hidden');

        // Hide filter toggle container
        const filterToggleContainer = document.querySelector('.filter-toggle-container');
        if (filterToggleContainer) {
            filterToggleContainer.classList.add('hidden');
        }

        // Hide filter bars
        const filterBar = document.getElementById('filter-bar');
        if (filterBar) {
            filterBar.classList.add('hidden');
        }
        const timeFilterBar = document.getElementById('time-filter-bar');
        if (timeFilterBar) {
            timeFilterBar.classList.add('hidden');
        }

        // Hide recipe counter
        const recipeCounter = document.getElementById('recipe-counter');
        if (recipeCounter) {
            recipeCounter.classList.add('hidden');
        }

        // Show detail view
        const detailView = document.getElementById('recipe-detail-view');
        if (detailView) {
            detailView.classList.remove('hidden');
        }

        // Render recipe details
        this.renderRecipeDetail(recipe);

        // Setup detail view event listeners
        this.setupDetailEventListeners(recipe);

        // Update current view state
        this.currentView = 'detail';
        this.currentRecipeId = recipeId;

        // Scroll to top
        window.scrollTo(0, 0);
    }



    /**
     * Render recipe detail
     * Requirements: 3.4, 4.4, 5.5, 9.4
     * @param {Recipe} recipe - Recipe to display
     */
    renderRecipeDetail(recipe) {
        // Store current recipe name for shopping list
        this.currentRecipeName = recipe.name;

        // Recipe name
        const nameElement = document.getElementById('detail-recipe-name');
        if (nameElement) {
            // Clear previous content and add name with edit icon
            nameElement.innerHTML = `${recipe.name} <i class="fa-solid fa-pencil recipe-name-edit-icon"></i>`;

            // Create tooltip that appears on hover
            const tooltip = document.createElement('div');
            tooltip.className = 'recipe-name-tooltip';
            tooltip.textContent = 'Editar receta';
            nameElement.appendChild(tooltip);

            nameElement.onclick = () => {
                this.showRecipeForm(recipe.id);
            };
        }

        // Category - Show above recipe name
        const categoryElement = document.getElementById('detail-category');
        if (categoryElement) {
            if (recipe.category) {
                categoryElement.dataset.category = recipe.category;
                categoryElement.textContent = this.getCategoryLabel(recipe.category);
                categoryElement.style.display = 'inline-block';
            } else {
                categoryElement.style.display = 'none';
            }
        }

        // Total Time - Show next to category
        const totalTimeElement = document.getElementById('detail-total-time');
        if (totalTimeElement) {
            if (recipe.totalTime && recipe.totalTime.trim() !== '') {
                totalTimeElement.textContent = `⏱️ ${recipe.totalTime}`;
                totalTimeElement.style.display = 'inline-block';
            } else {
                totalTimeElement.style.display = 'none';
            }
        }

        // Caravan Friendly Badge - Show inline with time
        const caravanBadge = document.getElementById('detail-caravan-badge');
        if (caravanBadge) {
            if (recipe.caravanFriendly) {
                caravanBadge.style.display = 'inline-block';
                caravanBadge.textContent = '🚐';
            } else {
                caravanBadge.style.display = 'none';
            }
        }

        // Hospital Friendly Badge - Show inline with time
        const hospitalBadge = document.getElementById('detail-hospital-badge');
        if (hospitalBadge) {
            if (recipe.hospitalFriendly) {
                hospitalBadge.style.display = 'inline-block';
                hospitalBadge.textContent = '🏥';
            } else {
                hospitalBadge.style.display = 'none';
            }
        }

        // Menu Friendly Badge - Show inline with time
        const menuBadge = document.getElementById('detail-menu-badge');
        if (menuBadge) {
            if (recipe.menuFriendly) {
                menuBadge.style.display = 'inline-block';
                menuBadge.textContent = '🍽️';
            } else {
                menuBadge.style.display = 'none';
            }
        }

        // Ingredients
        this.renderDetailIngredients(recipe.ingredients);

        // Kitchen appliances (Método de Preparación)
        this.renderDetailKitchenAppliances(recipe.kitchenAppliances);

        // Additional information (author and history)
        this.renderDetailAdditionalInfo(recipe.author, recipe.history);

        // Sequences
        this.renderDetailSequences(recipe.additionSequences, recipe.ingredients);

        // Multimedia
        this.renderDetailMultimedia(recipe.images, recipe.videos || [], recipe.name, recipe.totalTime, recipe.category, recipe.caravanFriendly, recipe.hospitalFriendly, recipe.menuFriendly);

        // Metadata
        this.renderDetailMetadata(recipe);

        // Share button
        const shareBtn = document.getElementById('share-recipe-btn');
        if (shareBtn) {
            shareBtn.onclick = () => this.showShareRecipe(recipe);
        }
    }

    /**
     * Render detail ingredients
     * Requirements: 3.4
     * @param {Ingredient[]} ingredients - Ingredients to display
     */
    renderDetailIngredients(ingredients) {
        const listElement = document.getElementById('detail-ingredients-list');
        const emptyElement = document.getElementById('detail-no-ingredients');

        if (!listElement || !emptyElement) return;

        // Clear list
        listElement.innerHTML = '';

        if (!ingredients || ingredients.length === 0) {
            listElement.style.display = 'none';
            emptyElement.style.display = 'block';
            return;
        }

        listElement.style.display = 'grid';
        emptyElement.style.display = 'none';

        // Render each ingredient
        ingredients.forEach((ingredient, index) => {
            const li = document.createElement('li');

            const nameSpan = document.createElement('span');
            nameSpan.className = 'ingredient-detail-name';
            nameSpan.textContent = ingredient.name;

            const quantityContainer = document.createElement('span');
            quantityContainer.className = 'ingredient-detail-quantity-container';

            const quantitySpan = document.createElement('span');
            quantitySpan.className = 'ingredient-detail-quantity';

            // Format quantity display: don't show 0, use dash for empty required fields
            let quantityText = '';
            if (ingredient.quantity && ingredient.quantity > 0) {
                quantityText = ingredient.quantity.toString();
                if (ingredient.unit) {
                    quantityText += ` ${ingredient.unit}`;
                }
            } else if (ingredient.unit) {
                // Only unit, no quantity
                quantityText = ingredient.unit;
            } else {
                // No quantity and no unit - show dash
                quantityText = '-';
            }

            quantitySpan.textContent = quantityText;

            const basketBtn = document.createElement('button');
            basketBtn.className = 'btn-icon ingredient-basket-btn';
            basketBtn.title = 'Añadir a lista de compra';
            basketBtn.setAttribute('aria-label', 'Añadir a lista de compra');
            basketBtn.textContent = '🛒';
            basketBtn.dataset.ingredientName = ingredient.name;
            basketBtn.dataset.ingredientQuantity = quantityText;
            basketBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Show modal to select shopping list (pass ingredient name, quantity, recipe name, and category)
                const recipe = this.recipes.find(r => r.name === this.currentRecipeName);
                const categoryId = recipe ? recipe.category : null;
                this.showSelectShoppingListModal(ingredient.name, quantityText, this.currentRecipeName || '', categoryId);
            });

            quantityContainer.appendChild(quantitySpan);
            quantityContainer.appendChild(basketBtn);

            li.appendChild(nameSpan);
            li.appendChild(quantityContainer);
            listElement.appendChild(li);
        });
    }

    /**
     * Render detail preparation method
     * Requirements: 3.4
     * @param {string} preparationMethod - Preparation method text
     */
    renderDetailPreparationMethod(preparationMethod) {
        const methodElement = document.getElementById('detail-preparation-method');
        const emptyElement = document.getElementById('detail-no-method');

        if (!methodElement || !emptyElement) return;

        if (!preparationMethod || preparationMethod.trim() === '') {
            methodElement.style.display = 'none';
            emptyElement.style.display = 'block';
            return;
        }

        methodElement.style.display = 'block';
        emptyElement.style.display = 'none';
        methodElement.textContent = preparationMethod;
    }

    /**
     * Render detail kitchen appliances section
     * @param {Array} appliances - Kitchen appliances array
     */
    renderDetailKitchenAppliances(appliances) {
        const section = document.getElementById('detail-appliances-section');
        const chipsContainer = document.getElementById('detail-appliances-chips');

        if (!section || !chipsContainer) return;

        // Clear chips
        chipsContainer.innerHTML = '';

        if (!appliances || appliances.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';

        // Create ul element with same style as ingredients list
        const ul = document.createElement('ul');
        ul.className = 'detail-ingredients-list';

        // Render each appliance as a list item
        appliances.forEach(applianceId => {
            const appliance = KITCHEN_APPLIANCES.find(a => a.id === applianceId);
            if (appliance) {
                const li = document.createElement('li');
                li.innerHTML = `<span class="chip-emoji">${appliance.emoji}</span>${appliance.name}`;
                ul.appendChild(li);
            }
        });

        chipsContainer.appendChild(ul);
    }

    /**
     * Render additional information (author and history)
     * @param {string} author - Recipe author
     * @param {string} history - Recipe history
     */
    renderDetailAdditionalInfo(author, history) {
        const sectionElement = document.getElementById('detail-additional-info-section');
        const authorSection = document.getElementById('detail-author-section');
        const authorElement = document.getElementById('detail-author');
        const historySection = document.getElementById('detail-history-section');
        const historyElement = document.getElementById('detail-history');

        if (!sectionElement || !authorSection || !authorElement || !historySection || !historyElement) return;

        const hasAuthor = author && author.trim() !== '';
        const hasHistory = history && history.trim() !== '';

        // Show section only if there's author or history
        if (!hasAuthor && !hasHistory) {
            sectionElement.style.display = 'none';
            return;
        }

        sectionElement.style.display = 'block';

        // Show author if available
        if (hasAuthor) {
            authorSection.style.display = 'block';
            authorElement.textContent = author;
        } else {
            authorSection.style.display = 'none';
        }

        // Show history if available
        if (hasHistory) {
            historySection.style.display = 'block';
            historyElement.textContent = history;
        } else {
            historySection.style.display = 'none';
        }
    }

    /**
     * Render detail sequences
     * Requirements: 4.4
     * @param {Sequence[]} sequences - Sequences to display
     * @param {Ingredient[]} ingredients - Ingredients for reference
     */
    renderDetailSequences(sequences, ingredients) {
        const sectionElement = document.getElementById('detail-sequences-section');
        const listElement = document.getElementById('detail-sequences-list');

        if (!sectionElement || !listElement) return;

        // Clear list
        listElement.innerHTML = '';

        if (!sequences || sequences.length === 0) {
            sectionElement.style.display = 'none';
            return;
        }

        sectionElement.style.display = 'block';

        // Render each sequence
        sequences.forEach((sequence, index) => {
            const item = document.createElement('div');
            item.className = 'detail-sequence-item';

            // Number
            const numberDiv = document.createElement('div');
            numberDiv.className = 'detail-sequence-number';
            numberDiv.textContent = index + 1;

            // Content
            const contentDiv = document.createElement('div');
            contentDiv.className = 'detail-sequence-content';

            // Description and duration container (first line)
            if (sequence.description || sequence.duration) {
                const descDurationDiv = document.createElement('div');
                descDurationDiv.className = 'detail-sequence-desc-duration';

                // Description
                if (sequence.description) {
                    const descriptionSpan = document.createElement('span');
                    descriptionSpan.className = 'detail-sequence-description';
                    descriptionSpan.textContent = sequence.description;
                    descDurationDiv.appendChild(descriptionSpan);
                }

                // Duration
                if (sequence.duration) {
                    const durationSpan = document.createElement('span');
                    durationSpan.className = 'detail-sequence-duration';
                    const formattedDuration = this.formatTimeForDisplay(sequence.duration);
                    durationSpan.textContent = ` ⏱️ ${formattedDuration}`;
                    descDurationDiv.appendChild(durationSpan);
                }

                contentDiv.appendChild(descDurationDiv);
            }

            // Ingredients tags (second line)
            if (sequence.ingredientIds && sequence.ingredientIds.length > 0) {
                const ingredientsDiv = document.createElement('div');
                ingredientsDiv.className = 'detail-sequence-ingredients';

                sequence.ingredientIds.forEach(ingredientId => {
                    const ingredient = ingredients.find(ing => ing.id === ingredientId);
                    if (ingredient) {
                        const tag = document.createElement('span');
                        tag.className = 'detail-sequence-ingredient-tag';
                        tag.textContent = ingredient.name;
                        ingredientsDiv.appendChild(tag);
                    }
                });

                contentDiv.appendChild(ingredientsDiv);
            }

            item.appendChild(numberDiv);
            item.appendChild(contentDiv);
            listElement.appendChild(item);
        });
    }

    // ===== Photo Gallery Methods =====

    /**
     * Render photo gallery for recipes with multiple images
     * Requirements: 1.1, 1.2
     * @param {MediaFile[]} images - Array of images
     * @param {string} recipeName - Name of the recipe for alt text
     * @param {string} totalTime - Total time for the recipe
     * @param {boolean} caravanFriendly - Whether recipe is caravan friendly
     * @returns {HTMLElement|null} Gallery element or null
     */
    renderPhotoGallery(images, recipeName = '', totalTime = '', caravanFriendly = false, hospitalFriendly = false, menuFriendly = false) {
        // Validation
        if (!images || !Array.isArray(images) || images.length === 0) {
            console.warn('[PhotoGallery] No images provided');
            return null;
        }

        // If only 1 image, use traditional rendering
        if (images.length === 1) {
            return this.renderSingleImage(images[0], recipeName, totalTime, caravanFriendly, hospitalFriendly, menuFriendly);
        }

        // Initialize gallery state for 2+ images
        this.galleryState = {
            images: images,
            currentIndex: 0,
            totalImages: images.length,
            recipeName: recipeName
        };

        // Create gallery container
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'photo-gallery';
        galleryContainer.setAttribute('role', 'region');
        galleryContainer.setAttribute('aria-label', 'Galería de fotos de la receta');

        // Render main area
        const mainArea = this.renderGalleryMain(images[0], 0, images.length, recipeName, totalTime, caravanFriendly, hospitalFriendly, menuFriendly);
        galleryContainer.appendChild(mainArea);

        // Render thumbnails
        const thumbnails = this.renderGalleryThumbnails(images, 0, recipeName);
        galleryContainer.appendChild(thumbnails);

        // Setup navigation event listeners
        this.setupGalleryNavigation(galleryContainer);

        return galleryContainer;
    }

    /**
     * Render single image (traditional rendering for 1 image)
     * Requirements: 1.2
     * @param {MediaFile} image - Image to display
     * @param {string} recipeName - Name of the recipe for alt text
     * @param {string} totalTime - Total time for the recipe
     * @param {boolean} caravanFriendly - Whether recipe is caravan friendly
     * @returns {HTMLElement} Image element
     */
    renderSingleImage(image, recipeName = '', totalTime = '', caravanFriendly = false, hospitalFriendly = false, menuFriendly = false) {
        const item = document.createElement('div');
        item.className = 'detail-gallery-item';

        const img = document.createElement('img');
        img.src = image.data;
        img.alt = recipeName ? `${recipeName} - Foto` : image.name;
        img.className = 'detail-gallery-image';

        // Handle image load error
        img.addEventListener('error', () => {
            console.warn('[PhotoGallery] Failed to load image:', image.name);
            img.alt = 'Imagen no disponible';
        });

        item.appendChild(img);

        // Add badges container (same as home page cards)
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'recipe-badges-container';

        // Add caravan badge if applicable
        if (caravanFriendly === true) {
            const caravanBadge = document.createElement('div');
            caravanBadge.className = 'recipe-caravan-badge-image modal-trigger modal-trigger--badge modal-trigger--badge-xl';
            caravanBadge.textContent = '🚐';
            caravanBadge.title = 'Apto para caravana';
            caravanBadge.setAttribute('aria-label', 'Receta apta para caravana');
            badgesContainer.appendChild(caravanBadge);
        }

        // Add hospital badge if applicable
        if (hospitalFriendly === true) {
            const hospitalBadge = document.createElement('div');
            hospitalBadge.className = 'recipe-hospital-badge-image modal-trigger modal-trigger--badge modal-trigger--badge-xl';
            hospitalBadge.textContent = '🏥';
            hospitalBadge.title = 'Apto para hospital';
            hospitalBadge.setAttribute('aria-label', 'Receta apta para hospital');
            badgesContainer.appendChild(hospitalBadge);
        }

        // Add menu badge if applicable
        if (menuFriendly === true) {
            const menuBadge = document.createElement('div');
            menuBadge.className = 'recipe-menu-badge-image modal-trigger modal-trigger--badge modal-trigger--badge-xl';
            menuBadge.textContent = '🍽️';
            menuBadge.title = 'Para menú';
            menuBadge.setAttribute('aria-label', 'Receta para menú');
            badgesContainer.appendChild(menuBadge);
        }

        // Only append if has badges
        if (badgesContainer.children.length > 0) {
            item.appendChild(badgesContainer);
        }

        // Add click to open modal
        item.addEventListener('click', () => {
            this.openImageModal([image], 0);
        });

        return item;
    }

    /**
     * Render gallery main area with image and controls
     * Requirements: 1.4, 2.1, 2.2, 4.2, 4.4
     * @param {MediaFile} image - Current image to display
     * @param {number} index - Current image index
     * @param {number} total - Total number of images
     * @param {string} recipeName - Name of the recipe for alt text
     * @param {string} totalTime - Total time for the recipe
     * @param {boolean} caravanFriendly - Whether recipe is caravan friendly
     * @returns {HTMLElement} Main area element
     */
    renderGalleryMain(image, index, total, recipeName = '', totalTime = '', caravanFriendly = false, hospitalFriendly = false, menuFriendly = false) {
        const mainArea = document.createElement('div');
        mainArea.className = 'gallery-main';
        mainArea.setAttribute('role', 'img');
        mainArea.setAttribute('aria-label', 'Imagen principal');

        // Main image
        const img = document.createElement('img');
        img.src = image.data;
        img.alt = recipeName ? `${recipeName} - Foto ${index + 1}` : `Foto ${index + 1}`;
        img.className = 'gallery-main-image';
        img.id = 'gallery-main-image';

        // Handle image load error
        img.addEventListener('error', () => {
            console.warn('[PhotoGallery] Failed to load image:', image.name);
            img.alt = 'Imagen no disponible';
            img.style.background = 'var(--color-background-secondary)';
        });

        // Click to open modal disabled for detail gallery
        // img.addEventListener('click', () => {
        //     this.openImageModal(this.galleryState.images, index);
        // });

        mainArea.appendChild(img);

        // Add badges container (same as home page cards)
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'recipe-badges-container';

        // Add caravan badge if applicable
        if (caravanFriendly === true) {
            const caravanBadge = document.createElement('div');
            caravanBadge.className = 'recipe-caravan-badge-image modal-trigger modal-trigger--badge modal-trigger--badge-xl';
            caravanBadge.textContent = '🚐';
            caravanBadge.title = 'Apto para caravana';
            caravanBadge.setAttribute('aria-label', 'Receta apta para caravana');
            badgesContainer.appendChild(caravanBadge);
        }

        // Add hospital badge if applicable
        if (hospitalFriendly === true) {
            const hospitalBadge = document.createElement('div');
            hospitalBadge.className = 'recipe-hospital-badge-image modal-trigger modal-trigger--badge modal-trigger--badge-xl';
            hospitalBadge.textContent = '🏥';
            hospitalBadge.title = 'Apto para hospital';
            hospitalBadge.setAttribute('aria-label', 'Receta apta para hospital');
            badgesContainer.appendChild(hospitalBadge);
        }

        // Add menu badge if applicable
        if (menuFriendly === true) {
            const menuBadge = document.createElement('div');
            menuBadge.className = 'recipe-menu-badge-image modal-trigger modal-trigger--badge modal-trigger--badge-xl';
            menuBadge.textContent = '🍽️';
            menuBadge.title = 'Para menú';
            menuBadge.setAttribute('aria-label', 'Receta para menú');
            badgesContainer.appendChild(menuBadge);
        }

        // Only append if has badges
        if (badgesContainer.children.length > 0) {
            mainArea.appendChild(badgesContainer);
        }

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-nav-btn gallery-nav-prev';
        prevBtn.setAttribute('aria-label', 'Ver foto anterior');
        prevBtn.setAttribute('aria-controls', 'gallery-main-image');
        prevBtn.textContent = '‹';
        mainArea.appendChild(prevBtn);

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-nav-btn gallery-nav-next';
        nextBtn.setAttribute('aria-label', 'Ver foto siguiente');
        nextBtn.setAttribute('aria-controls', 'gallery-main-image');
        nextBtn.textContent = '›';
        mainArea.appendChild(nextBtn);

        // Position indicator
        const indicator = document.createElement('div');
        indicator.className = 'gallery-indicator';
        indicator.innerHTML = `
            <span class="gallery-indicator-current">${index + 1}</span> / 
            <span class="gallery-indicator-total">${total}</span>
        `;
        mainArea.appendChild(indicator);

        return mainArea;
    }

    /**
     * Render gallery thumbnails
     * Requirements: 1.3, 4.2, 4.3
     * @param {MediaFile[]} images - Array of images
     * @param {number} activeIndex - Index of active image
     * @param {string} recipeName - Name of the recipe for alt text
     * @returns {HTMLElement} Thumbnails container
     */
    renderGalleryThumbnails(images, activeIndex, recipeName = '') {
        const container = document.createElement('div');
        container.className = 'gallery-thumbnails';
        container.setAttribute('role', 'tablist');
        container.setAttribute('aria-label', 'Miniaturas de fotos');

        images.forEach((image, index) => {
            const button = document.createElement('button');
            button.className = 'gallery-thumbnail';
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-label', `Foto ${index + 1} de ${images.length}`);
            button.dataset.index = index;

            if (index === activeIndex) {
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
            } else {
                button.setAttribute('aria-selected', 'false');
            }

            const img = document.createElement('img');
            // Lazy load thumbnails far from active index
            if (Math.abs(index - activeIndex) > 3) {
                img.loading = 'lazy';
            }
            img.src = image.data;
            img.alt = '';
            img.draggable = false;

            button.appendChild(img);
            container.appendChild(button);
        });

        return container;
    }

    /**
     * Setup gallery navigation event listeners
     * Requirements: 2.1, 2.2, 4.1, 4.3
     * @param {HTMLElement} galleryContainer - Gallery container element
     */
    setupGalleryNavigation(galleryContainer) {
        // Previous button
        const prevBtn = galleryContainer.querySelector('.gallery-nav-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigatePrevious();
            });
        }

        // Next button
        const nextBtn = galleryContainer.querySelector('.gallery-nav-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateNext();
            });
        }

        // Thumbnail clicks
        const thumbnails = galleryContainer.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const index = parseInt(thumbnail.dataset.index);
                this.navigateToImage(index);
            });
        });

        // Keyboard navigation
        galleryContainer.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.navigatePrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.navigateNext();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.navigateToImage(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.navigateToImage(this.galleryState.totalImages - 1);
                    break;
            }
        });
    }

    /**
     * Navigate to specific image
     * Requirements: 2.1, 2.5, 4.3
     * @param {number} index - Image index to navigate to
     */
    navigateToImage(index) {
        // Validate index
        if (index < 0 || index >= this.galleryState.totalImages) {
            console.error('[PhotoGallery] Invalid index:', index);
            return;
        }

        // Update state
        this.galleryState.currentIndex = index;

        // Update main image
        const mainImage = document.getElementById('gallery-main-image');
        if (mainImage) {
            const image = this.galleryState.images[index];
            mainImage.src = image.data;
            mainImage.alt = this.galleryState.recipeName
                ? `${this.galleryState.recipeName} - Foto ${index + 1}`
                : `Foto ${index + 1}`;
        }

        // Update indicator
        const indicatorCurrent = document.querySelector('.gallery-indicator-current');
        if (indicatorCurrent) {
            indicatorCurrent.textContent = index + 1;
        }

        // Update thumbnails
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumbnail, i) => {
            if (i === index) {
                thumbnail.classList.add('active');
                thumbnail.setAttribute('aria-selected', 'true');
                // Scroll thumbnail into view
                thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumbnail.classList.remove('active');
                thumbnail.setAttribute('aria-selected', 'false');
            }
        });

        // Maintain focus if on thumbnail
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('gallery-thumbnail')) {
            const newThumbnail = document.querySelector(`.gallery-thumbnail[data-index="${index}"]`);
            if (newThumbnail) {
                newThumbnail.focus();
            }
        }
    }

    /**
     * Navigate to next image (circular)
     * Requirements: 2.1, 2.2, 2.3, 2.4
     */
    navigateNext() {
        const nextIndex = (this.galleryState.currentIndex + 1) % this.galleryState.totalImages;
        this.navigateToImage(nextIndex);
    }

    /**
     * Navigate to previous image (circular)
     * Requirements: 2.1, 2.2, 2.3, 2.4
     */
    navigatePrevious() {
        const prevIndex = (this.galleryState.currentIndex - 1 + this.galleryState.totalImages) % this.galleryState.totalImages;
        this.navigateToImage(prevIndex);
    }

    // ===== End Photo Gallery Methods =====

    // ===== Utility Methods =====

    /**
     * Capitalize the first letter of a string
     * Handles edge cases: empty strings, numbers, special characters
     * @param {string} str - String to capitalize
     * @returns {string} String with first letter capitalized
     */
    capitalizeFirstLetter(str) {
        // Handle null, undefined, or empty string
        if (!str || typeof str !== 'string' || str.length === 0) {
            return str || '';
        }

        // Capitalize first character (works for letters, returns unchanged for numbers/special chars)
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // ===== End Utility Methods =====

    /**
     * Render detail multimedia
     * Requirements: 5.5, 9.4, 1.1, 1.2
     * @param {MediaFile[]} images - Images to display
     * @param {MediaFile[]} videos - Videos to display
     * @param {string} recipeName - Name of the recipe for alt text
     * @param {string} totalTime - Total time for the recipe
     * @param {string} category - Category of the recipe
     * @param {boolean} caravanFriendly - Whether recipe is caravan friendly
     */
    renderDetailMultimedia(images, videos, recipeName = '', totalTime = '', category = '', caravanFriendly = false, hospitalFriendly = false, menuFriendly = false) {
        const sectionElement = document.getElementById('detail-multimedia-section');
        const imagesGallery = document.getElementById('detail-images-gallery');
        const videosGallery = document.getElementById('detail-videos-gallery');

        console.log('[Multimedia] Rendering:', { images: images?.length, videos: videos?.length });

        if (!sectionElement || !imagesGallery) {
            console.warn('[Multimedia] Missing required elements');
            return;
        }

        // Clear galleries
        imagesGallery.innerHTML = '';
        if (videosGallery) {
            videosGallery.innerHTML = '';
        }

        const hasImages = images && images.length > 0;
        const hasVideos = videos && videos.length > 0;

        if (!hasImages && !hasVideos) {
            sectionElement.style.display = 'none';
            return;
        }

        sectionElement.style.display = 'block';
        console.log('[Multimedia] Showing section with', images?.length, 'images');

        // NUEVO: Render images using gallery for 2+ images
        if (hasImages) {
            if (images.length >= 2) {
                // Use photo gallery for multiple images
                const gallery = this.renderPhotoGallery(images, recipeName, totalTime, caravanFriendly, hospitalFriendly, menuFriendly);
                if (gallery) {
                    imagesGallery.appendChild(gallery);
                }
            } else {
                // Use traditional rendering for single image
                const singleImage = this.renderSingleImage(images[0], recipeName, totalTime, caravanFriendly, hospitalFriendly, menuFriendly);
                imagesGallery.appendChild(singleImage);
            }
        }

        // Render videos (unchanged)
        if (hasVideos && videosGallery) {
            videos.forEach(video => {
                const item = document.createElement('div');
                item.className = 'detail-gallery-item';

                const videoElement = document.createElement('video');
                videoElement.src = video.data;
                videoElement.className = 'detail-gallery-video';
                videoElement.controls = true;

                item.appendChild(videoElement);
                videosGallery.appendChild(item);
            });
        }
    }

    /**
     * Render detail metadata
     * Requirements: 9.4
     * @param {Recipe} recipe - Recipe to display metadata for
     */
    renderDetailMetadata(recipe) {
        const createdAtElement = document.getElementById('detail-created-at');
        const updatedAtElement = document.getElementById('detail-updated-at');
        const recipeIdElement = document.getElementById('detail-recipe-id');

        if (createdAtElement) {
            createdAtElement.textContent = recipe.createdAt.toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (updatedAtElement) {
            updatedAtElement.textContent = recipe.updatedAt.toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (recipeIdElement) {
            recipeIdElement.textContent = recipe.id;
        }
    }

    /**
     * Setup image modal event listeners
     */
    setupImageModal() {
        const modal = document.getElementById('image-modal');
        const overlay = modal?.querySelector('.image-modal-overlay');
        const closeBtn = document.getElementById('close-modal-btn');
        const prevBtn = document.getElementById('prev-image-btn');
        const nextBtn = document.getElementById('next-image-btn');

        if (!modal) return;

        // Close modal on overlay click
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeImageModal();
            });
        }

        // Close modal on close button click
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeImageModal();
            });
        }

        // Previous image
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.showPreviousImage();
            });
        }

        // Next image
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.showNextImage();
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.closeImageModal();
            }
        });

        // Navigate with arrow keys
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('hidden')) return;

            if (e.key === 'ArrowLeft') {
                this.showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                this.showNextImage();
            }
        });
    }

    /**
     * Open image modal with specific image
     * @param {Array} images - Array of images
     * @param {number} index - Index of image to show
     */
    openImageModal(images, index = 0) {
        if (!images || images.length === 0) return;

        this.modalImages = images;
        this.currentImageIndex = index;

        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const counter = document.getElementById('modal-image-counter');
        const prevBtn = document.getElementById('prev-image-btn');
        const nextBtn = document.getElementById('next-image-btn');

        if (!modal || !modalImage) return;

        // Show modal
        modal.classList.remove('hidden');

        // Set image
        modalImage.src = images[index].data;
        modalImage.alt = images[index].name || `Imagen ${index + 1}`;

        // Update counter
        if (counter) {
            if (images.length > 1) {
                counter.textContent = `${index + 1} / ${images.length}`;
                counter.style.display = 'block';
            } else {
                counter.style.display = 'none';
            }
        }

        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = index === 0;
            prevBtn.style.display = images.length > 1 ? 'flex' : 'none';
        }

        if (nextBtn) {
            nextBtn.disabled = index === images.length - 1;
            nextBtn.style.display = images.length > 1 ? 'flex' : 'none';
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close image modal
     */
    closeImageModal() {
        const modal = document.getElementById('image-modal');
        if (!modal) return;

        modal.classList.add('hidden');
        this.modalImages = [];
        this.currentImageIndex = 0;

        // Restore body scroll
        document.body.style.overflow = '';
    }

    /**
     * Show previous image in modal
     */
    showPreviousImage() {
        if (this.currentImageIndex > 0) {
            this.openImageModal(this.modalImages, this.currentImageIndex - 1);
        }
    }

    /**
     * Show next image in modal
     */
    showNextImage() {
        if (this.currentImageIndex < this.modalImages.length - 1) {
            this.openImageModal(this.modalImages, this.currentImageIndex + 1);
        }
    }

    /**
     * Setup detail view event listeners
     * Requirements: 6.1
     * @param {Recipe} recipe - Current recipe
     */
    setupDetailEventListeners(recipe) {
        // Back to list button
        const backBtn = document.getElementById('back-to-list-btn');
        if (backBtn) {
            backBtn.onclick = () => {
                this.closeRecipeDetail();
            };
        }

        // Edit button
        const editBtn = document.getElementById('edit-recipe-btn');
        if (editBtn) {
            editBtn.onclick = () => {
                this.showRecipeForm(recipe.id);
            };
        }

        // Duplicate button
        const duplicateBtn = document.getElementById('duplicate-recipe-btn');
        if (duplicateBtn) {
            duplicateBtn.onclick = async () => {
                await this.duplicateRecipe(recipe.id);
            };
        }

        // Delete button
        const deleteBtn = document.getElementById('delete-recipe-btn');
        if (deleteBtn) {
            // Reset button state
            deleteBtn.disabled = false;
            deleteBtn.textContent = 'Eliminar';

            deleteBtn.onclick = async () => {
                await this.deleteRecipe(recipe.id);
            };
        }

        // Export XML button
        const exportXmlBtn = document.getElementById('export-xml-btn');
        if (exportXmlBtn) {
            exportXmlBtn.onclick = () => {
                this.exportRecipeToXML(recipe.id);
            };
        }

        // Export PDF button
        const exportPdfBtn = document.getElementById('export-pdf-btn');
        if (exportPdfBtn) {
            exportPdfBtn.onclick = () => {
                this.exportRecipeToPDF(recipe.id);
            };
        }

        // Copy ingredients button removed
    }

    /**
     * Duplicate a recipe
     * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
     * @param {string} recipeId - Recipe ID to duplicate
     */
    async duplicateRecipe(recipeId) {
        try {
            // Find the original recipe
            const originalRecipe = this.recipes.find(r => r.id === recipeId);

            if (!originalRecipe) {
                throw new Error('Receta no encontrada');
            }

            // Show loading state
            const duplicateBtn = document.getElementById('duplicate-recipe-btn');
            const originalText = duplicateBtn?.textContent;
            if (duplicateBtn) {
                duplicateBtn.disabled = true;
                duplicateBtn.textContent = '⏳ Duplicando...';
            }

            // Create a complete copy of the recipe with a new ID
            // Deep copy all ingredients
            const copiedIngredients = originalRecipe.ingredients.map(ingredient =>
                new Ingredient({
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit,
                    order: ingredient.order
                })
            );

            // Deep copy all sequences with new ingredient IDs mapping
            const ingredientIdMap = new Map();
            originalRecipe.ingredients.forEach((originalIng, index) => {
                ingredientIdMap.set(originalIng.id, copiedIngredients[index].id);
            });

            const copiedSequences = originalRecipe.additionSequences.map(sequence =>
                new Sequence({
                    step: sequence.step,
                    ingredientIds: sequence.ingredientIds.map(oldId => ingredientIdMap.get(oldId) || oldId),
                    description: sequence.description
                })
            );

            // Deep copy all images
            const copiedImages = originalRecipe.images.map(image =>
                new MediaFile({
                    name: image.name,
                    type: image.type,
                    data: image.data,
                    size: image.size
                })
            );

            // Create new recipe with " (Copia)" suffix
            const duplicatedRecipe = new Recipe({
                name: originalRecipe.name + ' (Copia)',
                category: originalRecipe.category,
                totalTime: originalRecipe.totalTime,
                preparationMethod: originalRecipe.preparationMethod,
                author: originalRecipe.author,
                history: originalRecipe.history,
                ingredients: copiedIngredients,
                additionSequences: copiedSequences,
                images: copiedImages,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            // Save the duplicated recipe to IndexedDB
            const newRecipeId = await this.storageManager.saveRecipe(duplicatedRecipe);

            console.log('Recipe duplicated successfully:', newRecipeId);

            // Reload recipes from storage
            await this.loadRecipes();

            // Show success message
            this.showSuccess('¡Receta duplicada exitosamente!');

            // Close detail view and show the list with the new recipe
            this.closeRecipeDetail();
            this.renderRecipeList();

            // Optionally, show the duplicated recipe detail
            // this.showRecipeDetail(newRecipeId);

        } catch (error) {
            console.error('Error duplicating recipe:', error);
            this.showError('Error al duplicar la receta: ' + error.message);
        } finally {
            // Restore button state
            const duplicateBtn = document.getElementById('duplicate-recipe-btn');
            if (duplicateBtn) {
                duplicateBtn.disabled = false;
                duplicateBtn.textContent = '📋 Duplicar';
            }
        }
    }

    /**
     * Delete a recipe with confirmation
     * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
     * @param {string} recipeId - Recipe ID to delete
     */
    async deleteRecipe(recipeId) {
        try {
            // Find the recipe
            const recipe = this.recipes.find(r => r.id === recipeId);

            if (!recipe) {
                throw new Error('Receta no encontrada');
            }

            // Show confirmation dialog (Requirement 8.1)
            const confirmMessage = `¿Estás seguro de que quieres eliminar la receta "${recipe.name}"?\n\nEsta acción no se puede deshacer.`;
            const confirmed = confirm(confirmMessage);

            // If user cancels, keep recipe unchanged (Requirement 8.4)
            if (!confirmed) {
                console.log('Recipe deletion cancelled by user');
                return;
            }

            // Show loading state
            const deleteBtn = document.getElementById('delete-recipe-btn');
            const originalText = deleteBtn?.textContent;
            if (deleteBtn) {
                deleteBtn.disabled = true;
                deleteBtn.textContent = '⏳ Eliminando...';
            }

            // Delete recipe from IndexedDB (Requirement 8.2, 8.5)
            await this.storageManager.deleteRecipe(recipeId);

            console.log('Recipe deleted successfully:', recipeId);

            // Reload recipes from storage
            await this.loadRecipes();

            // Show success message
            this.showSuccess('¡Receta eliminada exitosamente!');

            // Close detail view and show the list (Requirement 8.3)
            this.closeRecipeDetail();
            this.renderRecipeList();

        } catch (error) {
            console.error('Error deleting recipe:', error);
            this.showError('Error al eliminar la receta: ' + error.message);

            // Restore button state on error
            const deleteBtn = document.getElementById('delete-recipe-btn');
            if (deleteBtn) {
                deleteBtn.disabled = false;
                deleteBtn.textContent = '🗑 Eliminar';
            }
        }
    }

    /**
     * Show recipe options modal
     * @param {string} recipeId - Recipe ID
     */
    showRecipeOptionsModal(recipeId) {
        const modal = document.getElementById('recipe-options-modal');
        if (!modal) return;

        // Store current recipe ID for actions
        this.currentOptionsRecipeId = recipeId;

        // Show modal
        modal.classList.remove('hidden');

        // Setup event listeners
        const closeBtn = document.getElementById('close-recipe-options-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const editBtn = document.getElementById('recipe-option-edit');
        const duplicateBtn = document.getElementById('recipe-option-duplicate');
        const shareBtn = document.getElementById('recipe-option-share');
        const pdfBtn = document.getElementById('recipe-option-pdf');
        const deleteBtn = document.getElementById('recipe-option-delete');

        if (closeBtn) {
            closeBtn.onclick = () => this.closeRecipeOptionsModal();
        }

        if (overlay) {
            overlay.onclick = () => this.closeRecipeOptionsModal();
        }

        if (editBtn) {
            editBtn.onclick = () => {
                this.closeRecipeOptionsModal();
                this.showRecipeForm(recipeId);
            };
        }

        if (duplicateBtn) {
            duplicateBtn.onclick = () => {
                this.closeRecipeOptionsModal();
                this.duplicateRecipe(recipeId);
            };
        }

        const cmsBtn = document.getElementById('recipe-option-cms');
        if (cmsBtn) {
            cmsBtn.onclick = () => {
                this.closeRecipeOptionsModal();
                window.open('recipe-manager.html', '_blank');
            };
        }

        if (shareBtn) {
            shareBtn.onclick = () => {
                this.closeRecipeOptionsModal();
                const recipe = this.recipes.find(r => r.id === recipeId);
                if (recipe) {
                    this.showShareRecipe(recipe);
                }
            };
        }

        if (pdfBtn) {
            pdfBtn.onclick = () => {
                this.closeRecipeOptionsModal();
                this.exportRecipeToPDF(recipeId);
            };
        }

        if (deleteBtn) {
            deleteBtn.onclick = () => {
                this.closeRecipeOptionsModal();
                this.deleteRecipe(recipeId);
            };
        }
    }

    /**
     * Close recipe options modal
     */
    closeRecipeOptionsModal() {
        const modal = document.getElementById('recipe-options-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentOptionsRecipeId = null;
    }

    /**
     * Export recipe to XML
     * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5
     * @param {string} recipeId - Recipe ID to export
     */
    exportRecipeToXML(recipeId) {
        try {
            // Find the recipe
            const recipe = this.recipes.find(r => r.id === recipeId);

            if (!recipe) {
                throw new Error('Receta no encontrada');
            }

            // Show loading state
            const exportBtn = document.getElementById('export-xml-btn');
            const originalText = exportBtn?.textContent;
            if (exportBtn) {
                exportBtn.disabled = true;
                exportBtn.textContent = '⏳ Exportando...';
            }

            // Export recipe using XMLExporter
            XMLExporter.exportRecipe(recipe);

            console.log('Recipe exported to XML successfully:', recipeId);

            // Show success message
            this.showSuccess('¡Receta exportada a XML exitosamente!');

            // Restore button state
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = originalText;
            }

        } catch (error) {
            console.error('Error exporting recipe to XML:', error);
            this.showError('Error al exportar la receta: ' + error.message);

            // Restore button state on error
            const exportBtn = document.getElementById('export-xml-btn');
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = '📄 XML';
            }
        }
    }

    /**
     * Export recipe to PDF
     * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5
     * @param {string} recipeId - Recipe ID to export
     */
    async exportRecipeToPDF(recipeId) {
        try {
            // Find the recipe
            const recipe = this.recipes.find(r => r.id === recipeId);

            if (!recipe) {
                throw new Error('Receta no encontrada');
            }

            // Show loading state
            const exportBtn = document.getElementById('export-pdf-btn');
            const originalText = exportBtn?.textContent;
            if (exportBtn) {
                exportBtn.disabled = true;
                exportBtn.textContent = '⏳ Exportando...';
            }

            // Export recipe using PDFExporter
            await PDFExporter.exportRecipe(recipe);

            console.log('Recipe exported to PDF successfully:', recipeId);

            // Show success message
            this.showSuccess('¡Receta exportada a PDF exitosamente!');

            // Restore button state
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = originalText;
            }

        } catch (error) {
            console.error('Error exporting recipe to PDF:', error);
            this.showError('Error al exportar la receta: ' + error.message);

            // Restore button state on error
            const exportBtn = document.getElementById('export-pdf-btn');
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = '📑 PDF';
            }
        }
    }

    /**
     * Go to home (list view) from any view
     */
    goToHome() {
        // Check if we're in form view with unsaved changes
        if (this.currentView === 'form') {
            const form = document.getElementById('recipe-form');
            if (form && this.hasUnsavedChanges()) {
                if (!confirm('¿Descartar los cambios no guardados?')) {
                    return;
                }
            }
        }

        // Hide all views
        const detailView = document.getElementById('recipe-detail-view');
        const formView = document.getElementById('recipe-form-view');
        const shoppingListsView = document.getElementById('shopping-lists-view');
        if (detailView) detailView.classList.add('hidden');
        if (formView) formView.classList.add('hidden');
        if (shoppingListsView) shoppingListsView.classList.add('hidden');

        // Show list view
        const listView = document.getElementById('recipe-list-view');
        if (listView) {
            listView.classList.remove('hidden');
        }

        // Show filter bars
        const filterBar = document.getElementById('filter-bar');
        if (filterBar) {
            filterBar.classList.remove('hidden');
        }
        const timeFilterBar = document.getElementById('time-filter-bar');
        if (timeFilterBar) {
            timeFilterBar.classList.remove('hidden');
        }

        // Show recipe counter
        const recipeCounter = document.getElementById('recipe-counter');
        if (recipeCounter) {
            recipeCounter.classList.remove('hidden');
        }

        // Hide filters container (like initial state)
        const filtersContainer = document.getElementById('filters-container');
        if (filtersContainer) {
            filtersContainer.classList.add('hidden');
        }

        // Show toggle filters button
        const filterToggleContainer = document.querySelector('.filter-toggle-container');
        if (filterToggleContainer) {
            filterToggleContainer.classList.remove('hidden');
        }

        // Update toggle button text to show filters are closed
        const toggleBtn = document.getElementById('toggle-filters-btn');
        if (toggleBtn) {
            toggleBtn.textContent = '🔍 Filtros';
        }

        // Menu is always visible

        // Reset form if we were in form view
        if (this.currentView === 'form') {
            this.resetForm();
        }

        // Update current view state
        this.currentView = 'list';
        this.currentRecipeId = null;

        // Scroll to top
        window.scrollTo(0, 0);
    }

    /**
     * Close recipe detail and return to list view
     */
    closeRecipeDetail() {
        // Menu is always visible

        // Hide detail view
        const detailView = document.getElementById('recipe-detail-view');
        if (detailView) {
            detailView.classList.add('hidden');
        }

        // Show list view
        const listView = document.getElementById('recipe-list-view');
        if (listView) {
            listView.classList.remove('hidden');
        }

        // Show filter toggle container
        const filterToggleContainer = document.querySelector('.filter-toggle-container');
        if (filterToggleContainer) {
            filterToggleContainer.classList.remove('hidden');
        }

        // Show filter bars
        const filterBar = document.getElementById('filter-bar');
        if (filterBar) {
            filterBar.classList.remove('hidden');
        }
        const timeFilterBar = document.getElementById('time-filter-bar');
        if (timeFilterBar) {
            timeFilterBar.classList.remove('hidden');
        }

        // Show recipe counter
        const recipeCounter = document.getElementById('recipe-counter');
        if (recipeCounter) {
            recipeCounter.style.display = 'inline-block';
            recipeCounter.classList.remove('hidden');
        }

        // Update current view state
        this.currentView = 'list';
        this.currentRecipeId = null;

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // ===== Theme Management =====

    /**
     * Initialize theme from localStorage
     * Default theme is dark if no preference is saved
     */
    initTheme() {
        const savedTheme = localStorage.getItem('recetario_theme');

        // Default to dark theme if no preference is saved
        if (savedTheme === null || savedTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            document.body.classList.add('dark-theme');
            this.updateThemeButton(true);
            // Save default preference if not set
            if (savedTheme === null) {
                localStorage.setItem('recetario_theme', 'dark');
            }
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.body.classList.remove('dark-theme');
            this.updateThemeButton(false);
        }
    }

    /**
     * Toggle between light and dark theme
     */
    toggleTheme() {
        console.log('[Theme] Toggle theme called');
        const isDark = document.body.classList.toggle('dark-theme');
        document.documentElement.classList.toggle('dark-theme', isDark);
        localStorage.setItem('recetario_theme', isDark ? 'dark' : 'light');
        this.updateThemeButton(isDark);
        console.log('[Theme] Theme changed to:', isDark ? 'dark' : 'light');

        // Show feedback
        this.showSuccess(isDark ? '🌙 Tema oscuro activado' : '☀️ Tema claro activado', 2000);
    }

    /**
     * Update theme button icon and text
     * @param {boolean} isDark - Whether dark theme is active
     */
    updateThemeButton(isDark) {
        const themeIconModal = document.getElementById('theme-icon-modal');
        const themeTextModal = document.getElementById('theme-text-modal');
        const themeBtn = document.getElementById('theme-toggle-btn-modal');

        if (themeIconModal && themeTextModal) {
            // Si está en modo oscuro, mostrar sol (para cambiar a claro)
            // Si está en modo claro, mostrar luna (para cambiar a oscuro)
            themeIconModal.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
            themeTextModal.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
        }

        if (themeBtn) {
            themeBtn.title = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
        }
    }

    // ===== End Theme Management =====

    /**
     * Show error message to user with toast notification
     * Requirements: 1.3, 13.3
     * @param {string} message - Error message to display
     * @param {number} duration - Duration in milliseconds (default: 5000)
     */
    showError(message, duration = 5000) {
        console.error('[Error]', message);
        this.showToast(message, 'error', duration);
    }

    /**
     * Show success message to user with toast notification
     * @param {string} message - Success message to display
     * @param {number} duration - Duration in milliseconds (default: 3000)
     */
    showSuccess(message, duration = 3000) {
        console.log('[Success]', message);
        this.showToast(message, 'success', duration);
    }

    /**
     * Show warning message to user with toast notification
     * @param {string} message - Warning message to display
     * @param {number} duration - Duration in milliseconds (default: 4000)
     */
    showWarning(message, duration = 4000) {
        console.warn('[Warning]', message);
        this.showToast(message, 'warning', duration);
    }

    /**
     * Show toast notification
     * Requirements: 1.3, 13.3
     * @param {string} message - Message to display
     * @param {string} type - Type of toast: 'success', 'error', 'warning'
     * @param {number} duration - Duration in milliseconds
     */
    showToast(message, type = 'info', duration = 3000) {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        // Add icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const icon = icons[type] || icons.info;

        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Cerrar">✕</button>
        `;

        // Add to container
        toastContainer.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 10);

        // Setup close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.removeToast(toast);
        });

        // Auto-remove after duration
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    }

    /**
     * Remove toast notification
     * @param {HTMLElement} toast - Toast element to remove
     */
    removeToast(toast) {
        if (!toast || !toast.parentElement) return;

        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');

        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    }

    /**
     * Show storage warning banner when using localStorage fallback
     * Requirements: 13.3
     */
    showStorageWarning() {
        // Check if user already dismissed the warning
        if (localStorage.getItem('storageWarningDismissed') === 'true') {
            return;
        }

        const banner = document.createElement('div');
        banner.className = 'storage-warning-banner';
        banner.innerHTML = `
            <div class="storage-warning-content">
                <span class="storage-warning-icon">⚠️</span>
                <div class="storage-warning-text">
                    <strong>Modo de almacenamiento limitado</strong>
                    <p>IndexedDB no está disponible. Usando localStorage con capacidad reducida. Evite subir archivos multimedia muy grandes.</p>
                </div>
            </div>
            <button class="storage-warning-close" aria-label="Cerrar">✕</button>
        `;

        document.body.insertBefore(banner, document.body.firstChild);

        // Add padding to body to account for banner
        document.body.style.paddingTop = banner.offsetHeight + 'px';

        // Handle close button
        const closeBtn = banner.querySelector('.storage-warning-close');
        closeBtn.addEventListener('click', () => {
            banner.remove();
            document.body.style.paddingTop = '0';
            localStorage.setItem('storageWarningDismissed', 'true');
        });
    }

    /**
     * Format ingredients as plain text for clipboard
     * Requirements: 2.2, 2.3, 2.4, 5.1, 5.2, 5.3, 5.4, 5.5
     * @param {Recipe} recipe - Recipe object with ingredients
     * @returns {string} Formatted text with recipe name and ingredients
     */
    formatIngredientsForClipboard(recipe) {
        // Start with recipe name
        let text = recipe.name + '\n';
        text += '-------------------------------\n';

        // Check if recipe has ingredients
        if (!recipe.ingredients || recipe.ingredients.length === 0) {
            text += 'No hay ingredientes definidos';
            return text;
        }

        // Format each ingredient
        recipe.ingredients.forEach(ingredient => {
            let line = ingredient.name;

            // Add quantity and unit if available
            if (ingredient.quantity && ingredient.quantity > 0) {
                line += ` - ${ingredient.quantity}`;

                if (ingredient.unit && ingredient.unit.trim() !== '') {
                    line += ` ${ingredient.unit}`;
                }
            } else if (ingredient.unit && ingredient.unit.trim() !== '') {
                line += ` - ${ingredient.unit}`;
            }

            text += line + '\n';
        });

        return text.trim();
    }

    /**
     * Copy ingredients to clipboard
     * Requirements: 2.1, 2.5, 4.1, 4.3
     * @param {Recipe} recipe - Recipe object with ingredients
     * @param {Event} event - Click event to prevent propagation
     */
    async copyIngredientsToClipboard(recipe, event) {
        // Prevent card click event
        event.stopPropagation();
        event.preventDefault();

        // Get the recipe card element
        const recipeCard = event.target.closest('.recipe-card');

        try {
            // Format ingredients text
            const ingredientsText = this.formatIngredientsForClipboard(recipe);

            // Copy to clipboard using Clipboard API
            await navigator.clipboard.writeText(ingredientsText);

            // Show success toast over the recipe card
            this.showToastOnCard(recipeCard, 'Ingredientes copiados', 'success');

        } catch (error) {
            console.error('Error copying ingredients:', error);

            // Fallback to legacy method
            try {
                const ingredientsText = this.formatIngredientsForClipboard(recipe);
                this.fallbackCopyToClipboard(ingredientsText);
                this.showToastOnCard(recipeCard, 'Ingredientes copiados', 'success');
            } catch (fallbackError) {
                this.showToastOnCard(recipeCard, 'Error al copiar ingredientes', 'error');
            }
        }
    }

    /**
     * Copy ingredients to clipboard from detail view
     * @param {Recipe} recipe - Recipe object with ingredients
     * @param {Event} event - Click event
     */
    async copyIngredientsFromDetail(recipe, event) {
        event.preventDefault();

        // Get the multimedia gallery section (prefer images gallery)
        const galleryContainer = document.getElementById('detail-images-gallery') ||
            document.getElementById('detail-multimedia-section') ||
            document.getElementById('recipe-detail');

        try {
            // Format ingredients text
            const ingredientsText = this.formatIngredientsForClipboard(recipe);

            // Copy to clipboard using Clipboard API
            await navigator.clipboard.writeText(ingredientsText);

            // Show success toast over the gallery
            this.showToastOnCard(galleryContainer, 'Ingredientes copiados', 'success');

        } catch (error) {
            console.error('Error copying ingredients:', error);

            // Fallback to legacy method
            try {
                const ingredientsText = this.formatIngredientsForClipboard(recipe);
                this.fallbackCopyToClipboard(ingredientsText);
                this.showToastOnCard(galleryContainer, 'Ingredientes copiados', 'success');
            } catch (fallbackError) {
                this.showToastOnCard(galleryContainer, 'Error al copiar ingredientes', 'error');
            }
        }
    }

    /**
     * Fallback method to copy text to clipboard for older browsers
     * Requirements: 2.1, 4.1
     * @param {string} text - Text to copy to clipboard
     * @throws {Error} If copy operation fails
     */
    fallbackCopyToClipboard(text) {
        // Create temporary textarea element
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Position off-screen
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';

        // Add to DOM
        document.body.appendChild(textArea);

        // Select and copy
        textArea.focus();
        textArea.select();

        try {
            // Execute copy command
            const successful = document.execCommand('copy');

            // Clean up
            document.body.removeChild(textArea);

            if (!successful) {
                throw new Error('execCommand returned false');
            }
        } catch (error) {
            // Clean up on error
            document.body.removeChild(textArea);
            throw error;
        }
    }

    /**
     * Show toast notification over a recipe card
     * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.4
     * @param {HTMLElement} recipeCard - Recipe card element
     * @param {string} message - Message to display
     * @param {string} type - Type of toast ('success' or 'error')
     */
    showToastOnCard(recipeCard, message, type = 'success') {
        if (!recipeCard) return;

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification-card ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="toast-message">${message}</span>
        `;

        // Add toast to recipe card
        recipeCard.appendChild(toast);

        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Hide and remove toast after 2 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }

    /**
     * Show toast notification (legacy method for other uses)
     * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.4
     * @param {string} message - Message to display
     * @param {string} type - Type of toast ('success' or 'error')
     */
    showToast(message, type = 'success') {
        // Get or create toast element
        let toast = document.getElementById('ingredients-toast');

        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'ingredients-toast';
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <span class="toast-icon">✓</span>
                <span class="toast-message"></span>
            `;
            document.body.appendChild(toast);
        }

        // Update message and type
        const messageSpan = toast.querySelector('.toast-message');
        const iconSpan = toast.querySelector('.toast-icon');

        messageSpan.textContent = message;
        toast.className = `toast-notification ${type}`;

        // Update icon based on type
        iconSpan.textContent = type === 'success' ? '✓' : '✕';

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /**
     * Handle import XML button click
     * Requirements: 1.1
     */
    handleImportXMLClick() {
        const xmlFileInput = document.getElementById('xml-file-input');
        if (xmlFileInput) {
            xmlFileInput.click();
        }
    }

    /**
     * Handle XML file selection
     * Requirements: 1.2, 1.3, 2.1, 2.2, 2.3, 2.4
     * @param {File} file - Selected XML file
     */
    async handleXMLFileSelected(file) {
        if (!file) {
            return;
        }

        // Show loading state for both buttons (header and modal)
        const importBtn = document.getElementById('import-xml-btn');
        const importBtnModal = document.getElementById('import-xml-btn-modal');
        const originalText = importBtn?.textContent;
        const originalTextModal = importBtnModal?.textContent;

        if (importBtn) {
            importBtn.disabled = true;
            importBtn.textContent = '⏳ Importando...';
        }
        if (importBtnModal) {
            importBtnModal.disabled = true;
            importBtnModal.textContent = '⏳ Importando...';
        }

        try {
            console.log('[Import] Starting XML import:', file.name);

            // Close settings modal if open
            const settingsModal = document.getElementById('settings-modal');
            if (settingsModal && !settingsModal.classList.contains('hidden')) {
                console.log('[Import] Closing settings modal');
                settingsModal.classList.add('hidden');
            }

            // Show progress modal for multiple recipes
            const progressModal = document.getElementById('import-progress-modal');
            const progressBar = document.getElementById('import-progress-bar');
            const progressText = document.getElementById('import-progress-text');
            const progressDetails = document.getElementById('import-progress-details');

            // Progress callback
            const progressPercentage = document.getElementById('import-progress-percentage');
            const onProgress = (progress) => {
                console.log('[Progress] Callback called:', progress);
                console.log('[Progress] Modal elements:', {
                    progressModal: !!progressModal,
                    progressBar: !!progressBar,
                    progressText: !!progressText,
                    progressDetails: !!progressDetails,
                    progressPercentage: !!progressPercentage
                });

                if (progressModal && progressBar && progressText) {
                    // Show modal if not visible
                    if (progressModal.classList.contains('hidden')) {
                        console.log('[Progress] Showing modal');
                        progressModal.classList.remove('hidden');
                        // Force display
                        progressModal.style.display = 'flex';
                        console.log('[Progress] Modal display:', window.getComputedStyle(progressModal).display);
                        console.log('[Progress] Modal visibility:', window.getComputedStyle(progressModal).visibility);
                        console.log('[Progress] Modal z-index:', window.getComputedStyle(progressModal).zIndex);
                    }

                    // Update progress bar
                    progressBar.style.width = `${progress.percentage}%`;
                    console.log('[Progress] Bar width:', progress.percentage + '%');

                    // Update percentage text inside bar
                    if (progressPercentage) {
                        progressPercentage.textContent = `${Math.round(progress.percentage)}%`;
                        console.log('[Progress] Percentage text:', Math.round(progress.percentage) + '%');
                    }

                    // Update text
                    progressText.textContent = `Importando ${progress.current} de ${progress.total} recetas`;
                    console.log('[Progress] Main text:', progressText.textContent);

                    // Update recipe name with animation
                    if (progressDetails && progress.recipeName) {
                        console.log('[Progress] Updating recipe name:', progress.recipeName);
                        // Add animation class
                        progressDetails.classList.add('updating');
                        progressDetails.textContent = `📝 ${progress.recipeName}`;

                        // Remove animation class after animation completes
                        setTimeout(() => {
                            progressDetails.classList.remove('updating');
                        }, 200);
                    } else {
                        console.log('[Progress] No recipe name or details element');
                    }
                } else {
                    console.error('[Progress] Missing modal elements!');
                }
            };

            // Import recipes using XMLImporter with progress callback
            const result = await XMLImporter.importFromFile(file, onProgress);

            // Update progress text to show we're finishing up
            if (progressText) {
                progressText.textContent = 'Guardando recetas...';
            }
            if (progressDetails) {
                progressDetails.textContent = '💾 Finalizando importación';
            }

            console.log('[Import] Import completed:', result.summary);

            // Filter out duplicate recipes (compare by name)
            const existingRecipeNames = new Set(
                this.recipes.map(r => r.name.toLowerCase().trim())
            );

            const newRecipes = [];
            const duplicateRecipes = [];

            for (const recipe of result.successful) {
                const recipeName = recipe.name.toLowerCase().trim();
                if (existingRecipeNames.has(recipeName)) {
                    duplicateRecipes.push(recipe);
                    console.log('[Import] Skipping duplicate recipe:', recipe.name);
                } else {
                    newRecipes.push(recipe);
                }
            }

            // Check for unknown categories and create them automatically
            const unknownCategories = new Set();
            for (const recipe of newRecipes) {
                if (recipe.category && !this.categoryManager.getCategoryById(recipe.category)) {
                    unknownCategories.add(recipe.category);
                }
            }

            // Create unknown categories automatically
            for (const categoryId of unknownCategories) {
                try {
                    this.categoryManager.createCategory({
                        name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' '),
                        emoji: '📁',
                        color: CATEGORY_COLORS[unknownCategories.size % CATEGORY_COLORS.length]
                    });
                    console.log('[Import] Created category automatically:', categoryId);
                } catch (error) {
                    console.warn('[Import] Could not create category:', categoryId, error);
                }
            }

            // Save only new recipes to storage
            for (const recipe of newRecipes) {
                try {
                    await this.storageManager.saveRecipe(recipe);
                    // Small delay to prevent connection issues
                    await new Promise(resolve => setTimeout(resolve, 50));
                } catch (saveError) {
                    console.error('[Import] Error saving recipe:', recipe.name, saveError);
                    // Continue with next recipe even if one fails
                }
            }

            // Update result summary with duplicate info
            result.summary.imported = newRecipes.length;
            result.summary.duplicates = duplicateRecipes.length;
            result.successful = newRecipes;
            result.duplicates = duplicateRecipes;

            // Wait a bit before reloading to ensure all transactions are complete
            await new Promise(resolve => setTimeout(resolve, 100));

            // Reload recipes and update UI
            await this.loadRecipes();
            this.renderFilterChips();
            this.renderRecipeList();

            // Hide progress modal AFTER recipes are rendered
            if (progressModal) {
                progressModal.classList.add('hidden');
                progressModal.style.display = 'none';
            }

            // Show import summary
            this.showImportSummary(result);

            // Clear file input
            const xmlFileInput = document.getElementById('xml-file-input');
            if (xmlFileInput) {
                xmlFileInput.value = '';
            }

            // Close settings modal and go to home after 2 seconds
            setTimeout(() => {
                this.closeSettingsModal();
                this.goToHome();
            }, 2000);

        } catch (error) {
            console.error('[Import] Error importing XML:', error);
            this.showError('Error al importar XML: ' + error.message);
        } finally {
            // Restore button state for both buttons
            if (importBtn) {
                importBtn.disabled = false;
                importBtn.textContent = originalText;
            }
            if (importBtnModal) {
                importBtnModal.disabled = false;
                importBtnModal.textContent = originalTextModal;
            }
        }
    }

    /**
     * Show import summary to user
     * Requirements: 6.4
     * @param {Object} result - Import result object
     */
    showImportSummary(result) {
        const { summary, failed, duplicates } = result;
        const hasDuplicates = duplicates && duplicates.length > 0;

        if (summary.errors === 0 && !hasDuplicates) {
            // All successful, no duplicates
            const message = summary.imported === 1 ?
                '¡Receta importada exitosamente!' :
                `¡${summary.imported} recetas importadas exitosamente!`;
            this.showSuccess(message);
        } else if (summary.errors === 0 && hasDuplicates) {
            // All successful but some duplicates skipped
            if (summary.imported === 0) {
                // All were duplicates
                const message = duplicates.length === 1 ?
                    'La receta ya existe y no se importó' :
                    `Las ${duplicates.length} recetas ya existen y no se importaron`;
                this.showWarning(message);
            } else {
                // Some imported, some duplicates
                const message = `${summary.imported} receta${summary.imported > 1 ? 's' : ''} importada${summary.imported > 1 ? 's' : ''}, ${duplicates.length} ya exist${duplicates.length > 1 ? 'ían' : 'ía'}`;
                this.showSuccess(message);
            }

            // Log duplicate names
            console.log('[Import] Recetas duplicadas omitidas:', duplicates.map(r => r.name));
        } else if (summary.imported > 0) {
            // Partial success with errors
            let message = `${summary.imported} recetas importadas, ${summary.errors} con errores`;
            if (hasDuplicates) {
                message += `, ${duplicates.length} duplicadas`;
            }
            this.showWarning(message);

            // Log detailed errors
            failed.forEach(failure => {
                console.warn(`[Import] Error en ${failure.name}:`, failure.error);
            });
        } else {
            // All failed
            this.showError(`Error al importar recetas: ${failed[0]?.error || 'Error desconocido'}`);
        }
    }

    /**
     * Handle export all button click
     * Requirements: 5.1, 5.2
     */
    handleExportAllClick() {
        try {
            // Determine which recipes to export
            const recipesToExport = this.activeFilters.size > 0 ?
                this.filterRecipes() :
                this.recipes;

            if (recipesToExport.length === 0) {
                this.showWarning('No hay recetas para exportar');
                return;
            }

            // Show loading state for both buttons (header and modal)
            const exportBtn = document.getElementById('export-all-btn');
            const exportBtnModal = document.getElementById('export-all-btn-modal');
            const originalText = exportBtn?.textContent;
            const originalTextModal = exportBtnModal?.textContent;

            if (exportBtn) {
                exportBtn.disabled = true;
                exportBtn.textContent = '⏳ Exportando...';
            }
            if (exportBtnModal) {
                exportBtnModal.disabled = true;
                exportBtnModal.textContent = '⏳ Exportando...';
            }

            // Export recipes
            if (recipesToExport.length === 1) {
                // Single recipe - use existing export
                XMLExporter.exportRecipe(recipesToExport[0]);
            } else {
                // Multiple recipes - use new export functionality
                this.exportMultipleRecipes(recipesToExport);
            }

            // Show success message
            const message = recipesToExport.length === 1 ?
                '¡Receta exportada exitosamente!' :
                `¡${recipesToExport.length} recetas exportadas exitosamente!`;
            this.showSuccess(message);

            // Restore button state for both buttons
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = originalText;
            }
            if (exportBtnModal) {
                exportBtnModal.disabled = false;
                exportBtnModal.textContent = originalTextModal;
            }

        } catch (error) {
            console.error('[Export] Error exporting recipes:', error);
            this.showError('Error al exportar recetas: ' + error.message);

            // Restore button state on error for both buttons
            const exportBtn = document.getElementById('export-all-btn');
            const exportBtnModal = document.getElementById('export-all-btn-modal');
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = '📤 Exportar Todas';
            }
            if (exportBtnModal) {
                exportBtnModal.disabled = false;
                exportBtnModal.textContent = '📤 Exportar';
            }
        }
    }

    /**
     * Export multiple recipes to XML
     * Requirements: 5.3, 5.4, 5.5
     * @param {Recipe[]} recipes - Recipes to export
     */
    exportMultipleRecipes(recipes) {
        try {
            // Generate XML for multiple recipes
            const xmlDoc = document.implementation.createDocument(null, 'recipes');
            const root = xmlDoc.documentElement;

            // Add metadata attributes
            root.setAttribute('count', recipes.length.toString());
            root.setAttribute('exported', new Date().toISOString());

            // Add each recipe
            recipes.forEach(recipe => {
                const recipeXML = XMLExporter.generateXML(recipe);
                const parser = new DOMParser();
                const recipeDoc = parser.parseFromString(recipeXML, 'text/xml');
                const recipeElement = recipeDoc.documentElement;

                // Import the recipe element into our document
                const importedRecipe = xmlDoc.importNode(recipeElement, true);
                root.appendChild(importedRecipe);
            });

            // Serialize to string
            const serializer = new XMLSerializer();
            let xmlString = serializer.serializeToString(xmlDoc);
            xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;

            // Create filename with format: Recetas_[Nombre]_mes-año
            const now = new Date();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = String(now.getFullYear()).slice(-2);
            const ownerName = localStorage.getItem('recipe_book_owner') || 'Usuario';
            const filename = `Recetas_${ownerName}_${month}-${year}.xml`;

            // Download file
            XMLExporter.downloadXML(xmlString, filename);

        } catch (error) {
            console.error('[Export] Error exporting multiple recipes:', error);
            throw error;
        }
    }

    /**
     * Navigate carousel images
     * @param {HTMLElement} carousel - Carousel container
     * @param {number} direction - Direction to navigate (-1 for prev, 1 for next)
     */
    navigateCarousel(carousel, direction) {
        const currentIndex = parseInt(carousel.dataset.currentIndex);
        const totalImages = parseInt(carousel.dataset.totalImages);
        let newIndex = currentIndex + direction;

        // Loop around
        if (newIndex < 0) newIndex = totalImages - 1;
        if (newIndex >= totalImages) newIndex = 0;

        this.goToCarouselImage(carousel, newIndex);
    }

    /**
     * Go to specific carousel image
     * @param {HTMLElement} carousel - Carousel container
     * @param {number} index - Image index to show
     */
    goToCarouselImage(carousel, index) {
        const images = carousel.querySelectorAll('.carousel-images img');
        const dots = carousel.querySelectorAll('.dot');

        // Update active image
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });

        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Update current index
        carousel.dataset.currentIndex = index;
    }

    /**
     * Add touch support for carousel
     * @param {HTMLElement} carousel - Carousel container
     */
    addCarouselTouchSupport(carousel) {
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleCarouselSwipe(carousel, touchStartX, touchEndX);
        }, { passive: true });
    }

    /**
     * Handle swipe gesture
     * @param {HTMLElement} carousel - Carousel container
     * @param {number} startX - Touch start X position
     * @param {number} endX - Touch end X position
     */
    handleCarouselSwipe(carousel, startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                this.navigateCarousel(carousel, 1);
            } else {
                // Swipe right - previous image
                this.navigateCarousel(carousel, -1);
            }
        }
    }

    /**
     * Generate share link for recipe
     * Uses XMLExporter to generate standard XML format
     * @param {Recipe} recipe - Recipe object
     * @returns {string} Share URL
     */
    generateShareLink(recipe) {
        // Use XMLExporter to generate standard XML (without images/videos for URL size)
        // Create a copy of the recipe without images and videos
        const recipeForShare = new Recipe({
            id: recipe.id,
            name: recipe.name,
            category: recipe.category,
            totalTime: recipe.totalTime,
            caravanFriendly: recipe.caravanFriendly,
            ingredients: recipe.ingredients,
            preparationMethod: recipe.preparationMethod,
            kitchenAppliances: recipe.kitchenAppliances,
            author: recipe.author,
            history: recipe.history,
            additionSequences: recipe.additionSequences,
            images: [], // Exclude images from share link (too large for URL)
            videos: [], // Exclude videos from share link (too large for URL)
            createdAt: recipe.createdAt,
            updatedAt: recipe.updatedAt
        });

        // Generate XML using XMLExporter
        const xmlString = XMLExporter.generateXML(recipeForShare);

        // Debug: Log what we're exporting
        console.log('[Share] Exporting recipe:', {
            name: recipe.name,
            author: recipe.author,
            history: recipe.history,
            caravanFriendly: recipe.caravanFriendly,
            ingredientsCount: recipe.ingredients?.length || 0,
            sequencesCount: recipe.additionSequences?.length || 0
        });
        console.log('[Share] Ingredients:', recipe.ingredients);
        console.log('[Share] XML generated length:', xmlString.length);
        console.log('[Share] XML preview:', xmlString.substring(0, 200));

        // Encode XML to Base64 safely (handle Unicode characters)
        // First encode to UTF-8, then to Base64
        const utf8Bytes = new TextEncoder().encode(xmlString);
        let binaryString = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
            binaryString += String.fromCharCode(utf8Bytes[i]);
        }
        const base64Data = btoa(binaryString);

        console.log('[Share] XML length:', xmlString.length);
        console.log('[Share] UTF-8 bytes length:', utf8Bytes.length);
        console.log('[Share] Base64 length:', base64Data.length);

        // URL-encode the Base64 to ensure it's safe in URLs
        const urlSafeBase64 = encodeURIComponent(base64Data);
        console.log('[Share] URL-safe Base64 length:', urlSafeBase64.length);

        const recipeName = encodeURIComponent(recipe.name);
        return `https://gs1lvan.github.io/mehaquedadobien/?r=${recipeName}&import=${urlSafeBase64}`;
    }

    /**
     * Share recipe - generates link and copies to clipboard
     * @param {Recipe} recipe - Recipe object to share
     */
    async showShareRecipe(recipe) {
        const shareLink = this.generateShareLink(recipe);

        // Copy to clipboard
        try {
            await navigator.clipboard.writeText(shareLink);
            showNotification('✓ Receta empaquetada y lista para pegar', 'success');
        } catch (error) {
            showNotification('Error al copiar el enlace', 'error');
        }
    }

    // ===== Shopping Lists Management =====

    /**
     * Initialize shopping lists functionality
     */
    initShoppingLists() {
        console.log('[ShoppingLists] Initializing shopping lists');

        // Get DOM elements
        const newListBtn = document.getElementById('new-shopping-list-btn');
        const importListBtn = document.getElementById('import-shopping-list-btn');
        const importListInput = document.getElementById('import-shopping-list-input');
        const closeShoppingListsBtn = document.getElementById('close-shopping-lists-btn');
        const closeModalBtn = document.getElementById('close-shopping-list-modal');
        const saveBtn = document.getElementById('save-shopping-list-btn');
        const addItemBtn = document.getElementById('add-shopping-item-btn');

        // Setup event listeners
        if (newListBtn) {
            newListBtn.addEventListener('click', () => {
                this.showShoppingListForm();
            });
        }

        if (importListBtn && importListInput) {
            importListBtn.addEventListener('click', () => {
                importListInput.click();
            });

            importListInput.addEventListener('change', (e) => {
                this.handleImportShoppingList(e);
            });
        }

        if (closeShoppingListsBtn) {
            closeShoppingListsBtn.addEventListener('click', () => {
                // Hide shopping lists view
                this.hideShoppingListsView();

                // Show recipe list view
                const recipesView = document.getElementById('recipe-list-view');
                if (recipesView) recipesView.classList.remove('hidden');

                // Show filters and recipe counter
                const filterToggleContainer = document.querySelector('.filter-toggle-container');
                const recipeCounter = document.getElementById('recipe-counter');

                if (filterToggleContainer) filterToggleContainer.classList.remove('hidden');
                if (recipeCounter) recipeCounter.classList.remove('hidden');

                // Update current view
                this.currentView = 'list';

                // Render recipes to ensure they're displayed
                this.renderRecipes();
            });
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeShoppingListModal();
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveShoppingList();
            });
        }

        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => {
                this.addShoppingItemInput();
            });
        }

        // Close modal on overlay click
        const modal = document.getElementById('shopping-list-modal');
        if (modal) {
            const overlay = modal.querySelector('.modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.closeShoppingListModal();
                });
            }
        }
    }

    /**
     * Initialize menus functionality
     */
    initMenus() {
        console.log('[Menus] Initializing menus');

        // Get DOM elements
        const newMenuBtn = document.getElementById('new-menu-btn');
        const importMenuBtn = document.getElementById('import-menu-btn');
        const importMenuInput = document.getElementById('import-menu-input');
        const closeMenusBtn = document.getElementById('close-menus-btn');
        const closeModalBtn = document.getElementById('close-menu-modal');
        const saveBtn = document.getElementById('save-menu-btn');
        const addItemBtn = document.getElementById('add-menu-item-btn');

        // Setup event listeners
        if (newMenuBtn) {
            newMenuBtn.addEventListener('click', () => {
                this.showMenuForm();
            });
        }

        if (importMenuBtn && importMenuInput) {
            importMenuBtn.addEventListener('click', () => {
                importMenuInput.click();
            });

            importMenuInput.addEventListener('change', (e) => {
                this.handleImportMenu(e);
            });
        }

        if (closeMenusBtn) {
            closeMenusBtn.addEventListener('click', () => {
                // Hide menus view
                this.hideMenusView();

                // Show recipe list view
                const recipesView = document.getElementById('recipe-list-view');
                if (recipesView) recipesView.classList.remove('hidden');

                // Show filters and recipe counter
                const filterToggleContainer = document.querySelector('.filter-toggle-container');
                const filtersContainer = document.getElementById('filters-container');
                const recipeCounter = document.getElementById('recipe-counter');

                if (filterToggleContainer) filterToggleContainer.classList.remove('hidden');
                if (filtersContainer) filtersContainer.classList.remove('hidden');
                if (recipeCounter) recipeCounter.classList.remove('hidden');

                // Update current view
                this.currentView = 'list';
            });
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeMenuModal();
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveMenu();
            });
        }

        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => {
                this.addMenuItemInput();
            });
        }

        // Close modal on overlay click
        const modal = document.getElementById('menu-modal');
        if (modal) {
            const overlay = modal.querySelector('.modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.closeMenuModal();
                });
            }
        }
    }

    /**
     * Show shopping lists view
     */
    showShoppingListsView() {
        console.log('[ShoppingLists] Showing shopping lists view');

        // Set flag to prevent restoring expanded state
        this._skipExpandedStateRestore = true;

        // Hide other views
        const recipesView = document.getElementById('recipe-list-view');
        const recipeFormView = document.getElementById('recipe-form-view');
        const recipeDetailView = document.getElementById('recipe-detail-view');
        const shoppingListsView = document.getElementById('shopping-lists-view');
        const menusView = document.getElementById('menus-view');

        if (recipesView) recipesView.classList.add('hidden');
        if (recipeFormView) recipeFormView.classList.add('hidden');
        if (recipeDetailView) recipeDetailView.classList.add('hidden');
        if (shoppingListsView) shoppingListsView.classList.remove('hidden');
        if (menusView) menusView.classList.add('hidden');

        // Hide filters and recipe counter
        const filterToggleContainer = document.querySelector('.filter-toggle-container');
        const filtersContainer = document.getElementById('filters-container');
        const recipeCounter = document.getElementById('recipe-counter');

        if (filterToggleContainer) filterToggleContainer.classList.add('hidden');
        if (filtersContainer) filtersContainer.classList.add('hidden');
        if (recipeCounter) recipeCounter.classList.add('hidden');

        // Update current view
        this.currentView = 'shopping-lists';

        // Render lists
        this.renderShoppingLists();
    }

    /**
     * Hide shopping lists view
     */
    hideShoppingListsView() {
        const shoppingListsView = document.getElementById('shopping-lists-view');
        if (shoppingListsView) {
            shoppingListsView.classList.add('hidden');
        }
    }

    /**
     * Show menus view
     */
    showMenusView() {
        console.log('[Menus] Showing menus view');

        // Set flag to prevent restoring expanded state
        this._skipExpandedStateRestore = true;

        // Hide other views
        const recipesView = document.getElementById('recipe-list-view');
        const recipeFormView = document.getElementById('recipe-form-view');
        const recipeDetailView = document.getElementById('recipe-detail-view');
        const shoppingListsView = document.getElementById('shopping-lists-view');
        const menusView = document.getElementById('menus-view');

        if (recipesView) recipesView.classList.add('hidden');
        if (recipeFormView) recipeFormView.classList.add('hidden');
        if (recipeDetailView) recipeDetailView.classList.add('hidden');
        if (shoppingListsView) shoppingListsView.classList.add('hidden');
        if (menusView) menusView.classList.remove('hidden');

        // Hide filters and recipe counter
        const filterToggleContainer = document.querySelector('.filter-toggle-container');
        const filtersContainer = document.getElementById('filters-container');
        const recipeCounter = document.getElementById('recipe-counter');

        if (filterToggleContainer) filterToggleContainer.classList.add('hidden');
        if (filtersContainer) filtersContainer.classList.add('hidden');
        if (recipeCounter) recipeCounter.classList.add('hidden');

        // Clear shopping lists container to prevent any cross-contamination
        const shoppingListsContainer = document.getElementById('shopping-lists-container');
        if (shoppingListsContainer) {
            // Don't clear it, just ensure it's in the hidden view
            console.log('[Menus] Shopping lists view is hidden');
        }

        // Update current view
        this.currentView = 'menus';

        // Render menus (placeholder for now)
        this.renderMenus();
    }

    /**
     * Hide menus view
     */
    hideMenusView() {
        const menusView = document.getElementById('menus-view');
        if (menusView) {
            menusView.classList.add('hidden');
        }
    }

    /**
     * Render all menus
     */
    renderMenus() {
        const container = document.getElementById('menus-container');
        const emptyState = document.getElementById('menus-empty');

        if (!container) {
            console.error('[Menus] Container not found');
            return;
        }

        // Save expanded state before clearing
        const expandedMenuIds = new Set();
        container.querySelectorAll('.shopping-list-card.expanded').forEach(card => {
            const menuId = card.dataset.menuId;
            if (menuId) {
                expandedMenuIds.add(menuId);
            }
        });

        // Clear container completely
        container.innerHTML = '';

        // Get all menus
        const menus = this.getMenusFromStorage();

        // Show empty state if no menus
        if (menus.length === 0) {
            if (emptyState) {
                emptyState.classList.remove('hidden');
            }
            console.log('[Menus] No menus to display');
            return;
        }

        // Hide empty state
        if (emptyState) {
            emptyState.classList.add('hidden');
        }

        // Render each menu
        menus.forEach(menu => {
            const card = this.renderMenuCard(menu);
            container.appendChild(card);

            // Restore expanded state only if not skipping
            if (!this._skipExpandedStateRestore && expandedMenuIds.has(String(menu.id))) {
                const content = card.querySelector('.shopping-list-content');
                const header = card.querySelector('.shopping-list-header');
                const expandIcon = card.querySelector('.expand-icon');

                if (content && header && expandIcon) {
                    content.classList.remove('collapsed');
                    card.classList.add('expanded');
                    header.setAttribute('aria-expanded', 'true');
                    expandIcon.textContent = '▲';
                }
            }
        });

        // Reset the flag
        this._skipExpandedStateRestore = false;

        console.log('[Menus] Rendered', menus.length, 'menus');
    }

    /**
     * Render a single menu card
     */
    renderMenuCard(menu) {
        const card = document.createElement('div');
        card.className = 'shopping-list-card';
        card.dataset.menuId = menu.id;

        // Add visual indicator if disabled
        if (menu.enabled === false) {
            card.style.opacity = '0.5';
        }

        // Create header
        const header = document.createElement('div');
        header.className = 'shopping-list-header';
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');

        // Make header a flex container for single line layout
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.gap = '1rem';

        const name = document.createElement('h3');
        name.className = 'shopping-list-name';
        name.textContent = menu.name;
        name.style.margin = '0';
        name.style.flex = '0 1 auto';

        // Create right side container (counter + expand icon + actions)
        const rightSide = document.createElement('div');
        rightSide.style.display = 'flex';
        rightSide.style.alignItems = 'center';
        rightSide.style.gap = '0.75rem';
        rightSide.style.flex = '0 0 auto';

        // Create counter container
        const counterContainer = document.createElement('span');
        counterContainer.className = 'shopping-list-counter';

        // Create badge with same style as date-time-badge
        const itemCountBadge = document.createElement('span');
        itemCountBadge.className = 'date-time-badge';
        itemCountBadge.textContent = `${menu.items.length} elemento${menu.items.length !== 1 ? 's' : ''}`;

        counterContainer.appendChild(itemCountBadge);

        const expandIcon = document.createElement('span');
        expandIcon.className = 'expand-icon';
        expandIcon.textContent = '▼';

        // Create actions container
        const actions = document.createElement('div');
        actions.className = 'shopping-list-actions';
        actions.style.display = 'flex';
        actions.style.alignItems = 'center';
        actions.style.gap = '0.25rem';

        // Create more options button (three dots)
        const moreBtn = this.createButton({
            className: 'btn-icon',
            text: '⋮',
            title: 'Más opciones',
            onClick: (e) => {
                e.stopPropagation();
                this.showMenuOptionsModal(menu.id);
            }
        });

        actions.appendChild(moreBtn);

        // Assemble right side
        rightSide.appendChild(counterContainer);
        rightSide.appendChild(expandIcon);
        rightSide.appendChild(actions);

        // Assemble header
        header.appendChild(name);
        header.appendChild(rightSide);

        // Create content (collapsible)
        const content = document.createElement('div');
        content.className = 'shopping-list-content collapsed';

        const itemsContainer = this.renderMenuItems(menu);
        content.appendChild(itemsContainer);

        // Add event listeners for expand/collapse
        header.addEventListener('click', (e) => {
            // Don't toggle if clicking on actions
            if (e.target.closest('.shopping-list-actions')) {
                return;
            }
            this.toggleMenuExpanded(menu.id);
        });

        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleMenuExpanded(menu.id);
            }
        });

        // Assemble card (actions are now inside header)
        card.appendChild(header);
        card.appendChild(content);

        return card;
    }

    /**
     * Render menu items with reorder controls
     */
    renderMenuItems(menu) {
        const container = document.createElement('div');
        container.className = 'shopping-list-items';
        container.style.cssText = `
            background: var(--color-background);
            border-radius: 8px;
            overflow: hidden;
        `;

        if (menu.items.length === 0) {
            const empty = document.createElement('p');
            empty.style.color = 'var(--color-text-secondary)';
            empty.style.fontSize = '0.875rem';
            empty.style.padding = '12px';
            empty.textContent = 'No hay elementos en este menú';
            container.appendChild(empty);
            return container;
        }

        // Add table header
        const headerDiv = document.createElement('div');
        headerDiv.style.cssText = `
            display: grid;
            grid-template-columns: 100px 1fr 1fr;
            gap: 12px;
            padding: 8px;
            background: var(--color-background-secondary);
            border-bottom: 2px solid var(--color-border);
            font-weight: 600;
            font-size: 0.875rem;
            color: var(--color-text-secondary);
        `;

        // Responsive adjustments for mobile
        if (window.innerWidth < 768) {
            // Hide header in mobile since we have inline labels
            headerDiv.style.display = 'none';
        }

        const dayHeader = document.createElement('div');
        dayHeader.textContent = 'Día';

        const lunchHeader = document.createElement('div');
        lunchHeader.textContent = 'Comida';

        const dinnerHeader = document.createElement('div');
        dinnerHeader.textContent = 'Cena';

        headerDiv.appendChild(dayHeader);
        headerDiv.appendChild(lunchHeader);
        headerDiv.appendChild(dinnerHeader);
        container.appendChild(headerDiv);

        menu.items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item-row';
            itemDiv.dataset.itemId = item.id;

            // Day column
            const dayColumn = document.createElement('div');
            dayColumn.className = 'menu-day-column';
            dayColumn.textContent = item.name;

            // Helper function to truncate text
            const truncateText = (text, maxLength = 30) => {
                if (text && text.length > maxLength) {
                    return text.substring(0, maxLength) + '...';
                }
                return text;
            };

            // Lunch column
            const lunchColumn = document.createElement('div');
            lunchColumn.className = 'menu-meal-column';

            // Check if using new format (lunch/dinner) or old format (quantity)
            if (item.lunch && item.lunch !== 'Sin receta') {
                lunchColumn.textContent = truncateText(item.lunch);
                lunchColumn.title = item.lunch; // Show full text on hover
            } else if (item.quantity && item.quantity !== 'Sin receta') {
                // Old format - show as lunch
                lunchColumn.textContent = truncateText(item.quantity);
                lunchColumn.title = item.quantity;
            } else {
                lunchColumn.textContent = '-';
                lunchColumn.style.color = 'var(--color-text-secondary)';
            }

            // Dinner column
            const dinnerColumn = document.createElement('div');
            dinnerColumn.className = 'menu-meal-column';

            if (item.dinner && item.dinner !== 'Sin receta') {
                dinnerColumn.textContent = truncateText(item.dinner);
                dinnerColumn.title = item.dinner; // Show full text on hover
            } else {
                dinnerColumn.textContent = '-';
                dinnerColumn.style.color = 'var(--color-text-secondary)';
            }

            // Assemble based on screen size
            if (window.innerWidth < 768) {
                // Mobile: Day first, then meals in a flex container
                const mealsContainer = document.createElement('div');
                mealsContainer.className = 'menu-meals-container';

                // Add labels for mobile
                const lunchRow = document.createElement('div');
                lunchRow.className = 'menu-meal-row';
                const lunchLabel = document.createElement('span');
                lunchLabel.className = 'menu-meal-label';
                lunchLabel.textContent = 'Comida:';
                lunchRow.appendChild(lunchLabel);
                lunchRow.appendChild(lunchColumn);

                const dinnerRow = document.createElement('div');
                dinnerRow.className = 'menu-meal-row';
                const dinnerLabel = document.createElement('span');
                dinnerLabel.className = 'menu-meal-label';
                dinnerLabel.textContent = 'Cena:';
                dinnerRow.appendChild(dinnerLabel);
                dinnerRow.appendChild(dinnerColumn);

                mealsContainer.appendChild(lunchRow);
                mealsContainer.appendChild(dinnerRow);

                itemDiv.appendChild(dayColumn);
                itemDiv.appendChild(mealsContainer);
            } else {
                // Desktop: Grid layout
                itemDiv.appendChild(dayColumn);
                itemDiv.appendChild(lunchColumn);
                itemDiv.appendChild(dinnerColumn);
            }

            container.appendChild(itemDiv);
        });

        return container;
    }

    /**
     * Toggle menu expanded/collapsed
     */
    toggleMenuExpanded(menuId) {
        const card = document.querySelector(`[data-menu-id="${menuId}"]`);
        if (!card) return;

        const content = card.querySelector('.shopping-list-content');
        const header = card.querySelector('.shopping-list-header');
        const expandIcon = card.querySelector('.expand-icon');

        if (content && header && expandIcon) {
            const isExpanded = !content.classList.contains('collapsed');

            if (isExpanded) {
                // Collapse
                content.classList.add('collapsed');
                card.classList.remove('expanded');
                header.setAttribute('aria-expanded', 'false');
                expandIcon.textContent = '▼';
            } else {
                // Collapse all other menus first (accordion behavior)
                const allCards = document.querySelectorAll('[data-menu-id]');
                allCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherContent = otherCard.querySelector('.shopping-list-content');
                        const otherHeader = otherCard.querySelector('.shopping-list-header');
                        const otherExpandIcon = otherCard.querySelector('.expand-icon');

                        if (otherContent && otherHeader && otherExpandIcon) {
                            otherContent.classList.add('collapsed');
                            otherCard.classList.remove('expanded');
                            otherHeader.setAttribute('aria-expanded', 'false');
                            otherExpandIcon.textContent = '▼';
                        }
                    }
                });

                // Expand this menu
                content.classList.remove('collapsed');
                card.classList.add('expanded');
                header.setAttribute('aria-expanded', 'true');
                expandIcon.textContent = '▲';
            }
        }
    }

    /**
     * Toggle menu enabled/disabled
     */
    toggleMenuEnabled(menuId) {
        const menus = this.getMenusFromStorage();
        const menu = menus.find(m => m.id === menuId);

        if (menu) {
            menu.enabled = menu.enabled === false ? true : false;
            localStorage.setItem('recetario_menus', JSON.stringify(menus));

            const status = menu.enabled ? 'habilitado' : 'deshabilitado';
            this.showToast(`Menú ${status} correctamente`, 'success');
            this.renderMenus();
        }
    }

    /**
     * Move menu item up
     */
    moveMenuItemUp(menuId, itemIndex) {
        if (itemIndex === 0) return;

        const menus = this.getMenusFromStorage();
        const menu = menus.find(m => m.id === menuId);

        if (menu && menu.items) {
            // Swap items
            [menu.items[itemIndex - 1], menu.items[itemIndex]] =
                [menu.items[itemIndex], menu.items[itemIndex - 1]];

            localStorage.setItem('recetario_menus', JSON.stringify(menus));
            this.renderMenus();
        }
    }

    /**
     * Move menu item down
     */
    moveMenuItemDown(menuId, itemIndex) {
        const menus = this.getMenusFromStorage();
        const menu = menus.find(m => m.id === menuId);

        if (menu && menu.items && itemIndex < menu.items.length - 1) {
            // Swap items
            [menu.items[itemIndex], menu.items[itemIndex + 1]] =
                [menu.items[itemIndex + 1], menu.items[itemIndex]];

            localStorage.setItem('recetario_menus', JSON.stringify(menus));
            this.renderMenus();
        }
    }

    /**
     * Show menu options modal
     */
    showMenuOptionsModal(menuId) {
        const modal = document.getElementById('menu-options-modal');
        if (!modal) return;

        // Store current menu ID for actions
        this.currentOptionsMenuId = menuId;

        // Get menu to check enabled state
        const menu = this.getMenuById(menuId);

        // Show modal
        modal.classList.remove('hidden');

        // Setup event listeners
        const closeBtn = document.getElementById('close-menu-options-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const editBtn = document.getElementById('menu-option-edit');
        const toggleBtn = document.getElementById('menu-option-toggle');
        const toggleText = document.getElementById('menu-option-toggle-text');
        const toggleIcon = toggleBtn?.querySelector('.option-icon');
        const exportBtn = document.getElementById('menu-option-export');
        const copyBtn = document.getElementById('menu-option-copy');
        const duplicateBtn = document.getElementById('menu-option-duplicate');
        const deleteBtn = document.getElementById('menu-option-delete');

        // Update toggle button text and icon based on menu state
        if (toggleText && toggleIcon && menu) {
            if (menu.enabled !== false) {
                toggleText.textContent = 'Ocultar';
                toggleIcon.innerHTML = '<i class="fa-regular fa-eye"></i>';
            } else {
                toggleText.textContent = 'Mostrar';
                toggleIcon.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            }
        }

        if (closeBtn) {
            closeBtn.onclick = () => this.closeMenuOptionsModal();
        }

        if (overlay) {
            overlay.onclick = () => this.closeMenuOptionsModal();
        }

        if (editBtn) {
            editBtn.onclick = () => {
                this.showMenuForm(menuId);
                this.closeMenuOptionsModal();
            };
        }

        if (toggleBtn) {
            toggleBtn.onclick = () => {
                this.toggleMenuEnabled(menuId);
                this.closeMenuOptionsModal();
            };
        }

        if (exportBtn) {
            exportBtn.onclick = () => {
                this.exportMenu(menuId);
                this.closeMenuOptionsModal();
            };
        }

        if (copyBtn) {
            copyBtn.onclick = () => {
                this.copyMenuToClipboard(menuId);
                this.closeMenuOptionsModal();
            };
        }

        if (duplicateBtn) {
            duplicateBtn.onclick = () => {
                this.duplicateMenu(menuId);
                this.closeMenuOptionsModal();
            };
        }

        if (deleteBtn) {
            deleteBtn.onclick = () => {
                this.closeMenuOptionsModal();
                this.deleteMenu(menuId);
            };
        }
    }

    /**
     * Close menu options modal
     */
    closeMenuOptionsModal() {
        const modal = document.getElementById('menu-options-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentOptionsMenuId = null;
    }

    /**
     * Export menu to text file
     */
    exportMenu(menuId) {
        const menu = this.getMenuById(menuId);
        if (!menu) return;

        let text = `${menu.name}\n`;
        text += `${'='.repeat(menu.name.length)}\n\n`;

        if (menu.items.length > 0) {
            menu.items.forEach((item, index) => {
                text += `${index + 1}. ${item.name}`;
                if (item.quantity) {
                    text += ` (${item.quantity})`;
                }
                text += '\n';
            });
        } else {
            text += 'Sin elementos\n';
        }

        // Create and download file
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `menu-${menu.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('Menú exportado correctamente', 'success');
    }

    /**
     * Handle menu import from file
     * @param {Event} e - File input change event
     */
    handleImportMenu(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target.result;
                const lines = text.split('\n').map(line => line.trim()).filter(line => line);

                if (lines.length < 2) {
                    this.showToast('Archivo vacío o formato incorrecto', 'error');
                    return;
                }

                // First line is the menu name
                const menuName = lines[0];

                // Skip separator line if present (===)
                let startIndex = 1;
                if (lines[1].match(/^=+$/)) {
                    startIndex = 2;
                }

                // Create new menu
                const newMenu = {
                    id: Date.now(),
                    name: menuName,
                    items: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                // Parse items: "1. Lunes (Filetes a la plancha)"
                for (let i = startIndex; i < lines.length; i++) {
                    const line = lines[i];
                    if (!line || line === 'Sin elementos') continue;

                    // Remove number prefix: "1. "
                    const withoutNumber = line.replace(/^\d+\.\s*/, '');

                    // Extract name and quantity from "Lunes (Filetes a la plancha)"
                    const match = withoutNumber.match(/^(.+?)\s*\((.+)\)$/);

                    if (match) {
                        const name = match[1].trim();
                        const quantity = match[2].trim();

                        newMenu.items.push({
                            id: Date.now() + i,
                            name: name,
                            quantity: quantity
                        });
                    } else {
                        // No parentheses, just the name
                        newMenu.items.push({
                            id: Date.now() + i,
                            name: withoutNumber.trim(),
                            quantity: ''
                        });
                    }
                }

                // Save menu to localStorage
                const menus = this.getMenusFromStorage();
                menus.push(newMenu);
                localStorage.setItem('recetario_menus', JSON.stringify(menus));

                this.showToast('Menú importado correctamente', 'success');
                this.renderMenus();

            } catch (error) {
                console.error('Error importing menu:', error);
                this.showToast('Error al importar el menú', 'error');
            }
        };

        reader.onerror = () => {
            this.showToast('Error al leer el archivo', 'error');
        };

        reader.readAsText(file);

        // Reset input
        e.target.value = '';
    }

    /**
     * Copy menu to clipboard
     */
    copyMenuToClipboard(menuId) {
        const menu = this.getMenuById(menuId);
        if (!menu) return;

        let text = `${menu.name}\n`;
        text += `${'='.repeat(menu.name.length)}\n\n`;

        if (menu.items.length > 0) {
            menu.items.forEach((item, index) => {
                text += `${index + 1}. ${item.name}`;
                if (item.quantity) {
                    text += ` (${item.quantity})`;
                }
                text += '\n';
            });
        } else {
            text += 'Sin elementos\n';
        }

        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Menú copiado al portapapeles', 'success');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
            this.showToast('Error al copiar al portapapeles', 'error');
        });
    }

    /**
     * Duplicate menu
     */
    duplicateMenu(menuId) {
        const menu = this.getMenuById(menuId);
        if (!menu) return;

        const newMenu = {
            ...menu,
            id: Date.now(),
            name: `${menu.name} (copia)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const menus = this.getMenusFromStorage();
        menus.push(newMenu);
        localStorage.setItem('recetario_menus', JSON.stringify(menus));

        this.showToast('Menú duplicado correctamente', 'success');
        this.renderMenus();
    }

    /**
     * Open category selector for menu item (shows all categories to select from)
     */
    openCategorySelectorForMenu(inputElement) {
        // Store reference to the input element
        this.currentMenuCategoryInput = inputElement;

        // Open the category selector modal (same as recipe form)
        const modal = document.getElementById('category-selector-modal');
        if (!modal) return;

        // Clear any pending selection
        this.pendingMenuInput = null;

        // Render categories in modal (without any pre-selection)
        this.renderCategorySelectorChips(false);

        // Remove any selected class from all chips (ensure clean state)
        const container = document.getElementById('category-selector-chips');
        if (container) {
            container.querySelectorAll('.category-selector-chip').forEach(chip => {
                chip.classList.remove('selected');
            });
        }

        // Hide footer initially (show only when category is selected)
        const footer = document.getElementById('category-selector-footer');
        if (footer) {
            footer.style.display = 'none';
        }

        // Show modal
        modal.classList.remove('hidden');

        // Setup close handlers
        const closeBtn = document.getElementById('close-category-selector-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const viewRecipesBtn = document.getElementById('category-view-recipes-btn');

        const closeModal = () => {
            modal.classList.add('hidden');
            if (footer) footer.style.display = 'none';
            this.currentMenuCategoryInput = null;
            this.pendingMenuInput = null;
        };

        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }

        if (overlay) {
            overlay.onclick = closeModal;
        }

        // "Confirmar" button - close modal and keep category selection
        const confirmBtn = document.getElementById('category-confirm-btn');
        if (confirmBtn) {
            confirmBtn.onclick = () => {
                // If user selected a category (stored in dataset), use it
                if (this.currentMenuCategoryInput && this.currentMenuCategoryInput.dataset.categoryId) {
                    const categoryId = this.currentMenuCategoryInput.dataset.categoryId;
                    const category = this.categoryManager.getCategoryById(categoryId);

                    if (category) {
                        // Set the category name as the value (without recipe)
                        this.currentMenuCategoryInput.value = `${category.emoji} ${category.name}`;
                        // Keep the categoryId in dataset for future reference
                        this.currentMenuCategoryInput.dataset.categoryId = categoryId;
                    }
                } else if (this.currentMenuCategoryInput && !this.currentMenuCategoryInput.value) {
                    // If no category selected, clear the input
                    this.currentMenuCategoryInput.placeholder = 'Comida (opcional)';
                    delete this.currentMenuCategoryInput.dataset.categoryId;
                }

                // Close the category selector modal
                modal.classList.add('hidden');
                if (footer) footer.style.display = 'none';

                // Clear references
                this.pendingMenuInput = null;
                this.currentMenuCategoryInput = null;
            };
        }

        // "Ver Recetas" button - open recipes modal
        if (viewRecipesBtn) {
            viewRecipesBtn.onclick = () => {
                // Prevent action if button is disabled
                if (viewRecipesBtn.disabled) {
                    return;
                }

                if (this.pendingMenuInput) {
                    modal.classList.add('hidden');
                    if (footer) footer.style.display = 'none';

                    setTimeout(() => {
                        this.openMenuCategorySelectorModal(this.pendingMenuInput);
                        this.pendingMenuInput = null;
                        this.currentMenuCategoryInput = null;
                    }, 300);
                }
            };
        }
    }

    /**
     * Open menu category selector modal (for selecting recipes by category)
     */
    openMenuCategorySelectorModal(inputElement) {
        const modal = document.getElementById('menu-category-selector-modal');
        if (!modal) return;

        // Store reference to the input element
        this.currentRecipeInput = inputElement;

        // Get category filter if one is selected
        const selectedCategoryId = inputElement.dataset.categoryId;

        // Get all recipes marked as menu-friendly, filtered by category if selected
        let menuRecipes = this.recipes.filter(recipe => recipe.menuFriendly === true);

        if (selectedCategoryId) {
            // Filter by selected category
            menuRecipes = menuRecipes.filter(recipe => recipe.category === selectedCategoryId);
        }

        // Check if there are any menu recipes
        const emptyState = document.getElementById('category-selection-empty');
        const categoryList = document.getElementById('category-selection-list');

        if (menuRecipes.length === 0) {
            // Show empty state
            if (emptyState) emptyState.classList.remove('hidden');
            if (categoryList) categoryList.classList.add('hidden');

            // Show modal
            modal.classList.remove('hidden');
            this.setupCategorySelectorModalListeners();
        } else if (selectedCategoryId) {
            // Category already selected - skip category selection and go directly to recipe selection
            this.convertInputToRecipeSelector(inputElement, menuRecipes);
            // Don't show the modal at all
            return;
        } else {
            // No category selected - show category selection
            if (emptyState) emptyState.classList.add('hidden');
            if (categoryList) categoryList.classList.remove('hidden');

            // Get categories with menu recipes
            const categoriesWithMenuRecipes = this.getCategoriesWithMenuRecipes(menuRecipes);

            // Render category badges
            this.renderCategorySelectionBadges(categoriesWithMenuRecipes);

            // Show modal
            modal.classList.remove('hidden');
            this.setupCategorySelectorModalListeners();
        }
    }

    /**
     * Get categories that have recipes marked as menu
     */
    getCategoriesWithMenuRecipes(menuRecipes) {
        const categoriesMap = new Map();

        menuRecipes.forEach(recipe => {
            const categoryId = recipe.category || NO_CATEGORY_ID;
            if (!categoriesMap.has(categoryId)) {
                categoriesMap.set(categoryId, {
                    id: categoryId,
                    label: this.getCategoryLabel(categoryId),
                    emoji: this.getCategoryEmoji(categoryId),
                    count: 0
                });
            }
            categoriesMap.get(categoryId).count++;
        });

        return Array.from(categoriesMap.values());
    }

    /**
     * Render category selection badges
     */
    renderCategorySelectionBadges(categories) {
        const container = document.getElementById('category-selection-list');
        if (!container) return;

        container.innerHTML = '';

        categories.forEach(category => {
            const badge = document.createElement('div');
            badge.className = 'category-selection-badge';
            badge.dataset.categoryId = category.id;

            const emoji = document.createElement('span');
            emoji.className = 'category-emoji';
            emoji.textContent = category.emoji;

            const label = document.createElement('span');
            // Extract only the name without emoji from the label
            const categoryObj = this.categoryManager.getCategoryById(category.id);
            label.textContent = categoryObj ? categoryObj.name : category.id;

            const count = document.createElement('span');
            count.className = 'category-count';
            count.textContent = `(${category.count})`;

            badge.appendChild(emoji);
            badge.appendChild(label);
            badge.appendChild(count);

            // Click handler to toggle selection
            badge.addEventListener('click', () => {
                badge.classList.toggle('selected');
            });

            container.appendChild(badge);
        });
    }

    /**
     * Setup category selector modal listeners
     */
    setupCategorySelectorModalListeners() {
        const modal = document.getElementById('menu-category-selector-modal');
        const closeBtn = document.getElementById('close-menu-category-selector-modal');
        const confirmBtn = document.getElementById('confirm-category-selection-btn');
        const overlay = modal.querySelector('.modal-overlay');

        // Remove old listeners
        if (this.categorySelectorListeners) {
            this.categorySelectorListeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
        }

        this.categorySelectorListeners = [];

        // Close button
        const closeHandler = () => this.closeCategorySelectorModal();
        if (closeBtn) {
            closeBtn.addEventListener('click', closeHandler);
            this.categorySelectorListeners.push({ element: closeBtn, event: 'click', handler: closeHandler });
        }

        // Overlay
        if (overlay) {
            overlay.addEventListener('click', closeHandler);
            this.categorySelectorListeners.push({ element: overlay, event: 'click', handler: closeHandler });
        }

        // Confirm button
        const confirmHandler = () => this.confirmCategorySelection();
        if (confirmBtn) {
            confirmBtn.addEventListener('click', confirmHandler);
            this.categorySelectorListeners.push({ element: confirmBtn, event: 'click', handler: confirmHandler });
        }
    }

    /**
     * Close category selector modal
     */
    closeCategorySelectorModal() {
        const modal = document.getElementById('menu-category-selector-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    /**
     * Confirm category selection and convert input to recipe selector
     */
    confirmCategorySelection() {
        const selectedBadges = document.querySelectorAll('.category-selection-badge.selected');
        const selectedCategoryIds = Array.from(selectedBadges).map(badge => badge.dataset.categoryId);

        if (selectedCategoryIds.length === 0) {
            this.showToast('Por favor, selecciona al menos una categoría', 'warning');
            return;
        }

        // Get recipes from selected categories
        const menuRecipes = this.recipes.filter(recipe =>
            recipe.menuFriendly === true &&
            selectedCategoryIds.includes(recipe.category || NO_CATEGORY_ID)
        );

        // Convert input to select dropdown
        this.convertInputToRecipeSelector(this.currentRecipeInput, menuRecipes);

        // Close modal
        this.closeCategorySelectorModal();
    }

    /**
     * Convert input to recipe selector dropdown
     * @returns {HTMLSelectElement} The created select element
     */
    convertInputToRecipeSelector(inputElement, recipes) {
        if (!inputElement) return null;

        // Create select element
        const select = document.createElement('select');
        select.className = 'form-input';

        // Preserve meal type data attribute
        if (inputElement.dataset.mealType) {
            select.dataset.mealType = inputElement.dataset.mealType;
        }

        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '-- Seleccionar receta --';
        select.appendChild(emptyOption);

        // Add recipe options
        recipes.forEach(recipe => {
            const option = document.createElement('option');
            option.value = recipe.id;
            option.textContent = `${recipe.name} (${this.getCategoryLabel(recipe.category)})`;
            option.dataset.recipeName = recipe.name;
            select.appendChild(option);
        });

        // Set selected value if input had a value
        if (inputElement.value) {
            // Try to find matching recipe by name
            const matchingOption = Array.from(select.options).find(opt =>
                opt.dataset.recipeName === inputElement.value
            );
            if (matchingOption) {
                select.value = matchingOption.value;
            }
        }

        // Add change listener to show save button when recipe is selected
        select.addEventListener('change', () => {
            this.checkAndShowSaveButton();
        });

        // Replace input with select
        inputElement.parentNode.replaceChild(select, inputElement);

        // Check if save button should be shown after replacement
        this.checkAndShowSaveButton();

        // Return the select element
        return select;
    }

    // ============================================
    // FUNCIÓN: openMenuRecipeSelectorModal (ACTIVA)
    // Muestra modal personalizada para seleccionar recetas
    // ============================================
    openMenuRecipeSelectorModal(inputElement, recipes, category) {
        const modal = document.getElementById('menu-recipe-selector-modal');
        if (!modal) {
            console.error('Modal menu-recipe-selector-modal not found');
            return;
        }

        // Store reference
        this.currentMenuRecipeInput = inputElement;
        this.selectedRecipeId = null;

        // Update modal title
        const title = document.getElementById('menu-recipe-selector-title');
        if (title && category) {
            title.textContent = `${category.emoji} ${category.name}`;
        }

        // Render recipes
        const recipeList = document.getElementById('menu-recipe-list');
        const emptyState = document.getElementById('menu-recipe-empty');
        const confirmBtn = document.getElementById('confirm-recipe-selection-btn');

        if (recipes.length === 0) {
            if (recipeList) recipeList.classList.add('hidden');
            if (emptyState) emptyState.classList.remove('hidden');
            if (confirmBtn) confirmBtn.disabled = true;
        } else {
            if (recipeList) {
                recipeList.classList.remove('hidden');
                recipeList.innerHTML = '';

                recipes.forEach(recipe => {
                    const item = document.createElement('div');
                    item.className = 'menu-recipe-item';
                    item.dataset.recipeId = recipe.id;

                    // Image
                    const img = document.createElement('img');
                    img.className = 'menu-recipe-item-image';

                    // Get the main image (first one) or use placeholder
                    const placeholderSvg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60"%3E%3Crect fill="%23f0f0f0" width="60" height="60"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3E🍽️%3C/text%3E%3C/svg%3E';

                    if (recipe.images && recipe.images.length > 0) {
                        // Images are MediaFile objects with .data property containing base64
                        const firstImage = recipe.images[0];
                        img.src = firstImage.data || firstImage; // Support both MediaFile objects and direct base64
                        // Fallback to placeholder if image fails to load
                        img.onerror = () => {
                            img.src = placeholderSvg;
                        };
                    } else {
                        img.src = placeholderSvg;
                    }

                    img.alt = recipe.name;
                    img.loading = 'lazy'; // Lazy loading for better performance

                    // Info
                    const info = document.createElement('div');
                    info.className = 'menu-recipe-item-info';

                    // Name
                    const name = document.createElement('div');
                    name.className = 'menu-recipe-item-name';
                    name.textContent = recipe.name;

                    const categoryLabel = document.createElement('div');
                    categoryLabel.className = 'menu-recipe-item-category';
                    categoryLabel.textContent = this.getCategoryLabel(recipe.category);

                    info.appendChild(name);
                    info.appendChild(categoryLabel);

                    item.appendChild(img);
                    item.appendChild(info);

                    // Click handler
                    item.onclick = () => {
                        // Remove selected from all
                        recipeList.querySelectorAll('.menu-recipe-item').forEach(i => {
                            i.classList.remove('selected');
                        });
                        // Add selected to this
                        item.classList.add('selected');
                        this.selectedRecipeId = recipe.id;
                        // Enable confirm button
                        if (confirmBtn) confirmBtn.disabled = false;
                    };

                    // Double click handler - same as confirm button
                    item.ondblclick = () => {
                        // Select the recipe first
                        this.selectedRecipeId = recipe.id;

                        // Execute confirm action
                        if (this.currentMenuRecipeInput) {
                            // Set recipe name in input
                            this.currentMenuRecipeInput.value = recipe.name;
                            this.currentMenuRecipeInput.dataset.recipeId = recipe.id;
                            this.currentMenuRecipeInput.dataset.categoryId = recipe.category;
                        }

                        // Close modal
                        modal.classList.add('hidden');
                        this.currentMenuRecipeInput = null;
                        this.selectedRecipeId = null;

                        // Show save button
                        this.checkAndShowSaveButton();
                    };

                    recipeList.appendChild(item);
                });
            }
            if (emptyState) emptyState.classList.add('hidden');
        }

        // Show modal
        modal.classList.remove('hidden');

        // Setup close handlers
        const closeBtn = document.getElementById('close-menu-recipe-selector-modal');
        const cancelBtn = document.getElementById('cancel-recipe-selection-btn');
        const overlay = modal.querySelector('.modal-overlay');

        const closeModal = () => {
            modal.classList.add('hidden');
            this.currentMenuRecipeInput = null;
            this.selectedRecipeId = null;
        };

        if (closeBtn) closeBtn.onclick = closeModal;
        if (cancelBtn) cancelBtn.onclick = closeModal;
        if (overlay) overlay.onclick = closeModal;

        // Confirm button
        if (confirmBtn) {
            confirmBtn.onclick = () => {
                if (this.selectedRecipeId && this.currentMenuRecipeInput) {
                    const selectedRecipe = recipes.find(r => r.id === this.selectedRecipeId);
                    if (selectedRecipe) {
                        // Set recipe name in input
                        this.currentMenuRecipeInput.value = selectedRecipe.name;
                        this.currentMenuRecipeInput.dataset.recipeId = selectedRecipe.id;
                        this.currentMenuRecipeInput.dataset.categoryId = selectedRecipe.category;
                    }
                }
                closeModal();
                // Show save button
                this.checkAndShowSaveButton();
            };
        }
    }

    /**
     * Delete menu
     */
    deleteMenu(menuId) {
        if (!confirm('¿Estás seguro de que quieres eliminar este menú?')) {
            return;
        }

        const menus = this.getMenusFromStorage();
        const filteredMenus = menus.filter(m => m.id !== menuId);
        localStorage.setItem('recetario_menus', JSON.stringify(filteredMenus));

        this.showToast('Menú eliminado correctamente', 'success');
        this.renderMenus();
    }

    /**
     * Show menu form
     * @param {number|null} menuId - Menu ID for editing, null for creating
     */
    showMenuForm(menuId = null) {
        const modal = document.getElementById('menu-modal');
        const title = document.getElementById('menu-modal-title');
        const nameInput = document.getElementById('menu-name-input');
        const newItemsContainer = document.getElementById('menu-new-items-container');
        const existingItemsContainer = document.getElementById('menu-existing-items-container');

        if (!modal || !title || !nameInput || !newItemsContainer || !existingItemsContainer) return;

        // Clear form
        nameInput.value = '';
        newItemsContainer.innerHTML = '';
        existingItemsContainer.innerHTML = '';

        // Set mode
        this.currentMenuId = menuId;

        // Get add element button
        const addElementBtn = document.getElementById('add-menu-item-btn');
        console.log('[Menu Form] Add element button found:', !!addElementBtn);
        if (addElementBtn) {
            console.log('[Menu Form] Button classes before:', addElementBtn.className);
            console.log('[Menu Form] Button display before:', window.getComputedStyle(addElementBtn).display);
        }

        if (menuId) {
            // Edit mode
            title.textContent = 'Editar Menú';
            console.log('[Menu Form] Mode: EDIT');

            // Show "Añadir Elemento" button in edit mode
            if (addElementBtn) {
                addElementBtn.style.removeProperty('display');
                console.log('[Menu Form] Removed display property');
                console.log('[Menu Form] Button display after:', window.getComputedStyle(addElementBtn).display);
            }

            // Load menu data
            const menu = this.getMenuById(menuId);
            if (menu) {
                nameInput.value = menu.name;

                // Load existing items
                if (menu.items && menu.items.length > 0) {
                    menu.items.forEach(item => {
                        this.addMenuItemInput(item, true);
                    });
                } else {
                    // Add one empty item if no items exist
                    this.addMenuItemInput(null, false);
                }
            }
        } else {
            // Create mode
            title.textContent = 'Nuevo Menú';
            console.log('[Menu Form] Mode: CREATE');

            // Hide "Añadir Elemento" button in create mode
            if (addElementBtn) {
                addElementBtn.style.setProperty('display', 'none', 'important');
                console.log('[Menu Form] Set display to none with !important');
                console.log('[Menu Form] Button display after:', window.getComputedStyle(addElementBtn).display);
            }

            // Add 7 days automatically (Monday to Sunday)
            const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            daysOfWeek.forEach(day => {
                this.addMenuItemInput({ name: day, lunch: '', dinner: '' }, false);
            });

            // Hide save button initially (will show when first recipe is selected)
            const saveBtn = document.getElementById('save-menu-btn');
            if (saveBtn) {
                saveBtn.style.display = 'none';
            }
        }

        // Show modal
        modal.classList.remove('hidden');

        // Check if save button should be visible (for edit mode)
        if (menuId) {
            const saveBtn = document.getElementById('save-menu-btn');
            if (saveBtn) {
                saveBtn.style.display = '';
            }
        }
    }

    /**
     * Close menu modal
     */
    closeMenuModal() {
        const modal = document.getElementById('menu-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    /**
     * Add menu item input to form
     * @param {Object|null} item - Item data for editing, null for new item
     * @param {boolean} isExisting - Whether this is an existing item
     */
    addMenuItemInput(item = null, isExisting = false) {
        console.log('🔵 [addMenuItemInput] Called with:', { item, isExisting });

        const newContainer = document.getElementById('menu-new-items-container');
        const existingContainer = document.getElementById('menu-existing-items-container');

        const container = isExisting ? existingContainer : newContainer;
        if (!container) return;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item-input';
        if (item) itemDiv.dataset.itemId = item.id;

        // Add separator border between days
        itemDiv.style.borderBottom = '1px solid var(--color-border)';
        itemDiv.style.paddingBottom = '12px';
        itemDiv.style.marginBottom = '12px';

        if (isExisting) {
            itemDiv.classList.add('existing-item');
        }

        // Day selector (dropdown or readonly input)
        let dayElement;

        if (item && item.name && !isExisting) {
            // For new menus with predefined days, use readonly input
            dayElement = document.createElement('input');
            dayElement.type = 'text';
            dayElement.className = 'form-input';
            dayElement.value = item.name;
            dayElement.readOnly = true;
            dayElement.style.backgroundColor = 'var(--color-background-secondary)';
            dayElement.style.cursor = 'default';
        } else {
            // For editing existing menus, use dropdown
            dayElement = document.createElement('select');
            dayElement.className = 'form-input';

            // Add empty option (optional) - disabled and selected by default
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = '-- Seleccionar día --';
            emptyOption.disabled = true;
            emptyOption.selected = true;
            dayElement.appendChild(emptyOption);

            // Add days of the week
            const daysOfWeek = [
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado',
                'Domingo'
            ];

            daysOfWeek.forEach(day => {
                const option = document.createElement('option');
                option.value = day;
                option.textContent = day;
                dayElement.appendChild(option);
            });

            // Set selected value if editing
            if (item && item.name) {
                dayElement.value = item.name;
            }
        }

        // Comida recipe selector input
        const lunchInput = document.createElement('input');
        lunchInput.type = 'text';
        lunchInput.className = 'form-input recipe-selector-input';
        lunchInput.placeholder = 'Comida (opcional)';
        lunchInput.readOnly = true;
        lunchInput.style.cursor = 'pointer';
        // Support old format (quantity) and new format (lunch)
        lunchInput.value = item ? (item.lunch || item.quantity || '') : '';
        lunchInput.dataset.itemId = item ? item.id : Date.now();
        lunchInput.dataset.mealType = 'lunch';

        // Click handler to open category selector for lunch
        lunchInput.addEventListener('click', () => {
            this.openCategorySelectorForMenu(lunchInput);
        });

        // Listen for changes to show save button
        lunchInput.addEventListener('input', () => {
            this.checkAndShowSaveButton();
        });

        // Cena recipe selector input
        const dinnerInput = document.createElement('input');
        dinnerInput.type = 'text';
        dinnerInput.className = 'form-input recipe-selector-input';
        dinnerInput.placeholder = 'Cena (opcional)';
        dinnerInput.readOnly = true;
        dinnerInput.style.cursor = 'pointer';
        dinnerInput.value = item && item.dinner ? item.dinner : '';
        dinnerInput.dataset.itemId = item ? item.id : Date.now();
        dinnerInput.dataset.mealType = 'dinner';

        // Click handler to open category selector for dinner
        dinnerInput.addEventListener('click', () => {
            this.openCategorySelectorForMenu(dinnerInput);
        });

        // Listen for changes to show save button
        dinnerInput.addEventListener('input', () => {
            this.checkAndShowSaveButton();
        });

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'menu-item-buttons';

        // Move up button
        const moveUpBtn = document.createElement('button');
        moveUpBtn.className = 'btn-icon reorder-btn';
        moveUpBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        moveUpBtn.title = 'Mover arriba';
        moveUpBtn.onclick = () => this.moveMenuItemUp(itemDiv);

        // Move down button
        const moveDownBtn = document.createElement('button');
        moveDownBtn.className = 'btn-icon reorder-btn';
        moveDownBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        moveDownBtn.title = 'Mover abajo';
        moveDownBtn.onclick = () => this.moveMenuItemDown(itemDiv);

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-icon';
        removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        removeBtn.title = 'Eliminar elemento';
        removeBtn.onclick = () => itemDiv.remove();

        buttonsContainer.appendChild(moveUpBtn);
        buttonsContainer.appendChild(moveDownBtn);
        buttonsContainer.appendChild(removeBtn);

        itemDiv.appendChild(dayElement);
        itemDiv.appendChild(lunchInput);
        itemDiv.appendChild(dinnerInput);
        itemDiv.appendChild(buttonsContainer);

        container.appendChild(itemDiv);

        // Focus on lunch input for new items with predefined day
        if (item && item.name && !isExisting) {
            lunchInput.focus();
        } else if (!item && dayElement.tagName === 'SELECT') {
            dayElement.focus();
        }
    }

    /**
     * Check if any recipe is selected and show save button
     */
    checkAndShowSaveButton() {
        const saveBtn = document.getElementById('save-menu-btn');
        if (!saveBtn) return;

        // Check all recipe inputs (lunch and dinner)
        const allInputs = document.querySelectorAll('.recipe-selector-input');
        let hasRecipe = false;

        allInputs.forEach(input => {
            if (input.value && input.value.trim() !== '' && input.value !== 'Sin receta') {
                hasRecipe = true;
            }
        });

        // Show or hide save button
        saveBtn.style.display = hasRecipe ? '' : 'none';
    }

    /**
     * Move menu item up
     */
    moveMenuItemUp(itemDiv) {
        const previousSibling = itemDiv.previousElementSibling;
        if (previousSibling) {
            itemDiv.parentNode.insertBefore(itemDiv, previousSibling);
        }
    }

    /**
     * Move menu item down
     */
    moveMenuItemDown(itemDiv) {
        const nextSibling = itemDiv.nextElementSibling;
        if (nextSibling) {
            itemDiv.parentNode.insertBefore(nextSibling, itemDiv);
        }
    }

    /**
     * Save menu
     */
    saveMenu() {
        const nameInput = document.getElementById('menu-name-input');
        const newItemsContainer = document.getElementById('menu-new-items-container');
        const existingItemsContainer = document.getElementById('menu-existing-items-container');

        if (!nameInput) return;

        const menuName = nameInput.value.trim();

        if (!menuName) {
            alert('Por favor, introduce un nombre para el menú');
            nameInput.focus();
            return;
        }

        // Collect all items (new and existing) - using menu-item-input class
        const allItemDivs = [
            ...newItemsContainer.querySelectorAll('.menu-item-input'),
            ...existingItemsContainer.querySelectorAll('.menu-item-input')
        ];

        // Constants for default values
        const DEFAULT_DAY = 'Sin día específico';
        const DEFAULT_RECIPE = 'Sin receta';

        const items = [];
        let itemIdCounter = Date.now();

        allItemDivs.forEach((itemDiv, index) => {
            // Get day - can be either input (readonly) or select
            const dayInput = itemDiv.querySelector('input[type="text"]:not([data-meal-type])');
            const daySelect = itemDiv.querySelector('select:first-of-type');
            const dayElement = dayInput || daySelect;

            // Get lunch and dinner - can be either input or select
            const lunchElement = itemDiv.querySelector('input[data-meal-type="lunch"], select[data-meal-type="lunch"]');
            const dinnerElement = itemDiv.querySelector('input[data-meal-type="dinner"], select[data-meal-type="dinner"]');

            const dayValue = dayElement?.value || '';
            let lunchValue = '';
            let dinnerValue = '';

            // Get lunch value (from input or select)
            if (lunchElement) {
                if (lunchElement.tagName === 'SELECT') {
                    const selectedOption = lunchElement.options[lunchElement.selectedIndex];
                    lunchValue = selectedOption?.dataset.recipeName || selectedOption?.textContent || '';
                } else {
                    lunchValue = lunchElement.value || '';
                }
            }

            // Get dinner value (from input or select)
            if (dinnerElement) {
                if (dinnerElement.tagName === 'SELECT') {
                    const selectedOption = dinnerElement.options[dinnerElement.selectedIndex];
                    dinnerValue = selectedOption?.dataset.recipeName || selectedOption?.textContent || '';
                } else {
                    dinnerValue = dinnerElement.value || '';
                }
            }

            // Only add the item if it has at least one recipe (lunch OR dinner)
            const hasLunch = lunchValue && lunchValue.trim() !== '' && lunchValue !== DEFAULT_RECIPE;
            const hasDinner = dinnerValue && dinnerValue.trim() !== '' && dinnerValue !== DEFAULT_RECIPE;

            if (hasLunch || hasDinner) {
                items.push({
                    id: itemIdCounter++, // Guaranteed unique IDs
                    name: dayValue || DEFAULT_DAY,
                    lunch: lunchValue || DEFAULT_RECIPE,
                    dinner: dinnerValue || DEFAULT_RECIPE,
                    completed: false // Inherited from shopping list structure, not used for menus
                });
            }
        });

        // Create menu object
        const menu = {
            id: this.currentMenuId || Date.now(),
            name: menuName,
            items: items,
            createdAt: this.currentMenuId ? this.getMenuById(this.currentMenuId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save to localStorage
        const menus = this.getMenusFromStorage();
        const existingIndex = menus.findIndex(m => m.id === menu.id);

        if (existingIndex >= 0) {
            menus[existingIndex] = menu;
            console.log('[Menus] Menu updated:', menu);
        } else {
            menus.push(menu);
            console.log('[Menus] Menu created:', menu);
        }

        localStorage.setItem('recetario_menus', JSON.stringify(menus));

        this.showToast(`Menú "${menuName}" guardado correctamente`, 'success');

        // Close modal
        this.closeMenuModal();

        // Refresh menus view
        this.renderMenus();
    }

    /**
     * Get menus from localStorage
     */
    getMenusFromStorage() {
        try {
            const menusJson = localStorage.getItem('recetario_menus');
            return menusJson ? JSON.parse(menusJson) : [];
        } catch (error) {
            console.error('[Menus] Error loading menus:', error);
            return [];
        }
    }

    /**
     * Get menu by ID
     */
    getMenuById(menuId) {
        const menus = this.getMenusFromStorage();
        return menus.find(m => m.id === menuId);
    }

    /**
     * Render all shopping lists
     */
    renderShoppingLists() {
        const container = document.getElementById('shopping-lists-container');
        const emptyState = document.getElementById('shopping-lists-empty');

        if (!container) return;

        // Clear container
        container.innerHTML = '';

        // Get all lists
        const lists = this.shoppingListManager.lists;

        // Show empty state if no lists
        if (lists.length === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        // Hide empty state
        if (emptyState) emptyState.classList.add('hidden');

        // Render each list
        lists.forEach(list => {
            const card = this.renderShoppingListCard(list);
            container.appendChild(card);
        });
    }

    /**
     * Render a single shopping list card
     * @param {Object} list - Shopping list object
     * @returns {HTMLElement} Card element
     */
    renderShoppingListCard(list) {
        const card = document.createElement('div');
        card.className = 'shopping-list-card';
        card.dataset.listId = list.id;

        // Make card draggable
        card.draggable = true;
        card.addEventListener('dragstart', (e) => this.handleListDragStart(e));
        card.addEventListener('dragend', (e) => this.handleListDragEnd(e));
        card.addEventListener('dragover', (e) => this.handleListDragOver(e));
        card.addEventListener('drop', (e) => this.handleListDrop(e));

        // Get total count
        const totalCount = this.shoppingListManager.getTotalCount(list.id);

        // Create header
        const header = document.createElement('div');
        header.className = 'shopping-list-header';
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');

        const name = document.createElement('h3');
        name.className = 'shopping-list-name';
        name.textContent = list.name;

        const dateInfo = document.createElement('span');
        dateInfo.className = 'shopping-list-counter';

        // Show modified date if exists, otherwise created date
        const dateToShow = list.updatedAt || list.createdAt;

        if (dateToShow) {
            const date = new Date(dateToShow);
            const formattedDate = date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const formattedTime = date.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });

            // Check if modified in the last 5 minutes
            const now = new Date();
            const diffInMinutes = (now - date) / (1000 * 60);
            const isRecentlyModified = diffInMinutes <= 5;

            // Create single badge with date and time
            const dateTimeBadge = document.createElement('span');
            dateTimeBadge.className = isRecentlyModified ? 'date-time-badge recent-modification' : 'date-time-badge';
            dateTimeBadge.innerHTML = `${formattedDate} <span class="badge-separator">|</span> ${formattedTime}`;

            dateInfo.appendChild(dateTimeBadge);
        } else {
            dateInfo.textContent = `${totalCount} ${totalCount === 1 ? 'cosa que comprar' : 'cosas que comprar'}`;
        }

        const expandIcon = document.createElement('span');
        expandIcon.className = 'expand-icon';
        expandIcon.textContent = '▼';

        // Create more options button (three dots)
        const moreBtn = this.createButton({
            className: 'btn-icon',
            text: '⋮',
            title: 'Más opciones',
            onClick: (e) => {
                e.stopPropagation();
                this.showShoppingListOptionsModal(list.id);
            }
        });

        header.appendChild(name);
        header.appendChild(dateInfo);
        header.appendChild(expandIcon);
        header.appendChild(moreBtn);

        // Add visual indicator if disabled
        if (list.enabled === false) {
            card.style.opacity = '0.5';
        }

        // Create content (collapsible)
        const content = document.createElement('div');
        content.className = 'shopping-list-content collapsed';

        const itemsContainer = this.renderShoppingItems(list);
        content.appendChild(itemsContainer);

        // Add event listeners for expand/collapse
        header.addEventListener('click', () => {
            this.toggleListExpanded(list.id);
        });

        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleListExpanded(list.id);
            }
        });

        // Assemble card
        card.appendChild(header);
        card.appendChild(content);

        return card;
    }

    /**
     * Render shopping items for a list
     * @param {Object} list - Shopping list object
     * @returns {HTMLElement} Items container
     */
    renderShoppingItems(list) {
        const container = document.createElement('div');
        container.className = 'shopping-list-items';

        if (list.items.length === 0) {
            const empty = document.createElement('p');
            empty.style.color = 'var(--color-text-secondary)';
            empty.style.fontSize = '0.875rem';
            empty.textContent = 'No hay elementos en esta lista';
            container.appendChild(empty);
            return container;
        }

        list.items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'shopping-item';
            itemDiv.dataset.itemId = item.id;

            // Bullet point
            const bullet = document.createElement('span');
            bullet.className = 'shopping-item-bullet';
            bullet.textContent = '•';

            // Item content
            const itemContent = document.createElement('div');
            itemContent.className = 'shopping-item-content';

            const itemName = document.createElement('span');
            itemName.className = 'shopping-item-name';
            itemName.textContent = item.name;

            itemContent.appendChild(itemName);

            if (item.quantity) {
                const itemQuantity = document.createElement('span');
                itemQuantity.className = 'shopping-item-quantity';
                itemQuantity.textContent = ` (${item.quantity})`;
                itemContent.appendChild(itemQuantity);
            }

            itemDiv.appendChild(bullet);
            itemDiv.appendChild(itemContent);

            container.appendChild(itemDiv);
        });

        return container;
    }

    /**
     * Move item up in the list
     * @param {number} listId - List ID
     * @param {number} index - Current index of the item
     */
    moveItemUp(listId, index) {
        if (index === 0) return; // Already at top

        const list = this.shoppingListManager.getList(listId);
        if (!list) return;

        // Save expanded state before re-rendering
        const wasExpanded = this.isListExpanded(listId);

        // Swap items
        [list.items[index - 1], list.items[index]] = [list.items[index], list.items[index - 1]];

        // Save and re-render
        this.shoppingListManager.saveLists();
        this.renderShoppingLists();

        // Restore expanded state
        if (wasExpanded) {
            this.expandList(listId);
        }
    }

    /**
     * Move item down in the list
     * @param {number} listId - List ID
     * @param {number} index - Current index of the item
     */
    moveItemDown(listId, index) {
        const list = this.shoppingListManager.getList(listId);
        if (!list || index === list.items.length - 1) return; // Already at bottom

        // Save expanded state before re-rendering
        const wasExpanded = this.isListExpanded(listId);

        // Swap items
        [list.items[index], list.items[index + 1]] = [list.items[index + 1], list.items[index]];

        // Save and re-render
        this.shoppingListManager.saveLists();
        this.renderShoppingLists();

        // Restore expanded state
        if (wasExpanded) {
            this.expandList(listId);
        }
    }

    /**
     * Toggle list expanded/collapsed state
     * @param {number} listId - List ID
     */
    toggleListExpanded(listId) {
        const card = document.querySelector(`.shopping-list-card[data-list-id="${listId}"]`);
        if (!card) return;

        const header = card.querySelector('.shopping-list-header');
        const content = card.querySelector('.shopping-list-content');

        if (!header || !content) return;

        // Check if this list is currently collapsed
        const isCollapsed = content.classList.contains('collapsed');

        // If we're about to expand this list, first collapse all other lists
        if (isCollapsed) {
            const allCards = document.querySelectorAll('.shopping-list-card');
            allCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherHeader = otherCard.querySelector('.shopping-list-header');
                    const otherContent = otherCard.querySelector('.shopping-list-content');

                    if (otherHeader && otherContent) {
                        otherContent.classList.add('collapsed');
                        otherHeader.classList.remove('expanded');
                        otherCard.classList.remove('expanded');
                        otherHeader.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        }

        // Toggle collapsed class for the clicked list
        content.classList.toggle('collapsed');
        header.classList.toggle('expanded', isCollapsed);
        card.classList.toggle('expanded', isCollapsed);

        // Update aria-expanded
        header.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
    }

    /**
     * Check if a list is currently expanded
     * @param {number} listId - List ID
     * @returns {boolean} True if expanded, false if collapsed
     */
    isListExpanded(listId) {
        const card = document.querySelector(`.shopping-list-card[data-list-id="${listId}"]`);
        if (!card) return false;

        const content = card.querySelector('.shopping-list-content');
        if (!content) return false;

        return !content.classList.contains('collapsed');
    }

    /**
     * Expand a list (remove collapsed state)
     * @param {number} listId - List ID
     */
    expandList(listId) {
        const card = document.querySelector(`.shopping-list-card[data-list-id="${listId}"]`);
        if (!card) return;

        const header = card.querySelector('.shopping-list-header');
        const content = card.querySelector('.shopping-list-content');

        if (!header || !content) return;

        // Remove collapsed class
        content.classList.remove('collapsed');
        header.classList.add('expanded');
        card.classList.add('expanded');

        // Update aria-expanded
        header.setAttribute('aria-expanded', 'true');
    }

    /**
     * Toggle item completed state
     * @param {number} listId - List ID
     * @param {number} itemId - Item ID
     */
    toggleItemCompleted(listId, itemId) {
        const newState = this.shoppingListManager.toggleItemCompleted(listId, itemId);

        if (newState === null) {
            console.error('[ShoppingLists] Failed to toggle item completed');
            return;
        }

        // Re-render the list to update UI
        this.renderShoppingLists();
    }

    /**
     * Show shopping list form (create or edit)
     * @param {number|null} listId - List ID for editing, null for creating
     */
    showShoppingListForm(listId = null) {
        const modal = document.getElementById('shopping-list-modal');
        const title = document.getElementById('shopping-list-modal-title');
        const nameInput = document.getElementById('shopping-list-name-input');
        const newItemsContainer = document.getElementById('shopping-new-items-container');
        const existingItemsContainer = document.getElementById('shopping-existing-items-container');

        if (!modal || !title || !nameInput || !newItemsContainer || !existingItemsContainer) return;

        // Clear form
        nameInput.value = '';
        newItemsContainer.innerHTML = '';
        existingItemsContainer.innerHTML = '';

        // Set mode
        this.shoppingListManager.currentListId = listId;

        if (listId) {
            // Edit mode
            title.textContent = 'Editar Lista de Compra';
            const list = this.shoppingListManager.getList(listId);

            if (list) {
                nameInput.value = list.name;

                // Add existing items (marked as existing so they appear at the bottom)
                list.items.forEach(item => {
                    this.addShoppingItemInput(item, true);
                });
            }
        } else {
            // Create mode
            title.textContent = 'Nueva Lista de Compra';

            // Add one empty item input (new item, appears at top)
            this.addShoppingItemInput(null, false);
        }

        // Show modal
        modal.classList.remove('hidden');
    }

    /**
     * Add shopping item input to form
     * @param {Object|null} item - Item data for editing, null for new item
     * @param {boolean} isExisting - Whether this is an existing item (add at bottom) or new (add at top)
     */
    addShoppingItemInput(item = null, isExisting = false) {
        // Use different containers for new and existing items
        const newContainer = document.getElementById('shopping-new-items-container');
        const existingContainer = document.getElementById('shopping-existing-items-container');

        const container = isExisting ? existingContainer : newContainer;
        if (!container) return;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'shopping-item-input';
        if (item) itemDiv.dataset.itemId = item.id;

        // Mark existing items with a class for visual distinction
        if (isExisting) {
            itemDiv.classList.add('existing-item');

            // Check if this is the first existing item
            const existingItems = existingContainer.querySelectorAll('.existing-item');
            if (existingItems.length === 0) {
                itemDiv.classList.add('first-existing');
            }
        }

        // Name input (first row)
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'form-input shopping-item-name-input';
        nameInput.placeholder = 'Nombre del elemento';
        nameInput.value = item ? item.name : '';

        // Quantity input (second row)
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.className = 'form-input shopping-item-quantity-input';
        quantityInput.placeholder = 'Cantidad, alternativas o posibilidades';
        quantityInput.value = item ? item.quantity : '';

        // Create buttons container (same pattern as menu items)
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'shopping-item-buttons';

        // Move up button
        const moveUpBtn = document.createElement('button');
        moveUpBtn.className = 'btn-icon reorder-btn';
        moveUpBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        moveUpBtn.title = 'Mover arriba';
        moveUpBtn.onclick = () => {
            const sibling = itemDiv.previousElementSibling;
            if (sibling && sibling.classList.contains('shopping-item-input')) {
                container.insertBefore(itemDiv, sibling);
            }
        };

        // Move down button
        const moveDownBtn = document.createElement('button');
        moveDownBtn.className = 'btn-icon reorder-btn';
        moveDownBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        moveDownBtn.title = 'Mover abajo';
        moveDownBtn.onclick = () => {
            const sibling = itemDiv.nextElementSibling;
            if (sibling && sibling.classList.contains('shopping-item-input')) {
                container.insertBefore(sibling, itemDiv);
            }
        };

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-icon';
        removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        removeBtn.title = 'Eliminar';
        removeBtn.onclick = () => itemDiv.remove();

        buttonsContainer.appendChild(moveUpBtn);
        buttonsContainer.appendChild(moveDownBtn);
        buttonsContainer.appendChild(removeBtn);

        // Assemble item div
        itemDiv.appendChild(nameInput);
        itemDiv.appendChild(quantityInput);
        itemDiv.appendChild(buttonsContainer);

        // Add to the appropriate container
        // For new items: prepend (add at the top, right after the button)
        // For existing items: append (add at the bottom)
        if (isExisting) {
            container.appendChild(itemDiv);
        } else {
            container.prepend(itemDiv);
        }

        // Focus on the name input for new items
        if (!isExisting) {
            nameInput.focus();
        }
    }

    /**
     * Create reorder buttons for shopping list items
     * @param {HTMLElement} itemDiv - The item div to reorder
     * @param {HTMLElement} container - The container holding the items
     * @returns {HTMLElement} Container with up/down buttons
     */
    createReorderButtons(itemDiv, container) {
        const ITEM_CLASS = 'shopping-item-input';

        const reorderButtons = document.createElement('div');
        reorderButtons.className = 'shopping-item-reorder-buttons';

        /**
         * Helper to create a reorder button
         * @param {string} direction - 'up' or 'down'
         * @returns {HTMLElement} Button element
         */
        const createButton = (direction) => {
            const isUp = direction === 'up';
            const btn = document.createElement('button');
            btn.type = 'button'; // Prevent form submission
            btn.className = 'modal-trigger modal-trigger--button modal-trigger--action modal-trigger--move';
            btn.title = isUp ? 'Mover arriba' : 'Mover abajo';
            btn.innerHTML = isUp ? '<i class="fa-solid fa-arrow-up"></i>' : '<i class="fa-solid fa-arrow-down"></i>';
            btn.setAttribute('aria-label', btn.title);

            // Use event delegation pattern for better performance
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const sibling = isUp
                    ? itemDiv.previousElementSibling
                    : itemDiv.nextElementSibling;

                if (sibling && sibling.classList.contains(ITEM_CLASS)) {
                    if (isUp) {
                        container.insertBefore(itemDiv, sibling);
                    } else {
                        container.insertBefore(sibling, itemDiv);
                    }

                    // Update visual feedback
                    itemDiv.classList.add('reordered');
                    setTimeout(() => itemDiv.classList.remove('reordered'), 300);

                    // Announce to screen readers
                    this.announceToScreenReader(`Elemento movido ${isUp ? 'arriba' : 'abajo'}`);
                }
            });

            return btn;
        };

        reorderButtons.appendChild(createButton('up'));
        reorderButtons.appendChild(createButton('down'));

        return reorderButtons;
    }

    /**
     * Announce message to screen readers
     * @param {string} message - Message to announce
     */
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);

        // Remove after announcement
        setTimeout(() => announcement.remove(), 1000);
    }

    /**
     * Create a button element with common properties
     * Factory method to reduce code duplication
     * @param {Object} config - Button configuration
     * @param {string} config.className - CSS class name(s)
     * @param {string} config.text - Button text/emoji
     * @param {string} config.title - Tooltip text
     * @param {string} [config.ariaLabel] - ARIA label (defaults to title)
     * @param {Function} config.onClick - Click handler
     * @param {string} [config.type='button'] - Button type
     * @returns {HTMLButtonElement} Configured button element
     */
    createButton(config) {
        const {
            className,
            text,
            title,
            ariaLabel = title,
            onClick,
            type = 'button'
        } = config;

        const btn = document.createElement('button');
        btn.type = type;
        btn.className = className;
        btn.title = title;
        btn.textContent = text;
        btn.setAttribute('aria-label', ariaLabel);

        if (onClick) {
            btn.addEventListener('click', onClick);
        }

        return btn;
    }

    /**
     * Save shopping list (create or update)
     */
    saveShoppingList() {
        const nameInput = document.getElementById('shopping-list-name-input');
        const newItemsContainer = document.getElementById('shopping-new-items-container');
        const existingItemsContainer = document.getElementById('shopping-existing-items-container');

        if (!nameInput || !newItemsContainer || !existingItemsContainer) return;

        // Validate name
        const name = nameInput.value.trim();
        if (!name) {
            this.showToast('Por favor ingresa un nombre para la lista', 'error');
            return;
        }

        // Get items from both containers (new items first, then existing)
        const allItemInputs = [
            ...newItemsContainer.querySelectorAll('.shopping-item-input'),
            ...existingItemsContainer.querySelectorAll('.shopping-item-input')
        ];

        const items = [];

        allItemInputs.forEach(itemDiv => {
            const nameInput = itemDiv.querySelector('.shopping-item-name-input');
            const quantityInput = itemDiv.querySelector('.shopping-item-quantity-input');

            const itemName = nameInput.value.trim();
            if (itemName) {
                items.push({
                    name: itemName,
                    quantity: quantityInput.value.trim()
                });
            }
        });

        // Save list
        const listId = this.shoppingListManager.currentListId;

        if (listId) {
            // Update existing list
            const list = this.shoppingListManager.getList(listId);
            if (list) {
                list.name = name;
                list.items = items.map((item, index) => ({
                    id: list.items[index]?.id || Date.now() + index,
                    name: item.name,
                    quantity: item.quantity,
                    completed: list.items[index]?.completed || false
                }));
                list.updatedAt = new Date().toISOString();
                this.shoppingListManager.saveLists();
                this.showToast('Lista actualizada correctamente', 'success');
            }
        } else {
            // Create new list
            const newList = this.shoppingListManager.createList(name);
            items.forEach(item => {
                this.shoppingListManager.addItem(newList.id, item);
            });
            this.showToast('Lista creada correctamente', 'success');
        }

        // Close modal and refresh view
        this.closeShoppingListModal();
        this.renderShoppingLists();
    }

    /**
     * Toggle shopping list enabled status
     * @param {number} listId - List ID
     */
    toggleShoppingListEnabled(listId) {
        const list = this.shoppingListManager.getList(listId);
        if (!list) return;

        const success = this.shoppingListManager.toggleListEnabled(listId);

        if (success) {
            const status = list.enabled ? 'habilitada' : 'deshabilitada';
            this.showToast(`Lista ${status} correctamente`, 'success');
            this.renderShoppingLists();
        }
    }

    /**
     * Delete shopping list with confirmation
     * @param {number} listId - List ID
     */
    deleteShoppingList(listId) {
        const list = this.shoppingListManager.getList(listId);
        if (!list) return;

        const confirmed = confirm(`¿Estás seguro de que quieres eliminar la lista "${list.name}"?`);

        if (confirmed) {
            this.shoppingListManager.deleteList(listId);
            this.showToast('Lista eliminada correctamente', 'success');
            this.renderShoppingLists();
        }
    }

    /**
     * Duplicate shopping list
     * @param {number} listId - List ID to duplicate
     */
    duplicateShoppingList(listId) {
        const originalList = this.shoppingListManager.getList(listId);
        if (!originalList) return;

        // Create new list with copied data
        const newListName = `${originalList.name} (copia)`;
        const newList = this.shoppingListManager.createList(newListName);

        // Copy all items from original list
        originalList.items.forEach(item => {
            this.shoppingListManager.addItem(newList.id, {
                name: item.name,
                quantity: item.quantity
            });
        });

        this.showToast('Lista duplicada correctamente', 'success');
        this.renderShoppingLists();
    }

    /**
     * Export shopping list to text file
     * @param {number} listId - List ID
     */
    exportShoppingList(listId) {
        const list = this.shoppingListManager.getList(listId);
        if (!list) {
            this.showToast('Error: Lista no encontrada', 'error');
            return;
        }

        // Format list content
        const text = this.shoppingListManager.formatListForClipboard(listId, true);

        if (!text) {
            this.showToast('Error al exportar la lista', 'error');
            return;
        }

        // Create blob and download
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        // Generate filename with sanitized list name
        const sanitizedName = list.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const timestamp = new Date().toISOString().split('T')[0];
        link.download = `lista_compra_${sanitizedName}_${timestamp}.txt`;

        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showToast('Lista exportada correctamente', 'success');
    }

    /**
     * Handle import shopping list from file
     * @param {Event} e - File input change event
     */
    handleImportShoppingList(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target.result;
                const lines = text.split('\n').map(line => line.trim()).filter(line => line);

                if (lines.length < 2) {
                    this.showToast('Archivo vacío o formato incorrecto', 'error');
                    return;
                }

                // First line is the list name
                const listName = lines[0];

                // Skip separator line if present
                let startIndex = 1;
                if (lines[1].startsWith('---')) {
                    startIndex = 2;
                }

                // Create new list
                const newList = this.shoppingListManager.createList(listName);

                // Parse items
                for (let i = startIndex; i < lines.length; i++) {
                    const line = lines[i];
                    if (!line) continue;

                    // Remove completed mark if present
                    const cleanLine = line.replace(/^✓\s*/, '');

                    // Split by " - " to separate name and quantity
                    const parts = cleanLine.split(' - ');
                    const name = parts[0].trim();
                    const quantity = parts.length > 1 ? parts.slice(1).join(' - ').trim() : '';

                    if (name) {
                        this.shoppingListManager.addItem(newList.id, {
                            name: name,
                            quantity: quantity
                        });
                    }
                }

                this.showToast('Lista importada correctamente', 'success');
                this.renderShoppingLists();

            } catch (error) {
                console.error('Error importing shopping list:', error);
                this.showToast('Error al importar la lista', 'error');
            }
        };

        reader.onerror = () => {
            this.showToast('Error al leer el archivo', 'error');
        };

        reader.readAsText(file);

        // Reset input so the same file can be imported again
        e.target.value = '';
    }

    /**
     * Copy shopping list to clipboard
     * @param {number} listId - List ID
     * @param {boolean} includeCompleted - Whether to include completed items
     */
    copyShoppingListToClipboard(listId, includeCompleted = false) {
        const text = this.shoppingListManager.formatListForClipboard(listId, includeCompleted);

        if (!text) {
            this.showToast('Error al copiar la lista', 'error');
            return;
        }

        // Try to copy using Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    this.showToast('Lista copiada al portapapeles', 'success');
                })
                .catch(err => {
                    console.error('[ShoppingLists] Error copying to clipboard:', err);
                    this.fallbackCopyToClipboard(text);
                });
        } else {
            // Fallback for older browsers
            this.fallbackCopyToClipboard(text);
        }
    }

    /**
     * Fallback method to copy text to clipboard
     * @param {string} text - Text to copy
     */
    fallbackCopyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.showToast('Lista copiada al portapapeles', 'success');
            } else {
                this.showToast('Error al copiar la lista', 'error');
            }
        } catch (err) {
            console.error('[ShoppingLists] Fallback copy failed:', err);
            this.showToast('Error al copiar la lista', 'error');
        }

        document.body.removeChild(textarea);
    }

    /**
     * Close shopping list modal
     */
    closeShoppingListModal() {
        const modal = document.getElementById('shopping-list-modal');
        if (modal) {
            modal.classList.add('hidden');
        }

        // Reset current list ID
        this.shoppingListManager.currentListId = null;
    }

    /**
     * Show modal to select shopping list for ingredient
     * @param {string} ingredientName - Name of the ingredient
     * @param {string} ingredientQuantity - Quantity of the ingredient
     * @param {string} recipeName - Name of the recipe
     * @param {string} categoryId - Category ID of the recipe
     */
    showSelectShoppingListModal(ingredientName, ingredientQuantity, recipeName, categoryId = null) {
        const modal = document.getElementById('select-shopping-list-modal');
        const ingredientDisplay = document.getElementById('ingredient-to-add-display');
        const listsContainer = document.getElementById('shopping-lists-selection');

        if (!modal || !ingredientDisplay || !listsContainer) return;

        // Display ingredient info with quantity and recipe name
        let displayText = ingredientName;
        if (ingredientQuantity) {
            displayText += ` - ${ingredientQuantity}`;
        }
        if (recipeName) {
            displayText += ` - para ${recipeName}`;
        }
        ingredientDisplay.textContent = displayText;

        // Clear previous lists
        listsContainer.innerHTML = '';

        // Get all shopping lists (only enabled ones)
        const lists = this.shoppingListManager.lists.filter(list => list.enabled !== false);

        if (lists.length === 0) {
            listsContainer.innerHTML = '<p class="modal-description">No tienes listas de compra habilitadas. Crea una nueva lista o habilita una existente para añadir este ingrediente.</p>';
        } else {
            // Render each list as an option
            lists.forEach(list => {
                const option = document.createElement('div');
                option.className = 'shopping-list-option';

                const nameSpan = document.createElement('span');
                nameSpan.className = 'shopping-list-option-name';
                nameSpan.textContent = list.name;

                const countSpan = document.createElement('span');
                countSpan.className = 'shopping-list-option-count';
                countSpan.textContent = `${list.items.length} elementos`;

                option.appendChild(nameSpan);
                option.appendChild(countSpan);

                option.addEventListener('click', () => {
                    this.addIngredientToShoppingList(list.id, ingredientName, ingredientQuantity, recipeName, categoryId);
                });

                listsContainer.appendChild(option);
            });
        }

        // Show modal
        modal.classList.remove('hidden');

        // Setup close button and overlay
        const closeBtn = document.getElementById('close-select-list-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const createNewBtn = document.getElementById('create-new-list-from-ingredient');

        if (closeBtn) {
            closeBtn.onclick = () => this.closeSelectShoppingListModal();
        }

        if (overlay) {
            overlay.onclick = () => this.closeSelectShoppingListModal();
        }

        if (createNewBtn) {
            createNewBtn.onclick = () => {
                this.closeSelectShoppingListModal();
                this.showShoppingListForm();
            };
        }
    }

    /**
     * Close select shopping list modal
     */
    closeSelectShoppingListModal() {
        const modal = document.getElementById('select-shopping-list-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    /**
     * Add ingredient to shopping list
     * @param {number} listId - Shopping list ID
     * @param {string} ingredientName - Ingredient name
     * @param {string} ingredientQuantity - Ingredient quantity
     */
    addIngredientToShoppingList(listId, ingredientName, ingredientQuantity, recipeName, categoryId = null) {
        // Build quantity string with ingredient quantity and recipe name
        let quantityText = '';

        // Add category emoji if available
        if (categoryId) {
            const category = this.categoryManager.getCategoryById(categoryId);
            if (category && category.emoji) {
                quantityText = category.emoji;
            }
        }

        if (ingredientQuantity) {
            quantityText += quantityText ? ` ${ingredientQuantity}` : ingredientQuantity;
        }
        if (recipeName) {
            quantityText += quantityText ? ` - para ${recipeName}` : `para ${recipeName}`;
        }
        if (!quantityText) {
            quantityText = 'para receta';
        }

        this.shoppingListManager.addItem(listId, {
            name: ingredientName,
            quantity: quantityText
        });

        this.closeSelectShoppingListModal();
        this.showToast(`"${ingredientName}" añadido a la lista`, 'success');
    }

    /**
     * Show shopping list options modal
     * @param {number} listId - Shopping list ID
     */
    showShoppingListOptionsModal(listId) {
        const modal = document.getElementById('shopping-list-options-modal');
        if (!modal) return;

        // Store current list ID for actions
        this.currentOptionsListId = listId;

        // Get list to check enabled state
        const list = this.shoppingListManager.getList(listId);

        // Show modal
        modal.classList.remove('hidden');

        // Setup event listeners
        const closeBtn = document.getElementById('close-options-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const editBtn = document.getElementById('option-edit');
        const toggleBtn = document.getElementById('option-toggle');
        const toggleText = document.getElementById('option-toggle-text');
        const toggleIcon = toggleBtn?.querySelector('.option-icon');
        const exportBtn = document.getElementById('option-export');
        const copyBtn = document.getElementById('option-copy');
        const duplicateBtn = document.getElementById('option-duplicate');
        const deleteBtn = document.getElementById('option-delete');

        // Update toggle button text and icon based on list state
        if (toggleText && toggleIcon && list) {
            if (list.enabled !== false) {
                toggleText.textContent = 'Ocultar';
                toggleIcon.innerHTML = '<i class="fa-regular fa-eye"></i>';
            } else {
                toggleText.textContent = 'Mostrar';
                toggleIcon.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            }
        }

        if (closeBtn) {
            closeBtn.onclick = () => this.closeShoppingListOptionsModal();
        }

        if (overlay) {
            overlay.onclick = () => this.closeShoppingListOptionsModal();
        }

        if (editBtn) {
            editBtn.onclick = () => {
                this.showShoppingListForm(listId);
                this.closeShoppingListOptionsModal();
            };
        }

        if (toggleBtn) {
            toggleBtn.onclick = () => {
                this.toggleShoppingListEnabled(listId);
                this.closeShoppingListOptionsModal();
            };
        }

        if (exportBtn) {
            exportBtn.onclick = () => {
                this.exportShoppingList(listId);
                this.closeShoppingListOptionsModal();
            };
        }

        if (copyBtn) {
            copyBtn.onclick = () => {
                this.copyShoppingListToClipboard(listId, false);
                this.closeShoppingListOptionsModal();
            };
        }

        if (duplicateBtn) {
            duplicateBtn.onclick = () => {
                this.duplicateShoppingList(listId);
                this.closeShoppingListOptionsModal();
            };
        }

        if (deleteBtn) {
            deleteBtn.onclick = () => {
                this.closeShoppingListOptionsModal();
                this.deleteShoppingList(listId);
            };
        }
    }

    /**
     * Close shopping list options modal
     */
    closeShoppingListOptionsModal() {
        const modal = document.getElementById('shopping-list-options-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentOptionsListId = null;
    }

    // ===== Drag and Drop for Lists =====

    /**
     * Handle drag start for list cards
     */
    handleListDragStart(e) {
        e.stopPropagation();
        const card = e.target.closest('.shopping-list-card');
        if (!card) return;

        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', card.dataset.listId);
    }

    /**
     * Handle drag end for list cards
     */
    handleListDragEnd(e) {
        const card = e.target.closest('.shopping-list-card');
        if (!card) return;

        card.classList.remove('dragging');

        // Remove all drag-over classes
        document.querySelectorAll('.shopping-list-card.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
    }

    /**
     * Handle drag over for list cards
     */
    handleListDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';

        const card = e.target.closest('.shopping-list-card');
        if (!card || card.classList.contains('dragging')) return;

        card.classList.add('drag-over');
    }

    /**
     * Handle drop for list cards
     */
    handleListDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        const targetCard = e.target.closest('.shopping-list-card');
        if (!targetCard || targetCard.classList.contains('dragging')) return;

        targetCard.classList.remove('drag-over');

        const draggedListId = parseInt(e.dataTransfer.getData('text/plain'));
        const targetListId = parseInt(targetCard.dataset.listId);

        if (draggedListId === targetListId) return;

        // Reorder lists
        const lists = this.shoppingListManager.lists;
        const draggedIndex = lists.findIndex(l => l.id === draggedListId);
        const targetIndex = lists.findIndex(l => l.id === targetListId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        // Remove dragged list and insert at target position
        const [draggedList] = lists.splice(draggedIndex, 1);
        lists.splice(targetIndex, 0, draggedList);

        // Save and re-render
        this.shoppingListManager.saveLists();
        this.renderShoppingLists();
    }

    // ===== End Shopping Lists Management =====

}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.recipeApp = new RecipeApp();
});













/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-danger)' : 'var(--color-primary)'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


// ============================================================================
// SERVICE WORKER REGISTRATION AND UPDATE HANDLING
// ============================================================================

/**
 * Register service worker and handle updates
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('[App] Service Worker registrado exitosamente:', registration.scope);

                // Verificar actualizaciones cada hora
                setInterval(() => {
                    registration.update();
                }, 60 * 60 * 1000);

                // Manejar actualizaciones del service worker
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('[App] Nueva versión del Service Worker encontrada');

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Hay una nueva versión disponible
                            console.log('[App] Nueva versión disponible');
                            showUpdateNotification(newWorker);
                        }
                    });
                });
            })
            .catch(error => {
                console.error('[App] Error al registrar Service Worker:', error);
            });

        // Escuchar cuando el service worker toma control
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('[App] Service Worker actualizado, recargando página...');
            window.location.reload();
        });
    });
}

/**
 * Show update notification to user
 * @param {ServiceWorker} newWorker - The new service worker
 */
function showUpdateNotification(newWorker) {
    // Crear notificación de actualización
    const updateBanner = document.createElement('div');
    updateBanner.className = 'update-banner';
    updateBanner.innerHTML = `
        <div class="update-banner-content">
            <span class="update-banner-icon">🔄</span>
            <div class="update-banner-text">
                <strong>Nueva versión disponible</strong>
                <p>Hay una actualización de la aplicación lista para instalar</p>
            </div>
            <div class="update-banner-actions">
                <button id="update-now-btn" class="btn-update">Actualizar ahora</button>
                <button id="update-later-btn" class="btn-update-later">Más tarde</button>
            </div>
        </div>
    `;

    document.body.appendChild(updateBanner);

    // Manejar botón de actualizar
    document.getElementById('update-now-btn').addEventListener('click', () => {
        // Enviar mensaje al service worker para que se active inmediatamente
        newWorker.postMessage({ type: 'SKIP_WAITING' });
    });

    // Manejar botón de más tarde
    document.getElementById('update-later-btn').addEventListener('click', () => {
        updateBanner.remove();
    });
}

/**
 * Check if app is running in standalone mode (installed as PWA)
 */
function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
}

/**
 * Show install prompt for PWA
 */
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('[App] Evento beforeinstallprompt disparado');
    // Prevenir que Chrome muestre el prompt automáticamente
    e.preventDefault();
    // Guardar el evento para usarlo después
    deferredPrompt = e;

    // Banner de instalación desactivado
    // if (!isStandalone()) {
    //     showInstallButton();
    // }
});

/**
 * Show custom install button
 */
function showInstallButton() {
    const installBanner = document.createElement('div');
    installBanner.className = 'install-banner';
    installBanner.innerHTML = `
        <div class="install-banner-content">
            <span class="install-banner-icon">📱</span>
            <div class="install-banner-text">
                <strong>Instalar Recetario Personal</strong>
                <p>Instala la app para acceder más rápido y usarla sin conexión</p>
            </div>
            <div class="install-banner-actions">
                <button id="install-app-btn" class="btn-install">Instalar</button>
                <button id="install-dismiss-btn" class="btn-install-dismiss">✕</button>
            </div>
        </div>
    `;

    document.body.appendChild(installBanner);

    // Manejar botón de instalar
    document.getElementById('install-app-btn').addEventListener('click', async () => {
        if (deferredPrompt) {
            // Mostrar el prompt de instalación
            deferredPrompt.prompt();
            // Esperar la respuesta del usuario
            const { outcome } = await deferredPrompt.userChoice;
            console.log('[App] Usuario respondió al prompt de instalación:', outcome);

            if (outcome === 'accepted') {
                console.log('[App] Usuario aceptó instalar la PWA');
            } else {
                console.log('[App] Usuario rechazó instalar la PWA');
            }

            // Limpiar el prompt
            deferredPrompt = null;
            installBanner.remove();
        }
    });

    // Manejar botón de cerrar
    document.getElementById('install-dismiss-btn').addEventListener('click', () => {
        installBanner.remove();
        // Guardar en localStorage que el usuario cerró el banner
        localStorage.setItem('installBannerDismissed', 'true');
    });

    // No mostrar si el usuario ya lo cerró antes
    if (localStorage.getItem('installBannerDismissed') === 'true') {
        installBanner.remove();
    }
}

// Detectar cuando la app fue instalada
window.addEventListener('appinstalled', () => {
    console.log('[App] PWA instalada exitosamente');
    deferredPrompt = null;

    // Remover banner de instalación si existe
    const installBanner = document.querySelector('.install-banner');
    if (installBanner) {
        installBanner.remove();
    }
});

// Log si la app está corriendo en modo standalone
if (isStandalone()) {
    console.log('[App] Corriendo en modo standalone (PWA instalada)');
}


