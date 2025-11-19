/**
 * ModalManager - Gestión centralizada de modales
 * Elimina código duplicado de open/close modales
 */
class ModalManager {
    constructor() {
        this.openModals = new Set();
        this.modalStack = [];
        this.setupGlobalListeners();
    }

    /**
     * Configurar listeners globales (ESC key, etc.)
     */
    setupGlobalListeners() {
        // ESC key para cerrar modal superior
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalStack.length > 0) {
                const topModal = this.modalStack[this.modalStack.length - 1];
                this.close(topModal);
            }
        });
    }

    /**
     * Abrir modal
     * @param {string} modalId - ID del modal
     * @param {Object} options - Opciones adicionales
     * @returns {boolean} True si se abrió correctamente
     */
    open(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`[ModalManager] Modal not found: ${modalId}`);
            return false;
        }

        // Añadir a stack
        this.modalStack.push(modalId);
        this.openModals.add(modalId);

        // Mostrar modal
        modal.classList.remove('hidden');
        
        // Añadir clase stacked si hay más de un modal
        if (this.modalStack.length > 1) {
            modal.classList.add('stacked');
        }

        // Focus en primer elemento focusable
        if (options.autoFocus !== false) {
            this.focusFirstElement(modal);
        }

        // Callback onOpen
        if (options.onOpen) {
            options.onOpen(modal);
        }

        console.log(`[ModalManager] Opened modal: ${modalId} | Stack:`, this.modalStack);
        return true;
    }

    /**
     * Cerrar modal
     * @param {string} modalId - ID del modal
     * @param {Object} options - Opciones adicionales
     * @returns {boolean} True si se cerró correctamente
     */
    close(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`[ModalManager] Modal not found: ${modalId}`);
            return false;
        }

        // Remover de stack
        const index = this.modalStack.indexOf(modalId);
        if (index > -1) {
            this.modalStack.splice(index, 1);
        }
        this.openModals.delete(modalId);

        // Ocultar modal
        modal.classList.add('hidden');
        modal.classList.remove('stacked');

        // Callback onClose
        if (options.onClose) {
            options.onClose(modal);
        }

        // Restaurar focus al modal anterior si existe
        if (this.modalStack.length > 0) {
            const previousModalId = this.modalStack[this.modalStack.length - 1];
            const previousModal = document.getElementById(previousModalId);
            if (previousModal) {
                this.focusFirstElement(previousModal);
            }
        }

        console.log(`[ModalManager] Closed modal: ${modalId} | Stack:`, this.modalStack);
        return true;
    }

    /**
     * Cerrar todos los modales
     */
    closeAll() {
        const modalsToClose = [...this.modalStack];
        modalsToClose.forEach(modalId => this.close(modalId));
        console.log('[ModalManager] Closed all modals');
    }

    /**
     * Verificar si un modal está abierto
     * @param {string} modalId - ID del modal
     * @returns {boolean} True si está abierto
     */
    isOpen(modalId) {
        return this.openModals.has(modalId);
    }

    /**
     * Obtener modal superior del stack
     * @returns {string|null} ID del modal superior o null
     */
    getTopModal() {
        return this.modalStack.length > 0 
            ? this.modalStack[this.modalStack.length - 1] 
            : null;
    }

    /**
     * Focus en primer elemento focusable del modal
     * @param {HTMLElement} modal - Elemento modal
     */
    focusFirstElement(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    /**
     * Configurar modal con overlay y botón de cierre
     * @param {string} modalId - ID del modal
     * @param {string} closeBtnId - ID del botón de cierre
     * @param {Object} options - Opciones adicionales
     */
    setup(modalId, closeBtnId, options = {}) {
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);
        const overlay = modal?.querySelector('.modal-overlay');

        if (!modal) {
            console.error(`[ModalManager] Modal not found: ${modalId}`);
            return;
        }

        // Botón de cierre
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close(modalId, options);
            });
        }

        // Click en overlay para cerrar
        if (overlay && options.closeOnOverlay !== false) {
            overlay.addEventListener('click', () => {
                this.close(modalId, options);
            });
        }

        console.log(`[ModalManager] Setup modal: ${modalId}`);
    }

    /**
     * Crear y abrir modal dinámicamente
     * @param {Object} config - Configuración del modal
     * @returns {string} ID del modal creado
     */
    createModal(config) {
        const {
            id = `modal-${Date.now()}`,
            title = '',
            content = '',
            buttons = [],
            className = ''
        } = config;

        const modalHTML = `
            <div id="${id}" class="modal hidden ${className}" role="dialog" aria-modal="true">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="btn-icon modal-close" aria-label="Cerrar">✕</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${buttons.length > 0 ? `
                        <div class="modal-footer">
                            ${buttons.map(btn => `
                                <button class="btn ${btn.className || ''}" data-action="${btn.action || ''}">
                                    ${btn.text}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        // Añadir al DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Setup automático
        this.setup(id, `${id} .modal-close`, {
            closeOnOverlay: config.closeOnOverlay !== false
        });

        console.log(`[ModalManager] Created modal: ${id}`);
        return id;
    }
}
