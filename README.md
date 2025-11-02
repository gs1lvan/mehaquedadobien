# mehaquedadobien 🍳

**Recetario Personal - Progressive Web App**

Una aplicación web moderna para gestionar tus recetas personales con funcionalidades avanzadas de organización, filtrado y exportación.

## 🚀 Características Principales

- ✅ **Gestión completa de recetas** - Crear, editar, duplicar y eliminar
- ✅ **Categorías personalizables** - 16 categorías predefinidas + categorías personalizadas
- ✅ **Listas de compra** - Crea y gestiona múltiples listas de compra con elementos marcables
- ✅ **Aparatos de cocina** - Selección visual de 12 aparatos con emojis grandes en diseño compacto de 2 columnas
- ✅ **Ingredientes inteligentes** - Gestión con cantidades y unidades opcionales
- ✅ **Secuencias de adición** - Pasos numerados con ingredientes asociados
- ✅ **Multimedia** - Múltiples imágenes y videos por receta
- ✅ **Filtrado avanzado** - Por categoría, tiempo y compatibilidad con caravana
- ✅ **Exportación** - PDF con formato editorial y XML para intercambio
- ✅ **Código QR** - Generación y escaneo de códigos QR para compartir e importar recetas
- ✅ **PWA** - Funciona offline, instalable en móviles y desktop
- ✅ **Tema oscuro** - Activado por defecto con opción de tema claro
- ✅ **Responsive** - Optimizado para móviles, tablets y desktop

