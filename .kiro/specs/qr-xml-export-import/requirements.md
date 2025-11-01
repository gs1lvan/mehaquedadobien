# Requirements Document

## Introduction

Este documento define los requisitos para modificar el sistema de códigos QR existente para que utilice el formato XML en lugar de JSON. Actualmente, la aplicación genera códigos QR que contienen datos de recetas en formato JSON, pero la funcionalidad de importación/exportación de la aplicación utiliza XML. Esta mejora permitirá que los códigos QR sean compatibles con el sistema de importación XML existente, proporcionando una experiencia de usuario más consistente y aprovechando la funcionalidad XML ya implementada.

## Glossary

- **QR System**: Sistema actual que genera códigos QR con datos de recetas en formato JSON
- **XML Exporter**: Clase existente que convierte recetas al formato XML estándar de la aplicación
- **XML Importer**: Clase existente que procesa archivos XML y crea recetas en la aplicación
- **Recipe App**: Aplicación principal de gestión de recetas
- **Base64 Encoding**: Método de codificación para incluir datos XML en URLs
- **Import Modal**: Modal de confirmación que se muestra antes de importar una receta desde QR

## Requirements

### Requirement 1: Modificar Generación de QR para Usar XML

**User Story:** Como usuario que quiere compartir una receta, quiero que el código QR generado contenga el formato XML estándar de la aplicación, para que sea compatible con la funcionalidad de importación XML existente.

#### Acceptance Criteria

1. WHEN el sistema genera un código QR para una receta, THE QR System SHALL utilizar XMLExporter.generateXML() para convertir la receta a formato XML
2. WHEN el XML es generado, THE QR System SHALL codificar el XML en Base64 para incluirlo en la URL del QR
3. WHEN el QR es generado, THE QR System SHALL mantener la URL base actual (https://guiavfr.enaire.es/#import=)
4. WHEN el XML codificado excede el tamaño recomendado para QR, THE QR System SHALL mostrar una advertencia al usuario
5. THE QR System SHALL mantener la funcionalidad existente de generación de QR en la vista de detalle de receta

### Requirement 2: Actualizar Detección de Importación

**User Story:** Como usuario que escanea un código QR, quiero que la aplicación detecte automáticamente si los datos son XML o JSON, para que pueda importar recetas de códigos QR antiguos y nuevos.

#### Acceptance Criteria

1. WHEN la aplicación detecta el parámetro #import= en la URL, THE Recipe App SHALL decodificar los datos desde Base64
2. WHEN los datos son decodificados, THE Recipe App SHALL detectar si el contenido es XML o JSON
3. IF los datos comienzan con "<?xml" o "<recipe", THEN THE Recipe App SHALL procesar los datos como XML
4. IF los datos comienzan con "{" o son JSON válido, THEN THE Recipe App SHALL procesar los datos como JSON (compatibilidad con QR antiguos)
5. IF los datos no son ni XML ni JSON válidos, THEN THE Recipe App SHALL mostrar un mensaje de error al usuario

### Requirement 3: Integrar con XML Importer Existente

**User Story:** Como usuario que importa una receta desde QR, quiero que el proceso de importación utilice el mismo sistema que la importación de archivos XML, para garantizar consistencia en el manejo de datos.

#### Acceptance Criteria

1. WHEN los datos XML son detectados en el QR, THE Recipe App SHALL utilizar XMLImporter.parseXML() para procesar el XML
2. WHEN el XML es procesado, THE Recipe App SHALL crear un objeto Recipe utilizando la misma lógica que la importación de archivos
3. WHEN la receta es creada, THE Recipe App SHALL mostrar el Import Modal con los detalles de la receta
4. WHEN el usuario confirma la importación, THE Recipe App SHALL guardar la receta en localStorage con un nuevo ID único
5. WHEN la importación es exitosa, THE Recipe App SHALL mostrar una notificación de éxito y abrir la receta importada

### Requirement 4: Mantener Compatibilidad con QR Existentes

**User Story:** Como usuario que tiene códigos QR antiguos generados con JSON, quiero que estos códigos sigan funcionando, para no perder acceso a recetas compartidas previamente.

#### Acceptance Criteria

1. WHEN un QR antiguo con formato JSON es escaneado, THE Recipe App SHALL detectar el formato JSON
2. WHEN el formato JSON es detectado, THE Recipe App SHALL procesar los datos usando la lógica de importación JSON existente
3. THE Recipe App SHALL mantener la función showRecipeImportModal() para ambos formatos
4. THE Recipe App SHALL mantener la función importRecipeFromQR() para procesar datos JSON
5. WHEN cualquier formato falla al importar, THE Recipe App SHALL mostrar un mensaje de error descriptivo

### Requirement 5: Validación y Manejo de Errores

**User Story:** Como usuario que escanea un código QR, quiero recibir mensajes claros si algo falla, para entender qué salió mal y cómo solucionarlo.

#### Acceptance Criteria

1. WHEN la decodificación Base64 falla, THE Recipe App SHALL mostrar el mensaje "Error al decodificar el código QR"
2. WHEN el XML no es válido, THE Recipe App SHALL mostrar el mensaje "El código QR contiene XML inválido"
3. WHEN el JSON no es válido, THE Recipe App SHALL mostrar el mensaje "El código QR contiene datos inválidos"
4. WHEN XMLImporter.parseXML() lanza un error, THE Recipe App SHALL capturar el error y mostrar un mensaje descriptivo
5. THE Recipe App SHALL registrar todos los errores en la consola con el prefijo "[QR Import]" para facilitar debugging

### Requirement 6: Optimización de Tamaño de QR

**User Story:** Como usuario que genera códigos QR, quiero que el sistema me informe si el QR será muy grande, para poder decidir si simplificar la receta antes de compartirla.

#### Acceptance Criteria

1. WHEN el XML generado excede 1500 caracteres después de codificación Base64, THE QR System SHALL mostrar una advertencia
2. THE QR System SHALL mostrar el tamaño estimado del QR en módulos (ej: "37×37 módulos")
3. WHEN el QR excede el tamaño recomendado, THE QR System SHALL sugerir al usuario reducir el método de preparación
4. THE QR System SHALL permitir al usuario generar el QR de todas formas después de ver la advertencia
5. THE QR System SHALL mantener la configuración actual de corrección de errores (nivel L) para minimizar tamaño

### Requirement 7: Actualizar Documentación

**User Story:** Como desarrollador o usuario técnico, quiero que la documentación refleje el cambio a formato XML, para entender cómo funciona el nuevo sistema.

#### Acceptance Criteria

1. THE Recipe App SHALL actualizar QR_IMPORT_DOCUMENTATION.md para reflejar el uso de XML
2. THE Recipe App SHALL actualizar QR_IMPLEMENTATION_SUMMARY.md con los cambios realizados
3. THE Recipe App SHALL mantener ejemplos de ambos formatos (XML y JSON) en la documentación
4. THE Recipe App SHALL documentar la estructura del XML en el QR
5. THE Recipe App SHALL incluir ejemplos de prueba con formato XML en test-qr-import.html
