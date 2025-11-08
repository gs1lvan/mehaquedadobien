# Mapeo de Campos XML - Recipe Manager

Este documento muestra la correspondencia entre los campos que exporta la aplicación y los que espera el CMS.

## 📋 Leyenda

- ✅ **Compatible**: El campo coincide exactamente
- 🔄 **Transformación**: Requiere conversión de formato
- ⚠️ **Diferente**: Nombre o estructura diferente
- ❌ **No existe**: El campo no está en uno de los sistemas
- 📝 **Opcional**: Campo no obligatorio

---

## 🔍 Mapeo Completo

### Información Básica de la Receta

| Campo App | Campo CMS | Estado | Notas |
|-----------|-----------|--------|-------|
| `id` | `id` | ✅ Compatible | Identificador único |
| `name` | `name` | ✅ Compatible | Nombre de la receta |
| `category` | `category` | ✅ Compatible | ID de categoría predefinida |
| `totalTime` | `totalTime` | ✅ Compatible | Formato: "1h 30min" |
| `author` | `author` | ✅ Compatible 📝 | Opcional, puede estar vacío |
| `history` | `history` | ✅ Compatible 📝 | Historia/origen de la receta |
| `preparationMethod` | `preparationMethod` | ✅ Compatible 📝 | Método general de preparación |

### Banderas Especiales

| Campo App | Campo CMS | Estado | Notas |
|-----------|-----------|--------|-------|
| `caravanFriendly` | `caravanFriendly` | ✅ Compatible | Boolean: true/false |
| `hospitalFriendly` | `hospitalFriendly` | ✅ Compatible | Boolean: true/false |
| `menuFriendly` | `menuFriendly` | ✅ Compatible | Boolean: true/false |

### Ingredientes

| Campo App | Campo CMS | Estado | Notas |
|-----------|-----------|--------|-------|
| `ingredients` | `ingredients` | ✅ Compatible | Array de objetos |
| `ingredients[].id` | `ingredients[].id` | ✅ Compatible | ID único del ingrediente |
| `ingredients[].name` | `ingredients[].name` | ✅ Compatible | Nombre del ingrediente |
| `ingredients[].quantity` | `ingredients[].quantity` | ✅ Compatible | Cantidad numérica |
| `ingredients[].unit` | `ingredients[].unit` | ✅ Compatible | Unidad de medida |
| `ingredients[].order` | ❌ No existe en CMS | ⚠️ Diferente | App exporta, CMS no lo usa |

### Secuencias de Preparación

| Campo App | Campo CMS | Estado | Notas |
|-----------|-----------|--------|-------|
| `sequences` | `sequences` | ✅ Compatible | Array de secuencias (unificado) |
| `sequences[].id` | `sequences[].id` | ✅ Compatible | ID de la secuencia |
| `sequences[].step` | `sequences[].step` | ✅ Compatible | Número de paso |
| `sequences[].duration` | `sequences[].duration` | ✅ Compatible | Duración del paso |
| `sequences[].description` | `sequences[].description` | ✅ Compatible | Descripción del paso |
| `sequences[].ingredientIds` | `sequences[].ingredientIds` | 🔄 Transformación | App exporta nombres, CMS usa IDs |

**⚠️ IMPORTANTE - Ingredientes en Secuencias:**
- **App exporta**: `<ingredientNames>` con nombres de ingredientes
- **CMS espera**: `<ingredientIds>` con IDs de ingredientes
- **Solución**: El CMS debe mapear nombres a IDs al importar

**✅ UNIFICADO**: Tanto la App como el CMS ahora usan `<sequences>` (antes la app usaba `<additionSequences>`)

### Electrodomésticos

| Campo App | Campo CMS | Estado | Notas |
|-----------|-----------|--------|-------|
| `kitchenAppliances` | `kitchenAppliances` | ✅ Compatible | Array de electrodomésticos (unificado) |
| `kitchenAppliances[]` | `kitchenAppliances[]` | ✅ Compatible | Array de strings con nombres |

**✅ UNIFICADO**: Tanto la App como el CMS ahora usan `<kitchenAppliances>`

