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
- **[test-xml-parsing.md](test-xml-parsing.md)** - Casos de prueba para validación de parsing XML
- **[xml-constants.js](xml-constants.js)** - Constantes y helpers para formatos XML
- **[docs/modal-triggers-examples.md](docs/modal-triggers-examples.md)** - Guía de uso del sistema de controles modales
- **[modal-controls-mapping.md](modal-controls-mapping.md)** - Mapeo de controles modales existentes
- **[MAPA-APLICACION.md](MAPA-APLICACION.md)** - Mapa aplicacion
- **[PLAN-UNIFICACION-BOTONES.md](PLAN-UNIFICACION-BOTONES.md)** -Unificar tamaños, fuentes y colores de todos los botones de la aplicación
- **[hidden-categories-inline-summary.md](hidden-categories-inline-summary.md)** - Casos de prueba para validación de parsing XML

- **[RESUMEN-CAMBIOS-CATEGORIA-SELECTOR.md](RESUMEN-CAMBIOS-CATEGORIA-SELECTOR.md)** - MSelector de Categorías para Menús
- **[remove-predefined-categories-summary.md](remove-predefined-categories-summary.md)** - Las categorías predefinidas ya no necesitan ser gestionadas desde esta modal
- **[RESUMEN-CAMBIOS-CATEGORIA-SELECTOR.md](RESUMEN-CAMBIOS-CATEGORIA-SELECTOR.md)** - Nuevo botón en el modal de selector de categorías- Permite cerrar el modal sin seleccionar una receta- Siempre habilitado cuando se selecciona una categoría
- **[RESUMEN-FINAL-SELECTOR-CATEGORIAS.md](RESUMEN-FINAL-SELECTOR-CATEGORIAS.md)** Mejorar el selector de categorías en el contexto de edición de menús para permitir:
1. Seleccionar categorías sin recetas asociadas
2. Feedback visual claro sobre disponibilidad de recetas
3. Estado limpio al abrir el modal
4. Cambio flexible entre categorías
- **[QUE-HACE-CADA-SPEC.md](QUE-HACE-CADA-SPEC.md)** - QUE-HACE-CADA-SPEC
- **[SECCIONES-WEB.md](SECCIONES-WEB.md)** - SECCIONES-WEB


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

