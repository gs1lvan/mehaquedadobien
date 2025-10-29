/**
 * Utility function to generate UUIDs
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * MediaFile class - Represents an image or video file
 */
class MediaFile {
    constructor(data = {}) {
        this.id = data.id || generateUUID();
        this.name = data.name || '';
        this.type = data.type || '';
        this.data = data.data || ''; // Base64 encoded
        this.size = data.size || 0;
        
        this.validate();
    }
    
    validate() {
        if (!this.name) {
            throw new Error('MediaFile name is required');
        }
        if (!this.type) {
            throw new Error('MediaFile type is required');
        }
        if (!this.data) {
            throw new Error('MediaFile data is required');
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            data: this.data,
            size: this.size
        };
    }
    
    static fromJSON(json) {
        return new MediaFile(json);
    }
}

/**
 * Ingredient class - Represents a recipe ingredient
 */
class Ingredient {
    constructor(data = {}) {
        this.id = data.id || generateUUID();
        this.name = data.name || '';
        this.quantity = data.quantity || 0;
        this.unit = data.unit || '';
        this.order = data.order || 0;
        
        this.validate();
    }
    
    validate() {
        if (!this.name || this.name.trim() === '') {
            throw new Error('Ingredient name is required');
        }
        if (typeof this.quantity !== 'number' || this.quantity < 0) {
            throw new Error('Ingredient quantity must be a non-negative number');
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            quantity: this.quantity,
            unit: this.unit,
            order: this.order
        };
    }
    
    static fromJSON(json) {
        return new Ingredient(json);
    }
}

/**
 * Sequence class - Represents an addition sequence
 */
class Sequence {
    constructor(data = {}) {
        this.id = data.id || generateUUID();
        this.step = data.step || 0;
        this.ingredientIds = data.ingredientIds || [];
        this.description = data.description || '';
        this.duration = data.duration || ''; // Optional duration field
        
        this.validate();
    }
    
    validate() {
        if (typeof this.step !== 'number' || this.step < 0) {
            throw new Error('Sequence step must be a non-negative number');
        }
        if (!Array.isArray(this.ingredientIds)) {
            throw new Error('Sequence ingredientIds must be an array');
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            step: this.step,
            ingredientIds: this.ingredientIds,
            description: this.description,
            duration: this.duration
        };
    }
    
    static fromJSON(json) {
        return new Sequence(json);
    }
}

/**
 * Recipe class - Main recipe model
 */
class Recipe {
    constructor(data = {}) {
        this.id = data.id || generateUUID();
        this.name = data.name || '';
        this.category = data.category || null; // 'carne', 'verdura', 'pescado', 'fruta', 'cereales', 'mix', null
        this.totalTime = data.totalTime || ''; // Optional total time field
        this.ingredients = data.ingredients ? data.ingredients.map(i => 
            i instanceof Ingredient ? i : new Ingredient(i)
        ) : [];
        this.preparationMethod = data.preparationMethod || '';
        this.author = data.author || ''; // Optional author field
        this.history = data.history || ''; // Optional history field
        this.additionSequences = data.additionSequences ? data.additionSequences.map(s => 
            s instanceof Sequence ? s : new Sequence(s)
        ) : [];
        this.images = data.images ? data.images.map(img => 
            img instanceof MediaFile ? img : new MediaFile(img)
        ) : [];
        this.videos = data.videos ? data.videos.map(vid => 
            vid instanceof MediaFile ? vid : new MediaFile(vid)
        ) : [];
        this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
        
        this.validate();
    }
    
    validate() {
        if (!this.name || this.name.trim() === '') {
            throw new Error('Recipe name is required');
        }
        
        // Category validation removed - categories are now managed dynamically
        // Allow any string or null as category
        
        if (!Array.isArray(this.ingredients)) {
            throw new Error('Recipe ingredients must be an array');
        }
        
        if (!Array.isArray(this.additionSequences)) {
            throw new Error('Recipe additionSequences must be an array');
        }
        
        if (!Array.isArray(this.images)) {
            throw new Error('Recipe images must be an array');
        }
        
        if (!Array.isArray(this.videos)) {
            throw new Error('Recipe videos must be an array');
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            totalTime: this.totalTime,
            ingredients: this.ingredients.map(i => i.toJSON()),
            preparationMethod: this.preparationMethod,
            author: this.author,
            history: this.history,
            additionSequences: this.additionSequences.map(s => s.toJSON()),
            images: this.images.map(img => img.toJSON()),
            videos: this.videos.map(vid => vid.toJSON()),
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }
    
    static fromJSON(json) {
        return new Recipe(json);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Recipe,
        Ingredient,
        Sequence,
        MediaFile,
        generateUUID
    };
}

/**
 * StorageError class - Custom error for storage operations
 */
class StorageError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'StorageError';
        this.code = code;
    }
}

// Storage error codes
StorageError.QUOTA_EXCEEDED = 'QUOTA_EXCEEDED';
StorageError.DB_NOT_AVAILABLE = 'DB_NOT_AVAILABLE';
StorageError.TRANSACTION_FAILED = 'TRANSACTION_FAILED';
StorageError.NOT_FOUND = 'NOT_FOUND';
StorageError.INVALID_DATA = 'INVALID_DATA';

/**
 * StorageManager class - Manages IndexedDB operations for recipes
 * Requirements: 13.1, 13.2, 13.3
 */
class StorageManager {
    constructor() {
        this.dbName = 'RecetarioPersonalDB';
        this.dbVersion = 1;
        this.db = null;
        this.useLocalStorageFallback = false;
        this.localStorageKey = 'recetario_recipes';
    }
    
