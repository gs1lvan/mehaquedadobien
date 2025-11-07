# Mapa de Estilos CSS - mehaquedadobien 🍳

**Sistema de Diseño Inspirado en Airbnb**

---

## 🎨 Arquitectura del Sistema de Diseño

```mermaid
graph TD
    Root[":root CSS Variables"] --> Colors[Colores]
    Root --> Spacing[Espaciado]
    Root --> Radius[Border Radius]
    Root --> Shadows[Sombras]
    Root --> Typography[Tipografía]
    
    Colors --> Primary[Primarios]
    Colors --> Neutral[Neutrales]
    Colors --> Category[Categorías]
    Colors --> Functional[Funcionales]
    
    Primary --> P1["--color-primary: #FF385C"]
    Primary --> P2["--color-primary-dark: #E31C5F"]
    Primary --> P3["--color-primary-light: #FF5A5F"]
    
    Neutral --> N1["--color-text: #222222"]
    Neutral --> N2["--color-text-secondary: #717171"]
    Neutral --> N3["--color-background: #FFFFFF"]
    Neutral --> N4["--color-border: #DDDDDD"]
    
    Category --> C1["16 Categorías de Recetas"]
    Category --> C2["3 Categorías Especiales"]
    
    Functional --> F1["--color-success: #008A05"]
    Functional --> F2["--color-danger: #C13515"]
    Functional --> F3["--color-warning: #FFC043"]
    
    Spacing --> S1["Base: 8px Sistema"]
    Spacing --> S2["xs: 4px → xxl: 48px"]
    
    Radius --> R1["sm: 8px → xl: 24px"]
    
    Shadows --> SH1["sm, md, lg, hover"]
    
    Typography --> T1["Font: System Stack"]
    Typography --> T2["Weights: 400-700"]
    
    classDef primary fill:#FF385C,stroke:#E31C5F,stroke-width:2px,color:#fff
    classDef neutral fill:#F7F7F7,stroke:#DDDDDD,stroke-width:2px,color:#222
    classDef category fill:#667eea,stroke:#5a67d8,stroke-width:2px,color:#fff
    classDef functional fill:#48bb78,stroke:#38a169,stroke-width:2px,color:#fff
    
    class Primary,P1,P2,P3 primary
    class Neutral,N1,N2,N3,N4 neutral
    class Category,C1,C2 category
    class Functional,F1,F2,F3 functional
```

---

## 🎨 Sistema de Colores

### Paleta Principal (Airbnb)

```mermaid
graph LR
    subgraph "Colores Primarios"
        A["Primary<br/>#FF385C<br/>🔴"]
        B["Primary Dark<br/>#E31C5F<br/>🔴"]
        C["Primary Light<br/>#FF5A5F<br/>🔴"]
    end
    
    subgraph "Colores Neutrales"
        D["Text<br/>#222222<br/>⚫"]
        E["Text Secondary<br/>#717171<br/>⚫"]
        F["Background<br/>#FFFFFF<br/>⚪"]
        G["Border<br/>#DDDDDD<br/>⚪"]
    end
    
    subgraph "Colores Funcionales"
        H["Success<br/>#008A05<br/>🟢"]
        I["Danger<br/>#C13515<br/>🔴"]
        J["Warning<br/>#FFC043<br/>🟡"]
    end
    
    style A fill:#FF385C,stroke:#E31C5F,color:#fff
    style B fill:#E31C5F,stroke:#C13515,color:#fff
    style C fill:#FF5A5F,stroke:#FF385C,color:#fff
    style D fill:#222222,stroke:#000,color:#fff
    style E fill:#717171,stroke:#222,color:#fff
    style F fill:#FFFFFF,stroke:#DDDDDD,color:#222
    style G fill:#DDDDDD,stroke:#B0B0B0,color:#222
    style H fill:#008A05,stroke:#006804,color:#fff
    style I fill:#C13515,stroke:#A02010,color:#fff
    style J fill:#FFC043,stroke:#FFA500,color:#222
```

---

## 📏 Sistema de Espaciado (Base 8px)

```mermaid
graph LR
    subgraph "Escala de Espaciado"
        XS["xs<br/>4px<br/>0.5x"]
        SM["sm<br/>8px<br/>1x"]
        MD["md<br/>16px<br/>2x"]
        LG["lg<br/>24px<br/>3x"]
        XL["xl<br/>32px<br/>4x"]
        XXL["xxl<br/>48px<br/>6x"]
    end
    
    XS --> SM --> MD --> LG --> XL --> XXL
    
    style XS fill:#E3F2FD,stroke:#2196F3
    style SM fill:#BBDEFB,stroke:#2196F3
    style MD fill:#90CAF9,stroke:#2196F3
    style LG fill:#64B5F6,stroke:#2196F3
    style XL fill:#42A5F5,stroke:#2196F3
    style XXL fill:#2196F3,stroke:#1976D2,color:#fff
```

