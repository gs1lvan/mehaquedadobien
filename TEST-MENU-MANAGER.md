# Test de MenuManager - Paso a Paso

## ✅ Checklist de Pruebas

### Preparación
- [ ] Abrir la aplicación en el navegador
- [ ] Abrir la consola del navegador (F12)
- [ ] Verificar que no hay errores en la consola

---

## 🧪 TEST 1: Verificar que MenuManager está cargado

### Pasos:
1. Abrir la consola del navegador (F12)
2. Escribir en la consola:
   ```javascript
   typeof MenuManager
   ```

### ✅ Resultado Esperado:
```
"function"
```

### ❌ Si sale "undefined":
- MenuManager no se cargó correctamente
- Verificar que `menu-manager.js` está en index.html
- Verificar que no hay errores de sintaxis en menu-manager.js

---

## 🧪 TEST 2: Verificar que RecipeApp tiene menuManager

### Pasos:
1. En la consola, escribir:
   ```javascript
   // Esperar a que la app se cargue
   setTimeout(() => {
       console.log('menuManager existe:', window.app?.menuManager !== undefined);
       console.log('menuManager es MenuManager:', window.app?.menuManager instanceof MenuManager);
   }, 2000);
   ```

### ✅ Resultado Esperado:
```
menuManager existe: true
menuManager es MenuManager: true
```

### ❌ Si sale false:
- MenuManager no se inicializó en RecipeApp
- Verificar línea ~820 de script.js

---

## 🧪 TEST 3: Ver Menús Existentes

### Pasos:
1. Ir a la vista de Menús:
   - Click en el menú hamburguesa (☰)
   - Click en "Menús"

2. Verificar que se muestran los menús (si tienes alguno)

3. En la consola, escribir:
   ```javascript
   // Ver cuántos menús hay
   console.log('Total de menús:', window.app?.menuManager?.menus?.length || 0);
   ```

### ✅ Resultado Esperado:
- Se muestra el número correcto de menús
- No hay errores en la consola

---

## 🧪 TEST 4: Crear un Menú Nuevo

### Pasos:
1. En la vista de Menús, click en "Nuevo Menú"
2. Rellenar el formulario:
   - **Nombre:** "Test MenuManager"
   - **Día 1:** Lunes
   - **Comida:** Pasta
   - **Cena:** Ensalada
3. Click en "Guardar"

### ✅ Resultado Esperado:
- Aparece mensaje: "Menú 'Test MenuManager' guardado correctamente"
- El menú aparece en la lista
- No hay errores en la consola

### 🔍 Verificar en Consola:
```javascript
// Ver el menú recién creado
const menus = window.app?.menuManager?.getAllMenus();
const testMenu = menus?.find(m => m.name === 'Test MenuManager');
console.log('Menú creado:', testMenu);
```

### ✅ Debe mostrar:
```javascript
{
    id: 1234567890,
    name: "Test MenuManager",
    items: [
        {
            id: 1234567891,
            name: "Lunes",
            lunch: "Pasta",
            dinner: "Ensalada",
            completed: false
        }
    ],
    enabled: true,
    isFilter: false,
    createdAt: "2024-11-13T...",
    updatedAt: "2024-11-13T..."
}
```

---

## 🧪 TEST 5: Editar un Menú

### Pasos:
1. En la lista de menús, buscar "Test MenuManager"
2. Click en el menú para expandirlo
3. Click en el botón de opciones (⋮)
4. Click en "Editar"
5. Cambiar el nombre a: "Test MenuManager EDITADO"
6. Click en "Guardar"

### ✅ Resultado Esperado:
- Mensaje: "Menú 'Test MenuManager EDITADO' guardado correctamente"
- El nombre se actualiza en la lista
- No hay errores en la consola

### 🔍 Verificar en Consola:
```javascript
const menus = window.app?.menuManager?.getAllMenus();
const editedMenu = menus?.find(m => m.name === 'Test MenuManager EDITADO');
console.log('Menú editado:', editedMenu);
```

