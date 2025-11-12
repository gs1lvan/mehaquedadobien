# Mapeo de Controles Modales Existentes

## Badges que Abren Modales

### 1. `.recipe-ingredients-badge`
**Ubicación en CSS**: Línea ~1200
**Propósito**: Copiar ingredientes al portapapeles
**Propiedades**:
- `position: absolute`
- `bottom: 5px; right: 5px`
- `background: rgba(255, 255, 255, 0.95)`
- `color: var(--color-text)`
- `padding: 6px 12px`
- `border-radius: 50px`
- `font-size: 0.75rem`
- `font-weight: var(--font-weight-semibold)`
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)`
- `border: 1px solid rgba(221, 221, 221, 0.6)`
- `backdrop-filter: blur(4px)`
- `z-index: 2`
- `cursor: pointer`
- `transition: all 0.2s ease`
**Hover**: `transform: scale(1.05)`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2)`
**Icono**: 🧺 (antes del texto)

### 2. `.recipe-options-badge`
**Ubicación en CSS**: Línea ~1280
**Propósito**: Abrir menú de opciones de receta
**Propiedades**:
- `position: absolute`
- `top: 5px; right: 5px`
- `background: rgba(255, 255, 255, 0.95)`
- `color: var(--color-text)`
- `padding: 8px 12px`
- `border-radius: 50px`
- `font-size: 1.25rem`
- `font-weight: var(--font-weight-bold)`
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)`
- `border: 1px solid rgba(221, 221, 221, 0.6)`
- `backdrop-filter: blur(4px)`
- `z-index: 2`
- `cursor: pointer`
- `width: 36px; height: 36px`
**Hover**: `transform: scale(1.1)`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2)`
**Icono**: ⋮ (contenido ::before)

### 3. `.recipe-pdf-badge`
**Ubicación en CSS**: Línea ~1320
**Propósito**: Exportar receta a PDF
**Propiedades**:
- `position: absolute`
- `bottom: 5px; right: 60px`
- `background: rgba(255, 255, 255, 0.95)`
- `color: var(--color-text)`
- `padding: 6px 12px`
- `border-radius: 50px`
- `font-size: 0.75rem`
- `font-weight: var(--font-weight-semibold)`
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)`
- `border: 1px solid rgba(221, 221, 221, 0.6)`
- `backdrop-filter: blur(4px)`
- `z-index: 2`
- `cursor: pointer`
**Hover**: `transform: scale(1.05)`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2)`
**Icono**: 📄 (antes del texto)

### 4. `.recipe-time-badge`
**Ubicación en CSS**: Línea ~1050
**Propósito**: Mostrar tiempo de preparación (informativo, puede abrir modal de edición)
**Propiedades**:
- `background: rgba(255, 255, 255, 0.95)`
- `color: var(--color-text)`
- `padding: 6px 12px`
- `border-radius: 50px`
- `font-size: 0.75rem`
- `font-weight: var(--font-weight-semibold)`
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)`
- `backdrop-filter: blur(4px)`
**Icono**: ⏱️ (antes del texto)

### 5. `.recipe-caravan-badge-image`
**Ubicación en CSS**: Línea ~1080
**Propósito**: Indicador de receta apta para caravana
**Propiedades**:
- `background: rgba(255, 255, 255, 0.95)`
- `color: var(--color-text)`
- `padding: 6px 10px`
- `border-radius: 50px`
- `font-size: 1.25rem`
- `font-weight: var(--font-weight-semibold)`
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)`
- `backdrop-filter: blur(4px)`
**Icono**: 🚐 (emoji directo)

