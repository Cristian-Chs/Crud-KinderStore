from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
import sqlite3
import pandas as pd
from datetime import datetime
import os
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Configuración
DATABASE = 'clientes.db'
UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Inicializar base de datos
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            telefono TEXT NOT NULL,
            fecha_registro TEXT NOT NULL,
            articulo TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Obtener conexión a la base de datos
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Ruta principal
@app.route('/')
def index():
    return render_template('index.html')

# API: Obtener todos los clientes
@app.route('/api/clientes', methods=['GET'])
def get_clientes():
    conn = get_db_connection()
    clientes = conn.execute('SELECT * FROM clientes ORDER BY id DESC').fetchall()
    conn.close()
    
    clientes_list = []
    for cliente in clientes:
        clientes_list.append({
            'id': cliente['id'],
            'nombre': cliente['nombre'],
            'telefono': cliente['telefono'],
            'fecha_registro': cliente['fecha_registro'],
            'articulo': cliente['articulo']
        })
    
    return jsonify(clientes_list)

# API: Obtener un cliente por ID
@app.route('/api/clientes/<int:id>', methods=['GET'])
def get_cliente(id):
    conn = get_db_connection()
    cliente = conn.execute('SELECT * FROM clientes WHERE id = ?', (id,)).fetchone()
    conn.close()
    
    if cliente is None:
        return jsonify({'error': 'Cliente no encontrado'}), 404
    
    return jsonify({
        'id': cliente['id'],
        'nombre': cliente['nombre'],
        'telefono': cliente['telefono'],
        'fecha_registro': cliente['fecha_registro'],
        'articulo': cliente['articulo']
    })