**Fecha:** 7 de noviembre de 2025  
**Cambio:** Mejora de espaciado en modal de configuración - Se ha optimizado el espaciado entre secciones:
- ✅ **Espaciado aumentado:** Los tres divs principales del modal-body ahora tienen mayor separación (var(--spacing-md))
- ✅ **Mejor jerarquía visual:** Mayor claridad entre las secciones de Libro/Cocinoteca, Categorías/Tema e Importar/Exportar
- ✅ **Legibilidad mejorada:** El espaciado adicional facilita la distinción entre grupos funcionales
- 💡 **Ubicación:** Modal de Configuración → Espaciado entre secciones principales

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Categoría predeterminada en selector de categorías - Se ha establecido una categoría inicial en el formulario de recetas:
- ✅ **Categoría inicial:** El selector de categorías ahora muestra "Carne" como categoría predeterminada (`data-category="carne"`)
- ✅ **Mejor experiencia inicial:** Los usuarios tienen un punto de partida visual al crear recetas
- ✅ **Valor temporal:** Esta es una categoría de ejemplo que se puede cambiar fácilmente al hacer clic en el selector
- ⚠️ **Nota técnica:** El campo oculto `recipe-category` sigue con `value=""` vacío, por lo que la categoría no se guarda hasta que el usuario la seleccione explícitamente
- 💡 **Ubicación:** Vista de Formulario de Recetas → Sección Información Básica → Campo Categoría

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Eliminación del botón Cancelar en formulario de recetas - Se ha simplificado la interfaz del formulario de recetas:
- ✅ **Botón Cancelar eliminado:** El botón "Cancelar" ha sido removido de la sección de acciones del formulario
- ✅ **Interfaz más limpia:** Reducción de opciones redundantes en el formulario
- ✅ **Navegación simplificada:** Los usuarios pueden cerrar el formulario usando el botón X en el encabezado
- ✅ **Mejor enfoque:** El formulario ahora enfatiza la acción principal de guardar
- ✅ **Consistencia:** Alineado con patrones de diseño modernos que priorizan acciones positivas
- 💡 **Ubicación:** Vista de Formulario de Recetas → Sección de acciones del formulario (parte inferior)

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Mejora de placeholder en selector de Cocinoteca - Se ha optimizado el comportamiento del selector de preferencias culinarias:
- ✅ **Placeholder mejorado:** La opción "Selecciona una opción..." ahora está marcada como `disabled` y `selected`
- ✅ **Mejor UX:** El placeholder no se puede seleccionar como valor válido, forzando al usuario a elegir una opción real
- ✅ **Comportamiento estándar:** Sigue las mejores prácticas de HTML para selectores con placeholder
- ✅ **Validación implícita:** El campo queda vacío (`value=""`) hasta que se selecciona una opción válida
- 💡 **Ubicación:** Vista de Configuración → Sección Cocinoteca → Selector de preferencias

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Corrección de posicionamiento de badges en modal-triggers.css - Se ha corregido el comportamiento de posicionamiento de badges modales:
- ✅ **Position relative por defecto:** Los badges ahora usan `position: relative` en lugar de `absolute` como valor base
- ✅ **Nueva clase para absoluto:** Se ha añadido `.modal-trigger--badge-absolute` para casos que requieren posicionamiento absoluto
- ✅ **Mayor flexibilidad:** Permite usar badges tanto en flujo normal del documento como posicionados absolutamente
- ✅ **Mejor control:** Los desarrolladores pueden elegir explícitamente el tipo de posicionamiento según el caso de uso
- ✅ **Compatibilidad:** Las variantes de posición (top-left, top-right, etc.) siguen funcionando correctamente
- 💡 **Uso:** Añade `.modal-trigger--badge-absolute` cuando necesites posicionamiento absoluto sobre un contenedor
- 📚 **Documentación:** Ver `docs/modal-triggers-examples.md` para ejemplos actualizados

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Reordenación del menú principal - Se ha optimizado el orden de los botones en el menú hamburguesa para priorizar la acción principal:
- ✅ **Nueva Receta primero:** El botón "Nueva Receta" ahora aparece en primera posición (anteriormente en segunda)
- ✅ **Recetas en segunda posición:** El botón "Recetas" se ha movido a la segunda posición
- ✅ **Mejor jerarquía visual:** La acción principal de crear recetas está más accesible
- ✅ **Flujo mejorado:** Orden más lógico que prioriza la creación sobre la visualización
- ✅ **Orden actual:** Nueva Receta → Recetas → Menús → Listas de Compra → Configuración
- 💡 **Ubicación:** Menú hamburguesa (☰) → Dropdown principal

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Limpieza de emojis en menú principal - Se han eliminado los emojis de los botones del menú hamburguesa para un diseño más limpio y profesional:
- ✅ **Texto simplificado:** Los botones ahora muestran solo texto sin emojis decorativos
- ✅ **Botones actualizados:** Recetas, Nueva Receta, Menús, Listas de Compra, Configuración
- ✅ **Diseño más limpio:** Interfaz más minimalista y profesional
- ✅ **Mejor legibilidad:** Texto más claro sin distracciones visuales
- ✅ **Consistencia:** Alineado con el estilo de diseño moderno de la aplicación
- 💡 **Ubicación:** Menú hamburguesa (☰) → Todos los elementos del dropdown

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Refinamiento de separadores en listas de compra - Se ha optimizado el diseño de los separadores entre elementos:
- ✅ **Separador más visible:** Opacidad aumentada de 0.3 a 0.5 para mejor definición visual
- ✅ **Último elemento sin borde:** El último elemento de cada lista ya no tiene borde inferior, creando un final más limpio
- ✅ **Mejor jerarquía visual:** Los elementos están claramente delimitados sin sobrecargar la interfaz
- ✅ **Legibilidad mejorada:** Facilita la distinción entre elementos, especialmente en listas largas
- ✅ **Diseño pulido:** Acabado más profesional y consistente con el resto de la aplicación
- 💡 **Ubicación:** Vista de Listas de Compra → Elementos individuales de cada lista

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Separadores visuales en elementos de listas de compra - Se ha mejorado la legibilidad de las listas de compra añadiendo separadores entre elementos:
- ✅ **Separador sutil:** Línea inferior de 1px con color rgba(221, 221, 221, 0.3) entre cada elemento
- ✅ **Mejor organización visual:** Los elementos ahora están claramente delimitados sin sobrecargar la interfaz
- ✅ **Legibilidad mejorada:** Facilita la distinción entre elementos, especialmente en listas largas
- ✅ **Diseño consistente:** El separador mantiene la estética minimalista de la aplicación
- 💡 **Ubicación:** Vista de Listas de Compra → Elementos individuales de cada lista

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Iconos Font Awesome en botones de Listas de Compra - Se han reemplazado los emojis por iconos Font Awesome en los botones del formulario de listas de compra:
- ✅ **Botón "Añadir Elemento":** Ahora usa `<i class="fa-solid fa-plus"></i>` en lugar del emoji ➕
- ✅ **Botón "Guardar Lista":** Ahora usa `<i class="fa-solid fa-floppy-disk"></i>` en lugar del emoji 💾
- ✅ **Consistencia visual:** Los iconos Font Awesome ofrecen mejor renderizado y consistencia entre navegadores
- ✅ **Mejor escalabilidad:** Los iconos vectoriales se adaptan mejor a diferentes tamaños de pantalla
- 💡 **Ubicación:** Vista de Listas de Compra → Formulario de edición/creación

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Renombrado de sección Preferencias a Cocinoteca - Se ha actualizado el título de la sección en la vista de Configuración:
- ✅ **Nuevo nombre:** "Cocinoteca" (anteriormente "Preferencias")
- ✅ **Layout 50/50:** Las secciones "Libro de receta de" y "Cocinoteca" se muestran lado a lado en un grid de dos columnas
- ✅ **Selector de preferencias:** Dropdown con opciones predefinidas (Cocina asiática, Cocina vegana, No me gustan las verduras, Cómo meter comida en el hospital)
- ✅ **Mejor aprovechamiento del espacio:** Uso más eficiente del espacio horizontal en la primera sección de Configuración
- ✅ **Diseño consistente:** Mantiene el mismo estilo de grid 50/50 usado en otras secciones de Configuración
- ✅ **Ancho completo:** Ambos campos (input y select) ocupan el 100% del ancho de su columna
- 💡 **Ubicación:** Vista de Configuración → Primera sección (antes de Categorías/Tema)
- 📝 **Nota:** Campo preparado para futuras funcionalidades de personalización y recomendaciones

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Nuevo campo de Preferencias en Configuración - Se ha añadido un selector de preferencias culinarias en la vista de Configuración

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Mejora de espaciado en grid Categorías/Tema - Se ha optimizado el espaciado visual del grid 50/50 en la vista de Configuración:
- ✅ **Separación mejorada:** Añadido margen superior (var(--spacing-xl)) al grid de Categorías/Tema
- ✅ **Mejor jerarquía visual:** Mayor separación entre el título de Configuración y las secciones de contenido
- ✅ **Legibilidad mejorada:** El espaciado adicional facilita la distinción entre el encabezado y el contenido
- ✅ **Consistencia visual:** Mantiene el espaciado uniforme con otras secciones de la aplicación
- 💡 **Ubicación:** Vista de Configuración → Grid de Categorías y Tema

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Mejora de espaciado en sección Importar/Exportar - Se ha optimizado el espaciado visual en la vista de Configuración:
- ✅ **Separación mejorada:** Añadido margen superior (var(--spacing-xl)) a la sección "Importar y Exportar"
- ✅ **Mejor jerarquía visual:** Mayor separación entre las secciones de Categorías/Tema y la sección de Importar/Exportar
- ✅ **Legibilidad mejorada:** El espaciado adicional facilita la distinción entre grupos funcionales
- 💡 **Ubicación:** Vista de Configuración → Sección Importar y Exportar

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Refinamiento de texto en botón de Categorías - Se ha simplificado el texto del botón de gestión de categorías en la vista de Configuración:
- ✅ **Texto simplificado:** De "Gestionar Categorías" a "Categorías" para mayor concisión
- ✅ **Mejor UX:** Texto más corto y directo que mantiene la claridad
- ✅ **Consistencia:** Alineado con el estilo de nomenclatura de otros botones del sistema
- 💡 **Ubicación:** Vista de Configuración → Sección Categorías

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Migración de botones de Listas de Compra al sistema modal-triggers - Se han migrado los botones de gestión de listas de compra al sistema normalizado:
- ✅ **Botones migrados:** "Nueva Lista" e "Importar Lista" ahora usan `.modal-trigger .modal-trigger--option`
- ✅ **Layout grid 2 columnas:** Los botones se muestran en un grid de 2 columnas con gap consistente
- ✅ **Estructura unificada:** Uso de `.option-icon` y `.option-text` para iconos y texto
- ✅ **Efecto hover mejorado:** Desplazamiento lateral (translateX) en lugar de escala
- ✅ **Iconos Font Awesome:** Mantiene los iconos `fa-plus` y `fa-file-import` dentro de la nueva estructura
- ✅ **Consistencia visual:** Mismo estilo que los botones del menú de opciones de recetas y configuración
- 💡 **Progreso de migración:** Cuarto grupo de componentes migrados al sistema modal-triggers
- 📚 **Documentación:** Ver `docs/modal-triggers-examples.md` sección "Botones de Opciones en Modales"

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Layout 50/50 en Configuración - Se ha optimizado el diseño de la vista de Configuración con un layout de dos columnas:
- ✅ **Grid 50/50:** Las secciones de Categorías y Tema ahora se muestran lado a lado en un grid de dos columnas
- ✅ **Mejor aprovechamiento del espacio:** Uso más eficiente del espacio horizontal en pantallas anchas
- ✅ **Diseño compacto:** Ambas secciones visibles simultáneamente sin necesidad de scroll
- ✅ **Responsive:** El grid se adapta automáticamente a diferentes tamaños de pantalla
- ✅ **Consistencia visual:** Mantiene el espaciado y alineación del sistema de diseño
- 💡 **Mejora UX:** Acceso más rápido a ambas funcionalidades principales de configuración

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Mejora del botón de Cambiar Tema con iconos dinámicos - Se ha mejorado el botón de cambio de tema para mostrar el estado actual del tema:
- ✅ **Iconos dinámicos:** El botón ahora muestra el icono correspondiente al tema actual (🌙 luna para modo oscuro, ☀️ sol para modo claro)
- ✅ **Texto descriptivo:** El texto del botón indica el modo actual ("Modo oscuro" o "Modo claro")
- ✅ **IDs añadidos:** `theme-icon-modal` y `theme-text-modal` para actualización dinámica del contenido
- ✅ **Icono Font Awesome:** Usa `<i class="fa-solid fa-moon"></i>` para modo oscuro y `<i class="fa-solid fa-sun"></i>` para modo claro
- ✅ **Mejor UX:** El usuario puede ver de un vistazo qué tema está activo antes de hacer clic
- ✅ **Sistema modal-triggers:** Mantiene la estructura `.modal-trigger .modal-trigger--option` con efecto hover de desplazamiento lateral
- 💡 **Progreso de migración:** Tercer componente migrado al sistema modal-triggers (después del menú de opciones de recetas y gestionar categorías)
- 📚 **Documentación:** Ver `docs/modal-triggers-examples.md` sección "Botones de Opciones en Modales"

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Migración de botones del menú de opciones - Se han migrado los 6 botones del menú de opciones de recetas al sistema normalizado de controles modales:
- ✅ **Botones migrados:** Editar, Ocultar, Exportar, Copiar, Duplicar, Eliminar
- ✅ **Clases actualizadas:** De `.option-btn` a `.modal-trigger .modal-trigger--option`
- ✅ **Variante danger:** El botón Eliminar usa `.modal-trigger--danger` para estilo rojo
- ✅ **Efecto hover mejorado:** Desplazamiento lateral (translateX) en lugar de escala
- ✅ **Consistencia visual:** Todos los botones de opciones ahora siguen el mismo patrón de diseño
- 💡 **Progreso de migración:** Primera implementación real del sistema modal-triggers en componentes HTML
- 📚 **Documentación:** Ver `docs/modal-triggers-examples.md` sección "Botones de Opciones en Modales"

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Limpieza de estilos duplicados en styles.css - Se han eliminado estilos de badges duplicados que ahora están en `modal-triggers.css`:
- ✅ **Estilos eliminados:** `.recipe-time-badge`, `.recipe-caravan-badge-image`, `.recipe-hospital-badge-image`, `.recipe-menu-badge-image`
- ✅ **Reducción de código:** ~70 líneas de CSS duplicado eliminadas de `styles.css`
- ✅ **Centralización:** Todos los estilos de badges modales ahora están exclusivamente en `modal-triggers.css`
- ✅ **Mantenibilidad mejorada:** Un único lugar para gestionar estilos de controles modales
- 💡 **Estado:** Los estilos siguen funcionando correctamente desde `modal-triggers.css` (activo desde línea 39 de `index.html`)
- 📚 **Documentación:** Ver `docs/modal-triggers-examples.md` para guía de uso completa

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Variantes de botones de acción añadidas - Se han añadido nuevas clases CSS para botones de acción específicos en `modal-triggers.css`:
- ✅ **`.modal-trigger--action`:** Clase base para botones de acción pequeños (32px altura, padding reducido)
- ✅ **`.modal-trigger--edit`:** Botón de editar con hover negro sobre fondo blanco
- ✅ **`.modal-trigger--delete`:** Botón de eliminar con hover rojo (color-danger)
- ✅ **`.modal-trigger--save`:** Botón de guardar con hover verde (color-success)
- ✅ **`.modal-trigger--cancel`:** Botón de cancelar con hover gris (color-text-secondary)
- ✅ **`.modal-trigger--move`:** Botón de mover (arriba/abajo) con hover negro
- ✅ **Estado disabled:** Opacidad reducida (0.3) y cursor not-allowed para botones deshabilitados
- 💡 **Uso:** Estas clases están listas para ser aplicadas a botones de ingredientes, secuencias y otros controles de acción
- 📚 **Documentación:** Ver ejemplos de uso en `docs/modal-triggers-examples.md`

