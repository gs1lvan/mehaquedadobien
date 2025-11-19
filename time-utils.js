/**
 * TimeUtils - Utilidades para manejo de inputs de tiempo
 * Centraliza funciones repetidas de tiempo
 */
class TimeUtils {
    /**
     * Parsear inputs de tiempo y retornar string formateado
     * @param {string} idPrefix - Prefijo de IDs (ej: 'recipe', 'sequence')
     * @returns {string} Tiempo formateado (ej: "2h 30min") o string vacío
     */
    static parseTimeInput(idPrefix) {
        const hoursInput = document.getElementById(`${idPrefix}-hours`);
        const minutesInput = document.getElementById(`${idPrefix}-minutes`);

        if (!hoursInput || !minutesInput) {
            console.warn(`[TimeUtils] Inputs not found for prefix: ${idPrefix}`);
            return '';
        }

        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}min`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}min`;
        }

        return '';
    }

    /**
     * Poblar inputs de tiempo desde string formateado
     * @param {string} idPrefix - Prefijo de IDs
     * @param {string} timeString - String de tiempo (ej: "2h 30min")
     */
    static populateTimeInput(idPrefix, timeString) {
        const hoursInput = document.getElementById(`${idPrefix}-hours`);
        const minutesInput = document.getElementById(`${idPrefix}-minutes`);

        if (!hoursInput || !minutesInput) {
            console.warn(`[TimeUtils] Inputs not found for prefix: ${idPrefix}`);
            return;
        }

        if (timeString && timeString.trim() !== '') {
            // Parsear formatos: "2h 30min", "1h", "45min"
            const hoursMatch = timeString.match(/(\d+)\s*h/);
            const minutesMatch = timeString.match(/(\d+)\s*min/);

            hoursInput.value = hoursMatch ? hoursMatch[1] : '';
            minutesInput.value = minutesMatch ? minutesMatch[1] : '';
        } else {
            hoursInput.value = '';
            minutesInput.value = '';
        }
    }

    /**
     * Validar inputs de tiempo
     * @param {string} idPrefix - Prefijo de IDs
     * @returns {Object} {valid: boolean, errors: string[]}
     */
    static validateTimeInput(idPrefix) {
        const hoursInput = document.getElementById(`${idPrefix}-hours`);
        const minutesInput = document.getElementById(`${idPrefix}-minutes`);

        const errors = [];

        if (!hoursInput || !minutesInput) {
            errors.push('Inputs de tiempo no encontrados');
            return { valid: false, errors };
        }

        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;

        if (hours < 0 || hours > 24) {
            errors.push('Las horas deben estar entre 0 y 24');
        }

        if (minutes < 0 || minutes > 59) {
            errors.push('Los minutos deben estar entre 0 y 59');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Formatear tiempo para mostrar
     * @param {string} timeString - String de tiempo (ej: "2h 30min")
     * @returns {string} Tiempo legible (ej: "2 horas 30 min")
     */
    static formatTimeForDisplay(timeString) {
        if (!timeString || timeString.trim() === '') {
            return '';
        }

        const hoursMatch = timeString.match(/(\d+)\s*h/);
        const minutesMatch = timeString.match(/(\d+)\s*min/);

        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

        const parts = [];

        if (hours > 0) {
            parts.push(hours === 1 ? '1 hora' : `${hours} horas`);
        }

        if (minutes > 0) {
            parts.push(`${minutes} min`);
        }

        return parts.join(' ');
    }

    /**
     * Crear HTML para inputs de tiempo
     * @param {Object} config - Configuración
     * @returns {string} HTML string
     */
    static createTimeInput(config) {
        const {
            idPrefix,
            label,
            helperText = '',
            required = false,
            maxHours = 24,
            maxMinutes = 59
        } = config;

        const labelSuffix = required ? '' : ' (opcional)';

        return `
            <div class="form-group">
                <label>${label}${labelSuffix}</label>
                <div class="time-input-group">
                    <div class="time-input-item">
                        <span class="time-label">Horas</span>
                        <input 
                            type="number" 
                            id="${idPrefix}-hours" 
                            class="form-input time-input" 
                            placeholder="0"
                            min="0"
                            max="${maxHours}"
                            autocomplete="off"
                        >
                    </div>
                    <div class="time-input-item">
                        <span class="time-label">Minutos</span>
                        <input 
                            type="number" 
                            id="${idPrefix}-minutes" 
                            class="form-input time-input" 
                            placeholder="0"
                            min="0"
                            max="${maxMinutes}"
                            autocomplete="off"
                        >
                    </div>
                </div>
                ${helperText ? `<span class="helper-text">${helperText}</span>` : ''}
            </div>
        `;
    }

    /**
     * Convertir tiempo a minutos totales
     * @param {string} timeString - String de tiempo
     * @returns {number} Minutos totales
     */
    static toMinutes(timeString) {
        if (!timeString || timeString.trim() === '') {
            return 0;
        }

        const hoursMatch = timeString.match(/(\d+)\s*h/);
        const minutesMatch = timeString.match(/(\d+)\s*min/);

        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

        return (hours * 60) + minutes;
    }

    /**
     * Convertir minutos a string de tiempo
     * @param {number} totalMinutes - Minutos totales
     * @returns {string} String de tiempo formateado
     */
    static fromMinutes(totalMinutes) {
        if (totalMinutes <= 0) {
            return '';
        }

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}min`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${minutes}min`;
        }
    }

    /**
     * Comparar dos tiempos
     * @param {string} time1 - Primer tiempo
     * @param {string} time2 - Segundo tiempo
     * @returns {number} -1 si time1 < time2, 0 si iguales, 1 si time1 > time2
     */
    static compare(time1, time2) {
        const minutes1 = this.toMinutes(time1);
        const minutes2 = this.toMinutes(time2);

        if (minutes1 < minutes2) return -1;
        if (minutes1 > minutes2) return 1;
        return 0;
    }

    /**
     * Sumar dos tiempos
     * @param {string} time1 - Primer tiempo
     * @param {string} time2 - Segundo tiempo
     * @returns {string} Suma de tiempos
     */
    static add(time1, time2) {
        const minutes1 = this.toMinutes(time1);
        const minutes2 = this.toMinutes(time2);
        return this.fromMinutes(minutes1 + minutes2);
    }
}
