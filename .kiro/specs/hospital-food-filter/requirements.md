# Requirements Document

## Introduction

Esta especificación define la adición de una nueva categoría de filtro "comida de hospital" al sistema de gestión de recetas existente. Esta categoría permitirá a los usuarios clasificar y filtrar recetas que sean apropiadas para entornos hospitalarios o dietas especiales médicas.

## Glossary

- **Sistema_Recetas**: La aplicación web de gestión de recetas mehaquedadobien
- **Filtro_Hospital**: El nuevo filtro de categoría "comida de hospital"
- **Categoria_Hospital**: La nueva categoría "hospital" para clasificar recetas
- **Usuario**: Persona que utiliza la aplicación para gestionar recetas

## Requirements

### Requirement 1

**User Story:** Como usuario del sistema de recetas, quiero poder categorizar mis recetas como "comida de hospital", para que pueda organizarlas según su idoneidad para dietas médicas especiales.

#### Acceptance Criteria

1. WHEN el Usuario accede al formulario de creación de recetas, THE Sistema_Recetas SHALL mostrar "🏥 Hospital" como opción en el selector de categorías
2. WHEN el Usuario selecciona la Categoria_Hospital, THE Sistema_Recetas SHALL guardar la receta con la categoría "hospital"
3. WHEN el Usuario edita una receta existente, THE Sistema_Recetas SHALL permitir cambiar la categoría a "hospital"
4. THE Sistema_Recetas SHALL validar que la Categoria_Hospital sea una opción válida durante el guardado
5. WHEN el Usuario visualiza una receta con Categoria_Hospital, THE Sistema_Recetas SHALL mostrar la etiqueta "🏥 Hospital" en la vista de detalle

### Requirement 2

**User Story:** Como usuario del sistema de recetas, quiero poder filtrar mis recetas por la categoría "comida de hospital", para que pueda encontrar rápidamente recetas apropiadas para dietas médicas.

#### Acceptance Criteria

1. WHEN el Usuario accede a la vista principal de recetas, THE Sistema_Recetas SHALL mostrar un chip de filtro "🏥 Hospital" en la barra de filtros
2. WHEN el Usuario hace clic en el Filtro_Hospital, THE Sistema_Recetas SHALL mostrar únicamente las recetas categorizadas como "hospital"
3. WHEN el Filtro_Hospital está activo, THE Sistema_Recetas SHALL resaltar visualmente el chip de filtro
4. WHEN el Usuario hace clic en "Todas" o desactiva el Filtro_Hospital, THE Sistema_Recetas SHALL mostrar todas las recetas nuevamente
5. THE Sistema_Recetas SHALL mantener la funcionalidad de filtros múltiples existente con el nuevo Filtro_Hospital

### Requirement 3

**User Story:** Como usuario del sistema de recetas, quiero que las recetas de "comida de hospital" se muestren correctamente en todas las vistas, para que pueda identificarlas fácilmente en cualquier parte de la aplicación.

#### Acceptance Criteria

1. WHEN una receta tiene Categoria_Hospital, THE Sistema_Recetas SHALL mostrar "🏥 Hospital" en las tarjetas de la vista de lista
2. WHEN el Usuario exporta una receta con Categoria_Hospital a XML, THE Sistema_Recetas SHALL incluir "hospital" como valor de categoría
3. WHEN el Usuario exporta una receta con Categoria_Hospital a PDF, THE Sistema_Recetas SHALL mostrar "🏥 Hospital" en la sección de categoría
4. THE Sistema_Recetas SHALL mantener la consistencia visual con las demás categorías existentes
5. WHEN el Usuario duplica una receta con Categoria_Hospital, THE Sistema_Recetas SHALL preservar la categoría en la copia