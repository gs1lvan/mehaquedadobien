# Design Document

## Overview

Este documento describe el diseño técnico para unificar la lógica de entrada de tiempo en la aplicación de recetario. La solución consiste en crear un conjunto de funciones reutilizables que manejen la creación, validación, formateo y parseo de campos de tiempo, y aplicar estas funciones tanto al campo "Tiempo Total" existente como al campo "Duración" en las secuencias de adición.

## Architecture

### Current State

**Tiempo Total (Información Básica):**
- HTML: Dos campos numéricos (`recipe-hours` y `recipe-minutes`) con etiquetas y validación
- JavaScript: Lógica en `getFormData()` que construye el string de tiempo en formato "Xh Ymin"
- JavaScript: Lógica en `populateFormForEdit()` que parsea el string y extrae horas/minutos usando regex

**Duración (Secuencias de Adición):**
- HTML: Un campo de texto libre (`sequence-duration`) que acepta cualquier formato
- JavaScript: Se guarda directamente el valor del input sin procesamiento
- JavaScript: Se muestra directamente el valor almacenado

### Target State

**Unified Time Input System:**
- Conjunto de funciones utilitarias para manejo de tiempo
- HTML generado dinámicamente mediante función `createTimeInput()`
- Ambos campos (Tiempo Total y Duración) usan la misma lógica
- Formato consistente de almacenamiento y visualización

## Components and Interfaces

### 1. TimeInputUtils (Nuevo módulo)

Conjunto de funciones utilitarias para manejo de tiempo que se agregarán a la clase `RecipeApp`.

#### 1.1 createTimeInput(config)

Genera el HTML para un campo de entrada de tiempo.

**Parámetros:**
```javascript
{
  idPrefix: string,        // Prefijo para IDs únicos (ej: "recipe", "sequence")
  label: string,           // Etiqueta del campo (ej: "Tiempo Total")
  helperText: string,      // Texto de ayuda opcional
  required: boolean        // Si el campo es requerido (default: false)
}
```

**Retorna:** String con HTML del campo de tiempo

**Ejemplo de HTML generado:**
```html
<div class="form-group">
    <label>Tiempo Total (opcional)</label>
    <div class="time-input-group">
        <div class="time-input-item">
            <span class="time-label">Horas</span>
            <input type="number" id="recipe-hours" class="form-input time-input" 
                   placeholder="0" min="0" max="99" autocomplete="off">
        </div>
        <div class="time-input-item">
            <span class="time-label">Minutos</span>
            <input type="number" id="recipe-minutes" class="form-input time-input" 
                   placeholder="0" min="0" max="59" autocomplete="off">
        </div>
    </div>
    <span class="helper-text">Texto de ayuda</span>
</div>
```

#### 1.2 parseTimeInput(idPrefix)

Lee los valores de los campos de tiempo y los convierte en un string formateado.

**Parámetros:**
```javascript
idPrefix: string  // Prefijo de los IDs (ej: "recipe", "sequence")
```

**Retorna:** String formateado o vacío

**Lógica:**
```javascript
parseTimeInput(idPrefix) {
    const hours = parseInt(document.getElementById(`${idPrefix}-hours`)?.value) || 0;
    const minutes = parseInt(document.getElementById(`${idPrefix}-minutes`)?.value) || 0;
    
    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}min`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}min`;
    }
    
    return '';
}
```

**Ejemplos:**
- hours=2, minutes=30 → "2h 30min"
- hours=1, minutes=0 → "1h"
- hours=0, minutes=45 → "45min"
- hours=0, minutes=0 → ""

#### 1.3 populateTimeInput(idPrefix, timeString)

Extrae horas y minutos de un string formateado y los carga en los campos.

**Parámetros:**
```javascript
idPrefix: string    // Prefijo de los IDs
timeString: string  // String de tiempo (ej: "2h 30min")
```

**Retorna:** void

