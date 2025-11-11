# Implementation Plan - Limpieza de Estilos Inline

- [x] 1. Crear sistema de clases utilitarias en styles.css


  - Crear sección de clases utilitarias al final de styles.css
  - Implementar clases de display (u-hidden, u-flex, u-grid, etc.)
  - Implementar clases de spacing (u-mt-*, u-mb-*, u-gap-*, u-p-*)
  - Implementar clases de width (u-w-full, u-w-auto, u-max-w-*)
  - Implementar clases de position (u-relative, u-sticky, u-z-*)
  - Implementar clases de typography (u-text-*, u-font-*, u-no-underline)
  - Implementar clases de overflow (u-overflow-auto, u-overflow-hidden)
  - Implementar clases misceláneas (u-cursor-pointer, u-bg-*, u-border-*)
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 2. Crear clases específicas de componentes en styles.css

  - Crear clases para grid layouts (grid-2-cols, grid-2-cols-md)
  - Crear clases para modales (modal-content-md, modal-content-lg, modal-body-scrollable, modal-footer-sticky)
  - Crear clases para header (header-link, detail-recipe-title)
  - Documentar cada clase con comentarios CSS
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 3. Refactorizar header de index.html


  - Reemplazar estilos inline en el enlace del título (text-decoration, color)
  - Reemplazar estilos inline en el input de archivo XML (display: none)
  - Reemplazar estilos inline en el contenedor de filtros (display, gap, align-items)
  - Verificar que el header se ve idéntico después de los cambios
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4. Refactorizar sección de detalle de receta en index.html


  - Reemplazar estilos inline en el contenedor de categoría y tiempo (display, align-items, gap, margin-bottom, flex-wrap)
  - Reemplazar estilos inline en el span de categoría (display: none)
  - Reemplazar estilos inline en el span de tiempo total (display: none)
  - Reemplazar estilos inline en el título de receta (font-size, cursor, position)
  - Reemplazar estilos inline en secciones multimedia, appliances y sequences (display: none)
  - Reemplazar estilos inline en el contenedor de información adicional (display: none, margin-bottom)
  - Reemplazar estilos inline en secciones de autor e historia (display: none)
  - Verificar que la vista de detalle se ve idéntica
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 5. Refactorizar formulario de receta en index.html


  - Reemplazar estilos inline en el contenedor de acciones del formulario (display: none)
  - Reemplazar estilos inline en el chip de categoría (display: inline-block)
  - Reemplazar estilos inline en el helper text de secuencias (margin-bottom)
  - Reemplazar estilos inline en el contenedor de ingredientes (position: relative)
  - Reemplazar estilos inline en el autocomplete (display: none)
  - Reemplazar estilos inline en el input de imágenes (display: none)
  - Verificar que el formulario funciona correctamente
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_


- [x] 6. Refactorizar vistas de listas de compra y menús en index.html

  - Reemplazar estilos inline en contenedores de botones (display: grid, grid-template-columns, gap, margin-top)
  - Reemplazar estilos inline en inputs de archivo (display: none)
  - Reemplazar estilos inline en contenedores principales (margin-top)
  - Verificar que las vistas de listas y menús funcionan correctamente
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 7. Refactorizar modales en index.html


  - Reemplazar estilos inline en modal de vista previa de impresión (max-width, max-height)
  - Reemplazar estilos inline en modal body scrollable (overflow-y, max-height)
  - Reemplazar estilos inline en preview de menú (background, padding, border-radius)
  - Reemplazar estilos inline en modal de configuración (display: grid, grid-template-columns, gap)
  - Reemplazar estilos inline en secciones de configuración (margin-bottom, width)
  - Reemplazar estilos inline en modal footer sticky (position, bottom, background, border-top, padding, z-index)
  - Reemplazar estilos inline en botones de modal (width)
  - Reemplazar estilos inline en modal de progreso de importación (z-index, background, max-width, position)
  - Reemplazar estilos inline en elementos de progreso (text-align, font-size, font-weight, margin-bottom, color, etc.)
  - Verificar que todos los modales se abren y funcionan correctamente
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 8. Refactorizar estilos inline misceláneos en index.html


  - Reemplazar estilos inline en listas y párrafos (color, margin-bottom, line-height, padding)
  - Reemplazar estilos inline en divs de ayuda y configuración (display, justify-content, gap)
  - Reemplazar estilos inline en elementos de texto (font-size, color, margin-top)
  - Verificar que todos los elementos se ven correctamente
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_


