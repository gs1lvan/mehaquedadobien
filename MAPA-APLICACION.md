# 🗺️ Mapa Completo de la Aplicación mehaquedadobien

> **Última actualización:** 7 de noviembre de 2025  
> **Último cambio:** Mejora de espaciado en modal de configuración - Aumentado margen entre secciones principales  
> Este documento mapea toda la estructura de la aplicación para facilitar el desarrollo y mantenimiento.

---

## 📂 ARQUITECTURA DE ARCHIVOS

```
mehaquedadobien/
├─ index.html ..................... Estructura HTML principal
├─ styles.css ..................... Estilos y diseño visual
├─ script.js ...................... Lógica de aplicación y controladores
├─ models.js ...................... Modelos de datos y gestión de almacenamiento
├─ sw.js .......................... Service Worker (funcionalidad offline)
├─ manifest.json .................. Configuración PWA
└─ xml-constants.js ............... Constantes para XML parsing
```

---

## 🏗️ CLASES Y GESTORES

### 📊 MODELOS DE DATOS (models.js)

| Clase | Descripción |
|-------|-------------|
| `Recipe` | Modelo principal de receta con todos sus campos |
| `Ingredient` | Modelo de ingrediente (nombre, cantidad, unidad) |
| `Sequence` | Modelo de secuencia de adición (pasos numerados) |
| `MediaFile` | Modelo de archivo multimedia (imágenes) |
| `generateUUID()` | Función generadora de IDs únicos |

### 💾 GESTIÓN DE ALMACENAMIENTO (models.js)

| Clase | Descripción |
|-------|-------------|
| `StorageManager` | Gestión de IndexedDB con fallback a localStorage |
| `StorageError` | Clase de errores de almacenamiento |
| `MediaError` | Clase de errores de multimedia |

### 📤 EXPORTACIÓN (models.js)

| Clase | Descripción |
|-------|-------------|
| `XMLExporter` | Exportación de recetas a formato XML |
| `PDFExporter` | Exportación de recetas a formato PDF |
| `ExportError` | Clase de errores de exportación |

### 📥 IMPORTACIÓN (models.js)

| Clase | Descripción |
|-------|-------------|
| `XMLImporter` | Importación de recetas desde XML (3 formatos) |
| `ImportError` | Clase de errores de importación |

### 🎯 CONTROLADOR PRINCIPAL (script.js)

| Clase | Descripción |
|-------|-------------|
| `RecipeApp` | Controlador principal que coordina toda la aplicación |

### 🏷️ GESTIÓN DE CATEGORÍAS (script.js)

| Elemento | Descripción |
|----------|-------------|
| `CategoryManager` | Clase que gestiona categorías predefinidas y personalizadas |
| `PREDEFINED_CATEGORIES` | Array con 19 categorías predefinidas (Carne, Pescado, Verdura, etc.) |
| `CATEGORY_COLORS` | Paleta de 12 colores para categorías personalizadas |
| `EMOJI_CATEGORIES` | Colección de emojis organizados por categoría |

**Categorías Predefinidas:**
- 🍲 Caldo
- 🥩 Carne
- 🌾 Cereales
- 🐷 Cerdo
- 🥚 Con huevo
- 🐰 Conejo
- 🥒 Encurtidos
- 🥒 Escabeche
- 🍎 Fruta
- 🫘 Legumbres
- 🦐 Marisco
- 🐟 Pescado
- 🐔 Pollo
- 🍰 Postres
- 🍅 Salsas
- 🥬 Verdura
- 🚐 Caravana (especial)
- 🏥 Hospital (especial)
- 🍽️ Menú (especial)

### 🛒 GESTIÓN DE LISTAS DE COMPRA (script.js)

| Clase | Descripción |
|-------|-------------|
| `ShoppingListManager` | Gestión completa de listas de compra y sus items |

### 🍳 APARATOS DE COCINA (script.js)

