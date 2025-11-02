# XML Parsing Test Cases

Este documento describe los casos de prueba para validar el parsing de XML en ambos formatos (compacto y completo).

## Casos de Prueba

### 1. Formato Compacto (QR Code)

**Descripción**: Validar que el parser maneja correctamente el formato compacto usado en códigos QR.

**XML de Prueba**:
```xml
<recipe>
    <name>Paella Valenciana</name>
    <category>arroces</category>
    <totalTime>60 min</totalTime>
    <ingredients>
        <i><n>Arroz</n><q>400</q><u>g</u></i>
        <i><n>Pollo</n><q>300</q><u>g</u></i>
        <i><n>Judías verdes</n><q>200</q><u>g</u></i>
    </ingredients>
    <sequences>
        <s>
            <step>1</step>
            <dur>10 min</dur>
            <desc>Sofreír el pollo</desc>
            <ings><ing>Pollo</ing></ings>
        </s>
        <s>
            <step>2</step>
            <dur>5 min</dur>
            <desc>Añadir las judías</desc>
            <ings><ing>Judías verdes</ing></ings>
        </s>
        <s>
            <step>3</step>
            <dur>20 min</dur>
            <desc>Añadir el arroz y cocinar</desc>
            <ings><ing>Arroz</ing></ings>
        </s>
    </sequences>
    <appliances>
        <a>paellera</a>
        <a>fuego</a>
    </appliances>
</recipe>
```

**Resultado Esperado**:
- 3 ingredientes parseados correctamente
- 3 secuencias con referencias correctas a ingredientes
- Los IDs de ingredientes se mapean correctamente por nombre
- 2 utensilios parseados

---

### 2. Formato Completo (Exportación XML)

**Descripción**: Validar que el parser maneja correctamente el formato completo de exportación.

**XML de Prueba**:
```xml
<recipe>
    <name>Paella Valenciana</name>
    <category>arroces</category>
    <totalTime>60 min</totalTime>
    <ingredients>
        <ingredient>
            <id>ing-001</id>
            <name>Arroz</name>
            <quantity>400</quantity>
            <unit>g</unit>
            <order>0</order>
        </ingredient>
        <ingredient>
            <id>ing-002</id>
            <name>Pollo</name>
            <quantity>300</quantity>
            <unit>g</unit>
            <order>1</order>
        </ingredient>
        <ingredient>
            <id>ing-003</id>
            <name>Judías verdes</name>
            <quantity>200</quantity>
            <unit>g</unit>
            <order>2</order>
        </ingredient>
    </ingredients>
    <additionSequences>
        <sequence>
            <step>1</step>
            <duration>10 min</duration>
            <description>Sofreír el pollo</description>
            <ingredientIds>
                <ingredientId>ing-002</ingredientId>
            </ingredientIds>
        </sequence>
        <sequence>
            <step>2</step>
            <duration>5 min</duration>
            <description>Añadir las judías</description>
            <ingredientIds>
                <ingredientId>ing-003</ingredientId>
            </ingredientIds>
        </sequence>
        <sequence>
            <step>3</step>
            <duration>20 min</duration>
            <description>Añadir el arroz y cocinar</description>
            <ingredientIds>
                <ingredientId>ing-001</ingredientId>
            </ingredientIds>
        </sequence>
    </additionSequences>
    <kitchenAppliances>
        <appliance>paellera</appliance>
        <appliance>fuego</appliance>
    </kitchenAppliances>
</recipe>
```

**Resultado Esperado**:
- 3 ingredientes parseados con IDs mapeados correctamente
- 3 secuencias con referencias por ID
- Los IDs antiguos se mapean a nuevos IDs generados
- 2 utensilios parseados

---

### 3. Formato Mixto (Compatibilidad)

**Descripción**: Validar que el parser maneja XML con elementos de ambos formatos.

**XML de Prueba**:
```xml
<recipe>
    <name>Paella Valenciana</name>
    <category>arroces</category>
    <totalTime>60 min</totalTime>
    <ingredients>
        <i><n>Arroz</n><q>400</q><u>g</u></i>
    </ingredients>
    <additionSequences>
        <sequence>
            <step>1</step>
            <duration>20 min</duration>
            <description>Cocinar el arroz</description>
            <ingredientNames>
                <ingredientName>Arroz</ingredientName>
            </ingredientNames>
        </sequence>
    </additionSequences>
</recipe>
```

