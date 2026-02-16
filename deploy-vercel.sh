#!/bin/bash

echo "🚀 Preparando deploy a Vercel..."

# Verificar si git está inicializado
if [ ! -d .git ]; then
    echo "📦 Inicializando Git..."
    git init
fi

# Agregar archivos
echo "📝 Agregando archivos..."
git add .

# Commit
echo "💾 Haciendo commit..."
git commit -m "Deploy a Vercel - Sistema CRUD de clientes"

# Instrucciones
echo ""
echo "✅ ¡Listo para deploy!"
echo ""
echo "📌 Próximos pasos:"
echo "1. Sube a GitHub:"
echo "   git remote add origin https://github.com/TU_USUARIO/registro-clientes.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2. Ve a Vercel.com y conecta tu repositorio"
echo ""
echo "📖 Más info en: VERCEL_DEPLOY.md"
