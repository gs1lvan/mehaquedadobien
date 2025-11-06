# 🧹 Cambios: Limpiar Selección al Abrir Modal de Categorías

**Fecha:** 6 de noviembre de 2025  
**Hora:** 17:15

---

## 🎯 Problema Identificado

Al abrir el modal de selector de categorías desde el contexto de menús:
- ❌ Podía haber una categoría pre-seleccionada del formulario de recetas
- ❌ El footer con botones se mostraba inmediatamente
- ❌ No había un estado "limpio" al abrir el modal

---

## ✅ Solución Implementada

### **1. Modificación de `openCategorySelectorForMenu()`**

**Archivo:** `script.js`

Se añadió lógica para limpiar el estado al abrir el modal:

```javascript
openCategorySelectorForMenu(inputElement) {
    // Store reference to the input element
    this.currentMenuCategoryInput = inputElement;
    
    // Open the category selector modal (same as recipe form)
    const modal = document.getElementById('category-selector-modal');
    if (!modal) return;

    // Clear any pending selection
    this.pendingMenuInput = null;

    // Render categories in modal (without any pre-selection)
    this.renderCategorySelectorChips(false);

    // Remove any selected class from all chips (ensure clean state)
    const container = document.getElementById('category-selector-chips');
    if (container) {
        container.querySelectorAll('.category-selector-chip').forEach(chip => {
            chip.classList.remove('selected');
        });
    }

    // Hide footer initially (show only when category is selected)
    const footer = document.getElementById('category-selector-footer');
    if (footer) {
        footer.style.display = 'none';
    }

    // Show modal
    modal.classList.remove('hidden');
    
    // ... resto del código
}
```

**Cambios clave:**
1. ✅ `this.pendingMenuInput = null` → Limpia selección pendiente
2. ✅ `renderCategorySelectorChips(false)` → No pre-selecciona ninguna categoría
3. ✅ Quita clase `selected` de todos los chips → Estado limpio garantizado
4. ✅ `footer.style.display = 'none'` → Oculta botones hasta que se seleccione

---

### **2. Modificación de `renderCategorySelectorChips()`**

**Archivo:** `script.js`

Se añadió un parámetro opcional para controlar la pre-selección:

```javascript
renderCategorySelectorChips(preSelectCategory = true) {
    const container = document.getElementById('category-selector-chips');
    if (!container) {
        console.error('Container category-selector-chips not found');
        return;
    }

    container.innerHTML = '';

    // Only check for current value if preSelectCategory is true (recipe form context)
    let currentValue = '';
    if (preSelectCategory) {
        const categoryInput = document.getElementById('recipe-category');
        currentValue = categoryInput ? categoryInput.value : '';
    }

    // Add all categories
    const categories = this.categoryManager.getAllCategories(true)
        .filter(cat => !cat.isSpecial);

    categories.forEach(category => {
        const chip = document.createElement('button');
        chip.className = 'category-selector-chip';
        // Only pre-select if preSelectCategory is true and matches current value
        if (preSelectCategory && category.id === currentValue) {
            chip.classList.add('selected');
        }
        // ... resto del código
    });
}
```

**Parámetro `preSelectCategory`:**
- `true` (default) → Contexto de formulario de recetas, pre-selecciona categoría actual
- `false` → Contexto de menús, NO pre-selecciona ninguna categoría

---

## 🔄 Flujo Actualizado

### **Al Abrir Modal desde Menús:**

```
1. Usuario hace click en input de receta
   ↓
2. Se llama openCategorySelectorForMenu()
   ↓
3. Se limpia pendingMenuInput
   ↓
4. Se renderiza modal SIN pre-selección (false)
   ↓
5. Se quitan todas las clases 'selected'
   ↓
6. Se oculta el footer (botones)
   ↓
7. Modal se muestra LIMPIO
```

### **Al Seleccionar Categoría:**

```
1. Usuario hace click en "Carne"
   ↓
2. Se quita 'selected' de todos los chips
   ↓
3. Se añade 'selected' a "Carne"
   ↓
4. Se actualiza input: "🥩 Carne"
   ↓
5. Se verifica si hay recetas
   ↓
6. Se muestra footer con botones
   ↓
7. Se habilitan/deshabilitan botones según recetas
```

### **Al Cambiar de Categoría:**

```
1. Usuario hace click en "Pescado" (tenía "Carne" seleccionada)
   ↓
2. Se quita 'selected' de "Carne"
   ↓
3. Se añade 'selected' a "Pescado"
   ↓
4. Se actualiza input: "🐟 Pescado"
   ↓
5. Se verifica si hay recetas de pescado
   ↓
6. Se actualizan botones según nuevas recetas
```

