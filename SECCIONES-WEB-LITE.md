# Secciones de la Web

La aplicación de recetas tiene **5 secciones principales** (vistas):

---

## 1. 📖 Lista de Recetas (recipe-list-view)
**Vista principal / Home**

### ¿Qué muestra?
- Grid de tarjetas con todas las recetas
- Filtros por categoría (chips en la parte superior)
- Contador de recetas
- Botones de vista (Grid/Lista)
- Empty state si no hay recetas

### Elementos principales:
- **Header de lista** (solo en vista lista):
  - Columnas: Imagen | Nombre | Fecha | Acciones
  - Ordenamiento por nombre o fecha
- **Grid de recetas**: Tarjetas con imagen, nombre, categoría
- **Filtros**: Chips de categorías (Carne, Pescado, Verdura, etc.)
- **Botones de acción**:
  - Toggle Grid/Lista
  - Nueva receta
  - Importar/Exportar

### Funcionalidades:
- Click en tarjeta → Ver detalle
- Click en filtro → Filtrar por categoría
- Click en badge 📋 → modal con opciones (Editar, duplicar,Compartir, exportar, Eliminar)
- Ordenar por nombre(en vista lista)

---

## 2. 📄 Detalle de Receta (recipe-detail-view)
**Vista de lectura de una receta**

### ¿Qué muestra?
- Información completa de una receta seleccionada
- Modo lectura (no editable)

### Elementos principales:
- **Header**:
  - Botón ◀ Volver
  - Nombre de la receta
  - Categoría y tiempo total
  - Botones: Eliminar | Compartir | Exportar | PDF
  
- **Contenido**:
  - 📸 **Galería multimedia** (fotos y videos)
  - 👨‍🍳 **Método de preparación** (aparatos de cocina)
  - 🥘 **Lista de ingredientes**
  - 🔢 **Secuencias de adición** (pasos)
  - ℹ️ **Información adicional**:
    - Autor
    - Historia
    - Fechas de creación/modificación (oculto)
    - ID de la receta (oculto)

### Funcionalidades:
- Click en nombre → Editar receta
- Click en Eliminar → Borrar receta
- Click en Compartir → Compartir receta
- Click en Exportar → Descargar XML
- Click en PDF → Descargar PDF
- Navegación en galería de fotos (si hay múltiples)

---

## 3. ✏️ Formulario de Receta (recipe-form-view)
**Vista de creación/edición**

### ¿Qué muestra?
- Formulario completo para crear o editar recetas
- Múltiples secciones colapsables

### Secciones del formulario:

#### 📝 Información Básica
- Nombre de la receta (editable en el título)
- Categoría (selector con chip)
- Tiempo total (horas y minutos)
- Checkboxes: 🚐 Caravana | 🏥 Hospital | 🍽️ Menú

#### 🥘 Ingredientes
- Formulario para añadir ingredientes:
  - Nombre (con autocompletado)
  - Cantidad (opcional)
  - Unidad (opcional)
- Lista de ingredientes añadidos
- Botones para reordenar, editar, eliminar

#### 👨‍🍳 Método de Preparación
- Chips de aparatos de cocina:
  - Batidora, Cuchillo, Freidora de aire, Horno, Microondas, Olla, Olla a presión, Sandwichera, Sartén, Thermomix, Vaporera, Wok

#### 🔢 Secuencias de Adición
- Formulario para añadir secuencias:
  - Selección de ingredientes (chips)
  - Descripción del paso
  - Botones de acciones de cocina (añadir, cocer, freír, etc.)
  - Duración (horas y minutos)
- Lista de secuencias añadidas
- Botones para reordenar, editar, eliminar

#### ℹ️ Información Adicional
- Autor (opcional)
- Historia (opcional)

#### 📸 Multimedia
- Subir fotos
- Vista previa de multimedia
- Eliminar multimedia

### Funcionalidades:
- Autocompletado de ingredientes
- Botones de acciones de cocina
- Reordenar ingredientes y secuencias (drag & drop)
- Secciones colapsables
- Validación de campos
- Guardar receta

---

## 4. 🛒 Listas de Compra (shopping-lists-view)
**Vista de gestión de listas de compra**

### ¿Qué muestra?
- Todas las listas de compra creadas
- Cada lista es expandible/colapsable

### Elementos principales:
- **Header**:
  - Título "🛒 Listas de Compra"
  - Botón ✕ Cerrar
  - Botones:
    - ➕ Nueva Lista
    - 📥 Importar Lista

