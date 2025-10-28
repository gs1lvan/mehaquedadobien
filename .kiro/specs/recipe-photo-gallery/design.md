# Documento de Diseño - Galería de Fotos de Recetas

## Resumen

Este diseño implementa una galería de fotos compacta para recetas con múltiples imágenes, reemplazando el diseño actual de columna vertical que ocupa mucho espacio. La galería mostrará una imagen principal grande con miniaturas navegables debajo, permitiendo a los usuarios ver todas las fotos sin hacer scroll excesivo.

## Arquitectura

### Componentes Principales

1. **PhotoGallery Component** - Componente principal de galería
2. **GalleryThumbnails** - Barra de miniaturas navegables
3. **GalleryNavigation** - Controles de navegación (anterior/siguiente)
4. **GalleryIndicator** - Indicador de posición actual

### Integración con Sistema Existente

La galería se integrará en el método `renderDetailMultimedia()` de la clase `RecipeApp` en `script.js`, reemplazando el renderizado actual de imágenes cuando hay 2 o más fotos.

## Componentes e Interfaces

### 1. PhotoGallery Component

**Ubicación:** Se implementará como parte de `RecipeApp` en `script.js`

**Responsabilidades:**
- Detectar si una receta tiene múltiples fotos (≥2)
- Renderizar galería compacta o imagen única según corresponda
- Gestionar el estado de la foto actualmente mostrada
- Coordinar navegación entre fotos

**Estructura HTML:**
```html
<div class="photo-gallery">
  <div class="gallery-main">
    <img class="gallery-main-image" src="..." alt="...">
    <button class="gallery-nav-btn gallery-nav-prev" aria-label="Foto anterior">
      ‹
    </button>
    <button class="gallery-nav-btn gallery-nav-next" aria-label="Foto siguiente">
      ›
    </button>
    <div class="gallery-indicator">
      <span class="gallery-indicator-current">1</span> / 
      <span class="gallery-indicator-total">5</span>
    </div>
  </div>
  <div class="gallery-thumbnails">
    <button class="gallery-thumbnail active" data-index="0">
      <img src="..." alt="...">
    </button>
    <button class="gallery-thumbnail" data-index="1">
      <img src="..." alt="...">
    </button>
    <!-- más miniaturas -->
  </div>
</div>
```

**Estado:**
```javascript
{
  images: MediaFile[],      // Array de imágenes
  currentIndex: number,      // Índice de imagen actual (0-based)
  totalImages: number        // Total de imágenes
}
```

### 2. Métodos de Renderizado

**`renderPhotoGallery(images)`**
- **Parámetros:** `images: MediaFile[]`
- **Retorna:** `HTMLElement`
- **Descripción:** Crea el elemento de galería completo con imagen principal, controles y miniaturas

**`renderGalleryMain(image, index, total)`**
- **Parámetros:** `image: MediaFile, index: number, total: number`
- **Retorna:** `HTMLElement`
- **Descripción:** Renderiza el área principal con la imagen grande y controles

**`renderGalleryThumbnails(images, activeIndex)`**
- **Parámetros:** `images: MediaFile[], activeIndex: number`
- **Retorna:** `HTMLElement`
- **Descripción:** Renderiza la barra de miniaturas con indicador de activa

**`updateGalleryImage(index)`**
- **Parámetros:** `index: number`
- **Retorna:** `void`
- **Descripción:** Actualiza la imagen principal y el estado activo de miniaturas

### 3. Navegación

**Métodos de Navegación:**
- `navigateToImage(index)` - Navega a una imagen específica
- `navigateNext()` - Avanza a la siguiente imagen (circular)
- `navigatePrevious()` - Retrocede a la imagen anterior (circular)

**Event Listeners:**
- Click en miniaturas → `navigateToImage(index)`
- Click en botón siguiente → `navigateNext()`
- Click en botón anterior → `navigatePrevious()`
- Tecla flecha derecha → `navigateNext()`
- Tecla flecha izquierda → `navigatePrevious()`
- Click en imagen principal → Abrir modal de imagen (funcionalidad existente)

## Diseño Visual (CSS)

### Layout Principal

```css
.photo-gallery {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
}

.gallery-main {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.gallery-main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}
```

### Controles de Navegación

```css
.gallery-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.gallery-nav-prev {
  left: var(--spacing-md);
}

.gallery-nav-next {
  right: var(--spacing-md);
}

.gallery-nav-btn:hover {
  background: white;
  box-shadow: var(--shadow-md);
  transform: translateY(-50%) scale(1.1);
}
```

### Indicador de Posición

```css
.gallery-indicator {
  position: absolute;
  bottom: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
}
```

### Miniaturas

```css
.gallery-thumbnails {
  display: flex;
  gap: var(--spacing-sm);
  overflow-x: auto;
  padding: var(--spacing-xs) 0;
  scrollbar-width: thin;
}

.gallery-thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-background-secondary);
  padding: 0;
}

.gallery-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-thumbnail:hover {
  border-color: var(--color-primary-light);
  transform: scale(1.05);
}

.gallery-thumbnail.active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
```

