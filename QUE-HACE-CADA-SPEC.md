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

## ⚠️ 11. xml-import-functionality (43% completado)

### ¿Qué hace?
Sistema de importación y exportación de recetas en formato XML.

### ¿Cómo funciona actualmente?
✅ **Funciona:**
- Importar 1 receta desde XML
- Exportar 1 receta a XML
- Exportar todas las recetas a XML
- Botones en la interfaz

❌ **Falta:**
- Importar múltiples recetas a la vez
- Barra de progreso
- Validación de archivos
- Resumen de importación

### Ejemplo de uso actual:
```
Usuario exporta receta:
→ Click en "📤" en tarjeta
→ Descarga "pollo-al-horno.xml"

Usuario importa receta:
→ Click en "📥 Importar XML"
→ Selecciona archivo
→ Receta aparece en la lista
```

### Ejemplo de uso objetivo:
```
Usuario tiene archivo con 50 recetas:
→ Click en "📥 Importar XML"
→ Selecciona "mis-recetas.xml"
→ Validación: ✓ Archivo válido
→ Barra de progreso: "Importando 25/50..."
→ Resumen: "✅ 48 importadas, ❌ 2 fallaron"
→ Lista de errores: "Receta 12: falta nombre"
```

### ¿Para qué sirve?
- Hacer backup de todas tus recetas
- Compartir colecciones de recetas
- Migrar recetas entre dispositivos
- Importar recetas de otras fuentes

### ¿Qué falta?
- Importación masiva (50+ recetas)
- Feedback visual de progreso
- Validación robusta
- Manejo de errores

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

## Conclusión

La aplicación tiene **11 specs** que añaden funcionalidades para:
- ✅ Organizar recetas (categorías, filtros, vistas)
- ✅ Compartir información (copiar, exportar)
- ✅ Gestionar compras (listas)
- ✅ Mostrar contenido (galerías)
- ✅ Mejorar la interfaz (menú, navegación)

**9 están completamente funcionales** y **2 necesitan mejoras** (accesibilidad e importación masiva).
