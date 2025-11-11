# Design Document - Eliminación de script.js

## Overview

Este documento describe el diseño técnico para completar la migración de `script.js` (1,130 líneas) a una arquitectura modular completa. El diseño se basa en el trabajo ya realizado en las Fases 1-3 del spec `javascript-audit` y completa las Fases 4-5 del plan de refactorización.

**Estado actual:**
- ✅ 8 módulos creados (~2,200 líneas)
- ✅ Servicios: RecipeService, CategoryService, XMLService
- ✅ Utilidades: validation.js, dom.js, storage.js, format.js
- ✅ Core: EventBus.js
- ⏳ script.js: 1,130 líneas (reducido desde 14,102)

**Objetivo final:**
- Eliminar script.js completamente
- Crear main.js (<50 líneas) como punto de entrada
- Migrar toda funcionalidad a módulos especializados
- Mantener 100% de funcionalidad existente

## Architecture

### Estructura de Carpetas Final

```
raíz/
├── main.js                    # ⭐ NUEVO - Punto de entrada (<50 líneas)
├── script.js.backup           # ⭐ NUEVO - Backup antes de eliminar
├── sw.js                      # Service Worker (debe estar en raíz)
├── recipe-manager.js          # Específico de recipe-manager.html
└── js/
    ├── core/
    │   ├── EventBus.js        # ✅ Existente - Sistema de eventos
    │   └── App.js             # ⭐ NUEVO - Orquestador principal
    ├── utils/
    │   ├── validation.js      # ✅ Existente
    │   ├── dom.js             # ✅ Existente
    │   ├── storage.js         # ✅ Existente
    │   └── format.js          # ✅ Existente
    ├── services/
    │   ├── RecipeService.js   # ✅ Existente
    │   ├── CategoryService.js # ✅ Existente (migrar CategoryManager aquí)
    │   ├── XMLService.js      # ✅ Existente
    │   ├── ShoppingListService.js  # ⭐ NUEVO - Migrar ShoppingListManager
    │   └── MenuService.js     # ⭐ NUEVO - Lógica de menús
    ├── ui/
    │   ├── ModalManager.js    # ⭐ NUEVO - Gestión de modales
    │   ├── NotificationManager.js  # ⭐ NUEVO - Toasts/notificaciones
    │   └── ThemeManager.js    # ⭐ NUEVO - Tema claro/oscuro
    ├── features/
    │   ├── recipes/
    │   │   ├── RecipeList.js  # ⭐ NUEVO - Lista/grid de recetas
    │   │   ├── RecipeDetail.js # ⭐ NUEVO - Vista detalle
    │   │   └── RecipeForm.js  # ⭐ NUEVO - Formulario crear/editar
    │   ├── shopping-lists/
    │   │   └── ShoppingListView.js  # ⭐ NUEVO - Vista listas compra
    │   ├── menus/
    │   │   └── MenuView.js    # ⭐ NUEVO - Vista menús
    │   └── filters/
    │       └── FilterManager.js  # ⭐ NUEVO - Gestión de filtros
    ├── models/
    │   └── (pendiente - migrar models.js)
    └── constants/
        ├── categories.js      # ✅ Existente
        ├── appliances.js      # ✅ Existente
        └── xml-constants.js   # ✅ Existente
```

### Flujo de Inicialización

```
1. index.html carga main.js (type="module")
   ↓
2. main.js importa App.js
   ↓
3. App.js importa servicios y componentes
   ↓
4. App.init() inicializa servicios
   ↓
5. App.init() inicializa componentes UI
   ↓
6. App.init() renderiza vista inicial
   ↓
7. Componentes escuchan eventos del EventBus
   ↓
8. Usuario interactúa → Componentes → Servicios → EventBus → Componentes
```

## Components and Interfaces

### 1. main.js (Punto de Entrada)

**Responsabilidad:** Inicializar la aplicación

**Tamaño:** <50 líneas

