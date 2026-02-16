# 📋 Sistema de Registro de Clientes

Sistema web completo para gestión de clientes con **CRUD**, integración con **Excel** y base de datos **SQLite**.

## 🎯 Características

✅ **CRUD Completo**

- Crear, leer, actualizar y eliminar clientes
- Búsqueda en tiempo real
- Interfaz moderna y responsiva

✅ **Integración con Excel**

- 📥 Importar clientes desde Excel
- 📤 Exportar clientes a Excel
- 📊 Descargar plantilla de ejemplo

✅ **Base de Datos**

- SQLite (sin necesidad de servidor)
- Campos: ID, Nombre, Teléfono, Fecha de Registro, Artículo

## 🚀 Instalación

### 1. Instalar Python

Asegúrate de tener Python 3.8+ instalado. Verifica con:

```bash
python --version
```

### 2. **Opción A: Usar Entorno Virtual** ⭐ (Recomendado)

#### Windows:

```bash
# Crear y activar entorno virtual
py -m venv venv
.\venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# O usar el script automático
.\start.bat
```

#### Linux/Mac:

```bash
# Crear y activar entorno virtual
python3 -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# O usar el script automático
chmod +x start.sh
./start.sh
```

### 2. **Opción B: Instalación Global**

```bash
pip install -r requirements.txt
```

### 3. Ejecutar la Aplicación

```bash
python app.py
```

### 4. Abrir en el Navegador

Abre tu navegador y ve a:

```
http://localhost:5000
```

## 📁 Estructura del Proyecto

```
Registro_clientes/
│
├── app.py                  # Backend Flask con API REST
├── requirements.txt        # Dependencias Python
├── clientes.db            # Base de datos SQLite (se crea automáticamente)
│
├── templates/
│   └── index.html         # Interfaz principal
│
└── static/
    ├── styles.css         # Estilos modernos
    └── script.js          # Lógica del frontend
```

## 🔧 Uso

### Agregar Cliente

1. Clic en "➕ Nuevo Cliente"
2. Llena el formulario
3. Clic en "💾 Guardar"

### Buscar Cliente

Escribe en la barra de búsqueda para filtrar por nombre, teléfono o artículo.

### Editar/Eliminar Cliente

Usa los botones "✏️ Editar" o "🗑️ Eliminar" en cada fila.

### Importar desde Excel

1. Descarga la plantilla: "📥 Descargar Plantilla"
2. Llena tus datos en el archivo Excel
3. Clic en "📁 Importar Excel" y selecciona el archivo

### Exportar a Excel

Clic en "📤 Exportar Excel" para descargar todos los clientes.

## 📊 Formato de Excel

El archivo Excel debe tener las siguientes columnas:

| Nombre       | Teléfono | Fecha de Registro | Artículo |
| ------------ | -------- | ----------------- | -------- |
| Juan Pérez   | 555-1234 | 2024-01-15        | Laptop   |
| María García | 555-5678 | 2024-01-20        | Mouse    |

## 🛠️ Tecnologías

- **Backend**: Flask (Python)
- **Base de Datos**: SQLite
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Excel**: pandas, openpyxl

## 📝 API Endpoints

| Método | Endpoint                         | Descripción                |
| ------ | -------------------------------- | -------------------------- |
| GET    | `/api/clientes`                  | Obtener todos los clientes |
| GET    | `/api/clientes/<id>`             | Obtener un cliente         |
| POST   | `/api/clientes`                  | Crear nuevo cliente        |
| PUT    | `/api/clientes/<id>`             | Actualizar cliente         |
| DELETE | `/api/clientes/<id>`             | Eliminar cliente           |
| GET    | `/api/clientes/buscar?q=<query>` | Buscar clientes            |
| GET    | `/api/exportar-excel`            | Exportar a Excel           |
| POST   | `/api/importar-excel`            | Importar desde Excel       |
| GET    | `/api/plantilla-excel`           | Descargar plantilla        |

## 🌐 Desplegar en Internet

¿Quieres que tu aplicación esté disponible 24/7 en internet?

📖 **Lee la guía completa**: [DEPLOYMENT.md](DEPLOYMENT.md)

**Opciones recomendadas:**

- **Render** (Gratis, más fácil) ⭐
- **Railway** ($5 USD/mes gratis)
- Heroku, PythonAnywhere, etc.

**Resumen rápido:**

1. Sube tu código a GitHub
2. Conecta tu repositorio en Render
3. ¡Deploy automático!

---

## ❓ Solución de Problemas

### Error: "No module named 'flask'"

```bash
pip install -r requirements.txt
```

### El servidor no inicia

Verifica que el puerto 5000 no esté en uso.

### Error al importar Excel

Asegúrate de que el archivo tenga las columnas correctas: Nombre, Teléfono, Artículo.

## 📞 Soporte

¿Problemas? Verifica que:

1. Python 3.8+ esté instalado
2. Todas las dependencias estén instaladas
3. El puerto 5000 esté disponible

---

**¡Listo para usar! 🎉**
