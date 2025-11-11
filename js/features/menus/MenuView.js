/**
 * MenuView - Component for weekly menu planning view
 * 
 * Handles rendering and interaction with weekly menus.
 */
export class MenuView {
    constructor(menuService, recipeService, eventBus) {
        this.menuService = menuService;
        this.recipeService = recipeService;
        this.eventBus = eventBus;
        this.container = null;
        this.currentMenu = null;
    }

    /**
     * Initialize the component
     */
    init() {
        this.container = document.getElementById('menus-view');
        if (!this.container) {
            console.error('[MenuView] Container not found');
            return;
        }
        
        this.setupEventListeners();
        console.log('[MenuView] Initialized');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        if (this.eventBus) {
            this.eventBus.on('menu:created', () => this.render());
            this.eventBus.on('menu:updated', () => this.render());
            this.eventBus.on('menu:deleted', () => this.render());
            this.eventBus.on('menu:recipeSet', () => this.renderCurrentMenu());
        }
    }

    /**
     * Render menus list
     */
    render() {
        if (!this.container) return;
        
        const menus = this.menuService.getAll();
        
        const html = `
            <div class="menus-header">
                <h2>Menús Semanales</h2>
                <button class="btn btn-primary" data-action="create-menu">
                    <i class="fa-solid fa-plus"></i> Nuevo Menú
                </button>
            </div>
            <div class="menus-list">
                ${this.renderMenusList(menus)}
            </div>
        `;
        
        this.container.innerHTML = html;
        this.attachEventListeners();
        
        console.log('[MenuView] Rendered', menus.length, 'menus');
    }