**Código:**
```javascript
// main.js
import { App } from './js/core/App.js';

// Inicializar aplicación cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

async function initApp() {
    try {
        const app = new App();
        await app.init();
        
        // Hacer disponible globalmente para debugging (solo en desarrollo)
        if (window.location.hostname === 'localhost') {
            window.app = app;
        }
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        showFatalError(error);
    }
}

function showFatalError(error) {
    document.body.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h1>Error al cargar la aplicación</h1>
            <p>${error.message}</p>
            <button onclick="location.reload()">Recargar</button>
        </div>
    `;
}
```

### 2. App.js (Orquestador Principal)

**Responsabilidad:** Coordinar servicios y componentes, sin lógica de negocio ni UI

**Interfaz:**
```javascript
class App {
    constructor() {
        // Referencias a servicios
        this.recipeService = null;
        this.categoryService = null;
        this.xmlService = null;
        this.shoppingListService = null;
        this.menuService = null;
        
        // Referencias a componentes UI
        this.modalManager = null;
        this.notificationManager = null;
        this.themeManager = null;
        this.recipeList = null;
        this.recipeDetail = null;
        this.recipeForm = null;
        this.filterManager = null;
        
        // Estado de la aplicación
        this.currentView = 'list';
        this.currentRecipe = null;
    }
    
    async init() {
        // 1. Inicializar servicios
        await this.initServices();
        
        // 2. Inicializar componentes UI
        this.initUIComponents();
        
        // 3. Setup event listeners globales
        this.setupEventListeners();
        
        // 4. Renderizar vista inicial
        this.renderInitialView();
    }
    
    async initServices() { }
    initUIComponents() { }
    setupEventListeners() { }
    renderInitialView() { }
    
    // Métodos de navegación
    showRecipeList() { }
    showRecipeDetail(id) { }
    showRecipeForm(id = null) { }
    showShoppingLists() { }
    showMenus() { }
}
```

### 3. ModalManager (Gestión de Modales)

**Responsabilidad:** Gestionar apertura/cierre de todos los modales

**Interfaz:**
```javascript
class ModalManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.modalStack = []; // Stack para modales anidados
        this.isClosing = false;
    }
    
    // Métodos principales
    open(modalId, options = {}) { }
    close(modalId) { }
    closeAll() { }
    closeTop() { }
    
    // Helpers
    isOpen(modalId) { }
    getTopModal() { }
    
    // Setup
    setupModal(modalId, config) { }
    setupEscapeKey() { }
}
```

**Modales a gestionar:**
- category-modal
- edit-category-modal
- emoji-picker-modal
- color-picker-modal
- category-selector-modal
- image-modal
- photo-gallery-modal
- settings-modal
- help-modal
- confirm-delete-modal

### 4. NotificationManager (Toasts y Notificaciones)

**Responsabilidad:** Mostrar mensajes de éxito, error, warning, info

**Interfaz:**
```javascript
class NotificationManager {
    constructor() {
        this.container = null;
        this.queue = [];
        this.currentToast = null;
    }
    
    // Métodos principales
    success(message, duration = 3000) { }
    error(message, duration = 5000) { }
    warning(message, duration = 4000) { }
    info(message, duration = 3000) { }
    
    // Helpers
    show(message, type, duration) { }
    hide() { }
    createToast(message, type) { }
}
```

### 5. ThemeManager (Gestión de Temas)

**Responsabilidad:** Gestionar tema claro/oscuro y persistencia

**Interfaz:**
```javascript
class ThemeManager {
    constructor(storage) {
        this.storage = storage;
        this.currentTheme = 'light';
    }
    
    // Métodos principales
    init() { }
    toggle() { }
    setTheme(theme) { }
    getTheme() { }
    
    // Helpers
    applyTheme(theme) { }
    saveTheme(theme) { }
    loadTheme() { }
}
```

### 6. RecipeList (Lista/Grid de Recetas)

**Responsabilidad:** Renderizar lista de recetas en modo grid o list

**Interfaz:**
```javascript
class RecipeList {
    constructor(recipeService, categoryService, eventBus) {
        this.recipeService = recipeService;
        this.categoryService = categoryService;
        this.eventBus = eventBus;
        this.viewMode = 'grid'; // 'grid' o 'list'
        this.sortBy = 'date';
        this.sortOrder = 'desc';
    }
    
    // Métodos principales
    render(recipes) { }
    setViewMode(mode) { }
    setSorting(field, order) { }
    
    // Helpers
    renderGrid(recipes) { }
    renderList(recipes) { }
    renderRecipeCard(recipe) { }
    renderRecipeRow(recipe) { }
    
    // Event handlers
    handleRecipeClick(recipeId) { }
    handleEditClick(recipeId) { }
    handleDeleteClick(recipeId) { }
}
```

### 7. RecipeDetail (Vista de Detalle)

**Responsabilidad:** Mostrar detalle completo de una receta

**Interfaz:**
```javascript
class RecipeDetail {
    constructor(recipeService, categoryService, eventBus) {
        this.recipeService = recipeService;
        this.categoryService = categoryService;
        this.eventBus = eventBus;
    }
    
