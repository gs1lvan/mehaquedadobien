# MenuManager - Guía de Uso

## 📋 Resumen

`MenuManager` es una clase que gestiona menús semanales siguiendo el mismo patrón que `ShoppingListManager` para mantener consistencia en el código.

---

## 🎯 Comparación: ShoppingListManager vs MenuManager

| Aspecto | ShoppingListManager | MenuManager |
|---------|---------------------|-------------|
| **Storage Key** | `shopping_lists` | `recetario_menus` |
| **Items** | Lista de compra con items | Menú semanal con días |
| **Item Structure** | `{name, quantity, completed}` | `{name, lunch, dinner, completed}` |
| **Enabled** | ✅ Sí | ✅ Sí |
| **Filter** | ❌ No | ✅ Sí (`isFilter`) |
| **Métodos CRUD** | ✅ Completo | ✅ Completo |
| **Reordenamiento** | ❌ No | ✅ Sí |
| **Exportación** | XML, Clipboard | XML, Clipboard |
| **Importación** | XML, Text | XML, Text |

---

## 📦 Estructura de Datos

### Menu Object
```javascript
{
    id: 1699876543210,              // Timestamp único
    name: "Menú Semana 1",          // Nombre del menú
    items: [                         // Array de días
        {
            id: 1699876543211,
            name: "Lunes",
            lunch: "Pasta carbonara",
            dinner: "Ensalada César",
            completed: false         // No usado, heredado de listas
        },
        {
            id: 1699876543212,
            name: "Martes",
            lunch: "Pollo al horno",
            dinner: "Sopa de verduras",
            completed: false
        }
    ],
    enabled: true,                   // Visible/oculto
    isFilter: false,                 // Usado como filtro en home
    createdAt: "2024-11-13T10:30:00.000Z",
    updatedAt: "2024-11-13T10:30:00.000Z"
}
```

---

## 🚀 Uso Básico

### Inicialización

```javascript
// En RecipeApp constructor
class RecipeApp {
    constructor() {
        this.storageManager = new StorageManager();
        this.categoryManager = new CategoryManager();
        this.shoppingListManager = new ShoppingListManager();
        this.menuManager = new MenuManager(); // ✅ Nuevo
    }
}
```

### Crear Menú

```javascript
// Antes (en script.js)
const menu = {
    id: Date.now(),
    name: menuName,
    items: items,
    // ... más propiedades
};
const menus = JSON.parse(localStorage.getItem('recetario_menus') || '[]');
menus.push(menu);
localStorage.setItem('recetario_menus', JSON.stringify(menus));

// Después (con MenuManager)
const menu = this.menuManager.createMenu('Menú Semana 1', [
    { name: 'Lunes', lunch: 'Pasta', dinner: 'Ensalada' },
    { name: 'Martes', lunch: 'Pollo', dinner: 'Sopa' }
]);
```

### Obtener Menú

```javascript
// Antes
const menus = JSON.parse(localStorage.getItem('recetario_menus') || '[]');
const menu = menus.find(m => m.id === menuId);

// Después
const menu = this.menuManager.getMenu(menuId);
```

### Actualizar Menú

```javascript
// Antes
const menus = JSON.parse(localStorage.getItem('recetario_menus') || '[]');
const menu = menus.find(m => m.id === menuId);
menu.name = 'Nuevo nombre';
menu.updatedAt = new Date().toISOString();
localStorage.setItem('recetario_menus', JSON.stringify(menus));

// Después
this.menuManager.updateMenu(menuId, { name: 'Nuevo nombre' });
```

### Eliminar Menú

```javascript
// Antes
const menus = JSON.parse(localStorage.getItem('recetario_menus') || '[]');
const index = menus.findIndex(m => m.id === menuId);
menus.splice(index, 1);
localStorage.setItem('recetario_menus', JSON.stringify(menus));

// Después
this.menuManager.deleteMenu(menuId);
```

---

## 🔧 Métodos Disponibles

### Storage
```javascript
menuManager.loadMenus()              // Carga menús desde localStorage
menuManager.saveMenus()              // Guarda menús en localStorage
```

### CRUD
```javascript
menuManager.createMenu(name, items)  // Crea nuevo menú
menuManager.getMenu(id)              // Obtiene menú por ID
menuManager.getAllMenus()            // Obtiene todos los menús
menuManager.updateMenu(id, updates)  // Actualiza menú
menuManager.deleteMenu(id)           // Elimina menú
menuManager.duplicateMenu(id)        // Duplica menú
```

