# Testing Checklist - Nueva Arquitectura

## Estado: Pendiente de Ejecución

Este documento contiene el checklist completo para verificar que la nueva arquitectura modular funciona correctamente.

## ⚠️ IMPORTANTE

Antes de ejecutar estos tests, asegúrate de que:
1. ✅ `index.html` está configurado para usar `main.js`
2. ✅ `script.js.backup` existe como respaldo
3. ✅ Todos los módulos están en su lugar

## 🧪 Tests de Funcionalidad

### 8.1 Funcionalidades de Recetas

#### Crear Nueva Receta
- [ ] Abrir formulario de nueva receta
- [ ] Llenar campos obligatorios (nombre, categoría)
- [ ] Añadir ingredientes
- [ ] Añadir secuencias de preparación
- [ ] Subir imágenes (opcional)
- [ ] Guardar receta
- [ ] Verificar que aparece en la lista
- [ ] Verificar que no hay errores en consola

#### Editar Receta Existente
- [ ] Seleccionar una receta de la lista
- [ ] Abrir formulario de edición
- [ ] Modificar campos
- [ ] Guardar cambios
- [ ] Verificar que los cambios se reflejan
- [ ] Verificar que no hay errores en consola

#### Ver Detalle de Receta
- [ ] Hacer clic en una receta
- [ ] Verificar que se muestra toda la información
- [ ] Verificar que se muestran ingredientes
- [ ] Verificar que se muestran secuencias
- [ ] Verificar que se muestran imágenes
- [ ] Verificar que no hay errores en consola

#### Eliminar Receta
- [ ] Seleccionar una receta
- [ ] Hacer clic en eliminar
- [ ] Confirmar eliminación
- [ ] Verificar que desaparece de la lista
- [ ] Verificar que no hay errores en consola

#### Duplicar Receta
- [ ] Seleccionar una receta
- [ ] Hacer clic en duplicar
- [ ] Verificar que se crea una copia
- [ ] Verificar que aparece en la lista
- [ ] Verificar que no hay errores en consola

**Resultado:** ⏳ Pendiente

---

### 8.2 Filtros y Búsqueda

#### Filtrar por Categoría
- [ ] Hacer clic en un chip de categoría
- [ ] Verificar que solo se muestran recetas de esa categoría
- [ ] Hacer clic en otra categoría
- [ ] Verificar que se añade al filtro
- [ ] Hacer clic en "Limpiar"
- [ ] Verificar que se muestran todas las recetas
- [ ] Verificar que no hay errores en consola

#### Filtrar por Tiempo
- [ ] Seleccionar filtro de tiempo (0-30min, 30-60min, 60+min)
- [ ] Verificar que solo se muestran recetas en ese rango
- [ ] Cambiar filtro de tiempo
- [ ] Verificar que se actualiza la lista
- [ ] Verificar que no hay errores en consola

#### Búsqueda de Texto
- [ ] Escribir en el campo de búsqueda
- [ ] Verificar que se filtran recetas por nombre
- [ ] Verificar que se filtran por ingredientes
- [ ] Limpiar búsqueda
- [ ] Verificar que se muestran todas las recetas
- [ ] Verificar que no hay errores en consola

#### Limpiar Filtros
- [ ] Aplicar varios filtros
- [ ] Hacer clic en "Limpiar filtros"
- [ ] Verificar que se eliminan todos los filtros
- [ ] Verificar que se muestran todas las recetas
- [ ] Verificar que no hay errores en consola

**Resultado:** ⏳ Pendiente

---

### 8.3 Categorías Personalizadas

#### Crear Categoría
- [ ] Abrir modal de categorías
- [ ] Hacer clic en "Nueva categoría"
- [ ] Ingresar nombre
- [ ] Seleccionar emoji
- [ ] Seleccionar color
- [ ] Guardar categoría
- [ ] Verificar que aparece en la lista
- [ ] Verificar que aparece en los filtros
- [ ] Verificar que no hay errores en consola

#### Editar Categoría
- [ ] Seleccionar una categoría personalizada
- [ ] Hacer clic en editar
- [ ] Modificar nombre/emoji/color
- [ ] Guardar cambios
- [ ] Verificar que se actualizan los cambios
- [ ] Verificar que no hay errores en consola

#### Eliminar Categoría
- [ ] Seleccionar una categoría personalizada
- [ ] Hacer clic en eliminar
- [ ] Confirmar eliminación
- [ ] Verificar que desaparece de la lista
- [ ] Verificar que las recetas de esa categoría quedan sin categoría
- [ ] Verificar que no hay errores en consola

#### Ocultar/Mostrar Categoría
- [ ] Seleccionar una categoría
- [ ] Hacer clic en ocultar
- [ ] Verificar que desaparece de los filtros
- [ ] Verificar que las recetas no se muestran
- [ ] Hacer clic en mostrar
- [ ] Verificar que vuelve a aparecer
- [ ] Verificar que no hay errores en consola

**Resultado:** ⏳ Pendiente

---

### 8.4 Listas de Compra

#### Crear Lista
- [ ] Ir a "Listas de Compra"
- [ ] Hacer clic en "Nueva lista"
- [ ] Ingresar nombre
- [ ] Guardar lista
- [ ] Verificar que aparece en la lista
- [ ] Verificar que no hay errores en consola

#### Añadir Items
- [ ] Abrir una lista
- [ ] Hacer clic en "Añadir item"
- [ ] Ingresar nombre del item
- [ ] Ingresar cantidad (opcional)
- [ ] Guardar item
- [ ] Verificar que aparece en la lista
- [ ] Verificar que no hay errores en consola

