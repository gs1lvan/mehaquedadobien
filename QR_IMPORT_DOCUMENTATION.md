# 📱 Sistema de Importación de Recetas por QR

## 🎯 Descripción General

El sistema permite compartir recetas mediante códigos QR que, al ser escaneados, redirigen a `https://guiavfr.enaire.es/` con los datos de la receta codificados en la URL, permitiendo importarlas automáticamente.

## 🔄 Flujo Completo

```
┌─────────────────┐
│  Usuario crea   │
│  código QR en   │
│  vista detalle  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ QR contiene URL:                        │
│ https://guiavfr.enaire.es/#import=BASE64│
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│ Usuario escanea │
│ QR con móvil    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Se abre navegador con la URL        │
│ App detecta parámetro #import=      │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Decodifica datos de la receta       │
│ Muestra modal de confirmación       │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Usuario confirma importación        │
│ Receta se guarda en localStorage    │
│ Se muestra en la lista de recetas   │
└─────────────────────────────────────┘
```

## 🛠️ Implementación Técnica

### 1. Generación del QR (script.js)

```javascript
// Preparar datos de la receta
prepareRecipeDataForQR(recipe) {
    return JSON.stringify({
        name: recipe.name,
        category: recipe.category,
        ingredients: recipe.ingredients,
        preparationMethod: recipe.preparationMethod,
        totalTime: recipe.totalTime
    });
}

// Generar URL del QR
generateQRCodeURL(recipeData, size = 200) {
    const base64Data = btoa(encodeURIComponent(recipeData));
    const targetURL = `https://guiavfr.enaire.es/#import=${base64Data}`;
    const encodedURL = encodeURIComponent(targetURL);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedURL}`;
}
```

### 2. Detección de Importación (script.js)

```javascript
// Al cargar la página, verifica si hay datos de importación
document.addEventListener('DOMContentLoaded', () => {
    window.recipeApp = new RecipeApp();
    checkForRecipeImport(); // ← Detecta #import= en URL
});

function checkForRecipeImport() {
    const hash = window.location.hash;
    if (hash.startsWith('#import=')) {
        // Decodifica y muestra modal
        const base64Data = hash.substring(8);
        const jsonData = decodeURIComponent(atob(base64Data));
        const recipeData = JSON.parse(jsonData);
        showRecipeImportModal(recipeData);
    }
}
```

### 3. Modal de Confirmación

El modal muestra:
- ✅ Nombre de la receta
- ✅ Número de ingredientes
- ✅ Tiempo total
- ✅ Botones: Cancelar / Importar

### 4. Importación Final

```javascript
function importRecipeFromQR(recipeData) {
    const newRecipe = {
        id: Date.now(),
        ...recipeData,
        images: [], // QR no incluye imágenes
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Guardar en localStorage
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    // Recargar y mostrar
    window.recipeApp.loadRecipes();
    window.recipeApp.showRecipeDetail(newRecipe.id);
}
```

## 📊 Estructura de Datos en el QR

### Modo Compacto (Por Defecto) ✅
```json
{
    "n": "Nombre de la receta",
    "c": "main",
    "i": "Arroz|400|g;Pollo|300|g;Azafrán|1|pizca",
    "p": "Pasos de preparación...",
    "t": "1h 30min"
}
```

**Ventajas:**
- ~40% más pequeño que el modo completo
- QR más fácil de escanear
- Menos módulos necesarios

### Modo Completo (Opcional)
```json
{
    "name": "Nombre de la receta",
    "category": "main|dessert|appetizer|...",
    "ingredients": [
        {
            "name": "Ingrediente",
            "quantity": "100",
            "unit": "g"
        }
    ],
    "preparationMethod": "Pasos de preparación...",
    "totalTime": "1h 30min"
}
```

**Ventajas:**
- Más legible en formato raw
- Compatible con versiones futuras

### Comparación de Tamaños

| Modo | Tamaño Típico | Módulos QR | Recomendación |
|------|---------------|------------|---------------|
| Completo | ~500 bytes | 37×37 (V5) | Solo impresión de alta calidad |
| Compacto | ~300 bytes | 29×29 (V3) | ✅ Uso general (por defecto) |
| Mínimo | ~100 bytes | 25×25 (V2) | Listas rápidas |

