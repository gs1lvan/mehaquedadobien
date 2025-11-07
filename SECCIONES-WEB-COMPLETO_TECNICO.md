# Secciones de la Web - Documentación Completa y Técnica

La aplicación de recetas tiene **5 secciones principales** (vistas) y **15 modales**.

**Leyenda:**
- 🔒 = Elemento oculto por defecto (`display: none` o `hidden` class)
- ✅ = Elemento visible
- 📱 = Solo visible en móvil
- 🖥️ = Solo visible en desktop

---

## 1. 📖 Lista de Recetas (recipe-list-view)
**ID técnico:** `recipe-list-view`  
**Vista principal / Home**

### ¿Qué muestra?
- Grid de tarjetas con todas las recetas
- Filtros por categoría (chips en la parte superior)
- Contador de recetas
- Botones de vista (Grid/Lista)
- Empty state si no hay recetas

### Elementos principales:

#### Header de filtros
- **Botón de filtros:** `toggle-filters-btn` - 🔍 Filtros
- **Toggle vista Grid:** `view-grid-btn` - 🔲
- **Toggle vista Lista:** `view-list-btn` - ☰
- **Contador:** `recipe-count-text` - "X recetas"

#### Header de lista (solo visible en vista lista)
- **ID técnico:** `list-view-header`
- Columnas ordenables:
  - `sort-by-name` - Ordenar por NOMBRE
  - `sort-by-date` - Ordenar por FECHA

#### Grid de recetas
- **ID técnico:** `recipes-grid`
- Contiene tarjetas de recetas dinámicas

#### Filtros de categoría
- **ID técnico:** `category-filters`
- Chips dinámicos por cada categoría

#### Empty state
- **ID técnico:** `empty-state`
- Mensaje cuando no hay recetas

### Botones y Controles

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| 🔍 Filtros | `toggle-filters-btn` | Mostrar/ocultar filtros |
| 🔲 Vista Grid | `view-grid-btn` | Cambiar a vista de tarjetas |
| ☰ Vista Lista | `view-list-btn` | Cambiar a vista de lista |
| Chip de categoría | (dinámico) | Filtrar por categoría |
| ➕ Nueva Receta | `new-recipe-btn` | Abrir formulario (desde menú) |

### Elementos en cada tarjeta de receta

| Elemento | Clase/ID | Función |
|----------|----------|---------|
| Badge 📋 | `.recipe-ingredients-badge` | Copiar ingredientes |
| Badge ⚙️ | `.recipe-options-badge` | Abrir menú de opciones |
| Badge ⏱️ | `.recipe-time-badge` | Mostrar tiempo total |
| Imagen | `.recipe-image` | Ver detalle al click |
| Nombre | `.recipe-name` | Ver detalle al click |
| Categoría | `.recipe-category` | Mostrar categoría |

### Funcionalidades:
- Click en tarjeta → Ver detalle
- Click en filtro → Filtrar por categoría
- Click en badge 📋 → Copiar ingredientes
- Click en badge ⚙️ → Abrir `recipe-options-modal`
- Click en columna (vista lista) → Ordenar
- Ordenar por nombre: A-Z → Z-A → Default
- Ordenar por fecha: Nuevo-Viejo → Viejo-Nuevo → Default

---

## 2. 📄 Detalle de Receta (recipe-detail-view)
**ID técnico:** `recipe-detail-view`  
**Vista de lectura de una receta**

### ¿Qué muestra?
- Información completa de una receta seleccionada
- Modo lectura (no editable directamente)

### Elementos principales:

#### Header
- **Botón volver:** `back-to-list-btn` - ◀
- **Nombre receta:** `detail-recipe-name` - (editable al click)
- **Categoría:** `detail-category`
- **Tiempo total:** `detail-total-time`

#### Botones de acción
- **Eliminar:** `delete-recipe-btn`
- **Compartir:** `share-recipe-btn`
- **Exportar XML:** `export-xml-btn`
- **Exportar PDF:** `export-pdf-btn`

#### Contenido

**Galería multimedia:**
- **ID técnico:** `detail-multimedia-section`
- **Contenedor:** `detail-images-gallery`
- Muestra fotos y videos
- Si 2+ imágenes → Galería con navegación

**Método de preparación:**
- **ID técnico:** `detail-appliances-section`
- **Contenedor:** `detail-appliances-chips`
- Chips de aparatos de cocina

**Ingredientes:**
- **Lista:** `detail-ingredients-list`
- **Empty state:** `detail-no-ingredients`

