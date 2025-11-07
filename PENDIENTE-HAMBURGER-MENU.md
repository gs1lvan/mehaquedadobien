# Tareas Pendientes: hamburger-menu-always

## Resumen
**Estado actual:** 9 de 16 tareas completadas (56%)

El menú hamburguesa funciona correctamente, pero faltan mejoras de accesibilidad, limpieza de código y testing completo.

---

## ❌ Tareas Pendientes (7 tareas)

### 1. HTML - Actualizar IDs (Tarea 1.3)
**Prioridad:** Media  
**Tiempo estimado:** 30 minutos

Cambiar los IDs de los botones del menú para eliminar el prefijo "mobile-":
- `mobile-theme-toggle` → `theme-toggle-btn`
- `mobile-manage-categories` → `manage-categories-btn`
- `mobile-import-xml` → `import-xml-btn`
- `mobile-export-all` → `export-all-btn`
- `mobile-new-recipe` → `new-recipe-btn`

**Archivos afectados:**
- `index.html` (actualizar IDs)
- `script.js` (actualizar referencias en event listeners)

---

### 2. HTML - Añadir atributos ARIA (Tarea 1.4)
**Prioridad:** Alta (Accesibilidad)  
**Tiempo estimado:** 20 minutos

Añadir atributos ARIA al botón del menú y elementos:
```html
<button id="menu-btn" 
        aria-label="Menú de opciones"
        aria-expanded="false"
        aria-haspopup="true">
```

```html
<div id="menu-dropdown" role="menu">
  <button role="menuitem">...</button>
</div>
```

**Archivos afectados:**
- `index.html`

---

### 3. HTML - Actualizar emoji del tema (Tarea 1.5)
**Prioridad:** Baja  
**Tiempo estimado:** 5 minutos

Cambiar el emoji del botón de tema:
- De: 🌙 (luna)
- A: ☀️ (sol)

**Archivos afectados:**
- `index.html`

---

### 4. CSS - Limpieza de clases (Tareas 2.1, 2.2, 2.3, 2.4)
**Prioridad:** Media  
**Tiempo estimado:** 45 minutos

**2.1 - Ocultar header-actions permanentemente:**
```css
.header-actions { 
  display: none !important; 
}
```
Eliminar media queries relacionadas con `.header-actions`

**2.2 - Hacer menú siempre visible:**
```css
.menu-btn {
  display: block; /* Siempre visible */
}
```
Eliminar media queries que ocultan/muestran el botón

**2.3 - Renombrar clases CSS:**
- `.mobile-menu` → `.menu-dropdown`
- `.mobile-menu.active` → `.menu-dropdown.active`
- `.mobile-menu-item` → `.menu-item`
- `.mobile-menu-item-primary` → `.menu-item-primary`

**2.4 - Verificar z-index:**
- `.menu-dropdown` debe tener `z-index: 1000` o superior
- `.header-content` debe tener `position: relative`

**Archivos afectados:**
- `styles.css`

---

### 5. JavaScript - Actualizar referencias (Tareas 3.3, 3.4, 3.5, 3.6)
**Prioridad:** Alta  
**Tiempo estimado:** 40 minutos

**3.3 - Actualizar referencias del menú:**
```javascript
// Cambiar referencias de:
document.getElementById('mobile-menu-btn')
document.getElementById('mobile-menu')

// A:
document.getElementById('menu-btn')
document.getElementById('menu-dropdown')
```

**3.4 - Crear función closeMenu():**
```javascript
closeMenu() {
  const menu = document.getElementById('menu-dropdown');
  const menuBtn = document.getElementById('menu-btn');
  
  menu.classList.remove('active');
  menuBtn.setAttribute('aria-expanded', 'false');
}
```

**3.5 - Actualizar ARIA dinámicamente:**
```javascript
// Al abrir menú:
menuBtn.setAttribute('aria-expanded', 'true');

// Al cerrar menú:
menuBtn.setAttribute('aria-expanded', 'false');
```

