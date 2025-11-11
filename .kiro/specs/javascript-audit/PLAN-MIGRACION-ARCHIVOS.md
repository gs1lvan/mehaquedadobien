# Plan de Migración de Archivos JavaScript

## Archivos en la Raíz - Análisis

| Archivo | Líneas | Tamaño | Estado | Acción Recomendada |
|---------|--------|--------|--------|-------------------|
| `script.js` | 14,102 | 518 KB | 🔴 Crítico | **MANTENER** temporalmente, migrar gradualmente |
| `models.js` | 2,984 | 115 KB | 🟡 Importante | **MOVER** a `js/models/` |
| `recipe-manager.js` | 2,415 | 96 KB | 🟡 Importante | **MANTENER** (específico de recipe-manager.html) |
| `xml-constants.js` | 166 | 4 KB | 🟢 Pequeño | **MOVER** a `js/constants/` |
| `sw.js` | 156 | 5 KB | 🟢 Necesario | **MANTENER** (Service Worker debe estar en raíz) |
| `categories.js` | 31 | 2 KB | 🟢 Pequeño | **MOVER** a `js/constants/` |
| `appliances.js` | 23 | 1 KB | 🟢 Pequeño | **MOVER** a `js/constants/` |

## Decisiones por Archivo

### 1. script.js (14,102 líneas) 🔴

**Decisión: MANTENER temporalmente**

**Razón:**
- Es el archivo principal de la aplicación
- Contiene toda la lógica actual que funciona
- Necesita migración gradual, no se puede mover de golpe

**Plan:**
1. Mantener en raíz mientras se migra gradualmente
2. Ir extrayendo funcionalidades a los nuevos módulos
3. Reemplazar código con imports de servicios
4. Eventualmente quedará como un archivo pequeño de inicialización

**Prioridad:** Baja (migración gradual en Fase 5)

---

### 2. models.js (2,984 líneas) 🟡

**Decisión: MOVER a `js/models/`**

**Razón:**
- Contiene las clases de modelos (Recipe, Ingredient, Sequence, etc.)
- Ya tenemos la carpeta `js/models/` creada
- Es código bien estructurado que se puede mover fácilmente

**Plan:**
1. Dividir `models.js` en archivos individuales:
   - `js/models/Recipe.js`
   - `js/models/Ingredient.js`
   - `js/models/Sequence.js`
   - `js/models/ShoppingList.js`
   - `js/models/Menu.js`
   - `js/models/Category.js`
2. Crear `js/models/index.js` para exportar todos
3. Actualizar imports en `script.js`
4. Eliminar `models.js` de la raíz

**Prioridad:** Alta ✅

---

### 3. recipe-manager.js (2,415 líneas) 🟡

**Decisión: MANTENER en raíz**

**Razón:**
- Es específico para `recipe-manager.html`
- Funciona independientemente de `script.js`
- No interfiere con la nueva arquitectura

**Plan:**
1. Mantener en raíz
2. Puede usar los nuevos servicios cuando sea necesario
3. Eventualmente podría refactorizarse, pero no es prioritario

**Prioridad:** Baja (no urgente)

---

### 4. xml-constants.js (166 líneas) 🟢

**Decisión: MOVER a `js/constants/`**

**Razón:**
- Son constantes relacionadas con XML
- Ya tenemos la carpeta `js/constants/` creada
- Fácil de mover

**Plan:**
1. Mover a `js/constants/xml-constants.js`
2. Actualizar imports en archivos que lo usen
3. Eliminar de raíz

**Prioridad:** Media ✅

---

### 5. sw.js (156 líneas) 🟢

**Decisión: MANTENER en raíz**

**Razón:**
- Los Service Workers DEBEN estar en la raíz del sitio
- Es un requisito técnico de PWA
- No se puede mover

**Plan:**
1. Mantener en raíz (obligatorio)
2. No requiere cambios

**Prioridad:** N/A (debe quedarse en raíz)

---

### 6. categories.js (31 líneas) 🟢

**Decisión: MOVER a `js/constants/`**

**Razón:**
- Son constantes de categorías predefinidas
- Ya están incluidas en `CategoryService.js`
- Probablemente duplicado