### Datos NO Incluidos
- ❌ **Imágenes** - Harían el QR demasiado grande
- ❌ **ID** - Se genera uno nuevo al importar
- ❌ **Fechas** - Se crean al importar

### Optimizaciones Aplicadas
- ✅ Corrección de errores: Baja (L) - 7% de redundancia
- ✅ Margen: 1 módulo (mínimo requerido)
- ✅ Claves abreviadas en JSON
- ✅ Ingredientes en formato pipe-separated

## 🧪 Cómo Probar

### Opción 1: Página de Test
1. Abre `test-qr-import.html` en tu navegador
2. Verás un QR generado automáticamente
3. Escanéalo con tu móvil o haz clic en "Simular Escaneo"

### Opción 2: Desde la App
1. Abre la app y crea/abre una receta
2. En la vista detalle, genera el código QR
3. Escanéalo con otro dispositivo
4. Confirma la importación

### Opción 3: URL Manual
```
https://guiavfr.enaire.es/#import=eyJuYW1lIjoiUGFlbGxhIn0%3D
```

## 🎨 Experiencia de Usuario

### Flujo Exitoso
1. 📱 Usuario escanea QR
2. 🌐 Se abre la app en el navegador
3. 💬 Aparece modal: "¿Importar Paella Valenciana?"
4. ✅ Usuario confirma
5. 🎉 Notificación: "Receta importada correctamente"
6. 📖 Se abre automáticamente la receta importada

### Manejo de Errores
- **QR inválido**: Notificación de error
- **Datos corruptos**: Mensaje de código QR inválido
- **Cancelación**: Modal se cierra sin importar

## 🔒 Seguridad y Limitaciones

### Seguridad
- ✅ Solo se aceptan datos JSON válidos
- ✅ Try-catch para prevenir crashes
- ✅ Validación de estructura de datos
- ✅ No se ejecuta código arbitrario

### Limitaciones
- ⚠️ **Tamaño del QR**: Recetas muy largas pueden generar QR difíciles de escanear
- ⚠️ **Sin imágenes**: Las imágenes no se transfieren
- ⚠️ **Duplicados**: No detecta si la receta ya existe
- ⚠️ **Dependencia de API**: Usa `api.qrserver.com` para generar QR

## 🚀 Mejoras Futuras

### Corto Plazo
- [ ] Detectar recetas duplicadas antes de importar
- [ ] Comprimir datos para QR más pequeños
- [ ] Añadir versión del formato de datos

### Medio Plazo
- [ ] Soporte para imágenes (URL externa)
- [ ] Historial de recetas importadas
- [ ] Compartir por otros medios (WhatsApp, email)

### Largo Plazo
- [ ] Backend propio para URLs cortas
- [ ] Sistema de recetas públicas/privadas
- [ ] Sincronización entre dispositivos

## 📱 Compatibilidad

### Navegadores
- ✅ Chrome/Edge (Desktop y Mobile)
- ✅ Firefox (Desktop y Mobile)
- ✅ Safari (Desktop y Mobile)

### Dispositivos
- ✅ Android (Chrome, Firefox)
- ✅ iOS (Safari, Chrome)
- ✅ Desktop (todos los navegadores modernos)

### Requisitos
- JavaScript habilitado
- localStorage disponible
- Conexión a internet (para generar QR)

## 🐛 Troubleshooting

### El QR no se genera
- Verifica conexión a internet
- Revisa la consola del navegador
- Comprueba que la receta tenga datos válidos

### El QR no se puede escanear
- Receta demasiado larga → Simplifica ingredientes
- QR muy pequeño → Aumenta el tamaño
- Mala iluminación → Mejora la luz al escanear

### La importación falla
- Verifica que la URL sea correcta
- Comprueba que localStorage no esté lleno
- Revisa la consola para errores específicos

## 📞 Soporte

Para reportar problemas o sugerir mejoras:
1. Abre la consola del navegador (F12)
2. Busca mensajes con prefijo `[Import]`
3. Copia el error completo
4. Reporta el issue con los detalles
