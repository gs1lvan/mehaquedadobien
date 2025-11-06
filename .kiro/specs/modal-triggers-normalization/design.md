# Documento de Diseño

## Visión General

Este diseño establece la arquitectura y estructura para normalizar los estilos de controles que abren modales en la aplicación. Se creará un sistema modular basado en la metodología BEM (Block Element Modifier) que extraerá y unificará los estilos dispersos en el CSS actual, creando una hoja independiente `modal-triggers.css` con convenciones claras y mantenibles.

## Arquitectura

### Estructura de Archivos

```
/
├── styles.css (archivo principal - se mantendrá)
├── modal-triggers.css (nuevo archivo modular)
└── docs/
    └── modal-triggers-examples.md (ejemplos de uso)
```

### Estrategia de Implementación

1. **Análisis**: Identificar todos los controles modales existentes en `styles.css`
2. **Extracción**: Copiar estilos relevantes al nuevo archivo
3. **Normalización**: Unificar valores usando variables CSS del sistema
4. **Documentación**: Crear ejemplos y guías de uso
5. **Integración**: Vincular el nuevo archivo CSS en el HTML

## Componentes y Interfaces

### 1. Clase Base: `.modal-trigger`

**Propósito**: Clase base compartida por todos los controles que abren modales

**Propiedades Comunes**:
```css
.modal-trigger {
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

.modal-trigger:hover {
    transform: scale(1.05);
}

.modal-trigger:active {
    transform: scale(0.95);
}

.modal-trigger:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

.modal-trigger:focus:not(:focus-visible) {
    outline: none;
}
```

### 2. Modificador: `.modal-trigger--badge`

**Propósito**: Estilos específicos para badges que abren modales

**Controles Identificados**:
- `.recipe-ingredients-badge`
- `.recipe-options-badge`
- `.recipe-pdf-badge`
- `.recipe-time-badge`
- `.recipe-caravan-badge-image`
- `.recipe-hospital-badge-image`
- `.recipe-menu-badge-image`

**Propiedades Unificadas**:
```css
.modal-trigger--badge {
    position: absolute;
    background: rgba(255, 255, 255, 0.95);
    color: var(--color-text);
    padding: 6px 12px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: var(--font-weight-semibold);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(221, 221, 221, 0.6);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    backdrop-filter: blur(4px);
    z-index: 2;
}

.modal-trigger--badge:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 1);
}
```

**Variantes de Posición**:
```css
.modal-trigger--badge-top-left {
    top: 5px;
    left: 5px;
}

.modal-trigger--badge-top-right {
    top: 5px;
    right: 5px;
}

.modal-trigger--badge-bottom-left {
    bottom: 5px;
    left: 5px;
}

.modal-trigger--badge-bottom-right {
    bottom: 5px;
    right: 5px;
}
```

**Variantes de Tamaño**:
```css
.modal-trigger--badge-sm {
    padding: 4px 8px;
    font-size: 0.625rem;
}

.modal-trigger--badge-lg {
    padding: 8px 16px;
    font-size: 0.875rem;
}
```

### 3. Modificador: `.modal-trigger--button`

**Propósito**: Estilos específicos para botones que abren modales

**Controles Identificados**:
- `.category-chip`
- `.btn-upload-media`
- `.cooking-action-btn`
- `.appliance-chip`
- `.sequence-ingredient-chip`

**Propiedades Unificadas**:
```css
.modal-trigger--button {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.modal-trigger--button:hover {
    border-color: var(--color-text);
    box-shadow: var(--shadow-sm);
}

.modal-trigger--button:active {
    background: var(--color-background-secondary);
}
```

**Estados Especiales**:
```css
.modal-trigger--button.selected {
    background: var(--color-primary);
    color: var(--color-background);
    border-color: var(--color-primary);
}

.modal-trigger--button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}
```

### 4. Modificador: `.modal-trigger--link`

**Propósito**: Estilos específicos para enlaces que abren modales

**Propiedades Unificadas**:
```css
.modal-trigger--link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.modal-trigger--link:hover {
    text-decoration: underline;
    color: var(--color-primary-dark);
}

.modal-trigger--link:active {
    color: var(--color-primary-light);
}
```

### 5. Modificador: `.modal-trigger--icon`

**Propósito**: Estilos para controles modales que son solo iconos

**Propiedades Unificadas**:
```css
.modal-trigger--icon {
    background: transparent;
    border: none;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
}

.modal-trigger--icon:hover {
    background: var(--color-background-secondary);
}
```

## Modelos de Datos

### Mapeo de Clases Existentes a Nuevas

