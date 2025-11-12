# Categorías Ocultas Inline (Semitransparentes)

## Objetivo
Mostrar las categorías ocultas dentro de la misma lista de "Categorías Personalizadas" pero al final y con estilo semitransparente, en lugar de tener una sección separada.

## Comportamiento

### Antes ❌
```
┌─────────────────────────────────────┐
│  Gestionar Categorías               │
├─────────────────────────────────────┤
│  Categorías Personalizadas          │
│  [🍔 Cat1] [🍟 Cat2] [🥗 Cat3]     │
│                                     │
│  Categorías Ocultas                 │
│  [👻 CatOculta]                     │
└─────────────────────────────────────┘
```

### Después ✅
```
┌─────────────────────────────────────┐
│  Gestionar Categorías               │
├─────────────────────────────────────┤
│  Categorías Personalizadas          │
│  [🍔 Cat1] [🍟 Cat2] [🥗 Cat3]     │
│  [👻 CatOculta] ← Semitransparente │
│                   (opacity: 0.5)    │
└─────────────────────────────────────┘
```

## Cambios Implementados

### 1. HTML (`index.html`)

#### Eliminada Sección de Categorías Ocultas

**Antes:**
```html
<h3 id="custom-categories-title">Categorías Personalizadas</h3>
<div id="custom-categories-list" class="categories-list">
    <!-- Custom categories -->
</div>
<div id="custom-categories-empty" class="categories-empty">
    <p>No hay categorías personalizadas...</p>
</div>

<h3 id="hidden-categories-title">Categorías Ocultas</h3>
<div id="hidden-categories-list" class="categories-list">
    <!-- Hidden categories -->
</div>
<div id="hidden-categories-empty" class="categories-empty">
    <p>No hay categorías ocultas.</p>
</div>
```

**Después:**
```html
<h3 id="custom-categories-title">Categorías Personalizadas</h3>
<div id="custom-categories-list" class="categories-list">
    <!-- Custom categories (visible and hidden) -->
</div>
<div id="custom-categories-empty" class="categories-empty">
    <p>No hay categorías personalizadas...</p>
</div>
```

### 2. JavaScript (`script.js`)

#### Función `renderCustomCategoriesList()` - Modificada

**Antes:**
```javascript
renderCustomCategoriesList() {
    // Solo mostraba categorías visibles
    const customCategories = this.categoryManager.customCategories.filter(
        cat => !this.categoryManager.isCategoryHidden(cat.id)
    );
    
    customCategories.forEach(category => {
        const item = this.createCustomCategoryItem(category, count);
        listContainer.appendChild(item);
    });
}
```

**Después:**
```javascript
renderCustomCategoriesList() {
    // Obtiene TODAS las categorías personalizadas
    const allCustomCategories = this.categoryManager.customCategories;
    
    // Separa visibles y ocultas
    const visibleCategories = allCustomCategories.filter(
        cat => !this.categoryManager.isCategoryHidden(cat.id)
    );
    const hiddenCategories = allCustomCategories.filter(
        cat => this.categoryManager.isCategoryHidden(cat.id)
    );
    
    // Renderiza visibles primero
    visibleCategories.forEach(category => {
        const item = this.createCustomCategoryItem(category, count, false);
        listContainer.appendChild(item);
    });
    
    // Renderiza ocultas al final (con estilo hidden)
    hiddenCategories.forEach(category => {
        const item = this.createCustomCategoryItem(category, count, true);
        listContainer.appendChild(item);
    });
}
```

#### Función `createCustomCategoryItem()` - Modificada

**Antes:**
```javascript
createCustomCategoryItem(category, count) {
    const item = document.createElement('div');
    item.className = 'category-item';
    // ...
}
```

**Después:**
```javascript
createCustomCategoryItem(category, count, isHidden = false) {
    const item = document.createElement('div');
    item.className = 'category-item';
    if (isHidden) {
        item.classList.add('category-item-hidden');
    }
    // ...
    
    // Pasa el estado isHidden al modal de opciones
    menuBtn.addEventListener('click', () => {
        this.openCategoryOptionsModal(category.id, isHidden);
    });
}
```

#### Función `renderHiddenCategoriesList()` - Eliminada

Ya no se necesita porque las categorías ocultas se renderizan en `renderCustomCategoriesList()`.

#### Llamadas Eliminadas (4 ubicaciones):
1. `renderCategoryModal()` - línea 1612
2. `handleDeleteCategory()` - línea 2645
3. `handleHideCategory()` - línea 2685
4. `handleRestoreCategory()` - línea 2713

### 3. CSS (`styles.css`)

#### Nuevo Estilo: `.category-item-hidden`

```css
/* Hidden category style (semitransparent) */
.category-item-hidden {
    opacity: 0.5;
    background: var(--color-background-secondary);
}

.category-item-hidden:hover {
    opacity: 0.7;
}
```

