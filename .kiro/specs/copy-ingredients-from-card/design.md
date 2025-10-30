# Design Document

## Overview

Esta funcionalidad añade un botón de "copiar ingredientes" en cada tarjeta de receta de la página de inicio. El botón aparece como un badge circular en la esquina inferior derecha de la imagen de la receta, similar al badge de tiempo existente pero con diferente posicionamiento. Al hacer clic, copia todos los ingredientes de la receta al portapapeles del usuario y muestra una notificación de confirmación.

## Architecture

### Component Structure

```
RecipeCard (existing)
├── recipe-image (existing)
│   ├── img (existing)
│   ├── recipe-time-badge (existing, top-left)
│   └── recipe-ingredients-badge (NEW, bottom-right)
└── recipe-content (existing)
```

### Data Flow

1. Usuario hace clic en el badge de ingredientes
2. Event handler previene la propagación del evento (para no abrir la vista de detalle)
3. Sistema formatea los ingredientes de la receta
4. Sistema copia el texto al portapapeles usando Clipboard API
5. Sistema muestra toast notification de confirmación
6. Toast desaparece automáticamente después de 3 segundos

## Components and Interfaces

### 1. Ingredients Badge Component

**HTML Structure:**
```html
<div class="recipe-ingredients-badge" title="Copiar ingredientes">
  📋
</div>
```

**CSS Styling:**
```css
.recipe-ingredients-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-text);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 2;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.recipe-ingredients-badge:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 1);
}

.recipe-ingredients-badge:active {
  transform: scale(0.95);
}

/* Dark theme support */
body.dark-theme .recipe-ingredients-badge {
  background: rgba(30, 30, 30, 0.95);
  color: var(--color-text);
}

body.dark-theme .recipe-ingredients-badge:hover {
  background: rgba(30, 30, 30, 1);
}

/* Mobile optimization */
@media (max-width: 768px) {
  .recipe-ingredients-badge {
    width: 44px;
    height: 44px;
    font-size: 1.375rem;
  }
}
```

### 2. Toast Notification Component

**HTML Structure:**
```html
<div class="toast-notification" id="ingredients-toast">
  <span class="toast-icon">✓</span>
  <span class="toast-message">Ingredientes copiados</span>
</div>
```

**CSS Styling:**
```css
.toast-notification {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: var(--color-success, #10b981);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: var(--font-weight-medium);
  z-index: 9999;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.toast-notification.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.toast-icon {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}

.toast-message {
  font-size: 0.875rem;
}

/* Error variant */
.toast-notification.error {
  background: var(--color-error, #ef4444);
}

/* Mobile optimization */
@media (max-width: 768px) {
  .toast-notification {
    bottom: 80px;
    max-width: calc(100% - 32px);
  }
}
```

### 3. JavaScript Methods

#### Method: `copyIngredientsToClipboard(recipe, event)`

**Purpose:** Copia los ingredientes de una receta al portapapeles

**Parameters:**
- `recipe` (Recipe): Objeto de receta con ingredientes
- `event` (Event): Evento de clic para prevenir propagación

**Returns:** `Promise<void>`

**Implementation:**
```javascript
async copyIngredientsToClipboard(recipe, event) {
    // Prevent card click event
    event.stopPropagation();
    event.preventDefault();
    
    try {
        // Format ingredients text
        const ingredientsText = this.formatIngredientsForClipboard(recipe);
        
        // Copy to clipboard using Clipboard API
        await navigator.clipboard.writeText(ingredientsText);
        
        // Show success toast
        this.showToast('Ingredientes copiados', 'success');
        
    } catch (error) {
        console.error('Error copying ingredients:', error);
        
        // Fallback to legacy method
        try {
            this.fallbackCopyToClipboard(ingredientsText);
            this.showToast('Ingredientes copiados', 'success');
        } catch (fallbackError) {
            this.showToast('Error al copiar ingredientes', 'error');
        }
    }
}
```

#### Method: `formatIngredientsForClipboard(recipe)`

**Purpose:** Formatea los ingredientes como texto plano