**Fecha:** 6 de noviembre de 2025  
**Cambio anterior:** Sistema de controles modales activado - Se ha activado el sistema normalizado de controles modales:
- ✅ **Sistema modular activo:** `modal-triggers.css` está ahora vinculado y funcionando en `index.html`
- ✅ **Estilos base activos:** `styles.css` continúa activo para estilos generales de la aplicación
- ⚠️ **Migración pendiente:** Las clases HTML en componentes aún usan el sistema antiguo (Tarea 15 pendiente)
- 💡 **Estado actual:** Ambos sistemas CSS coexisten - el nuevo sistema está listo pero los componentes HTML aún no usan las nuevas clases BEM
- 🔄 **Próximo paso:** Actualizar clases HTML en componentes existentes para usar `.modal-trigger` y sus modificadores
- 📚 **Documentación disponible:** Especificaciones completas en `.kiro/specs/modal-triggers-normalization/` y ejemplos en `docs/modal-triggers-examples.md`

**Fecha:** 5 de noviembre de 2025  
**Cambio anterior:** Botón de Menús restaurado - Se ha restaurado el botón de Menús en el menú principal:
- ✅ **Botón Menús:** Ahora visible y accesible desde el menú hamburguesa (☰) → 📋 Menús
- ✅ **Funcionalidad completa:** Acceso a la gestión de menús semanales y planificación de comidas
- ✅ **Todos los botones activos:** Categorías, Listas de Compra, Menús, Importar/Exportar recetas disponibles

