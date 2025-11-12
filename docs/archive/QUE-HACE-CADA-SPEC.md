# ¿Qué hace cada Spec?

Explicación simple de cada funcionalidad implementada en la aplicación de recetas.

---

## ✅ 1. copy-ingredients-from-card

### ¿Qué hace?
Permite copiar la lista de ingredientes de una receta al portapapeles con un solo clic.

### ¿Cómo funciona?
- En cada tarjeta de receta aparece un badge con el icono 📋
- Al hacer clic, copia todos los ingredientes al portapapeles
- Muestra una notificación de éxito
- Puedes pegar la lista en WhatsApp, notas, etc.

### Ejemplo de uso:
```
Usuario ve receta de "Pollo al horno"
→ Click en badge 📋
→ Notificación: "Ingredientes copiados"
→ Pega en WhatsApp:

Pollo al horno

pollo - 1 kg
ajo - 4 dientes
aceite - 2 cucharadas
sal - al gusto
```

### ¿Para qué sirve?
Facilita compartir listas de compra o enviar ingredientes a alguien sin tener que escribirlos manualmente.

---

## ✅ 2. custom-categories

### ¿Qué hace?
Permite crear tus propias categorías personalizadas además de las predefinidas.

### ¿Cómo funciona?
- Botón "🏷️ Categorías" en el menú
- Puedes crear categorías nuevas con:
  - Nombre personalizado
  - Emoji a elegir
  - Color personalizado
- Puedes editar o eliminar tus categorías
- Las categorías aparecen en filtros y selector

### Ejemplo de uso:
```
Categorías predefinidas: Carne, Pescado, Verdura...

Usuario crea:
- "Batch Cooking" 🍱 (color azul)
- "Keto" 🥑 (color verde)
- "Postres Navidad" 🎄 (color rojo)

Ahora puede filtrar recetas por estas categorías
```

### ¿Para qué sirve?
Organizar recetas según tus necesidades específicas (dietas, ocasiones, métodos de cocina, etc.)

---

## ✅ 3. hospital-food-filter

### ¿Qué hace?
Añade una categoría especial "Hospital" 🏥 para recetas aptas para dietas hospitalarias.

### ¿Cómo funciona?
- Nueva categoría "Hospital" en el selector
- Chip de filtro "Hospital" en la interfaz
- Se puede asignar a recetas blandas, sin sal, etc.

### Ejemplo de uso:
```
Recetas marcadas como "Hospital":
- Puré de verduras
- Pollo hervido
- Arroz blanco
- Compota de manzana

Usuario filtra por "Hospital" → Solo ve estas recetas
```

### ¿Para qué sirve?
Identificar rápidamente recetas adecuadas para personas con restricciones médicas o dietas especiales.

---

## ⚠️ 4. hamburger-menu-always (56% completado)

### ¿Qué hace?
Unifica el menú de la aplicación para que siempre sea el menú hamburguesa (☰), en todas las resoluciones.

### ¿Cómo funciona?
- Antes: Botones en desktop, menú hamburguesa en móvil
- Ahora: Siempre menú hamburguesa (más limpio)
- Un solo menú con todas las opciones:
  - ☀️ Tema
  - 🏷️ Categorías
  - 📥 Importar receta
  - 📤 Exportar todas
  - ➕ Nueva Receta

### Ejemplo de uso:
```
En cualquier dispositivo:
→ Click en ☰
→ Se abre menú con todas las opciones
→ Click en opción → Ejecuta acción y cierra menú
```

### ¿Para qué sirve?
Simplificar la interfaz y tener una experiencia consistente en todos los dispositivos.

### ¿Qué falta?
- Mejorar accesibilidad (navegación por teclado)
- Limpiar código (eliminar clases obsoletas)
- Testing completo

---

## ✅ 5. modal-navigation-flow

### ¿Qué hace?
Mejora la navegación entre modales (ventanas emergentes) cuando se abren unas dentro de otras.

