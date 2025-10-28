# 📱 Guía Completa para Crear APK de mehaquedadobien

## 🎯 Objetivo
Convertir tu aplicación web en una APK instalable en Android.

---

## 📝 PASO 1: Subir a GitHub Pages (5 minutos)

### Opción A: Si tienes GitHub Desktop instalado

1. **Abre GitHub Desktop**
2. **File → Add Local Repository**
3. Selecciona la carpeta: `C:\Users\Gonzalo\app_fondos`
4. Si dice "not a git repository", haz clic en **"Create a repository"**
5. Deja el nombre como está y haz clic en **"Create Repository"**
6. Haz clic en **"Publish repository"**
7. Desmarca "Keep this code private" (para que sea público y funcione con GitHub Pages)
8. Haz clic en **"Publish Repository"**

### Opción B: Si NO tienes GitHub Desktop

#### 1. Instalar Git (si no lo tienes)
- Descarga: https://git-scm.com/download/win
- Instala con opciones por defecto

#### 2. Crear repositorio desde la terminal
Abre PowerShell en tu carpeta y ejecuta:

```powershell
# Inicializar repositorio
git init

# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - mehaquedadobien"

# Crear repositorio en GitHub (necesitas estar logueado)
# Ve a: https://github.com/new
# Nombre: mehaquedadobien
# Público
# NO marques "Initialize with README"
# Crea el repositorio

# Conectar con GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/mehaquedadobien.git

# Subir archivos
git branch -M main
git push -u origin main
```

### Opción C: Subir manualmente desde GitHub.com

1. Ve a: https://github.com/new
2. Nombre del repositorio: `mehaquedadobien`
3. Público ✓
4. Crea el repositorio
5. Haz clic en "uploading an existing file"
6. Arrastra TODOS los archivos de tu carpeta
7. Haz clic en "Commit changes"

---

## 🌐 PASO 2: Activar GitHub Pages (1 minuto)

1. En tu repositorio de GitHub, ve a **Settings** (Configuración)
2. En el menú lateral, busca **Pages**
3. En "Source", selecciona **main** branch
4. Haz clic en **Save**
5. Espera 1-2 minutos
6. Refresca la página
7. Verás un mensaje: "Your site is published at https://TU_USUARIO.github.io/mehaquedadobien/"
8. **¡Copia esa URL!** La necesitarás para el siguiente paso

---

## 🤖 PASO 3: Generar APK con PWA Builder (3 minutos)

### 1. Ve a PWA Builder
Abre: **https://www.pwabuilder.com/**

### 2. Introduce tu URL
- Pega la URL de GitHub Pages: `https://TU_USUARIO.github.io/mehaquedadobien/`
- Haz clic en **"Start"**

### 3. Espera el análisis
PWA Builder analizará tu app (tarda 10-20 segundos)

### 4. Revisa el Score
- Debería mostrar un buen score (tu app ya es una PWA)
- Si hay warnings, no te preocupes, la APK se generará igual

### 5. Ve a la pestaña "Package"
- Haz clic en la pestaña **"Package"** en la parte superior

### 6. Selecciona Android
- Busca el botón de **Android**
- Haz clic en **"Store Package"**

### 7. Configura los detalles de la APK

**Información requerida:**
- **Package ID:** `com.mehaquedadobien.app` (o el que prefieras)
- **App name:** `mehaquedadobien`
- **Launcher name:** `mehaquedadobien`
- **Version:** `1.0.0`
- **Version code:** `1`
- **Host:** Tu URL de GitHub Pages
- **Start URL:** `/`

**Opciones avanzadas (opcional):**
- **Theme color:** `#FF385C` (el rojo de Airbnb que usamos)
- **Background color:** `#FFFFFF`
- **Icon:** Puedes subir un icono personalizado o usar el por defecto
- **Splash screen:** Puedes personalizar la pantalla de carga

### 8. Generar APK

Tienes dos opciones:

