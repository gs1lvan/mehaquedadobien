/**
 * ShoppingListService - Manages shopping lists and their items
 * 
 * Handles CRUD operations for shopping lists and items,
 * with persistence in localStorage and event emission.
 */
export class ShoppingListService {
    constructor(storage, eventBus = null) {
        this.storage = storage;
        this.eventBus = eventBus;
        this.storageKey = 'shopping_lists';
        this.lists = [];
        this.currentListId = null;
        this.loadLists();
    }

    /**
     * Load shopping lists from storage
     */
    loadLists() {
        try {
            const stored = this.storage.get(this.storageKey, null);
            if (stored) {
                this.lists = stored;

                // Migrate old lists without enabled property
                this.lists.forEach(list => {
                    if (list.enabled === undefined) {
                        list.enabled = true;
                    }
                });

                console.log('[ShoppingListService] Loaded lists:', this.lists.length);
            }
        } catch (error) {
            console.error('[ShoppingListService] Error loading lists:', error);
            this.lists = [];
        }
    }

    /**
     * Save shopping lists to storage
     */
    saveLists() {
        try {
            this.storage.set(this.storageKey, this.lists);
            console.log('[ShoppingListService] Saved lists:', this.lists.length);
        } catch (error) {
            console.error('[ShoppingListService] Error saving lists:', error);
            throw new Error('No se pudieron guardar las listas');
        }
    }

    /**
     * Get all shopping lists
     * @returns {Array} All shopping lists
     */
    getAll() {
        return [...this.lists];
    }

    /**
     * Get a shopping list by ID
     * @param {number} id - List ID
     * @returns {Object|null} The list or null if not found
     */
    getById(id) {
        return this.lists.find(list => list.id === id) || null;
    }

    /**
     * Create a new shopping list
     * @param {string} name - Name of the list
     * @returns {Object} The created list
     */
    create(name) {
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

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('shoppingList:created', list);
        }

