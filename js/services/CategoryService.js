/**
 * Category Service
 * Servicio para gestión de categorías
 */

import { storage } from '../utils/storage.js';
import { eventBus, Events } from '../core/EventBus.js';

// Categorías predefinidas
const PREDEFINED_CATEGORIES = [
    { id: 'sin-categoria', name: 'Sin categoría', emoji: '🍽️', color: '#008A05', predefined: true, visible: true },
    { id: 'carne', name: 'Carne', emoji: '🥩', color: '#D93B30', predefined: true, visible: true },
    { id: 'verdura', name: 'Verdura', emoji: '🥬', color: '#008A05', predefined: true, visible: true },
    { id: 'pescado', name: 'Pescado', emoji: '🐟', color: '#0073CF', predefined: true, visible: true },
    { id: 'marisco', name: 'Marisco', emoji: '🦐', color: '#FF6B9D', predefined: true, visible: true },
    { id: 'fruta', name: 'Fruta', emoji: '🍎', color: '#FF8C00', predefined: true, visible: true },
    { id: 'cereales', name: 'Cereales', emoji: '🌾', color: '#C4A053', predefined: true, visible: true },
    { id: 'postres', name: 'Postres', emoji: '🍰', color: '#FFB6C1', predefined: true, visible: true },
    { id: 'mix', name: 'Mix', emoji: '🍲', color: '#8B5CF6', predefined: true, visible: true },
    { id: 'con-huevo', name: 'Con huevo', emoji: '🥚', color: '#FFD700', predefined: true, visible: true },
    { id: 'pollo', name: 'Pollo', emoji: '🐔', color: '#FFA500', predefined: true, visible: true },
    { id: 'cerdo', name: 'Cerdo', emoji: '🐷', color: '#FFB6C1', predefined: true, visible: true },
    { id: 'conejo', name: 'Conejo', emoji: '🐰', color: '#D4A5A5', predefined: true, visible: true },
    { id: 'encurtidos', name: 'Encurtidos', emoji: '🥒', color: '#7CB342', predefined: true, visible: true },
    { id: 'escabeche', name: 'Escabeche', emoji: '🥒', color: '#32CD32', predefined: true, visible: true },
    { id: 'legumbres', name: 'Legumbres', emoji: '🫘', color: '#8D6E63', predefined: true, visible: true },
    { id: 'salsas', name: 'Salsas', emoji: '🥫', color: '#E53935', predefined: true, visible: true }
];

class CategoryService {
    constructor() {
        this.customKey = 'custom_categories';
        this.hiddenKey = 'hidden_categories';
    }

    /**
     * Obtiene todas las categorías (predefinidas + custom)
     * @param {boolean} includeHidden - Incluir categorías ocultas
     * @returns {Array} Array de categorías
     */
    getAll(includeHidden = true) {
        const custom = this.getCustomCategories();
        const hidden = includeHidden ? [] : this.getHiddenCategoryIds();
        
        const all = [...PREDEFINED_CATEGORIES, ...custom];
        
        if (!includeHidden) {
            return all.filter(cat => !hidden.includes(cat.id));
        }
        
        return all;
    }

    /**
     * Obtiene categorías visibles
     * @returns {Array} Categorías visibles
     */
    getVisible() {
        return this.getAll(false);
    }

    /**
     * Obtiene una categoría por ID
     * @param {string} id - ID de la categoría
     * @returns {Object|null} Categoría o null
     */
    getById(id) {
        const categories = this.getAll();
        return categories.find(cat => cat.id === id) || null;
    }

    /**
     * Obtiene categorías personalizadas
     * @returns {Array} Categorías custom
     */
    getCustomCategories() {
        return storage.get(this.customKey, []);
    }

    /**
     * Obtiene IDs de categorías ocultas
     * @returns {Array} IDs de categorías ocultas
     */
    getHiddenCategoryIds() {
        return storage.get(this.hiddenKey, []);
    }

    /**
     * Crea una categoría personalizada
     * @param {Object} categoryData - Datos de la categoría
     * @returns {Object} Categoría creada
     */
    create(categoryData) {
        const custom = this.getCustomCategories();
        
        // Generar ID si no existe
        const id = categoryData.id || this.generateId(categoryData.name);
        
        // Verificar que no exista
        if (this.getById(id)) {
            throw new Error(`Ya existe una categoría con el ID: ${id}`);
        }
        
        const category = {
            id,
            name: categoryData.name,
            emoji: categoryData.emoji || '🍽️',
            color: categoryData.color || '#008A05',
            predefined: false,
            visible: true,
            createdAt: new Date().toISOString()
        };
        
        custom.push(category);
        storage.set(this.customKey, custom);
        
        eventBus.emit(Events.CATEGORY_CREATED, category);
        
        return category;
    }

    /**
     * Actualiza una categoría personalizada
     * @param {string} id - ID de la categoría
     * @param {Object} updates - Datos a actualizar
     * @returns {Object|null} Categoría actualizada o null
     */
    update(id, updates) {
        const custom = this.getCustomCategories();
        const index = custom.findIndex(cat => cat.id === id);
        
        if (index === -1) {
            return null;
        }
        
        const updated = {
            ...custom[index],
            ...updates,
            id, // Preservar ID
            predefined: false, // Preservar flag
            updatedAt: new Date().toISOString()
        };
        
        custom[index] = updated;
        storage.set(this.customKey, custom);
        
        eventBus.emit(Events.CATEGORY_UPDATED, updated);
        
        return updated;
    }