**Lógica:**
```javascript
populateTimeInput(idPrefix, timeString) {
    const hoursInput = document.getElementById(`${idPrefix}-hours`);
    const minutesInput = document.getElementById(`${idPrefix}-minutes`);
    
    if (!hoursInput || !minutesInput) return;
    
    if (timeString && timeString.trim() !== '') {
        // Parse formats like "2h 30min", "1h", "45min"
        const hoursMatch = timeString.match(/(\d+)\s*h/);
        const minutesMatch = timeString.match(/(\d+)\s*min/);
        
        hoursInput.value = hoursMatch ? hoursMatch[1] : '';
        minutesInput.value = minutesMatch ? minutesMatch[1] : '';
    } else {
        hoursInput.value = '';
        minutesInput.value = '';
    }
}
```

#### 1.4 validateTimeInput(idPrefix)

Valida que los valores de tiempo sean correctos.

**Parámetros:**
```javascript
idPrefix: string  // Prefijo de los IDs
```

**Retorna:** Object con resultado de validación

**Lógica:**
```javascript
validateTimeInput(idPrefix) {
    const hours = parseInt(document.getElementById(`${idPrefix}-hours`)?.value) || 0;
    const minutes = parseInt(document.getElementById(`${idPrefix}-minutes`)?.value) || 0;
    
    const errors = [];
    
    if (hours < 0 || hours > 99) {
        errors.push('Las horas deben estar entre 0 y 99');
    }
    
    if (minutes < 0 || minutes > 59) {
        errors.push('Los minutos deben estar entre 0 y 59');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}
```

#### 1.5 formatTimeForDisplay(timeString)

Convierte un string de tiempo en formato legible para mostrar al usuario.

**Parámetros:**
```javascript
timeString: string  // String de tiempo (ej: "2h 30min")
```

**Retorna:** String formateado para visualización

**Lógica:**
```javascript
formatTimeForDisplay(timeString) {
    if (!timeString || timeString.trim() === '') {
        return '';
    }
    
    const hoursMatch = timeString.match(/(\d+)\s*h/);
    const minutesMatch = timeString.match(/(\d+)\s*min/);
    
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    
    const parts = [];
    
    if (hours > 0) {
        parts.push(hours === 1 ? '1 hora' : `${hours} horas`);
    }
    
    if (minutes > 0) {
        parts.push(minutes === 1 ? '1 minuto' : `${minutes} minutos`);
    }
    
    return parts.join(' ');
}
```

**Ejemplos:**
- "2h 30min" → "2 horas 30 minutos"
- "1h" → "1 hora"
- "45min" → "45 minutos"
- "" → ""

### 2. Modificaciones en RecipeApp

#### 2.1 Actualizar getFormData()

Reemplazar la lógica actual de construcción de `totalTime` con la función `parseTimeInput()`:

```javascript
getFormData() {
    return {
        name: document.getElementById('recipe-name')?.value.trim() || '',
        category: document.getElementById('recipe-category')?.value || null,
        totalTime: this.parseTimeInput('recipe'),  // ← Usar función unificada
        preparationMethod: document.getElementById('preparation-method')?.value.trim() || '',
        author: document.getElementById('recipe-author')?.value.trim() || '',
        history: document.getElementById('recipe-history')?.value.trim() || '',
        ingredients: this.ingredients,
        additionSequences: this.sequences,
        images: this.images,
        videos: this.videos
    };
}
```

#### 2.2 Actualizar populateFormForEdit()

Reemplazar la lógica actual de parseo de `totalTime` con la función `populateTimeInput()`:

```javascript
populateFormForEdit(recipe) {
    // ... código existente ...
    
    // Populate time using unified function
    this.populateTimeInput('recipe', recipe.totalTime || '');
    
    // ... resto del código ...
}
```

#### 2.3 Actualizar handleAddSequence()

Modificar para usar `parseTimeInput()` con el prefijo "sequence":