    /**
     * Initialize IndexedDB connection and create object stores
     * Requirements: 13.1, 13.2, 13.3
     * @returns {Promise<IDBDatabase>}
     */
    async initDB() {
        return new Promise((resolve, reject) => {
            // Check if IndexedDB is available
            if (!window.indexedDB) {
                console.warn('[Storage] IndexedDB no disponible, usando localStorage como fallback');
                this.useLocalStorageFallback = true;
                
                // Check if localStorage is available
                if (!this._isLocalStorageAvailable()) {
                    reject(new StorageError(
                        'Ni IndexedDB ni localStorage están disponibles en este navegador',
                        StorageError.DB_NOT_AVAILABLE
                    ));
                    return;
                }
                
                resolve(null);
                return;
            }
            
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => {
                console.error('[Storage] Error al abrir IndexedDB:', request.error);
                console.warn('[Storage] Intentando usar localStorage como fallback');
                
                this.useLocalStorageFallback = true;
                
                // Check if localStorage is available
                if (!this._isLocalStorageAvailable()) {
                    reject(new StorageError(
                        'Error al abrir IndexedDB y localStorage no está disponible',
                        StorageError.DB_NOT_AVAILABLE
                    ));
                    return;
                }
                
                resolve(null);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('[Storage] IndexedDB inicializado correctamente');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create recipes object store if it doesn't exist
                if (!db.objectStoreNames.contains('recipes')) {
                    const recipeStore = db.createObjectStore('recipes', { keyPath: 'id' });
                    
                    // Create indexes for efficient querying
                    recipeStore.createIndex('name', 'name', { unique: false });
                    recipeStore.createIndex('category', 'category', { unique: false });
                    recipeStore.createIndex('createdAt', 'createdAt', { unique: false });
                }
                
                // Create media object store if it doesn't exist
                if (!db.objectStoreNames.contains('media')) {
                    const mediaStore = db.createObjectStore('media', { keyPath: 'id' });
                    
                    // Create indexes
                    mediaStore.createIndex('recipeId', 'recipeId', { unique: false });
                    mediaStore.createIndex('type', 'type', { unique: false });
                }
            };
        });
    }
    
    /**
     * Check if localStorage is available
     * Requirements: 13.3
     * @private
     * @returns {boolean}
     */
    _isLocalStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    /**
     * Get all recipes from localStorage
     * Requirements: 13.3
     * @private
     * @returns {Array}
     */
    _getLocalStorageRecipes() {
        try {
            const data = localStorage.getItem(this.localStorageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('[Storage] Error al leer de localStorage:', error);
            return [];
        }
    }
    
    /**
     * Save all recipes to localStorage
     * Requirements: 13.3
     * @private
     * @param {Array} recipes - Recipes to save
     */
    _setLocalStorageRecipes(recipes) {
        try {
            localStorage.setItem(this.localStorageKey, JSON.stringify(recipes));
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                throw new StorageError(
                    'Espacio de almacenamiento insuficiente. Por favor, elimine algunas recetas o reduzca el tamaño de las imágenes.',
                    StorageError.QUOTA_EXCEEDED
                );
            }
            throw new StorageError(
                'Error al guardar en localStorage: ' + error.message,
                StorageError.TRANSACTION_FAILED
            );
        }
    }
    
    /**
     * Ensure database is initialized
     * @private
     */
    async _ensureDB() {
        if (!this.db) {
            await this.initDB();
        }
    }
    
