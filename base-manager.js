/**
 * BaseManager - Clase base para managers con localStorage
 * Proporciona funcionalidad común de load/save
 */
class BaseManager {
    /**
     * Constructor
     * @param {string} storageKey - Clave para localStorage
     * @param {*} defaultValue - Valor por defecto si no hay datos (array, object, etc.)
     */
    constructor(storageKey, defaultValue = []) {
        this.storageKey = storageKey;
        this.defaultValue = defaultValue;
    }

    /**
     * Cargar datos desde localStorage
     * @returns {*} Datos cargados o valor por defecto
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                console.log(`[${this.constructor.name}] Loaded from localStorage:`, data.length || Object.keys(data).length, 'items');
                return data;
            }
            return this.defaultValue;
        } catch (error) {
            console.error(`[${this.constructor.name}] Error loading from localStorage:`, error);
            return this.defaultValue;
        }
    }

    /**
     * Guardar datos en localStorage
     * @param {*} data - Datos a guardar
     * @returns {boolean} True si se guardó correctamente
     */
    save(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            console.log(`[${this.constructor.name}] Saved to localStorage:`, data.length || Object.keys(data).length, 'items');
            return true;
        } catch (error) {
            console.error(`[${this.constructor.name}] Error saving to localStorage:`, error);
            throw new Error(`No se pudieron guardar los datos: ${error.message}`);
        }
    }

    /**
     * Limpiar datos de localStorage
     * @returns {boolean} True si se limpió correctamente
     */
    clear() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log(`[${this.constructor.name}] Cleared localStorage`);
            return true;
        } catch (error) {
            console.error(`[${this.constructor.name}] Error clearing localStorage:`, error);
            return false;
        }
    }

    /**
     * Verificar si existen datos en localStorage
     * @returns {boolean} True si existen datos
     */
    exists() {
        return localStorage.getItem(this.storageKey) !== null;
    }

    /**
     * Obtener tamaño de los datos en localStorage (en bytes)
     * @returns {number} Tamaño en bytes
     */
    getSize() {
        const data = localStorage.getItem(this.storageKey);
        return data ? new Blob([data]).size : 0;
    }
}