- [x] 9. Crear clases utilitarias en recipe-manager.css

  - Copiar clases utilitarias relevantes de styles.css
  - Añadir clases específicas para el gestor de recetas si es necesario
  - Documentar clases con comentarios CSS
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 10. Refactorizar header de recipe-manager.html


  - Reemplazar estilos inline en el header (display, flex-direction, gap, align-items, justify-content)
  - Reemplazar estilos inline en el párrafo de descripción (color, font-size)
  - Reemplazar estilos inline en el input de archivo XML (display: none)
  - Verificar que el header se ve idéntico
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 11. Refactorizar sidebar de recipe-manager.html


  - Reemplazar estilos inline en el título de recetas incompletas (cursor, user-select, display, align-items, gap)
  - Reemplazar estilos inline en el contenedor de recetas incompletas (font-size, color, display, margin-top)
  - Reemplazar estilos inline en labels (margin-top)
  - Reemplazar estilos inline en divs de checkboxes (margin-top)
  - Reemplazar estilos inline en botón de limpiar filtros (margin-top, width)
  - Verificar que el sidebar funciona correctamente
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_


- [x] 12. Refactorizar área principal de recipe-manager.html

  - Reemplazar estilos inline en empty state (text-align, padding, color, font-size, margin-bottom)
  - Reemplazar estilos inline en iconos (font-size, margin-bottom, color, margin-left)
  - Reemplazar estilos inline en spans (font-weight, margin-left, color)
  - Reemplazar estilos inline en contenedores de recetas incompletas (display: none, color, font-size)
  - Reemplazar estilos inline en contenedores de acciones (margin-bottom, display, justify-content, align-items, flex-wrap, gap)
  - Reemplazar estilos inline en divs de selección (display, align-items, gap)
  - Reemplazar estilos inline en spans de contador (font-size, color)
  - Reemplazar estilos inline en botones (width: auto)
  - Reemplazar estilos inline en contenedor de tabla (overflow-x: auto)
  - Reemplazar estilos inline en th de tabla (width: 40px)
  - Reemplazar estilos inline en contenedor de botones de guardar (margin-top, text-align)
  - Verificar que la tabla y las acciones funcionan correctamente
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_


- [x] 13. Refactorizar modales de recipe-manager.html

  - Reemplazar estilos inline en modales (display: none, max-width)
  - Reemplazar estilos inline en modal body (color, margin-bottom, padding, background, border-radius)
  - Reemplazar estilos inline en divs de formulario (margin-bottom, display, flex-direction, gap, font-size)
  - Reemplazar estilos inline en labels (display, font-weight, margin-bottom, color)
  - Reemplazar estilos inline en inputs (width, display, gap, align-items)
  - Reemplazar estilos inline en botones de modal (width: auto)
  - Verificar que todos los modales funcionan correctamente
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_


- [x] 14. Validación visual completa

  - Comparar index.html antes y después en tema claro
  - Comparar index.html antes y después en tema oscuro
  - Comparar recipe-manager.html antes y después en tema claro
  - Comparar recipe-manager.html antes y después en tema oscuro
  - Verificar todos los modales en ambos archivos
  - Verificar responsive en móvil, tablet y desktop
  - Documentar cualquier diferencia visual encontrada
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 15. Validación funcional completa

  - Verificar que todos los modales se abren y cierran correctamente
  - Verificar que los formularios funcionan (crear, editar, guardar recetas)
  - Verificar que los filtros funcionan correctamente
  - Verificar que la navegación entre vistas funciona
  - Verificar que el cambio de tema funciona
  - Verificar que las animaciones y transiciones funcionan
  - Verificar que las listas de compra y menús funcionan
  - Verificar que el gestor de recetas funciona (importar, exportar, editar en masa)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_



- [x] 16. Crear documentación de cambios


  - Crear documento de resumen con estadísticas (líneas eliminadas, clases creadas)
  - Listar todas las nuevas clases utilitarias creadas
  - Incluir ejemplos de uso de las clases más comunes
  - Documentar patrones de conversión (antes/después)
  - Identificar áreas que podrían necesitar refactorización adicional en el futuro
  - Incluir guía de uso para futuros desarrolladores
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