    /**
     * Save a new recipe or update existing one
     * Requirements: 1.2, 13.1, 13.2, 13.3
     * @param {Recipe} recipe - Recipe instance to save
     * @returns {Promise<string>} Recipe ID
     */
    async saveRecipe(recipe) {
        try {
            await this._ensureDB();
            
            // Validate recipe
            if (!(recipe instanceof Recipe)) {
                throw new StorageError(
                    'Objeto de receta inválido',
                    StorageError.INVALID_DATA
                );
            }
            
            // Update timestamp
            recipe.updatedAt = new Date();
            
            // Use localStorage fallback if needed
            if (this.useLocalStorageFallback) {
                console.log('[Storage] Guardando receta en localStorage');
                const recipes = this._getLocalStorageRecipes();
                const existingIndex = recipes.findIndex(r => r.id === recipe.id);
                
                if (existingIndex >= 0) {
                    recipes[existingIndex] = recipe.toJSON();
                } else {
                    recipes.push(recipe.toJSON());
                }
                
                this._setLocalStorageRecipes(recipes);
                return recipe.id;
            }
            
            // Use IndexedDB
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['recipes'], 'readwrite');
                const store = transaction.objectStore('recipes');
                const request = store.put(recipe.toJSON());
                
                request.onsuccess = () => {
                    console.log('[Storage] Receta guardada en IndexedDB:', recipe.id);
                    resolve(recipe.id);
                };
                
                request.onerror = () => {
                    console.error('[Storage] Error al guardar receta:', request.error);
                    if (request.error.name === 'QuotaExceededError') {
                        reject(new StorageError(
                            'Espacio de almacenamiento insuficiente. Por favor, elimine algunas recetas o reduzca el tamaño de las imágenes.',
                            StorageError.QUOTA_EXCEEDED
                        ));
                    } else {
                        reject(new StorageError(
                            'Error al guardar la receta: ' + request.error,
                            StorageError.TRANSACTION_FAILED
                        ));
                    }
                };
                
                transaction.onerror = () => {
                    console.error('[Storage] Error en transacción:', transaction.error);
                    reject(new StorageError(
                        'Error en la transacción: ' + transaction.error,
                        StorageError.TRANSACTION_FAILED
                    ));
                };
            });
        } catch (error) {
            console.error('[Storage] Error al guardar receta:', error);
            if (error instanceof StorageError) {
                throw error;
            }
            throw new StorageError(
                'Error al guardar la receta: ' + error.message,
                StorageError.TRANSACTION_FAILED
            );
        }
    }
    
    /**
     * Get a recipe by ID
     * @param {string} id - Recipe ID
     * @returns {Promise<Recipe|null>}
     */
    async getRecipe(id) {
        try {
            await this._ensureDB();
            
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['recipes'], 'readonly');
                const store = transaction.objectStore('recipes');
                const request = store.get(id);
                
                request.onsuccess = () => {
                    if (request.result) {
                        resolve(Recipe.fromJSON(request.result));
                    } else {
                        resolve(null);
                    }
                };
                
                request.onerror = () => {
                    reject(new StorageError(
                        'Failed to get recipe: ' + request.error,
                        StorageError.TRANSACTION_FAILED
                    ));
                };
            });
        } catch (error) {
            if (error instanceof StorageError) {
                throw error;
            }
            throw new StorageError(
                'Failed to get recipe: ' + error.message,
                StorageError.TRANSACTION_FAILED
            );
        }
    }
    
    /**
     * Get all recipes
     * Requirements: 13.1, 13.2, 13.3
     * @returns {Promise<Recipe[]>}
     */
    async getAllRecipes() {
        try {
            await this._ensureDB();
            
            // Use localStorage fallback if needed
            if (this.useLocalStorageFallback) {
                console.log('[Storage] Cargando recetas desde localStorage');
                const recipes = this._getLocalStorageRecipes();
                return recipes.map(data => Recipe.fromJSON(data));
            }
            
            // Use IndexedDB
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['recipes'], 'readonly');
                const store = transaction.objectStore('recipes');
                const request = store.getAll();
                
                request.onsuccess = () => {
                    const recipes = request.result.map(data => Recipe.fromJSON(data));
                    console.log('[Storage] Recetas cargadas desde IndexedDB:', recipes.length);
                    resolve(recipes);
                };
                
                request.onerror = () => {
                    console.error('[Storage] Error al cargar recetas:', request.error);
                    reject(new StorageError(
                        'Error al cargar las recetas: ' + request.error,
                        StorageError.TRANSACTION_FAILED
                    ));
                };
            });
        } catch (error) {
            console.error('[Storage] Error al obtener recetas:', error);
            if (error instanceof StorageError) {
                throw error;
            }
            throw new StorageError(
                'Error al obtener las recetas: ' + error.message,
                StorageError.TRANSACTION_FAILED
            );
        }
    }
    
    /**
     * Update an existing recipe
     * @param {string} id - Recipe ID
     * @param {Recipe} recipe - Updated recipe data
     * @returns {Promise<string>} Recipe ID
     */
    async updateRecipe(id, recipe) {
        try {
            await this._ensureDB();
            
            // Ensure the recipe has the correct ID
            recipe.id = id;
            recipe.updatedAt = new Date();
            
            // Check if recipe exists
            const existingRecipe = await this.getRecipe(id);
            if (!existingRecipe) {
                throw new StorageError(
                    'Recipe not found: ' + id,
                    StorageError.NOT_FOUND
                );
            }
            
            // Save the updated recipe
            return await this.saveRecipe(recipe);
        } catch (error) {
            if (error instanceof StorageError) {
                throw error;
            }
            throw new StorageError(
                'Failed to update recipe: ' + error.message,
                StorageError.TRANSACTION_FAILED
            );
        }
    }
    
    /**
     * Delete a recipe by ID
     * Requirements: 8.2, 13.3
     * @param {string} id - Recipe ID
     * @returns {Promise<void>}
     */
    async deleteRecipe(id) {
        try {
            await this._ensureDB();
            
            // Use localStorage fallback if needed
            if (this.useLocalStorageFallback) {
                console.log('[Storage] Eliminando receta de localStorage:', id);
                const recipes = this._getLocalStorageRecipes();
                const filteredRecipes = recipes.filter(r => r.id !== id);
                this._setLocalStorageRecipes(filteredRecipes);
                return;
            }
            
            // Use IndexedDB
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['recipes'], 'readwrite');
                const store = transaction.objectStore('recipes');
                const request = store.delete(id);
                
                request.onsuccess = () => {
                    console.log('[Storage] Receta eliminada de IndexedDB:', id);
                    resolve();
                };
                
                request.onerror = () => {
                    console.error('[Storage] Error al eliminar receta:', request.error);
                    reject(new StorageError(
                        'Error al eliminar la receta: ' + request.error,
                        StorageError.TRANSACTION_FAILED
                    ));
                };
                
                transaction.onerror = () => {
                    console.error('[Storage] Error en transacción:', transaction.error);
                    reject(new StorageError(
                        'Error en la transacción: ' + transaction.error,
                        StorageError.TRANSACTION_FAILED
                    ));
                };
            });
        } catch (error) {
            console.error('[Storage] Error al eliminar receta:', error);
            if (error instanceof StorageError) {
                throw error;
            }
            throw new StorageError(
                'Error al eliminar la receta: ' + error.message,
                StorageError.TRANSACTION_FAILED
            );
        }
    }
    
    /**
     * Get recipes by category
     * @param {string} category - Category name
     * @returns {Promise<Recipe[]>}
     */
    async getRecipesByCategory(category) {
        try {
            await this._ensureDB();
            
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['recipes'], 'readonly');
                const store = transaction.objectStore('recipes');
                const index = store.index('category');
                const request = index.getAll(category);
                
                request.onsuccess = () => {
                    const recipes = request.result.map(data => Recipe.fromJSON(data));
                    resolve(recipes);
                };
                
                request.onerror = () => {
                    reject(new StorageError(
                        'Failed to get recipes by category: ' + request.error,
                        StorageError.TRANSACTION_FAILED
                    ));
                };
            });
        } catch (error) {
            if (error instanceof StorageError) {
                throw error;
            }
            throw new StorageError(
                'Failed to get recipes by category: ' + error.message,
                StorageError.TRANSACTION_FAILED
            );
        }
    }
    
    /**
     * Clear all recipes (for testing or reset)
     * @returns {Promise<void>}
     */
    async clearAllRecipes() {
        try {
            await this._ensureDB();
            
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['recipes'], 'readwrite');
                const store = transaction.objectStore('recipes');
                const request = store.clear();
                
                request.onsuccess = () => {
                    resolve();
                };
                
                request.onerror = () => {
                    reject(new StorageError(
                        'Failed to clear recipes: ' + request.error,
                        StorageError.TRANSACTION_FAILED
                    ));
                };
            });
        } catch (error) {
            if (error instanceof StorageError) {
                throw error;
            }
            throw new StorageError(
                'Failed to clear recipes: ' + error.message,
                StorageError.TRANSACTION_FAILED
            );
        }
    }
}

/**
 * MediaError class - Custom error for media operations
 */
class MediaError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'MediaError';
        this.code = code;
    }
}

// Media error codes
MediaError.FILE_TOO_LARGE = 'FILE_TOO_LARGE';
MediaError.INVALID_FORMAT = 'INVALID_FORMAT';
MediaError.UPLOAD_FAILED = 'UPLOAD_FAILED';
MediaError.COMPRESSION_FAILED = 'COMPRESSION_FAILED';

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Recipe,
        Ingredient,
        Sequence,
        MediaFile,
        generateUUID,
        StorageManager,
        StorageError,
        MediaError
    };
}

/**
 * ExportError class - Custom error for export operations
 */
class ExportError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'ExportError';
        this.code = code;
    }
}

// Export error codes
ExportError.GENERATION_FAILED = 'GENERATION_FAILED';
ExportError.DOWNLOAD_FAILED = 'DOWNLOAD_FAILED';
ExportError.INVALID_DATA = 'INVALID_DATA';

/**
 * XMLExporter class - Handles XML export functionality
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5
 */
