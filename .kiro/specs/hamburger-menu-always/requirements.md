# Requirements Document

## Introduction

Actualmente, la aplicación muestra los botones de acción (Tema, Categorías, Importar, Exportar, Nueva Receta) de dos formas diferentes según el tamaño de pantalla:
- En desktop: Los botones se muestran directamente en el header
- En móvil: Los botones se ocultan en un menú hamburguesa desplegable

Esta funcionalidad requiere cambiar el comportamiento para que **todos los botones estén siempre dentro del menú hamburguesa**, independientemente del tamaño de pantalla, simplificando la interfaz y haciendo el comportamiento más consistente.

## Glossary

- **Header Actions**: Conjunto de botones de acción en la barra superior (Tema, Categorías, Importar, Exportar, Nueva Receta)
- **Hamburger Menu**: Menú desplegable activado por el icono ☰
- **Desktop View**: Vista en pantallas mayores a 768px
- **Mobile View**: Vista en pantallas menores a 768px
- **Menu Toggle**: Botón con icono ☰ que abre/cierra el menú hamburguesa

## Requirements

### Requirement 1: Ocultar botones del header en todas las resoluciones

**User Story:** Como usuario, quiero que los botones de acción no se muestren directamente en el header, para tener una interfaz más limpia y consistente.

#### Acceptance Criteria

1. WHEN la aplicación se carga en cualquier resolución, THE System SHALL ocultar los botones de acción del header (Tema, Categorías, Importar, Exportar, Nueva Receta)
2. WHEN la aplicación se carga en desktop, THE System SHALL mostrar únicamente el título y el botón de menú hamburguesa en el header
3. WHEN la aplicación se carga en móvil, THE System SHALL mantener el mismo comportamiento que en desktop
4. THE System SHALL mantener visible el título "🍳 mehaquedadobien" y el botón hamburguesa en todas las resoluciones

### Requirement 2: Menú hamburguesa siempre visible

**User Story:** Como usuario, quiero que el botón de menú hamburguesa esté siempre visible, para poder acceder a todas las acciones desde cualquier dispositivo.

#### Acceptance Criteria

1. THE System SHALL mostrar el botón de menú hamburguesa (☰) en todas las resoluciones de pantalla
2. WHEN el usuario hace clic en el botón hamburguesa, THE System SHALL desplegar el menú con todas las opciones
3. WHEN el menú está abierto, THE System SHALL mostrar los 5 botones de acción (Tema, Categorías, Importar, Exportar, Nueva Receta)
4. WHEN el usuario hace clic fuera del menú, THE System SHALL cerrar el menú automáticamente
5. WHEN el usuario hace clic en una opción del menú, THE System SHALL ejecutar la acción correspondiente y cerrar el menú

### Requirement 3: Mantener funcionalidad existente

**User Story:** Como usuario, quiero que todas las funciones sigan funcionando igual que antes, solo que accesibles desde el menú hamburguesa.

#### Acceptance Criteria

1. WHEN el usuario hace clic en "☀️ Tema" dentro del menú, THE System SHALL cambiar el tema de la aplicación
2. WHEN el usuario hace clic en "🏷️ Categorías" dentro del menú, THE System SHALL abrir el modal de gestión de categorías
3. WHEN el usuario hace clic en "📥 Importar receta" dentro del menú, THE System SHALL abrir el selector de archivos XML
4. WHEN el usuario hace clic en "📤 Exportar todas las recetas" dentro del menú, THE System SHALL exportar todas las recetas a XML
5. WHEN el usuario hace clic en "➕ Nueva Receta" dentro del menú, THE System SHALL abrir el formulario de nueva receta
6. THE System SHALL mantener todos los event listeners y funcionalidades existentes

### Requirement 4: Responsive y accesibilidad

**User Story:** Como usuario, quiero que el menú hamburguesa sea fácil de usar en cualquier dispositivo y accesible para todos.

#### Acceptance Criteria

1. THE System SHALL mantener el menú hamburguesa responsive en todas las resoluciones
2. WHEN el usuario navega con teclado, THE System SHALL permitir abrir el menú con Enter o Espacio
3. WHEN el menú está abierto, THE System SHALL permitir navegar entre opciones con Tab
4. THE System SHALL mantener los atributos ARIA existentes para accesibilidad
5. THE System SHALL mantener el estilo visual consistente con el diseño actual

### Requirement 5: Eliminar código redundante

**User Story:** Como desarrollador, quiero eliminar el código CSS y JavaScript que maneja la visualización condicional de botones según el tamaño de pantalla.

#### Acceptance Criteria

1. THE System SHALL eliminar las media queries CSS que muestran/ocultan botones según resolución
2. THE System SHALL eliminar el código JavaScript que duplica event listeners para versiones desktop/mobile
3. THE System SHALL mantener un único conjunto de event listeners para el menú hamburguesa
4. THE System SHALL simplificar el HTML eliminando la duplicación de botones
5. THE System SHALL mantener el elemento `#header-actions` oculto permanentemente o eliminarlo
