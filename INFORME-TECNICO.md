# Informe Técnico - mehaquedadobien 🍳

## Resumen Ejecutivo

**mehaquedadobien** es una Progressive Web App (PWA) para gestión de recetas personales con almacenamiento local. La aplicación permite crear, editar, eliminar y organizar recetas con ingredientes, secuencias de preparación, multimedia y categorías personalizables.

**Última actualización:** Octubre 2025  
**Estado:** Producción - Funcional  
**Tecnologías:** Vanilla JavaScript, IndexedDB, localStorage, jsPDF, Web Share API  
**Nuevas funcionalidades:** Galería de fotos, Tema oscuro, Compartir recetas, Detección de duplicados

---

## Arquitectura de la Aplicación

### Estructura de Archivos

```
mehaquedadobien-main/
├── index.html              # Aplicación principal (SPA)
├── script.js               # Lógica de la aplicación (RecipeApp)
├── models.js               # Modelos de datos y gestores
├── styles.css              # Estilos (Airbnb-inspired)
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── .kiro/specs/            # Especificaciones de features
│   ├── unified-time-input/
│   ├── custom-categories/
│   ├── hospital-food-filter/
│   ├── xml-import-functionality/
│   └── recipe-photo-gallery/
└── test-*.html             # Archivos de prueba

Archivos de documentación:
├── INFORME-TECNICO.md      # Este archivo
├── RESUMEN-CAMBIOS.md      # Historial de cambios
├── GUIA-CREAR-APK.md       # Guía para Android
└── INSTRUCCIONES-API-GEMINI.md
```

---

## Componentes Principales

### 1. RecipeApp (script.js)

**Clase principal** que controla toda la aplicación.

#### Propiedades Clave:
```javascript
{
    storageManager: StorageManager,      // Gestión de IndexedDB
    categoryManager: CategoryManager,    // Gestión de categorías
    recipes: Array<Recipe>,              // Recetas cargadas
    activeFilters: Set<string>,          // Filtros activos
    currentView: string,                 // 'list' | 'detail' | 'form'
    ingredients: Array<Ingredient>,      // Ingredientes del formulario
    sequences: Array<Sequence>,          // Secuencias del formulario
    images: Array<MediaFile>,            // Imágenes del formulario
    videos: Array<MediaFile>,            // Videos del formulario
    galleryState: Object,                // Estado de galería de fotos
    modalImages: Array<MediaFile>,       // Imágenes para modal
    currentImageIndex: number            // Índice de imagen actual en modal
}
```

#### Métodos Principales:
- `init()` - Inicializa la aplicación
- `loadRecipes()` - Carga recetas desde IndexedDB
- `renderRecipeList()` - Renderiza lista de recetas
- `showRecipeDetail(id)` - Muestra detalle de receta
- `showRecipeForm(id)` - Muestra formulario (crear/editar)
- `handleFormSubmit()` - Guarda receta
- `handleDeleteRecipe(id)` - Elimina receta

#### Funciones Utilitarias de Tiempo:
- `parseTimeInput(prefix)` - Convierte horas/minutos a "Xh Ymin"
- `populateTimeInput(prefix, timeString)` - Carga tiempo en campos
- `formatTimeForDisplay(timeString)` - Formato legible ("2 horas 30 minutos")
- `validateTimeInput(prefix)` - Valida rangos de tiempo

---

### 2. CategoryManager (script.js)

**Gestiona categorías predefinidas y personalizadas.**