### 6. `.recipe-hospital-badge-image`
**Ubicación en CSS**: Línea ~1095
**Propósito**: Indicador de receta apta para hospital
**Propiedades**:
- `background: rgba(255, 255, 255, 0.95)`
- `color: var(--color-text)`
- `padding: 6px 10px`
- `border-radius: 50px`
- `font-size: 1.25rem`
- `font-weight: var(--font-weight-semibold)`
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)`
- `backdrop-filter: blur(4px)`
**Icono**: 🏥 (emoji directo)

### 7. `.recipe-menu-badge-image`
**Ubicación en CSS**: Línea ~1110
**Propósito**: Indicador de receta en menú
**Propiedades**:
- `background: rgba(255, 255, 255, 0.95)`
- `color: var(--color-text)`
- `padding: 6px 10px`
- `border-radius: 50px`
- `font-size: 1.25rem`
- `font-weight: var(--font-weight-semibold)`
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)`
- `backdrop-filter: blur(4px)`
**Icono**: 🍽️ (emoji directo)

## Botones que Abren Modales

### 8. `.category-chip` (en formulario)
**Ubicación en CSS**: Línea ~1540
**Propósito**: Abrir selector de categoría
**Propiedades**:
- `background: var(--color-background)`
- `border: 2px solid var(--color-border)`
- `color: var(--color-text)`
- `padding: 12px 20px`
- `border-radius: var(--radius-xl)`
- `font-size: 1rem`
- `font-weight: var(--font-weight-medium)`
- `cursor: pointer`
- `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
**Hover**: `border-color: var(--color-primary)`, `box-shadow: var(--shadow-sm)`, `transform: translateY(-1px)`
**Focus**: `border-color: var(--color-primary)`, `box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.1)`

### 9. `.btn-upload-media`
**Ubicación en CSS**: Línea ~2490
**Propósito**: Abrir selector de archivos multimedia
**Propiedades**:
- `background: var(--color-background)`
- `color: var(--color-text)`
- `border: 1px solid var(--color-border)`
- `padding: 12px 20px`
- `border-radius: var(--radius-sm)`
- `font-size: 0.875rem`
- `font-weight: var(--font-weight-semibold)`
- `cursor: pointer`
- `transition: all 0.2s ease`
**Hover**: `border-color: var(--color-text)`, `box-shadow: var(--shadow-sm)`

### 10. `.cooking-action-btn`
**Ubicación en CSS**: Línea ~2150
**Propósito**: Seleccionar acción de cocina (puede abrir modal de detalles)
**Propiedades**:
- `background: var(--color-background-secondary)`
- `color: var(--color-text-secondary)`
- `border: 1px solid var(--color-border-light)`
- `padding: 6px 12px`
- `border-radius: var(--radius-sm)`
- `font-size: 0.7rem`
- `font-weight: var(--font-weight-medium)`
- `cursor: pointer`
- `transition: all 0.2s ease`
**Hover**: `background: var(--color-border-light)`, `color: var(--color-text)`
**Selected**: `background: var(--color-primary)`, `color: white`

### 11. `.appliance-chip`
**Ubicación en CSS**: Línea ~1830
**Propósito**: Seleccionar electrodoméstico (puede abrir modal de configuración)
**Propiedades**:
- `background: var(--color-background)`
- `border: 4px solid var(--color-border)`
- `color: var(--color-text)`
- `border-radius: 10px`
- `font-size: 0.875rem`
- `font-weight: var(--font-weight-semibold)`
- `cursor: pointer`
- `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- `min-height: 38px`
**Hover**: `border-color: var(--color-primary)`, `box-shadow: var(--shadow-sm)`
**Selected**: `background: var(--color-primary)`, `color: white`