- **Contenido**:
  - Tarjetas de listas de compra
  - Cada tarjeta muestra:
    - Nombre de la lista
    - Contador (X/Y completados)
    - Botones: 📋 Copiar | ✏️ Editar | 🗑️ Eliminar ocultar Exportar Duplicar
    - Lista de elementos (expandible)
    

### Funcionalidades:
- Crear nueva lista
- Añadir elementos a lista (nombre + cantidad)

- Reordenar elementos
- Copiar lista al portapapeles
- Editar lista
- Eliminar lista
- Expandir/colapsar listas
- Importar lista desde archivo

---

## 5. 📋 Menús (menus-view)
**Vista de gestión de menús** (Similar a listas de compra)

### ¿Qué muestra?
- Menús semanales o planificación de comidas
- Estructura similar a listas de compra

### Elementos principales:
- **Header**:
  - Título "📋 Menús"
  - Botón ✕ Cerrar
  - Botones:
    - ➕ Nuevo Menú
    - 📥 Importar Menú

- **Contenido**:
  - Tarjetas de menús
  - Cada menú puede contener:
    - Días de la semana
    - Comidas planificadas
    - Recetas asignadas

### Funcionalidades:
- Crear nuevo menú
- Planificar comidas por día
- Asignar recetas a días
- Editar menú
- Eliminar menú
- Importar menú desde archivo

---

## Navegación entre Secciones

### Flujo principal:
```
Lista de Recetas (Home)
    ↓ Click en receta
Detalle de Receta
    ↓ Click en nombre/editar
Formulario de Receta
    ↓ Guardar
Lista de Recetas

Lista de Recetas
    ↓ Click en "Nueva Receta"
Formulario de Receta
    ↓ Guardar
Lista de Recetas

Lista de Recetas
    ↓ Click en "🛒 Listas de Compra" (menú)
Listas de Compra
    ↓ Click en ✕
Lista de Recetas

Lista de Recetas
    ↓ Click en "📋 Menús" (menú)
Menús
    ↓ Click en ✕
Lista de Recetas
```

### Botones de navegación:
- **◀ Volver**: Desde detalle → Lista
- **✕ Cerrar**: Desde formulario/listas/menús → Lista
- **💾 Guardar**: Desde formulario → Lista

---

## Modales (Ventanas Emergentes)

Además de las 5 vistas principales, hay **15 modales** diferentes:

---

### 1. 🏷️ Modal de Gestión de Categorías
**ID técnico:** `category-modal`

**¿Qué hace?**
- Gestionar categorías personalizadas
- Ver categorías predefinidas y personalizadas
- Crear nuevas categorías
- Editar categorías existentes
- Eliminar categorías personalizadas

**Elementos:**
- Lista de categorías predefinidas (solo lectura)
- Lista de categorías personalizadas (con botones editar/eliminar)
- Formulario para crear nueva categoría:
  - Nombre
  - Emoji (abre emoji-picker-modal)
  - Color (abre color-picker-modal)
- Contador de recetas por categoría

**Botones:**
- ✕ Cerrar
- ➕ Crear Categoría
- ✏️ Editar (por categoría)
- 🗑️ Eliminar (por categoría)

---

### 2. ✏️ Modal de Edición de Categoría
**ID técnico:** `edit-category-modal`

**¿Qué hace?**
- Editar una categoría personalizada existente
- Cambiar nombre, emoji o color

**Elementos:**
- Input de nombre
- Selector de emoji (abre emoji-picker-modal)
- Selector de color (abre color-picker-modal)

**Botones:**
- ✕ Cerrar
- 💾 Guardar Cambios

---

### 3. ⚙️ Modal de Opciones de Categoría
**ID técnico:** `category-options-modal`

**¿Qué hace?**
- Menú contextual para acciones rápidas sobre una categoría
- Editar o eliminar categoría

**Elementos:**
- Botón "✏️ Editar Categoría"
- Botón "🗑️ Eliminar Categoría"

**Botones:**
- ✕ Cerrar

---

### 4. 😀 Modal de Selector de Emoji
**ID técnico:** `emoji-picker-modal`

**¿Qué hace?**
- Seleccionar un emoji para una categoría
- Muestra grid de emojis disponibles

**Elementos:**
- Grid de emojis organizados por categorías:
  - Comida 🍕
  - Animales 🐱
  - Objetos 🎨
  - Símbolos ⭐

**Botones:**
- ✕ Cerrar
- Click en emoji → Selecciona y cierra

---

### 5. 🎨 Modal de Selector de Color
**ID técnico:** `color-picker-modal`

**¿Qué hace?**
- Seleccionar un color para una categoría
- Muestra paleta de colores predefinidos

