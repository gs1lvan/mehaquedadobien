/**
 * Validation Utilities
 * Funciones de validación reutilizables
 */

export const validators = {
    /**
     * Valida que un campo no esté vacío
     * @param {string} value - Valor a validar
     * @returns {boolean}
     */
    required: (value) => {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },

    /**
     * Valida longitud mínima
     * @param {number} min - Longitud mínima
     * @returns {Function}
     */
    minLength: (min) => (value) => {
        return value && value.length >= min;
    },

    /**
     * Valida longitud máxima
     * @param {number} max - Longitud máxima
     * @returns {Function}
     */
    maxLength: (max) => (value) => {
        return !value || value.length <= max;
    },

    /**
     * Valida formato de email
     * @param {string} value - Email a validar
     * @returns {boolean}
     */
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value || emailRegex.test(value);
    },

    /**
     * Valida que sea un número
     * @param {any} value - Valor a validar
     * @returns {boolean}
     */
    isNumber: (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    /**
     * Valida rango numérico
     * @param {number} min - Valor mínimo
     * @param {number} max - Valor máximo
     * @returns {Function}
     */
    range: (min, max) => (value) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    },

    /**
     * Valida que sea un UUID válido
     * @param {string} value - UUID a validar
     * @returns {boolean}
     */
    isUUID: (value) => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(value);
    },

    /**
     * Valida tamaño de archivo
     * @param {number} maxSizeInMB - Tamaño máximo en MB
     * @returns {Function}
     */
    fileSize: (maxSizeInMB) => (file) => {
        if (!file) return true;
        const maxBytes = maxSizeInMB * 1024 * 1024;
        return file.size <= maxBytes;
    },

    /**
     * Valida tipo de archivo
     * @param {string[]} allowedTypes - Tipos permitidos (ej: ['image/jpeg', 'image/png'])
     * @returns {Function}
     */
    fileType: (allowedTypes) => (file) => {
        if (!file) return true;
        return allowedTypes.includes(file.type);
    }
};

/**
 * Valida un objeto contra un esquema de validación
 * @param {Object} data - Datos a validar
 * @param {Object} schema - Esquema de validación
 * @returns {Object} { valid: boolean, errors: Object }
 */
export function validate(data, schema) {
    const errors = {};
    let valid = true;

    for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];
        const fieldErrors = [];

        for (const rule of rules) {
            if (typeof rule === 'function') {
                if (!rule(value)) {
                    fieldErrors.push(`Validación fallida para ${field}`);
                    valid = false;
                }
            } else if (typeof rule === 'object') {
                const { validator, message } = rule;
                if (!validator(value)) {
                    fieldErrors.push(message || `Validación fallida para ${field}`);
                    valid = false;
                }
            }
        }

        if (fieldErrors.length > 0) {
            errors[field] = fieldErrors;
        }
    }

    return { valid, errors };
}

/**
 * Ejemplo de uso:
 * 
 * const schema = {
 *     name: [
 *         { validator: validators.required, message: 'El nombre es requerido' },
 *         { validator: validators.minLength(3), message: 'Mínimo 3 caracteres' }
 *     ],
 *     email: [
 *         { validator: validators.email, message: 'Email inválido' }
 *     ]
 * };
 * 
 * const result = validate(data, schema);
 * if (!result.valid) {
 *     console.log(result.errors);
 * }
 */
