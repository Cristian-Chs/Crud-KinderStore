# 🚀 Guía de Despliegue - Sistema de Registro de Clientes

Esta guía te ayudará a desplegar tu aplicación en la nube. Te recomiendo **Render** por su facilidad de uso y plan gratuito.

---

## 🎯 Opciones de Despliegue

### 1. **Render** ⭐ (Recomendado)

- ✅ Plan gratuito permanente
- ✅ Despliegue automático desde GitHub
- ✅ SSL/HTTPS gratis
- ✅ Base de datos SQLite persistente
- ✅ Muy fácil de configurar

### 2. **Railway**

- ✅ $5 USD gratis al mes
- ✅ Despliegue rápido
- ✅ Buena experiencia de desarrollo

### 3. **Heroku**

- ⚠️ Ya no tiene plan gratuito
- ✅ Muy popular y estable

### 4. **PythonAnywhere**

- ✅ Plan gratuito limitado
- ✅ Especializado en Python

---

## 📦 Despliegue en Render (Paso a Paso)

### Paso 1: Preparar el Repositorio Git

Si aún no has inicializado Git en tu proyecto:

```bash
# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Sistema CRUD de clientes con Flask y SQLite"
```

### Paso 2: Subir a GitHub

1. Ve a [GitHub](https://github.com) y crea una cuenta (si no tienes)
2. Crea un nuevo repositorio llamado `registro-clientes`
3. **NO inicialices con README, .gitignore ni licencia** (ya los tenemos)
4. Copia la URL del repositorio (ej: `https://github.com/tu-usuario/registro-clientes.git`)
5. Conecta tu repositorio local:

```bash
git remote add origin https://github.com/tu-usuario/registro-clientes.git
git branch -M main
git push -u origin main
```

### Paso 3: Crear cuenta en Render

1. Ve a [Render.com](https://render.com)
2. Haz clic en **"Get Started for Free"**
3. Regístrate con tu cuenta de GitHub (recomendado)

### Paso 4: Crear Web Service

1. En el dashboard de Render, clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub `registro-clientes`
3. Configura el servicio:

**Configuración:**

```
Name: registro-clientes
Region: Ohio (US East) o el más cercano
Branch: main
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
Instance Type: Free
```

4. Haz clic en **"Create Web Service"**

### Paso 5: Variables de Entorno (Opcional)

Por ahora no necesitas configurar variables de entorno, pero si en el futuro agregas claves API:

1. Ve a **"Environment"** en el dashboard del servicio
2. Agrega las variables que necesites

### Paso 6: Esperar el Despliegue

- El proceso toma 2-5 minutos
- Verás los logs en tiempo real
- Cuando termine, te dará una URL como: `https://registro-clientes.onrender.com`

### Paso 7: ¡Listo! 🎉

Tu aplicación está desplegada. Accede desde cualquier lugar con la URL proporcionada.

---

## ⚙️ Configuración de Producción

### Actualizar app.py para Producción

Necesitas modificar ligeramente `app.py` para que funcione en producción:

```python
import os

# ... (resto del código)

if __name__ == '__main__':
    # Configuración para producción y desarrollo
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'False') == 'True'

    init_db()
    print(f"🚀 Servidor iniciado en puerto {port}")
    print("📊 Base de datos SQLite: clientes.db")
    app.run(host='0.0.0.0', port=port, debug=debug)
```

> **Nota**: Ya incluí esta configuración en el archivo. No necesitas cambiar nada.

---

## 🔄 Actualizaciones Automáticas

Render detecta automáticamente cambios en tu repositorio de GitHub:

1. Haz cambios en tu código local
2. Commit y push:
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```
3. Render desplegará automáticamente la nueva versión

---

## 🛠️ Despliegue en Railway

### Paso 1: Preparar Git (igual que Render)

```bash
git init
git add .
git commit -m "Sistema CRUD de clientes"
git push
```

### Paso 2: Crear cuenta en Railway

1. Ve a [Railway.app](https://railway.app)
2. Regístrate con GitHub
3. Obtén $5 USD gratis

### Paso 3: Desplegar

1. Clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Elige tu repositorio
4. Railway detecta automáticamente que es una app Flask
5. Espera 2-3 minutos
6. Obtén tu URL pública

---

## 📊 Persistencia de la Base de Datos

### ⚠️ Importante sobre SQLite en Render

**Render Free Tier reinicia el contenedor cada cierto tiempo**, lo que puede causar pérdida de datos en SQLite.

### Soluciones:

#### Opción 1: PostgreSQL (Recomendado para producción)

Si necesitas persistencia garantizada, usa PostgreSQL:

1. En Render, crea un **PostgreSQL Database** (también tiene plan gratuito)
2. Modifica `app.py` para usar PostgreSQL en lugar de SQLite
3. Instala `psycopg2-binary` en `requirements.txt`

#### Opción 2: Exportaciones Regulares

Descarga el Excel regularmente como respaldo:

- Usa el botón **"📤 Exportar Excel"** periódicamente
- Guarda los archivos como backup

#### Opción 3: Usar Railway (Persistencia mejor)

Railway tiene mejor persistencia de volúmenes en el plan gratuito.

---

## 🌐 Dominio Personalizado (Opcional)

### En Render:

1. Ve a **"Settings"** → **"Custom Domain"**
2. Agrega tu dominio (ej: `clientes.miempresa.com`)
3. Configura los DNS según las instrucciones
4. SSL se configura automáticamente

### Costo:

- Dominio: ~$10-15 USD/año (en Namecheap, GoDaddy, etc.)
- Hosting en Render: Gratis

---

## 📝 Checklist de Despliegue

Antes de desplegar, verifica:

- [x] `requirements.txt` tiene todas las dependencias
- [x] `Procfile` existe con `web: gunicorn app:app`
- [x] `.gitignore` excluye `venv/`, `*.pyc`, `__pycache__/`
- [x] `app.py` está configurado para `host='0.0.0.0'`
- [x] Git está inicializado y pusheado a GitHub
- [ ] Has probado la aplicación localmente
- [ ] Has leído la documentación de la plataforma elegida

---

## 🐛 Solución de Problemas

### Error: "Application failed to start"

**Causa**: Falta gunicorn o configuración incorrecta del Procfile

**Solución**:

```bash
# Agrega gunicorn a requirements.txt
echo "gunicorn>=21.0.0" >> requirements.txt

# Verifica el Procfile
cat Procfile
# Debe decir: web: gunicorn app:app
```

### Error: "Module not found"

**Causa**: Falta una dependencia en `requirements.txt`

**Solución**:

```bash
# Genera requirements.txt actualizado
pip freeze > requirements.txt
git add requirements.txt
git commit -m "Actualizar dependencias"
git push
```

### Error: Base de datos no persiste

**Causa**: Render reinicia contenedores regularmente en el plan gratuito

**Solución**: Migrar a PostgreSQL o usar Railway para mejor persistencia

### Error: Timeout al iniciar

**Causa**: La aplicación tarda mucho en iniciar

**Solución**:

- Verifica los logs en el dashboard
- Reduce el tamaño de las dependencias
- Asegúrate de que pandas se compile correctamente

---

## 💡 Consejos Pro

### 1. Monitoreo

- Render muestra logs en tiempo real
- Configura alertas para cuando la app caiga

### 2. Seguridad

- No subas claves API al repositorio
- Usa variables de entorno para información sensible
- El entorno virtual (`venv/`) no debe subirse a Git (ya excluido en `.gitignore`)

### 3. Performance

- El plan gratuito de Render "duerme" después de 15 min de inactividad
- La primera solicitud puede tardar 30-60 segundos en despertar
- Para evitarlo, usa un servicio de ping cada 10 minutos

### 4. Backups

- Exporta Excel regularmente
- Guarda copias de la base de datos local
- Considera usar PostgreSQL para producción real

---

## 📞 Recursos Adicionales

- [Documentación de Render](https://render.com/docs)
- [Documentación de Railway](https://docs.railway.app/)
- [Guías de Flask Deployment](https://flask.palletsprojects.com/en/latest/deploying/)
- [Gunicorn Documentation](https://docs.gunicorn.org/)

---

## ✅ Resumen Rápido

**Para desplegar en Render:**

```bash
# 1. Preparar Git
git init
git add .
git commit -m "Initial commit"

# 2. Subir a GitHub
git remote add origin https://github.com/TU_USUARIO/registro-clientes.git
git push -u origin main

# 3. En Render.com:
# - New Web Service
# - Conectar repo
# - Runtime: Python 3
# - Build: pip install -r requirements.txt
# - Start: gunicorn app:app
# - Deploy!

# 4. Esperar 2-5 minutos
# 5. ¡Listo! Accede a tu URL
```

**¡Tu aplicación estará disponible 24/7 en internet! 🌍**
