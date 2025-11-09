# Requirements Document

## Introduction

Esta funcionalidad unifica el sistema de exportación de menús y listas de compra para que utilicen el formato XML estructurado, siguiendo el mismo patrón que la exportación de recetas. Actualmente, menús y listas se exportan como archivos de texto plano (.txt), mientras que las recetas se exportan en XML estructurado. Esta inconsistencia dificulta la interoperabilidad, el procesamiento automatizado y la importación/exportación entre diferentes instancias de la aplicación.

## Glossary

- **RecipeApp**: Sistema principal de gestión de recetas que incluye funcionalidades de menús y listas de compra
- **XMLExporter**: Módulo responsable de generar archivos XML estructurados para exportación
- **Menu**: Entidad que representa una planificación de comidas organizadas por días de la semana
- **ShoppingList**: Entidad que representa una lista de compra con elementos y cantidades
- **Export Button**: Botón de interfaz que inicia el proceso de exportación
- **XML Structure**: Formato de datos jerárquico y estructurado basado en etiquetas
- **File Download**: Proceso de descarga de archivo generado al sistema de archivos del usuario

## Requirements

### Requirement 1: Exportación XML de Menús

**User Story:** Como usuario de la aplicación, quiero exportar mis menús en formato XML estructurado, para poder compartirlos, respaldarlos o importarlos en otras instancias de la aplicación de manera confiable.

#### Acceptance Criteria

1. WHEN THE user clicks en el botón de exportar en el modal de opciones de menú, THE RecipeApp SHALL generar un archivo XML con la estructura completa del menú seleccionado
2. THE RecipeApp SHALL incluir en el XML del menú todos los campos: id, nombre, items (día, comida, cena), fecha de creación y fecha de modificación
3. THE RecipeApp SHALL descargar el archivo XML con el nombre formato `menu-[nombre-sanitizado]-[fecha].xml`
4. WHEN THE exportación se complete exitosamente, THE RecipeApp SHALL mostrar un mensaje de confirmación al usuario
5. IF THE exportación falla, THEN THE RecipeApp SHALL mostrar un mensaje de error descriptivo y restaurar el estado del botón

### Requirement 2: Exportación XML de Listas de Compra

**User Story:** Como usuario de la aplicación, quiero exportar mis listas de compra en formato XML estructurado, para poder compartirlas, respaldarlas o importarlas en otras instancias de la aplicación de manera confiable.

#### Acceptance Criteria

1. WHEN THE user clicks en el botón de exportar en el modal de opciones de lista de compra, THE RecipeApp SHALL generar un archivo XML con la estructura completa de la lista seleccionada
2. THE RecipeApp SHALL incluir en el XML de la lista todos los campos: id, nombre, items (nombre, cantidad, estado completado), fecha de creación y fecha de modificación
3. THE RecipeApp SHALL descargar el archivo XML con el nombre formato `lista-compra-[nombre-sanitizado]-[fecha].xml`
4. WHEN THE exportación se complete exitosamente, THE RecipeApp SHALL mostrar un mensaje de confirmación al usuario
5. IF THE exportación falla, THEN THE RecipeApp SHALL mostrar un mensaje de error descriptivo y restaurar el estado del botón

### Requirement 3: Módulo XMLExporter Extendido

**User Story:** Como desarrollador del sistema, quiero extender el módulo XMLExporter existente para soportar menús y listas de compra, para mantener la consistencia del código y reutilizar la lógica de exportación.

#### Acceptance Criteria

1. THE XMLExporter SHALL incluir un método `exportMenu(menu)` que genere XML estructurado para menús
2. THE XMLExporter SHALL incluir un método `exportShoppingList(list)` que genere XML estructurado para listas de compra
3. THE XMLExporter SHALL utilizar la misma estructura de generación XML que el método existente `exportRecipe(recipe)`
4. THE XMLExporter SHALL generar XML válido y bien formado con codificación UTF-8
5. THE XMLExporter SHALL incluir declaración XML y estructura raíz apropiada para cada tipo de entidad

### Requirement 4: Consistencia de Interfaz de Usuario

**User Story:** Como usuario de la aplicación, quiero que la experiencia de exportación sea consistente entre recetas, menús y listas de compra, para poder usar la funcionalidad de manera intuitiva.

#### Acceptance Criteria

1. THE RecipeApp SHALL mostrar el mismo feedback visual durante la exportación (botón deshabilitado con texto "⏳ Exportando...")
2. THE RecipeApp SHALL utilizar los mismos mensajes de éxito y error para todas las exportaciones
3. THE RecipeApp SHALL restaurar el estado original del botón después de completar o fallar la exportación
4. THE RecipeApp SHALL mantener el mismo patrón de nombres de archivo para todas las exportaciones XML
5. THE RecipeApp SHALL registrar en consola los eventos de exportación exitosa o fallida con el mismo formato

### Requirement 5: Estructura XML Consistente

**User Story:** Como usuario técnico o desarrollador, quiero que todos los archivos XML exportados sigan una estructura consistente y predecible, para poder procesarlos programáticamente de manera confiable.

#### Acceptance Criteria

1. THE XMLExporter SHALL incluir declaración XML `<?xml version="1.0" encoding="UTF-8"?>` en todos los archivos
2. THE XMLExporter SHALL utilizar elementos raíz descriptivos: `<menu>`, `<shoppingList>` según el tipo
3. THE XMLExporter SHALL incluir metadatos de exportación: fecha de exportación, versión de formato
4. THE XMLExporter SHALL escapar correctamente caracteres especiales XML en todos los valores de texto
5. THE XMLExporter SHALL formatear el XML con indentación legible para humanos

### Requirement 6: Compatibilidad con Importación Futura

**User Story:** Como usuario de la aplicación, quiero que los archivos XML exportados puedan ser importados nuevamente en el futuro, para poder restaurar mis datos o migrarlos entre dispositivos.

#### Acceptance Criteria

1. THE XMLExporter SHALL incluir todos los campos necesarios para reconstruir completamente la entidad original
2. THE XMLExporter SHALL preservar los IDs originales de las entidades en el XML
3. THE XMLExporter SHALL incluir timestamps de creación y modificación en formato ISO 8601
4. THE XMLExporter SHALL mantener la estructura de datos anidados (items de menú, items de lista) de manera jerárquica
5. THE XMLExporter SHALL incluir atributos de versión de esquema para facilitar migraciones futuras
