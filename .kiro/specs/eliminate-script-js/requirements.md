# Requirements Document - Eliminación de script.js

## Introduction

Este documento define los requisitos para eliminar o reducir al mínimo necesario el archivo `script.js`, que actualmente contiene 1,130 líneas de código (reducido desde 14,102 líneas originales). 

**Contexto:** Ya se han completado las Fases 1-3 del spec `javascript-audit`:
- ✅ Fase 1-2: Utilidades creadas (validation.js, dom.js, storage.js, format.js, EventBus.js)
- ✅ Fase 3: Servicios creados (RecipeService.js, CategoryService.js, XMLService.js)

La aplicación ya cuenta con una arquitectura modular en la carpeta `js/` con 8 módulos funcionales (~2,200 líneas de código reutilizable). El objetivo es completar las Fases 4-5 del plan de refactorización: migrar toda la funcionalidad restante de `script.js` a módulos especializados, dejando solo un archivo de inicialización mínimo.

**Referencias:**
- Ver `.kiro/specs/javascript-audit/INFORME-AUDITORIA-JS.md` para el análisis completo
- Ver `.kiro/specs/javascript-audit/PROGRESO-REFACTORIZACION.md` para el estado actual
- Ver `.kiro/specs/javascript-audit/PLAN-MIGRACION-ARCHIVOS.md` para el plan de archivos

## Glossary

- **System**: La aplicación web "Recetario Personal"
- **script.js**: Archivo JavaScript monolítico en la raíz del proyecto
- **Módulos**: Archivos JavaScript organizados en la carpeta `js/` con responsabilidades específicas
- **RecipeApp**: Clase principal que controla la aplicación
- **Servicios**: Módulos que manejan lógica de negocio (RecipeService, CategoryService, XMLService)
- **UI Components**: Módulos que manejan componentes de interfaz de usuario
- **Inicialización**: Código mínimo necesario para arrancar la aplicación

## Requirements

### Requirement 1: Análisis de Código Restante en script.js

**User Story:** Como desarrollador, quiero entender qué funcionalidad queda en script.js (1,130 líneas), para poder planificar su migración a módulos especializados según el plan de refactorización existente.

#### Acceptance Criteria

1. WHEN el desarrollador revisa script.js, THE System SHALL identificar todas las clases (RecipeApp, CategoryManager, ShoppingListManager) y sus responsabilidades
2. THE System SHALL categorizar el código restante por tipo: UI components (~60%), lógica de negocio (~20%), utilidades (~10%), inicialización (~10%)
3. THE System SHALL identificar qué funcionalidades de RecipeApp ya están implementadas en RecipeService, CategoryService y XMLService
4. THE System SHALL documentar qué clases (CategoryManager, ShoppingListManager) necesitan convertirse en servicios
5. THE System SHALL estimar que ~40% del código puede eliminarse (duplicado con servicios) y ~60% debe migrarse a componentes UI

### Requirement 2: Identificación de Código Duplicado

**User Story:** Como desarrollador, quiero identificar código en script.js que ya existe en los módulos, para eliminarlo sin perder funcionalidad.

#### Acceptance Criteria

1. WHEN el desarrollador compara script.js con los servicios existentes, THE System SHALL identificar funciones duplicadas en RecipeService
2. THE System SHALL identificar funciones duplicadas en CategoryService
3. THE System SHALL identificar funciones duplicadas en XMLService
4. THE System SHALL identificar utilidades duplicadas en dom.js, validation.js, format.js y storage.js
5. THE System SHALL listar todas las funciones que pueden ser eliminadas inmediatamente

### Requirement 3: Extracción de Componentes UI (Fase 4 del Plan)

**User Story:** Como desarrollador, quiero extraer los componentes de UI de script.js a módulos especializados según la Fase 4 del plan de refactorización, para tener una arquitectura más mantenible.

#### Acceptance Criteria

1. THE System SHALL crear `js/ui/ModalManager.js` para gestionar todos los modales (category-modal, emoji-picker, color-picker, image-modal, etc.)
2. THE System SHALL crear `js/ui/NotificationManager.js` para gestionar toasts y notificaciones de error/éxito
3. THE System SHALL crear `js/ui/ThemeManager.js` para gestionar el tema claro/oscuro y persistencia en localStorage
4. THE System SHALL crear `js/features/recipes/RecipeList.js` para renderizado de lista/grid de recetas
5. THE System SHALL crear `js/features/recipes/RecipeDetail.js` para vista de detalle de receta
6. THE System SHALL crear `js/features/recipes/RecipeForm.js` para formulario de creación/edición
7. WHERE existan componentes de UI en RecipeApp, THE System SHALL migrarlos a sus módulos correspondientes manteniendo la funcionalidad

### Requirement 4: Separación de Lógica de Negocio a Servicios

