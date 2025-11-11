/**
 * ModalManager - Manages modal dialogs and their lifecycle
 * 
 * Handles opening, closing, stacking, and keyboard navigation of modals.
 * Supports nested modals with proper focus management and accessibility.
 */
export class ModalManager {
    constructor(eventBus = null) {
        this.eventBus = eventBus;
        this.modalStack = []; // Track opened modals for cascade closing
        this.isClosingModal = false;
        this.modalCloseDebounceTime = 300; // 300ms debounce
        this.focusedElementBeforeModal = null;
        this.init();
    }

    /**
     * Initialize modal manager
     */
    init() {
        // Setup global ESC key handler
        this.setupEscapeKey();
        console.log('[ModalManager] Initialized');
    }

    /**
     * Open a modal
     * @param {string} modalId - ID of the modal to open
     * @param {Object} options - Options for opening the modal
     * @param {boolean} options.pushToStack - Whether to add to modal stack (default: true)
     * @param {boolean} options.setFocus - Whether to set focus to first element (default: true)
     * @param {Function} options.onOpen - Callback to run after opening
     */
    open(modalId, options = {}) {
        const {
            pushToStack = true,
            setFocus = true,
            onOpen = null
        } = options;

        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error('[ModalManager] Modal not found:', modalId);
            return false;
        }

        // Sync stack before opening
        this.syncModalStack();

        // Store currently focused element for restoration later
        if (this.modalStack.length === 0) {
            this.focusedElementBeforeModal = document.activeElement;
        }

        // Show modal
        modal.classList.remove('hidden');

        // Add to stack
        if (pushToStack) {
            this.pushModal(modalId);
        }

        // Set focus to first focusable element
        if (setFocus) {
            this.setModalFocus(modal);
        }

