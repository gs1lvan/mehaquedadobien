# Recipe Content Manager 🍳

Sistema de gestión de contenido (CMS) para edición masiva de recetas en formato XML.

## 🚀 Características Implementadas

### ✅ Fase 1: Infraestructura Core
- **Carga de XML**: Parseo completo de archivos XML con todas las recetas
- **Arquitectura JavaScript**: Clase RecipeContentManager con gestión de estado
- **Interfaz responsive**: Layout adaptable para móvil, tablet y desktop
- **Tema oscuro**: Integración con styles.css de mehaquedadobien

### ✅ Fase 2: Dashboard y Estadísticas
- **Estadísticas en tiempo real**: Total de recetas, categorías, porcentajes
- **Recetas incompletas**: Detección automática de recetas sin autor, tiempo, ingredientes o imágenes
- **Indicadores visuales**: Cards con métricas clave del recetario

### ✅ Fase 3: Tabla de Recetas
- **Tabla editable**: Visualización de todas las recetas con columnas ordenables
- **Selección múltiple**: Checkboxes para seleccionar recetas individuales o todas
- **Ordenamiento**: Click en encabezados para ordenar por nombre, categoría, autor, tiempo
- **Responsive**: Scroll horizontal en móviles

### ✅ Fase 4: Búsqueda y Filtrado
- **Búsqueda en tiempo real**: Filtrado por nombre de receta
- **Filtros avanzados**: Por categoría, autor, flags (caravana, hospital, menú)
- **Filtros de estado**: Recetas sin autor, sin imágenes
- **Combinación de filtros**: Múltiples filtros aplicados simultáneamente

### ✅ Fase 5: Edición en Lote
- **Batch Edit Modal**: Editar múltiples recetas seleccionadas
- **Campos editables**: Autor, categoría, historia, tiempo, flags
- **Modos de actualización**: Sobrescribir todo o solo campos vacíos
- **Vista previa**: Contador de recetas afectadas

### ✅ Fase 6: Buscar y Reemplazar
- **Find & Replace**: Buscar y reemplazar texto en campos específicos
- **Campos soportados**: Nombre, autor, categoría, historia, método de preparación
- **Case sensitive**: Opción para distinguir mayúsculas/minúsculas
- **Vista previa**: Contador de coincidencias antes de aplicar

### ✅ Fase 7: Edición Individual
- **Modal de edición**: Formulario completo para editar una receta
- **Validación**: Campos obligatorios y detección de nombres duplicados
- **Todos los campos**: Nombre, categoría, tiempo, autor, historia, método, flags
- **Información adicional**: Contador de ingredientes, secuencias e imágenes

### ✅ Fase 8: Exportación
- **Descargar XML**: Genera y descarga XML con todas las recetas actualizadas
- **Exportar CSV**: Exporta recetas a formato CSV para Excel
- **Nombres con timestamp**: Archivos con fecha y hora automática

### ✅ Fase 9: Historial y Deshacer
- **Historial de cambios**: Guarda los últimos 50 cambios realizados
- **Deshacer**: Restaura el estado anterior con un click
- **Backups automáticos**: Guarda backups en localStorage (últimos 5)

### ✅ Fase 10: UI y Notificaciones
- **Toast notifications**: Notificaciones visuales para éxito, error, advertencia e info
- **Loading states**: Spinner durante operaciones largas
- **Modales**: Sistema completo de modales para edición y configuración
- **Tema oscuro**: Estilos consistentes con la app principal

### ✅ Fase 11: Accesibilidad
- **Atajos de teclado**: Ctrl+S (guardar), Ctrl+Z (deshacer), Ctrl+F (buscar), Escape (cerrar)
- **Modal de ayuda**: Guía completa de funcionalidades y atajos
- **Navegación por teclado**: Soporte completo para navegación sin mouse

## 🚀 Inicio Rápido

**¿Primera vez?** Lee la [Guía de Inicio Rápido](RECIPE-MANAGER-QUICKSTART.md) para empezar en 5 minutos.

**¿Problemas?** Consulta la [Guía de Troubleshooting](RECIPE-MANAGER-TROUBLESHOOTING.md) para solucionar errores comunes.

