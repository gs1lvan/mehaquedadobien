/**
 * RecipeForm - Component for creating/editing recipes
 * 
 * Handles recipe form with ingredients, sequences, images, and validation.
 * This is a structural implementation - full implementation would be done during integration.
 */
export class RecipeForm {
    constructor(recipeService, categoryService, eventBus) {
        this.recipeService = recipeService;
        this.categoryService = categoryService;
        this.eventBus = eventBus;
        this.container = null;
        this.currentRecipe = null;
        this.ingredients = [];
        this.sequences = [];
        this.images = [];
        this.selectedAppliances = [];
    }

    /**
     * Initialize the component
     */
    init() {
        this.container = document.getElementById('recipe-form');
        
        if (!this.container) {
            console.error('[RecipeForm] Container not found');
            return;
        }

        this.setupEventListeners();
        console.log('[RecipeForm] Initialized');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Form submission
        const form = this.container?.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.save();
            });
        }
    }

    /**
     * Render form for creating/editing recipe
     * @param {string|null} recipeId - Recipe ID to edit, null for new recipe
     */
    render(recipeId = null) {
        if (!this.container) {
            console.error('[RecipeForm] Container not initialized');
            return;
        }

        if (recipeId) {
            // Load recipe for editing
            this.currentRecipe = this.recipeService.getById(recipeId);
            if (!this.currentRecipe) {
                console.error('[RecipeForm] Recipe not found:', recipeId);
                return;
            }
            this.loadRecipeData(this.currentRecipe);
        } else {
            // New recipe
            this.currentRecipe = null;
            this.resetForm();
        }

        console.log('[RecipeForm] Rendered for', recipeId ? 'edit' : 'create');
    }

    /**
     * Load recipe data into form
     * @param {Object} recipe - Recipe to load
     */
    loadRecipeData(recipe) {
        this.ingredients = recipe.ingredients || [];
        this.sequences = recipe.sequences || [];
        this.images = recipe.images || [];
        this.selectedAppliances = recipe.appliances || [];
        
        // Populate form fields
        // This would be implemented with actual form field population
        console.log('[RecipeForm] Loaded recipe data');
    }

    /**
     * Reset form to empty state
     */
    resetForm() {
        this.ingredients = [];
        this.sequences = [];
        this.images = [];
        this.selectedAppliances = [];
        
        // Clear form fields
        // This would be implemented with actual form field clearing
        console.log('[RecipeForm] Form reset');
    }

    /**
     * Save recipe (create or update)
     */
    async save() {
        // Validate form
        const validation = this.validate();
        if (!validation.valid) {
            this.showValidationErrors(validation.errors);
            return;
        }

        // Collect form data
        const recipeData = this.collectFormData();

        try {
            let savedRecipe;
            if (this.currentRecipe) {
                // Update existing recipe
                savedRecipe = await this.recipeService.update(this.currentRecipe.id, recipeData);
            } else {
                // Create new recipe
                savedRecipe = await this.recipeService.create(recipeData);
            }

            // Emit success event
            if (this.eventBus) {
                this.eventBus.emit('recipe:saved', { recipe: savedRecipe });
                this.eventBus.emit('notification:success', { 
                    message: '¡Receta guardada exitosamente!' 
                });
            }

            console.log('[RecipeForm] Recipe saved:', savedRecipe.id);
        } catch (error) {
            console.error('[RecipeForm] Error saving recipe:', error);
            if (this.eventBus) {
                this.eventBus.emit('notification:error', { 
                    message: 'Error al guardar la receta: ' + error.message 
                });
            }
        }
    }

    /**
     * Collect form data
     * @returns {Object} Recipe data
     */
    collectFormData() {
        // This would collect all form fields
        // Placeholder implementation
        return {
            name: '',
            category: '',
            time: '',
            servings: '',
            difficulty: '',
            ingredients: this.ingredients,
            sequences: this.sequences,
            images: this.images,
            appliances: this.selectedAppliances,
            notes: ''
        };
    }

    /**
     * Validate form
     * @returns {Object} Validation result {valid, errors}
     */
    validate() {
        const errors = [];

        // Basic validation
        // This would be expanded with actual validation logic
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Show validation errors
     * @param {Array} errors - Array of error messages
     */
    showValidationErrors(errors) {
        if (this.eventBus) {
            errors.forEach(error => {
                this.eventBus.emit('notification:error', { message: error });
            });
        }
    }

    /**
     * Cancel form and return to previous view
     */
    cancel() {
        if (this.eventBus) {
            this.eventBus.emit('recipe:formCancelled');
        }
        console.log('[RecipeForm] Form cancelled');
    }

    // Ingredient management methods
    addIngredient() { console.log('[RecipeForm] Add ingredient'); }
    editIngredient(id) { console.log('[RecipeForm] Edit ingredient:', id); }
    deleteIngredient(id) { console.log('[RecipeForm] Delete ingredient:', id); }
    reorderIngredients() { console.log('[RecipeForm] Reorder ingredients'); }

    // Sequence management methods
    addSequence() { console.log('[RecipeForm] Add sequence'); }
    editSequence(id) { console.log('[RecipeForm] Edit sequence:', id); }
    deleteSequence(id) { console.log('[RecipeForm] Delete sequence:', id); }
    reorderSequences() { console.log('[RecipeForm] Reorder sequences'); }

    // Image management methods
    addImage(file) { console.log('[RecipeForm] Add image:', file); }
    deleteImage(id) { console.log('[RecipeForm] Delete image:', id); }
}

// Export singleton instance
export let recipeForm = null;

export function initRecipeForm(recipeService, categoryService, eventBus) {
    if (!recipeForm) {
        recipeForm = new RecipeForm(recipeService, categoryService, eventBus);
    }
    return recipeForm;
}
