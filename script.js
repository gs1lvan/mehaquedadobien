// ===== Category Management =====

/**
 * Predefined categories that come with the application
 */
const PREDEFINED_CATEGORIES = [
    { id: 'carne', name: 'Carne', emoji: '🥩', color: '#D93B30', isPredefined: true },
    { id: 'cereales', name: 'Cereales', emoji: '🌾', color: '#C4A053', isPredefined: true },
    { id: 'cerdo', name: 'Cerdo', emoji: '🐷', color: '#FFB6C1', isPredefined: true },
    { id: 'con-huevo', name: 'Con huevo', emoji: '🥚', color: '#FFD700', isPredefined: true },
    { id: 'conejo', name: 'Conejo', emoji: '🐰', color: '#D4A5A5', isPredefined: true },
    { id: 'encurtidos', name: 'Encurtidos', emoji: '🥒', color: '#7CB342', isPredefined: true },
    { id: 'escabeche', name: 'Escabeche', emoji: '🥒', color: '#32CD32', isPredefined: true },
    { id: 'fruta', name: 'Fruta', emoji: '🍎', color: '#FF8C00', isPredefined: true },
    { id: 'legumbres', name: 'Legumbres', emoji: '🫘', color: '#8D6E63', isPredefined: true },
    { id: 'marisco', name: 'Marisco', emoji: '🦐', color: '#FF6B9D', isPredefined: true },
    { id: 'pescado', name: 'Pescado', emoji: '🐟', color: '#0073CF', isPredefined: true },
    { id: 'pollo', name: 'Pollo', emoji: '🐔', color: '#FFA500', isPredefined: true },
    { id: 'postres', name: 'Postres', emoji: '🍰', color: '#FFB6C1', isPredefined: true },
    { id: 'salsas', name: 'Salsas', emoji: '🍅', color: '#E53935', isPredefined: true },
    { id: 'verdura', name: 'Verdura', emoji: '🥬', color: '#008A05', isPredefined: true },
    { id: 'caravana', name: 'Caravana', emoji: '🚐', color: '#6B7280', isPredefined: true, isSpecial: true }
];

/**
 * Color palette for custom categories
 */
const CATEGORY_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#E76F51', '#2A9D8F'
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
 * CategoryManager - Manages predefined and custom categories
 */
class CategoryManager {
    constructor() {
        this.storageKey = 'recetario_custom_categories';
        this.predefinedCategories = PREDEFINED_CATEGORIES;
        this.customCategories = [];
        this.loadCustomCategories();
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
     * Get all categories (predefined + custom)
     * @returns {Array} All categories
     */
    getAllCategories() {
        return [...this.predefinedCategories, ...this.customCategories];
    }
    
    /**
     * Get category by ID
     * @param {string} id - Category ID
     * @returns {Object|null} Category object or null
     */
    getCategoryById(id) {
        const all = this.getAllCategories();
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
        counts['sin-categoria'] = recipes.filter(r => !r.category).length;
        
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
     * Delete custom category
     * @param {string} id - Category ID
     * @param {Array} recipes - All recipes to check usage
     * @returns {Object} Deletion result with affected recipes
     */
    deleteCategory(id, recipes) {
        const categoryIndex = this.customCategories.findIndex(cat => cat.id === id);
        
        if (categoryIndex === -1) {
            throw new Error('Categoría no encontrada');
        }
        
        const category = this.customCategories[categoryIndex];
        
        if (category.isPredefined) {
            throw new Error('No se pueden eliminar categorías predefinidas');
        }
        
        // Find recipes using this category
        const affectedRecipes = recipes.filter(recipe => recipe.category === id);
        
        // Remove category
        this.customCategories.splice(categoryIndex, 1);
        this.saveCustomCategories();
        
        console.log('[CategoryManager] Deleted category:', id, 'Affected recipes:', affectedRecipes.length);
        
        return {
            deleted: true,
            affectedRecipes: affectedRecipes.length,
            affectedRecipeIds: affectedRecipes.map(r => r.id)
        };
    }
}

// ===== End Category Management =====

/**
 * RecipeApp - Main application controller for Recetario Personal
 */
class RecipeApp {
    constructor() {
        this.storageManager = new StorageManager();
        this.categoryManager = new CategoryManager();
        this.recipes = [];
        this.activeFilters = new Set(); // Track active category filters
        this.activeTimeFilter = 'all'; // Track active time filter
        this.currentView = 'list'; // 'list', 'detail', 'form'
        this.ingredients = []; // Current recipe ingredients
        this.editingIngredientId = null; // Track which ingredient is being edited
        this.sequences = []; // Current recipe sequences
        this.editingSequenceId = null; // Track which sequence is being edited
        this.images = []; // Current recipe images
        this.videos = []; // Current recipe videos
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

        // Theme toggle button
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // New recipe button
        const newRecipeBtn = document.getElementById('new-recipe-btn');
        if (newRecipeBtn) {
            newRecipeBtn.addEventListener('click', () => {
                this.showRecipeForm();
            });
        }

        // Filter chips (category)
        const filterChips = document.querySelectorAll('#filter-bar .filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // Time filter chips
        const timeFilterChips = document.querySelectorAll('#time-filter-chips .filter-chip');
        timeFilterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.handleTimeFilterClick(e.target);
            });
        });

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

        // Import XML button
        const importXmlBtn = document.getElementById('import-xml-btn');
        if (importXmlBtn) {
            importXmlBtn.addEventListener('click', () => {
                this.handleImportXMLClick();
            });
        }

        // Export all button
        const exportAllBtn = document.getElementById('export-all-btn');
        if (exportAllBtn) {
            exportAllBtn.addEventListener('click', () => {
                this.handleExportAllClick();
            });
        }

        // XML file input
        const xmlFileInput = document.getElementById('xml-file-input');
        if (xmlFileInput) {
            xmlFileInput.addEventListener('change', (e) => {
                this.handleXMLFileSelected(e.target.files[0]);
            });
        }

        // Manage categories button
        const manageCategoriesBtn = document.getElementById('manage-categories-btn');
        if (manageCategoriesBtn) {
            manageCategoriesBtn.addEventListener('click', () => {
                this.showCategoryModal();
            });
        }

