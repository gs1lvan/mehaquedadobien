# Modal Triggers - Guía de Uso y Ejemplos

## Introducción

Este documento proporciona ejemplos prácticos de cómo usar el sistema normalizado de controles modales (`modal-triggers.css`). Todos los ejemplos incluyen consideraciones de accesibilidad y mejores prácticas.

## Tabla de Contenidos

1. [Badges Modales](#badges-modales)
2. [Botones Modales](#botones-modales)
3. [Enlaces Modales](#enlaces-modales)
4. [Iconos Modales](#iconos-modales)
5. [Combinaciones y Variantes](#combinaciones-y-variantes)
6. [Accesibilidad](#accesibilidad)
7. [Migración desde Clases Antiguas](#migración-desde-clases-antiguas)

---

## Badges Modales

Los badges son elementos visuales que se posicionan sobre otros elementos (típicamente imágenes) y abren modales al hacer clic.

### Badge de Ingredientes (Esquina Inferior Derecha)

```html
<button 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-bottom-right"
    aria-label="Copiar ingredientes al portapapeles"
    aria-haspopup="dialog">
    🧺 Copiar
</button>
```

**Uso**: Para copiar ingredientes de una receta al portapapeles.

**Posición**: Esquina inferior derecha del contenedor padre.

---

### Badge de Opciones (Esquina Superior Derecha)

```html
<button 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-xl modal-trigger--badge-top-right"
    aria-label="Abrir menú de opciones"
    aria-haspopup="menu">
    ⋮
</button>
```

**Uso**: Para abrir un menú de opciones de la receta.

**Posición**: Esquina superior derecha del contenedor padre.

**Nota**: Usa `modal-trigger--badge-xl` para badges de solo icono más grandes.

---

### Badge de PDF (Esquina Inferior Derecha con Offset)

```html
<button 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-bottom-right-offset"
    aria-label="Exportar receta a PDF"
    aria-haspopup="dialog">
    📄 PDF
</button>
```

**Uso**: Para exportar la receta a formato PDF.

**Posición**: Esquina inferior derecha con offset (60px desde la derecha).

---

### Badge de Tiempo (Esquina Superior Izquierda)

```html
<div 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-top-left"
    role="button"
    tabindex="0"
    aria-label="Tiempo de preparación: 30 minutos">
    ⏱️ 30 min
</div>
```

**Uso**: Para mostrar el tiempo de preparación (puede ser clickeable para editar).

**Posición**: Esquina superior izquierda del contenedor padre.

---

### Badge Pequeño (Variante de Tamaño)

```html
<span 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-sm modal-trigger--badge-top-right"
    role="button"
    tabindex="0"
    aria-label="Receta nueva">
    ✨ Nuevo
</span>
```

**Uso**: Para badges informativos más pequeños.

**Tamaño**: Padding reducido (4px 8px) y font-size 0.625rem.

---

## Botones Modales

Los botones son controles interactivos que abren modales o selectores.

### Botón de Categoría

```html
<button 
    class="modal-trigger modal-trigger--button"
    type="button"
    aria-label="Seleccionar categoría"
    aria-haspopup="dialog"
    data-category="verdura">
    🥬 Verdura
</button>
```

**Uso**: Para abrir el selector de categoría en el formulario de receta.

**Estado**: Puede tener clase `.selected` cuando está activo.

---

### Botón de Categoría Seleccionado

```html
<button 
    class="modal-trigger modal-trigger--button selected"
    type="button"
    aria-label="Categoría seleccionada: Carne"
    aria-pressed="true"
    data-category="carne">
    🥩 Carne
</button>
```

**Uso**: Botón de categoría en estado seleccionado.

**Estilo**: Background primario, texto blanco.

---

### Botón de Carga de Multimedia

```html
<button 
    class="modal-trigger modal-trigger--button"
    type="button"
    aria-label="Subir imagen o video"
    aria-haspopup="dialog">
    📷 Subir Multimedia
</button>
```

**Uso**: Para abrir el selector de archivos multimedia.

---

### Botón de Acción de Cocina

```html
<button 
    class="modal-trigger modal-trigger--button"
    type="button"
    aria-label="Seleccionar acción: Hervir"
    data-action="hervir">
    Hervir
</button>
```

**Uso**: Para seleccionar una acción de cocina en la secuencia.

**Variante**: Puede tener clase `.selected` cuando está activo.

---

### Chip de Electrodoméstico

```html
<button 
    class="modal-trigger modal-trigger--button"
    type="button"
    aria-label="Seleccionar electrodoméstico: Horno"
    aria-pressed="false">
    <span class="chip-emoji">🔥</span>
    Horno
</button>
```

**Uso**: Para seleccionar electrodomésticos necesarios para la receta.

---

### Botón Deshabilitado

```html
<button 
    class="modal-trigger modal-trigger--button disabled"
    type="button"
    aria-label="Opción no disponible"
    disabled>
    No Disponible
</button>
```

**Uso**: Para mostrar opciones que no están disponibles actualmente.

**Estilo**: Opacidad reducida, cursor not-allowed.

---

## Enlaces Modales

Los enlaces son controles de texto que abren modales.

### Enlace Simple

```html
<a 
    href="#" 
    class="modal-trigger modal-trigger--link"
    role="button"
    aria-label="Ver más información"
    aria-haspopup="dialog">
    Ver más información
</a>
```

**Uso**: Para abrir modales informativos desde texto.

---

### Enlace con Icono

```html
<a 
    href="#" 
    class="modal-trigger modal-trigger--link"
    role="button"
    aria-label="Editar categoría"
    aria-haspopup="dialog">
    ✏️ Editar categoría
</a>
```

**Uso**: Para enlaces con iconos que abren modales de edición.

---

## Iconos Modales

Los iconos son controles circulares de solo icono.

### Icono de Copiar

```html
<button 
    class="modal-trigger modal-trigger--icon"
    type="button"
    aria-label="Copiar ingredientes">
    🧺
</button>
```

**Uso**: Para acciones rápidas con solo icono.

**Tamaño**: 36x36px con padding 8px.

---

### Icono de Menú

```html
<button 
    class="modal-trigger modal-trigger--icon"
    type="button"
    aria-label="Abrir menú"
    aria-haspopup="menu"
    aria-expanded="false">
    ☰
</button>
```

**Uso**: Para abrir menús hamburguesa o dropdowns.

---

## Combinaciones y Variantes

### Badge con Múltiples Clases

```html
<button 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-lg modal-trigger--badge-bottom-left"
    aria-label="Receta apta para caravana"
    aria-haspopup="dialog">
    🚐 Caravana
</button>
```

**Combinación**: Badge grande en esquina inferior izquierda.

---

### Botón con Estado Dinámico (JavaScript)

```html
<button 
    id="category-btn"
    class="modal-trigger modal-trigger--button"
    type="button"
    aria-label="Seleccionar categoría"
    aria-pressed="false">
    Sin categoría
</button>

<script>
// Cambiar a estado seleccionado
document.getElementById('category-btn').classList.add('selected');
document.getElementById('category-btn').setAttribute('aria-pressed', 'true');
</script>
```

---

### Badge en Contenedor Relativo

```html
<div class="recipe-card" style="position: relative;">
    <img src="recipe.jpg" alt="Receta">
    
    <!-- Badge se posiciona relativo al contenedor padre -->
    <button 
        class="modal-trigger modal-trigger--badge modal-trigger--badge-top-right"
        aria-label="Opciones de receta">
        ⋮
    </button>
</div>
```

**Importante**: El contenedor padre debe tener `position: relative` para que el badge se posicione correctamente.

---

## Accesibilidad

### Atributos ARIA Requeridos

Todos los controles modales deben incluir:

1. **`aria-label`** o **`aria-labelledby`**: Descripción clara del control
2. **`aria-haspopup`**: Indica qué tipo de popup abre (`dialog`, `menu`, `listbox`, etc.)
3. **`role="button"`**: Para elementos no-button que actúan como botones
4. **`tabindex="0"`**: Para elementos no-interactivos que deben ser navegables por teclado

### Ejemplo Completo con Accesibilidad

```html
<button 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-bottom-right"
    type="button"
    aria-label="Copiar lista de ingredientes al portapapeles"
    aria-haspopup="dialog"
    aria-expanded="false"
    data-modal-target="ingredients-modal">
    🧺 Copiar
</button>
```

### Navegación por Teclado

- **Enter/Space**: Activar el control
- **Tab**: Navegar entre controles
- **Escape**: Cerrar modal (manejado por JavaScript)

### Estados de Focus

Los controles modales tienen estados de focus visibles:
- Outline de 2px en color primario
- Offset de 2px para mejor visibilidad

---

## Migración desde Clases Antiguas

### Tabla de Migración

| Clase Antigua | Nuevas Clases | Notas |
|--------------|---------------|-------|
| `.recipe-ingredients-badge` | `.modal-trigger .modal-trigger--badge .modal-trigger--badge-bottom-right` | Mantener icono 🧺 |
| `.recipe-options-badge` | `.modal-trigger .modal-trigger--badge .modal-trigger--badge-xl .modal-trigger--badge-top-right` | Icono ⋮ |
| `.recipe-pdf-badge` | `.modal-trigger .modal-trigger--badge .modal-trigger--badge-bottom-right-offset` | Icono 📄 |
| `.category-chip` | `.modal-trigger .modal-trigger--button` | Agregar `.selected` si está activo |
| `.btn-upload-media` | `.modal-trigger .modal-trigger--button` | - |
| `.cooking-action-btn` | `.modal-trigger .modal-trigger--button` | Agregar `.selected` si está activo |
| `.btn-copy-ingredients` | `.modal-trigger .modal-trigger--icon` | Icono 🧺 |

### Ejemplo de Migración

**Antes:**
```html
<button class="recipe-ingredients-badge">
    🧺 Copiar
</button>
```

**Después:**
```html
<button 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-bottom-right"
    aria-label="Copiar ingredientes"
    aria-haspopup="dialog">
    🧺 Copiar
</button>
```

---

## Mejores Prácticas

### 1. Siempre Incluir Atributos ARIA

```html
<!-- ✅ Correcto -->
<button 
    class="modal-trigger modal-trigger--button"
    aria-label="Abrir selector"
    aria-haspopup="dialog">
    Seleccionar
</button>

<!-- ❌ Incorrecto -->
<button class="modal-trigger modal-trigger--button">
    Seleccionar
</button>
```

### 2. Usar Elementos Semánticos

```html
<!-- ✅ Correcto - Usar <button> para acciones -->
<button class="modal-trigger modal-trigger--button">
    Abrir
</button>

<!-- ❌ Incorrecto - Evitar <div> para acciones -->
<div class="modal-trigger modal-trigger--button">
    Abrir
</div>
```

### 3. Posicionamiento Correcto de Badges

```html
<!-- ✅ Correcto - Contenedor con position: relative -->
<div style="position: relative;">
    <img src="image.jpg">
    <button class="modal-trigger modal-trigger--badge modal-trigger--badge-top-right">
        ⋮
    </button>
</div>

<!-- ❌ Incorrecto - Sin contenedor relativo -->
<img src="image.jpg">
<button class="modal-trigger modal-trigger--badge modal-trigger--badge-top-right">
    ⋮
</button>
```

### 4. Estados Dinámicos con JavaScript

```javascript
// Agregar estado seleccionado
button.classList.add('selected');
button.setAttribute('aria-pressed', 'true');

// Remover estado seleccionado
button.classList.remove('selected');
button.setAttribute('aria-pressed', 'false');

// Deshabilitar control
button.classList.add('disabled');
button.setAttribute('disabled', true);
button.setAttribute('aria-disabled', 'true');
```

---

## Soporte y Compatibilidad

- **Navegadores Soportados**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Dispositivos**: Desktop, Tablet, Mobile
- **Temas**: Claro y Oscuro
- **Accesibilidad**: WCAG 2.1 Level AA

---

## Recursos Adicionales

- [Especificación ARIA](https://www.w3.org/TR/wai-aria/)
- [Guía de Accesibilidad Web](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs - ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

---

**Última actualización**: 2025  
**Versión**: 1.0.0