**Fecha:** 4 de noviembre de 2025  
**Cambio anterior:** Mejoras en UX del formulario y navegación - Se han implementado múltiples mejoras en la experiencia de usuario:
- ✅ **Icono de edición:** Icono de lápiz (Font Awesome) junto al nombre de receta en vista detalle
- ✅ **Tooltip inline:** El tooltip "Editar receta" aparece en línea junto al icono de lápiz
- ✅ **Badges clickeables:** Los checkboxes de Caravana/Hospital/Menú ahora son badges visuales clickeables
- ✅ **Estado visual activo:** Los badges cambian a color rosa con sombra cuando están activos
- ✅ **Navegación mejorada:** Al cerrar el formulario de edición, vuelves a la vista detalle de la receta
- ✅ **Galería sin modal:** Las imágenes en la galería de detalle ya no abren modal al hacer click
- ✅ **Modo edición visual:** El h2 mantiene el estilo hover cuando estás en modo edición

**Fecha:** 3 de noviembre de 2025  
**Cambio anterior:** Refactorización de gestión de categorías - Se ha mejorado la arquitectura del sistema de categorías con métodos especializados:
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

## 🎨 Sistema de Controles Modales (Infraestructura Completa - Activado)

✅ **ESTADO ACTUAL:** Este sistema está completamente desarrollado y activado. El archivo `modal-triggers.css` está vinculado en `index.html` (línea 39) y listo para usar. Los estilos base continúan funcionando desde `styles.css` (línea 38).

