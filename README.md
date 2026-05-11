# 🌾 Krishi AI — Smart Farming Assistant

<p align="center">
  <b>AI-powered decision support for farmers</b><br/>
  Crop Disease Detection • Real-time Weather • Smart Advice
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React+Vite-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi" />
  <img src="https://img.shields.io/badge/AI-Computer%20Vision-orange" />
</p>

Krishi AI Sahayak is a smart farming assistant built with a React/Vite frontend and Python FastAPI backend. It helps farmers by combining crop disease detection, weather intelligence, and practical farming recommendations.

---

## ✨ Key Features

- 🧪 Disease Detection: Upload a plant image and get a diagnosis with treatment and prevention guidance.
- 🌦 Weather Insights: Live weather data with contextual farming advice.
- 📅 Smart Timeline: Farming schedule recommendations based on crop stage, weather, and soil.
- 🎙 Voice Assistant: Hindi/English voice-based farm assistant.
- 🌾 Crop Suggestion: Soil and weather-aware crop recommendation engine.

---

## 🚀 One-File Project Guide

All important setup and deployment instructions are now consolidated in this README. The root docs that duplicated the same content have been removed to keep the repository clean.

---

## ✅ Minimum Requirements

- Node.js 18+ for the frontend
- Python 3.9+ for the backend
- Git for version control

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and add values:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
API_KEY=your_openweathermap_api_key
VITE_API_URL=http://localhost:8000
```

- `VITE_GEMINI_API_KEY`: required for the voice assistant.
- `API_KEY`: optional for OpenWeatherMap weather data; app has a fallback mode.
- `VITE_API_URL`: backend API base URL for frontend.

---

## 🧪 Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

### Backend

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Open: `http://localhost:8000`

### Verify Backend

```bash
curl http://localhost:8000/
```

Expected response:

```json
{"message":"Backend Running"}
```

---

## 📦 Production Deployment

### Render (recommended)

1. Push repository to GitHub.
2. Create Render service for backend:
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app`
3. Create Render static site for frontend:
   - Build: `cd frontend && npm install && npm run build`
   - Publish: `frontend/dist`
4. Add environment variables in Render for both services.

### Railway

1. Connect GitHub repository.
2. Create separate backend and frontend services.
3. Configure env vars:
   - `VITE_API_URL`
   - `VITE_GEMINI_API_KEY`
   - `API_KEY`

### Vercel

- Deploy frontend as a static site.
- Set `VITE_API_URL`, `VITE_GEMINI_API_KEY`, and `VITE_GEMINI_MODEL` in Vercel environment settings.

### Backend CORS

Update `backend/app.py` after deployment with your frontend URL:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://your-frontend-url",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
```

---

## ✅ Testing Checklist

### Frontend
- [ ] `npm run dev` works
- [ ] App loads at `http://localhost:5173`
- [ ] Navigation works between pages
- [ ] Disease detection upload and result flow work
- [ ] Weather page loads real weather values
- [ ] Smart timeline generates schedule
- [ ] Voice assistant responds

### Backend
- [ ] `uvicorn app:app --reload` starts
- [ ] `GET /` returns 200
- [ ] `POST /analyze` accepts plant images
- [ ] `POST /smart-timeline` returns timeline data
- [ ] CORS allows frontend origin

### Quick API tests

```bash
curl -X POST -F "file=@test_image.jpg" http://localhost:8000/analyze
curl -X POST -H "Content-Type: application/json" -d '{"stage":"vegetative","weather_data":[],"soil":null}' http://localhost:8000/smart-timeline
```

---

## 🧰 Troubleshooting

### Backend does not start

- Activate virtual environment
- Install dependencies: `pip install -r requirements.txt`
- Check Python version: `python --version`
- Run: `uvicorn app:app --reload`

### Frontend build failure

```bash
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### CORS error

- Confirm `VITE_API_URL` points to backend URL
- Confirm backend CORS origin includes the frontend URL
- Clear browser cache

---

## 📁 Repository Structure

```text
krishiAi/
├── backend/
│   ├── app.py
│   ├── weather_engine.py
│   ├── services/plant_check.py
│   ├── requirements.txt
│   └── runtime.txt
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   └── public/
├── .env.example
├── .gitignore
├── Procfile
└── README.md
```

---

## 💡 Notes

- The backend is stateless and does not require a database.
- Use `.env.example` as the source of truth for required environment variables.
- Remove duplicate root docs and keep this README as the primary project guide.

---

## 🙌 Contributors

- Adarsh Malviya
- Anubhav Gupta
- Krishna Sharma
- Shubh Sahu
 