**Formato:**
```xml
<kitchenAppliances>
  <appliance>Horno</appliance>
  <appliance>Batidora</appliance>
</kitchenAppliances>
```

### Imágenes

| Campo App | Campo CMS | Estado | Notas |
|-----------|-----------|--------|-------|
| `images` | `images` | ✅ Compatible | Array de objetos |
| `images[].id` | `images[].id` | ✅ Compatible | ID de la imagen |
| `images[].name` | `images[].name` | ✅ Compatible | Nombre del archivo |
| `images[].type` | `images[].type` | ✅ Compatible | MIME type (image/jpeg, etc.) |
| `images[].data` | `images[].data` | ✅ Compatible | Base64 encoded |
| `images[].size` | ❌ No existe en CMS | ⚠️ Diferente | App exporta, CMS no lo usa |

### Metadatos Temporales

| Campo App | Campo CMS | Estado | Notas |
|-----------|-----------|--------|-------|
| `createdAt` | `createdAt` | ✅ Compatible | Timestamp ISO (unificado) |
| `updatedAt` | `updatedAt` | ✅ Compatible | Timestamp ISO (unificado) |

**✅ UNIFICADO**: Ambos sistemas ahora guardan y exportan las fechas de creación y modificación.  
**📍 Ubicación en CMS**: Se muestran en el formulario de edición, debajo de la galería de imágenes.

---

## 🔧 Transformaciones Necesarias

### 1. Nombres de Contenedores XML

**✅ UNIFICADO - Sequences**: Ahora tanto App como CMS usan `<sequences>`

**✅ UNIFICADO - Appliances**: Ahora tanto App como CMS usan `<kitchenAppliances>`

El CMS mantiene retrocompatibilidad con XMLs antiguos que usen `<appliances>`.

### 2. Ingredientes en Secuencias

**Problema**: App exporta nombres, CMS necesita IDs

**Solución en el CMS**:
```javascript
// Al importar, mapear nombres a IDs
const ingredientMap = new Map();
recipe.ingredients.forEach(ing => {
  ingredientMap.set(ing.name.toLowerCase(), ing.id);
});

// Convertir nombres a IDs
sequence.ingredientNames.forEach(name => {
  const id = ingredientMap.get(name.toLowerCase());
  if (id) sequence.ingredientIds.push(id);
});
```

### 3. Formato de Banderas Booleanas

El CMS debe aceptar ambos formatos:

```xml
<!-- Formato 1: Atributo -->
<caravanFriendly value="true"/>

<!-- Formato 2: Contenido de texto -->
<caravanFriendly>true</caravanFriendly>
```

---

## 📊 Resumen de Compatibilidad

| Categoría | Compatible | Transformación | Diferente | Total |
|-----------|------------|----------------|-----------|-------|
| Básicos | 7 | 0 | 0 | 7 |
| Banderas | 3 | 0 | 0 | 3 |
| Ingredientes | 4 | 0 | 1 | 5 |
| Secuencias | 5 | 1 | 0 | 6 |
| Electrodomésticos | 2 | 0 | 0 | 2 |
| Imágenes | 4 | 0 | 1 | 5 |
| Metadatos | 2 | 0 | 0 | 2 |
| **TOTAL** | **27** | **1** | **2** | **30** |

**Compatibilidad general: 90%** ✅ (mejorado desde 76.7%)

---

## 🎯 Acciones Recomendadas

### Para el CMS (Importación)

1. ✅ **Aceptar nombres alternativos**:
   - ~~`additionSequences` → `sequences`~~ **COMPLETADO**
   - ~~`kitchenAppliances` → `appliances`~~ **COMPLETADO**

2. ✅ **Mapear ingredientes por nombre**:
   - Convertir `ingredientNames` a `ingredientIds`

3. ✅ **Ignorar campos extra opcionales**:
   - `ingredients[].order` (orden de ingredientes, no crítico)
   - `images[].size` (tamaño de imagen, no crítico)

4. ✅ **Soportar ambos formatos de booleanos**:
   - Atributo: `<flag value="true"/>`
   - Texto: `<flag>true</flag>`

### Para la App (Exportación)

