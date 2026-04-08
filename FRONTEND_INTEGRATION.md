# Kisan AI Sahayak - Frontend API Integration Guide

## 📌 Overview
This guide shows how to connect your React frontend to the FastAPI backend.

**Frontend URL:** `http://localhost:5173`  
**Backend URL:** `http://localhost:8000`

---

## 🔧 Setup Steps

### Step 1: Create API Service File
**File:** `src/lib/apiService.js`

```javascript
/**
 * API Service for Kisan AI Sahayak
 * Handles all communication with FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Health check - Verify backend is running
 * @returns {Promise<Object>} Health status
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
    });
    
    if (!response.ok) throw new Error("Backend not responding");
    
    return await response.json();
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};

/**
 * Analyze crop image for disease detection
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Object>} Analysis results (disease, confidence, weather, advice)
 */
export const analyzeImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error("Image file is required");
  }
  
  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(imageFile.type)) {
    throw new Error("Only JPG and PNG images are allowed");
  }
  
  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (imageFile.size > maxSize) {
    throw new Error("File size must be less than 10MB");
  }
  
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it automatically
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Analysis failed");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Image analysis failed:", error);
    throw error;
  }
};

/**
 * Get weather for a specific district
 * (To be implemented in backend)
 * @param {string} district - District name
 * @returns {Promise<Object>} Weather data
 */
export const getWeather = async (district) => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/${district}`, {
      method: "GET",
    });
    
    if (!response.ok) throw new Error("Failed to fetch weather");
    
    return await response.json();
  } catch (error) {
    console.error("Weather fetch failed:", error);
    throw error;
  }
};

/**
 * Get crop recommendations based on soil data
 * (To be implemented in backend)
 * @param {Object} soilData - {nitrogen, phosphorus, potassium, ph}
 * @returns {Promise<Array>} List of recommended crops
 */
export const getCropRecommendations = async (soilData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(soilData),
    });
    
    if (!response.ok) throw new Error("Failed to get recommendations");
    
    return await response.json();
  } catch (error) {
    console.error("Recommendations fetch failed:", error);
    throw error;
  }
};

/**
 * Get disease treatment information
 * (To be implemented in backend)
 * @param {string} disease - Disease name
 * @param {string} crop - Crop name
 * @returns {Promise<Object>} Treatment information
 */
