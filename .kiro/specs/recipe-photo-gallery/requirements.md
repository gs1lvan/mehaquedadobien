# Documento de Requisitos

## Introducción

Esta funcionalidad permite mostrar múltiples fotos de una receta en formato de galería interactiva, optimizando el espacio en pantalla y mejorando la experiencia visual del usuario al navegar por recetas con varias imágenes.

## Glosario

- **Sistema de Galería**: El componente de interfaz que muestra múltiples fotos de receta en formato compacto
- **Receta**: Una entrada en el recetario que contiene información sobre preparación de alimentos
- **Foto de Receta**: Imagen asociada a una receta específica
- **Vista de Detalle**: Visualización ampliada de una foto individual
- **Miniatura**: Versión reducida de una foto utilizada en la galería

## Requisitos

### Requisito 1

**Historia de Usuario:** Como usuario del recetario, quiero ver las recetas con múltiples fotos en formato de galería, para que no ocupen tanto espacio vertical en la pantalla.

#### Criterios de Aceptación

1. WHEN una receta contiene dos o más fotos, THE Sistema de Galería SHALL mostrar las fotos en formato de galería compacta
2. WHEN una receta contiene solo una foto, THE Sistema de Galería SHALL mostrar la foto en formato tradicional de imagen única
3. THE Sistema de Galería SHALL mostrar miniaturas de todas las fotos disponibles en la galería
4. WHEN el usuario hace clic en una miniatura, THE Sistema de Galería SHALL mostrar la foto seleccionada en tamaño completo dentro del área de visualización
5. THE Sistema de Galería SHALL ocupar menos espacio vertical que mostrar todas las fotos apiladas verticalmente

### Requisito 2

**Historia de Usuario:** Como usuario del recetario, quiero navegar fácilmente entre las fotos de una receta, para poder ver todos los detalles visuales sin hacer scroll excesivo.

#### Criterios de Aceptación

1. THE Sistema de Galería SHALL proporcionar controles de navegación para avanzar a la siguiente foto
2. THE Sistema de Galería SHALL proporcionar controles de navegación para retroceder a la foto anterior
3. WHEN el usuario está viendo la última foto, THE Sistema de Galería SHALL permitir navegar a la primera foto
4. WHEN el usuario está viendo la primera foto, THE Sistema de Galería SHALL permitir navegar a la última foto
5. THE Sistema de Galería SHALL indicar visualmente cuál foto está siendo mostrada actualmente

### Requisito 3

**Historia de Usuario:** Como usuario del recetario, quiero que la galería sea responsive, para poder ver las fotos correctamente en diferentes dispositivos.

#### Criterios de Aceptación

1. THE Sistema de Galería SHALL adaptarse al ancho disponible en pantalla
2. WHEN el dispositivo es móvil, THE Sistema de Galería SHALL mostrar las miniaturas en un tamaño apropiado para pantallas pequeñas
3. WHEN el dispositivo es tablet o desktop, THE Sistema de Galería SHALL mostrar las miniaturas en un tamaño apropiado para pantallas grandes
4. THE Sistema de Galería SHALL mantener las proporciones de aspecto originales de las fotos
5. THE Sistema de Galería SHALL cargar las imágenes de manera eficiente para no afectar el rendimiento

### Requisito 4

**Historia de Usuario:** Como usuario del recetario, quiero que la galería sea accesible, para poder navegar las fotos usando el teclado o lectores de pantalla.

#### Criterios de Aceptación

1. THE Sistema de Galería SHALL permitir navegación entre fotos usando las teclas de flecha del teclado
2. THE Sistema de Galería SHALL incluir atributos ARIA apropiados para lectores de pantalla
3. THE Sistema de Galería SHALL mantener el foco del teclado visible durante la navegación
4. THE Sistema de Galería SHALL proporcionar texto alternativo descriptivo para cada foto
5. THE Sistema de Galería SHALL cumplir con las pautas WCAG 2.1 nivel AA
