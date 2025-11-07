# Requirements Document - Recipe Content Manager

## Introduction

El Recipe Content Manager (RCM) es una herramienta de gestión de contenido (CMS) diseñada para permitir la edición masiva, selectiva e individual de recetas almacenadas en formato XML. La herramienta proporciona una interfaz visual con tabla editable, vista previa en tiempo real, y múltiples funcionalidades avanzadas para gestionar eficientemente un recetario completo.

## Glossary

- **RCM (Recipe Content Manager)**: Sistema de gestión de contenido para recetas
- **XML**: Formato de archivo para almacenar recetas
- **Edición Masiva**: Aplicar cambios a todas las recetas simultáneamente
- **Edición Selectiva**: Aplicar cambios a recetas filtradas o seleccionadas
- **Edición Individual**: Modificar una receta específica
- **Dashboard**: Panel de control con estadísticas
- **Backup**: Copia de seguridad automática antes de cambios
- **Vista Previa**: Visualización del XML resultante antes de aplicar cambios
- **Batch Edit**: Edición en lote de múltiples recetas

## Requirements

### Requirement 1: Carga y Parseo de XML

**User Story:** Como usuario, quiero cargar un archivo XML con recetas para poder editarlas en la interfaz

#### Acceptance Criteria

1. WHEN el usuario selecciona un archivo XML, THE RCM SHALL parsear el archivo y extraer todas las recetas
2. WHEN el parseo es exitoso, THE RCM SHALL mostrar el número total de recetas cargadas
3. IF el archivo XML está mal formado, THEN THE RCM SHALL mostrar un mensaje de error descriptivo
4. THE RCM SHALL validar que el XML contiene el elemento raíz `<recipes>`
5. THE RCM SHALL extraer todos los campos de cada receta (id, name, category, totalTime, author, history, ingredients, sequences, images, appliances, flags)

---

### Requirement 2: Dashboard de Estadísticas

**User Story:** Como usuario, quiero ver estadísticas del recetario para tener una visión general del contenido

#### Acceptance Criteria

1. THE RCM SHALL mostrar el número total de recetas cargadas
2. THE RCM SHALL calcular y mostrar el porcentaje de recetas con autor
3. THE RCM SHALL mostrar un desglose de recetas por categoría
4. THE RCM SHALL mostrar el número de recetas aptas para caravana, hospital y menú
5. THE RCM SHALL mostrar el número de recetas con imágenes
6. THE RCM SHALL actualizar las estadísticas en tiempo real cuando se realizan cambios

---

### Requirement 3: Detección de Recetas Incompletas

**User Story:** Como usuario, quiero identificar recetas incompletas para poder completarlas

#### Acceptance Criteria

1. THE RCM SHALL detectar recetas sin autor
2. THE RCM SHALL detectar recetas sin tiempo total
3. THE RCM SHALL detectar recetas sin ingredientes
4. THE RCM SHALL detectar recetas sin imágenes
5. THE RCM SHALL mostrar una lista de recetas incompletas con indicadores visuales
6. WHEN el usuario hace clic en una receta incompleta, THE RCM SHALL resaltar los campos faltantes

---

### Requirement 4: Búsqueda de Recetas

**User Story:** Como usuario, quiero buscar recetas por nombre para encontrarlas rápidamente

#### Acceptance Criteria

1. THE RCM SHALL proporcionar un campo de búsqueda en tiempo real
2. WHEN el usuario escribe en el campo de búsqueda, THE RCM SHALL filtrar las recetas que coincidan con el texto
3. THE RCM SHALL buscar en el nombre de la receta (case-insensitive)
4. THE RCM SHALL mostrar el número de resultados encontrados
5. WHEN el campo de búsqueda está vacío, THE RCM SHALL mostrar todas las recetas

---

### Requirement 5: Filtrado Avanzado

**User Story:** Como usuario, quiero filtrar recetas por múltiples criterios para trabajar con subconjuntos específicos

#### Acceptance Criteria

