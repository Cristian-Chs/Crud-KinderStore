#!/bin/bash

# Script para iniciar la aplicación

# Activar entorno virtual
source venv/bin/activate

# Instalar/actualizar dependencias
pip install -r requirements.txt

# Iniciar servidor
python app.py
