# Resumen: Especificación Actualizada - ID-Based Architecture

**Fecha:** 12 de noviembre de 2025  
**Estado:** Especificación completa lista para revisión

## 🎯 Objetivo Principal

Implementar una arquitectura basada en IDs únicos para todos los objetos (recetas, ingredientes, secuencias, imágenes) que permita:

1. ✅ **Fix inmediato:** Categorías habilitadas correctamente en quick edit
2. 🆔 **IDs únicos:** Referencias robustas que no dependen de nombres
3. 🛒 **Integración con listas:** Rastrear origen de ingredientes
4. 📋 **Conversión de menús:** Crear listas de compra automáticamente
5. 🔍 **Filtro por menú:** Ver recetas incluidas en un menú específico
6. 📤 **Exportación XML con IDs:** Preservar todos los IDs y referencias en XML
7. 📥 **Importación XML con IDs:** Restaurar todas las referencias por ID desde XML

---

## 📊 Arquitectura de Datos

### Antes (Basado en Nombres)

```javascript
// ❌ Problema: Referencias por nombre (strings)
Menu Item: {
  lunch: "Paella de mariscos",  // String
  dinner: "Ensalada César"      // String
}

Recipe: {
  ingredients: [
    {name: "Arroz", quantity: "400g"}  // Sin ID
  ],
  sequences: [
    {
      description: "Añadir arroz",
      ingredients: ["Arroz"]  // Referencia por nombre
    }
  ]
}
```

**Problemas:**
- Si renombras "Paella de mariscos" → el menú sigue mostrando el nombre viejo
- Si eliminas la receta → no hay forma de saber que está eliminada
- No puedes rastrear qué ingredientes vienen de qué receta
- Duplicados difíciles de detectar

### Después (Basado en IDs)

```javascript
// ✅ Solución: Referencias por ID único
Menu Item: {
  lunchId: "recipe-1699123456789-abc123",     // ID único
  lunchName: "Paella de mariscos",            // Cached para display
  dinnerId: "recipe-1699123456790-def456",
  dinnerName: "Ensalada César"
}

Recipe: {
  id: "recipe-1699123456789-abc123",
  name: "Paella de mariscos",
  ingredients: [
    {
      id: "ing-1699123456791-ghi789",  // ✅ ID único
      name: "Arroz",
      quantity: "400g"
    }
  ],
  sequences: [
    {
      id: "seq-1699123456792-jkl012",  // ✅ ID único
      description: "Añadir arroz",
      ingredientIds: ["ing-1699123456791-ghi789"]  // ✅ Referencia por ID
    }
  ],
  images: [
    {
      id: "img-1699123456793-mno345",  // ✅ ID único
      name: "paella.jpg",
      data: "base64..."
    }
  ]
}

Shopping List Item: {
  id: "item-1699123456794-pqr678",
  name: "Arroz",
  quantity: "400g",
  sourceType: "ingredient",                    // ✅ Tipo de origen
  sourceRecipeId: "recipe-1699123456789-abc123",  // ✅ De qué receta
  sourceIngredientId: "ing-1699123456791-ghi789", // ✅ Qué ingrediente
  sourceRecipeName: "Paella de mariscos"       // ✅ Cached para display
}
```

**Ventajas:**
- ✅ Renombrar receta → actualización automática en menús
- ✅ Eliminar receta → detectar y mostrar "(receta eliminada)"
- ✅ Rastrear origen de ingredientes en listas de compra
- ✅ Consolidar duplicados fácilmente
- ✅ Referencias siempre válidas

---

## 🆕 Nuevas Funcionalidades

### 1. 🛒 Añadir Receta Completa a Lista de Compra

**Caso de uso:** Quieres cocinar "Paella de mariscos" y necesitas todos los ingredientes.

```javascript
// Usuario hace click en botón "🛒 Añadir a lista"
addRecipeToShoppingList(recipeId, shoppingListId)

// Sistema:
// 1. Busca receta por ID
// 2. Extrae todos los ingredientes
// 3. Crea items en lista con sourceRecipeId y sourceIngredientId
// 4. Muestra "de Paella de mariscos" en cada item
```

