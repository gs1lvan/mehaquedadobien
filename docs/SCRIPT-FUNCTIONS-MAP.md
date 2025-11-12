# 📊 Mapa de Funciones - script.js

**Archivo:** `script.js`  
**Líneas:** 12,694  
**Funciones:** 309  
**Última actualización:** 12 de noviembre de 2025

---

## 📈 Estadísticas

- **Total de funciones:** 309
- **Clases principales:** 3 (CategoryManager, ShoppingListManager, RecipeApp)
- **Utilidades globales:** DebugLogger, constantes
- **Tamaño:** ~12,700 líneas de código

---

## 🏗️ Estructura General

```
script.js
├── DebugLogger (utilidad de logging)
├── Constantes globales
│   ├── CATEGORY_COLORS
│   ├── COOKING_ACTIONS
│   ├── KITCHEN_APPLIANCES
│   └── PREDEFINED_INGREDIENTS
├── CategoryManager (gestión de categorías)
├── ShoppingListManager (gestión de listas de compra)
└── RecipeApp (aplicación principal)
```

---

## 🔧 1. DebugLogger (Utilidad de Logging)

**Propósito:** Sistema de logging configurable con niveles

### Métodos (4):
- `error(prefix, ...args)` - Log de errores
- `warn(prefix, ...args)` - Log de advertencias
- `info(prefix, ...args)` - Log de información
- `verbose(prefix, ...args)` - Log detallado

**Niveles:**
- 0: NONE (producción)
- 1: ERROR
- 2: WARN
- 3: INFO (default)
- 4: VERBOSE

---

## 🏷️ 2. CategoryManager (Gestión de Categorías)

**Propósito:** Gestiona categorías predefinidas y personalizadas

### Métodos principales (~20):

#### Almacenamiento
- `loadCustomCategories()` - Cargar categorías personalizadas
- `saveCustomCategories()` - Guardar categorías personalizadas
- `loadHiddenCategories()` - Cargar categorías ocultas
- `saveHiddenCategories()` - Guardar categorías ocultas

#### Gestión de Visibilidad
- `hideCategory(id)` - Ocultar categoría
- `unhideCategory(id)` - Mostrar categoría
- `isCategoryHidden(id)` - Verificar si está oculta

#### Consultas
- `getAllCategories(includeHidden)` - Obtener todas las categorías
- `getVisiblePredefinedCategories()` - Categorías predefinidas visibles
- `getHiddenCategories()` - Obtener categorías ocultas
- `getCategoryById(id)` - Buscar por ID
- `getCategoryCounts(recipes)` - Contar recetas por categoría

#### CRUD
- `generateCategoryId(name)` - Generar ID único
- `createCategory(categoryData)` - Crear categoría personalizada
- `updateCategory(id, updates)` - Actualizar categoría
- `deleteCategory(id, recipes)` - Eliminar categoría

---

## 🛒 3. ShoppingListManager (Gestión de Listas de Compra)

**Propósito:** Gestiona listas de compra y sus items

### Métodos principales (~20):

#### Almacenamiento
- `loadLists()` - Cargar listas desde localStorage
- `saveLists()` - Guardar listas en localStorage

#### CRUD de Listas
- `createList(name)` - Crear nueva lista
- `getList(id)` - Obtener lista por ID
- `updateList(id, updates)` - Actualizar lista
- `deleteList(id)` - Eliminar lista
- `toggleListEnabled(id)` - Habilitar/deshabilitar lista

#### CRUD de Items
- `addItem(listId, item)` - Añadir item a lista
- `updateItem(listId, itemId, updates)` - Actualizar item
- `deleteItem(listId, itemId)` - Eliminar item
- `toggleItemCompleted(listId, itemId)` - Marcar como completado

#### Consultas
- `getCompletedCount(listId)` - Contar items completados
- `getTotalCount(listId)` - Contar total de items
- `isListComplete(listId)` - Verificar si está completa

#### Utilidades
- `formatListForClipboard(listId, includeCompleted)` - Formatear para copiar

---

