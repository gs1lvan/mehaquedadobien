# Implementation Plan

- [x] 1. Añadir opción "Listas de Compra" al menú


  - Añadir botón en el menú hamburguesa y configurar navegación
  - _Requirements: 1.1, 1.2, 1.3, 1.4_



- [x] 1.1 Añadir botón al menú dropdown

  - Añadir elemento `<button id="shopping-lists-btn" class="menu-item">` en `index.html`
  - Usar emoji 🛒 y texto "Listas de Compra"
  - Posicionar después del botón de "Categorías" y antes de "Importar receta"

  - _Requirements: 1.1_

- [x] 1.2 Añadir event listener para el botón

  - En `script.js`, añadir event listener para `shopping-lists-btn`

  - Llamar a `showShoppingListsView()` al hacer clic
  - Cerrar el menú después de hacer clic
  - _Requirements: 1.2, 1.3_


- [x] 2. Crear estructura HTML de la vista de listas

  - Crear el contenedor principal y elementos de la interfaz
  - _Requirements: 2.1, 4.1, 4.2, 4.3_

- [x] 2.1 Crear contenedor principal en index.html

  - Añadir `<div id="shopping-lists-view" class="view-container hidden">` después de `recipe-detail-view`
  - Incluir header con título "🛒 Listas de Compra" y botón "➕ Nueva Lista"
  - Incluir contenedor `<div id="shopping-lists-container">`
  - Incluir empty state `<div id="shopping-lists-empty" class="empty-state hidden">`
  - _Requirements: 2.1, 4.1_

- [x] 2.2 Crear modal de formulario para lista


  - Añadir `<div id="shopping-list-modal" class="modal hidden">` al final del body
  - Incluir overlay, header con título y botón cerrar
  - Incluir input para nombre de lista
  - Incluir contenedor para elementos `<div id="shopping-items-container">`
  - Incluir botón "➕ Añadir Elemento"
  - Incluir footer con botones Cancelar y Guardar
  - _Requirements: 2.2, 2.3, 3.1, 3.2, 3.3_

- [x] 3. Crear estilos CSS para listas de compra


  - Diseñar la apariencia de las listas y elementos
  - _Requirements: 4.3, 4.4, 4.5, 4.6, 4.7, 5.3, 9.1, 9.4_

- [x] 3.1 Estilos del contenedor principal

  - Crear estilos para `.shopping-lists-header` con flexbox
  - Crear estilos para `.shopping-lists-container` con gap
  - Crear estilos para `.empty-state` centrado
  - _Requirements: 4.1, 9.1_


- [x] 3.2 Estilos de la tarjeta de lista
  - Crear estilos para `.shopping-list-card` con border y padding
  - Crear estilos para `.shopping-list-header` con cursor pointer
  - Crear estilos para `.shopping-list-name` (H3)
  - Crear estilos para `.shopping-list-counter` con badge
  - Crear estilos para `.expand-icon` con rotación
  - Añadir hover effects
  - _Requirements: 4.2, 4.3, 4.7, 10.1, 10.2, 10.3_


- [x] 3.3 Estilos del contenido colapsable
  - Crear estilos para `.shopping-list-content` con max-height transition
  - Crear clase `.collapsed` con max-height: 0 y opacity: 0
  - Crear estilos para `.shopping-list-items` con gap
  - _Requirements: 4.4, 4.5, 4.7_


- [x] 3.4 Estilos de elementos individuales
  - Crear estilos para `.shopping-item` con flexbox
  - Crear estilos para `.shopping-item-checkbox` de 20x20px
  - Crear estilos para `.shopping-item-label` con flex
  - Crear estilos para `.shopping-item.completed` con text-decoration: line-through
  - Crear estilos para `.shopping-item-name` y `.shopping-item-quantity`
  - _Requirements: 4.5, 4.6, 5.1, 5.2, 5.3_