## 📱 Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Almacenamiento:** IndexedDB con fallback a localStorage
- **PWA:** Service Worker para funcionalidad offline
- **Exportación:** jsPDF 2.5.1 para PDF, XML nativo
- **QR Code:** API de QRServer (https://api.qrserver.com) para generación de códigos QR
- **Diseño:** Sistema inspirado en Airbnb
|
## 📖 Documentación

- **[INFORME-TECNICO.md](INFORME-TECNICO.md)** - Documentación técnica completa
- **[RESUMEN-CAMBIOS.md](RESUMEN-CAMBIOS.md)** - Historial de cambios implementados
- **[GUIA-CREAR-APK.md](GUIA-CREAR-APK.md)** - Guía para crear APK de Android
- **[test-xml-parsing.md](test-xml-parsing.md)** - Casos de prueba para validación de parsing XML
- **[xml-constants.js](xml-constants.js)** - Constantes y helpers para formatos XML

## 🧪 Archivos de Prueba

El proyecto incluye múltiples archivos de prueba HTML (prefijo `test-*.html`) para verificar funcionalidades específicas:
- **test-chips-simple.html** - Verifica consistencia visual de chips de electrodomésticos en diferentes contextos
- **test-qr.html** - Prueba de generación de códigos QR con datos de receta de ejemplo
- **test-xml-improvements.html** - Prueba las mejoras de parsing XML (formatos compacto, completo y mixto)
- **test-xml-parsing.md** - Documentación de casos de prueba para validación de XML
- Otros archivos de prueba para ingredientes, secuencias, multimedia, filtrado, exportación, etc.

## 🛒 Listas de Compra

La aplicación incluye un sistema completo de gestión de listas de compra:

### Características

- **Múltiples listas:** Crea y gestiona varias listas de compra simultáneamente
- **Listas vacías:** Crea listas sin elementos y añádelos cuando los necesites
- **Habilitar/Deshabilitar:** Control de visibilidad de listas mediante botón de ojo (👁️) - las listas deshabilitadas no aparecen al añadir ingredientes desde recetas
- **Elementos con cantidad:** Añade elementos con nombre y cantidad opcional
- **Marcar completados:** Marca elementos como comprados mientras haces la compra
- **Expandir/Colapsar:** Listas desplegables para una vista organizada
- **Información temporal:** Visualiza cuándo fue creada o modificada cada lista (fecha y hora)
- **Copiar al portapapeles:** Copia rápidamente toda la lista para compartir
- **Integración con recetas:** Añade ingredientes directamente desde las recetas con etiqueta "recetario" para identificar su origen
- **Persistencia:** Las listas se guardan automáticamente en localStorage

### Acceso

Accede a las listas de compra desde el menú hamburguesa (☰) → 🛒 Listas de Compra

### Añadir Ingredientes desde Recetas

Cuando añades un ingrediente desde una receta a una lista de compra, el sistema automáticamente añade la etiqueta "recetario" a la cantidad para indicar que proviene de una receta. Esto te ayuda a distinguir entre ingredientes añadidos manualmente y los que vienen de tus recetas.

## 🎨 Última Actualización

**Fecha:** 2 de noviembre de 2025  
**Cambio:** Mejoras en el sistema de parsing XML - Se ha refactorizado y consolidado el código de importación XML:
- ✅ **Código consolidado:** Eliminación de ~100 líneas de código duplicado entre parsers
- ✅ **Soporte dual de formatos:** Parsing unificado para formato compacto (QR) y completo (exportación)
- ✅ **Mejor mantenibilidad:** Lógica centralizada en XMLImporter con métodos helper reutilizables
- ✅ **Manejo robusto de errores:** Validación mejorada y mensajes de error descriptivos
- ✅ **Optimización de rendimiento:** Reducción de llamadas DOM y selectores CSS más eficientes
- ✅ **Archivo de pruebas:** Nuevo test-xml-improvements.html para validar parsing en todos los formatos
- ✅ **Documentación técnica:** test-xml-parsing.md con casos de prueba detallados

**Fecha:** 2 de noviembre de 2025  
**Cambio anterior:** Simplificación del formulario de secuencias - Se ha simplificado el formulario de adición de secuencias eliminando la selección previa de ingredientes:
- ✅ **Interfaz más limpia:** El formulario ahora solo requiere la descripción del paso
- ✅ **Flujo más rápido:** Añade secuencias directamente sin pasos adicionales
- ✅ **Mayor flexibilidad:** Describe los pasos libremente sin restricciones de ingredientes preseleccionados
- ✅ **Botones de acciones rápidas:** Mantiene los 16 botones de acciones de cocina para facilitar la descripción

**Fecha:** 2 de noviembre de 2025  
**Cambio anterior:** Botones de conectores añadidos al editor de secuencias - Se han incorporado dos nuevos botones de conectores en el editor de secuencias de adición:
- ✅ **"y":** Conector para unir acciones o ingredientes
- ✅ **",":** Separador para enumerar elementos
- ✅ Total de botones disponibles: 21 (19 acciones de cocina + 2 conectores)
- ✅ Facilita la escritura de descripciones fluidas y bien estructuradas

**Fecha:** 2 de noviembre de 2025  
**Cambio anterior:** Nuevas acciones de cocina añadidas - Se han incorporado tres nuevas acciones de cocina en el editor de secuencias de adición:
- ✅ **Rallar:** Para indicar el rallado de ingredientes (queso, limón, etc.)
- ✅ **Picar:** Para indicar el picado de ingredientes (cebolla, ajo, etc.)
- ✅ **Escaldar:** Para indicar el escaldado de ingredientes (tomates, almendras, etc.)
- ✅ Total de acciones disponibles: 19 (a la plancha, añadir, cocer, cocinar al vapor, desglasar, escaldar, freír, gratinar, guisar, hornear, lavar, pelar, picar, rallar, rebozar, reducir, rehogar, reposar, retirar, saltear, sellar)
- ✅ Facilita la descripción de pasos de preparación con botones de acceso rápido

**Fecha:** 2 de noviembre de 2025  
**Cambio anterior:** Validación mejorada de archivos multimedia en importación - Se ha añadido filtrado automático de archivos multimedia durante la importación de recetas:
- ✅ Validación de imágenes: solo se importan archivos con propiedades válidas (name, type, data)
- ✅ Validación de videos: filtrado de archivos corruptos o incompletos
- ✅ Mayor robustez: previene errores al importar recetas con datos multimedia malformados
- ✅ Compatibilidad: mantiene retrocompatibilidad con recetas antiguas

**Fecha:** 2 de noviembre de 2025  
**Cambio anterior:** Exportación mejorada de recetas al compartir - Se ha completado la funcionalidad de compartir recetas para incluir todos los campos principales:
- ✅ Campos básicos: nombre, categoría, ingredientes, método de preparación, tiempo total
- ✅ Información adicional: autor, historia
- ✅ Apto para caravana (caravanFriendly)
- ✅ Secuencias de adición con ingredientes asociados
- ✅ Aparatos de cocina seleccionados
- ⚠️ **Nota:** Las imágenes y videos no se incluyen en enlaces compartidos para mantener URLs manejables (contienen datos base64 muy grandes). Se preservan al exportar/importar mediante archivos XML.

## 📝 Actualizaciones Anteriores

**Fecha:** 2 de noviembre de 2025  
**Cambio:** Control de habilitación de listas de compra - Se ha añadido un botón de ojo (👁️) en cada lista de compra para habilitar/deshabilitar su visibilidad. Las listas deshabilitadas se muestran con opacidad reducida y no aparecen al añadir ingredientes desde recetas.

**Fecha:** 2 de noviembre de 2025  
**Cambio:** Listas de compra vacías permitidas - Se ha eliminado la validación que requería al menos un elemento al crear o guardar una lista de compra. Ahora puedes crear listas vacías y añadir elementos posteriormente, ofreciendo mayor flexibilidad en la gestión de tus listas.

**Fecha:** 2 de noviembre de 2025  
**Cambio:** Botón de compartir en menú de opciones - Se ha añadido un botón "Compartir" en el menú de opciones de las tarjetas de recetas (menú de tres puntos), facilitando el acceso rápido a la funcionalidad de compartir recetas mediante enlace sin necesidad de abrir la vista de detalle.

**Fecha:** 1 de noviembre de 2025  
**Cambio:** Etiquetado automático de ingredientes desde recetas - Cuando se añade un ingrediente desde una receta a una lista de compra, el sistema ahora añade automáticamente la etiqueta "recetario" a la cantidad para identificar su origen. Esto permite distinguir fácilmente entre ingredientes añadidos manualmente y los que provienen de recetas.

**Fecha:** 1 de noviembre de 2025  
**Cambio:** Mejora de contraste en tema oscuro para listas de compra - Los badges de contador y fecha/hora en las listas de compra ahora usan un fondo gris oscuro (#3a3a3a) en lugar de morado en el tema oscuro, mejorando la legibilidad y consistencia visual con el resto de la interfaz oscura.

**Fecha:** 1 de noviembre de 2025  
**Cambio:** Mejora visual del badge de fecha/hora en listas de compra - El badge de fecha y hora ahora tiene un fondo morado (#667eea) con bordes redondeados, mejorando la consistencia visual y el contraste con el resto de la interfaz.

**Fecha:** 1 de noviembre de 2025  
**Cambio:** Mejora en visualización de fecha/hora en listas de compra - La fecha y hora en el encabezado de las listas de compra ahora se muestran en un único badge unificado con separador visual (|), mejorando la legibilidad y el diseño compacto.

**Fecha:** 1 de noviembre de 2025  
**Cambio:** Mejora en layout de botones de listas de compra - Los botones en la vista de listas de compra ahora se muestran en disposición horizontal con ajuste automático (flex-wrap), mejorando la usabilidad en pantallas anchas y manteniendo la responsividad en móviles.

**Fecha:** 1 de noviembre de 2025  
**Cambio:** Mejora en visualización de listas de compra - Se ha añadido la hora (además de la fecha) en el encabezado de las listas de compra, mostrando cuándo fue creada o modificada cada lista con formato "DD/MM/AAAA HH:MM".

**Fecha:** 1 de noviembre de 2025  
**Cambio:** Añadido botón de Listas de Compra al menú - Se ha agregado acceso directo a la funcionalidad de listas de compra desde el menú principal de la aplicación.

**Fecha:** 31 de octubre de 2025  
**Cambio:** Sistema optimizado de códigos QR con importación automática - Se ha implementado un sistema completo para compartir e importar recetas mediante códigos QR optimizados:
- Generación automática de código QR al abrir la vista de detalle de cualquier receta
- **Modo Compacto:** QR optimizados de ~29×29 módulos (40% más pequeños)
- Visualización del código QR (200x200px) con información de tamaño
- Los códigos QR redirigen a `https://guiavfr.enaire.es/#import=BASE64_DATA`
- Detección automática de parámetro de importación al cargar la app
- Modal de confirmación con preview de la receta a importar
- Importación automática a localStorage con notificación de éxito
- Soporte para formato compacto y completo con conversión automática
- Páginas de prueba: `test-qr-import.html` y `test-qr-sizes.html`
- Documentación completa: `QR_IMPORT_DOCUMENTATION.md` y `QR_SIZE_GUIDE.md`
- Sistema de notificaciones con animaciones suaves (slideIn/slideOut) para feedback visual
- Uso de API externa (QRServer) para la generación de códigos QR
- Diseño integrado con el sistema de estilos Airbnb de la aplicación

## 🔧 Arquitectura de Importación XML

La aplicación utiliza un sistema robusto de importación XML con soporte para múltiples formatos:

### Formatos Soportados

1. **Formato Compacto (QR Codes)**
   - Optimizado para tamaño reducido en códigos QR
   - Elementos con nombres cortos: `<i>`, `<n>`, `<q>`, `<u>`, `<s>`, `<dur>`, `<desc>`, `<ings>`, `<ing>`
   - Referencias a ingredientes por nombre
   - Típicamente ~40% más pequeño que el formato completo

2. **Formato Completo (Exportación)**
   - Nombres de elementos descriptivos: `<ingredient>`, `<name>`, `<quantity>`, `<unit>`, `<sequence>`, `<duration>`, `<description>`
   - Referencias a ingredientes por ID único
   - Incluye metadatos completos y multimedia

3. **Formato Mixto**
   - Soporte automático para XML con elementos de ambos formatos
   - Conversión transparente entre formatos

### Características Técnicas

- **Parser unificado:** Clase `XMLImporter` con lógica consolidada
- **Mapeo de IDs:** Sistema inteligente que mapea nombres/IDs antiguos a nuevos IDs
- **Validación robusta:** Verificación de estructura XML y datos de receta
- **Manejo de errores:** Mensajes descriptivos para cada tipo de error
- **Optimización:** Selectores CSS eficientes y caché de elementos DOM
- **Testing:** Suite completa de pruebas en `test-xml-improvements.html`

## 💡 Uso de Códigos QR

La aplicación permite compartir e importar recetas mediante códigos QR:

### Compartir Recetas

1. **Visualizar receta:** Abre cualquier receta para ver su vista de detalle
2. **Código QR:** Desplázate hasta la sección "📱 Compartir Receta" al final de la ficha
3. **Generación automática:** El código QR se genera automáticamente con los datos de la receta
4. **Compartir:** Escanea el código QR con cualquier lector para acceder a los datos de la receta

### Importar Recetas

1. **Escanear QR:** Usa cualquier lector de códigos QR para escanear un código de receta
2. **Abrir enlace:** El código QR contiene un enlace que abre la aplicación automáticamente
3. **Confirmar importación:** Se mostrará un modal de confirmación con los datos de la receta
4. **Importar:** Confirma para añadir la receta a tu colección

**Características:**
- Notificaciones visuales con animaciones suaves para confirmar importaciones exitosas o errores
- Los códigos QR contienen datos completos: nombre, categoría, ingredientes, método de preparación y tiempo total
- Sistema de confirmación antes de importar para revisar los datos
- Detección automática de duplicados: si ya existe una receta con el mismo nombre, se añade el sufijo "- importada" automáticamente

## 🔧 Instalación

1. Clona el repositorio
2. Abre `index.html` en un navegador moderno
3. ¡Listo! No requiere instalación de dependencias

## 📄 Licencia

Proyecto personal - Uso libre