**Elementos:**
- Grid de chips de colores
- 12 colores predefinidos

**Botones:**
- ✕ Cerrar
- Click en color → Selecciona y cierra

---

### 6. 📂 Modal de Selector de Categoría
**ID técnico:** `category-selector-modal`

**¿Qué hace?**
- Seleccionar categoría para asignar a una receta
- Muestra todas las categorías disponibles (predefinidas + personalizadas)

**Elementos:**
- Grid de chips de categorías
- Cada chip muestra: emoji + nombre
- Opción "Sin categoría"

**Botones:**
- ✕ Cerrar
- Click en categoría → Selecciona y cierra

---

### 7. 🖼️ Modal de Imagen
**ID técnico:** `image-modal`

**¿Qué hace?**
- Ver imagen en tamaño completo
- Zoom y navegación

**Elementos:**
- Imagen a pantalla completa
- Overlay oscuro de fondo

**Botones:**
- ✕ Cerrar (o click fuera de la imagen)

---

### 8. 🛒 Modal de Lista de Compra (Formulario)
**ID técnico:** `shopping-list-modal`

**¿Qué hace?**
- Crear nueva lista de compra
- Editar lista de compra existente

**Elementos:**
- Input de nombre de lista
- Contenedor de elementos:
  - Input de nombre de elemento
  - Input de cantidad
  - Botón ➕ Añadir Elemento
- Lista de elementos añadidos (con botón eliminar)

**Botones:**
- ✕ Cerrar
- 💾 Guardar Lista
- 🗑️ Eliminar elemento (por elemento)

---

### 9. 📋 Modal de Menú (Formulario)
**ID técnico:** `menu-modal`

**¿Qué hace?**
- Crear nuevo menú
- Editar menú existente

**Elementos:**
- Input de nombre de menú
- Selector de categorías (abre menu-category-selector-modal)
- Contenedor de días/comidas
- Lista de recetas asignadas

**Botones:**
- ✕ Cerrar
- 💾 Guardar Menú

---

### 10. 🛒 Modal de Seleccionar Lista de Compra
**ID técnico:** `select-shopping-list-modal`

**¿Qué hace?**
- Seleccionar a qué lista de compra añadir ingredientes
- Muestra todas las listas disponibles

**Elementos:**
- Lista de listas de compra existentes
- Botón "➕ Nueva Lista"

**Botones:**
- ✕ Cerrar
- Click en lista → Añade ingredientes a esa lista

---

### 11. ⚙️ Modal de Opciones de Lista de Compra
**ID técnico:** `shopping-list-options-modal`

**¿Qué hace?**
- Menú contextual para acciones sobre una lista de compra
- Editar, duplicar, exportar, eliminar lista

**Elementos:**
- Botón "✏️ Editar Lista"
- Botón "📋 Duplicar Lista"
- Botón "📤 Exportar Lista"
- Botón "🗑️ Eliminar Lista"

**Botones:**
- ✕ Cerrar

---

### 12. ⚙️ Modal de Opciones de Menú
**ID técnico:** `menu-options-modal`

**¿Qué hace?**
- Menú contextual para acciones sobre un menú
- Editar, duplicar, exportar, eliminar menú

**Elementos:**
- Botón "✏️ Editar Menú"
- Botón "📋 Duplicar Menú"
- Botón "📤 Exportar Menú"
- Botón "🗑️ Eliminar Menú"

**Botones:**
- ✕ Cerrar

---

### 13. 📂 Modal de Selector de Categorías de Menú
**ID técnico:** `menu-category-selector-modal`

**¿Qué hace?**
- Seleccionar múltiples categorías para filtrar recetas en un menú
- Permite selección múltiple

**Elementos:**
- Grid de chips de categorías
- Checkboxes para selección múltiple
- Botón "Aplicar"

**Botones:**
- ✕ Cerrar
- ✓ Aplicar Selección

---

### 14. ⚙️ Modal de Opciones de Receta
**ID técnico:** `recipe-options-modal`

**¿Qué hace?**
- Menú contextual para acciones rápidas sobre una receta
- Editar, duplicar, compartir, exportar, eliminar

**Elementos:**
- Botón "✏️ Editar Receta"
- Botón "📋 Duplicar Receta"
- Botón "📤 Compartir Receta"
- Botón "💾 Exportar XML"
- Botón "📄 Exportar PDF"
- Botón "🗑️ Eliminar Receta"

**Botones:**
- ✕ Cerrar

---

### 15. ⚙️ Modal de Configuración
**ID técnico:** `settings-modal`

