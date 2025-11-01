# Requirements Document

## Introduction

Esta funcionalidad permite a los usuarios crear y gestionar múltiples listas de compra dentro de la aplicación. Los usuarios podrán crear listas, añadir elementos (alimentos) con nombre y cantidad, marcar elementos como completados, y visualizar todas sus listas en un formato desplegable organizado.

## Glossary

- **Shopping List**: Lista de compra que contiene un nombre y múltiples elementos
- **List Item**: Elemento individual dentro de una lista (alimento con nombre y cantidad)
- **Shopping Lists View**: Vista principal donde se muestran todas las listas de compra
- **List Form**: Formulario para crear o editar una lista de compra
- **Completed Item**: Elemento marcado como comprado/completado
- **Collapsible List**: Lista que se puede expandir/colapsar para mostrar/ocultar sus elementos

## Requirements

### Requirement 1: Acceso a listas de compra desde el menú

**User Story:** Como usuario, quiero acceder a mis listas de compra desde el menú principal, para poder gestionar mis compras fácilmente.

#### Acceptance Criteria

1. WHEN el usuario abre el menú hamburguesa, THE System SHALL mostrar la opción "🛒 Listas de Compra"
2. WHEN el usuario hace clic en "🛒 Listas de Compra", THE System SHALL abrir la vista de listas de compra
3. WHEN el usuario hace clic en "🛒 Listas de Compra", THE System SHALL cerrar el menú hamburguesa
4. THE System SHALL ocultar la vista de recetas cuando se muestra la vista de listas de compra

### Requirement 2: Crear nueva lista de compra

**User Story:** Como usuario, quiero crear una nueva lista de compra con un nombre personalizado, para organizar mis compras por categorías o fechas.

#### Acceptance Criteria

1. WHEN el usuario está en la vista de listas de compra, THE System SHALL mostrar un botón "➕ Nueva Lista"
2. WHEN el usuario hace clic en "➕ Nueva Lista", THE System SHALL mostrar un formulario de creación de lista
3. THE System SHALL solicitar un nombre para la lista de compra
4. WHEN el usuario ingresa un nombre y confirma, THE System SHALL crear la lista y guardarla en localStorage
5. WHEN el usuario cancela la creación, THE System SHALL cerrar el formulario sin crear la lista
6. THE System SHALL generar un ID único para cada lista creada

### Requirement 3: Añadir elementos a la lista

**User Story:** Como usuario, quiero añadir elementos (alimentos) a mi lista de compra con nombre y cantidad, para recordar qué necesito comprar.

#### Acceptance Criteria

1. WHEN el usuario está editando una lista, THE System SHALL mostrar un formulario para añadir elementos
2. THE System SHALL solicitar el nombre del elemento (alimento)
3. THE System SHALL solicitar la cantidad del elemento (opcional)
4. WHEN el usuario añade un elemento, THE System SHALL agregarlo a la lista inmediatamente
5. THE System SHALL permitir añadir múltiples elementos sin cerrar el formulario
6. THE System SHALL validar que el nombre del elemento no esté vacío
7. THE System SHALL usar la misma lógica de entrada que los ingredientes de recetas

### Requirement 4: Visualizar listas en formato desplegable

**User Story:** Como usuario, quiero ver todas mis listas de compra en un formato desplegable, para tener una vista organizada y poder expandir solo las que necesito.

#### Acceptance Criteria

1. WHEN el usuario está en la vista de listas de compra, THE System SHALL mostrar todas las listas creadas
2. THE System SHALL mostrar el nombre de cada lista como un encabezado H3
3. WHEN el usuario hace clic en el nombre de una lista, THE System SHALL expandir/colapsar el contenido de esa lista
4. WHEN una lista está expandida, THE System SHALL mostrar todos sus elementos
5. THE System SHALL mostrar cada elemento con su nombre y cantidad
6. THE System SHALL mantener las listas colapsadas por defecto
7. THE System SHALL indicar visualmente si una lista está expandida o colapsada

### Requirement 5: Marcar elementos como completados

**User Story:** Como usuario, quiero marcar elementos como completados mientras hago la compra, para llevar un control de lo que ya he comprado.

#### Acceptance Criteria

1. WHEN el usuario visualiza una lista expandida, THE System SHALL mostrar un checkbox junto a cada elemento
2. WHEN el usuario hace clic en un checkbox, THE System SHALL marcar el elemento como completado
3. WHEN un elemento está completado, THE System SHALL aplicar un estilo visual diferente (tachado, color gris)
4. WHEN el usuario hace clic nuevamente en un checkbox completado, THE System SHALL desmarcar el elemento
5. THE System SHALL guardar el estado de completado en localStorage
6. THE System SHALL mantener el estado de completado al recargar la página