**Características:**
- `opacity: 0.5` - Semitransparente para indicar estado oculto
- `background: var(--color-background-secondary)` - Fondo ligeramente diferente
- `opacity: 0.7` en hover - Más visible al pasar el mouse

## Orden de Visualización

### En la Modal "Gestionar Categorías"
```
Categorías Personalizadas
├─ [🍔 Cat1] ⋮  ← Visible (opacity: 1.0)
├─ [🍟 Cat2] ⋮  ← Visible (opacity: 1.0)
├─ [🥗 Cat3] ⋮  ← Visible (opacity: 1.0)
├─ [👻 Cat4] ⋮  ← Oculta (opacity: 0.5) ← Semitransparente
└─ [🌙 Cat5] ⋮  ← Oculta (opacity: 0.5) ← Semitransparente
```

### En el Filtro de Alimentos
```
[Todas] [🍔 Cat1] [🍟 Cat2] [🥗 Cat3] | [🍲 Caldo] ...
        └─ Solo visibles ─┘
        (Las ocultas NO aparecen)
```

## Funcionalidad del Botón de Menú (⋮)

### Categoría Visible
```
Modal de Opciones:
- 👁️ Ocultar
- 🗑️ Eliminar
```

### Categoría Oculta (Semitransparente)
```
Modal de Opciones:
- 👁️ Mostrar  ← Cambia a "Mostrar"
- 🗑️ Eliminar
```

## Casos de Uso

### Caso 1: Sin categorías ocultas
```
Categorías Personalizadas
[🍔 Cat1] [🍟 Cat2] [🥗 Cat3]
(Todas visibles, opacity: 1.0)
```

### Caso 2: Con categorías ocultas
```
Categorías Personalizadas
[🍔 Cat1] [🍟 Cat2] [🥗 Cat3]
[👻 Cat4] [🌙 Cat5]
↑ Semitransparentes (opacity: 0.5)
```

### Caso 3: Solo categorías ocultas
```
Categorías Personalizadas
[👻 Cat1] [🌙 Cat2]
(Todas semitransparentes, opacity: 0.5)
```

### Caso 4: Sin categorías
```
(No se muestra la sección)
```

## Ventajas

1. **UI más limpia**: Una sola sección en lugar de dos
2. **Contexto visual**: Las ocultas están cerca de las visibles
3. **Menos scroll**: No hay secciones separadas
4. **Indicador claro**: La semitransparencia indica el estado oculto
5. **Fácil gestión**: Todas las categorías personalizadas en un solo lugar

## Integración con Sistema Existente

### Actualización Automática
La lista se actualiza cuando:
- ✅ Se crea una categoría → Aparece al final de las visibles
- ✅ Se oculta una categoría → Se mueve al final y se vuelve semitransparente
- ✅ Se restaura una categoría → Se mueve al final de las visibles y recupera opacidad
- ✅ Se elimina una categoría → Desaparece de la lista

### Filtro de Alimentos
- ✅ Solo muestra categorías visibles
- ✅ Las ocultas NO aparecen en el filtro
- ✅ Se actualiza automáticamente al ocultar/restaurar

## Testing

Para verificar:
1. ✅ Crear categoría → Aparece visible (opacity: 1.0)
2. ✅ Ocultar categoría → Se mueve al final y se vuelve semitransparente (opacity: 0.5)
3. ✅ Restaurar categoría → Vuelve al final de las visibles con opacity: 1.0
4. ✅ Hover en categoría oculta → opacity aumenta a 0.7
5. ✅ Botón ⋮ en categoría oculta → Muestra "Mostrar" en lugar de "Ocultar"
6. ✅ Categorías ocultas NO aparecen en filtro de alimentos
7. ✅ Sección "Categorías Ocultas" ya no existe
8. ✅ Todas las categorías personalizadas en una sola lista

## Archivos Modificados

1. **index.html**
   - Eliminada sección completa de "Categorías Ocultas"
   - Actualizado comentario en `custom-categories-list`

2. **script.js**
   - Modificada `renderCustomCategoriesList()` - Renderiza visibles y ocultas
   - Modificada `createCustomCategoryItem()` - Acepta parámetro `isHidden`
   - Eliminada `renderHiddenCategoriesList()` - Ya no se necesita
   - Eliminadas 4 llamadas a `renderHiddenCategoriesList()`

3. **styles.css**
   - Agregado `.category-item-hidden` - Estilo semitransparente
   - Agregado `.category-item-hidden:hover` - Hover más visible

## Notas

- La opacidad 0.5 es suficientemente visible pero claramente diferente
- El hover a 0.7 mejora la interactividad
- El fondo secundario ayuda a diferenciar visualmente
- Las categorías ocultas siguen siendo completamente funcionales (editar, eliminar, restaurar)
- El orden (visibles → ocultas) es intuitivo y consistente
