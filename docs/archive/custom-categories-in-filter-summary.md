# Categorías Personalizadas en Filtro de Alimentos

## Objetivo
Mostrar las categorías personalizadas en el filtro "Filtrar por alimento" de la página de inicio, separadas de las categorías predefinidas con un símbolo `|`.

## Comportamiento Implementado

### Orden de Visualización
1. **[Todas]** - Botón para mostrar todas las recetas
2. **Categorías Personalizadas** - Creadas por el usuario (si existen)
3. **|** - Separador visual (solo si hay categorías personalizadas)
4. **Categorías Predefinidas** - Categorías del sistema

### Ejemplo Visual

#### Sin Categorías Personalizadas
```
[Todas] [🍲 Caldo] [🥩 Carne] [🌾 Cereales] [🐷 Cerdo] ...
```

#### Con Categorías Personalizadas
```
[Todas] [🍔 MiCat1] [🍟 MiCat2] [🥗 MiCat3] | [🍲 Caldo] [🥩 Carne] [🌾 Cereales] ...
        └─ Personalizadas ─┘  │  └─ Predefinidas ──────────────────┘
                              │
                          Separador
```

## Cambios Implementados

### 1. JavaScript (`script.js`)

#### Función `renderFilterChips()` - Modificada

**Antes:**
```javascript
renderFilterChips() {
    // ... código de "Todas"
    
    // Todas las categorías juntas
    const categories = this.categoryManager.getAllCategories();
    categories.forEach(category => {
        // Crear chip
    });
}
```

**Después:**
```javascript
renderFilterChips() {
    // ... código de "Todas"
    
    // Separar categorías personalizadas y predefinidas
    const customCategories = this.categoryManager.customCategories.filter(
        cat => !this.categoryManager.isCategoryHidden(cat.id)
    );
    const predefinedCategories = this.categoryManager.getVisiblePredefinedCategories();

    // 1. Renderizar categorías personalizadas
    customCategories.forEach(category => {
        // Crear chip
    });

    // 2. Agregar separador (solo si hay personalizadas)
    if (customCategories.length > 0) {
        const separator = document.createElement('span');
        separator.className = 'filter-separator';
        separator.textContent = '|';
        filterChipsContainer.appendChild(separator);
    }

    // 3. Renderizar categorías predefinidas
    predefinedCategories.forEach(category => {
        // Crear chip
    });
}
```

**Características:**
- ✅ Filtra categorías ocultas (no las muestra)
- ✅ Separa personalizadas de predefinidas
- ✅ Solo muestra separador si hay categorías personalizadas
- ✅ Mantiene funcionalidad de filtrado activo
- ✅ Mantiene colores personalizados de categorías

### 2. CSS (`styles.css`)

#### Nuevo Estilo: `.filter-separator`

```css
.filter-separator {
    display: inline-flex;
    align-items: center;
    color: var(--color-border);
    font-size: 1.2rem;
    font-weight: var(--font-weight-light);
    padding: 0 var(--spacing-xs);
    user-select: none;
}
```

**Características:**
- Color sutil (usa color de borde)
- Tamaño ligeramente mayor para visibilidad
- Padding para espaciado
- No seleccionable (user-select: none)
- Se alinea verticalmente con los chips

## Funcionalidad

### Filtrado
- ✅ **Click en categoría personalizada**: Filtra recetas por esa categoría
- ✅ **Click en categoría predefinida**: Filtra recetas por esa categoría
- ✅ **Click en "Todas"**: Muestra todas las recetas
- ✅ **Estado activo**: Se marca visualmente la categoría seleccionada
- ✅ **Múltiples filtros**: Soporta selección múltiple de categorías

### Casos de Uso

#### Caso 1: Usuario sin categorías personalizadas
```
Filtro muestra:
[Todas] [🍲 Caldo] [🥩 Carne] [🌾 Cereales] ...
(Sin separador)
```

#### Caso 2: Usuario con 1 categoría personalizada
```
Filtro muestra:
[Todas] [🍔 MiCat] | [🍲 Caldo] [🥩 Carne] ...
(Con separador)
```

#### Caso 3: Usuario con múltiples categorías personalizadas
```
Filtro muestra:
[Todas] [🍔 Cat1] [🍟 Cat2] [🥗 Cat3] | [🍲 Caldo] [🥩 Carne] ...
(Con separador)
```

#### Caso 4: Usuario con categorías ocultas
```
Las categorías ocultas NO aparecen en el filtro
(Ni personalizadas ni predefinidas)
```

## Integración con Sistema Existente

### Actualización Automática
El filtro se actualiza automáticamente cuando:
- ✅ Se crea una nueva categoría personalizada
- ✅ Se elimina una categoría personalizada
- ✅ Se oculta una categoría
- ✅ Se restaura una categoría oculta
- ✅ Se edita una categoría (nombre, emoji, color)

### Llamadas a `renderFilterChips()`
La función se llama desde:
1. `init()` - Al cargar la aplicación
2. `handleCreateCategory()` - Al crear categoría
3. `handleDeleteCategory()` - Al eliminar categoría
4. `handleHideCategory()` - Al ocultar categoría
5. `handleRestoreCategory()` - Al restaurar categoría
6. `handleSaveEditCategory()` - Al editar categoría
7. `importRecipesFromXML()` - Al importar recetas

## Ventajas

1. **Visibilidad**: Las categorías personalizadas son más visibles al estar primero
2. **Organización**: Separación clara entre personalizadas y predefinidas
3. **UX**: El usuario ve primero sus propias categorías
4. **Consistencia**: Mismo orden que en la modal de gestión
5. **Funcional**: Todas las categorías funcionan igual al hacer click

## Responsive

El filtro mantiene su comportamiento responsive:
- **Desktop**: Chips en línea con wrap
- **Tablet**: Chips más pequeños con wrap
- **Móvil**: Chips aún más pequeños con wrap
- **Separador**: Se adapta al tamaño de los chips

## Testing

Para verificar:
1. ✅ Sin categorías personalizadas → No aparece separador
2. ✅ Con categorías personalizadas → Aparecen primero + separador
3. ✅ Click en categoría personalizada → Filtra correctamente
4. ✅ Click en categoría predefinida → Filtra correctamente
5. ✅ Crear nueva categoría → Aparece en el filtro
6. ✅ Eliminar categoría → Desaparece del filtro
7. ✅ Ocultar categoría → Desaparece del filtro
8. ✅ Restaurar categoría → Aparece en el filtro
9. ✅ Categorías ocultas no aparecen en el filtro
10. ✅ Separador solo aparece si hay categorías personalizadas

## Archivos Modificados

1. **script.js**
   - Modificada función `renderFilterChips()`
   - Separación de categorías personalizadas y predefinidas
   - Lógica de separador condicional

2. **styles.css**
   - Agregado estilo `.filter-separator`
   - Diseño sutil y alineado con chips

## Notas

- El separador `|` es un elemento `<span>` no interactivo
- Las categorías personalizadas mantienen sus colores personalizados
- El orden es: Todas → Personalizadas → | → Predefinidas
- Las categorías ocultas nunca aparecen en el filtro
- El filtro se actualiza automáticamente en todas las operaciones de categorías