### ¿Cómo funciona?
- Sistema de "pila" de modales
- Al cerrar un modal, vuelve al anterior correctamente
- Maneja z-index automáticamente (cuál está encima)

### Ejemplo de uso:
```
Usuario abre Configuración
→ Dentro abre "Gestionar Categorías"
→ Cierra "Gestionar Categorías"
→ Vuelve a Configuración (no a la vista principal)

Antes: Cerraba todo y volvía al inicio
Ahora: Navegación lógica entre modales
```

### ¿Para qué sirve?
Evitar que el usuario pierda el contexto al navegar entre ventanas emergentes.

---

## ✅ 6. modal-triggers-normalization

### ¿Qué hace?
Estandariza los estilos de todos los botones y badges que abren modales.

### ¿Cómo funciona?
- Archivo CSS centralizado: `modal-triggers.css`
- Clases reutilizables:
  - `.modal-trigger` (base)
  - `.modal-trigger--badge` (badges)
  - `.modal-trigger--button` (botones)
  - `.modal-trigger--link` (enlaces)
- Estilos consistentes en toda la app

### Ejemplo de uso:
```html
<!-- Badge de ingredientes -->
<div class="modal-trigger modal-trigger--badge">📋</div>

<!-- Botón de categoría -->
<button class="modal-trigger modal-trigger--button">🏷️ Categorías</button>
```

### ¿Para qué sirve?
- Código más limpio y mantenible
- Estilos consistentes
- Fácil añadir nuevos botones/badges

---

## ✅ 7. recipe-photo-gallery

### ¿Qué hace?
Crea una galería de fotos cuando una receta tiene 2 o más imágenes.

### ¿Cómo funciona?
- Si 1 imagen: Muestra imagen normal
- Si 2+ imágenes: Muestra galería con:
  - Imagen principal grande
  - Botones ← → para navegar
  - Miniaturas abajo
  - Indicador "2/5"
  - Navegación por teclado (flechas)

### Ejemplo de uso:
```
Receta "Tarta de chocolate" con 5 fotos:
1. Ingredientes
2. Masa en el molde
3. Horneando
4. Decoración
5. Resultado final

Usuario navega:
→ Click en → o flecha derecha
→ Ve siguiente foto
→ Click en miniatura
→ Salta a esa foto
```

### ¿Para qué sirve?
Mostrar el proceso completo de una receta con múltiples fotos de forma elegante.

---

## ✅ 8. shopping-lists

### ¿Qué hace?
Sistema completo de listas de compra dentro de la aplicación.

### ¿Cómo funciona?
- Crear listas de compra con nombre
- Añadir elementos (nombre + cantidad)
- Marcar elementos como completados ✓
- Reordenar elementos
- Copiar lista al portapapeles
- Expandir/colapsar listas
- Contador de completados (3/10)

### Ejemplo de uso:
```
Usuario crea lista "Compra del sábado":
- Pollo - 1 kg ☐
- Arroz - 500g ☐
- Tomates - 6 unidades ☐
- Aceite - 1 botella ☐

En el supermercado:
→ Marca "Pollo" ✓
→ Marca "Arroz" ✓
→ Contador: 2/4 completados

Puede copiar la lista y enviarla por WhatsApp
```

### ¿Para qué sirve?
Gestionar listas de compra sin salir de la app de recetas. Útil para planificar compras semanales.

---

## ✅ 9. sortable-list-view

### ¿Qué hace?
Añade una vista de lista con columnas ordenables, además de la vista de tarjetas.

### ¿Cómo funciona?
- Toggle para cambiar entre vista Grid (tarjetas) y List (tabla)
- En vista List:
  - Columnas: Imagen | Nombre | Fecha | Compartir
  - Click en "Nombre" → Ordena A-Z, Z-A
  - Click en "Fecha" → Ordena nuevo-viejo, viejo-nuevo
  - Indicadores ▼ ▲
- Máximo 2 columnas en grid