- [x] 3.5 Estilos del formulario de elementos

  - Crear estilos para `.shopping-item-input` con grid layout
  - Configurar 3 columnas: nombre (2fr), cantidad (1fr), botón (auto)
  - Añadir media query para móvil con 1 columna

  - _Requirements: 3.1, 3.2, 3.3, 9.1_

- [x] 3.6 Estilos responsive y accesibilidad

  - Añadir media queries para tablet y móvil
  - Asegurar touch targets de 44x44px mínimo
  - Añadir estilos de focus visibles
  - Añadir soporte para tema oscuro
  - _Requirements: 9.1, 9.2, 9.4_

- [x] 4. Crear clase ShoppingListManager


  - Implementar lógica de gestión de listas
  - _Requirements: 2.6, 6.6, 7.3, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [x] 4.1 Crear estructura básica de la clase


  - Crear clase `ShoppingListManager` en `script.js`
  - Añadir constructor con array `lists` vacío
  - Añadir propiedad `currentListId` para edición
  - Llamar a `loadLists()` en constructor
  - _Requirements: 8.1, 8.5_


- [x] 4.2 Implementar métodos CRUD de listas

  - Crear método `createList(name)` que genera ID único y crea lista
  - Crear método `getList(id)` que retorna lista por ID
  - Crear método `updateList(id, updates)` que actualiza lista
  - Crear método `deleteList(id)` que elimina lista
  - Cada método debe llamar a `saveLists()` después de modificar
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 6.3, 6.4, 6.5, 6.6, 7.3, 7.4_



- [x] 4.3 Implementar métodos de gestión de elementos

  - Crear método `addItem(listId, item)` que añade elemento a lista
  - Crear método `updateItem(listId, itemId, updates)` que actualiza elemento
  - Crear método `deleteItem(listId, itemId)` que elimina elemento
  - Crear método `toggleItemCompleted(listId, itemId)` que cambia estado
  - Cada método debe llamar a `saveLists()` después de modificar

  - _Requirements: 3.4, 3.5, 5.1, 5.2, 5.4, 5.5, 6.5_



- [x] 4.4 Implementar persistencia en localStorage

  - Crear método `loadLists()` que carga desde localStorage
  - Crear método `saveLists()` que guarda en localStorage
  - Usar clave `shopping_lists` en localStorage
  - Manejar errores de localStorage (try-catch)


  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_


- [x] 4.5 Implementar métodos utilitarios

  - Crear método `getCompletedCount(listId)` que cuenta elementos completados
  - Crear método `getTotalCount(listId)` que cuenta total de elementos
  - Crear método `isListComplete(listId)` que verifica si todos están completados
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 5. Integrar ShoppingListManager en RecipeApp


  - Conectar el gestor de listas con la aplicación principal
  - _Requirements: 1.2, 1.3, 1.4, 2.1_


- [x] 5.1 Inicializar ShoppingListManager

  - En constructor de `RecipeApp`, crear instancia de `ShoppingListManager`
  - Guardar en `this.shoppingListManager`
  - Llamar a `initShoppingLists()` después de inicializar otras funcionalidades
  - _Requirements: 8.1, 8.5_

- [x] 5.2 Crear método initShoppingLists

  - Crear método `initShoppingLists()` en `RecipeApp`
  - Obtener referencias a elementos del DOM
  - Configurar event listeners para botones
  - Configurar event listener para botón del menú
  - _Requirements: 1.2, 2.1_

- [x] 6. Implementar navegación entre vistas

  - Mostrar/ocultar vista de listas de compra
  - _Requirements: 1.3, 1.4_

- [x] 6.1 Crear método showShoppingListsView

  - Crear método `showShoppingListsView()` en `RecipeApp`
  - Ocultar `recipes-view`, `recipe-form-view`, `recipe-detail-view`
  - Mostrar `shopping-lists-view`
  - Llamar a `renderShoppingLists()`
  - Actualizar estado de navegación
  - _Requirements: 1.3, 1.4, 4.1_

