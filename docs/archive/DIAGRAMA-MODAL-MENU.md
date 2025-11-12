# Diagrama de la Modal de Editar Menú

## Estructura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  MODAL OVERLAY (fondo oscuro semitransparente)            │  │
│  │                                                             │  │
│  │  ┌───────────────────────────────────────────────────┐    │  │
│  │  │ MODAL CONTENT                                      │    │  │
│  │  │                                                     │    │  │
│  │  │  ┌─────────────────────────────────────────────┐  │    │  │
│  │  │  │ MODAL HEADER                                │  │    │  │
│  │  │  │  ┌──────────────────────┐  ┌────┐          │  │    │  │
│  │  │  │  │ Nuevo Menú / Editar  │  │ ✕  │          │  │    │  │
│  │  │  │  │ Menú (título)        │  └────┘          │  │    │  │
│  │  │  │  └──────────────────────┘   (close btn)    │  │    │  │
│  │  │  └─────────────────────────────────────────────┘  │    │  │
│  │  │                                                     │    │  │
│  │  │  ┌─────────────────────────────────────────────┐  │    │  │
│  │  │  │ MODAL BODY                                  │  │    │  │
│  │  │  │                                             │  │    │  │
│  │  │  │  ┌───────────────────────────────────────┐ │  │    │  │
│  │  │  │  │ FORM GROUP: Nombre del menú           │ │  │    │  │
│  │  │  │  │  ┌─────────────────────────────────┐  │ │  │    │  │
│  │  │  │  │  │ [Input: Nombre del menú]        │  │ │  │    │  │
│  │  │  │  │  └─────────────────────────────────┘  │ │  │    │  │
│  │  │  │  └───────────────────────────────────────┘ │  │    │  │
│  │  │  │                                             │  │    │  │
│  │  │  │  ┌───────────────────────────────────────┐ │  │    │  │
│  │  │  │  │ FORM GROUP: Elementos del Menú        │ │  │    │  │
│  │  │  │  │                                       │ │  │    │  │
│  │  │  │  │  ┌─────────────────────────────────┐ │ │  │    │  │
│  │  │  │  │  │ SHOPPING LIST BUTTONS           │ │ │  │    │  │
│  │  │  │  │  │  ┌──────────────┐ ┌───────────┐ │ │ │  │    │  │
│  │  │  │  │  │  │ ➕ Añadir    │ │ 💾 Guardar│ │ │ │  │    │  │
│  │  │  │  │  │  │   Elemento   │ │   Menú    │ │ │ │  │    │  │
│  │  │  │  │  │  └──────────────┘ └───────────┘ │ │ │  │    │  │
│  │  │  │  │  │  (secondary)      (primary)     │ │ │  │    │  │
│  │  │  │  │  └─────────────────────────────────┘ │ │  │    │  │
│  │  │  │  │                                       │ │  │    │  │
│  │  │  │  │  ┌─────────────────────────────────┐ │ │  │    │  │
│  │  │  │  │  │ MENU NEW ITEMS CONTAINER        │ │ │  │    │  │
│  │  │  │  │  │ (items creados en modo CREATE)  │ │ │  │    │  │
│  │  │  │  │  │                                 │ │ │  │    │  │
│  │  │  │  │  │  ┌───────────────────────────┐ │ │ │  │    │  │
│  │  │  │  │  │  │ MENU ITEM INPUT (Día 1)   │ │ │ │  │    │  │
│  │  │  │  │  │  │  ┌─────────────────────┐  │ │ │ │  │    │  │
│  │  │  │  │  │  │  │ Lunes (readonly)    │  │ │ │ │  │    │  │
│  │  │  │  │  │  │  └─────────────────────┘  │ │ │ │  │    │  │
│  │  │  │  │  │  │  ┌─────────────────────┐  │ │ │ │  │    │  │
│  │  │  │  │  │  │  │ 🍲 Caldo - Selec... │  │ │ │ │  │    │  │
│  │  │  │  │  │  │  │ (lunch input)       │  │ │ │ │  │    │  │
│  │  │  │  │  │  │  └─────────────────────┘  │ │ │ │  │    │  │
│  │  │  │  │  │  │  ┌─────────────────────┐  │ │ │ │  │    │  │
│  │  │  │  │  │  │  │ 🌾 Cereales - Sel...│  │ │ │ │  │    │  │
│  │  │  │  │  │  │  │ (dinner input)      │  │ │ │ │  │    │  │
│  │  │  │  │  │  │  └─────────────────────┘  │ │ │ │  │    │  │
│  │  │  │  │  │  │  ┌──┐ ┌──┐ ┌──┐         │ │ │ │  │    │  │
│  │  │  │  │  │  │  │↑ │ │↓ │ │🗑│         │ │ │ │  │    │  │
│  │  │  │  │  │  │  └──┘ └──┘ └──┘         │ │ │ │  │    │  │
│  │  │  │  │  │  └───────────────────────────┘ │ │ │  │    │  │
│  │  │  │  │  │                                 │ │ │  │    │  │
│  │  │  │  │  │  ┌───────────────────────────┐ │ │ │  │    │  │
│  │  │  │  │  │  │ MENU ITEM INPUT (Día 2)   │ │ │ │  │    │  │
│  │  │  │  │  │  │  ... (similar structure)  │ │ │ │  │    │  │
│  │  │  │  │  │  └───────────────────────────┘ │ │ │  │    │  │
│  │  │  │  │  │                                 │ │ │  │    │  │
│  │  │  │  │  │  ... (7 días en total)         │ │ │  │    │  │
│  │  │  │  │  └─────────────────────────────────┘ │ │  │    │  │
│  │  │  │  │                                       │ │  │    │  │
│  │  │  │  │  ┌─────────────────────────────────┐ │ │  │    │  │
│  │  │  │  │  │ MENU EXISTING ITEMS CONTAINER   │ │ │  │    │  │
│  │  │  │  │  │ (items en modo EDIT)            │ │ │  │    │  │
│  │  │  │  │  │ (vacío en modo CREATE)          │ │ │  │    │  │
│  │  │  │  │  └─────────────────────────────────┘ │ │  │    │  │
│  │  │  │  └───────────────────────────────────────┘ │  │    │  │
│  │  │  └─────────────────────────────────────────────┘  │    │  │
│  │  └───────────────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Estructura HTML

