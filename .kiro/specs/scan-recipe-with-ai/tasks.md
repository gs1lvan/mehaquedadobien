# Implementation Plan - Escanear Receta con IA

- [ ] 1. Configurar dependencias y estructura base
- [ ] 1.1 Añadir Tesseract.js CDN al index.html
  - Añadir script tag para Tesseract.js v5
  - Verificar carga correcta en consola
  - _Requirements: 3.1, 3.5_

- [ ] 1.2 Crear clase GeminiAPIService en script.js
  - Implementar constructor y propiedades base
  - Implementar loadAPIKey() y saveAPIKey()
  - Implementar hasAPIKey() y removeAPIKey()
  - _Requirements: 1.1, 1.2, 7.1, 7.4_

- [ ] 1.3 Implementar comunicación con Gemini API
  - Crear método generateContent(prompt)
  - Implementar manejo de errores HTTP
  - Añadir timeout de 30 segundos
  - _Requirements: 4.1, 4.2, 6.3_

- [ ] 1.4 Crear clase RecipeScannerService en script.js
  - Implementar constructor con referencia a GeminiAPIService
  - Inicializar propiedades (tesseractWorker, isProcessing)
  - Implementar método initTesseract()
  - _Requirements: 3.1, 3.5, 8.2_

- [ ] 2. Implementar UI para configuración de API Key
- [ ] 2.1 Crear modal de configuración en index.html
  - Añadir estructura HTML del modal
  - Añadir campo de input para API Key
  - Añadir botones de guardar, probar y cerrar
  - Añadir enlace a documentación de Gemini
  - _Requirements: 1.1, 1.4_

- [ ] 2.2 Añadir estilos CSS para modal de API Key
  - Estilos para modal overlay y contenido
  - Estilos para input de API Key
  - Estilos para botones de acción
  - Animaciones de apertura/cierre
  - _Requirements: 1.1_

- [ ] 2.3 Implementar lógica de configuración de API Key
  - Event listener para abrir modal
  - Event listener para guardar API Key
  - Event listener para probar API Key
  - Mostrar feedback de éxito/error
  - _Requirements: 1.2, 1.3, 1.5_

- [ ] 2.4 Añadir botón de configuración en header
  - Añadir botón "⚙️ Configurar IA" en header
  - Mostrar indicador si API Key está configurada
  - Event listener para abrir modal
  - _Requirements: 1.1, 1.4_

- [ ] 3. Implementar UI para escaneo de recetas
- [ ] 3.1 Crear botón de escaneo en formulario
  - Añadir botón "📸 Escanear Receta" al inicio del formulario
  - Posicionar en sección destacada
  - Deshabilitar si no hay API Key
  - _Requirements: 2.1, 2.3_

- [ ] 3.2 Crear modal de escaneo en index.html
  - Añadir estructura HTML del modal
  - Añadir área de upload de imagen
  - Añadir vista previa de imagen
  - Añadir barra de progreso
  - Añadir área de resultados
  - _Requirements: 2.2, 2.4, 6.1_

- [ ] 3.3 Añadir estilos CSS para modal de escaneo
  - Estilos para área de upload (drag & drop)
  - Estilos para vista previa de imagen
  - Estilos para barra de progreso animada
  - Estilos para mensajes de estado
  - Responsive design para móviles
  - _Requirements: 2.2, 2.4_

- [ ] 3.4 Implementar selección de imagen
  - Event listener para input de archivo
  - Validación de formato de imagen
  - Mostrar vista previa de imagen seleccionada
  - Habilitar botón de escaneo
  - _Requirements: 2.2, 2.4, 9.1_

- [ ] 4. Implementar validación y optimización de imágenes
- [ ] 4.1 Implementar validateImage() en RecipeScannerService
  - Validar tipo de archivo (JPG, PNG, WEBP, HEIC)
  - Validar tamaño de archivo (max 10MB)
  - Validar dimensiones de imagen (300-4000px)
  - Lanzar errores descriptivos
  - _Requirements: 9.1, 9.2, 9.3, 6.2_

- [ ] 4.2 Implementar getImageDimensions()
  - Crear Image element temporal
  - Cargar imagen y obtener dimensiones
  - Retornar objeto {width, height}
  - _Requirements: 9.2, 9.3_

