# 🔧 Recipe Content Manager - Troubleshooting

Guía de solución de problemas para el CMS.

**Fecha**: 7 de noviembre de 2025

---

## 🚨 Error: "El XML no contiene el elemento raíz <recipes>"

### Causa
El archivo XML no tiene la estructura correcta o está mal formado.

### Solución

#### 1. Verifica la Estructura del XML

El CMS soporta **dos formatos** de XML:

**Formato A: Múltiples recetas (exportación completa)**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipes>
  <recipe id="recipe-1">
    <name>Nombre de la receta</name>
    <category>Categoría</category>
    <!-- ... más campos ... -->
  </recipe>
  <recipe id="recipe-2">
    <!-- ... otra receta ... -->
  </recipe>
</recipes>
```

**Formato B: Una sola receta (exportación individual)**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<recipe>
  <id>recipe-1</id>
  <name>Nombre de la receta</name>
  <category>Categoría</category>
  <!-- ... más campos ... -->
</recipe>
```

Ambos formatos son válidos y el CMS los detecta automáticamente.

#### 2. Elementos Obligatorios

- **Declaración XML**: `<?xml version="1.0" encoding="UTF-8"?>`
- **Elemento raíz**: `<recipes>` (múltiples) o `<recipe>` (individual)
- **Elementos recipe**: Al menos un `<recipe>` (si usas `<recipes>` como raíz)

#### 3. Errores Comunes

**❌ Incorrecto:**
```xml
<Recipes>  <!-- Mayúscula -->
  <recipe>...</recipe>
</Recipes>
```

**✅ Correcto:**
```xml
<recipes>  <!-- Minúscula -->
  <recipe>...</recipe>
</recipes>
```

**❌ Incorrecto:**
```xml
<recetas>  <!-- Nombre diferente -->
  <recipe>...</recipe>
</recetas>
```

**✅ Correcto:**
```xml
<recipes>  <!-- Nombre correcto -->
  <recipe>...</recipe>
</recipes>
```

#### 4. Validar el XML

**Opción A: Usar la Consola del Navegador**
1. Abre el CMS
2. Presiona F12 para abrir DevTools
3. Ve a la pestaña "Console"
4. Intenta cargar el XML
5. Busca el mensaje "XML Preview:" que muestra los primeros 200 caracteres

**Opción B: Validador Online**
1. Ve a https://www.xmlvalidation.com/
2. Pega tu XML
3. Haz clic en "Validate"
4. Corrige los errores mostrados

**Opción C: Editor de Texto**
1. Abre el XML en VS Code, Notepad++, o similar
2. Verifica que todas las etiquetas estén cerradas
3. Verifica que no haya caracteres especiales sin escapar

#### 5. Probar con Archivo de Ejemplo

Usa `recetas-test-simple.xml` para verificar que el CMS funciona:

```bash
# El archivo está en la raíz del proyecto
recetas-test-simple.xml
```

Si este archivo funciona, el problema está en tu XML.

---

## 🚨 Error: "XML mal formado"

### Causa
El XML tiene errores de sintaxis.

### Solución

#### Errores Comunes de Sintaxis

**1. Etiquetas no cerradas**

❌ Incorrecto:
```xml
<name>Paella Valenciana
<category>Arroces</category>
```

✅ Correcto:
```xml
<name>Paella Valenciana</name>
<category>Arroces</category>
```

**2. Etiquetas mal anidadas**

❌ Incorrecto:
```xml
<recipe>
  <name>Paella</recipe>
</name>
```

✅ Correcto:
```xml
<recipe>
  <name>Paella</name>
</recipe>
```

**3. Caracteres especiales sin escapar**

❌ Incorrecto:
```xml
<name>Pollo & Verduras</name>
```

✅ Correcto:
```xml
<name>Pollo &amp; Verduras</name>
```

**Caracteres a escapar:**
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&apos;`

**4. Atributos sin comillas**

❌ Incorrecto:
```xml
<recipe id=recipe-1>
```

✅ Correcto:
```xml
<recipe id="recipe-1">
```

---

## 🚨 Error: "El archivo XML está vacío"

### Causa
El archivo no tiene contenido o solo tiene espacios en blanco.

### Solución

1. Abre el archivo en un editor de texto
2. Verifica que tenga contenido
3. Guarda el archivo con codificación UTF-8
4. Intenta cargar de nuevo

---

## 🚨 No se muestran las recetas

### Causa
El XML se cargó pero no tiene elementos `<recipe>`.

### Solución

#### Verifica que tengas elementos `<recipe>`

```xml
<recipes>
  <recipe id="recipe-1">  <!-- Debe estar presente -->
    <name>...</name>
    <!-- ... -->
  </recipe>