**Resultado Esperado**:
- Ingrediente parseado en formato compacto
- Secuencia parseada en formato completo con nombres
- Mapeo correcto entre nombre y ID

---

### 4. Casos Edge

#### 4.1 Secuencia sin ingredientes
```xml
<s>
    <step>1</step>
    <dur>5 min</dur>
    <desc>Precalentar el horno</desc>
</s>
```
**Esperado**: Secuencia parseada con array vacío de ingredientes

#### 4.2 Ingrediente sin cantidad
```xml
<i><n>Sal</n><q></q><u>al gusto</u></i>
```
**Esperado**: Cantidad = 0, unidad = "al gusto"

#### 4.3 Secuencia con ingrediente no encontrado
```xml
<s>
    <step>1</step>
    <dur>5 min</dur>
    <desc>Añadir especias</desc>
    <ings><ing>Ingrediente Inexistente</ing></ings>
</s>
```
**Esperado**: El ID del ingrediente será el nombre (no se encuentra en el mapeo)

---

## Cómo Probar

### Prueba Manual en Consola del Navegador

1. Abrir la aplicación en el navegador
2. Abrir DevTools (F12)
3. Ejecutar en la consola:

```javascript
// Test formato compacto
const compactXML = `<recipe>
    <name>Test Recipe</name>
    <ingredients>
        <i><n>Ingredient 1</n><q>100</q><u>g</u></i>
    </ingredients>
    <sequences>
        <s>
            <step>1</step>
            <dur>5 min</dur>
            <desc>Test step</desc>
            <ings><ing>Ingredient 1</ing></ings>
        </s>
    </sequences>
</recipe>`;

const result = parseCompactXML(compactXML);
console.log('Compact format result:', result);

// Test formato completo
const fullXML = `<recipe>
    <name>Test Recipe</name>
    <ingredients>
        <ingredient>
            <id>test-001</id>
            <name>Ingredient 1</name>
            <quantity>100</quantity>
            <unit>g</unit>
        </ingredient>
    </ingredients>
    <additionSequences>
        <sequence>
            <step>1</step>
            <duration>5 min</duration>
            <description>Test step</description>
            <ingredientIds>
                <ingredientId>test-001</ingredientId>
            </ingredientIds>
        </sequence>
    </additionSequences>
</recipe>`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(fullXML, 'text/xml');
const fullResult = XMLImporter.parseRecipeElement(xmlDoc.documentElement);
console.log('Full format result:', fullResult);
```

### Prueba con Archivo XML

1. Crear un archivo XML con uno de los formatos de prueba
2. Usar la función de importación de la aplicación
3. Verificar que la receta se importa correctamente
4. Verificar en la vista de detalle que:
   - Todos los ingredientes están presentes
   - Las secuencias muestran los ingredientes correctos
   - Los tiempos y descripciones son correctos

---

## Checklist de Validación

- [ ] Formato compacto parsea correctamente
- [ ] Formato completo parsea correctamente
- [ ] Formato mixto parsea correctamente
- [ ] Mapeo de IDs funciona (nombre → ID en compacto)
- [ ] Mapeo de IDs funciona (ID antiguo → ID nuevo en completo)
- [ ] Secuencias sin ingredientes no causan errores
- [ ] Ingredientes sin cantidad se manejan correctamente
- [ ] Referencias a ingredientes inexistentes no rompen el parser
- [ ] Los logs de consola muestran información útil
- [ ] No hay errores en la consola del navegador
- [ ] La importación desde QR funciona
- [ ] La importación desde archivo XML funciona

---

## Mejoras Implementadas

### 1. Eliminación de Código Duplicado ✅
- Consolidado el parsing XML en `XMLImporter`
- `parseCompactXML()` ahora usa `XMLImporter` internamente
- Reducción de ~100 líneas de código duplicado

### 2. Soporte Dual de Formatos ✅
- `parseIngredientsWithMapping()` soporta ambos formatos
- `parseSequences()` soporta ambos formatos
- `parseSequenceIngredients()` maneja referencias por nombre o ID

### 3. Mejora de Mantenibilidad ✅
- Método helper `createMultiSelector()` para selectores CSS
- Constantes para nombres de elementos XML
- Documentación JSDoc completa

### 4. Mejor Manejo de Errores ✅
- Validación de elementos antes de parsear
- Logs informativos en cada paso
- Manejo graceful de datos faltantes

### 5. Optimización de Performance ✅
- Cache de elementos DOM
- Reducción de llamadas a `querySelector()`
- Selectores CSS más eficientes
