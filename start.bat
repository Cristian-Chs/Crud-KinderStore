@echo off
REM Script para iniciar la aplicación en Windows

REM Activar entorno virtual
call venv\Scripts\activate.bat

REM Instalar/actualizar dependencias
pip install -r requirements.txt

REM Iniciar servidor
python app.py
