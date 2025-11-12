# Mapa de Navegación - mehaquedadobien 🍳

## Diagrama Principal de Navegación

```mermaid
graph TD
    Start([🏠 Inicio]) --> Menu{☰ Menú Principal}
    
    Menu --> NuevaReceta[➕ Nueva Receta]
    Menu --> Recetas[📖 Recetas]
    Menu --> Menus[📋 Menús]
    Menu --> Listas[🛒 Listas de Compra]
    Menu --> Config[⚙️ Configuración]
    
    %% Nueva Receta Flow
    NuevaReceta --> FormReceta[📝 Formulario de Receta]
    FormReceta --> |Guardar| Recetas
    FormReceta --> |Cancelar| Recetas
    
    %% Recetas Flow
    Recetas --> |Click en receta| DetalleReceta[👁️ Vista Detalle]
    Recetas --> |Filtros| FiltrosRecetas[🔍 Filtros Activos]
    FiltrosRecetas --> Recetas
    
    DetalleReceta --> |Editar| FormReceta
    DetalleReceta --> |Duplicar| FormReceta
    DetalleReceta --> |Eliminar| Recetas
    DetalleReceta --> |Exportar PDF| PDF[📄 Descarga PDF]
    DetalleReceta --> |Compartir| Share[🔗 Enlace Compartido]
    DetalleReceta --> |Copiar Ingredientes| Clipboard[📋 Portapapeles]
    DetalleReceta --> |Volver| Recetas
    
    %% Menús Flow
    Menus --> |Nuevo Menú| FormMenu[📝 Formulario de Menú]
    Menus --> |Editar Menú| FormMenu
    Menus --> |Ver Menú| DetalleMenu[👁️ Vista Detalle Menú]
    FormMenu --> |Guardar| Menus
    DetalleMenu --> |Volver| Menus
    
    %% Listas de Compra Flow
    Listas --> |Nueva Lista| FormLista[📝 Formulario de Lista]
    Listas --> |Editar Lista| FormLista
    Listas --> |Expandir/Colapsar| Listas
    Listas --> |Marcar Items| Listas
    Listas --> |Copiar Lista| Clipboard
    FormLista --> |Guardar| Listas
    
    %% Configuración Flow
    Config --> |Gestionar Categorías| ModalCat[🏷️ Modal Categorías]
    Config --> |Cambiar Tema| TemaToggle[🌙/☀️ Toggle Tema]
    Config --> |Importar XML| ImportXML[📥 Importar Recetas]
    Config --> |Exportar XML| ExportXML[📤 Exportar Recetas]
    
    ModalCat --> |Crear Categoría| Config
    ModalCat --> |Editar Categoría| Config
    ModalCat --> |Eliminar Categoría| Config
    ModalCat --> |Cerrar| Config
    
    ImportXML --> |Seleccionar Archivo| ValidarXML{✅ ¿Válido?}
    ValidarXML --> |Sí| ProgresoImport[⏳ Modal de Progreso]
    ValidarXML --> |No| ErrorImport[❌ Error]
    ProgresoImport --> ResumenImport[📊 Resumen de Importación]
    ResumenImport --> Recetas
    ErrorImport --> Config
    
    ExportXML --> |Generar XML| DescargarXML[💾 Descarga XML]
    DescargarXML --> Config
    
    TemaToggle --> Config
    
    %% Estilos
    classDef primary fill:#667eea,stroke:#5a67d8,stroke-width:2px,color:#fff
    classDef secondary fill:#48bb78,stroke:#38a169,stroke-width:2px,color:#fff
    classDef warning fill:#ed8936,stroke:#dd6b20,stroke-width:2px,color:#fff
    classDef danger fill:#f56565,stroke:#e53e3e,stroke-width:2px,color:#fff
    classDef info fill:#4299e1,stroke:#3182ce,stroke-width:2px,color:#fff
    
    class Menu,Config primary
    class NuevaReceta,FormReceta,FormMenu,FormLista secondary
    class ImportXML,ExportXML,ProgresoImport info
    class ErrorImport danger
    class DetalleReceta,DetalleMenu,Recetas,Menus,Listas warning
```

