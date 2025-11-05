# Design Document

## Overview

Este diseño implementa un flujo de navegación mejorado entre la modal de configuración y la modal de gestión de categorías. El objetivo es proporcionar una experiencia de usuario fluida donde:

1. La modal de categorías se abre por encima de la modal de configuración
2. Al cerrar la modal de categorías (con el botón X), se cierran ambas modales automáticamente
3. El usuario regresa a la vista principal de recetas

## Architecture

### Current State

Actualmente, la aplicación tiene:

- **Modal de Configuración** (`settings-modal`): Modal principal con opciones de configuración
- **Modal de Categorías** (`category-modal`): Modal para gestionar categorías
- Ambas modales usan la clase `.modal` con overlay y contenido
- El cierre de modales se maneja mediante funciones `closeSettingsModal()` y `closeCategoryModal()`

### Proposed Changes

El diseño propone modificar el comportamiento de cierre de la modal de categorías para implementar un cierre en cascada que:

1. Detecte cuando se cierra la modal de categorías mediante el botón X
2. Cierre la modal de configuración automáticamente
3. Navegue a la vista principal de recetas

## Components and Interfaces

### 1. Modal Stack Management

**Concepto**: Implementar un sistema de seguimiento de modales abiertas para gestionar el cierre en cascada.

**Implementación**:
```javascript
// En RecipeApp class
this.modalStack = []; // Array para rastrear modales abiertas
```

**Métodos**:
- `pushModal(modalId)`: Añade una modal al stack cuando se abre
- `popModal()`: Remueve la última modal del stack
- `clearModalStack()`: Limpia todo el stack y cierra todas las modales

### 2. Modified Modal Functions

#### `showCategoryModal()`
**Cambios**:
- Añadir la modal al stack cuando se abre desde configuración
- Detectar el contexto de apertura (desde configuración vs. desde menú)

```javascript
showCategoryModal(fromSettings = false) {
    const modal = document.getElementById('category-modal');
    if (modal) {
        modal.classList.remove('hidden');
        this.renderCategoryModal();
        
        // Track modal opening context
        modal.dataset.openedFrom = fromSettings ? 'settings' : 'menu';
        
        // Add to modal stack
        this.pushModal('category-modal');
    }
}
```

#### `closeCategoryModal()`
**Cambios**:
- Verificar el contexto de apertura
- Si se abrió desde configuración, cerrar también la modal de configuración
- Navegar a la vista principal

```javascript
closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (!modal) return;
    
    // Get opening context
    const openedFrom = modal.dataset.openedFrom || 'menu';
    
    // Close category modal
    modal.classList.add('hidden');
    this.popModal();
    
    // If opened from settings, close settings too
    if (openedFrom === 'settings') {
        this.closeSettingsModal();
    }
    
    // Navigate to home
    this.goToHome();
}
```

#### `openSettingsModal()`
**Cambios**:
- Añadir la modal al stack cuando se abre

```javascript
openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;
    
    modal.classList.remove('hidden');
    this.pushModal('settings-modal');
    
    // ... resto del código existente
}
```

#### `closeSettingsModal()`
**Cambios**:
- Remover la modal del stack cuando se cierra

```javascript
closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.add('hidden');
        this.popModal();
    }
    
    // ... resto del código existente
}
```

### 3. Event Listener Updates

**Botón "Gestionar Categorías"**:
```javascript
manageCategoriesBtn.addEventListener('click', () => {
    this.showCategoryModal(true); // true = opened from settings
    closeMenu();
});
```

**Botón cerrar modal de categorías**:
```javascript
closeCategoryModalBtn.addEventListener('click', () => {
    this.closeCategoryModal();
});
```

## Data Models

### Modal Context Data

```javascript
// Stored in modal DOM element
modal.dataset.openedFrom = 'settings' | 'menu'
```

### Modal Stack

```javascript
// Array in RecipeApp instance
this.modalStack = ['settings-modal', 'category-modal']
```

## Error Handling

### Modal Not Found
- Si una modal no existe en el DOM, las funciones deben retornar silenciosamente sin error
- Usar verificaciones `if (!modal) return;`

### Stack Inconsistency
- Si el stack se desincroniza, implementar un método de limpieza que verifique el estado real del DOM
- Método `syncModalStack()` que recorre todas las modales y actualiza el stack

```javascript
syncModalStack() {
    this.modalStack = [];
    const allModals = document.querySelectorAll('.modal:not(.hidden)');
    allModals.forEach(modal => {
        if (modal.id) {
            this.modalStack.push(modal.id);
        }
    });
}
```

## Testing Strategy

### Manual Testing Scenarios

1. **Flujo básico**:
   - Abrir configuración → Abrir categorías → Cerrar categorías con X
   - Verificar: Ambas modales cerradas, vista principal visible

2. **Apertura desde menú**:
   - Abrir categorías desde menú principal
   - Verificar: Solo se cierra la modal de categorías, no hay modal de configuración

3. **Múltiples aperturas**:
   - Abrir configuración → Abrir categorías → Cerrar categorías → Abrir configuración de nuevo
   - Verificar: No hay modales fantasma, comportamiento consistente

4. **Cierre con overlay**:
   - Abrir configuración → Abrir categorías → Click en overlay
   - Verificar: Comportamiento esperado según diseño

### Edge Cases

1. **Cierre rápido**: Usuario hace clic múltiples veces en el botón de cerrar
2. **Navegación del navegador**: Usuario usa botón atrás del navegador
3. **Teclado**: Usuario presiona ESC para cerrar modales

## CSS Considerations

### Z-Index Management

Para asegurar que la modal de categorías aparezca por encima de la modal de configuración:

```css
.modal {
    z-index: 1000;
}

.modal.stacked {
    z-index: 1100;
}
```

**Implementación**:
- Cuando se abre la modal de categorías desde configuración, añadir clase `stacked`
- Remover la clase al cerrar

```javascript
showCategoryModal(fromSettings = false) {
    const modal = document.getElementById('category-modal');
    if (modal) {
        modal.classList.remove('hidden');
        
        if (fromSettings) {
            modal.classList.add('stacked');
        }
        
        // ... resto del código
    }
}
```

### Overlay Behavior

El overlay de la modal de categorías debe:
- Ser visible y cubrir la modal de configuración
- Tener un z-index apropiado
- Mantener el comportamiento de cierre al hacer clic

## Performance Considerations

- Las operaciones de apertura/cierre de modales son síncronas y no requieren optimización especial
- El stack de modales es un array simple con operaciones O(1)
- No hay impacto significativo en el rendimiento

## Accessibility

- Mantener el foco en la modal activa (la de categorías cuando está abierta)
- Asegurar que el botón X sea accesible por teclado
- Mantener los atributos ARIA existentes
- Considerar añadir `aria-modal="true"` a las modales

## Browser Compatibility

- Solución compatible con todos los navegadores modernos
- No requiere APIs específicas del navegador
- Usa solo JavaScript vanilla y CSS estándar

## Migration Path

1. Añadir el sistema de modal stack a la clase RecipeApp
2. Modificar las funciones existentes de apertura/cierre de modales
3. Actualizar los event listeners
4. Añadir estilos CSS para z-index
5. Probar el flujo completo

No se requieren cambios en la base de datos o en el almacenamiento local.