---

## 📋 Cómo Usar

### 1. Cargar XML
1. Haz clic en "Cargar XML" en el header
2. Selecciona tu archivo XML de recetas
3. El sistema parseará y mostrará todas las recetas

**Formatos soportados:**
- ✅ Exportación completa: `<recipes>` con múltiples `<recipe>`
- ✅ Exportación individual: `<recipe>` único (exportado desde la app principal)

### 2. Buscar y Filtrar
- **Búsqueda**: Escribe en el campo de búsqueda para filtrar por nombre
- **Filtros**: Usa los selectores de categoría y autor
- **Checkboxes**: Filtra por estado (sin autor, sin imágenes, apto caravana)

### 3. Editar Recetas

#### Edición Individual
- Haz clic en el botón de editar (✏️) en cualquier receta
- Modifica los campos necesarios
- Haz clic en "Guardar Cambios"

#### Edición en Lote
1. Selecciona múltiples recetas con los checkboxes
2. Haz clic en "Editar Seleccionadas"
3. Marca los campos que quieres actualizar
4. Ingresa los nuevos valores
5. Elige el modo (sobrescribir o solo vacíos)
6. Haz clic en "Aplicar Cambios"

#### Buscar y Reemplazar
1. Haz clic en "Buscar y Reemplazar"
2. Selecciona el campo donde buscar
3. Ingresa el texto a buscar y el reemplazo
4. Haz clic en "Vista Previa" para ver cuántas coincidencias hay
5. Haz clic en "Reemplazar" para aplicar

### 4. Ordenar
- Haz clic en cualquier encabezado de columna (Nombre, Categoría, Autor, Tiempo)
- Click adicional invierte el orden (ascendente/descendente)

### 5. Exportar
- **XML**: Haz clic en "Descargar XML" o presiona Ctrl+S
- **CSV**: Haz clic en "Exportar CSV" para abrir en Excel