#### Marcar Items como Completados
- [ ] Hacer clic en checkbox de un item
- [ ] Verificar que se marca como completado
- [ ] Verificar que se actualiza el contador
- [ ] Desmarcar item
- [ ] Verificar que se actualiza
- [ ] Verificar que no hay errores en consola

#### Eliminar Items
- [ ] Seleccionar un item
- [ ] Hacer clic en eliminar
- [ ] Verificar que desaparece
- [ ] Verificar que se actualiza el contador
- [ ] Verificar que no hay errores en consola

#### Exportar Lista
- [ ] Abrir una lista
- [ ] Hacer clic en "Exportar" o "Copiar"
- [ ] Verificar que se copia al portapapeles
- [ ] Pegar en un editor de texto
- [ ] Verificar formato correcto
- [ ] Verificar que no hay errores en consola

**Resultado:** ⏳ Pendiente

---

### 8.5 Menús Semanales

#### Crear Menú
- [ ] Ir a "Menús"
- [ ] Hacer clic en "Nuevo menú"
- [ ] Ingresar nombre
- [ ] Guardar menú
- [ ] Verificar que aparece en la lista
- [ ] Verificar que no hay errores en consola

#### Asignar Recetas
- [ ] Abrir un menú
- [ ] Hacer clic en "Añadir" en una celda (día/comida)
- [ ] Seleccionar una receta
- [ ] Verificar que se asigna correctamente
- [ ] Repetir para varias celdas
- [ ] Verificar que se actualiza el progreso
- [ ] Verificar que no hay errores en consola

#### Generar Lista de Compra
- [ ] Abrir un menú con recetas asignadas
- [ ] Hacer clic en "Lista de compra"
- [ ] Verificar que se generan los ingredientes
- [ ] Verificar que se agrupan correctamente
- [ ] Verificar que no hay errores en consola

#### Exportar Menú a PDF
- [ ] Abrir un menú
- [ ] Hacer clic en "Exportar PDF"
- [ ] Verificar que se genera el PDF
- [ ] Verificar formato correcto
- [ ] Verificar que no hay errores en consola

**Resultado:** ⏳ Pendiente

---

### 8.6 Import/Export XML

#### Importar XML
- [ ] Hacer clic en "Importar XML"
- [ ] Seleccionar archivo XML válido
- [ ] Verificar que se importan las recetas
- [ ] Verificar que aparecen en la lista
- [ ] Verificar mensaje de éxito
- [ ] Verificar que no hay errores en consola

#### Exportar XML
- [ ] Seleccionar una o varias recetas
- [ ] Hacer clic en "Exportar XML"
- [ ] Verificar que se descarga el archivo
- [ ] Abrir archivo en editor de texto
- [ ] Verificar formato XML correcto
- [ ] Verificar que no hay errores en consola

#### Manejo de Errores
- [ ] Intentar importar archivo inválido
- [ ] Verificar que se muestra mensaje de error
- [ ] Verificar que no se rompe la aplicación
- [ ] Verificar que no hay errores en consola (excepto el esperado)

**Resultado:** ⏳ Pendiente

---

## 🔍 Verificaciones Adicionales

### Consola del Navegador
- [ ] Abrir DevTools (F12)
- [ ] Verificar que no hay errores en rojo
- [ ] Verificar que no hay warnings críticos
- [ ] Verificar que los módulos se cargan correctamente

### Persistencia de Datos
- [ ] Crear/modificar datos
- [ ] Recargar la página (F5)
- [ ] Verificar que los datos persisten
- [ ] Cerrar y abrir el navegador
- [ ] Verificar que los datos persisten

### Tema Claro/Oscuro
- [ ] Cambiar a tema oscuro
- [ ] Verificar que se aplica correctamente
- [ ] Recargar página
- [ ] Verificar que se mantiene el tema
- [ ] Cambiar a tema claro
- [ ] Verificar que funciona

### Responsive Design
- [ ] Probar en pantalla grande (desktop)
- [ ] Probar en pantalla mediana (tablet)
- [ ] Probar en pantalla pequeña (móvil)
- [ ] Verificar que todo se ve correctamente
- [ ] Verificar que no hay errores en consola

---

## 📊 Resumen de Testing

### Estado General
- **Recetas:** ⏳ Pendiente
- **Filtros:** ⏳ Pendiente
- **Categorías:** ⏳ Pendiente
- **Listas de Compra:** ⏳ Pendiente
- **Menús:** ⏳ Pendiente
- **Import/Export:** ⏳ Pendiente
- **Verificaciones Adicionales:** ⏳ Pendiente

### Errores Encontrados
_Ninguno aún - testing pendiente_

### Notas
_Añadir notas durante el testing_

---

## 🚨 En Caso de Errores

Si encuentras errores durante el testing:

1. **Anotar el error** en este documento
2. **Capturar screenshot** si es visual
3. **Copiar mensaje de consola** si hay error en JavaScript
4. **Describir pasos** para reproducir el error
5. **No eliminar script.js** hasta que todo funcione

### Rollback

Si hay errores críticos:

```html
<!-- En index.html, descomentar: -->
<script src="script.js"></script>

<!-- Y comentar: -->
<!-- <script type="module" src="main.js"></script> -->
```

---

**Fecha de creación:** 2025-11-11  
**Estado:** ⏳ Pendiente de ejecución  
**Responsable:** Equipo de desarrollo
