# Visibilidad de Categorías Según Contexto

## Problema

Las categorías vacías (sin recetas) se mostraban en todos los contextos, lo que causaba confusión al usuario al intentar seleccionarlas en lugares donde no tenían sentido (filtros, quick edit de menús).

## Solución

Se ha implementado un sistema de visibilidad contextual para las categorías:

### Contexto 1: Formulario de Receta (Crear/Editar)
- ✅ **Todas las categorías visibles** (incluso las vacías)
- ✅ **Todas clickeables**
- ✅ Permite asignar cualquier categoría a una receta nueva
- 💡 **Razón**: Necesitas poder asignar categorías vacías para empezar a llenarlas

### Contexto 2: Quick Edit de Menús
- ❌ **Categorías vacías deshabilitadas**
- ✅ Solo categorías con recetas menu-friendly son clickeables
- ✅ Categorías vacías aparecen semitransparentes (opacidad 0.4)
- 💡 **Razón**: Solo tiene sentido seleccionar categorías que ya tienen recetas para añadir al menú

### Contexto 3: Filtro de Categorías (Vista Principal)
- ❌ **Categorías vacías deshabilitadas y agrupadas al final**
- ✅ Solo categorías con recetas son clickeables
- ✅ Categorías vacías aparecen semitransparentes después de un separador
- 💡 **Razón**: No tiene sentido filtrar por una categoría que no tiene recetas

## Cambios Realizados

### Cambio 1: Añadir parámetro `isQuickEdit` a `renderCategorySelectorChips`

**Archivo:** `script.js` línea ~1629

**Antes:**
```javascript
renderCategorySelectorChips(preSelectCategory = true) {
    // ...
}
```

**Después:**
```javascript
renderCategorySelectorChips(preSelectCategory = true, isQuickEdit = false) {
    // ...
    categories.forEach(category => {
        // Check if category has recipes (only for quick edit mode)
        let hasRecipes = true;
        if (isQuickEdit) {
            const menuRecipes = this.recipes.filter(recipe =>
                recipe.menuFriendly === true && recipe.category === category.id
            );
            hasRecipes = menuRecipes.length > 0;
        }

        const chip = document.createElement('button');
        // ...
        
        // If in quick edit mode and category has no recipes, make it disabled
        if (isQuickEdit && !hasRecipes) {
            chip.classList.add('disabled');
            chip.style.opacity = '0.4';
            chip.style.cursor = 'not-allowed';
            chip.disabled = true;
        }
        
        chip.onclick = (e) => {
            // Prevent selection if disabled
            if (isQuickEdit && !hasRecipes) {
                return;
            }
            // ...
        };
    });
}
```

### Cambio 2: Actualizar llamada desde formulario de receta

**Archivo:** `script.js` línea ~1598

**Antes:**
```javascript
this.renderCategorySelectorChips();
```

**Después:**
```javascript
// Show all categories for recipe form (isQuickEdit = false)
this.renderCategorySelectorChips(true, false);
```

### Cambio 3: Actualizar llamada desde quick edit de menús

**Archivo:** `script.js` línea ~11120

**Antes:**
```javascript
this.renderCategorySelectorChips(false);
```

**Después:**
```javascript
// Check if this is a quick edit (from menu filter view)
const isQuickEdit = inputElement.dataset.isQuickEdit === 'true';

// Hide empty categories in quick edit mode
this.renderCategorySelectorChips(false, isQuickEdit);
```

## Comportamiento por Contexto

### Formulario de Receta
```
Al abrir selector de categorías:
- isQuickEdit = false
- Todas las categorías visibles y clickeables
- Opacidad 1.0 para todas
```

### Quick Edit de Menús
```
Al abrir selector de categorías:
- isQuickEdit = true
- Categorías con recetas: opacidad 1.0, clickeables
- Categorías vacías: opacidad 0.4, no clickeables
```

### Filtro de Categorías
```
Al renderizar filtros:
- Categorías con recetas primero
- Separador |
- Categorías vacías al final (opacidad 0.4, no clickeables)
```

## Ejemplo Visual

### Formulario de Receta
```
[🐷 Cerdo] [🐔 Pollo] [🥗 Ensaladas] [🍰 Postres]
   ↑ Todas clickeables, opacidad 1.0
```

### Quick Edit de Menús
```
[🐷 Cerdo] [🐔 Pollo] [🥗 Ensaladas] [🍰 Postres]
   ↑ Con recetas      ↑ Vacías (opacidad 0.4, no clickeables)
```

### Filtro de Categorías
```
[Limpiar] [🐷 Cerdo] [🐔 Pollo] | [🥗 Ensaladas] [🍰 Postres]
          ↑ Con recetas         ↑ Vacías (agrupadas al final)
```

## Testing

### Test 1: Formulario de Receta
1. Click en "Nueva Receta"
2. Click en el selector de categorías
3. Verifica que:
   - Todas las categorías son visibles
   - Todas son clickeables
   - Todas tienen opacidad 1.0

### Test 2: Quick Edit de Menús
1. Filtra por un menú o ve a la vista de Menús
2. Click en editar una comida/cena
3. Click en el selector de categorías
4. Verifica que:
   - Categorías con recetas son clickeables
   - Categorías vacías están semitransparentes
   - No puedes hacer click en categorías vacías

### Test 3: Filtro de Categorías
1. Ve a la vista principal de recetas
2. Observa la barra de filtros
3. Verifica que:
   - Categorías con recetas aparecen primero
   - Hay un separador |
   - Categorías vacías aparecen al final semitransparentes

## Archivos Modificados

- `script.js` - Función `renderCategorySelectorChips` (línea ~1629)
- `script.js` - Llamada desde formulario de receta (línea ~1598)
- `script.js` - Llamada desde quick edit de menús (línea ~11120)

## Fecha

12 de noviembre de 2025
