# Kisan AI Sahayak — Backend Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Requirements](#requirements)
4. [Setup & Installation](#setup--installation)
5. [Environment Variables](#environment-variables)
6. [Running the Backend](#running-the-backend)
7. [API Reference](#api-reference)
8. [Implementation Notes](#implementation-notes)
9. [Project Structure](#project-structure)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The backend for **Kisan AI Sahayak** is a FastAPI application that powers crop disease analysis, weather-aware recommendations, crop timeline generation, and farm dashboard data.

Key backend capabilities:
- Plant image analysis with pretrained MobileNetV2
- Weather status lookup via OpenWeatherMap
- Smart timeline and alert generation
- Demo dashboard and crop recommendation endpoints
- CORS support for the React frontend

Primary files:
- `app.py` — FastAPI application and routes
- `weather_engine.py` — timeline and alert generation logic
- `services/plant_check.py` — plant image validation helper
- `requirements.txt` — Python dependency list

---

## Quick Start

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Then open the backend documentation UI:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## Requirements

**Python:** 3.8 or higher

**Backend dependencies:**
- `fastapi`
- `uvicorn`
- `python-multipart`
- `requests`
- `python-dotenv`
- `Pillow`
- `numpy`
- `tensorflow`

These are listed in `backend/requirements.txt`.

---

## Setup & Installation

### 1. Create a virtual environment

```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Create `.env`

Create `backend/.env` with:

```env
API_KEY=your_openweathermap_api_key_here
```

### 4. Run the backend server

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The backend should now be available at `http://localhost:8000`.

---

## Environment Variables

### Required

| Variable | Description |
| --- | --- |
| `API_KEY` | OpenWeatherMap API key for weather lookup |

### Optional

| Variable | Description | Default |
| --- | --- | --- |
| `CORS_ORIGINS` | Allowed frontend origins | `*` |
| `DATABASE_URL` | Database connection string | `sqlite:///./kisan_ai.db` |
| `PORT` | Backend port | `8000` |

### Example `.env`

```env
API_KEY=your_openweathermap_api_key_here
```

---

## Running the Backend

### Development mode

```bash
uvicorn app:app --reload
```

### Production example

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

### Verify

Open `http://localhost:8000/docs`.

---

## API Reference

### Base URL

`http://localhost:8000`

### 1. Health Check

- **Endpoint:** `GET /`
- **Description:** Confirms the backend is running.
- **Response:**

```json
{
  "message": "Backend Running"
}
```

### 2. Crop Disease Analysis

- **Endpoint:** `POST /analyze`
- **Description:** Upload a plant image to get disease prediction, weather status, and treatment advice.
- **Request:** Multipart form-data with `file`.

```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "accept: application/json" \
  -F "file=@crop_leaf_image.jpg"
```

- **Response:**

```json
{
  "disease": "Early Blight",
  "confidence": 0.78,
  "weather": "hot",
  "weatherNote": "Mausam garam hai, isliye irrigation aur leaf stress monitoring badhao.",
  "crop": "General Crop",
  "symptoms": [
    "Patton par gol bhure daag dikhte hain.",
    "Daagon ke aas-paas peela hissa ban sakta hai.",
    "Neeche ke purane patte pehle affect hote hain."
  ],
  "treatment": [
    "Zyada infected patte turant hata do.",
    "Copper based ya chlorothalonil fungicide label ke hisaab se spray karo.",
    "Paudhon ke beech hawa chalne do, overwatering mat karo."
  ],
  "prevention": [
    "Patton par seedha paani dene se bacho.",
    "Crop rotation rakho, same field me baar-baar same crop mat lagao.",
    "Subah irrigation karo taaki patte jaldi sukh jayein."
  ],
  "advice": "Zyada infected patte turant hata do. Copper based ya chlorothalonil fungicide label ke hisaab se spray karo. Paudhon ke beech hawa chalne do, overwatering mat karo.",
  "diagnosisMode": "AI-assisted mock",
  "note": "Prediction based on visual features using pretrained model (demo version)"
}
```

- **Errors:**
  - `400` invalid or non-plant image
  - `413` payload too large
  - `500` processing error

### 3. Smart Timeline

- **Endpoint:** `POST /smart-timeline`
- **Description:** Generates a daily crop timeline and alerts based on weather, stage, and optional soil data.
- **Request body:** JSON

```json
{
  "stage": "vegetative",
  "weather_data": [
    {
      "day": "Monday",
      "weather": "Sunny",
      "temperature": 32,
      "humidity": 65,
      "rain_probability": 10
    }
  ],
  "soil": {
    "moisture": 50,
    "nitrogen": "normal"
  }
}
```

- **Response:**

```json
{
  "timeline": [
    {
      "day": "Monday",
      "weather": "Sunny",
      "risk": "Low",
      "action": "Apply fertilizer"
    }
  ],
  "alerts": []
}
```

### 4. Full Analysis

- **Endpoint:** `POST /full-analysis`
- **Description:** Runs disease analysis and timeline generation together.
- **Form fields:** `file` and `stage`
- **Response:** Contains `disease_analysis`, `timeline`, and `alerts`.

### 5. Dashboard Data

- **Endpoint:** `GET /dashboard`
- **Description:** Returns demo dashboard metrics used by frontend components.
- **Response:** Sample farm health, moisture, NPK, water usage, alerts, and chart data.

### 6. Crop Recommendation

- **Endpoint:** `POST /crop-recommendation`
- **Description:** Recommends crop options from NPK/temperature/humidity/rainfall inputs.
- **Request body:**

```json
{
  "npk": "Balanced",
  "temp": 28,
  "humidity": 70,
  "rainfall": 90
}
```

- **Response:** Recommended crops and suitability score.

### 7. Alerts

- **Endpoint:** `GET /alerts`
- **Description:** Returns current weather and disease warning alerts.
- **Response:** Array of alert objects.

---

## Implementation Notes

### Main backend flow

- `app.py` handles route definitions and request processing.
- A MobileNetV2 model from `tensorflow.keras.applications` is used for image label prediction.
- Plant-image validation is performed before disease analysis.
- Weather is fetched from OpenWeatherMap and categorized as `hot`, `cold`, or `normal`.
- Disease logic is currently demo-based with hardcoded disease entries in `DISEASE_LIBRARY`.

### Plant validation

- The backend checks the uploaded image against plant-related labels.
- Non-plant uploads are rejected with a `400` response.
- If model confidence is low, the image may still pass as plant-like.

### Smart timeline engine

- `weather_engine.py` evaluates each day using temperature, humidity, rain probability, and soil values.
- Alert generation rules include heavy rain, high temperature, and high humidity.
- Crop stage influences recommended actions such as fertilizer, irrigation, or spraying.

### CORS configuration

Current development config allows all origins:

```python
allow_origins=["*"]
allow_methods=["*"]
allow_headers=["*"]
allow_credentials=False
```

For production, replace `"*"` with the frontend domain(s).

---

## Project Structure

```text
backend/
├── BACKEND_DOCUMENTATION.md
├── app.py
├── requirements.txt
├── runtime.txt
├── services/
│   └── plant_check.py
└── weather_engine.py
```

> Duplicate backend docs have been consolidated into this single canonical documentation file.

---

## Troubleshooting

### 1. Missing API key

- Confirm `backend/.env` contains a valid `API_KEY`.
- If weather requests fail, fallback behavior returns `normal` weather.

### 2. Dependency issues

- Activate the virtual environment.
- Run `pip install -r requirements.txt`.
- Confirm `tensorflow`, `numpy`, `Pillow`, and `fastapi` are installed.

### 3. CORS errors

- When using the frontend, ensure the frontend origin is allowed in CORS.
- For a secure setup, set `CORS_ORIGINS` to the actual frontend URL.

### 4. API route verification

- Use `http://localhost:8000/docs`.
- Confirm the following endpoints appear: `/`, `/analyze`, `/smart-timeline`, `/full-analysis`, `/dashboard`, `/crop-recommendation`, `/alerts`.

### 5. Model loading

- `app.py` loads MobileNetV2 at startup.
- If startup is slow, this is expected for TensorFlow model initialization.

---

## Validation

Use these commands from `backend/`:

```bash
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Then test with a browser or curl.
