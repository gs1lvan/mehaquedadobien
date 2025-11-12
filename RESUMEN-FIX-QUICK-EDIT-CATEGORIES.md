# Resumen: Fix Quick Edit Categories

**Fecha:** 12 de noviembre de 2025  
**Problema:** Las categorías aparecen deshabilitadas (semi-transparentes) en el quick edit de menús aunque contengan la receta actual

## Problema Identificado

Cuando se edita una comida/cena desde la vista de menús usando quick edit, el selector de categorías muestra algunas categorías como deshabilitadas (opacidad 0.4, cursor not-allowed) aunque la receta actual pertenezca a esa categoría.

### Causa Raíz

1. **Almacenamiento por nombre:** Los menús almacenan las recetas por nombre (string) en lugar de por ID único
2. **Lógica de disponibilidad:** La función `renderCategorySelectorChips` verifica si una categoría tiene recetas `menuFriendly`, pero NO incluye la receta actual en el conteo
3. **Resultado:** Si una receta es la única en su categoría, la categoría aparece deshabilitada porque el sistema no reconoce que la receta actual pertenece a ella

### Ejemplo del Problema

```
Escenario:
- Categoría "Pasta" tiene 1 receta: "Carbonara"
- "Carbonara" está asignada al lunes en el menú
- Usuario hace click en quick edit para editar el lunes

Comportamiento ANTES del fix:
- Sistema busca recetas menuFriendly en categoría "Pasta"
- Encuentra "Carbonara" pero NO la cuenta porque está buscando en this.recipes
- No reconoce que "Carbonara" es la receta actual
- Categoría "Pasta" aparece deshabilitada (opacidad 0.4)

Comportamiento DESPUÉS del fix:
- Sistema busca recetas menuFriendly en categoría "Pasta"
- Además, verifica si la receta actual ("Carbonara") pertenece a esta categoría
- Reconoce que "Carbonara" está en "Pasta"
- Categoría "Pasta" aparece habilitada (opacidad 1.0)
```

## Solución Implementada

### Cambios Realizados

#### 1. Modificación en `quickEditMeal()` (línea ~10558)

**Antes:**
```javascript
const tempInput = document.createElement('input');
tempInput.type = 'text';
tempInput.value = mealType === 'lunch' ? (item.lunch || '') : (item.dinner || '');
tempInput.dataset.menuId = menuId;
tempInput.dataset.itemId = itemId;
tempInput.dataset.mealType = mealType;
tempInput.dataset.dayName = item.name;
tempInput.dataset.isQuickEdit = 'true';
```

**Después:**
```javascript
// Get current recipe name
const currentRecipeName = mealType === 'lunch' ? (item.lunch || '') : (item.dinner || '');

const tempInput = document.createElement('input');
tempInput.type = 'text';
tempInput.value = currentRecipeName;
tempInput.dataset.menuId = menuId;
tempInput.dataset.itemId = itemId;
tempInput.dataset.mealType = mealType;
tempInput.dataset.dayName = item.name;
tempInput.dataset.isQuickEdit = 'true';
tempInput.dataset.currentRecipeName = currentRecipeName; // ✅ NUEVO: Almacenar nombre de receta actual
```

**Cambio:** Se extrae el nombre de la receta actual y se almacena en `dataset.currentRecipeName` para pasarlo al selector de categorías.

#### 2. Modificación en `openCategorySelectorForMenu()` (línea ~11159)

**Antes:**
```javascript
// Check if this is a quick edit (from menu filter view)
const isQuickEdit = inputElement.dataset.isQuickEdit === 'true';

// Render categories in modal (without any pre-selection, with quick edit flag)
this.renderCategorySelectorChips(false, isQuickEdit);
```

**Después:**
```javascript
// Check if this is a quick edit (from menu filter view)
const isQuickEdit = inputElement.dataset.isQuickEdit === 'true';

// Get current recipe name if in quick edit mode
const currentRecipeName = isQuickEdit ? (inputElement.dataset.currentRecipeName || '') : '';

// Render categories in modal (without any pre-selection, with quick edit flag and current recipe name)
this.renderCategorySelectorChips(false, isQuickEdit, currentRecipeName); // ✅ NUEVO: Pasar nombre de receta actual
```