    // Métodos principales
    render(recipeId) { }
    
    // Helpers
    renderHeader(recipe) { }
    renderIngredients(recipe) { }
    renderSequences(recipe) { }
    renderImages(recipe) { }
    renderMetadata(recipe) { }
    
    // Event handlers
    handleEditClick() { }
    handleDeleteClick() { }
    handleDuplicateClick() { }
    handleExportClick() { }
}
```

### 8. RecipeForm (Formulario Crear/Editar)

**Responsabilidad:** Formulario para crear o editar recetas

**Interfaz:**
```javascript
class RecipeForm {
    constructor(recipeService, categoryService, eventBus) {
        this.recipeService = recipeService;
        this.categoryService = categoryService;
        this.eventBus = eventBus;
        this.currentRecipe = null;
        this.ingredients = [];
        this.sequences = [];
        this.images = [];
        this.selectedAppliances = [];
    }
    
    // Métodos principales
    render(recipeId = null) { }
    save() { }
    cancel() { }
    
    // Gestión de ingredientes
    addIngredient() { }
    editIngredient(id) { }
    deleteIngredient(id) { }
    reorderIngredients() { }
    
    // Gestión de secuencias
    addSequence() { }
    editSequence(id) { }
    deleteSequence(id) { }
    reorderSequences() { }
    
    // Gestión de imágenes
    addImage(file) { }
    deleteImage(id) { }
    
    // Validación
    validate() { }
}
```

### 9. FilterManager (Gestión de Filtros)

**Responsabilidad:** Gestionar filtros de categoría, tiempo, menú, búsqueda

**Interfaz:**
```javascript
class FilterManager {
    constructor(categoryService, eventBus) {
        this.categoryService = categoryService;
        this.eventBus = eventBus;
        this.activeFilters = new Set();
        this.activeTimeFilter = 'all';
        this.activeMenuFilter = null;
        this.searchQuery = '';
    }
    
    // Métodos principales
    renderFilterChips() { }
    applyFilters(recipes) { }
    clearAllFilters() { }
    
    // Filtros específicos
    toggleCategoryFilter(categoryId) { }
    setTimeFilter(timeRange) { }
    setMenuFilter(menuId) { }
    setSearchQuery(query) { }
    
    // Helpers
    getActiveFiltersCount() { }
    hasActiveFilters() { }
}
```

### 10. ShoppingListService (Servicio de Listas de Compra)

**Responsabilidad:** Lógica de negocio de listas de compra (migrado desde ShoppingListManager)

**Interfaz:**
```javascript
class ShoppingListService {
    constructor(storage, eventBus) {
        this.storage = storage;
        this.eventBus = eventBus;
        this.storageKey = 'shopping_lists';
    }
    
    // CRUD de listas
    getAll() { }
    getById(id) { }
    create(name) { }
    update(id, updates) { }
    delete(id) { }
    toggleEnabled(id) { }
    
    // CRUD de items
    addItem(listId, item) { }
    updateItem(listId, itemId, updates) { }
    deleteItem(listId, itemId) { }
    toggleItemCompleted(listId, itemId) { }
    
    // Utilidades
    getCompletedCount(listId) { }
    getTotalCount(listId) { }
    isListComplete(listId) { }
    formatForClipboard(listId, includeCompleted) { }
    
    // Import/Export
    export() { }
    import(data) { }
}
```

### 11. MenuService (Servicio de Menús)

**Responsabilidad:** Lógica de negocio de menús semanales

**Interfaz:**
```javascript
class MenuService {
    constructor(storage, eventBus) {
        this.storage = storage;
        this.eventBus = eventBus;
        this.storageKey = 'menus';
    }
    
    // CRUD de menús
    getAll() { }
    getById(id) { }
    create(name) { }
    update(id, updates) { }
    delete(id) { }
    
    // Gestión de días/comidas
    setRecipe(menuId, day, meal, recipeId) { }
    clearRecipe(menuId, day, meal) { }
    getRecipe(menuId, day, meal) { }
    
    // Utilidades
    getRecipesForMenu(menuId) { }
    getShoppingListForMenu(menuId) { }
    