class XMLExporter {
    /**
     * Generate XML string from a recipe
     * Requirements: 11.1, 11.2, 11.3, 11.5
     * @param {Recipe} recipe - Recipe to export
     * @returns {string} XML string
     */
    static generateXML(recipe) {
        try {
            // Validate input
            if (!recipe || !(recipe instanceof Recipe)) {
                throw new ExportError(
                    'Invalid recipe object',
                    ExportError.INVALID_DATA
                );
            }

            // Create XML document
            const xmlDoc = document.implementation.createDocument(null, 'recipe');
            const root = xmlDoc.documentElement;

            // Add recipe metadata
            const idElement = xmlDoc.createElement('id');
            idElement.textContent = recipe.id;
            root.appendChild(idElement);

            const nameElement = xmlDoc.createElement('name');
            nameElement.textContent = recipe.name;
            root.appendChild(nameElement);

            // Add category (can be null)
            const categoryElement = xmlDoc.createElement('category');
            categoryElement.textContent = recipe.category || 'sin-categoria';
            root.appendChild(categoryElement);

            // Add total time (optional)
            const totalTimeElement = xmlDoc.createElement('totalTime');
            totalTimeElement.textContent = recipe.totalTime || '';
            root.appendChild(totalTimeElement);

            // Add preparation method
            const methodElement = xmlDoc.createElement('preparationMethod');
            methodElement.textContent = recipe.preparationMethod || '';
            root.appendChild(methodElement);

            // Add author (optional)
            const authorElement = xmlDoc.createElement('author');
            authorElement.textContent = recipe.author || '';
            root.appendChild(authorElement);

            // Add history (optional)
            const historyElement = xmlDoc.createElement('history');
            historyElement.textContent = recipe.history || '';
            root.appendChild(historyElement);

            // Add ingredients
            const ingredientsElement = xmlDoc.createElement('ingredients');
            recipe.ingredients.forEach(ingredient => {
                const ingredientElement = xmlDoc.createElement('ingredient');
                
                const ingIdElement = xmlDoc.createElement('id');
                ingIdElement.textContent = ingredient.id;
                ingredientElement.appendChild(ingIdElement);
                
                const ingNameElement = xmlDoc.createElement('name');
                ingNameElement.textContent = ingredient.name;
                ingredientElement.appendChild(ingNameElement);
                
                const ingQuantityElement = xmlDoc.createElement('quantity');
                ingQuantityElement.textContent = ingredient.quantity.toString();
                ingredientElement.appendChild(ingQuantityElement);
                
                const ingUnitElement = xmlDoc.createElement('unit');
                ingUnitElement.textContent = ingredient.unit;
                ingredientElement.appendChild(ingUnitElement);
                
                const ingOrderElement = xmlDoc.createElement('order');
                ingOrderElement.textContent = ingredient.order.toString();
                ingredientElement.appendChild(ingOrderElement);
                
                ingredientsElement.appendChild(ingredientElement);
            });
            root.appendChild(ingredientsElement);

            // Add addition sequences
            const sequencesElement = xmlDoc.createElement('additionSequences');
            recipe.additionSequences.forEach(sequence => {
                const sequenceElement = xmlDoc.createElement('sequence');
                
                const seqIdElement = xmlDoc.createElement('id');
                seqIdElement.textContent = sequence.id;
                sequenceElement.appendChild(seqIdElement);
                
                const seqStepElement = xmlDoc.createElement('step');
                seqStepElement.textContent = sequence.step.toString();
                sequenceElement.appendChild(seqStepElement);
                
                const seqIngredientsElement = xmlDoc.createElement('ingredientIds');
                sequence.ingredientIds.forEach(ingredientId => {
                    const ingredientIdElement = xmlDoc.createElement('ingredientId');
                    ingredientIdElement.textContent = ingredientId;
                    seqIngredientsElement.appendChild(ingredientIdElement);
                });
                sequenceElement.appendChild(seqIngredientsElement);
                
                const seqDurationElement = xmlDoc.createElement('duration');
                seqDurationElement.textContent = sequence.duration || '';
                sequenceElement.appendChild(seqDurationElement);
                
                const seqDescElement = xmlDoc.createElement('description');
                seqDescElement.textContent = sequence.description || '';
                sequenceElement.appendChild(seqDescElement);
                
                sequencesElement.appendChild(sequenceElement);
            });
            root.appendChild(sequencesElement);

            // Add images (Base64 encoded)
            const imagesElement = xmlDoc.createElement('images');
            recipe.images.forEach(image => {
                const imageElement = xmlDoc.createElement('image');
                
                const imgIdElement = xmlDoc.createElement('id');
                imgIdElement.textContent = image.id;
                imageElement.appendChild(imgIdElement);
                
                const imgNameElement = xmlDoc.createElement('name');
                imgNameElement.textContent = image.name;
                imageElement.appendChild(imgNameElement);
                
                const imgTypeElement = xmlDoc.createElement('type');
                imgTypeElement.textContent = image.type;
                imageElement.appendChild(imgTypeElement);
                
                const imgDataElement = xmlDoc.createElement('data');
                imgDataElement.textContent = image.data;
                imageElement.appendChild(imgDataElement);
                
                const imgSizeElement = xmlDoc.createElement('size');
                imgSizeElement.textContent = image.size.toString();
                imageElement.appendChild(imgSizeElement);
                
                imagesElement.appendChild(imageElement);
            });
            root.appendChild(imagesElement);

            // Add videos (Base64 encoded)
            const videosElement = xmlDoc.createElement('videos');
            recipe.videos.forEach(video => {
                const videoElement = xmlDoc.createElement('video');
                
                const vidIdElement = xmlDoc.createElement('id');
                vidIdElement.textContent = video.id;
                videoElement.appendChild(vidIdElement);
                
                const vidNameElement = xmlDoc.createElement('name');
                vidNameElement.textContent = video.name;
                videoElement.appendChild(vidNameElement);
                
                const vidTypeElement = xmlDoc.createElement('type');
                vidTypeElement.textContent = video.type;
                videoElement.appendChild(vidTypeElement);
                
                const vidDataElement = xmlDoc.createElement('data');
                vidDataElement.textContent = video.data;
                videoElement.appendChild(vidDataElement);
                
                const vidSizeElement = xmlDoc.createElement('size');
                vidSizeElement.textContent = video.size.toString();
                videoElement.appendChild(vidSizeElement);
                
                videosElement.appendChild(videoElement);
            });
            root.appendChild(videosElement);

            // Add timestamps
            const createdAtElement = xmlDoc.createElement('createdAt');
            createdAtElement.textContent = recipe.createdAt.toISOString();
            root.appendChild(createdAtElement);

            const updatedAtElement = xmlDoc.createElement('updatedAt');
            updatedAtElement.textContent = recipe.updatedAt.toISOString();
            root.appendChild(updatedAtElement);

            // Serialize to string with proper formatting
            const serializer = new XMLSerializer();
            let xmlString = serializer.serializeToString(xmlDoc);
            
            // Add XML declaration
            xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;

            return xmlString;

        } catch (error) {
            console.error('Error generating XML:', error);
            if (error instanceof ExportError) {
                throw error;
            }
            throw new ExportError(
                'Failed to generate XML: ' + error.message,
                ExportError.GENERATION_FAILED
            );
        }
    }

