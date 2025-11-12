# 📄 Recipe Content Manager - Formatos XML Soportados

Documentación sobre los formatos XML que el CMS puede importar.

**Fecha**: 7 de noviembre de 2025

---

## 🎯 Formatos Soportados

El Recipe Content Manager soporta **dos formatos** de XML:

### Formato A: Múltiples Recetas (Exportación Completa)

**Uso:** Cuando exportas todas las recetas desde la app principal o cuando quieres gestionar múltiples recetas a la vez.

**Estructura:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipes>
  <recipe id="recipe-1">
    <name>Paella Valenciana</name>
    <category>Arroces</category>
    <totalTime>1h 30min</totalTime>
    <author>Chef García</author>
    <!-- ... más campos ... -->
  </recipe>
  
  <recipe id="recipe-2">
    <name>Gazpacho Andaluz</name>
    <category>Sopas</category>
    <!-- ... más campos ... -->
  </recipe>
  
  <!-- ... más recetas ... -->
</recipes>
```

**Características:**
- ✅ Elemento raíz: `<recipes>` (plural)
- ✅ Múltiples elementos `<recipe>` dentro
- ✅ Cada `<recipe>` tiene un atributo `id`
- ✅ Ideal para gestión masiva

---

### Formato B: Receta Individual (Exportación Individual)

**Uso:** Cuando exportas una sola receta desde la app principal usando el botón "Exportar XML" en la tarjeta de receta.

**Estructura:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipe>
  <id>ca1df7f0-b42c-4d8b-9f40-54889ada0f54</id>
  <name>Filetes a la plancha</name>
  <category>carne</category>
  <totalTime>1h 30min</totalTime>
  <caravanFriendly>true</caravanFriendly>
  <hospitalFriendly>false</hospitalFriendly>
  <menuFriendly>true</menuFriendly>
  <author>Chef García</author>
  <history>Receta familiar</history>
  <preparationMethod>Calentar la plancha...</preparationMethod>
  <ingredients>
    <ingredient id="ing-1">
      <name>Filetes de ternera</name>
      <quantity>4</quantity>
      <unit>unidades</unit>
    </ingredient>
  </ingredients>
  <sequences>
    <sequence>
      <duration>10min</duration>
      <description>Calentar la plancha</description>
      <ingredientIds></ingredientIds>
    </sequence>
  </sequences>
  <images></images>
  <appliances>
    <appliance>Plancha</appliance>
  </appliances>
</recipe>
```

**Características:**
- ✅ Elemento raíz: `<recipe>` (singular)
- ✅ El `id` está dentro como elemento `<id>` (no como atributo)
- ✅ Una sola receta por archivo
- ✅ Formato de exportación de la app principal

---

## 🔄 Detección Automática

El CMS detecta automáticamente qué formato estás usando:

```javascript
// Pseudocódigo de detección
if (rootElement === 'recipes') {
    // Formato A: Múltiples recetas
    parseMultipleRecipes();
} else if (rootElement === 'recipe') {
    // Formato B: Receta individual
    parseSingleRecipe();
} else {
    // Error: Formato no soportado
    showError();
}
```

**En la consola verás:**
```
XML Preview: <?xml version="1.0" encoding="UTF-8"?><recipe>...
Root element: recipe
Detected single recipe export format
Parsed 1 recipe
```

---

## 📊 Comparación de Formatos

| Característica | Formato A (`<recipes>`) | Formato B (`<recipe>`) |
|----------------|-------------------------|------------------------|
| **Elemento raíz** | `<recipes>` | `<recipe>` |
| **Número de recetas** | Múltiples | Una sola |
| **ID de receta** | Atributo: `<recipe id="...">` | Elemento: `<id>...</id>` |
| **Uso típico** | Exportación completa | Exportación individual |
| **Origen** | Exportar todas las recetas | Botón "Exportar XML" en tarjeta |
| **Gestión masiva** | ✅ Ideal | ⚠️ Limitado |

---

## 🎯 Casos de Uso

### Caso 1: Gestión Masiva de Recetario Completo

**Formato recomendado:** A (`<recipes>`)

**Flujo:**
1. En la app principal: Configuración → Exportar todas las recetas
2. Se descarga `recetas_2025-11-07.xml` con formato A
3. Cargar en el CMS
4. Editar múltiples recetas
5. Descargar XML actualizado
6. Importar en la app principal

### Caso 2: Editar una Receta Específica

**Formato recomendado:** B (`<recipe>`)

**Flujo:**
1. En la app principal: Tarjeta de receta → Menú → Exportar XML
2. Se descarga `filetes-a-la-plancha.xml` con formato B
3. Cargar en el CMS
4. Editar la receta
5. Descargar XML actualizado
6. Importar en la app principal

### Caso 3: Combinar Múltiples Recetas Individuales