### Estado
```javascript
menuManager.toggleMenuEnabled(id)    // Habilita/deshabilita menú
menuManager.toggleMenuAsFilter(id)   // Marca/desmarca como filtro
```

### Queries
```javascript
menuManager.getEnabledMenus()        // Obtiene menús habilitados
menuManager.getDisabledMenus()       // Obtiene menús deshabilitados
menuManager.getMenuFilters()         // Obtiene menús marcados como filtros
```

### Items
```javascript
menuManager.addItem(menuId, item)                    // Añade día al menú
menuManager.updateItem(menuId, itemId, updates)      // Actualiza día
menuManager.deleteItem(menuId, itemId)               // Elimina día
menuManager.moveItemUp(menuId, itemIndex)            // Mueve día arriba
menuManager.moveItemDown(menuId, itemIndex)          // Mueve día abajo
```

### Utilidades
```javascript
menuManager.getRecipeNamesFromMenu(menu)             // Extrae nombres de recetas
menuManager.getRecipeMetadataFromMenu(menu)          // Extrae metadata (día, comida/cena)
menuManager.getCategoriesWithMenuRecipes(recipes)    // Agrupa recetas por categoría
```

### Exportación/Importación
```javascript
menuManager.formatForClipboard(menuId)   // Formatea para portapapeles
menuManager.exportToXML(menuId)          // Exporta a XML
menuManager.importFromXML(xmlString)     // Importa desde XML
menuManager.parseFromText(text)          // Parsea desde texto
```

---

## 📝 Ejemplos de Uso en RecipeApp

### Ejemplo 1: Guardar Menú desde Formulario

```javascript
// Antes (script.js línea 12330)
saveMenu() {
    const nameInput = document.getElementById('menu-name-input');
    const menuName = nameInput.value.trim();
    
    // ... 100 líneas de código para recoger items del DOM
    
    const menu = {
        id: this.currentMenuId || Date.now(),
        name: menuName,
        items: items,
        // ... más propiedades
    };
    
    const menus = this.getMenusFromStorage();
    const existingIndex = menus.findIndex(m => m.id === menu.id);
    
    if (existingIndex >= 0) {
        menus[existingIndex] = menu;
    } else {
        menus.push(menu);
    }
    
    localStorage.setItem('recetario_menus', JSON.stringify(menus));
    this.showToast('Menú guardado', 'success');
    this.closeMenuModal();
    this.renderMenus();
}

// Después (con MenuManager)
saveMenu() {
    const nameInput = document.getElementById('menu-name-input');
    const menuName = nameInput.value.trim();
    
    if (!menuName) {
        alert('Por favor, introduce un nombre para el menú');
        return;
    }
    
    // Recoger items del DOM (lógica de UI)
    const items = this.collectMenuItemsFromForm();
    
    // Usar MenuManager para la lógica de negocio
    if (this.currentMenuId) {
        // Actualizar menú existente
        this.menuManager.updateMenu(this.currentMenuId, {
            name: menuName,
            items: items
        });
    } else {
        // Crear nuevo menú
        this.menuManager.createMenu(menuName, items);
    }
    
    this.showToast(`Menú "${menuName}" guardado correctamente`, 'success');
    this.closeMenuModal();
    this.renderMenus();
}
```

### Ejemplo 2: Renderizar Menús

```javascript
// Antes
renderMenus() {
    const container = document.getElementById('menus-container');
    const menus = JSON.parse(localStorage.getItem('recetario_menus') || '[]');
    
    const visibleMenus = menus.filter(m => m.enabled !== false);
    const hiddenMenus = menus.filter(m => m.enabled === false);
    
    // ... renderizar
}

// Después
renderMenus() {
    const container = document.getElementById('menus-container');
    
    const visibleMenus = this.menuManager.getEnabledMenus();
    const hiddenMenus = this.menuManager.getDisabledMenus();
    
    // ... renderizar
}
```

### Ejemplo 3: Filtrar Recetas por Menú

```javascript
// Antes
handleMenuFilterClick(menuId) {
    const menus = JSON.parse(localStorage.getItem('recetario_menus') || '[]');
    const menu = menus.find(m => m.id === menuId);
    
    if (!menu) return;
    
    const recipeNames = new Set();
    menu.items.forEach(item => {
        if (item.lunch && item.lunch !== 'Sin receta') {
            recipeNames.add(item.lunch.toLowerCase());
        }
        if (item.dinner && item.dinner !== 'Sin receta') {
            recipeNames.add(item.dinner.toLowerCase());
        }
    });
    
    // ... filtrar recetas
}

// Después
handleMenuFilterClick(menuId) {
    const menu = this.menuManager.getMenu(menuId);
    if (!menu) return;
    
    const recipeNames = this.menuManager.getRecipeNamesFromMenu(menu);
    
    // ... filtrar recetas
}
```

