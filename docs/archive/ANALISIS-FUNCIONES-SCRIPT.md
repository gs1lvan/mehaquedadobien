# Análisis de Funciones en script.js

## 📊 Resumen Ejecutivo

- **Total de líneas:** 14,103
- **Clases principales:** 3 (CategoryManager, ShoppingListManager, RecipeApp)
- **Funciones de Menús:** ~50
- **Funciones de Listas de Compra:** ~30
- **Funciones de Recetas:** ~100+
- **Funciones de UI/Modales:** ~80+

---

## 🍽️ FUNCIONES DE MENÚS (Menu Manager)

### Inicialización y Vistas
| Función | Línea | Descripción |
|---------|-------|-------------|
| `initMenus()` | 9872 | Inicializa funcionalidad de menús y event listeners |
| `showMenusView()` | 10005 | Muestra la vista de menús |
| `hideMenusView()` | 10050 | Oculta la vista de menús |

### Renderizado
| Función | Línea | Descripción |
|---------|-------|-------------|
| `renderMenus()` | 10060 | Renderiza todos los menús (visibles y ocultos) |
| `renderMenuCard(menu, isHidden)` | 10179 | Renderiza una tarjeta individual de menú |
| `renderMenuItems(menu)` | 10321 | Renderiza los items de un menú con controles de reorden |
| `renderMenuFilterChips()` | 11855 | Renderiza chips de filtro de menús en home |

### Gestión de Estado
| Función | Línea | Descripción |
|---------|-------|-------------|
| `toggleMenuExpanded(menuId)` | 10538 | Expande/colapsa un menú |
| `toggleMenuEnabled(menuId)` | 10587 | Habilita/deshabilita un menú |
| `toggleMenuAsFilter(menuId)` | 11810 | Marca/desmarca menú como filtro |

### Reordenamiento
| Función | Línea | Descripción |
|---------|-------|-------------|
| `moveMenuItemUp(menuId, itemIndex)` | 10604 | Mueve item del menú hacia arriba |
| `moveMenuItemDown(menuId, itemIndex)` | 10623 | Mueve item del menú hacia abajo |
| `moveMenuItemUp(itemDiv)` | 12310 | Mueve item del menú hacia arriba (en formulario) |
| `moveMenuItemDown(itemDiv)` | 12320 | Mueve item del menú hacia abajo (en formulario) |

### Modales
| Función | Línea | Descripción |
|---------|-------|-------------|
| `showMenuForm(menuId)` | 12024 | Muestra formulario de crear/editar menú |
| `closeMenuModal()` | 12116 | Cierra modal de menú |
| `showMenuOptionsModal(menuId)` | 10640 | Muestra modal de opciones de menú |
| `closeMenuOptionsModal()` | 10738 | Cierra modal de opciones |
| `openCategorySelectorForMenu(inputElement)` | 11175 | Abre selector de categorías para menú |
| `openMenuCategorySelectorModal(inputElement)` | 11307 | Abre modal de selector de categorías |
| `openMenuRecipeSelectorModal(inputElement, recipes, category)` | 11556 | Abre modal de selector de recetas |

### CRUD
| Función | Línea | Descripción |
|---------|-------|-------------|
| `addMenuItemInput(item, isExisting)` | 12128 | Añade input de item al formulario |
| `saveMenu()` | 12330 | Guarda menú (crear o actualizar) |
| `deleteMenu(menuId)` | 11786 | Elimina un menú |
| `duplicateMenu(menuId)` | 11151 | Duplica un menú |

### Exportación/Importación
| Función | Línea | Descripción |
|---------|-------|-------------|
| `exportMenuToXML(menuId)` | 10751 | Exporta menú a XML |
| `exportMenu(menuId)` | 10798 | Wrapper legacy para exportar |
| `printMenuPDF(menuId)` | 10805 | Imprime menú como PDF |
| `parseMenuFromTXT(text)` | 11055 | Parsea menú desde texto |
| `copyMenuToClipboard(menuId)` | 11121 | Copia menú al portapapeles |

### Utilidades y Helpers
| Función | Línea | Descripción |
|---------|-------|-------------|
| `getMenusFromStorage()` | 12443 | Obtiene menús desde localStorage |
| `getMenuById(menuId)` | 12456 | Obtiene menú por ID |
| `getMenuFilters()` | 11847 | Obtiene menús marcados como filtros |
| `getRecipeNamesFromMenu(menu)` | 11907 | Extrae nombres de recetas de un menú |
| `getRecipeMetadataFromMenu(menu)` | 11931 | Extrae metadata de recetas de un menú |
| `getCategoriesWithMenuRecipes(menuRecipes)` | 11362 | Obtiene categorías con recetas de menú |