1. ⚠️ **Considerar exportar IDs en secuencias**:
   - Actualmente exporta nombres
   - Podría exportar ambos para mayor compatibilidad

2. ℹ️ **Campos opcionales**:
   - `order`, `size`, timestamps son informativos
   - No afectan la funcionalidad del CMS

---

## 📝 Ejemplo Completo

### XML Exportado por la App

```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipe>
  <id>recipe-123</id>
  <name>Paella Valenciana</name>
  <category>arroces</category>
  <totalTime>1h 30min</totalTime>
  <caravanFriendly>false</caravanFriendly>
  <hospitalFriendly>false</hospitalFriendly>
  <menuFriendly>true</menuFriendly>
  <preparationMethod>Sofreír, añadir arroz y caldo...</preparationMethod>
  
  <kitchenAppliances>
    <appliance>Paellera</appliance>
    <appliance>Fuego</appliance>
  </kitchenAppliances>
  
  <author>Chef García</author>
  <history>Receta tradicional valenciana</history>
  
  <ingredients>
    <ingredient>
      <id>ing-1</id>
      <name>Arroz</name>
      <quantity>400</quantity>
      <unit>g</unit>
      <order>1</order>
    </ingredient>
  </ingredients>
  
  <sequences>
    <sequence>
      <id>seq-1</id>
      <step>1</step>
      <ingredientNames>
        <ingredientName>Arroz</ingredientName>
      </ingredientNames>
      <duration>20min</duration>
      <description>Cocinar el arroz</description>
    </sequence>
  </sequences>
  
  <images>
    <image>
      <id>img-1</id>
      <name>paella.jpg</name>
      <type>image/jpeg</type>
      <data>base64data...</data>
      <size>45678</size>
    </image>
  </images>
  
  <createdAt>2024-01-15T10:30:00.000Z</createdAt>
  <updatedAt>2024-01-20T15:45:00.000Z</updatedAt>
</recipe>
```

### XML Esperado por el CMS

```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipe id="recipe-123">
  <name>Paella Valenciana</name>
  <category>arroces</category>
  <totalTime>1h 30min</totalTime>
  <author>Chef García</author>
  <history>Receta tradicional valenciana</history>
  <preparationMethod>Sofreír, añadir arroz y caldo...</preparationMethod>
  
  <ingredients>
    <ingredient id="ing-1">
      <name>Arroz</name>
      <quantity>400</quantity>
      <unit>g</unit>
    </ingredient>
  </ingredients>
  
  <sequences>
    <sequence>
      <duration>20min</duration>
      <description>Cocinar el arroz</description>
      <ingredientIds>
        <ingredientId>ing-1</ingredientId>
      </ingredientIds>
    </sequence>
  </sequences>
  
  <images>
    <image>
      <name>paella.jpg</name>
      <type>image/jpeg</type>
      <data>base64data...</data>
    </image>
  </images>
  
  <kitchenAppliances>
    <appliance>Paellera</appliance>
    <appliance>Fuego</appliance>
  </kitchenAppliances>
  
  <caravanFriendly value="false"/>
  <hospitalFriendly value="false"/>
  <menuFriendly value="true"/>
  
  <createdAt>2024-01-15T10:30:00.000Z</createdAt>
  <updatedAt>2024-01-20T15:45:00.000Z</updatedAt>
</recipe>
```

---

## 🔄 Historial de Cambios

| Fecha | Versión | Cambios |
|-------|---------|---------|
| 2024-11-08 | 1.3 | ✅ Unificado: `createdAt` y `updatedAt` añadidos al CMS. Compatibilidad: **90%** 🎉 |
| 2024-11-08 | 1.2 | ✅ Unificado: `<appliances>` → `<kitchenAppliances>` en CMS. Compatibilidad: 83.3% |
| 2024-11-08 | 1.1 | ✅ Unificado: `<additionSequences>` → `<sequences>` en App y CMS. Compatibilidad: 80% |
| 2024-11-08 | 1.0 | Documento inicial creado. Compatibilidad: 76.7% |

---

**Última actualización**: 2024-11-08  
**Mantenedor**: Recipe Manager Team