**User Story:** Como desarrollador, quiero que toda la lógica de negocio esté en servicios, no en script.js, para facilitar testing y reutilización.

#### Acceptance Criteria

1. WHEN CategoryManager existe en script.js, THE System SHALL migrar su funcionalidad a CategoryService existente (eliminar duplicación)
2. WHEN ShoppingListManager existe en script.js, THE System SHALL crear `js/services/ShoppingListService.js` con toda su lógica
3. WHEN exista lógica de menús en RecipeApp, THE System SHALL crear `js/services/MenuService.js` para gestionar menús
4. THE System SHALL verificar que RecipeService ya contiene toda la lógica de recetas de RecipeApp
5. THE System SHALL asegurar que los componentes UI solo llamen a servicios, sin contener lógica de negocio
6. THE System SHALL eliminar las clases CategoryManager y ShoppingListManager de script.js una vez migradas

### Requirement 5: Creación de Archivo de Inicialización Mínimo (Fase 5 del Plan)

**User Story:** Como desarrollador, quiero un archivo de inicialización mínimo que solo arranque la aplicación, para tener un punto de entrada claro y simple.

#### Acceptance Criteria

1. THE System SHALL crear `js/core/App.js` que contenga solo la orquestación de inicialización (sin lógica de negocio ni UI)
2. THE System SHALL crear `main.js` en la raíz con menos de 50 líneas que importe App y lo inicialice
3. THE System SHALL asegurar que App.js solo importe y coordine servicios y componentes, sin duplicar funcionalidad
4. THE System SHALL asegurar que main.js solo contenga imports de módulos y una llamada `new App().init()`
5. THE System SHALL renombrar script.js a script.js.backup antes de eliminarlo
6. THE System SHALL eliminar script.js completamente una vez verificado que todo funciona con main.js

### Requirement 6: Actualización de Referencias HTML

**User Story:** Como desarrollador, quiero que los archivos HTML referencien los nuevos módulos en lugar de script.js, para completar la migración.

#### Acceptance Criteria

1. WHEN index.html referencia script.js, THE System SHALL actualizarlo para usar main.js con type="module"
2. THE System SHALL asegurar que todos los módulos se carguen correctamente como ES6 modules
3. THE System SHALL verificar que no haya referencias globales rotas después de la migración
4. THE System SHALL asegurar que la aplicación funcione exactamente igual después de la migración
5. THE System SHALL eliminar cualquier código de compatibilidad temporal (window.* assignments)

### Requirement 7: Mantenimiento de Funcionalidad Existente

**User Story:** Como usuario de la aplicación, quiero que todas las funcionalidades sigan funcionando después de la refactorización, sin perder ninguna característica.

#### Acceptance Criteria

1. THE System SHALL mantener todas las funcionalidades de gestión de recetas (crear, editar, eliminar, ver)
2. THE System SHALL mantener todas las funcionalidades de filtrado y búsqueda
3. THE System SHALL mantener todas las funcionalidades de categorías personalizadas
4. THE System SHALL mantener todas las funcionalidades de listas de compra y menús
5. THE System SHALL mantener todas las funcionalidades de import/export XML

### Requirement 8: Mejora de Rendimiento

**User Story:** Como usuario de la aplicación, quiero que la aplicación cargue más rápido después de la refactorización, aprovechando la carga modular.

#### Acceptance Criteria

1. THE System SHALL implementar lazy loading para módulos no críticos
2. THE System SHALL cargar solo los módulos necesarios para la vista inicial
3. THE System SHALL reducir el tamaño del bundle inicial en al menos 50%
4. THE System SHALL medir y documentar las mejoras de rendimiento
5. THE System SHALL asegurar que el tiempo de carga inicial sea menor que con script.js

### Requirement 9: Documentación de la Nueva Arquitectura

**User Story:** Como desarrollador, quiero documentación clara de la nueva arquitectura, para entender cómo está organizado el código.

#### Acceptance Criteria

1. THE System SHALL crear un documento que explique la estructura de carpetas y módulos
2. THE System SHALL documentar el flujo de inicialización de la aplicación
3. THE System SHALL documentar cómo añadir nuevas funcionalidades sin tocar main.js
4. THE System SHALL crear ejemplos de uso de los servicios y componentes
5. THE System SHALL documentar las ventajas de la nueva arquitectura vs script.js

### Requirement 10: Plan de Rollback

**User Story:** Como desarrollador, quiero un plan de rollback en caso de problemas, para poder volver a la versión anterior si es necesario.

#### Acceptance Criteria

1. THE System SHALL mantener una copia de script.js como script.js.backup antes de eliminarlo
2. THE System SHALL documentar los pasos para revertir a script.js si es necesario
3. THE System SHALL crear un branch de Git antes de la migración final
4. THE System SHALL verificar que todos los tests pasen antes de eliminar script.js
5. THE System SHALL tener un plan de testing exhaustivo antes de la eliminación final