**Secuencias:**
- **ID técnico:** `detail-sequences-section`
- **Contenedor:** `detail-sequences-list`

**Información adicional:**
- **Autor:** `detail-author-section` / `detail-author`
- **Historia:** `detail-history-section` / `detail-history`
- **Fecha creación:** `detail-created-at`
- **Fecha modificación:** `detail-updated-at`
- **ID receta:** `detail-recipe-id`

### Botones y Controles

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ◀ Volver | `back-to-list-btn` | Volver a lista de recetas |
| Eliminar | `delete-recipe-btn` | Eliminar receta (con confirmación) |
| Compartir | `share-recipe-btn` | Compartir receta |
| Exportar | `export-xml-btn` | Descargar XML de la receta |
| PDF | `export-pdf-btn` | Descargar PDF de la receta |
| Nombre (click) | `detail-recipe-name` | Editar receta |

### Funcionalidades:
- Click en nombre → Abrir formulario de edición
- Click en Eliminar → Confirmación → Eliminar receta
- Click en Compartir → Compartir receta (Web Share API)
- Click en Exportar → Descargar archivo XML
- Click en PDF → Generar y descargar PDF
- Navegación en galería (si múltiples imágenes):
  - Botones ← → para navegar
  - Miniaturas clickeables
  - Teclado: Arrow Left/Right, Home, End

---

## 3. ✏️ Formulario de Receta (recipe-form-view)
**ID técnico:** `recipe-form-view`  
**Vista de creación/edición**

### ¿Qué muestra?
- Formulario completo para crear o editar recetas
- Múltiples secciones colapsables

### Elementos principales:

#### Header
- **Nombre receta:** `recipe-name` - (contenteditable)
- **Botón cerrar:** `close-form-btn` - ✕
- **Botón guardar (top):** `save-recipe-btn-top` - 💾 Guardar

### Secciones del formulario:

#### 📝 Información Básica

**Categoría:**
- **Chip selector:** `recipe-category-chip`
- **Input hidden:** `recipe-category` 🔒 (oculto, almacena el ID de categoría)
- **Display:** `selected-category-display`
- Click → Abre `category-selector-modal`

**Tiempo Total:**
- **Horas:** `recipe-hours`
- **Minutos:** `recipe-minutes`

**Checkboxes especiales:**
- **Caravana:** `recipe-caravan-friendly` - 🚐
- **Hospital:** `recipe-hospital-friendly` - 🏥
- **Menú:** `recipe-menu-friendly` - 🍽️

#### 🥘 Ingredientes
**ID sección:** `ingredients-section-title` (colapsable)

**Formulario añadir:**
- **Nombre:** `ingredient-name` (con autocomplete)
- **Cantidad:** `ingredient-quantity`
- **Unidad:** `ingredient-unit`
- **Botón añadir:** `add-ingredient-btn` - ➕ Añadir Ingrediente
- **Error:** `ingredient-error`
- **Autocomplete:** `ingredient-autocomplete`

**Lista:**
- **Contenedor:** `ingredients-list`
- **Empty state:** `ingredients-empty`

#### 👨‍🍳 Método de Preparación
**ID sección:** `appliances-section-title` (colapsable)

**Chips de aparatos:**
- **Contenedor:** `kitchen-appliances-chips`
- Chips dinámicos para cada aparato

#### 🔢 Secuencias de Adición
**ID sección:** `sequences-section-title` (colapsable)

**Formulario añadir:**
- **Chips ingredientes:** `sequence-ingredients-chips`
- **Descripción:** `sequence-description`
- **Botones acciones:** `cooking-actions-buttons`
- **Botones ingredientes:** `ingredient-action-buttons`
- **Horas:** `sequence-hours`
- **Minutos:** `sequence-minutes`
- **Botón añadir:** `add-sequence-btn` - ➕ Añadir Secuencia
- **Error:** `sequence-error`

**Lista:**
- **Contenedor:** `sequences-list`
- **Empty state:** `sequences-empty`

#### ℹ️ Información Adicional
**ID sección:** `additional-info-section-title` (colapsable)

- **Autor:** `recipe-author`
- **Historia:** `recipe-history`

#### 📸 Multimedia
**ID sección:** `multimedia-section-title` (colapsable)

- **Input file:** `upload-images-input` 🔒 (oculto, `style="display: none;"`)
- **Botón subir:** `upload-image-btn` - 📷 Añadir Imágenes
- **Galería:** `media-gallery`

