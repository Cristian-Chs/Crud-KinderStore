import os
import sys

# Agregar el directorio padre al path para poder importar app_postgres
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app_postgres import app

# Vercel requerirá esta variable 'app' para ejecutar la función
