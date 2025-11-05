# Fix: Grid de Categorías en Móvil

## Problema
En móvil (< 600px) se estaban mostrando 2 columnas en lugar de 1 columna.

## Causa
Había múltiples media queries que estaban sobrescribiendo el comportamiento del grid:

1. **Media query base** (línea 4016): Estaba usando `minmax(min(240px, 100%), 1fr)` que permitía 2 columnas
2. **Media query tablet** (línea 3404): `@media (min-width: 768px) and (max-width: 1024px)` con `repeat(auto-fill, minmax(320px, 1fr))`
3. **Media query móvil** (línea 4421): `@media (max-width: 767px)` con `repeat(2, 1fr)` ❌ **FORZABA 2 COLUMNAS**

## Solución Aplicada

### 1. Base (línea 4016)
```css
.categories-list {
    display: grid;
    grid-template-columns: 1fr; /* 1 columna por defecto en móvil */
    gap: var(--spacing-sm);
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}
```

### 2. Tablet/Desktop (línea 4027)
```css
@media (min-width: 600px) {
    .categories-list {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
}
```

### 3. Tablet específico (línea 3404)
```css
@media (min-width: 768px) and (max-width: 1024px) {
    .categories-list {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
}
```

### 4. Móvil específico (línea 4421)
```css
@media (max-width: 767px) {
    .categories-list {
        grid-template-columns: 1fr; /* CAMBIADO de repeat(2, 1fr) a 1fr */
        gap: var(--spacing-xs);
    }
}
```

## Comportamiento Final

| Tamaño de Pantalla | Columnas | Media Query |
|-------------------|----------|-------------|
| < 600px (Móvil) | **1 columna** | Base + max-width: 767px |
| 600px - 767px | **2+ columnas** | min-width: 600px |
| 768px - 1024px (Tablet) | **2+ columnas** | min-width: 768px |
| > 1024px (Desktop) | **3-4 columnas** | min-width: 600px (auto-fit) |

## Verificación

✅ Móvil (< 600px): 1 columna
✅ Tablet (600px - 1024px): Mínimo 2 columnas
✅ Desktop (> 1024px): 3-4 columnas según espacio

## Archivos Modificados

- `styles.css` - 3 cambios en media queries diferentes