### Botones y Controles

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-form-btn` | Cerrar formulario |
| 💾 Guardar (top) | `save-recipe-btn-top` | Guardar receta |
| 💾 Guardar (bottom) | `save-recipe-btn` | Guardar receta |
| Chip categoría | `recipe-category-chip` | Abrir selector de categoría |
| ➕ Añadir Ingrediente | `add-ingredient-btn` | Añadir ingrediente a lista |
| ➕ Añadir Secuencia | `add-sequence-btn` | Añadir secuencia a lista |
| 📷 Añadir Imágenes | `upload-image-btn` | Abrir selector de archivos |
| Acción cocina | `.cooking-action-btn` | Insertar texto en descripción |
| Chip aparato | `.appliance-chip` | Toggle selección de aparato |

### Funcionalidades:
- Autocompletado de ingredientes (predefinidos)
- Botones de acciones de cocina (insertan texto)
- Botones de ingredientes (insertan nombre)
- Reordenar ingredientes (botones ↑ ↓)
- Reordenar secuencias (botones ↑ ↓)
- Editar ingrediente/secuencia (botón ✏️)
- Eliminar ingrediente/secuencia (botón 🗑️)
- Secciones colapsables (click en título)
- Validación de campos
- Guardar receta (crea nueva o actualiza existente)

---

## 4. 🛒 Listas de Compra (shopping-lists-view)
**ID técnico:** `shopping-lists-view`  
**Vista de gestión de listas de compra**

### ¿Qué muestra?
- Todas las listas de compra creadas
- Cada lista es expandible/colapsable

### Elementos principales:

#### Header
- **Título:** "🛒 Listas de Compra"
- **Botón cerrar:** `close-shopping-lists-btn` - ✕
- **Nueva lista:** `new-shopping-list-btn` - ➕ Nueva Lista
- **Importar lista:** `import-shopping-list-btn` - 📥 Importar Lista
- **Input file:** `import-shopping-list-input` 🔒 (oculto, `style="display: none;"`)

#### Contenido
- **Contenedor:** `shopping-lists-container`
- **Empty state:** `shopping-lists-empty`

### Elementos en cada tarjeta de lista

Cada lista tiene:
- Nombre de la lista
- Contador (X/Y completados)
- Botón expandir/colapsar
- Botones de acción (en menú contextual):
  - 📋 Copiar
  - ✏️ Editar
  - 📋 Duplicar
  - 📤 Exportar
  - 🗑️ Eliminar
  - 👁️ Ocultar/Mostrar
- Lista de elementos (cuando expandida):
  - Checkbox para marcar completado
  - Nombre del elemento
  - Cantidad
  - Botones ↑ ↓ para reordenar

### Botones y Controles

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-shopping-lists-btn` | Volver a lista de recetas |
| ➕ Nueva Lista | `new-shopping-list-btn` | Abrir `shopping-list-modal` |
| 📥 Importar Lista | `import-shopping-list-btn` | Importar desde archivo |
| Badge ⚙️ | (dinámico) | Abrir `shopping-list-options-modal` |
| Checkbox | (dinámico) | Marcar/desmarcar completado |
| ↑ Subir | (dinámico) | Mover elemento arriba |
| ↓ Bajar | (dinámico) | Mover elemento abajo |

### Funcionalidades:
- Crear nueva lista → Abre modal
- Importar lista desde archivo .txt
- Expandir/colapsar lista (click en header)
- Marcar elementos como completados
- Reordenar elementos (botones ↑ ↓)
- Copiar lista al portapapeles
- Editar lista → Abre modal
- Duplicar lista
- Exportar lista a archivo .txt
- Eliminar lista (con confirmación)
- Ocultar/mostrar lista (toggle enabled)

---

## 5. 📋 Menús (menus-view)
**ID técnico:** `menus-view`  
**Vista de gestión de menús**

### ¿Qué muestra?
- Menús semanales o planificación de comidas
- Estructura similar a listas de compra

### Elementos principales:

#### Header
- **Título:** "📋 Menús"
- **Botón cerrar:** `close-menus-btn` - ✕
- **Nuevo menú:** `new-menu-btn` - ➕ Nuevo Menú
- **Importar menú:** `import-menu-btn` - 📥 Importar Menú
- **Input file:** `import-menu-input` 🔒 (oculto, `style="display: none;"`)

#### Contenido
- **Contenedor:** `menus-container`
- Tarjetas de menús (similar a listas)

