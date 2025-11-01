# mehaquedadobien 🍳

**Recetario Personal - Progressive Web App**

Una aplicación web moderna para gestionar tus recetas personales con funcionalidades avanzadas de organización, filtrado y exportación.

## 🚀 Características Principales

- ✅ **Gestión completa de recetas** - Crear, editar, duplicar y eliminar
- ✅ **Categorías personalizables** - 16 categorías predefinidas + categorías personalizadas
- ✅ **Listas de compra** - Crea y gestiona múltiples listas de compra con elementos marcables
- ✅ **Aparatos de cocina** - Selección visual de 12 aparatos con emojis grandes (2.5em)
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

## 📖 Documentación

- **[INFORME-TECNICO.md](INFORME-TECNICO.md)** - Documentación técnica completa
- **[RESUMEN-CAMBIOS.md](RESUMEN-CAMBIOS.md)** - Historial de cambios implementados
- **[GUIA-CREAR-APK.md](GUIA-CREAR-APK.md)** - Guía para crear APK de Android

## 🧪 Archivos de Prueba

El proyecto incluye múltiples archivos de prueba HTML (prefijo `test-*.html`) para verificar funcionalidades específicas:
- **test-chips-simple.html** - Verifica consistencia visual de chips de electrodomésticos en diferentes contextos
- **test-qr.html** - Prueba de generación de códigos QR con datos de receta de ejemplo
- Otros archivos de prueba para ingredientes, secuencias, multimedia, filtrado, exportación, etc.

## 🛒 Listas de Compra

La aplicación incluye un sistema completo de gestión de listas de compra:

### Características

- **Múltiples listas:** Crea y gestiona varias listas de compra simultáneamente
- **Elementos con cantidad:** Añade elementos con nombre y cantidad opcional
- **Marcar completados:** Marca elementos como comprados mientras haces la compra
- **Expandir/Colapsar:** Listas desplegables para una vista organizada
- **Contador:** Visualiza cuántos elementos has completado (X/Y completados)
- **Copiar al portapapeles:** Copia rápidamente toda la lista para compartir
- **Persistencia:** Las listas se guardan automáticamente en localStorage

### Acceso

Accede a las listas de compra desde el menú hamburguesa (☰) → 🛒 Listas de Compra

## 🎨 Última Actualización

**Fecha:** 1 de noviembre de 2025  
**Cambio:** Añadido botón de Listas de Compra al menú - Se ha agregado acceso directo a la funcionalidad de listas de compra desde el menú principal de la aplicación.

## 📝 Actualizaciones Anteriores

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

## 🔧 Instalación

1. Clona el repositorio
2. Abre `index.html` en un navegador moderno
3. ¡Listo! No requiere instalación de dependencias

## 📄 Licencia

Proyecto personal - Uso libre