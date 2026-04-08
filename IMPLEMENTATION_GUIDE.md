# Kisan AI Sahayak - Implementation Guide

## 📋 Project Overview
**Kisan AI Sahayak** is an AI-powered agricultural assistant for farmers in Madhya Pradesh. It provides crop recommendations based on soil health (N, P, K, pH), real-time weather data, and district information, along with disease detection and mandi prices.

**Tech Stack:**
- **Frontend:** React 19 + Vite + Tailwind CSS + React Router
- **Backend:** FastAPI + Python
- **APIs:** OpenWeatherMap API
- **State Management:** React Context API

---

## 🚀 Phase 1: Environment Setup

### 1.1 Frontend Setup
```bash
# Install Node.js dependencies
npm install

# Start development server
npm run dev
# Access at http://localhost:5173/
```

### 1.2 Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# MacOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create .env file in backend/
# Add: API_KEY=your_openweathermap_api_key

# Run FastAPI server
uvicorn app:app --reload
# Server runs at http://localhost:8000/
```

---

## 🏗️ Phase 2: Frontend Implementation

### 2.1 Core Pages (To Complete)

#### Landing Page (`src/pages/LandingPage.jsx`)
- [ ] Hero section with project vision
- [ ] Feature cards (Crop Suggestion, Disease Detection, Weather, Mandi Prices)
- [ ] CTA button to "Get Started" → `/suggest`
- [ ] Educational section about crop recommendations

#### Crop Suggestion Form (`src/pages/CropSuggestForm.jsx`)
- [ ] District dropdown selector (10 MP districts)
- [ ] Soil health sliders:
  - Nitrogen (N): 0-100
  - Phosphorus (P): 0-100
  - Potassium (K): 0-100
  - pH: 0-14
- [ ] Fetch weather on district change
- [ ] Display real-time weather stats
- [ ] Submit button → POST to `/analyze` endpoint
- [ ] Loading state with spinner

#### Results Page (`src/pages/ResultsPage.jsx`)
- [ ] Display API response from `/analyze`
- [ ] Crop recommendations card
- [ ] Fertilizer requirements
- [ ] Irrigation schedule
- [ ] Actions: Save recommendations, Share, Try Again

#### Disease Detection Page (`src/pages/DiseasePage.jsx`)
- [ ] Image upload component
- [ ] Send to backend `/detect-disease` endpoint
- [ ] Display disease prediction with confidence score
- [ ] Recommended treatment options
- [ ] Pesticide suggestions

#### Weather Page (`src/pages/WeatherPage.jsx`)
- [ ] Shows weather for selected district
- [ ] 5-day forecast (if API supports)
- [ ] Agricultural weather alerts
- [ ] Humidity, wind speed, UV index

### 2.2 Components Enhancement

#### FloatingVoiceAssistant (`src/components/FloatingVoiceAssistant.jsx`)
- [ ] Floating action button (bottom-right)
- [ ] Speech-to-text input using Web Speech API
- [ ] Send voice queries to backend
- [ ] Text-to-speech response
- [ ] Chat history display

#### Navbar (`src/components/layout/Navbar.jsx`)
- [ ] Logo and branding
- [ ] Navigation links: Home, Suggest, Weather, Disease, About
- [ ] Mobile responsive hamburger menu
- [ ] Language toggle (Hindi/English) - Optional

#### Footer (`src/components/layout/Footer.jsx`)
- [ ] Links to social media
- [ ] About section
- [ ] Contact information
- [ ] Copyright notice

### 2.3 Context & State (`src/context/AppContext.jsx`)
Manage globally:
- [ ] Current district selection
- [ ] Soil health values (N, P, K, pH)
- [ ] Weather data cache
- [ ] User preferences (language, units)
- [ ] Previous recommendations history

### 2.4 Services

#### Weather Service (`src/lib/weatherService.js`)
```javascript
// Already partially implemented
// Complete functions:
- fetchWeatherForDistrict(district)  // Returns temp, humidity, windSpeed
- getWeatherAdvice(weather)           // Returns text advice in Hindi
- cacheWeatherData(district, data)    // Cache API responses
```

#### API Service (New - `src/lib/apiService.js`)
```javascript
// Create new service file with:
- analyzeCrop(formData)      // POST /analyze with image/form
- detectDisease(image)        // POST /detect-disease
- fetchMandi(crop)            // GET /mandi-prices
- fetchRecommendations(soil)  // POST /recommendations
```

---

## 🐍 Phase 3: Backend Implementation

### 3.1 Core Endpoints to Implement

#### POST `/analyze`
- **Input:** Image upload + soil data (N, P, K, pH) + district
- **Process:**
  - Fetch weather for district
  - Analyze soil health
  - Generate crop recommendations
  - Get irrigation schedule
- **Output:** JSON with crop suggestions, fertilizer, irrigation

#### POST `/detect-disease`
- **Input:** Image upload
- **Process:**
  - Load ML model (TensorFlow/PyTorch)
  - Predict disease from leaf image
  - Return confidence score
- **Output:** Disease name, confidence, treatment recommendations

#### GET `/weather/{district}`
- **Input:** District name
- **Process:** Call OpenWeatherMap API
- **Output:** Temperature, humidity, wind, forecast

#### GET `/mandi-prices/{crop}`
- **Input:** Crop name
- **Process:** Fetch from mandi API or database
- **Output:** Current prices across districts

#### POST `/recommendations`
- **Input:** Soil values, district, season
- **Output:** Top 3-5 crop recommendations with scores

### 3.2 Required Packages
Update `backend/requirements.txt`:
```
fastapi
uvicorn
python-multipart
requests
python-dotenv
pydantic           # Data validation
pillow             # Image processing
tensorflow         # ML model for disease detection (or pytorch)
opencv-python      # Image preprocessing
sqlalchemy         # Database ORM (optional)
aiofiles           # Async file handling
```

### 3.3 Environment Variables (`.env`)
```
API_KEY=your_openweathermap_api_key
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
MODEL_PATH=./models/disease_detection_model.h5
DATABASE_URL=sqlite:///./kisan_ai.db
```

### 3.4 Error Handling
- [ ] Validate all inputs (file size, format, ranges)
- [ ] Handle API failures with fallbacks
- [ ] Return standardized error responses
- [ ] Add logging for debugging

---

## 🔗 Phase 4: API Integration

### 4.1 Frontend → Backend Flow
1. User fills form (district, soil values)
2. Submit → POST `/analyze` with form data
3. Backend returns recommendations
4. Display on Results Page
5. Cache recommendation in Context for reference

### 4.2 External APIs
- **OpenWeatherMap:** Real-time weather (requires API key)
- **Mandi Prices:** Agricultural market prices (integrate NCDEX/ENAM)
- **ML Model:** Disease detection model deployment

---

## 📦 Phase 5: Additional Features (Optional)

- [ ] User authentication (farmers login)
- [ ] Save recommendations to database
- [ ] Multi-language support (Hindi/English)
- [ ] Offline mode with cached data
- [ ] Mobile app version (React Native)
- [ ] Real-time alerts for pests/diseases
- [ ] Irrigation scheduler with notifications
- [ ] Soil test report upload & interpretation

---

## ✅ Phase 6: Testing & Quality

### Frontend Testing
```bash
npm run lint          # Run ESLint
npm run build         # Build for production
```

### Backend Testing
```bash
pytest               # Run unit tests
python -m pytest -v  # Verbose output
```

### Manual Testing Checklist
- [ ] Form validation works
- [ ] Weather API integration
- [ ] Image upload & processing
- [ ] Mobile responsiveness
- [ ] Error messages display
- [ ] Loading states smooth
- [ ] Deep linking works

---

## 🚢 Phase 7: Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Upload `dist/` folder to hosting
```

