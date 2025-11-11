/**
 * App - Main application orchestrator
 * 
 * Coordinates all services and components without containing business logic or UI.
 * This is the central hub that initializes and connects all modules.
 */

// Import core utilities
import { storage } from '../utils/storage.js';
import { eventBus, Events } from './EventBus.js';

// Import services
import { recipeService } from '../services/RecipeService.js';
import { categoryService } from '../services/CategoryService.js';
import { xmlService } from '../services/XMLService.js';
import { initShoppingListService } from '../services/ShoppingListService.js';
import { initMenuService } from '../services/MenuService.js';

// Import UI managers
import { notificationManager } from '../ui/NotificationManager.js';
import { initThemeManager } from '../ui/ThemeManager.js';
import { modalManager } from '../ui/ModalManager.js';
import { setupAllModals } from '../ui/modal-configs.js';

// Import components
import { initRecipeList } from '../features/recipes/RecipeList.js';
import { initRecipeDetail } from '../features/recipes/RecipeDetail.js';
import { initRecipeForm } from '../features/recipes/RecipeForm.js';
import { initFilterManager } from '../features/filters/FilterManager.js';
import { initShoppingListView } from '../features/shopping-lists/ShoppingListView.js';
import { initMenuView } from '../features/menus/MenuView.js';

