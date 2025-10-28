# Implementation Plan

- [x] 1. Crear CategoryManager class


  - Crear nueva clase CategoryManager en script.js con métodos para gestionar categorías
  - Implementar loadCustomCategories() y saveCustomCategories() para persistencia en localStorage
  - Implementar getAllCategories(), getCategoryById(), getCategoryCounts()
  - Definir constantes PREDEFINED_CATEGORIES y CATEGORY_COLORS
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.1, 4.2, 4.3, 4.4_

- [x] 2. Implementar métodos de gestión de categorías


  - [x] 2.1 Implementar createCategory() con validación


    - Validar nombre (2-30 caracteres)
    - Generar ID único desde nombre (slug)
    - Verificar que no exista categoría duplicada
    - Guardar en localStorage
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 2.2 Implementar updateCategory() para editar categorías personalizadas

    - Validar que sea categoría personalizada (no predefinida)
    - Permitir cambiar nombre, emoji y color
    - Actualizar localStorage
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 2.3 Implementar deleteCategory() con manejo de recetas afectadas

    - Validar que sea categoría personalizada
    - Identificar recetas que usan la categoría
    - Retornar información de recetas afectadas
    - Eliminar de localStorage
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 2.4 Implementar generateCategoryId() para crear slugs

    - Convertir nombre a minúsculas
    - Eliminar acentos y caracteres especiales
    - Reemplazar espacios con guiones
    - _Requirements: 1.1, 1.2_

- [x] 3. Integrar CategoryManager en RecipeApp


  - Instanciar CategoryManager en constructor de RecipeApp
  - Cargar categorías personalizadas al inicializar la aplicación
  - _Requirements: 4.2, 4.4_

- [x] 4. Actualizar validación de categorías en Recipe model


  - Eliminar validación estricta de validCategories en models.js
  - Permitir cualquier string como categoría (validación dinámica)
  - Mantener compatibilidad con recetas existentes
  - _Requirements: 4.5_

- [x] 5. Crear UI del modal de gestión de categorías

  - [x] 5.1 Crear HTML del modal en index.html


    - Estructura del modal con header y body
    - Formulario para crear nueva categoría (nombre, emoji, color)
    - Sección para listar categorías predefinidas
    - Sección para listar categorías personalizadas
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [x] 5.2 Crear estilos CSS para el modal


    - Estilos para el modal y overlay
    - Estilos para el formulario de creación
    - Estilos para la paleta de colores
    - Estilos para los items de categoría
    - _Requirements: 5.1, 5.2, 7.1, 7.2, 7.3, 7.4_
  
  - [x] 5.3 Agregar botón de acceso a gestión de categorías



    - Agregar botón en el header junto a otros botones de acción
    - Conectar con función showCategoryModal()
    - _Requirements: 5.1_

- [x] 6. Implementar funciones de renderizado dinámico

  - [x] 6.1 Implementar renderFilterChips() para generar chips dinámicamente


    - Limpiar contenedor de chips
    - Generar chip "Todas"
    - Generar chips para cada categoría (predefinidas + personalizadas)
    - Generar chip "Sin categoría"
    - Aplicar colores personalizados
    - Re-adjuntar event listeners
    - _Requirements: 3.1, 3.2, 7.2_
  
  - [x] 6.2 Implementar renderCategorySelector() para selector de formulario


    - Limpiar selector
    - Agregar opción "Sin categoría"
    - Agregar opciones para cada categoría con emoji
    - _Requirements: 3.1_
  
  - [x] 6.3 Implementar renderCategoryModal() para contenido del modal


    - Renderizar paleta de colores
    - Renderizar lista de categorías predefinidas
    - Renderizar lista de categorías personalizadas con botones de acción
    - Mostrar contador de recetas por categoría
    - _Requirements: 5.2, 5.3, 5.5_

