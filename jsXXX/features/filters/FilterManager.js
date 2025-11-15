/**
 * FilterManager - Manages recipe filtering
 * 
 * Handles category, time, menu, and search filters for recipes.
 */
export class FilterManager {
    constructor(categoryService, eventBus) {
        this.categoryService = categoryService;
        this.eventBus = eventBus;
        this.activeFilters = new Set();
        this.activeTimeFilter = 'all';
        this.activeMenuFilter = null;
        this.searchQuery = '';
    }

    /**
     * Initialize filter manager
     */
    init() {
        this.renderFilterChips();
        console.log('[FilterManager] Initialized');
    }

    /**
     * Render category filter chips
     */
    renderFilterChips() {
        const container = document.querySelector('.filter-chips');
        if (!container) {
            console.warn('[FilterManager] Filter chips container not found');
            return;
        }

        container.innerHTML = '';

        // "Limpiar" chip
        const allChip = this.createFilterChip('all', 'Limpiar', null, this.activeFilters.size === 0);
        container.appendChild(allChip);

        // Get categories
        const customCategories = this.categoryService.getCustomCategories();
        const visiblePredefined = this.categoryService.getVisible().filter(cat => cat.predefined);

        // Custom category chips (first)
        customCategories.forEach(category => {
            if (!this.categoryService.isHidden(category.id)) {
                const chip = this.createFilterChip(
                    category.id,
                    `${category.emoji} ${category.name}`,
                    category.color,
                    this.activeFilters.has(category.id)
                );
                container.appendChild(chip);
            }
        });

        // Separator (only if there are custom categories)
        if (customCategories.length > 0) {
            const separator = document.createElement('span');
            separator.className = 'filter-separator';
            separator.textContent = '|';
            container.appendChild(separator);
        }

        // Predefined category chips (after separator)
        visiblePredefined.forEach(category => {
            const chip = this.createFilterChip(
                category.id,
                `${category.emoji} ${category.name}`,
                category.color,
                this.activeFilters.has(category.id)
            );
            container.appendChild(chip);
        });

        console.log('[FilterManager] Rendered filter chips');
    }

    /**
     * Create a filter chip element
     * @param {string} categoryId - Category ID
     * @param {string} label - Chip label
     * @param {string} color - Category color
     * @param {boolean} active - Whether chip is active
     * @returns {HTMLElement} Filter chip element
     */
    createFilterChip(categoryId, label, color, active) {
        const chip = document.createElement('button');
        chip.className = 'filter-chip';
        if (active) {
            chip.classList.add('active');
        }
        chip.dataset.category = categoryId;
        chip.textContent = label;
        
        if (color) {
            chip.style.setProperty('--category-color', color);
        }

        // Add click handler
        chip.addEventListener('click', () => {
            this.handleFilterClick(categoryId);
        });

        return chip;
    }

    /**
     * Handle filter chip click
     * @param {string} categoryId - Category ID
     */
    handleFilterClick(categoryId) {
        if (categoryId === 'all') {
            this.clearAllFilters();
        } else {
            this.toggleCategoryFilter(categoryId);
        }
    }

    /**
     * Toggle category filter
     * @param {string} categoryId - Category ID
     */
    toggleCategoryFilter(categoryId) {
        if (this.activeFilters.has(categoryId)) {
            this.activeFilters.delete(categoryId);
        } else {
            this.activeFilters.add(categoryId);
        }

        this.renderFilterChips();
        this.emitFilterChange();
        
        console.log('[FilterManager] Toggled category filter:', categoryId);
    }

    /**
     * Set time filter
     * @param {string} timeRange - Time range ('all', '0-30', '30-60', '60+')
     */
    setTimeFilter(timeRange) {
        this.activeTimeFilter = timeRange;
        this.emitFilterChange();
        
        console.log('[FilterManager] Set time filter:', timeRange);
    }

    /**
     * Set menu filter
     * @param {number|null} menuId - Menu ID or null to clear
     */
    setMenuFilter(menuId) {
        this.activeMenuFilter = menuId;
        this.emitFilterChange();
        
        console.log('[FilterManager] Set menu filter:', menuId);
    }

    /**
     * Set search query
     * @param {string} query - Search query
     */
    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase().trim();
        this.emitFilterChange();
        
