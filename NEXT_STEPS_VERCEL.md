# 🚀 Pasos para Desplegar en Vercel - Crud-KinderStore

## ✅ Estado Actual

Tu código ya está en GitHub: https://github.com/Cristian-Chs/Crud-KinderStore

---

## 📋 Paso 1: Importar Proyecto en Vercel

### 1.1 Ir a Vercel

Ve a: **https://vercel.com**

### 1.2 Registrarse/Iniciar Sesión

- Clic en **"Sign Up"** (si no tienes cuenta)
- Selecciona **"Continue with GitHub"**
- Autoriza a Vercel para acceder a tus repositorios

### 1.3 Importar Repositorio

1. Una vez logueado, clic en **"Add New Project"** o **"Import Project"**
2. Busca: `Crud-KinderStore`
3. Clic en **"Import"** al lado del repositorio

### 1.4 Configurar Proyecto

Vercel detectará automáticamente que es Python. Acepta la configuración por defecto:

```
Framework Preset: Other
Root Directory: ./
Build Command: (vacío o automático)
Output Directory: (vacío)
Install Command: pip install -r requirements.txt
```

### 1.5 Primer Deploy

- Clic en **"Deploy"**
- ⚠️ **Este primer deploy FALLARÁ** - es normal
- **Razón**: Necesita la base de datos PostgreSQL primero
- Espera 2-3 minutos hasta que termine

---

## 📊 Paso 2: Crear Base de Datos PostgreSQL

### 2.1 Ir a Storage

En tu proyecto de Vercel:

- Clic en la pestaña **"Storage"** (arriba)

### 2.2 Crear Database

1. Clic en **"Create Database"**
2. Selecciona **"Postgres"**
3. **Database Name**: `clientes-db` (o el que prefieras)
4. **Region**: Selecciona **US East (Washington D.C.)** o la más cercana
5. Clic en **"Create"**

### 2.3 Conectar a Proyecto

1. Te preguntará: **"Connect to a project?"**
2. Selecciona tu proyecto: `Crud-KinderStore`
3. Clic en **"Connect"**

✅ Vercel automáticamente agregará las variables de entorno necesarias:

- `POSTGRES_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_PRISMA_URL`
- Y otras...

---

## 🔄 Paso 3: Redesplegar

### 3.1 Ir a Deployments

- Clic en la pestaña **"Deployments"**

### 3.2 Redesplegar el Último

1. Encuentra el último deployment (el que falló)
2. Clic en los **3 puntos (...)** al lado derecho
3. Selecciona **"Redeploy"**
4. Espera 2-3 minutos

### 3.3 Verificar Éxito

Cuando termine verás:

- ✅ Estado: **"Ready"** con checkmark verde
- 🌐 URL de tu aplicación (ej: `https://crud-kinder-store.vercel.app`)

---

## 🎉 Paso 4: ¡Probar la Aplicación!

### 4.1 Abrir URL

Clic en la URL de tu deploy o en **"Visit"**

### 4.2 Probar Funcionalidades

1. Agrega un cliente de prueba
2. Recarga la página - el cliente debe seguir ahí ✅
3. Prueba búsqueda, edición, eliminación
4. Prueba exportar/importar Excel

### 4.3 ¿Funciona? 🎊

¡Felicidades! Tu aplicación está desplegada con:

- ✅ Dominio público en internet
- ✅ Base de datos PostgreSQL persistente
- ✅ SSL/HTTPS incluido
- ✅ Deploy automático en cada push a GitHub

---

## 🔧 Troubleshooting

### Si el deploy falla después de crear la BD:

**Opción 1 - Redeploy con caché limpio:**

1. Deployments → 3 puntos → Redeploy
2. Marca **"Clear cache and redeploy"**

**Opción 2 - Verificar logs:**

1. Clic en el deployment que falló
2. Ve a **"Logs"**
3. Busca errores rojos
4. Comparte el error conmigo si necesitas ayuda

### Si no aparecen variables de entorno:

1. Ve a **Settings** → **Environment Variables**
2. Verifica que aparezcan las variables `POSTGRES_*`
3. Si no están, reconecta la base de datos:
   - Storage → clientes-db → Connect → Selecciona proyecto

---

## 📱 Próximos Pasos Opcionales

### Dominio Personalizado

1. Settings → Domains
2. Add domain: `tudominio.com`
3. Configura DNS según instrucciones
4. ¡SSL automático!

### Actualizaciones Automáticas

Cada vez que hagas `git push`:

```bash
git add .
git commit -m "Nueva funcionalidad"
git push
```

Vercel redesplegará automáticamente 🚀

---

## 📊 Límites Plan Gratuito

| Recurso     | Límite                                     |
| ----------- | ------------------------------------------ |
| PostgreSQL  | 256 MB (suficiente para miles de clientes) |
| Bandwidth   | 100 GB/mes                                 |
| Deployments | Ilimitados                                 |

---

## ✅ Checklist Rápido

- [ ] Ir a vercel.com y registrarse con GitHub
- [ ] Importar proyecto Crud-KinderStore
- [ ] Deploy inicial (fallará - OK)
- [ ] Storage → Create Postgres Database
- [ ] Conectar BD al proyecto
- [ ] Redeploy
- [ ] ¡Abrir URL y probar!

---

**¿Necesitas ayuda con algún paso? ¡Avísame! 🚀**

Tu URL estará lista en: `https://crud-kinder-store.vercel.app` (o similar)
