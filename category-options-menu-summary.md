# Implementación: Menú de Opciones de Categoría

## Resumen
Se reemplazaron los botones individuales (✏️ Editar, 👁️ Ocultar, 🗑️ Eliminar) por un botón de menú (⋮) que abre una modal con las opciones, similar a la modal de "Opciones de Lista" de las listas de compra.

## Cambios Realizados

### 1. Nueva Modal de Opciones (`index.html`)

Se agregó una nueva modal `category-options-modal` con la misma estructura que `shopping-list-options-modal`:

```html
<div id="category-options-modal" class="modal hidden" role="dialog" aria-modal="true">
    <div class="modal-content shopping-list-options-content">
        <div class="modal-header">
            <h2>Opciones de Categoría</h2>
            <button id="close-category-options-modal">✕</button>
        </div>
        <div class="modal-body">
            <div class="options-menu">
                <button id="category-option-edit">
                    <i class="fa-regular fa-pen-to-square"></i> Editar
                </button>
                <button id="category-option-toggle">
                    <i class="fa-regular fa-eye"></i> Ocultar/Mostrar
                </button>
                <button id="category-option-delete">
                    <i class="fa-regular fa-trash-can"></i> Eliminar
                </button>
            </div>
        </div>
    </div>
</div>
```

**Características:**
- ✅ Usa iconos de Font Awesome (fa-regular)
- ✅ Mismo estilo que la modal de opciones de lista de compra
- ✅ Atributos ARIA para accesibilidad
- ✅ Botón de toggle que cambia entre "Ocultar" y "Mostrar"

### 2. Modificación de Funciones de Creación de Items (`script.js`)

#### `createCustomCategoryItem()`
**Antes:**
```javascript
// 3 botones individuales
const editBtn = ...;  // ✏️
const hideBtn = ...;  // 👁️
const deleteBtn = ...; // 🗑️
```

**Después:**
```javascript
// 1 botón de menú
const menuBtn = document.createElement('button');
menuBtn.textContent = '⋮';
menuBtn.addEventListener('click', () => {
    this.openCategoryOptionsModal(category.id, false);
});
```

#### `createHiddenCategoryItem()`
**Antes:**
```javascript
// 1 botón de restaurar
const restoreBtn = ...; // ↩️
```

**Después:**
```javascript
// 1 botón de menú
const menuBtn = document.createElement('button');
menuBtn.textContent = '⋮';
menuBtn.addEventListener('click', () => {
    this.openCategoryOptionsModal(category.id, true);
});
```

#### `createPredefinedCategoryItem()`
**Antes:**
```javascript
// 1 botón de ocultar
const hideBtn = ...; // 👁️
```

**Después:**
```javascript
// 1 botón de menú
const menuBtn = document.createElement('button');
menuBtn.textContent = '⋮';
menuBtn.addEventListener('click', () => {
    this.openCategoryOptionsModal(category.id, false);
});
```

### 3. Nuevas Funciones de Modal (`script.js`)

#### `openCategoryOptionsModal(categoryId, isHidden)`
- Abre la modal de opciones
- Guarda el ID de categoría y estado oculto en `dataset`
- Actualiza el texto del botón toggle ("Ocultar" o "Mostrar")
- Oculta botones de editar/eliminar para categorías predefinidas
- Agrega clase `stacked` para z-index correcto
- Gestiona el modal stack
- Configura focus management

#### `closeCategoryOptionsModal()`
- Cierra la modal
- Remueve clase `stacked`
- Actualiza el modal stack

#### `setupCategoryOptionsListeners()`
- Configura event listeners para todos los botones
- Usa clonación de nodos para evitar listeners duplicados
- Conecta con las funciones existentes:
  - **Editar** → `handleEditCategory()`
  - **Ocultar/Mostrar** → `handleHideCategory()` o `handleRestoreCategory()`
  - **Eliminar** → `handleDeleteCategory()`

### 4. Integración con Sistema de Navegación

Se agregó el caso `category-options-modal` en `handleEscapeKey()` para que la tecla ESC cierre la modal correctamente.

## Comportamiento por Tipo de Categoría

### Categorías Personalizadas (Custom)
- ✅ **Editar** - Abre modal de edición
- ✅ **Ocultar** - Mueve a categorías ocultas
- ✅ **Eliminar** - Elimina la categoría

### Categorías Predefinidas (Predefined)
- ❌ **Editar** - Oculto (no se puede editar)
- ✅ **Ocultar** - Mueve a categorías ocultas
- ❌ **Eliminar** - Oculto (no se puede eliminar)

### Categorías Ocultas (Hidden)
- ✅ **Editar** - Abre modal de edición (solo custom)
- ✅ **Mostrar** - Restaura la categoría
- ✅ **Eliminar** - Elimina la categoría (solo custom)

## Ventajas de la Implementación

1. **UI más limpia**: Un solo botón (⋮) en lugar de 2-3 botones
2. **Consistencia**: Mismo patrón que las listas de compra
3. **Escalabilidad**: Fácil agregar más opciones en el futuro
4. **Accesibilidad**: Atributos ARIA y focus management
5. **Responsive**: Mejor en móviles con menos botones visibles
6. **Iconos profesionales**: Font Awesome en lugar de emojis

## Archivos Modificados

1. **index.html**
   - Agregada modal `category-options-modal`

2. **script.js**
   - Modificadas 3 funciones de creación de items
   - Agregadas 3 nuevas funciones de modal
   - Actualizado `handleEscapeKey()`

## Testing

Para probar:
1. Abrir modal "Gestionar Categorías"
2. Click en botón ⋮ de cualquier categoría
3. Verificar que se abre la modal de opciones
4. Verificar que las opciones funcionan correctamente
5. Verificar que ESC cierra la modal
6. Verificar que categorías predefinidas no muestran Editar/Eliminar