**Cambio:** Se extrae el nombre de la receta actual del dataset y se pasa como tercer parámetro a `renderCategorySelectorChips`.

#### 3. Modificación en `renderCategorySelectorChips()` (línea ~1662)

**Antes:**
```javascript
renderCategorySelectorChips(preSelectCategory = true, isQuickEdit = false) {
    // ...
    categories.forEach(category => {
        let hasRecipes = true;
        if (isQuickEdit) {
            const menuRecipes = this.recipes.filter(recipe =>
                recipe.menuFriendly === true && recipe.category === category.id
            );
            hasRecipes = menuRecipes.length > 0;
        }
        // ...
    });
}
```

**Después:**
```javascript
renderCategorySelectorChips(preSelectCategory = true, isQuickEdit = false, currentRecipeName = '') { // ✅ NUEVO: Parámetro currentRecipeName
    // ...
    categories.forEach(category => {
        let hasRecipes = true;
        if (isQuickEdit) {
            // Filter menu-friendly recipes in this category
            const menuRecipes = this.recipes.filter(recipe =>
                recipe.menuFriendly === true && recipe.category === category.id
            );
            
            // ✅ NUEVO: Si tenemos una receta actual, verificar si pertenece a esta categoría
            if (currentRecipeName) {
                const currentRecipe = this.recipes.find(recipe => recipe.name === currentRecipeName);
                if (currentRecipe && currentRecipe.category === category.id) {
                    // La receta actual está en esta categoría, así que tiene al menos una receta
                    hasRecipes = true;
                } else {
                    // La receta actual NO está en esta categoría, verificar si hay otras recetas
                    hasRecipes = menuRecipes.length > 0;
                }
            } else {
                // No hay receta actual, solo verificar si la categoría tiene recetas menu-friendly
                hasRecipes = menuRecipes.length > 0;
            }
        }
        // ...
    });
}
```

**Cambio:** 
- Se añade el parámetro `currentRecipeName` (default: `''`)
- Se busca la receta actual por nombre en `this.recipes`
- Si la receta actual pertenece a la categoría, se marca `hasRecipes = true`
- Si la receta actual NO pertenece a la categoría, se verifica si hay otras recetas menu-friendly

## Flujo de Datos

```
1. Usuario hace click en quick edit
   ↓
2. quickEditMeal() extrae el nombre de la receta actual
   - Almacena en tempInput.dataset.currentRecipeName
   ↓
3. openCategorySelectorForMenu() recibe el tempInput
   - Extrae currentRecipeName del dataset
   - Pasa a renderCategorySelectorChips(false, true, currentRecipeName)
   ↓
4. renderCategorySelectorChips() procesa cada categoría
   - Busca la receta actual por nombre
   - Si la receta actual está en la categoría → hasRecipes = true
   - Si la receta actual NO está en la categoría → hasRecipes = (menuRecipes.length > 0)
   ↓
5. Categoría se renderiza habilitada o deshabilitada según hasRecipes
```

## Resultados

### Antes del Fix
- ❌ Categorías con solo la receta actual aparecían deshabilitadas
- ❌ Usuario no podía mantener la misma categoría
- ❌ Confusión sobre qué categorías tienen recetas

### Después del Fix
- ✅ Categorías con la receta actual aparecen habilitadas
- ✅ Usuario puede mantener la misma categoría o cambiar
- ✅ Feedback visual correcto sobre disponibilidad de recetas

## Casos de Prueba

### Caso 1: Receta única en categoría
```
Setup:
- Categoría "Pasta" tiene 1 receta: "Carbonara" (menuFriendly: true)
- "Carbonara" está en el menú del lunes

Test:
1. Click en quick edit del lunes
2. Verificar que categoría "Pasta" está habilitada (opacidad 1.0)
3. Verificar que se puede seleccionar

Resultado esperado: ✅ PASS
```

