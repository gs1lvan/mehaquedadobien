# Requirements Document

## Introduction

Esta funcionalidad permite a los usuarios escanear imágenes de recetas (de libros, revistas, fotos, etc.) y extraer automáticamente toda la información para crear una receta completa en la aplicación. Combina OCR (Optical Character Recognition) con IA (Gemini API) para procesar y estructurar la información.

## Glossary

- **OCR (Optical Character Recognition)**: Tecnología que convierte imágenes de texto en texto digital editable
- **Tesseract.js**: Biblioteca JavaScript de OCR que funciona en el navegador
- **Gemini API**: API de inteligencia artificial de Google para procesamiento de lenguaje natural
- **Sistema**: La aplicación web "mehaquedadobien"
- **Usuario**: Persona que utiliza la aplicación para gestionar recetas
- **Imagen de Receta**: Fotografía o imagen que contiene información de una receta (ingredientes, pasos, etc.)
- **Formulario de Receta**: Interfaz donde el usuario crea o edita recetas
- **API Key**: Clave de autenticación para usar la API de Gemini

## Requirements

### Requirement 1: Configuración de API Key

**User Story:** Como usuario, quiero configurar mi API Key de Gemini para poder usar la funcionalidad de escaneo de recetas

#### Acceptance Criteria

1. WHEN el Usuario accede a la configuración, THE Sistema SHALL mostrar un campo para ingresar la API Key de Gemini
2. WHEN el Usuario ingresa una API Key válida, THE Sistema SHALL guardar la clave en localStorage del navegador
3. WHEN el Usuario ingresa una API Key inválida, THE Sistema SHALL mostrar un mensaje de error indicando que la clave no es válida
4. WHERE el Usuario no ha configurado una API Key, THE Sistema SHALL mostrar un mensaje informativo con instrucciones para obtenerla
5. WHEN el Usuario hace clic en "Probar API Key", THE Sistema SHALL realizar una petición de prueba a Gemini API y mostrar el resultado

### Requirement 2: Botón de Escaneo en Formulario

**User Story:** Como usuario, quiero tener un botón visible en el formulario de recetas para escanear imágenes de recetas

#### Acceptance Criteria

1. WHEN el Usuario abre el formulario de nueva receta, THE Sistema SHALL mostrar un botón "📸 Escanear Receta" en la parte superior
2. WHEN el Usuario hace clic en el botón de escaneo, THE Sistema SHALL abrir un diálogo para seleccionar una imagen
3. WHERE el Usuario no ha configurado una API Key, THE Sistema SHALL mostrar un mensaje solicitando configurarla primero
4. WHEN el Usuario selecciona una imagen, THE Sistema SHALL mostrar una vista previa de la imagen seleccionada
5. THE botón de escaneo SHALL estar visible tanto en modo crear como en modo editar receta

### Requirement 3: Extracción de Texto con OCR

**User Story:** Como usuario, quiero que el sistema extraiga automáticamente el texto de la imagen de la receta

#### Acceptance Criteria

1. WHEN el Usuario confirma la imagen a escanear, THE Sistema SHALL iniciar el proceso de OCR usando Tesseract.js
2. WHILE el OCR está procesando, THE Sistema SHALL mostrar una barra de progreso con el porcentaje completado
3. WHEN el OCR completa el procesamiento, THE Sistema SHALL extraer todo el texto visible en la imagen
4. IF el OCR no detecta texto en la imagen, THEN THE Sistema SHALL mostrar un mensaje indicando que no se encontró texto
5. THE Sistema SHALL configurar Tesseract.js para reconocer texto en español

### Requirement 4: Procesamiento con IA (Gemini)

**User Story:** Como usuario, quiero que la IA procese el texto extraído y lo estructure en formato de receta

#### Acceptance Criteria

1. WHEN el OCR completa la extracción de texto, THE Sistema SHALL enviar el texto a Gemini API para procesamiento
2. THE Sistema SHALL solicitar a Gemini que estructure la información en formato JSON con campos específicos
3. WHEN Gemini procesa el texto, THE Sistema SHALL extraer nombre, categoría, ingredientes, tiempo, aparatos de cocina y secuencias
4. IF Gemini no puede procesar el texto, THEN THE Sistema SHALL mostrar un mensaje de error con el texto extraído para revisión manual
5. THE Sistema SHALL validar que la respuesta de Gemini contenga al menos un nombre de receta y un ingrediente

### Requirement 5: Rellenado Automático del Formulario