</recipes>
```

#### Revisa la Consola

1. Abre DevTools (F12)
2. Busca el mensaje: "Parsed X recipes"
3. Si dice "Parsed 0 recipes", no hay elementos `<recipe>` válidos

---

## 🚨 Algunos campos no se cargan

### Causa
Los nombres de los elementos no coinciden con los esperados.

### Solución

#### Nombres de Elementos Correctos

```xml
<recipe id="recipe-1">
  <name>Nombre</name>                    <!-- Obligatorio -->
  <category>Categoría</category>         <!-- Obligatorio -->
  <totalTime>1h 30min</totalTime>        <!-- Opcional -->
  <author>Autor</author>                 <!-- Opcional -->
  <history>Historia</history>            <!-- Opcional -->
  <preparationMethod>Método</preparationMethod>  <!-- Opcional -->
  
  <ingredients>
    <ingredient id="ing-1">
      <name>Ingrediente</name>
      <quantity>100</quantity>
      <unit>g</unit>
    </ingredient>
  </ingredients>
  
  <sequences>
    <sequence>
      <duration>10min</duration>
      <description>Descripción</description>
      <ingredientIds>
        <ingredientId>ing-1</ingredientId>
      </ingredientIds>
    </sequence>
  </sequences>
  
  <images>
    <image>
      <name>imagen.jpg</name>
      <type>image/jpeg</type>
      <data>base64data...</data>
    </image>
  </images>
  
  <appliances>
    <appliance>Horno</appliance>
  </appliances>
  
  <caravanFriendly value="true"/>
  <hospitalFriendly value="false"/>
  <menuFriendly value="true"/>
</recipe>
```

---

## 🚨 El CMS no responde

### Causa
Archivo XML muy grande o navegador bloqueado.

### Solución

1. **Verifica el tamaño del archivo**
   - El CMS está optimizado para ~100 recetas
   - Archivos con 500+ recetas pueden ser lentos

2. **Espera unos segundos**
   - El parsing puede tardar en archivos grandes
   - Verás un spinner de carga

3. **Revisa la consola**
   - Busca errores de JavaScript
   - Busca warnings de memoria

4. **Divide el archivo**
   - Si tienes 500+ recetas, divide en varios archivos
   - Procesa en lotes de 100 recetas

---

## 🚨 Los cambios no se guardan

### Causa
No has descargado el XML actualizado.

### Solución

1. **Descargar XML**
   - Haz clic en "Descargar XML" o presiona Ctrl+S
   - El archivo se descarga automáticamente

2. **Importar en la app principal**
   - Abre mehaquedadobien
   - Ve a Configuración → Importar XML
   - Selecciona el archivo descargado

---

## 🚨 Error de permisos al guardar

### Causa
El navegador no tiene permisos para descargar archivos.

### Solución

1. **Verifica permisos del navegador**
   - Configuración → Privacidad → Descargas
   - Permite descargas automáticas

2. **Cambia la carpeta de descargas**
   - Configuración → Descargas
   - Selecciona una carpeta con permisos de escritura

---

## 🔍 Debugging Avanzado

### Habilitar Logs Detallados

1. Abre DevTools (F12)
2. Ve a Console
3. Busca estos mensajes:
   - "XML Preview:" - Primeros 200 caracteres del XML
   - "Parsed X recipes" - Número de recetas parseadas
   - "Root element:" - Elemento raíz encontrado

### Inspeccionar el XML Parseado

```javascript
// En la consola del navegador
console.log(rcm.recipes);  // Ver todas las recetas
console.log(rcm.recipes[0]);  // Ver primera receta
```

### Verificar Estado del CMS

```javascript
// En la consola del navegador
console.log('Total recipes:', rcm.recipes.length);
console.log('Filtered recipes:', rcm.filteredRecipes.length);
console.log('Selected recipes:', rcm.selectedRecipes.size);
console.log('History:', rcm.history.length);
```

---

## 📞 Soporte

### Información para Reportar Problemas

Si el problema persiste, proporciona:

1. **Mensaje de error completo**
   - Copia el mensaje de la notificación
   - Copia los errores de la consola (F12)

2. **Primeras líneas del XML**
   - Copia las primeras 20 líneas de tu XML
   - Elimina datos sensibles

3. **Navegador y versión**
   - Chrome 120, Firefox 121, etc.

4. **Tamaño del archivo**
   - Número de recetas
   - Tamaño en MB

5. **Pasos para reproducir**
   - Qué hiciste antes del error
   - Qué esperabas que pasara
   - Qué pasó en realidad

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] El archivo tiene extensión .xml
- [ ] El archivo no está vacío
- [ ] Tiene la declaración XML al inicio
- [ ] Tiene el elemento raíz `<recipes>`
- [ ] Todas las etiquetas están cerradas
- [ ] No hay caracteres especiales sin escapar
- [ ] Probaste con `recetas-test-simple.xml`
- [ ] Revisaste la consola del navegador (F12)
- [ ] El navegador está actualizado
- [ ] Tienes permisos para descargar archivos

---

## 🎓 Recursos Adicionales

### Validadores XML Online
- https://www.xmlvalidation.com/
- https://codebeautify.org/xmlvalidator
- https://www.freeformatter.com/xml-validator-xsd.html

### Editores XML
- VS Code con extensión XML Tools
- Notepad++ con plugin XML Tools
- Oxygen XML Editor

### Documentación
- [RECIPE-MANAGER-README.md](RECIPE-MANAGER-README.md) - Documentación completa
- [RECIPE-MANAGER-QUICKSTART.md](RECIPE-MANAGER-QUICKSTART.md) - Inicio rápido
- [recetas-ejemplo.xml](recetas-ejemplo.xml) - Ejemplo completo
- [recetas-test-simple.xml](recetas-test-simple.xml) - Ejemplo simple

---

**Última actualización**: 7 de noviembre de 2025  
**Versión**: 1.0