## 🍳 4. RecipeApp (Aplicación Principal)

**Propósito:** Clase principal que coordina toda la aplicación

### Categorías de Métodos (~265 funciones):

### 4.1. Inicialización y Configuración (~10 funciones)
- `constructor()` - Inicializar aplicación
- `setupEventListeners()` - Configurar event listeners
- `setupFormEventListeners()` - Listeners de formularios
- `updateRecipeMap()` - Actualizar mapa de recetas
- `generateId(prefix)` - Generar IDs únicos
- `generateRecipeSubIds(recipe)` - Generar IDs para sub-objetos

### 4.2. Gestión de Tiempo (~5 funciones)
- `parseTimeInput(idPrefix)` - Parsear entrada de tiempo
- `populateTimeInput(idPrefix, timeString)` - Poblar campos de tiempo
- `validateTimeInput(idPrefix)` - Validar tiempo
- `formatTimeForDisplay(timeString)` - Formatear tiempo para mostrar
- `createTimeInput(config)` - Crear input de tiempo

### 4.3. Utilidades Generales (~5 funciones)
- `capitalizeFirstLetter(str)` - Capitalizar primera letra
- `shuffleArray(array)` - Mezclar array
- `getRecipeById(id)` - Buscar receta por ID
- `getRecipeByName(name)` - Buscar receta por nombre

### 4.4. Integración con Listas de Compra (~5 funciones)
- `addRecipeToShoppingList(recipeId, shoppingListId)` - Añadir receta completa
- `addIngredientToShoppingList(recipeId, ingredientId, shoppingListId)` - Añadir ingrediente
- `convertMenuToShoppingList(menuId)` - Convertir menú a lista
- `getRecipesFromMenu(menuId)` - Obtener recetas de menú
- `applyMenuFilter(menuId)` - Aplicar filtro de menú

### 4.5. Gestión de Filtros (~10 funciones)
- `renderFilterChips()` - Renderizar chips de filtro
- `attachFilterChipListeners()` - Listeners de filtros
- `toggleCategoryFilter(categoryId)` - Toggle filtro de categoría
- `clearAllFilters()` - Limpiar todos los filtros
- `applyFilters()` - Aplicar filtros activos
- `filterRecipesByCategory(recipes, categoryId)` - Filtrar por categoría
- `filterRecipesByTime(recipes, timeRange)` - Filtrar por tiempo
- `filterRecipesBySearch(recipes, query)` - Filtrar por búsqueda

### 4.6. Selector de Categorías (~15 funciones)
- `renderCategorySelector()` - Renderizar selector
- `updateCategoryDisplay()` - Actualizar display
- `openCategorySelectorModal()` - Abrir modal
- `renderCategorySelectorChips(preSelectCategory, isQuickEdit, currentRecipeName)` - Renderizar chips
- `selectCategory(categoryId)` - Seleccionar categoría
- `renderCategoryModal()` - Renderizar modal de categorías
- `showCategoryModal(fromSettings)` - Mostrar modal
- `closeCategoryModal()` - Cerrar modal

### 4.7. Gestión de Categorías Personalizadas (~20 funciones)
- `renderCustomCategoriesList()` - Renderizar lista personalizada
- `renderHiddenCategoriesList()` - Renderizar lista oculta
- `createHiddenCategoryItem(category, count)` - Crear item oculto
- `createCustomCategoryItem(category, count, isHidden)` - Crear item personalizado
- `handleCreateCategory()` - Manejar creación
- `handleEditCategory(categoryId)` - Manejar edición
- `showEditCategoryModal(category)` - Mostrar modal de edición
- `closeEditCategoryModal()` - Cerrar modal de edición
- `openCategoryOptionsModal(categoryId, isHidden)` - Abrir opciones
- `closeCategoryOptionsModal()` - Cerrar opciones
- `setupCategoryOptionsListeners()` - Configurar listeners

