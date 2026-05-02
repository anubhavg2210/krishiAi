#!/bin/bash
# ============================================
# Krishi AI Sahayak - Complete Setup Script
# ============================================
# This script sets up the entire project for development

echo "🌱 Krishi AI Sahayak - Project Setup"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3 first."
    exit 1
fi

echo "✅ Node.js and Python 3 detected"

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate || . venv/Scripts/activate

# Install backend dependencies
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your API keys"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env and add your API keys:"
echo "   - VITE_GEMINI_API_KEY (from https://aistudio.google.com/app/apikey)"
echo "   - API_KEY (optional, from https://openweathermap.org/api)"
echo ""
echo "2. Start the development servers:"
echo "   - Frontend: npm run dev (from frontend/)"
echo "   - Backend: uvicorn app:app --reload (from backend/)"
echo ""
echo "3. Open http://localhost:5173 in your browser"