**Constante:** `KITCHEN_APPLIANCES` (12 aparatos predefinidos)

- 🔥 Fuego/Cocina
- 🍳 Sartén
- 🥘 Olla
- 🫕 Olla a presión
- 🍲 Cazuela
- 🔪 Cuchillo
- 🥄 Cuchara de madera
- 🧊 Nevera
- ❄️ Congelador
- 🌡️ Termómetro
- ⚖️ Báscula
- ⏲️ Temporizador

### 🥕 INGREDIENTES (script.js)

**Constante:** `PREDEFINED_INGREDIENTS` - Lista de ingredientes comunes para autocompletado

### 🐛 UTILIDADES (script.js)

| Función/Clase | Descripción |
|---------------|-------------|
| `DebugLogger` | Sistema de logging con niveles configurables (0-4) |
| `showNotification()` | Muestra notificaciones toast temporales |
| `showUpdateNotification()` | Notificación de actualización de PWA disponible |
| `isStandalone()` | Detecta si la app está instalada como PWA |
| `showInstallButton()` | Muestra banner de instalación de PWA |

---

## 🖥️ INTERFAZ DE USUARIO (index.html)

### 📋 HEADER

| ID | Elemento | Descripción |
|----|----------|-------------|
| `home-link` | Link | Logo/título clickeable que vuelve al inicio |
| `menu-btn` | Button | Botón menú hamburguesa (☰) |
| `menu-dropdown` | Div | Menú desplegable con opciones principales |
| `recipes-btn` | Button | Ver todas las recetas |
| `new-recipe-btn` | Button | Crear nueva receta |
| `menus-btn` | Button | Gestionar menús semanales |
| `shopping-lists-btn` | Button | Gestionar listas de compra |
| `settings-btn` | Button | Abrir configuración |
| `xml-file-input` | Input | Input oculto para importar XML |

### 🔍 BARRA DE FILTROS Y CONTROLES

| ID | Elemento | Descripción |
|----|----------|-------------|
| `filter-toggle-container` | Div | Contenedor de controles de filtrado |
| `toggle-filters-btn` | Button | Mostrar/ocultar panel de filtros |
| `clear-all-filters-btn` | Button | Limpiar todos los filtros activos |
| `view-grid-btn` | Button | Cambiar a vista de cuadrícula |
| `view-list-btn` | Button | Cambiar a vista de lista |
| `new-recipe-btn-home` | Button | Crear nueva receta (desde home) |
| `filters-container` | Div | Contenedor colapsable de filtros |
| `filter-bar` | Section | Barra de filtros por categoría |
| `time-filter-bar` | Section | Barra de filtros por tiempo (oculto) |

### 📊 CONTADOR DE RECETAS

| ID | Elemento | Descripción |
|----|----------|-------------|
| `recipe-counter` | Div | Contenedor del contador |
| `recipe-count-text` | Span | Texto con cantidad de recetas |

### 📖 VISTA DE LISTA DE RECETAS

| ID | Elemento | Descripción |
|----|----------|-------------|
| `recipe-list-view` | Section | Contenedor principal de la vista de lista |
| `list-view-header` | Div | Encabezado de columnas (solo en modo lista) |
| `sort-by-name` | Div | Columna ordenable por nombre |
| `sort-by-date` | Div | Columna ordenable por fecha |
| `recipes-grid` | Div | Grid de tarjetas de recetas |
| `empty-state` | Div | Estado vacío cuando no hay recetas |

**Estructura de tarjeta de receta:**
```html
<div class="recipe-card" data-recipe-id="uuid">
  <div class="recipe-image">
    <img src="..." alt="...">
  </div>
  <div class="recipe-content">
    <h3 class="recipe-name">...</h3>
    <span class="recipe-category">...</span>
    <p class="recipe-preview">...</p>
  </div>
  <div class="recipe-actions">
    <button class="recipe-options-btn">⋮</button>
  </div>
</div>
```