---

## 🧪 TEST 6: Habilitar/Deshabilitar Menú

### Pasos:
1. En la lista de menús, buscar "Test MenuManager EDITADO"
2. Click en el icono del ojo (👁️) para deshabilitar
3. Verificar que el menú se mueve a la sección "Ocultos"
4. Click en el icono del ojo otra vez para habilitar
5. Verificar que el menú vuelve a la sección principal

### ✅ Resultado Esperado:
- El menú se mueve entre secciones correctamente
- Mensaje de confirmación en cada cambio
- No hay errores en la consola

### 🔍 Verificar en Consola:
```javascript
const menus = window.app?.menuManager?.getAllMenus();
const testMenu = menus?.find(m => m.name === 'Test MenuManager EDITADO');
console.log('Menú habilitado:', testMenu?.enabled);
```

---

## 🧪 TEST 7: Marcar Menú como Filtro

### Pasos:
1. En la lista de menús, buscar "Test MenuManager EDITADO"
2. Click en el icono de marcador (🔖)
3. Ir a la vista principal (Home)
4. Verificar que aparece un chip de filtro con el nombre del menú

### ✅ Resultado Esperado:
- Aparece chip de filtro en la barra de filtros
- Al hacer click en el chip, se filtran las recetas del menú
- No hay errores en la consola

### 🔍 Verificar en Consola:
```javascript
const filters = window.app?.menuManager?.getMenuFilters();
console.log('Menús marcados como filtro:', filters);
```

---

## 🧪 TEST 8: Duplicar Menú

### Pasos:
1. En la lista de menús, buscar "Test MenuManager EDITADO"
2. Click en el botón de opciones (⋮)
3. Click en "Duplicar"

### ✅ Resultado Esperado:
- Aparece un nuevo menú con nombre "Test MenuManager EDITADO (copia)"
- El menú duplicado tiene los mismos días y recetas
- No hay errores en la consola

### 🔍 Verificar en Consola:
```javascript
const menus = window.app?.menuManager?.getAllMenus();
const duplicated = menus?.find(m => m.name.includes('(copia)'));
console.log('Menú duplicado:', duplicated);
```

---

## 🧪 TEST 9: Exportar Menú a XML

### Pasos:
1. En la lista de menús, buscar "Test MenuManager EDITADO"
2. Click en el botón de opciones (⋮)
3. Click en "Exportar XML"
4. Verificar que se descarga un archivo XML

### ✅ Resultado Esperado:
- Se descarga archivo `menu-[id].xml`
- El archivo contiene el menú en formato XML
- No hay errores en la consola

### 🔍 Verificar Contenido del XML:
Abrir el archivo descargado y verificar que contiene:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<menu>
  <id>...</id>
  <name><![CDATA[Test MenuManager EDITADO]]></name>
  <enabled>true</enabled>
  <isFilter>false</isFilter>
  <items>
    <item>
      <name><![CDATA[Lunes]]></name>
      <lunch><![CDATA[Pasta]]></lunch>
      <dinner><![CDATA[Ensalada]]></dinner>
    </item>
  </items>
</menu>
```

---

## 🧪 TEST 10: Copiar Menú al Portapapeles

### Pasos:
1. En la lista de menús, buscar "Test MenuManager EDITADO"
2. Click en el botón de opciones (⋮)
3. Click en "Copiar"
4. Abrir un editor de texto (Notepad, etc.)
5. Pegar (Ctrl+V)

### ✅ Resultado Esperado:
Se pega el texto del menú en formato legible:
```
Test MenuManager EDITADO
-----------------------------------

Lunes:
  Comida: Pasta
  Cena: Ensalada