    // Export
    exportToPDF(menuId) { }
}
```

## Data Models

### App State

```javascript
{
    currentView: 'list' | 'detail' | 'form' | 'shopping-lists' | 'menus',
    currentRecipe: Recipe | null,
    filters: {
        categories: Set<string>,
        timeRange: 'all' | '0-30' | '30-60' | '60+',
        menuId: string | null,
        search: string
    },
    viewMode: 'grid' | 'list',
    sorting: {
        field: 'name' | 'date',
        order: 'asc' | 'desc'
    }
}
```

### Modal State

```javascript
{
    modalStack: [
        {
            id: 'category-modal',
            options: { ... },
            openedAt: timestamp
        }
    ],
    isClosing: boolean
}
```

## Error Handling

### Estrategia de Manejo de Errores

1. **Errores de Servicios**
   - Capturar en servicios
   - Emitir evento de error
   - NotificationManager muestra mensaje

2. **Errores de Componentes**
   - Try-catch en métodos críticos
   - Fallback a estado seguro
   - Notificar al usuario

3. **Errores de Inicialización**
   - Capturar en App.init()
   - Mostrar pantalla de error fatal
   - Ofrecer botón de recarga

### Ejemplo de Manejo

```javascript
// En servicio
async create(recipe) {
    try {
        const created = await this.storage.save(recipe);
        this.eventBus.emit(Events.RECIPE_CREATED, created);
        return created;
    } catch (error) {
        console.error('[RecipeService] Error creating recipe:', error);
        this.eventBus.emit(Events.ERROR, {
            message: 'Error al crear la receta',
            error: error
        });
        throw error;
    }
}

// En App
setupEventListeners() {
    this.eventBus.on(Events.ERROR, (data) => {
        this.notificationManager.error(data.message);
    });
}
```

## Testing Strategy

### Niveles de Testing

1. **Unit Tests** (Servicios y Utilidades)
   ```javascript
   // RecipeService.test.js
   describe('RecipeService', () => {
       test('should create recipe', async () => {
           const service = new RecipeService(mockStorage, mockEventBus);
           const recipe = await service.create({ name: 'Test' });
           expect(recipe.id).toBeDefined();
       });
   });
   ```

2. **Integration Tests** (Componentes + Servicios)
   ```javascript
   // RecipeForm.test.js
   describe('RecipeForm', () => {
       test('should save recipe and emit event', async () => {
           const form = new RecipeForm(recipeService, categoryService, eventBus);
           await form.save();
           expect(eventBus.emit).toHaveBeenCalledWith(Events.RECIPE_CREATED);
       });
   });
   ```

3. **E2E Tests** (Flujos completos)
   ```javascript
   // create-recipe.e2e.js
   describe('Create Recipe Flow', () => {
       test('user can create a recipe', async () => {
           // 1. Click new recipe button
           // 2. Fill form
           // 3. Save
           // 4. Verify recipe appears in list
       });
   });
   ```

### Testing de Migración

**Checklist de verificación:**
- [ ] Todas las funcionalidades de script.js funcionan con main.js
- [ ] No hay errores en consola
- [ ] No hay referencias globales rotas
- [ ] Todos los modales funcionan
- [ ] Todos los filtros funcionan
- [ ] CRUD de recetas funciona
- [ ] CRUD de categorías funciona
- [ ] CRUD de listas de compra funciona
- [ ] CRUD de menús funciona
- [ ] Import/Export XML funciona
- [ ] Tema claro/oscuro funciona
- [ ] Notificaciones funcionan

## Migration Strategy

### Fase 4: Crear Componentes UI (3-5 días)

**Orden de implementación:**

1. **Día 1: Managers básicos**
   - [ ] NotificationManager.js
   - [ ] ThemeManager.js
   - [ ] Integrar en App.js
   - [ ] Testear funcionalidad básica

2. **Día 2: ModalManager**
   - [ ] ModalManager.js
   - [ ] Migrar gestión de modales desde RecipeApp
   - [ ] Testear todos los modales

3. **Día 3: Servicios faltantes**
   - [ ] ShoppingListService.js (migrar ShoppingListManager)
   - [ ] MenuService.js (extraer de RecipeApp)
   - [ ] Actualizar CategoryService (migrar CategoryManager)

4. **Día 4: Componentes de recetas**
   - [ ] RecipeList.js
   - [ ] RecipeDetail.js
   - [ ] FilterManager.js

5. **Día 5: RecipeForm y vistas adicionales**
   - [ ] RecipeForm.js
   - [ ] ShoppingListView.js
   - [ ] MenuView.js

### Fase 5: Migración Final (2-3 días)

**Orden de implementación:**

1. **Día 1: Crear App.js y main.js**
   - [ ] Crear js/core/App.js
   - [ ] Migrar lógica de inicialización
   - [ ] Crear main.js
   - [ ] Testear inicialización

2. **Día 2: Integración y testing**
   - [ ] Conectar todos los componentes
   - [ ] Reemplazar llamadas directas con EventBus
   - [ ] Testing exhaustivo
   - [ ] Fix de bugs

3. **Día 3: Limpieza y deployment**
   - [ ] Renombrar script.js a script.js.backup
   - [ ] Actualizar index.html
   - [ ] Eliminar código temporal
   - [ ] Verificación final
   - [ ] Eliminar script.js.backup si todo funciona

### Estrategia de Rollback

**Si algo falla:**

1. Revertir index.html a usar script.js
2. Restaurar desde script.js.backup
3. Mantener nuevos módulos para uso futuro
4. Analizar qué falló
5. Corregir y reintentar

**Backup antes de migración:**
```bash
# Crear branch de backup
git checkout -b backup-before-script-migration
git add .
git commit -m "Backup before eliminating script.js"
git checkout main