#### Constantes:
```javascript
PREDEFINED_CATEGORIES = [
    { id: 'carne', name: 'Carne', emoji: '🥩', color: '#D93B30', isPredefined: true },
    { id: 'verdura', name: 'Verdura', emoji: '🥬', color: '#008A05', isPredefined: true },
    { id: 'pescado', name: 'Pescado', emoji: '🐟', color: '#0073CF', isPredefined: true },
    { id: 'fruta', name: 'Fruta', emoji: '🍎', color: '#FF8C00', isPredefined: true },
    { id: 'cereales', name: 'Cereales', emoji: '🌾', color: '#C4A053', isPredefined: true },
    { id: 'con-huevo', name: 'Con huevo', emoji: '🥚', color: '#FFD700', isPredefined: true },
    { id: 'pollo', name: 'Pollo', emoji: '🐔', color: '#FFA500', isPredefined: true },
    { id: 'escabeche', name: 'Escabeche', emoji: '🥒', color: '#32CD32', isPredefined: true }
    // 8 categorías predefinidas (se eliminaron: hospital, mix, sin-categoria)
];

CATEGORY_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', // ... 12 colores
];
```

#### Métodos:
- `loadCustomCategories()` - Carga desde localStorage
- `saveCustomCategories()` - Guarda en localStorage
- `getAllCategories()` - Retorna predefinidas + personalizadas
- `getCategoryById(id)` - Busca categoría por ID
- `createCategory(data)` - Crea categoría personalizada
- `updateCategory(id, updates)` - Actualiza categoría
- `deleteCategory(id, recipes)` - Elimina categoría
- `generateCategoryId(name)` - Genera slug desde nombre
- `getCategoryCounts(recipes)` - Cuenta recetas por categoría

#### Almacenamiento:
- **Key:** `recetario_custom_categories`
- **Formato:** Array de objetos `{ id, name, emoji, color, isPredefined }`

---

### 3. Modelos de Datos (models.js)

#### Recipe
```javascript
{
    id: string (UUID),
    name: string,
    category: string | null,
    totalTime: string,              // "2h 30min"
    preparationMethod: string,
    author: string,                 // Opcional
    history: string,                // Opcional
    ingredients: Array<Ingredient>,
    additionSequences: Array<Sequence>,
    images: Array<MediaFile>,
    videos: Array<MediaFile>,
    createdAt: Date,
    updatedAt: Date
}
```

#### Ingredient
```javascript
{
    id: string (UUID),
    name: string,
    quantity: number,
    unit: string,
    order: number
}
```

#### Sequence
```javascript
{
    id: string (UUID),
    step: number,
    ingredientIds: Array<string>,
    description: string,
    duration: string                // "1h 15min"
}
```

#### MediaFile
```javascript
{
    id: string (UUID),
    name: string,
    type: string,
    data: string (Base64),
    size: number
}
```

---

### 4. StorageManager (models.js)

**Gestiona persistencia en IndexedDB con fallback a localStorage.**

#### Base de Datos:
- **Nombre:** `RecetarioPersonalDB`
- **Versión:** 1
- **Object Stores:**
  - `recipes` (keyPath: 'id')
    - Índices: name, category, createdAt
  - `media` (keyPath: 'id')
    - Índices: recipeId, type

#### Métodos:
- `initDB()` - Inicializa IndexedDB
- `saveRecipe(recipe)` - Guarda/actualiza receta
- `getRecipe(id)` - Obtiene receta por ID
- `getAllRecipes()` - Obtiene todas las recetas
- `deleteRecipe(id)` - Elimina receta
- `getRecipesByCategory(category)` - Filtra por categoría

#### Fallback a localStorage:
Si IndexedDB no está disponible, usa localStorage con key `recetario_recipes`.

---

### 5. Exportadores/Importadores (models.js)

#### XMLExporter
- `generateXML(recipe)` - Genera XML de receta
- `downloadXML(xmlString, filename)` - Descarga archivo
- `exportRecipe(recipe)` - Exporta y descarga

