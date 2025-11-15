/**
 * RecipeDetail - Component for displaying recipe details
 * 
 * Handles rendering full recipe information including ingredients,
 * sequences, images, and metadata.
 */
export class RecipeDetail {
    constructor(recipeService, categoryService, eventBus) {
        this.recipeService = recipeService;
        this.categoryService = categoryService;
        this.eventBus = eventBus;
        this.container = null;
        this.currentRecipe = null;
    }

    /**
     * Initialize the component
     */
    init() {
        this.container = document.getElementById('recipe-detail');
        
        if (!this.container) {
            console.error('[RecipeDetail] Container not found');
            return;
        }

        console.log('[RecipeDetail] Initialized');
    }

    /**
     * Render recipe detail
     * @param {string} recipeId - Recipe ID to render
     */
    render(recipeId) {
        if (!this.container) {
            console.error('[RecipeDetail] Container not initialized');
            return;
        }

        // Get recipe
        const recipe = this.recipeService.getById(recipeId);
        if (!recipe) {
            console.error('[RecipeDetail] Recipe not found:', recipeId);
            this.showError('Receta no encontrada');
            return;
        }

        this.currentRecipe = recipe;

        // Build detail HTML
        const html = `
            ${this.renderHeader(recipe)}
            ${this.renderMetadata(recipe)}
            ${this.renderImages(recipe)}
            ${this.renderIngredients(recipe)}
            ${this.renderSequences(recipe)}
            ${this.renderNotes(recipe)}
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();

        console.log('[RecipeDetail] Rendered recipe:', recipeId);
    }

    /**
     * Render recipe header
     * @param {Object} recipe - Recipe object
     * @returns {string} HTML string
     */
    renderHeader(recipe) {
        const category = this.categoryService.getById(recipe.category);
        const categoryName = category ? `${category.emoji} ${category.name}` : 'Sin categoría';
        const categoryColor = category ? category.color : '#008A05';

        return `
            <div class="recipe-detail-header">
                <div class="recipe-detail-category" style="background: ${categoryColor}">
                    ${categoryName}
                </div>
                <h1 class="recipe-detail-title">${this.escapeHTML(recipe.name)}</h1>
                <div class="recipe-detail-actions">
                    <button class="btn btn-secondary" data-action="edit">
                        <i class="fa-solid fa-pen"></i> Editar
                    </button>
                    <button class="btn btn-secondary" data-action="duplicate">
                        <i class="fa-solid fa-copy"></i> Duplicar
                    </button>
                    <button class="btn btn-secondary" data-action="export">
                        <i class="fa-solid fa-download"></i> Exportar
                    </button>
                    <button class="btn btn-danger" data-action="delete">
                        <i class="fa-solid fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render recipe metadata
     * @param {Object} recipe - Recipe object
     * @returns {string} HTML string
     */
    renderMetadata(recipe) {
        const metadata = [];

        if (recipe.time) {
            metadata.push(`<div class="metadata-item">
                <i class="fa-solid fa-clock"></i>
                <span>${recipe.time}</span>
            </div>`);
        }

        if (recipe.servings) {
            metadata.push(`<div class="metadata-item">
                <i class="fa-solid fa-users"></i>
                <span>${recipe.servings} personas</span>
            </div>`);
        }

        if (recipe.difficulty) {
            metadata.push(`<div class="metadata-item">
                <i class="fa-solid fa-signal"></i>
                <span>${recipe.difficulty}</span>
            </div>`);
        }

        if (metadata.length === 0) {
            return '';
        }

        return `
            <div class="recipe-detail-metadata">
                ${metadata.join('')}
            </div>
        `;
    }

    /**
     * Render recipe images
     * @param {Object} recipe - Recipe object
     * @returns {string} HTML string
     */
    renderImages(recipe) {
        if (!recipe.images || recipe.images.length === 0) {
            return '';
        }

        const imagesHTML = recipe.images.map((image, index) => `
            <div class="recipe-image" data-index="${index}">
                <img src="${image.url}" alt="${this.escapeHTML(recipe.name)}">
            </div>
        `).join('');

        return `
            <div class="recipe-detail-images">
                ${imagesHTML}
            </div>
        `;
    }

    /**
     * Render recipe ingredients
     * @param {Object} recipe - Recipe object
     * @returns {string} HTML string
     */
    renderIngredients(recipe) {
        if (!recipe.ingredients || recipe.ingredients.length === 0) {
            return '';
        }

        const ingredientsHTML = recipe.ingredients.map(ingredient => `
            <li class="ingredient-item">
                <span class="ingredient-name">${this.escapeHTML(ingredient.name)}</span>
                ${ingredient.quantity ? `<span class="ingredient-quantity">${this.escapeHTML(ingredient.quantity)}</span>` : ''}
            </li>
        `).join('');

        return `
            <div class="recipe-detail-section">
                <h2 class="section-title">
                    <i class="fa-solid fa-list"></i> Ingredientes
                </h2>
                <ul class="ingredients-list">
                    ${ingredientsHTML}
                </ul>
                <button class="btn btn-secondary btn-copy-ingredients" data-action="copy-ingredients">
                    <i class="fa-solid fa-copy"></i> Copiar ingredientes
                </button>
            </div>
        `;
    }

    /**
     * Render recipe sequences
     * @param {Object} recipe - Recipe object
     * @returns {string} HTML string
     */
    renderSequences(recipe) {
        if (!recipe.sequences || recipe.sequences.length === 0) {
            return '';
        }

        const sequencesHTML = recipe.sequences.map((sequence, index) => `
            <div class="sequence-item">
                <div class="sequence-number">${index + 1}</div>
                <div class="sequence-content">
                    <p class="sequence-description">${this.escapeHTML(sequence.description)}</p>
                    ${sequence.time ? `<span class="sequence-time"><i class="fa-solid fa-clock"></i> ${sequence.time}</span>` : ''}
                </div>
            </div>
        `).join('');

        return `
            <div class="recipe-detail-section">
                <h2 class="section-title">
                    <i class="fa-solid fa-list-ol"></i> Preparación
                </h2>
                <div class="sequences-list">
                    ${sequencesHTML}
                </div>
            </div>
        `;
    }

    /**
     * Render recipe notes
     * @param {Object} recipe - Recipe object
     * @returns {string} HTML string
     */
    renderNotes(recipe) {
        if (!recipe.notes || recipe.notes.trim() === '') {
            return '';
        }

        return `
            <div class="recipe-detail-section">
                <h2 class="section-title">
                    <i class="fa-solid fa-note-sticky"></i> Notas
                </h2>
                <p class="recipe-notes">${this.escapeHTML(recipe.notes)}</p>
            </div>
        `;
    }

    /**
     * Attach event listeners to detail view
     */
    attachEventListeners() {
        if (!this.container) return;

        // Edit button
        const editBtn = this.container.querySelector('[data-action="edit"]');
        if (editBtn) {
            editBtn.addEventListener('click', () => this.handleEditClick());
        }

        // Duplicate button
        const duplicateBtn = this.container.querySelector('[data-action="duplicate"]');
        if (duplicateBtn) {
            duplicateBtn.addEventListener('click', () => this.handleDuplicateClick());
        }

        // Export button
        const exportBtn = this.container.querySelector('[data-action="export"]');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.handleExportClick());
        }