### 🔎 VISTA DE DETALLE DE RECETA

| ID | Elemento | Descripción |
|----|----------|-------------|
| `recipe-detail-view` | Section | Contenedor principal de vista de detalle |
| `back-to-list-btn` | Button | Volver a la lista de recetas |
| `detail-recipe-name` | H2 | Nombre de la receta (editable con icono lápiz) |
| `detail-category` | Span | Chip de categoría |
| `detail-total-time` | Span | Tiempo total de preparación |
| `detail-content` | Div | Contenedor del contenido de detalle |

**Secciones de detalle:**

| ID | Sección | Descripción |
|----|---------|-------------|
| `detail-multimedia-section` | Div | Galería de imágenes |
| `detail-images-gallery` | Div | Contenedor de imágenes |
| `detail-appliances-section` | Div | Aparatos de cocina necesarios |
| `detail-appliances-chips` | Div | Chips de aparatos |
| `detail-ingredients-list` | Ul | Lista de ingredientes |
| `detail-no-ingredients` | Div | Mensaje cuando no hay ingredientes |
| `detail-sequences-section` | Div | Secuencias de adición (pasos) |
| `detail-sequences-list` | Div | Lista de secuencias |
| `detail-additional-info-section` | Div | Información adicional |
| `detail-author-section` | Div | Sección de autor |
| `detail-author` | Div | Texto del autor |
| `detail-history-section` | Div | Sección de historia |
| `detail-history` | Div | Texto de la historia |
| `detail-metadata` | Div | Metadatos (fechas, ID) |
| `detail-created-at` | Span | Fecha de creación |
| `detail-updated-at` | Span | Fecha de última modificación |
| `detail-recipe-id` | Span | ID único de la receta |

### ✏️ VISTA DE FORMULARIO (CREAR/EDITAR)

| ID | Elemento | Descripción |
|----|----------|-------------|
| `recipe-form-view` | Section | Contenedor principal del formulario |
| `recipe-name` | H2 | Nombre de la receta (contenteditable) |
| `close-form-btn` | Button | Cerrar formulario |
| `form-actions` | Div | Contenedor de botones de acción |
| `delete-recipe-btn` | Button | Eliminar receta |
| `share-recipe-btn` | Button | Compartir receta |
| `export-xml-btn` | Button | Exportar a XML |
| `export-pdf-btn` | Button | Exportar a PDF |
| `save-recipe-btn-top` | Button | Guardar receta (superior) |
| `recipe-form` | Form | Formulario principal |

#### 📝 INFORMACIÓN BÁSICA

| ID | Elemento | Descripción |
|----|----------|-------------|
| `recipe-category-chip` | Span | Chip de categoría clickeable |
| `selected-category-display` | Span | Texto de categoría seleccionada |
| `recipe-category` | Input | Input oculto con valor de categoría |
| `recipe-hours` | Input | Horas de tiempo total |
| `recipe-minutes` | Input | Minutos de tiempo total |
| `recipe-caravan-friendly` | Checkbox | Badge clickeable Caravana 🚐 |
| `recipe-hospital-friendly` | Checkbox | Badge clickeable Hospital 🏥 |
| `recipe-menu-friendly` | Checkbox | Badge clickeable Menú 🍽️ |

#### 🥘 INGREDIENTES (Sección Colapsable)

| ID | Elemento | Descripción |
|----|----------|-------------|
| `ingredients-section-title` | H3 | Título de sección (colapsable) |
| `ingredients-collapsible-content` | Div | Contenido colapsable |
| `ingredients-container` | Div | Contenedor de ingredientes |
| `ingredient-name` | Input | Nombre del ingrediente |
| `ingredient-quantity` | Input | Cantidad (opcional) |
| `ingredient-unit` | Select | Unidad de medida (opcional) |
| `add-ingredient-btn` | Button | Añadir ingrediente a la lista |
| `ingredient-error` | Span | Mensaje de error |
| `ingredients-list` | Div | Lista de ingredientes añadidos |
| `ingredients-empty` | Div | Mensaje cuando no hay ingredientes |
| `ingredient-autocomplete` | Div | Sugerencias de autocompletado |