```javascript
handleAddSequence() {
    const chipsContainer = document.getElementById('sequence-ingredients-chips');
    const descriptionTextarea = document.getElementById('sequence-description');
    const errorMessage = document.getElementById('sequence-error');

    if (!chipsContainer || !descriptionTextarea || !errorMessage) {
        return;
    }

    // Get selected ingredient IDs from chips
    const selectedChips = chipsContainer.querySelectorAll('.sequence-ingredient-chip.selected');
    const ingredientIds = Array.from(selectedChips).map(chip => chip.dataset.ingredientId);
    const duration = this.parseTimeInput('sequence');  // ← Usar función unificada
    const description = descriptionTextarea.value.trim();

    // Validate
    errorMessage.textContent = '';

    if (ingredientIds.length === 0) {
        errorMessage.textContent = 'Debes seleccionar al menos un ingrediente';
        return;
    }

    // Create new sequence
    const sequence = new Sequence({
        step: this.sequences.length + 1,
        ingredientIds: ingredientIds,
        description: description,
        duration: duration
    });

    // Add to sequences array
    this.sequences.push(sequence);

    // Clear inputs
    selectedChips.forEach(chip => chip.classList.remove('selected'));
    this.populateTimeInput('sequence', '');  // ← Limpiar campos de tiempo
    descriptionTextarea.value = '';

    // Re-render sequences list
    this.renderSequencesList();
}
```

#### 2.4 Nueva función: populateSequenceForEdit()

Crear función para cargar datos de secuencia al editar:

```javascript
populateSequenceForEdit(sequence) {
    // Populate ingredient chips
    const chipsContainer = document.getElementById('sequence-ingredients-chips');
    if (chipsContainer) {
        const chips = chipsContainer.querySelectorAll('.sequence-ingredient-chip');
        chips.forEach(chip => {
            if (sequence.ingredientIds.includes(chip.dataset.ingredientId)) {
                chip.classList.add('selected');
            } else {
                chip.classList.remove('selected');
            }
        });
    }
    
    // Populate time using unified function
    this.populateTimeInput('sequence', sequence.duration || '');
    
    // Populate description
    const descriptionTextarea = document.getElementById('sequence-description');
    if (descriptionTextarea) {
        descriptionTextarea.value = sequence.description || '';
    }
}
```

### 3. Modificaciones en HTML

#### 3.1 Actualizar campo de Duración en Secuencias

Reemplazar el campo de texto libre actual con campos de horas y minutos:

**Antes:**
```html
<div class="sequence-input-group">
    <label for="sequence-duration">Duración (opcional)</label>
    <input 
        type="text" 
        id="sequence-duration" 
        class="form-input sequence-input" 
        placeholder="Ej: 5 minutos, 2 horas, 30 seg"
        autocomplete="off"
    >
    <span class="helper-text">Tiempo estimado para esta secuencia</span>
</div>
```

**Después:**
```html
<div class="sequence-input-group">
    <label>Duración (opcional)</label>
    <div class="time-input-group">
        <div class="time-input-item">
            <span class="time-label">Horas</span>
            <input 
                type="number" 
                id="sequence-hours" 
                class="form-input time-input" 
                placeholder="0"
                min="0"
                max="99"
                autocomplete="off"
            >
        </div>
        <div class="time-input-item">
            <span class="time-label">Minutos</span>
            <input 
                type="number" 
                id="sequence-minutes" 
                class="form-input time-input" 
                placeholder="0"
                min="0"
                max="59"
                autocomplete="off"
            >
        </div>
    </div>
    <span class="helper-text">Tiempo estimado para esta secuencia</span>
</div>
```

### 4. Modificaciones en CSS

Los estilos existentes para `.time-input-group`, `.time-input-item`, `.time-label`, y `.time-input` ya están definidos y funcionan correctamente. No se requieren cambios en CSS.

## Data Models

No se requieren cambios en los modelos de datos. Los campos `totalTime` (en Recipe) y `duration` (en Sequence) continúan almacenando strings en el formato "Xh Ymin".

## Error Handling

### Validación de Entrada

- Los campos numéricos tienen atributos `min` y `max` para validación HTML5
- La función `validateTimeInput()` proporciona validación adicional en JavaScript
- Los mensajes de error se muestran en elementos `.error-message` existentes

### Casos Edge