# Copiar script.js
cp script.js script.js.backup
```

## Performance Considerations

### Lazy Loading de Módulos

**Módulos críticos (carga inmediata):**
- App.js
- RecipeService.js
- CategoryService.js
- RecipeList.js
- NotificationManager.js
- ThemeManager.js

**Módulos no críticos (lazy load):**
- RecipeForm.js (solo al crear/editar)
- RecipeDetail.js (solo al ver detalle)
- ShoppingListView.js (solo al abrir listas)
- MenuView.js (solo al abrir menús)
- XMLService.js (solo al importar/exportar)

**Implementación:**
```javascript
// En App.js
async showRecipeForm(id = null) {
    if (!this.recipeForm) {
        const { RecipeForm } = await import('./features/recipes/RecipeForm.js');
        this.recipeForm = new RecipeForm(
            this.recipeService,
            this.categoryService,
            this.eventBus
        );
    }
    this.recipeForm.render(id);
}
```

### Métricas Esperadas

**Antes (script.js):**
- Tamaño inicial: ~518 KB (14,102 líneas)
- Tiempo de carga: ~500ms
- Tiempo de parse: ~200ms

**Después (main.js + módulos):**
- Tamaño inicial: ~150 KB (módulos críticos)
- Tiempo de carga: ~200ms (-60%)
- Tiempo de parse: ~80ms (-60%)
- Lazy load: ~50 KB por módulo no crítico

## Design Decisions

### 1. ¿Por qué EventBus en lugar de callbacks?

**Decisión:** Usar EventBus para comunicación entre componentes

**Razones:**
- Desacopla componentes
- Facilita testing (mock del EventBus)
- Permite múltiples listeners
- Más escalable

### 2. ¿Por qué separar servicios de componentes UI?

**Decisión:** Servicios solo lógica de negocio, componentes solo UI

**Razones:**
- Testeable (servicios sin DOM)
- Reutilizable (servicios en cualquier contexto)
- Mantenible (responsabilidades claras)
- Escalable (fácil añadir nuevos componentes)

### 3. ¿Por qué App.js en lugar de dejar main.js?

**Decisión:** Crear App.js como orquestador, main.js solo inicialización

**Razones:**
- main.js más simple (<50 líneas)
- App.js testeable (sin depender de DOM ready)
- Separación de responsabilidades
- Más fácil de mantener

### 4. ¿Por qué lazy loading?

**Decisión:** Lazy load de módulos no críticos

**Razones:**
- Reduce carga inicial en 60%
- Mejora tiempo de interacción
- Mejor experiencia de usuario
- Aprovecha ES6 modules

### 5. ¿Por qué mantener script.js.backup?

**Decisión:** Mantener backup temporal antes de eliminar

**Razones:**
- Seguridad (rollback rápido)
- Comparación (verificar migración)
- Confianza (eliminar solo cuando todo funcione)
- Buena práctica

## Conclusion

Este diseño completa la refactorización de script.js iniciada en el spec `javascript-audit`. La arquitectura final será:

- **Modular**: 15+ módulos especializados
- **Testeable**: Servicios y componentes independientes
- **Mantenible**: Responsabilidades claras
- **Escalable**: Fácil añadir funcionalidades
- **Performante**: Lazy loading, -60% carga inicial

El resultado será una aplicación moderna, bien estructurada y fácil de mantener, eliminando completamente el archivo monolítico script.js.

---

**Referencias:**
- Ver `javascript-audit/INFORME-AUDITORIA-JS.md` para análisis completo
- Ver `javascript-audit/PROGRESO-REFACTORIZACION.md` para estado actual
- Ver `javascript-audit/PLAN-MIGRACION-ARCHIVOS.md` para plan de archivos
