/**
 * DOM Utilities
 * Funciones helper para manipulación del DOM
 */

/**
 * Crea un elemento DOM con propiedades y children
 * @param {string} tag - Tag del elemento (div, span, etc.)
 * @param {Object} props - Propiedades del elemento
 * @param {Array|string} children - Children del elemento
 * @returns {HTMLElement}
 */
export function createElement(tag, props = {}, children = []) {
    const element = document.createElement(tag);

    // Aplicar propiedades
    for (const [key, value] of Object.entries(props)) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            for (const [dataKey, dataValue] of Object.entries(value)) {
                element.dataset[dataKey] = dataValue;
            }
        } else if (key.startsWith('on') && typeof value === 'function') {
            const event = key.substring(2).toLowerCase();
            element.addEventListener(event, value);
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    }

    // Añadir children
    const childArray = Array.isArray(children) ? children : [children];
    for (const child of childArray) {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
            element.appendChild(child);
        }
    }

    return element;
}

/**
 * Muestra un elemento (remueve clase u-hidden)
 * @param {HTMLElement|string} element - Elemento o selector
 */
export function show(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.classList.remove('u-hidden', 'hidden');
        el.style.display = '';
    }
}

/**
 * Oculta un elemento (añade clase u-hidden)
 * @param {HTMLElement|string} element - Elemento o selector
 */
export function hide(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.classList.add('u-hidden');
    }
}

/**
 * Toggle visibilidad de un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 */
export function toggle(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.classList.toggle('u-hidden');
    }
}

/**
 * Verifica si un elemento está visible
 * @param {HTMLElement|string} element - Elemento o selector
 * @returns {boolean}
 */
export function isVisible(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return false;
    return !el.classList.contains('u-hidden') && !el.classList.contains('hidden');
}

/**
 * Limpia el contenido de un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 */
export function empty(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.innerHTML = '';
    }
}

/**
 * Añade clase(s) a un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {...string} classes - Clases a añadir
 */
export function addClass(element, ...classes) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.classList.add(...classes);
    }
}

/**
 * Remueve clase(s) de un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {...string} classes - Clases a remover
 */
export function removeClass(element, ...classes) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.classList.remove(...classes);
    }
}

/**
 * Toggle clase(s) en un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {...string} classes - Clases a toggle
 */
export function toggleClass(element, ...classes) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        classes.forEach(cls => el.classList.toggle(cls));
    }
}

/**
 * Verifica si un elemento tiene una clase
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} className - Clase a verificar
 * @returns {boolean}
 */
export function hasClass(element, className) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.classList.contains(className) : false;
}

/**
 * Obtiene el valor de un input
 * @param {HTMLElement|string} element - Elemento o selector
 * @returns {string}
 */
export function getValue(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.value : '';
}

/**
 * Establece el valor de un input
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} value - Valor a establecer
 */
export function setValue(element, value) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.value = value;
    }
}

/**
 * Obtiene el texto de un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @returns {string}
 */
export function getText(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    return el ? el.textContent : '';
}

/**
 * Establece el texto de un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {string} text - Texto a establecer
 */
export function setText(element, text) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.textContent = text;
    }
}

/**
 * Añade un event listener con delegación
 * @param {HTMLElement|string} parent - Elemento padre o selector
 * @param {string} eventType - Tipo de evento
 * @param {string} selector - Selector de children
 * @param {Function} handler - Handler del evento
 */
export function delegate(parent, eventType, selector, handler) {
    const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
    if (parentEl) {
        parentEl.addEventListener(eventType, (e) => {
            const target = e.target.closest(selector);
            if (target) {
                handler.call(target, e);
            }
        });
    }
}

/**
 * Query selector con soporte para múltiples elementos
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} context - Contexto de búsqueda (opcional)
 * @returns {HTMLElement|null}
 */
export function $(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Query selector all con soporte para múltiples elementos
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} context - Contexto de búsqueda (opcional)
 * @returns {NodeList}
 */
export function $$(selector, context = document) {
    return context.querySelectorAll(selector);
}

/**
 * Espera a que el DOM esté listo
 * @param {Function} callback - Función a ejecutar
 */
export function ready(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Ejemplo de uso:
 * 
 * import { createElement, show, hide, delegate } from './utils/dom.js';
 * 
 * // Crear elemento
 * const button = createElement('button', {
 *     className: 'btn-primary',
 *     onClick: () => console.log('clicked')
 * }, 'Click me');
 * 
 * // Mostrar/ocultar
 * show('#my-element');
 * hide('.modal');
 * 
 * // Delegación de eventos
 * delegate('#recipe-list', 'click', '.recipe-card', function(e) {
 *     console.log('Clicked recipe:', this.dataset.id);
 * });
 */
