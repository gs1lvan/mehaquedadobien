/**
 * Storage Manager
 * Gestión centralizada de localStorage con manejo de errores
 */

class StorageManager {
    constructor(prefix = 'recetario_') {
        this.prefix = prefix;
        this.available = this.checkAvailability();
    }

    /**
     * Verifica si localStorage está disponible
     * @returns {boolean}
     */
    checkAvailability() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('[Storage] localStorage no disponible:', e);
            return false;
        }
    }

    /**
     * Obtiene la key con prefijo
     * @param {string} key - Key sin prefijo
     * @returns {string}
     */
    getKey(key) {
        return `${this.prefix}${key}`;
    }

    /**
     * Obtiene un valor del storage
     * @param {string} key - Key del valor
     * @param {any} defaultValue - Valor por defecto si no existe
     * @returns {any}
     */
    get(key, defaultValue = null) {
        if (!this.available) {
            console.warn('[Storage] localStorage no disponible');
            return defaultValue;
        }

        try {
            const fullKey = this.getKey(key);
            const item = localStorage.getItem(fullKey);
            
            if (item === null) {
                return defaultValue;
            }

            return JSON.parse(item);
        } catch (e) {
            console.error(`[Storage] Error al obtener ${key}:`, e);
            return defaultValue;
        }
    }

    /**
     * Guarda un valor en el storage
     * @param {string} key - Key del valor
     * @param {any} value - Valor a guardar
     * @returns {boolean} - true si se guardó correctamente
     */
    set(key, value) {
        if (!this.available) {
            console.warn('[Storage] localStorage no disponible');
            return false;
        }

        try {
            const fullKey = this.getKey(key);
            const serialized = JSON.stringify(value);
            localStorage.setItem(fullKey, serialized);
            return true;
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('[Storage] Cuota de almacenamiento excedida');
                this.handleQuotaExceeded();
            } else {
                console.error(`[Storage] Error al guardar ${key}:`, e);
            }
            return false;
        }
    }

    /**
     * Elimina un valor del storage
     * @param {string} key - Key del valor
     * @returns {boolean}
     */
    remove(key) {
        if (!this.available) {
            return false;
        }

        try {
            const fullKey = this.getKey(key);
            localStorage.removeItem(fullKey);
            return true;
        } catch (e) {
            console.error(`[Storage] Error al eliminar ${key}:`, e);
            return false;
        }
    }

    /**
     * Limpia todo el storage con el prefijo
     * @returns {boolean}
     */
    clear() {
        if (!this.available) {
            return false;
        }

        try {
            const keys = Object.keys(localStorage);
            const prefixedKeys = keys.filter(k => k.startsWith(this.prefix));
            
            prefixedKeys.forEach(key => {
                localStorage.removeItem(key);
            });
            
            return true;
        } catch (e) {
            console.error('[Storage] Error al limpiar storage:', e);
            return false;
        }
    }

    /**
     * Obtiene todas las keys con el prefijo
     * @returns {string[]}
     */
    keys() {
        if (!this.available) {
            return [];
        }

        try {
            const keys = Object.keys(localStorage);
            return keys
                .filter(k => k.startsWith(this.prefix))
                .map(k => k.substring(this.prefix.length));
        } catch (e) {
            console.error('[Storage] Error al obtener keys:', e);
            return [];
        }
    }

    /**
     * Verifica si existe una key
     * @param {string} key - Key a verificar
     * @returns {boolean}
     */
    has(key) {
        if (!this.available) {
            return false;
        }

        const fullKey = this.getKey(key);
        return localStorage.getItem(fullKey) !== null;
    }

    /**
     * Obtiene el tamaño usado en bytes
     * @returns {number}
     */
    getSize() {
        if (!this.available) {
            return 0;
        }

        try {
            let size = 0;
            const keys = Object.keys(localStorage);
            const prefixedKeys = keys.filter(k => k.startsWith(this.prefix));
            
            prefixedKeys.forEach(key => {
                const value = localStorage.getItem(key);
                size += key.length + (value ? value.length : 0);
            });
            
            return size;
        } catch (e) {
            console.error('[Storage] Error al calcular tamaño:', e);
            return 0;
        }
    }

    /**
     * Obtiene el tamaño usado en formato legible
     * @returns {string}
     */
    getSizeFormatted() {
        const bytes = this.getSize();
        const kb = bytes / 1024;
        const mb = kb / 1024;
        
        if (mb >= 1) {
            return `${mb.toFixed(2)} MB`;
        } else if (kb >= 1) {
            return `${kb.toFixed(2)} KB`;
        } else {
            return `${bytes} bytes`;
        }
    }

    /**
     * Maneja el error de cuota excedida
     */
    handleQuotaExceeded() {
        console.warn('[Storage] Intentando liberar espacio...');
        
        // Aquí podrías implementar lógica para limpiar datos antiguos
        // Por ejemplo, eliminar imágenes antiguas, limpiar cache, etc.
        
        const size = this.getSizeFormatted();
        console.warn(`[Storage] Tamaño actual: ${size}`);
    }

    /**
     * Exporta todos los datos con el prefijo
     * @returns {Object}
     */
    export() {
        if (!this.available) {
            return {};
        }

        const data = {};
        const keys = this.keys();
        
        keys.forEach(key => {
            data[key] = this.get(key);
        });
        
        return data;
    }

    /**
     * Importa datos al storage
     * @param {Object} data - Datos a importar
     * @param {boolean} merge - Si true, hace merge con datos existentes
     * @returns {boolean}
     */
    import(data, merge = false) {
        if (!this.available) {
            return false;
        }

        try {
            if (!merge) {
                this.clear();
            }
            
            for (const [key, value] of Object.entries(data)) {
                this.set(key, value);
            }
            
            return true;
        } catch (e) {
            console.error('[Storage] Error al importar datos:', e);
            return false;
        }
    }
}

// Instancia singleton
export const storage = new StorageManager('recetario_');

// Exportar también la clase para crear instancias personalizadas
export { StorageManager };

/**
 * Ejemplo de uso:
 * 
 * import { storage } from './utils/storage.js';
 * 
 * // Guardar
 * storage.set('recipes', recipes);
 * 
 * // Obtener
 * const recipes = storage.get('recipes', []);
 * 
 * // Verificar
 * if (storage.has('recipes')) {
 *     console.log('Recipes exist');
 * }
 * 
 * // Tamaño
 * console.log('Storage size:', storage.getSizeFormatted());
 * 
 * // Exportar/Importar
 * const backup = storage.export();
 * storage.import(backup);
 */