### 4.8. Selectores de Emoji y Color (~10 funciones)
- `openEmojiPickerModal(targetSpanId, targetHiddenId)` - Abrir selector de emoji
- `closeEmojiPickerModal()` - Cerrar selector de emoji
- `renderEmojiPickerModal()` - Renderizar selector de emoji
- `openColorPickerModal(targetPreviewId, targetHiddenId)` - Abrir selector de color
- `closeColorPickerModal()` - Cerrar selector de color
- `renderColorPickerModal()` - Renderizar selector de color

### 4.9. Gestión de Modales (~10 funciones)
- `openSettingsModal()` - Abrir configuración
- `closeSettingsModal()` - Cerrar configuración
- `openHelpModal()` - Abrir ayuda
- `closeHelpModal()` - Cerrar ayuda
- `pushModal(modalId)` - Añadir modal al stack
- `popModal()` - Quitar modal del stack
- `clearModalStack()` - Limpiar stack
- `syncModalStack()` - Sincronizar stack
- `setModalFocus(modal)` - Establecer foco
- `restoreFocus(elementId)` - Restaurar foco
- `handleEscapeKey()` - Manejar tecla Escape

### 4.10. Gestión de Formularios (~30 funciones)
- `setupCookingActionButtons()` - Configurar botones de acciones
- `renderCookingActionButtons()` - Renderizar botones
- `renderIngredientButtons()` - Renderizar botones de ingredientes
- `findSuggestedButton(textarea, buttons)` - Encontrar botón sugerido
- `updateUsedCookingActions()` - Actualizar acciones usadas
- `showAutocomplete(textarea, autocompleteDiv, suggestions)` - Mostrar autocompletado
- `collapseAllExpandableContent()` - Colapsar todo el contenido expandible

### 4.11. Gestión de Ingredientes (~20 funciones)
- `addIngredient()` - Añadir ingrediente
- `editIngredient(id)` - Editar ingrediente
- `deleteIngredient(id)` - Eliminar ingrediente
- `renderIngredientsList()` - Renderizar lista
- `moveIngredientUp(id)` - Mover arriba
- `moveIngredientDown(id)` - Mover abajo
- `validateIngredient(name, quantity, unit)` - Validar ingrediente
- `clearIngredientForm()` - Limpiar formulario

### 4.12. Gestión de Secuencias (~20 funciones)
- `addSequence()` - Añadir secuencia
- `editSequence(id)` - Editar secuencia
- `deleteSequence(id)` - Eliminar secuencia
- `renderSequencesList()` - Renderizar lista
- `moveSequenceUp(id)` - Mover arriba
- `moveSequenceDown(id)` - Mover abajo
- `validateSequence(step, description)` - Validar secuencia
- `clearSequenceForm()` - Limpiar formulario

### 4.13. Gestión de Multimedia (~15 funciones)
- `handleImageUpload(event)` - Manejar subida de imagen
- `addImage(file)` - Añadir imagen
- `deleteImage(id)` - Eliminar imagen
- `renderImagesList()` - Renderizar lista
- `openImageModal(imageId)` - Abrir modal de imagen
- `closeImageModal()` - Cerrar modal
- `navigateImages(direction)` - Navegar entre imágenes
- `compressImage(file)` - Comprimir imagen

### 4.14. CRUD de Recetas (~25 funciones)
- `createRecipe(data)` - Crear receta
- `updateRecipe(id, data)` - Actualizar receta
- `deleteRecipe(id)` - Eliminar receta
- `duplicateRecipe(id)` - Duplicar receta
- `getRecipe(id)` - Obtener receta
- `getAllRecipes()` - Obtener todas las recetas
- `saveRecipe()` - Guardar receta actual
- `loadRecipe(id)` - Cargar receta para editar
- `validateRecipe(data)` - Validar datos de receta

### 4.15. Renderizado de Recetas (~20 funciones)
- `renderRecipeList()` - Renderizar lista de recetas
- `renderRecipeCard(recipe)` - Renderizar tarjeta
- `renderRecipeDetail(id)` - Renderizar detalle
- `renderRecipeForm(id)` - Renderizar formulario
- `showRecipeList()` - Mostrar vista de lista
- `showRecipeDetail(id)` - Mostrar detalle
- `showRecipeForm(id)` - Mostrar formulario
- `hideAllViews()` - Ocultar todas las vistas