**Formato XML:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipe>
    <id>uuid</id>
    <name>Nombre</name>
    <category>categoria-id</category>
    <totalTime>2h 30min</totalTime>
    <preparationMethod>...</preparationMethod>
    <author>Autor</author>
    <history>Historia</history>
    <ingredients>
        <ingredient>
            <id>uuid</id>
            <name>Ingrediente</name>
            <quantity>100</quantity>
            <unit>g</unit>
            <order>0</order>
        </ingredient>
    </ingredients>
    <additionSequences>
        <sequence>
            <id>uuid</id>
            <step>1</step>
            <ingredientIds>
                <ingredientId>uuid</ingredientId>
            </ingredientIds>
            <duration>15min</duration>
            <description>Descripción</description>
        </sequence>
    </additionSequences>
    <images>...</images>
    <videos>...</videos>
    <createdAt>ISO-8601</createdAt>
    <updatedAt>ISO-8601</updatedAt>
</recipe>
```

#### PDFExporter
- `generatePDF(recipe)` - Genera PDF con jsPDF
- `downloadPDF(doc, filename)` - Descarga PDF
- `exportRecipe(recipe)` - Exporta y descarga

**Secciones del PDF:**
1. Nombre y categoría
2. Tiempo total
3. Imágenes (hasta 2)
4. Ingredientes
5. Método de preparación
6. Información de interés (autor/historia)
7. Secuencias de adición
8. Footer con metadata

#### XMLImporter
- `importFromFile(file)` - Importa desde archivo XML
- `parseXMLString(xmlString)` - Parsea XML
- `parseRecipeElement(element)` - Parsea receta individual

**Características:**
- Valida estructura XML
- Genera nuevos IDs para evitar conflictos
- Mapea IDs de ingredientes en secuencias
- Crea categorías desconocidas automáticamente
- Retorna resumen con éxitos y errores

---

## Funcionalidades Implementadas

### ✅ Gestión de Recetas
- Crear, editar, eliminar, duplicar recetas
- Validación de campos requeridos
- Confirmación antes de eliminar
- Detección de cambios no guardados

### ✅ Ingredientes
- Agregar con nombre, cantidad y unidad
- Reordenar con botones ↑↓
- Editar inline
- Eliminar con confirmación

### ✅ Secuencias de Adición
- Selección de ingredientes con chips clickeables
- Descripción de cada paso
- Duración con campos de horas/minutos
- Reordenar, editar y eliminar

### ✅ Multimedia
- Subir imágenes (JPEG, PNG, WebP)
- Subir videos (MP4, WebM)
- Límite de 10MB por archivo
- Vista previa con miniaturas
- Modal de ampliación para imágenes
- Navegación entre imágenes (teclado y botones)
- Badge de tiempo total en imágenes

### ✅ Galería de Fotos (NUEVO)
- Galería compacta para recetas con 2+ imágenes
- Imagen principal grande con controles de navegación
- Miniaturas navegables con scroll horizontal
- Indicador de posición (1/5, 2/5, etc.)
- Navegación circular (última → primera)
- Navegación por teclado (flechas, Home, End)
- Responsive (16:9 en desktop, 4:3 en móvil)
- Lazy loading de miniaturas
- Integración con modal existente
- Accesible (ARIA, lectores de pantalla)
- Fallback para navegadores sin aspect-ratio

### ✅ Categorías Personalizadas
- 10 categorías predefinidas (no editables/eliminables)
- Crear categorías con nombre, emoji y color
- Selector visual de emojis organizado por categorías (comida, animales, naturaleza, deportes, objetos)
- Más de 500 emojis disponibles para elegir
- Emoji por defecto: 🐱 (si no se selecciona ninguno)
- Editar categorías personalizadas (nombre, emoji, color)
- Modal elegante para edición con paleta de colores
- Paleta de 12 colores
- Validación de nombres (2-30 caracteres)
- Detección de duplicados
- Eliminación con advertencia si hay recetas
- Actualización automática de recetas al cambiar nombre de categoría
- Persistencia en localStorage
- Generación automática desde XML importado

### ✅ Filtrado
- Filtros por categoría con chips visuales
- Chip "Todas" para mostrar todo
- Chip "Sin categoría"
- Filtros dinámicos (incluyen categorías personalizadas)
- Ocultos en formulario y detalle

### ✅ Tiempo Unificado
- Campos separados de horas/minutos
- Formato de almacenamiento: "Xh Ymin"
- Formato de visualización: "X horas Y minutos"
- Usado en: Tiempo Total y Duración de Secuencias
- Validación: horas 0-24, minutos 0-60
- Validación en tiempo real: campos inválidos se marcan con borde rojo y fondo rojo claro
- Tooltip informativo al pasar el mouse sobre campos inválidos

### ✅ Exportación/Importación
- Exportar receta individual a XML
- Exportar receta individual a PDF
- Exportar todas las recetas a XML
- Importar desde XML (una o múltiples recetas)
- Creación automática de categorías desconocidas
- Resumen de importación con errores

### ✅ PWA
- Instalable en dispositivos
- Service Worker para offline
- Manifest con iconos
- Funciona sin conexión

---

## Flujos de Usuario Principales

### 1. Crear Receta
```
1. Click en "➕ Nueva Receta"
2. Llenar formulario:
   - Información Básica (nombre, categoría, tiempo)
   - Método de Preparación
   - Información de Interés (autor, historia)
   - Ingredientes (agregar uno por uno)
   - Secuencias de Adición (opcional)
   - Multimedia (imágenes/videos)
