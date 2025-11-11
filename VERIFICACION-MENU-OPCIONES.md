# Verificación de Menú de Opciones

## 📋 Funciones del Menú de Opciones

El menú de opciones tiene 7 botones:

1. ✏️ **Editar** → `showMenuForm(menuId)`
2. 👁️ **Ocultar/Mostrar** → `toggleMenuEnabled(menuId)`
3. 📤 **Exportar XML** → `exportMenu(menuId)` → `exportMenuToXML(menuId)`
4. 📄 **Imprimir PDF** → `printMenuPDF(menuId)`
5. 📋 **Copiar** → `copyMenuToClipboard(menuId)`
6. 📑 **Duplicar** → `duplicateMenu(menuId)`
7. 🗑️ **Eliminar** → `deleteMenu(menuId)`

---

## ✅ Estado de Migración

### 1. ✏️ Editar - `showMenuForm(menuId)`
**Estado:** ⚠️ Parcialmente migrado
**Usa:** `getMenuById()` que está migrado
**Línea:** ~12024

**Verificación:**
```javascript
// Debería funcionar correctamente
```

---

### 2. 👁️ Ocultar/Mostrar - `toggleMenuEnabled(menuId)`
**Estado:** ✅ Migrado correctamente
**Usa:** `menuManager.toggleMenuEnabled(menuId)`
**Línea:** 10588

**Código actual:**
```javascript
toggleMenuEnabled(menuId) {
    this.menuManager.toggleMenuEnabled(menuId);
    const menu = this.menuManager.getMenu(menuId);
    
    if (menu) {
        const status = menu.enabled ? 'habilitado' : 'deshabilitado';
        this.showToast(`Menú ${status} correctamente`, 'success');
        this.renderMenus();
    }
}
```

**✅ Correcto:** Usa MenuManager completamente

---

### 3. 📤 Exportar XML - `exportMenu(menuId)`
**Estado:** ⚠️ Necesita migración
**Usa:** `exportMenuToXML(menuId)` que usa `getMenuById()`
**Línea:** 10787

**Código actual:**
```javascript
exportMenu(menuId) {
    this.exportMenuToXML(menuId);
}
```

**Necesita verificar:** `exportMenuToXML()` en línea ~10751

---

### 4. 📄 Imprimir PDF - `printMenuPDF(menuId)`
**Estado:** ⚠️ Usa `getMenuById()`
**Línea:** 10794

**Código actual:**
```javascript
printMenuPDF(menuId) {
    const menu = this.getMenuById(menuId);
    console.log('Menu:', menu);
    // ... resto del código
}
```

**✅ Correcto:** `getMenuById()` ya está migrado (línea 12458)

---

### 5. 📋 Copiar - `copyMenuToClipboard(menuId)`
**Estado:** ⚠️ Necesita migración
**Línea:** 11109

**Código actual:**
```javascript
copyMenuToClipboard(menuId) {
    const menu = this.getMenuById(menuId);
    if (!menu) return;
    
    // Formato del menú
    let text = `${menu.name}\n`;
    text += '-----------------------------------\n\n';
    
    menu.items.forEach((item, index) => {
        // ... formato
    });
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(text);
}
```

**🔧 Debería usar:** `menuManager.formatForClipboard(menuId)`

---

### 6. 📑 Duplicar - `duplicateMenu(menuId)`
**Estado:** ⚠️ Necesita migración completa
**Línea:** 11139

**Código actual:**
```javascript
duplicateMenu(menuId) {
    const menu = this.getMenuById(menuId);
    if (!menu) return;
    
    const newMenu = {
        ...menu,
        id: Date.now(),
        name: `${menu.name} (copia)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFilter: false
    };
    
    this.menuManager.menus.push(newMenu);
    this.menuManager.saveMenus();
    
    this.showToast('Menú duplicado correctamente', 'success');
    this.renderMenus();
}
```

**🔧 Debería usar:** `menuManager.duplicateMenu(menuId)`

---

### 7. 🗑️ Eliminar - `deleteMenu(menuId)`
**Estado:** ✅ Migrado correctamente
**Línea:** 11767

**Código actual:**
```javascript
deleteMenu(menuId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este menú?')) {
        return;
    }
    
    const menu = this.menuManager.getMenu(menuId);
    
    if (menu && menu.isFilter && this.activeMenuFilter === menuId) {
        this.clearMenuFilter();
    }
    
    this.menuManager.deleteMenu(menuId);
    
    this.showToast('Menú eliminado correctamente', 'success');
    this.renderMenus();
}
```

**✅ Correcto:** Usa MenuManager completamente

---

## 🔧 Funciones que Necesitan Corrección

### 1. `copyMenuToClipboard()` - Línea 11109

**Problema:** Formatea el texto manualmente en lugar de usar MenuManager

**Solución:**
```javascript
// ANTES
copyMenuToClipboard(menuId) {
    const menu = this.getMenuById(menuId);
    if (!menu) return;
    
    let text = `${menu.name}\n`;
    text += '-----------------------------------\n\n';
    // ... 20 líneas más de formateo manual
    
    navigator.clipboard.writeText(text);
}