### Botones y Controles

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-menus-btn` | Volver a lista de recetas |
| ➕ Nuevo Menú | `new-menu-btn` | Abrir `menu-modal` |
| 📥 Importar Menú | `import-menu-btn` | Importar desde archivo |
| Badge ⚙️ | (dinámico) | Abrir `menu-options-modal` |

### Funcionalidades:
- Crear nuevo menú
- Importar menú desde archivo
- Planificar comidas por día
- Asignar recetas a días
- Editar menú
- Duplicar menú
- Exportar menú
- Eliminar menú

---



---

# ELEMENTOS OCULTOS POR DEFECTO

Esta sección lista todos los elementos que están ocultos por defecto y se activan mediante JavaScript.

## Inputs de Archivo (File Inputs)

| ID Técnico | Ubicación | Propósito | Estado |
|-----------|-----------|-----------|--------|
| `xml-file-input` | Header | Importar recetas XML | 🔒 `style="display: none;"` |
| `upload-images-input` | Formulario receta | Subir imágenes | 🔒 `style="display: none;"` |
| `upload-videos-input` | Formulario receta | Subir videos | 🔒 `style="display: none;"` |
| `import-shopping-list-input` | Vista listas | Importar lista | 🔒 `style="display: none;"` |
| `import-menu-input` | Vista menús | Importar menú | 🔒 `style="display: none;"` |

## Inputs Hidden (Almacenamiento de datos)

| ID Técnico | Ubicación | Propósito | Estado |
|-----------|-----------|-----------|--------|
| `recipe-category` | Formulario receta | Almacenar ID de categoría | 🔒 `type="hidden"` |

## Vistas Ocultas por Defecto

| ID Técnico | Clase | Se muestra cuando |
|-----------|-------|-------------------|
| `recipe-detail-view` | `recipe-detail hidden` | Usuario hace click en una receta |
| `recipe-form-view` | `recipe-form hidden` | Usuario crea/edita receta |
| `shopping-lists-view` | `view-container hidden` | Usuario abre listas de compra |
| `menus-view` | `view-container hidden` | Usuario abre menús |

## Modales Ocultos por Defecto

Todos los modales tienen la clase `modal hidden` y se muestran al activarse:

| ID Técnico | Se muestra cuando |
|-----------|-------------------|
| `category-modal` | Click en "Gestionar Categorías" |
| `edit-category-modal` | Click en editar categoría |
| `category-options-modal` | Click en opciones de categoría |
| `emoji-picker-modal` | Click en seleccionar emoji |
| `color-picker-modal` | Click en seleccionar color |
| `category-selector-modal` | Click en chip de categoría |
| `image-modal` | Click en imagen de receta |
| `shopping-list-modal` | Click en nueva/editar lista |
| `menu-modal` | Click en nuevo/editar menú |
| `select-shopping-list-modal` | Click en añadir a lista |
| `shopping-list-options-modal` | Click en opciones de lista |
| `menu-options-modal` | Click en opciones de menú |
| `menu-category-selector-modal` | Click en seleccionar categorías |
| `recipe-options-modal` | Click en opciones de receta |
| `settings-modal` | Click en "Configuración" |

## Elementos Condicionales

Estos elementos se muestran/ocultan según condiciones:

| Elemento | ID/Clase | Condición para mostrarse |
|----------|----------|-------------------------|
| Filtros | `filters-container hidden` | Click en "🔍 Filtros" |
| Header de lista | `list-view-header hidden` | Vista de lista activa |
| Empty state | `empty-state hidden` | No hay recetas |
| Ingredientes empty | `ingredients-empty hidden` | No hay ingredientes |
| Secuencias empty | `sequences-empty hidden` | No hay secuencias |
| Multimedia empty | `media-empty hidden` | No hay multimedia |
| Sección multimedia | `detail-multimedia-section` | Receta tiene imágenes/videos |
| Sección aparatos | `detail-appliances-section` | Receta tiene aparatos |
| Sección secuencias | `detail-sequences-section` | Receta tiene secuencias |
| Info adicional | `detail-additional-info-section` | Receta tiene autor/historia |

## Elementos Ocultos en Móvil

Estos elementos se ocultan automáticamente en pantallas pequeñas (< 768px):

| Elemento | Clase CSS | Motivo |
|----------|-----------|--------|
| Preview de receta | `.recipe-preview` | Espacio limitado |
| Tooltip de edición | `.recipe-name-tooltip` | No hay hover en móvil |
| Número de orden | `.ingredient-order` | Espacio limitado |
| Número de paso | `.sequence-step` | Espacio limitado |
| Botones de cocina | `.cooking-buttons-section` | Espacio limitado |
| Metadata | `.detail-metadata` | Información secundaria |

## Elementos Permanentemente Ocultos

Estos elementos están ocultos con `display: none !important`:

| Elemento | Clase CSS | Motivo |
|----------|-----------|--------|
| Header actions desktop | `.header-actions` | Reemplazado por menú hamburguesa |
| Metadata de receta | `.detail-metadata` | Información de desarrollo |
| Grid de metadata | `.metadata-grid` | Información de desarrollo |

---

# ELEMENTOS COMENTADOS EN EL CÓDIGO

Estos elementos están comentados en el HTML y **NO están disponibles** en la aplicación:

## ⏱️ Filtro de Tiempo (TEMPORALMENTE OCULTO)

**Estado:** 💤 Comentado desde 2025-11-04  
**Ubicación:** Dentro de `filters-container`, después de los filtros de categoría  
**ID técnico:** `time-filter-bar`

### ¿Qué era?
Un filtro para buscar recetas por tiempo de preparación.

### Chips que tenía:
- Todos
- ⏱️ 15 min
- ⏱️ 30 min
- ⏱️ 45 min
- ⏱️ 1h
- ⏱️ 2h
- ⏱️ 3h

### ¿Por qué está comentado?
Temporalmente deshabilitado. Puede ser reactivado eliminando los comentarios `<!-- -->` en el HTML.

### Código comentado:
```html
<!-- TEMPORALMENTE OCULTO - Filtro de tiempo (2025-11-04)
<section id="time-filter-bar" class="filter-bar">
    <h2 class="filter-title">Filtrar por tiempo:</h2>
    <div class="filter-chips" id="time-filter-chips">
        <button class="filter-chip active" data-time="all">Todos</button>
        <button class="filter-chip" data-time="15">⏱️ 15 min</button>
        <button class="filter-chip" data-time="30">⏱️ 30 min</button>
        <button class="filter-chip" data-time="45">⏱️ 45 min</button>
        <button class="filter-chip" data-time="60">⏱️ 1h</button>
        <button class="filter-chip" data-time="120">⏱️ 2h</button>
        <button class="filter-chip" data-time="180">⏱️ 3h</button>
    </div>