**Uso:**
- `xs (4px)`: Separación mínima entre elementos relacionados
- `sm (8px)`: Separación estándar entre elementos
- `md (16px)`: Separación entre secciones pequeñas
- `lg (24px)`: Separación entre secciones medianas
- `xl (32px)`: Separación entre secciones grandes
- `xxl (48px)`: Separación entre bloques principales

---

## 🔲 Sistema de Border Radius

```mermaid
graph LR
    subgraph "Escala de Redondeo"
        SM["sm<br/>8px<br/>Sutil"]
        MD["md<br/>12px<br/>Estándar"]
        LG["lg<br/>16px<br/>Pronunciado"]
        XL["xl<br/>24px<br/>Muy Redondeado"]
        FULL["full<br/>9999px<br/>Circular"]
    end
    
    SM --> MD --> LG --> XL --> FULL
    
    style SM fill:#FFF3E0,stroke:#FF9800
    style MD fill:#FFE0B2,stroke:#FF9800
    style LG fill:#FFCC80,stroke:#FF9800
    style XL fill:#FFB74D,stroke:#FF9800
    style FULL fill:#FF9800,stroke:#F57C00,color:#fff
```

**Uso:**
- `sm (8px)`: Inputs, badges pequeños
- `md (12px)`: Botones, tarjetas (estándar Airbnb)
- `lg (16px)`: Modales, contenedores grandes
- `xl (24px)`: Elementos destacados
- `full (9999px)`: Botones circulares, avatares

---

## 🎭 Sistema de Sombras

```mermaid
graph TD
    subgraph "Jerarquía de Elevación"
        SM["shadow-sm<br/>Elevación Mínima<br/>Tarjetas en reposo"]
        MD["shadow-md<br/>Elevación Media<br/>Tarjetas elevadas"]
        LG["shadow-lg<br/>Elevación Alta<br/>Modales, dropdowns"]
        HOVER["shadow-hover<br/>Estado Hover<br/>Interacción"]
    end
    
    SM --> MD --> LG
    SM -.-> HOVER
    
    style SM fill:#ECEFF1,stroke:#607D8B
    style MD fill:#CFD8DC,stroke:#607D8B
    style LG fill:#B0BEC5,stroke:#607D8B
    style HOVER fill:#90A4AE,stroke:#607D8B,color:#fff
```

**Valores:**
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05);
--shadow-md: 0 2px 4px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.08);
--shadow-lg: 0 6px 16px rgba(0,0,0,0.12);
--shadow-hover: 0 2px 8px rgba(0,0,0,0.12);
```

---

## 📝 Sistema de Tipografía

```mermaid
graph TD
    subgraph "Font Stack"
        A["System Fonts"]
        A --> B["-apple-system"]
        A --> C["BlinkMacSystemFont"]
        A --> D["Segoe UI"]
        A --> E["Roboto"]
        A --> F["Helvetica Neue"]
        A --> G["Arial"]
        A --> H["sans-serif"]
    end
    
    subgraph "Font Weights"
        W1["normal: 400"]
        W2["medium: 500"]
        W3["semibold: 600"]
        W4["bold: 700"]
    end
    
    style A fill:#9C27B0,stroke:#7B1FA2,color:#fff
    style W1 fill:#E1BEE7,stroke:#9C27B0
    style W2 fill:#CE93D8,stroke:#9C27B0
    style W3 fill:#BA68C8,stroke:#9C27B0
    style W4 fill:#9C27B0,stroke:#7B1FA2,color:#fff
```

---

## 🎨 Colores de Categorías (19 categorías)

```mermaid
mindmap
  root((Categorías))
    Carnes
      Carne 🥩
      Cerdo 🐷
      Pollo 🐔
      Conejo 🐰
    Pescados
      Pescado 🐟
      Marisco 🦐
    Vegetales
      Verdura 🥬
      Fruta 🍎
      Legumbres 🫘
      Cereales 🌾
    Preparaciones
      Caldo 🍲
      Salsas 🍅
      Encurtidos 🥒
      Escabeche 🥒
      Con huevo 🥚
      Postres 🍰
    Especiales
      Caravana 🚐
      Hospital 🏥
      Menú 🍽️
