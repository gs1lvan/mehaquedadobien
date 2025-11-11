/**
 * main.js - Application entry point
 * 
 * Minimal entry point that initializes and starts the application.
 * All business logic and UI is handled by modules.
 */

import { initApp } from './js/core/App.js';

/**
 * Initialize application when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

/**
 * Start the application
 */
async function startApp() {
    try {
        console.log('[main] Starting application...');

        // Initialize app
        const app = initApp();
        await app.init();

        // Make app available globally for debugging (only in development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.app = app;
            console.log('[main] App instance available as window.app for debugging');
        }

        console.log('[main] Application started successfully');

    } catch (error) {
        console.error('[main] Fatal error starting application:', error);
        showFatalError(error);
    }
}

/**
 * Show fatal error screen
 * @param {Error} error - Error object
 */
function showFatalError(error) {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 40px;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        ">
            <div style="
                background: white;
                color: #1f2937;
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                max-width: 500px;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 20px;
                    background: #fee2e2;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 40px;
                ">
                    ⚠️
                </div>
                <h1 style="
                    margin: 0 0 16px;
                    font-size: 24px;
                    font-weight: 600;
                    color: #ef4444;
                ">
                    Error al cargar la aplicación
                </h1>
                <p style="
                    margin: 0 0 24px;
                    color: #6b7280;
                    line-height: 1.6;
                ">
                    ${escapeHTML(error.message)}
                </p>
                <button 
                    onclick="location.reload()" 
                    style="
                        padding: 12px 32px;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 500;
                        transition: background 0.2s;
                    "
                    onmouseover="this.style.background='#2563eb'"
                    onmouseout="this.style.background='#3b82f6'"
                >
                    Recargar aplicación
                </button>
                <p style="
                    margin: 24px 0 0;
                    font-size: 14px;
                    color: #9ca3af;
                ">
                    Si el problema persiste, intenta limpiar la caché del navegador
                </p>
            </div>
        </div>
    `;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