⚠️ **MIGRACIÓN PENDIENTE:** Aunque el CSS está activo, los componentes HTML aún no han sido migrados para usar las nuevas clases BEM. Actualmente ambos sistemas coexisten sin conflictos.

La aplicación tiene la infraestructura completa para un sistema normalizado de controles modales (badges, botones, enlaces):

### Arquitectura

- **Archivo modular:** `modal-triggers.css` - Hoja CSS independiente con estilos normalizados (DESACTIVADO)
- **Convención BEM:** Metodología Block Element Modifier para nombres de clases
- **Variables CSS:** Integración completa con el sistema de diseño existente
- **Responsive:** Soporte para mobile, tablet y desktop
- **Tema oscuro:** Estilos específicos para modo oscuro

### Estructura de Clases

```css
/* Clase base para todos los controles modales */
.modal-trigger

/* Modificadores por tipo de control */
.modal-trigger--badge    /* Para badges (recipe-ingredients-badge, etc.) */
.modal-trigger--button   /* Para botones (category-chip, btn-upload-media, etc.) */
.modal-trigger--link     /* Para enlaces */
.modal-trigger--icon     /* Para controles de solo icono */

/* Variantes de posición para badges */
.modal-trigger--badge-top-left
.modal-trigger--badge-top-right
.modal-trigger--badge-bottom-left
.modal-trigger--badge-bottom-right

/* Variantes de tamaño */
.modal-trigger--badge-sm
.modal-trigger--badge-md
.modal-trigger--badge-lg

/* Variantes de botones de acción (NEW) */
.modal-trigger--action   /* Botones de acción pequeños (32px altura) */
.modal-trigger--edit     /* Botón de editar con hover negro */
.modal-trigger--delete   /* Botón de eliminar con hover rojo */
.modal-trigger--save     /* Botón de guardar con hover verde */
.modal-trigger--cancel   /* Botón de cancelar con hover gris */
.modal-trigger--move     /* Botón de mover (arriba/abajo) con hover negro */
```

