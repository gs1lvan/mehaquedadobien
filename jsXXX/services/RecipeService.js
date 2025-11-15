/**
 * Recipe Service
 * Servicio para gestión de recetas (CRUD y operaciones)
 */

import { storage } from '../utils/storage.js';
import { eventBus, Events } from '../core/EventBus.js';
import { validators, validate } from '../utils/validation.js';

class RecipeService {
    constructor() {
        this.storageKey = 'recipes';
    }

    /**
     * Obtiene todas las recetas
     * @returns {Array} Array de recetas
     */
    getAll() {
        return storage.get(this.storageKey, []);
    }

    /**
     * Obtiene una receta por ID
     * @param {string} id - ID de la receta
     * @returns {Object|null} Receta o null si no existe
     */
    getById(id) {
        const recipes = this.getAll();
        return recipes.find(r => r.id === id) || null;
    }

    /**
     * Crea una nueva receta
     * @param {Object} recipeData - Datos de la receta
     * @returns {Object} Receta creada
     */
    create(recipeData) {
        // Validar datos
        const validation = this.validateRecipe(recipeData);
        if (!validation.valid) {
            throw new Error(`Validación fallida: ${JSON.stringify(validation.errors)}`);
        }

        const recipes = this.getAll();
        
        // Crear receta con ID y timestamps
        const recipe = {
            ...recipeData,
            id: recipeData.id || this.generateId(),
            createdAt: recipeData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        recipes.push(recipe);
        storage.set(this.storageKey, recipes);

        // Emitir evento
        eventBus.emit(Events.RECIPE_CREATED, recipe);

        return recipe;
    }

    /**
     * Actualiza una receta existente
     * @param {string} id - ID de la receta
     * @param {Object} updates - Datos a actualizar
     * @returns {Object|null} Receta actualizada o null si no existe
     */
    update(id, updates) {
        const recipes = this.getAll();
        const index = recipes.findIndex(r => r.id === id);

        if (index === -1) {
            return null;
        }

        // Merge con datos existentes
        const updatedRecipe = {
            ...recipes[index],
            ...updates,
            id, // Preservar ID
            createdAt: recipes[index].createdAt, // Preservar fecha de creación
            updatedAt: new Date().toISOString()
        };

        recipes[index] = updatedRecipe;
        storage.set(this.storageKey, recipes);

        // Emitir evento
        eventBus.emit(Events.RECIPE_UPDATED, updatedRecipe);

        return updatedRecipe;
    }

    /**
     * Elimina una receta
     * @param {string} id - ID de la receta
     * @returns {boolean} true si se eliminó, false si no existía
     */
    delete(id) {
        const recipes = this.getAll();
        const index = recipes.findIndex(r => r.id === id);

        if (index === -1) {
            return false;
        }

        const deletedRecipe = recipes[index];
        recipes.splice(index, 1);
        storage.set(this.storageKey, recipes);

        // Emitir evento
        eventBus.emit(Events.RECIPE_DELETED, { id, recipe: deletedRecipe });

        return true;
    }

    /**
     * Duplica una receta
     * @param {string} id - ID de la receta a duplicar
     * @returns {Object|null} Receta duplicada o null si no existe
     */
    duplicate(id) {
        const recipe = this.getById(id);
        
        if (!recipe) {
            return null;
        }

        const duplicated = {
            ...recipe,
            id: this.generateId(),
            name: `${recipe.name} (copia)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return this.create(duplicated);
    }

    /**
     * Filtra recetas por criterios
     * @param {Object} criteria - Criterios de filtrado
     * @returns {Array} Recetas filtradas
     */
    filter(criteria = {}) {
        let recipes = this.getAll();

        // Filtrar por categoría
        if (criteria.category && criteria.category !== 'all') {
            recipes = recipes.filter(r => r.category === criteria.category);
        }

        // Filtrar por búsqueda de texto
        if (criteria.search) {
            const searchLower = criteria.search.toLowerCase();
            recipes = recipes.filter(r => 
                r.name.toLowerCase().includes(searchLower) ||
                (r.ingredients && r.ingredients.some(i => 
                    i.name.toLowerCase().includes(searchLower)
                ))
            );
        }

        // Filtrar por tiempo máximo
        if (criteria.maxTime) {
            recipes = recipes.filter(r => {
                if (!r.totalTime) return true;
                const minutes = this.parseTimeToMinutes(r.totalTime);
                return minutes <= criteria.maxTime;
            });
        }

        // Filtrar por flags
        if (criteria.caravanFriendly) {
            recipes = recipes.filter(r => r.caravanFriendly === true);
        }

        if (criteria.hospitalFriendly) {
            recipes = recipes.filter(r => r.hospitalFriendly === true);
        }

        if (criteria.menuFriendly) {
            recipes = recipes.filter(r => r.menuFriendly === true);
        }

        // Filtrar por menú
        if (criteria.menuId) {
            recipes = recipes.filter(r => 
                r.menus && r.menus.includes(criteria.menuId)
            );
        }

        return recipes;
    }

    /**
     * Ordena recetas
     * @param {Array} recipes - Recetas a ordenar
     * @param {string} field - Campo por el que ordenar
     * @param {string} direction - Dirección (asc/desc)
     * @returns {Array} Recetas ordenadas
     */
    sort(recipes, field = 'name', direction = 'asc') {
        const sorted = [...recipes].sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];

            // Manejo especial para tiempo
            if (field === 'totalTime') {
                aVal = this.parseTimeToMinutes(aVal);
                bVal = this.parseTimeToMinutes(bVal);
            }

            // Manejo especial para fechas
            if (field === 'createdAt' || field === 'updatedAt') {
                aVal = new Date(aVal).getTime();
                bVal = new Date(bVal).getTime();
            }

            // Comparación
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }

    /**
     * Busca recetas
     * @param {string} query - Texto de búsqueda
     * @returns {Array} Recetas que coinciden
     */
    search(query) {
        if (!query || query.trim() === '') {
            return this.getAll();
        }

        return this.filter({ search: query });
    }

    /**
     * Obtiene estadísticas de recetas
     * @returns {Object} Estadísticas
     */
    getStats() {
        const recipes = this.getAll();
        
        const stats = {
            total: recipes.length,
            byCategory: {},
            withImages: 0,
            withAuthor: 0,
            caravanFriendly: 0,
            hospitalFriendly: 0,
            menuFriendly: 0,
            avgIngredients: 0,
            avgTime: 0
        };

        let totalIngredients = 0;
        let totalTime = 0;
        let recipesWithTime = 0;

        recipes.forEach(recipe => {
            // Por categoría
            const cat = recipe.category || 'sin-categoria';
            stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;

            // Con imágenes
            if (recipe.images && recipe.images.length > 0) {
                stats.withImages++;
            }

            // Con autor
            if (recipe.author) {
                stats.withAuthor++;
            }

            // Flags
            if (recipe.caravanFriendly) stats.caravanFriendly++;
            if (recipe.hospitalFriendly) stats.hospitalFriendly++;
            if (recipe.menuFriendly) stats.menuFriendly++;

            // Ingredientes
            if (recipe.ingredients) {
                totalIngredients += recipe.ingredients.length;
            }

            // Tiempo
            if (recipe.totalTime) {
                totalTime += this.parseTimeToMinutes(recipe.totalTime);
                recipesWithTime++;
            }
        });

        stats.avgIngredients = recipes.length > 0 
            ? Math.round(totalIngredients / recipes.length) 
            : 0;

        stats.avgTime = recipesWithTime > 0 
            ? Math.round(totalTime / recipesWithTime) 
            : 0;

        return stats;
    }

    /**
     * Valida una receta
     * @param {Object} recipe - Receta a validar
     * @returns {Object} { valid, errors }
     */
    validateRecipe(recipe) {
        const schema = {
            name: [
                { validator: validators.required, message: 'El nombre es requerido' },
                { validator: validators.minLength(2), message: 'El nombre debe tener al menos 2 caracteres' }
            ]
        };

        return validate(recipe, schema);
    }

    /**
     * Parsea tiempo a minutos
     * @param {string} timeStr - String de tiempo
     * @returns {number} Minutos
     */
    parseTimeToMinutes(timeStr) {
        if (!timeStr) return 0;

        const hoursMatch = timeStr.match(/(\d+)\s*h/);
        const minutesMatch = timeStr.match(/(\d+)\s*min/);

        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

        return (hours * 60) + minutes;
    }

    /**
     * Genera un ID único
     * @returns {string} UUID
     */
    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Exporta todas las recetas
     * @returns {Array} Recetas
     */
    export() {
        return this.getAll();
    }

    /**
     * Importa recetas
     * @param {Array} recipes - Recetas a importar
     * @param {boolean} merge - Si true, hace merge con existentes
     * @returns {Object} { imported, skipped, errors }
     */
    import(recipes, merge = false) {
        const result = {
            imported: 0,
            skipped: 0,
            errors: []
        };

        let existingRecipes = merge ? this.getAll() : [];
        const existingIds = new Set(existingRecipes.map(r => r.id));

        recipes.forEach((recipe, index) => {
            try {
                // Validar
                const validation = this.validateRecipe(recipe);
                if (!validation.valid) {
                    result.errors.push({
                        index,
                        recipe: recipe.name,
                        errors: validation.errors
                    });
                    result.skipped++;
                    return;
                }

                // Verificar duplicados
                if (existingIds.has(recipe.id)) {
                    result.skipped++;
                    return;
                }

                existingRecipes.push(recipe);
                existingIds.add(recipe.id);
                result.imported++;
            } catch (error) {
                result.errors.push({
                    index,
                    recipe: recipe.name,
                    error: error.message
                });
                result.skipped++;
            }
        });

        storage.set(this.storageKey, existingRecipes);
        eventBus.emit(Events.IMPORT_COMPLETED, result);

        return result;
    }
}

// Instancia singleton
export const recipeService = new RecipeService();

// Exportar también la clase
export { RecipeService };

/**
 * Ejemplo de uso:
 * 
 * import { recipeService } from './services/RecipeService.js';
 * 
 * // Crear receta
 * const recipe = recipeService.create({
 *     name: 'Paella',
 *     category: 'arroz',
 *     ingredients: [...]
 * });
 * 
 * // Obtener todas
 * const recipes = recipeService.getAll();
 * 
 * // Filtrar
 * const filtered = recipeService.filter({
 *     category: 'carne',
 *     search: 'pollo'
 * });
 * 
 * // Estadísticas
 * const stats = recipeService.getStats();
 */
