# Requirements Document

## Introduction

Cuando un usuario reordena ingredientes en una lista de compra, la lista se cierra automáticamente, lo cual interrumpe el flujo de trabajo. Esta funcionalidad mejorará la experiencia de usuario manteniendo la lista expandida durante y después del reordenamiento de elementos.

## Glossary

- **Shopping List**: Lista de compra que contiene elementos
- **List Item**: Elemento individual dentro de una lista de compra
- **Reorder**: Acción de cambiar el orden de los elementos mediante drag & drop o botones
- **Expanded State**: Estado en el que la lista muestra todos sus elementos
- **Collapsed State**: Estado en el que la lista oculta sus elementos

## Requirements

### Requirement 1: Mantener lista expandida durante reordenamiento

**User Story:** Como usuario, quiero que la lista permanezca abierta mientras reordeno elementos, para poder ver todos los elementos y continuar organizándolos sin interrupciones.

#### Acceptance Criteria

1. WHEN el usuario reordena un elemento en una lista expandida, THE System SHALL mantener la lista en estado expandido
2. WHEN el usuario suelta un elemento después de reordenarlo, THE System SHALL mantener la lista en estado expandido
3. WHEN el usuario reordena múltiples elementos consecutivamente, THE System SHALL mantener la lista en estado expandido durante toda la operación
4. THE System SHALL preservar el estado de expansión de la lista durante el guardado automático
5. THE System SHALL mantener el foco visual en la lista durante el reordenamiento

### Requirement 2: Preservar estado de expansión en operaciones de lista

**User Story:** Como usuario, quiero que la lista permanezca abierta cuando realizo cualquier operación sobre sus elementos, para mantener el contexto visual de mi trabajo.

#### Acceptance Criteria

1. WHEN el usuario añade un nuevo elemento a una lista expandida, THE System SHALL mantener la lista en estado expandido
2. WHEN el usuario elimina un elemento de una lista expandida, THE System SHALL mantener la lista en estado expandido
3. WHEN el usuario edita un elemento de una lista expandida, THE System SHALL mantener la lista en estado expandido
4. WHEN el usuario marca un elemento como completado en una lista expandida, THE System SHALL mantener la lista en estado expandido
5. THE System SHALL solo colapsar la lista cuando el usuario hace clic explícitamente en el encabezado de la lista

### Requirement 3: Feedback visual durante reordenamiento

**User Story:** Como usuario, quiero ver feedback visual claro mientras reordeno elementos, para entender qué estoy moviendo y dónde lo estoy colocando.

#### Acceptance Criteria

1. WHEN el usuario comienza a arrastrar un elemento, THE System SHALL aplicar un estilo visual distintivo al elemento
2. WHEN el usuario arrastra un elemento sobre una posición válida, THE System SHALL mostrar un indicador de posición de inserción
3. WHEN el usuario suelta un elemento en una nueva posición, THE System SHALL animar la transición del elemento a su nueva ubicación
4. THE System SHALL mantener visible el elemento que se está arrastrando durante toda la operación
5. THE System SHALL restaurar el estilo normal del elemento después de completar el reordenamiento