### 12. `.sequence-ingredient-chip`
**Ubicación en CSS**: Línea ~2230
**Propósito**: Seleccionar ingrediente para secuencia
**Propiedades**:
- `background: var(--color-background)`
- `border: 1px solid var(--color-border)`
- `color: var(--color-text)`
- `padding: 6px 11px`
- `border-radius: var(--radius-sm)`
- `font-size: 0.7rem`
- `font-weight: var(--font-weight-normal)`
- `cursor: pointer`
- `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
**Hover**: `border-color: var(--color-text)`, `box-shadow: var(--shadow-sm)`
**Selected**: `background: var(--color-text)`, `color: var(--color-background)`

### 13. `.menu-btn`
**Ubicación en CSS**: Línea ~160
**Propósito**: Abrir menú hamburguesa
**Propiedades**:
- `background: var(--color-background)`
- `border: 1px solid var(--color-border)`
- `color: var(--color-text)`
- `padding: 8px 12px`
- `border-radius: var(--radius-sm)`
- `cursor: pointer`
- `font-size: 1.5rem`
- `transition: all 0.2s ease`
**Hover**: `background: var(--color-background-secondary)`
**Active**: `transform: scale(0.95)`

### 14. `.btn-copy-ingredients` (en detalle)
**Ubicación en CSS**: Línea ~3350
**Propósito**: Copiar ingredientes desde vista de detalle
**Propiedades**:
- `background: var(--color-background-secondary)`
- `color: var(--color-text)`
- `border: 1px solid var(--color-border)`
- `padding: 8px`
- `border-radius: 50%`
- `font-size: 1.25rem`
- `cursor: pointer`
- `width: 40px; height: 40px`
**Hover**: `background: var(--color-border-light)`, `transform: scale(1.1)`

## Enlaces que Abren Modales

### 15. Selectores de categoría en modal
**Ubicación en CSS**: Línea ~4100
**Clase**: `.category-selection-badge`
**Propósito**: Seleccionar categoría en modal de gestión
**Propiedades**:
- `background: var(--color-background)`
- `border: 1px solid var(--color-border-light)`
- `border-radius: var(--radius-md)`
- `padding: var(--spacing-md)`
- `cursor: pointer`
- `transition: all 0.2s ease`
**Hover**: `box-shadow: var(--shadow-sm)`, `border-color: var(--color-border)`
**Selected**: `background: var(--color-primary)`, `color: white`

## Patrones Comunes Identificados

### Colores
- Background principal: `rgba(255, 255, 255, 0.95)` o `var(--color-background)`
- Color de texto: `var(--color-text)`
- Border: `1px solid var(--color-border)` o `rgba(221, 221, 221, 0.6)`

### Espaciado
- Padding pequeño: `6px 12px` o `4px 8px`
- Padding medio: `8px 16px` o `12px 20px`
- Padding grande: `12px 24px`

### Tipografía
- Font-size pequeño: `0.7rem` - `0.75rem`
- Font-size medio: `0.875rem` - `1rem`
- Font-size grande: `1.25rem`
- Font-weight: `var(--font-weight-medium)` o `var(--font-weight-semibold)`

### Bordes
- Border-radius pequeño: `var(--radius-sm)` (8px)
- Border-radius medio: `var(--radius-md)` (12px)
- Border-radius píldora: `50px` o `var(--radius-xl)` (24px)
- Border-radius circular: `50%`

### Sombras
- Sombra base: `0 2px 8px rgba(0, 0, 0, 0.15)`
- Sombra hover: `0 4px 12px rgba(0, 0, 0, 0.2)`
- Sombra sistema: `var(--shadow-sm)` o `var(--shadow-md)`

### Transiciones
- Transición estándar: `all 0.2s ease`
- Transición suave: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`

### Efectos Hover
- Transform scale up: `scale(1.05)` o `scale(1.1)`
- Transform scale down (active): `scale(0.95)` o `scale(0.98)`
- Transform translateY: `translateY(-1px)`

### Backdrop Filter
- Blur estándar: `blur(4px)`

## Recomendaciones de Normalización

1. **Unificar padding**: Usar `6px 12px` para badges pequeños, `8px 16px` para botones
2. **Unificar font-size**: `0.75rem` para badges, `0.875rem` para botones
3. **Unificar border-radius**: `50px` para badges, `var(--radius-sm)` para botones
4. **Unificar sombras**: Usar `var(--shadow-sm)` y `var(--shadow-hover)`
5. **Unificar transiciones**: `all 0.2s ease` para todos
6. **Unificar hover scale**: `scale(1.05)` para todos
7. **Unificar active scale**: `scale(0.95)` para todos
8. **Unificar backdrop-filter**: `blur(4px)` para badges con transparencia