- [x] 6.2 Crear método hideShoppingListsView

  - Crear método `hideShoppingListsView()` en `RecipeApp`
  - Ocultar `shopping-lists-view`
  - Mostrar vista anterior (normalmente `recipes-view`)
  - _Requirements: 1.4_

- [x] 6.3 Actualizar método goToHome

  - Modificar `goToHome()` para también ocultar `shopping-lists-view`
  - Asegurar que vuelve a la vista de recetas
  - _Requirements: 1.4_

- [x] 7. Implementar renderizado de listas

  - Mostrar todas las listas en la vista
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 10.1, 10.2, 10.3_

- [x] 7.1 Crear método renderShoppingLists

  - Crear método `renderShoppingLists()` en `RecipeApp`
  - Obtener todas las listas de `shoppingListManager`
  - Limpiar contenedor `shopping-lists-container`
  - Si no hay listas, mostrar empty state
  - Si hay listas, renderizar cada una con `renderShoppingListCard()`
  - _Requirements: 4.1, 4.2_

- [x] 7.2 Crear método renderShoppingListCard

  - Crear método `renderShoppingListCard(list)` en `RecipeApp`
  - Crear elemento div con clase `shopping-list-card`
  - Crear header con nombre (H3), contador y icono expandir
  - Crear botones de acciones (editar, eliminar)
  - Crear contenedor de contenido colapsado
  - Renderizar elementos con `renderShoppingItems()`
  - Añadir event listeners para expandir/colapsar
  - Retornar elemento creado
  - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 10.1, 10.2, 10.3_

- [x] 7.3 Crear método renderShoppingItems

  - Crear método `renderShoppingItems(list)` en `RecipeApp`
  - Crear contenedor con clase `shopping-list-items`
  - Iterar sobre items de la lista
  - Para cada item, crear div con checkbox, label, nombre y cantidad
  - Aplicar clase `completed` si item.completed es true
  - Añadir event listener al checkbox para toggle
  - Retornar contenedor
  - _Requirements: 4.5, 4.6, 5.1, 5.2, 5.3, 5.4_

- [x] 8. Implementar funcionalidad de expandir/colapsar




  - Permitir expandir y colapsar listas
  - _Requirements: 4.3, 4.4, 4.7_

- [x] 8.1 Crear método toggleListExpanded

  - Crear método `toggleListExpanded(listId)` en `RecipeApp`
  - Obtener elemento de la lista por data-list-id
  - Obtener contenedor de contenido
  - Toggle clase `collapsed` en el contenedor
  - Toggle clase `expanded` en el header
  - Actualizar aria-expanded attribute
  - _Requirements: 4.3, 4.4, 4.7, 9.3_

- [x] 8.2 Añadir event listeners en renderShoppingListCard

  - En `renderShoppingListCard()`, añadir click listener al header
  - Llamar a `toggleListExpanded(list.id)` al hacer clic
  - Añadir keydown listener para Enter y Space
  - _Requirements: 4.3, 4.4, 9.2_

- [x] 9. Implementar marcar elementos como completados

  - Permitir marcar/desmarcar elementos
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.5_

- [x] 9.1 Crear método toggleItemCompleted

  - Crear método `toggleItemCompleted(listId, itemId)` en `RecipeApp`
  - Llamar a `shoppingListManager.toggleItemCompleted(listId, itemId)`
  - Re-renderizar solo la lista afectada
  - Actualizar contador de la lista
  - _Requirements: 5.1, 5.2, 5.4, 5.5, 10.5_

- [x] 9.2 Añadir event listeners a checkboxes

  - En `renderShoppingItems()`, añadir change listener a cada checkbox
  - Llamar a `toggleItemCompleted(listId, item.id)` al cambiar
  - Prevenir propagación del evento
  - _Requirements: 5.1, 5.2_