    /**
     * Download XML file
     * Requirements: 11.4
     * @param {string} xmlString - XML content
     * @param {string} filename - Filename for download
     */
    static downloadXML(xmlString, filename) {
        try {
            // Create blob with XML content
            const blob = new Blob([xmlString], { type: 'application/xml' });
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading XML:', error);
            throw new ExportError(
                'Failed to download XML: ' + error.message,
                ExportError.DOWNLOAD_FAILED
            );
        }
    }

    /**
     * Export recipe to XML and download
     * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5
     * @param {Recipe} recipe - Recipe to export
     * @returns {string} XML string
     */
    static exportRecipe(recipe) {
        try {
            // Generate XML
            const xmlString = this.generateXML(recipe);
            
            // Create filename
            const sanitizedName = recipe.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filename = `receta_${sanitizedName}_${recipe.id.substring(0, 8)}.xml`;
            
            // Download file
            this.downloadXML(xmlString, filename);
            
            return xmlString;

        } catch (error) {
            console.error('Error exporting recipe:', error);
            if (error instanceof ExportError) {
                throw error;
            }
            throw new ExportError(
                'Failed to export recipe: ' + error.message,
                ExportError.GENERATION_FAILED
            );
        }
    }
}

/**
 * PDFExporter class - Handles PDF export functionality
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5
 */