1. THE RCM SHALL permitir filtrar por categoría (selección múltiple)
2. THE RCM SHALL permitir filtrar por autor
3. THE RCM SHALL permitir filtrar por rango de tiempo (< 30min, 30-60min, > 1h)
4. THE RCM SHALL permitir filtrar por flags (caravana, hospital, menú)
5. THE RCM SHALL permitir filtrar por estado (con/sin autor, con/sin imágenes)
6. THE RCM SHALL combinar múltiples filtros con lógica AND
7. THE RCM SHALL mostrar el número de recetas que cumplen los filtros activos

---

### Requirement 6: Tabla Editable de Recetas

**User Story:** Como usuario, quiero ver todas las recetas en una tabla para editarlas visualmente

#### Acceptance Criteria

1. THE RCM SHALL mostrar las recetas en una tabla con columnas: checkbox, nombre, categoría, autor, tiempo, flags
2. THE RCM SHALL permitir ordenar la tabla por cualquier columna (ascendente/descendente)
3. THE RCM SHALL mostrar checkboxes para seleccionar recetas individuales
4. THE RCM SHALL proporcionar un checkbox "Seleccionar todas" en el encabezado
5. THE RCM SHALL resaltar visualmente las filas seleccionadas
6. THE RCM SHALL permitir edición inline de campos simples (autor, categoría, tiempo)
7. THE RCM SHALL aplicar scroll virtual para manejar listas grandes (100+ recetas)

---

### Requirement 7: Edición en Lote (Batch Edit)

**User Story:** Como usuario, quiero aplicar cambios a múltiples recetas seleccionadas simultáneamente

#### Acceptance Criteria

1. WHEN el usuario selecciona múltiples recetas, THE RCM SHALL habilitar el botón "Editar Seleccionadas"
2. WHEN el usuario hace clic en "Editar Seleccionadas", THE RCM SHALL abrir un formulario de edición en lote
3. THE RCM SHALL permitir editar: autor, historia, categoría, tiempo, flags (caravana, hospital, menú)
4. THE RCM SHALL mostrar el número de recetas que serán afectadas
5. THE RCM SHALL proporcionar opciones: "Sobrescribir" o "Solo si está vacío"
6. WHEN el usuario aplica cambios, THE RCM SHALL actualizar todas las recetas seleccionadas
7. THE RCM SHALL mostrar una confirmación con el número de recetas actualizadas

---

### Requirement 8: Buscar y Reemplazar

**User Story:** Como usuario, quiero buscar y reemplazar valores en campos específicos para corregir datos masivamente

#### Acceptance Criteria

1. THE RCM SHALL proporcionar una función "Buscar y Reemplazar"
2. THE RCM SHALL permitir seleccionar el campo objetivo (autor, historia, categoría, etc.)
3. THE RCM SHALL permitir especificar el texto a buscar
4. THE RCM SHALL permitir especificar el texto de reemplazo
5. THE RCM SHALL mostrar una vista previa de las recetas que serán afectadas
6. THE RCM SHALL proporcionar opciones: "Reemplazar Todo" o "Reemplazar en Seleccionadas"
7. WHEN el usuario confirma, THE RCM SHALL aplicar los reemplazos y mostrar el número de cambios realizados

---

### Requirement 9: Edición Individual Detallada

**User Story:** Como usuario, quiero editar todos los campos de una receta individual para modificaciones complejas

#### Acceptance Criteria

1. WHEN el usuario hace doble clic en una fila, THE RCM SHALL abrir un modal de edición detallada
2. THE RCM SHALL mostrar todos los campos editables: nombre, categoría, tiempo, autor, historia, método de preparación
3. THE RCM SHALL permitir editar ingredientes (añadir, eliminar, modificar)
4. THE RCM SHALL permitir editar secuencias de adición (añadir, eliminar, modificar)
5. THE RCM SHALL permitir editar aparatos de cocina (añadir, eliminar)
6. THE RCM SHALL permitir editar flags (caravana, hospital, menú)
7. THE RCM SHALL validar los datos antes de guardar
8. WHEN el usuario guarda, THE RCM SHALL actualizar la receta en la tabla

---

### Requirement 10: Validación Automática

**User Story:** Como usuario, quiero que el sistema valide automáticamente los datos para evitar errores