        console.log('[ShoppingListService] Created list:', list.id, list.name);
        return list;
    }

    /**
     * Update a shopping list
     * @param {number} id - List ID
     * @param {Object} updates - Updates to apply
     * @returns {Object|null} The updated list or null if not found
     */
    update(id, updates) {
        const list = this.getById(id);
        if (!list) {
            console.error('[ShoppingListService] List not found:', id);
            return null;
        }

        Object.assign(list, updates);
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('shoppingList:updated', list);
        }

        console.log('[ShoppingListService] Updated list:', id);
        return list;
    }

    /**
     * Delete a shopping list
     * @param {number} id - List ID
     * @returns {boolean} True if deleted, false if not found
     */
    delete(id) {
        const index = this.lists.findIndex(list => list.id === id);
        if (index === -1) {
            console.error('[ShoppingListService] List not found:', id);
            return false;
        }

        const deletedList = this.lists[index];
        this.lists.splice(index, 1);
        this.saveLists();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('shoppingList:deleted', { id, list: deletedList });
        }

        console.log('[ShoppingListService] Deleted list:', id);
        return true;
    }

    /**
     * Toggle enabled status of a shopping list
     * @param {number} id - List ID
     * @returns {boolean} Success status
     */
    toggleEnabled(id) {
        const list = this.getById(id);
        if (!list) {
            console.error('[ShoppingListService] List not found:', id);
            return false;
        }

        list.enabled = !list.enabled;
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('shoppingList:toggled', list);
        }

        console.log('[ShoppingListService] Toggled list enabled:', id, list.enabled);
        return true;
    }

    /**
     * Add an item to a shopping list
     * @param {number} listId - List ID
     * @param {Object} item - Item to add {name, quantity}
     * @returns {Object|null} The added item or null if list not found
     */
    addItem(listId, item) {
        const list = this.getById(listId);
        if (!list) {
            console.error('[ShoppingListService] List not found:', listId);
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

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('shoppingList:itemAdded', { listId, item: newItem });
        }

        console.log('[ShoppingListService] Added item to list:', listId, newItem.name);
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
        const list = this.getById(listId);
        if (!list) {
            console.error('[ShoppingListService] List not found:', listId);
            return null;
        }

        const item = list.items.find(i => i.id === itemId);
        if (!item) {
            console.error('[ShoppingListService] Item not found:', itemId);
            return null;
        }

        Object.assign(item, updates);
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('shoppingList:itemUpdated', { listId, item });
        }

        console.log('[ShoppingListService] Updated item:', itemId);
        return item;
    }

    /**
     * Delete an item from a shopping list
     * @param {number} listId - List ID
     * @param {number} itemId - Item ID
     * @returns {boolean} True if deleted, false if not found
     */
    deleteItem(listId, itemId) {
        const list = this.getById(listId);
        if (!list) {
            console.error('[ShoppingListService] List not found:', listId);
            return false;
        }

        const index = list.items.findIndex(i => i.id === itemId);
        if (index === -1) {
            console.error('[ShoppingListService] Item not found:', itemId);
            return false;
        }

        const deletedItem = list.items[index];
        list.items.splice(index, 1);
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('shoppingList:itemDeleted', { listId, itemId, item: deletedItem });
        }

        console.log('[ShoppingListService] Deleted item:', itemId);
        return true;
    }

    /**
     * Toggle item completed state
     * @param {number} listId - List ID
     * @param {number} itemId - Item ID
     * @returns {boolean|null} New completed state or null if not found
     */
    toggleItemCompleted(listId, itemId) {
        const list = this.getById(listId);
        if (!list) {
            console.error('[ShoppingListService] List not found:', listId);
            return null;
        }

        const item = list.items.find(i => i.id === itemId);
        if (!item) {
            console.error('[ShoppingListService] Item not found:', itemId);
            return null;
        }

        item.completed = !item.completed;
        list.updatedAt = new Date().toISOString();
        this.saveLists();

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('shoppingList:itemToggled', { listId, item });
        }

        console.log('[ShoppingListService] Toggled item completed:', itemId, item.completed);
        return item.completed;
    }

    /**
     * Get count of completed items in a list
     * @param {number} listId - List ID
     * @returns {number} Count of completed items
     */
    getCompletedCount(listId) {
        const list = this.getById(listId);
        if (!list) return 0;
        return list.items.filter(item => item.completed).length;
    }

    /**
     * Get total count of items in a list
     * @param {number} listId - List ID
     * @returns {number} Total count of items
     */
    getTotalCount(listId) {
        const list = this.getById(listId);
        if (!list) return 0;
        return list.items.length;
    }

    /**
     * Check if all items in a list are completed
     * @param {number} listId - List ID
     * @returns {boolean} True if all items are completed
     */
    isListComplete(listId) {
        const list = this.getById(listId);
        if (!list || list.items.length === 0) return false;
        return list.items.every(item => item.completed);
    }

    /**
     * Format list for clipboard
     * @param {number} listId - List ID
     * @param {boolean} includeCompleted - Whether to include completed items (default: true)
     * @returns {string} Formatted text for clipboard
     */
    formatForClipboard(listId, includeCompleted = true) {
        const list = this.getById(listId);
        if (!list) {
            console.warn('[ShoppingListService] Cannot format list: list not found', listId);
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

    /**
     * Export all shopping lists
     * @returns {Object} Export data
     */
    export() {
        return {
            version: '1.0',
            exportDate: new Date().toISOString(),
            lists: this.lists
        };
    }

    /**
     * Import shopping lists
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
            if (!data || !data.lists || !Array.isArray(data.lists)) {
                throw new Error('Formato de datos inválido');
            }

            data.lists.forEach(list => {
                try {
                    // Check if list already exists
                    const existing = this.lists.find(l => l.id === list.id);
                    if (existing) {
                        result.skipped++;
                        return;
                    }

                    // Add list
                    this.lists.push(list);
                    result.imported++;
                } catch (error) {
                    console.error('[ShoppingListService] Error importing list:', error);
                    result.errors++;
                }
            });

            if (result.imported > 0) {
                this.saveLists();

                // Emit event
                if (this.eventBus) {
                    this.eventBus.emit('shoppingList:imported', result);
                }
            }

            console.log('[ShoppingListService] Import result:', result);
        } catch (error) {
            console.error('[ShoppingListService] Error importing:', error);
            throw error;
        }

        return result;
    }
}

// Export singleton instance (will be initialized in App.js)
export let shoppingListService = null;

/**
 * Initialize shopping list service singleton
 * @param {Object} storage - Storage manager instance
 * @param {Object} eventBus - Event bus instance
 * @returns {ShoppingListService} Shopping list service instance
 */
export function initShoppingListService(storage, eventBus) {
    if (!shoppingListService) {
        shoppingListService = new ShoppingListService(storage, eventBus);
    }
    return shoppingListService;
}
