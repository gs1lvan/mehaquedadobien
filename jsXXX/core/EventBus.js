/**
 * Event Bus
 * Sistema de eventos para desacoplar componentes
 */

class EventBus {
    constructor() {
        this.events = new Map();
    }

    /**
     * Suscribe un callback a un evento
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función a ejecutar
     * @returns {Function} Función para desuscribirse
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        
        this.events.get(event).push(callback);
        
        // Retornar función para desuscribirse
        return () => this.off(event, callback);
    }

    /**
     * Suscribe un callback que se ejecuta solo una vez
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función a ejecutar
     * @returns {Function} Función para desuscribirse
     */
    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(event, wrapper);
        };
        
        return this.on(event, wrapper);
    }

    /**
     * Desuscribe un callback de un evento
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función a desuscribir
     */
    off(event, callback) {
        if (!this.events.has(event)) {
            return;
        }
        
        const callbacks = this.events.get(event);
        const index = callbacks.indexOf(callback);
        
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
        
        // Limpiar si no quedan callbacks
        if (callbacks.length === 0) {
            this.events.delete(event);
        }
    }

    /**
     * Emite un evento
     * @param {string} event - Nombre del evento
     * @param {any} data - Datos del evento
     */
    emit(event, data) {
        if (!this.events.has(event)) {
            return;
        }
        
        const callbacks = this.events.get(event);
        
        // Ejecutar callbacks en el próximo tick para evitar bloqueos
        callbacks.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`[EventBus] Error en callback de evento "${event}":`, error);
            }
        });
    }

    /**
     * Emite un evento de forma asíncrona
     * @param {string} event - Nombre del evento
     * @param {any} data - Datos del evento
     * @returns {Promise}
     */
    async emitAsync(event, data) {
        if (!this.events.has(event)) {
            return;
        }
        
        const callbacks = this.events.get(event);
        
        for (const callback of callbacks) {
            try {
                await callback(data);
            } catch (error) {
                console.error(`[EventBus] Error en callback async de evento "${event}":`, error);
            }
        }
    }

    /**
     * Elimina todos los listeners de un evento
     * @param {string} event - Nombre del evento
     */
    clear(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }

    /**
     * Obtiene el número de listeners de un evento
     * @param {string} event - Nombre del evento
     * @returns {number}
     */
    listenerCount(event) {
        return this.events.has(event) ? this.events.get(event).length : 0;
    }

    /**
     * Obtiene todos los eventos registrados
     * @returns {string[]}
     */
    eventNames() {
        return Array.from(this.events.keys());
    }

    /**
     * Debug: muestra información sobre eventos
     */
    debug() {
        console.group('[EventBus] Estado actual');
        console.log('Eventos registrados:', this.eventNames().length);
        
        this.events.forEach((callbacks, event) => {
            console.log(`  ${event}: ${callbacks.length} listener(s)`);
        });
        
        console.groupEnd();
    }
}

// Instancia singleton
export const eventBus = new EventBus();

// Exportar también la clase
export { EventBus };

/**
 * Eventos estándar de la aplicación
 */
export const Events = {
    // Recetas
    RECIPE_CREATED: 'recipe:created',
    RECIPE_UPDATED: 'recipe:updated',
    RECIPE_DELETED: 'recipe:deleted',
    RECIPE_SELECTED: 'recipe:selected',
    
    // Ingredientes
    INGREDIENT_ADDED: 'ingredient:added',
    INGREDIENT_REMOVED: 'ingredient:removed',
    INGREDIENT_UPDATED: 'ingredient:updated',
    
    // Secuencias
    SEQUENCE_ADDED: 'sequence:added',
    SEQUENCE_REMOVED: 'sequence:removed',
    SEQUENCE_UPDATED: 'sequence:updated',
    SEQUENCE_REORDERED: 'sequence:reordered',
    
    // Categorías
    CATEGORY_CREATED: 'category:created',
    CATEGORY_UPDATED: 'category:updated',
    CATEGORY_DELETED: 'category:deleted',
    CATEGORY_HIDDEN: 'category:hidden',
    CATEGORY_SHOWN: 'category:shown',
    
    // Listas de compra
    SHOPPING_LIST_CREATED: 'shopping-list:created',
    SHOPPING_LIST_UPDATED: 'shopping-list:updated',
    SHOPPING_LIST_DELETED: 'shopping-list:deleted',
    
    // Menús
    MENU_CREATED: 'menu:created',
    MENU_UPDATED: 'menu:updated',
    MENU_DELETED: 'menu:deleted',
    
    // UI
    MODAL_OPENED: 'modal:opened',
    MODAL_CLOSED: 'modal:closed',
    THEME_CHANGED: 'theme:changed',
    NOTIFICATION_SHOWN: 'notification:shown',
    
    // Filtros
    FILTER_CHANGED: 'filter:changed',
    FILTER_CLEARED: 'filter:cleared',
    
    // Storage
    STORAGE_UPDATED: 'storage:updated',
    STORAGE_CLEARED: 'storage:cleared',
    
    // Import/Export
    IMPORT_STARTED: 'import:started',
    IMPORT_PROGRESS: 'import:progress',
    IMPORT_COMPLETED: 'import:completed',
    IMPORT_FAILED: 'import:failed',
    EXPORT_COMPLETED: 'export:completed',
};

/**
 * Ejemplo de uso:
 * 
 * import { eventBus, Events } from './core/EventBus.js';
 * 
 * // Suscribirse a un evento
 * const unsubscribe = eventBus.on(Events.RECIPE_CREATED, (recipe) => {
 *     console.log('Nueva receta creada:', recipe);
 *     // Actualizar UI, etc.
 * });
 * 
 * // Emitir un evento
 * eventBus.emit(Events.RECIPE_CREATED, newRecipe);
 * 
 * // Desuscribirse
 * unsubscribe();
 * 
 * // Suscribirse una sola vez
 * eventBus.once(Events.IMPORT_COMPLETED, () => {
 *     console.log('Importación completada');
 * });
 * 
 * // Debug
 * eventBus.debug();
 */
