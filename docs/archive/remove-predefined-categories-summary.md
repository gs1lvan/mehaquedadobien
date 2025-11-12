# Eliminación de Sección "Categorías Predefinidas"

## Resumen
Se eliminó la sección "Categorías Predefinidas" de la modal "Gestionar Categorías", dejando solo las secciones de "Categorías Personalizadas" y "Categorías Ocultas".

## Cambios Realizados

### 1. HTML (`index.html`)

**Eliminado:**
```html
<h3>Categorías Predefinidas</h3>
<div id="predefined-categories-list" class="categories-list">
    <!-- Predefined categories -->
</div>
```

**Estructura final de la modal:**
```
┌─────────────────────────────────────┐
│  Gestionar Categorías          [✕] │
├─────────────────────────────────────┤
│  Crear Nueva Categoría              │
│  [Formulario de creación]           │
│                                     │
│  Categorías Personalizadas          │
│  [Grid de categorías custom]        │
│                                     │
│  Categorías Ocultas                 │
│  [Grid de categorías ocultas]       │
└─────────────────────────────────────┘
```

### 2. JavaScript (`script.js`)

#### Función Eliminada:
- ❌ `renderPredefinedCategoriesList()` - Ya no es necesaria

#### Función Eliminada:
- ❌ `createPredefinedCategoryItem()` - Ya no es necesaria

#### Llamadas Eliminadas (4 ubicaciones):
1. En `renderCategoryModal()` - línea 1585
2. En `handleDeleteCategory()` - línea 2662
3. En `handleHideCategory()` - línea 2703
4. En `handleRestoreCategory()` - línea 2732

**Antes:**
```javascript
this.renderPredefinedCategoriesList();
this.renderCustomCategoriesList();
this.renderHiddenCategoriesList();
```

**Después:**
```javascript
this.renderCustomCategoriesList();
this.renderHiddenCategoriesList();
```

## Razón del Cambio

Las categorías predefinidas ya no necesitan ser gestionadas desde esta modal porque:
1. No se pueden editar (son predefinidas)
2. No se pueden eliminar (son del sistema)
3. Solo se pueden ocultar, lo cual se puede hacer desde otros lugares de la UI
4. Simplifica la interfaz mostrando solo las categorías que el usuario puede gestionar completamente

## Impacto

### ✅ Funcionalidad Mantenida:
- Las categorías predefinidas siguen existiendo en el sistema
- Se pueden seguir usando en recetas
- Se pueden ocultar desde otros lugares de la UI
- Aparecen en el selector de categorías

### ✅ UI Simplificada:
- Modal más limpia y enfocada
- Solo muestra categorías que el usuario creó
- Menos confusión sobre qué se puede editar/eliminar

### ✅ Código Más Limpio:
- 2 funciones menos
- 4 llamadas menos
- Menos complejidad en la gestión de categorías

## Archivos Modificados

1. **index.html**
   - Eliminada sección de categorías predefinidas

2. **script.js**
   - Eliminada función `renderPredefinedCategoriesList()`
   - Eliminada función `createPredefinedCategoryItem()`
   - Eliminadas 4 llamadas a `renderPredefinedCategoriesList()`

## Testing

Para verificar:
1. ✅ Abrir modal "Gestionar Categorías"
2. ✅ Verificar que solo aparecen "Categorías Personalizadas" y "Categorías Ocultas"
3. ✅ Verificar que las categorías predefinidas siguen funcionando en el resto de la app
4. ✅ Verificar que se pueden crear, editar y eliminar categorías personalizadas
5. ✅ Verificar que se pueden ocultar/mostrar categorías
