# Fix: Quick Edit Menu Refactor

**Fecha:** 2025-11-09  
**Problema:** Funciones duplicadas causando conflictos en event listeners

## Cambios Realizados

### ✅ Eliminadas funciones duplicadas

Se eliminaron dos funciones que duplicaban la lógica del sistema existente:

1. **`openCategorySelectorForQuickEdit(inputElement)`** (líneas ~10375-10468)
   - Duplicaba la lógica de `openCategorySelectorForMenu`
   - Creaba event listeners duplicados en el botón "Ver Recetas →"

2. **`openRecipeSelectorForQuickEdit(inputElement)`** (líneas ~10470-10650)
   - Duplicaba la lógica del modal de selección de recetas
   - Creaba event listeners duplicados en el botón "Confirmar"

### ✅ Sistema unificado

Ahora el flujo de quick edit usa las funciones existentes:

```javascript
quickEditMeal(menuId, itemId, mealType)
    ↓
    Crea input temporal con flag isQuickEdit: 'true'
    ↓
openCategorySelectorForMenu(tempInput)  ← Función existente
    ↓
    Usuario selecciona categoría
    ↓
    Click en "Ver Recetas →"
    ↓
Modal de recetas (sistema existente)
    ↓
    Botón "Confirmar" detecta isQuickEdit flag
    ↓
    IF isQuickEdit: Guarda directamente en menú
    ELSE: Solo actualiza el input
```

## Ventajas

1. **Sin duplicación de código**: Una sola fuente de verdad para la lógica de modales
2. **Sin conflictos de event listeners**: Cada botón tiene un solo listener
3. **Más fácil de mantener**: Los cambios se hacen en un solo lugar
4. **Comportamiento consistente**: Quick edit y edición normal usan el mismo sistema

## Cómo funciona ahora

### Quick Edit (click directo en comida/cena)
1. Click en celda → `quickEditMeal()` crea input temporal con `isQuickEdit: 'true'`
2. Se abre modal de categorías (función existente)
3. Usuario selecciona categoría → Aparece "Ver Recetas →"
4. Click en "Ver Recetas →" → Se abre modal de recetas
5. Usuario selecciona receta → Click en "Confirmar"
6. **El botón detecta `isQuickEdit` y guarda directamente en el menú**
7. Se actualiza la vista y muestra toast de éxito

### Edición Normal (desde modal de editar menú)
1. Usuario abre modal de editar menú
2. Click en input de comida/cena → Se abre modal de categorías
3. Usuario selecciona categoría → Aparece "Ver Recetas →"
4. Click en "Ver Recetas →" → Se abre modal de recetas
5. Usuario selecciona receta → Click en "Confirmar"
6. **El botón detecta que NO es quick edit y solo actualiza el input**
7. Usuario hace click en "Guardar Menú" para guardar todos los cambios

## Código clave

### Flag de quick edit
```javascript
tempInput.dataset.isQuickEdit = 'true';
```

### Detección en botón confirmar
```javascript
if (this.currentMenuRecipeInput.dataset.isQuickEdit === 'true') {
    // Quick edit: guardar directamente
    const menuId = parseInt(this.currentMenuRecipeInput.dataset.menuId);
    const itemId = this.currentMenuRecipeInput.dataset.itemId;
    const mealType = this.currentMenuRecipeInput.dataset.mealType;
    
    // Actualizar menú
    // Guardar en localStorage
    // Re-renderizar
    this.showToast('Receta actualizada correctamente', 'success');
} else {
    // Normal: solo actualizar input
    this.currentMenuRecipeInput.value = selectedRecipe.name;
}
```

## Testing

Para probar que funciona:

1. **Quick Edit:**
   - Abre vista de menús
   - Click directo en una celda de comida/cena
   - Selecciona categoría → Click "Ver Recetas →"
   - Selecciona receta → Click "Confirmar"
   - ✅ Debe guardar inmediatamente y mostrar toast

2. **Edición Normal:**
   - Abre vista de menús
   - Click en ⚙️ → "Editar"
   - Click en input de comida/cena
   - Selecciona categoría → Click "Ver Recetas →"
   - Selecciona receta → Click "Confirmar"
   - ✅ Input debe actualizarse (no guardar aún)
   - Click en "Guardar Menú"
   - ✅ Ahora sí debe guardar

## Archivos modificados

- `script.js`: Eliminadas funciones duplicadas (~276 líneas de código eliminadas)

## Bugs Encontrados y Solucionados

### Bug 1: Comparación de tipos en itemId
**Problema:** El `itemId` se pasaba como string pero se comparaba con `i.id` (número)
```javascript
// ❌ Antes (no funcionaba)
const item = menu.items.find(i => i.id === itemId);

// ✅ Después (funciona)
const item = menu.items.find(i => String(i.id) === String(itemId));
```

**Síntoma:** Los logs mostraban "Item found? false" aunque el menú existía

**Solución:** Convertir ambos valores a string antes de comparar

## Mejoras Adicionales Implementadas