---

## 🎨 Estados del Modal

### **Estado Inicial (Limpio)**
```
Modal abierto:
├─ ❌ Ninguna categoría seleccionada
├─ ❌ Footer oculto
├─ ❌ Botones no visibles
└─ ✅ Todas las categorías en estado neutral
```

### **Estado con Categoría Seleccionada**
```
Usuario selecciona "Carne":
├─ ✅ "Carne" marcada con clase 'selected'
├─ ✅ Footer visible
├─ ✅ Botón "Confirmar" habilitado
└─ ✅/❌ Botón "Ver Recetas →" según disponibilidad
```

### **Estado al Cambiar Categoría**
```
Usuario cambia de "Carne" a "Pescado":
├─ ❌ "Carne" desmarcada (sin 'selected')
├─ ✅ "Pescado" marcada (con 'selected')
├─ ✅ Input actualizado a "🐟 Pescado"
└─ ✅ Botones actualizados según recetas de pescado
```

---

## 📊 Comparación: Antes vs Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| Al abrir modal | ⚠️ Podía tener categoría pre-seleccionada | ✅ Siempre limpio, sin selección |
| Footer | ⚠️ Visible desde el inicio | ✅ Oculto hasta seleccionar |
| Cambiar categoría | ✅ Funcionaba | ✅ Funcionaba (sin cambios) |
| Estado consistente | ❌ Inconsistente | ✅ Siempre consistente |

---

## 🧪 Casos de Prueba

### **Caso 1: Abrir Modal por Primera Vez**
1. Abrir modal de menú
2. Añadir elemento
3. Click en input de receta
4. ✅ **Esperado:** Modal limpio, sin categorías seleccionadas, footer oculto

### **Caso 2: Seleccionar Categoría**
1. Abrir modal (limpio)
2. Click en "Carne"
3. ✅ **Esperado:** "Carne" seleccionada, footer visible, botones habilitados

### **Caso 3: Cambiar de Categoría**
1. Seleccionar "Carne"
2. Click en "Pescado"
3. ✅ **Esperado:** "Carne" desmarcada, "Pescado" seleccionada, input actualizado

### **Caso 4: Cerrar y Reabrir Modal**
1. Seleccionar "Carne"
2. Cerrar modal con X
3. Reabrir modal
4. ✅ **Esperado:** Modal limpio, sin "Carne" seleccionada, footer oculto

### **Caso 5: Confirmar y Reabrir**
1. Seleccionar "Carne"
2. Click en "Confirmar"
3. Añadir otro elemento
4. Click en input de receta
5. ✅ **Esperado:** Modal limpio, sin "Carne" seleccionada, footer oculto

---

## 🔧 Archivos Modificados

| Archivo | Función | Cambios |
|---------|---------|---------|
| `script.js` | `openCategorySelectorForMenu()` | Añadida lógica de limpieza |
| `script.js` | `renderCategorySelectorChips()` | Añadido parámetro `preSelectCategory` |

---

## ✨ Beneficios

1. **Estado consistente** → Modal siempre se abre limpio
2. **Mejor UX** → Usuario empieza desde cero cada vez
3. **Sin confusión** → No hay categorías pre-seleccionadas inesperadas
4. **Flexibilidad** → Usuario puede cambiar de categoría libremente
5. **Separación de contextos** → Menús y recetas no interfieren entre sí

---

## 📝 Notas Técnicas

### **Contextos del Modal**

El modal de selector de categorías se usa en dos contextos:

1. **Formulario de Recetas** (`preSelectCategory = true`)
   - Pre-selecciona la categoría actual de la receta
   - Footer visible desde el inicio
   - Cierra modal al seleccionar

2. **Menús** (`preSelectCategory = false`)
   - NO pre-selecciona ninguna categoría
   - Footer oculto hasta seleccionar
   - Permite confirmar o ver recetas

### **Lógica de Limpieza**

La limpieza se hace en dos niveles:

1. **Nivel de renderizado:** `renderCategorySelectorChips(false)`
2. **Nivel de DOM:** `querySelectorAll().forEach(chip => chip.classList.remove('selected'))`

Esto garantiza que incluso si hay algún estado residual, se limpia completamente.

---

**Estado:** ✅ Implementado y documentado  
**Versión:** 1.0  
**Requiere pruebas:** ✅ Sí (ver casos de prueba arriba)
