# Secciones de la Web - Documentación Completa

La aplicación de recetas tiene **5 secciones principales** (vistas) y **15 modales**.

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
- **Input hidden:** `recipe-category`
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

- **Input file:** `image-upload` (hidden)
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
- **Input file:** `import-shopping-list-input` (hidden)

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
- **Input file:** `import-menu-input` (hidden)

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