        // Mobile menu button
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                }
            });
        }

        // Mobile menu items
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => {
                this.toggleTheme();
                mobileMenu.classList.remove('active');
            });
        }

        const mobileManageCategories = document.getElementById('mobile-manage-categories');
        if (mobileManageCategories) {
            mobileManageCategories.addEventListener('click', () => {
                this.showCategoryModal();
                mobileMenu.classList.remove('active');
            });
        }

        const mobileImportXml = document.getElementById('mobile-import-xml');
        if (mobileImportXml) {
            mobileImportXml.addEventListener('click', () => {
                this.handleImportXMLClick();
                mobileMenu.classList.remove('active');
            });
        }

        const mobileExportAll = document.getElementById('mobile-export-all');
        if (mobileExportAll) {
            mobileExportAll.addEventListener('click', () => {
                this.handleExportAllClick();
                mobileMenu.classList.remove('active');
            });
        }

        const mobileNewRecipe = document.getElementById('mobile-new-recipe');
        if (mobileNewRecipe) {
            mobileNewRecipe.addEventListener('click', () => {
                this.showRecipeForm();
                mobileMenu.classList.remove('active');
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

        // Form event listeners
        this.setupFormEventListeners();
    }

    // ===== Category Management Functions =====
    
    /**
     * Render filter chips dynamically from categories
     */
    renderFilterChips() {
        const filterChipsContainer = document.querySelector('.filter-chips');
        if (!filterChipsContainer) return;
        
        filterChipsContainer.innerHTML = '';
        
        // "Todas" chip
        const allChip = document.createElement('button');
        allChip.className = 'filter-chip';
        if (this.activeFilters.size === 0) {
            allChip.classList.add('active');
        }
        allChip.dataset.category = 'all';
        allChip.textContent = 'Todas';
        filterChipsContainer.appendChild(allChip);
        
        // Category chips
        const categories = this.categoryManager.getAllCategories();
        categories.forEach(category => {
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

        // Time filter chips
        const timeFilterChips = document.querySelectorAll('#time-filter-chips .filter-chip');
        timeFilterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.handleTimeFilterClick(e.target);
            });
        });
    }
    
    /**
     * Render category selector in form
     */
    renderCategorySelector() {
        const categorySelect = document.getElementById('recipe-category');
        if (!categorySelect) return;
        
        const currentValue = categorySelect.value;
        categorySelect.innerHTML = '<option value="">Sin categoría</option>';
        
        const categories = this.categoryManager.getAllCategories();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = `${category.emoji} ${category.name}`;
            categorySelect.appendChild(option);
        });
        
        // Restore previous selection if it still exists
        if (currentValue) {
            categorySelect.value = currentValue;
        }
    }
    
    /**
     * Render category modal content
     */
    renderCategoryModal() {
        // Render color palette
        this.renderColorPalette();
        
        // Render emoji picker
        this.renderEmojiPicker();
        
        // Render category lists
        this.renderPredefinedCategoriesList();
        this.renderCustomCategoriesList();
    }
    
    /**
     * Render color palette for category creation
     */
    renderColorPalette() {
        const colorPalette = document.getElementById('color-palette');
        if (!colorPalette) return;
        
        colorPalette.innerHTML = '';
        
        CATEGORY_COLORS.forEach((color, index) => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'color-chip';
            chip.style.backgroundColor = color;
            chip.dataset.color = color;
            
            // Select first color by default
            if (index === 0) {
                chip.classList.add('selected');
                document.getElementById('selected-color').value = color;
            }
            
            chip.addEventListener('click', () => {
                // Remove selected class from all chips
                colorPalette.querySelectorAll('.color-chip').forEach(c => c.classList.remove('selected'));
                // Add selected class to clicked chip
                chip.classList.add('selected');
                // Update hidden input
                document.getElementById('selected-color').value = color;
            });
            
            colorPalette.appendChild(chip);
        });
    }
    
    /**
     * Render emoji picker for category creation
     */
    renderEmojiPicker() {
        const emojiInput = document.getElementById('new-category-emoji');
        if (!emojiInput) return;
        
        // Set default emoji
        emojiInput.value = DEFAULT_EMOJI;
        
        // Render emoji grids for each category
        Object.keys(EMOJI_CATEGORIES).forEach(category => {
            const grid = document.querySelector(`.emoji-grid[data-category="${category}"]`);
            if (!grid) return;
            
            grid.innerHTML = '';
            
            EMOJI_CATEGORIES[category].forEach(emoji => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'emoji-option';
                button.textContent = emoji;
                button.title = emoji;
                
                button.addEventListener('click', () => {
                    // Update input value
                    emojiInput.value = emoji;
                    
                    // Remove selected class from all emojis
                    document.querySelectorAll('.emoji-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked emoji
                    button.classList.add('selected');
                });
                
                grid.appendChild(button);
            });
        });
    }
    
    /**
     * Render emoji picker for edit modal
     */
    renderEditEmojiPicker() {
        const emojiInput = document.getElementById('edit-category-emoji');
        if (!emojiInput) return;
        
        // Render emoji grids for each category in edit modal
        Object.keys(EMOJI_CATEGORIES).forEach(category => {
            const grids = document.querySelectorAll(`#edit-category-modal .emoji-grid[data-category="${category}"]`);
            
            grids.forEach(grid => {
                grid.innerHTML = '';
                
                EMOJI_CATEGORIES[category].forEach(emoji => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'emoji-option';
                    button.textContent = emoji;
                    button.title = emoji;
                    
                    button.addEventListener('click', () => {
                        // Update input value
                        emojiInput.value = emoji;
                        
                        // Remove selected class from all emojis in edit modal
                        document.querySelectorAll('#edit-category-modal .emoji-option').forEach(opt => {
                            opt.classList.remove('selected');
                        });
                        
                        // Add selected class to clicked emoji
                        button.classList.add('selected');
                    });
                    
                    grid.appendChild(button);
                });
            });
        });
    }
    
    /**
     * Render predefined categories list
     */
    renderPredefinedCategoriesList() {
        const listContainer = document.getElementById('predefined-categories-list');
        if (!listContainer) return;
        
        listContainer.innerHTML = '';
        
        const counts = this.categoryManager.getCategoryCounts(this.recipes);
        
        this.categoryManager.predefinedCategories.forEach(category => {
            const item = this.createCategoryItem(category, counts[category.id] || 0, false);
            listContainer.appendChild(item);
        });
    }
    
    /**
     * Render custom categories list
     */
    renderCustomCategoriesList() {
        const listContainer = document.getElementById('custom-categories-list');
        const emptyState = document.getElementById('custom-categories-empty');
        if (!listContainer || !emptyState) return;
        
        listContainer.innerHTML = '';
        
        const customCategories = this.categoryManager.customCategories;
        
        if (customCategories.length === 0) {
            emptyState.style.display = 'block';
            listContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            listContainer.style.display = 'flex';
            
            const counts = this.categoryManager.getCategoryCounts(this.recipes);
            
            customCategories.forEach(category => {
                const item = this.createCategoryItem(category, counts[category.id] || 0, true);
                listContainer.appendChild(item);
            });
        }
    }
    
    /**
     * Create category item element
     * @param {Object} category - Category object
     * @param {number} count - Recipe count
     * @param {boolean} showActions - Show edit/delete buttons
     * @returns {HTMLElement} Category item element
     */
    createCategoryItem(category, count, showActions) {
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
        
        infoDiv.appendChild(emoji);
        infoDiv.appendChild(name);
        infoDiv.appendChild(badge);
        infoDiv.appendChild(countSpan);
        
        item.appendChild(infoDiv);
        
        // Actions (only for custom categories)
        if (showActions) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'category-actions';
            
            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'btn-icon btn-edit-category';
            editBtn.textContent = '✏️';
            editBtn.title = 'Editar';
            editBtn.addEventListener('click', () => {
                this.handleEditCategory(category.id);
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn-icon btn-delete-category';
            deleteBtn.textContent = '🗑️';
            deleteBtn.title = 'Eliminar';
            deleteBtn.addEventListener('click', () => {
                this.handleDeleteCategory(category.id);
            });
            
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);
            
            item.appendChild(actionsDiv);
        }
        
        return item;
    }
    
    /**
     * Show category management modal
     */
    showCategoryModal() {
        const modal = document.getElementById('category-modal');
        if (modal) {
            modal.classList.remove('hidden');
            this.renderCategoryModal();
            
            // Clear form
            document.getElementById('new-category-name').value = '';
            document.getElementById('new-category-emoji').value = '';
            document.getElementById('category-error').textContent = '';
        }
    }
    
    /**
     * Close category management modal
     */
    closeCategoryModal() {
        const modal = document.getElementById('category-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    /**
     * Handle create category
     */
    handleCreateCategory() {
        const nameInput = document.getElementById('new-category-name');
        const emojiInput = document.getElementById('new-category-emoji');
        const colorInput = document.getElementById('selected-color');
        const errorMessage = document.getElementById('category-error');
        
        if (!nameInput || !emojiInput || !colorInput || !errorMessage) return;
        
        // Clear previous error
        errorMessage.textContent = '';
        
        try {
            // Create category
            const category = this.categoryManager.createCategory({
                name: nameInput.value,
                emoji: emojiInput.value || DEFAULT_EMOJI,
                color: colorInput.value || CATEGORY_COLORS[0]
            });
            
            // Update UI
            this.renderFilterChips();
            this.renderCategorySelector();
            this.renderCustomCategoriesList();
            
            // Clear form
            nameInput.value = '';
            emojiInput.value = '';
            
            // Reset color selection
            const colorPalette = document.getElementById('color-palette');
            if (colorPalette) {
                colorPalette.querySelectorAll('.color-chip').forEach((chip, index) => {
                    if (index === 0) {
                        chip.classList.add('selected');
                        colorInput.value = chip.dataset.color;
                    } else {
                        chip.classList.remove('selected');
                    }
                });
            }
            
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
        document.getElementById('edit-category-emoji').value = category.emoji || DEFAULT_EMOJI;
        document.getElementById('edit-category-id').value = category.id;
        document.getElementById('edit-selected-color').value = category.color;
        document.getElementById('edit-category-error').textContent = '';
        
        // Render color palette for edit
        this.renderEditColorPalette(category.color);
        
        // Render emoji picker for edit
        this.renderEditEmojiPicker();
        
        // Select current emoji in picker
        setTimeout(() => {
            const currentEmoji = category.emoji || DEFAULT_EMOJI;
            const emojiButtons = document.querySelectorAll('#edit-category-modal .emoji-option');
            emojiButtons.forEach(btn => {
                if (btn.textContent === currentEmoji) {
                    btn.classList.add('selected');
                }
            });
        }, 0);
        
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
     * Render color palette for edit modal
     * @param {string} selectedColor - Currently selected color
     */
    renderEditColorPalette(selectedColor) {
        const colorPalette = document.getElementById('edit-color-palette');
        if (!colorPalette) return;
        
        colorPalette.innerHTML = '';
        
        CATEGORY_COLORS.forEach((color) => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'color-chip';
            chip.style.backgroundColor = color;
            chip.dataset.color = color;
            
            // Select current color
            if (color === selectedColor) {
                chip.classList.add('selected');
            }
            
            chip.addEventListener('click', () => {
                // Remove selected class from all chips
                colorPalette.querySelectorAll('.color-chip').forEach(c => c.classList.remove('selected'));
                // Add selected class to clicked chip
                chip.classList.add('selected');
                // Update hidden input
                document.getElementById('edit-selected-color').value = color;
            });
            
            colorPalette.appendChild(chip);
        });
    }
    
    /**
     * Handle save edited category
     */
    async handleSaveEditCategory() {
        const nameInput = document.getElementById('edit-category-name');
        const emojiInput = document.getElementById('edit-category-emoji');
        const colorInput = document.getElementById('edit-selected-color');
        const categoryIdInput = document.getElementById('edit-category-id');
        const errorMessage = document.getElementById('edit-category-error');
        
        if (!nameInput || !emojiInput || !colorInput || !categoryIdInput || !errorMessage) return;
        
        const categoryId = categoryIdInput.value;
        
        // Clear previous error
        errorMessage.textContent = '';
        
        try {
            // Update category
            const oldId = categoryId;
            const result = this.categoryManager.updateCategory(categoryId, {
                name: nameInput.value.trim(),
                emoji: emojiInput.value.trim() || DEFAULT_EMOJI,
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
     * Handle delete category
     * @param {string} categoryId - Category ID to delete
     */
    async handleDeleteCategory(categoryId) {
        const category = this.categoryManager.getCategoryById(categoryId);
        if (!category) return;
        
        // Count affected recipes
        const affectedCount = this.recipes.filter(r => r.category === categoryId).length;
        
        // Confirm deletion
        let message = `¿Estás seguro de que quieres eliminar la categoría "${category.name}"?`;
        if (affectedCount > 0) {
            message += `\n\n${affectedCount} ${affectedCount === 1 ? 'receta' : 'recetas'} ${affectedCount === 1 ? 'usa' : 'usan'} esta categoría y ${affectedCount === 1 ? 'pasará' : 'pasarán'} a "Sin categoría".`;
        }
        
        if (!confirm(message)) return;
        
        try {
            // Delete category
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
            this.showSuccess(`Categoría "${category.name}" eliminada correctamente`);
            
        } catch (error) {
            this.showError('Error al eliminar la categoría: ' + error.message);
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

        // Name field validation (real-time)
        const nameInput = document.getElementById('recipe-name');
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                this.validateNameField();
            });

            nameInput.addEventListener('blur', () => {
                this.validateNameField();
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
    }

    /**
     * Setup cooking action buttons event listeners
     */
    setupCookingActionButtons() {
        const actionButtons = document.querySelectorAll('.cooking-action-btn');
        const descriptionTextarea = document.getElementById('sequence-description');
        
        if (!descriptionTextarea) return;
        
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                let action = button.dataset.action;
                const currentValue = descriptionTextarea.value;
                
                // Insert action at cursor position or at the end
                const cursorPos = descriptionTextarea.selectionStart;
                const textBefore = currentValue.substring(0, cursorPos);
                const textAfter = currentValue.substring(cursorPos);
                
                // Check if we need to capitalize (start of text or after period)
                const shouldCapitalize = textBefore.length === 0 || 
                                       textBefore.trimEnd().endsWith('.') ||
                                       textBefore.trimEnd().endsWith('!') ||
                                       textBefore.trimEnd().endsWith('?');
                
                // Capitalize first letter if needed
                if (shouldCapitalize && action.length > 0) {
                    action = action.charAt(0).toUpperCase() + action.slice(1);
                }
                
                // Add space before if needed
                const needsSpaceBefore = textBefore.length > 0 && !textBefore.endsWith(' ') && !textBefore.endsWith('\n');
                const prefix = needsSpaceBefore ? ' ' : '';
                
                // Update textarea value
                descriptionTextarea.value = textBefore + prefix + action + textAfter;
                
                // Set cursor position after inserted text
                const newCursorPos = cursorPos + prefix.length + action.length;
                descriptionTextarea.setSelectionRange(newCursorPos, newCursorPos);
                
                // Focus textarea
                descriptionTextarea.focus();
            });
        });
    }

    /**
     * Setup collapsible sections event listeners
     */
    setupCollapsibleSections() {
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
            // Expand
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

        // Allow Enter key to add ingredient
        const ingredientInputs = document.querySelectorAll('.ingredient-input');
        ingredientInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleAddIngredient();
                }
            });
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

        // Upload video button
        const uploadVideoBtn = document.getElementById('upload-video-btn');
        const videoUploadInput = document.getElementById('video-upload');

        if (uploadVideoBtn && videoUploadInput) {
            uploadVideoBtn.addEventListener('click', () => {
                videoUploadInput.click();
            });

            videoUploadInput.addEventListener('change', (e) => {
                this.handleVideoUpload(e.target.files);
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
            if (clearBtn && (this.activeFilters.size > 0 || this.activeTimeFilter !== 'all')) {
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
        const hasActiveFilters = this.activeFilters.size > 0 || this.activeTimeFilter !== 'all';
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
        
        // Clear time filter
        this.activeTimeFilter = 'all';
        
        // Update UI - category chips
        const categoryChips = document.querySelectorAll('#filter-bar .filter-chip');
        categoryChips.forEach(chip => {
            if (chip.dataset.category === 'all') {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });
        
        // Update UI - time chips
        const timeChips = document.querySelectorAll('#time-filter-chips .filter-chip');
        timeChips.forEach(chip => {
            if (chip.dataset.time === 'all') {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });
        
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

    /**
     * Handle time filter chip click
     */
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

    /**
     * Mark available categories based on active time filter
     */
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
                if (category === 'sin-categoria') {
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

        // Apply category filter
        if (this.activeFilters.size > 0) {
            filtered = filtered.filter(recipe => {
                // Check if recipe matches ANY of the active filters
                let matches = false;
                
                // Check "caravana" filter - special case
                if (this.activeFilters.has('caravana') && recipe.caravanFriendly === true) {
                    matches = true;
                }

                // Check "sin-categoria" filter
                if (this.activeFilters.has('sin-categoria') && (recipe.category === null || recipe.category === undefined)) {
                    matches = true;
                }

                // Check if recipe category matches any active filter (excluding special filters)
                if (recipe.category && this.activeFilters.has(recipe.category)) {
                    matches = true;
                }

                return matches;
            });
        }

        // Apply time filter
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

            // Sort by proximity to selected time filter
            if (this.activeTimeFilter !== 'none') {
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

        return filtered;
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

        // Show header actions when in list view
        this.showHeaderActions();

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
     * Create a recipe card element
     * @param {Recipe} recipe - Recipe to display
     * @returns {HTMLElement} Recipe card element
     */
    createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.dataset.recipeId = recipe.id;

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

        // Add time badge if totalTime exists
        if (recipe.totalTime && recipe.totalTime.trim() !== '') {
            const timeBadge = document.createElement('div');
            timeBadge.className = 'recipe-time-badge';
            timeBadge.textContent = recipe.totalTime;
            imageDiv.appendChild(timeBadge);
        }

        // Add action badges
        const ingredientsBadge = this.createActionBadge({
            className: 'recipe-ingredients-badge',
            title: 'Copiar ingredientes',
            ariaLabel: `Copiar ingredientes de ${recipe.name}`,
            onClick: (e) => this.copyIngredientsToClipboard(recipe, e),
            stopPropagation: false
        });
        imageDiv.appendChild(ingredientsBadge);

        const pdfBadge = this.createActionBadge({
            className: 'recipe-pdf-badge',
            title: 'Exportar a PDF',
            ariaLabel: `Exportar ${recipe.name} a PDF`,
            onClick: (e) => this.exportRecipeToPDF(recipe.id),
            stopPropagation: true
        });
        imageDiv.appendChild(pdfBadge);

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
            categorySpan.textContent = 'Sin categoría';
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

        // Hide header actions when in form view
        this.hideHeaderActions();

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

        // Update form title
        const formTitle = document.getElementById('form-title');
        if (formTitle) {
            formTitle.textContent = recipeId ? 'Editar Receta' : 'Nueva Receta';
        }

        // Reset form
        this.resetForm();

        // Render category selector with current categories
        this.renderCategorySelector();

        // Set collapsible sections state based on create/edit mode
        // Collapsed when editing, expanded when creating
        const isEditing = recipeId !== null;
        this.setCollapsibleSectionState('ingredients', isEditing);
        this.setCollapsibleSectionState('sequences', isEditing);
        this.setCollapsibleSectionState('additional-info', isEditing);

        // If editing, load recipe data
        if (recipeId) {
            this.loadRecipeIntoForm(recipeId);
        }

        // Update current view state
        this.currentView = 'form';
        this.currentRecipeId = recipeId;

        // Scroll to top
        window.scrollTo(0, 0);
    }

    /**
     * Close recipe form and return to list view
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

        // Hide form view
        const formView = document.getElementById('recipe-form-view');
        if (formView) {
            formView.classList.add('hidden');
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

        // Show header actions when closing form
        this.showHeaderActions();

        // Reset form
        this.resetForm();

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
        this.videos = [];
        this.renderImagesPreview();
        this.renderVideosPreview();

        // Clear multimedia error messages
        const imageError = document.getElementById('image-error');
        if (imageError) {
            imageError.textContent = '';
        }

        const videoError = document.getElementById('video-error');
        if (videoError) {
            videoError.textContent = '';
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
            name: document.getElementById('recipe-name')?.value || '',
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
        const errorMessage = document.getElementById('name-error');

        if (!nameInput || !errorMessage) {
            console.error('[Validation] Name input or error message element not found');
            return false;
        }

        const name = nameInput.value.trim();

        // Check if empty
        if (name === '') {
            errorMessage.textContent = 'El nombre de la receta es obligatorio';
            nameInput.classList.add('invalid');
            console.warn('[Validation] Recipe name is empty');
            return false;
        }

        // Check minimum length
        if (name.length < 3) {
            errorMessage.textContent = 'El nombre debe tener al menos 3 caracteres';
            nameInput.classList.add('invalid');
            console.warn('[Validation] Recipe name too short:', name.length);
            return false;
        }

        // Check maximum length
        if (name.length > 100) {
            errorMessage.textContent = 'El nombre no puede exceder 100 caracteres';
            nameInput.classList.add('invalid');
            console.warn('[Validation] Recipe name too long:', name.length);
            return false;
        }

        // Check for invalid characters (optional - only allow alphanumeric, spaces, and common punctuation)
        const validNamePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s\-.,()&]+$/;
        if (!validNamePattern.test(name)) {
            errorMessage.textContent = 'El nombre contiene caracteres no permitidos';
            nameInput.classList.add('invalid');
            console.warn('[Validation] Recipe name contains invalid characters');
            return false;
        }

        // Valid
        errorMessage.textContent = '';
        nameInput.classList.remove('invalid');
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
        if (nameInput && (!nameInput.value || nameInput.value.trim() === '')) {
            // Generate auto name: GonsoReceta [number]
            const autoName = this.generateAutoRecipeName();
            nameInput.value = autoName;
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

        // Show loading state
        const saveBtn = document.getElementById('save-recipe-btn');
        const originalText = saveBtn?.textContent;
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.textContent = '💾 Guardando...';
        }

        try {
            // Save recipe
            await this.saveRecipe(formData);

            // Show success message
            this.showSuccess('¡Receta guardada exitosamente!');

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
            // Validate form data
            if (!formData.name || formData.name.trim() === '') {
                throw new Error('El nombre de la receta es obligatorio');
            }

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
                    name: formData.name,
                    category: formData.category || null,
                    totalTime: formData.totalTime,
                    caravanFriendly: formData.caravanFriendly || false,
                    preparationMethod: formData.preparationMethod,
                    kitchenAppliances: formData.kitchenAppliances || [],
                    author: formData.author,
                    history: formData.history,
                    ingredients: formData.ingredients,
                    additionSequences: formData.additionSequences,
                    images: formData.images,
                    videos: formData.videos,
                    createdAt: existingRecipe.createdAt,
                    updatedAt: new Date()
                });
            } else {
                // Creating new recipe
                recipe = new Recipe({
                    name: formData.name,
                    category: formData.category || null,
                    totalTime: formData.totalTime,
                    caravanFriendly: formData.caravanFriendly || false,
                    preparationMethod: formData.preparationMethod,
                    kitchenAppliances: formData.kitchenAppliances || [],
                    author: formData.author,
                    history: formData.history,
                    ingredients: formData.ingredients,
                    additionSequences: formData.additionSequences,
                    images: formData.images,
                    videos: formData.videos,
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
     * Get form data
     * Requirements: 1.2, 3.3, 5.3, 9.2
     * @returns {object} Form data
     */
    getFormData() {
        return {
            name: document.getElementById('recipe-name')?.value.trim() || '',
            category: document.getElementById('recipe-category')?.value || null,
            totalTime: this.parseTimeInput('recipe'),
            caravanFriendly: document.getElementById('recipe-caravan-friendly')?.checked || false,
            preparationMethod: document.getElementById('preparation-method')?.value.trim() || '',
            kitchenAppliances: this.selectedAppliances,
            author: document.getElementById('recipe-author')?.value.trim() || '',
            history: document.getElementById('recipe-history')?.value.trim() || '',
            ingredients: this.ingredients,
            additionSequences: this.sequences,
            images: this.images,
            videos: this.videos
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
            saveBtn.textContent = '✓';
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
            cancelBtn.textContent = '✕';
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

            infoDiv.appendChild(nameDiv);
            infoDiv.appendChild(quantityDiv);

            // Actions
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'ingredient-actions';

            // Move up button
            const upBtn = document.createElement('button');
            upBtn.type = 'button';
            upBtn.className = 'btn-ingredient-action btn-up';
            upBtn.textContent = '↑';
            upBtn.title = 'Mover arriba';
            upBtn.disabled = index === 0;
            upBtn.addEventListener('click', () => {
                this.handleMoveIngredient(index, 'up');
            });

            // Move down button
            const downBtn = document.createElement('button');
            downBtn.type = 'button';
            downBtn.className = 'btn-ingredient-action btn-down';
            downBtn.textContent = '↓';
            downBtn.title = 'Mover abajo';
            downBtn.disabled = index === this.ingredients.length - 1;
            downBtn.addEventListener('click', () => {
                this.handleMoveIngredient(index, 'down');
            });

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'btn-ingredient-action btn-edit';
            editBtn.textContent = '✎';
            editBtn.title = 'Editar';
            editBtn.addEventListener('click', () => {
                this.handleEditIngredient(ingredient.id);
            });

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn-ingredient-action btn-delete';
            deleteBtn.textContent = '🗑';
            deleteBtn.title = 'Eliminar';
            deleteBtn.addEventListener('click', () => {
                this.handleDeleteIngredient(ingredient.id);
            });

            actionsDiv.appendChild(upBtn);
            actionsDiv.appendChild(downBtn);
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);

            item.appendChild(orderDiv);
            item.appendChild(infoDiv);
            item.appendChild(actionsDiv);
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
            emptyMessage.textContent = 'Añade ingredientes primero';
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

        if (ingredientIds.length === 0) {
            errorMessage.textContent = 'Debes seleccionar al menos un ingrediente';
            return;
        }

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
            saveBtn.textContent = '✓';
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
            cancelBtn.textContent = '✕';
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

            // Move up button
            const upBtn = document.createElement('button');
            upBtn.type = 'button';
            upBtn.className = 'btn-sequence-action btn-up';
            upBtn.textContent = '↑';
            upBtn.title = 'Mover arriba';
            upBtn.disabled = index === 0;
            upBtn.addEventListener('click', () => {
                this.handleMoveSequence(index, 'up');
            });

            // Move down button
            const downBtn = document.createElement('button');
            downBtn.type = 'button';
            downBtn.className = 'btn-sequence-action btn-down';
            downBtn.textContent = '↓';
            downBtn.title = 'Mover abajo';
            downBtn.disabled = index === this.sequences.length - 1;
            downBtn.addEventListener('click', () => {
                this.handleMoveSequence(index, 'down');
            });

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'btn-sequence-action btn-edit';
            editBtn.textContent = '✎';
            editBtn.title = 'Editar';
            editBtn.addEventListener('click', () => {
                this.handleEditSequence(sequence.id);
            });

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn-sequence-action btn-delete';
            deleteBtn.textContent = '🗑';
            deleteBtn.title = 'Eliminar';
            deleteBtn.addEventListener('click', () => {
                this.handleDeleteSequence(sequence.id);
            });

            actionsDiv.appendChild(upBtn);
            actionsDiv.appendChild(downBtn);
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
                nameInput.value = recipe.name || '';
            }

            const categorySelect = document.getElementById('recipe-category');
            if (categorySelect) {
                categorySelect.value = recipe.category || '';
            }

            // Populate time using unified function
            this.populateTimeInput('recipe', recipe.totalTime || '');

            // Populate caravan friendly checkbox
            const caravanCheckbox = document.getElementById('recipe-caravan-friendly');
            if (caravanCheckbox) {
                caravanCheckbox.checked = recipe.caravanFriendly || false;
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
            this.videos = recipe.videos ? [...recipe.videos] : [];
            this.renderImagesPreview();
            this.renderVideosPreview();
            
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
     * Handle video upload with enhanced error handling
     * Requirements: 5.1, 5.2, 5.3, 5.4, 1.3
     * @param {FileList} files - Files to upload
     */
    async handleVideoUpload(files) {
        const errorMessage = document.getElementById('video-error');
        if (errorMessage) {
            errorMessage.textContent = '';
        }

        if (!files || files.length === 0) {
            console.warn('[Upload] No files selected for video upload');
            return;
        }

        console.log('[Upload] Iniciando carga de', files.length, 'video(s)');

        // Show loading state
        const uploadBtn = document.getElementById('upload-video-btn');
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
                    console.log('[Upload] Procesando video:', file.name);

                    // Validate file
                    this.validateVideoFile(file);

                    // Convert to Base64
                    const mediaFile = await this.processVideoFile(file);

                    // Add to videos array
                    this.videos.push(mediaFile);
                    successCount++;

                    console.log('[Upload] Video procesado exitosamente:', file.name);
                } catch (error) {
                    errorCount++;
                    console.error('[Upload] Error procesando video:', file.name, error);
                    errors.push(`${file.name}: ${error.message}`);

                    if (errorMessage) {
                        errorMessage.textContent = `Error con ${file.name}: ${error.message}`;
                    }
                }
            }

            // Clear file input
            const videoUploadInput = document.getElementById('video-upload');
            if (videoUploadInput) {
                videoUploadInput.value = '';
            }

            // Re-render videos preview
            this.renderVideosPreview();

            // Show summary message
            if (successCount > 0 && errorCount === 0) {
                this.showSuccess(`${successCount} video(s) cargado(s) exitosamente`);
            } else if (successCount > 0 && errorCount > 0) {
                this.showWarning(`${successCount} video(s) cargado(s), ${errorCount} con errores`);
            } else if (errorCount > 0) {
                this.showError(`Error al cargar todos los videos`);
            }

        } catch (error) {
            console.error('[Upload] Error general al cargar videos:', error);
            this.showError('Error al cargar videos: ' + error.message);
            if (errorMessage) {
                errorMessage.textContent = 'Error al cargar videos: ' + error.message;
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
     * Validate video file with comprehensive checks
     * Requirements: 5.2, 1.3
     * @param {File} file - File to validate
     * @throws {MediaError} If validation fails
     */
    validateVideoFile(file) {
        console.log('[Validation] Validando video:', file.name, 'Tipo:', file.type, 'Tamaño:', file.size);

        // Check if file exists
        if (!file) {
            console.error('[Validation] No file provided');
            throw new MediaError(
                'No se proporcionó ningún archivo',
                MediaError.INVALID_FORMAT
            );
        }

        // Check file type
        const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
        if (!validTypes.includes(file.type.toLowerCase())) {
            console.warn('[Validation] Invalid video format:', file.type);
            throw new MediaError(
                `Formato no soportado: ${file.type}. Use MP4 o WebM`,
                MediaError.INVALID_FORMAT
            );
        }

        // Check file size (50MB limit)
        const maxSize = 50 * 1024 * 1024; // 50MB in bytes
        if (file.size > maxSize) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            console.warn('[Validation] Video too large:', sizeMB, 'MB');
            throw new MediaError(
                `El video es demasiado grande (${sizeMB}MB). Máximo 50MB`,
                MediaError.FILE_TOO_LARGE
            );
        }

        // Check minimum size (avoid empty files)
        if (file.size < 1000) {
            console.warn('[Validation] Video too small:', file.size, 'bytes');
            throw new MediaError(
                'El archivo parece estar vacío o corrupto',
                MediaError.INVALID_FORMAT
            );
        }

        // Warning for localStorage fallback
        if (this.storageManager.useLocalStorageFallback && file.size > 5 * 1024 * 1024) {
            console.warn('[Validation] Large video with localStorage fallback');
            this.showWarning('Advertencia: Está usando almacenamiento limitado. Videos grandes pueden causar problemas.');
        }

        console.log('[Validation] Video válido:', file.name);
    }

    /**
     * Process video file - convert to Base64
     * Requirements: 5.3, 5.4
     * @param {File} file - File to process
     * @returns {Promise<MediaFile>} Processed media file
     */
    async processVideoFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const videoData = e.target.result;

                    // Create MediaFile
                    const mediaFile = new MediaFile({
                        name: file.name,
                        type: file.type,
                        data: videoData,
                        size: videoData.length
                    });

                    resolve(mediaFile);
                } catch (error) {
                    reject(new MediaError(
                        'Error al procesar video: ' + error.message,
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
     * Render videos preview
     * Requirements: 5.5
     */
    renderVideosPreview() {
        const videosPreview = document.getElementById('videos-preview');
        const videosEmpty = document.getElementById('videos-empty');

        if (!videosPreview || !videosEmpty) {
            return;
        }

        // Clear preview
        videosPreview.innerHTML = '';

        // Show/hide empty state
        if (this.videos.length === 0) {
            videosEmpty.classList.remove('hidden');
            videosPreview.style.display = 'none';
            return;
        }

        videosEmpty.classList.add('hidden');
        videosPreview.style.display = 'grid';

        // Render each video
        this.videos.forEach((video, index) => {
            const previewItem = this.createMediaPreviewItem(video, index, 'video');
            videosPreview.appendChild(previewItem);
        });
    }

    /**
     * Create media preview item
     * Requirements: 5.5
     * @param {MediaFile} mediaFile - Media file to preview
     * @param {number} index - Index in array
     * @param {string} type - 'image' or 'video'
     * @returns {HTMLElement} Preview item element
     */
    createMediaPreviewItem(mediaFile, index, type) {
        const item = document.createElement('div');
        item.className = 'media-preview-item';
        item.dataset.mediaId = mediaFile.id;

        // Preview container
        const previewContainer = document.createElement('div');
        previewContainer.className = 'media-preview-container';

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = mediaFile.data;
            img.alt = mediaFile.name;
            img.className = 'media-preview-image';
            previewContainer.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = mediaFile.data;
            video.className = 'media-preview-video';
            video.controls = true;
            previewContainer.appendChild(video);
        }

        // Delete button overlay
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'media-delete-btn';
        deleteBtn.textContent = '🗑';
        deleteBtn.title = 'Eliminar';
        deleteBtn.addEventListener('click', () => {
            this.handleDeleteMedia(mediaFile.id, type);
        });

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
        item.appendChild(deleteBtn);
        item.appendChild(infoDiv);

        return item;
    }

    /**
     * Handle deleting a media file
     * Requirements: 5.5
     * @param {string} mediaId - Media file ID to delete
     * @param {string} type - 'image' or 'video'
     */
    handleDeleteMedia(mediaId, type) {
        if (!confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
            return;
        }

        if (type === 'image') {
            this.images = this.images.filter(img => img.id !== mediaId);
            this.renderImagesPreview();
        } else if (type === 'video') {
            this.videos = this.videos.filter(vid => vid.id !== mediaId);
            this.renderVideosPreview();
        }
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

        // Hide header actions when viewing recipe detail
        this.hideHeaderActions();

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
     * Adjust recipe name font size dynamically to fill available width
     * @param {HTMLElement} nameElement - The h2 element containing the recipe name
     */
    adjustRecipeNameFontSize(nameElement) {
        if (!nameElement) return;
        
        const containerWidth = nameElement.parentElement.offsetWidth;
        const textLength = nameElement.textContent.length;
        
        // Base font sizes (in rem)
        const maxFontSize = 3;    // Desktop max: 3rem (48px)
        const minFontSize = 1.5;  // Minimum: 1.5rem (24px)
        
        // Calculate font size based on text length
        // Shorter names get larger font, longer names get smaller font
        let fontSize;
        
        if (textLength <= 10) {
            fontSize = maxFontSize;  // Very short: max size
        } else if (textLength <= 20) {
            fontSize = maxFontSize - ((textLength - 10) * 0.05);  // Gradual decrease
        } else if (textLength <= 30) {
            fontSize = 2.5 - ((textLength - 20) * 0.05);
        } else if (textLength <= 40) {
            fontSize = 2 - ((textLength - 30) * 0.03);
        } else {
            fontSize = minFontSize;  // Very long: min size
        }
        
        // Ensure we don't go below minimum
        fontSize = Math.max(fontSize, minFontSize);
        
        // Apply font size
        nameElement.style.fontSize = `${fontSize}rem`;
        
        // Check if text overflows and adjust further if needed
        setTimeout(() => {
            if (nameElement.scrollWidth > containerWidth) {
                // Text still overflows, reduce font size slightly
                let adjustedSize = fontSize * 0.95;
                adjustedSize = Math.max(adjustedSize, minFontSize);
                nameElement.style.fontSize = `${adjustedSize}rem`;
            }
        }, 0);
    }

    /**
     * Render recipe detail
     * Requirements: 3.4, 4.4, 5.5, 9.4
     * @param {Recipe} recipe - Recipe to display
     */
    renderRecipeDetail(recipe) {
        // Recipe name with dynamic font sizing
        const nameElement = document.getElementById('detail-recipe-name');
        if (nameElement) {
            nameElement.textContent = recipe.name;
            // Apply dynamic font sizing based on name length
            this.adjustRecipeNameFontSize(nameElement);
            // Make it clickable to go back to home
            nameElement.style.cursor = 'pointer';
            nameElement.onclick = () => {
                this.goToHome();
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

        // Total Time - Now shown on gallery image, hide from header
        const totalTimeElement = document.getElementById('detail-total-time');
        if (totalTimeElement) {
            totalTimeElement.style.display = 'none';
        }

        // Caravan Friendly Badge - Now shown in image gallery, hide from header
        const caravanBadge = document.getElementById('detail-caravan-badge');
        if (caravanBadge) {
            caravanBadge.style.display = 'none';
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
        this.renderDetailMultimedia(recipe.images, recipe.videos, recipe.name, recipe.totalTime, recipe.category, recipe.caravanFriendly);

        // Metadata
        this.renderDetailMetadata(recipe);

        // QR Code
        this.renderDetailQRCode(recipe);
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
            nameSpan.textContent = `${index + 1}. ${ingredient.name}`;

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

            li.appendChild(nameSpan);
            li.appendChild(quantitySpan);
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

        // Render each appliance as a chip with appliance-chip style
        appliances.forEach(applianceId => {
            const appliance = KITCHEN_APPLIANCES.find(a => a.id === applianceId);
            if (appliance) {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'appliance-chip';
                chip.innerHTML = `<span class="chip-emoji">${appliance.emoji}</span> ${appliance.name}`;
                chip.disabled = true; // Read-only in detail view
                chip.style.cursor = 'default';
                chipsContainer.appendChild(chip);
            }
        });
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

            // Ingredients tags (first line)
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

            // Description and duration container (second line)
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
    renderPhotoGallery(images, recipeName = '', totalTime = '', caravanFriendly = false) {
        // Validation
        if (!images || !Array.isArray(images) || images.length === 0) {
            console.warn('[PhotoGallery] No images provided');
            return null;
        }

        // If only 1 image, use traditional rendering
        if (images.length === 1) {
            return this.renderSingleImage(images[0], recipeName, totalTime, caravanFriendly);
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
        const mainArea = this.renderGalleryMain(images[0], 0, images.length, recipeName, totalTime, caravanFriendly);
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
    renderSingleImage(image, recipeName = '', totalTime = '', caravanFriendly = false) {
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

        // Add time badge if totalTime exists
        if (totalTime && totalTime.trim() !== '') {
            const timeBadge = document.createElement('div');
            timeBadge.className = 'recipe-time-badge';
            timeBadge.textContent = totalTime;
            item.appendChild(timeBadge);
        }

        // Add caravan badge if caravanFriendly
        if (caravanFriendly) {
            const caravanBadge = document.createElement('div');
            caravanBadge.className = 'recipe-caravan-badge-image';
            caravanBadge.textContent = '🚐 Apto para Caravana';
            item.appendChild(caravanBadge);
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
    renderGalleryMain(image, index, total, recipeName = '', totalTime = '', caravanFriendly = false) {
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

        // Add click to open modal
        img.addEventListener('click', () => {
            this.openImageModal(this.galleryState.images, index);
        });

        mainArea.appendChild(img);

        // Add time badge if totalTime exists
        if (totalTime && totalTime.trim() !== '') {
            const timeBadge = document.createElement('div');
            timeBadge.className = 'recipe-time-badge';
            timeBadge.textContent = totalTime;
            mainArea.appendChild(timeBadge);
        }

        // Add caravan badge if caravanFriendly
        if (caravanFriendly) {
            const caravanBadge = document.createElement('div');
            caravanBadge.className = 'recipe-caravan-badge-image';
            caravanBadge.textContent = '🚐 Apto para Caravana';
            mainArea.appendChild(caravanBadge);
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
    renderDetailMultimedia(images, videos, recipeName = '', totalTime = '', category = '', caravanFriendly = false) {
        const sectionElement = document.getElementById('detail-multimedia-section');
        const imagesGallery = document.getElementById('detail-images-gallery');
        const videosGallery = document.getElementById('detail-videos-gallery');

        if (!sectionElement || !imagesGallery || !videosGallery) return;

        // Clear galleries
        imagesGallery.innerHTML = '';
        videosGallery.innerHTML = '';

        const hasImages = images && images.length > 0;
        const hasVideos = videos && videos.length > 0;

        if (!hasImages && !hasVideos) {
            sectionElement.style.display = 'none';
            return;
        }

        sectionElement.style.display = 'block';

        // NUEVO: Render images using gallery for 2+ images
        if (hasImages) {
            if (images.length >= 2) {
                // Use photo gallery for multiple images
                const gallery = this.renderPhotoGallery(images, recipeName, totalTime, caravanFriendly);
                if (gallery) {
                    imagesGallery.appendChild(gallery);
                }
            } else {
                // Use traditional rendering for single image
                const singleImage = this.renderSingleImage(images[0], recipeName, totalTime, caravanFriendly);
                imagesGallery.appendChild(singleImage);
            }
        }

        // Render videos (unchanged)
        if (hasVideos) {
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

        // Copy ingredients button
        const copyIngredientsBtn = document.getElementById('copy-ingredients-btn');
        if (copyIngredientsBtn) {
            copyIngredientsBtn.onclick = async (e) => {
                await this.copyIngredientsFromDetail(recipe, e);
            };
        }
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

            // Deep copy all videos
            const copiedVideos = originalRecipe.videos.map(video =>
                new MediaFile({
                    name: video.name,
                    type: video.type,
                    data: video.data,
                    size: video.size
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
                videos: copiedVideos,
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
        if (detailView) detailView.classList.add('hidden');
        if (formView) formView.classList.add('hidden');

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

        // Show header actions when returning to home
        this.showHeaderActions();

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
        // Show header actions when closing detail
        this.showHeaderActions();

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
        const isDark = document.body.classList.toggle('dark-theme');
        document.documentElement.classList.toggle('dark-theme', isDark);
        localStorage.setItem('recetario_theme', isDark ? 'dark' : 'light');
        this.updateThemeButton(isDark);
        
        // Show feedback
        this.showSuccess(isDark ? '🌙 Tema oscuro activado' : '☀️ Tema claro activado', 2000);
    }

    /**
     * Update theme button icon and text
     * @param {boolean} isDark - Whether dark theme is active
     */
    updateThemeButton(isDark) {
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.innerHTML = isDark ? '☀️ Tema' : '🌙 Tema';
            themeBtn.title = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
        }
        
        // Update mobile theme button
        const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
        if (mobileThemeBtn) {
            mobileThemeBtn.innerHTML = isDark ? '☀️ Tema' : '🌙 Tema';
        }
    }

    // ===== End Theme Management =====

    // ===== Header Actions Visibility =====

    /**
     * Show header actions (buttons in header)
     * Called when in list view
     */
    showHeaderActions() {
        const headerActions = document.getElementById('header-actions');
        if (headerActions) {
            headerActions.style.display = 'flex';
        }
    }

    /**
     * Hide header actions (buttons in header)
     * Called when in detail or form view
     */
    hideHeaderActions() {
        const headerActions = document.getElementById('header-actions');
        if (headerActions) {
            headerActions.style.display = 'none';
        }
    }

    // ===== End Header Actions Visibility =====

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

        // Show loading state
        const importBtn = document.getElementById('import-xml-btn');
        const originalText = importBtn?.textContent;
        if (importBtn) {
            importBtn.disabled = true;
            importBtn.textContent = '⏳ Importando...';
        }

        try {
            console.log('[Import] Starting XML import:', file.name);

            // Import recipes using XMLImporter
            const result = await XMLImporter.importFromFile(file);

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
                await this.storageManager.saveRecipe(recipe);
            }
            
            // Update result summary with duplicate info
            result.summary.imported = newRecipes.length;
            result.summary.duplicates = duplicateRecipes.length;
            result.successful = newRecipes;
            result.duplicates = duplicateRecipes;

            // Reload recipes and update UI
            await this.loadRecipes();
            this.renderFilterChips();
            this.renderRecipeList();

            // Show import summary
            this.showImportSummary(result);

            // Clear file input
            const xmlFileInput = document.getElementById('xml-file-input');
            if (xmlFileInput) {
                xmlFileInput.value = '';
            }

        } catch (error) {
            console.error('[Import] Error importing XML:', error);
            this.showError('Error al importar XML: ' + error.message);
        } finally {
            // Restore button state
            if (importBtn) {
                importBtn.disabled = false;
                importBtn.textContent = originalText;
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

            // Show loading state
            const exportBtn = document.getElementById('export-all-btn');
            const originalText = exportBtn?.textContent;
            if (exportBtn) {
                exportBtn.disabled = true;
                exportBtn.textContent = '⏳ Exportando...';
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

            // Restore button state
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = originalText;
            }

        } catch (error) {
            console.error('[Export] Error exporting recipes:', error);
            this.showError('Error al exportar recetas: ' + error.message);

            // Restore button state on error
            const exportBtn = document.getElementById('export-all-btn');
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = '📤 Exportar Todas';
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

            // Create filename
            const date = new Date().toISOString().split('T')[0];
            const filename = `recetas_${recipes.length}_${date}.xml`;

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
     * Prepare recipe data for QR code export
     * @param {Recipe} recipe - Recipe object
     * @param {string} mode - Export mode: 'full' (default) or 'compact'
     * @returns {string} JSON string of recipe data
     */
    prepareRecipeDataForQR(recipe, mode = 'full') {
        if (mode === 'compact') {
            // Compact mode: Only essential data for smaller QR
            return JSON.stringify({
                n: recipe.name,
                c: recipe.category,
                i: recipe.ingredients.map(i => `${i.name}|${i.quantity}|${i.unit}`).join(';'),
                p: recipe.preparationMethod?.substring(0, 200) || '', // Limit to 200 chars
                t: recipe.totalTime
            });
        }
        
        // Full mode: Complete data
        const recipeExport = {
            name: recipe.name,
            category: recipe.category,
            ingredients: recipe.ingredients.map(i => ({
                name: i.name,
                quantity: i.quantity,
                unit: i.unit
            })),
            preparationMethod: recipe.preparationMethod,
            totalTime: recipe.totalTime
        };
        return JSON.stringify(recipeExport);
    }

    /**
     * Generate QR code URL for recipe data
     * @param {string} recipeData - JSON string of recipe data
     * @param {number} size - QR code size in pixels (default: 200)
     * @param {Object} options - QR generation options
     * @param {string} options.errorCorrection - Error correction level: L, M, Q, H (default: M)
     * @param {number} options.margin - Margin size in modules (default: 1)
     * @returns {string} QR code image URL
     */
    generateQRCodeURL(recipeData, size = 200, options = {}) {
        const { errorCorrection = 'M', margin = 1 } = options;
        
        // Encode recipe data in base64 for URL
        const base64Data = btoa(encodeURIComponent(recipeData));
        const targetURL = `https://guiavfr.enaire.es/#import=${base64Data}`;
        const encodedURL = encodeURIComponent(targetURL);
        
        // Build QR API URL with options
        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedURL}&ecc=${errorCorrection}&margin=${margin}`;
    }

    /**
     * Generate a small QR code (21x21 modules) with minimal data
     * @param {Recipe} recipe - Recipe object
     * @returns {string} QR code image URL
     */
    generateSmallQR(recipe) {
        // For 21x21 QR (Version 1), we need very short data
        // Use compact mode and low error correction
        const compactData = this.prepareRecipeDataForQR(recipe, 'compact');
        
        // If still too large, use only recipe ID
        if (compactData.length > 100) {
            // Fallback: Just use recipe ID
            const shortURL = `https://guiavfr.enaire.es/#r=${recipe.id}`;
            const encodedURL = encodeURIComponent(shortURL);
            return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedURL}&ecc=L&margin=1`;
        }
        
        return this.generateQRCodeURL(compactData, 150, { errorCorrection: 'L', margin: 1 });
    }

    /**
     * Render QR code in detail view
     * @param {Recipe} recipe - Recipe object to generate QR for
     */
    renderDetailQRCode(recipe) {
        const qrContainer = document.getElementById('detail-qr-code');
        const downloadBtn = document.getElementById('detail-download-qr-btn');
        
        if (!qrContainer) return;
        
        // Clear previous QR
        qrContainer.innerHTML = 'Generando código QR...';
        
        try {
            // Use compact mode for smaller QR codes
            const recipeData = this.prepareRecipeDataForQR(recipe, 'compact');
            
            // Generate QR with minimal error correction and margin for smaller size
            const qrUrl = this.generateQRCodeURL(recipeData, 200, {
                errorCorrection: 'L', // Low error correction = smaller QR
                margin: 1 // Minimal margin = smaller QR
            });
            
            // Create image element
            const qrImg = document.createElement('img');
            qrImg.style.width = '200px';
            qrImg.style.height = '200px';
            qrImg.alt = 'Código QR de la receta';
            
            qrImg.onload = () => {
                qrContainer.innerHTML = '';
                qrContainer.appendChild(qrImg);
                
                // Add info about QR size
                const info = document.createElement('p');
                info.style.cssText = 'margin-top: 8px; font-size: 0.75rem; color: var(--color-text-secondary);';
                info.textContent = `Tamaño optimizado • ${Math.ceil(recipeData.length / 1024)}KB de datos`;
                qrContainer.appendChild(info);
            };
            
            qrImg.onerror = () => {
                qrContainer.innerHTML = '<p style="color: var(--color-danger); font-size: 0.875rem;">Error al generar el código QR</p>';
            };
            
            qrImg.src = qrUrl;
            
            // Update download button
            if (downloadBtn) {
                downloadBtn.onclick = () => {
                    if (qrImg.complete && qrImg.naturalHeight !== 0) {
                        const link = document.createElement('a');
                        link.download = `qr-${recipe.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
                        link.href = qrUrl;
                        link.target = '_blank';
                        link.click();
                    }
                };
            }
            
        } catch (error) {
            console.error('[QR] Error generating QR code:', error);
            qrContainer.innerHTML = '<p style="color: var(--color-danger); font-size: 0.875rem;">Error al generar el código QR</p>';
        }
    }



}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.recipeApp = new RecipeApp();
    
    // Check if URL contains recipe import data from QR scan
    checkForRecipeImport();
});

/**
 * Check URL hash for recipe import data and show import modal
 */
function checkForRecipeImport() {
    const hash = window.location.hash;
    
    // Handle full recipe import
    if (hash.startsWith('#import=')) {
        try {
            // Extract and decode recipe data
            const base64Data = hash.substring(8); // Remove '#import='
            const jsonData = decodeURIComponent(atob(base64Data));
            const rawData = JSON.parse(jsonData);
            
            // Convert compact format to full format if needed
            const recipeData = expandRecipeData(rawData);
            
            // Show import confirmation modal
            showRecipeImportModal(recipeData);
            
            // Clean URL hash
            history.replaceState(null, '', window.location.pathname);
            
        } catch (error) {
            console.error('[Import] Error parsing recipe data:', error);
            showNotification('Error al importar la receta. Código QR inválido.', 'error');
        }
    }
    
    // Handle recipe ID reference (for very small QR codes)
    if (hash.startsWith('#r=')) {
        try {
            const recipeId = parseInt(hash.substring(3));
            showNotification('Este QR requiere sincronización con el dispositivo original.', 'info');
            // Future: Could fetch from a shared database
        } catch (error) {
            console.error('[Import] Error parsing recipe ID:', error);
        }
    }
}

/**
 * Expand compact recipe data format to full format
 * @param {Object} data - Recipe data (compact or full format)
 * @returns {Object} Recipe data in full format
 */
function expandRecipeData(data) {
    // Check if data is in compact format (has 'n' instead of 'name')
    if (data.n !== undefined) {
        return {
            name: data.n,
            category: data.c,
            ingredients: data.i.split(';').map(ing => {
                const [name, quantity, unit] = ing.split('|');
                return { name, quantity, unit };
            }),
            preparationMethod: data.p,
            totalTime: data.t
        };
    }
    
    // Already in full format
    return data;
}

/**
 * Show modal to confirm recipe import from QR scan
 * @param {Object} recipeData - Recipe data from QR code
 */
function showRecipeImportModal(recipeData) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = 'background: var(--color-background); padding: 24px; border-radius: 12px; max-width: 500px; width: 90%; box-shadow: 0 8px 32px rgba(0,0,0,0.2);';
    
    modalContent.innerHTML = `
        <h2 style="margin: 0 0 16px 0; color: var(--color-text);">📱 Importar Receta</h2>
        <p style="margin: 0 0 8px 0; color: var(--color-text-secondary);">
            Se ha detectado una receta desde el código QR:
        </p>
        <div style="background: var(--color-surface); padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="margin: 0 0 8px 0; color: var(--color-text);">${recipeData.name}</h3>
            <p style="margin: 0; color: var(--color-text-secondary); font-size: 0.875rem;">
                ${recipeData.ingredients?.length || 0} ingredientes
                ${recipeData.totalTime ? `• ${recipeData.totalTime}` : ''}
            </p>
        </div>
        <p style="margin: 0 0 16px 0; color: var(--color-text-secondary); font-size: 0.875rem;">
            ¿Deseas importar esta receta a tu colección?
        </p>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="cancel-import" class="btn-secondary" style="padding: 10px 20px;">
                Cancelar
            </button>
            <button id="confirm-import" class="btn-primary" style="padding: 10px 20px;">
                ✓ Importar Receta
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Cancel button handler
    document.getElementById('cancel-import').addEventListener('click', () => {
        modal.remove();
    });
    
    // Confirm import handler
    document.getElementById('confirm-import').addEventListener('click', () => {
        importRecipeFromQR(recipeData);
        modal.remove();
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Import recipe from QR code data
 * @param {Object} recipeData - Recipe data to import
 */
function importRecipeFromQR(recipeData) {
    try {
        // Create new recipe with imported data
        const newRecipe = {
            id: Date.now(),
            name: recipeData.name,
            category: recipeData.category || '',
            ingredients: recipeData.ingredients || [],
            preparationMethod: recipeData.preparationMethod || '',
            totalTime: recipeData.totalTime || '',
            images: [], // QR doesn't include images
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add recipe to storage
        const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        
        // Show success notification
        showNotification(`✓ Receta "${recipeData.name}" importada correctamente`, 'success');
        
        // Reload recipes if app is initialized
        if (window.recipeApp) {
            window.recipeApp.loadRecipes();
            
            // Show the imported recipe detail after a short delay
            setTimeout(() => {
                window.recipeApp.showRecipeDetail(newRecipe.id);
            }, 500);
        }
        
    } catch (error) {
        console.error('[Import] Error importing recipe:', error);
        showNotification('Error al importar la receta', 'error');
    }
}

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

    // Mostrar botón de instalación personalizado si no está instalado
    if (!isStandalone()) {
        showInstallButton();
    }
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