### 4.16. Exportación e Importación (~15 funciones)
- `exportRecipeToXML(id)` - Exportar a XML
- `exportRecipeToPDF(id)` - Exportar a PDF
- `exportAllRecipesToXML()` - Exportar todas a XML
- `importRecipesFromXML(file)` - Importar desde XML
- `parseXMLRecipe(xmlElement)` - Parsear XML
- `parseCompactXML(xmlElement)` - Parsear XML compacto
- `shareRecipe(id)` - Compartir receta
- `copyIngredientsToClipboard(id)` - Copiar ingredientes

### 4.17. Gestión de Menús (~30 funciones)
- `renderMenus()` - Renderizar menús
- `renderMenuCard(menu, isHidden)` - Renderizar tarjeta de menú
- `renderMenuItems(menu)` - Renderizar items de menú
- `showMenusView()` - Mostrar vista de menús
- `hideMenusView()` - Ocultar vista de menús
- `showMenuForm(id)` - Mostrar formulario de menú
- `closeMenuModal()` - Cerrar modal de menú
- `addMenuItemInput()` - Añadir input de item
- `saveMenu()` - Guardar menú
- `deleteMenu(id)` - Eliminar menú
- `duplicateMenu(id)` - Duplicar menú
- `toggleMenuEnabled(id)` - Habilitar/deshabilitar menú
- `toggleMenuAsFilter(id)` - Toggle como filtro
- `quickEditMeal(menuId, itemId, mealType)` - Edición rápida
- `openCategorySelectorForMenu(inputElement)` - Abrir selector para menú
- `showMenuOptionsModal(menuId)` - Mostrar opciones
- `closeMenuOptionsModal()` - Cerrar opciones
- `renderMenuFilterChips()` - Renderizar chips de filtro
- `handleMenuFilterClick(menuId)` - Manejar click en filtro
- `clearMenuFilter()` - Limpiar filtro de menú
- `exportMenuToXML(menuId)` - Exportar menú a XML
- `printMenu(menuId)` - Imprimir menú
- `copyMenuToClipboard(menuId)` - Copiar menú

### 4.18. Gestión de Listas de Compra UI (~25 funciones)
- `renderShoppingLists()` - Renderizar listas
- `renderShoppingListCard(list, isHidden)` - Renderizar tarjeta
- `showShoppingListsView()` - Mostrar vista
- `hideShoppingListsView()` - Ocultar vista
- `showShoppingListForm(id)` - Mostrar formulario
- `closeShoppingListModal()` - Cerrar modal
- `saveShoppingList()` - Guardar lista
- `deleteShoppingList(id)` - Eliminar lista
- `toggleShoppingListEnabled(id)` - Habilitar/deshabilitar
- `addShoppingListItem(listId)` - Añadir item
- `editShoppingListItem(listId, itemId)` - Editar item
- `deleteShoppingListItem(listId, itemId)` - Eliminar item
- `toggleShoppingListItemCompleted(listId, itemId)` - Toggle completado
- `copyShoppingListToClipboard(listId)` - Copiar lista
- `showShoppingListOptionsModal(listId)` - Mostrar opciones
- `closeShoppingListOptionsModal()` - Cerrar opciones

### 4.19. Ordenamiento y Búsqueda (~10 funciones)
- `sortRecipesByName(recipes, order)` - Ordenar por nombre
- `sortRecipesByDate(recipes, order)` - Ordenar por fecha
- `toggleSortOrder(sortBy)` - Toggle orden
- `updateSortIndicators()` - Actualizar indicadores
- `searchRecipes(query)` - Buscar recetas
- `highlightSearchTerm(text, query)` - Resaltar término

### 4.20. Tema y Configuración (~5 funciones)
- `toggleTheme()` - Cambiar tema
- `loadTheme()` - Cargar tema
- `saveTheme(theme)` - Guardar tema
- `applyTheme(theme)` - Aplicar tema

