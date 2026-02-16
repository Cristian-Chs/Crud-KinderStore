# 🚀 Instrucciones para Deploy con PostgreSQL en Vercel

## ✅ Archivos Preparados

Ya he creado todo lo necesario:

- ✅ `app_postgres.py` - Versión adaptada para PostgreSQL
- ✅ `vercel.json` - Actualizado para usar `app_postgres.py`
- ✅ `requirements.txt` - Incluye `psycopg2-binary`

---

## 📝 Pasos para Deploy

### 1️⃣ Preparar Git y Subir a GitHub

```bash
# Preparar deploy
.\deploy-vercel.bat

# O manualmente:
git add .
git commit -m "Deploy con PostgreSQL a Vercel"

# Subir a GitHub (si aún no lo has hecho)
git remote add origin https://github.com/TU_USUARIO/registro-clientes.git
git branch -M main
git push -u origin main
```

### 2️⃣ Crear Proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Regístrate con GitHub
3. Clic en **"Add New Project"**
4. Selecciona tu repositorio `registro-clientes`
5. Clic en **"Deploy"** (por ahora fallará, necesitamos la BD)

### 3️⃣ Crear Base de Datos Postgres

1. En tu proyecto de Vercel, ve a la pestaña **"Storage"**
2. Clic en **"Create Database"**
3. Selecciona **"Postgres"**
4. Nombre: `clientes-db` (o el que prefieras)
5. Región: Selecciona la más cercana (ej: Washington, D.C. - US East)
6. Clic en **"Create"**

### 4️⃣ Conectar la Base de Datos

Vercel automáticamente agregará estas variables de entorno a tu proyecto:

```
POSTGRES_URL
POSTGRES_URL_NON_POOLING
POSTGRES_PRISMA_URL
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_HOST
POSTGRES_DATABASE
```

No necesitas hacer nada más, `app_postgres.py` las detectará automáticamente.

### 5️⃣ Redesplegar

1. Ve a **"Deployments"**
2. Clic en los 3 puntos del último deployment
3. Selecciona **"Redeploy"**
4. Espera 2-3 minutos

### 6️⃣ ¡Listo! 🎉

Tu aplicación estará disponible en la URL de Vercel (ej: `https://registro-clientes.vercel.app`)

**Características:**

- ✅ Datos 100% persistentes
- ✅ PostgreSQL gratuito (hasta 256MB)
- ✅ Deploy automático en cada push a GitHub
- ✅ SSL incluido

---

## 🔍 Verificar que Funciona

1. Abre la URL de tu aplicación
2. Agrega un cliente de prueba
3. Recarga la página - el cliente debe seguir ahí
4. Haz cambios en el código y push - Vercel redespliega automáticamente

---

## 🛠️ Comandos Útiles

### Actualizar la aplicación:

```bash
git add .
git commit -m "Actualización"
git push
# Vercel redespliega automáticamente
```

### Ver logs en Vercel:

1. Ve a tu proyecto en Vercel
2. Pestaña **"Logs"**
3. Revisa errores o confirmaciones

---

## 📊 Límites del Plan Gratuito de Vercel

| Recurso            | Límite        |
| ------------------ | ------------- |
| PostgreSQL Storage | 256 MB        |
| Compute Time       | 100 horas/mes |
| Bandwidth          | 100 GB/mes    |
| Deployments        | Ilimitados    |

Para uso personal y pequeños proyectos, es más que suficiente.

---

## 🐛 Solución de Problemas

### Error: "Database connection failed"

**Causa**: Variables de entorno no configuradas

**Solución**:

1. Asegúrate de haber creado la base de datos Postgres en Storage
2. Haz un redeploy después de crear la BD

### Error: "Module 'psycopg2' not found"

**Causa**: Dependencia no instalada

**Solución**:

```bash
# Verifica requirements.txt
cat requirements.txt | grep psycopg2

# Debe aparecer: psycopg2-binary>=2.9.9
```

### Los cambios no se reflejan

**Causa**: Caché de Vercel

**Solución**:

1. Ve a Deployments → Redeploy
2. Marca "Clear cache and redeploy"

---

## ✨ Próximos Pasos Opcionales

### Dominio Personalizado

1. En Vercel: **Settings** → **Domains**
2. Agrega tu dominio (ej: `clientes.tuempresa.com`)
3. Configura DNS según instrucciones
4. SSL automático incluido

### Monitoreo

Ve a **Analytics** en Vercel para ver:

- Visitas
- Performance
- Errores

---

## 📚 Diferencias con SQLite (local)

| Aspecto       | SQLite (local) | PostgreSQL (Vercel)   |
| ------------- | -------------- | --------------------- |
| Persistencia  | ✅ Local       | ✅ En la nube         |
| Acceso        | Solo local     | Desde cualquier lugar |
| Escalabilidad | Limitada       | Alta                  |
| Conexiones    | Una            | Múltiples simultáneas |
| Backup        | Manual         | Automático            |

---

## 🎯 Resumen Rápido

```bash
# 1. Commit y push
git add .
git commit -m "Deploy PostgreSQL"
git push

# 2. En Vercel.com:
# - Import from GitHub
# - Deploy (fallará primero)
# - Storage → Create Postgres Database
# - Redeploy

# 3. ¡Listo! Tu app está en línea con datos persistentes
```

**¡Tu aplicación con PostgreSQL estará disponible 24/7 con datos persistentes! 🚀**
