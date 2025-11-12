# Cómo Iniciar el Servidor de Desarrollo

## Problema

Los módulos ES6 (type="module") no funcionan cuando abres `index.html` directamente desde el sistema de archivos debido a las políticas CORS del navegador.

## Solución

Necesitas servir la aplicación a través de un servidor HTTP local.

## Opción 1: Python (Recomendado)

### Iniciar servidor:
```bash
python -m http.server 8000
```

### Acceder a la aplicación:
```
http://localhost:8000
```

### Detener servidor:
Presiona `Ctrl + C` en la terminal

---

## Opción 2: Node.js (si tienes npm)

### Instalar servidor:
```bash
npm install -g http-server
```

### Iniciar servidor:
```bash
http-server -p 8000
```

### Acceder a la aplicación:
```
http://localhost:8000
```

---

## Opción 3: VS Code Live Server

Si usas Visual Studio Code:

1. Instalar extensión "Live Server"
2. Click derecho en `index.html`
3. Seleccionar "Open with Live Server"

---

## Opción 4: Navegador con CORS deshabilitado (NO recomendado)

Solo para desarrollo temporal:

### Chrome:
```bash
chrome.exe --disable-web-security --user-data-dir="C:/temp/chrome-dev"
```

⚠️ **NO usar para navegación normal, solo para desarrollo**

---

## ✅ Verificar que funciona

Una vez iniciado el servidor:

1. Abrir `http://localhost:8000` en el navegador
2. Abrir DevTools (F12)
3. Verificar que no hay errores de CORS
4. Verificar que aparece: "Application started successfully"

---

## 🚀 Para Producción

Para desplegar en producción, puedes usar:

- **GitHub Pages** (gratis)
- **Netlify** (gratis)
- **Vercel** (gratis)
- Cualquier servidor web (Apache, Nginx, etc.)

Todos estos servicios sirven archivos a través de HTTP/HTTPS, por lo que los módulos ES6 funcionarán correctamente.

---

**Fecha:** 2025-11-11  
**Servidor actual:** Python http.server en puerto 8000  
**URL:** http://localhost:8000