# API: Crear un nuevo cliente
@app.route('/api/clientes', methods=['POST'])
def create_cliente():
    data = request.get_json()
    
    # Validación
    if not data.get('nombre') or not data.get('telefono') or not data.get('articulo'):
        return jsonify({'error': 'Faltan campos requeridos'}), 400
    
    # Si no se proporciona fecha, usar la actual
    fecha_registro = data.get('fecha_registro', datetime.now().strftime('%Y-%m-%d'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO clientes (nombre, telefono, fecha_registro, articulo) VALUES (?, ?, ?, ?)',
        (data['nombre'], data['telefono'], fecha_registro, data['articulo'])
    )
    conn.commit()
    nuevo_id = cursor.lastrowid
    conn.close()
    
    return jsonify({
        'id': nuevo_id,
        'nombre': data['nombre'],
        'telefono': data['telefono'],
        'fecha_registro': fecha_registro,
        'articulo': data['articulo']
    }), 201

# API: Actualizar un cliente
@app.route('/api/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    data = request.get_json()
    
    conn = get_db_connection()
    cliente = conn.execute('SELECT * FROM clientes WHERE id = ?', (id,)).fetchone()
    
    if cliente is None:
        conn.close()
        return jsonify({'error': 'Cliente no encontrado'}), 404
    
    # Actualizar campos
    nombre = data.get('nombre', cliente['nombre'])
    telefono = data.get('telefono', cliente['telefono'])
    fecha_registro = data.get('fecha_registro', cliente['fecha_registro'])
    articulo = data.get('articulo', cliente['articulo'])
    
    conn.execute(
        'UPDATE clientes SET nombre = ?, telefono = ?, fecha_registro = ?, articulo = ? WHERE id = ?',
        (nombre, telefono, fecha_registro, articulo, id)
    )
    conn.commit()
    conn.close()
    
    return jsonify({
        'id': id,
        'nombre': nombre,
        'telefono': telefono,
        'fecha_registro': fecha_registro,
        'articulo': articulo
    })

# API: Eliminar un cliente
@app.route('/api/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    conn = get_db_connection()
    cliente = conn.execute('SELECT * FROM clientes WHERE id = ?', (id,)).fetchone()
    
    if cliente is None:
        conn.close()
        return jsonify({'error': 'Cliente no encontrado'}), 404
    
    conn.execute('DELETE FROM clientes WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Cliente eliminado exitosamente'})

# API: Buscar clientes
@app.route('/api/clientes/buscar', methods=['GET'])
def buscar_clientes():
    query = request.args.get('q', '')
    
    conn = get_db_connection()
    clientes = conn.execute(
        '''SELECT * FROM clientes 
           WHERE nombre LIKE ? OR telefono LIKE ? OR articulo LIKE ?
           ORDER BY id DESC''',
        (f'%{query}%', f'%{query}%', f'%{query}%')
    ).fetchall()
    conn.close()
    
    clientes_list = []
    for cliente in clientes:
        clientes_list.append({
            'id': cliente['id'],
            'nombre': cliente['nombre'],
            'telefono': cliente['telefono'],
            'fecha_registro': cliente['fecha_registro'],
            'articulo': cliente['articulo']
        })
    
    return jsonify(clientes_list)

# API: Exportar a Excel
@app.route('/api/exportar-excel', methods=['GET'])
def exportar_excel():
    conn = get_db_connection()
    clientes = conn.execute('SELECT * FROM clientes ORDER BY id').fetchall()
    conn.close()
    
    # Convertir a DataFrame
    data = []
    for cliente in clientes:
        data.append({
            'ID': cliente['id'],
            'Nombre': cliente['nombre'],
            'Teléfono': cliente['telefono'],
            'Fecha de Registro': cliente['fecha_registro'],
            'Artículo': cliente['articulo']
        })
    
    df = pd.DataFrame(data)
    
    # Crear archivo Excel en memoria
    output = BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Clientes')
    output.seek(0)
    
    return send_file(
        output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name=f'clientes_{datetime.now().strftime("%Y%m%d_%H%M%S")}.xlsx'
    )

# API: Importar desde Excel
@app.route('/api/importar-excel', methods=['POST'])
def importar_excel():
    if 'file' not in request.files:
        return jsonify({'error': 'No se encontró el archivo'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No se seleccionó ningún archivo'}), 400
    
    if not file.filename.endswith(('.xlsx', '.xls')):
        return jsonify({'error': 'El archivo debe ser un Excel (.xlsx o .xls)'}), 400
    
    try:
        # Leer Excel
        df = pd.read_excel(file)
        
        # Validar columnas requeridas
        columnas_requeridas = ['Nombre', 'Teléfono', 'Artículo']
        for col in columnas_requeridas:
            if col not in df.columns:
                return jsonify({'error': f'Falta la columna requerida: {col}'}), 400
        
        # Insertar registros
        conn = get_db_connection()
        cursor = conn.cursor()
        registros_importados = 0
        
        for _, row in df.iterrows():
            nombre = str(row['Nombre']).strip()
            telefono = str(row['Teléfono']).strip()
            articulo = str(row['Artículo']).strip()
            
            # Usar fecha del Excel si existe, sino fecha actual
            if 'Fecha de Registro' in df.columns and pd.notna(row['Fecha de Registro']):
                try:
                    fecha_registro = pd.to_datetime(row['Fecha de Registro']).strftime('%Y-%m-%d')
                except:
                    fecha_registro = datetime.now().strftime('%Y-%m-%d')
            else:
                fecha_registro = datetime.now().strftime('%Y-%m-%d')
            
            # Validar que los campos no estén vacíos
            if nombre and telefono and articulo:
                cursor.execute(
                    'INSERT INTO clientes (nombre, telefono, fecha_registro, articulo) VALUES (?, ?, ?, ?)',
                    (nombre, telefono, fecha_registro, articulo)
                )
                registros_importados += 1
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': f'Se importaron {registros_importados} clientes exitosamente',
            'registros': registros_importados
        })
        
    except Exception as e:
        return jsonify({'error': f'Error al procesar el archivo: {str(e)}'}), 500

# API: Descargar plantilla Excel
@app.route('/api/plantilla-excel', methods=['GET'])
def plantilla_excel():
    # Crear plantilla con ejemplos
    data = {
        'Nombre': ['Juan Pérez', 'María García'],
        'Teléfono': ['555-1234', '555-5678'],
        'Fecha de Registro': ['2024-01-15', '2024-01-20'],
        'Artículo': ['Laptop', 'Mouse']
    }
    
    df = pd.DataFrame(data)
    
    # Crear archivo Excel en memoria
    output = BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Clientes')
    output.seek(0)
    
    return send_file(
        output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name='plantilla_clientes.xlsx'
    )

if __name__ == '__main__':
    # Configuración para producción y desarrollo
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'False') == 'True'
    
    init_db()
    print(f"🚀 Servidor iniciado en puerto {port}")
    print("📊 Base de datos SQLite: clientes.db")
    app.run(host='0.0.0.0', port=port, debug=debug)
