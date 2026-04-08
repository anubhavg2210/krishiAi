# Kisan AI Sahayak - API Reference Documentation

**Backend URL:** `http://localhost:8000`  
**API Version:** 1.0.0  
**Last Updated:** 2026-04-07

---

## 📌 Quick Start

### Access API Documentation UI
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

### Test API Endpoints
```bash
# Health check
curl http://localhost:8000/

# Analyze with image
curl -X POST "http://localhost:8000/analyze" \
  -H "accept: application/json" \
  -F "file=@image.jpg"
```

---

## 🔌 API Endpoints

### 1. Health Check
**Endpoint:** `GET /`

**Purpose:** Verify backend is running

**Request:**
```bash
curl -X GET "http://localhost:8000/"
```

**Parameters:** None

**Response:** `200 OK`
```json
{
  "message": "Backend Running 🚀"
}
```

**Use Case:** Frontend startup check, monitoring, health probes

---

### 2. Crop Disease Analysis
**Endpoint:** `POST /analyze`

**Purpose:** Upload crop image → Get disease detection + weather-based recommendations

**Request:**
```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "accept: application/json" \
  -F "file=@crop_leaf_image.jpg"
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | File (FormData) | Yes | Crop/leaf image (JPG, PNG) |

**File Requirements:**
- **Format:** JPG, PNG
- **Max Size:** 10MB (recommended < 5MB)
- **Min Resolution:** 224x224 pixels
- **Quality:** Clear, well-lit image of diseased leaf

**Response:** `200 OK`
```json
{
  "disease": "Early Blight",
  "confidence": 0.87,
  "weather": "hot",
  "advice": "गर्मी ज्यादा है, सिंचाई बढ़ाएं और फसल को सूखने से बचाएं।"
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `disease` | string | Detected plant disease name |
| `confidence` | float (0-1) | Prediction certainty (0.87 = 87%) |
| `weather` | string | Current weather: "hot", "cold", "normal" |
| `advice` | string | Hindi text advice based on weather |

**Weather-Based Advice:**
```
Weather: "hot" (temp > 35°C)
Advice: "गर्मी ज्यादा है, सिंचाई बढ़ाएं और फसल को सूखने से बचाएं।"
Translation: Increase irrigation, protect from drying

Weather: "cold" (temp < 20°C)
Advice: "ठंड अधिक है, फसल को सुरक्षित रखें और सिंचाई कम करें।"
Translation: Protect crop, reduce irrigation

Weather: "normal" (20-35°C)
Advice: "मौसम सामान्य है, नियमित देखभाल करें।"
Translation: Regular maintenance
```

**Error Responses:**

- **400 Bad Request** - Invalid file format
```json
{
  "detail": "Invalid file type. Only JPG and PNG allowed."
}
```

- **413 Payload Too Large** - File size exceeds limit
```json
{
  "detail": "File size exceeds 10MB limit"
}
```

- **500 Internal Server Error** - Processing error
```json
{
  "detail": "Error processing image. Please try again."
}
```

**Python Example:**
```python
import requests

url = "http://localhost:8000/analyze"

# Upload image
with open("crop_image.jpg", "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)
    
    if response.status_code == 200:
        data = response.json()
        print(f"Disease: {data['disease']}")
        print(f"Confidence: {data['confidence']*100:.1f}%")
        print(f"Advice: {data['advice']}")
    else:
        print(f"Error: {response.status_code}")
```

**JavaScript/React Example:**
```javascript
const analyzeImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  
  try {
    const response = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      body: formData
    });
    
    const data = await response.json();
    console.log("Disease:", data.disease);
    console.log("Confidence:", data.confidence);
    console.log("Advice:", data.advice);
    
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## 📊 Response Data Types

### Weather Types
```python
weather: str  # "hot" | "cold" | "normal"
```

### Disease Confidence
```python
confidence: float  # Range: 0.0 to 1.0 (0% to 100%)
```

### Temperature Ranges
```python
Temperature > 35°C  → "hot"
Temperature 20-35°C → "normal"
Temperature < 20°C  → "cold"
```

---

## 🔐 CORS Configuration

**Current Settings:**
```python
allow_origins: "*"          # Allow all origins
allow_methods: ["*"]        # Allow all HTTP methods
allow_headers: ["*"]        # Allow all headers
allow_credentials: True
```

**For Production** (restrict to frontend URL):
```python
allow_origins: [
    "http://localhost:5173",
    "https://yourdomain.com"
]
```

---

## 📝 Request/Response Examples

### Example 1: Successful Analysis
**Request:**
```
POST /analyze HTTP/1.1
Host: localhost:8000
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

----WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="tomato_leaf.jpg"
Content-Type: image/jpeg

[binary image data]
----WebKitFormBoundary--
```

**Response:**
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "disease": "Early Blight",
  "confidence": 0.92,
  "weather": "hot",
  "advice": "गर्मी ज्यादा है, सिंचाई बढ़ाएं और फसल को सूखने से बचाएं।"
}
```

---

### Example 2: File Upload Error
**Request:**
```
POST /analyze HTTP/1.1
Host: localhost:8000
Content-Type: multipart/form-data

[text file instead of image]
```

**Response:**
```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "detail": "Invalid file type. Only JPG and PNG allowed."
}
```

---

## 🛠️ Integration Guide

### Frontend Integration Steps

**1. Create API Service (React)**
```javascript
// lib/apiService.js
export const analyzeImage = async (imageFile) => {
  const url = `${import.meta.env.VITE_API_URL}/analyze`;
  
  const formData = new FormData();
  formData.append("file", imageFile);
  
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json"
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};
```

**2. Use in Component**
```javascript
// pages/DiseasePage.jsx
import { analyzeImage } from "../lib/apiService";

function DiseasePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload}
      />
      
      {loading && <p>Analyzing...</p>}
      
      {result && (
        <div>
          <p>Disease: {result.disease}</p>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          <p>Weather: {result.weather}</p>
          <p>Advice: {result.advice}</p>
        </div>
      )}
    </div>
  );
}
```

**3. Environment Variables (.env.local)**
```
VITE_API_URL=http://localhost:8000
```

---

## ⚙️ API Configuration

### Headers
All responses include:
```
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

### Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (invalid file) |
| 413 | Payload Too Large |
| 500 | Server Error |

---

## 🔄 Future Endpoints (Planned)

### POST `/recommendations`
Get crop recommendations based on soil data
```json
{
  "district": "Indore",
  "nitrogen": 45,
  "phosphorus": 35,
  "potassium": 40,
  "ph": 6.8
}
```

### GET `/weather/{district}`
Get weather data for specific district
```
GET /weather/Indore
```

### GET `/mandi/{crop}`
Get current mandi prices
```
GET /mandi/wheat
```

### POST `/disease-treatment`
Get treatment recommendations
```json
{
  "disease": "Early Blight",
  "crop": "tomato"
}
```

---

## 📞 Troubleshooting

### API Returns 500 Error
**Cause:** API_KEY not set or OpenWeatherMap API failure
**Solution:**
```bash
# Check .env file
echo %API_KEY%  # Windows
echo $API_KEY   # MacOS/Linux

# Restart server after updating .env
uvicorn app:app --reload
```

### File Upload Returns 400
**Cause:** Invalid file format or missing Content-Type
**Solution:**
```javascript
// Ensure FormData is used
const formData = new FormData();
formData.append("file", file);  // file must be a File object

// Do NOT set Content-Type header
// Browser will set it automatically with correct boundary
```

### CORS Error in Browser
**Cause:** Frontend and backend on different origins
**Solution:** Already configured with `allow_origins=["*"]`  
For production, whitelist specific domains in `app.py`

---

## 📚 Additional Resources

- **Full Backend Docs:** See `BACKEND_DOCUMENTATION.md`
- **Implementation Guide:** See `IMPLEMENTATION_GUIDE.md`
- **Live API Docs:** `http://localhost:8000/docs`
- **OpenWeatherMap:** https://openweathermap.org/api

---

**Version:** 1.0.0  
**Last Updated:** 2026-04-07  
**Status:** 🟢 Production Ready
