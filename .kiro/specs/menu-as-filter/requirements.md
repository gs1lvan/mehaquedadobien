# Requirements Document

## Introduction

Esta funcionalidad permite convertir menús en filtros personalizados que aparecen en la página de inicio junto a las categorías. Los usuarios podrán marcar ciertos menús como "filtros" y usarlos para filtrar rápidamente las recetas que contienen. Esto facilita la navegación y permite crear agrupaciones personalizadas de recetas más allá de las categorías tradicionales (por ejemplo: "Menú Navidad", "Menú Dieta", "Menú Verano").

## Glossary

- **RecipeApp**: Sistema principal de gestión de recetas
- **Menu**: Entidad que representa una planificación de comidas organizadas por días
- **Menu Filter**: Menú marcado como filtro que aparece en la página de inicio
- **Filter Chip**: Elemento visual clickeable que representa un filtro (categoría o menú)
- **Recipe List View**: Vista principal que muestra el grid/lista de recetas
- **Menu Badge**: Indicador visual que muestra que un menú está activo como filtro

## Requirements

### Requirement 1: Convertir Menú en Filtro

**User Story:** Como usuario de la aplicación, quiero poder convertir un menú en un filtro, para poder acceder rápidamente a las recetas de ese menú desde la página de inicio.

#### Acceptance Criteria

1. WHEN THE user visualiza un menú en la vista de menús, THE RecipeApp SHALL mostrar un botón "🔖 Convertir en Filtro"
2. WHEN THE user hace click en "Convertir en Filtro", THE RecipeApp SHALL marcar el menú como filtro activo
3. THE RecipeApp SHALL almacenar el estado de filtro del menú en localStorage
4. WHEN THE menú se convierte en filtro, THE RecipeApp SHALL cambiar el botón a "❌ Quitar de Filtros"
5. THE RecipeApp SHALL mostrar un indicador visual en el menú indicando que es un filtro activo

### Requirement 2: Mostrar Filtros de Menú en Página de Inicio

**User Story:** Como usuario de la aplicación, quiero ver los menús marcados como filtros en la página de inicio, para poder filtrar recetas rápidamente.

#### Acceptance Criteria

1. THE RecipeApp SHALL mostrar una nueva sección "Filtrar por menú:" en la página de inicio
2. THE RecipeApp SHALL mostrar esta sección debajo de "Filtrar por categoría:"
3. THE RecipeApp SHALL mostrar un chip por cada menú marcado como filtro
4. THE RecipeApp SHALL usar el icono 📋 para los chips de menú
5. IF THE no hay menús marcados como filtros, THEN THE RecipeApp SHALL ocultar la sección "Filtrar por menú:"

### Requirement 3: Filtrar Recetas por Menú

**User Story:** Como usuario de la aplicación, quiero hacer click en un filtro de menú para ver solo las recetas de ese menú, para encontrar rápidamente las recetas que planeo cocinar.

#### Acceptance Criteria

1. WHEN THE user hace click en un chip de filtro de menú, THE RecipeApp SHALL filtrar las recetas mostrando solo las que aparecen en ese menú
2. THE RecipeApp SHALL extraer los nombres de recetas de los campos lunch y dinner de todos los items del menú
3. THE RecipeApp SHALL buscar recetas cuyo nombre coincida con los nombres extraídos del menú
4. THE RecipeApp SHALL aplicar el filtro de menú en combinación con filtros de categoría si están activos
5. THE RecipeApp SHALL marcar visualmente el chip de menú como activo cuando está filtrando

### Requirement 4: Desactivar Filtro de Menú

**User Story:** Como usuario de la aplicación, quiero poder desactivar un filtro de menú activo, para volver a ver todas las recetas.

#### Acceptance Criteria

1. WHEN THE user hace click en un chip de menú activo, THE RecipeApp SHALL desactivar el filtro
2. THE RecipeApp SHALL volver a mostrar todas las recetas (respetando otros filtros activos)
3. THE RecipeApp SHALL quitar el estilo visual de "activo" del chip
4. WHEN THE user hace click en "Todos" en filtros de categoría, THE RecipeApp SHALL desactivar también los filtros de menú
5. THE RecipeApp SHALL mantener el estado del filtro en la sesión actual

### Requirement 5: Quitar Menú de Filtros

**User Story:** Como usuario de la aplicación, quiero poder quitar un menú de los filtros disponibles, para mantener solo los filtros que uso frecuentemente.

#### Acceptance Criteria

1. WHEN THE user hace click en "Quitar de Filtros" en un menú, THE RecipeApp SHALL desmarcar el menú como filtro
2. THE RecipeApp SHALL remover el chip del menú de la página de inicio
3. THE RecipeApp SHALL actualizar el estado en localStorage
4. THE RecipeApp SHALL cambiar el botón de vuelta a "Convertir en Filtro"
5. IF THE el filtro estaba activo, THEN THE RecipeApp SHALL desactivarlo automáticamente

### Requirement 6: Persistencia de Estado de Filtros

**User Story:** Como usuario de la aplicación, quiero que mis menús marcados como filtros se mantengan entre sesiones, para no tener que configurarlos cada vez.

#### Acceptance Criteria

1. THE RecipeApp SHALL almacenar en localStorage qué menús están marcados como filtros
2. WHEN THE la aplicación se carga, THE RecipeApp SHALL restaurar los menús marcados como filtros
3. THE RecipeApp SHALL mostrar automáticamente la sección "Filtrar por menú:" si hay filtros guardados
4. THE RecipeApp SHALL mantener el estado de filtro incluso si el menú se edita
5. IF THE un menú se elimina, THEN THE RecipeApp SHALL remover automáticamente su estado de filtro

### Requirement 7: Indicadores Visuales

**User Story:** Como usuario de la aplicación, quiero ver claramente qué menús están marcados como filtros, para saber cuáles están disponibles en la página de inicio.

#### Acceptance Criteria

1. THE RecipeApp SHALL mostrar un badge o indicador en menús que son filtros activos
2. THE RecipeApp SHALL usar un color o estilo distintivo para el indicador
3. THE RecipeApp SHALL mostrar el texto "(FILTRO ACTIVO) ✓" junto al nombre del menú
4. THE RecipeApp SHALL mantener el indicador visible cuando el menú está expandido o colapsado
5. THE RecipeApp SHALL actualizar el indicador inmediatamente al cambiar el estado de filtro

### Requirement 8: Compatibilidad con Filtros Existentes

**User Story:** Como usuario de la aplicación, quiero que los filtros de menú funcionen junto con los filtros de categoría existentes, para poder combinar ambos tipos de filtrado.

#### Acceptance Criteria

1. THE RecipeApp SHALL permitir tener activos simultáneamente un filtro de categoría y un filtro de menú
2. WHEN THE ambos filtros están activos, THE RecipeApp SHALL mostrar recetas que cumplan ambas condiciones (AND lógico)
3. THE RecipeApp SHALL actualizar el contador de recetas considerando ambos filtros
4. THE RecipeApp SHALL mantener la funcionalidad existente de filtros de categoría sin cambios
5. THE RecipeApp SHALL permitir desactivar filtros independientemente (categoría o menú)
