continua# Implementation Plan - Eliminación de script.js

## Fase 4: Crear Componentes UI

- [x] 1. Crear managers básicos de UI



  - Implementar NotificationManager para toasts y mensajes
  - Implementar ThemeManager para gestión de temas
  - Integrar managers en estructura de la aplicación
  - _Requirements: 3.2, 3.3_


- [x] 1.1 Implementar NotificationManager.js

  - Crear clase NotificationManager con métodos success, error, warning, info
  - Implementar sistema de cola para múltiples notificaciones
  - Crear estilos CSS para diferentes tipos de notificaciones
  - Integrar con EventBus para escuchar eventos de error
  - _Requirements: 3.2_

- [x] 1.2 Implementar ThemeManager.js


  - Crear clase ThemeManager con métodos init, toggle, setTheme
  - Implementar persistencia de tema en localStorage
  - Migrar lógica de tema desde RecipeApp
  - Aplicar tema al cargar la aplicación
  - _Requirements: 3.3_

- [ ]* 1.3 Escribir tests para managers básicos
  - Tests unitarios para NotificationManager
  - Tests unitarios para ThemeManager
  - Tests de integración con EventBus
  - _Requirements: 3.2, 3.3_

- [x] 2. Implementar ModalManager


  - Crear clase ModalManager con gestión de stack de modales
  - Migrar lógica de modales desde RecipeApp
  - Implementar métodos open, close, closeAll
  - Configurar manejo de tecla ESC
  - _Requirements: 3.1_

- [x] 2.1 Configurar modales existentes

  - Configurar category-modal, edit-category-modal
  - Configurar emoji-picker-modal, color-picker-modal
  - Configurar category-selector-modal
  - Configurar image-modal, photo-gallery-modal
  - Configurar settings-modal, help-modal, confirm-delete-modal
  - _Requirements: 3.1_

- [ ]* 2.2 Escribir tests para ModalManager
  - Tests de apertura y cierre de modales
  - Tests de stack de modales anidados
  - Tests de manejo de ESC key
  - _Requirements: 3.1_

- [x] 3. Crear servicios faltantes



  - Implementar ShoppingListService migrando ShoppingListManager
  - Implementar MenuService extrayendo lógica de RecipeApp
  - Actualizar CategoryService migrando CategoryManager
  - Integrar servicios con EventBus
  - _Requirements: 4.2, 4.3, 4.1_

- [x] 3.1 Implementar ShoppingListService.js



  - Migrar clase ShoppingListManager a ShoppingListService
  - Implementar CRUD de listas (getAll, getById, create, update, delete)
  - Implementar CRUD de items (addItem, updateItem, deleteItem, toggleCompleted)
  - Implementar utilidades (getCompletedCount, formatForClipboard)
  - Integrar con EventBus para emitir eventos
  - _Requirements: 4.2_

- [x] 3.2 Implementar MenuService.js


  - Extraer lógica de menús desde RecipeApp
  - Implementar CRUD de menús
  - Implementar gestión de días/comidas (setRecipe, clearRecipe)
  - Implementar getShoppingListForMenu
  - Implementar exportToPDF
  - _Requirements: 4.3_

- [x] 3.3 Actualizar CategoryService.js


  - Migrar funcionalidad de CategoryManager a CategoryService
  - Eliminar duplicación entre CategoryManager y CategoryService
  - Asegurar que CategoryService tenga toda la funcionalidad
  - Actualizar referencias en código existente
  - _Requirements: 4.1_

- [ ]* 3.4 Escribir tests para servicios nuevos
  - Tests unitarios para ShoppingListService
  - Tests unitarios para MenuService
  - Tests de integración con storage
  - _Requirements: 4.2, 4.3_

- [x] 4. Implementar componentes de recetas


  - Crear RecipeList para renderizado de lista/grid
  - Crear RecipeDetail para vista de detalle
  - Crear FilterManager para gestión de filtros
  - Integrar componentes con servicios y EventBus
  - _Requirements: 3.4, 3.5_

- [x] 4.1 Implementar RecipeList.js



  - Crear clase RecipeList con métodos render, setViewMode, setSorting
  - Implementar renderizado en modo grid
  - Implementar renderizado en modo list
  - Migrar lógica de renderizado desde RecipeApp
  - Implementar event handlers (click, edit, delete)
  - _Requirements: 3.4_

- [x] 4.2 Implementar RecipeDetail.js


  - Crear clase RecipeDetail con método render
  - Implementar renderizado de header, ingredientes, secuencias
  - Implementar renderizado de imágenes y metadata
  - Migrar lógica de vista detalle desde RecipeApp
  - Implementar event handlers (edit, delete, duplicate, export)
  - _Requirements: 3.5_