</section>
-->
```

---

**Nota:** Los elementos marcados con 🔒 requieren JavaScript para activarse. Si JavaScript está deshabilitado, estos elementos no funcionarán.


---

# REFERENCIA DE JAVASCRIPT

Esta sección documenta qué métodos de JavaScript se ejecutan al interactuar con cada elemento.

## Clase Principal: `RecipeApp`

Todos los métodos están en la clase `RecipeApp` en `script.js`.

---

## BOTONES DEL HEADER Y MENÚ

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| 🍳 mehaquedadobien | `home-link` | `goToHome()` | Volver a lista de recetas |
| ☰ Menú | `menu-btn` | Toggle `menu-dropdown.classList.toggle('active')` | Abrir/cerrar menú |
| Nueva Receta | `new-recipe-btn` | `showRecipeForm()` | Abrir formulario vacío |
| Recetas | `recipes-btn` | `goToHome()` | Ir a lista de recetas |
| Menús | `menus-btn` | `showMenusView()` | Abrir vista de menús |
| Listas de Compra | `shopping-lists-btn` | `showShoppingListsView()` | Abrir vista de listas |
| Configuración | `settings-btn` | `openSettingsModal()` | Abrir modal de configuración |

---

## BOTONES DE LISTA DE RECETAS

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| 🔍 Filtros | `toggle-filters-btn` | `toggleFilters()` | Mostrar/ocultar filtros |
| 🔲 Vista Grid | `view-grid-btn` | `setViewMode('grid')` | Cambiar a vista tarjetas |
| ☰ Vista Lista | `view-list-btn` | `setViewMode('list')` | Cambiar a vista lista |
| Nueva Receta (home) | `new-recipe-btn-home` | `showRecipeForm()` | Abrir formulario vacío |
| Chip de filtro | `.filter-chip` | `handleFilterClick(target)` | Filtrar por categoría |
| NOMBRE (ordenar) | `sort-by-name` | `toggleSort('name')` | Ordenar por nombre |
| FECHA (ordenar) | `sort-by-date` | `toggleSort('date')` | Ordenar por fecha |

---

## BADGES EN TARJETAS DE RECETAS

| Badge | Clase | Método JavaScript | Descripción |
|-------|-------|-------------------|-------------|
| 📋 Ingredientes | `.recipe-ingredients-badge` | `copyIngredientsToClipboard(recipe, event)` | Copiar ingredientes |
| ⋮ Opciones | `.recipe-options-badge` | `showRecipeOptionsModal(recipeId)` | Abrir menú de opciones |
| 📤 Compartir | `.recipe-share-btn` | `shareRecipe(recipeId)` | Compartir receta |

---

## BOTONES DE DETALLE DE RECETA

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ◀ Volver | `back-to-list-btn` | `goToHome()` | Volver a lista |
| Eliminar | `delete-recipe-btn` | `deleteRecipe(recipeId)` | Eliminar receta |
| Compartir | `share-recipe-btn` | `shareRecipe(recipeId)` | Compartir receta |
| Exportar | `export-xml-btn` | `exportRecipeXML(recipeId)` | Exportar a XML |
| PDF | `export-pdf-btn` | `exportRecipePDF(recipeId)` | Exportar a PDF |
| Nombre (editar) | `detail-recipe-name` | `editRecipe(recipeId)` | Abrir formulario de edición |

---

## BOTONES DEL FORMULARIO DE RECETA

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-form-btn` | `closeRecipeForm()` | Cerrar formulario |
| 💾 Guardar (top) | `save-recipe-btn-top` | `handleSaveRecipe(event)` | Guardar receta |
| Chip categoría | `recipe-category-chip` | `showCategorySelectorModal()` | Seleccionar categoría |
| ➕ Añadir Ingrediente | `add-ingredient-btn` | `handleAddIngredient()` | Añadir ingrediente |
| ➕ Añadir Secuencia | `add-sequence-btn` | `handleAddSequence()` | Añadir secuencia |
| 📷 Añadir Imágenes | `upload-images-btn` | Click en `upload-images-input` | Abrir selector de archivos |
| 🎥 Añadir Videos | `upload-videos-btn` | Click en `upload-videos-input` | Abrir selector de archivos |
| 💾 Guardar Receta | `save-recipe-btn` | `handleSaveRecipe(event)` | Guardar receta |
| Cancelar | `cancel-form-btn` | `closeRecipeForm()` | Cerrar sin guardar |
| Botón acción cocina | `.cooking-action-btn` | `insertTextAtCursor(text)` | Insertar texto en descripción |