### 1. Estilos Clickeables para Celdas de Menú
**Ubicación:** `index.html` + `script.js`

Las celdas de comida/cena ahora tienen estilo de enlaces clickeables:
- Fondo suave con color secundario
- Efecto hover con borde de color primario
- Animación de elevación al pasar el mouse
- Bordes redondeados
- Estilo especial para celdas vacías (con "-")

**Clases CSS añadidas:**
- `.menu-meal-clickable` - Estilo base para celdas clickeables
- `.menu-meal-empty` - Estilo para celdas vacías

### 2. Botones de Quick Edit en Vista de Recetas Filtradas
**Ubicación:** `script.js` líneas ~4370-4440

Cuando filtras recetas por menú, ahora aparecen botones de edición (✏️) al lado de "Comida" y "Cena":
- Botón semi-transparente que se vuelve visible al hover
- Click abre quick edit para ese día y comida específica
- Funciona desde la vista de recetas sin necesidad de ir a menús

**Cambios en metadata:**
- `getRecipeMetadataFromMenu()` ahora incluye `itemId` en el metadata
- `renderRecipesGroupedByDay()` guarda el `itemId` en `dayData`

### 3. Re-renderizado Inteligente
**Ubicación:** `script.js` líneas ~11607-11620

Después de guardar con quick edit, el sistema detecta en qué vista estás:
- Si estás en **vista de recetas filtradas** → Re-renderiza recetas (mantiene filtro)
- Si estás en **vista de menús** → Re-renderiza menús

Esto evita que te saque de la vista actual al guardar.

### 4. Doble Click para Confirmar
**Funcionalidad existente** que ya estaba implementada en el modal de selección de recetas.

## Bugs Encontrados y Solucionados

### Bug 1: Comparación de tipos en itemId
**Problema:** El `itemId` se pasaba como string pero se comparaba con `i.id` (número)
```javascript
// ❌ Antes (no funcionaba)
const item = menu.items.find(i => i.id === itemId);

// ✅ Después (funciona)
const item = menu.items.find(i => String(i.id) === String(itemId));
```

**Síntoma:** Los logs mostraban "Item found? false" aunque el menú existía

**Solución:** Convertir ambos valores a string antes de comparar

### Bug 2: itemId undefined en vista de recetas filtradas
**Problema:** Al hacer quick edit desde la vista de recetas filtradas, `itemId` era `undefined`

**Causa:** El metadata de recetas no incluía el `itemId` del menú

**Solución:** 
1. Modificar `getRecipeMetadataFromMenu()` para incluir `itemId` en cada entrada
2. Modificar `renderRecipesGroupedByDay()` para guardar `itemId` en `dayData`

### Bug 3: Método incorrecto para re-renderizar
**Problema:** Llamaba a `this.renderRecipes()` que no existe

**Causa:** El método correcto es `this.renderRecipeList()`

**Solución:** Cambiar a `this.renderRecipeList()`

## Estado

✅ **Completado y probado**
- Sin errores de sintaxis
- Sin referencias a funciones eliminadas
- Código más limpio y mantenible (~276 líneas eliminadas)
- Quick edit funciona correctamente desde menús
- Quick edit funciona desde vista de recetas filtradas
- Toast de confirmación aparece
- Vista se actualiza inmediatamente
- Celdas de menú tienen estilo clickeable
- Botones de edición en vista de recetas filtradas
- Re-renderizado inteligente según vista activa


## Mejora Final: Título del Menú en Vista Filtrada

**Fecha:** 9 de noviembre de 2025  
**Ubicación:** `script.js` línea ~4290

### Cambio Implementado

Cuando filtras recetas por menú, ahora aparece el nombre del menú como título destacado en la parte superior del grid de recetas.

### Código Añadido

```javascript
renderRecipesGroupedByDay(recipes, menu, container) {
    // Add menu title at the top
    const menuTitle = document.createElement('h2');
    menuTitle.style.cssText = `
        grid-column: 1 / -1;
        margin: 0 0 2rem 0;
        padding: 1rem 0;
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text-primary);
        border-bottom: 3px solid var(--color-primary);
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    menuTitle.innerHTML = `<i class="fa-solid fa-utensils"></i> ${menu.name}`;
    container.appendChild(menuTitle);
    
    // ... resto del código
}
```

### Características

- 🍴 Icono de cubiertos
- Nombre del menú en grande (1.75rem)
- Borde inferior con color primario
- Ocupa todo el ancho del grid
- Espaciado adecuado (2rem abajo)

### Resultado Visual

```
┌─────────────────────────────────────┐
│ 🍴 Semana 2                         │
│ ═══════════════════════════════════ │
│                                     │
│ 📅 LUNES                            │
│ ☀️ Comida ✏️    🌙 Cena ✏️         │
│ [Receta 1]     [Receta 2]          │
│                                     │
│ 📅 MARTES                           │
│ ...                                 │
└─────────────────────────────────────┘
```

---

**Estado Final:** ✅ Completado
**Archivos modificados:** `script.js`