        console.log('[FilterManager] Set search query:', query);
    }

    /**
     * Clear all filters
     */
    clearAllFilters() {
        this.activeFilters.clear();
        this.activeTimeFilter = 'all';
        this.activeMenuFilter = null;
        this.searchQuery = '';
        
        this.renderFilterChips();
        this.emitFilterChange();
        
        console.log('[FilterManager] Cleared all filters');
    }

    /**
     * Apply filters to recipes
     * @param {Array} recipes - Recipes to filter
     * @returns {Array} Filtered recipes
     */
    applyFilters(recipes) {
        let filtered = [...recipes];

        // Apply category filters
        if (this.activeFilters.size > 0) {
            filtered = filtered.filter(recipe => 
                this.activeFilters.has(recipe.category)
            );
        }

        // Apply time filter
        if (this.activeTimeFilter !== 'all') {
            filtered = this.applyTimeFilter(filtered, this.activeTimeFilter);
        }

        // Apply menu filter
        if (this.activeMenuFilter !== null) {
            filtered = this.applyMenuFilter(filtered, this.activeMenuFilter);
        }

        // Apply search query
        if (this.searchQuery) {
            filtered = this.applySearchFilter(filtered, this.searchQuery);
        }

        console.log('[FilterManager] Applied filters:', filtered.length, 'of', recipes.length, 'recipes');
        return filtered;
    }

    /**
     * Apply time filter to recipes
     * @param {Array} recipes - Recipes to filter
     * @param {string} timeRange - Time range
     * @returns {Array} Filtered recipes
     */
    applyTimeFilter(recipes, timeRange) {
        return recipes.filter(recipe => {
            if (!recipe.time) return false;

            const minutes = this.parseTimeToMinutes(recipe.time);
            
            switch (timeRange) {
                case '0-30':
                    return minutes <= 30;
                case '30-60':
                    return minutes > 30 && minutes <= 60;
                case '60+':
                    return minutes > 60;
                default:
                    return true;
            }
        });
    }

    /**
     * Apply menu filter to recipes
     * @param {Array} recipes - Recipes to filter
     * @param {number} menuId - Menu ID
     * @returns {Array} Filtered recipes
     */
    applyMenuFilter(recipes, menuId) {
        // This would need MenuService to get recipes for menu
        // For now, return all recipes
        // TODO: Implement when integrating with MenuService
        return recipes;
    }

    /**
     * Apply search filter to recipes
     * @param {Array} recipes - Recipes to filter
     * @param {string} query - Search query
     * @returns {Array} Filtered recipes
     */
    applySearchFilter(recipes, query) {
        return recipes.filter(recipe => {
            // Search in name
            if (recipe.name.toLowerCase().includes(query)) {
                return true;
            }

            // Search in ingredients
            if (recipe.ingredients && recipe.ingredients.some(ing => 
                ing.name.toLowerCase().includes(query)
            )) {
                return true;
            }

            // Search in sequences
            if (recipe.sequences && recipe.sequences.some(seq => 
                seq.description.toLowerCase().includes(query)
            )) {
                return true;
            }

            return false;
        });
    }

    /**
     * Parse time string to minutes
     * @param {string} timeString - Time string (e.g., "2h 30min")
     * @returns {number} Total minutes
     */
    parseTimeToMinutes(timeString) {
        let totalMinutes = 0;

        const hoursMatch = timeString.match(/(\d+)\s*h/);
        const minutesMatch = timeString.match(/(\d+)\s*min/);

        if (hoursMatch) {
            totalMinutes += parseInt(hoursMatch[1]) * 60;
        }

        if (minutesMatch) {
            totalMinutes += parseInt(minutesMatch[1]);
        }

        return totalMinutes;
    }

    /**
     * Emit filter change event
     */
    emitFilterChange() {
        if (this.eventBus) {
            this.eventBus.emit('filters:changed', {
                categories: Array.from(this.activeFilters),
                timeRange: this.activeTimeFilter,
                menuId: this.activeMenuFilter,
                searchQuery: this.searchQuery
            });
        }
    }

    /**
     * Get active filters count
     * @returns {number} Number of active filters
     */
    getActiveFiltersCount() {
        let count = 0;
        
        if (this.activeFilters.size > 0) count += this.activeFilters.size;
        if (this.activeTimeFilter !== 'all') count++;
        if (this.activeMenuFilter !== null) count++;
        if (this.searchQuery) count++;
        
        return count;
    }

    /**
     * Check if any filters are active
     * @returns {boolean} True if any filters are active
     */
    hasActiveFilters() {
        return this.getActiveFiltersCount() > 0;
    }

    /**
     * Get current filter state
     * @returns {Object} Current filter state
     */
    getFilterState() {
        return {
            categories: Array.from(this.activeFilters),
            timeRange: this.activeTimeFilter,
            menuId: this.activeMenuFilter,
            searchQuery: this.searchQuery,
            count: this.getActiveFiltersCount()
        };
    }

    /**
     * Set filter state
     * @param {Object} state - Filter state to set
     */
    setFilterState(state) {
        if (state.categories) {
            this.activeFilters = new Set(state.categories);
        }
        if (state.timeRange) {
            this.activeTimeFilter = state.timeRange;
        }
        if (state.menuId !== undefined) {
            this.activeMenuFilter = state.menuId;
        }
        if (state.searchQuery !== undefined) {
            this.searchQuery = state.searchQuery;
        }

        this.renderFilterChips();
        this.emitFilterChange();
        
        console.log('[FilterManager] Set filter state:', state);
    }
}

// Export singleton instance (will be initialized in App.js)
export let filterManager = null;

/**
 * Initialize filter manager singleton
 * @param {Object} categoryService - Category service instance
 * @param {Object} eventBus - Event bus instance
 * @returns {FilterManager} Filter manager instance
 */
export function initFilterManager(categoryService, eventBus) {
    if (!filterManager) {
        filterManager = new FilterManager(categoryService, eventBus);
    }
    return filterManager;
}