**Formato inicial:** B (`<recipe>`)  
**Formato final:** A (`<recipes>`)

**Flujo:**
1. Exportar varias recetas individuales (formato B)
2. Cargar cada una en el CMS
3. El CMS las gestiona internamente como colección
4. Descargar XML → Se genera formato A con todas las recetas

---

## 🔧 Conversión de Formatos

### De Individual (B) a Múltiple (A)

El CMS hace esto automáticamente al descargar:

**Entrada (formato B):**
```xml
<recipe>
  <id>recipe-1</id>
  <name>Receta 1</name>
</recipe>
```

**Salida (formato A):**
```xml
<recipes>
  <recipe id="recipe-1">
    <name>Receta 1</name>
  </recipe>
</recipes>
```

### De Múltiple (A) a Individual (B)

No soportado directamente. Usa la app principal para exportar recetas individuales.

---

## ⚠️ Diferencias Importantes

### 1. Ubicación del ID

**Formato A:**
```xml
<recipe id="recipe-1">
  <name>Paella</name>
</recipe>
```

**Formato B:**
```xml
<recipe>
  <id>recipe-1</id>
  <name>Paella</name>
</recipe>
```

### 2. Estructura de Flags

**Ambos formatos usan la misma estructura:**
```xml
<caravanFriendly>true</caravanFriendly>
<!-- o -->
<caravanFriendly value="true"/>
```

### 3. Ingredientes y Secuencias

**Ambos formatos usan la misma estructura:**
```xml
<ingredients>
  <ingredient id="ing-1">
    <name>Ingrediente</name>
    <quantity>100</quantity>
    <unit>g</unit>
  </ingredient>
</ingredients>
```

---

## 🧪 Archivos de Prueba

### Formato A (Múltiples)
- `recetas-ejemplo.xml` - 5 recetas completas
- `recetas-test-simple.xml` - 1 receta simple

### Formato B (Individual)
Exporta cualquier receta desde la app principal usando el botón "Exportar XML".

---

## 📝 Notas Técnicas

### Parsing del Formato B

Cuando se detecta formato B:
1. El elemento raíz `<recipe>` se trata como una receta única
2. El `<id>` interno se extrae y se usa como atributo
3. Se crea un array con una sola receta
4. El resto del procesamiento es idéntico al formato A

### Generación de XML

Al descargar, el CMS **siempre genera formato A** (`<recipes>`):
- Más estándar para colecciones
- Soporta múltiples recetas
- Compatible con importación masiva en la app principal

---

## ✅ Checklist de Compatibilidad

Tu archivo XML es compatible si cumple **uno** de estos:

**Formato A:**
- [ ] Elemento raíz: `<recipes>`
- [ ] Al menos un `<recipe>` dentro
- [ ] Cada `<recipe>` tiene atributo `id`

**Formato B:**
- [ ] Elemento raíz: `<recipe>`
- [ ] Tiene elemento `<id>` dentro
- [ ] Tiene al menos `<name>` y `<category>`

---

## 🎓 Ejemplos Completos

### Ejemplo Formato A (Mínimo)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipes>
  <recipe id="r1">
    <name>Receta 1</name>
    <category>Categoría</category>
    <totalTime></totalTime>
    <author></author>
    <history></history>
    <preparationMethod></preparationMethod>
    <ingredients></ingredients>
    <sequences></sequences>
    <images></images>
    <appliances></appliances>
    <caravanFriendly value="false"/>
    <hospitalFriendly value="false"/>
    <menuFriendly value="false"/>
  </recipe>
</recipes>
```

### Ejemplo Formato B (Mínimo)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipe>
  <id>r1</id>
  <name>Receta 1</name>
  <category>Categoría</category>
  <totalTime></totalTime>
  <author></author>
  <history></history>
  <preparationMethod></preparationMethod>
  <ingredients></ingredients>
  <sequences></sequences>
  <images></images>
  <appliances></appliances>
  <caravanFriendly>false</caravanFriendly>
  <hospitalFriendly>false</hospitalFriendly>
  <menuFriendly>false</menuFriendly>
</recipe>
```

---

## 🚀 Recomendaciones

### Para Gestión Masiva
✅ Usa formato A (`<recipes>`)  
✅ Exporta todas las recetas desde Configuración  
✅ Edita en lote en el CMS

### Para Edición Individual
✅ Usa formato B (`<recipe>`)  
✅ Exporta desde la tarjeta de receta  
✅ Edita en el CMS  
✅ Reimporta en la app

### Para Backup
✅ Usa formato A (`<recipes>`)  
✅ Exporta todas las recetas periódicamente  
✅ Guarda en lugar seguro

---

**Última actualización**: 7 de noviembre de 2025  
**Versión**: 1.1 (Soporte para ambos formatos)
