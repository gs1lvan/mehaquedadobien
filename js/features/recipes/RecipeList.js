/**
 * RecipeList - Component for rendering recipe list/grid
 * 
 * Handles rendering recipes in grid or list view with sorting and filtering.
 */
export class RecipeList {
    constructor(recipeService, categoryService, eventBus) {
        this.recipeService = recipeService;
        this.categoryService = categoryService;
        this.eventBus = eventBus;
        this.viewMode = localStorage.getItem('viewMode') || 'grid';
        this.sortBy = 'date';
        this.sortOrder = 'desc';
        this.container = null;
        this.emptyState = null;
    }

    /**
     * Initialize the component
     */
    init() {
        this.container = document.getElementById('recipes-grid');
        this.emptyState = document.getElementById('empty-state');
        
        if (!this.container) {
            console.error('[RecipeList] Container not found');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        console.log('[RecipeList] Initialized');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen to recipe events
        if (this.eventBus) {
            this.eventBus.on('recipe:created', () => this.render());
            this.eventBus.on('recipe:updated', () => this.render());
            this.eventBus.on('recipe:deleted', () => this.render());
        }
    }

    /**
     * Render recipe list
     * @param {Array} recipes - Recipes to render (optional, will fetch if not provided)
     */
    render(recipes = null) {
        if (!this.container) {
            console.error('[RecipeList] Container not initialized');
            return;
        }

        // Get recipes if not provided
        const recipesToRender = recipes || this.recipeService.getAll();

        // Sort recipes
        const sorted = this.sortRecipes(recipesToRender);

        // Clear container
        this.container.innerHTML = '';

        // Show empty state if no recipes
        if (sorted.length === 0) {
            this.showEmptyState();
            return;
        }

        // Hide empty state
        this.hideEmptyState();

        // Render based on view mode
        if (this.viewMode === 'grid') {
            this.renderGrid(sorted);
        } else {
            this.renderList(sorted);
        }

        console.log('[RecipeList] Rendered', sorted.length, 'recipes in', this.viewMode, 'mode');
    }

    /**
     * Render recipes in grid mode
     * @param {Array} recipes - Recipes to render
     */
    renderGrid(recipes) {
        this.container.className = 'recipes-grid';
        
        recipes.forEach(recipe => {
            const card = this.createRecipeCard(recipe);
            this.container.appendChild(card);
        });
    }

    /**
     * Render recipes in list mode
     * @param {Array} recipes - Recipes to render
     */
    renderList(recipes) {
        this.container.className = 'recipes-list';
        
        recipes.forEach(recipe => {
            const row = this.createRecipeRow(recipe);
            this.container.appendChild(row);
        });
    }

    /**
     * Create recipe card for grid view
     * @param {Object} recipe - Recipe object
     * @returns {HTMLElement} Recipe card element
     */
    createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.dataset.recipeId = recipe.id;

        // Get category info
        const category = this.categoryService.getById(recipe.category);
        const categoryColor = category ? category.color : '#008A05';
        const categoryEmoji = category ? category.emoji : '🍽️';
        const categoryName = category ? category.name : 'Sin categoría';

        // Build card HTML
        card.innerHTML = `
            <div class="recipe-card-header" style="background: ${categoryColor}">
                <span class="recipe-category-emoji">${categoryEmoji}</span>
                <span class="recipe-category-name">${categoryName}</span>
            </div>
            <div class="recipe-card-body">
                <h3 class="recipe-name">${this.escapeHTML(recipe.name)}</h3>
                ${recipe.time ? `<p class="recipe-time">⏱️ ${recipe.time}</p>` : ''}
                ${recipe.servings ? `<p class="recipe-servings">👥 ${recipe.servings} personas</p>` : ''}
            </div>
            <div class="recipe-card-footer">
                <button class="btn-icon" data-action="view" title="Ver receta">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn-icon" data-action="edit" title="Editar">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-icon" data-action="delete" title="Eliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        // Add event listeners
        this.attachCardEventListeners(card, recipe);

        return card;
    }

    /**
     * Create recipe row for list view
     * @param {Object} recipe - Recipe object
     * @returns {HTMLElement} Recipe row element
     */
    createRecipeRow(recipe) {
        const row = document.createElement('div');
        row.className = 'recipe-row';
        row.dataset.recipeId = recipe.id;

        // Get category info
        const category = this.categoryService.getById(recipe.category);
        const categoryEmoji = category ? category.emoji : '🍽️';
        const categoryName = category ? category.name : 'Sin categoría';

        row.innerHTML = `
            <div class="recipe-row-name">
                <span class="recipe-emoji">${categoryEmoji}</span>
                <span class="recipe-title">${this.escapeHTML(recipe.name)}</span>
            </div>
            <div class="recipe-row-category">${categoryName}</div>
            <div class="recipe-row-time">${recipe.time || '-'}</div>
            <div class="recipe-row-servings">${recipe.servings || '-'}</div>
            <div class="recipe-row-actions">
                <button class="btn-icon" data-action="view" title="Ver">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn-icon" data-action="edit" title="Editar">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-icon" data-action="delete" title="Eliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        // Add event listeners
        this.attachRowEventListeners(row, recipe);

        return row;
    }