**Resultado:**
```
Lista de Compra:
✓ Arroz 400g (de Paella de mariscos)
✓ Gambas 300g (de Paella de mariscos)
✓ Mejillones 200g (de Paella de mariscos)
```

### 2. 🥕 Añadir Ingrediente Individual a Lista

**Caso de uso:** Solo necesitas "Arroz" de la receta, no todos los ingredientes.

```javascript
// Usuario hace click en ingrediente específico
addIngredientToShoppingList(recipeId, ingredientId, shoppingListId)

// Sistema:
// 1. Busca receta por ID
// 2. Busca ingrediente por ID dentro de la receta
// 3. Crea item en lista con ambos IDs
```

**Resultado:**
```
Lista de Compra:
✓ Arroz 400g (de Paella de mariscos)
```

### 3. 📋 Convertir Menú a Lista de Compra

**Caso de uso:** Tienes un menú semanal y quieres crear la lista de compra automáticamente.

```javascript
// Usuario hace click en "Crear lista de compra" en vista de menú
convertMenuToShoppingList(menuId)

// Sistema:
// 1. Extrae todos los recipe IDs del menú (lunchId, dinnerId)
// 2. Para cada receta, extrae ingredientes
// 3. Consolida duplicados (ej: "Arroz" aparece en 3 recetas)
// 4. Crea lista con todos los ingredientes
```

**Ejemplo:**

**Menú:**
```
Lunes:
  Comida: Paella de mariscos (recipe-123)
  Cena: Ensalada César (recipe-456)
Martes:
  Comida: Arroz con pollo (recipe-789)
  Cena: Sopa de verduras (recipe-012)
```

**Lista de Compra Generada:**
```
Lista de "Semana 1":
✓ Arroz 800g (de Paella de mariscos, Arroz con pollo)
✓ Gambas 300g (de Paella de mariscos)
✓ Lechuga 1 unidad (de Ensalada César)
✓ Pollo 500g (de Arroz con pollo)
✓ Zanahorias 200g (de Sopa de verduras)
```

### 4. 🔍 Filtrar Recetas por Menú

**Caso de uso:** Quieres ver solo las recetas que están en tu menú de esta semana.

### 5. 📤 Exportar XML con IDs

**Caso de uso:** Quieres exportar tus recetas y menús preservando todas las relaciones entre objetos.

```xml
<recipe id="recipe-1699123456789-abc123">
  <name>Paella de mariscos</name>
  <ingredients>
    <ingredient id="ing-1699123456791-ghi789">
      <name>Arroz</name>
      <quantity>400</quantity>
      <unit>g</unit>
    </ingredient>
  </ingredients>
  <sequences>
    <sequence id="seq-1699123456793-mno345">
      <description>Añadir arroz y sofreír</description>
      <ingredientRefs>
        <ingredientRef id="ing-1699123456791-ghi789"/>
      </ingredientRefs>
    </sequence>
  </sequences>
</recipe>
```

**Ventajas:**
- ✅ Todos los IDs se preservan
- ✅ Referencias por ID (no por nombre)
- ✅ Importación sin pérdida de datos
- ✅ Compatible con CMS y otras herramientas

### 6. 📥 Importar XML con IDs

**Caso de uso:** Importas recetas desde otro sistema o backup y todas las referencias se restauran correctamente.

```javascript
// Sistema:
// 1. Parse XML y extrae todos los IDs
// 2. Detecta conflictos de IDs
// 3. Genera nuevos IDs si hay conflictos
// 4. Resuelve todas las referencias por ID
// 5. Soporta XML legacy sin IDs (genera IDs automáticamente)
```

**Resultado:**
- ✅ Todas las relaciones restauradas
- ✅ Secuencias apuntan a ingredientes correctos
- ✅ Menús apuntan a recetas correctas
- ✅ Sin pérdida de datos