---

## BOTONES DE LISTAS DE COMPRA

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-shopping-lists-btn` | `hideShoppingListsView()` | Cerrar vista |
| ➕ Nueva Lista | `new-shopping-list-btn` | `showShoppingListForm()` | Abrir formulario |
| 📥 Importar Lista | `import-shopping-list-btn` | Click en `import-shopping-list-input` | Importar archivo |
| 📋 Copiar | (dinámico) | `copyShoppingListToClipboard(listId)` | Copiar lista |
| ✏️ Editar | (dinámico) | `showShoppingListForm(listId)` | Editar lista |
| ⋮ Opciones | (dinámico) | `showShoppingListOptionsModal(listId)` | Abrir opciones |
| 🗑️ Eliminar | (dinámico) | `deleteShoppingList(listId)` | Eliminar lista |
| ↑ Subir | (dinámico) | `moveItemUp(listId, index)` | Reordenar arriba |
| ↓ Bajar | (dinámico) | `moveItemDown(listId, index)` | Reordenar abajo |
| Checkbox | (dinámico) | `toggleItemCompleted(listId, itemId)` | Marcar completado |

---

## BOTONES DE MENÚS

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-menus-btn` | `hideMenusView()` | Cerrar vista |
| ➕ Nuevo Menú | `new-menu-btn` | `showMenuForm()` | Abrir formulario |
| 📥 Importar Menú | `import-menu-btn` | Click en `import-menu-input` | Importar archivo |

---

## MODALES - BOTONES DE APERTURA/CIERRE

