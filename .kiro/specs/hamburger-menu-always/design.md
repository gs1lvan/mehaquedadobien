# Design Document

## Overview

Este diseño transforma la interfaz del header para que todos los botones de acción estén siempre dentro del menú hamburguesa, independientemente del tamaño de pantalla. Esto simplifica la UI, reduce el código duplicado y proporciona una experiencia más consistente.

## Architecture

### Current Architecture
```
Desktop (>768px):
┌─────────────────────────────────────────────────────────┐
│ 🍳 mehaquedadobien  [Tema][Categorías][Importar][...]  │
└─────────────────────────────────────────────────────────┘

Mobile (<768px):
┌─────────────────────────────────────────────────────────┐
│ 🍳 mehaquedadobien                              [☰]     │
└─────────────────────────────────────────────────────────┘
                                                   ↓
                                    ┌──────────────────────┐
                                    │ 🌙 Tema              │
                                    │ 🏷️ Categorías        │
                                    │ 📥 Importar receta   │
                                    │ 📤 Exportar todas    │
                                    │ ➕ Nueva Receta      │
                                    └──────────────────────┘
```

### New Architecture (All Resolutions)
```
All Resolutions:
┌─────────────────────────────────────────────────────────┐
│ 🍳 mehaquedadobien                              [☰]     │
└─────────────────────────────────────────────────────────┘
                                                   ↓
                                    ┌──────────────────────┐
                                    │ ☀️ Tema              │
                                    │ 🏷️ Categorías        │
                                    │ 📥 Importar receta   │
                                    │ 📤 Exportar todas    │
                                    │ ➕ Nueva Receta      │
                                    └──────────────────────┘
```

## Components and Interfaces

### 1. HTML Structure Changes

#### Before
```html
<header class="recipe-header">
    <div class="header-content">
        <h1>🍳 mehaquedadobien</h1>
        
        <!-- Mobile menu button (hidden on desktop) -->
        <button id="mobile-menu-btn" class="mobile-menu-btn">☰</button>
        
        <!-- Desktop actions (hidden on mobile) -->
        <div class="header-actions" id="header-actions">
            <button id="theme-toggle-btn">🌙 Tema</button>
            <button id="manage-categories-btn">🏷️ Categorías</button>
            <button id="import-xml-btn">📥 Importar receta</button>
            <button id="export-all-btn">📤 Exportar todas</button>
            <button id="new-recipe-btn">➕ Nueva Receta</button>
        </div>
        
        <!-- Mobile dropdown menu -->
        <div id="mobile-menu" class="mobile-menu">
            <button id="mobile-theme-toggle">🌙 Tema</button>
            <button id="mobile-manage-categories">🏷️ Categorías</button>
            <button id="mobile-import-xml">📥 Importar receta</button>
            <button id="mobile-export-all">📤 Exportar todas</button>
            <button id="mobile-new-recipe">➕ Nueva Receta</button>
        </div>
    </div>
</header>
```

#### After
```html
<header class="recipe-header">
    <div class="header-content">
        <h1>🍳 mehaquedadobien</h1>
        
        <!-- Menu button (always visible) -->
        <button id="menu-btn" class="menu-btn" aria-label="Menú" aria-expanded="false">
            <span class="hamburger-icon">☰</span>
        </button>
        
        <!-- Dropdown menu (single version) -->
        <div id="menu-dropdown" class="menu-dropdown" role="menu">
            <button id="theme-toggle-btn" class="menu-item" role="menuitem">
                ☀️ Tema
            </button>
            <button id="manage-categories-btn" class="menu-item" role="menuitem">
                🏷️ Categorías
            </button>
            <button id="import-xml-btn" class="menu-item" role="menuitem">
                📥 Importar receta
            </button>
            <button id="export-all-btn" class="menu-item" role="menuitem">
                📤 Exportar todas las recetas
            </button>
            <button id="new-recipe-btn" class="menu-item menu-item-primary" role="menuitem">
                ➕ Nueva Receta
            </button>
        </div>
    </div>
    
    <!-- Hidden file input for XML import -->
    <input type="file" id="xml-file-input" accept=".xml" style="display: none;">
</header>
```

### 2. CSS Changes

#### Remove/Modify Styles

**Remove:**
- `.header-actions` display rules
- Media queries that show/hide `.header-actions`
- Media queries that show/hide `.mobile-menu-btn`
- `.mobile-menu` styles (rename to `.menu-dropdown`)
- `.mobile-menu-item` styles (rename to `.menu-item`)