**Parameters:**
- `recipe` (Recipe): Objeto de receta

**Returns:** `string` - Texto formateado

**Format Example:**
```
Paella Valenciana

Arroz - 400 g
Pollo - 500 g
Judías verdes - 200 g
Garrofón - 100 g
Tomate - 2 unidad
Aceite de oliva - al gusto
Azafrán - 1 pizca
Sal - al gusto
```

**Implementation:**
```javascript
formatIngredientsForClipboard(recipe) {
    // Start with recipe name
    let text = recipe.name + '\n\n';
    
    // Check if recipe has ingredients
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
        text += 'No hay ingredientes definidos';
        return text;
    }
    
    // Format each ingredient
    recipe.ingredients.forEach(ingredient => {
        let line = ingredient.name;
        
        // Add quantity and unit if available
        if (ingredient.quantity && ingredient.quantity > 0) {
            line += ` - ${ingredient.quantity}`;
            
            if (ingredient.unit && ingredient.unit.trim() !== '') {
                line += ` ${ingredient.unit}`;
            }
        } else if (ingredient.unit && ingredient.unit.trim() !== '') {
            line += ` - ${ingredient.unit}`;
        }
        
        text += line + '\n';
    });
    
    return text.trim();
}
```

#### Method: `fallbackCopyToClipboard(text)`

**Purpose:** Método de respaldo para navegadores sin Clipboard API

**Parameters:**
- `text` (string): Texto a copiar

**Implementation:**
```javascript
fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        textArea.remove();
    } catch (error) {
        textArea.remove();
        throw error;
    }
}
```

#### Method: `showToast(message, type = 'success')`

**Purpose:** Muestra una notificación toast temporal

**Parameters:**
- `message` (string): Mensaje a mostrar
- `type` (string): Tipo de toast ('success' o 'error')

**Implementation:**
```javascript
showToast(message, type = 'success') {
    // Get or create toast element
    let toast = document.getElementById('ingredients-toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ingredients-toast';
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <span class="toast-icon">✓</span>
            <span class="toast-message"></span>
        `;
        document.body.appendChild(toast);
    }
    
    // Update message and type
    const messageSpan = toast.querySelector('.toast-message');
    const iconSpan = toast.querySelector('.toast-icon');
    
    messageSpan.textContent = message;
    toast.className = `toast-notification ${type}`;
    
    // Update icon based on type
    iconSpan.textContent = type === 'success' ? '✓' : '✕';
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
```

#### Method: `createRecipeCard(recipe)` - MODIFICATION

**Changes:** Añadir el badge de ingredientes al crear la tarjeta

**Modified Section:**
```javascript
// Add time badge if totalTime exists
if (recipe.totalTime && recipe.totalTime.trim() !== '') {
    const timeBadge = document.createElement('div');
    timeBadge.className = 'recipe-time-badge';
    timeBadge.textContent = recipe.totalTime;
    imageDiv.appendChild(timeBadge);
}

// NEW: Add ingredients badge
const ingredientsBadge = document.createElement('div');
ingredientsBadge.className = 'recipe-ingredients-badge';
ingredientsBadge.title = 'Copiar ingredientes';
ingredientsBadge.textContent = '📋';

// Add click handler for copying ingredients
ingredientsBadge.addEventListener('click', (e) => {
    this.copyIngredientsToClipboard(recipe, e);
});

imageDiv.appendChild(ingredientsBadge);
```

## Data Models

No se requieren cambios en los modelos de datos existentes. La funcionalidad utiliza:
- `Recipe.name` (string)
- `Recipe.ingredients` (Array<Ingredient>)
- `Ingredient.name` (string)
- `Ingredient.quantity` (number)
- `Ingredient.unit` (string)

## Error Handling

### Clipboard API No Disponible
- **Escenario:** Navegador no soporta `navigator.clipboard`
- **Solución:** Usar método de respaldo con `document.execCommand('copy')`
- **Mensaje:** Mismo mensaje de éxito si funciona el fallback

### Error al Copiar
- **Escenario:** Ambos métodos fallan
- **Solución:** Mostrar toast de error
- **Mensaje:** "Error al copiar ingredientes"

### Receta Sin Ingredientes
- **Escenario:** Recipe.ingredients está vacío
- **Solución:** Copiar solo el nombre con nota
- **Formato:** 
```
Nombre de Receta

