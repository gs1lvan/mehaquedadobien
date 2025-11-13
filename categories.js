/**
 * Shared Categories Configuration
 * This file is used by both the main app (script.js) and the CMS (recipe-manager.js)
 * 
 * To add a new category, add it to this array and it will be available in both places.
 */

const PREDEFINED_CATEGORIES = [
    { id: 'caldo', name: 'Caldo', emoji: '🍲', color: '#FF8C42', isPredefined: true },
    { id: 'carne', name: 'Carne', emoji: '🥩', color: '#D93B30', isPredefined: true },
    { id: 'cereales', name: 'Cereales', emoji: '🌾', color: '#C4A053', isPredefined: true },
    { id: 'cerdo', name: 'Cerdo', emoji: '🐷', color: '#FFB6C1', isPredefined: true },
    { id: 'con-huevo', name: 'Con huevo', emoji: '🥚', color: '#FFD700', isPredefined: true },
    { id: 'conejo', name: 'Conejo', emoji: '🐰', color: '#D4A5A5', isPredefined: true },
    { id: 'encurtidos', name: 'Encurtidos', emoji: '🥒', color: '#7CB342', isPredefined: true },
    { id: 'escabeche', name: 'Escabeche', emoji: '🥒', color: '#32CD32', isPredefined: true },
    { id: 'fruta', name: 'Fruta', emoji: '🍎', color: '#FF8C00', isPredefined: true },
    { id: 'legumbres', name: 'Legumbres', emoji: '🫘', color: '#8D6E63', isPredefined: true },
    { id: 'marisco', name: 'Marisco', emoji: '🦐', color: '#FF6B9D', isPredefined: true },
    { id: 'pescado', name: 'Pescado', emoji: '🐟', color: '#0073CF', isPredefined: true },
     { id: 'bebida', name: 'bebida', emoji: '🍹', color: '#0073CF', isPredefined: true },
    { id: 'pollo', name: 'Pollo', emoji: '🐔', color: '#FFA500', isPredefined: true },
    { id: 'postres', name: 'Postres', emoji: '🍰', color: '#FFB6C1', isPredefined: true },
    { id: 'salsas', name: 'Salsas', emoji: '🍅', color: '#E53935', isPredefined: true },
    { id: 'verdura', name: 'Verdura', emoji: '🥬', color: '#008A05', isPredefined: true },
    { id: 'caravana', name: 'Caravana', emoji: '🚐', color: '#6B7280', isPredefined: true, isSpecial: true },
    { id: 'hospital', name: 'Hospital', emoji: '🏥', color: '#10B981', isPredefined: true, isSpecial: true },
    { id: 'menu', name: 'Menú', emoji: '🍽️', color: '#8B4513', isPredefined: true, isSpecial: true }
];

// For CMS: Extract just the IDs for simple dropdown
const PREDEFINED_CATEGORY_IDS = PREDEFINED_CATEGORIES.map(cat => cat.id);