### Ejemplo de uso:
```
Vista Grid (tarjetas):
[Receta 1] [Receta 2]
[Receta 3] [Receta 4]

→ Click en toggle "Lista"

Vista List (tabla):
Imagen | Nombre          | Fecha    | 📤
🍗     | Pollo al horno  | 03/2024  | 📤
🐟     | Salmón grillado | 02/2024  | 📤
🥗     | Ensalada César  | 01/2024  | 📤

→ Click en "Nombre" → Ordena alfabéticamente
```

### ¿Para qué sirve?
Ver todas las recetas en formato tabla, más compacto. Útil para encontrar recetas rápidamente o ordenar por fecha.

---

## ✅ 10. unified-time-input

### ¿Qué hace?
Unifica la forma de introducir tiempos (horas y minutos) en toda la aplicación.

### ¿Cómo funciona?
- Antes: Campo de texto libre "1h 30min"
- Ahora: Dos campos separados [Horas] [Minutos]
- Funciones centralizadas:
  - `parseTimeInput()` - Lee los campos
  - `populateTimeInput()` - Rellena los campos
  - `formatTimeForDisplay()` - Muestra el tiempo

### Ejemplo de uso:
```
Formulario de receta:
Tiempo total: [2] horas [30] minutos

Secuencia 1:
Duración: [0] horas [15] minutos

Secuencia 2:
Duración: [1] horas [0] minutos

Se guarda como: "2h 30min", "15min", "1h"
Se muestra como: "2h 30min", "15min", "1h"
```

### ¿Para qué sirve?
- Entrada más clara y sin errores
- Formato consistente en toda la app
- Fácil de validar

---

## ✅ 11. xml-import-functionality

### ¿Qué hace?
Sistema completo de importación y exportación de recetas en formato XML con compatibilidad total entre la app principal y el CMS.

### ¿Cómo funciona?
✅ **Importación:**
- Importar recetas individuales desde XML
- Importar múltiples recetas desde un solo archivo
- Validación automática de estructura
- Detección y skip de duplicados
- Creación automática de categorías desconocidas
- Manejo robusto de errores

✅ **Exportación:**
- Exportar recetas individuales
- Exportar todas las recetas en un solo archivo
- Formato compatible entre CMS y app
- Preservación total de datos

### Ejemplo de uso:
```
Usuario exporta desde CMS:
→ Click en "Descargar XML"
→ Descarga "recetas_2025-11-07_1430.xml" con 50 recetas

Usuario importa en app:
→ Click en "📥 Importar XML"
→ Selecciona archivo
→ Progreso: "Importando 25/50..."
→ Resumen: "✅ 48 importadas, 2 duplicadas"
→ Todas las recetas aparecen con:
  - Ingredientes completos
  - Secuencias de preparación
  - Método de preparación
  - Utensilios de cocina
  - Imágenes
  - Flags (caravana, hospital, menú)
```

### ¿Para qué sirve?
- Hacer backup completo de todas tus recetas
- Migrar recetas entre dispositivos
- Compartir colecciones de recetas
- Edición masiva en CMS y sincronización con app
- Intercambio bidireccional CMS ↔ App sin pérdida de datos

---

## Resumen Visual

### Gestión de Recetas
- **custom-categories** → Organiza con categorías personalizadas
- **hospital-food-filter** → Filtra recetas especiales
- **sortable-list-view** → Ve recetas en tabla ordenable

### Compartir y Copiar
- **copy-ingredients-from-card** → Copia ingredientes rápido
- **shopping-lists** → Gestiona listas de compra
- **xml-import-functionality** → Importa/exporta recetas

### Multimedia
- **recipe-photo-gallery** → Galería de fotos elegante

### Interfaz
- **hamburger-menu-always** → Menú unificado
- **modal-navigation-flow** → Navegación entre ventanas
- **modal-triggers-normalization** → Estilos consistentes
- **unified-time-input** → Entrada de tiempo clara

---