---

## Flujo Detallado: Importación XML

```mermaid
flowchart TD
    A[Usuario en Configuración] --> B[Click en 'Importar recetas']
    B --> C[Seleccionar archivo XML]
    C --> D{Validar Archivo}
    
    D --> |Tipo incorrecto| E1[❌ Error: Debe ser .xml]
    D --> |Muy grande >50MB| E2[❌ Error: Archivo muy grande]
    D --> |Muy pequeño <10 bytes| E3[❌ Error: Archivo vacío]
    D --> |✅ Válido| F[Leer contenido del archivo]
    
    E1 --> Z[Fin]
    E2 --> Z
    E3 --> Z
    
    F --> G{Parsear XML}
    G --> |XML mal formado| E4[❌ Error: XML inválido]
    G --> |✅ Válido| H{Detectar formato}
    
    E4 --> Z
    
    H --> |1 receta| I1[Procesar receta única]
    H --> |Múltiples recetas| I2[Mostrar modal de progreso]
    
    I2 --> J[Procesar recetas en loop]
    J --> K[Actualizar barra de progreso]
    K --> L{¿Más recetas?}
    L --> |Sí| J
    L --> |No| M[Cerrar modal de progreso]
    
    I1 --> N[Verificar duplicados]
    M --> N
    
    N --> O{¿Hay duplicados?}
    O --> |Sí| P[Omitir duplicados]
    O --> |No| Q[Guardar todas]
    P --> Q
    
    Q --> R[Crear categorías desconocidas]
    R --> S[Recargar lista de recetas]
    S --> T[Mostrar resumen]
    
    T --> U{Resultado}
    U --> |Todo exitoso| V[✅ Mensaje de éxito]
    U --> |Algunos errores| W[⚠️ Mensaje de advertencia]
    U --> |Todo falló| X[❌ Mensaje de error]
    
    V --> Y[Ir a vista de Recetas]
    W --> Y
    X --> Z
    
    classDef success fill:#48bb78,stroke:#38a169,stroke-width:2px,color:#fff
    classDef error fill:#f56565,stroke:#e53e3e,stroke-width:2px,color:#fff
    classDef warning fill:#ed8936,stroke:#dd6b20,stroke-width:2px,color:#fff
    classDef process fill:#4299e1,stroke:#3182ce,stroke-width:2px,color:#fff
    
    class V,Q,R success
    class E1,E2,E3,E4,X error
    class W warning
    class F,G,H,I2,J,K,M,N,S,T process
```

---

## Flujo Detallado: Gestión de Recetas

```mermaid
stateDiagram-v2
    [*] --> VistaRecetas: Inicio
    
    VistaRecetas --> FiltrarRecetas: Aplicar filtros
    FiltrarRecetas --> VistaRecetas: Ver resultados
    
    VistaRecetas --> DetalleReceta: Click en receta
    
    DetalleReceta --> EditarReceta: Click en Editar
    DetalleReceta --> DuplicarReceta: Click en Duplicar
    DetalleReceta --> EliminarReceta: Click en Eliminar
    DetalleReceta --> ExportarPDF: Click en PDF
    DetalleReceta --> CompartirReceta: Click en Compartir
    DetalleReceta --> CopiarIngredientes: Click en Copiar
    DetalleReceta --> VistaRecetas: Volver
    
    EditarReceta --> FormularioReceta: Cargar datos
    DuplicarReceta --> FormularioReceta: Copiar datos
    
    FormularioReceta --> GuardarReceta: Click en Guardar
    FormularioReceta --> VistaRecetas: Cancelar
    
    GuardarReceta --> ValidarReceta: Validar datos
    ValidarReceta --> VistaRecetas: ✅ Éxito
    ValidarReceta --> FormularioReceta: ❌ Error
    
    EliminarReceta --> ConfirmarEliminar: Mostrar confirmación
    ConfirmarEliminar --> VistaRecetas: Confirmar
    ConfirmarEliminar --> DetalleReceta: Cancelar
    
    ExportarPDF --> [*]: Descargar PDF
    CompartirReceta --> [*]: Copiar enlace
    CopiarIngredientes --> [*]: Copiar al portapapeles
    
    VistaRecetas --> [*]: Salir
```

