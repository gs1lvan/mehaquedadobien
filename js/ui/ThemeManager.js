/**
 * ThemeManager - Manages light/dark theme switching
 * 
 * Handles theme initialization, toggling, and persistence in localStorage.
 * Default theme is dark if no preference is saved.
 */
export class ThemeManager {
    constructor(storage, notificationManager = null) {
        this.storage = storage;
        this.notificationManager = notificationManager;
        this.storageKey = 'recetario_theme';
        this.currentTheme = 'dark'; // Default theme
    }

    /**
     * Initialize theme from localStorage
     * Default theme is dark if no preference is saved
     */
    init() {
        const savedTheme = this.loadTheme();

        // Default to dark theme if no preference is saved
        if (savedTheme === null || savedTheme === 'dark') {
            this.setTheme('dark', false); // false = don't show notification on init
            // Save default preference if not set
            if (savedTheme === null) {
                this.saveTheme('dark');
            }
        } else {
            this.setTheme('light', false);
        }

        console.log('[ThemeManager] Initialized with theme:', this.currentTheme);
    }

    /**
     * Toggle between light and dark theme
     */
    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true); // true = show notification
        console.log('[ThemeManager] Theme toggled to:', newTheme);
    }

    /**
     * Set theme (light or dark)
     * @param {string} theme - Theme to set ('light' or 'dark')
     * @param {boolean} showNotification - Whether to show notification (default: true)
     */
    setTheme(theme, showNotification = true) {
        const isDark = theme === 'dark';
        this.currentTheme = theme;

        // Apply theme to document
        this.applyTheme(isDark);

        // Save to localStorage
        this.saveTheme(theme);

        // Update theme button
        this.updateThemeButton(isDark);

        // Show notification if requested
        if (showNotification && this.notificationManager) {
            const message = isDark ? '🌙 Tema oscuro activado' : '☀️ Tema claro activado';
            this.notificationManager.success(message, 2000);
        }
    }

    /**
     * Get current theme
     * @returns {string} Current theme ('light' or 'dark')
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * Check if dark theme is active
     * @returns {boolean} True if dark theme is active
     */
    isDark() {
        return this.currentTheme === 'dark';
    }

    /**
     * Apply theme to document
     * @param {boolean} isDark - Whether to apply dark theme
     */
    applyTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.body.classList.remove('dark-theme');
        }
    }

    /**
     * Update theme button icon and text
     * @param {boolean} isDark - Whether dark theme is active
     */
    updateThemeButton(isDark) {
        const themeIconModal = document.getElementById('theme-icon-modal');
        const themeTextModal = document.getElementById('theme-text-modal');
        const themeBtn = document.getElementById('theme-toggle-btn-modal');

        if (themeIconModal && themeTextModal) {
            // Si está en modo oscuro, mostrar sol (para cambiar a claro)
            // Si está en modo claro, mostrar luna (para cambiar a oscuro)
            themeIconModal.innerHTML = isDark 
                ? '<i class="fa-solid fa-sun"></i>' 
                : '<i class="fa-solid fa-moon"></i>';
            themeTextModal.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
        }

        if (themeBtn) {
            themeBtn.title = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
            themeBtn.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
        }
    }

    /**
     * Save theme to localStorage
     * @param {string} theme - Theme to save
     */
    saveTheme(theme) {
        try {
            if (this.storage && this.storage.set) {
                this.storage.set(this.storageKey, theme);
            } else {
                localStorage.setItem(this.storageKey, theme);
            }
        } catch (error) {
            console.error('[ThemeManager] Error saving theme:', error);
        }
    }

    /**
     * Load theme from localStorage
     * @returns {string|null} Saved theme or null if not found
     */
    loadTheme() {
        try {
            if (this.storage && this.storage.get) {
                return this.storage.get(this.storageKey, null);
            } else {
                return localStorage.getItem(this.storageKey);
            }
        } catch (error) {
            console.error('[ThemeManager] Error loading theme:', error);
            return null;
        }
    }

    /**
     * Reset theme to default (dark)
     */
    reset() {
        this.setTheme('dark', false);
        console.log('[ThemeManager] Theme reset to default (dark)');
    }

    /**
     * Setup theme toggle button event listener
     * @param {string} buttonId - ID of the theme toggle button
     */
    setupToggleButton(buttonId = 'theme-toggle-btn-modal') {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });
            console.log('[ThemeManager] Toggle button setup:', buttonId);
        } else {
            console.warn('[ThemeManager] Toggle button not found:', buttonId);
        }
    }
}

// Export singleton instance (will be initialized in App.js)
export let themeManager = null;

/**
 * Initialize theme manager singleton
 * @param {Object} storage - Storage manager instance
 * @param {Object} notificationManager - Notification manager instance
 * @returns {ThemeManager} Theme manager instance
 */
export function initThemeManager(storage, notificationManager) {
    if (!themeManager) {
        themeManager = new ThemeManager(storage, notificationManager);
    }
    return themeManager;
}