## ¿Cuáles son más importantes?

### 🔥 Uso diario:
1. **custom-categories** - Organizar recetas
2. **shopping-lists** - Listas de compra
3. **copy-ingredients-from-card** - Compartir ingredientes
4. **sortable-list-view** - Encontrar recetas rápido

### 📸 Multimedia:
5. **recipe-photo-gallery** - Mostrar proceso con fotos

### 🔧 Técnicas (mejoran la app):
6. **hamburger-menu-always** - Interfaz más limpia
7. **modal-navigation-flow** - Mejor navegación
8. **unified-time-input** - Entrada más clara

### 💾 Backup y compartir:
9. **xml-import-functionality** - Backup y migración

### 🎨 Desarrollo:
10. **modal-triggers-normalization** - Código más limpio

### 🏥 Específicas:
11. **hospital-food-filter** - Dietas especiales

---

## ✅ 12. recipe-content-manager

### ¿Qué hace?
Sistema de gestión de contenido (CMS) standalone para edición masiva de recetas en formato XML.

### ¿Cómo funciona?
- Aplicación separada: `recipe-manager.html`
- Carga archivos XML con todas las recetas
- Permite editar múltiples recetas a la vez
- Dashboard con estadísticas completas
- Búsqueda y filtrado avanzado
- Exportación a XML y CSV

### Funcionalidades principales:

#### 📊 Dashboard y Estadísticas
- Total de recetas
- Número de categorías
- Porcentaje con autor
- Porcentaje con imágenes
- Recetas aptas para caravana/hospital
- Lista de recetas incompletas (sin autor, tiempo, ingredientes o imágenes)

#### 🔍 Búsqueda y Filtrado
- Búsqueda en tiempo real por nombre
- Filtros por categoría
- Filtros por autor
- Filtros por flags (caravana, hospital, menú)
- Filtros de estado (sin autor, sin imágenes)
- Combinación de múltiples filtros

#### ✏️ Edición Individual
- Modal completo para editar una receta
- Todos los campos: nombre, categoría, tiempo, autor, historia, método
- Flags: caravana, hospital, menú
- Validación de campos obligatorios
- Detección de nombres duplicados

#### 📝 Edición en Lote (Batch Edit)
- Seleccionar múltiples recetas con checkboxes
- Actualizar campos en todas las seleccionadas:
  - Autor
  - Categoría
  - Historia
  - Tiempo total
  - Flags (caravana, hospital, menú)
- Modos de actualización:
  - Sobrescribir todos los valores
  - Solo actualizar si está vacío

#### 🔎 Buscar y Reemplazar
- Buscar texto en campos específicos:
  - Nombre
  - Autor
  - Categoría
  - Historia
  - Método de preparación
- Reemplazar en todas las recetas o solo seleccionadas
- Opción case-sensitive
- Vista previa de coincidencias

#### 📋 Tabla Ordenable
- Vista de tabla con todas las recetas
- Columnas: Nombre, Categoría, Autor, Tiempo, Flags, Imágenes
- Click en encabezados para ordenar (A-Z, Z-A)
- Indicadores visuales de ordenamiento (↑ ↓)
- Selección múltiple con checkboxes

#### 💾 Exportación
- **Descargar XML**: Genera archivo XML con todas las recetas actualizadas
- **Exportar CSV**: Exporta a formato CSV para Excel
- Nombres con timestamp automático: `recetas_2025-11-07_1430.xml`

#### ⏮️ Historial y Deshacer
- Guarda los últimos 50 cambios
- Deshacer con botón o Ctrl+Z
- Backups automáticos en localStorage (últimos 5)
- Cada cambio incluye timestamp y descripción

#### ⌨️ Atajos de Teclado
- `Ctrl+S` / `Cmd+S` → Descargar XML
- `Ctrl+Z` / `Cmd+Z` → Deshacer último cambio
- `Ctrl+F` / `Cmd+F` → Enfocar búsqueda
- `Escape` → Cerrar modales