### Diseño Responsive

**Móvil (< 768px):**
```css
@media (max-width: 768px) {
  .gallery-main {
    aspect-ratio: 4 / 3;
  }
  
  .gallery-nav-btn {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }
  
  .gallery-thumbnail {
    width: 60px;
    height: 60px;
  }
  
  .gallery-indicator {
    font-size: 0.75rem;
    padding: 4px 12px;
  }
}
```

**Tablet (768px - 1024px):**
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .gallery-thumbnail {
    width: 70px;
    height: 70px;
  }
}
```

## Accesibilidad

### Atributos ARIA

```html
<div class="photo-gallery" role="region" aria-label="Galería de fotos de la receta">
  <div class="gallery-main" role="img" aria-label="Imagen principal">
    <img class="gallery-main-image" 
         src="..." 
         alt="[Nombre de receta] - Foto [número]">
    <button class="gallery-nav-btn gallery-nav-prev" 
            aria-label="Ver foto anterior"
            aria-controls="gallery-main-image">
      ‹
    </button>
    <button class="gallery-nav-btn gallery-nav-next" 
            aria-label="Ver foto siguiente"
            aria-controls="gallery-main-image">
      ›
    </button>
  </div>
  <div class="gallery-thumbnails" 
       role="tablist" 
       aria-label="Miniaturas de fotos">
    <button class="gallery-thumbnail active" 
            role="tab"
            aria-selected="true"
            aria-label="Foto 1 de 5"
            data-index="0">
      <img src="..." alt="">
    </button>
  </div>
</div>
```

### Navegación por Teclado

- **Tab:** Navegar entre controles (botones prev/next, miniaturas)
- **Enter/Space:** Activar botón o miniatura enfocada
- **Arrow Left:** Foto anterior (cuando galería tiene foco)
- **Arrow Right:** Foto siguiente (cuando galería tiene foco)
- **Home:** Primera foto
- **End:** Última foto

### Focus Management

```javascript
// Mantener foco visible durante navegación
updateGalleryImage(index) {
  // ... actualizar imagen ...
  
  // Mantener foco en elemento activo
  const activeElement = document.activeElement;
  if (activeElement.classList.contains('gallery-thumbnail')) {
    const newThumbnail = document.querySelector(
      `.gallery-thumbnail[data-index="${index}"]`
    );
    newThumbnail?.focus();
  }
}
```

## Manejo de Errores

### Casos de Error

1. **Imágenes no cargadas:**
   - Mostrar placeholder con icono de imagen
   - Mensaje: "Imagen no disponible"

2. **Array de imágenes vacío:**
   - No renderizar galería
   - Mantener comportamiento actual (sin multimedia)

3. **Índice fuera de rango:**
   - Validar índice antes de actualizar
   - Usar navegación circular (wrap around)

### Implementación

```javascript
renderPhotoGallery(images) {
  // Validación
  if (!images || !Array.isArray(images) || images.length === 0) {
    console.warn('[PhotoGallery] No images provided');
    return null;
  }
  
  // Si solo hay 1 imagen, usar renderizado tradicional
  if (images.length === 1) {
    return this.renderSingleImage(images[0]);
  }
  
  // Renderizar galería para 2+ imágenes
  return this.createGalleryElement(images);
}