#### Acceptance Criteria

1. THE RCM SHALL validar que el formato de tiempo sea correcto (Xh Ymin)
2. THE RCM SHALL validar que la categoría sea una de las permitidas
3. THE RCM SHALL detectar nombres de recetas duplicados
4. THE RCM SHALL detectar ingredientes duplicados en una receta
5. THE RCM SHALL mostrar advertencias visuales en campos con errores
6. THE RCM SHALL prevenir guardar cambios si hay errores críticos
7. THE RCM SHALL mostrar un resumen de errores y advertencias en el dashboard

---

### Requirement 11: Vista Previa en Tiempo Real

**User Story:** Como usuario, quiero ver una vista previa del XML resultante antes de aplicar cambios

#### Acceptance Criteria

1. THE RCM SHALL proporcionar un panel de vista previa del XML
2. THE RCM SHALL actualizar la vista previa en tiempo real cuando se realizan cambios
3. THE RCM SHALL resaltar sintácticamente el XML (syntax highlighting)
4. THE RCM SHALL permitir alternar entre vista de tabla y vista de XML
5. THE RCM SHALL mostrar el tamaño del archivo XML resultante
6. THE RCM SHALL permitir copiar el XML al portapapeles

---

### Requirement 12: Exportación Múltiple

**User Story:** Como usuario, quiero exportar las recetas en diferentes formatos para diferentes usos

#### Acceptance Criteria

1. THE RCM SHALL permitir exportar a XML (formato original de la app)
2. THE RCM SHALL permitir exportar a CSV (para Excel)
3. THE RCM SHALL permitir exportar solo las recetas seleccionadas
4. THE RCM SHALL permitir exportar solo las recetas filtradas
5. THE RCM SHALL generar un nombre de archivo descriptivo con fecha y hora
6. WHEN el usuario exporta a XML, THE RCM SHALL descargar el archivo automáticamente
7. WHEN el usuario exporta a CSV, THE RCM SHALL incluir todos los campos principales

---

### Requirement 13: Historial y Deshacer

**User Story:** Como usuario, quiero poder deshacer cambios para recuperarme de errores

#### Acceptance Criteria

1. THE RCM SHALL mantener un historial de los últimos 10 cambios realizados
2. THE RCM SHALL mostrar el historial con timestamp y descripción de cada cambio
3. THE RCM SHALL permitir deshacer el último cambio
4. WHEN el usuario deshace un cambio, THE RCM SHALL restaurar el estado anterior
5. THE RCM SHALL actualizar la tabla y estadísticas después de deshacer
6. THE RCM SHALL mostrar una notificación confirmando la operación de deshacer
7. THE RCM SHALL deshabilitar el botón "Deshacer" cuando no hay cambios que deshacer

---

### Requirement 14: Backup Automático

**User Story:** Como usuario, quiero que el sistema cree backups automáticos para no perder datos

#### Acceptance Criteria

1. WHEN el usuario carga un XML, THE RCM SHALL crear un backup automático
2. WHEN el usuario aplica cambios masivos, THE RCM SHALL crear un backup antes de aplicar
3. THE RCM SHALL almacenar backups en localStorage con timestamp
4. THE RCM SHALL mantener los últimos 5 backups
5. THE RCM SHALL permitir descargar cualquier backup
6. THE RCM SHALL permitir restaurar desde un backup
7. THE RCM SHALL mostrar la lista de backups disponibles con fecha y hora

---

### Requirement 15: Guardar Cambios - Descargar XML

**User Story:** Como usuario, quiero descargar el XML actualizado para subirlo manualmente a la app

#### Acceptance Criteria

1. THE RCM SHALL proporcionar un botón "Descargar XML"
2. WHEN el usuario hace clic en "Descargar XML", THE RCM SHALL generar el XML completo
3. THE RCM SHALL incluir todas las recetas con los cambios aplicados
4. THE RCM SHALL mantener la estructura XML original de la app
5. THE RCM SHALL generar un nombre de archivo con formato: `recetas_YYYY-MM-DD_HHmm.xml`
6. THE RCM SHALL descargar el archivo automáticamente al navegador
7. THE RCM SHALL mostrar una notificación de éxito con el nombre del archivo