```

### Tabla de Colores de Categorías

| Categoría | Color | Hex | Emoji |
|-----------|-------|-----|-------|
| Caldo | Naranja | `#FF8C42` | 🍲 |
| Carne | Rojo | `#D93B30` | 🥩 |
| Cereales | Dorado | `#C4A053` | 🌾 |
| Cerdo | Rosa | `#FFB6C1` | 🐷 |
| Con huevo | Amarillo | `#FFD700` | 🥚 |
| Conejo | Rosa Claro | `#D4A5A5` | 🐰 |
| Encurtidos | Verde Lima | `#7CB342` | 🥒 |
| Escabeche | Verde | `#32CD32` | 🥒 |
| Fruta | Naranja | `#FF8C00` | 🍎 |
| Legumbres | Marrón | `#8D6E63` | 🫘 |
| Marisco | Rosa Fuerte | `#FF6B9D` | 🦐 |
| Pescado | Azul | `#0073CF` | 🐟 |
| Pollo | Naranja | `#FFA500` | 🐔 |
| Postres | Rosa | `#FFB6C1` | 🍰 |
| Salsas | Rojo | `#E53935` | 🍅 |
| Verdura | Verde | `#008A05` | 🥬 |
| **Caravana** | Gris | `#6B7280` | 🚐 |
| **Hospital** | Verde | `#10B981` | 🏥 |
| **Menú** | Marrón | `#8B4513` | 🍽️ |

---

## 🌓 Tema Oscuro

```mermaid
graph LR
    subgraph "Tema Claro"
        L1["Background: #FFFFFF"]
        L2["Text: #222222"]
        L3["Border: #DDDDDD"]
    end
    
    subgraph "Tema Oscuro"
        D1["Background: #1a1a1a"]
        D2["Text: #e5e5e5"]
        D3["Border: #404040"]
    end
    
    L1 -.Toggle.-> D1
    L2 -.Toggle.-> D2
    L3 -.Toggle.-> D3
    
    style L1 fill:#FFFFFF,stroke:#DDDDDD,color:#222
    style L2 fill:#222222,stroke:#000,color:#fff
    style L3 fill:#DDDDDD,stroke:#B0B0B0,color:#222
    style D1 fill:#1a1a1a,stroke:#404040,color:#e5e5e5
    style D2 fill:#e5e5e5,stroke:#fff,color:#222
    style D3 fill:#404040,stroke:#606060,color:#e5e5e5
```

**Clase:** `body.dark-theme`

**Variables sobrescritas:**
```css
body.dark-theme {
    --color-text: #e5e5e5;
    --color-text-secondary: #a0a0a0;
    --color-background: #1a1a1a;
    --color-background-secondary: #2a2a2a;
    --color-border: #404040;
    --color-border-light: #333333;
}
```

---

## 🏗️ Estructura de Archivos CSS

```mermaid
graph TD
    A[styles.css] --> B[Variables CSS]
    A --> C[Reset & Base]
    A --> D[Layout]
    A --> E[Componentes]
    A --> F[Utilidades]
    A --> G[Responsive]
    A --> H[Tema Oscuro]
    
    B --> B1[":root"]
    
    C --> C1["*, body, .container"]
    
    D --> D1["Header"]
    D --> D2["Main"]
    D --> D3["Footer"]
    
    E --> E1["Botones"]
    E --> E2["Tarjetas"]
    E --> E3["Formularios"]
    E --> E4["Modales"]
    E --> E5["Badges"]
    
    F --> F1["Espaciado"]
    F --> F2["Colores"]
    F --> F3["Tipografía"]
    
    G --> G1["@media (max-width: 767px)"]
    G --> G2["@media (768px - 1024px)"]
    G --> G3["@media (min-width: 1025px)"]
    
    H --> H1["body.dark-theme"]
    
    style A fill:#667eea,stroke:#5a67d8,color:#fff
    style B fill:#48bb78,stroke:#38a169,color:#fff
    style E fill:#ed8936,stroke:#dd6b20,color:#fff
    style H fill:#4299e1,stroke:#3182ce,color:#fff
```

---

## 📦 Archivos CSS del Proyecto

```mermaid
graph LR
    subgraph "CSS Files"
        A["styles.css<br/>(Principal)"]
        B["modal-triggers.css<br/>(Modular)"]
    end
    
    A --> C["Variables Globales"]
    A --> D["Estilos Base"]
    A --> E["Componentes"]
    A --> F["Responsive"]
    
    B --> G["Sistema Modal Triggers"]
    B --> H["Badges"]
    B --> I["Botones Modales"]
    
    style A fill:#667eea,stroke:#5a67d8,color:#fff
    style B fill:#48bb78,stroke:#38a169,color:#fff
```

**Orden de carga en HTML:**
```html
<link rel="stylesheet" href="styles.css">        <!-- Línea 38 -->
<link rel="stylesheet" href="modal-triggers.css"> <!-- Línea 39 -->
```

---

## 🎯 Convenciones de Nomenclatura

### BEM (Block Element Modifier)