navigateToImage(index) {
  // Validar índice
  if (index < 0 || index >= this.galleryState.totalImages) {
    console.error('[PhotoGallery] Invalid index:', index);
    return;
  }
  
  // Actualizar estado y UI
  this.galleryState.currentIndex = index;
  this.updateGalleryImage(index);
}
```

## Estrategia de Testing

### Tests Unitarios

**Renderizado:**
- ✓ Renderiza galería cuando hay 2+ imágenes
- ✓ Renderiza imagen única cuando hay 1 imagen
- ✓ No renderiza nada cuando no hay imágenes
- ✓ Muestra indicador correcto (1/5, 2/5, etc.)

**Navegación:**
- ✓ Navega a siguiente imagen correctamente
- ✓ Navega a imagen anterior correctamente
- ✓ Navegación circular (última → primera, primera → última)
- ✓ Click en miniatura cambia imagen principal
- ✓ Miniatura activa se actualiza correctamente

**Teclado:**
- ✓ Flecha derecha avanza imagen
- ✓ Flecha izquierda retrocede imagen
- ✓ Tab navega entre controles
- ✓ Enter/Space activa control enfocado

### Tests de Integración

- ✓ Galería se integra correctamente en vista de detalle de receta
- ✓ Click en imagen principal abre modal existente
- ✓ Galería funciona con recetas importadas desde XML
- ✓ Galería se actualiza al editar receta y agregar/eliminar fotos

### Tests Manuales

- ✓ Responsive en móvil, tablet y desktop
- ✓ Transiciones suaves entre imágenes
- ✓ Scroll horizontal de miniaturas funciona correctamente
- ✓ Accesibilidad con lector de pantalla
- ✓ Rendimiento con 10+ imágenes

## Optimización de Rendimiento

### Lazy Loading de Miniaturas

```javascript
renderGalleryThumbnails(images, activeIndex) {
  const container = document.createElement('div');
  container.className = 'gallery-thumbnails';
  
  images.forEach((image, index) => {
    const button = document.createElement('button');
    button.className = 'gallery-thumbnail';
    if (index === activeIndex) button.classList.add('active');
    button.dataset.index = index;
    
    const img = document.createElement('img');
    // Lazy load miniaturas no visibles
    if (Math.abs(index - activeIndex) > 3) {
      img.loading = 'lazy';
    }
    img.src = image.data;
    img.alt = '';
    
    button.appendChild(img);
    container.appendChild(button);
  });
  
  return container;
}
```

### Debounce de Navegación Rápida

```javascript
setupGalleryNavigation() {
  let navigationTimeout;
  
  const debouncedNavigate = (index) => {
    clearTimeout(navigationTimeout);
    navigationTimeout = setTimeout(() => {
      this.navigateToImage(index);
    }, 50);
  };
  
  // Usar en event listeners de teclado
}
```

## Decisiones de Diseño

### 1. Galería vs Carrusel

**Decisión:** Implementar galería con miniaturas visibles

**Razón:** 
- Permite ver todas las fotos disponibles de un vistazo
- Navegación más intuitiva y directa
- Mejor para recetas con 2-8 fotos (caso común)

### 2. Aspecto Ratio de Imagen Principal

**Decisión:** 16:9 en desktop, 4:3 en móvil

**Razón:**
- 16:9 es estándar para fotos de comida en web
- 4:3 aprovecha mejor el espacio vertical en móvil
- `object-fit: contain` mantiene proporciones originales

### 3. Navegación Circular

**Decisión:** Permitir navegación circular (última → primera)

**Razón:**
- Experiencia de usuario más fluida
- Común en galerías modernas
- No requiere deshabilitar botones en extremos

### 4. Umbral de Galería

**Decisión:** Activar galería con 2+ imágenes

**Razón:**
- Con 1 imagen, el diseño actual es suficiente
- Con 2+ imágenes, la galería ahorra espacio significativo
- Evita complejidad innecesaria para casos simples

### 5. Integración con Modal Existente

**Decisión:** Mantener funcionalidad de modal al hacer click en imagen principal

**Razón:**
- No romper funcionalidad existente
- Modal permite zoom y vista completa
- Usuarios ya familiarizados con este comportamiento

## Compatibilidad

### Navegadores Soportados

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Chrome Android 90+

### Características Utilizadas

- CSS Grid y Flexbox (amplio soporte)
- `aspect-ratio` (fallback con padding-bottom)
- `object-fit` (amplio soporte)
- Event delegation (estándar)
- Arrow functions (ES6)

### Fallbacks

```css
/* Fallback para aspect-ratio */
.gallery-main {
  aspect-ratio: 16 / 9;
}

@supports not (aspect-ratio: 16 / 9) {
  .gallery-main {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
  }
  
  .gallery-main-image {
    position: absolute;
    top: 0;
    left: 0;
  }
}
```

## Migración y Retrocompatibilidad

### Cambios en `renderDetailMultimedia()`

```javascript
renderDetailMultimedia(images, videos) {
  const sectionElement = document.getElementById('detail-multimedia-section');
  const imagesGallery = document.getElementById('detail-images-gallery');
  const videosGallery = document.getElementById('detail-videos-gallery');

  if (!sectionElement || !imagesGallery || !videosGallery) return;

  // Clear galleries
  imagesGallery.innerHTML = '';
  videosGallery.innerHTML = '';

  const hasImages = images && images.length > 0;
  const hasVideos = videos && videos.length > 0;

  if (!hasImages && !hasVideos) {
    sectionElement.style.display = 'none';
    return;
  }

  sectionElement.style.display = 'block';

  // NUEVO: Renderizar galería o imágenes individuales
  if (hasImages) {
    if (images.length >= 2) {
      // Usar galería para múltiples imágenes
      const gallery = this.renderPhotoGallery(images);
      imagesGallery.appendChild(gallery);
    } else {
      // Mantener renderizado tradicional para 1 imagen
      this.renderSingleImage(images[0], imagesGallery);
    }
  }

  // Videos sin cambios
  if (hasVideos) {
    // ... código existente ...
  }
}
```

### Sin Breaking Changes

- Recetas con 1 imagen: comportamiento sin cambios
- Recetas sin imágenes: comportamiento sin cambios
- Modal de imagen: funcionalidad preservada
- Estructura de datos: sin cambios en `MediaFile` o `Recipe`
