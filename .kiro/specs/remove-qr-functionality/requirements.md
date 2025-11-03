# Requirements Document

## Introduction

Este documento define los requisitos para eliminar completamente la funcionalidad de códigos QR del sistema de gestión de recetas "mehaquedadobien". La funcionalidad de QR actualmente permite compartir recetas mediante códigos QR, pero el usuario ha decidido eliminarla del proyecto. Esta limpieza incluirá la eliminación de código, archivos de documentación, archivos de prueba y referencias en specs existentes.

## Glossary

- **Sistema_Recetas**: La aplicación web de gestión de recetas mehaquedadobien
- **Funcionalidad_QR**: Sistema completo de generación e importación de recetas mediante códigos QR
- **Archivos_QR**: Todos los archivos relacionados con la funcionalidad QR (código, documentación, tests)
- **Spec_QR**: Especificación existente en `.kiro/specs/qr-xml-export-import/`
- **Usuario**: Desarrollador que mantiene la aplicación

## Requirements

### Requirement 1: Eliminar Código de Generación de QR

**User Story:** Como desarrollador, quiero eliminar todo el código relacionado con la generación de códigos QR, para que la aplicación no tenga funcionalidad QR innecesaria.

#### Acceptance Criteria

1. WHEN se revisa el archivo script.js, THE Sistema_Recetas SHALL no contener funciones de generación de QR
2. THE Sistema_Recetas SHALL eliminar las funciones `prepareRecipeDataForQR()` y `generateQRCodeURL()`
3. THE Sistema_Recetas SHALL eliminar la función `renderDetailQRCode()` y sus llamadas
4. THE Sistema_Recetas SHALL eliminar cualquier referencia a APIs de generación de QR
5. THE Sistema_Recetas SHALL eliminar elementos del DOM relacionados con la visualización de QR

### Requirement 2: Eliminar Código de Importación desde QR

**User Story:** Como desarrollador, quiero eliminar todo el código relacionado con la importación de recetas desde QR, para simplificar el sistema de importación.

#### Acceptance Criteria

1. WHEN se revisa el archivo script.js, THE Sistema_Recetas SHALL no contener la función `checkForRecipeImport()`
2. THE Sistema_Recetas SHALL eliminar la función `importRecipeFromQR()` si existe
3. THE Sistema_Recetas SHALL eliminar la función `showImportSuccessModal()` relacionada con QR
4. THE Sistema_Recetas SHALL eliminar el manejo de parámetros URL `#import=` y `?import=`
5. THE Sistema_Recetas SHALL eliminar funciones auxiliares como `parseCompactXML()` y `expandRecipeData()` si solo se usan para QR

### Requirement 3: Eliminar Archivos de Documentación QR

**User Story:** Como desarrollador, quiero eliminar toda la documentación relacionada con QR, para mantener la documentación del proyecto limpia y relevante.

#### Acceptance Criteria

1. THE Sistema_Recetas SHALL eliminar el archivo `QR_IMPLEMENTATION_SUMMARY.md`
2. THE Sistema_Recetas SHALL eliminar el archivo `QR_IMPORT_DOCUMENTATION.md`
3. THE Sistema_Recetas SHALL eliminar el archivo `QR_SIZE_GUIDE.md`
4. THE Sistema_Recetas SHALL eliminar el archivo `qr-improvements.md`
5. THE Sistema_Recetas SHALL actualizar `README.md` para eliminar referencias a funcionalidad QR

### Requirement 4: Eliminar Archivos de Prueba QR

**User Story:** Como desarrollador, quiero eliminar todos los archivos de prueba relacionados con QR, para mantener el directorio de tests limpio.

#### Acceptance Criteria

1. THE Sistema_Recetas SHALL eliminar el archivo `test-qr-import.html`
2. THE Sistema_Recetas SHALL eliminar el archivo `test-qr-sizes.html`
3. THE Sistema_Recetas SHALL eliminar el archivo `test-qr.html`
4. WHEN se revisan otros archivos de test, THE Sistema_Recetas SHALL eliminar secciones o referencias a QR
5. THE Sistema_Recetas SHALL verificar que no queden archivos de test huérfanos relacionados con QR

### Requirement 5: Eliminar Spec de QR

**User Story:** Como desarrollador, quiero eliminar la especificación completa de QR XML Export/Import, para mantener solo specs relevantes en el proyecto.

#### Acceptance Criteria

1. THE Sistema_Recetas SHALL eliminar el directorio `.kiro/specs/qr-xml-export-import/` completo
2. THE Sistema_Recetas SHALL eliminar todos los archivos dentro del spec (requirements.md, design.md, tasks.md si existe)
3. WHEN se revisan otros specs, THE Sistema_Recetas SHALL eliminar referencias al spec de QR
4. THE Sistema_Recetas SHALL verificar que no queden referencias cruzadas a la funcionalidad QR
5. THE Sistema_Recetas SHALL mantener intactos otros specs no relacionados con QR

### Requirement 6: Limpiar Referencias en Código

**User Story:** Como desarrollador, quiero eliminar todas las referencias a QR en comentarios y constantes, para que el código no tenga menciones obsoletas.

#### Acceptance Criteria

1. WHEN se revisa models.js, THE Sistema_Recetas SHALL eliminar comentarios que mencionen "QR code" o "compact format"
2. WHEN se revisa xml-constants.js, THE Sistema_Recetas SHALL eliminar referencias a "QR code format"
3. THE Sistema_Recetas SHALL eliminar constantes de configuración relacionadas con QR
4. THE Sistema_Recetas SHALL eliminar imports o requires relacionados con librerías QR
5. THE Sistema_Recetas SHALL verificar que no queden TODOs o FIXMEs relacionados con QR

### Requirement 7: Limpiar Elementos de UI

**User Story:** Como desarrollador, quiero eliminar todos los elementos de interfaz relacionados con QR, para que la UI no tenga botones o secciones obsoletas.

#### Acceptance Criteria

1. WHEN se revisa index.html, THE Sistema_Recetas SHALL eliminar contenedores o divs para mostrar QR
2. THE Sistema_Recetas SHALL eliminar botones de "Generar QR" o similares
3. THE Sistema_Recetas SHALL eliminar estilos CSS específicos para QR en styles.css
4. THE Sistema_Recetas SHALL eliminar animaciones CSS usadas solo para modales de importación QR
5. THE Sistema_Recetas SHALL verificar que la UI se vea correcta sin elementos QR

### Requirement 8: Verificar Funcionalidad Restante

**User Story:** Como desarrollador, quiero verificar que la eliminación de QR no afecte otras funcionalidades, para garantizar que la aplicación siga funcionando correctamente.

#### Acceptance Criteria

1. WHEN se elimina la funcionalidad QR, THE Sistema_Recetas SHALL mantener la funcionalidad de exportación XML
2. THE Sistema_Recetas SHALL mantener la funcionalidad de importación XML desde archivos
3. THE Sistema_Recetas SHALL mantener todas las demás funcionalidades de gestión de recetas
4. THE Sistema_Recetas SHALL verificar que no haya errores en la consola del navegador
5. THE Sistema_Recetas SHALL verificar que la aplicación cargue y funcione correctamente