**Add/Modify:**
```css
/* Menu button - always visible */
.menu-btn {
    display: block; /* Always visible */
    background: var(--color-background);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    padding: 8px 12px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 1.5rem;
    transition: all 0.2s ease;
}

.menu-btn:hover {
    background: var(--color-background-secondary);
}

.menu-btn:active {
    transform: scale(0.95);
}

/* Dropdown menu */
.menu-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    min-width: 250px;
    z-index: 1000;
    margin-top: var(--spacing-sm);
    overflow: hidden;
}

.menu-dropdown.active {
    display: flex;
    flex-direction: column;
}

.menu-item {
    width: 100%;
    padding: var(--spacing-md);
    background: var(--color-background);
    border: none;
    border-bottom: 1px solid var(--color-border-light);
    color: var(--color-text);
    text-align: left;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s ease;
}

.menu-item:last-child {
    border-bottom: none;
}

.menu-item:hover {
    background: var(--color-background-secondary);
}

.menu-item:active {
    background: var(--color-border-light);
}

.menu-item-primary {
    background: linear-gradient(to right, var(--color-primary), var(--color-primary-light));
    color: var(--color-background);
    font-weight: var(--font-weight-semibold);
}

.menu-item-primary:hover {
    background: linear-gradient(to right, var(--color-primary-light), var(--color-primary));
}

/* Remove header-actions completely */
.header-actions {
    display: none !important;
}
```

### 3. JavaScript Changes

#### Current Event Listeners (Duplicated)
```javascript
// Desktop version
document.getElementById('theme-toggle-btn').addEventListener('click', ...);
document.getElementById('manage-categories-btn').addEventListener('click', ...);
document.getElementById('import-xml-btn').addEventListener('click', ...);
document.getElementById('export-all-btn').addEventListener('click', ...);
document.getElementById('new-recipe-btn').addEventListener('click', ...);

// Mobile version (duplicated)
document.getElementById('mobile-theme-toggle').addEventListener('click', ...);
document.getElementById('mobile-manage-categories').addEventListener('click', ...);
document.getElementById('mobile-import-xml').addEventListener('click', ...);
document.getElementById('mobile-export-all').addEventListener('click', ...);
document.getElementById('mobile-new-recipe').addEventListener('click', ...);

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', ...);
```

#### New Event Listeners (Simplified)
```javascript
// Single set of event listeners
document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    this.toggleTheme();
    closeMenu(); // Close menu after action
});

document.getElementById('manage-categories-btn').addEventListener('click', () => {
    this.showCategoryManager();
    closeMenu();
});

document.getElementById('import-xml-btn').addEventListener('click', () => {
    document.getElementById('xml-file-input').click();
    closeMenu();
});

document.getElementById('export-all-btn').addEventListener('click', () => {
    this.exportAllRecipesToXML();
    closeMenu();
});

document.getElementById('new-recipe-btn').addEventListener('click', () => {
    this.showRecipeForm();
    closeMenu();
});

// Menu toggle
const menuBtn = document.getElementById('menu-btn');
const menuDropdown = document.getElementById('menu-dropdown');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = menuDropdown.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuDropdown.contains(e.target) && e.target !== menuBtn) {
        menuDropdown.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Helper function
function closeMenu() {
    menuDropdown.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
}
```

## Data Models

No hay cambios en los modelos de datos. Esta es una refactorización puramente de UI.

## Error Handling

### Potential Issues

1. **Event Listeners Not Found**
   - **Issue:** Si los IDs de los botones cambian, los event listeners fallarán
   - **Solution:** Verificar que todos los IDs existan antes de agregar listeners
   - **Code:**
   ```javascript
   const addEventListenerSafe = (id, event, handler) => {
       const element = document.getElementById(id);
       if (element) {
           element.addEventListener(event, handler);
       } else {
           console.warn(`Element with id "${id}" not found`);
       }
   };
   ```

2. **Menu Not Closing**
   - **Issue:** El menú podría quedarse abierto si hay errores en el event listener
   - **Solution:** Usar try-catch y siempre cerrar el menú
   - **Code:**
   ```javascript
   menuItem.addEventListener('click', () => {
       try {
           // Execute action
           someAction();
       } finally {
           closeMenu(); // Always close
       }
   });
   ```

