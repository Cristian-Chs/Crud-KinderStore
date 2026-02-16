# 📋 Archivos del Proyecto - Referencia Rápida

## 🎯 Para Desarrollo Local

**Usa estos archivos:**

- `app.py` - Versión con SQLite (datos locales)
- `start.bat` o `start.sh` - Scripts para iniciar con entorno virtual

**Comando:**

```bash
# Windows
.\start.bat

# Linux/Mac
./start.sh
```

---

## 🚀 Para Despliegue en Vercel

### Archivos Principales:

- `app_postgres.py` - Versión para Vercel con PostgreSQL
- `vercel.json` - Configuración de Vercel
- `requirements.txt` - Dependencias Python

### Archivos de Despliegue:

- `deploy-vercel.bat` - Script de preparación (Windows)
- `deploy-vercel.sh` - Script de preparación (Linux/Mac)

### Documentación:

- `VERCEL_QUICKSTART.md` - Inicio rápido (3 pasos)
- `VERCEL_POSTGRES_SETUP.md` ⭐ **Sigue esta guía**
- `VERCEL_DEPLOY.md` - Guía completa con opciones

---

## 📚 Estructura Completa

```
Registro_clientes/
│
├── 🔧 DESARROLLO LOCAL
│   ├── app.py                      # App con SQLite
│   ├── start.bat / start.sh        # Scripts de inicio
│   └── venv/                       # Entorno virtual
│
├── 🚀 PRODUCCIÓN VERCEL
│   ├── app_postgres.py             # App con PostgreSQL
│   ├── vercel.json                 # Config Vercel
│   ├── deploy-vercel.bat/sh        # Scripts deploy
│   └── VERCEL_POSTGRES_SETUP.md    # Instrucciones
│
├── 📖 DOCUMENTACIÓN
│   ├── README.md                   # Guía principal
│   ├── DEPLOYMENT.md               # Deploy Render/Railway
│   ├── VERCEL_QUICKSTART.md        # Inicio rápido Vercel
│   ├── VERCEL_DEPLOY.md            # Guía completa Vercel
│   └── VERCEL_POSTGRES_SETUP.md    # Setup PostgreSQL
│
├── 🎨 FRONTEND
│   ├── templates/index.html        # Interfaz principal
│   └── static/
│       ├── styles.css              # Estilos
│       └── script.js               # Lógica frontend
│
└── ⚙️ CONFIGURACIÓN
    ├── requirements.txt            # Dependencias
    ├── .gitignore                  # Exclusiones git
    ├── .env.example                # Ejemplo variables entorno
    └── Procfile                    # Config Render/Heroku
```

---

## 🎯 ¿Qué archivo debo usar?

### Para trabajar localmente:

👉 **Ejecuta**: `start.bat` (Windows) o `./start.sh` (Linux/Mac)  
👉 **Usa**: `app.py`

### Para desplegar en Vercel:

👉 **Lee**: `VERCEL_POSTGRES_SETUP.md`  
👉 **Ejecuta**: `deploy-vercel.bat` (Windows)  
👉 **Vercel usa**: `app_postgres.py` automáticamente

### Para otras plataformas (Render, Railway):

👉 **Lee**: `DEPLOYMENT.md`  
👉 **Usa**: `app.py` (funciona mejor con SQLite en estas plataformas)

---

## 🔑 Diferencias Clave

| Aspecto           | app.py           | app_postgres.py     |
| ----------------- | ---------------- | ------------------- |
| **Base de datos** | SQLite           | PostgreSQL          |
| **Uso**           | Desarrollo local | Producción Vercel   |
| **Persistencia**  | Archivo local    | Base de datos cloud |
| **Variables env** | No requiere      | POSTGRES_URL        |
| **Dependencias**  | Básicas          | + psycopg2-binary   |

---

## ✅ Próximo Paso

**Para desplegar en Vercel ahora:**

1. Lee: `VERCEL_POSTGRES_SETUP.md`
2. Ejecuta: `.\deploy-vercel.bat`
3. Sigue las instrucciones en la guía

**¡Todo está listo! 🚀**