---

## Estructura de Vistas

```mermaid
graph LR
    subgraph "🏠 Vista Principal"
        A[Header con Menú]
        B[Filtros]
        C[Grid/Lista de Recetas]
    end
    
    subgraph "👁️ Vista Detalle"
        D[Información Básica]
        E[Ingredientes]
        F[Secuencias de Adición]
        G[Método de Preparación]
        H[Galería de Imágenes]
        I[Botones de Acción]
    end
    
    subgraph "📝 Vista Formulario"
        J[Información Básica]
        K[Categoría]
        L[Ingredientes Editor]
        M[Secuencias Editor]
        N[Aparatos de Cocina]
        O[Multimedia]
        P[Método de Preparación]
    end
    
    subgraph "⚙️ Vista Configuración"
        Q[Libro de receta de]
        R[Cocinoteca]
        S[Gestionar Categorías]
        T[Cambiar Tema]
        U[Importar/Exportar]
    end
    
    C --> D
    D --> J
    A --> Q
```

---

## Interacciones del Usuario

```mermaid
journey
    title Flujo de Usuario: Crear y Compartir Receta
    section Crear Receta
      Abrir menú: 5: Usuario
      Click en Nueva Receta: 5: Usuario
      Rellenar formulario: 3: Usuario
      Añadir ingredientes: 4: Usuario
      Añadir secuencias: 4: Usuario
      Subir fotos: 4: Usuario
      Guardar receta: 5: Usuario
    section Ver Receta
      Ver en lista: 5: Usuario
      Abrir detalle: 5: Usuario
      Revisar información: 5: Usuario
    section Compartir
      Click en Compartir: 5: Usuario
      Copiar enlace: 5: Usuario
      Enviar por WhatsApp: 5: Usuario
```

---

## Leyenda de Iconos

| Icono | Significado |
|-------|-------------|
| 🏠 | Inicio / Home |
| ☰ | Menú Principal |
| ➕ | Crear Nuevo |
| 📖 | Ver Recetas |
| 📋 | Menús Semanales |
| 🛒 | Listas de Compra |
| ⚙️ | Configuración |
| 👁️ | Vista Detalle |
| 📝 | Formulario / Editar |
| 🔍 | Filtros / Búsqueda |
| 📥 | Importar |
| 📤 | Exportar |
| 📄 | PDF |
| 🔗 | Compartir / Enlace |
| 📋 | Copiar al Portapapeles |
| ✅ | Éxito / Válido |
| ❌ | Error / Inválido |
| ⚠️ | Advertencia |
| ⏳ | Procesando / Cargando |
| 🏷️ | Categorías |
| 🌙 | Tema Oscuro |
| ☀️ | Tema Claro |

---

## Notas Técnicas

### Navegación Principal
- El menú hamburguesa (☰) está siempre visible en todas las resoluciones
- Todas las vistas principales son accesibles desde el menú
- La navegación usa `goToHome()`, `showRecipeForm()`, `showRecipeDetail()`, etc.

### Gestión de Estado
- La aplicación mantiene el estado de filtros activos
- Las vistas se ocultan/muestran con clases `.hidden`
- El tema se persiste en `localStorage`

### Modales
- Configuración
- Categorías
- Selector de Categorías (para menús)
- Progreso de Importación (nuevo)
- Opciones de Receta
- Opciones de Menú

### Persistencia
- Todas las recetas se guardan en IndexedDB
- Fallback a localStorage si IndexedDB no está disponible
- Las preferencias (tema, vista) se guardan en localStorage

---

## Cómo Usar Este Mapa

1. **En GitHub/GitLab**: Los diagramas Mermaid se renderizan automáticamente
2. **En VS Code**: Instala la extensión "Markdown Preview Mermaid Support"
3. **Online**: Copia el código y pégalo en [Mermaid Live Editor](https://mermaid.live/)
4. **Exportar**: Desde Mermaid Live puedes exportar a PNG, SVG o PDF

---

**Última actualización:** 7 de noviembre de 2025