```

---

## 🧪 TEST 11: Eliminar Menú

### Pasos:
1. En la lista de menús, buscar "Test MenuManager EDITADO (copia)"
2. Click en el botón de opciones (⋮)
3. Click en "Eliminar"
4. Confirmar la eliminación

### ✅ Resultado Esperado:
- Aparece confirmación: "¿Estás seguro de que quieres eliminar este menú?"
- Al confirmar, el menú desaparece de la lista
- Mensaje: "Menú eliminado correctamente"
- No hay errores en la consola

### 🔍 Verificar en Consola:
```javascript
const menus = window.app?.menuManager?.getAllMenus();
const deleted = menus?.find(m => m.name.includes('(copia)'));
console.log('Menú eliminado (debe ser undefined):', deleted);
```

---

## 🧪 TEST 12: Verificar Persistencia (Recargar Página)

### Pasos:
1. Recargar la página (F5)
2. Ir a la vista de Menús
3. Verificar que "Test MenuManager EDITADO" sigue ahí

### ✅ Resultado Esperado:
- El menú sigue existiendo después de recargar
- Todos los datos se mantienen (nombre, días, recetas)
- No hay errores en la consola

### 🔍 Verificar en Consola:
```javascript
const menus = window.app?.menuManager?.getAllMenus();
console.log('Menús después de recargar:', menus?.length);
```

---

## 🧪 TEST 13: Verificar localStorage

### Pasos:
1. Abrir la consola del navegador
2. Ir a la pestaña "Application" (Chrome) o "Storage" (Firefox)
3. Expandir "Local Storage"
4. Click en tu dominio
5. Buscar la clave `recetario_menus`

### ✅ Resultado Esperado:
- Existe la clave `recetario_menus`
- Contiene un array JSON con los menús
- Los datos coinciden con lo que ves en la app

### 🔍 Verificar en Consola:
```javascript
const stored = localStorage.getItem('recetario_menus');
const menus = JSON.parse(stored);
console.log('Menús en localStorage:', menus);
```

---

## 🧪 TEST 14: Limpiar Test

### Pasos:
1. Eliminar el menú "Test MenuManager EDITADO"
2. Verificar que la lista vuelve a su estado original

---

## 📊 Resumen de Resultados

Marca cada test completado:

- [ ] TEST 1: MenuManager cargado
- [ ] TEST 2: menuManager inicializado
- [ ] TEST 3: Ver menús existentes
- [ ] TEST 4: Crear menú nuevo
- [ ] TEST 5: Editar menú
- [ ] TEST 6: Habilitar/Deshabilitar
- [ ] TEST 7: Marcar como filtro
- [ ] TEST 8: Duplicar menú
- [ ] TEST 9: Exportar XML
- [ ] TEST 10: Copiar al portapapeles
- [ ] TEST 11: Eliminar menú
- [ ] TEST 12: Persistencia (recarga)
- [ ] TEST 13: localStorage
- [ ] TEST 14: Limpiar test

---

## 🐛 Problemas Comunes

### Error: "MenuManager is not defined"
**Solución:** Verificar que `menu-manager.js` está en index.html antes de `script.js`

### Error: "Cannot read property 'menuManager' of undefined"
**Solución:** Verificar que `this.menuManager = new MenuManager()` está en el constructor de RecipeApp

### Error: "this.menuManager.getAllMenus is not a function"
**Solución:** Verificar que menu-manager.js se cargó correctamente (sin errores de sintaxis)

### Los menús no se guardan
**Solución:** Verificar que `menuManager.saveMenus()` se llama después de cada cambio

### Los menús no aparecen después de recargar
**Solución:** Verificar que `menuManager.loadMenus()` se llama en el constructor

---

## ✅ Test Exitoso

Si todos los tests pasan:
- ✅ MenuManager está funcionando correctamente
- ✅ La migración fue exitosa
- ✅ Puedes continuar con más migraciones

## ❌ Test Fallido

Si algún test falla:
- 🔍 Revisar la consola para ver el error exacto
- 📝 Anotar qué test falló y qué error apareció
- 🔧 Corregir el error antes de continuar

---

## 📞 Siguiente Paso

Una vez que todos los tests pasen, podemos:
1. Continuar reemplazando más funciones de menús
2. Eliminar funciones duplicadas de script.js
3. Verificar que script.js tiene menos líneas