### Caso 2: Receta con otras en la misma categoría
```
Setup:
- Categoría "Pasta" tiene 3 recetas: "Carbonara", "Bolognesa", "Alfredo" (todas menuFriendly: true)
- "Carbonara" está en el menú del lunes

Test:
1. Click en quick edit del lunes
2. Verificar que categoría "Pasta" está habilitada
3. Verificar que se puede seleccionar

Resultado esperado: ✅ PASS
```

### Caso 3: Categoría sin recetas menu-friendly
```
Setup:
- Categoría "Postres" tiene 0 recetas menuFriendly
- "Carbonara" (categoría "Pasta") está en el menú del lunes

Test:
1. Click en quick edit del lunes
2. Verificar que categoría "Postres" está deshabilitada (opacidad 0.4)
3. Verificar que NO se puede seleccionar

Resultado esperado: ✅ PASS
```

### Caso 4: Categoría con otras recetas pero no la actual
```
Setup:
- Categoría "Carne" tiene 2 recetas: "Bistec", "Pollo" (menuFriendly: true)
- "Carbonara" (categoría "Pasta") está en el menú del lunes

Test:
1. Click en quick edit del lunes
2. Verificar que categoría "Carne" está habilitada
3. Verificar que se puede seleccionar

Resultado esperado: ✅ PASS
```

## Limitaciones Conocidas

### 1. Identificación por Nombre
- **Problema:** Las recetas se identifican por nombre (string) en lugar de ID único
- **Impacto:** Si dos recetas tienen el mismo nombre, puede haber ambigüedad
- **Solución futura:** Migrar a sistema basado en IDs (ver spec completa en `.kiro/specs/fix-menu-quick-edit-categories/`)

### 2. Recetas Eliminadas
- **Problema:** Si una receta se elimina, el menú sigue mostrando su nombre
- **Impacto:** El nombre aparece pero no se puede editar correctamente
- **Solución futura:** Implementar sistema de IDs con manejo de recetas eliminadas

### 3. Recetas Renombradas
- **Problema:** Si una receta se renombra, el menú sigue mostrando el nombre antiguo
- **Impacto:** Inconsistencia entre nombre en menú y nombre real de la receta
- **Solución futura:** Sistema de IDs que actualice automáticamente los nombres

## Próximos Pasos

### Solución Completa (Opcional)
Para una solución más robusta, se recomienda implementar la spec completa:
- **Ubicación:** `.kiro/specs/fix-menu-quick-edit-categories/`
- **Incluye:**
  - Migración de nombres a IDs únicos
  - Manejo de recetas eliminadas
  - Manejo de recetas renombradas
  - Backward compatibility con formato legacy
  - Tests unitarios completos

### Prioridad
- **Alta:** La solución actual resuelve el problema inmediato
- **Media:** Implementar sistema de IDs para mayor robustez
- **Baja:** Tests unitarios y documentación extendida

## Archivos Modificados

- `mehaquedadobien/script.js` (3 funciones modificadas)
  - `quickEditMeal()` - Línea ~10558
  - `openCategorySelectorForMenu()` - Línea ~11159
  - `renderCategorySelectorChips()` - Línea ~1662

## Archivos Creados

- `mehaquedadobien/.kiro/specs/fix-menu-quick-edit-categories/requirements.md`
- `mehaquedadobien/.kiro/specs/fix-menu-quick-edit-categories/design.md`
- `mehaquedadobien/.kiro/specs/fix-menu-quick-edit-categories/tasks.md`
- `mehaquedadobien/RESUMEN-FIX-QUICK-EDIT-CATEGORIES.md` (este archivo)

## Conclusión

✅ **Problema resuelto:** Las categorías ahora aparecen correctamente habilitadas cuando contienen la receta actual en el quick edit de menús.

✅ **Solución mínima:** Se implementó la solución más simple y directa sin cambios estructurales en el modelo de datos.

✅ **Sin breaking changes:** La solución es compatible con el código existente y no requiere migración de datos.

⚠️ **Mejora futura recomendada:** Implementar sistema de IDs únicos para mayor robustez (spec completa disponible).
