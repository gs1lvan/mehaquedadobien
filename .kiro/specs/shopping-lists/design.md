# Design Document

## Overview

El sistema de listas de compra permite a los usuarios crear, gestionar y organizar múltiples listas de compra. Cada lista contiene elementos (alimentos) con nombre y cantidad opcional. Las listas se muestran en formato desplegable (collapsible) y los elementos pueden marcarse como completados.

## Architecture

### Component Structure

```
ShoppingListsView
├── Header (Título + Botón Nueva Lista)
├── ListsContainer
│   ├── ShoppingListCard (repetido por cada lista)
│   │   ├── ListHeader (H3 + Contador + Botones)
│   │   └── ListContent (colapsable)
│   │       └── ListItems (elementos con checkbox)
│   └── EmptyState (cuando no hay listas)
└── ListForm (modal para crear/editar)
    ├── NameInput
    └── ItemsInput (similar a ingredientes)
```

### Data Flow

```
User Action → Event Handler → Update State → Update localStorage → Re-render View
```

## Components and Interfaces

### 1. Data Models

#### ShoppingList Model
```javascript
{
    id: number,              // Timestamp único
    name: string,            // Nombre de la lista
    items: ShoppingItem[],   // Array de elementos
    createdAt: string,       // ISO date string
    updatedAt: string        // ISO date string
}
```

#### ShoppingItem Model
```javascript
{
    id: number,              // Timestamp único
    name: string,            // Nombre del elemento (alimento)
    quantity: string,        // Cantidad (opcional, ej: "2 kg", "500g")
    completed: boolean       // Estado de completado
}
```

### 2. HTML Structure

#### Main View
```html
<div id="shopping-lists-view" class="view-container hidden">
    <!-- Header -->
    <div class="shopping-lists-header">
        <h2>🛒 Listas de Compra</h2>
        <button id="new-shopping-list-btn" class="btn-primary">
            ➕ Nueva Lista
        </button>
    </div>

    <!-- Lists Container -->
    <div id="shopping-lists-container" class="shopping-lists-container">
        <!-- Shopping list cards will be rendered here -->
    </div>

    <!-- Empty State -->
    <div id="shopping-lists-empty" class="empty-state hidden">
        <p>🛒 No tienes listas de compra</p>
        <p>Crea tu primera lista para empezar</p>
    </div>
</div>
```

#### Shopping List Card
```html
<div class="shopping-list-card" data-list-id="123456">
    <!-- Header -->
    <div class="shopping-list-header" role="button" tabindex="0">
        <h3 class="shopping-list-name">Compra Semanal</h3>
        <span class="shopping-list-counter">3/5 completados</span>
        <span class="expand-icon">▼</span>
    </div>

    <!-- Actions -->
    <div class="shopping-list-actions">
        <button class="btn-icon copy-list-btn" title="Copiar lista" aria-label="Copiar lista al portapapeles">
            📋
        </button>
        <button class="btn-icon" title="Editar lista" aria-label="Editar lista">
            ✏️
        </button>
        <button class="btn-icon" title="Eliminar lista" aria-label="Eliminar lista">
            🗑️
        </button>
    </div>

    <!-- Content (collapsible) -->
    <div class="shopping-list-content collapsed">
        <div class="shopping-list-items">
            <!-- Item -->
            <div class="shopping-item">
                <input type="checkbox" id="item-123" class="shopping-item-checkbox">
                <label for="item-123" class="shopping-item-label">
                    <span class="shopping-item-name">Tomates</span>
                    <span class="shopping-item-quantity">2 kg</span>
                </label>
            </div>
            <!-- More items... -->
        </div>
    </div>
</div>
```

#### List Form (Modal)
```html
<div id="shopping-list-modal" class="modal hidden">
    <div class="modal-overlay"></div>
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="shopping-list-modal-title">Nueva Lista de Compra</h2>
            <button id="close-shopping-list-modal" class="btn-icon">✕</button>
        </div>

        <div class="modal-body">
            <!-- List Name -->
            <div class="form-group">
                <label for="shopping-list-name-input">Nombre de la lista</label>
                <input type="text" id="shopping-list-name-input" 
                       class="form-input" placeholder="Ej: Compra Semanal">
            </div>

            <!-- Items Section -->
            <div class="form-group">
                <label>Elementos</label>
                <div id="shopping-items-container">
                    <!-- Items will be added here -->
                </div>
                <button id="add-shopping-item-btn" class="btn-secondary">
                    ➕ Añadir Elemento
                </button>
            </div>
        </div>

        <div class="modal-footer">
            <button id="cancel-shopping-list-btn" class="btn-secondary">
                Cancelar
            </button>
            <button id="save-shopping-list-btn" class="btn-primary">
                Guardar Lista
            </button>
        </div>
    </div>
</div>
```

#### Shopping Item Input (similar a ingredientes)
```html
<div class="shopping-item-input" data-item-id="123">
    <input type="text" class="form-input shopping-item-name-input" 
           placeholder="Nombre del elemento">
    <input type="text" class="form-input shopping-item-quantity-input" 
           placeholder="Cantidad (opcional)">
    <button class="btn-icon remove-shopping-item-btn" title="Eliminar">
        🗑️
    </button>
</div>
```

### 3. CSS Styles

#### Main Container
```css
.shopping-lists-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
}

.shopping-lists-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}
```