export const getDiseaseTreatment = async (disease, crop) => {
  try {
    const response = await fetch(`${API_BASE_URL}/disease-treatment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ disease, crop }),
    });
    
    if (!response.ok) throw new Error("Failed to get treatment info");
    
    return await response.json();
  } catch (error) {
    console.error("Treatment info fetch failed:", error);
    throw error;
  }
};
```

---

### Step 2: Configure Environment Variables
**File:** `.env.local` (or `.env`)

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Other configs
VITE_APP_NAME=Kisan AI Sahayak
```

---

### Step 3: Use API Service in Components

#### Example 1: Disease Detection Page
**File:** `src/pages/DiseasePage.jsx`

```javascript
import { useState, useRef } from "react";
import { analyzeImage } from "../lib/apiService";
import { Loader2, Upload } from "lucide-react";

export default function DiseasePage() {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result);
    };
    reader.readAsDataURL(file);
    
    // Clear previous results
    setResult(null);
    setError(null);
  };

  // Handle image analysis
  const handleAnalyze = async () => {
    if (!imageFile) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeImage(imageFile);
      setResult(data);
    } catch (error) {
      setError(error.message || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔍 Disease Detection</h1>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-green-400 rounded-lg p-8 text-center cursor-pointer hover:bg-green-50"
        >
          <Upload size={32} className="mx-auto mb-2 text-green-500" />
          <p className="text-gray-600">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500">PNG or JPG (Max 10MB)</p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-6">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-80 object-contain rounded-lg"
          />
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={!imageFile || loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={20} />
            Analyzing...
          </span>
        ) : (
          "Analyze Disease"
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600 text-sm">Disease</p>
              <p className="text-xl font-semibold">{result.disease}</p>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm">Confidence</p>
              <p className="text-xl font-semibold">
                {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm">Weather</p>
              <p className="text-xl font-semibold capitalize">{result.weather}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-sm mb-2">Advice</p>
            <p className="text-lg bg-white p-3 rounded border border-green-200">
              {result.advice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

#### Example 2: Crop Suggestion Form
**File:** `src/pages/CropSuggestForm.jsx` (Updated)

```javascript
import { useState } from "react";
import { getCropRecommendations } from "../lib/apiService";
import { Loader2 } from "lucide-react";

export default function CropSuggestForm() {
  const [soilData, setSoilData] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    ph: 6.5,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSliderChange = (field, value) => {
    setSoilData(prev => ({
      ...prev,
      [field]: parseFloat(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const recommendations = await getCropRecommendations(soilData);
      setResults(recommendations);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        
        {/* Nitrogen Slider */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Nitrogen (N): {soilData.nitrogen}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={soilData.nitrogen}
            onChange={(e) => handleSliderChange("nitrogen", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Phosphorus Slider */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Phosphorus (P): {soilData.phosphorus}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={soilData.phosphorus}
            onChange={(e) => handleSliderChange("phosphorus", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Potassium Slider */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Potassium (K): {soilData.potassium}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={soilData.potassium}
            onChange={(e) => handleSliderChange("potassium", e.target.value)}
            className="w-full"
          />
        </div>

        {/* pH Slider */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            pH Level: {soilData.ph.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="14"
            step="0.1"
            value={soilData.ph}
            onChange={(e) => handleSliderChange("ph", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Analyzing...
            </span>
          ) : (
            "Get Recommendations"
          )}
        </button>
      </form>

      {/* Results */}
      {results && (
        <div className="mt-6 bg-green-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recommended Crops</h2>
          {/* Display results from API */}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
```

---

### Step 4: Update AppContext for API Data
**File:** `src/context/AppContext.jsx`

```javascript
import { createContext, useContext, useState, useCallback } from "react";
import { checkBackendHealth } from "../lib/apiService";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [soilData, setSoilData] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    ph: 6.5,
  });

  // Check backend health on mount
  const initializeBackend = useCallback(async () => {
    try {
      await checkBackendHealth();
      setBackendStatus("connected");
    } catch (error) {
      console.error("Backend connection failed:", error);
      setBackendStatus("disconnected");
    }
  }, []);

  const value = {
    backendStatus,
    analysisResult,
    setAnalysisResult,
    recommendations,
    setRecommendations,
    soilData,
    setSoilData,
    initializeBackend,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}
```

---

### Step 5: Update App.jsx to Initialize Backend
**File:** `src/App.jsx` (Updated)

```javascript
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingVoiceAssistant from "./components/FloatingVoiceAssistant";
import LandingPage from "./pages/LandingPage";
import CropSuggestForm from "./pages/CropSuggestForm";
import ResultsPage from "./pages/ResultsPage";
import WeatherPage from "./pages/WeatherPage";
import DiseasePage from "./pages/DiseasePage";

function App() {
  const { backendStatus, initializeBackend } = useAppContext();

  useEffect(() => {
    initializeBackend();
  }, [initializeBackend]);

  return (
    <div className="min-h-screen flex flex-col w-full relative bg-[#f9fbf9] overflow-hidden z-0">
      
      {/* Backend Status Indicator */}
      {backendStatus === "disconnected" && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          ⚠️ Backend server is not running. Start it with: `uvicorn app:app --reload`
        </div>
      )}

      {/* Modern Gradient Blobs Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-400/20 blur-[140px]"></div>
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-yellow-300/10 blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-green-200/20 blur-[140px]"></div>
        <div className="absolute bottom-[-15%] right-[10%] w-[50%] h-[30%] rounded-full bg-green-400/15 blur-[150px]"></div>
      </div>

      <Navbar />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-32 max-w-[1600px] relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/suggest" element={<CropSuggestForm />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/disease" element={<DiseasePage />} />
        </Routes>
      </main>

      <FloatingVoiceAssistant />
      <Footer />
    </div>
  );
}

export default App;
```

---

## 🚀 Testing Integration

### Test Backend Connection
```bash
# Terminal 1: Start Backend
cd backend
uvicorn app:app --reload

# Terminal 2: Start Frontend
npm run dev

# Terminal 3: Test API
curl http://localhost:8000/
# Should return: {"message": "Backend Running 🚀"}
```

### Test in Browser Console
```javascript
// Open DevTools Console (F12) on http://localhost:5173

import { analyzeImage } from "./lib/apiService" // Import if using module

// Test health check
fetch("http://localhost:8000/")
  .then(r => r.json())
  .then(data => console.log(data))
```

---

## 📊 Error Handling Patterns

### Network Error Handling
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  if (error instanceof TypeError) {
    // Network error (backend not running)
    console.error("Backend not reachable");
  } else {
    // API error
    console.error("API Error:", error.message);
  }
  throw error;
}
```

### File Validation
```javascript
const validateImage = (file) => {
  const errors = [];
  
  const validTypes = ["image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    errors.push("Only JPG and PNG images allowed");
  }
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    errors.push("File size must be less than 10MB");
  }
  
  return errors;
};
```

---

## 🔗 API Endpoints Checklist

- [x] GET `/` - Health check
- [x] POST `/analyze` - Disease detection
- [ ] GET `/weather/{district}` - Weather data
- [ ] POST `/recommendations` - Crop suggestions
- [ ] POST `/disease-treatment` - Treatment info
- [ ] GET `/mandi/{crop}` - Mandi prices

*Mark endpoints as implemented in backend*

---

## 📱 Production Deployment

### Before Deploying

1. **Update API URL**
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```

2. **Update CORS in Backend**
   ```python
   allow_origins=[
       "https://yourdomain.com",
       "https://www.yourdomain.com"
   ]
   ```

3. **Build Frontend**
   ```bash
   npm run build
   ```

4. **Test Production Build**
   ```bash
   npm run preview
   ```

---

## 🆘 Common Issues

### CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Ensure backend CORS is configured correctly

### Backend Not Running
**Error:** `Failed to fetch`

**Solution:** Start backend: `uvicorn app:app --reload`

### Wrong API URL
**Error:** 404 errors from frontend

**Solution:** Check `.env.local` has correct `VITE_API_URL`

---

**Version:** 1.0.0  
**Last Updated:** 2026-04-07
