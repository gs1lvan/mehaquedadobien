# Requirements Document

## Introduction

Este documento define los requisitos para unificar la lógica de entrada de tiempo en la aplicación de recetario. Actualmente existen dos campos de tiempo con diferentes implementaciones: "Tiempo Total" (que usa campos separados de horas y minutos) y "Duración" en secuencias (que usa texto libre). El objetivo es crear un componente reutilizable que estandarice la entrada de tiempo en toda la aplicación.

## Glossary

- **TimeInput**: Componente reutilizable para entrada de tiempo con campos separados de horas y minutos
- **RecipeApp**: Aplicación principal del recetario
- **Tiempo Total**: Campo en la sección de Información Básica que indica el tiempo total de preparación de una receta
- **Duración**: Campo en cada secuencia de adición que indica el tiempo estimado para esa secuencia específica
- **Formato de Tiempo**: Representación textual del tiempo en formato "X horas Y minutos" o variaciones simplificadas

## Requirements

### Requirement 1

**User Story:** Como usuario, quiero que todos los campos de tiempo en la aplicación tengan la misma interfaz y comportamiento, para tener una experiencia consistente al introducir duraciones.

#### Acceptance Criteria

1. WHEN el usuario visualiza cualquier campo de tiempo en el formulario, THE RecipeApp SHALL mostrar dos campos numéricos separados etiquetados como "Horas" y "Minutos"

2. WHILE el usuario introduce valores en los campos de tiempo, THE RecipeApp SHALL validar que las horas sean números entre 0 y 99 y los minutos sean números entre 0 y 59

3. WHEN el usuario deja ambos campos de tiempo vacíos, THE RecipeApp SHALL tratar el campo como opcional y no mostrar ningún valor de tiempo

4. WHEN el usuario introduce solo horas sin minutos, THE RecipeApp SHALL formatear el tiempo como "X horas" o "X hora" según corresponda

5. WHEN el usuario introduce solo minutos sin horas, THE RecipeApp SHALL formatear el tiempo como "Y minutos" o "Y minuto" según corresponda

### Requirement 2

**User Story:** Como desarrollador, quiero tener una función reutilizable para crear campos de entrada de tiempo, para poder agregar fácilmente nuevos campos de tiempo en el futuro sin duplicar código.

#### Acceptance Criteria

1. THE RecipeApp SHALL proporcionar una función createTimeInput que genere el HTML necesario para un campo de entrada de tiempo con identificadores únicos

2. THE RecipeApp SHALL proporcionar una función parseTimeInput que convierta los valores de horas y minutos en una cadena de texto formateada

3. THE RecipeApp SHALL proporcionar una función extractTimeValues que extraiga las horas y minutos de una cadena de texto formateada

4. THE RecipeApp SHALL proporcionar una función validateTimeInput que verifique que los valores de tiempo sean válidos

5. WHERE un nuevo campo de tiempo se necesite en el futuro, THE RecipeApp SHALL permitir su implementación utilizando las funciones reutilizables sin modificar la lógica existente

### Requirement 3

**User Story:** Como usuario, quiero que el campo "Duración" en las secuencias de adición use el mismo formato de entrada que el campo "Tiempo Total", para no tener que recordar diferentes formas de introducir tiempo.

#### Acceptance Criteria

1. WHEN el usuario visualiza el formulario de secuencias, THE RecipeApp SHALL mostrar el campo "Duración" con dos campos numéricos para horas y minutos en lugar del campo de texto libre actual

2. WHEN el usuario guarda una secuencia con duración, THE RecipeApp SHALL almacenar el tiempo en formato de texto legible (ej: "2 horas 30 minutos")

3. WHEN el usuario edita una secuencia existente con duración, THE RecipeApp SHALL cargar correctamente los valores de horas y minutos en los campos correspondientes

4. WHEN el usuario visualiza una receta guardada, THE RecipeApp SHALL mostrar la duración de cada secuencia en formato de texto legible

5. WHEN el usuario exporta una receta a XML o PDF, THE RecipeApp SHALL incluir la duración de las secuencias en el formato de texto legible

### Requirement 4

**User Story:** Como usuario, quiero que el campo "Tiempo Total" mantenga su funcionalidad actual, para que no se pierda ninguna característica existente durante la unificación.

#### Acceptance Criteria

1. WHEN el usuario visualiza el formulario de receta, THE RecipeApp SHALL mostrar el campo "Tiempo Total" con la misma apariencia y comportamiento actual

2. WHEN el usuario guarda una receta con tiempo total, THE RecipeApp SHALL almacenar el tiempo en el mismo formato que actualmente utiliza

3. WHEN el usuario edita una receta existente, THE RecipeApp SHALL cargar correctamente los valores de tiempo total sin pérdida de datos

4. WHEN el usuario visualiza una receta guardada, THE RecipeApp SHALL mostrar el tiempo total con el mismo formato actual

5. THE RecipeApp SHALL mantener la compatibilidad con recetas existentes que ya tienen tiempo total almacenado

### Requirement 5

**User Story:** Como usuario, quiero que los campos de tiempo tengan un diseño visual consistente con el resto de la aplicación, para mantener una interfaz coherente y profesional.

#### Acceptance Criteria

1. THE RecipeApp SHALL aplicar los mismos estilos CSS a todos los campos de entrada de tiempo

2. THE RecipeApp SHALL mostrar etiquetas claras ("Horas" y "Minutos") encima o al lado de cada campo numérico

3. THE RecipeApp SHALL incluir texto de ayuda descriptivo debajo de cada campo de tiempo explicando su propósito

4. THE RecipeApp SHALL mantener el espaciado y alineación consistente con otros campos del formulario

5. THE RecipeApp SHALL aplicar los mismos estados visuales (focus, hover, error) que otros campos de entrada