- [x] 9.3 Actualizar estilos visuales

  - Aplicar clase `completed` al item cuando está marcado
  - Actualizar contador en el header
  - Cambiar color del contador a verde si todos completados
  - _Requirements: 5.3, 10.4_

- [x] 10. Implementar formulario de crear/editar lista

  - Mostrar modal para crear o editar listas
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [x] 10.1 Crear método showShoppingListForm

  - Crear método `showShoppingListForm(listId = null)` en `RecipeApp`
  - Si listId es null, modo crear; si no, modo editar
  - Obtener modal y elementos del formulario
  - Si modo editar, cargar datos de la lista
  - Limpiar formulario si modo crear
  - Mostrar modal (remover clase `hidden`)
  - Renderizar items existentes si modo editar
  - _Requirements: 2.1, 2.2, 6.1, 6.2_

- [x] 10.2 Crear método para añadir input de elemento

  - Crear método `addShoppingItemInput(item = null)` en `RecipeApp`
  - Crear div con clase `shopping-item-input`
  - Crear input para nombre del elemento
  - Crear input para cantidad (opcional)
  - Crear botón eliminar
  - Si item no es null, rellenar con datos
  - Añadir event listener al botón eliminar
  - Añadir al contenedor `shopping-items-container`
  - _Requirements: 3.1, 3.2, 3.3, 3.7_

- [x] 10.3 Configurar event listeners del formulario

  - Añadir click listener a botón "➕ Añadir Elemento"
  - Llamar a `addShoppingItemInput()` al hacer clic
  - Añadir click listener a botón "Guardar Lista"
  - Llamar a `saveShoppingList()` al hacer clic
  - Añadir click listener a botón "Cancelar"
  - Cerrar modal al cancelar
  - Añadir click listener a botón cerrar (X)
  - Añadir click listener al overlay para cerrar
  - _Requirements: 2.4, 2.5, 6.6, 6.7_

- [x] 10.4 Crear método saveShoppingList

  - Crear método `saveShoppingList()` en `RecipeApp`
  - Obtener nombre de la lista del input
  - Validar que el nombre no esté vacío
  - Obtener todos los items del formulario
  - Filtrar items con nombre vacío
  - Si modo crear, llamar a `shoppingListManager.createList()`
  - Si modo editar, llamar a `shoppingListManager.updateList()`
  - Cerrar modal
  - Re-renderizar listas
  - Mostrar notificación de éxito
  - _Requirements: 2.2, 2.3, 2.4, 3.4, 3.5, 3.6, 6.3, 6.4, 6.5, 6.6_

- [x] 10.5 Validar formulario

  - En `saveShoppingList()`, validar nombre no vacío
  - Mostrar mensaje de error si nombre vacío
  - Validar que haya al menos un elemento con nombre
  - Mostrar mensaje si no hay elementos válidos
  - _Requirements: 2.3, 3.6_

- [x] 11. Implementar eliminar lista

  - Permitir eliminar listas con confirmación
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 11.1 Crear método deleteShoppingList

  - Crear método `deleteShoppingList(listId)` en `RecipeApp`
  - Obtener nombre de la lista
  - Mostrar modal de confirmación con el nombre
  - Si usuario confirma, llamar a `shoppingListManager.deleteList(listId)`
  - Re-renderizar listas
  - Mostrar notificación de éxito
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 11.2 Añadir event listener al botón eliminar

  - En `renderShoppingListCard()`, añadir click listener al botón eliminar
  - Llamar a `deleteShoppingList(list.id)` al hacer clic
  - Prevenir propagación del evento
  - _Requirements: 7.1, 7.2_

- [x] 12. Implementar editar lista

  - Permitir editar nombre y elementos de listas
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [x] 12.1 Añadir event listener al botón editar

  - En `renderShoppingListCard()`, añadir click listener al botón editar
  - Llamar a `showShoppingListForm(list.id)` al hacer clic
  - Prevenir propagación del evento
  - _Requirements: 6.1, 6.2_

