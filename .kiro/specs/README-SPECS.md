# 📋 Especificaciones del Proyecto

Este directorio contiene todas las especificaciones (specs) de las funcionalidades implementadas en mehaquedadobien.

---

## 📁 Estructura de una Spec

Cada spec tiene su propio directorio con 3 archivos:

```
.kiro/specs/nombre-de-la-spec/
├── requirements.md  - Requisitos funcionales (EARS + INCOSE)
├── design.md        - Diseño y arquitectura
└── tasks.md         - Plan de implementación
```

---

## 📊 Specs Disponibles

### ✅ Completadas (11)

#### 1. copy-ingredients-from-card
**Copiar ingredientes al portapapeles**
- Badge clickeable en tarjetas
- Copia lista formateada
- Notificación de éxito

#### 2. custom-categories
**Categorías personalizadas**
- Crear categorías propias
- Editar y eliminar
- Emoji y color personalizado

#### 3. hospital-food-filter
**Filtro para dietas especiales**
- Categoría "Hospital"
- Chip de filtro
- Recetas aptas para dietas médicas

#### 4. modal-navigation-flow
**Navegación entre modales**
- Sistema de pila de modales
- Navegación lógica
- Z-index automático

#### 5. modal-triggers-normalization
**Estilos consistentes**
- Archivo CSS centralizado
- Clases reutilizables
- Badges y botones normalizados

#### 6. recipe-photo-gallery
**Galería de fotos**
- Múltiples imágenes
- Navegación con flechas
- Miniaturas
- Modal ampliado

#### 7. shopping-lists
**Listas de compra**
- Crear múltiples listas
- Marcar completados
- Copiar al portapapeles
- Integración con recetas

#### 8. sortable-list-view
**Vista de lista ordenable**
- Toggle Grid/List
- Ordenamiento por columnas
- Indicadores visuales

#### 9. unified-time-input
**Entrada de tiempo unificada**
- Campos separados horas/minutos
- Funciones centralizadas
- Formato consistente

#### 10. recipe-content-manager ⭐
**CMS completo**
- Gestión masiva de recetas
- Dashboard con estadísticas
- Edición individual y en lote
- Buscar y reemplazar
- Exportación XML/CSV
- Historial y deshacer

### ⚠️ En Progreso (1)

#### 12. hamburger-menu-always (56%)
**Menú unificado**
- Menú hamburguesa en todas las resoluciones
- Interfaz más limpia
- Experiencia consistente

**Pendiente:**
- Mejorar accesibilidad
- Limpiar código obsoleto
- Testing completo

#### 11. xml-import-functionality
**Importación/Exportación XML completa**
- Importar recetas individuales y múltiples
- Exportar recetas individuales y múltiples
- Compatibilidad total CMS ↔ App
- Preservación de todos los datos
- Manejo de errores robusto

---

## 📖 Cómo Leer una Spec

### 1. requirements.md
**Requisitos funcionales**

Formato EARS (Easy Approach to Requirements Syntax):
- User Stories
- Acceptance Criteria
- Glossary de términos

Ejemplo:
```markdown
### Requirement 1: Título

**User Story:** As a [role], I want [feature], so that [benefit]

#### Acceptance Criteria
1. WHEN [event], THE [System] SHALL [response]
2. WHILE [state], THE [System] SHALL [response]
```

### 2. design.md
**Diseño y arquitectura**

Contiene:
- Overview
- Architecture
- Components and Interfaces
- Data Models
- Error Handling
- Testing Strategy

### 3. tasks.md
**Plan de implementación**

Lista de tareas con:
- Numeración jerárquica (1, 1.1, 1.2, 2, 2.1...)
- Checkboxes [ ] para marcar progreso
- Referencias a requirements
- Tareas opcionales marcadas con *

Ejemplo:
```markdown
- [ ] 1. Tarea principal
  - Descripción de la tarea
  - _Requirements: 1.1, 2.3_

- [ ] 1.1 Subtarea
  - Detalles de implementación
  - _Requirements: 1.1_

- [ ]* 1.2 Subtarea opcional
  - Tests o documentación
  - _Requirements: 1.1_
```

---

## 🎯 Metodología

### Proceso de Desarrollo

```
1. Requirements → 2. Design → 3. Tasks → 4. Implementation
```

#### Fase 1: Requirements
- Definir user stories
- Escribir acceptance criteria
- Validar con EARS + INCOSE
- Aprobar con usuario