**Unidades disponibles:**
- g (gramos)
- kg (kilogramos)
- ml (mililitros)
- l (litros)
- taza
- cucharada
- cucharadita
- pizca
- unidad
- al gusto

#### 👨‍🍳 MÉTODO DE PREPARACIÓN (Sección Colapsable)

| ID | Elemento | Descripción |
|----|----------|-------------|
| `appliances-section-title` | H3 | Título de sección (colapsable) |
| `appliances-collapsible-content` | Div | Contenido colapsable |
| `kitchen-appliances-chips` | Div | Grid de chips de aparatos |

#### 🔢 SECUENCIAS DE ADICIÓN (Sección Colapsable)

| ID | Elemento | Descripción |
|----|----------|-------------|
| `sequences-section-title` | H3 | Título de sección (colapsable) |
| `sequences-collapsible-content` | Div | Contenido colapsable |
| `sequences-container` | Div | Contenedor de secuencias |
| `sequence-step` | Input | Número de paso |
| `sequence-duration` | Input | Duración del paso (opcional) |
| `sequence-description` | Textarea | Descripción del paso |
| `sequence-ingredients` | Div | Selector de ingredientes asociados |
| `add-sequence-btn` | Button | Añadir secuencia |
| `sequences-list` | Div | Lista de secuencias añadidas |
| `sequences-empty` | Div | Mensaje cuando no hay secuencias |
| `cooking-actions-buttons` | Div | Botones de acciones de cocina |

**Acciones de cocina disponibles (19):**
- A la plancha
- Añadir
- Cocer
- Cocinar al vapor
- Desglasar
- Escaldar
- Freír
- Gratinar
- Guisar
- Hornear
- Lavar
- Pelar
- Picar
- Rallar
- Rebozar
- Reducir
- Rehogar
- Reposar
- Saltear
- Sellar

**Conectores (2):**
- y
- ,

#### 📸 MULTIMEDIA (Sección Colapsable)

| ID | Elemento | Descripción |
|----|----------|-------------|
| `multimedia-section-title` | H3 | Título de sección (colapsable) |
| `multimedia-collapsible-content` | Div | Contenido colapsable |
| `images-upload-btn` | Button | Subir imágenes |
| `images-input` | Input | Input file oculto |
| `images-preview` | Div | Vista previa de imágenes |
| `images-empty` | Div | Mensaje cuando no hay imágenes |

#### ℹ️ INFORMACIÓN ADICIONAL (Sección Colapsable)

| ID | Elemento | Descripción |
|----|----------|-------------|
| `additional-info-section-title` | H3 | Título de sección (colapsable) |
| `additional-info-collapsible-content` | Div | Contenido colapsable |
| `recipe-author` | Input | Autor de la receta |
| `recipe-history` | Textarea | Historia/origen de la receta |

#### 💾 BOTONES DE GUARDADO

| ID | Elemento | Descripción |
|----|----------|-------------|
| `save-recipe-btn` | Button | Guardar receta (inferior) |
| `cancel-recipe-btn` | Button | Cancelar y volver |

### 🛒 VISTA DE LISTAS DE COMPRA

| ID | Elemento | Descripción |
|----|----------|-------------|
| `shopping-lists-view` | Section | Contenedor principal |
| `shopping-lists-header` | Div | Encabezado de la vista |
| `back-to-home-btn` | Button | Volver al inicio |
| `new-list-btn` | Button | Crear nueva lista |
| `shopping-lists-container` | Div | Contenedor de listas |