```html
<div id="menu-modal" class="modal hidden">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    
    <!-- HEADER -->
    <div class="modal-header">
      <h2 id="menu-modal-title">Nuevo Menú</h2>
      <button id="close-menu-modal" class="btn-icon">✕</button>
    </div>

    <!-- BODY -->
    <div class="modal-body">
      
      <!-- Nombre del menú -->
      <div class="form-group">
        <label for="menu-name-input">Nombre del menú</label>
        <input type="text" id="menu-name-input" class="form-input" 
               placeholder="Ej: Semanal, Cumpleaños, Dieta blanda...">
      </div>

      <!-- Elementos del menú -->
      <div class="form-group">
        <label>Elementos del Menú</label>
        
        <!-- Botones de acción -->
        <div class="shopping-list-buttons">
          <button id="add-menu-item-btn" 
                  class="modal-trigger modal-trigger--action modal-trigger--secondary">
            <span class="option-icon"><i class="fa-solid fa-plus"></i></span>
            <span class="option-text">Añadir Elemento</span>
          </button>
          <button id="save-menu-btn" 
                  class="modal-trigger modal-trigger--action modal-trigger--primary">
            <span class="option-icon"><i class="fa-solid fa-floppy-disk"></i></span>
            <span class="option-text">Guardar Menú</span>
          </button>
        </div>

        <!-- Contenedor de items nuevos (modo CREATE) -->
        <div id="menu-new-items-container">
          <!-- Items dinámicos aquí -->
        </div>

        <!-- Contenedor de items existentes (modo EDIT) -->
        <div id="menu-existing-items-container">
          <!-- Items dinámicos aquí -->
        </div>
      </div>
    </div>
  </div>
</div>
```

## Estructura de un Menu Item Input

```html
<div class="menu-item-input" data-item-id="123456">
  <!-- Día de la semana -->
  <input type="text" class="form-input" value="Lunes" readonly>
  
  <!-- Comida (lunch) -->
  <input type="text" 
         class="form-input recipe-selector-input" 
         placeholder="🍲 Caldo - Selecciona receta"
         readonly
         data-item-id="123456"
         data-meal-type="lunch"
         data-is-quick-edit="false"
         data-category-id="caldo">
  
  <!-- Cena (dinner) -->
  <input type="text" 
         class="form-input recipe-selector-input" 
         placeholder="🌾 Cereales - Selecciona receta"
         readonly
         data-item-id="123456"
         data-meal-type="dinner"
         data-is-quick-edit="false"
         data-category-id="cereales">
  
  <!-- Botones de acción -->
  <div class="menu-item-buttons">
    <button class="btn-icon reorder-btn" title="Mover arriba">
      <i class="fa-solid fa-arrow-up"></i>
    </button>
    <button class="btn-icon reorder-btn" title="Mover abajo">
      <i class="fa-solid fa-arrow-down"></i>
    </button>
    <button class="btn-icon btn-danger" title="Eliminar">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</div>
```

