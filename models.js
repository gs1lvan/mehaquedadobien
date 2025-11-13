/**
 * Utility function to generate UUIDs
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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

        // Preserve ingredientNames temporarily for import processing
        // This field is used during XML import to map names to IDs
        if (data.ingredientNames) {
            this.ingredientNames = data.ingredientNames;
        }

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
        this.caravanFriendly = data.caravanFriendly || false; // Apto para Caravana
        this.hospitalFriendly = data.hospitalFriendly || false; // Apto para Hospital
        this.menuFriendly = data.menuFriendly || false; // Para Menú
        this.ingredients = data.ingredients ? data.ingredients.map(i =>
            i instanceof Ingredient ? i : new Ingredient(i)
        ) : [];
        this.preparationMethod = data.preparationMethod || ''; // Legacy field - kept for backward compatibility
        this.kitchenAppliances = data.kitchenAppliances || []; // Array of kitchen appliance names
        this.author = data.author || ''; // Optional author field
        this.history = data.history || ''; // Optional history field
        this.additionSequences = data.additionSequences ? data.additionSequences.map(s =>
            s instanceof Sequence ? s : new Sequence(s)
        ) : [];
        this.images = data.images ? data.images.map(img =>
            img instanceof MediaFile ? img : new MediaFile(img)
        ) : [];
        this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();

        this.validate();
    }

    validate() {
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

    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            totalTime: this.totalTime,
            caravanFriendly: this.caravanFriendly,
            hospitalFriendly: this.hospitalFriendly,
            menuFriendly: this.menuFriendly,
            ingredients: this.ingredients.map(i => i.toJSON()),
            preparationMethod: this.preparationMethod,
            kitchenAppliances: this.kitchenAppliances,
            author: this.author,
            history: this.history,
            additionSequences: this.additionSequences.map(s => s.toJSON()),
            images: this.images.map(img => img.toJSON()),
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
                // Check if database connection is still open
                if (!this.db || this.db.objectStoreNames.length === 0) {
                    console.warn('[Storage] Database connection lost, reinitializing...');
                    this.initDB().then(() => {
                        // Retry save after reconnection
                        const transaction = this.db.transaction(['recipes'], 'readwrite');
                        const store = transaction.objectStore('recipes');
                        const request = store.put(recipe.toJSON());

                        request.onsuccess = () => {
                            console.log('[Storage] Receta guardada en IndexedDB:', recipe.id);
                            resolve(recipe.id);
                        };

                        request.onerror = () => {
                            console.error('[Storage] Error al guardar receta:', request.error);
                            reject(new StorageError(
                                'Error al guardar la receta: ' + request.error.message,
                                StorageError.SAVE_ERROR
                            ));
                        };
                    }).catch(reject);
                    return;
                }

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
     * Get a recipe by name
     * @param {string} name - Recipe name
     * @returns {Promise<Recipe|null>}
     */
    async getRecipeByName(name) {
        try {
            const recipes = await this.getAllRecipes();
            return recipes.find(r => r.name.toLowerCase() === name.toLowerCase()) || null;
        } catch (error) {
            console.error('[Storage] Error al buscar receta por nombre:', error);
            throw error;
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
            categoryElement.textContent = recipe.category || NO_CATEGORY_ID;
            root.appendChild(categoryElement);

            // Add total time (optional)
            const totalTimeElement = xmlDoc.createElement('totalTime');
            totalTimeElement.textContent = recipe.totalTime || '';
            root.appendChild(totalTimeElement);

            // Add special flags
            const caravanFriendlyElement = xmlDoc.createElement('caravanFriendly');
            caravanFriendlyElement.textContent = recipe.caravanFriendly ? 'true' : 'false';
            root.appendChild(caravanFriendlyElement);

            const hospitalFriendlyElement = xmlDoc.createElement('hospitalFriendly');
            hospitalFriendlyElement.textContent = recipe.hospitalFriendly ? 'true' : 'false';
            root.appendChild(hospitalFriendlyElement);

            const menuFriendlyElement = xmlDoc.createElement('menuFriendly');
            menuFriendlyElement.textContent = recipe.menuFriendly ? 'true' : 'false';
            root.appendChild(menuFriendlyElement);

            // Add preparation method
            const methodElement = xmlDoc.createElement('preparationMethod');
            methodElement.textContent = recipe.preparationMethod || '';
            root.appendChild(methodElement);

            // Add kitchen appliances
            const appliancesElement = xmlDoc.createElement('kitchenAppliances');
            if (recipe.kitchenAppliances && recipe.kitchenAppliances.length > 0) {
                recipe.kitchenAppliances.forEach(applianceId => {
                    const applianceElement = xmlDoc.createElement('appliance');
                    applianceElement.textContent = applianceId;
                    appliancesElement.appendChild(applianceElement);
                });
            }
            root.appendChild(appliancesElement);

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
            // Create ingredient lookup map for O(1) access
            const ingredientMap = new Map();
            recipe.ingredients.forEach(ing => ingredientMap.set(ing.id, ing));

            const sequencesElement = xmlDoc.createElement('sequences');
            recipe.additionSequences.forEach(sequence => {
                const sequenceElement = xmlDoc.createElement('sequence');

                const seqIdElement = xmlDoc.createElement('id');
                seqIdElement.textContent = sequence.id;
                sequenceElement.appendChild(seqIdElement);

                const seqStepElement = xmlDoc.createElement('step');
                seqStepElement.textContent = sequence.step.toString();
                sequenceElement.appendChild(seqStepElement);

                // Export ingredient names instead of IDs for portability
                const seqIngredientsElement = xmlDoc.createElement('ingredientNames');
                if (sequence.ingredientIds && sequence.ingredientIds.length > 0) {
                    sequence.ingredientIds.forEach(ingredientId => {
                        const ingredient = ingredientMap.get(ingredientId);
                        if (ingredient) {
                            const ingredientNameElement = xmlDoc.createElement('ingredientName');
                            ingredientNameElement.textContent = ingredient.name;
                            seqIngredientsElement.appendChild(ingredientNameElement);
                        } else {
                            console.warn('[XMLExporter] Ingredient ID not found in sequence:', ingredientId);
                        }
                    });
                }
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

    /**
     * Generate XML string from a menu
     * Requirements: 1.1, 1.2, 3.1, 3.3, 3.4, 3.5, 5.1, 5.2, 5.3, 5.4, 5.5
     * @param {Object} menu - Menu to export
     * @returns {string} XML string
     */
    static generateMenuXML(menu) {
        try {
            // Validate input
            if (!menu || typeof menu !== 'object') {
                throw new ExportError(
                    'Invalid menu object',
                    ExportError.INVALID_DATA
                );
            }

            // Create XML document
            const xmlDoc = document.implementation.createDocument(null, 'menu');
            const root = xmlDoc.documentElement;

            // Add version attribute
            root.setAttribute('version', '1.0');

            // Add metadata section
            const metadataElement = xmlDoc.createElement('metadata');
            
            const exportDateElement = xmlDoc.createElement('exportDate');
            exportDateElement.textContent = new Date().toISOString();
            metadataElement.appendChild(exportDateElement);

            const exportVersionElement = xmlDoc.createElement('exportVersion');
            exportVersionElement.textContent = '1.0';
            metadataElement.appendChild(exportVersionElement);

            root.appendChild(metadataElement);

            // Add menu ID
            const idElement = xmlDoc.createElement('id');
            idElement.textContent = menu.id ? menu.id.toString() : '';
            root.appendChild(idElement);

            // Add menu name
            const nameElement = xmlDoc.createElement('name');
            nameElement.textContent = menu.name || '';
            root.appendChild(nameElement);

            // Add items
            const itemsElement = xmlDoc.createElement('items');
            if (menu.items && Array.isArray(menu.items)) {
                menu.items.forEach(item => {
                    const itemElement = xmlDoc.createElement('item');

                    const itemIdElement = xmlDoc.createElement('id');
                    itemIdElement.textContent = item.id ? item.id.toString() : '';
                    itemElement.appendChild(itemIdElement);

                    const itemNameElement = xmlDoc.createElement('name');
                    itemNameElement.textContent = item.name || '';
                    itemElement.appendChild(itemNameElement);

                    const lunchElement = xmlDoc.createElement('lunch');
                    lunchElement.textContent = item.lunch || '';
                    itemElement.appendChild(lunchElement);

                    const dinnerElement = xmlDoc.createElement('dinner');
                    dinnerElement.textContent = item.dinner || '';
                    itemElement.appendChild(dinnerElement);

                    const completedElement = xmlDoc.createElement('completed');
                    completedElement.textContent = item.completed ? 'true' : 'false';
                    itemElement.appendChild(completedElement);

                    itemsElement.appendChild(itemElement);
                });
            }
            root.appendChild(itemsElement);

            // Add timestamps
            const createdAtElement = xmlDoc.createElement('createdAt');
            createdAtElement.textContent = menu.createdAt || new Date().toISOString();
            root.appendChild(createdAtElement);

            const updatedAtElement = xmlDoc.createElement('updatedAt');
            updatedAtElement.textContent = menu.updatedAt || new Date().toISOString();
            root.appendChild(updatedAtElement);

            // Serialize to string
            const serializer = new XMLSerializer();
            let xmlString = serializer.serializeToString(xmlDoc);

            // Add XML declaration
            xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;

            return xmlString;

        } catch (error) {
            console.error('Error generating menu XML:', error);
            if (error instanceof ExportError) {
                throw error;
            }
            throw new ExportError(
                'Failed to generate menu XML: ' + error.message,
                ExportError.GENERATION_FAILED
            );
        }
    }

    /**
     * Export menu to XML and download
     * Requirements: 1.1, 1.2, 1.3, 3.1, 3.3, 3.4, 3.5
     * @param {Object} menu - Menu object to export
     * @returns {string} XML string
     */
    static exportMenu(menu) {
        try {
            // Generate XML
            const xmlString = this.generateMenuXML(menu);

            // Create filename
            const sanitizedName = menu.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const idPrefix = menu.id ? menu.id.toString().substring(0, 8) : 'menu';
            const filename = `menu_${sanitizedName}_${idPrefix}.xml`;

            // Download file
            this.downloadXML(xmlString, filename);

            return xmlString;

        } catch (error) {
            console.error('Error exporting menu:', error);
            if (error instanceof ExportError) {
                throw error;
            }
            throw new ExportError(
                'Failed to export menu: ' + error.message,
                ExportError.GENERATION_FAILED
            );
        }
    }

    /**
     * Generate XML string from a shopping list
     * Requirements: 2.1, 2.2, 3.2, 3.3, 3.4, 3.5, 5.1, 5.2, 5.3, 5.4, 5.5
     * @param {Object} list - Shopping list to export
     * @returns {string} XML string
     */
    static generateShoppingListXML(list) {
        try {
            // Validate input
            if (!list || typeof list !== 'object') {
                throw new ExportError(
                    'Invalid shopping list object',
                    ExportError.INVALID_DATA
                );
            }

            // Create XML document
            const xmlDoc = document.implementation.createDocument(null, 'shoppingList');
            const root = xmlDoc.documentElement;

            // Add version attribute
            root.setAttribute('version', '1.0');

            // Add metadata section
            const metadataElement = xmlDoc.createElement('metadata');
            
            const exportDateElement = xmlDoc.createElement('exportDate');
            exportDateElement.textContent = new Date().toISOString();
            metadataElement.appendChild(exportDateElement);

            const exportVersionElement = xmlDoc.createElement('exportVersion');
            exportVersionElement.textContent = '1.0';
            metadataElement.appendChild(exportVersionElement);

            root.appendChild(metadataElement);

            // Add list ID
            const idElement = xmlDoc.createElement('id');
            idElement.textContent = list.id ? list.id.toString() : '';
            root.appendChild(idElement);

            // Add list name
            const nameElement = xmlDoc.createElement('name');
            nameElement.textContent = list.name || '';
            root.appendChild(nameElement);

            // Add enabled status
            const enabledElement = xmlDoc.createElement('enabled');
            enabledElement.textContent = list.enabled !== undefined ? (list.enabled ? 'true' : 'false') : 'true';
            root.appendChild(enabledElement);

            // Add items
            const itemsElement = xmlDoc.createElement('items');
            if (list.items && Array.isArray(list.items)) {
                list.items.forEach(item => {
                    const itemElement = xmlDoc.createElement('item');

                    const itemIdElement = xmlDoc.createElement('id');
                    itemIdElement.textContent = item.id ? item.id.toString() : '';
                    itemElement.appendChild(itemIdElement);

                    const itemNameElement = xmlDoc.createElement('name');
                    itemNameElement.textContent = item.name || '';
                    itemElement.appendChild(itemNameElement);

                    const quantityElement = xmlDoc.createElement('quantity');
                    quantityElement.textContent = item.quantity || '';
                    itemElement.appendChild(quantityElement);

                    const completedElement = xmlDoc.createElement('completed');
                    completedElement.textContent = item.completed ? 'true' : 'false';
                    itemElement.appendChild(completedElement);

                    itemsElement.appendChild(itemElement);
                });
            }
            root.appendChild(itemsElement);

            // Add timestamps
            const createdAtElement = xmlDoc.createElement('createdAt');
            createdAtElement.textContent = list.createdAt || new Date().toISOString();
            root.appendChild(createdAtElement);

            const updatedAtElement = xmlDoc.createElement('updatedAt');
            updatedAtElement.textContent = list.updatedAt || new Date().toISOString();
            root.appendChild(updatedAtElement);

            // Serialize to string
            const serializer = new XMLSerializer();
            let xmlString = serializer.serializeToString(xmlDoc);

            // Add XML declaration
            xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;

            return xmlString;

        } catch (error) {
            console.error('Error generating shopping list XML:', error);
            if (error instanceof ExportError) {
                throw error;
            }
            throw new ExportError(
                'Failed to generate shopping list XML: ' + error.message,
                ExportError.GENERATION_FAILED
            );
        }
    }

    /**
     * Export shopping list to XML and download
     * Requirements: 2.1, 2.2, 2.3, 3.2, 3.3, 3.4, 3.5
     * @param {Object} list - Shopping list object to export
     * @returns {string} XML string
     */
    static exportShoppingList(list) {
        try {
            // Generate XML
            const xmlString = this.generateShoppingListXML(list);

            // Create filename
            const sanitizedName = list.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const idPrefix = list.id ? list.id.toString().substring(0, 8) : 'list';
            const filename = `lista_compra_${sanitizedName}_${idPrefix}.xml`;

            // Download file
            this.downloadXML(xmlString, filename);

            return xmlString;

        } catch (error) {
            console.error('Error exporting shopping list:', error);
            if (error instanceof ExportError) {
                throw error;
            }
            throw new ExportError(
                'Failed to export shopping list: ' + error.message,
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
     * @returns {Promise<jsPDF>} PDF document
     */
    static async generatePDF(recipe) {
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

            // Set default font to Times for a more elegant, editorial style
            doc.setFont('times', 'normal');

            let yPosition = 20;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            // Content width is 55% of page width
            const contentWidth = pageWidth * 0.55;
            const maxLineWidth = contentWidth;

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
            doc.setFontSize(24);
            doc.setFont(undefined, 'bold');
            doc.text(recipe.name, margin, yPosition, { align: 'left' });

            // Add time total right after the title with different style (smaller, small caps effect)
            if (recipe.totalTime && recipe.totalTime.trim() !== '') {
                const titleWidth = doc.getTextWidth(recipe.name);
                doc.setFontSize(14); // Smaller size
                doc.setFont(undefined, 'normal'); // Light/normal weight
                doc.setTextColor(128, 128, 128); // Gray color
                // Convert to uppercase for small caps effect
                const timeText = ` - TIEMPO TOTAL: ${recipe.totalTime.toUpperCase()}`;
                doc.text(timeText, margin + titleWidth, yPosition, { align: 'left' });
                doc.setTextColor(0, 0, 0); // Reset to black
                doc.setFontSize(24); // Reset font size
            }

            yPosition += 5; // Reduced space after header (between title and image)

            // Save starting Y position for image and ingredients side-by-side layout
            const sectionStartY = yPosition;
            let imageHeight = 0;
            let actualImageWidth = 0; // Store actual image width
            let ingredientsHeight = 0;

            // Images section - only first image, 50% width, cropped to fixed height
            if (recipe.images && recipe.images.length > 0) {
                checkPageBreak(70);

                // Add only the first image
                const image = recipe.images[0];
                // Fixed dimensions for image
                const targetWidth = pageWidth * 0.50; // 50% of page width
                const targetHeight = 60; // Fixed height in mm

                try {
                    // Create image element
                    const img = new Image();
                    img.src = image.data;

                    // Wait for image to load to get dimensions
                    await new Promise((resolve) => {
                        if (img.complete) {
                            resolve();
                        } else {
                            img.onload = resolve;
                        }
                    });

                    // Create canvas for cropping
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate dimensions to fill target area (cover mode)
                    const targetAspect = targetWidth / targetHeight;
                    const imgAspect = img.width / img.height;

                    let sourceWidth, sourceHeight, sourceX, sourceY;

                    if (imgAspect > targetAspect) {
                        // Image is wider - crop sides
                        sourceHeight = img.height;
                        sourceWidth = img.height * targetAspect;
                        sourceX = (img.width - sourceWidth) / 2;
                        sourceY = 0;
                    } else {
                        // Image is taller - crop top and bottom
                        sourceWidth = img.width;
                        sourceHeight = img.width / targetAspect;
                        sourceX = 0;
                        sourceY = (img.height - sourceHeight) / 2;
                    }

                    // Set canvas size to target dimensions (in pixels, will scale)
                    canvas.width = 800; // High resolution
                    canvas.height = 800 * (targetHeight / targetWidth);

                    // Draw cropped image
                    ctx.drawImage(
                        img,
                        sourceX, sourceY, sourceWidth, sourceHeight, // Source rectangle
                        0, 0, canvas.width, canvas.height // Destination rectangle
                    );

                    // Convert canvas to base64
                    const croppedImageData = canvas.toDataURL('image/jpeg', 0.92);

                    // Add frame with padding
                    const framePadding = 2;
                    const frameX = margin;
                    const frameY = yPosition;
                    const frameWidth = targetWidth + (framePadding * 2);
                    const frameHeight = targetHeight + (framePadding * 2);

                    // Draw frame background (light gray)
                    doc.setFillColor(245, 245, 245);
                    doc.rect(frameX, frameY, frameWidth, frameHeight, 'F');

                    // Add cropped image
                    doc.addImage(croppedImageData, 'JPEG', margin + framePadding, yPosition + framePadding, targetWidth, targetHeight);

                    // Add frame border
                    doc.setDrawColor(200, 200, 200);
                    doc.setLineWidth(0.3);
                    doc.rect(frameX, frameY, frameWidth, frameHeight);

                    imageHeight = frameHeight;
                    actualImageWidth = frameWidth;
                    // Don't move yPosition yet - ingredients will be beside the image
                } catch (error) {
                    console.warn('Could not add image to PDF:', error);
                }
            }

            // Ingredients Section - positioned to the right of the image
            const ingredientsX = margin + actualImageWidth + 5; // Start after actual image with 5mm gap
            const ingredientsWidth = pageWidth - ingredientsX - margin; // Remaining width
            let ingredientsY = sectionStartY; // Start at same height as image

            // Calculate ingredients height first
            const ingredientsPadding = 3;
            let tempY = ingredientsY + ingredientsPadding + 6; // Title space

            if (recipe.ingredients && recipe.ingredients.length > 0) {
                tempY += recipe.ingredients.length * 5; // Each ingredient line
            } else {
                tempY += 5; // "No ingredients" message
            }
            tempY += ingredientsPadding;
            ingredientsHeight = tempY - ingredientsY;

            // Draw ingredients background box (light gray)
            doc.setFillColor(240, 240, 240);
            doc.rect(ingredientsX, ingredientsY, ingredientsWidth, ingredientsHeight, 'F');

            // Draw ingredients border
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.rect(ingredientsX, ingredientsY, ingredientsWidth, ingredientsHeight);

            // Add ingredients title
            ingredientsY += ingredientsPadding;
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('Ingredientes', ingredientsX + 3, ingredientsY + 4, { align: 'left' });
            ingredientsY += 6;

            // Add ingredients list
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');

            if (recipe.ingredients && recipe.ingredients.length > 0) {
                recipe.ingredients.forEach((ingredient, index) => {
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

                    const ingredientText = `${index + 1}. ${ingredient.name} - ${quantityText}`;
                    doc.text(ingredientText, ingredientsX + 5, ingredientsY + 4, { align: 'left' });
                    ingredientsY += 5;
                });
            } else {
                doc.setTextColor(150, 150, 150);
                doc.text('No hay ingredientes definidos', ingredientsX + 5, ingredientsY + 4, { align: 'left' });
                doc.setTextColor(0, 0, 0);
                ingredientsY += 5;
            }

            // Move yPosition to after the tallest element (image or ingredients box)
            const ingredientsTotalHeight = ingredientsY + ingredientsPadding - sectionStartY;
            yPosition = sectionStartY + Math.max(imageHeight, ingredientsTotalHeight) + 10;

            // Método de Preparación Section (Kitchen Appliances)
            if (recipe.kitchenAppliances && recipe.kitchenAppliances.length > 0) {
                checkPageBreak(15);
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Método de Preparación', margin, yPosition, { align: 'left' });
                yPosition += 6;

                doc.setFontSize(9);
                doc.setFont(undefined, 'normal');

                // Define appliances list (same as in script.js)
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

                const applianceNames = recipe.kitchenAppliances
                    .map(id => {
                        const appliance = KITCHEN_APPLIANCES.find(a => a.id === id);
                        return appliance ? appliance.name : '';
                    })
                    .filter(name => name !== '')
                    .join(', ');

                if (applianceNames) {
                    doc.text(applianceNames, margin + 3, yPosition, { align: 'left' });
                    yPosition += 5;
                }

                yPosition += 3;
            }

            // Addition Sequences Section
            if (recipe.additionSequences && recipe.additionSequences.length > 0) {
                checkPageBreak(15);
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Secuencias de Adición', margin, yPosition, { align: 'left' });
                yPosition += 6;

                doc.setFontSize(9);
                doc.setFont(undefined, 'normal');

                recipe.additionSequences.forEach((sequence, index) => {
                    checkPageBreak(10);

                    // Sequence number
                    doc.setFont(undefined, 'bold');
                    doc.text(`Paso ${index + 1}:`, margin + 3, yPosition, { align: 'left' });
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
                            doc.text(`Ingredientes: ${ingredientNames}`, margin + 6, yPosition, { align: 'left' });
                            doc.setTextColor(0, 0, 0);
                            yPosition += 5;
                        }
                    }

                    // Description (before duration)
                    if (sequence.description) {
                        const descLines = doc.splitTextToSize(sequence.description, maxLineWidth - 6);
                        descLines.forEach((line) => {
                            checkPageBreak(5);
                            // Justify ALL lines (including last one)
                            doc.text(line, margin + 6, yPosition, { align: 'justify', maxWidth: maxLineWidth - 6 });
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
                            doc.text(`Duración: ${parts.join(' ')}`, margin + 6, yPosition, { align: 'left' });
                            doc.setFont(undefined, 'normal');
                            yPosition += 5;
                        }
                    }

                    yPosition += 2;
                });
            }

            // Additional Information Section (Author and History) - MOVED TO END
            const hasAuthor = recipe.author && recipe.author.trim() !== '';
            const hasHistory = recipe.history && recipe.history.trim() !== '';

            if (hasAuthor || hasHistory) {
                checkPageBreak(15);
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Información de Interés', margin, yPosition, { align: 'left' });
                yPosition += 6;

                doc.setFontSize(9);
                doc.setFont(undefined, 'normal');

                // Author
                if (hasAuthor) {
                    checkPageBreak(5);
                    doc.setFont(undefined, 'bold');
                    doc.text('Autor:', margin + 3, yPosition, { align: 'left' });
                    doc.setFont(undefined, 'normal');
                    doc.text(recipe.author, margin + 20, yPosition, { align: 'left' });
                    yPosition += 6;
                }

                // History
                if (hasHistory) {
                    checkPageBreak(5);
                    doc.setFont(undefined, 'bold');
                    doc.text('Historia:', margin + 3, yPosition, { align: 'left' });
                    yPosition += 5;

                    doc.setFont(undefined, 'normal');
                    const historyLines = doc.splitTextToSize(recipe.history, maxLineWidth - 3);
                    historyLines.forEach((line) => {
                        checkPageBreak(5);
                        // Justify ALL lines (including last one)
                        doc.text(line, margin + 3, yPosition, { align: 'justify', maxWidth: maxLineWidth - 3 });
                        yPosition += 5;
                    });
                }

                yPosition += 3;
            }

            // Additional Images Section - Show remaining images (2nd onwards) in 2-column layout
            if (recipe.images && recipe.images.length > 1) {
                // Process images from index 1 onwards (skip first image)
                const remainingImages = recipe.images.slice(1);
                const imageWidth = (maxLineWidth - 5) / 2; // Two images side by side with 5mm gap
                const imageHeight = 50; // Fixed height for gallery images

                // Check if we have enough space for title + at least one row of images
                // If not, move to next page to keep title with images
                const requiredSpace = 8 + imageHeight + 10; // title height + image height + margins
                checkPageBreak(requiredSpace);

                yPosition += 5;

                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Galería de Imágenes', margin, yPosition, { align: 'left' });
                yPosition += 8;

                for (let i = 0; i < remainingImages.length; i += 2) {
                    // Only check page break for subsequent rows (not the first one)
                    if (i > 0) {
                        checkPageBreak(imageHeight + 10);
                    }

                    const rowStartY = yPosition;

                    // First image in row (left)
                    const img1 = remainingImages[i];
                    try {
                        const imgElement1 = new Image();
                        imgElement1.src = img1.data;

                        await new Promise((resolve) => {
                            if (imgElement1.complete) resolve();
                            else imgElement1.onload = resolve;
                        });

                        // Create canvas for cropping
                        const canvas1 = document.createElement('canvas');
                        const ctx1 = canvas1.getContext('2d');

                        const targetAspect = imageWidth / imageHeight;
                        const imgAspect1 = imgElement1.width / imgElement1.height;

                        let sourceWidth1, sourceHeight1, sourceX1, sourceY1;

                        if (imgAspect1 > targetAspect) {
                            sourceHeight1 = imgElement1.height;
                            sourceWidth1 = imgElement1.height * targetAspect;
                            sourceX1 = (imgElement1.width - sourceWidth1) / 2;
                            sourceY1 = 0;
                        } else {
                            sourceWidth1 = imgElement1.width;
                            sourceHeight1 = imgElement1.width / targetAspect;
                            sourceX1 = 0;
                            sourceY1 = (imgElement1.height - sourceHeight1) / 2;
                        }

                        canvas1.width = 600;
                        canvas1.height = 600 * (imageHeight / imageWidth);

                        ctx1.drawImage(
                            imgElement1,
                            sourceX1, sourceY1, sourceWidth1, sourceHeight1,
                            0, 0, canvas1.width, canvas1.height
                        );

                        const croppedData1 = canvas1.toDataURL('image/jpeg', 0.90);

                        // Add frame for first image
                        const framePadding = 2;
                        const frameX1 = margin;
                        const frameY1 = yPosition;
                        const frameWidth1 = imageWidth + (framePadding * 2);
                        const frameHeight1 = imageHeight + (framePadding * 2);

                        // Draw frame background (light gray)
                        doc.setFillColor(245, 245, 245);
                        doc.rect(frameX1, frameY1, frameWidth1, frameHeight1, 'F');

                        // Add image
                        doc.addImage(croppedData1, 'JPEG', margin + framePadding, yPosition + framePadding, imageWidth, imageHeight);

                        // Add frame border
                        doc.setDrawColor(200, 200, 200);
                        doc.setLineWidth(0.3);
                        doc.rect(frameX1, frameY1, frameWidth1, frameHeight1);
                    } catch (error) {
                        console.warn('Could not add gallery image:', error);
                    }

                    // Second image in row (right) - if exists
                    if (i + 1 < remainingImages.length) {
                        const img2 = remainingImages[i + 1];
                        try {
                            const imgElement2 = new Image();
                            imgElement2.src = img2.data;

                            await new Promise((resolve) => {
                                if (imgElement2.complete) resolve();
                                else imgElement2.onload = resolve;
                            });

                            const canvas2 = document.createElement('canvas');
                            const ctx2 = canvas2.getContext('2d');

                            const targetAspect = imageWidth / imageHeight;
                            const imgAspect2 = imgElement2.width / imgElement2.height;

                            let sourceWidth2, sourceHeight2, sourceX2, sourceY2;

                            if (imgAspect2 > targetAspect) {
                                sourceHeight2 = imgElement2.height;
                                sourceWidth2 = imgElement2.height * targetAspect;
                                sourceX2 = (imgElement2.width - sourceWidth2) / 2;
                                sourceY2 = 0;
                            } else {
                                sourceWidth2 = imgElement2.width;
                                sourceHeight2 = imgElement2.width / targetAspect;
                                sourceX2 = 0;
                                sourceY2 = (imgElement2.height - sourceHeight2) / 2;
                            }

                            canvas2.width = 600;
                            canvas2.height = 600 * (imageHeight / imageWidth);

                            ctx2.drawImage(
                                imgElement2,
                                sourceX2, sourceY2, sourceWidth2, sourceHeight2,
                                0, 0, canvas2.width, canvas2.height
                            );

                            const croppedData2 = canvas2.toDataURL('image/jpeg', 0.90);
                            const secondImageX = margin + imageWidth + 5; // 5mm gap

                            // Add frame for second image
                            const framePadding = 2;
                            const frameX2 = secondImageX;
                            const frameY2 = yPosition;
                            const frameWidth2 = imageWidth + (framePadding * 2);
                            const frameHeight2 = imageHeight + (framePadding * 2);

                            // Draw frame background (light gray)
                            doc.setFillColor(245, 245, 245);
                            doc.rect(frameX2, frameY2, frameWidth2, frameHeight2, 'F');

                            // Add image
                            doc.addImage(croppedData2, 'JPEG', secondImageX + framePadding, yPosition + framePadding, imageWidth, imageHeight);

                            // Add frame border
                            doc.setDrawColor(200, 200, 200);
                            doc.setLineWidth(0.3);
                            doc.rect(frameX2, frameY2, frameWidth2, frameHeight2);
                        } catch (error) {
                            console.warn('Could not add gallery image:', error);
                        }
                    }

                    yPosition += imageHeight + 4 + 8; // Move down for next row (image + frame padding + gap)
                }
            }

            // Footer with metadata
            const footerY = pageHeight - 15;
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Creada: ${recipe.createdAt.toLocaleDateString('es-ES')}`, margin, footerY, { align: 'left' });

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
     * @returns {Promise<jsPDF>} PDF document
     */
    static async exportRecipe(recipe) {
        try {
            // Generate PDF
            const doc = await this.generatePDF(recipe);

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
     * Helper method to create multi-format CSS selector
     * @param {string[]} selectors - Array of selector strings
     * @returns {string} Combined CSS selector
     */
    static createMultiSelector(selectors) {
        return selectors.join(', ');
    }

    /**
     * Import recipes from XML file
     * Requirements: 1.2, 4.1
     * @param {File} file - XML file to import
     * @param {Function} onProgress - Optional progress callback
     * @returns {Promise<Object>} Import result with successful and failed recipes
     */
    static async importFromFile(file, onProgress = null) {
        try {
            // Validate file
            this.validateFile(file);

            // Read file content
            const xmlString = await this.readFileContent(file);

            // Parse XML and import recipes with progress callback
            return await this.parseXMLString(xmlString, onProgress);

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
     * @param {Function} onProgress - Optional progress callback (current, total, percentage)
     * @returns {Promise<Object>} Import result
     */
    static async parseXMLString(xmlString, onProgress = null) {
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
                // Call progress callback BEFORE processing (to show name in real-time)
                const recipeName = this.extractRecipeName(recipeElements[i]) || `Receta ${i + 1}`;
                if (onProgress && typeof onProgress === 'function') {
                    const current = i + 1;
                    const percentage = Math.round((current / recipeElements.length) * 100);
                    const progressData = {
                        current,
                        total: recipeElements.length,
                        percentage,
                        recipeName: recipeName,
                        status: 'processing'
                    };
                    console.log('[XMLImporter] Calling progress callback:', progressData);
                    onProgress(progressData);
                    // Small delay to allow UI to update and show progress
                    await new Promise(resolve => setTimeout(resolve, 50));
                } else {
                    console.log('[XMLImporter] No progress callback provided');
                }

                try {
                    const recipe = await this.parseRecipeElement(recipeElements[i]);
                    results.successful.push(recipe);
                    results.summary.imported++;
                } catch (error) {
                    console.error(`[XMLImporter] Error parsing recipe ${i + 1}:`, error);
                    results.failed.push({
                        index: i + 1,
                        name: recipeName,
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
            const caravanFriendly = this.getElementText(recipeElement, 'caravanFriendly') === 'true';
            const hospitalFriendly = this.getElementText(recipeElement, 'hospitalFriendly') === 'true';
            const menuFriendly = this.getElementText(recipeElement, 'menuFriendly') === 'true';
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
            const { ingredients, idMapping } = this.parseIngredientsWithMapping(recipeElement, {
                supportCompactFormat: false
            });

            // Parse addition sequences with ID mapping
            const additionSequences = this.parseSequences(recipeElement, idMapping, {
                supportCompactFormat: false
            });

            // Parse kitchen appliances
            const kitchenAppliances = this.parseKitchenAppliances(recipeElement);

            // Parse multimedia
            const images = await this.parseImages(recipeElement);

            // Create recipe with new ID and current timestamp
            const recipeData = {
                name: name.trim(),
                category: category === NO_CATEGORY_ID ? null : category,
                totalTime: totalTime || '',
                caravanFriendly: caravanFriendly,
                hospitalFriendly: hospitalFriendly,
                menuFriendly: menuFriendly,
                preparationMethod: preparationMethod || '',
                kitchenAppliances: kitchenAppliances,
                author: author || '',
                history: history || '',
                ingredients: ingredients,
                additionSequences: additionSequences,
                images: images,
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
        if (!element) return '';
        
        // For boolean flags, check 'value' attribute first (format: <tag value="true"/>)
        if (tagName === 'caravanFriendly' || tagName === 'hospitalFriendly' || tagName === 'menuFriendly') {
            const attrValue = element.getAttribute('value');
            if (attrValue !== null) {
                return attrValue;
            }
        }
        
        // Return text content (format: <tag>value</tag>)
        return element.textContent.trim();
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
     * Supports both full format (with <ingredient> elements) and compact format (with <i> elements)
     * 
     * @param {Element} recipeElement - Recipe XML element
     * @param {Object} options - Parsing options
     * @param {boolean} options.supportCompactFormat - Enable compact format support (default: false)
     * @returns {Object} Object with ingredients array and ID mapping
     */
    static parseIngredientsWithMapping(recipeElement, options = {}) {
        const { supportCompactFormat = false } = options;
        const ingredients = [];
        const idMapping = new Map(); // oldId/name -> newId
        const ingredientsElement = recipeElement.querySelector('ingredients');

        if (ingredientsElement) {
            const selector = supportCompactFormat
                ? this.createMultiSelector(['ingredient', 'i'])
                : 'ingredient';
            const ingredientElements = ingredientsElement.querySelectorAll(selector);

            ingredientElements.forEach((ingElement, index) => {
                try {
                    // Support both formats for each field
                    const oldId = supportCompactFormat
                        ? (ingElement.querySelector('id')?.textContent || '').trim()
                        : this.getElementText(ingElement, 'id');

                    const nameSelector = supportCompactFormat
                        ? this.createMultiSelector(['n', 'name'])
                        : 'name';
                    const name = supportCompactFormat
                        ? (ingElement.querySelector(nameSelector)?.textContent || '').trim()
                        : this.getElementText(ingElement, 'name');

                    const quantitySelector = supportCompactFormat
                        ? this.createMultiSelector(['q', 'quantity'])
                        : 'quantity';
                    const quantityText = supportCompactFormat
                        ? (ingElement.querySelector(quantitySelector)?.textContent || '0')
                        : this.getElementText(ingElement, 'quantity');
                    const quantity = parseFloat(quantityText) || 0;

                    const unitSelector = supportCompactFormat
                        ? this.createMultiSelector(['u', 'unit'])
                        : 'unit';
                    const unit = supportCompactFormat
                        ? (ingElement.querySelector(unitSelector)?.textContent || '').trim()
                        : this.getElementText(ingElement, 'unit');

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

                        // Always map by name (sequences may reference by name for portability)
                        idMapping.set(name, ingredient.id);
                    }
                } catch (error) {
                    console.warn(`[XMLImporter] Error parsing ingredient ${index + 1}:`, error);
                }
            });
        }

        return { ingredients, idMapping };
    }

    /**
     * Parse addition sequences from XML with support for multiple formats
     * 
     * Supports two XML formats:
     * 1. Compact format (with abbreviated element names for size optimization):
     *    <sequences><s><step>1</step><dur>5min</dur><desc>...</desc><ings><ing>Name</ing></ings></s></sequences>
     * 
     * 2. Full format (used in file exports for clarity):
     *    <additionSequences><sequence><step>1</step><duration>5min</duration>
     *    <description>...</description><ingredientIds><ingredientId>uuid</ingredientId></ingredientIds></sequence></additionSequences>
     * 
     * @param {Element} recipeElement - Recipe XML element
     * @param {Map} idMapping - Mapping from old ingredient IDs to new ones (or names to IDs for compact format)
     * @param {Object} options - Parsing options
     * @param {boolean} options.supportCompactFormat - Enable compact format support (default: false)
     * @returns {Sequence[]} Array of sequences
     */
    static parseSequences(recipeElement, idMapping = new Map(), options = {}) {
        const { supportCompactFormat = false } = options;
        const sequences = [];

        // Support both formats: 'sequences' (CMS format) and 'additionSequences' (app format)
        const sequencesElement = recipeElement.querySelector('sequences') || 
                                 recipeElement.querySelector('additionSequences');

        if (!sequencesElement) {
            console.log('[XMLImporter] No sequences found in recipe');
            return sequences;
        }

        const selector = supportCompactFormat
            ? this.createMultiSelector(['s', 'sequence'])
            : 'sequence';
        const sequenceElements = sequencesElement.querySelectorAll(selector);

        if (sequenceElements.length === 0) {
            console.warn('[XMLImporter] Sequences element found but contains no sequence items');
            return sequences;
        }

        sequenceElements.forEach((seqElement, index) => {
            try {
                // Parse step number
                const stepText = seqElement.querySelector('step')?.textContent;
                if (!stepText) {
                    console.warn(`[XMLImporter] Sequence ${index + 1} missing step number, using index`);
                }
                const step = parseInt(stepText) || index + 1;

                // Parse duration - support both formats
                const durationSelector = supportCompactFormat
                    ? this.createMultiSelector(['dur', 'duration'])
                    : 'duration';
                const durationEl = seqElement.querySelector(durationSelector);
                const duration = durationEl?.textContent || '';

                // Parse description - support both formats
                const descriptionSelector = supportCompactFormat
                    ? this.createMultiSelector(['desc', 'description'])
                    : 'description';
                const descriptionEl = seqElement.querySelector(descriptionSelector);
                const description = descriptionEl?.textContent || '';

                // Parse ingredient references
                const ingredientIds = this.parseSequenceIngredients(
                    seqElement,
                    idMapping,
                    supportCompactFormat
                );

                sequences.push(new Sequence({
                    step: step,
                    ingredientIds: ingredientIds,
                    duration: duration,
                    description: description
                }));
            } catch (error) {
                console.warn(`[XMLImporter] Error parsing sequence ${index + 1}:`, error);
            }
        });

        return sequences;
    }

    /**
     * Parse ingredient references from a sequence element
     * Handles both compact format (ingredient names) and full format (ingredient IDs)
     * 
     * @param {Element} seqElement - Sequence XML element
     * @param {Map} idMapping - Mapping from names/old IDs to new IDs
     * @param {boolean} supportCompactFormat - Whether to support compact format
     * @returns {string[]} Array of ingredient IDs
     */
    static parseSequenceIngredients(seqElement, idMapping, supportCompactFormat) {
        const ingredientIds = [];

        if (supportCompactFormat) {
            // Handle both compact (ings/ing) and full (ingredientNames/ingredientName or ingredientIds/ingredientId) formats
            const ingsEl = seqElement.querySelector('ings') ||
                seqElement.querySelector('ingredientNames') ||
                seqElement.querySelector('ingredientIds');

            if (ingsEl) {
                const ingSelector = XMLImporter.createMultiSelector(['ing', 'ingredientName', 'ingredientId']);
                const ingElements = ingsEl.querySelectorAll(ingSelector);
                ingElements.forEach(ingEl => {
                    const nameOrId = ingEl.textContent.trim();
                    if (nameOrId) {
                        // Try to map name/old ID to new ID, otherwise use as-is
                        const newId = idMapping.get(nameOrId) || nameOrId;
                        ingredientIds.push(newId);
                    }
                });
            }
        } else {
            // Standard format - check for both ingredientNames and ingredientIds
            // Try ingredientNames first (exported format uses names for portability)
            const ingredientNamesElement = seqElement.querySelector('ingredientNames');
            if (ingredientNamesElement) {
                const nameElements = ingredientNamesElement.querySelectorAll('ingredientName');
                nameElements.forEach(nameElement => {
                    const ingredientName = nameElement.textContent.trim();
                    if (ingredientName) {
                        // Map ingredient name to new ID using idMapping
                        const newId = idMapping.get(ingredientName);
                        if (newId) {
                            ingredientIds.push(newId);
                        } else {
                            console.warn('[XMLImporter] Could not find ingredient ID for name:', ingredientName);
                        }
                    }
                });
            } else {
                // Fallback to ingredientIds format (legacy)
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
            }
        }

        return ingredientIds;
    }

    /**
     * Parse kitchen appliances from XML
     * @param {Element} recipeElement - Recipe XML element
     * @returns {Array} Array of appliance IDs
     */
    static parseKitchenAppliances(recipeElement) {
        const appliances = [];
        const appliancesElement = recipeElement.querySelector('kitchenAppliances');

        if (appliancesElement) {
            const applianceElements = appliancesElement.querySelectorAll('appliance');

            applianceElements.forEach(appElement => {
                const applianceId = appElement.textContent.trim();
                if (applianceId) {
                    appliances.push(applianceId);
                }
            });
        }

        return appliances;
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
     * Import menu from XML file
     * Requirements: 1.1, 1.2, 3.1, 3.3, 3.4
     * @param {File} file - XML file to import
     * @returns {Promise<Object>} Parsed menu object
     */
    static async importMenuFromFile(file) {
        try {
            // Validate file
            this.validateFile(file);

            // Read file content
            const xmlString = await this.readFileContent(file);

            // Parse XML and return menu object
            return this.parseMenuXML(xmlString);

        } catch (error) {
            console.error('[XMLImporter] Error importing menu from file:', error);
            if (error instanceof ImportError) {
                throw error;
            }
            throw new ImportError(
                'Error al importar menú: ' + error.message,
                ImportError.PARSING_FAILED
            );
        }
    }

    /**
     * Parse menu XML string
     * Requirements: 1.1, 1.2, 4.1, 4.2, 4.3, 6.1, 6.3, 6.4
     * @param {string} xmlString - XML content as string
     * @returns {Object} Parsed menu object
     */
    static parseMenuXML(xmlString) {
        try {
            // Parse XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new ImportError(
                    'XML inválido: ' + parserError.textContent,
                    ImportError.PARSING_FAILED
                );
            }

            // Validate root element
            const root = xmlDoc.documentElement;
            if (root.tagName !== 'menu') {
                throw new ImportError(
                    'Tipo de archivo XML no reconocido. Se esperaba <menu>',
                    ImportError.PARSING_FAILED
                );
            }

            // Extract menu data
            const menu = {};

            // ID (required)
            const idElement = root.querySelector('id');
            if (!idElement) {
                throw new ImportError(
                    'Falta el campo requerido: id',
                    ImportError.INVALID_DATA
                );
            }
            menu.id = parseInt(idElement.textContent);

            // Name (required)
            const nameElement = root.querySelector('name');
            if (!nameElement) {
                throw new ImportError(
                    'Falta el campo requerido: name',
                    ImportError.INVALID_DATA
                );
            }
            menu.name = nameElement.textContent;

            // Items (required)
            const itemsElement = root.querySelector('items');
            menu.items = [];

            if (itemsElement) {
                const itemElements = itemsElement.querySelectorAll('item');
                itemElements.forEach((itemElement, index) => {
                    try {
                        const item = {};

                        // Item ID
                        const itemIdElement = itemElement.querySelector('id');
                        item.id = itemIdElement ? parseInt(itemIdElement.textContent) : index + 1;

                        // Item name (day)
                        const itemNameElement = itemElement.querySelector('name');
                        item.name = itemNameElement ? itemNameElement.textContent : '';

                        // Lunch
                        const lunchElement = itemElement.querySelector('lunch');
                        item.lunch = lunchElement ? lunchElement.textContent : '';

                        // Dinner
                        const dinnerElement = itemElement.querySelector('dinner');
                        item.dinner = dinnerElement ? dinnerElement.textContent : '';

                        // Completed (boolean)
                        const completedElement = itemElement.querySelector('completed');
                        item.completed = completedElement ? completedElement.textContent === 'true' : false;

                        menu.items.push(item);
                    } catch (error) {
                        console.warn(`[XMLImporter] Error parsing menu item ${index + 1}:`, error);
                    }
                });
            }

            // Timestamps (optional, will be updated on import)
            const createdAtElement = root.querySelector('createdAt');
            menu.createdAt = createdAtElement ? createdAtElement.textContent : new Date().toISOString();

            const updatedAtElement = root.querySelector('updatedAt');
            menu.updatedAt = updatedAtElement ? updatedAtElement.textContent : new Date().toISOString();

            console.log('[XMLImporter] Menu parsed successfully:', menu.name);
            return menu;

        } catch (error) {
            console.error('[XMLImporter] Error parsing menu XML:', error);
            if (error instanceof ImportError) {
                throw error;
            }
            throw new ImportError(
                'Error al parsear XML del menú: ' + error.message,
                ImportError.PARSING_FAILED
            );
        }
    }

    /**
     * Import shopping list from XML file
     * Requirements: 2.1, 2.2, 3.2, 3.3, 3.4
     * @param {File} file - XML file to import
     * @returns {Promise<Object>} Parsed shopping list object
     */
    static async importShoppingListFromFile(file) {
        try {
            // Validate file
            this.validateFile(file);

            // Read file content
            const xmlString = await this.readFileContent(file);

            // Parse XML and return list object
            return this.parseShoppingListXML(xmlString);

        } catch (error) {
            console.error('[XMLImporter] Error importing shopping list from file:', error);
            if (error instanceof ImportError) {
                throw error;
            }
            throw new ImportError(
                'Error al importar lista de compra: ' + error.message,
                ImportError.PARSING_FAILED
            );
        }
    }

    /**
     * Parse shopping list XML string
     * Requirements: 2.1, 2.2, 4.1, 4.2, 4.3, 6.2, 6.3, 6.4, 6.5
     * @param {string} xmlString - XML content as string
     * @returns {Object} Parsed shopping list object
     */
    static parseShoppingListXML(xmlString) {
        try {
            // Parse XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new ImportError(
                    'XML inválido: ' + parserError.textContent,
                    ImportError.PARSING_FAILED
                );
            }

            // Validate root element
            const root = xmlDoc.documentElement;
            if (root.tagName !== 'shoppingList') {
                throw new ImportError(
                    'Tipo de archivo XML no reconocido. Se esperaba <shoppingList>',
                    ImportError.PARSING_FAILED
                );
            }

            // Extract list data
            const list = {};

            // ID (required)
            const idElement = root.querySelector('id');
            if (!idElement) {
                throw new ImportError(
                    'Falta el campo requerido: id',
                    ImportError.INVALID_DATA
                );
            }
            list.id = parseInt(idElement.textContent);

            // Name (required)
            const nameElement = root.querySelector('name');
            if (!nameElement) {
                throw new ImportError(
                    'Falta el campo requerido: name',
                    ImportError.INVALID_DATA
                );
            }
            list.name = nameElement.textContent;

            // Enabled (optional, default true)
            const enabledElement = root.querySelector('enabled');
            list.enabled = enabledElement ? enabledElement.textContent === 'true' : true;

            // Items (required)
            const itemsElement = root.querySelector('items');
            list.items = [];

            if (itemsElement) {
                const itemElements = itemsElement.querySelectorAll('item');
                itemElements.forEach((itemElement, index) => {
                    try {
                        const item = {};

                        // Item ID
                        const itemIdElement = itemElement.querySelector('id');
                        item.id = itemIdElement ? parseInt(itemIdElement.textContent) : index + 1;

                        // Item name
                        const itemNameElement = itemElement.querySelector('name');
                        item.name = itemNameElement ? itemNameElement.textContent : '';

                        // Quantity
                        const quantityElement = itemElement.querySelector('quantity');
                        item.quantity = quantityElement ? quantityElement.textContent : '';

                        // Completed (boolean)
                        const completedElement = itemElement.querySelector('completed');
                        item.completed = completedElement ? completedElement.textContent === 'true' : false;

                        list.items.push(item);
                    } catch (error) {
                        console.warn(`[XMLImporter] Error parsing list item ${index + 1}:`, error);
                    }
                });
            }

            // Timestamps (optional, will be updated on import)
            const createdAtElement = root.querySelector('createdAt');
            list.createdAt = createdAtElement ? createdAtElement.textContent : new Date().toISOString();

            const updatedAtElement = root.querySelector('updatedAt');
            list.updatedAt = updatedAtElement ? updatedAtElement.textContent : new Date().toISOString();

            console.log('[XMLImporter] Shopping list parsed successfully:', list.name);
            return list;

        } catch (error) {
            console.error('[XMLImporter] Error parsing shopping list XML:', error);
            if (error instanceof ImportError) {
                throw error;
            }
            throw new ImportError(
                'Error al parsear XML de la lista: ' + error.message,
                ImportError.PARSING_FAILED
            );
        }
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