- [x] 4.3 Implementar FilterManager.js



  - Crear clase FilterManager con gestión de filtros
  - Implementar renderizado de filter chips
  - Implementar métodos applyFilters, clearAllFilters
  - Migrar lógica de filtros desde RecipeApp
  - Implementar filtros de categoría, tiempo, menú, búsqueda
  - _Requirements: 3.7_

- [ ]* 4.4 Escribir tests para componentes de recetas
  - Tests de renderizado de RecipeList
  - Tests de renderizado de RecipeDetail
  - Tests de aplicación de filtros
  - _Requirements: 3.4, 3.5_

- [x] 5. Implementar RecipeForm y vistas adicionales


  - Crear RecipeForm para formulario de crear/editar
  - Crear ShoppingListView para vista de listas
  - Crear MenuView para vista de menús
  - Integrar con servicios y EventBus
  - _Requirements: 3.6_

- [x] 5.1 Implementar RecipeForm.js


  - Crear clase RecipeForm con métodos render, save, cancel
  - Implementar gestión de ingredientes (add, edit, delete, reorder)
  - Implementar gestión de secuencias (add, edit, delete, reorder)
  - Implementar gestión de imágenes (add, delete)
  - Migrar lógica de formulario desde RecipeApp
  - Implementar validación de formulario
  - _Requirements: 3.6_

- [x] 5.2 Implementar ShoppingListView.js


  - Crear clase ShoppingListView con renderizado de listas
  - Implementar CRUD de listas en UI
  - Implementar CRUD de items en UI
  - Migrar lógica de vista desde RecipeApp
  - Integrar con ShoppingListService
  - _Requirements: 3.6_

- [x] 5.3 Implementar MenuView.js


  - Crear clase MenuView con renderizado de menús
  - Implementar CRUD de menús en UI
  - Implementar gestión de días/comidas en UI
  - Migrar lógica de vista desde RecipeApp
  - Integrar con MenuService
  - _Requirements: 3.6_

- [ ]* 5.4 Escribir tests para vistas adicionales
  - Tests de RecipeForm (validación, guardado)
  - Tests de ShoppingListView
  - Tests de MenuView
  - _Requirements: 3.6_

## Fase 5: Migración Final y Eliminación de script.js


- [x] 6. Crear App.js y main.js


  - Crear js/core/App.js como orquestador principal
  - Crear main.js como punto de entrada mínimo
  - Migrar lógica de inicialización desde RecipeApp
  - Integrar todos los servicios y componentes
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 6.1 Implementar js/core/App.js


  - Crear clase App con constructor y método init
  - Implementar initServices para inicializar todos los servicios
  - Implementar initUIComponents para inicializar componentes
  - Implementar setupEventListeners para eventos globales
  - Implementar métodos de navegación (showRecipeList, showRecipeDetail, etc.)
  - Implementar lazy loading de componentes no críticos
  - _Requirements: 5.1, 5.2_

- [x] 6.2 Crear main.js


  - Crear archivo main.js en raíz con menos de 50 líneas
  - Importar App.js
  - Implementar función initApp con manejo de errores
  - Implementar función showFatalError para errores críticos
  - Configurar inicialización cuando DOM esté listo
  - _Requirements: 5.3, 5.4_

- [ ]* 6.3 Escribir tests para App.js
  - Tests de inicialización de servicios
  - Tests de inicialización de componentes
  - Tests de navegación entre vistas
  - Tests de lazy loading
  - _Requirements: 5.1, 5.2_

- [x] 7. Actualizar referencias HTML y eliminar código temporal


  - Actualizar index.html para usar main.js con type="module"
  - Eliminar código de compatibilidad temporal (window.* assignments)
  - Verificar que no haya referencias globales rotas
  - Actualizar imports en todos los archivos
  - _Requirements: 6.1, 6.2, 6.5_

- [x] 7.1 Actualizar index.html


  - Cambiar script src de script.js a main.js
  - Añadir type="module" al script tag
  - Eliminar scripts de compatibilidad temporal
  - Verificar orden de carga de scripts
  - _Requirements: 6.1, 6.2_

- [x] 7.2 Eliminar código temporal

  - Eliminar window.* assignments de módulos
  - Eliminar código de compatibilidad con script.js
  - Limpiar imports no utilizados
  - Actualizar referencias en comentarios
  - _Requirements: 6.5_

- [ ] 8. Testing exhaustivo de funcionalidad
  - Verificar todas las funcionalidades de gestión de recetas
  - Verificar filtrado y búsqueda
  - Verificar categorías personalizadas
  - Verificar listas de compra y menús
  - Verificar import/export XML
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 8.1 Testear funcionalidades de recetas
  - Crear nueva receta
  - Editar receta existente
  - Eliminar receta
  - Ver detalle de receta
  - Duplicar receta
  - Verificar que no hay errores en consola
  - _Requirements: 7.1_