1. **Valores negativos:** Prevenidos por `min="0"` en HTML
2. **Valores fuera de rango:** Validados por `validateTimeInput()`
3. **Valores no numéricos:** Manejados por `parseInt()` que retorna 0 para valores inválidos
4. **Campos vacíos:** Tratados como 0, resultando en string vacío si ambos están vacíos

## Testing Strategy

### Unit Tests (Opcional)

Probar las funciones utilitarias de forma aislada:

1. **parseTimeInput()**
   - Test: hours=2, minutes=30 → "2h 30min"
   - Test: hours=1, minutes=0 → "1h"
   - Test: hours=0, minutes=45 → "45min"
   - Test: hours=0, minutes=0 → ""

2. **populateTimeInput()**
   - Test: "2h 30min" → hours=2, minutes=30
   - Test: "1h" → hours=1, minutes=0
   - Test: "45min" → hours=0, minutes=45
   - Test: "" → hours=0, minutes=0

3. **validateTimeInput()**
   - Test: hours=50, minutes=30 → valid
   - Test: hours=100, minutes=30 → invalid
   - Test: hours=2, minutes=60 → invalid

4. **formatTimeForDisplay()**
   - Test: "2h 30min" → "2 horas 30 minutos"
   - Test: "1h" → "1 hora"
   - Test: "45min" → "45 minutos"

### Integration Tests

Probar el flujo completo de la aplicación:

1. **Crear receta con tiempo total**
   - Ingresar horas y minutos
   - Guardar receta
   - Verificar que se almacena correctamente
   - Editar receta
   - Verificar que los campos se cargan correctamente

2. **Crear secuencia con duración**
   - Ingresar horas y minutos en secuencia
   - Guardar secuencia
   - Verificar que se almacena correctamente
   - Editar secuencia
   - Verificar que los campos se cargan correctamente

3. **Exportar receta con tiempos**
   - Crear receta con tiempo total y secuencias con duración
   - Exportar a XML
   - Verificar formato en XML
   - Exportar a PDF
   - Verificar visualización en PDF

4. **Importar receta con tiempos**
   - Importar XML con tiempo total y duraciones
   - Verificar que se cargan correctamente
   - Editar receta importada
   - Verificar que los campos se muestran correctamente

### Manual Testing

1. Verificar que el campo Tiempo Total mantiene su funcionalidad actual
2. Verificar que el campo Duración ahora usa campos de horas/minutos
3. Verificar que ambos campos tienen el mismo aspecto visual
4. Verificar que la validación funciona correctamente
5. Verificar compatibilidad con recetas existentes

## Migration Strategy

### Backward Compatibility

**No se requiere migración de datos** porque:
- El formato de almacenamiento no cambia (sigue siendo "Xh Ymin")
- Las funciones de parseo son compatibles con el formato existente
- Las recetas existentes se cargarán y mostrarán correctamente

### Rollout Plan

1. Implementar funciones utilitarias en `RecipeApp`
2. Actualizar `getFormData()` y `populateFormForEdit()` para Tiempo Total
3. Actualizar HTML del campo Duración en Secuencias
4. Actualizar `handleAddSequence()` para usar funciones unificadas
5. Implementar edición de secuencias con nuevos campos
6. Probar exhaustivamente con recetas existentes
7. Desplegar cambios

## Performance Considerations

- Las funciones utilitarias son ligeras y no impactan el rendimiento
- No se agregan llamadas adicionales a la base de datos
- El parseo de strings es eficiente usando regex simples
- No hay impacto en el tamaño de almacenamiento

## Security Considerations

- La validación de entrada previene valores fuera de rango
- Los atributos HTML5 `min` y `max` proporcionan primera línea de defensa
- `parseInt()` maneja de forma segura valores no numéricos
- No se introducen nuevos vectores de ataque

## Future Enhancements

1. **Selector de unidades:** Permitir elegir entre horas/minutos, días, segundos
2. **Formato personalizable:** Permitir al usuario elegir el formato de visualización
3. **Cálculos automáticos:** Sumar automáticamente las duraciones de secuencias
4. **Temporizador integrado:** Agregar funcionalidad de temporizador durante la cocina
5. **Conversión de unidades:** Convertir automáticamente entre diferentes unidades de tiempo
