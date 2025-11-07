# 🚀 Recipe Content Manager - Inicio Rápido

Guía rápida de 5 minutos para empezar a usar el CMS.

---

## ⚡ Inicio en 3 Pasos

### 1️⃣ Abrir el CMS
```
Abre recipe-manager.html en tu navegador
```

### 2️⃣ Cargar XML
```
Click en "Cargar XML" → Selecciona tu archivo XML
```

### 3️⃣ ¡Listo!
```
Ya puedes editar, filtrar y exportar tus recetas
```

---

## 🎯 Tareas Comunes

### ✏️ Editar una Receta
1. Busca la receta en la tabla
2. Click en el botón de editar (✏️)
3. Modifica los campos
4. Click en "Guardar Cambios"

### 📝 Editar Múltiples Recetas
1. Marca los checkboxes de las recetas
2. Click en "Editar Seleccionadas"
3. Marca los campos a actualizar
4. Ingresa los nuevos valores
5. Click en "Aplicar Cambios"

### 🔍 Buscar y Reemplazar
1. Click en "Buscar y Reemplazar"
2. Selecciona el campo (ej: Autor)
3. Buscar: "texto viejo"
4. Reemplazar: "texto nuevo"
5. Click en "Reemplazar"

### 💾 Guardar Cambios
```
Ctrl+S  o  Click en "Descargar XML"
```

### ⏮️ Deshacer
```
Ctrl+Z  o  Click en "Deshacer"
```

---

## 🔍 Filtros Rápidos

### Por Categoría
```
Sidebar → Categoría → Selecciona una
```

### Por Autor
```
Sidebar → Autor → Selecciona uno
```

### Recetas Incompletas
```
Sidebar → Sección "Recetas Incompletas" → Click en una
```

### Sin Autor
```
Sidebar → Checkbox "Sin autor"
```

### Sin Imágenes
```
Sidebar → Checkbox "Sin imágenes"
```

---

## ⌨️ Atajos Esenciales

| Atajo | Acción |
|-------|--------|
| `Ctrl+S` | Descargar XML |
| `Ctrl+Z` | Deshacer |
| `Ctrl+F` | Buscar |
| `Escape` | Cerrar modal |

---

## 📊 Dashboard

Al cargar un XML verás:
- **Total Recetas**: Número total
- **Categorías**: Cuántas categorías diferentes
- **Con Autor**: Porcentaje de recetas con autor
- **Con Imágenes**: Porcentaje de recetas con imágenes
- **Apto Caravana**: Número de recetas aptas
- **Apto Hospital**: Número de recetas aptas

---

## 🎓 Casos de Uso Rápidos

### Caso 1: Añadir autor a todas las recetas sin autor
```
1. Sidebar → Checkbox "Sin autor"
2. Click en "Seleccionar todas"
3. Click en "Editar Seleccionadas"
4. Marca "Actualizar Autor"
5. Escribe el nombre del autor
6. Selecciona "Solo si está vacío"
7. Click en "Aplicar Cambios"
8. Ctrl+S para guardar
```

### Caso 2: Corregir error de escritura
```
1. Click en "Buscar y Reemplazar"
2. Campo: "Autor"
3. Buscar: "Jhon"
4. Reemplazar: "John"
5. Click en "Vista Previa" (ver cuántas)
6. Click en "Reemplazar"
7. Ctrl+S para guardar
```

### Caso 3: Cambiar categoría de varias recetas
```
1. Sidebar → Categoría → "Postres"
2. Marca las recetas que quieres cambiar
3. Click en "Editar Seleccionadas"
4. Marca "Actualizar Categoría"
5. Selecciona nueva categoría
6. Click en "Aplicar Cambios"
7. Ctrl+S para guardar
```

### Caso 4: Exportar recetas filtradas a Excel
```
1. Aplica los filtros que necesites
2. Click en "Exportar CSV"
3. Abre el archivo en Excel
```

---

## 💡 Tips Rápidos

### ✓ Ordenar Tabla
Click en cualquier encabezado de columna (Nombre, Categoría, Autor, Tiempo)

### ✓ Selección Rápida
- Click en checkbox del header → Selecciona todas
- Shift+Click → Selecciona rango
- Ctrl+Click → Selección múltiple

### ✓ Ver Recetas Incompletas
Sidebar → Sección "Recetas Incompletas" → Click en cualquiera para editarla

### ✓ Limpiar Filtros
Sidebar → Botón "Limpiar Filtros"

### ✓ Ayuda
Header → Botón "Ayuda" (?) → Ver todos los atajos y funcionalidades

---

## ⚠️ Importante

### Antes de Empezar
- Haz un backup de tu XML original
- El CMS crea backups automáticos en localStorage

### Al Terminar
- Descarga el XML actualizado (Ctrl+S)
- Guarda el archivo con un nombre descriptivo
- Importa el XML en la aplicación principal

### Si Algo Sale Mal
- Ctrl+Z para deshacer
- O restaura desde backup (localStorage)

---

## 🎯 Flujo de Trabajo Recomendado

```
1. Cargar XML
   ↓
2. Revisar Dashboard (estadísticas)
   ↓
3. Identificar problemas (recetas incompletas)
   ↓
4. Aplicar filtros necesarios
   ↓
5. Editar recetas (individual o lote)
   ↓
6. Verificar cambios
   ↓
7. Descargar XML (Ctrl+S)
   ↓
8. Importar en app principal
```

---

## 📱 Responsive

El CMS funciona en:
- ✅ Desktop (recomendado)
- ✅ Tablet (funcional)
- ⚠️ Móvil (limitado, mejor usar desktop)

---

## 🆘 Problemas Comunes

### No se carga el XML
- Verifica que sea un archivo XML válido
- Debe tener el elemento raíz `<recipes>`
- Revisa la consola del navegador (F12)

### Los cambios no se guardan
- Debes descargar el XML (Ctrl+S)
- Los cambios solo están en memoria hasta que descargas

### No puedo deshacer
- Solo se guardan los últimos 50 cambios
- Si no hay cambios, el botón está deshabilitado

### Las estadísticas no se actualizan
- Deberían actualizarse automáticamente
- Recarga la página si hay problemas

---

## 📚 Más Información

Para documentación completa, ver:
- [RECIPE-MANAGER-README.md](RECIPE-MANAGER-README.md) - Documentación completa
- [DOCUMENTACION-INDICE.md](DOCUMENTACION-INDICE.md) - Índice de toda la documentación

---

## ✅ Checklist de Primera Vez

- [ ] Abrir `recipe-manager.html`
- [ ] Cargar `recetas-ejemplo.xml` (archivo de prueba)
- [ ] Explorar el dashboard
- [ ] Probar búsqueda y filtros
- [ ] Editar una receta
- [ ] Probar edición en lote
- [ ] Probar buscar y reemplazar
- [ ] Descargar XML (Ctrl+S)
- [ ] Probar deshacer (Ctrl+Z)
- [ ] Ver modal de ayuda (botón ?)

---

**¡Listo para empezar!** 🎉

Abre `recipe-manager.html` y carga tu XML para comenzar.

---

**Última actualización**: 7 de noviembre de 2025  
**Versión**: 1.0
