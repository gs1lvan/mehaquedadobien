# Cambios: Botón Confirmar en Selector de Categorías

**Fecha:** 6 de noviembre de 2025  
**Objetivo:** Permitir seleccionar categorías sin recetas en el modal de categorías para menús

---

## 🎯 Problema Identificado

Cuando un usuario seleccionaba una categoría sin recetas asociadas en el modal de categorías (desde la edición de menús), no podía cerrar el modal y continuar. Solo tenía la opción de "Ver Recetas →" que no funcionaba si la categoría estaba vacía.

---

## ✅ Solución Implementada

### 1. **Añadido Botón "Confirmar" en el Modal**

**Archivo:** `index.html`

Se añadió un nuevo botón "Confirmar" en el footer del modal de selector de categorías:

```html
<div class="modal-footer" id="category-selector-footer" style="display: none;">
    <button id="category-confirm-btn" class="btn-secondary">Confirmar</button>
    <button id="category-view-recipes-btn" class="btn-primary">Ver Recetas →</button>
</div>
```

**Ubicación:** Línea ~1274-1277

---

### 2. **Lógica del Botón "Confirmar"**

**Archivo:** `script.js`

Se añadió la lógica para el botón "Confirmar" en la función `openCategorySelectorForMenu()`:

```javascript
// "Confirmar" button - close modal and keep category selection
const confirmBtn = document.getElementById('category-confirm-btn');
if (confirmBtn) {
    confirmBtn.onclick = () => {
        // Close the category selector modal
        modal.classList.add('hidden');
        if (footer) footer.style.display = 'none';
        
        // Clear references
        this.pendingMenuInput = null;
        this.currentMenuCategoryInput = null;
    };
}
```

**Ubicación:** Línea ~9985-9997

---

### 3. **Habilitar/Deshabilitar Botones según Disponibilidad de Recetas**

**Archivo:** `script.js`

Se modificó la función `selectCategory()` para verificar si la categoría tiene recetas y habilitar/deshabilitar los botones según corresponda:

```javascript
// Check if category has menu-friendly recipes
const menuRecipes = this.recipes.filter(recipe => 
    recipe.menuFriendly === true && recipe.category === categoryId
);
const hasRecipes = menuRecipes.length > 0;

// Show visual feedback that category was selected
const footer = document.getElementById('category-selector-footer');
const viewRecipesBtn = document.getElementById('category-view-recipes-btn');
const confirmBtn = document.getElementById('category-confirm-btn');

if (footer && footer.style.display === 'none') {
    footer.style.display = 'flex';
}

// Enable/disable buttons based on whether category has recipes
if (viewRecipesBtn) {
    viewRecipesBtn.disabled = !hasRecipes; // Disabled if no recipes
}
if (confirmBtn) {
    confirmBtn.disabled = false; // Always enabled
}
```

**Ubicación:** Línea ~1608-1630

**Lógica:**
- **Botón "Ver Recetas →":** Se deshabilita si la categoría no tiene recetas con `menuFriendly = true`
- **Botón "Confirmar":** Siempre habilitado para permitir cerrar el modal

---

### 4. **Estilos CSS para Botones Deshabilitados**

**Archivo:** `styles.css`

Se añadieron estilos específicos para botones deshabilitados:

```css
.btn-primary:disabled,
.btn-primary[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    background: var(--color-text-secondary);
}

.btn-primary:disabled:hover,
.btn-primary[disabled]:hover {
    transform: none;
    box-shadow: none;
}

.btn-secondary:disabled,
.btn-secondary[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    background: var(--color-background-secondary);
    border-color: var(--color-text-secondary);
    color: var(--color-text-secondary);
}

.btn-secondary:disabled:hover,
.btn-secondary[disabled]:hover {
    transform: none;
    background: var(--color-background-secondary);
    border-color: var(--color-text-secondary);
}
```

**Efectos:**
- `opacity: 0.5` → Botón se ve gris/transparente
- `cursor: not-allowed` → Cursor muestra símbolo de prohibido
- `pointer-events: none` → Elimina hover y click completamente
- `:hover` sin efectos → No hay transformación ni sombra

---

### 5. **Prevención de Click en Botón Deshabilitado**

**Archivo:** `script.js`

Se añadió verificación en el onclick del botón "Ver Recetas →":

```javascript
viewRecipesBtn.onclick = () => {
    // Prevent action if button is disabled
    if (viewRecipesBtn.disabled) {
        return;
    }
    
    if (this.pendingMenuInput) {
        // ... resto del código
    }
};
```

**Ubicación:** Línea ~10010-10015

---

## 🔄 Flujo Actualizado

### **Antes:**
1. Usuario abre modal de menú
2. Click en input de receta → Abre selector de categorías
3. Selecciona categoría sin recetas
4. Solo ve botón "Ver Recetas →" (no funciona si no hay recetas)
5. **Usuario atascado** ❌