3. Click en "💾 Guardar Receta"
4. Receta aparece en lista principal
```

### 2. Editar Receta
```
1. Click en tarjeta de receta
2. Click en botón "✏️ Editar"
3. Modificar campos deseados
4. Click en "💾 Guardar Cambios"
```

### 3. Crear Categoría Personalizada
```
1. Click en "🏷️ Categorías"
2. Introducir nombre
3. Seleccionar emoji (opcional)
4. Seleccionar color de paleta
5. Click en "➕ Crear Categoría"
6. Categoría aparece en filtros y selector
```

### 4. Importar Recetas
```
1. Click en "📥 Importar XML"
2. Seleccionar archivo XML
3. Sistema parsea y valida
4. Crea categorías desconocidas automáticamente
5. Guarda recetas en IndexedDB
6. Muestra resumen de importación
```

---

## Estilos y Diseño

### Sistema de Diseño (Airbnb-inspired)

**Colores:**
```css
--color-primary: #FF385C
--color-text: #222222
--color-text-secondary: #717171
--color-background: #FFFFFF
--color-background-secondary: #F7F7F7
--color-border: #DDDDDD
```

**Espaciado (base 8px):**
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-xxl: 48px
```

**Border Radius:**
```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
```

**Sombras:**
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)
--shadow-md: 0 2px 4px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.08)
--shadow-lg: 0 6px 16px rgba(0,0,0,0.12)
```

### Componentes Principales

**Tarjetas de Receta:**
- Imagen con badge de tiempo
- Nombre, categoría e ingredientes
- Hover con elevación
- Click para ver detalle

**Formulario:**
- Secciones colapsables
- Validación inline
- Mensajes de error claros
- Botones de acción destacados

**Modal de Categorías:**
- Overlay con blur
- Animación de entrada
- Formulario de creación
- Listas de categorías con acciones

**Chips de Filtro:**
- Colores personalizados por categoría
- Estado activo visual
- Responsive

---

## Especificaciones Completadas

### 1. unified-time-input ✅
**Objetivo:** Unificar entrada de tiempo en toda la aplicación

**Archivos:**
- `.kiro/specs/unified-time-input/requirements.md`
- `.kiro/specs/unified-time-input/design.md`
- `.kiro/specs/unified-time-input/tasks.md`

**Implementación:**
- Funciones utilitarias en RecipeApp
- Campos de horas/minutos en Tiempo Total
- Campos de horas/minutos en Duración de Secuencias
- Formato consistente de almacenamiento y visualización

### 2. custom-categories ✅
**Objetivo:** Permitir gestión de categorías personalizadas

**Archivos:**
- `.kiro/specs/custom-categories/requirements.md`
- `.kiro/specs/custom-categories/design.md`
- `.kiro/specs/custom-categories/tasks.md`

**Implementación:**
- CategoryManager class
- Modal de gestión
- Persistencia en localStorage
- Renderizado dinámico de filtros
- Importación automática desde XML

### 3. hospital-food-filter
**Objetivo:** Filtro específico para comida de hospital

**Estado:** Implementado (categoría predefinida)

### 4. xml-import-functionality
**Objetivo:** Importación de recetas desde XML

**Estado:** Implementado con creación automática de categorías

---

## Archivos de Prueba

### test-unified-time-input.html
Prueba las funciones de tiempo:
- parseTimeInput()
- populateTimeInput()
- formatTimeForDisplay()
- validateTimeInput()

### test-time-validation.html
Prueba la validación visual en tiempo real de campos de tiempo:
- Validación de rangos (horas 0-24, minutos 0-60)
- Marcado visual de campos inválidos
- Tooltips informativos

### test-custom-categories.html
Documentación y casos de prueba para categorías:
- Crear categorías válidas
- Validación de nombres
- Eliminación con/sin recetas
- Persistencia
- Filtrado

### Otros archivos test-*.html
- test-additional-info.html
- test-image-modal.html
- test-ingredients.html
- test-sequences.html
- test-multimedia.html
- test-filtering.html
- test-export-xml.html
- test-export-pdf.html
- test-storage.html
- etc.

---

## Problemas Conocidos y Limitaciones

### 1. Edición de Categorías
**Estado:** Placeholder implementado  
**Descripción:** El botón de editar muestra mensaje "Función de edición en desarrollo"  
**Solución futura:** Implementar formulario de edición inline o modal

### 2. Tamaño de Multimedia
**Limitación:** 10MB por archivo  
**Razón:** Límites de IndexedDB y localStorage  
**Mitigación:** Mensaje de error claro al usuario

### 3. Compatibilidad de Navegadores
**IndexedDB:** Soportado en navegadores modernos  
**Fallback:** localStorage para navegadores sin IndexedDB  
**Limitación:** localStorage tiene límite de ~5-10MB

### 4. Validación de Categorías en Recipe Model
**Cambio:** Se eliminó validación estricta  
**Razón:** Permitir categorías dinámicas  
**Impacto:** Cualquier string es válido como categoría

---

## Próximas Mejoras Sugeridas

### Alta Prioridad
1. **Implementar edición completa de categorías**
   - Formulario de edición
   - Actualización de recetas afectadas
   - Validación de cambios

2. **Búsqueda de recetas**
   - Por nombre
   - Por ingredientes
   - Por autor

3. **Ordenamiento de recetas**
   - Por nombre (A-Z, Z-A)
   - Por fecha (más reciente, más antigua)
   - Por categoría

### Media Prioridad
4. **Reordenar categorías**
   - Drag & drop en modal
   - Persistir orden personalizado

5. **Más opciones de emoji**
   - Selector de emoji visual
   - Búsqueda de emojis

6. **Etiquetas adicionales**
   - Tags libres (ej: "vegetariano", "rápido")
   - Filtrado por tags

7. **Favoritos**
   - Marcar recetas como favoritas
   - Filtro de favoritos

### Baja Prioridad
8. **Modo oscuro**
   - Toggle en configuración
   - Persistir preferencia

9. **Compartir recetas**
   - Generar enlace
   - QR code

10. **Estadísticas**
    - Recetas por categoría (gráfico)
    - Ingredientes más usados
    - Recetas más recientes

---

## Guía de Desarrollo

### Agregar Nueva Funcionalidad

1. **Crear Spec**
   ```bash
   mkdir .kiro/specs/nombre-feature
   touch .kiro/specs/nombre-feature/requirements.md
   touch .kiro/specs/nombre-feature/design.md
   touch .kiro/specs/nombre-feature/tasks.md
   ```

2. **Definir Requirements**
   - Usar formato EARS (Easy Approach to Requirements Syntax)
   - Incluir user stories y acceptance criteria
   - Definir glossary de términos

3. **Diseñar Solución**
   - Arquitectura y componentes
   - Modelos de datos
   - Interfaces y APIs
   - Manejo de errores

4. **Crear Task List**
   - Tareas numeradas con subtareas
   - Referencias a requirements
   - Marcar tests como opcionales con `*`

5. **Implementar**
   - Seguir task list
   - Actualizar estado de tareas
   - Crear tests

### Modificar Código Existente

**Agregar campo a Recipe:**
1. Actualizar modelo en `models.js`
2. Actualizar formulario en `index.html`
3. Actualizar `getFormData()` en `script.js`
4. Actualizar `populateFormForEdit()` en `script.js`
5. Actualizar visualización en `renderRecipeDetail()`
6. Actualizar exportadores XML y PDF

**Agregar nueva categoría predefinida:**
1. Agregar a `PREDEFINED_CATEGORIES` en `script.js`
2. Elegir emoji y color apropiados
3. Usar ID en formato kebab-case

**Modificar estilos:**
1. Usar variables CSS existentes
2. Mantener consistencia con sistema de diseño
3. Probar en móvil (responsive)

---

## Comandos Útiles

### Desarrollo Local
```bash
# Abrir con servidor local (recomendado)
python -m http.server 8000
# o
npx serve

