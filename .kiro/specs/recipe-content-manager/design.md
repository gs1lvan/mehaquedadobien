# Design Document - Recipe Content Manager

## Overview

El Recipe Content Manager (RCM) es una aplicación web standalone que permite gestionar masivamente recetas en formato XML. La aplicación utiliza el mismo sistema de diseño que mehaquedadobien (Airbnb-inspired) y funciona completamente en el cliente sin necesidad de servidor.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│           Recipe Content Manager                │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐      ┌──────────────┐       │
│  │   UI Layer   │◄────►│  Data Layer  │       │
│  └──────────────┘      └──────────────┘       │
│         │                      │               │
│         ▼                      ▼               │
│  ┌──────────────┐      ┌──────────────┐       │
│  │ Components   │      │   Storage    │       │
│  └──────────────┘      └──────────────┘       │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Styling:** Reutilización de `styles.css` de mehaquedadobien
- **Storage:** localStorage para backups e historial
- **File API:** FileReader para carga, File System Access API para guardar
- **XML:** DOMParser nativo del navegador

---

## Components and Interfaces

### 1. Main Application Class

```javascript
class RecipeContentManager {
    constructor() {
        this.recipes = [];
        this.selectedRecipes = new Set();
        this.filteredRecipes = [];
        this.history = [];
        this.backups = [];
        this.currentFile = null;
    }
    
    // Core methods
    loadXML(file)
    parseXML(xmlString)
    saveToXML()
    downloadXML()
    updateFile()
    
    // UI methods
    renderDashboard()
    renderTable()
    renderFilters()
    renderPreview()
    
    // Edit methods
    batchEdit(recipes, updates)
    editRecipe(recipeId, updates)
    searchAndReplace(field, search, replace)
    
    // Utility methods
    addToHistory(action)
    undo()
    createBackup()
    restoreBackup(backupId)
}
```

---

### 2. Recipe Dat