### 4. 🔍 Filtrar Recetas por Menú

**Caso de uso:** Quieres ver solo las recetas que están en tu menú de esta semana.

```javascript
// Usuario hace click en chip de filtro "📋 Menú: Semana 1"
applyMenuFilter(menuId)

// Sistema:
// 1. Extrae todos los recipe IDs del menú
// 2. Busca cada receta por ID
// 3. Añade contexto de menú (qué días/comidas)
// 4. Muestra solo esas recetas
```

**Vista Filtrada:**
```
Mostrando 4 recetas del menú "Semana 1":

┌─────────────────────────────────┐
│ 🍝 Paella de mariscos          │
│ 📋 Lunes (Comida)              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🥗 Ensalada César              │
│ 📋 Lunes (Cena)                │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🍗 Arroz con pollo             │
│ 📋 Martes (Comida)             │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🥕 Sopa de verduras            │
│ 📋 Martes (Cena)               │
└─────────────────────────────────┘
```

---

## 📋 Plan de Implementación

### Fase 1-6: Quick Edit Fix (Ya implementado)
✅ Solución inmediata para categorías deshabilitadas

### Fase 7: Generar IDs para Sub-Objetos
- Añadir IDs a ingredientes existentes
- Añadir IDs a secuencias existentes
- Añadir IDs a imágenes existentes
- Migrar referencias de nombres a IDs en secuencias

### Fase 8: Integración con Listas de Compra
- Actualizar modelo de shopping list items
- Implementar `addRecipeToShoppingList()`
- Implementar `addIngredientToShoppingList()`
- Mostrar origen en UI de listas

### Fase 9: Conversión de Menú a Lista
- Implementar `convertMenuToShoppingList()`
- Consolidar ingredientes duplicados
- Añadir botón "Crear lista de compra" en vista de menú
- Manejar recetas eliminadas

### Fase 10: Filtro por Menú
- Implementar `getRecipesFromMenu()`
- Implementar `applyMenuFilter()`
- Añadir badge de contexto de menú en tarjetas
- Añadir chip de filtro de menú

### Fase 11: Exportación XML con IDs
- Actualizar `exportRecipeToXML()` para incluir IDs
- Actualizar `exportMenuToXML()` para usar recipe IDs
- Incluir IDs en ingredientes, secuencias, imágenes
- Usar referencias por ID en secuencias

### Fase 12: Importación XML con IDs
- Actualizar `importRecipeFromXML()` para parsear IDs
- Actualizar `importMenuFromXML()` para resolver recipe IDs
- Manejar conflictos de IDs
- Soportar XML legacy sin IDs

### Fase 13: Documentación
- Actualizar ARQUITECTURA.md
- Actualizar README.md
- Documentar formato XML con IDs
- Crear guías de usuario

---

## 🎨 Ejemplos Visuales

### Tarjeta de Receta con Contexto de Menú

```
┌─────────────────────────────────────────┐
│ 🍝 Paella de mariscos                  │
│ ⏱️ 45 min  🏕️ Caravana  📋 Menú       │
│                                         │
│ 📋 Menú: Semana 1                      │
│    • Lunes (Comida)                    │
│    • Miércoles (Cena)                  │
│                                         │
│ [Ver Receta] [Editar] [🛒 A Lista]    │
└─────────────────────────────────────────┘
```

### Item de Lista de Compra con Origen

```
┌─────────────────────────────────────────┐
│ Lista de Compra: Semana 1              │
├─────────────────────────────────────────┤
│ ☐ Arroz 800g                           │
│   📋 de: Paella de mariscos,           │
│         Arroz con pollo                │
│                                         │
│ ☐ Gambas 300g                          │
│   📋 de: Paella de mariscos            │
│                                         │
│ ☐ Lechuga 1 unidad                     │
│   📋 de: Ensalada César                │
└─────────────────────────────────────────┘
```

---

## ✅ Criterios de Éxito

