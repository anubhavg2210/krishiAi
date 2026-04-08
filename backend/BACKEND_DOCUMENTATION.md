# Kisan AI Sahayak - Backend Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Requirements & Dependencies](#requirements--dependencies)
3. [Installation & Setup](#installation--setup)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Current Implementation](#current-implementation)
7. [Project Structure](#project-structure)
8. [Error Handling](#error-handling)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The **Kisan AI Sahayak** backend is built with **FastAPI**, a modern, fast web framework for building APIs with Python. It provides:

- 🌾 Crop analysis and recommendations
- 🌤️ Real-time weather integration
- 🔍 Disease detection from crop images
- 🚜 Agricultural data processing
- 🌐 CORS-enabled for React frontend connectivity

**Architecture:**
- Framework: FastAPI
- Server: Uvicorn (ASGI server)
- Language: Python 3.8+
- Port: 8000 (default)

---

## Requirements & Dependencies

### File: `requirements.txt`

#### 1. **fastapi** ⚡
**Purpose:** Web framework for building APIs  
**Version:** Latest (typically 0.100+)  
**Used For:**
- Creating HTTP endpoints (@app.get, @app.post)
- Request/response validation
- Automatic API documentation (Swagger UI)
- Async/await support

**Example Usage:**
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/endpoint")
def read_data():
    return {"message": "Hello"}
```

---

#### 2. **uvicorn** 🚀
**Purpose:** ASGI web server (runs FastAPI)  
**Version:** Latest (typically 0.23+)  
**Used For:**
- Running the FastAPI application
- Hot-reloading during development
- Production-ready server

**How to Run:**
```bash
# Development with auto-reload
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Production (no reload)
uvicorn app:app --host 0.0.0.0 --port 8000
```

---

#### 3. **python-multipart** 📦
**Purpose:** Handle multipart/form-data (file uploads)  
**Version:** Latest  
**Used For:**
- Processing file uploads (images)
- Form data parsing
- UploadFile handling

**Example Usage in Code:**
```python
from fastapi import UploadFile, File

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    # Process uploaded image
    contents = await file.read()
    return {"filename": file.filename}
```

---

#### 4. **requests** 🔗
**Purpose:** HTTP library for making API calls  
**Version:** Latest (typically 2.31+)  
**Used For:**
- Fetching weather data from OpenWeatherMap API
- Making external API requests
- Handling HTTP responses

**Example Usage in Code:**
```python
import requests

API_KEY = "your_api_key"
url = f"https://api.openweathermap.org/data/2.5/weather?q=Bhopal&appid={API_KEY}"

response = requests.get(url)
data = response.json()
temperature = data["main"]["temp"]
```

---

#### 5. **python-dotenv** 🔐
**Purpose:** Load environment variables from `.env` file  
**Version:** Latest (typically 1.0+)  
**Used For:**
- Storing API keys securely
- Configuration management
- Preventing hardcoding of secrets

**How It Works:**
```python
from dotenv import load_dotenv
import os

load_dotenv()  # Load from .env file
API_KEY = os.getenv("API_KEY")
```

**Example `.env` file:**
```
API_KEY=sk_live_your_openweathermap_api_key_here
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
DATABASE_URL=sqlite:///./kisan_ai.db
```

---

## Installation & Setup

### Step 1: Prerequisites
Ensure you have **Python 3.8+** installed:
```bash
python --version
```

### Step 2: Create Virtual Environment
```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# MacOS/Linux:
source venv/bin/activate

# Verify activation (you should see (venv) in terminal)
```

### Step 3: Install Dependencies
```bash
# Install all packages from requirements.txt
pip install -r requirements.txt

# Verify installation
pip list
```

### Step 4: Create `.env` File
```bash
# Create .env in backend/ folder
# Add your OpenWeatherMap API key
# Get API key from: https://openweathermap.org/api
```

**`.env` Template:**
```
API_KEY=your_openweathermap_api_key_here
```

### Step 5: Run Backend Server
```bash
# Development mode (auto-reload)
uvicorn app:app --reload

# Server runs at: http://localhost:8000/
```

### Step 6: Verify Installation
Open in browser: `http://localhost:8000/docs` (Swagger UI)

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `API_KEY` | OpenWeatherMap API Key | `sk_live_abc123...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CORS_ORIGINS` | Allowed frontend URLs | `*` (allow all) |
| `DATABASE_URL` | Database connection string | `sqlite:///./kisan_ai.db` |
| `PORT` | Server port | `8000` |

### How to Set Environment Variables

**Method 1: Using `.env` file (Recommended)**
```
# Create backend/.env
API_KEY=your_key_here
```

**Method 2: Using terminal (temporary)**
```bash
# Windows (PowerShell)
$env:API_KEY = "your_key_here"

# MacOS/Linux
export API_KEY="your_key_here"
```

**Method 3: Using Python directly**
```python
import os
os.environ["API_KEY"] = "your_key_here"
```

---

## API Endpoints

### Base URL
```
http://localhost:8000
```

### 1. **GET `/`** - Health Check
**Description:** Verify backend is running  
**Method:** GET  
**Parameters:** None  

**Request:**
```bash
curl http://localhost:8000/
```

**Response:**
```json
{
  "message": "Backend Running 🚀"
}
```

---

### 2. **POST `/analyze`** - Analyze Disease & Get Recommendations
**Description:** Upload crop image and get disease detection + recommendations  
**Method:** POST  
**Parameters:** 
- `file` (required): Image file (JPG, PNG)

**Request (using curl):**
```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "accept: application/json" \
  -F "file=@/path/to/image.jpg"
```

**Request (using Python):**
```python
import requests

url = "http://localhost:8000/analyze"
with open("crop_image.jpg", "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)
    print(response.json())
```

**Response (Current):**
```json
{
  "disease": "Early Blight",
  "confidence": 0.87,
  "weather": "hot",
  "advice": "गर्मी ज्यादा है, सिंचाई बढ़ाएं और फसल को सूखने से बचाएं।"
}
```

**Weather Conditions & Advice:**
- `"hot"` (temp > 35°C): Increase irrigation, protect from drying
- `"cold"` (temp < 20°C): Protect crop, reduce irrigation
- `"normal"` (20-35°C): Regular maintenance

---

## Current Implementation

### File: `app.py`

#### Current Code Structure:
```python
1. Load environment variables (line 1-3)
2. Import FastAPI & dependencies (line 4-7)
3. Initialize FastAPI app (line 8)
4. Setup CORS middleware (line 10-15)
5. Define GET / endpoint (line 17-19)
6. Define get_weather() function (line 20-40)
7. Define POST /analyze endpoint (line 42-57)
```

#### Key Functions:

**`get_weather()`**
- Fetches current temperature for Bhopal
- Classifies weather as: "hot", "cold", or "normal"
- Has error handling (returns "normal" on failure)
- Called by `/analyze` endpoint

**`analyze()` - POST endpoint**
- Accepts image file upload
- Calls `get_weather()`
- Returns hardcoded disease prediction (mock)
- Provides Hindi advice based on weather

---

## Project Structure

```
backend/
├── app.py                      # Main FastAPI application
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables (create this)
├── BACKEND_DOCUMENTATION.md    # This file
└── models/                     # ML models (to be created)
    ├── disease_model.h5        # Disease detection model
    └── crop_recommendation.pkl # Crop suggestion model
```

---

## Error Handling

### Current Error Handling
```python
try:
    # API call
    res = requests.get(url)
    data = res.json()
except:
    return "normal"  # Fallback value
```

### Issues to Fix ⚠️
1. **Bare except clause** - Catches all errors (bad practice)
2. **No logging** - Errors are silently ignored
3. **No response validation** - Assumes API response structure

### Recommended Improvements:
```python
import logging

logger = logging.getLogger(__name__)

try:
    API_KEY = os.getenv("API_KEY")
    if not API_KEY:
        raise ValueError("API_KEY not set in environment")
    
    url = f"https://api.openweathermap.org/data/2.5/weather?q=Bhopal&appid={API_KEY}&units=metric"
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    
    data = response.json()
    temperature = data.get("main", {}).get("temp", 25)
    
except requests.exceptions.RequestException as e:
    logger.error(f"Weather API failed: {e}")
    return "normal"
except Exception as e:
    logger.error(f"Unexpected error: {e}")
    return "normal"
```

---

## Troubleshooting

### Issue 1: Port 8000 Already in Use
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

### Issue 2: API_KEY Not Found
**Error:** `KeyError: API_KEY` or returns None

**Solution:**
1. Verify `.env` file exists in `backend/` folder
2. Check API key format (should start with valid key)
3. Restart server after adding `.env`
4. Test: `python -c "from dotenv import load_dotenv; import os; load_dotenv(); print(os.getenv('API_KEY'))"`

---

### Issue 3: CORS Errors from Frontend
**Error:** `Access-Control-Allow-Origin` header missing

**Solution:**
The CORS middleware is already configured in `app.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)
```

For production, replace `["*"]` with specific URLs:
```python
allow_origins=[
    "http://localhost:5173",
    "https://yourfrontend.com"
]
```

---

### Issue 4: File Upload Not Working
**Error:** `multipart/form-data` parsing fails

**Solution:**
1. Ensure `python-multipart` is installed: `pip install python-multipart`
2. Restart server: `uvicorn app:app --reload`
3. Verify request sends file correctly (use form-data, not JSON)

---

### Issue 5: Weather API Returns Error
**Error:** OpenWeatherMap API returns 401 or 404

**Solution:**
1. Verify API key is valid at https://openweathermap.org/
2. Check API key has weather API permission
3. Verify API key is added to `.env` correctly
4. Check that Bhopal is correct city name

---

## Testing the Backend

### Using Swagger UI (Recommended)
1. Start server: `uvicorn app:app --reload`
2. Open: `http://localhost:8000/docs`
3. Click "Try it out" on any endpoint
4. Fill parameters and click "Execute"

### Using cURL
```bash
# Test GET /
curl http://localhost:8000/

# Test POST /analyze with image
curl -X POST "http://localhost:8000/analyze" \
  -F "file=@crop_image.jpg"
```

### Using Python
```python
import requests

# Test endpoints
backend_url = "http://localhost:8000"

# Test home
response = requests.get(f"{backend_url}/")
print(response.json())

# Test analyze
with open("crop_image.jpg", "rb") as f:
    files = {"file": f}
    response = requests.post(f"{backend_url}/analyze", files=files)
    print(response.json())
```

---

## Next Steps to Complete Backend

### 1. Implement Real Disease Detection
```python
# Load ML model and predict
import tensorflow as tf

model = tf.keras.models.load_model("models/disease_model.h5")
prediction = model.predict(image_array)
disease_name = get_disease_label(prediction)
```

### 2. Add Crop Recommendation Logic
```python
@app.post("/recommendations")
async def recommend_crops(soil_data: SoilInput):
    # Analyze soil (N, P, K, pH)
    # Get weather conditions
    # Return top 3-5 crop recommendations
    pass
```

### 3. Integrate Mandi Prices API
```python
@app.get("/mandi/{crop}")
async def get_mandi_prices(crop: str):
    # Fetch current prices
    # Return by district
    pass
```

### 4. Add Database Support
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./kisan_ai.db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
```

---

## Deployment Checklist

- [ ] Remove `--reload` flag (use in production)
- [ ] Replace `allow_origins=["*"]` with specific domains
- [ ] Set environment variables securely
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set up logging and monitoring
- [ ] Enable HTTPS/SSL
- [ ] Configure error tracking (Sentry)
- [ ] Set up CI/CD pipeline

---

## Useful Commands

```bash
# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # MacOS/Linux

# Install requirements
pip install -r requirements.txt

# Run server with reload
uvicorn app:app --reload

# Run server on custom port
uvicorn app:app --port 8001

# Freeze current dependencies
pip freeze > requirements.txt

# Deactivate virtual environment
deactivate
```

---

## Support & Resources

- **FastAPI Docs:** https://fastapi.tiangolo.com/
- **Uvicorn Docs:** https://www.uvicorn.org/
- **OpenWeatherMap API:** https://openweathermap.org/api
- **Python Requests:** https://requests.readthedocs.io/

---

**Last Updated:** 2026-04-07  
**Backend Version:** 1.0.0  
**Python Version:** 3.8+