```mermaid
graph TD
    A[".recipe-card"] --> B[".recipe-card__header"]
    A --> C[".recipe-card__body"]
    A --> D[".recipe-card__footer"]
    
    B --> E[".recipe-card__header--highlighted"]
    C --> F[".recipe-card__body--compact"]
    
    style A fill:#667eea,stroke:#5a67d8,color:#fff
    style B,C,D fill:#48bb78,stroke:#38a169,color:#fff
    style E,F fill:#ed8936,stroke:#dd6b20,color:#fff
```

**Patrón:**
- **Block:** `.recipe-card`
- **Element:** `.recipe-card__header`
- **Modifier:** `.recipe-card__header--highlighted`

---

## 🔧 Clases Utilitarias

### Espaciado
```css
.mt-sm { margin-top: var(--spacing-sm); }
.mb-md { margin-bottom: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }
```

### Display
```css
.hidden { display: none; }
.flex { display: flex; }
.grid { display: grid; }
```

### Colores
```css
.text-primary { color: var(--color-primary); }
.bg-success { background: var(--color-success); }
.border-danger { border-color: var(--color-danger); }
```

---

## 📱 Breakpoints Responsive

```mermaid
graph LR
    A["Mobile<br/>< 768px"] --> B["Tablet<br/>768px - 1024px"] --> C["Desktop<br/>> 1024px"]
    
    style A fill:#FF6B6B,stroke:#E53E3E,color:#fff
    style B fill:#FFA500,stroke:#DD6B20,color:#fff
    style C fill:#48bb78,stroke:#38a169,color:#fff
```

**Media Queries:**
```css
/* Mobile First */
@media (max-width: 767px) { /* Mobile */ }
@media (min-width: 768px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

---

## 🎨 Paleta de Colores Personalizada (Categorías Custom)

```javascript
const CATEGORY_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52B788', '#E76F51', '#2A9D8F'
];
```

**Visualización:**

```mermaid
graph LR
    subgraph "Paleta Custom (12 colores)"
        C1["#FF6B6B"]
        C2["#4ECDC4"]
        C3["#45B7D1"]
        C4["#FFA07A"]
        C5["#98D8C8"]
        C6["#F7DC6F"]
        C7["#BB8FCE"]
        C8["#85C1E2"]
        C9["#F8B739"]
        C10["#52B788"]
        C11["#E76F51"]
        C12["#2A9D8F"]
    end
    
    style C1 fill:#FF6B6B,stroke:#E53E3E,color:#fff
    style C2 fill:#4ECDC4,stroke:#3BA99C,color:#fff
    style C3 fill:#45B7D1,stroke:#3498DB,color:#fff
    style C4 fill:#FFA07A,stroke:#FF7F50,color:#fff
    style C5 fill:#98D8C8,stroke:#76C7B7,color:#fff
    style C6 fill:#F7DC6F,stroke:#F4D03F,color:#222
    style C7 fill:#BB8FCE,stroke:#9B59B6,color:#fff
    style C8 fill:#85C1E2,stroke:#5DADE2,color:#fff
    style C9 fill:#F8B739,stroke:#F39C12,color:#fff
    style C10 fill:#52B788,stroke:#27AE60,color:#fff
    style C11 fill:#E76F51,stroke:#E74C3C,color:#fff
    style C12 fill:#2A9D8F,stroke:#16A085,color:#fff
```

---

## 📚 Guía de Uso Rápida

### Aplicar Color Primario
```css
.elemento {
    color: var(--color-primary);
    background: var(--color-primary);
    border-color: var(--color-primary);
}
```

### Aplicar Espaciado
```css
.elemento {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    gap: var(--spacing-sm);
}
```

### Aplicar Border Radius
```css
.elemento {
    border-radius: var(--radius-md);
}
```

### Aplicar Sombra
```css
.elemento {
    box-shadow: var(--shadow-sm);
}

.elemento:hover {
    box-shadow: var(--shadow-hover);
}
```

---

## 🎯 Mejores Prácticas

### ✅ Hacer
- Usar variables CSS en lugar de valores hardcoded
- Seguir la convención BEM para nombres de clases
- Usar el sistema de espaciado (múltiplos de 8px)
- Aplicar sombras según jerarquía
- Mantener consistencia con el tema Airbnb

### ❌ Evitar
- Valores mágicos (números sin contexto)
- Colores hardcoded
- Espaciado inconsistente
- Sombras excesivas
- Mezclar convenciones de nomenclatura

---

## 📊 Estadísticas del Sistema

- **Variables CSS:** 60+
- **Colores definidos:** 35+
- **Niveles de espaciado:** 6
- **Niveles de radius:** 5
- **Niveles de sombra:** 4
- **Font weights:** 4
- **Breakpoints:** 3
- **Archivos CSS:** 2

---

**Última actualización:** 7 de noviembre de 2025  
**Versión del sistema:** 2.0 (Airbnb-inspired)