### 4.21. Notificaciones y Feedback (~5 funciones)
- `showToast(message, type)` - Mostrar notificación toast
- `showError(message)` - Mostrar error
- `showSuccess(message)` - Mostrar éxito
- `showWarning(message)` - Mostrar advertencia
- `showInfo(message)` - Mostrar información

### 4.22. Navegación y Vistas (~10 funciones)
- `goToHome()` - Ir a inicio
- `goToRecipes()` - Ir a recetas
- `goToMenus()` - Ir a menús
- `goToShoppingLists()` - Ir a listas
- `goToSettings()` - Ir a configuración
- `updateActiveView(viewName)` - Actualizar vista activa
- `toggleViewMode()` - Toggle modo de vista (grid/list)

---

## 📊 Resumen por Categoría

| Categoría | Funciones | Descripción |
|-----------|-----------|-------------|
| **DebugLogger** | 4 | Sistema de logging |
| **CategoryManager** | ~20 | Gestión de categorías |
| **ShoppingListManager** | ~20 | Gestión de listas de compra |
| **RecipeApp - Inicialización** | ~10 | Setup y configuración |
| **RecipeApp - Tiempo** | ~5 | Gestión de tiempo |
| **RecipeApp - Utilidades** | ~5 | Funciones auxiliares |
| **RecipeApp - Filtros** | ~10 | Sistema de filtrado |
| **RecipeApp - Categorías UI** | ~35 | Interfaz de categorías |
| **RecipeApp - Modales** | ~10 | Gestión de modales |
| **RecipeApp - Formularios** | ~30 | Gestión de formularios |
| **RecipeApp - Ingredientes** | ~20 | CRUD de ingredientes |
| **RecipeApp - Secuencias** | ~20 | CRUD de secuencias |
| **RecipeApp - Multimedia** | ~15 | Gestión de imágenes |
| **RecipeApp - Recetas CRUD** | ~25 | CRUD de recetas |
| **RecipeApp - Recetas UI** | ~20 | Renderizado de recetas |
| **RecipeApp - Import/Export** | ~15 | Exportación e importación |
| **RecipeApp - Menús** | ~30 | Gestión de menús |
| **RecipeApp - Listas UI** | ~25 | Interfaz de listas |
| **RecipeApp - Ordenamiento** | ~10 | Ordenar y buscar |
| **RecipeApp - Tema** | ~5 | Gestión de tema |
| **RecipeApp - Notificaciones** | ~5 | Sistema de notificaciones |
| **RecipeApp - Navegación** | ~10 | Navegación entre vistas |
| **TOTAL** | **309** | |

---

## 💡 Recomendaciones de Refactorización

Dado el tamaño del archivo (12,694 líneas), se recomienda:

1. **Separar RecipeApp en módulos:**
   - `RecipeManager.js` - CRUD de recetas
   - `UIManager.js` - Renderizado y vistas
   - `FormManager.js` - Gestión de formularios
   - `FilterManager.js` - Sistema de filtrado
   - `MenuManager.js` - Ya existe, integrar mejor
   - `ModalManager.js` - Gestión de modales

2. **Extraer utilidades:**
   - `TimeUtils.js` - Funciones de tiempo
   - `ValidationUtils.js` - Validaciones
   - `FormatUtils.js` - Formateo de datos

3. **Separar componentes UI:**
   - `RecipeCard.js`
   - `RecipeDetail.js`
   - `RecipeForm.js`
   - `CategorySelector.js`

4. **Beneficios esperados:**
   - Reducción de ~70% en tamaño de script.js
   - Mejor mantenibilidad
   - Más fácil de testear
   - Carga más rápida (lazy loading)

---

## 📝 Notas

- Este mapa fue generado automáticamente analizando el código
- Algunas funciones pueden tener nombres similares pero diferentes propósitos
- La categorización es aproximada y puede variar según el contexto
- Se recomienda revisar el código fuente para detalles específicos

---

**Generado:** 12 de noviembre de 2025  
**Herramienta:** Análisis automático de código