### Controles Identificados para Migración

- **7 Badges:** recipe-ingredients-badge, recipe-options-badge, recipe-pdf-badge, recipe-time-badge, recipe-caravan-badge, recipe-hospital-badge, recipe-menu-badge
- **6 Botones:** category-chip, btn-upload-media, cooking-action-btn, appliance-chip, sequence-ingredient-chip, menu-btn
- **2 Enlaces/Selectores:** category-selection-badge, btn-copy-ingredients

### Estado del Proyecto

✅ **Estado actual:** ACTIVADO Y EN USO - El archivo CSS está vinculado en `index.html` (línea 39) y ya se está utilizando en componentes

📝 **Fase actual:** Infraestructura CSS completada (Tareas 1-14 ✅), migración de clases HTML iniciada (Tarea 15 en progreso)

🎯 **Componentes migrados:**
- ✅ **Menú de opciones de recetas** (6 botones): Editar, Ocultar, Exportar, Copiar, Duplicar, Eliminar
- ✅ **Botón de Gestionar Categorías** (1 botón): En vista de Configuración
- ✅ **Botón de Cambiar Tema** (1 botón): En vista de Configuración → Tema
- ✅ **Botones de Listas de Compra** (2 botones): Nueva Lista, Importar Lista

🔄 **Pendientes de migración:**
- ⏳ **Badges** (7): recipe-ingredients-badge, recipe-options-badge, recipe-pdf-badge, recipe-time-badge, recipe-caravan-badge, recipe-hospital-badge, recipe-menu-badge
- ⏳ **Botones de formulario** (5): category-chip, btn-upload-media, cooking-action-btn, appliance-chip, sequence-ingredient-chip
- ⏳ **Enlaces/Selectores** (2): category-selection-badge, btn-copy-ingredients

💡 **Estado actual:** Migración gradual en progreso. El sistema modal-triggers está activo y funcionando correctamente en los componentes migrados. Los componentes pendientes continúan usando clases antiguas sin conflictos.

Ver documentación completa en:
- `.kiro/specs/modal-triggers-normalization/requirements.md` - Requisitos funcionales
- `.kiro/specs/modal-triggers-normalization/design.md` - Arquitectura y diseño
- `.kiro/specs/modal-triggers-normalization/tasks.md` - Plan de implementación (Tareas 1-14 completadas)
- `modal-controls-mapping.md` - Mapeo detallado de controles existentes
- `docs/modal-triggers-examples.md` - Guía de uso con ejemplos HTML

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