- [x] 12.2 Cargar datos en formulario de edición

  - En `showShoppingListForm()`, si listId no es null:
  - Obtener lista con `shoppingListManager.getList(listId)`
  - Rellenar input de nombre con `list.name`
  - Limpiar contenedor de items
  - Renderizar cada item con `addShoppingItemInput(item)`
  - Cambiar título del modal a "Editar Lista"
  - _Requirements: 6.2, 6.3, 6.4_

- [x] 13. Implementar contador de elementos

  - Mostrar contador de completados/total
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 13.1 Actualizar contador en renderShoppingListCard

  - En `renderShoppingListCard()`, obtener contadores
  - Llamar a `shoppingListManager.getCompletedCount(list.id)`
  - Llamar a `shoppingListManager.getTotalCount(list.id)`
  - Crear elemento span con texto "X/Y completados"
  - Si todos completados, añadir clase `completed` al contador
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 13.2 Actualizar contador al marcar items

  - En `toggleItemCompleted()`, después de toggle:
  - Obtener elemento del contador
  - Actualizar texto con nuevos valores
  - Actualizar clase `completed` si corresponde
  - _Requirements: 10.5_

- [x] 14. Implementar copiar lista al portapapeles


  - Permitir copiar elementos de la lista
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9_

- [x] 14.1 Añadir botón copiar en renderShoppingListCard

  - En `renderShoppingListCard()`, añadir botón con emoji 📋
  - Posicionar antes del botón editar
  - Añadir clase `copy-list-btn`
  - Añadir title y aria-label
  - _Requirements: 11.1_

- [x] 14.2 Crear método formatListForClipboard en ShoppingListManager

  - Crear método `formatListForClipboard(listId, includeCompleted = false)`
  - Obtener lista por ID
  - Crear texto con nombre de lista como primera línea
  - Añadir línea en blanco
  - Filtrar items según includeCompleted
  - Formatear cada item como "- nombre (cantidad)" o "- nombre" si no hay cantidad
  - Retornar texto formateado
  - _Requirements: 11.3, 11.4, 11.8_

- [x] 14.3 Crear método copyShoppingListToClipboard

  - Crear método `copyShoppingListToClipboard(listId, includeCompleted = false)` en `RecipeApp`
  - Obtener texto formateado con `shoppingListManager.formatListForClipboard()`
  - Usar `navigator.clipboard.writeText()` para copiar
  - Si falla, usar `fallbackCopyToClipboard()`
  - Mostrar toast de éxito con mensaje "Lista copiada al portapapeles"
  - Mostrar toast de error si falla
  - _Requirements: 11.2, 11.3, 11.5, 11.6, 11.7_

- [x] 14.4 Reutilizar método fallbackCopyToClipboard

  - Verificar que existe método `fallbackCopyToClipboard()` de la funcionalidad de ingredientes
  - Si no existe, crear método que use textarea temporal y execCommand
  - _Requirements: 11.7_

- [x] 14.5 Añadir event listener al botón copiar

  - En `renderShoppingListCard()`, añadir click listener al botón copiar
  - Llamar a `copyShoppingListToClipboard(list.id, false)` por defecto
  - Prevenir propagación del evento
  - _Requirements: 11.1, 11.2, 11.8_

- [x] 14.6 Añadir opción para copiar todos los elementos

  - Modificar botón copiar para mostrar menú contextual (opcional)
  - O añadir botón secundario "Copiar todos"
  - Llamar a `copyShoppingListToClipboard(list.id, true)` para incluir completados
  - _Requirements: 11.9_

- [x] 15. Añadir accesibilidad y navegación por teclado


  - Asegurar que todo sea accesible
  - _Requirements: 9.2, 9.3, 9.5_