3. **Z-index Conflicts**
   - **Issue:** El menú podría quedar detrás de otros elementos
   - **Solution:** Asegurar z-index alto (1000+) y position: relative en header-content

## Testing Strategy

### Unit Tests

1. **Menu Toggle**
   - Verify menu opens when button is clicked
   - Verify menu closes when clicking outside
   - Verify menu closes after selecting an option

2. **Event Listeners**
   - Verify each button triggers correct action
   - Verify menu closes after each action
   - Verify no duplicate listeners

3. **Accessibility**
   - Verify aria-expanded changes correctly
   - Verify keyboard navigation works
   - Verify screen reader compatibility

### Integration Tests

1. **Full User Flow**
   - Open menu → Click "Nueva Receta" → Verify form opens and menu closes
   - Open menu → Click "Tema" → Verify theme changes and menu closes
   - Open menu → Click outside → Verify menu closes

2. **Responsive Behavior**
   - Test on mobile (320px)
   - Test on tablet (768px)
   - Test on desktop (1920px)
   - Verify menu works identically on all sizes

### Manual Testing Checklist

- [ ] Menu button visible on all screen sizes
- [ ] Menu opens/closes correctly
- [ ] All 5 buttons present in menu
- [ ] Each button executes correct action
- [ ] Menu closes after action
- [ ] Menu closes when clicking outside
- [ ] No console errors
- [ ] Keyboard navigation works
- [ ] Visual styling consistent
- [ ] No layout shifts when menu opens

## Implementation Notes

### Order of Changes

1. **HTML First**
   - Remove `.header-actions` div
   - Remove duplicate mobile menu items
   - Rename classes (mobile-menu → menu-dropdown)
   - Update IDs to single version

2. **CSS Second**
   - Remove media queries for header-actions
   - Remove mobile-menu-btn display rules
   - Rename classes in CSS
   - Make menu-btn always visible

3. **JavaScript Last**
   - Remove duplicate event listeners
   - Update IDs in event listeners
   - Add closeMenu() calls
   - Test thoroughly

### Backward Compatibility

This change is **not backward compatible** with the current implementation. It's a breaking change that requires:
- HTML structure update
- CSS class renames
- JavaScript event listener updates

However, all functionality remains the same from the user's perspective.

## Visual Design

### Menu Appearance

```
┌──────────────────────────────────┐
│ ☀️ Tema                          │ ← Hover: light gray background
├──────────────────────────────────┤
│ 🏷️ Categorías                    │
├──────────────────────────────────┤
│ 📥 Importar receta               │
├──────────────────────────────────┤
│ 📤 Exportar todas las recetas    │
├──────────────────────────────────┤
│ ➕ Nueva Receta                  │ ← Primary gradient background
└──────────────────────────────────┘
```

### Spacing
- Menu padding: 16px (var(--spacing-md))
- Item height: ~48px (comfortable touch target)
- Border radius: 8px (var(--radius-md))
- Shadow: Large (var(--shadow-lg))

### Colors
- Background: var(--color-background)
- Border: var(--color-border)
- Text: var(--color-text)
- Hover: var(--color-background-secondary)
- Primary item: Gradient (primary → primary-light)

## Performance Considerations

### Improvements
- ✅ Reduced DOM elements (no duplicate buttons)
- ✅ Fewer event listeners (5 instead of 10)
- ✅ Simpler CSS (no complex media queries)
- ✅ Faster initial render

### Metrics
- **Before:** 10 buttons + 2 containers = 12 DOM elements
- **After:** 5 buttons + 1 container = 6 DOM elements
- **Reduction:** 50% fewer DOM elements

## Accessibility

### ARIA Attributes
```html
<button id="menu-btn" 
        aria-label="Menú de opciones" 
        aria-expanded="false"
        aria-haspopup="true">
    ☰
</button>

<div id="menu-dropdown" role="menu" aria-label="Opciones de la aplicación">
    <button role="menuitem">☀️ Tema</button>
    <button role="menuitem">🏷️ Categorías</button>
    <!-- ... -->
</div>
```

### Keyboard Navigation
- **Tab:** Focus menu button
- **Enter/Space:** Open menu
- **Tab:** Navigate through menu items
- **Enter/Space:** Activate menu item
- **Escape:** Close menu
- **Click outside:** Close menu

### Screen Reader Support
- Menu button announces: "Menú de opciones, botón, colapsado"
- When opened: "Menú de opciones, expandido"
- Each item announces its label and role