No hay ingredientes definidos
```

### Permisos de Portapapeles
- **Escenario:** Usuario deniega permisos de portapapeles
- **Solución:** Intentar método de respaldo automáticamente
- **Mensaje:** Mostrar error solo si ambos métodos fallan

## Testing Strategy

### Unit Tests

1. **Test: formatIngredientsForClipboard**
   - Con ingredientes completos (nombre, cantidad, unidad)
   - Con ingredientes sin cantidad
   - Con ingredientes sin unidad
   - Con receta sin ingredientes
   - Con caracteres especiales en nombres

2. **Test: copyIngredientsToClipboard**
   - Verificar que previene propagación de evento
   - Verificar llamada a Clipboard API
   - Verificar fallback en caso de error
   - Verificar muestra de toast

3. **Test: showToast**
   - Verificar creación de elemento
   - Verificar animación de entrada
   - Verificar desaparición automática
   - Verificar tipos (success/error)

### Integration Tests

1. **Test: Badge en Tarjeta**
   - Verificar que badge aparece en todas las tarjetas
   - Verificar posicionamiento correcto
   - Verificar que no interfiere con clic en tarjeta

2. **Test: Flujo Completo**
   - Clic en badge → ingredientes copiados → toast mostrado
   - Verificar que tarjeta no se abre al hacer clic en badge

### Manual Testing

1. **Desktop:**
   - Hover sobre badge muestra efecto visual
   - Clic copia ingredientes
   - Toast aparece y desaparece correctamente
   - Pegar en otra aplicación funciona

2. **Mobile:**
   - Badge tiene tamaño táctil adecuado
   - Toque copia ingredientes
   - Toast visible en pantalla pequeña
   - No hay conflictos con gestos táctiles

3. **Cross-browser:**
   - Chrome/Edge (Clipboard API)
   - Firefox (Clipboard API)
   - Safari (puede requerir fallback)
   - Navegadores antiguos (fallback)

## Performance Considerations

1. **Event Delegation:** No usar, ya que cada badge necesita acceso al objeto recipe específico
2. **Toast Reuse:** Reutilizar el mismo elemento toast en lugar de crear uno nuevo cada vez
3. **Memory:** Remover event listeners si se re-renderiza la lista
4. **Animation:** Usar CSS transitions en lugar de JavaScript para animaciones

## Accessibility

1. **Keyboard Navigation:** Badge debe ser accesible con Tab
2. **Screen Readers:** Añadir aria-label descriptivo
3. **Focus Visible:** Mostrar outline cuando badge tiene foco
4. **Touch Target:** Mínimo 44x44px en móviles

### Accessibility Improvements

```css
.recipe-ingredients-badge {
  /* ... existing styles ... */
}

.recipe-ingredients-badge:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.recipe-ingredients-badge:focus:not(:focus-visible) {
  outline: none;
}
```

```html
<div 
  class="recipe-ingredients-badge" 
  role="button"
  tabindex="0"
  aria-label="Copiar ingredientes de {recipe.name}"
  title="Copiar ingredientes"
>
  📋
</div>
```

## Browser Compatibility

- **Clipboard API:** Chrome 63+, Firefox 53+, Safari 13.1+, Edge 79+
- **Fallback Method:** Todos los navegadores modernos
- **CSS backdrop-filter:** Chrome 76+, Firefox 103+, Safari 9+, Edge 79+
- **CSS Grid (recipe cards):** Ya en uso, sin cambios

## Security Considerations

1. **XSS Prevention:** Los ingredientes ya están sanitizados al guardar la receta
2. **Clipboard Access:** Solo lectura, no hay riesgo de seguridad
3. **User Consent:** No se requiere permiso explícito para escribir en portapapeles
