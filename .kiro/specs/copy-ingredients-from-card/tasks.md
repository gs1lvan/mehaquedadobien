# Implementation Plan

- [x] 1. Añadir estilos CSS para el badge de ingredientes y toast notification





  - Crear estilos para `.recipe-ingredients-badge` con posicionamiento absoluto en esquina inferior derecha
  - Añadir efectos hover, active y focus para el badge
  - Crear estilos para `.toast-notification` con animaciones de entrada/salida
  - Añadir variantes de toast para success y error
  - Incluir media queries para optimización móvil (44x44px touch target)
  - Añadir soporte para tema oscuro en ambos componentes
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.2_

- [x] 2. Implementar método para formatear ingredientes como texto





  - Crear método `formatIngredientsForClipboard(recipe)` en la clase RecipeApp
  - Formatear texto con nombre de receta como primera línea
  - Añadir línea en blanco después del nombre
  - Iterar sobre ingredientes y formatear cada uno como "nombre - cantidad unidad"
  - Manejar casos donde cantidad o unidad están vacíos
  - Manejar caso especial cuando no hay ingredientes
  - _Requirements: 2.2, 2.3, 2.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 3. Implementar método para copiar al portapapeles





  - Crear método `copyIngredientsToClipboard(recipe, event)` en la clase RecipeApp
  - Prevenir propagación del evento para no abrir la vista de detalle
  - Llamar a `formatIngredientsForClipboard` para obtener el texto
  - Usar `navigator.clipboard.writeText()` para copiar al portapapeles
  - Implementar manejo de errores con try-catch
  - Llamar a `showToast` con mensaje de éxito o error
  - _Requirements: 2.1, 2.5, 4.1, 4.3_

- [x] 4. Implementar método de respaldo para navegadores antiguos





  - Crear método `fallbackCopyToClipboard(text)` en la clase RecipeApp
  - Crear elemento textarea temporal fuera de la vista
  - Seleccionar y copiar texto usando `document.execCommand('copy')`
  - Limpiar elemento temporal después de copiar
  - Integrar fallback en `copyIngredientsToClipboard` si Clipboard API falla
  - _Requirements: 2.1, 4.1_

- [x] 5. Implementar sistema de notificaciones toast





  - Crear método `showToast(message, type)` en la clase RecipeApp
  - Crear o reutilizar elemento toast en el DOM
  - Actualizar mensaje y tipo (success/error) del toast
  - Añadir clase 'show' para activar animación de entrada
  - Configurar timeout para remover clase 'show' después de 3 segundos
  - Actualizar icono según el tipo de notificación
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.4_

- [x] 6. Modificar método createRecipeCard para añadir badge de ingredientes





  - Localizar la sección donde se crea el badge de tiempo en `createRecipeCard`
  - Crear elemento div con clase `recipe-ingredients-badge`
  - Añadir icono 📋 como contenido del badge
  - Añadir atributos `title`, `role`, `tabindex` y `aria-label` para accesibilidad
  - Añadir event listener de click que llame a `copyIngredientsToClipboard`
  - Añadir badge al contenedor de imagen (imageDiv)
  - _Requirements: 1.1, 1.2, 1.4, 1.5, 2.1, 4.1_

- [x] 7. Añadir soporte de teclado para accesibilidad





  - Añadir event listener para evento 'keydown' en el badge
  - Detectar teclas Enter y Space
  - Llamar a `copyIngredientsToClipboard` cuando se presionen estas teclas
  - Prevenir comportamiento por defecto del navegador
  - _Requirements: 1.5, 4.1_

- [-] 8. Realizar pruebas manuales en diferentes navegadores y dispositivos



  - Probar en Chrome/Edge con Clipboard API
  - Probar en Firefox con Clipboard API
  - Probar en Safari (puede requerir fallback)
  - Probar en dispositivos móviles (iOS y Android)
  - Verificar que el badge no interfiere con el clic en la tarjeta
  - Verificar que el toast es visible en todas las resoluciones
  - Probar navegación con teclado (Tab, Enter, Space)
  - Verificar que el texto copiado se puede pegar correctamente en otras aplicaciones
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5_
