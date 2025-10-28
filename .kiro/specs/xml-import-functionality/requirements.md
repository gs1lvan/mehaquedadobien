# Requirements Document

## Introduction

Esta especificación define la funcionalidad de importación de recetas desde archivos XML en el sistema de gestión de recetas. La funcionalidad debe ser completamente compatible con el formato XML generado por la función de exportación existente, permitiendo un flujo bidireccional de datos.

## Glossary

- **Sistema_Recetas**: La aplicación web de gestión de recetas mehaquedadobien
- **Importador_XML**: El componente que procesa archivos XML y crea objetos Recipe
- **Archivo_XML**: Archivo XML con formato compatible generado por la función de exportación
- **Usuario**: Persona que utiliza la aplicación para gestionar recetas
- **Boton_Importar**: Elemento de interfaz para iniciar el proceso de importación

## Requirements

### Requirement 1

**User Story:** Como usuario del sistema de recetas, quiero poder importar recetas desde archivos XML, para que pueda restaurar recetas exportadas previamente o compartir recetas entre diferentes instancias de la aplicación.

#### Acceptance Criteria

1. WHEN el Usuario accede a la vista principal de recetas, THE Sistema_Recetas SHALL mostrar un botón "📥 Importar XML" en la interfaz
2. WHEN el Usuario hace clic en el Boton_Importar, THE Sistema_Recetas SHALL abrir un selector de archivos que acepte solo archivos .xml
3. WHEN el Usuario selecciona un Archivo_XML válido, THE Sistema_Recetas SHALL procesar el archivo y extraer los datos de la receta
4. THE Sistema_Recetas SHALL validar que el Archivo_XML tenga la estructura correcta antes de procesarlo
5. WHEN la importación es exitosa, THE Sistema_Recetas SHALL mostrar un mensaje de confirmación al Usuario

### Requirement 2

**User Story:** Como usuario del sistema de recetas, quiero que las recetas importadas mantengan toda su información original, para que no se pierdan datos durante el proceso de importación.

#### Acceptance Criteria

1. WHEN el Importador_XML procesa un Archivo_XML, THE Sistema_Recetas SHALL preservar el nombre de la receta exactamente como aparece en el XML
2. WHEN el Archivo_XML contiene una categoría válida, THE Sistema_Recetas SHALL asignar la categoría correcta a la receta importada
3. WHEN el Archivo_XML contiene ingredientes, THE Sistema_Recetas SHALL recrear todos los ingredientes con sus cantidades, unidades y orden correcto
4. WHEN el Archivo_XML contiene método de preparación, THE Sistema_Recetas SHALL preservar el texto completo del método
5. WHEN el Archivo_XML contiene secuencias de adición, THE Sistema_Recetas SHALL recrear todas las secuencias con sus ingredientes y descripciones

### Requirement 3

**User Story:** Como usuario del sistema de recetas, quiero que las recetas importadas incluyan archivos multimedia, para que pueda recuperar completamente recetas con imágenes y videos.

#### Acceptance Criteria

1. WHEN el Archivo_XML contiene imágenes codificadas en Base64, THE Sistema_Recetas SHALL recrear los objetos MediaFile de imagen
2. WHEN el Archivo_XML contiene videos codificados en Base64, THE Sistema_Recetas SHALL recrear los objetos MediaFile de video
3. THE Sistema_Recetas SHALL validar que los datos multimedia sean válidos antes de crear los objetos MediaFile
4. WHEN los datos multimedia están corruptos o son inválidos, THE Sistema_Recetas SHALL importar la receta sin los archivos problemáticos y notificar al Usuario
5. THE Sistema_Recetas SHALL mantener los nombres originales y metadatos de los archivos multimedia

### Requirement 4

**User Story:** Como usuario del sistema de recetas, quiero que el sistema maneje errores de importación de forma clara, para que pueda entender qué salió mal si la importación falla.

#### Acceptance Criteria

1. WHEN el Usuario selecciona un archivo que no es XML válido, THE Sistema_Recetas SHALL mostrar un mensaje de error específico
2. WHEN el Archivo_XML no tiene la estructura esperada, THE Sistema_Recetas SHALL mostrar un mensaje explicando el problema de formato
3. WHEN ocurre un error durante la importación, THE Sistema_Recetas SHALL mantener el estado actual de recetas sin cambios
4. THE Sistema_Recetas SHALL registrar errores detallados en la consola para depuración
5. WHEN la importación falla parcialmente, THE Sistema_Recetas SHALL informar qué elementos se importaron exitosamente y cuáles fallaron

### Requirement 5

**User Story:** Como usuario del sistema de recetas, quiero poder exportar múltiples recetas a la vez en un solo archivo XML, para que pueda hacer respaldos completos o compartir colecciones de recetas fácilmente.

#### Acceptance Criteria

1. WHEN el Usuario accede a la vista principal de recetas, THE Sistema_Recetas SHALL mostrar un botón "📤 Exportar Todas" en la interfaz
2. WHEN el Usuario hace clic en "Exportar Todas", THE Sistema_Recetas SHALL generar un archivo XML que contenga todas las recetas existentes
3. THE Sistema_Recetas SHALL crear una estructura XML con elemento raíz "recipes" que contenga múltiples elementos "recipe"
4. WHEN hay filtros activos, THE Sistema_Recetas SHALL ofrecer la opción de exportar solo las recetas filtradas o todas las recetas
5. THE Sistema_Recetas SHALL generar un nombre de archivo descriptivo que incluya la fecha y cantidad de recetas exportadas

### Requirement 6

**User Story:** Como usuario del sistema de recetas, quiero poder importar archivos XML que contengan múltiples recetas, para que pueda restaurar respaldos completos o importar colecciones de recetas.

#### Acceptance Criteria

1. WHEN el Importador_XML detecta un archivo con múltiples recetas, THE Sistema_Recetas SHALL procesar todas las recetas del archivo
2. THE Sistema_Recetas SHALL mostrar el progreso de importación cuando procese múltiples recetas
3. WHEN algunas recetas se importan exitosamente y otras fallan, THE Sistema_Recetas SHALL importar las exitosas y reportar los errores específicos
4. THE Sistema_Recetas SHALL mostrar un resumen final indicando cuántas recetas se importaron exitosamente
5. WHEN se importan múltiples recetas, THE Sistema_Recetas SHALL actualizar la vista de lista para mostrar todas las nuevas recetas

### Requirement 7

**User Story:** Como usuario del sistema de recetas, quiero que las recetas importadas se integren perfectamente con las existentes, para que pueda gestionar todas mis recetas de forma unificada.

#### Acceptance Criteria

1. WHEN una receta se importa exitosamente, THE Sistema_Recetas SHALL asignar un nuevo ID único a la receta importada
2. WHEN una receta se importa, THE Sistema_Recetas SHALL establecer la fecha de creación como la fecha actual de importación
3. THE Sistema_Recetas SHALL actualizar la vista de lista de recetas para mostrar las nuevas recetas importadas
4. WHEN las recetas importadas tienen categorías, THE Sistema_Recetas SHALL permitir filtrarlas usando los filtros existentes
5. THE Sistema_Recetas SHALL permitir editar, duplicar, eliminar y exportar las recetas importadas como cualquier otra receta