/**
 * Format Utilities
 * Funciones de formateo de datos
 */

/**
 * Formatea una fecha
 * @param {Date|string} date - Fecha a formatear
 * @param {string} format - Formato (short, long, iso)
 * @returns {string}
 */
export function formatDate(date, format = 'short') {
    if (!date) return '';
    
    const d = date instanceof Date ? date : new Date(date);
    
    if (isNaN(d.getTime())) {
        return '';
    }
    
    const options = {
        short: { year: 'numeric', month: '2-digit', day: '2-digit' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        medium: { year: 'numeric', month: 'short', day: 'numeric' }
    };
    
    if (format === 'iso') {
        return d.toISOString();
    }
    
    return d.toLocaleDateString('es-ES', options[format] || options.short);
}

/**
 * Formatea tiempo (horas y minutos)
 * @param {number} hours - Horas
 * @param {number} minutes - Minutos
 * @returns {string}
 */
export function formatTime(hours, minutes) {
    const parts = [];
    
    if (hours > 0) {
        parts.push(`${hours}h`);
    }
    
    if (minutes > 0) {
        parts.push(`${minutes}min`);
    }
    
    return parts.length > 0 ? parts.join(' ') : '0min';
}

/**
 * Parsea un string de tiempo a objeto
 * @param {string} timeStr - String de tiempo (ej: "1h 30min", "45min")
 * @returns {Object} { hours, minutes, totalMinutes }
 */
export function parseTime(timeStr) {
    if (!timeStr) {
        return { hours: 0, minutes: 0, totalMinutes: 0 };
    }
    
    const hoursMatch = timeStr.match(/(\d+)\s*h/);
    const minutesMatch = timeStr.match(/(\d+)\s*min/);
    
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    const totalMinutes = (hours * 60) + minutes;
    
    return { hours, minutes, totalMinutes };
}

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @param {number} decimals - Decimales a mostrar
 * @returns {string}
 */
export function formatNumber(num, decimals = 0) {
    if (num === null || num === undefined || isNaN(num)) {
        return '0';
    }
    
    return num.toLocaleString('es-ES', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

/**
 * Formatea un tamaño de archivo
 * @param {number} bytes - Tamaño en bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string}
 */
export function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} str - String a capitalizar
 * @returns {string}
 */
export function capitalizeWords(str) {
    if (!str) return '';
    return str.split(' ').map(word => capitalize(word)).join(' ');
}

/**
 * Trunca un string a una longitud máxima
 * @param {string} str - String a truncar
 * @param {number} maxLength - Longitud máxima
 * @param {string} suffix - Sufijo a añadir (ej: '...')
 * @returns {string}
 */
export function truncate(str, maxLength, suffix = '...') {
    if (!str || str.length <= maxLength) {
        return str;
    }
    
    return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Convierte un string a slug (URL-friendly)
 * @param {string} str - String a convertir
 * @returns {string}
 */
export function slugify(str) {
    if (!str) return '';
    
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9]+/g, '-') // Reemplazar no-alfanuméricos con -
        .replace(/^-+|-+$/g, ''); // Remover - al inicio y final
}

/**
 * Pluraliza un string basado en cantidad
 * @param {number} count - Cantidad
 * @param {string} singular - Forma singular
 * @param {string} plural - Forma plural (opcional)
 * @returns {string}
 */
export function pluralize(count, singular, plural = null) {
    if (count === 1) {
        return `${count} ${singular}`;
    }
    
    const pluralForm = plural || `${singular}s`;
    return `${count} ${pluralForm}`;
}

/**
 * Formatea un porcentaje
 * @param {number} value - Valor (0-1 o 0-100)
 * @param {boolean} isDecimal - Si el valor está en formato decimal (0-1)
 * @param {number} decimals - Decimales a mostrar
 * @returns {string}
 */
export function formatPercentage(value, isDecimal = true, decimals = 0) {
    if (value === null || value === undefined || isNaN(value)) {
        return '0%';
    }
    
    const percentage = isDecimal ? value * 100 : value;
    return `${formatNumber(percentage, decimals)}%`;
}

/**
 * Escapa HTML para prevenir XSS
 * @param {string} str - String a escapar
 * @returns {string}
 */
export function escapeHTML(str) {
    if (!str) return '';
    
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Formatea una lista de items con comas y "y"
 * @param {string[]} items - Items a formatear
 * @returns {string}
 */
export function formatList(items) {
    if (!items || items.length === 0) {
        return '';
    }
    
    if (items.length === 1) {
        return items[0];
    }
    
    if (items.length === 2) {
        return `${items[0]} y ${items[1]}`;
    }
    
    const last = items[items.length - 1];
    const rest = items.slice(0, -1);
    return `${rest.join(', ')} y ${last}`;
}

/**
 * Formatea tiempo relativo (hace X minutos, hace X horas, etc.)
 * @param {Date|string} date - Fecha a formatear
 * @returns {string}
 */
export function formatRelativeTime(date) {
    if (!date) return '';
    
    const d = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) {
        return 'hace un momento';
    } else if (diffMins < 60) {
        return `hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffHours < 24) {
        return `hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    } else if (diffDays < 7) {
        return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
    } else {
        return formatDate(d, 'short');
    }
}

/**
 * Ejemplo de uso:
 * 
 * import { formatDate, formatTime, formatFileSize } from './utils/format.js';
 * 
 * formatDate(new Date(), 'long'); // "11 de noviembre de 2025"
 * formatTime(1, 30); // "1h 30min"
 * formatFileSize(1024 * 1024); // "1 MB"
 */