class PDFExporter {
    /**
     * Generate PDF from a recipe
     * Requirements: 12.1, 12.2, 12.3, 12.4
     * @param {Recipe} recipe - Recipe to export
     * @returns {jsPDF} PDF document
     */
    static generatePDF(recipe) {
        try {
            // Validate input
            if (!recipe || !(recipe instanceof Recipe)) {
                throw new ExportError(
                    'Invalid recipe object',
                    ExportError.INVALID_DATA
                );
            }

            // Check if jsPDF is available
            if (typeof window.jspdf === 'undefined') {
                throw new ExportError(
                    'jsPDF library not loaded',
                    ExportError.GENERATION_FAILED
                );
            }

            // Create new PDF document
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            let yPosition = 20;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const contentWidth = pageWidth - (margin * 2);

            // Helper function to check if we need a new page
            const checkPageBreak = (requiredSpace) => {
                if (yPosition + requiredSpace > pageHeight - margin) {
                    doc.addPage();
                    yPosition = margin;
                    return true;
                }
                return false;
            };

            // Header - Recipe Name and Time on same line
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text(recipe.name, margin, yPosition);
            
            // Total Time aligned to the right on same line
            if (recipe.totalTime && recipe.totalTime.trim() !== '') {
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(100, 100, 100);
                const timeText = `Tiempo Total: ${recipe.totalTime}`;
                const timeWidth = doc.getTextWidth(timeText);
                doc.text(timeText, pageWidth - margin - timeWidth, yPosition);
                doc.setTextColor(0, 0, 0);
            }
            
            yPosition += 10; // Increased space after header

            // Images section - only first image, maintaining aspect ratio
            if (recipe.images && recipe.images.length > 0) {
                checkPageBreak(70);
                
                // Add only the first image
                const image = recipe.images[0];
                const maxImageWidth = contentWidth * 0.5; // 50% of page width
                const maxImageHeight = 70;
                
                try {
                    // Create temporary image to get dimensions
                    const img = new Image();
                    img.src = image.data;
                    
                    // Calculate dimensions maintaining aspect ratio
                    let imgWidth = maxImageWidth;
                    let imgHeight = maxImageHeight;
                    
                    if (img.width && img.height) {
                        const aspectRatio = img.width / img.height;
                        if (aspectRatio > 1) {
                            // Landscape
                            imgHeight = imgWidth / aspectRatio;
                        } else {
                            // Portrait
                            imgWidth = imgHeight * aspectRatio;
                        }
                    }
                    
                    // Add frame with padding - aligned with text (no left offset)
                    const framePadding = 2; // 5px ≈ 2mm in PDF
                    const frameX = margin; // Aligned with text margin
                    const frameY = yPosition;
                    const frameWidth = imgWidth + (framePadding * 2);
                    const frameHeight = imgHeight + (framePadding * 2);
                    
                    // Draw frame background (light gray)
                    doc.setFillColor(245, 245, 245);
                    doc.rect(frameX, frameY, frameWidth, frameHeight, 'F');
                    
                    // Add image on top of frame (with padding inside)
                    doc.addImage(image.data, 'JPEG', margin + framePadding, yPosition + framePadding, imgWidth, imgHeight);
                    
                    // Add frame border
                    doc.setDrawColor(200, 200, 200);
                    doc.setLineWidth(0.3);
                    doc.rect(frameX, frameY, frameWidth, frameHeight);
                    
                    yPosition += frameHeight + 10; // Increased space after image (same as before)
                } catch (error) {
                    console.warn('Could not add image to PDF:', error);
                }
            }

            // Ingredients Section
            checkPageBreak(15);
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('Ingredientes', margin, yPosition);
            yPosition += 6;

            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');

            if (recipe.ingredients && recipe.ingredients.length > 0) {
                recipe.ingredients.forEach((ingredient, index) => {
                    checkPageBreak(5);
                    const ingredientText = `${index + 1}. ${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
                    doc.text(ingredientText, margin + 3, yPosition);
                    yPosition += 5;
                });
            } else {
                doc.setTextColor(150, 150, 150);
                doc.text('No hay ingredientes definidos', margin + 3, yPosition);
                doc.setTextColor(0, 0, 0);
                yPosition += 5;
            }

            yPosition += 3;

            // Preparation Method Section
            checkPageBreak(15);
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('Método de Preparación', margin, yPosition);
            yPosition += 6;

            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');

            if (recipe.preparationMethod && recipe.preparationMethod.trim() !== '') {
                // Split text into lines that fit the page width
                const methodLines = doc.splitTextToSize(recipe.preparationMethod, contentWidth);
                methodLines.forEach(line => {
                    checkPageBreak(5);
                    doc.text(line, margin, yPosition);
                    yPosition += 5;
                });
            } else {
                doc.setTextColor(150, 150, 150);
                doc.text('No hay método de preparación definido', margin, yPosition);
                doc.setTextColor(0, 0, 0);
                yPosition += 5;
            }

            yPosition += 3;

            // Additional Information Section (Author and History)
            const hasAuthor = recipe.author && recipe.author.trim() !== '';
            const hasHistory = recipe.history && recipe.history.trim() !== '';
            
            if (hasAuthor || hasHistory) {
                checkPageBreak(15);
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Información de Interés', margin, yPosition);
                yPosition += 6;

                doc.setFontSize(9);
                doc.setFont(undefined, 'normal');

                // Author
                if (hasAuthor) {
                    checkPageBreak(5);
                    doc.setFont(undefined, 'bold');
                    doc.text('Autor:', margin + 3, yPosition);
                    doc.setFont(undefined, 'normal');
                    doc.text(recipe.author, margin + 20, yPosition);
                    yPosition += 6;
                }

                // History
                if (hasHistory) {
                    checkPageBreak(5);
                    doc.setFont(undefined, 'bold');
                    doc.text('Historia:', margin + 3, yPosition);
                    yPosition += 5;
                    
                    doc.setFont(undefined, 'normal');
                    const historyLines = doc.splitTextToSize(recipe.history, contentWidth - 3);
                    historyLines.forEach(line => {
                        checkPageBreak(5);
                        doc.text(line, margin + 3, yPosition);
                        yPosition += 5;
                    });
                }

                yPosition += 3;
            }

            // Addition Sequences Section
            if (recipe.additionSequences && recipe.additionSequences.length > 0) {
                checkPageBreak(15);
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Secuencias de Adición', margin, yPosition);
                yPosition += 6;

                doc.setFontSize(9);
                doc.setFont(undefined, 'normal');

                recipe.additionSequences.forEach((sequence, index) => {
                    checkPageBreak(10);
                    
                    // Sequence number
                    doc.setFont(undefined, 'bold');
                    doc.text(`Paso ${index + 1}:`, margin + 3, yPosition);
                    yPosition += 5;
                    
                    doc.setFont(undefined, 'normal');
                    
                    // Ingredients in this sequence
                    if (sequence.ingredientIds && sequence.ingredientIds.length > 0) {
                        const ingredientNames = sequence.ingredientIds
                            .map(id => {
                                const ing = recipe.ingredients.find(i => i.id === id);
                                return ing ? ing.name : '';
                            })
                            .filter(name => name !== '')
                            .join(', ');
                        
                        if (ingredientNames) {
                            doc.setTextColor(100, 100, 100);
                            doc.text(`Ingredientes: ${ingredientNames}`, margin + 6, yPosition);
                            doc.setTextColor(0, 0, 0);
                            yPosition += 5;
                        }
                    }
                    
                    // Description (before duration)
                    if (sequence.description) {
                        const descLines = doc.splitTextToSize(sequence.description, contentWidth - 6);
                        descLines.forEach(line => {
                            checkPageBreak(5);
                            doc.text(line, margin + 6, yPosition);
                            yPosition += 5;
                        });
                    }
                    
                    // Duration (last, without icon)
                    if (sequence.duration && sequence.duration.trim() !== '') {
                        // Format duration for display
                        const hoursMatch = sequence.duration.match(/(\d+)\s*h/);
                        const minutesMatch = sequence.duration.match(/(\d+)\s*min/);
                        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
                        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
                        
                        const parts = [];
                        if (hours > 0) {
                            parts.push(hours === 1 ? '1 hora' : `${hours} horas`);
                        }
                        if (minutes > 0) {
                            parts.push(minutes === 1 ? '1 minuto' : `${minutes} minutos`);
                        }
                        
                        if (parts.length > 0) {
                            doc.setFont(undefined, 'bold');
                            doc.text(`Duración: ${parts.join(' ')}`, margin + 6, yPosition);
                            doc.setFont(undefined, 'normal');
                            yPosition += 5;
                        }
                    }
                    
                    yPosition += 2;
                });
            }

            // Footer with metadata
            const footerY = pageHeight - 15;
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Creada: ${recipe.createdAt.toLocaleDateString('es-ES')}`, margin, footerY);
            doc.text(`ID: ${recipe.id}`, pageWidth - margin - 50, footerY);

            return doc;

        } catch (error) {
            console.error('Error generating PDF:', error);
            if (error instanceof ExportError) {
                throw error;
            }
            throw new ExportError(
                'Failed to generate PDF: ' + error.message,
                ExportError.GENERATION_FAILED
            );
        }
    }

    /**
     * Download PDF file
     * Requirements: 12.5
     * @param {jsPDF} doc - PDF document
     * @param {string} filename - Filename for download
     */
    static downloadPDF(doc, filename) {
        try {
            doc.save(filename);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            throw new ExportError(
                'Failed to download PDF: ' + error.message,
                ExportError.DOWNLOAD_FAILED
            );
        }
    }

    /**
     * Export recipe to PDF and download
     * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5
     * @param {Recipe} recipe - Recipe to export
     * @returns {jsPDF} PDF document
     */
    static exportRecipe(recipe) {
        try {
            // Generate PDF
            const doc = this.generatePDF(recipe);
            
            // Create filename
            const sanitizedName = recipe.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filename = `receta_${sanitizedName}_${recipe.id.substring(0, 8)}.pdf`;
            
            // Download file
            this.downloadPDF(doc, filename);
            
            return doc;

        } catch (error) {
            console.error('Error exporting recipe to PDF:', error);
            if (error instanceof ExportError) {
                throw error;
            }
            throw new ExportError(
                'Failed to export recipe: ' + error.message,
                ExportError.GENERATION_FAILED
            );
        }
    }
}

/**
 * ImportError class - Custom error for import operations
 */
class ImportError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'ImportError';
        this.code = code;
    }
}

// Import error codes
ImportError.INVALID_FILE = 'INVALID_FILE';
ImportError.INVALID_XML = 'INVALID_XML';
ImportError.INVALID_STRUCTURE = 'INVALID_STRUCTURE';
ImportError.INVALID_RECIPE_DATA = 'INVALID_RECIPE_DATA';
ImportError.MEDIA_ERROR = 'MEDIA_ERROR';
ImportError.PARSING_FAILED = 'PARSING_FAILED';

/**
 * XMLImporter class - Handles XML import functionality
 * Requirements: 1.3, 1.4, 4.2, 1.2, 4.1
 */
class XMLImporter {
    /**
     * Import recipes from XML file
     * Requirements: 1.2, 4.1
     * @param {File} file - XML file to import
     * @returns {Promise<Object>} Import result with successful and failed recipes
     */
    static async importFromFile(file) {
        try {
            // Validate file
            this.validateFile(file);
            
            // Read file content
            const xmlString = await this.readFileContent(file);
            
            // Parse XML and import recipes
            return await this.parseXMLString(xmlString);
            
        } catch (error) {
            console.error('[XMLImporter] Error importing from file:', error);
            if (error instanceof ImportError) {
                throw error;
            }
            throw new ImportError(
                'Error al importar archivo: ' + error.message,
                ImportError.PARSING_FAILED
            );
        }
    }
    
