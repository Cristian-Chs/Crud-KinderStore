# 🚀 Despliegue en Vercel - Guía Completa

## ⚠️ Importante: Limitación de SQLite en Vercel

**Vercel funciona con Serverless Functions**, lo que significa:

- ❌ SQLite **NO es persistente** (los datos se pierden después de cada ejecución)
- ✅ Perfecto para demos y pruebas
- ✅ Para producción, necesitas una base de datos externa

---

## 🎯 Dos Opciones de Despliegue

### **Opción 1: Demo Rápido** (SQLite no persistente)

✅ Despliega en 5 minutos  
⚠️ Los datos se pierden al reiniciar  
👍 Perfecto para mostrar la interfaz y funcionalidades

### **Opción 2: Producción Real** (Con Vercel Postgres)

✅ Datos persistentes  
✅ Gratis hasta 256MB  
⚠️ Requiere configuración adicional  
👍 Ideal para uso real

---

## 🚀 OPCIÓN 1: Deploy Rápido (Demo)

### Paso 1: Preparar Git

Si aún no has inicializado Git:

```bash
git init
git add .
git commit -m "Sistema CRUD de clientes - Deploy a Vercel"
```

### Paso 2: Subir a GitHub

1. Crea un repositorio en [GitHub](https://github.com)
2. Sube tu código:

```bash
git remote add origin https://github.com/TU_USUARIO/registro-clientes.git
git branch -M main
git push -u origin main
```

### Paso 3: Conectar con Vercel

1. Ve a [Vercel.com](https://vercel.com)
2. Regístrate con tu cuenta de GitHub
3. Clic en **"Add New Project"**
4. Importa tu repositorio `registro-clientes`

### Paso 4: Configuración del Proyecto

Vercel detectará automáticamente que es Python. Configura:

```
Framework Preset: Other
Root Directory: ./
Build Command: (déjalo vacío)
Output Directory: (déjalo vacío)
Install Command: pip install -r requirements.txt
```

### Paso 5: Variables de Entorno (Opcional)

Por ahora no necesitas configurar ninguna.

### Paso 6: Deploy!

- Clic en **"Deploy"**
- Espera 2-3 minutos
- ¡Listo! Obtendrás una URL como `https://registro-clientes.vercel.app`

### ⚠️ Limitaciones de esta opción:

- Los datos se reinician cada vez que Vercel redespliega
- Perfecto para demo y pruebas
- No recomendado para uso en producción

---

## 💎 OPCIÓN 2: Producción con Vercel Postgres

### Paso 1: Crear Base de Datos Postgres en Vercel

1. En tu proyecto de Vercel, ve a **"Storage"**
2. Clic en **"Create Database"**
3. Selecciona **"Postgres"**
4. Elige una región cercana
5. Clic en **"Create"**

### Paso 2: Obtener Credenciales

Vercel te dará variables de entorno automáticamente:

- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### Paso 3: Actualizar `requirements.txt`

Agrega soporte para PostgreSQL:

```txt
Flask>=3.0.0
flask-cors>=4.0.0
pandas>=2.2.0
openpyxl>=3.1.0
gunicorn>=21.0.0
psycopg2-binary>=2.9.9
```

### Paso 4: Crear `app_postgres.py`

Crea una versión adaptada para Postgres (te la proporcionaré).

### Paso 5: Actualizar `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app_postgres.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "app_postgres.py"
    }
  ]
}
```

### Paso 6: Deploy

```bash
git add .
git commit -m "Migrar a PostgreSQL para Vercel"
git push
```

Vercel desplegará automáticamente.

---

## 🔧 Configuración Actual del Proyecto

### Archivos creados para Vercel:

- ✅ `vercel.json` - Configuración de despliegue
- ⏳ `app_postgres.py` - Versión adaptada (si eliges Opción 2)

### Estructura recomendada:

```
Registro_clientes/
├── app.py              # Versión SQLite (desarrollo local)
├── app_postgres.py     # Versión Postgres (producción Vercel)
├── vercel.json         # Configuración Vercel
├── requirements.txt
└── ...
```

---

## 📝 Comparación de Opciones

| Característica      | Opción 1 (Demo)         | Opción 2 (Producción) |
| ------------------- | ----------------------- | --------------------- |
| **Tiempo setup**    | 5 minutos               | 15 minutos            |
| **Persistencia**    | ❌ No                   | ✅ Sí                 |
| **Costo**           | Gratis                  | Gratis (hasta 256MB)  |
| **Uso recomendado** | Demos, pruebas          | Producción real       |
| **Base de datos**   | SQLite (no persistente) | PostgreSQL            |

---

## 🎨 Alternativa: Vercel con JSON File Storage

Si quieres algo intermedio, puedo crear una versión que use archivos JSON en lugar de SQLite:

**Ventajas:**

- ✅ Más simple que PostgreSQL
- ✅ Semi-persistente con git
- ⚠️ Limitado a pocos registros

**¿Te interesa esta opción?** Déjame saber.

---

## 🚀 Deploy Rápido (Resumen)

**Para la Opción 1 (Demo SQLite):**

```bash
# 1. Git
git init
git add .
git commit -m "Deploy a Vercel"

# 2. GitHub
git remote add origin https://github.com/TU_USUARIO/registro-clientes.git
git push -u origin main

# 3. Vercel.com
# - Import from GitHub
# - Deploy!
```

**Para la Opción 2 (Postgres):**

1. Haz los pasos de Opción 1
2. En Vercel: Storage → Create Database → Postgres
3. Usa `app_postgres.py` (te lo crearé si quieres)
4. Actualiza `requirements.txt` con `psycopg2-binary`
5. ¡Deploy!

---

## ⚙️ Configuración de Dominio Personalizado

Después del deploy:

1. Ve a **"Settings"** → **"Domains"**
2. Agrega tu dominio personalizado
3. Configura DNS según instrucciones
4. ¡SSL automático!

---

## 🐛 Solución de Problemas

### Error: "Build failed"

**Causa**: Dependencias no instaladas

**Solución**:

```bash
# Verifica que requirements.txt esté correcto
cat requirements.txt

# Asegúrate de que esté en el root del proyecto
```

### Error: "Module not found"

**Causa**: Falta `vercel.json`

**Solución**: Usa el `vercel.json` que ya creé

### Los datos desaparecen

**Causa**: Usando SQLite en Vercel (no persistente)

**Solución**: Migra a Vercel Postgres (Opción 2)

---

## 💡 Recomendación Personal

**Para empezar:**

- 👉 Usa **Opción 1** para ver tu app en línea rápidamente
- Muestra la interfaz y funcionalidades
- Ideal para portfolios y demos

**Para uso real:**

- 👉 Usa **Opción 2** con Vercel Postgres
- O considera **Render/Railway** (mejor para SQLite)

---

## 📚 Recursos

- [Vercel Docs - Python](https://vercel.com/docs/functions/serverless-functions/runtimes/python)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel CLI](https://vercel.com/docs/cli)

---

## ✅ Próximos Pasos

**¿Qué quieres hacer?**

1. **Deploy rápido con SQLite (demo)** → Solo sigue los pasos de Opción 1
2. **Deploy con PostgreSQL (producción)** → Necesitas que cree `app_postgres.py`
3. **Deploy con JSON storage (intermedio)** → Puedo crear esta versión también

**Déjame saber cuál prefieres y procedo!** 🚀
