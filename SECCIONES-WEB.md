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
- Click en badge 📋 → Copiar ingredientes
- Ordenar por nombre o fecha (en vista lista)

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
    - Fechas de creación/modificación
    - ID de la receta

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
- Subir videos
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
    - Botones: 📋 Copiar | ✏️ Editar | 🗑️ Eliminar
    - Lista de elementos (expandible)
    - Checkboxes para marcar completados

### Funcionalidades:
- Crear nueva lista
- Añadir elementos a lista (nombre + cantidad)
- Marcar elementos como completados ✓
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

Además de las 5 vistas principales, hay varios modales:

### 1. Modal de Categorías
- Gestionar categorías personalizadas
- Crear, editar, eliminar categorías
- Seleccionar emoji y color

### 2. Modal de Selector de Categoría
- Seleccionar categoría para una receta
- Muestra todas las categorías disponibles

### 3. Modal de Configuración
- Ajustes de la aplicación
- Tema claro/oscuro
- Otras opciones

### 4. Modal de Imagen
- Ver imagen en tamaño completo
- Zoom y navegación

### 5. Modal de Lista de Compra (Formulario)
- Crear/editar lista de compra
- Añadir elementos
- Guardar lista

### 6. Modal de Confirmación
- Confirmar eliminación de recetas
- Confirmar eliminación de listas
- Otros mensajes de confirmación

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