- [ ] 4.3 Implementar optimizeImage()
  - Verificar tamaño de archivo
  - Llamar a resizeImage() si es necesario
  - Retornar imagen optimizada
  - _Requirements: 8.1_

- [ ] 4.4 Implementar resizeImage()
  - Crear canvas temporal
  - Redimensionar imagen manteniendo aspect ratio
  - Convertir a JPEG con calidad 0.9
  - Retornar Blob optimizado
  - _Requirements: 8.1_

- [ ] 5. Implementar extracción de texto con OCR
- [ ] 5.1 Implementar extractTextWithOCR() en RecipeScannerService
  - Inicializar Tesseract worker si no existe
  - Configurar idioma español
  - Ejecutar reconocimiento de texto
  - Capturar eventos de progreso
  - Retornar texto extraído
  - _Requirements: 3.1, 3.2, 3.5_

- [ ] 5.2 Implementar actualización de progreso OCR
  - Escuchar eventos de Tesseract
  - Actualizar barra de progreso (20-60%)
  - Mostrar mensaje "Extrayendo texto..."
  - _Requirements: 3.2, 6.1_

- [ ] 5.3 Implementar manejo de errores OCR
  - Capturar errores de Tesseract
  - Mostrar mensaje si no se detecta texto
  - Validar longitud mínima de texto (10 caracteres)
  - _Requirements: 3.4, 6.2_

- [ ] 5.4 Implementar cleanup de recursos
  - Método cleanup() para terminar worker
  - Liberar memoria después de escaneo
  - _Requirements: 8.5_

- [ ] 6. Implementar procesamiento con IA (Gemini)
- [ ] 6.1 Implementar parseRecipeText() en GeminiAPIService
  - Crear prompt estructurado para Gemini
  - Especificar formato JSON esperado
  - Incluir reglas y validaciones
  - Enviar texto a Gemini API
  - _Requirements: 4.1, 4.2_

- [ ] 6.2 Implementar extracción de JSON de respuesta
  - Buscar JSON en respuesta de Gemini
  - Parsear JSON a objeto JavaScript
  - Manejar errores de parsing
  - _Requirements: 4.3, 4.4_

- [ ] 6.3 Implementar validateRecipeData()
  - Validar categorías contra lista permitida
  - Validar aparatos de cocina contra lista permitida
  - Validar unidades de ingredientes
  - Filtrar datos inválidos
  - Asegurar al menos un ingrediente
  - _Requirements: 4.5_

- [ ] 6.4 Implementar actualización de progreso IA
  - Mostrar mensaje "Procesando con IA..."
  - Actualizar barra de progreso (60-90%)
  - _Requirements: 6.1_

- [ ] 7. Implementar rellenado automático del formulario
- [ ] 7.1 Implementar fillFormWithData() en RecipeApp
  - Rellenar campo de nombre de receta
  - Seleccionar categoría en dropdown
  - Rellenar tiempo total (horas y minutos)
  - Marcar checkbox de caravana si aplica
  - _Requirements: 5.1, 5.3, 5.4_

- [ ] 7.2 Implementar rellenado de ingredientes
  - Limpiar lista actual de ingredientes
  - Iterar sobre ingredientes del resultado
  - Crear objetos Ingredient
  - Añadir a la lista de ingredientes
  - Actualizar UI de ingredientes
  - _Requirements: 5.2_

- [ ] 7.3 Implementar selección de aparatos de cocina
  - Iterar sobre aparatos del resultado
  - Seleccionar chips correspondientes
  - Actualizar array selectedAppliances
  - _Requirements: 5.5_

- [ ] 7.4 Implementar creación de secuencias
  - Iterar sobre secuencias del resultado
  - Mapear nombres de ingredientes a IDs
  - Crear objetos Sequence
  - Añadir a la lista de secuencias
  - Actualizar UI de secuencias
  - _Requirements: 5.6_

- [ ] 7.5 Implementar actualización final de UI
  - Mostrar mensaje de éxito
  - Mostrar resumen (X ingredientes, Y pasos)
  - Cerrar modal de escaneo
  - Scroll al inicio del formulario
  - _Requirements: 5.7, 6.4_