#### Opción A: APK Firmada (Recomendado para distribución)
1. Haz clic en **"Generate"**
2. Descarga el archivo `.zip`
3. Dentro encontrarás:
   - `app-release-signed.apk` ← Esta es tu APK
   - Archivos de firma (guárdalos para futuras actualizaciones)

#### Opción B: APK sin firmar (Solo para pruebas)
1. Marca "Skip signing"
2. Genera y descarga

### 9. Descargar APK
- Se descargará un archivo `.zip`
- Descomprímelo
- Busca el archivo `app-release-signed.apk` o `app-release.apk`

---

## 📲 PASO 4: Instalar APK en tu Android (2 minutos)

### Método 1: Cable USB
1. Conecta tu móvil al PC con cable USB
2. Copia el archivo `.apk` a tu móvil
3. En el móvil, abre el archivo `.apk`
4. Android te pedirá permiso para instalar apps de fuentes desconocidas
5. Acepta y instala

### Método 2: Google Drive / Email
1. Sube el `.apk` a Google Drive
2. Desde tu móvil, descarga el archivo
3. Abre el archivo descargado
4. Acepta permisos e instala

### Método 3: Compartir por WhatsApp
1. Envíate el `.apk` por WhatsApp
2. Descárgalo en tu móvil
3. Abre e instala

---

## ⚠️ Solución de Problemas

### "No se puede instalar la app"
- Ve a **Ajustes → Seguridad**
- Activa **"Instalar apps de fuentes desconocidas"** o **"Orígenes desconocidos"**
- Intenta instalar de nuevo

### "La app no se abre"
- Asegúrate de tener conexión a internet (la primera vez)
- Después funcionará offline

### "PWA Builder no detecta mi app"
- Verifica que GitHub Pages esté activo
- Espera 5 minutos más (a veces tarda)
- Asegúrate de que la URL sea correcta

### "El icono no se ve bien"
- Puedes crear un icono personalizado en: https://www.canva.com/
- Tamaño recomendado: 512x512 px
- Formato: PNG con fondo transparente

---

## 🎨 BONUS: Crear Icono Personalizado

### Opción 1: Usar Canva (Gratis)
1. Ve a: https://www.canva.com/
2. Crea diseño de 512x512 px
3. Añade emoji 🍳 o texto "mehaquedadobien"
4. Descarga como PNG
5. Súbelo en PWA Builder

### Opción 2: Usar un generador online
1. Ve a: https://favicon.io/
2. Crea tu icono
3. Descarga
4. Usa en PWA Builder

---

## 📊 Resumen de URLs Importantes

- **GitHub:** https://github.com/
- **PWA Builder:** https://www.pwabuilder.com/
- **Tu app (después de subir):** https://TU_USUARIO.github.io/mehaquedadobien/

---

## ✅ Checklist Final

- [ ] Código subido a GitHub
- [ ] GitHub Pages activado
- [ ] URL funcionando en el navegador
- [ ] APK generada con PWA Builder
- [ ] APK descargada en tu PC
- [ ] APK instalada en tu móvil
- [ ] App funcionando en el móvil

---

## 🎉 ¡Listo!

Ahora tienes tu app **mehaquedadobien** instalada en tu móvil como una app nativa.

### Ventajas:
✅ Funciona offline
✅ Icono en el escritorio
✅ Pantalla completa (sin barra del navegador)
✅ Notificaciones (si las implementas)
✅ Acceso rápido

---

## 🔄 Actualizar la App en el Futuro

1. Haz cambios en tu código local
2. Sube los cambios a GitHub:
   ```powershell
   git add .
   git commit -m "Actualización"
   git push
   ```
3. Espera 1-2 minutos
4. La app se actualizará automáticamente en los móviles (al abrirla con internet)

**Para nueva APK:**
- Repite el proceso de PWA Builder
- Incrementa el número de versión
- Reinstala en el móvil

---

¿Necesitas ayuda con algún paso? ¡Pregúntame! 🚀