        // Delete button
        const deleteBtn = this.container.querySelector('[data-action="delete"]');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.handleDeleteClick());
        }

        // Copy ingredients button
        const copyBtn = this.container.querySelector('[data-action="copy-ingredients"]');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.handleCopyIngredientsClick());
        }

        // Image click for gallery
        const images = this.container.querySelectorAll('.recipe-image');
        images.forEach((img, index) => {
            img.addEventListener('click', () => this.handleImageClick(index));
        });
    }

    /**
     * Handle edit button click
     */
    handleEditClick() {
        if (!this.currentRecipe) return;

        if (this.eventBus) {
            this.eventBus.emit('recipe:edit', { recipeId: this.currentRecipe.id });
        }

        console.log('[RecipeDetail] Edit clicked');
    }

    /**
     * Handle duplicate button click
     */
    handleDuplicateClick() {
        if (!this.currentRecipe) return;

        if (this.eventBus) {
            this.eventBus.emit('recipe:duplicate', { recipeId: this.currentRecipe.id });
        }

        console.log('[RecipeDetail] Duplicate clicked');
    }

    /**
     * Handle export button click
     */
    handleExportClick() {
        if (!this.currentRecipe) return;

        if (this.eventBus) {
            this.eventBus.emit('recipe:export', { recipeId: this.currentRecipe.id });
        }

        console.log('[RecipeDetail] Export clicked');
    }

    /**
     * Handle delete button click
     */
    handleDeleteClick() {
        if (!this.currentRecipe) return;

        if (this.eventBus) {
            this.eventBus.emit('recipe:deleteRequest', { recipeId: this.currentRecipe.id });
        }

        console.log('[RecipeDetail] Delete clicked');
    }

    /**
     * Handle copy ingredients button click
     */
    handleCopyIngredientsClick() {
        if (!this.currentRecipe || !this.currentRecipe.ingredients) return;

        const text = this.formatIngredientsForClipboard(this.currentRecipe);

        navigator.clipboard.writeText(text).then(() => {
            if (this.eventBus) {
                this.eventBus.emit('notification:success', { message: 'Ingredientes copiados' });
            }
        }).catch(err => {
            console.error('[RecipeDetail] Error copying ingredients:', err);
        });

        console.log('[RecipeDetail] Copy ingredients clicked');
    }

    /**
     * Handle image click
     * @param {number} index - Image index
     */
    handleImageClick(index) {
        if (!this.currentRecipe) return;

        if (this.eventBus) {
            this.eventBus.emit('recipe:imageView', { 
                recipeId: this.currentRecipe.id,
                imageIndex: index
            });
        }

        console.log('[RecipeDetail] Image clicked:', index);
    }

    /**
     * Format ingredients for clipboard
     * @param {Object} recipe - Recipe object
     * @returns {string} Formatted text
     */
    formatIngredientsForClipboard(recipe) {
        const lines = [];
        lines.push(recipe.name);
        lines.push('---');

        recipe.ingredients.forEach(ingredient => {
            const quantity = ingredient.quantity ? ` - ${ingredient.quantity}` : '';
            lines.push(`${ingredient.name}${quantity}`);
        });

        return lines.join('\n');
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        if (this.container) {
            this.container.innerHTML = `
                <div class="error-state">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                    <p>${this.escapeHTML(message)}</p>
                </div>
            `;
        }
    }

    /**
     * Clear detail view
     */
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.currentRecipe = null;
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
     * Get current recipe
     * @returns {Object|null} Current recipe
     */
    getCurrentRecipe() {
        return this.currentRecipe;
    }
}

// Export singleton instance (will be initialized in App.js)
export let recipeDetail = null;

/**
 * Initialize recipe detail singleton
 * @param {Object} recipeService - Recipe service instance
 * @param {Object} categoryService - Category service instance
 * @param {Object} eventBus - Event bus instance
 * @returns {RecipeDetail} Recipe detail instance
 */
export function initRecipeDetail(recipeService, categoryService, eventBus) {
    if (!recipeDetail) {
        recipeDetail = new RecipeDetail(recipeService, categoryService, eventBus);
    }
    return recipeDetail;
}