### Filtrado
| Función | Línea | Descripción |
|---------|-------|-------------|
| `handleMenuFilterClick(menuId)` | 11985 | Maneja click en filtro de menú |
| `clearMenuFilter()` | 12013 | Limpia filtro de menú activo |

---

## 🛒 FUNCIONES DE LISTAS DE COMPRA (Shopping List Manager)

### Clase ShoppingListManager (líneas 476-809)
| Función | Línea | Descripción |
|---------|-------|-------------|
| `loadLists()` | 487 | Carga listas desde localStorage |
| `saveLists()` | 511 | Guarda listas en localStorage |
| `createList(name)` | 526 | Crea nueva lista |
| `getList(id)` | 548 | Obtiene lista por ID |
| `updateList(id, updates)` | 558 | Actualiza lista existente |
| `deleteList(id)` | 578 | Elimina lista |
| `toggleListEnabled(id)` | 597 | Habilita/deshabilita lista |
| `addItem(listId, item)` | 619 | Añade item a lista |
| `updateItem(listId, itemId, updates)` | 648 | Actualiza item de lista |
| `deleteItem(listId, itemId)` | 675 | Elimina item de lista |
| `toggleItemCompleted(listId, itemId)` | 702 | Marca/desmarca item como completado |
| `getCompletedCount(listId)` | 728 | Cuenta items completados |
| `getTotalCount(listId)` | 739 | Cuenta total de items |
| `isListComplete(listId)` | 749 | Verifica si lista está completa |
| `formatListForClipboard(listId, includeCompleted)` | 761 | Formatea lista para portapapeles |

### Funciones en RecipeApp

#### Inicialización y Vistas
| Función | Línea | Descripción |
|---------|-------|-------------|
| `initShoppingLists()` | 9786 | Inicializa funcionalidad de listas |
| `showShoppingListsView()` | 9957 | Muestra vista de listas |
| `hideShoppingListsView()` | 9995 | Oculta vista de listas |

#### Renderizado
| Función | Línea | Descripción |
|---------|-------|-------------|
| `renderShoppingLists()` | 12466 | Renderiza todas las listas |
| `renderShoppingListCard(list, isHidden)` | 12538 | Renderiza tarjeta de lista |
| `renderShoppingItems(list)` | 12713 | Renderiza items de lista |

#### Modales
| Función | Línea | Descripción |
|---------|-------|-------------|
| `showShoppingListForm(listId)` | 12915 | Muestra formulario de lista |
| `closeShoppingListModal()` | 13554 | Cierra modal de lista |
| `showSelectShoppingListModal(...)` | 13571 | Muestra modal para seleccionar lista |
| `closeSelectShoppingListModal()` | 13648 | Cierra modal de selección |
| `showShoppingListOptionsModal(listId)` | 13696 | Muestra modal de opciones |
| `closeShoppingListOptionsModal()` | 13786 | Cierra modal de opciones |

#### CRUD
| Función | Línea | Descripción |
|---------|-------|-------------|
| `addShoppingItemInput(item, isExisting)` | 12962 | Añade input de item al formulario |
| `saveShoppingList()` | 13173 | Guarda lista (crear o actualizar) |
| `toggleShoppingListEnabled(listId)` | 13244 | Habilita/deshabilita lista |
| `deleteShoppingList(listId)` | 13261 | Elimina lista |
| `duplicateShoppingList(listId)` | 13278 | Duplica lista |
| `addIngredientToShoppingList(...)` | 13661 | Añade ingrediente a lista |

#### Exportación/Importación
| Función | Línea | Descripción |
|---------|-------|-------------|
| `exportShoppingListToXML(listId)` | 13303 | Exporta lista a XML |
| `exportShoppingList(listId)` | 13351 | Wrapper legacy para exportar |
| `parseShoppingListFromTXT(text)` | 13452 | Parsea lista desde texto |
| `copyShoppingListToClipboard(listId, includeCompleted)` | 13500 | Copia lista al portapapeles |

---

## 📝 OTRAS FUNCIONES PRINCIPALES

### Gestión de Recetas
- `loadRecipes()` - Carga recetas desde storage
- `renderRecipeList()` - Renderiza lista de recetas
- `renderRecipeCard()` - Renderiza tarjeta de receta
- `showRecipeDetail()` - Muestra detalle de receta
- `showRecipeForm()` - Muestra formulario de receta
- `saveRecipe()` - Guarda receta
- `deleteRecipe()` - Elimina receta
- `duplicateRecipe()` - Duplica receta

