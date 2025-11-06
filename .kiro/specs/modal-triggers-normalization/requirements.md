# Documento de Requisitos

## Introducción

Este documento define los requisitos para normalizar y estandarizar los estilos de todos los controles que abren modales en la aplicación de gestión de recetas. Actualmente, existen múltiples elementos (botones, badges, enlaces) que disparan modales con estilos inconsistentes dispersos en el CSS general. El objetivo es extraer, unificar y modularizar estos estilos en una hoja CSS independiente para mejorar la mantenibilidad y coherencia visual.

## Glosario

- **Sistema**: La aplicación web de gestión de recetas
- **Control Modal**: Cualquier elemento interactivo (botón, badge, enlace) que al ser activado abre un modal
- **Badge Modal**: Un badge visual que funciona como control modal (ej: recipe-ingredients-badge, recipe-options-badge)
- **Botón Modal**: Un botón que funciona como control modal (ej: category-chip, btn-upload-media)
- **Hoja CSS Modular**: Archivo CSS independiente que contiene estilos específicos para controles modales
- **Estado Hover**: Estado visual cuando el cursor está sobre el control
- **Estado Active**: Estado visual cuando el control está siendo presionado
- **Paleta de Colores**: Conjunto de colores definidos en las variables CSS del sistema

## Requisitos

### Requisito 1

**Historia de Usuario:** Como desarrollador, quiero identificar todos los controles que abren modales en el CSS actual, para poder extraer sus estilos de manera completa

#### Criterios de Aceptación

1. WHEN el análisis del CSS se ejecuta, THE Sistema SHALL identificar todos los selectores que corresponden a badges que disparan modales
2. WHEN el análisis del CSS se ejecuta, THE Sistema SHALL identificar todos los selectores que corresponden a botones que disparan modales
3. WHEN el análisis del CSS se ejecuta, THE Sistema SHALL identificar todos los selectores que corresponden a enlaces que disparan modales
4. WHEN el análisis del CSS se ejecuta, THE Sistema SHALL documentar las propiedades visuales de cada control modal identificado
5. THE Sistema SHALL incluir en la documentación las propiedades de color, tipografía, tamaño, bordes, espaciados, sombras y transiciones

### Requisito 2

**Historia de Usuario:** Como desarrollador, quiero extraer las reglas CSS de controles modales del archivo general, para crear una hoja CSS modular independiente

#### Criterios de Aceptación

1. THE Sistema SHALL crear un archivo llamado modal-triggers.css en el directorio raíz del proyecto
2. WHEN se extraen los estilos, THE Sistema SHALL copiar todas las reglas CSS de badges modales al nuevo archivo
3. WHEN se extraen los estilos, THE Sistema SHALL copiar todas las reglas CSS de botones modales al nuevo archivo
4. WHEN se extraen los estilos, THE Sistema SHALL copiar todas las reglas CSS de enlaces modales al nuevo archivo
5. THE Sistema SHALL preservar los comentarios CSS relevantes durante la extracción
6. THE Sistema SHALL mantener las media queries asociadas a cada control modal

### Requisito 3

**Historia de Usuario:** Como diseñador, quiero unificar los criterios visuales de todos los controles modales, para mantener coherencia en la interfaz

#### Criterios de Aceptación

1. THE Sistema SHALL aplicar una paleta de colores coherente basada en las variables CSS existentes para todos los controles modales
2. THE Sistema SHALL definir tamaños de padding consistentes usando las variables de espaciado del sistema
3. THE Sistema SHALL definir tamaños de font-size consistentes para todos los controles modales
4. THE Sistema SHALL aplicar valores de border-radius uniformes usando las variables de radio del sistema
5. THE Sistema SHALL definir estados hover uniformes con transiciones suaves para todos los controles modales
6. THE Sistema SHALL definir estados active uniformes con efectos de escala para todos los controles modales
7. THE Sistema SHALL aplicar sombras consistentes usando las variables de sombra del sistema

### Requisito 4

**Historia de Usuario:** Como desarrollador, quiero implementar una convención de nombres BEM para los controles modales, para facilitar el mantenimiento del código

#### Criterios de Aceptación

1. THE Sistema SHALL definir la clase base .modal-trigger para todos los controles que abren modales
2. THE Sistema SHALL definir la clase modificadora .modal-trigger--badge para badges modales
3. THE Sistema SHALL definir la clase modificadora .modal-trigger--button para botones modales
4. THE Sistema SHALL definir la clase modificadora .modal-trigger--link para enlaces modales
5. THE Sistema SHALL definir clases de estado .modal-trigger:hover para el estado hover
6. THE Sistema SHALL definir clases de estado .modal-trigger:active para el estado active
7. THE Sistema SHALL documentar la convención de nombres en comentarios CSS

### Requisito 5

**Historia de Usuario:** Como desarrollador, quiero ejemplos de HTML que muestren cómo aplicar las nuevas clases, para facilitar la implementación

#### Criterios de Aceptación

1. THE Sistema SHALL generar ejemplos HTML para badges modales con las nuevas clases
2. THE Sistema SHALL generar ejemplos HTML para botones modales con las nuevas clases
3. THE Sistema SHALL generar ejemplos HTML para enlaces modales con las nuevas clases
4. THE Sistema SHALL incluir ejemplos de combinación de clases base y modificadoras
5. THE Sistema SHALL documentar los ejemplos en un archivo README.md en el mismo directorio que modal-triggers.css

### Requisito 6

**Historia de Usuario:** Como desarrollador, quiero que la nueva hoja CSS sea compatible con los estilos actuales, para evitar romper el diseño existente

#### Criterios de Aceptación

1. THE Sistema SHALL mantener compatibilidad con las clases CSS existentes durante la transición
2. THE Sistema SHALL usar las mismas variables CSS del sistema para colores, espaciados y radios
3. THE Sistema SHALL preservar los valores de z-index existentes para badges y controles
4. THE Sistema SHALL mantener las transiciones y animaciones existentes
5. THE Sistema SHALL respetar los breakpoints de media queries existentes para responsive design
6. THE Sistema SHALL incluir soporte para tema oscuro usando las variables del sistema