// DESPUÉS
copyMenuToClipboard(menuId) {
    const text = this.menuManager.formatForClipboard(menuId);
    
    if (!text) {
        this.showError('No se pudo copiar el menú');
        return;
    }
    
    navigator.clipboard.writeText(text)
        .then(() => {
            this.showToast('Menú copiado al portapapeles', 'success');
        })
        .catch(err => {
            console.error('[Menu] Error copying to clipboard:', err);
            this.showError('Error al copiar al portapapeles');
        });
}
```

---

### 2. `duplicateMenu()` - Línea 11139

**Problema:** Manipula directamente `menuManager.menus` en lugar de usar el método

**Solución:**
```javascript
// ANTES
duplicateMenu(menuId) {
    const menu = this.getMenuById(menuId);
    if (!menu) return;
    
    const newMenu = { ...menu, id: Date.now(), ... };
    this.menuManager.menus.push(newMenu);
    this.menuManager.saveMenus();
}

// DESPUÉS
duplicateMenu(menuId) {
    const duplicated = this.menuManager.duplicateMenu(menuId);
    
    if (!duplicated) {
        this.showError('No se pudo duplicar el menú');
        return;
    }
    
    this.showToast('Menú duplicado correctamente', 'success');
    this.renderMenus();
}
```

---

### 3. `exportMenuToXML()` - Línea ~10751

**Necesita verificar:** Si usa MenuManager o genera XML manualmente

---

## 📊 Resumen

| Función | Estado | Acción Necesaria |
|---------|--------|------------------|
| Editar | ✅ OK | Ninguna |
| Ocultar/Mostrar | ✅ OK | Ninguna |
| Exportar XML | ⚠️ Verificar | Revisar implementación |
| Imprimir PDF | ✅ OK | Ninguna (usa getMenuById migrado) |
| Copiar | 🔧 Corregir | Usar `menuManager.formatForClipboard()` |
| Duplicar | 🔧 Corregir | Usar `menuManager.duplicateMenu()` |
| Eliminar | ✅ OK | Ninguna |

**Total:**
- ✅ Funcionan: 4/7 (57%)
- 🔧 Necesitan corrección: 2/7 (29%)
- ⚠️ Necesitan verificación: 1/7 (14%)

---

## 🧪 Plan de Pruebas

### Test 1: Ocultar/Mostrar ✅
1. Abrir menú de opciones
2. Click en "Ocultar"
3. Verificar que el menú se mueve a "Ocultos"
4. Click en "Mostrar"
5. Verificar que vuelve a la lista principal

**Resultado esperado:** ✅ Funciona

---

### Test 2: Eliminar ✅
1. Crear un menú de prueba
2. Abrir menú de opciones
3. Click en "Eliminar"
4. Confirmar
5. Verificar que desaparece

**Resultado esperado:** ✅ Funciona

---

### Test 3: Copiar ⚠️
1. Abrir menú de opciones
2. Click en "Copiar"
3. Pegar en un editor de texto

**Resultado esperado:** ⚠️ Puede funcionar pero no usa MenuManager

---

### Test 4: Duplicar ⚠️
1. Abrir menú de opciones
2. Click en "Duplicar"
3. Verificar que aparece "(copia)"

**Resultado esperado:** ⚠️ Puede funcionar pero no usa MenuManager

---

## 🎯 Próximos Pasos

1. ✅ Corregir `copyMenuToClipboard()`
2. ✅ Corregir `duplicateMenu()`
3. ⚠️ Verificar `exportMenuToXML()`
4. ✅ Probar todas las funciones