#### 🔔 Notificaciones
- Toast notifications con 4 tipos:
  - ✓ Éxito (verde)
  - ✕ Error (rojo)
  - ⚠ Advertencia (amarillo)
  - ℹ Información (azul)
- Auto-desaparecen después de 3 segundos
- Botón para cerrar manualmente

### Ejemplo de uso:

#### Caso 1: Completar recetas sin autor
```
1. Cargar XML con 50 recetas
2. Dashboard muestra: "15 recetas sin autor"
3. Click en sección "Recetas Incompletas"
4. Ve lista de 15 recetas sin autor
5. Selecciona todas con checkbox
6. Click en "Editar Seleccionadas"
7. Marca "Actualizar Autor"
8. Escribe "Chef García"
9. Selecciona "Solo si está vacío"
10. Click en "Aplicar Cambios"
11. ✓ 15 recetas actualizadas
```

#### Caso 2: Corregir error de escritura
```
1. Cargar XML
2. Click en "Buscar y Reemplazar"
3. Campo: "Autor"
4. Buscar: "Jhon"
5. Reemplazar: "John"
6. Click en "Vista Previa" → "3 coincidencias"
7. Click en "Reemplazar"
8. ✓ 3 reemplazos realizados
```

#### Caso 3: Cambiar categoría de múltiples recetas
```
1. Filtrar por categoría "Postres"
2. Seleccionar 10 recetas
3. Click en "Editar Seleccionadas"
4. Marca "Actualizar Categoría"
5. Selecciona "Dulces"
6. Click en "Aplicar Cambios"
7. ✓ 10 recetas actualizadas
```

#### Caso 4: Exportar recetas filtradas
```
1. Filtrar por "Apto para caravana"
2. Se muestran 25 recetas
3. Click en "Exportar CSV"
4. Se descarga archivo con las 25 recetas
5. Abrir en Excel para análisis
```

### ¿Para qué sirve?

#### 🎯 Gestión masiva
- Actualizar múltiples recetas a la vez
- Corregir errores en lote
- Completar información faltante
- Estandarizar datos

#### 📊 Análisis
- Ver estadísticas del recetario
- Identificar recetas incompletas
- Analizar distribución por categorías
- Detectar inconsistencias

#### 🔧 Mantenimiento
- Limpiar datos duplicados
- Corregir errores de escritura
- Estandarizar formatos
- Validar información

#### 💾 Backup y migración
- Exportar todo el recetario
- Hacer backups periódicos
- Migrar entre dispositivos
- Compartir colecciones

### Archivos del CMS:
- `recipe-manager.html` - Interfaz completa (~500 líneas)
- `recipe-manager.js` - Lógica completa (~700 líneas)
- `RECIPE-MANAGER-README.md` - Documentación detallada
- `recetas-ejemplo.xml` - Archivo de prueba con 5 recetas

### Acceso:
Abre `recipe-manager.html` en tu navegador para usar el CMS.

### Estado:
✅ **100% COMPLETADO** - Todas las funcionalidades implementadas y funcionando.

---

## Conclusión

La aplicación tiene **12 specs** que añaden funcionalidades para:
- ✅ Organizar recetas (categorías, filtros, vistas)
- ✅ Compartir información (copiar, exportar, importar)
- ✅ Gestionar compras (listas)
- ✅ Mostrar contenido (galerías)
- ✅ Mejorar la interfaz (menú, navegación)
- ✅ **Gestión masiva (CMS completo)**
- ✅ **Importación/Exportación XML completa**

**11 están completamente funcionales** y **1 necesita mejoras** (accesibilidad del menú hamburguesa).

### 🆕 Novedad: Recipe Content Manager
El CMS es una herramienta profesional para gestionar grandes cantidades de recetas. Ideal para:
- Mantener un recetario con 50+ recetas
- Corregir errores en lote
- Completar información faltante
- Hacer backups periódicos
- Análisis y estadísticas del recetario
