# mehaquedadobien 🍳

**Recetario Personal - Progressive Web App**

Una aplicación web moderna para gestionar tus recetas personales con funcionalidades avanzadas de organización, filtrado y exportación.

## 🚀 Características Principales

- ✅ **Gestión completa de recetas** - Crear, editar, duplicar y eliminar
- ✅ **Categorías personalizables** - 16 categorías predefinidas + categorías personalizadas con opción de ocultar/mostrar
- ✅ **Listas de compra** - Crea y gestiona múltiples listas de compra con elementos marcables
- ✅ **Aparatos de cocina** - Selección visual de 12 aparatos con emojis grandes en diseño compacto de 2 columnas
- ✅ **Ingredientes inteligentes** - Gestión con cantidades y unidades opcionales
- ✅ **Secuencias de adición** - Pasos numerados con ingredientes asociados (opcionales)
- ✅ **Multimedia** - Múltiples imágenes por receta con galería y modal ampliado
- ✅ **Filtrado avanzado** - Por categoría, tiempo y compatibilidad con caravana
- ✅ **Exportación** - PDF con formato editorial y XML para intercambio
- ✅ **PWA** - Funciona offline, instalable en móviles y desktop
- ✅ **Tema oscuro** - Activado por defecto con opción de tema claro
- ✅ **Responsive** - Optimizado para móviles, tablets y desktop

## 📱 Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Almacenamiento:** IndexedDB con fallback a localStorage
- **PWA:** Service Worker para funcionalidad offline
- **Exportación:** jsPDF 2.5.1 para PDF, XML nativo
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
- **test-xml-improvements.html** - Prueba las mejoras de parsing XML (formatos compacto, completo y mixto)
- **test-xml-parsing.md** - Documentación de casos de prueba para validación de XML
- **test-sequence-without-ingredients.html** - Verifica que se pueden crear secuencias sin ingredientes asociados
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

**Fecha:** 3 de noviembre de 2025  
**Cambio:** Refactorización de gestión de categorías - Se ha mejorado la arquitectura del sistema de categorías con métodos especializados:
- ✅ **Métodos separados:** `createPredefinedCategoryItem()` y `createCustomCategoryItem()` para mejor mantenibilidad
- ✅ **Botón de ocultar unificado:** Todas las categorías (predefinidas y personalizadas) tienen botón de ocultar (👁️)
- ✅ **Categorías predefinidas:** Solo tienen botón de ocultar (no se pueden editar ni eliminar permanentemente)
- ✅ **Categorías personalizadas:** Tienen botones de editar (✏️), ocultar (👁️) y eliminar (🗑️)
- ✅ **Restaurar categorías ocultas:** Nueva sección "Categorías Ocultas" con botón de restauración (↩️)
- ✅ **Persistencia:** Las categorías ocultas se guardan en localStorage y persisten entre sesiones
- ✅ **Actualización de recetas:** Las recetas que usan una categoría eliminada/oculta pasan automáticamente a "Sin categoría"

**Fecha:** 3 de noviembre de 2025  
**Cambio anterior:** Corrección de grid multi-columna en vista de lista - Se ha corregido un conflicto entre el grid multi-columna y la vista de lista:
- ✅ **Grid multi-columna solo en vista de cuadrícula:** El layout de múltiples columnas ahora solo se aplica cuando NO está activa la vista de lista
- ✅ **Vista de lista preservada:** La vista de lista mantiene su diseño de columna única como se esperaba
- ✅ **Selector CSS mejorado:** Uso de `:not(.list-view)` para evitar conflictos entre modos de visualización
- ✅ **Experiencia consistente:** Cada modo de vista mantiene su diseño específico sin interferencias

**Fecha:** 3 de noviembre de 2025  
**Cambio anterior:** Ancho completo del grid de recetas - Se ha optimizado el layout del grid de recetas para aprovechar todo el espacio disponible:
- ✅ **Ancho completo:** El grid ahora utiliza todo el ancho disponible en pantallas grandes
- ✅ **Grid multi-columna responsive:** Las columnas se ajustan automáticamente con mínimo de 300px por tarjeta
- ✅ **Mejor aprovechamiento del espacio:** Distribución flexible que se adapta a cualquier tamaño de pantalla
- ✅ **Experiencia optimizada:** Layout más dinámico y adaptable

**Fecha:** 3 de noviembre de 2025  
**Cambio anterior:** Mejora de layout en vista de lista - Se ha optimizado el ancho de las tarjetas de recetas en vista de lista:
- ✅ **Ancho completo:** Las tarjetas en vista de lista ahora ocupan el 100% del ancho disponible
- ✅ **Mejor aprovechamiento del espacio:** Distribución más uniforme y consistente
- ✅ **Experiencia mejorada:** Layout más limpio y profesional en modo lista