**¿Qué hace?**
- Ajustes generales de la aplicación
- Cambiar tema, gestionar categorías, importar/exportar

**Elementos:**
- **Sección Tema:**
  - Botón toggle tema claro/oscuro
  
- **Sección Categorías:**
  - Botón "🏷️ Gestionar Categorías" (abre category-modal)
  
- **Sección Importar/Exportar:**
  - Botón "📥 Importar recetas"
  - Botón "📤 Exportar recetas"
  
- **Sección Listas:**
  - Botón "🛒 Listas de Compra"
  
- **Sección Información:**
  - Versión de la app
  - Información del desarrollador

**Botones:**
- ✕ Cerrar

---

## Tabla Resumen de Modales

| # | Nombre | ID Técnico | Función Principal |
|---|--------|-----------|-------------------|
| 1 | Gestión de Categorías | `category-modal` | Crear/editar/eliminar categorías |
| 2 | Edición de Categoría | `edit-category-modal` | Editar categoría específica |
| 3 | Opciones de Categoría | `category-options-modal` | Menú contextual de categoría |
| 4 | Selector de Emoji | `emoji-picker-modal` | Elegir emoji para categoría |
| 5 | Selector de Color | `color-picker-modal` | Elegir color para categoría |
| 6 | Selector de Categoría | `category-selector-modal` | Asignar categoría a receta |
| 7 | Imagen | `image-modal` | Ver imagen en grande |
| 8 | Lista de Compra | `shopping-list-modal` | Crear/editar lista de compra |
| 9 | Menú | `menu-modal` | Crear/editar menú |
| 10 | Seleccionar Lista | `select-shopping-list-modal` | Elegir lista para añadir items |
| 11 | Opciones de Lista | `shopping-list-options-modal` | Menú contextual de lista |
| 12 | Opciones de Menú | `menu-options-modal` | Menú contextual de menú |
| 13 | Selector Categorías Menú | `menu-category-selector-modal` | Filtrar recetas por categorías |
| 14 | Opciones de Receta | `recipe-options-modal` | Menú contextual de receta |
| 15 | Configuración | `settings-modal` | Ajustes generales |

---

## Jerarquía de Modales

Algunos modales abren otros modales (navegación anidada):

```
settings-modal
    └─> category-modal
            ├─> edit-category-modal
            │       ├─> emoji-picker-modal
            │       └─> color-picker-modal
            └─> emoji-picker-modal (crear nueva)
            └─> color-picker-modal (crear nueva)

recipe-form-view
    └─> category-selector-modal

recipe-card
    └─> recipe-options-modal

shopping-list-card
    └─> shopping-list-options-modal

menu-card
    └─> menu-options-modal

menu-modal
    └─> menu-category-selector-modal
```

---

## Modales de Confirmación

Además de los modales listados, hay **confirmaciones nativas** usando `confirm()` de JavaScript para:
- Eliminar receta
- Eliminar categoría (si tiene recetas)
- Eliminar lista de compra
- Eliminar menú
- Cerrar formulario sin guardar

Estos no son modales HTML, sino diálogos nativos del navegador.

---

## Resumen Visual

```
┌─────────────────────────────────────────┐
│  HEADER (siempre visible)               │
│  Logo | Filtros | Menú ☰                │
├─────────────────────────────────────────┤
│                                         │
│  VISTA ACTIVA (solo una visible):      │
│                                         │
│  1. 📖 Lista de Recetas (Home)         │
│  2. 📄 Detalle de Receta               │
│  3. ✏️ Formulario de Receta            │
│  4. 🛒 Listas de Compra                │
│  5. 📋 Menús                           │
│                                         │
└─────────────────────────────────────────┘
```

---

## Elementos Comunes en Todas las Vistas

### Header (siempre visible):
- Logo/Título de la app
- Filtros de categoría (solo en lista de recetas)
- Menú hamburguesa ☰ con:
  - ☀️ Tema
  - 🏷️ Categorías
  - 📥 Importar receta
  - 📤 Exportar todas
  - 🛒 Listas de Compra
  - 📋 Menús
  - ➕ Nueva Receta

### Toast Notifications:
- Mensajes de éxito/error
- Aparecen temporalmente en la esquina

---

## Conclusión

La aplicación tiene **5 vistas principales**:
1. Lista de Recetas (Home)
2. Detalle de Receta
3. Formulario de Receta
4. Listas de Compra
5. Menús

Más **6+ modales** para funcionalidades específicas.

La navegación es simple y lógica, siempre volviendo a la lista de recetas como punto central.