**Estructura de lista de compra:**
```html
<div class="shopping-list-item">
  <div class="list-header">
    <h3 class="list-name">...</h3>
    <div class="list-badges">
      <span class="list-date">...</span>
      <span class="list-counter">...</span>
    </div>
    <button class="list-toggle">▼</button>
  </div>
  <div class="list-items">
    <div class="list-item">
      <input type="checkbox" class="item-checkbox">
      <span class="item-name">...</span>
      <span class="item-quantity">...</span>
    </div>
  </div>
  <div class="list-actions">
    <button class="toggle-enabled-btn">👁️</button>
    <button class="copy-list-btn">📋</button>
    <button class="edit-list-btn">✏️</button>
    <button class="delete-list-btn">🗑️</button>
  </div>
</div>
```

### 📋 VISTA DE MENÚS

| ID | Elemento | Descripción |
|----|----------|-------------|
| `menus-view` | Section | Contenedor principal |
| `menus-header` | Div | Encabezado de la vista |
| `back-to-home-btn` | Button | Volver al inicio |
| `new-menu-btn` | Button | Crear nuevo menú |
| `menus-container` | Div | Contenedor de menús |

### ⚙️ VISTA DE CONFIGURACIÓN

| ID | Elemento | Descripción |
|----|----------|-------------|
| `settings-view` | Section | Contenedor principal |
| `settings-header` | Div | Encabezado de la vista |
| `back-to-home-btn` | Button | Volver al inicio |
| `settings-container` | Div | Contenedor de configuración |
| `theme-toggle` | Button | Cambiar tema claro/oscuro |

#### 🏷️ GESTIÓN DE CATEGORÍAS

| ID | Elemento | Descripción |
|----|----------|-------------|
| `categories-management` | Div | Contenedor de gestión de categorías |
| `predefined-categories` | Div | Lista de categorías predefinidas |
| `custom-categories` | Div | Lista de categorías personalizadas |
| `hidden-categories` | Div | Lista de categorías ocultas |
| `new-category-btn` | Button | Crear nueva categoría |

**Estructura de item de categoría:**
```html
<div class="category-item">
  <span class="category-emoji">🥩</span>
  <span class="category-name">Carne</span>
  <div class="category-actions">
    <button class="edit-category-btn">✏️</button>
    <button class="hide-category-btn">👁️</button>
    <button class="delete-category-btn">🗑️</button>
    <button class="restore-category-btn">↩️</button>
  </div>
</div>
```

#### 📤📥 IMPORTAR/EXPORTAR

| ID | Elemento | Descripción |
|----|----------|-------------|
| `import-export` | Div | Contenedor de importación/exportación |
| `import-xml-btn` | Button | Importar recetas desde XML |
| `export-all-btn` | Button | Exportar todas las recetas |

#### ℹ️ INFORMACIÓN DE LA APP

| ID | Elemento | Descripción |
|----|----------|-------------|
| `app-info` | Div | Información de versión y créditos |

---

## 🎨 MODALES Y OVERLAYS

| ID/Clase | Tipo | Descripción |
|----------|------|-------------|
| `category-modal` | Modal | Selección de categoría con búsqueda |
| `category-selector-modal` | Modal | Selector de categorías para menús y recetas |
| `category-editor-modal` | Modal | Edición de categoría personalizada |
| `emoji-picker-modal` | Modal | Selector de emoji para categorías |
| `image-modal` | Modal | Vista ampliada de imagen |
| `confirm-modal` | Modal | Confirmación de acciones destructivas |
| `shopping-list-selector-modal` | Modal | Selección de lista de compra |
| `menu-category-selector-modal` | Modal | Selector de recetas filtradas por categoría |

### 🆕 Modal: Selector de Categorías (category-selector-modal)

**Elementos del Modal:**

| ID | Elemento | Descripción |
|----|----------|-------------|
| `close-category-selector-modal` | Button | Cerrar modal |
| `category-selector-chips` | Div | Contenedor de chips de categorías |
| `category-selector-footer` | Div | Footer con botones de acción |
| `category-confirm-btn` | Button | **NUEVO** - Confirmar selección y cerrar modal |
| `category-view-recipes-btn` | Button | Ver recetas de la categoría seleccionada |

