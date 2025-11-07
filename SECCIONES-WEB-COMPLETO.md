# Secciones de la Web - Documentación Completa y Verificada

**Última verificación:** 2025-11-07  
**Archivo fuente:** index.html

La aplicación de recetas tiene **5 secciones principales** (vistas) y **15 modales**.

---

## ÍNDICE

1. [Secciones Principales](#secciones-principales)
   - Lista de Recetas
   - Detalle de Receta
   - Formulario de Receta
   - Listas de Compra
   - Menús
2. [Modales](#modales)
3. [Header Global](#header-global)
4. [Navegación](#navegación)

---

# SECCIONES PRINCIPALES

## 1. 📖 Lista de Recetas (recipe-list-view)
**ID técnico:** `recipe-list-view`  
**Vista principal / Home**

### ¿Qué muestra?
- Grid de tarjetas con todas las recetas
- Filtros por categoría (chips colapsables)
- Contador de recetas
- Botones de vista (Grid/Lista)
- Empty state si no hay recetas

### Elementos principales:

#### Contenedor de filtros (colapsable)
- **ID:** `filters-container`
- **Clase:** `filters-container hidden`
- Contiene los filtros de categoría

#### Barra de filtros
- **ID:** `filter-bar`
- **Chips de categoría** (se generan dinámicamente)

#### Contador de recetas
- **ID:** `recipe-counter`
- **Texto:** `recipe-count-text`

#### Header de lista (solo en vista lista)
- **ID:** `list-view-header`
- **Columnas:**
  - Imagen (`.list-header-img`)
  - Nombre (`.list-header-name`, ID: `sort-by-name`)
  - Fecha (`.list-header-date`, ID: `sort-by-date`)
  - Acciones (`.list-header-actions`)


#### Grid de recetas
- **ID:** `recipes-grid`
- **Clase:** `recipes-grid`
- Contiene las tarjetas de recetas (generadas dinámicamente)

#### Empty state
- **ID:** `empty-state`
- **Clase:** `empty-state hidden`
- Se muestra cuando no hay recetas

### Botones de esta sección:

| Botón | ID Técnico | Clase | Función |
|-------|-----------|-------|---------|
| 🔍 Filtros | `toggle-filters-btn` | `btn-toggle-filters` | Mostrar/ocultar filtros |
| 🔲 Vista Grid | `view-grid-btn` | `btn-view-toggle active` | Cambiar a vista de tarjetas |
| ☰ Vista Lista | `view-list-btn` | `btn-view-toggle` | Cambiar a vista de lista |
| Nueva Receta (home) | `new-recipe-btn-home` | `btn-new-recipe-home` | Abrir formulario de nueva receta |
| Todas (filtro) | - | `filter-chip` | Mostrar todas las recetas |
| Chips de categoría | - | `filter-chip` | Filtrar por categoría (dinámicos) |
| Crear Primera Receta | - | `btn-primary` | Abrir formulario (en empty state) |

### Elementos dinámicos en tarjetas:

Cada tarjeta de receta contiene:
- **Badge de ingredientes** (📋): Copiar ingredientes
- **Badge de opciones** (⋮): Abrir menú de opciones
- **Imagen**: Click para ver detalle
- **Nombre**: Click para ver detalle
- **Categoría**: Badge con emoji y nombre
- **Tiempo total**: Si está definido

---

## 2. 📄 Detalle de Receta (recipe-detail-view)
**ID técnico:** `recipe-detail-view`  
**Vista de lectura de una receta**

### ¿Qué muestra?
- Información completa de una receta seleccionada
- Modo lectura (no editable directamente)

### Elementos principales:

#### Header del detalle
- **Clase:** `detail-header`
- Contiene botón volver y acciones

#### Contenido del detalle
- **Clase:** `detail-content`
- Contiene todas las secciones de información

#### Secciones de contenido:
1. **Multimedia** (ID: `detail-multimedia-section`)
   - Galería de imágenes: `detail-images-gallery`
   
2. **Método de Preparación** (ID: `detail-appliances-section`)
   - Chips de aparatos: `detail-appliances-chips`
   
3. **Ingredientes** (siempre visible)
   - Lista: `detail-ingredients-list`
   - Empty: `detail-no-ingredients`
   
4. **Secuencias** (ID: `detail-sequences-section`)
   - Lista: `detail-sequences-list`
   
5. **Información Adicional** (ID: `detail-additional-info-section`)
   - Autor: `detail-author-section` / `detail-author`
   - Historia: `detail-history-section` / `detail-history`
   
6. **Metadata**
   - Fecha creación: `detail-created-at`
   - Última modificación: `detail-updated-at`
   - ID receta: `detail-recipe-id`


### Botones de esta sección:

| Botón | ID Técnico | Clase | Función |
|-------|-----------|-------|---------|
| ◀ Volver | `back-to-list-btn` | `btn-icon` | Volver a lista de recetas |
| Eliminar | `delete-recipe-btn` | `btn-action btn-action-compact btn-danger` | Eliminar receta |
| Compartir | `share-recipe-btn` | `btn-action btn-action-compact` | Compartir receta |
| Exportar | `export-xml-btn` | `btn-action btn-action-compact` | Exportar a XML |
| PDF | `export-pdf-btn` | `btn-action btn-action-compact` | Exportar a PDF |

### Elementos interactivos:

- **Nombre de receta** (ID: `detail-recipe-name`): Click para editar
- **Categoría** (ID: `detail-category`): Badge con emoji y nombre
- **Tiempo total** (ID: `detail-total-time`): Badge con tiempo
- **Galería de fotos**: Navegación con flechas si hay múltiples imágenes

---

## 3. ✏️ Formulario de Receta (recipe-form-view)
**ID técnico:** `recipe-form-view`  
**Vista de creación/edición**

### ¿Qué muestra?
- Formulario completo para crear o editar recetas
- Múltiples secciones colapsables

### Elementos principales:

#### Header del formulario
- **Clase:** `form-header`
- **Título editable** (ID: `recipe-name`, clase: `editable-title`)

#### Acciones del formulario (top)
- **ID:** `form-actions`
- Botón guardar superior

#### Formulario
- **ID:** `recipe-form`
- **Clase:** `recipe-form-content`

### Secciones del formulario:

#### 1. Información Básica
**Clase:** `form-section`

**Elementos:**
- **Categoría:**
  - Chip: `recipe-category-chip`
  - Display: `selected-category-display`
  - Input hidden: `recipe-category`
  
- **Tiempo Total:**
  - Horas: `recipe-hours`
  - Minutos: `recipe-minutes`
  
- **Checkboxes:**
  - Caravana: `recipe-caravan-friendly`
  - Hospital: `recipe-hospital-friendly`
  - Menú: `recipe-menu-friendly`

#### 2. Ingredientes
**Título ID:** `ingredients-section-title`  
**Contenido ID:** `ingredients-collapsible-content`

**Elementos:**
- Contenedor: `ingredients-container`
- Nombre: `ingredient-name`
- Cantidad: `ingredient-quantity`
- Unidad: `ingredient-unit`
- Autocomplete: `ingredient-autocomplete`
- Lista: `ingredients-list`
- Empty: `ingredients-empty`
- Error: `ingredient-error`


#### 3. Método de Preparación (Aparatos de Cocina)
**Título ID:** `appliances-section-title`  
**Contenido ID:** `appliances-collapsible-content`

**Elementos:**
- Chips: `kitchen-appliances-chips`

#### 4. Secuencias de Adición
**Título ID:** `sequences-section-title`  
**Contenido ID:** `sequences-collapsible-content`

**Elementos:**
- Contenedor: `sequences-container`
- Chips de ingredientes: `sequence-ingredients-chips`
- Descripción: `sequence-description`
- Botones de ingredientes: `ingredient-action-buttons`
- Botones de acciones: `cooking-actions-buttons`
- Horas: `sequence-hours`
- Minutos: `sequence-minutes`
- Lista: `sequences-list`
- Empty: `sequences-empty`
- Error: `sequence-error`

#### 5. Información Adicional
**Título ID:** `additional-info-section-title`  
**Contenido ID:** `additional-info-collapsible-content`

**Elementos:**
- Autor: `recipe-author`
- Historia: `recipe-history`

#### 6. Multimedia
**Título ID:** `multimedia-section-title`  
**Contenido ID:** `multimedia-collapsible-content`

**Elementos:**
- Input imágenes: `upload-images-input`
- Input videos: `upload-videos-input`
- Galería imágenes: `images-gallery`
- Galería videos: `videos-gallery`

### Botones de esta sección:

| Botón | ID Técnico | Clase | Función |
|-------|-----------|-------|---------|
| ✕ Cerrar | `close-form-btn` | `btn-icon` | Cerrar formulario |
| 💾 Guardar (top) | `save-recipe-btn-top` | `btn-action btn-action-compact btn-save-top` | Guardar receta |
| Chip de categoría | `recipe-category-chip` | `recipe-category` | Abrir selector de categoría |
| ➕ Añadir Ingrediente | `add-ingredient-btn` | `btn-add-ingredient` | Añadir ingrediente a lista |
| ➕ Añadir Secuencia | `add-sequence-btn` | `btn-add-sequence` | Añadir secuencia a lista |
| 📷 Añadir Imágenes | `upload-images-btn` | `btn-upload-media` | Subir imágenes |
| 🎥 Añadir Videos | `upload-videos-btn` | `btn-upload-media` | Subir videos |
| 💾 Guardar Receta | `save-recipe-btn` | `btn-primary` | Guardar receta (bottom) |
| Cancelar | `cancel-form-btn` | `btn-secondary` | Cancelar y cerrar |

### Botones dinámicos de acciones de cocina:

Cada botón tiene:
- **Clase:** `cooking-action-btn`
- **Atributo:** `data-action="texto"`

Acciones disponibles:
- a la plancha, añadir, cocer, cocinar, cocinar al vapor, desglasar, freír, gratinar, guisar, hornear, lavar, pelar, rebozar, reducir, rehogar, reposar, saltear, sellar, tapar, tostar, retirar, rallar, picar, escaldar, y, ,

---

## 4. 🛒 Listas de Compra (shopping-lists-view)
**ID técnico:** `shopping-lists-view`  
**Vista de gestión de listas de compra**

### ¿Qué muestra?
- Todas las listas de compra creadas
- Cada lista es expandible/colapsable

### Elementos principales:

#### Header
- **Clase:** `shopping-lists-header`
- Título y botón cerrar

#### Contenedor de listas
- **ID:** `shopping-lists-container`
- **Clase:** `shopping-lists-container`

#### Empty state
- **ID:** `shopping-lists-empty`
- **Clase:** `empty-state hidden`


### Botones de esta sección:

| Botón | ID Técnico | Clase | Función |
|-------|-----------|-------|---------|
| ✕ Cerrar | `close-shopping-lists-btn` | `btn-icon` | Cerrar vista de listas |
| ➕ Nueva Lista | `new-shopping-list-btn` | `modal-trigger modal-trigger--option` | Crear nueva lista |
| 📥 Importar Lista | `import-shopping-list-btn` | `modal-trigger modal-trigger--option` | Importar lista desde archivo |

### Input oculto:
- **ID:** `import-shopping-list-input`
- **Tipo:** file
- **Accept:** .txt

### Elementos dinámicos en cada lista:

Cada tarjeta de lista contiene:
- **Header**: Nombre, contador, botón expandir
- **Botones de acción**:
  - 📋 Copiar
  - ✏️ Editar
  - ⋮ Opciones (abre modal)
  - 🗑️ Eliminar
- **Contenido**: Lista de elementos con checkboxes
- **Botones de reordenar**: ↑ ↓ (por elemento)

---

## 5. 📋 Menús (menus-view)
**ID técnico:** `menus-view`  
**Vista de gestión de menús**

### ¿Qué muestra?
- Menús semanales o planificación de comidas
- Estructura similar a listas de compra

### Elementos principales:

#### Header
- **Clase:** `shopping-lists-header`
- Título y botón cerrar

#### Contenedor de menús
- **ID:** `menus-container`
- **Clase:** `shopping-lists-container`

### Botones de esta sección:

| Botón | ID Técnico | Clase | Función |
|-------|-----------|-------|---------|
| ✕ Cerrar | `close-menus-btn` | `btn-icon` | Cerrar vista de menús |
| ➕ Nuevo Menú | `new-menu-btn` | `modal-trigger modal-trigger--option` | Crear nuevo menú |
| 📥 Importar Menú | `import-menu-btn` | `modal-trigger modal-trigger--option` | Importar menú desde archivo |

### Input oculto:
- **ID:** `import-menu-input`
- **Tipo:** file
- **Accept:** .txt

---

# MODALES (VENTANAS EMERGENTES)

La aplicación tiene **15 modales** diferentes:

---

## 1. 🏷️ Modal de Gestión de Categorías
**ID técnico:** `category-modal`  
**Clase:** `modal hidden`

### ¿Qué hace?
Gestionar categorías personalizadas (crear, editar, eliminar)

### Elementos:

#### Header
- **Título** (ID: `category-modal-title`): "Gestionar Categorías"
- **Botón cerrar** (ID: `close-category-modal`): ✕

#### Body
- **Formulario de creación**:
  - Input nombre: `new-category-name`
  - Botón emoji: `select-emoji-btn`
  - Botón color: `select-color-btn`
  - Emoji seleccionado: `selected-emoji-display`
  - Color seleccionado: `selected-color-display`
  
- **Listas**:
  - Categorías predefinidas: `predefined-categories-list`
  - Categorías personalizadas: `custom-categories-list`

### Botones:

| Botón | ID Técnico | Clase | Función |
|-------|-----------|-------|---------|
| ✕ Cerrar | `close-category-modal` | `btn-icon` | Cerrar modal |
| 😀 Seleccionar Emoji | `select-emoji-btn` | `btn-secondary` | Abrir selector de emoji |
| 🎨 Seleccionar Color | `select-color-btn` | `btn-secondary` | Abrir selector de color |
| ➕ Crear Categoría | `create-category-btn` | `btn-primary` | Crear nueva categoría |


---

## 2. ✏️ Modal de Edición de Categoría
**ID técnico:** `edit-category-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-edit-category-modal` | Cerrar modal |
| 💾 Guardar | `save-edit-category-btn` | Guardar cambios |

---

## 3. ⚙️ Modal de Opciones de Categoría
**ID técnico:** `category-options-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-category-options-modal` | Cerrar modal |
| ✏️ Editar | - | Editar categoría |
| 🗑️ Eliminar | - | Eliminar categoría |

---

## 4. 😀 Modal de Selector de Emoji
**ID técnico:** `emoji-picker-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-emoji-picker-modal` | Cerrar modal |
| (Emojis) | - | Seleccionar emoji (dinámicos) |

---

## 5. 🎨 Modal de Selector de Color
**ID técnico:** `color-picker-modal`

### Elementos:
- **Paleta:** `color-palette-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-color-picker-modal` | Cerrar modal |
| (Colores) | - | Seleccionar color (dinámicos) |

---

## 6. 📂 Modal de Selector de Categoría
**ID técnico:** `category-selector-modal`

### Elementos:
- **Grid de categorías:** `category-selector-grid`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-category-selector-modal` | Cerrar modal |
| (Categorías) | - | Seleccionar categoría (dinámicos) |

---

## 7. 🖼️ Modal de Imagen
**ID técnico:** `image-modal`

### Elementos:
- **Overlay:** `image-modal-overlay`
- **Imagen:** `modal-image`
- **Contador:** `modal-image-counter`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-image-modal` | Cerrar modal |
| ‹ Anterior | `prev-image-btn` | Imagen anterior |
| › Siguiente | `next-image-btn` | Imagen siguiente |

---

## 8. 🛒 Modal de Lista de Compra
**ID técnico:** `shopping-list-modal`

### Elementos:
- **Título:** `shopping-list-modal-title`
- **Nombre:** `shopping-list-name-input`
- **Contenedor items:** `shopping-items-container`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-shopping-list-modal` | Cerrar modal |
| ➕ Añadir Elemento | `add-shopping-item-btn` | Añadir elemento |
| 💾 Guardar | `save-shopping-list-btn` | Guardar lista |

---

## 9. 📋 Modal de Menú
**ID técnico:** `menu-modal`

### Elementos:
- **Título:** `menu-modal-title`
- **Nombre:** `menu-name-input`
- **Contenedor:** `menu-items-container`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-menu-modal` | Cerrar modal |
| 💾 Guardar | `save-menu-btn` | Guardar menú |

---

## 10. 🛒 Modal de Seleccionar Lista
**ID técnico:** `select-shopping-list-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-select-list-modal` | Cerrar modal |
| ➕ Nueva Lista | - | Crear nueva lista |

---

## 11. ⚙️ Modal de Opciones de Lista
**ID técnico:** `shopping-list-options-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-options-modal` | Cerrar modal |
| ✏️ Editar | - | Editar lista |
| 📋 Duplicar | - | Duplicar lista |
| 📤 Exportar | - | Exportar lista |
| 🗑️ Eliminar | - | Eliminar lista |

---

## 12. ⚙️ Modal de Opciones de Menú
**ID técnico:** `menu-options-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-menu-options-modal` | Cerrar modal |
| ✏️ Editar | - | Editar menú |
| 📋 Duplicar | - | Duplicar menú |
| 📤 Exportar | - | Exportar menú |
| 🗑️ Eliminar | - | Eliminar menú |

---

## 13. 📂 Modal de Selector de Categorías de Menú
**ID técnico:** `menu-category-selector-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-menu-category-selector-modal` | Cerrar modal |
| ✓ Aplicar | - | Aplicar selección |

---

## 14. ⚙️ Modal de Opciones de Receta
**ID técnico:** `recipe-options-modal`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-recipe-options-modal` | Cerrar modal |
| ✏️ Editar | - | Editar receta |
| 📋 Duplicar | - | Duplicar receta |
| 📤 Compartir | - | Compartir receta |
| 💾 Exportar XML | - | Exportar a XML |
| 📄 Exportar PDF | - | Exportar a PDF |
| 🗑️ Eliminar | - | Eliminar receta |

---

## 15. ⚙️ Modal de Configuración
**ID técnico:** `settings-modal`

### Elementos:
- **Título:** `settings-modal-title`

### Botones:

| Botón | ID Técnico | Función |
|-------|-----------|---------|
| ✕ Cerrar | `close-settings-modal` | Cerrar modal |
| 🌙 Tema | `theme-toggle-btn-modal` | Cambiar tema |
| 🏷️ Categorías | `manage-categories-btn-modal` | Abrir gestión de categorías |
| 📥 Importar | `import-xml-btn-modal` | Importar recetas |
| 📤 Exportar | `export-all-btn-modal` | Exportar recetas |

---

# HEADER GLOBAL

El header está siempre visible en todas las vistas.

## Elementos del Header:

### Logo/Título
- **Elemento:** `<h1>`
- **Link:** `home-link`
- **Texto:** "🍳 mehaquedadobien"

### Menú Hamburguesa
- **Botón:** `menu-btn`
- **Clase:** `menu-btn modal-trigger modal-trigger--button`
- **Icono:** ☰

### Dropdown del Menú
- **ID:** `menu-dropdown`
- **Clase:** `menu-dropdown`

## Botones del Menú:

| Botón | ID Técnico | Clase | Función |
|-------|-----------|-------|---------|
| Nueva Receta | `new-recipe-btn` | `menu-item menu-item-primary` | Abrir formulario |
| Recetas | `recipes-btn` | `menu-item` | Ir a lista de recetas |
| Menús | `menus-btn` | `menu-item` | Abrir vista de menús |
| Listas de Compra | `shopping-lists-btn` | `menu-item` | Abrir vista de listas |
| Configuración | `settings-btn` | `menu-item` | Abrir modal de configuración |

### Input Oculto:
- **ID:** `xml-file-input`
- **Tipo:** file
- **Accept:** .xml

---

# NAVEGACIÓN

## Flujo de Navegación:

```
Lista de Recetas (Home)
    ↓ Click en receta
Detalle de Receta
    ↓ Click en nombre/editar
Formulario de Receta
    ↓ Guardar
Lista de Recetas

Lista de Recetas
    ↓ Menú → "Nueva Receta"
Formulario de Receta
    ↓ Guardar
Lista de Recetas

Lista de Recetas
    ↓ Menú → "Listas de Compra"
Listas de Compra
    ↓ ✕ Cerrar
Lista de Recetas

Lista de Recetas
    ↓ Menú → "Menús"
Menús
    ↓ ✕ Cerrar
Lista de Recetas

Lista de Recetas
    ↓ Menú → "Configuración"
Modal de Configuración
    ↓ ✕ Cerrar
Lista de Recetas
```

---

# RESUMEN DE IDS TÉCNICOS

## Vistas Principales:
1. `recipe-list-view` - Lista de recetas
2. `recipe-detail-view` - Detalle de receta
3. `recipe-form-view` - Formulario de receta
4. `shopping-lists-view` - Listas de compra
5. `menus-view` - Menús

## Modales:
1. `category-modal` - Gestión de categorías
2. `edit-category-modal` - Edición de categoría
3. `category-options-modal` - Opciones de categoría
4. `emoji-picker-modal` - Selector de emoji
5. `color-picker-modal` - Selector de color
6. `category-selector-modal` - Selector de categoría
7. `image-modal` - Visor de imagen
8. `shopping-list-modal` - Formulario de lista
9. `menu-modal` - Formulario de menú
10. `select-shopping-list-modal` - Seleccionar lista
11. `shopping-list-options-modal` - Opciones de lista
12. `menu-options-modal` - Opciones de menú
13. `menu-category-selector-modal` - Selector de categorías de menú
14. `recipe-options-modal` - Opciones de receta
15. `settings-modal` - Configuración

---

**Documento verificado contra:** `index.html`  
**Fecha:** 2025-11-07  
**Estado:** ✅ Completo y verificado