## Flujo de Interacción

### Modo CREATE (Nuevo Menú)

```
1. Usuario hace clic en "Nuevo Menú"
   ↓
2. Se abre la modal con:
   - Título: "Nuevo Menú"
   - Input de nombre vacío
   - 7 días predefinidos (Lunes-Domingo)
   - Botón "Añadir Elemento" OCULTO
   - Botón "Guardar Menú" VISIBLE
   ↓
3. Usuario escribe nombre del menú
   ↓
4. Usuario hace clic en input de comida/cena
   ↓
5. Se abre modal de selector de categorías
   ↓
6. Usuario selecciona categoría
   ↓
7. Se abre modal de selector de recetas
   ↓
8. Usuario selecciona receta
   ↓
9. Receta se asigna al input (NO se guarda aún)
   - data-is-quick-edit="false"
   - data-recipe-id se guarda en el input
   ↓
10. Usuario repite pasos 4-9 para otros días
    ↓
11. Usuario hace clic en "Guardar Menú"
    ↓
12. Se crea el menú con todas las recetas
    ↓
13. Modal se cierra y se muestra el menú en la lista
```

### Modo EDIT (Editar Menú)

```
1. Usuario hace clic en "Editar" en un menú existente
   ↓
2. Se abre la modal con:
   - Título: "Editar Menú"
   - Input de nombre con valor actual
   - Items existentes cargados
   - Botón "Añadir Elemento" VISIBLE
   - Botón "Guardar Menú" VISIBLE
   ↓
3. Usuario hace clic en input de comida/cena
   ↓
4. Se abre modal de selector de categorías
   ↓
5. Usuario selecciona categoría
   ↓
6. Se abre modal de selector de recetas
   ↓
7. Usuario selecciona receta
   ↓
8. Receta se guarda INMEDIATAMENTE (Quick Edit)
   - data-is-quick-edit="true"
   - data-menu-id contiene el ID del menú
   - Se actualiza el menú en MenuManager
   ↓
9. Usuario puede seguir editando otros días
   ↓
10. Usuario hace clic en "Guardar Menú" (opcional)
    ↓
11. Modal se cierra
```

## Diferencias Clave: CREATE vs EDIT

| Aspecto | CREATE | EDIT |
|---------|--------|------|
| Título | "Nuevo Menú" | "Editar Menú" |
| Botón "Añadir Elemento" | Oculto | Visible |
| Items iniciales | 7 días predefinidos | Items existentes del menú |
| data-is-quick-edit | "false" | "true" |
| data-menu-id | No existe | ID del menú |
| Guardado de recetas | Al hacer clic en "Guardar Menú" | Inmediato (Quick Edit) |
| Contenedor | menu-new-items-container | menu-existing-items-container |

## Clases CSS Importantes

- `.modal` - Contenedor principal de la modal
- `.modal-overlay` - Fondo oscuro
- `.modal-content` - Contenido de la modal
- `.modal-header` - Cabecera con título y botón cerrar
- `.modal-body` - Cuerpo con formulario
- `.shopping-list-buttons` - Contenedor de botones (grid 2 columnas)
- `.modal-trigger--action` - Botón de acción
- `.modal-trigger--primary` - Botón primario (azul)
- `.modal-trigger--secondary` - Botón secundario (gris)
- `.menu-item-input` - Contenedor de un día del menú
- `.recipe-selector-input` - Input para seleccionar receta
- `.menu-item-buttons` - Botones de reordenar/eliminar

## Data Attributes Importantes

- `data-item-id` - ID único del item del menú
- `data-meal-type` - "lunch" o "dinner"
- `data-is-quick-edit` - "true" o "false"
- `data-menu-id` - ID del menú (solo en modo EDIT)
- `data-recipe-id` - ID de la receta seleccionada
- `data-category-id` - ID de la categoría de la receta