**Flujo de Uso:**
1. Usuario abre modal desde edición de menú
2. Selecciona una categoría (con o sin recetas)
3. Opciones:
   - **"Confirmar"** → Cierra modal, guarda categoría en input
   - **"Ver Recetas →"** → Abre selector de recetas filtradas

---

## 🔔 NOTIFICACIONES Y ALERTAS

| Clase | Tipo | Descripción |
|-------|------|-------------|
| `toast-notification` | Toast | Notificación temporal (éxito/error/info) |
| `update-notification` | Banner | Notificación de actualización PWA disponible |
| `install-banner` | Banner | Banner de instalación de PWA |

---

## 📱 ESTADOS DE VISTA

La aplicación maneja diferentes estados de vista que se controlan mediante clases CSS:

| Estado | Descripción |
|--------|-------------|
| `hidden` | Elemento oculto |
| `active` | Elemento activo (filtros, botones) |
| `collapsed` | Sección colapsada |
| `list-view` | Vista de lista activa |
| `grid-view` | Vista de cuadrícula activa |
| `dark-theme` | Tema oscuro activo |

---

## 🔄 FLUJOS PRINCIPALES

### Crear Nueva Receta
1. Click en "Nueva Receta" → `new-recipe-btn`
2. Se muestra `recipe-form-view`
3. Usuario completa formulario
4. Click en "Guardar" → `save-recipe-btn`
5. Se guarda en `StorageManager`
6. Vuelve a `recipe-list-view`

### Ver Detalle de Receta
1. Click en tarjeta de receta
2. Se oculta `recipe-list-view`
3. Se muestra `recipe-detail-view`
4. Se cargan datos de la receta

### Editar Receta
1. Desde detalle, click en nombre con icono lápiz
2. Se muestra `recipe-form-view` con datos
3. Usuario modifica campos
4. Click en "Guardar"
5. Vuelve a `recipe-detail-view`

### Filtrar Recetas
1. Click en "Filtros" → `toggle-filters-btn`
2. Se muestra `filters-container`
3. Click en chip de categoría
4. Se filtran recetas en `recipes-grid`
5. Se actualiza `recipe-count-text`

### Crear Lista de Compra
1. Click en "Listas de Compra" → `shopping-lists-btn`
2. Se muestra `shopping-lists-view`
3. Click en "Nueva Lista" → `new-list-btn`
4. Usuario añade items
5. Se guarda en `ShoppingListManager`

---

## 📝 NOTAS DE DESARROLLO

### Convenciones de Nombres
- IDs: kebab-case (`recipe-form-view`)
- Clases CSS: kebab-case (`recipe-card`)
- Clases JS: PascalCase (`RecipeApp`)
- Constantes: UPPER_SNAKE_CASE (`PREDEFINED_CATEGORIES`)

### Almacenamiento
- **Primario:** IndexedDB (`RecetarioPersonalDB`)
- **Fallback:** localStorage
- **Claves:** Prefijo `recetario_` para todas las claves

### Eventos Personalizados
- `recipeCreated`: Cuando se crea una receta
- `recipeUpdated`: Cuando se actualiza una receta
- `recipeDeleted`: Cuando se elimina una receta
- `categoryChanged`: Cuando cambia una categoría

---

## 🔧 MANTENIMIENTO

Para mantener este mapa actualizado:

1. **Al añadir nuevos elementos HTML:** Actualizar sección "Interfaz de Usuario"
2. **Al crear nuevas clases JS:** Actualizar sección "Clases y Gestores"
3. **Al añadir nuevos modales:** Actualizar sección "Modales y Overlays"
4. **Al modificar flujos:** Actualizar sección "Flujos Principales"

---

**Versión del mapa:** 1.0  
**Fecha de creación:** 6 de noviembre de 2025
