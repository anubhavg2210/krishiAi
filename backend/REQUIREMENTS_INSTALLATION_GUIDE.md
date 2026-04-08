# Installation & Download Guide - Backend Requirements

**Project:** Kisan AI Sahayak Backend  
**Date:** April 7, 2026  
**Python Version Required:** 3.8 or higher

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [System Requirements](#system-requirements)
3. [Installation Methods](#installation-methods)
4. [Package Details & Usage](#package-details--usage)
5. [Verification Steps](#verification-steps)
6. [Troubleshooting](#troubleshooting)
7. [Updating Packages](#updating-packages)

---

## 🚀 Quick Start

### One-Command Installation (Recommended)
```bash
# Navigate to backend folder
cd backend

# Install all requirements at once
pip install -r requirements.txt
```

✅ **Done!** All 5 packages will be installed automatically.

---

## 💻 System Requirements

### Prerequisites
Before installing packages, ensure you have:

#### 1. **Python 3.8+**
**Check if installed:**
```bash
python --version
```

**Expected output:**
```
Python 3.8.0
Python 3.9.0
Python 3.10.0
Python 3.11.0
Python 3.12.0
(any version 3.8 or higher)
```

**If not installed:**
- **Windows:** Download from https://www.python.org/downloads/
- **MacOS:** `brew install python3`
- **Linux:** `sudo apt-get install python3 python3-pip`

#### 2. **pip (Python Package Manager)**
Usually comes with Python. Check:
```bash
pip --version
```

**If missing:**
```bash
# Windows
python -m ensurepip --upgrade

# MacOS/Linux
sudo apt-get install python3-pip
```

---

## 🔧 Installation Methods

### Method 1: Using requirements.txt (RECOMMENDED)
**Best for:** Projects with dependencies listed

**Steps:**
```bash
# 1. Navigate to backend folder
cd backend

# 2. Create virtual environment (optional but recommended)
python -m venv venv

# 3. Activate virtual environment
# Windows:
venv\Scripts\activate

# MacOS/Linux:
source venv/bin/activate

# 4. Install all packages
pip install -r requirements.txt

# 5. Verify installation
pip list
```

**Output example:**
```
Package              Version
---------------------- -----------
fastapi              0.104.1
uvicorn              0.24.0
python-multipart     0.0.6
requests             2.31.0
python-dotenv        1.0.0
```

---

### Method 2: Install Packages Individually
**Best for:** Understanding each package installation

**Step-by-step:**

```bash
# 1. Activate virtual environment first
venv\Scripts\activate  # Windows
source venv/bin/activate  # MacOS/Linux

# 2. Install each package
pip install fastapi
pip install uvicorn
pip install python-multipart
pip install requests
pip install python-dotenv

# 3. Verify all installed
pip list
```

---

### Method 3: Using pip without Virtual Environment
**Not recommended** - Can conflict with system packages

```bash
# Direct installation (not recommended)
pip install fastapi uvicorn python-multipart requests python-dotenv
```

⚠️ **Warning:** This can affect other Python projects. Use virtual environment.

---

## 📦 Package Details & Usage

### 1. **fastapi** - Web Framework
**Purpose:** Build the REST API for crop analysis

**Download & Install:**
```bash
pip install fastapi
```

**Version:** Latest (0.104+)

**What it does:**
- Creates HTTP endpoints
- Automatic API documentation (Swagger UI)
- Request/response validation
- Async/await support

**Usage Example:**
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to Kisan AI"}
```

**Official Site:** https://fastapi.tiangolo.com/

---

### 2. **uvicorn** - ASGI Server
**Purpose:** Runs the FastAPI application

**Download & Install:**
```bash
pip install uvicorn
```

**Version:** Latest (0.24+)

**What it does:**
- Runs FastAPI server
- Auto-reload during development
- Production-ready server

**How to use:**
```bash
# Development mode (auto-reload)
uvicorn app:app --reload

# Production mode
uvicorn app:app --host 0.0.0.0 --port 8000
```

**Official Site:** https://www.uvicorn.org/

---

### 3. **python-multipart** - File Upload Handler
**Purpose:** Process image file uploads from frontend

**Download & Install:**
```bash
pip install python-multipart
```

**Version:** Latest (0.0.6+)

**What it does:**
- Handles multipart/form-data requests
- Processes file uploads
- Parses form fields

**Usage Example:**
```python
from fastapi import UploadFile, File

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    return {"filename": file.filename, "size": len(contents)}
```

**Official Site:** https://github.com/andrew-d/python-multipart

---

### 4. **requests** - HTTP Library
**Purpose:** Make API calls to OpenWeatherMap API

**Download & Install:**
```bash
pip install requests
```

**Version:** Latest (2.31+)

**What it does:**
- Fetch data from external APIs
- Handle HTTP requests/responses
- Send GET, POST, PUT, DELETE requests

**Usage Example:**
```python
import requests

# Get weather from OpenWeatherMap API
API_KEY = "your_api_key"
url = f"https://api.openweathermap.org/data/2.5/weather?q=Bhopal&appid={API_KEY}"

response = requests.get(url)
data = response.json()
temperature = data["main"]["temp"]
```

**Official Site:** https://requests.readthedocs.io/

---

### 5. **python-dotenv** - Environment Variables
**Purpose:** Load API keys securely from `.env` file

**Download & Install:**
```bash
pip install python-dotenv
```

**Version:** Latest (1.0+)

**What it does:**
- Load environment variables from `.env` file
- Protect API keys from hardcoding
- Configuration management

**Usage Example:**
```python
from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

# Access variables
API_KEY = os.getenv("API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")
```

**Create `.env` file:**
```env
API_KEY=sk_live_your_openweathermap_key
CORS_ORIGINS=http://localhost:5173
DATABASE_URL=sqlite:///./kisan_ai.db
```

**Official Site:** https://github.com/theskumar/python-dotenv

---

## ✅ Verification Steps

### Step 1: Check Installation
```bash
# Verify virtual environment is active
# (look for (venv) at start of terminal line)

# List all installed packages
pip list
```

**Expected output:**
```
Package              Version
---------------------- -----------
fastapi              0.104.1
uvicorn              0.24.0
python-multipart     0.0.6
requests             2.31.0
python-dotenv        1.0.0
```

### Step 2: Test Individual Packages
```bash
# Test fastapi
python -c "import fastapi; print(fastapi.__version__)"

# Test uvicorn
python -c "import uvicorn; print(uvicorn.__version__)"

# Test python-multipart
python -c "import multipart; print('python-multipart installed')"

# Test requests
python -c "import requests; print(requests.__version__)"

# Test python-dotenv
python -c "from dotenv import load_dotenv; print('python-dotenv installed')"
```

**Expected:** Each should print version or success message

### Step 3: Test Backend Server
```bash
# Navigate to project directory
cd backend

# Start server
uvicorn app:app --reload

# Expected output:
# INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Open browser: `http://localhost:8000/`  
Should see: `{"message": "Backend Running 🚀"}`

---

## 🐛 Troubleshooting

### Issue 1: "pip: command not found"
**Error:** `command not found: pip`

**Solution:**
```bash
# Windows
python -m pip install -r requirements.txt

# MacOS/Linux
python3 -m pip install -r requirements.txt
```

---

### Issue 2: "No module named 'fastapi'"
**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
# 1. Check virtual environment is active
# Should see (venv) at start of terminal

# 2. Reinstall package
pip install --upgrade fastapi

# 3. Restart Python/IDE
```

---

### Issue 3: "ModuleNotFoundError: No module named 'dotenv'"
**Error:** When running app.py

**Solution:**
```bash
# Make sure python-dotenv is installed
pip install python-dotenv

# Restart your application
```

---

### Issue 4: ".env file not found"
**Error:** API_KEY returns None

**Solution:**
```bash
# 1. Create .env file in backend/ folder
touch .env  # MacOS/Linux
# or create manually in Windows

# 2. Add your API key
echo API_KEY=your_key_here >> .env

# 3. Verify file exists
ls -la .env  # MacOS/Linux
dir .env    # Windows

# 4. Restart server
```

---

### Issue 5: "All requirements already satisfied"
**When running:** `pip install -r requirements.txt`

**This is OK!** Means all packages are already installed.

**To upgrade packages:**
```bash
pip install --upgrade -r requirements.txt
```

---

### Issue 6: Port 8000 Already in Use
**Error:** `Address already in use`

**Solution:**
```bash
# Use different port
uvicorn app:app --reload --port 8001

# Or kill process using port 8000
# Windows (PowerShell):
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# MacOS/Linux:
lsof -i :8000
kill -9 <PID>
```

---

## 🔄 Updating Packages

### Check for Outdated Packages
```bash
pip list --outdated
```

**Example output:**
```
Package          Current  Latest  Type
fastapi          0.100.0  0.104.1 wheel
requests         2.30.0   2.31.0  wheel
```

### Update All Packages
```bash
# Update all packages
pip install --upgrade -r requirements.txt

# Or update specific package
pip install --upgrade fastapi
pip install --upgrade uvicorn
```

### Pin Specific Versions
If you want fixed versions, update `requirements.txt`:
```
fastapi==0.104.1
uvicorn==0.24.0
python-multipart==0.0.6
requests==2.31.0
python-dotenv==1.0.0
```

Then install:
```bash
pip install -r requirements.txt
```

---

## 📊 Summary Table

| Package | Purpose | Version | Download Size |
|---------|---------|---------|----------------|
| **fastapi** | Web Framework | 0.104+ | ~5 MB |
| **uvicorn** | ASGI Server | 0.24+ | ~2 MB |
| **python-multipart** | File Upload | 0.0.6+ | ~0.5 MB |
| **requests** | HTTP Requests | 2.31+ | ~4 MB |
| **python-dotenv** | Env Variables | 1.0+ | ~1 MB |
| **TOTAL** | All packages | Latest | ~13 MB |

---

## 📝 Complete Setup Checklist

- [ ] Python 3.8+ installed
- [ ] pip installed and updated
- [ ] Virtual environment created
- [ ] Virtual environment activated
- [ ] `pip install -r requirements.txt` executed
- [ ] Verification: `pip list` shows all 5 packages
- [ ] `.env` file created with API_KEY
- [ ] Server starts: `uvicorn app:app --reload`
- [ ] Health check passes: `http://localhost:8000/`

---

## 🆘 Quick Help

### Everything Installed? Start Server:
```bash
cd backend
venv\Scripts\activate  # Windows
uvicorn app:app --reload
```

### Something Broke? Reinstall Everything:
```bash
pip uninstall -r requirements.txt -y
pip install -r requirements.txt
```

### Need Older Python Version?
```bash
pip install fastapi==0.95.0
pip install uvicorn==0.21.0
```

---

## 📚 Official Documentation
- **FastAPI:** https://fastapi.tiangolo.com/
- **Uvicorn:** https://www.uvicorn.org/
- **Requests:** https://requests.readthedocs.io/
- **Python-dotenv:** https://github.com/theskumar/python-dotenv
- **PyPI (Package Index):** https://pypi.org/

---

## 📞 Support Commands

```bash
# Get help for pip
pip help

# Get package info
pip show fastapi

# Search for package
pip search fastapi

# Generate requirements.txt from current installs
pip freeze > requirements.txt

# Check for security issues
pip check
```

---

**Last Updated:** April 7, 2026  
**Status:** ✅ Complete