# Abrir directamente
# Abrir index.html en navegador
```

### Crear APK (Android)
Ver `GUIA-CREAR-APK.md` para instrucciones detalladas.

### Limpiar Datos de Prueba
```javascript
// En consola del navegador
localStorage.clear();
indexedDB.deleteDatabase('RecetarioPersonalDB');
location.reload();
```

---

## Debugging

### Ver Datos en IndexedDB
1. Abrir DevTools (F12)
2. Ir a Application > Storage > IndexedDB
3. Expandir `RecetarioPersonalDB`
4. Ver object stores `recipes` y `media`

### Ver Categorías Personalizadas
```javascript
// En consola del navegador
JSON.parse(localStorage.getItem('recetario_custom_categories'))
```

### Ver Recetas (si usa localStorage fallback)
```javascript
// En consola del navegador
JSON.parse(localStorage.getItem('recetario_recipes'))
```

### Logs de Debugging
La aplicación usa console.log con prefijos:
- `[App]` - RecipeApp general
- `[Storage]` - StorageManager
- `[CategoryManager]` - CategoryManager
- `[Import]` - Importación XML
- `[XMLImporter]` - Parser XML

---

## Contacto y Recursos

**Documentación adicional:**
- `RESUMEN-CAMBIOS.md` - Historial de cambios
- `GUIA-CREAR-APK.md` - Crear app Android
- `INSTRUCCIONES-API-GEMINI.md` - Integración con Gemini
- Specs en `.kiro/specs/` - Especificaciones detalladas

**Tecnologías utilizadas:**
- Vanilla JavaScript (ES6+)
- IndexedDB API
- localStorage API
- jsPDF (v2.5.1)
- Service Worker API
- Web App Manifest

---

## Changelog Reciente

### Octubre 2025
- ✅ Implementado sistema de tiempo unificado
- ✅ Implementado gestión de categorías personalizadas
- ✅ Agregados campos de autor e historia
- ✅ Implementado modal de imágenes con navegación
- ✅ Mejorada UX de secuencias con chips
- ✅ Agregado badge de tiempo en imágenes
- ✅ Importación automática de categorías desde XML

---

**Fin del Informe Técnico**

*Última actualización: Octubre 2025*
*Versión del documento: 1.0*
