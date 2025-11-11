/**
 * Modal Configurations
 * 
 * Configuration for all modals in the application.
 * Used by ModalManager to setup standard close handlers.
 */

export const MODAL_CONFIGS = {
    // Category management modals
    'category-modal': {
        closeBtnId: 'close-category-modal',
        closeOnOverlay: true
    },
    'edit-category-modal': {
        closeBtnId: 'close-edit-category-modal',
        closeOnOverlay: true
    },
    'category-options-modal': {
        closeBtnId: 'close-category-options-modal',
        closeOnOverlay: true
    },
    'category-selector-modal': {
        closeBtnId: 'close-category-selector-modal',
        closeOnOverlay: true
    },

    // Picker modals
    'emoji-picker-modal': {
        closeBtnId: 'close-emoji-picker-modal',
        closeOnOverlay: true
    },
    'color-picker-modal': {
        closeBtnId: 'close-color-picker-modal',
        closeOnOverlay: true
    },

    // Image modals
    'image-modal': {
        closeBtnId: 'close-image-modal',
        closeOnOverlay: true
    },
    'photo-gallery-modal': {
        closeBtnId: 'close-photo-gallery-modal',
        closeOnOverlay: true
    },

    // Settings and help modals
    'settings-modal': {
        closeBtnId: 'close-settings-modal',
        closeOnOverlay: true
    },
    'help-modal': {
        closeBtnId: 'close-help-modal',
        closeOnOverlay: true
    },

    // Confirmation modals
    'confirm-delete-modal': {
        closeBtnId: 'close-confirm-delete-modal',
        closeOnOverlay: false // Don't close on overlay for confirmation modals
    },

    // Shopping list modals
    'shopping-list-modal': {
        closeBtnId: 'close-shopping-list-modal',
        closeOnOverlay: true
    },

    // Menu modals
    'menu-modal': {
        closeBtnId: 'close-menu-modal',
        closeOnOverlay: true
    },
    'menu-recipe-selector-modal': {
        closeBtnId: 'close-menu-recipe-selector-modal',
        closeOnOverlay: true
    }
};

/**
 * Setup all modals with ModalManager
 * @param {ModalManager} modalManager - ModalManager instance
 */
export function setupAllModals(modalManager) {
    Object.entries(MODAL_CONFIGS).forEach(([modalId, config]) => {
        modalManager.setupModal(modalId, config);
    });
    console.log('[ModalConfigs] Setup', Object.keys(MODAL_CONFIGS).length, 'modals');
}