        // Run callback
        if (onOpen && typeof onOpen === 'function') {
            onOpen(modal);
        }

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('modal:opened', { modalId, modal });
        }

        console.log('[ModalManager] Opened modal:', modalId);
        return true;
    }

    /**
     * Close a modal
     * @param {string} modalId - ID of the modal to close
     * @param {Object} options - Options for closing the modal
     * @param {boolean} options.popFromStack - Whether to remove from modal stack (default: true)
     * @param {boolean} options.restoreFocus - Whether to restore focus (default: true)
     * @param {Function} options.onClose - Callback to run after closing
     */
    close(modalId, options = {}) {
        const {
            popFromStack = true,
            restoreFocus = true,
            onClose = null
        } = options;

        // Prevent multiple rapid closes
        if (this.isClosingModal) {
            console.log('[ModalManager] Close operation already in progress, ignoring');
            return false;
        }

        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error('[ModalManager] Modal not found:', modalId);
            return false;
        }

        // Set closing flag
        this.isClosingModal = true;

        // Hide modal
        modal.classList.add('hidden');

        // Remove from stack
        if (popFromStack) {
            this.popModal();
        }

        // Restore focus if this was the last modal
        if (restoreFocus && this.modalStack.length === 0 && this.focusedElementBeforeModal) {
            setTimeout(() => {
                if (this.focusedElementBeforeModal && this.focusedElementBeforeModal.focus) {
                    this.focusedElementBeforeModal.focus();
                }
                this.focusedElementBeforeModal = null;
            }, 100);
        }

        // Run callback
        if (onClose && typeof onClose === 'function') {
            onClose(modal);
        }

        // Emit event
        if (this.eventBus) {
            this.eventBus.emit('modal:closed', { modalId, modal });
        }

        // Reset closing flag after debounce time
        setTimeout(() => {
            this.isClosingModal = false;
        }, this.modalCloseDebounceTime);

        console.log('[ModalManager] Closed modal:', modalId);
        return true;
    }

    /**
     * Close all open modals
     */
    closeAll() {
        console.log('[ModalManager] Closing all modals');
        
        // Get copy of stack to avoid modification during iteration
        const modalsToClose = [...this.modalStack];
        
        // Close each modal
        modalsToClose.forEach(modalId => {
            this.close(modalId, { popFromStack: false });
        });

        // Clear stack
        this.clearModalStack();

        // Restore focus
        if (this.focusedElementBeforeModal) {
            setTimeout(() => {
                if (this.focusedElementBeforeModal && this.focusedElementBeforeModal.focus) {
                    this.focusedElementBeforeModal.focus();
                }
                this.focusedElementBeforeModal = null;
            }, 100);
        }
    }

    /**
     * Close the topmost modal
     */
    closeTop() {
        if (this.modalStack.length === 0) {
            console.log('[ModalManager] No modals to close');
            return false;
        }

        const topModalId = this.modalStack[this.modalStack.length - 1];
        return this.close(topModalId);
    }

    /**
     * Check if a modal is open
     * @param {string} modalId - ID of the modal to check
     * @returns {boolean} True if modal is open
     */
    isOpen(modalId) {
        return this.modalStack.includes(modalId);
    }

    /**
     * Get the topmost modal ID
     * @returns {string|null} ID of topmost modal or null if none open
     */
    getTopModal() {
        if (this.modalStack.length === 0) {
            return null;
        }
        return this.modalStack[this.modalStack.length - 1];
    }

    /**
     * Get count of open modals
     * @returns {number} Number of open modals
     */
    getOpenCount() {
        return this.modalStack.length;
    }

    /**
     * Setup a modal with standard close handlers
     * @param {string} modalId - ID of the modal
     * @param {Object} config - Configuration object
     * @param {string} config.closeBtnId - ID of close button
     * @param {boolean} config.closeOnOverlay - Close on overlay click (default: true)
     * @param {Function} config.onClose - Callback when modal closes
     */
    setupModal(modalId, config = {}) {
        const {
            closeBtnId = null,
            closeOnOverlay = true,
            onClose = null
        } = config;

        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error('[ModalManager] Modal not found:', modalId);
            return;
        }

        // Setup close button
        if (closeBtnId) {
            const closeBtn = document.getElementById(closeBtnId);
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.close(modalId, { onClose });
                });
            }
        }

        // Setup overlay click
        if (closeOnOverlay) {
            const overlay = modal.querySelector('.modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        this.close(modalId, { onClose });
                    }
                });
            }
        }

        console.log('[ModalManager] Setup modal:', modalId);
    }

    /**
     * Add a modal to the stack when it opens
     * @param {string} modalId - The ID of the modal being opened
     */
    pushModal(modalId) {
        if (!this.modalStack.includes(modalId)) {
            this.modalStack.push(modalId);
            console.log('[ModalManager] Pushed modal:', modalId, 'Stack:', this.modalStack);
        }
    }

    /**
     * Remove the last modal from the stack when it closes
     * @returns {string|null} The ID of the removed modal, or null if stack was empty
     */
    popModal() {
        const modalId = this.modalStack.pop();
        console.log('[ModalManager] Popped modal:', modalId, 'Stack:', this.modalStack);
        return modalId || null;
    }

    /**
     * Clear all modals from the stack
     */
    clearModalStack() {
        console.log('[ModalManager] Clearing stack. Previous stack:', this.modalStack);
        this.modalStack = [];
    }

    /**
     * Synchronize the modal stack with the actual DOM state
     * This ensures the stack matches which modals are actually visible
     */
    syncModalStack() {
        console.log('[ModalManager] Syncing stack. Previous stack:', this.modalStack);
        this.modalStack = [];

        // Find all modals that are currently visible (not hidden)
        const visibleModals = document.querySelectorAll('.modal:not(.hidden)');
        visibleModals.forEach(modal => {
            if (modal.id) {
                this.modalStack.push(modal.id);
            }
        });

        console.log('[ModalManager] Synced stack:', this.modalStack);
    }

    /**
     * Set focus to the first focusable element in a modal
     * Accessibility: Ensures keyboard users can immediately interact with the modal
     * @param {HTMLElement} modal - Modal element
     */
    setModalFocus(modal) {
        if (!modal) return;

        // Find all focusable elements in the modal
        const focusableElements = modal.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            // Focus the first focusable element (usually the close button or first input)
            setTimeout(() => {
                focusableElements[0].focus();
            }, 100); // Small delay to ensure modal is fully rendered
        }
    }

    /**
     * Setup global ESC key handler
     */
    setupEscapeKey() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    /**
     * Handle ESC key press to close the topmost modal
     */
    handleEscapeKey() {
        // Prevent closing if already in progress
        if (this.isClosingModal) {
            console.log('[ModalManager] Close operation already in progress, ignoring ESC');
            return;
        }

        // Sync stack to ensure consistency
        this.syncModalStack();

        // Get the topmost modal from the stack
        if (this.modalStack.length === 0) {
            console.log('[ModalManager] No modals open, ESC ignored');
            return;
        }

        const topModalId = this.modalStack[this.modalStack.length - 1];
        console.log('[ModalManager] ESC pressed, closing topmost modal:', topModalId);

        // Close the topmost modal
        this.close(topModalId);
    }

    /**
     * Toggle a modal (open if closed, close if open)
     * @param {string} modalId - ID of the modal to toggle
     * @param {Object} options - Options for opening/closing
     */
    toggle(modalId, options = {}) {
        if (this.isOpen(modalId)) {
            return this.close(modalId, options);
        } else {
            return this.open(modalId, options);
        }
    }

    /**
     * Get all open modal IDs
     * @returns {Array<string>} Array of open modal IDs
     */
    getOpenModals() {
        return [...this.modalStack];
    }
}

// Export singleton instance
export const modalManager = new ModalManager();
