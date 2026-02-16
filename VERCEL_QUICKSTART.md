# 🌐 Guía Rápida de Despliegue en Vercel

## 🚀 Deploy en 3 Pasos (Opción Demo)

### 1️⃣ Preparar Git

```bash
# Ejecuta el script automático (Windows)
.\deploy-vercel.bat

# O manualmente:
git init
git add .
git commit -m "Deploy a Vercel"
```

### 2️⃣ Subir a GitHub

```bash
# Crea un repo en GitHub primero, luego:
git remote add origin https://github.com/TU_USUARIO/registro-clientes.git
git branch -M main
git push -u origin main
```

### 3️⃣ Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com) y regístrate con GitHub
2. Clic en **"Add New Project"**
3. Selecciona tu repositorio `registro-clientes`
4. Clic en **"Deploy"**
5. ¡Espera 2-3 minutos y listo! 🎉

---

## ⚠️ Importante

**SQLite no es persistente en Vercel**

- ✅ Perfecto para demos y mostrar la interfaz
- ❌ Los datos se reinician cada deploy
- 💡 Para producción real, usa Vercel Postgres (ver VERCEL_DEPLOY.md)

---

## 📖 Documentación Completa

Para más opciones y configuración con PostgreSQL:

- 📄 Lee [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

---

**¡Tu app estará en línea en menos de 5 minutos! 🚀**