    /**
     * Elimina una categoría personalizada
     * @param {string} id - ID de la categoría
     * @returns {boolean} true si se eliminó
     */
    delete(id) {
        // No se pueden eliminar categorías predefinidas
        const category = this.getById(id);
        if (!category || category.predefined) {
            return false;
        }
        
        const custom = this.getCustomCategories();
        const filtered = custom.filter(cat => cat.id !== id);
        
        storage.set(this.customKey, filtered);
        
        eventBus.emit(Events.CATEGORY_DELETED, { id, category });
        
        return true;
    }

    /**
     * Oculta una categoría
     * @param {string} id - ID de la categoría
     * @returns {boolean} true si se ocultó
     */
    hide(id) {
        const hidden = this.getHiddenCategoryIds();
        
        if (hidden.includes(id)) {
            return false;
        }
        
        hidden.push(id);
        storage.set(this.hiddenKey, hidden);
        
        eventBus.emit(Events.CATEGORY_HIDDEN, { id });
        
        return true;
    }

    /**
     * Muestra una categoría oculta
     * @param {string} id - ID de la categoría
     * @returns {boolean} true si se mostró
     */
    show(id) {
        const hidden = this.getHiddenCategoryIds();
        const index = hidden.indexOf(id);
        
        if (index === -1) {
            return false;
        }
        
        hidden.splice(index, 1);
        storage.set(this.hiddenKey, hidden);
        
        eventBus.emit(Events.CATEGORY_SHOWN, { id });
        
        return true;
    }

    /**
     * Verifica si una categoría está oculta
     * @param {string} id - ID de la categoría
     * @returns {boolean}
     */
    isHidden(id) {
        const hidden = this.getHiddenCategoryIds();
        return hidden.includes(id);
    }

    /**
     * Obtiene conteo de recetas por categoría
     * @param {Array} recipes - Array de recetas
     * @returns {Object} { categoryId: count }
     */
    getRecipeCounts(recipes) {
        const counts = {};
        
        recipes.forEach(recipe => {
            const catId = recipe.category || 'sin-categoria';
            counts[catId] = (counts[catId] || 0) + 1;
        });
        
        return counts;
    }

    /**
     * Obtiene categorías con recetas
     * @param {Array} recipes - Array de recetas
     * @returns {Array} Categorías que tienen recetas
     */
    getCategoriesWithRecipes(recipes) {
        const counts = this.getRecipeCounts(recipes);
        const categories = this.getVisible();
        
        return categories.filter(cat => counts[cat.id] > 0);
    }

    /**
     * Genera un ID a partir del nombre
     * @param {string} name - Nombre de la categoría
     * @returns {string} ID generado
     */
    generateId(name) {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    /**
     * Obtiene el color de una categoría
     * @param {string} categoryId - ID de la categoría
     * @returns {string} Color hex
     */
    getColor(categoryId) {
        const category = this.getById(categoryId);
        return category ? category.color : '#008A05';
    }

    /**
     * Obtiene el emoji de una categoría
     * @param {string} categoryId - ID de la categoría
     * @returns {string} Emoji
     */
    getEmoji(categoryId) {
        const category = this.getById(categoryId);
        return category ? category.emoji : '🍽️';
    }

    /**
     * Obtiene el nombre de una categoría
     * @param {string} categoryId - ID de la categoría
     * @returns {string} Nombre
     */
    getName(categoryId) {
        const category = this.getById(categoryId);
        return category ? category.name : 'Sin categoría';
    }

    /**
     * Exporta categorías personalizadas
     * @returns {Array} Categorías custom
     */
    export() {
        return this.getCustomCategories();
    }

    /**
     * Importa categorías personalizadas
     * @param {Array} categories - Categorías a importar
     * @param {boolean} merge - Si true, hace merge
     * @returns {Object} { imported, skipped }
     */
    import(categories, merge = false) {
        const result = {
            imported: 0,
            skipped: 0
        };
        
        let existing = merge ? this.getCustomCategories() : [];
        const existingIds = new Set(existing.map(c => c.id));
        
        categories.forEach(category => {
            if (existingIds.has(category.id)) {
                result.skipped++;
                return;
            }
            
            existing.push({
                ...category,
                predefined: false,
                visible: true
            });
            existingIds.add(category.id);
            result.imported++;
        });
        
        storage.set(this.customKey, existing);
        
        return result;
    }

    /**
     * Resetea categorías a valores por defecto
     */
    reset() {
        storage.remove(this.customKey);
        storage.remove(this.hiddenKey);
    }
}

// Instancia singleton
export const categoryService = new CategoryService();

// Exportar también la clase y constantes
export { CategoryService, PREDEFINED_CATEGORIES };

/**
 * Ejemplo de uso:
 * 
 * import { categoryService } from './services/CategoryService.js';
 * 
 * // Obtener todas
 * const categories = categoryService.getAll();
 * 
 * // Crear custom
 * const category = categoryService.create({
 *     name: 'Sopas',
 *     emoji: '🍜',
 *     color: '#FF5733'
 * });
 * 
 * // Ocultar/mostrar
 * categoryService.hide('postres');
 * categoryService.show('postres');
 * 
 * // Obtener conteos
 * const counts = categoryService.getRecipeCounts(recipes);
 */
