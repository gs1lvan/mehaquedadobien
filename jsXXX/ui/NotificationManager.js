/**
 * NotificationManager - Manages toast notifications and messages
 * 
 * Handles displaying success, error, warning, and info messages to the user
 * with automatic dismissal and queue management.
 */
export class NotificationManager {
    constructor() {
        this.container = null;
        this.queue = [];
        this.currentToast = null;
        this.isShowing = false;
        this.init();
    }

    /**
     * Initialize the notification manager
     */
    init() {
        // Create toast container if it doesn't exist
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    /**
     * Show success notification
     * @param {string} message - Message to display
     * @param {number} duration - Duration in milliseconds (default: 3000)
     */
    success(message, duration = 3000) {
        console.log('[Success]', message);
        this.show(message, 'success', duration);
    }

    /**
     * Show error notification
     * @param {string} message - Message to display
     * @param {number} duration - Duration in milliseconds (default: 5000)
     */
    error(message, duration = 5000) {
        console.error('[Error]', message);
        this.show(message, 'error', duration);
    }

    /**
     * Show warning notification
     * @param {string} message - Message to display
     * @param {number} duration - Duration in milliseconds (default: 4000)
     */
    warning(message, duration = 4000) {
        console.warn('[Warning]', message);
        this.show(message, 'warning', duration);
    }

    /**
     * Show info notification
     * @param {string} message - Message to display
     * @param {number} duration - Duration in milliseconds (default: 3000)
     */
    info(message, duration = 3000) {
        console.log('[Info]', message);
        this.show(message, 'info', duration);
    }

    /**
     * Show notification with specified type
     * @param {string} message - Message to display
     * @param {string} type - Type of notification ('success', 'error', 'warning', 'info')
     * @param {number} duration - Duration in milliseconds
     */
    show(message, type = 'info', duration = 3000) {
        // Add to queue
        this.queue.push({ message, type, duration });

        // Process queue if not currently showing
        if (!this.isShowing) {
            this.processQueue();
        }
    }

    /**
     * Process notification queue
     */
    processQueue() {
        if (this.queue.length === 0) {
            this.isShowing = false;
            return;
        }

        this.isShowing = true;
        const { message, type, duration } = this.queue.shift();

        // Create toast element
        const toast = this.createToast(message, type);

        // Add to container
        this.container.appendChild(toast);
        this.currentToast = toast;

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto-hide after duration
        setTimeout(() => {
            this.hide(toast);
        }, duration);
    }

    /**
     * Create toast element
     * @param {string} message - Message to display
     * @param {string} type - Type of notification
     * @returns {HTMLElement} Toast element
     */
    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        // Icon based on type
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        const icon = icons[type] || icons.info;

        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${this.escapeHTML(message)}</span>
            <button class="toast-close" aria-label="Cerrar">×</button>
        `;

        // Close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.hide(toast);
        });

        return toast;
    }

    /**
     * Hide toast notification
     * @param {HTMLElement} toast - Toast element to hide
     */
    hide(toast = null) {
        const toastToHide = toast || this.currentToast;

        if (!toastToHide) return;

        // Remove show class to trigger fade out
        toastToHide.classList.remove('show');

        // Remove from DOM after animation
        setTimeout(() => {
            if (toastToHide.parentNode) {
                toastToHide.parentNode.removeChild(toastToHide);
            }

            // Process next in queue
            if (toastToHide === this.currentToast) {
                this.currentToast = null;
                this.processQueue();
            }
        }, 300); // Match CSS transition duration
    }

    /**
     * Show toast on specific element (e.g., recipe card)
     * @param {HTMLElement} element - Element to show toast on
     * @param {string} message - Message to display
     * @param {string} type - Type of notification
     */
    showOnElement(element, message, type = 'success') {
        if (!element) return;

        // Remove any existing toast on this element
        const existingToast = element.querySelector('.toast-on-element');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast-on-element toast-${type}`;
        toast.textContent = message;

        // Add to element
        element.style.position = 'relative';
        element.appendChild(toast);

        // Show with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto-hide after 2 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 2000);
    }

    /**
     * Clear all notifications
     */
    clearAll() {
        // Clear queue
        this.queue = [];

        // Hide current toast
        if (this.currentToast) {
            this.hide(this.currentToast);
        }

        // Remove all toasts from container
        if (this.container) {
            this.container.innerHTML = '';
        }

        this.isShowing = false;
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export singleton instance
export const notificationManager = new NotificationManager();