### Requirement 6: Editar lista de compra

**User Story:** Como usuario, quiero editar el nombre de una lista y sus elementos, para mantener mis listas actualizadas.

#### Acceptance Criteria

1. WHEN el usuario visualiza una lista, THE System SHALL mostrar un botón de editar
2. WHEN el usuario hace clic en editar, THE System SHALL abrir el formulario de edición
3. THE System SHALL permitir cambiar el nombre de la lista
4. THE System SHALL permitir añadir nuevos elementos a la lista
5. THE System SHALL permitir eliminar elementos existentes
6. WHEN el usuario guarda los cambios, THE System SHALL actualizar la lista en localStorage
7. WHEN el usuario cancela la edición, THE System SHALL descartar los cambios

### Requirement 7: Eliminar lista de compra

**User Story:** Como usuario, quiero eliminar listas de compra que ya no necesito, para mantener mi vista organizada.

#### Acceptance Criteria

1. WHEN el usuario visualiza una lista, THE System SHALL mostrar un botón de eliminar
2. WHEN el usuario hace clic en eliminar, THE System SHALL solicitar confirmación
3. WHEN el usuario confirma la eliminación, THE System SHALL eliminar la lista de localStorage
4. WHEN el usuario confirma la eliminación, THE System SHALL actualizar la vista sin la lista eliminada
5. WHEN el usuario cancela la eliminación, THE System SHALL mantener la lista sin cambios

### Requirement 8: Persistencia de datos

**User Story:** Como usuario, quiero que mis listas de compra se guarden automáticamente, para no perder mi información al cerrar la aplicación.

#### Acceptance Criteria

1. THE System SHALL guardar todas las listas en localStorage
2. WHEN el usuario crea una lista, THE System SHALL guardarla inmediatamente
3. WHEN el usuario añade un elemento, THE System SHALL guardar el cambio inmediatamente
4. WHEN el usuario marca un elemento como completado, THE System SHALL guardar el estado inmediatamente
5. WHEN el usuario recarga la página, THE System SHALL cargar todas las listas guardadas
6. THE System SHALL mantener el orden de las listas
7. THE System SHALL mantener el estado de completado de cada elemento

### Requirement 9: Interfaz responsive y accesible

**User Story:** Como usuario, quiero que las listas de compra funcionen bien en cualquier dispositivo y sean accesibles.

#### Acceptance Criteria

1. THE System SHALL mostrar las listas de forma responsive en móvil, tablet y desktop
2. THE System SHALL permitir navegación con teclado (Tab, Enter, Space)
3. THE System SHALL incluir atributos ARIA para accesibilidad
4. THE System SHALL mantener touch targets de al menos 44x44px en móvil
5. THE System SHALL ser compatible con lectores de pantalla
6. THE System SHALL mantener el diseño consistente con el resto de la aplicación

### Requirement 10: Contador de elementos

**User Story:** Como usuario, quiero ver cuántos elementos tiene cada lista y cuántos he completado, para tener un resumen rápido.

#### Acceptance Criteria

1. WHEN el usuario visualiza las listas, THE System SHALL mostrar el número total de elementos en cada lista
2. THE System SHALL mostrar el número de elementos completados
3. THE System SHALL mostrar el formato "X/Y completados" donde X es completados e Y es total
4. WHEN todos los elementos están completados, THE System SHALL indicar visualmente que la lista está completa
5. THE System SHALL actualizar el contador automáticamente al marcar/desmarcar elementos

### Requirement 11: Copiar lista al portapapeles

**User Story:** Como usuario, quiero copiar rápidamente todos los elementos de una lista al portapapeles, para compartirla o usarla en otras aplicaciones.

#### Acceptance Criteria

1. WHEN el usuario visualiza una lista, THE System SHALL mostrar un botón de copiar (📋)
2. WHEN el usuario hace clic en el botón copiar, THE System SHALL copiar todos los elementos al portapapeles
3. THE System SHALL formatear la lista como texto con el nombre de la lista y cada elemento en una línea
4. THE System SHALL incluir la cantidad de cada elemento si está disponible
5. WHEN la copia es exitosa, THE System SHALL mostrar una notificación de confirmación
6. WHEN la copia falla, THE System SHALL mostrar un mensaje de error
7. THE System SHALL usar Clipboard API con fallback para navegadores antiguos
8. THE System SHALL copiar solo los elementos no completados por defecto
9. THE System SHALL incluir una opción para copiar todos los elementos (completados y no completados)
