@echo off
REM ============================================
REM Krishi AI Sahayak - Complete Setup Script
REM ============================================
REM This script sets up the entire project for development on Windows

echo.
echo 🌱 Krishi AI Sahayak - Project Setup
echo =====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python first.
    pause
    exit /b 1
)

echo ✅ Node.js and Python detected

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd ..

REM Setup Backend
echo.
echo 📦 Setting up Backend...
cd backend

REM Create virtual environment
python -m venv venv
call venv\Scripts\activate.bat

REM Install backend dependencies
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

cd ..

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo.
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please edit .env and add your API keys
)

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Edit .env and add your API keys:
echo    - VITE_GEMINI_API_KEY (from https://aistudio.google.com/app/apikey)
echo    - API_KEY (optional, from https://openweathermap.org/api)
echo.
echo 2. Start the development servers in separate terminals:
echo    - Frontend: cd frontend ^&^& npm run dev
echo    - Backend: cd backend ^&^& venv\Scripts\activate.bat ^&^& uvicorn app:app --reload
echo.
echo 3. Open http://localhost:5173 in your browser
echo.
pause