**Fecha:** 3 de noviembre de 2025  
**Cambio anterior:** Preparación para auto-guardado - Se ha añadido la infraestructura base para implementar guardado automático:
- ✅ **Estado de auto-guardado:** Nuevas propiedades para gestionar el guardado automático (autoSaveTimer, autoSaveDelay, isAutoSaving)
- ✅ **Temporizador configurable:** Retraso de 2 segundos después de que el usuario deja de escribir
- ✅ **Control de estado:** Bandera para evitar guardados simultáneos
- 📝 **Próximamente:** Implementación completa del guardado automático en formularios de edición
- ✅ **Temporizador configurable:** Retraso de 2 segundos después de que el usuario deja de escribir
- ✅ **Control de estado:** Bandera para evitar guardados simultáneos
- 📝 **Próximamente:** Implementación completa del guardado automático en formularios de edición 3 de noviembre de 2025  
**Cambio anterior:** Mejora de grid de recetas en desktop - Se ha optimizado la visualización de recetas en pantallas grandes:
- ✅ **Grid multi-columna:** Las recetas ahora se muestran en múltiples columnas en desktop (≥769px)
- ✅ **Auto-fill responsive:** Las columnas se ajustan automáticamente con mínimo de 300px por tarjeta
- ✅ **Mejor aprovechamiento del espacio:** Distribución uniforme en pantallas anchas
- ✅ **Espaciado mejorado:** Mayor separación entre tarjetas para mejor legibilidad

**Fecha:** 3 de noviembre de 2025  
**Cambio anterior:** Botones temporalmente ocultos en vista de detalle - Se han ocultado temporalmente dos botones en la vista de detalle de recetas:
- ⚠️ **Botón Duplicar:** Temporalmente oculto mediante comentarios HTML
- ⚠️ **Botón Exportar XML:** Temporalmente oculto mediante comentarios HTML
- ✅ **Botones activos:** Editar, Eliminar, Compartir, PDF siguen disponibles
- 📝 **Nota:** Los botones están comentados en el código y pueden ser reactivados fácilmente

**Fecha:** 3 de noviembre de 2025  
**Cambio anterior:** Eliminación completa de soporte para videos - Se ha simplificado la aplicación eliminando toda la funcionalidad de videos:
- ✅ **Modelo de datos:** Campo `videos` eliminado del modelo Recipe
- ✅ **Interfaz:** Botón "🎥 Añadir Videos" y input de carga eliminados
- ✅ **Lógica:** Método `handleVideoUpload()` y event listeners eliminados
- ✅ **Optimización:** Reducción de código y mejora de rendimiento
- ✅ **Enfoque:** La aplicación ahora se centra exclusivamente en imágenes

**Fecha:** 2 de noviembre de 2025  
**Cambio anterior:** Mejoras en el sistema de parsing XML - Se ha refactorizado y consolidado el código de importación XML:
- ✅ **Código consolidado:** Eliminación de ~100 líneas de código duplicado entre parsers
- ✅ **Soporte dual de formatos:** Parsing unificado para formato compacto y completo (exportación)
- ✅ **Mejor mantenibilidad:** Lógica centralizada en XMLImporter con métodos helper reutilizables
- ✅ **Manejo robusto de errores:** Validación mejorada y mensajes de error descriptivos
- ✅ **Optimización de rendimiento:** Reducción de llamadas DOM y selectores CSS más eficientes
- ✅ **Archivo de pruebas:** Nuevo test-xml-improvements.html para validar parsing en todos los formatos
- ✅ **Documentación técnica:** test-xml-parsing.md con casos de prueba detallados

**Fecha:** 3 de noviembre de 2025  
**Cambio anterior:** Ingredientes opcionales en secuencias - Se ha eliminado la validación que requería al menos un ingrediente al crear secuencias:
- ✅ **Mayor flexibilidad:** Ahora puedes crear secuencias sin seleccionar ingredientes
- ✅ **Pasos generales:** Permite añadir pasos de preparación que no están asociados a ingredientes específicos (ej: "Precalentar el horno a 180°C")
- ✅ **Validación simplificada:** Se eliminó el mensaje de error "Debes seleccionar al menos un ingrediente"
- ✅ **Flujo más natural:** Describe los pasos libremente, con o sin ingredientes asociados

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
- ✅ Mayor robustez: previene errores al importar recetas con datos multimedia malformados
- ✅ Compatibilidad: mantiene retrocompatibilidad con recetas antiguas

**Fecha:** 2 de noviembre de 2025  
**Cambio anterior:** Exportación mejorada de recetas al compartir - Se ha completado la funcionalidad de compartir recetas para incluir todos los campos principales:
- ✅ Campos básicos: nombre, categoría, ingredientes, método de preparación, tiempo total
- ✅ Secuencias de adición con ingredientes asociados (opcionales)
- ✅ Apto para caravana (caravanFriendly)
- ✅ Secuencias de adición con ingredientes asociados
- ✅ Aparatos de cocina seleccionados
- ⚠️ **Nota:** Las imágenes no se incluyen en enlaces compartidos para mantener URLs manejables (contienen datos base64 muy grandes). Se preservan al exportar/importar mediante archivos XML.

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

## 🔧 Arquitectura de Importación XML

La aplicación utiliza un sistema robusto de importación XML con soporte para múltiples formatos:

### Formatos Soportados

1. **Formato Compacto**
   - Optimizado para tamaño reducido
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



## 🔧 Instalación

1. Clona el repositorio
2. Abre `index.html` en un navegador moderno
3. ¡Listo! No requiere instalación de dependencias

## 📄 Licencia

Proyecto personal - Uso libre