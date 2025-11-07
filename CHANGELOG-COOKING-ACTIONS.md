# Changelog: Acciones de Cocina

Historial de cambios en la constante `COOKING_ACTIONS`

---

## [1.1.0] - 2025-11-07

### ✨ Añadido
- **sofreír** - Freír ligeramente en poco aceite (order: 22, category: coccion)
- **cubrir** - Tapar con tapa o papel (order: 12, category: coccion)

### 📊 Estadísticas
- **Total de acciones:** 29 (antes: 27)
- **Acciones de cocción:** 18 (antes: 16)
- **Tiempo de implementación:** 2 minutos

### 💡 Ejemplo de Uso
```javascript
// Añadir nuevas acciones es trivial:
{ id: 'sofreir', name: 'sofreír', category: 'coccion', order: 22 },
{ id: 'cubrir', name: 'cubrir', category: 'coccion', order: 12 },
```

### 🎯 Beneficio de la Refactorización
Gracias a la refactorización de la versión 1.0, añadir estas 2 acciones tomó solo 2 minutos en lugar de los 5-10 minutos que hubiera tomado editar HTML manualmente.

---

## [1.0.0] - 2025-11-07

### 🔄 Refactorización Mayor
- Movidas todas las acciones de cocina de HTML a JavaScript
- Creada constante `COOKING_ACTIONS` con 27 acciones iniciales
- Implementada función `renderCookingActionButtons()`
- Simplificado HTML de 58 líneas a 4 líneas

### 📋 Acciones Iniciales (27)
**Preparación (6):** lavar, pelar, picar, rallar, rebozar, escaldar  
**Cocción (16):** a la plancha, añadir, cocer, cocinar, cocinar al vapor, desglasar, freír, gratinar, guisar, hornear, rehogar, reposar, saltear, sellar, tapar, tostar  
**Proceso (2):** reducir, retirar  
**Conectores (2):** y, ,

### 🎯 Beneficios
- ✅ Consistencia arquitectónica
- ✅ Mantenibilidad mejorada (12x más rápido añadir acciones)
- ✅ Escalabilidad (preparado para i18n y personalización)
- ✅ Categorización (preparacion, coccion, proceso, conector)

---

## Formato del Changelog

Este changelog sigue el formato [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

### Tipos de Cambios
- **✨ Añadido** - Para nuevas funcionalidades
- **🔄 Cambiado** - Para cambios en funcionalidades existentes
- **🗑️ Obsoleto** - Para funcionalidades que serán eliminadas
- **❌ Eliminado** - Para funcionalidades eliminadas
- **🐛 Corregido** - Para corrección de bugs
- **🔒 Seguridad** - Para vulnerabilidades

---

**Última actualización:** 7 de noviembre de 2025