- [ ] 8.2 Testear filtros y búsqueda
  - Filtrar por categoría
  - Filtrar por tiempo
  - Filtrar por menú
  - Búsqueda de texto
  - Limpiar filtros
  - Verificar contadores de filtros
  - _Requirements: 7.2_

- [ ] 8.3 Testear categorías personalizadas
  - Crear categoría personalizada
  - Editar categoría
  - Eliminar categoría
  - Ocultar/mostrar categoría
  - Verificar persistencia
  - _Requirements: 7.3_

- [ ] 8.4 Testear listas de compra
  - Crear lista de compra
  - Añadir items a lista
  - Marcar items como completados
  - Eliminar items
  - Exportar lista
  - Verificar persistencia
  - _Requirements: 7.4_

- [ ] 8.5 Testear menús
  - Crear menú semanal
  - Asignar recetas a días/comidas
  - Generar lista de compra desde menú
  - Exportar menú a PDF
  - Verificar persistencia
  - _Requirements: 7.4_

- [ ] 8.6 Testear import/export XML
  - Importar archivo XML
  - Exportar recetas a XML
  - Verificar formato XML
  - Verificar manejo de errores
  - _Requirements: 7.5_


- [ ] 9. Crear backup y eliminar script.js
  - Crear branch de Git antes de eliminación
  - Renombrar script.js a script.js.backup
  - Verificar que aplicación funciona sin script.js
  - Documentar cambios realizados
  - _Requirements: 10.1, 10.2, 10.3_



- [x] 9.1 Crear backup de seguridad


  - Crear branch backup-before-script-migration
  - Commit de estado actual
  - Copiar script.js a script.js.backup
  - Documentar proceso de rollback
  - _Requirements: 10.1, 10.3_

- [ ] 9.2 Eliminar script.js
  - Verificar que todos los tests pasan
  - Verificar que no hay errores en consola
  - Eliminar referencia a script.js en index.html
  - Renombrar script.js a script.js.backup
  - Commit de cambios
  - _Requirements: 10.4, 10.5_

- [ ] 9.3 Verificación final
  - Probar aplicación en diferentes navegadores
  - Verificar que todas las funcionalidades funcionan
  - Verificar que no hay errores en consola
  - Verificar que no hay warnings

  - Medir mejoras de rendimiento
  - _Requirements: 8.3, 8.4_

- [ ] 10. Documentar nueva arquitectura
  - Crear documento de arquitectura
  - Documentar flujo de inicialización
  - Documentar cómo añadir nuevas funcionalidades

  - Crear ejemplos de uso
  - Documentar ventajas vs script.js
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 10.1 Crear ARQUITECTURA.md


  - Documentar estructura de carpetas
  - Documentar responsabilidades de cada módulo
  - Documentar flujo de datos
  - Documentar uso de EventBus
  - Incluir diagramas si es necesario
  - _Requirements: 9.1_

- [ ] 10.2 Crear GUIA-DESARROLLO.md
  - Documentar cómo añadir nuevos servicios
  - Documentar cómo añadir nuevos componentes
  - Documentar cómo usar EventBus
  - Documentar patrones de código
  - Incluir ejemplos prácticos
  - _Requirements: 9.3_

- [ ] 10.3 Actualizar README.md
  - Actualizar sección de arquitectura
  - Documentar cambios realizados
  - Documentar mejoras de rendimiento
  - Actualizar instrucciones de desarrollo
  - _Requirements: 9.5_

- [ ]* 10.4 Crear tests de documentación
  - Verificar que ejemplos de código funcionan
  - Verificar que links en documentación son válidos
  - _Requirements: 9.4_

## Notas Importantes

### Sobre Tests Opcionales (marcados con *)

Los tests marcados con `*` son opcionales y se pueden omitir para acelerar el desarrollo. Sin embargo, se recomienda implementarlos para asegurar la calidad del código.

### Orden de Implementación

Es importante seguir el orden de las tareas ya que hay dependencias entre ellas:
1. Managers básicos → ModalManager → Servicios → Componentes → App.js → Eliminación

### Verificación Continua

Después de cada tarea mayor (1, 2, 3, 4, 5), verificar que:
- No hay errores en consola
- La funcionalidad existente sigue funcionando
- Los nuevos módulos se integran correctamente

### Rollback

Si en cualquier momento algo falla:
1. Revertir index.html a usar script.js
2. Restaurar desde script.js.backup
3. Analizar el problema
4. Corregir y reintentar

### Métricas de Éxito

Al finalizar, deberíamos tener:
- ✅ script.js eliminado completamente
- ✅ main.js con menos de 50 líneas
- ✅ 15+ módulos especializados
- ✅ Reducción de 60% en carga inicial
- ✅ 100% de funcionalidad mantenida
- ✅ 0 errores en consola
- ✅ Documentación completa