### Ejemplo 4: Exportar Menú

```javascript
// Antes
exportMenuToXML(menuId) {
    const menus = JSON.parse(localStorage.getItem('recetario_menus') || '[]');
    const menu = menus.find(m => m.id === menuId);
    
    if (!menu) {
        this.showError('Menú no encontrado');
        return;
    }
    
    // ... 50 líneas de código para generar XML
    
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    // ... descargar
}

// Después
exportMenuToXML(menuId) {
    try {
        const xml = this.menuManager.exportToXML(menuId);
        
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `menu-${menuId}.xml`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showToast('Menú exportado correctamente', 'success');
    } catch (error) {
        this.showError('Error al exportar menú: ' + error.message);
    }
}
```

---

## ✅ Ventajas de Usar MenuManager

### 1. Código Más Limpio
```javascript
// ❌ Antes: 14,103 líneas en script.js
// ✅ Después: ~600 líneas en menu-manager.js + código más limpio en app.js
```

### 2. Separación de Responsabilidades
```javascript
// MenuManager: Lógica de negocio
menuManager.createMenu(name, items);

// RecipeApp: Lógica de UI
this.showToast('Menú guardado', 'success');
this.renderMenus();
```

### 3. Testeable
```javascript
// test/menu-manager.test.js
test('should create menu', () => {
    const menuManager = new MenuManager();
    const menu = menuManager.createMenu('Test', []);
    expect(menu.name).toBe('Test');
});
```

### 4. Reutilizable
```javascript
// Puedes usar MenuManager en otros proyectos
import { MenuManager } from './menu-manager.js';
const menus = new MenuManager();
```

### 5. Consistente
```javascript
// Mismo patrón que ShoppingListManager y CategoryManager
this.categoryManager.createCategory(data);
this.shoppingListManager.createList(name);
this.menuManager.createMenu(name, items); // ✅ Consistente
```

---

## 🔄 Plan de Migración

### Paso 1: Añadir MenuManager a index.html
```html
<script src="menu-manager.js"></script>
<script src="script.js"></script>
```

### Paso 2: Inicializar en RecipeApp
```javascript
constructor() {
    // ... otros managers
    this.menuManager = new MenuManager();
}
```

### Paso 3: Reemplazar Funciones Gradualmente
1. ✅ `getMenusFromStorage()` → `menuManager.getAllMenus()`
2. ✅ `getMenuById()` → `menuManager.getMenu()`
3. ✅ `saveMenu()` → `menuManager.createMenu()` / `updateMenu()`
4. ✅ `deleteMenu()` → `menuManager.deleteMenu()`
5. ✅ `duplicateMenu()` → `menuManager.duplicateMenu()`
6. ✅ `toggleMenuEnabled()` → `menuManager.toggleMenuEnabled()`
7. ✅ `toggleMenuAsFilter()` → `menuManager.toggleMenuAsFilter()`
8. ✅ `moveMenuItemUp()` → `menuManager.moveItemUp()`
9. ✅ `moveMenuItemDown()` → `menuManager.moveItemDown()`
10. ✅ `exportMenuToXML()` → `menuManager.exportToXML()`

### Paso 4: Eliminar Código Duplicado de script.js
Una vez migradas todas las funciones, eliminar las versiones antiguas de script.js.

---

## 📊 Comparación de Líneas de Código

| Archivo | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| script.js | 14,103 | ~10,500 | -3,600 |
| menu-manager.js | 0 | ~600 | +600 |
| **Total** | 14,103 | 11,100 | **-3,000** |

**Beneficio:** Código más organizado y mantenible, aunque el total sea similar.

---

## 🎯 Conclusión

`MenuManager` sigue el mismo patrón que `ShoppingListManager`, proporcionando:

✅ **Consistencia** - Mismo patrón que otros managers
✅ **Separación** - Lógica de negocio separada de UI
✅ **Testeable** - Fácil de probar unitariamente
✅ **Reutilizable** - Puede usarse en otros proyectos
✅ **Mantenible** - Más fácil encontrar y modificar código

**Próximo paso:** Integrar MenuManager en RecipeApp y migrar funciones gradualmente.