#### Shopping List Card
```css
.shopping-list-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    transition: all 0.2s ease;
}

.shopping-list-card:hover {
    box-shadow: var(--shadow-md);
}

.shopping-list-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    cursor: pointer;
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    transition: background 0.2s ease;
}

.shopping-list-header:hover {
    background: var(--color-background-secondary);
}

.shopping-list-name {
    flex: 1;
    margin: 0;
    font-size: 1.125rem;
    font-weight: var(--font-weight-semibold);
}

.shopping-list-counter {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    padding: 4px 8px;
    background: var(--color-background-secondary);
    border-radius: var(--radius-sm);
}

.shopping-list-counter.completed {
    background: var(--color-success);
    color: white;
}

.expand-icon {
    font-size: 0.75rem;
    transition: transform 0.2s ease;
}

.shopping-list-header.expanded .expand-icon {
    transform: rotate(180deg);
}
```

#### List Content (Collapsible)
```css
.shopping-list-content {
    max-height: 1000px;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    opacity: 1;
    margin-top: var(--spacing-md);
}

.shopping-list-content.collapsed {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
}

.shopping-list-items {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}
```

#### Shopping Item
```css
.shopping-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    transition: background 0.2s ease;
}

.shopping-item:hover {
    background: var(--color-background-secondary);
}

.shopping-item-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.shopping-item-label {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.shopping-item.completed .shopping-item-name {
    text-decoration: line-through;
    color: var(--color-text-secondary);
}

.shopping-item-name {
    font-weight: var(--font-weight-medium);
}

.shopping-item-quantity {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}
```

#### Item Input (Form)
```css
.shopping-item-input {
    display: grid;
    grid-template-columns: 2fr 1fr auto;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
}

@media (max-width: 768px) {
    .shopping-item-input {
        grid-template-columns: 1fr;
    }
}
```

### 4. JavaScript Implementation

#### ShoppingListManager Class
```javascript
class ShoppingListManager {
    constructor() {
        this.lists = [];
        this.currentListId = null;
        this.loadLists();
    }

    // CRUD Operations
    createList(name) { }
    getList(id) { }
    updateList(id, updates) { }
    deleteList(id) { }
    
    // Item Operations
    addItem(listId, item) { }
    updateItem(listId, itemId, updates) { }
    deleteItem(listId, itemId) { }
    toggleItemCompleted(listId, itemId) { }
    
    // Storage
    loadLists() { }
    saveLists() { }
    
    // Utilities
    getCompletedCount(listId) { }
    getTotalCount(listId) { }
    
    // Copy to clipboard
    formatListForClipboard(listId, includeCompleted = false) { }
}
```

#### Main App Integration
```javascript
class RecipeApp {
    constructor() {
        // ... existing code
        this.shoppingListManager = new ShoppingListManager();
        this.initShoppingLists();
    }

    initShoppingLists() {
        // Add menu item
        // Setup event listeners
        // Initialize view
    }

    showShoppingListsView() {
        // Hide other views
        // Show shopping lists view
        // Render lists
    }

    hideShoppingListsView() {
        // Hide shopping lists view
        // Show previous view
    }

    renderShoppingLists() {
        // Render all lists
    }

    renderShoppingListCard(list) {
        // Render single list card
    }

    showShoppingListForm(listId = null) {
        // Show modal for create/edit
    }

    saveShoppingList() {
        // Save list from form
    }

    deleteShoppingList(listId) {
        // Delete list with confirmation
    }

    toggleListExpanded(listId) {
        // Expand/collapse list
    }

    toggleItemCompleted(listId, itemId) {
        // Toggle item completed state
    }

    copyShoppingListToClipboard(listId, includeCompleted = false) {
        // Copy list to clipboard
        // Show toast notification
    }

    fallbackCopyToClipboard(text) {
        // Fallback for old browsers
    }
}
```

## Error Handling

### Validation Errors
- Empty list name → Show error message
- Empty item name → Don't add item
- Duplicate list names → Allow (add timestamp to differentiate)

### Storage Errors
- localStorage full → Show error, suggest deleting old lists
- localStorage unavailable → Show warning, use in-memory storage

### User Errors
- Delete confirmation → Modal with "¿Estás seguro?"
- Unsaved changes → Warn before closing form

## Testing Strategy

### Unit Tests
1. ShoppingListManager CRUD operations
2. Item completion toggle
3. Counter calculations
4. localStorage save/load

### Integration Tests
1. Create list → Add items → Save → Reload page
2. Mark items as completed → Check counter updates
3. Delete list → Verify removed from storage
4. Edit list → Verify changes persist

### Manual Tests
1. Create multiple lists
2. Add items with and without quantity
3. Mark items as completed
4. Expand/collapse lists
5. Edit list name and items
6. Delete lists
7. Test on mobile devices
8. Test keyboard navigation
9. Test with screen reader

## Performance Considerations

- Lazy render: Only render visible lists
- Debounce: Save to localStorage with 500ms debounce
- Virtual scrolling: If >50 lists, implement virtual scrolling
- Optimize re-renders: Only update changed lists

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Space)
- Focus management in modals
- Screen reader announcements for actions
- High contrast mode support
- Touch targets ≥44x44px

## Visual Design

### Color Scheme
- Completed items: Gray text with strikethrough
- Counter badge: Green when all completed
- Empty state: Centered with icon

### Animations
- Expand/collapse: 300ms ease
- Checkbox: Instant feedback
- Card hover: Subtle shadow

### Responsive Breakpoints
- Mobile (<768px): Single column, full width
- Tablet (768-1024px): Single column, max-width
- Desktop (>1024px): Single column, centered