| Modal | Abrir con | Cerrar con |
|-------|-----------|------------|
| `category-modal` | `showCategoryModal()` | `closeCategoryModal()` |
| `edit-category-modal` | `showEditCategoryModal(categoryId)` | `closeEditCategoryModal()` |
| `category-options-modal` | `showCategoryOptionsModal(categoryId)` | `closeCategoryOptionsModal()` |
| `emoji-picker-modal` | `openEmojiPickerModal(targetId, valueId)` | `closeEmojiPickerModal()` |
| `color-picker-modal` | `openColorPickerModal(previewId, valueId)` | `closeColorPickerModal()` |
| `category-selector-modal` | `showCategorySelectorModal()` | `closeCategorySelectorModal()` |
| `image-modal` | `showImageModal(imageSrc, images, index)` | `closeImageModal()` |
| `shopping-list-modal` | `showShoppingListForm(listId)` | `closeShoppingListModal()` |
| `menu-modal` | `showMenuForm(menuId)` | `closeMenuModal()` |
| `select-shopping-list-modal` | `showSelectShoppingListModal()` | `closeSelectShoppingListModal()` |
| `shopping-list-options-modal` | `showShoppingListOptionsModal(listId)` | `closeShoppingListOptionsModal()` |
| `menu-options-modal` | `showMenuOptionsModal(menuId)` | `closeMenuOptionsModal()` |
| `menu-category-selector-modal` | `showMenuCategorySelectorModal()` | `closeMenuCategorySelectorModal()` |
| `recipe-options-modal` | `showRecipeOptionsModal(recipeId)` | `closeRecipeOptionsModal()` |
| `settings-modal` | `openSettingsModal()` | `closeSettingsModal()` |

---

## MODAL DE CATEGORÍAS - BOTONES

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-category-modal` | `closeCategoryModal()` | Cerrar modal |
| 😀 Seleccionar Emoji | `open-emoji-picker-btn` | `openEmojiPickerModal('new-category-emoji', 'new-category-emoji-value')` | Abrir selector emoji |
| 🎨 Seleccionar Color | `open-color-picker-btn` | `openColorPickerModal('new-category-color-preview', 'selected-color')` | Abrir selector color |
| ➕ Crear Categoría | `create-category-btn` | `handleCreateCategory()` | Crear categoría |
| ✏️ Editar (dinámico) | - | `showEditCategoryModal(categoryId)` | Editar categoría |
| 🗑️ Eliminar (dinámico) | - | `handleDeleteCategory(categoryId)` | Eliminar categoría |

---

## MODAL DE EDICIÓN DE CATEGORÍA - BOTONES

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-edit-category-modal` | `closeEditCategoryModal()` | Cerrar modal |
| Cancelar | `cancel-edit-category-btn` | `closeEditCategoryModal()` | Cancelar edición |
| 💾 Guardar | `save-edit-category-btn` | `handleSaveEditCategory()` | Guardar cambios |
| 😀 Emoji | `open-edit-emoji-picker-btn` | `openEmojiPickerModal('edit-category-emoji', 'edit-category-emoji-value')` | Cambiar emoji |
| 🎨 Color | `open-edit-color-picker-btn` | `openColorPickerModal('edit-category-color-preview', 'edit-category-color')` | Cambiar color |

---

## MODAL DE SELECTOR DE EMOJI - BOTONES

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-emoji-picker-modal` | `closeEmojiPickerModal()` | Cerrar modal |
| Emoji (dinámico) | `.emoji-option` | `selectEmoji(emoji)` | Seleccionar emoji |

---

## MODAL DE SELECTOR DE COLOR - BOTONES

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-color-picker-modal` | `closeColorPickerModal()` | Cerrar modal |
| Color (dinámico) | `.color-option` | `selectColor(color)` | Seleccionar color |

---

## MODAL DE SELECTOR DE CATEGORÍA - BOTONES

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-category-selector-modal` | `closeCategorySelectorModal()` | Cerrar modal |
| Categoría (dinámico) | `.category-option` | `selectCategory(categoryId)` | Seleccionar categoría |

---

## MODAL DE IMAGEN - BOTONES

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-image-modal` | `closeImageModal()` | Cerrar modal |
| ‹ Anterior | `prev-image-btn` | `navigatePrevImage()` | Imagen anterior |
| › Siguiente | `next-image-btn` | `navigateNextImage()` | Imagen siguiente |

---