### **Después:**
1. Usuario abre modal de menú
2. Click en input de receta → Abre selector de categorías
3. Selecciona categoría (con o sin recetas)
4. Ve dos botones:
   - **"Confirmar"** → Cierra modal y guarda categoría
   - **"Ver Recetas →"** → Abre selector de recetas (si hay recetas)
5. Click en "Confirmar"
6. Modal se cierra
7. Input muestra: `🥩 Carne` (emoji + nombre de categoría)
8. Modal de menú permanece abierto
9. **Usuario puede continuar** ✅

---

## 📝 Comportamiento del Input

El input `recipe-selector-input` ahora puede tener dos estados:

### **Estado 1: Solo Categoría Seleccionada**
```
Input value: "🥩 Carne"
Input dataset.categoryId: "carne"
```

### **Estado 2: Categoría + Receta Seleccionada**
```
Input value: "🥩 Carne - Filetes a la plancha"
Input dataset.categoryId: "carne"
Input dataset.recipeId: "uuid-de-la-receta"
```

---

## 🧪 Archivo de Prueba

Se creó un archivo de prueba para verificar la funcionalidad:

**Archivo:** `test-category-selector-confirm.html`

### Pasos de Prueba:
1. Abrir el archivo en el navegador
2. Click en "Abrir Modal de Menú"
3. Click en "Añadir elemento"
4. Seleccionar un día
5. Click en el input de receta
6. Seleccionar una categoría
7. Verificar que aparecen ambos botones
8. Click en "Confirmar"
9. Verificar que:
   - Modal de categorías se cierra
   - Modal de menú permanece abierto
   - Input muestra la categoría seleccionada

---

## 🎨 Diseño Visual

### Botones en el Footer:
- **"Confirmar"** (btn-secondary): Botón secundario, color gris
- **"Ver Recetas →"** (btn-primary): Botón primario, color morado

Ambos botones se muestran lado a lado en el footer del modal.

---

## 📊 Casos de Uso

### **Caso 1: Categoría con Recetas**
- Usuario selecciona "Carne" (tiene 5 recetas con `menuFriendly = true`)
- Estado de botones:
  - ✅ "Confirmar" → **Habilitado**
  - ✅ "Ver Recetas →" → **Habilitado**
- Opciones:
  - Click "Confirmar" → Guarda solo categoría
  - Click "Ver Recetas →" → Abre selector de recetas

### **Caso 2: Categoría sin Recetas**
- Usuario selecciona "Postres" (0 recetas con `menuFriendly = true`)
- Estado de botones:
  - ✅ "Confirmar" → **Habilitado**
  - ❌ "Ver Recetas →" → **Deshabilitado** (gris, no clickeable)
- Opciones:
  - Click "Confirmar" → Guarda solo categoría ✅
  - "Ver Recetas →" no disponible (deshabilitado)

### **Caso 3: Categoría Personalizada Vacía**
- Usuario selecciona categoría personalizada sin recetas
- Estado de botones:
  - ✅ "Confirmar" → **Habilitado**
  - ❌ "Ver Recetas →" → **Deshabilitado**
- Opciones:
  - Click "Confirmar" → Guarda solo categoría ✅
  - "Ver Recetas →" no disponible (deshabilitado)

---

## ✨ Beneficios

1. **Mayor flexibilidad:** Permite planificar menús sin tener todas las recetas creadas
2. **Mejor UX:** Usuario no se queda atascado en el modal
3. **Flujo más natural:** Puede guardar categorías como placeholder
4. **Feedback visual claro:** El botón "Ver Recetas →" se deshabilita cuando no hay recetas disponibles
5. **Prevención de errores:** Usuario no puede intentar ver recetas que no existen

---

## 🔧 Archivos Modificados

1. **index.html** - Añadido botón "Confirmar" en modal
2. **script.js** - Lógica del botón, habilitación y prevención de click
3. **styles.css** - Estilos para botones deshabilitados (nuevo)
4. **test-category-selector-confirm.html** - Archivo de prueba (nuevo)
5. **CAMBIOS-CATEGORY-SELECTOR-CONFIRM.md** - Este documento (nuevo)

---

## 📌 Notas Técnicas

- El botón "Confirmar" solo se muestra cuando se abre el modal desde el contexto de menús
- El footer del modal (`category-selector-footer`) se muestra/oculta dinámicamente
- Los botones se habilitan cuando se selecciona una categoría
- El modal de menú permanece abierto en segundo plano (z-index)
- Las referencias `pendingMenuInput` y `currentMenuCategoryInput` se limpian al cerrar

---

**Estado:** ✅ Implementado y listo para pruebas  
**Versión:** 1.0