export class App {
    constructor() {
        // Services
        this.storage = storage;
        this.eventBus = eventBus;
        this.recipeService = recipeService;
        this.categoryService = categoryService;
        this.xmlService = xmlService;
        this.shoppingListService = null;
        this.menuService = null;

        // UI Managers
        this.notificationManager = notificationManager;
        this.themeManager = null;
        this.modalManager = modalManager;

        // Components
        this.recipeList = null;
        this.recipeDetail = null;
        this.recipeForm = null;
        this.filterManager = null;
        this.shoppingListView = null;
        this.menuView = null;

        // Application state
        this.currentView = 'list'; // 'list', 'detail', 'form', 'shopping-lists', 'menus'
        this.currentRecipe = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('[App] Initializing application...');

            // 1. Initialize services
            await this.initServices();

            // 2. Initialize UI managers
            this.initUIManagers();

            // 3. Initialize components
            this.initComponents();

            // 4. Setup global event listeners
            this.setupEventListeners();

            // 5. Setup modals
            setupAllModals(this.modalManager);

            // 6. Render initial view
            this.renderInitialView();

            this.isInitialized = true;
            console.log('[App] Application initialized successfully');

        } catch (error) {
            console.error('[App] Error initializing application:', error);
            this.showFatalError(error);
            throw error;
        }
    }

    /**
     * Initialize all services
     */
    async initServices() {
        console.log('[App] Initializing services...');

        // Initialize shopping list service
        this.shoppingListService = initShoppingListService(this.storage, this.eventBus);

        // Initialize menu service
        this.menuService = initMenuService(this.storage, this.eventBus);

        // Services are already initialized as singletons
        // recipeService, categoryService, xmlService are ready to use

        console.log('[App] Services initialized');
    }

    /**
     * Initialize UI managers
     */
    initUIManagers() {
        console.log('[App] Initializing UI managers...');

        // Initialize theme manager
        this.themeManager = initThemeManager(this.storage, this.notificationManager);
        this.themeManager.init();

        // Setup theme toggle button
        this.themeManager.setupToggleButton('theme-toggle-btn-modal');

        // Modal manager is already initialized
        // Notification manager is already initialized

        console.log('[App] UI managers initialized');
    }

    /**
     * Initialize components
     */
    initComponents() {
        console.log('[App] Initializing components...');

        // Initialize recipe list
        this.recipeList = initRecipeList(
            this.recipeService,
            this.categoryService,
            this.eventBus
        );
        this.recipeList.init();

        // Initialize recipe detail
        this.recipeDetail = initRecipeDetail(
            this.recipeService,
            this.categoryService,
            this.eventBus
        );
        this.recipeDetail.init();

        // Initialize recipe form
        this.recipeForm = initRecipeForm(
            this.recipeService,
            this.categoryService,
            this.eventBus
        );
        this.recipeForm.init();

        // Initialize filter manager
        this.filterManager = initFilterManager(
            this.categoryService,
            this.eventBus
        );
        this.filterManager.init();

        // Initialize shopping list view
        this.shoppingListView = initShoppingListView(
            this.shoppingListService,
            this.eventBus
        );
        this.shoppingListView.init();

        // Initialize menu view
        this.menuView = initMenuView(
            this.menuService,
            this.recipeService,
            this.eventBus
        );
        this.menuView.init();

        console.log('[App] Components initialized');
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        console.log('[App] Setting up event listeners...');

        // Recipe events
        this.eventBus.on('recipe:view', (data) => this.showRecipeDetail(data.recipeId));
        this.eventBus.on('recipe:edit', (data) => this.showRecipeForm(data.recipeId));
        this.eventBus.on('recipe:deleteRequest', (data) => this.handleDeleteRecipe(data.recipeId));
        this.eventBus.on('recipe:saved', () => this.showRecipeList());
        this.eventBus.on('recipe:formCancelled', () => this.showRecipeList());

        // Filter events
        this.eventBus.on('filters:changed', () => this.applyFilters());

        // Notification events
        this.eventBus.on('notification:success', (data) => {
            this.notificationManager.success(data.message, data.duration);
        });
        this.eventBus.on('notification:error', (data) => {
            this.notificationManager.error(data.message, data.duration);
        });
        this.eventBus.on('notification:warning', (data) => {
            this.notificationManager.warning(data.message, data.duration);
        });
        this.eventBus.on('notification:info', (data) => {
            this.notificationManager.info(data.message, data.duration);
        });

        // Navigation events
        this.setupNavigationListeners();

        console.log('[App] Event listeners setup complete');
    }

    /**
     * Setup navigation listeners
     */
    setupNavigationListeners() {
        // Home link
        const homeLink = document.getElementById('home-link');
        if (homeLink) {
            homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showRecipeList();
            });
        }

        // New recipe button
        const newRecipeBtn = document.getElementById('new-recipe-btn');
        if (newRecipeBtn) {
            newRecipeBtn.addEventListener('click', () => {
                this.showRecipeForm();
            });
        }

        // Menu buttons
        const recipesBtn = document.getElementById('recipes-btn');
        if (recipesBtn) {
            recipesBtn.addEventListener('click', () => {
                this.showRecipeList();
            });
        }

        const shoppingListsBtn = document.getElementById('shopping-lists-btn');
        if (shoppingListsBtn) {
            shoppingListsBtn.addEventListener('click', () => {
                this.showShoppingLists();
            });
        }

        const menusBtn = document.getElementById('menus-btn');
        if (menusBtn) {
            menusBtn.addEventListener('click', () => {
                this.showMenus();
            });
        }

        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.modalManager.open('settings-modal');
            });
        }

        // Setup menu dropdown toggle
        this.setupMenuDropdown();
    }

    /**
     * Setup menu dropdown functionality
     */
    setupMenuDropdown() {
        const menuBtn = document.getElementById('menu-btn');
        const menuDropdown = document.getElementById('menu-dropdown');

        if (!menuBtn || !menuDropdown) {
            console.warn('[App] Menu button or dropdown not found');
            return;
        }

        // Helper function to close menu
        const closeMenu = () => {
            menuDropdown.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        };

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

        // Close menu when clicking on menu items
        const menuItems = menuDropdown.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                closeMenu();
            });
        });

        console.log('[App] Menu dropdown setup complete');
    }

    /**
     * Render initial view
     */
    renderInitialView() {
        console.log('[App] Rendering initial view...');
        this.showRecipeList();
    }

    /**
     * Show recipe list view
     */
    showRecipeList() {
        this.currentView = 'list';
        this.hideAllViews();

        // Show recipe list container
        const listView = document.getElementById('recipe-list-view');
        if (listView) {
            listView.classList.remove('hidden');
        }

        // Apply filters and render
        this.applyFilters();

        console.log('[App] Showing recipe list');
    }

    /**
     * Show recipe detail view
     * @param {string} recipeId - Recipe ID
     */
    showRecipeDetail(recipeId) {
        this.currentView = 'detail';
        this.currentRecipe = recipeId;
        this.hideAllViews();

        // Show detail container
        const detailView = document.getElementById('recipe-detail-view');
        if (detailView) {
            detailView.classList.remove('hidden');
        }

        // Render detail
        this.recipeDetail.render(recipeId);

        console.log('[App] Showing recipe detail:', recipeId);
    }

    /**
     * Show recipe form view
     * @param {string|null} recipeId - Recipe ID to edit, null for new
     */
    showRecipeForm(recipeId = null) {
        this.currentView = 'form';
        this.currentRecipe = recipeId;
        this.hideAllViews();

        // Show form container
        const formView = document.getElementById('recipe-form-view');
        if (formView) {
            formView.classList.remove('hidden');
        }

        // Render form
        this.recipeForm.render(recipeId);

        console.log('[App] Showing recipe form:', recipeId ? 'edit' : 'new');
    }

    /**
     * Show shopping lists view
     */
    showShoppingLists() {
        this.currentView = 'shopping-lists';
        this.hideAllViews();

        // Show shopping lists view
        this.shoppingListView.show();

        console.log('[App] Showing shopping lists');
    }

    /**
     * Show menus view
     */
    showMenus() {
        this.currentView = 'menus';
        this.hideAllViews();

        // Show menus view
        this.menuView.show();

        console.log('[App] Showing menus');
    }

    /**
     * Hide all views
     */
    hideAllViews() {
        const views = [
            'recipe-list-view',
            'recipe-detail-view',
            'recipe-form-view'
        ];

        views.forEach(viewId => {
            const view = document.getElementById(viewId);
            if (view) {
                view.classList.add('hidden');
            }
        });

        // Hide component views
        if (this.shoppingListView) {
            this.shoppingListView.hide();
        }
        if (this.menuView) {
            this.menuView.hide();
        }
    }

    /**
     * Apply filters to recipe list
     */
    applyFilters() {
        if (!this.filterManager || !this.recipeList) return;

        const allRecipes = this.recipeService.getAll();
        const filteredRecipes = this.filterManager.applyFilters(allRecipes);
        this.recipeList.render(filteredRecipes);

        console.log('[App] Filters applied:', filteredRecipes.length, 'recipes');
    }

    /**
     * Handle delete recipe
     * @param {string} recipeId - Recipe ID
     */
    async handleDeleteRecipe(recipeId) {
        const recipe = this.recipeService.getById(recipeId);
        if (!recipe) return;

        const confirmed = confirm(`¿Estás seguro de que quieres eliminar "${recipe.name}"?`);
        if (!confirmed) return;

        try {
            await this.recipeService.delete(recipeId);
            
            this.notificationManager.success('Receta eliminada exitosamente');
            this.showRecipeList();

            console.log('[App] Recipe deleted:', recipeId);
        } catch (error) {
            console.error('[App] Error deleting recipe:', error);
            this.notificationManager.error('Error al eliminar la receta');
        }
    }

    /**
     * Show fatal error
     * @param {Error} error - Error object
     */
    showFatalError(error) {
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center; font-family: system-ui;">
                <h1 style="color: #ef4444;">Error al cargar la aplicación</h1>
                <p style="color: #6b7280; margin: 20px 0;">${error.message}</p>
                <button 
                    onclick="location.reload()" 
                    style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;"
                >
                    Recargar aplicación
                </button>
            </div>
        `;
    }

    /**
     * Get current view
     * @returns {string} Current view name
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Check if app is initialized
     * @returns {boolean} True if initialized
     */
    isReady() {
        return this.isInitialized;
    }
}

// Export singleton instance
export let app = null;

/**
 * Initialize app singleton
 * @returns {App} App instance
 */
export function initApp() {
    if (!app) {
        app = new App();
    }
    return app;
}