---

### Requirement 16: Guardar Cambios - Actualizar Archivo

**User Story:** Como usuario, quiero actualizar el archivo XML directamente sin descargarlo

#### Acceptance Criteria

1. THE RCM SHALL proporcionar un botón "Actualizar Archivo"
2. WHEN el usuario hace clic en "Actualizar Archivo", THE RCM SHALL solicitar el archivo XML original
3. THE RCM SHALL sobrescribir el archivo con los cambios aplicados
4. IF el navegador no soporta File System Access API, THEN THE RCM SHALL mostrar un mensaje informativo
5. THE RCM SHALL mostrar una notificación de éxito cuando el archivo se actualiza
6. THE RCM SHALL crear un backup antes de actualizar el archivo
7. THE RCM SHALL manejar errores de permisos y mostrar mensajes descriptivos

---

### Requirement 17: Interfaz con Tema Oscuro

**User Story:** Como usuario, quiero que la interfaz use el mismo estilo de la app principal para consistencia visual

#### Acceptance Criteria

1. THE RCM SHALL usar el archivo `styles.css` de la app principal
2. THE RCM SHALL aplicar el tema oscuro por defecto (clase `dark-theme`)
3. THE RCM SHALL usar las mismas variables CSS (colores, espaciado, fuentes)
4. THE RCM SHALL mantener consistencia visual con la app principal
5. THE RCM SHALL usar los mismos componentes de botones, inputs y tablas
6. THE RCM SHALL ser responsive y funcionar en móviles, tablets y desktop
7. THE RCM SHALL usar los mismos iconos y emojis que la app principal

---

### Requirement 18: Notificaciones y Feedback

**User Story:** Como usuario, quiero recibir notificaciones claras sobre las acciones realizadas

#### Acceptance Criteria

1. THE RCM SHALL mostrar notificaciones toast para acciones exitosas (verde)
2. THE RCM SHALL mostrar notificaciones toast para errores (rojo)
3. THE RCM SHALL mostrar notificaciones toast para advertencias (amarillo)
4. THE RCM SHALL mostrar notificaciones toast para información (azul)
5. THE RCM SHALL auto-ocultar las notificaciones después de 3 segundos
6. THE RCM SHALL permitir cerrar notificaciones manualmente
7. THE RCM SHALL mostrar un indicador de carga durante operaciones largas

---

### Requirement 19: Rendimiento y Optimización

**User Story:** Como usuario, quiero que la herramienta sea rápida incluso con muchas recetas

#### Acceptance Criteria

1. THE RCM SHALL cargar y parsear 100 recetas en menos de 1 segundo
2. THE RCM SHALL usar virtualización para tablas con más de 50 recetas
3. THE RCM SHALL actualizar la vista previa con debounce de 300ms
4. THE RCM SHALL aplicar cambios masivos en menos de 2 segundos para 100 recetas
5. THE RCM SHALL mantener la interfaz responsive durante operaciones pesadas
6. THE RCM SHALL usar Web Workers para operaciones de parseo y generación de XML
7. THE RCM SHALL optimizar el tamaño de backups comprimiendo datos

---

### Requirement 20: Accesibilidad

**User Story:** Como usuario, quiero que la herramienta sea accesible por teclado y lectores de pantalla

#### Acceptance Criteria

1. THE RCM SHALL permitir navegación completa por teclado (Tab, Enter, Escape)
2. THE RCM SHALL proporcionar atajos de teclado: Ctrl+S (guardar), Ctrl+Z (deshacer), Ctrl+F (buscar)
3. THE RCM SHALL incluir atributos ARIA apropiados en todos los elementos interactivos
4. THE RCM SHALL mantener el foco visible en elementos interactivos
5. THE RCM SHALL proporcionar labels descriptivos para todos los inputs
6. THE RCM SHALL anunciar cambios importantes a lectores de pantalla
7. THE RCM SHALL cumplir con WCAG 2.1 nivel AA

---

**Autor:** Kiro AI  
**Fecha:** 7 de noviembre de 2025  
**Versión:** 1.0