**User Story:** Como usuario, quiero que el formulario se rellene automáticamente con la información extraída de la imagen

#### Acceptance Criteria

1. WHEN Gemini completa el procesamiento, THE Sistema SHALL rellenar automáticamente el campo de nombre de receta
2. WHEN hay ingredientes detectados, THE Sistema SHALL añadirlos a la lista de ingredientes con cantidades y unidades
3. WHERE se detecta una categoría, THE Sistema SHALL seleccionar la categoría correspondiente en el selector
4. WHERE se detecta tiempo de preparación, THE Sistema SHALL rellenar los campos de horas y minutos
5. WHERE se detectan aparatos de cocina, THE Sistema SHALL seleccionar los chips correspondientes
6. WHERE se detectan secuencias de adición, THE Sistema SHALL crear las secuencias con ingredientes y descripciones
7. WHEN el formulario se rellena, THE Sistema SHALL permitir al usuario editar cualquier campo antes de guardar

### Requirement 6: Manejo de Errores y Feedback

**User Story:** Como usuario, quiero recibir feedback claro sobre el progreso y cualquier error durante el escaneo

#### Acceptance Criteria

1. WHILE el proceso está en ejecución, THE Sistema SHALL mostrar el estado actual (OCR, procesando con IA, rellenando formulario)
2. IF ocurre un error en OCR, THEN THE Sistema SHALL mostrar un mensaje específico sobre el problema de la imagen
3. IF ocurre un error en Gemini API, THEN THE Sistema SHALL mostrar un mensaje con el código de error y sugerencias
4. WHEN el proceso completa exitosamente, THE Sistema SHALL mostrar un mensaje de éxito con resumen de campos rellenados
5. THE Sistema SHALL registrar todos los errores en la consola del navegador para debugging

### Requirement 7: Privacidad y Seguridad

**User Story:** Como usuario, quiero que mis datos y API Key estén seguros y no se compartan con terceros

#### Acceptance Criteria

1. THE Sistema SHALL almacenar la API Key únicamente en localStorage del navegador del usuario
2. THE Sistema SHALL enviar imágenes y texto únicamente a Tesseract.js (local) y Gemini API (Google)
3. THE Sistema SHALL no almacenar las imágenes escaneadas en el servidor ni en la base de datos
4. THE Sistema SHALL permitir al usuario eliminar su API Key en cualquier momento
5. WHERE el usuario elimina su API Key, THE Sistema SHALL eliminar completamente la clave de localStorage

### Requirement 8: Optimización y Rendimiento

**User Story:** Como usuario, quiero que el proceso de escaneo sea rápido y eficiente

#### Acceptance Criteria

1. WHEN la imagen es mayor a 2MB, THE Sistema SHALL redimensionar la imagen antes de procesarla
2. THE Sistema SHALL cargar Tesseract.js de forma asíncrona para no bloquear la interfaz
3. WHEN el OCR está procesando, THE Sistema SHALL permitir al usuario cancelar la operación
4. THE Sistema SHALL cachear el modelo de lenguaje de Tesseract.js para usos posteriores
5. WHEN el proceso completa, THE Sistema SHALL liberar recursos de memoria utilizados

### Requirement 9: Compatibilidad de Imágenes

**User Story:** Como usuario, quiero poder escanear diferentes tipos de imágenes de recetas

#### Acceptance Criteria

1. THE Sistema SHALL aceptar imágenes en formatos JPG, PNG, WEBP y HEIC
2. THE Sistema SHALL procesar imágenes con resolución mínima de 300x300 píxeles
3. THE Sistema SHALL procesar imágenes con resolución máxima de 4000x4000 píxeles
4. WHERE la imagen está rotada, THE Sistema SHALL intentar detectar y corregir la orientación
5. THE Sistema SHALL funcionar con imágenes de recetas impresas y digitales

### Requirement 10: Configuración Avanzada

**User Story:** Como usuario avanzado, quiero poder ajustar configuraciones del escaneo para mejorar resultados

#### Acceptance Criteria

1. WHERE el usuario accede a configuración avanzada, THE Sistema SHALL mostrar opciones de idioma para OCR
2. THE Sistema SHALL permitir seleccionar entre español, inglés y otros idiomas para OCR
3. WHERE el usuario activa modo debug, THE Sistema SHALL mostrar el texto extraído por OCR antes de enviarlo a Gemini
4. THE Sistema SHALL permitir ajustar el nivel de confianza mínimo para OCR (por defecto 60%)
5. THE Sistema SHALL guardar las preferencias de configuración en localStorage