    /**
     * Attach event listeners to card
     * @param {HTMLElement} card - Card element
     * @param {Object} recipe - Recipe object
     */
    attachCardEventListeners(card, recipe) {
        // Click on card body to view
        const body = card.querySelector('.recipe-card-body');
        if (body) {
            body.addEventListener('click', () => {
                this.handleViewClick(recipe.id);
            });
        }

        // Action buttons
        const viewBtn = card.querySelector('[data-action="view"]');
        const editBtn = card.querySelector('[data-action="edit"]');
        const deleteBtn = card.querySelector('[data-action="delete"]');

        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleViewClick(recipe.id);
            });
        }

        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleEditClick(recipe.id);
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleDeleteClick(recipe.id);
            });
        }
    }

    /**
     * Attach event listeners to row
     * @param {HTMLElement} row - Row element
     * @param {Object} recipe - Recipe object
     */
    attachRowEventListeners(row, recipe) {
        // Click on row to view (except on buttons)
        row.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                this.handleViewClick(recipe.id);
            }
        });

        // Action buttons
        const viewBtn = row.querySelector('[data-action="view"]');
        const editBtn = row.querySelector('[data-action="edit"]');
        const deleteBtn = row.querySelector('[data-action="delete"]');

        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleViewClick(recipe.id);
            });
        }

        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleEditClick(recipe.id);
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleDeleteClick(recipe.id);
            });
        }
    }

    /**
     * Handle view recipe click
     * @param {string} recipeId - Recipe ID
     */
    handleViewClick(recipeId) {
        if (this.eventBus) {
            this.eventBus.emit('recipe:view', { recipeId });
        }
        console.log('[RecipeList] View recipe:', recipeId);
    }

    /**
     * Handle edit recipe click
     * @param {string} recipeId - Recipe ID
     */
    handleEditClick(recipeId) {
        if (this.eventBus) {
            this.eventBus.emit('recipe:edit', { recipeId });
        }
        console.log('[RecipeList] Edit recipe:', recipeId);
    }

    /**
     * Handle delete recipe click
     * @param {string} recipeId - Recipe ID
     */
    handleDeleteClick(recipeId) {
        if (this.eventBus) {
            this.eventBus.emit('recipe:deleteRequest', { recipeId });
        }
        console.log('[RecipeList] Delete recipe:', recipeId);
    }

    /**
     * Set view mode
     * @param {string} mode - 'grid' or 'list'
     */
    setViewMode(mode) {
        if (mode !== 'grid' && mode !== 'list') {
            console.error('[RecipeList] Invalid view mode:', mode);
            return;
        }

        this.viewMode = mode;
        localStorage.setItem('viewMode', mode);
        this.render();
        
        console.log('[RecipeList] View mode set to:', mode);
    }

    /**
     * Set sorting
     * @param {string} field - 'name' or 'date'
     * @param {string} order - 'asc' or 'desc'
     */
    setSorting(field, order) {
        this.sortBy = field;
        this.sortOrder = order;
        this.render();
        
        console.log('[RecipeList] Sorting set to:', field, order);
    }

    /**
     * Sort recipes
     * @param {Array} recipes - Recipes to sort
     * @returns {Array} Sorted recipes
     */
    sortRecipes(recipes) {
        const sorted = [...recipes];

        sorted.sort((a, b) => {
            let comparison = 0;

            if (this.sortBy === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (this.sortBy === 'date') {
                const dateA = new Date(a.createdAt || 0);
                const dateB = new Date(b.createdAt || 0);
                comparison = dateA - dateB;
            }

            return this.sortOrder === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }

    /**
     * Show empty state
     */
    showEmptyState() {
        if (this.emptyState) {
            this.emptyState.classList.remove('hidden');
        }
    }

    /**
     * Hide empty state
     */
    hideEmptyState() {
        if (this.emptyState) {
            this.emptyState.classList.add('hidden');
        }
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get current view mode
     * @returns {string} Current view mode
     */
    getViewMode() {
        return this.viewMode;
    }

    /**
     * Get current sorting
     * @returns {Object} Current sorting {field, order}
     */
    getSorting() {
        return {
            field: this.sortBy,
            order: this.sortOrder
        };
    }
}

// Export singleton instance (will be initialized in App.js)
export let recipeList = null;

/**
 * Initialize recipe list singleton
 * @param {Object} recipeService - Recipe service instance
 * @param {Object} categoryService - Category service instance
 * @param {Object} eventBus - Event bus instance
 * @returns {RecipeList} Recipe list instance
 */
export function initRecipeList(recipeService, categoryService, eventBus) {
    if (!recipeList) {
        recipeList = new RecipeList(recipeService, categoryService, eventBus);
    }
    return recipeList;
}