### Quick Edit Fix
- [x] Categorías con receta actual habilitadas
- [x] Categorías sin recetas deshabilitadas
- [x] Migración automática de menús legacy

### Arquitectura de IDs
- [ ] Todos los objetos tienen IDs únicos
- [ ] Referencias por ID en lugar de nombres
- [ ] Migración automática de datos existentes

### Listas de Compra
- [ ] Botón "🛒 Añadir a lista" en recetas
- [ ] Botón individual en cada ingrediente
- [ ] Mostrar origen en items de lista
- [ ] Manejar recetas eliminadas

### Conversión de Menú
- [ ] Botón "Crear lista de compra" en menús
- [ ] Consolidación de duplicados
- [ ] Todas las recetas procesadas
- [ ] Manejo de errores robusto

### Filtro por Menú
- [ ] Chip de filtro "📋 Menú: [nombre]"
- [ ] Vista filtrada solo con recetas del menú
- [ ] Badge de contexto en tarjetas
- [ ] Indicador de días/comidas

### XML Export/Import
- [ ] XML export incluye todos los IDs
- [ ] XML export usa referencias por ID
- [ ] XML import restaura IDs correctamente
- [ ] XML import resuelve referencias
- [ ] Manejo de conflictos de IDs
- [ ] Soporte para XML legacy sin IDs

---

## 📚 Archivos de la Spec

1. **requirements.md** - Requisitos funcionales (EARS + INCOSE)
   - 8 requisitos principales
   - Casos de uso detallados
   - Criterios de aceptación

2. **design.md** - Diseño y arquitectura
   - Modelos de datos actualizados
   - Flujos de datos
   - Ejemplos de código
   - Estrategia de IDs

3. **tasks.md** - Plan de implementación
   - 16 tareas principales
   - 50+ subtareas
   - Referencias a requisitos
   - Orden de implementación

---

## 🚀 Próximos Pasos

### Para Revisar la Spec:

1. **Leer requirements.md** - Entender qué se va a construir (10 requisitos)
2. **Leer design.md** - Entender cómo se va a construir (con ejemplos de código XML)
3. **Leer tasks.md** - Entender el plan de implementación (18 tareas principales)

### Para Implementar:

1. **Fase 1-6:** Ya completadas (quick edit fix)
2. **Fase 7:** Generar IDs para sub-objetos
3. **Fase 8:** Integración con listas de compra
4. **Fase 9:** Conversión de menú a lista
5. **Fase 10:** Filtro por menú
6. **Fase 11:** Exportación XML con IDs
7. **Fase 12:** Importación XML con IDs
8. **Fase 13:** Documentación

### Preguntas para Revisar:

1. ¿Los modelos de datos cubren todos los casos de uso?
2. ¿La estrategia de IDs es adecuada?
3. ¿Falta alguna funcionalidad importante?
4. ¿El plan de implementación es claro?
5. ¿Las tareas están bien definidas?

---

## 💡 Beneficios de esta Arquitectura

### Para el Usuario:
- ✅ Listas de compra más inteligentes
- ✅ Conversión automática de menús
- ✅ Filtrado por menú
- ✅ Rastreo de origen de ingredientes
- ✅ Consolidación automática de duplicados

### Para el Desarrollador:
- ✅ Referencias robustas que no se rompen
- ✅ Fácil rastrear dónde se usa cada objeto
- ✅ Migración automática de datos legacy
- ✅ Código más mantenible
- ✅ Base sólida para futuras features

### Para el Sistema:
- ✅ Integridad de datos mejorada
- ✅ Performance optimizada (lookups por ID)
- ✅ Escalabilidad
- ✅ Trazabilidad completa
- ✅ Backward compatibility

---

## 📞 Contacto

¿Preguntas o sugerencias sobre la spec?

- Revisa los archivos de la spec en `.kiro/specs/fix-menu-quick-edit-categories/`
- Abre el archivo `tasks.md` para ver el plan detallado
- Comienza la implementación cuando estés listo

**Estado actual:** ✅ Spec completa y lista para revisión e implementación