### 6. Deshacer
- Haz clic en "Deshacer" o presiona Ctrl+Z
- Restaura el estado anterior a tu último cambio

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl+S` / `Cmd+S` | Descargar XML |
| `Ctrl+Z` / `Cmd+Z` | Deshacer último cambio |
| `Ctrl+F` / `Cmd+F` | Enfocar búsqueda |
| `Escape` | Cerrar modales |

## 🎯 Casos de Uso

### Completar Recetas Incompletas
1. Revisa la sección "Recetas Incompletas" en el sidebar
2. Haz clic en cualquier receta incompleta
3. Completa los campos faltantes (autor, tiempo, etc.)
4. Guarda los cambios

### Cambiar Autor en Múltiples Recetas
1. Filtra las recetas del autor que quieres cambiar
2. Selecciona todas con "Seleccionar todas"
3. Haz clic en "Editar Seleccionadas"
4. Marca "Actualizar Autor" e ingresa el nuevo nombre
5. Aplica los cambios

### Corregir Errores de Escritura
1. Haz clic en "Buscar y Reemplazar"
2. Selecciona el campo (ej: "Autor")
3. Busca el texto incorrecto (ej: "Jhon")
4. Reemplaza con el correcto (ej: "John")
5. Aplica el reemplazo

### Exportar Recetas Filtradas
1. Aplica los filtros necesarios (categoría, autor, etc.)
2. Las recetas filtradas se mostrarán en la tabla
3. Haz clic en "Exportar CSV" para exportar solo las visibles

## 🔧 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Estilos con variables CSS y grid/flexbox
- **JavaScript ES6+**: Vanilla JS sin frameworks
- **Font Awesome**: Iconos
- **DOMParser**: Parseo nativo de XML
- **localStorage**: Backups automáticos

## 📊 Estadísticas Disponibles

- Total de recetas
- Número de categorías únicas
- Porcentaje con autor
- Porcentaje con imágenes
- Recetas aptas para caravana
- Recetas aptas para hospital
- Lista de recetas incompletas

## 🎨 Diseño

- **Tema oscuro por defecto**: Consistente con mehaquedadobien
- **Responsive**: Funciona en móvil, tablet y desktop
- **Grid layout**: Sidebar + contenido principal
- **Modales**: Sistema completo de modales para edición
- **Toast notifications**: Feedback visual inmediato

## 📝 Notas Técnicas

### Formato XML Soportado
El sistema soporta el formato XML completo de mehaquedadobien con:
- Información básica (nombre, categoría, tiempo, autor, historia)
- Ingredientes con cantidades y unidades
- Secuencias de adición con ingredientes asociados
- Imágenes en Base64
- Aparatos de cocina
- Flags (caravana, hospital, menú)

### Limitaciones Actuales
- La edición de ingredientes individuales está en desarrollo
- La edición de secuencias está en desarrollo
- La gestión de imágenes está en desarrollo
- No hay soporte para File System Access API (solo descarga)

### Backups
- Se crean automáticamente al cargar XML
- Se guardan en localStorage
- Se mantienen los últimos 5 backups
- Incluyen timestamp y descripción

### Historial
- Se guardan los últimos 50 cambios
- Cada cambio incluye el estado completo de las recetas
- Permite deshacer cambios uno por uno

## 🚀 Próximas Mejoras

- [ ] Edición completa de ingredientes
- [ ] Edición completa de secuencias
- [ ] Gestión de imágenes (añadir, eliminar, reordenar)
- [ ] Soporte para File System Access API
- [ ] Exportación a JSON
- [ ] Importación desde CSV
- [ ] Validación avanzada de datos
- [ ] Gráficos y visualizaciones
- [ ] Comparación de versiones
- [ ] Modo claro/oscuro toggle

## 🔗 Independencia del CMS

### ✅ Confirmación de Separación

El CMS (Recipe Content Manager) y la aplicación principal (mehaquedadobien) son **completamente independientes**:

#### Archivos del CMS (Independientes)
- `recipe-manager.html` - Interfaz HTML completa del CMS
- `recipe-manager.js` - Lógica JavaScript exclusiva del CMS
- No hay código del CMS en los archivos de la app principal

#### Archivos Compartidos (Configuración)
- `categories.js` - Configuración de categorías compartida
- `appliances.js` - Configuración de aparatos compartida
- `styles.css` - Variables CSS y estilos base compartidos
- `modal-triggers.css` - Estilos de botones compartidos

#### Integración Mínima
La única conexión entre la app y el CMS es:
1. **Botón "CMS"** en el modal de opciones de receta (`index.html` línea 1124)
2. **Event listener** que abre el CMS en nueva pestaña (`script.js` línea 8075)
3. **Compatibilidad XML**: El CMS lee/escribe el mismo formato XML que la app

```javascript
// Única referencia en script.js
const cmsBtn = document.getElementById('recipe-option-cms');
if (cmsBtn) {
    cmsBtn.onclick = () => {
        window.open('recipe-manager.html', '_blank');
    };
}
```

#### Compatibilidad de Formatos
- `models.js` soporta ambos formatos de secuencias: `<sequences>` (CMS) y `<additionSequences>` (app)
- Esta compatibilidad permite que ambos sistemas lean XMLs generados por el otro

### Ventajas de la Separación
- ✅ El CMS puede actualizarse sin afectar la app
- ✅ La app puede actualizarse sin afectar el CMS
- ✅ Ambos pueden ejecutarse independientemente
- ✅ Fácil mantenimiento y debugging
- ✅ Código más limpio y organizado

## 📄 Archivos

### CMS (Independientes)
- `recipe-manager.html` - Interfaz HTML con estructura y estilos
- `recipe-manager.js` - Lógica JavaScript completa

### Compartidos (Configuración)
- `categories.js` - Categorías predefinidas
- `appliances.js` - Aparatos de cocina
- `styles.css` - Variables CSS base
- `modal-triggers.css` - Estilos de botones

## 🎉 Estado del Proyecto

**✅ COMPLETADO** - Todas las fases principales implementadas y funcionando.

El Recipe Content Manager está listo para usar y proporciona todas las funcionalidades necesarias para gestionar masivamente un recetario en formato XML.

---

**Autor**: Kiro AI  
**Fecha**: 7 de noviembre de 2025  
**Versión**: 1.0