#### Fase 2: Design
- Diseñar arquitectura
- Definir componentes
- Especificar interfaces
- Documentar decisiones
- Aprobar con usuario

#### Fase 3: Tasks
- Crear lista de tareas
- Numerar jerárquicamente
- Referenciar requirements
- Marcar opcionales
- Aprobar con usuario

#### Fase 4: Implementation
- Ejecutar tareas en orden
- Marcar como completadas
- Validar contra requirements
- Testing continuo

---

## 📚 Documentación Relacionada

### Para Usuarios
- [QUE-HACE-CADA-SPEC.md](../../QUE-HACE-CADA-SPEC.md) - Explicación simple de cada spec

### Para Desarrolladores
- [INFORME-TECNICO.md](../../INFORME-TECNICO.md) - Documentación técnica
- [DOCUMENTACION-INDICE.md](../../DOCUMENTACION-INDICE.md) - Índice completo

### Para el CMS
- [RECIPE-MANAGER-README.md](../../RECIPE-MANAGER-README.md) - Documentación completa
- [RECIPE-MANAGER-QUICKSTART.md](../../RECIPE-MANAGER-QUICKSTART.md) - Inicio rápido

---

## 🔍 Buscar una Spec

### Por Funcionalidad
- **Copiar datos**: copy-ingredients-from-card
- **Organizar**: custom-categories, hospital-food-filter
- **Visualizar**: recipe-photo-gallery, sortable-list-view
- **Comprar**: shopping-lists
- **Gestionar**: recipe-content-manager
- **Interfaz**: modal-navigation-flow, modal-triggers-normalization, hamburger-menu-always
- **Entrada**: unified-time-input
- **Importar**: xml-import-functionality

### Por Estado
- **Completadas**: 11 specs (ver lista arriba)
- **En progreso**: 1 spec (hamburger-menu-always)

---

## 🎓 Convenciones

### Nombres de Specs
- Formato: `kebab-case`
- Descriptivos y concisos
- Indican funcionalidad principal

### Archivos
- `requirements.md` - Siempre en inglés (estándar EARS)
- `design.md` - Puede ser en español o inglés
- `tasks.md` - Puede ser en español o inglés

### Checkboxes
- `[ ]` - No iniciada
- `[-]` - En progreso
- `[x]` - Completada
- `[ ]*` - Opcional (no se implementa por defecto)

### Referencias
- `_Requirements: 1.1, 2.3_` - Referencias a requisitos
- Siempre al final de cada tarea

---

## 📊 Estadísticas

### Total de Specs: 12
- ✅ Completadas: 11 (92%)
- ⚠️ En progreso: 1 (8%)
- ❌ Pendientes: 0 (0%)

### Archivos por Spec: 3
- requirements.md
- design.md
- tasks.md

### Total de Archivos: 36
- 12 specs × 3 archivos

---

## 🚀 Crear una Nueva Spec

### Paso 1: Crear Directorio
```bash
mkdir .kiro/specs/nombre-de-la-spec
```

### Paso 2: Crear Archivos
```bash
touch .kiro/specs/nombre-de-la-spec/requirements.md
touch .kiro/specs/nombre-de-la-spec/design.md
touch .kiro/specs/nombre-de-la-spec/tasks.md
```

### Paso 3: Seguir Plantillas
Ver specs existentes como referencia.

### Paso 4: Documentar
Añadir a [QUE-HACE-CADA-SPEC.md](../../QUE-HACE-CADA-SPEC.md)

---

## 💡 Tips

### Para Leer Specs
1. Empieza por requirements.md
2. Lee el Glossary primero
3. Revisa las User Stories
4. Estudia los Acceptance Criteria

### Para Implementar
1. Lee requirements.md y design.md completos
2. Abre tasks.md
3. Ejecuta tareas en orden
4. Marca como completadas
5. Valida contra requirements

### Para Contribuir
1. Lee specs existentes
2. Sigue el formato establecido
3. Usa EARS para requirements
4. Documenta decisiones en design
5. Crea tareas accionables

---

## 📞 Información

- **Ubicación**: `.kiro/specs/`
- **Total de specs**: 12
- **Metodología**: EARS + INCOSE
- **Formato**: Markdown
- **Última actualización**: 7 de noviembre de 2025

---

**Para más información, ver [DOCUMENTACION-INDICE.md](../../DOCUMENTACION-INDICE.md)**