## MODAL DE LISTA DE COMPRA - BOTONES

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-shopping-list-modal` | `closeShoppingListModal()` | Cerrar modal |
| ➕ Añadir Elemento | `add-shopping-item-btn` | `addShoppingItemInput()` | Añadir campo de elemento |
| 💾 Guardar | `save-shopping-list-btn` | `saveShoppingList()` | Guardar lista |

---

## MODAL DE CONFIGURACIÓN - BOTONES

| Botón | ID Técnico | Método JavaScript | Descripción |
|-------|-----------|-------------------|-------------|
| ✕ Cerrar | `close-settings-modal` | `closeSettingsModal()` | Cerrar modal |
| 🌙 Tema | `theme-toggle-btn-modal` | `toggleTheme()` | Cambiar tema |
| 🏷️ Categorías | `manage-categories-btn-modal` | `showCategoryModal()` | Abrir gestión categorías |
| 📥 Importar | `import-xml-btn-modal` | `handleImportXMLClick()` | Importar recetas |
| 📤 Exportar | `export-all-btn-modal` | `handleExportAllClick()` | Exportar recetas |

---

## MÉTODOS PRINCIPALES DE LA CLASE RecipeApp

### Navegación
- `goToHome()` - Ir a lista de recetas
- `showRecipeForm(recipeId = null)` - Mostrar formulario (crear o editar)
- `closeRecipeForm()` - Cerrar formulario
- `showRecipeDetail(recipeId)` - Mostrar detalle de receta
- `showShoppingListsView()` - Mostrar vista de listas
- `hideShoppingListsView()` - Ocultar vista de listas
- `showMenusView()` - Mostrar vista de menús
- `hideMenusView()` - Ocultar vista de menús

### Recetas
- `handleSaveRecipe(event)` - Guardar receta (crear o actualizar)
- `deleteRecipe(recipeId)` - Eliminar receta
- `duplicateRecipe(recipeId)` - Duplicar receta
- `editRecipe(recipeId)` - Editar receta
- `shareRecipe(recipeId)` - Compartir receta
- `exportRecipeXML(recipeId)` - Exportar a XML
- `exportRecipePDF(recipeId)` - Exportar a PDF

### Filtros y Ordenamiento
- `handleFilterClick(target)` - Filtrar por categoría
- `toggleFilters()` - Mostrar/ocultar filtros
- `clearAllFilters()` - Limpiar todos los filtros
- `setViewMode(mode)` - Cambiar vista (grid/list)
- `toggleSort(column)` - Ordenar por columna

### Ingredientes
- `handleAddIngredient()` - Añadir ingrediente
- `deleteIngredient(index)` - Eliminar ingrediente
- `editIngredient(index)` - Editar ingrediente
- `reorderIngredients(oldIndex, newIndex)` - Reordenar ingredientes
- `copyIngredientsToClipboard(recipe, event)` - Copiar ingredientes

### Secuencias
- `handleAddSequence()` - Añadir secuencia
- `deleteSequence(index)` - Eliminar secuencia
- `editSequence(index)` - Editar secuencia
- `reorderSequences(oldIndex, newIndex)` - Reordenar secuencias

### Categorías
- `showCategoryModal()` - Abrir modal de categorías
- `closeCategoryModal()` - Cerrar modal de categorías
- `handleCreateCategory()` - Crear categoría
- `handleDeleteCategory(categoryId)` - Eliminar categoría
- `showEditCategoryModal(categoryId)` - Editar categoría
- `handleSaveEditCategory()` - Guardar edición de categoría

### Listas de Compra
- `showShoppingListForm(listId = null)` - Mostrar formulario de lista
- `saveShoppingList()` - Guardar lista
- `deleteShoppingList(listId)` - Eliminar lista
- `toggleItemCompleted(listId, itemId)` - Marcar item completado
- `copyShoppingListToClipboard(listId)` - Copiar lista
- `moveItemUp(listId, index)` - Mover item arriba
- `moveItemDown(listId, index)` - Mover item abajo

### Modales
- `openSettingsModal()` - Abrir configuración
- `closeSettingsModal()` - Cerrar configuración
- `showImageModal(src, images, index)` - Mostrar imagen
- `closeImageModal()` - Cerrar imagen
- `openEmojiPickerModal(targetId, valueId)` - Abrir selector emoji
- `closeEmojiPickerModal()` - Cerrar selector emoji
- `openColorPickerModal(previewId, valueId)` - Abrir selector color
- `closeColorPickerModal()` - Cerrar selector color

### Utilidades
- `toggleTheme()` - Cambiar tema claro/oscuro
- `showToast(message, type)` - Mostrar notificación
- `handleImportXMLClick()` - Importar XML
- `handleExportAllClick()` - Exportar todas las recetas

---

**Nota:** Todos estos métodos están definidos en la clase `RecipeApp` en el archivo `script.js`. Para ver la implementación completa de cualquier método, busca su nombre en ese archivo.
