# Requirements Document

## Introduction

Este documento define los requisitos para permitir a los usuarios crear y gestionar categorías personalizadas en la aplicación de recetario. Actualmente, las categorías están predefinidas en el código (carne, verdura, pescado, etc.). Esta funcionalidad permitirá a los usuarios agregar sus propias categorías y eliminar las que no necesiten, proporcionando mayor flexibilidad y personalización.

## Glossary

- **Categoría Predefinida**: Categoría que viene por defecto con la aplicación (carne, verdura, pescado, fruta, cereales, mix, con-huevo, pollo, escabeche, hospital)
- **Categoría Personalizada**: Categoría creada por el usuario
- **CategoryManager**: Componente que gestiona las categorías (crear, eliminar, listar)
- **RecipeApp**: Aplicación principal del recetario
- **Chip de Filtro**: Botón visual que representa una categoría en la barra de filtros
- **Selector de Categoría**: Dropdown en el formulario de receta para seleccionar la categoría

## Requirements

### Requirement 1

**User Story:** Como usuario, quiero poder crear mis propias categorías personalizadas, para organizar mis recetas según mis necesidades específicas.

#### Acceptance Criteria

1. WHEN el usuario accede a la gestión de categorías, THE RecipeApp SHALL mostrar una interfaz para crear nuevas categorías

2. WHEN el usuario introduce un nombre para una nueva categoría, THE RecipeApp SHALL validar que el nombre no esté vacío y tenga entre 2 y 30 caracteres

3. WHEN el usuario introduce un nombre de categoría que ya existe, THE RecipeApp SHALL mostrar un mensaje de error indicando que la categoría ya existe

4. WHEN el usuario selecciona un emoji para la categoría, THE RecipeApp SHALL permitir elegir entre una lista de emojis predefinidos o introducir uno personalizado

5. WHEN el usuario guarda una nueva categoría, THE RecipeApp SHALL almacenar la categoría en localStorage y actualizar inmediatamente todos los selectores y filtros

### Requirement 2

**User Story:** Como usuario, quiero poder eliminar categorías que no uso, para mantener mi lista de categorías limpia y relevante.

#### Acceptance Criteria

1. WHEN el usuario visualiza la lista de categorías, THE RecipeApp SHALL mostrar un botón de eliminar junto a cada categoría personalizada

2. WHEN el usuario intenta eliminar una categoría predefinida, THE RecipeApp SHALL mostrar un mensaje indicando que las categorías predefinidas no se pueden eliminar

3. WHEN el usuario intenta eliminar una categoría que está siendo usada por recetas, THE RecipeApp SHALL mostrar una advertencia con el número de recetas afectadas

4. WHEN el usuario confirma la eliminación de una categoría en uso, THE RecipeApp SHALL cambiar la categoría de las recetas afectadas a "Sin categoría"

5. WHEN el usuario elimina una categoría, THE RecipeApp SHALL actualizar inmediatamente todos los selectores y filtros

### Requirement 3

**User Story:** Como usuario, quiero que mis categorías personalizadas aparezcan en todos los lugares donde se usan categorías, para poder usarlas igual que las predefinidas.

#### Acceptance Criteria

1. WHEN el usuario crea una categoría personalizada, THE RecipeApp SHALL agregar la categoría al selector de categorías en el formulario de receta

2. WHEN el usuario crea una categoría personalizada, THE RecipeApp SHALL agregar un chip de filtro en la barra de filtros

3. WHEN el usuario filtra por una categoría personalizada, THE RecipeApp SHALL mostrar solo las recetas de esa categoría

4. WHEN el usuario visualiza una receta con categoría personalizada, THE RecipeApp SHALL mostrar el emoji y nombre de la categoría correctamente

5. WHEN el usuario exporta una receta con categoría personalizada, THE RecipeApp SHALL incluir la categoría en el XML y PDF

### Requirement 4

**User Story:** Como usuario, quiero que mis categorías personalizadas se guarden permanentemente, para no tener que recrearlas cada vez que uso la aplicación.

#### Acceptance Criteria

1. WHEN el usuario crea una categoría personalizada, THE RecipeApp SHALL guardar la categoría en localStorage

2. WHEN el usuario recarga la aplicación, THE RecipeApp SHALL cargar todas las categorías personalizadas desde localStorage

3. WHEN el usuario elimina una categoría personalizada, THE RecipeApp SHALL eliminar la categoría de localStorage

4. THE RecipeApp SHALL mantener las categorías predefinidas siempre disponibles aunque no estén en localStorage

5. WHEN el usuario importa un XML con una categoría desconocida, THE RecipeApp SHALL crear automáticamente esa categoría como personalizada

### Requirement 5

**User Story:** Como usuario, quiero acceder fácilmente a la gestión de categorías, para poder administrarlas cuando lo necesite.

#### Acceptance Criteria

1. THE RecipeApp SHALL proporcionar un botón o enlace visible para acceder a la gestión de categorías

2. WHEN el usuario hace clic en el botón de gestión de categorías, THE RecipeApp SHALL mostrar un modal o panel con la lista de categorías

3. THE RecipeApp SHALL mostrar las categorías predefinidas y personalizadas en secciones separadas o con indicadores visuales

4. WHEN el usuario cierra el modal de gestión de categorías, THE RecipeApp SHALL guardar todos los cambios realizados

5. THE RecipeApp SHALL mostrar un contador del número de recetas que usa cada categoría

### Requirement 6

**User Story:** Como usuario, quiero poder editar el nombre, emoji y color de mis categorías personalizadas, para corregir errores o actualizar la información.

#### Acceptance Criteria

1. WHEN el usuario visualiza una categoría personalizada, THE RecipeApp SHALL mostrar un botón de editar

2. WHEN el usuario edita una categoría, THE RecipeApp SHALL permitir cambiar el nombre, el emoji y el color

3. WHEN el usuario guarda los cambios de una categoría, THE RecipeApp SHALL actualizar todas las recetas que usan esa categoría

4. WHEN el usuario intenta editar una categoría predefinida, THE RecipeApp SHALL mostrar un mensaje indicando que no se puede editar

5. WHEN el usuario cambia el nombre de una categoría a uno que ya existe, THE RecipeApp SHALL mostrar un mensaje de error

### Requirement 7

**User Story:** Como usuario, quiero que las categorías personalizadas tengan colores distintivos, para identificarlas visualmente de forma rápida.

#### Acceptance Criteria

1. WHEN el usuario crea una categoría personalizada, THE RecipeApp SHALL permitir seleccionar un color de una paleta predefinida

2. WHEN el usuario visualiza un chip de filtro de categoría personalizada, THE RecipeApp SHALL aplicar el color seleccionado

3. WHEN el usuario visualiza una tarjeta de receta con categoría personalizada, THE RecipeApp SHALL aplicar el color seleccionado al badge de categoría

4. THE RecipeApp SHALL proporcionar al menos 12 colores diferentes en la paleta

5. THE RecipeApp SHALL guardar el color seleccionado junto con la categoría en localStorage