| Clase Existente | Nueva Clase Base | Modificadores | Posición |
|----------------|------------------|---------------|----------|
| `.recipe-ingredients-badge` | `.modal-trigger` | `--badge` | `--badge-bottom-right` |
| `.recipe-options-badge` | `.modal-trigger` | `--badge --icon` | `--badge-top-right` |
| `.recipe-pdf-badge` | `.modal-trigger` | `--badge` | `--badge-bottom-right` |
| `.recipe-time-badge` | `.modal-trigger` | `--badge` | `--badge-top-left` |
| `.category-chip` | `.modal-trigger` | `--button` | N/A |
| `.btn-upload-media` | `.modal-trigger` | `--button` | N/A |
| `.cooking-action-btn` | `.modal-trigger` | `--button` | N/A |
| `.appliance-chip` | `.modal-trigger` | `--button` | N/A |

## Manejo de Errores

### Compatibilidad con Navegadores

- **Backdrop Filter**: Incluir fallback para navegadores que no soportan `backdrop-filter`
```css
@supports not (backdrop-filter: blur(4px)) {
    .modal-trigger--badge {
        background: rgba(255, 255, 255, 1);
    }
}
```

### Accesibilidad

- Todos los controles modales deben tener atributos ARIA apropiados
- Los estados de focus deben ser claramente visibles
- Los controles deben ser navegables por teclado

```html
<!-- Ejemplo con ARIA -->
<button 
    class="modal-trigger modal-trigger--badge modal-trigger--badge-bottom-right"
    aria-label="Copiar ingredientes"
    aria-haspopup="dialog">
    🧺 Copiar
</button>
```

## Estrategia de Testing

### Testing Visual

1. **Verificación de Estados**:
   - Estado normal
   - Estado hover
   - Estado active
   - Estado focus
   - Estado disabled

2. **Verificación Responsive**:
   - Mobile (< 768px)
   - Tablet (768px - 1024px)
   - Desktop (> 1024px)

3. **Verificación de Temas**:
   - Tema claro
   - Tema oscuro

### Testing de Compatibilidad

1. **Navegadores**:
   - Chrome/Edge (últimas 2 versiones)
   - Firefox (últimas 2 versiones)
   - Safari (últimas 2 versiones)

2. **Dispositivos**:
   - iOS Safari
   - Android Chrome

## Soporte para Tema Oscuro

```css
body.dark-theme .modal-trigger--badge {
    background: rgba(30, 30, 30, 0.95);
    color: var(--color-text);
    border-color: rgba(255, 255, 255, 0.1);
}

body.dark-theme .modal-trigger--badge:hover {
    background: rgba(30, 30, 30, 1);
}

body.dark-theme .modal-trigger--button {
    background: var(--color-background-secondary);
    border-color: var(--color-border);
}
```

## Responsive Design

### Mobile (< 768px)

```css
@media (max-width: 767px) {
    .modal-trigger--badge {
        padding: 4px 8px;
        font-size: 0.625rem;
    }
    
    .modal-trigger--button {
        padding: 6px 12px;
        font-size: 0.75rem;
    }
}
```

### Tablet (768px - 1024px)

```css
@media (min-width: 768px) and (max-width: 1024px) {
    .modal-trigger--badge {
        padding: 5px 10px;
        font-size: 0.6875rem;
    }
}
```

## Migración Gradual

### Fase 1: Creación del Archivo
- Crear `modal-triggers.css`
- Vincular en el HTML
- Mantener estilos existentes

### Fase 2: Implementación Paralela
- Agregar nuevas clases junto a las existentes
- Verificar que no hay conflictos
- Testing exhaustivo

### Fase 3: Migración Completa
- Reemplazar clases antiguas por nuevas
- Eliminar estilos duplicados de `styles.css`
- Actualizar documentación

### Fase 4: Limpieza
- Remover clases obsoletas
- Optimizar CSS
- Validar rendimiento

## Documentación de Ejemplos

### Estructura del Archivo de Ejemplos

```markdown
# Modal Triggers - Guía de Uso

## Badges Modales

### Badge de Ingredientes
[Ejemplo HTML + Captura visual]

### Badge de Opciones
[Ejemplo HTML + Captura visual]

## Botones Modales

### Botón de Categoría
[Ejemplo HTML + Captura visual]

### Botón de Carga
[Ejemplo HTML + Captura visual]

## Enlaces Modales

### Enlace Simple
[Ejemplo HTML + Captura visual]
```

## Consideraciones de Rendimiento

1. **Minimización**: El archivo final debe ser minificado para producción
2. **Carga**: Considerar carga asíncrona si el archivo crece
3. **Especificidad**: Mantener especificidad baja para evitar conflictos
4. **Reutilización**: Maximizar reutilización de variables CSS

## Métricas de Éxito

1. **Reducción de Código**: Reducir duplicación de estilos en al menos 30%
2. **Consistencia**: 100% de controles modales usando el mismo sistema
3. **Mantenibilidad**: Tiempo de implementación de nuevos controles reducido en 50%
4. **Rendimiento**: Sin impacto negativo en tiempo de carga