**3.6 - Click fuera para cerrar:**
```javascript
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    this.closeMenu();
  }
});
```

**Archivos afectados:**
- `script.js`

---

### 6. Testing Manual (Tareas 4.1, 4.2, 4.4)
**Prioridad:** Alta  
**Tiempo estimado:** 30 minutos

**4.1 - Test de toggle:**
- ✓ Click en botón → menú abre
- ✓ Click de nuevo → menú cierra
- ✓ Click fuera → menú cierra

**4.2 - Test de acciones:**
- ✓ Tema → cambia y cierra menú
- ✓ Categorías → abre modal y cierra menú
- ✓ Importar → abre file picker y cierra menú
- ✓ Exportar → descarga XML y cierra menú
- ✓ Nueva Receta → abre formulario y cierra menú

**4.4 - Test de teclado:**
- ✓ Tab → foco en botón menú
- ✓ Enter → abre menú
- ✓ Tab → navega por items
- ✓ Enter en item → ejecuta acción
- ✓ Escape → cierra menú

---

### 7. Verificación Final (Tareas 5.1, 5.2, 5.3, 5.4, 5.5)
**Prioridad:** Media  
**Tiempo estimado:** 30 minutos

**5.1 - Consola sin errores:**
- Abrir DevTools
- Ejecutar todas las acciones del menú
- Verificar que no hay errores JavaScript

**5.2 - Sin event listeners duplicados:**
- Verificar que cada acción se ejecuta solo una vez
- Verificar que el menú cierra correctamente

**5.3 - Persistencia de tema:**
- Cambiar tema
- Recargar página
- Verificar que el tema persiste

**5.4 - Import/Export:**
- Importar archivo XML
- Verificar que funciona
- Exportar todas las recetas
- Verificar descarga

**5.5 - Regresión visual:**
- Comparar con diseño original
- Verificar espaciado, colores, fuentes
- Verificar estados hover/active
- Verificar gradiente en botón "Nueva Receta"

---

## Orden Recomendado de Implementación

### Fase 1: Limpieza de Código (1-2 horas)
1. Actualizar IDs en HTML (Tarea 1.3)
2. Actualizar referencias en JavaScript (Tarea 3.3)
3. Renombrar clases CSS (Tarea 2.3)
4. Limpiar media queries (Tareas 2.1, 2.2)

### Fase 2: Accesibilidad (30-45 minutos)
5. Añadir atributos ARIA (Tarea 1.4)
6. Actualizar ARIA dinámicamente (Tarea 3.5)
7. Crear función closeMenu() (Tarea 3.4)
8. Añadir click-outside (Tarea 3.6)

### Fase 3: Testing (1 hora)
9. Testing manual completo (Tareas 4.1, 4.2, 4.4)
10. Verificación final (Tareas 5.1-5.5)

### Fase 4: Detalles Finales (5 minutos)
11. Actualizar emoji del tema (Tarea 1.5)

---

## Impacto de las Tareas Pendientes

### ✅ Lo que ya funciona:
- Menú hamburguesa visible en todas las resoluciones
- Todas las acciones del menú funcionan correctamente
- Responsive design básico
- Estructura HTML simplificada

### ⚠️ Lo que falta:
- **Accesibilidad:** Falta soporte completo de teclado y lectores de pantalla
- **Limpieza de código:** IDs y clases con prefijo "mobile-" obsoleto
- **Testing:** Falta verificación exhaustiva de todos los casos
- **CSS:** Media queries y clases obsoletas sin limpiar

### 🎯 Beneficios de completar:
- ✅ Código más limpio y mantenible
- ✅ Mejor accesibilidad (WCAG compliance)
- ✅ Navegación por teclado completa
- ✅ Compatibilidad con lectores de pantalla
- ✅ Sin deuda técnica

---

## Tiempo Total Estimado
**3-4 horas** para completar todas las tareas pendientes

## Conclusión
El menú funciona correctamente para usuarios con mouse/touch, pero necesita mejoras de accesibilidad y limpieza de código para considerarse completamente terminado.