    /**
     * Validate file before processing
     * Requirements: 1.2, 4.1
     * @param {File} file - File to validate
     * @throws {ImportError} If validation fails
     */
    static validateFile(file) {
        if (!file) {
            throw new ImportError(
                'No se seleccionó ningún archivo',
                ImportError.INVALID_FILE
            );
        }
        
        // Check file type
        if (!file.type.includes('xml') && !file.name.toLowerCase().endsWith('.xml')) {
            throw new ImportError(
                'El archivo debe ser un archivo XML válido',
                ImportError.INVALID_FILE
            );
        }
        
        // Check file size (50MB limit)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            throw new ImportError(
                `El archivo es demasiado grande (${sizeMB}MB). Máximo 50MB`,
                ImportError.INVALID_FILE
            );
        }
        
        // Check minimum size
        if (file.size < 10) {
            throw new ImportError(
                'El archivo parece estar vacío',
                ImportError.INVALID_FILE
            );
        }
    }
    
    /**
     * Read file content as text
     * @param {File} file - File to read
     * @returns {Promise<string>} File content as string
     */
    static readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            
            reader.onerror = () => {
                reject(new ImportError(
                    'Error al leer el archivo',
                    ImportError.INVALID_FILE
                ));
            };
            
            reader.readAsText(file, 'UTF-8');
        });
    }
    
    /**
     * Parse XML string and extract recipes
     * Requirements: 1.3, 1.4, 4.2
     * @param {string} xmlString - XML content as string
     * @returns {Promise<Object>} Import result
     */
    static async parseXMLString(xmlString) {
        try {
            // Parse XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new ImportError(
                    'El archivo XML no es válido: ' + parserError.textContent,
                    ImportError.INVALID_XML
                );
            }
            
            // Validate XML structure
            this.validateXMLStructure(xmlDoc);
            
            // Determine if single or multiple recipes
            const recipesElement = xmlDoc.querySelector('recipes');
            const recipeElements = recipesElement ? 
                xmlDoc.querySelectorAll('recipes > recipe') : 
                xmlDoc.querySelectorAll('recipe');
            
            if (recipeElements.length === 0) {
                throw new ImportError(
                    'No se encontraron recetas en el archivo XML',
                    ImportError.INVALID_STRUCTURE
                );
            }
            
            // Process recipes
            const results = {
                successful: [],
                failed: [],
                summary: {
                    total: recipeElements.length,
                    imported: 0,
                    errors: 0
                }
            };
            
            for (let i = 0; i < recipeElements.length; i++) {
                try {
                    const recipe = await this.parseRecipeElement(recipeElements[i]);
                    results.successful.push(recipe);
                    results.summary.imported++;
                } catch (error) {
                    console.error(`[XMLImporter] Error parsing recipe ${i + 1}:`, error);
                    results.failed.push({
                        index: i + 1,
                        name: this.extractRecipeName(recipeElements[i]) || `Receta ${i + 1}`,
                        error: error.message
                    });
                    results.summary.errors++;
                }
            }
            
            return results;
            
        } catch (error) {
            console.error('[XMLImporter] Error parsing XML:', error);
            if (error instanceof ImportError) {
                throw error;
            }
            throw new ImportError(
                'Error al procesar el archivo XML: ' + error.message,
                ImportError.PARSING_FAILED
            );
        }
    }
    
    /**
     * Validate XML structure
     * Requirements: 1.4, 4.2
     * @param {Document} xmlDoc - Parsed XML document
     * @throws {ImportError} If structure is invalid
     */
    static validateXMLStructure(xmlDoc) {
        // Check for single recipe format
        const singleRecipe = xmlDoc.querySelector('recipe');
        const multipleRecipes = xmlDoc.querySelector('recipes');
        
        if (!singleRecipe && !multipleRecipes) {
            throw new ImportError(
                'El archivo XML no contiene recetas válidas. Debe tener un elemento <recipe> o <recipes>',
                ImportError.INVALID_STRUCTURE
            );
        }
        
        // If multiple recipes format, validate structure
        if (multipleRecipes) {
            const recipes = xmlDoc.querySelectorAll('recipes > recipe');
            if (recipes.length === 0) {
                throw new ImportError(
                    'El elemento <recipes> no contiene elementos <recipe>',
                    ImportError.INVALID_STRUCTURE
                );
            }
        }
    }
    
    /**
     * Extract recipe name for error reporting
     * @param {Element} recipeElement - Recipe XML element
     * @returns {string|null} Recipe name or null
     */
    static extractRecipeName(recipeElement) {
        try {
            const nameElement = recipeElement.querySelector('name');
            return nameElement ? nameElement.textContent : null;
        } catch (error) {
            return null;
        }
    }
    
    /**
     * Parse single recipe element
     * Requirements: 1.3, 2.1, 2.2, 2.3, 2.4
     * @param {Element} recipeElement - Recipe XML element
     * @returns {Promise<Recipe>} Parsed recipe object
     */
    static async parseRecipeElement(recipeElement) {
        try {
            // Extract basic recipe data
            const id = this.getElementText(recipeElement, 'id');
            const name = this.getElementText(recipeElement, 'name');
            const category = this.getElementText(recipeElement, 'category');
            const totalTime = this.getElementText(recipeElement, 'totalTime');
            const preparationMethod = this.getElementText(recipeElement, 'preparationMethod');
            const author = this.getElementText(recipeElement, 'author');
            const history = this.getElementText(recipeElement, 'history');
            
            // Validate required fields
            if (!name || name.trim() === '') {
                throw new ImportError(
                    'La receta debe tener un nombre',
                    ImportError.INVALID_RECIPE_DATA
                );
            }
            
            // Parse ingredients and create ID mapping
            const { ingredients, idMapping } = this.parseIngredientsWithMapping(recipeElement);
            
            // Parse addition sequences with ID mapping
            const additionSequences = this.parseSequences(recipeElement, idMapping);
            
            // Parse multimedia
            const images = await this.parseImages(recipeElement);
            const videos = await this.parseVideos(recipeElement);
            
            // Create recipe with new ID and current timestamp
            const recipeData = {
                name: name.trim(),
                category: category === 'sin-categoria' ? null : category,
                totalTime: totalTime || '',
                preparationMethod: preparationMethod || '',
                author: author || '',
                history: history || '',
                ingredients: ingredients,
                additionSequences: additionSequences,
                images: images,
                videos: videos,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            return new Recipe(recipeData);
            
        } catch (error) {
            console.error('[XMLImporter] Error parsing recipe element:', error);
            if (error instanceof ImportError) {
                throw error;
            }
            throw new ImportError(
                'Error al procesar datos de receta: ' + error.message,
                ImportError.INVALID_RECIPE_DATA
            );
        }
    }
    
    /**
     * Get text content from XML element
     * @param {Element} parent - Parent element
     * @param {string} tagName - Tag name to find
     * @returns {string} Text content or empty string
     */
    static getElementText(parent, tagName) {
        const element = parent.querySelector(tagName);
        return element ? element.textContent.trim() : '';
    }
    
    /**
     * Parse ingredients from XML
     * @param {Element} recipeElement - Recipe XML element
     * @returns {Ingredient[]} Array of ingredients
     */
    static parseIngredients(recipeElement) {
        const result = this.parseIngredientsWithMapping(recipeElement);
        return result.ingredients;
    }
    
    /**
     * Parse ingredients from XML with ID mapping
     * @param {Element} recipeElement - Recipe XML element
     * @returns {Object} Object with ingredients array and ID mapping
     */
    static parseIngredientsWithMapping(recipeElement) {
        const ingredients = [];
        const idMapping = new Map(); // oldId -> newId
        const ingredientsElement = recipeElement.querySelector('ingredients');
        
        if (ingredientsElement) {
            const ingredientElements = ingredientsElement.querySelectorAll('ingredient');
            
            ingredientElements.forEach((ingElement, index) => {
                try {
                    const oldId = this.getElementText(ingElement, 'id');
                    const name = this.getElementText(ingElement, 'name');
                    const quantity = parseFloat(this.getElementText(ingElement, 'quantity')) || 0;
                    const unit = this.getElementText(ingElement, 'unit');
                    const order = parseInt(this.getElementText(ingElement, 'order')) || index;
                    
                    if (name) {
                        const ingredient = new Ingredient({
                            name: name,
                            quantity: quantity,
                            unit: unit,
                            order: order
                        });
                        
                        ingredients.push(ingredient);
                        
                        // Map old ID to new ID
                        if (oldId) {
                            idMapping.set(oldId, ingredient.id);
                        }
                    }
                } catch (error) {
                    console.warn(`[XMLImporter] Error parsing ingredient ${index + 1}:`, error);
                }
            });
        }
        
        return { ingredients, idMapping };
    }
    
    /**
     * Parse addition sequences from XML
     * @param {Element} recipeElement - Recipe XML element
     * @param {Map} idMapping - Mapping from old ingredient IDs to new ones
     * @returns {Sequence[]} Array of sequences
     */
    static parseSequences(recipeElement, idMapping = new Map()) {
        const sequences = [];
        const sequencesElement = recipeElement.querySelector('additionSequences');
        
        if (sequencesElement) {
            const sequenceElements = sequencesElement.querySelectorAll('sequence');
            
            sequenceElements.forEach((seqElement, index) => {
                try {
                    const step = parseInt(this.getElementText(seqElement, 'step')) || index + 1;
                    const duration = this.getElementText(seqElement, 'duration');
                    const description = this.getElementText(seqElement, 'description');
                    
                    // Parse ingredient IDs and map them to new IDs
                    const ingredientIds = [];
                    const ingredientIdsElement = seqElement.querySelector('ingredientIds');
                    if (ingredientIdsElement) {
                        const idElements = ingredientIdsElement.querySelectorAll('ingredientId');
                        idElements.forEach(idElement => {
                            const oldId = idElement.textContent.trim();
                            if (oldId) {
                                // Map old ID to new ID if mapping exists
                                const newId = idMapping.get(oldId) || oldId;
                                ingredientIds.push(newId);
                            }
                        });
                    }
                    
                    sequences.push(new Sequence({
                        step: step,
                        ingredientIds: ingredientIds,
                        duration: duration || '',
                        description: description
                    }));
                } catch (error) {
                    console.warn(`[XMLImporter] Error parsing sequence ${index + 1}:`, error);
                }
            });
        }
        
        return sequences;
    }
    
    /**
     * Parse images from XML
     * Requirements: 3.1, 3.2, 3.3, 3.4
     * @param {Element} recipeElement - Recipe XML element
     * @returns {Promise<MediaFile[]>} Array of image MediaFiles
     */
    static async parseImages(recipeElement) {
        const images = [];
        const imagesElement = recipeElement.querySelector('images');
        
        if (imagesElement) {
            const imageElements = imagesElement.querySelectorAll('image');
            
            for (const imgElement of imageElements) {
                try {
                    const name = this.getElementText(imgElement, 'name');
                    const type = this.getElementText(imgElement, 'type');
                    const data = this.getElementText(imgElement, 'data');
                    const size = parseInt(this.getElementText(imgElement, 'size')) || 0;
                    
                    if (name && type && data) {
                        // Validate image data
                        if (!data.startsWith('data:image/')) {
                            console.warn(`[XMLImporter] Invalid image data format for ${name}`);
                            continue;
                        }
                        
                        images.push(new MediaFile({
                            name: name,
                            type: type,
                            data: data,
                            size: size
                        }));
                    }
                } catch (error) {
                    console.warn('[XMLImporter] Error parsing image:', error);
                }
            }
        }
        
        return images;
    }
    
    /**
     * Parse videos from XML
     * Requirements: 3.1, 3.2, 3.3, 3.4
     * @param {Element} recipeElement - Recipe XML element
     * @returns {Promise<MediaFile[]>} Array of video MediaFiles
     */
    static async parseVideos(recipeElement) {
        const videos = [];
        const videosElement = recipeElement.querySelector('videos');
        
        if (videosElement) {
            const videoElements = videosElement.querySelectorAll('video');
            
            for (const vidElement of videoElements) {
                try {
                    const name = this.getElementText(vidElement, 'name');
                    const type = this.getElementText(vidElement, 'type');
                    const data = this.getElementText(vidElement, 'data');
                    const size = parseInt(this.getElementText(vidElement, 'size')) || 0;
                    
                    if (name && type && data) {
                        // Validate video data
                        if (!data.startsWith('data:video/')) {
                            console.warn(`[XMLImporter] Invalid video data format for ${name}`);
                            continue;
                        }
                        
                        videos.push(new MediaFile({
                            name: name,
                            type: type,
                            data: data,
                            size: size
                        }));
                    }
                } catch (error) {
                    console.warn('[XMLImporter] Error parsing video:', error);
                }
            }
        }
        
        return videos;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Recipe,
        Ingredient,
        Sequence,
        MediaFile,
        generateUUID,
        StorageManager,
        StorageError,
        MediaError,
        XMLExporter,
        PDFExporter,
        ExportError,
        XMLImporter,
        ImportError
    };
}