- [x] 7. Implementar handlers del modal de categorías


  - [x] 7.1 Implementar showCategoryModal() y closeCategoryModal()


    - Mostrar/ocultar modal
    - Renderizar contenido al abrir
    - _Requirements: 5.1, 5.4_
  
  - [x] 7.2 Implementar handleCreateCategory()

    - Obtener datos del formulario
    - Validar entrada
    - Llamar a categoryManager.createCategory()
    - Actualizar UI (filtros, selector, modal)
    - Mostrar mensaje de éxito
    - Limpiar formulario
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 7.3 Implementar handleEditCategory()

    - Cargar datos de categoría en formulario de edición
    - Guardar cambios con categoryManager.updateCategory()
    - Actualizar UI
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 7.4 Implementar handleDeleteCategory()

    - Mostrar advertencia si hay recetas afectadas
    - Solicitar confirmación del usuario
    - Llamar a categoryManager.deleteCategory()
    - Actualizar categoría de recetas afectadas a null
    - Guardar recetas actualizadas
    - Recargar recetas
    - Actualizar UI
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 8. Actualizar visualización de categorías en recetas

  - [x] 8.1 Actualizar renderizado de tarjetas de recetas


    - Obtener información de categoría desde CategoryManager
    - Aplicar color personalizado al badge de categoría
    - Mostrar emoji y nombre correctos
    - _Requirements: 3.4, 7.3_
  
  - [x] 8.2 Actualizar vista de detalle de receta

    - Obtener información de categoría desde CategoryManager
    - Mostrar emoji, nombre y color correctos
    - _Requirements: 3.4, 7.3_

- [x] 9. Actualizar exportación e importación

  - [x] 9.1 Verificar que XMLExporter maneja categorías personalizadas

    - Las categorías se exportan como strings (ya funciona)
    - _Requirements: 3.5_
  
  - [x] 9.2 Actualizar XMLImporter para crear categorías automáticamente


    - Al importar receta con categoría desconocida, crear categoría personalizada
    - Asignar emoji y color por defecto
    - _Requirements: 4.5_
  
  - [x] 9.3 Verificar que PDFExporter muestra categorías personalizadas

    - Obtener información de categoría desde CategoryManager
    - Mostrar emoji y nombre correctos
    - _Requirements: 3.5_

- [x] 10. Actualizar inicialización de la aplicación


  - Llamar a renderFilterChips() al inicializar
  - Llamar a renderCategorySelector() al mostrar formulario
  - Asegurar que CategoryManager se carga antes de renderizar
  - _Requirements: 4.2, 4.4_

- [x] 11. Pruebas de integración y validación final


  - [x] 11.1 Probar creación de categorías personalizadas

    - Crear categoría con nombre, emoji y color
    - Verificar que aparece en filtros y selector
    - Verificar persistencia en localStorage
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 4.1_
  
  - [x] 11.2 Probar edición de categorías personalizadas

    - Editar nombre, emoji y color
    - Verificar que se actualiza en toda la UI
    - Verificar que no se pueden editar categorías predefinidas
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 11.3 Probar eliminación de categorías

    - Eliminar categoría sin recetas
    - Eliminar categoría con recetas (verificar advertencia)
    - Verificar que recetas afectadas cambian a "Sin categoría"
    - Verificar que no se pueden eliminar categorías predefinidas
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 11.4 Probar filtrado con categorías personalizadas

    - Crear recetas con categorías personalizadas
    - Filtrar por categoría personalizada
    - Verificar que solo se muestran recetas correctas
    - _Requirements: 3.3_
  
  - [x] 11.5 Probar exportación e importación

    - Exportar receta con categoría personalizada a XML
    - Importar XML con categoría desconocida
    - Verificar que se crea categoría automáticamente
    - Exportar a PDF y verificar visualización
    - _Requirements: 3.5, 4.5_
  
  - [x] 11.6 Probar persistencia y recarga

    - Crear varias categorías personalizadas
    - Recargar la aplicación
    - Verificar que todas las categorías se cargan correctamente
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
