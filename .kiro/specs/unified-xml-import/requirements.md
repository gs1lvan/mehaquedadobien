# Requirements Document

## Introduction

Esta funcionalidad extiende el sistema de importación para soportar archivos XML de menús y listas de compra, completando la unificación del sistema de importación/exportación. Actualmente, menús y listas solo pueden importarse desde archivos de texto plano (.txt), mientras que las recetas ya soportan importación XML completa. Esta funcionalidad permitirá importar los archivos XML generados por el sistema de exportación unificado.

## Glossary

- **RecipeApp**: Sistema principal de gestión de recetas que incluye funcionalidades de menús y listas de compra
- **XMLImporter**: Módulo responsable de parsear archivos XML y crear entidades desde ellos
- **Menu**: Entidad que representa una planificación de comidas organizadas por días de la semana
- **ShoppingList**: Entidad que representa una lista de compra con elementos y cantidades
- **Import Button**: Botón de interfaz que inicia el proceso de importación
- **XML Parser**: Componente que analiza y valida la estructura XML
- **File Validation**: Proceso de verificación de tipo, tamaño y formato de archivo

## Requirements

### Requirement 1: Importación XML de Menús

**User Story:** Como usuario de la aplicación, quiero importar menús desde archivos XML, para poder restaurar mis menús exportados o compartir menús entre diferentes instancias de la aplicación.

#### Acceptance Criteria

1. WHEN THE user selecciona un archivo XML de menú mediante el botón de importar, THE RecipeApp SHALL validar que el archivo sea XML válido
2. THE XMLImporter SHALL parsear la estructura XML del menú y extraer todos los campos: id, nombre, items, fechas
3. THE RecipeApp SHALL crear un nuevo menú con los datos importados preservando la estructura original
4. WHEN THE importación se complete exitosamente, THE RecipeApp SHALL mostrar un mensaje de confirmación y renderizar el menú importado
5. IF THE importación falla, THEN THE RecipeApp SHALL mostrar un mensaje de error descriptivo indicando la causa del fallo

### Requirement 2: Importación XML de Listas de Compra

**User Story:** Como usuario de la aplicación, quiero importar listas de compra desde archivos XML, para poder restaurar mis listas exportadas o compartir listas entre diferentes instancias de la aplicación.

#### Acceptance Criteria

1. WHEN THE user selecciona un archivo XML de lista mediante el botón de importar, THE RecipeApp SHALL validar que el archivo sea XML válido
2. THE XMLImporter SHALL parsear la estructura XML de la lista y extraer todos los campos: id, nombre, enabled, items, fechas
3. THE RecipeApp SHALL crear una nueva lista con los datos importados preservando estados de completado
4. WHEN THE importación se complete exitosamente, THE RecipeApp SHALL mostrar un mensaje de confirmación y renderizar la lista importada
5. IF THE importación falla, THEN THE RecipeApp SHALL mostrar un mensaje de error descriptivo indicando la causa del fallo

### Requirement 3: Extensión del Módulo XMLImporter

**User Story:** Como desarrollador del sistema, quiero extender el módulo XMLImporter existente para soportar menús y listas de compra, para mantener la consistencia del código y reutilizar la lógica de importación.

#### Acceptance Criteria

1. THE XMLImporter SHALL incluir un método `importMenuFromFile(file)` que procese archivos XML de menús
2. THE XMLImporter SHALL incluir un método `importShoppingListFromFile(file)` que procese archivos XML de listas
3. THE XMLImporter SHALL utilizar la misma estructura de validación que el método existente `importFromFile(file)` para recetas
4. THE XMLImporter SHALL reutilizar los métodos de validación de archivo existentes (tipo, tamaño, formato)
5. THE XMLImporter SHALL generar errores con la clase ImportError existente para consistencia

### Requirement 4: Validación de Estructura XML

**User Story:** Como usuario de la aplicación, quiero que el sistema valide los archivos XML antes de importarlos, para evitar errores y corrupción de datos.

#### Acceptance Criteria

1. THE XMLImporter SHALL validar que el archivo XML tenga la estructura raíz correcta (`<menu>` o `<shoppingList>`)
2. THE XMLImporter SHALL validar que todos los campos requeridos estén presentes (id, name, items)
3. THE XMLImporter SHALL validar que los items tengan la estructura correcta según el tipo de entidad
4. IF THE estructura XML es inválida, THEN THE XMLImporter SHALL lanzar un ImportError con mensaje descriptivo
5. THE XMLImporter SHALL manejar campos opcionales ausentes sin generar errores

### Requirement 5: Manejo de Conflictos de ID

**User Story:** Como usuario de la aplicación, quiero que el sistema maneje automáticamente conflictos de ID al importar, para evitar sobrescribir datos existentes accidentalmente.

#### Acceptance Criteria

1. WHEN THE un menú importado tiene un ID que ya existe, THE RecipeApp SHALL generar un nuevo ID único
2. WHEN THE una lista importada tiene un ID que ya existe, THE RecipeApp SHALL generar un nuevo ID único
3. THE RecipeApp SHALL preservar los IDs de items dentro de menús y listas
4. THE RecipeApp SHALL actualizar las fechas de creación y modificación al momento de la importación
5. THE RecipeApp SHALL notificar al usuario si se generaron nuevos IDs durante la importación

### Requirement 6: Compatibilidad con Exportación

**User Story:** Como usuario de la aplicación, quiero que los archivos XML exportados puedan ser importados sin problemas, para garantizar la integridad del ciclo de exportación/importación.

#### Acceptance Criteria

1. THE XMLImporter SHALL poder importar todos los archivos XML generados por XMLExporter.exportMenu()
2. THE XMLImporter SHALL poder importar todos los archivos XML generados por XMLExporter.exportShoppingList()
3. THE XMLImporter SHALL reconocer y procesar la sección de metadata (exportDate, exportVersion)
4. THE XMLImporter SHALL manejar correctamente los valores booleanos (completed, enabled) en formato texto
5. THE XMLImporter SHALL preservar todos los datos exportados sin pérdida de información

### Requirement 7: Retrocompatibilidad con Formato TXT

**User Story:** Como usuario de la aplicación, quiero poder seguir importando mis archivos .txt antiguos, para no perder acceso a mis datos históricos.

#### Acceptance Criteria

1. THE RecipeApp SHALL detectar automáticamente el formato del archivo (XML o TXT) basándose en la extensión
2. WHEN THE el archivo es .txt, THE RecipeApp SHALL usar el importador de texto plano existente
3. WHEN THE el archivo es .xml, THE RecipeApp SHALL usar el nuevo importador XML
4. THE RecipeApp SHALL mostrar mensajes de error apropiados si el formato no coincide con la extensión
5. THE RecipeApp SHALL mantener la funcionalidad existente de importación TXT sin cambios

### Requirement 8: Feedback de Usuario Durante Importación

**User Story:** Como usuario de la aplicación, quiero ver el progreso de la importación, para saber que el sistema está procesando mi archivo correctamente.

#### Acceptance Criteria

1. WHEN THE la importación inicia, THE RecipeApp SHALL mostrar un indicador de carga o mensaje de procesamiento
2. THE RecipeApp SHALL deshabilitar el botón de importar durante el proceso
3. WHEN THE la importación se complete, THE RecipeApp SHALL mostrar un mensaje de éxito con el nombre del menú/lista importado
4. WHEN THE la importación falle, THE RecipeApp SHALL mostrar un mensaje de error específico
5. THE RecipeApp SHALL restaurar el estado del botón después de completar o fallar la importación