### Backend Deployment (Heroku/Railway/Render)
- Set environment variables
- Configure CORS for production URL
- Use production-grade database (PostgreSQL)
- Set up CI/CD pipeline

---

## 🛠️ Development Workflow

### Daily Development
1. Start backend: `cd backend && uvicorn app:app --reload`
2. Start frontend: `npm run dev`
3. Test API endpoints in Postman/Thunder Client
4. Check browser console for errors

### Commit Guidelines
- Commit by feature (not by file)
- Use descriptive messages: `feat: add disease detection API`
- Test before committing

### Code Standards
- Frontend: ESLint rules in `eslint.config.js`
- Backend: Follow PEP 8 style guide
- Comments: Document complex logic
- Naming: camelCase (JS), snake_case (Python)

---

## 📚 Useful Resources

### Documentation
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

### Tools
- Postman - API testing
- Thunder Client - VS Code API extension
- React DevTools - Browser extension
- Tailwind CSS Intellisense - VS Code

---

## ❓ Troubleshooting

### CORS Errors
- Ensure backend CORS middleware includes frontend URL
- Check that requests use correct domain/port

### Weather API Fails
- Verify API key in `.env`
- Check OpenWeatherMap quota limits
- Implement fallback temperature values

### Image Upload Issues
- Validate file size (< 5MB)
- Check supported formats (JPG, PNG)
- Ensure multipart form-data headers

---

## 📞 Support & Next Steps
1. Complete Phase 1 (Setup)
2. Build Phase 2 pages in order
3. Test with Phase 3 backend endpoints
4. Deploy to staging environment
5. Gather farmer feedback
6. Iterate and improve

**Happy Building! 🚜🌾**
