# Requirements Document

## Introduction

Esta funcionalidad permite a los usuarios copiar rápidamente la lista de ingredientes de una receta directamente desde la tarjeta de receta en la página de inicio, sin necesidad de abrir la vista de detalle. Un botón circular con icono aparecerá en la esquina inferior derecha de la imagen de cada receta, similar al badge de tiempo de duración existente.

## Glossary

- **Recipe Card**: Tarjeta visual que representa una receta en la vista de lista/grid de la página de inicio
- **Ingredients Badge**: Botón circular con icono que aparece sobre la imagen de la receta
- **Clipboard**: Portapapeles del sistema operativo donde se copian los ingredientes
- **Toast Notification**: Mensaje temporal que confirma que los ingredientes han sido copiados
- **Recipe Grid**: Cuadrícula de tarjetas de recetas en la página principal

## Requirements

### Requirement 1

**User Story:** Como usuario, quiero ver un botón de copiar ingredientes en cada tarjeta de receta, para poder identificar rápidamente qué recetas tienen esta funcionalidad disponible

#### Acceptance Criteria

1. WHEN THE System renderiza una tarjeta de receta en la página de inicio, THE System SHALL mostrar un badge circular en la esquina inferior derecha de la imagen de la receta
2. THE Badge SHALL contener un icono representativo de ingredientes (📋 o similar)
3. THE Badge SHALL tener un estilo visual consistente con los badges existentes de tiempo de duración
4. THE Badge SHALL ser visible sobre la imagen de la receta sin obstruir contenido importante
5. THE Badge SHALL incluir un efecto hover que indique que es clickeable

### Requirement 2

**User Story:** Como usuario, quiero copiar los ingredientes de una receta al portapapeles con un solo clic, para poder pegarlos rápidamente en otra aplicación

#### Acceptance Criteria

1. WHEN el usuario hace clic en el Ingredients Badge, THE System SHALL copiar la lista completa de ingredientes al Clipboard
2. THE System SHALL formatear los ingredientes como texto plano con cada ingrediente en una línea separada
3. IF un ingrediente tiene cantidad y unidad, THEN THE System SHALL incluir esta información en el formato "cantidad unidad nombre"
4. IF un ingrediente no tiene cantidad, THEN THE System SHALL incluir solo el nombre del ingrediente
5. THE System SHALL prevenir la navegación a la vista de detalle cuando se hace clic en el Ingredients Badge

### Requirement 3

**User Story:** Como usuario, quiero recibir confirmación visual cuando los ingredientes se copian, para saber que la acción se completó exitosamente

#### Acceptance Criteria

1. WHEN los ingredientes se copian exitosamente al Clipboard, THE System SHALL mostrar un Toast Notification con el mensaje "Ingredientes copiados"
2. THE Toast Notification SHALL aparecer en una posición visible de la pantalla durante 3 segundos
3. THE Toast Notification SHALL desaparecer automáticamente después del tiempo especificado
4. THE System SHALL aplicar una animación suave de entrada y salida al Toast Notification
5. IF la copia al portapapeles falla, THEN THE System SHALL mostrar un mensaje de error apropiado

### Requirement 4

**User Story:** Como usuario, quiero que el botón de copiar ingredientes funcione correctamente en dispositivos móviles, para poder usar esta funcionalidad en cualquier dispositivo

#### Acceptance Criteria

1. WHEN el usuario toca el Ingredients Badge en un dispositivo móvil, THE System SHALL copiar los ingredientes al Clipboard
2. THE Badge SHALL tener un tamaño táctil adecuado (mínimo 44x44 píxeles) en dispositivos móviles
3. THE System SHALL prevenir conflictos con gestos táctiles del navegador
4. THE Toast Notification SHALL ser visible y legible en pantallas móviles
5. THE Badge SHALL mantener su posición y visibilidad en diferentes tamaños de pantalla

### Requirement 5

**User Story:** Como usuario, quiero que el formato de los ingredientes copiados sea legible y útil, para poder usarlos fácilmente en otras aplicaciones

#### Acceptance Criteria

1. THE System SHALL incluir el nombre de la receta como primera línea del texto copiado
2. THE System SHALL separar el título de la receta de los ingredientes con una línea en blanco
3. THE System SHALL listar cada ingrediente en una línea separada
4. THE System SHALL mantener el orden original de los ingredientes de la receta
5. IF la receta no tiene ingredientes, THEN THE System SHALL copiar solo el nombre de la receta con una nota indicando que no hay ingredientes