- [x] 15.1 Añadir atributos ARIA

  - En `renderShoppingListCard()`, añadir aria-expanded al header
  - En checkboxes, añadir aria-label descriptivo
  - En botones, añadir aria-label
  - En modal, añadir role="dialog" y aria-labelledby
  - _Requirements: 9.3, 9.5_

- [x] 15.2 Implementar navegación por teclado

  - En header de lista, añadir keydown listener para Enter/Space
  - En checkboxes, asegurar que Space funciona
  - En modal, implementar Escape para cerrar
  - Gestionar focus al abrir/cerrar modal
  - _Requirements: 9.2_

- [x] 15.3 Asegurar touch targets en móvil

  - Verificar que todos los botones tengan min 44x44px
  - Añadir padding adicional en móvil si necesario
  - _Requirements: 9.4_

- [x] 16. Testing y verificación final

  - Probar toda la funcionalidad
  - _Requirements: All_

- [x] 16.1 Probar flujo completo de crear lista

  - Abrir menú → Clic en "Listas de Compra"
  - Clic en "Nueva Lista"
  - Ingresar nombre
  - Añadir 3-5 elementos con cantidades
  - Guardar lista
  - Verificar que aparece en la vista
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4_

- [x] 16.2 Probar expandir/colapsar

  - Hacer clic en header de lista
  - Verificar que se expande mostrando elementos
  - Hacer clic nuevamente
  - Verificar que se colapsa ocultando elementos
  - Probar con teclado (Tab + Enter)
  - _Requirements: 4.3, 4.4, 4.7, 9.2_

- [x] 16.3 Probar marcar elementos como completados

  - Expandir una lista
  - Hacer clic en checkbox de un elemento
  - Verificar que se tacha el texto
  - Verificar que el contador se actualiza
  - Desmarcar elemento
  - Verificar que vuelve a estado normal
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 10.5_

- [x] 16.4 Probar editar lista

  - Hacer clic en botón editar de una lista
  - Verificar que se abre modal con datos cargados
  - Cambiar nombre de la lista
  - Añadir un elemento nuevo
  - Eliminar un elemento existente
  - Guardar cambios
  - Verificar que los cambios se reflejan
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 16.5 Probar eliminar lista

  - Hacer clic en botón eliminar de una lista
  - Verificar que aparece confirmación
  - Cancelar eliminación
  - Verificar que la lista sigue ahí
  - Hacer clic en eliminar nuevamente
  - Confirmar eliminación
  - Verificar que la lista desaparece
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 16.6 Probar copiar lista al portapapeles

  - Hacer clic en botón copiar (📋) de una lista
  - Verificar que aparece notificación de éxito
  - Abrir un editor de texto
  - Pegar (Ctrl+V)
  - Verificar formato correcto con nombre y elementos
  - Verificar que solo se copian elementos no completados
  - Probar copiar todos los elementos si está disponible
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.8, 11.9_

- [x] 16.7 Probar persistencia

  - Crear una lista con elementos
  - Marcar algunos como completados
  - Recargar la página (F5)
  - Verificar que la lista sigue ahí
  - Verificar que los elementos completados siguen marcados
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [x] 16.8 Probar responsive

  - Abrir en móvil (o DevTools responsive mode)
  - Verificar que todo se ve bien
  - Probar crear lista en móvil
  - Verificar touch targets
  - Probar en tablet
  - Probar en desktop
  - _Requirements: 9.1, 9.4_

- [x] 16.9 Verificar accesibilidad

  - Navegar con Tab por toda la interfaz
  - Verificar que el focus es visible
  - Usar Enter/Space para activar elementos
  - Probar con lector de pantalla (opcional)
  - Verificar contraste de colores
  - _Requirements: 9.2, 9.3, 9.5_

- [x] 16.10 Verificar sin errores en consola

  - Abrir DevTools console
  - Realizar todas las acciones
  - Verificar que no hay errores JavaScript
  - Verificar que no hay warnings importantes
  - _Requirements: All_