- [ ] 8. Implementar flujo completo de escaneo
- [ ] 8.1 Implementar scanRecipeFromImage() en RecipeScannerService
  - Verificar que no hay escaneo en proceso
  - Validar imagen (paso 1)
  - Optimizar imagen (paso 2)
  - Extraer texto con OCR (paso 3)
  - Procesar con IA (paso 4)
  - Retornar datos estructurados
  - Manejar errores en cada paso
  - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3_

- [ ] 8.2 Implementar event listener del botón de escaneo
  - Verificar API Key configurada
  - Abrir modal de escaneo
  - Mostrar mensaje si no hay API Key
  - _Requirements: 2.1, 2.3_

- [ ] 8.3 Implementar event listener del botón procesar
  - Obtener imagen seleccionada
  - Llamar a scanRecipeFromImage()
  - Actualizar UI con progreso
  - Manejar resultado exitoso
  - Manejar errores
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 8.4 Implementar cancelación de escaneo
  - Botón de cancelar en modal
  - Detener proceso de OCR
  - Limpiar estado
  - Cerrar modal
  - _Requirements: 8.3_

- [ ] 9. Implementar manejo de errores y feedback
- [ ] 9.1 Crear constantes de mensajes de error
  - Definir ERROR_MESSAGES object
  - Mensajes para cada tipo de error
  - Mensajes en español
  - _Requirements: 6.2, 6.3_

- [ ] 9.2 Implementar showScanError()
  - Mostrar mensaje de error en modal
  - Aplicar estilos de error
  - Permitir reintentar
  - _Requirements: 6.2, 6.3_

- [ ] 9.3 Implementar showScanSuccess()
  - Mostrar mensaje de éxito
  - Mostrar estadísticas (ingredientes, pasos)
  - Aplicar estilos de éxito
  - _Requirements: 6.4_

- [ ] 9.4 Implementar logging de errores
  - Console.error para debugging
  - Incluir stack trace
  - Incluir contexto del error
  - _Requirements: 6.5_

- [ ] 10. Añadir configuración avanzada (opcional)
- [ ]* 10.1 Crear modal de configuración avanzada
  - Selector de idioma para OCR
  - Slider de confianza mínima
  - Toggle de modo debug
  - _Requirements: 10.1, 10.2, 10.3_

- [ ]* 10.2 Implementar modo debug
  - Mostrar texto extraído por OCR
  - Mostrar respuesta cruda de Gemini
  - Botón para copiar datos
  - _Requirements: 10.3_

- [ ]* 10.3 Guardar preferencias en localStorage
  - Guardar idioma seleccionado
  - Guardar nivel de confianza
  - Guardar modo debug
  - Cargar al iniciar
  - _Requirements: 10.4, 10.5_

- [ ] 11. Testing y validación
- [ ]* 11.1 Crear tests unitarios para GeminiAPIService
  - Test de saveAPIKey/loadAPIKey
  - Test de validateRecipeData
  - Test de parseRecipeText (mock)
  - _Requirements: Todos_

- [ ]* 11.2 Crear tests unitarios para RecipeScannerService
  - Test de validateImage
  - Test de optimizeImage
  - Test de getImageDimensions
  - _Requirements: Todos_

- [ ]* 11.3 Crear tests de integración
  - Test de flujo completo con imagen de prueba
  - Test de manejo de errores
  - Test de cancelación
  - _Requirements: Todos_

- [ ]* 11.4 Testing manual con imágenes reales
  - Probar con recetas de libros
  - Probar con recetas impresas
  - Probar con diferentes calidades
  - Documentar resultados
  - _Requirements: Todos_

- [ ] 12. Documentación y ayuda
- [ ] 12.1 Actualizar INSTRUCCIONES-API-GEMINI.md
  - Añadir sección sobre escaneo de recetas
  - Incluir ejemplos de uso
  - Añadir troubleshooting
  - _Requirements: 1.4_

- [ ] 12.2 Crear tooltips y ayuda contextual
  - Tooltip en botón de escaneo
  - Ayuda en modal de configuración
  - Consejos para mejores resultados
  - _Requirements: 2.1, 2.4_

- [ ] 12.3 Añadir ejemplos visuales
  - Imagen de ejemplo de receta válida
  - Imagen de ejemplo de receta inválida
  - GIF animado del proceso
  - _Requirements: 1.4_