    /**
     * Render menus list
     * @param {Array} menus - Array of menus
     * @returns {string} HTML string
     */
    renderMenusList(menus) {
        if (menus.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p>No hay menús creados</p>
                    <button class="btn btn-primary" data-action="create-menu">
                        Crear primer menú
                    </button>
                </div>
            `;
        }

        return menus.map(menu => {
            const mealCount = this.menuService.getMealCount(menu.id);
            return `
                <div class="menu-card" data-menu-id="${menu.id}">
                    <div class="menu-card-header">
                        <h3>${this.escapeHTML(menu.name)}</h3>
                        <div class="menu-card-actions">
                            <button class="btn-icon" data-action="view" title="Ver menú">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <button class="btn-icon" data-action="edit" title="Editar">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="btn-icon" data-action="delete" title="Eliminar">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="menu-card-body">
                        <div class="menu-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${mealCount.percentage}%"></div>
                            </div>
                            <span class="progress-text">${mealCount.assigned} de ${mealCount.total} comidas</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Render current menu detail
     */
    renderCurrentMenu() {
        if (!this.currentMenu) return;
        
        const menu = this.menuService.getById(this.currentMenu.id);
        if (!menu) return;

        const html = `
            <div class="menu-detail">
                <div class="menu-detail-header">
                    <button class="btn btn-secondary" data-action="back">
                        <i class="fa-solid fa-arrow-left"></i> Volver
                    </button>
                    <h2>${this.escapeHTML(menu.name)}</h2>
                    <div class="menu-detail-actions">
                        <button class="btn btn-secondary" data-action="shopping-list">
                            <i class="fa-solid fa-list"></i> Lista de compra
                        </button>
                        <button class="btn btn-secondary" data-action="export-pdf">
                            <i class="fa-solid fa-file-pdf"></i> Exportar PDF
                        </button>
                    </div>
                </div>
                <div class="menu-grid">
                    ${this.renderMenuGrid(menu)}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachMenuDetailEventListeners();
    }

    /**
     * Render menu grid (7 days x 3 meals)
     * @param {Object} menu - Menu object
     * @returns {string} HTML string
     */
    renderMenuGrid(menu) {
        const days = this.menuService.days;
        const meals = this.menuService.meals;
        const dayNames = {
            'lunes': 'Lunes',
            'martes': 'Martes',
            'miercoles': 'Miércoles',
            'jueves': 'Jueves',
            'viernes': 'Viernes',
            'sabado': 'Sábado',
            'domingo': 'Domingo'
        };
        const mealNames = {
            'desayuno': 'Desayuno',
            'comida': 'Comida',
            'cena': 'Cena'
        };

        let html = '<table class="menu-table"><thead><tr><th>Día</th>';
        meals.forEach(meal => {
            html += `<th>${mealNames[meal]}</th>`;
        });
        html += '</tr></thead><tbody>';

        days.forEach(day => {
            html += `<tr><td class="day-name">${dayNames[day]}</td>`;
            meals.forEach(meal => {
                const recipeId = menu.days[day]?.[meal];
                const recipe = recipeId ? this.recipeService.getById(recipeId) : null;
                
                html += `<td class="menu-cell" data-day="${day}" data-meal="${meal}">`;
                if (recipe) {
                    html += `
                        <div class="menu-recipe">
                            <span class="recipe-name">${this.escapeHTML(recipe.name)}</span>
                            <button class="btn-icon-small" data-action="remove-recipe">
                                <i class="fa-solid fa-times"></i>
                            </button>
                        </div>
                    `;
                } else {
                    html += `
                        <button class="btn-add-recipe" data-action="add-recipe">
                            <i class="fa-solid fa-plus"></i> Añadir
                        </button>
                    `;
                }
                html += '</td>';
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        return html;
    }

    /**
     * Attach event listeners to menu list
     */
    attachEventListeners() {
        if (!this.container) return;

        // Create menu buttons
        const createBtns = this.container.querySelectorAll('[data-action="create-menu"]');
        createBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleCreateMenu());
        });

        // Menu cards
        const menuCards = this.container.querySelectorAll('.menu-card');
        menuCards.forEach(card => {
            const menuId = parseInt(card.dataset.menuId);

            const viewBtn = card.querySelector('[data-action="view"]');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleViewMenu(menuId);
                });
            }

            const editBtn = card.querySelector('[data-action="edit"]');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleEditMenu(menuId);
                });
            }

            const deleteBtn = card.querySelector('[data-action="delete"]');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleDeleteMenu(menuId);
                });
            }
        });
    }

    /**
     * Attach event listeners to menu detail view
     */
    attachMenuDetailEventListeners() {
        if (!this.container) return;

        // Back button
        const backBtn = this.container.querySelector('[data-action="back"]');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.render());
        }

        // Shopping list button
        const shoppingListBtn = this.container.querySelector('[data-action="shopping-list"]');
        if (shoppingListBtn) {
            shoppingListBtn.addEventListener('click', () => this.handleGenerateShoppingList());
        }

        // Export PDF button
        const exportBtn = this.container.querySelector('[data-action="export-pdf"]');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.handleExportPDF());
        }

        // Menu cells
        const cells = this.container.querySelectorAll('.menu-cell');
        cells.forEach(cell => {
            const day = cell.dataset.day;
            const meal = cell.dataset.meal;

            const addBtn = cell.querySelector('[data-action="add-recipe"]');
            if (addBtn) {
                addBtn.addEventListener('click', () => this.handleAddRecipe(day, meal));
            }

            const removeBtn = cell.querySelector('[data-action="remove-recipe"]');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => this.handleRemoveRecipe(day, meal));
            }
        });
    }

    /**
     * Handle create menu
     */
    handleCreateMenu() {
        const name = prompt('Nombre del menú:');
        if (!name || name.trim() === '') return;

        const menu = this.menuService.create(name.trim());
        
        if (this.eventBus) {
            this.eventBus.emit('notification:success', { 
                message: 'Menú creado exitosamente' 
            });
        }

        this.render();
        console.log('[MenuView] Menu created:', menu.id);
    }

    /**
     * Handle view menu
     * @param {number} menuId - Menu ID
     */
    handleViewMenu(menuId) {
        const menu = this.menuService.getById(menuId);
        if (!menu) return;

        this.currentMenu = menu;
        this.renderCurrentMenu();
        
        console.log('[MenuView] Viewing menu:', menuId);
    }

    /**
     * Handle edit menu
     * @param {number} menuId - Menu ID
     */
    handleEditMenu(menuId) {
        const menu = this.menuService.getById(menuId);
        if (!menu) return;

        const newName = prompt('Nuevo nombre del menú:', menu.name);
        if (!newName || newName.trim() === '') return;

        this.menuService.update(menuId, { name: newName.trim() });
        
        if (this.eventBus) {
            this.eventBus.emit('notification:success', { 
                message: 'Menú actualizado' 
            });
        }

        this.render();
        console.log('[MenuView] Menu edited:', menuId);
    }

    /**
     * Handle delete menu
     * @param {number} menuId - Menu ID
     */
    handleDeleteMenu(menuId) {
        if (!confirm('¿Estás seguro de que quieres eliminar este menú?')) return;

        this.menuService.delete(menuId);
        
        if (this.eventBus) {
            this.eventBus.emit('notification:success', { 
                message: 'Menú eliminado' 
            });
        }

        this.render();
        console.log('[MenuView] Menu deleted:', menuId);
    }

    /**
     * Handle add recipe to menu
     * @param {string} day - Day of week
     * @param {string} meal - Meal type
     */
    handleAddRecipe(day, meal) {
        if (!this.currentMenu) return;

        // This would open a recipe selector modal
        if (this.eventBus) {
            this.eventBus.emit('menu:selectRecipe', { 
                menuId: this.currentMenu.id,
                day,
                meal
            });
        }

        console.log('[MenuView] Add recipe:', day, meal);
    }

    /**
     * Handle remove recipe from menu
     * @param {string} day - Day of week
     * @param {string} meal - Meal type
     */
    handleRemoveRecipe(day, meal) {
        if (!this.currentMenu) return;

        this.menuService.clearRecipe(this.currentMenu.id, day, meal);
        this.renderCurrentMenu();
        
        console.log('[MenuView] Remove recipe:', day, meal);
    }

    /**
     * Handle generate shopping list
     */
    handleGenerateShoppingList() {
        if (!this.currentMenu) return;

        const recipes = this.recipeService.getAll();
        const shoppingList = this.menuService.getShoppingListForMenu(this.currentMenu.id, recipes);
        
        if (this.eventBus) {
            this.eventBus.emit('menu:shoppingListGenerated', { 
                menuId: this.currentMenu.id,
                shoppingList
            });
        }

        console.log('[MenuView] Shopping list generated:', shoppingList);
    }

    /**
     * Handle export to PDF
     */
    handleExportPDF() {
        if (!this.currentMenu) return;

        const recipes = this.recipeService.getAll();
        const exportData = this.menuService.exportToPDF(this.currentMenu.id, recipes);
        
        if (this.eventBus) {
            this.eventBus.emit('menu:exportedToPDF', { 
                menuId: this.currentMenu.id,
                exportData
            });
            this.eventBus.emit('notification:success', { 
                message: 'Menú exportado a PDF' 
            });
        }

        console.log('[MenuView] Exported to PDF:', exportData);
    }

    /**
     * Show view
     */
    show() {
        if (this.container) {
            this.container.classList.remove('hidden');
            this.render();
        }
    }

    /**
     * Hide view
     */
    hide() {
        if (this.container) {
            this.container.classList.add('hidden');
        }
        this.currentMenu = null;
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
}

// Export singleton instance
export let menuView = null;

/**
 * Initialize menu view singleton
 * @param {Object} menuService - Menu service instance
 * @param {Object} recipeService - Recipe service instance
 * @param {Object} eventBus - Event bus instance
 * @returns {MenuView} Menu view instance
 */
export function initMenuView(menuService, recipeService, eventBus) {
    if (!menuView) {
        menuView = new MenuView(menuService, recipeService, eventBus);
    }
    return menuView;
}