### Gestión de Ingredientes
- `addIngredientInput()` - Añade input de ingrediente
- `saveIngredient()` - Guarda ingrediente
- `editIngredient()` - Edita ingrediente
- `deleteIngredient()` - Elimina ingrediente
- `moveIngredientUp()` - Mueve ingrediente arriba
- `moveIngredientDown()` - Mueve ingrediente abajo

### Gestión de Secuencias
- `addSequenceInput()` - Añade input de secuencia
- `saveSequence()` - Guarda secuencia
- `editSequence()` - Edita secuencia
- `deleteSequence()` - Elimina secuencia
- `moveSequenceUp()` - Mueve secuencia arriba
- `moveSequenceDown()` - Mueve secuencia abajo

### Gestión de Categorías
- `renderFilterChips()` - Renderiza chips de filtro
- `showCategoryModal()` - Muestra modal de categorías
- `createCategory()` - Crea categoría
- `editCategory()` - Edita categoría
- `deleteCategory()` - Elimina categoría

### Filtrado
- `handleFilterClick()` - Maneja click en filtro
- `clearAllFilters()` - Limpia todos los filtros
- `applyFilters()` - Aplica filtros activos

### Modales
- `openModal()` - Abre modal genérico
- `closeModal()` - Cierra modal genérico
- `handleEscapeKey()` - Maneja tecla ESC

### Utilidades
- `parseTimeInput()` - Parsea input de tiempo
- `formatTimeForDisplay()` - Formatea tiempo para mostrar
- `validateTimeInput()` - Valida input de tiempo
- `showToast()` - Muestra notificación toast
- `showError()` - Muestra error

---

## 🎯 PROPUESTA DE AGRUPACIÓN PARA MODULARIZACIÓN

### Módulo: `managers/menu-manager.js`
**Funciones a incluir:** ~50 funciones de menús
- Todas las funciones que empiezan con `menu`, `Menu`
- Funciones de renderizado de menús
- Funciones de exportación/importación de menús
- Gestión de filtros de menús

### Módulo: `managers/shopping-list-manager.js`
**Funciones a incluir:** ~30 funciones de listas
- Clase `ShoppingListManager` completa (ya existe)
- Todas las funciones que empiezan con `shopping`, `Shopping`
- Funciones de renderizado de listas
- Funciones de exportación/importación de listas

### Módulo: `managers/recipe-manager.js`
**Funciones a incluir:** ~100+ funciones de recetas
- CRUD de recetas
- Renderizado de recetas
- Gestión de ingredientes
- Gestión de secuencias
- Exportación/importación de recetas

### Módulo: `ui/modal-manager.js`
**Funciones a incluir:** ~80 funciones de modales
- Apertura/cierre de modales
- Gestión de stack de modales
- Modales de categorías
- Modales de selección

### Módulo: `ui/filter-manager.js`
**Funciones a incluir:** ~20 funciones de filtrado
- Gestión de filtros de categoría
- Gestión de filtros de tiempo
- Gestión de filtros de menú
- Renderizado de chips de filtro

---

## 📊 ESTADÍSTICAS

### Por Tipo de Funcionalidad
- **Menús:** ~50 funciones (3,500 líneas aprox.)
- **Listas de Compra:** ~30 funciones (2,000 líneas aprox.)
- **Recetas:** ~100 funciones (5,000 líneas aprox.)
- **Modales:** ~80 funciones (2,000 líneas aprox.)
- **Filtros:** ~20 funciones (800 líneas aprox.)
- **Utilidades:** ~30 funciones (800 líneas aprox.)

### Complejidad
- **Alta:** Menús, Recetas, Modales
- **Media:** Listas de Compra, Filtros
- **Baja:** Utilidades, Constantes

---

## ✅ CONCLUSIÓN

El archivo `script.js` tiene una estructura clara pero monolítica. Las funciones están bien organizadas por comentarios de sección, lo que facilitará la extracción a módulos separados.

**Recomendación:** Empezar la modularización por las funciones de **menor complejidad y menor dependencia** (utilidades, constantes) y avanzar hacia las más complejas (menús, recetas).


---

## 🎉 ACTUALIZACIÓN: MenuManager Creado

### ✅ Estado Actual

Se ha creado la clase `MenuManager` siguiendo el mismo patrón que `ShoppingListManager`.