**Plan:**
1. Verificar si está duplicado con `CategoryService.js`
2. Si está duplicado, eliminar
3. Si tiene contenido único, mover a `js/constants/categories.js`

**Prioridad:** Alta ✅

---

### 7. appliances.js (23 líneas) 🟢

**Decisión: MOVER a `js/constants/`**

**Razón:**
- Son constantes de aparatos de cocina
- Pequeño y fácil de mover
- Debería estar en `js/constants/`

**Plan:**
1. Mover a `js/constants/appliances.js`
2. Actualizar imports
3. Eliminar de raíz

**Prioridad:** Alta ✅

---

## Plan de Acción Inmediato

### Fase A: Mover Constantes (Rápido, bajo riesgo) ✅

**Archivos a mover:**
1. ✅ `appliances.js` → `js/constants/appliances.js`
2. ✅ `categories.js` → `js/constants/categories.js` (o eliminar si duplicado)
3. ✅ `xml-constants.js` → `js/constants/xml-constants.js`

**Tiempo estimado:** 10-15 minutos  
**Riesgo:** Bajo  
**Beneficio:** Organización inmediata

---

### Fase B: Dividir models.js (Medio, riesgo medio) ✅

**Archivos a crear:**
1. ✅ `js/models/Recipe.js`
2. ✅ `js/models/Ingredient.js`
3. ✅ `js/models/Sequence.js`
4. ✅ `js/models/ShoppingList.js`
5. ✅ `js/models/Menu.js`
6. ✅ `js/models/Category.js`
7. ✅ `js/models/index.js` (exporta todos)

**Tiempo estimado:** 30-45 minutos  
**Riesgo:** Medio  
**Beneficio:** Modelos organizados y reutilizables

---

### Fase C: Mantener en Raíz (No acción)

**Archivos que se quedan:**
- ✅ `sw.js` (obligatorio en raíz)
- ✅ `recipe-manager.js` (específico, no urgente)
- ✅ `script.js` (migración gradual en Fase 5)

---

## Estructura Final Propuesta

```
raíz/
├── sw.js ✅ (Service Worker - debe estar en raíz)
├── script.js ✅ (temporal, se migrará gradualmente)
├── recipe-manager.js ✅ (específico de recipe-manager.html)
└── js/
    ├── core/
    │   └── EventBus.js ✅
    ├── utils/
    │   ├── validation.js ✅
    │   ├── dom.js ✅
    │   ├── storage.js ✅
    │   └── format.js ✅
    ├── services/
    │   ├── RecipeService.js ✅
    │   ├── CategoryService.js ✅
    │   └── XMLService.js ✅
    ├── models/
    │   ├── Recipe.js ⏳
    │   ├── Ingredient.js ⏳
    │   ├── Sequence.js ⏳
    │   ├── ShoppingList.js ⏳
    │   ├── Menu.js ⏳
    │   ├── Category.js ⏳
    │   └── index.js ⏳
    ├── constants/
    │   ├── appliances.js ⏳
    │   ├── categories.js ⏳
    │   └── xml-constants.js ⏳
    ├── ui/ (Fase 4)
    └── features/ (Fase 4)
```

## Resumen

### Archivos a Mover: 4
- ✅ `appliances.js` → `js/constants/`
- ✅ `categories.js` → `js/constants/`
- ✅ `xml-constants.js` → `js/constants/`
- ✅ `models.js` → dividir en `js/models/`

### Archivos a Mantener: 3
- ✅ `sw.js` (obligatorio en raíz)
- ✅ `script.js` (migración gradual)
- ✅ `recipe-manager.js` (específico)

### Beneficios
- ✅ Organización clara
- ✅ Separación de responsabilidades
- ✅ Fácil de encontrar archivos
- ✅ Preparado para escalabilidad

### Riesgos
- 🟡 Actualizar imports en archivos existentes
- 🟡 Posibles referencias rotas temporalmente
- 🟢 Bajo riesgo si se hace con cuidado

## Recomendación

**Empezar con Fase A (mover constantes)** - Es rápido, seguro y da resultados inmediatos.

¿Quieres que proceda con la Fase A automáticamente?