**Archivos creados:**
- ✅ `menu-manager.js` - Clase MenuManager completa (~600 líneas)
- ✅ `MENU-MANAGER-GUIDE.md` - Guía de uso y migración

### 📊 Comparación de Managers

| Manager | Líneas | Storage | CRUD | Estado | Items | Export | Import |
|---------|--------|---------|------|--------|-------|--------|--------|
| **CategoryManager** | ~300 | localStorage | ✅ | ✅ Hide | ❌ | ❌ | ❌ |
| **ShoppingListManager** | ~400 | localStorage | ✅ | ✅ Enable | ✅ | ✅ | ✅ |
| **MenuManager** | ~600 | localStorage | ✅ | ✅ Enable + Filter | ✅ | ✅ | ✅ |

### 🔄 Próximos Pasos

1. **Integrar MenuManager en RecipeApp**
   ```javascript
   constructor() {
       this.menuManager = new MenuManager();
   }
   ```

2. **Migrar funciones de script.js a usar MenuManager**
   - `getMenusFromStorage()` → `menuManager.getAllMenus()`
   - `getMenuById()` → `menuManager.getMenu()`
   - `saveMenu()` → `menuManager.createMenu()` / `updateMenu()`
   - ... etc (ver MENU-MANAGER-GUIDE.md)

3. **Eliminar código duplicado de script.js**
   - Una vez migradas todas las funciones
   - Reducción estimada: ~3,000 líneas

### 📈 Impacto en la Modularización

**Antes:**
```
script.js (14,103 líneas)
├── CategoryManager (300 líneas)
├── ShoppingListManager (400 líneas)
└── RecipeApp (13,400 líneas) ← TODO mezclado
```

**Después:**
```
script.js (~10,500 líneas)
├── CategoryManager (300 líneas)
├── ShoppingListManager (400 líneas)
└── RecipeApp (~9,800 líneas)

menu-manager.js (600 líneas) ← ✅ Nuevo
```

**Progreso de modularización:** ~25% completado (3,600 líneas extraídas)

---

## 🎯 Plan de Modularización Actualizado

### Fase 1: Managers ✅ (En Progreso)
- ✅ CategoryManager (ya existe en script.js)
- ✅ ShoppingListManager (ya existe en script.js)
- ✅ **MenuManager (NUEVO - creado)** ← Estamos aquí
- ⏳ StorageManager (mover desde models.js)

### Fase 2: Extraer Managers de script.js
- ⏳ Mover CategoryManager a archivo separado
- ⏳ Mover ShoppingListManager a archivo separado
- ⏳ Integrar MenuManager en RecipeApp

### Fase 3: UI y Componentes
- ⏳ FilterManager
- ⏳ ModalManager
- ⏳ ThemeManager
- ⏳ ViewManager

### Fase 4: Componentes de Recetas
- ⏳ RecipeForm
- ⏳ IngredientEditor
- ⏳ SequenceEditor
- ⏳ ApplianceSelector

### Fase 5: Utilidades
- ⏳ TimeUtils
- ⏳ ValidationUtils
- ⏳ FormatUtils

### Fase 6: Exportación/Importación
- ⏳ XMLExporter
- ⏳ XMLImporter
- ⏳ PDFExporter

---

## 📝 Notas de Implementación

### MenuManager vs ShoppingListManager

**Similitudes:**
- Mismo patrón de storage (localStorage)
- Métodos CRUD idénticos
- Sistema de enable/disable
- Exportación XML y clipboard
- Importación XML y texto

**Diferencias:**
- MenuManager tiene `isFilter` (para filtrar recetas en home)
- MenuManager tiene reordenamiento de items
- MenuManager tiene métodos de utilidad para recetas
- Items de menú tienen estructura diferente (lunch/dinner vs name/quantity)

### Lecciones Aprendidas

1. **Consistencia es clave** - Seguir el mismo patrón facilita el mantenimiento
2. **Separación de responsabilidades** - Manager solo maneja lógica de negocio
3. **Documentación** - Guía de uso facilita la adopción
4. **Testing** - Código separado es más fácil de testear

---

## 🚀 Siguiente Acción Recomendada

**Opción A: Integrar MenuManager inmediatamente**
- Añadir `menu-manager.js` a `index.html`
- Inicializar en RecipeApp
- Migrar funciones una por una
- Probar que todo funciona

**Opción B: Continuar con otros managers**
- Crear StorageManager separado
- Extraer CategoryManager de script.js
- Extraer ShoppingListManager de script.js
- Luego integrar todos juntos

**Recomendación:** Opción A - Integrar MenuManager ahora para validar el patrón antes de continuar.
