# 🚀 KRISHI AI - DEPLOYMENT GUIDE

## Quick Start for Production

This guide walks you through deploying Krishi AI to production on platforms like Render, Railway, or Vercel.

---

## **OPTION 1: Deploy to Render.com** (Recommended - FREE TIER AVAILABLE)

### Step 1: Prepare Your Repository

```bash
# Ensure everything is committed
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 2: Create Render Account

1. Visit https://render.com
2. Sign up with GitHub (recommended)
3. Connect your repository

### Step 3: Deploy Backend

1. Click "New" → "Web Service"
2. Select your krishiAi repository
3. Fill in the details:
   - **Name**: `krishiAi-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app`
   - **Root Directory**: `backend` (or leave empty)

4. Go to "Environment" and add these variables:
   ```
   VITE_API_URL=https://krishiAi-backend.onrender.com
   API_KEY=your_openweathermap_api_key
   ```

5. Deploy!

### Step 4: Deploy Frontend

1. Click "New" → "Static Site"
2. Select your krishiAi repository
3. Fill in the details:
   - **Name**: `krishiAi-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

4. Add Environment Variables in the build settings:
   ```
   VITE_API_URL=https://krishiAi-backend.onrender.com
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_GEMINI_MODEL=gemini-2.5-flash
   ```

5. Deploy!

### Step 5: Update Backend CORS

Once you have your frontend URL, update backend CORS in `backend/app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://krishiAi-frontend.onrender.com",  # Add your actual frontend URL
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
```

---

## **OPTION 2: Deploy to Railway.app**

### Step 1: Connect GitHub

1. Visit https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Authorize and select krishiAi repository

### Step 2: Configure Services

#### Backend Service:
- Navigate to backend service
- Add Environment Variables (Settings tab):
  ```
  VITE_API_URL=https://your-railway-backend-url.railway.app
  API_KEY=your_openweathermap_api_key
  ```

#### Frontend Service:
- Navigate to frontend service
- Add Environment Variables:
  ```
  VITE_API_URL=https://your-railway-backend-url.railway.app
  VITE_GEMINI_API_KEY=your_gemini_api_key
  ```

---

## **OPTION 3: Deploy Frontend to Vercel (FREE)**

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Deploy

```bash
cd frontend
vercel
```

### Step 3: Configure Environment Variables

In Vercel dashboard:
- Go to Settings → Environment Variables
- Add:
  ```
  VITE_API_URL=https://your-backend-url.com
  VITE_GEMINI_API_KEY=your_gemini_api_key
  VITE_GEMINI_MODEL=gemini-2.5-flash
  ```

---

## **OPTION 4: Deploy Backend to Vercel Serverless**

Create `vercel.json` in backend directory:

```json
{
  "buildCommand": "pip install -r requirements.txt",
  "functions": {
    "app.py": {
      "memory": 3008,
      "maxDuration": 30
    }
  }
}
```

Deploy:
```bash
cd backend
vercel
```

---

## **Important Environment Variables**

### For Backend:
```env
# OpenWeatherMap API Key (optional - app has fallback)
API_KEY=your_api_key_here

# Production Settings
DEBUG=false
HOST=0.0.0.0
PORT=8000  # Render/Railway sets this automatically via $PORT
```

### For Frontend:
```env
# Gemini API Key (required for voice assistant)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash

# Backend URL (production)
VITE_API_URL=https://your-backend-url.com
```

---

## **Troubleshooting**

### Backend won't start
- Check logs in Render/Railway dashboard
- Ensure all dependencies in requirements.txt are installed
- Verify Python version (3.8+)

### Frontend can't reach backend
- Check CORS settings in `backend/app.py`
- Ensure `VITE_API_URL` is correct
- Clear browser cache

### API key errors
- Verify all environment variables are set
- For Gemini: Get key from https://aistudio.google.com/app/apikey
- For OpenWeatherMap: Get key from https://openweathermap.org/api

---

## **Monitoring & Logs**

### Render
- View logs in Dashboard → your service → Logs tab
- Watch for errors and warnings

### Railway
- Logs visible in Railway dashboard → Deployments tab

### Vercel
- Logs in Vercel dashboard → Analytics → Logs tab

---

## **Performance Tips**

1. Enable gzip compression in backend
2. Use CDN for static assets
3. Optimize images (done in frontend)
4. Cache weather data (consider Redis for production)
5. Use lazy loading for frontend components

---

## **Security Checklist**

✅ Never commit `.env` files  
✅ Use strong API keys  
✅ Enable HTTPS (automatic on Render/Railway/Vercel)  
✅ Restrict CORS to your domain only  
✅ Keep dependencies updated: `pip list --outdated` and `npm outdated`  
✅ Monitor logs for suspicious activity  

---

## **Next Steps**

1. Get API keys ready
2. Choose a deployment platform
3. Follow the steps above
4. Test all features after deployment
5. Monitor logs for issues

Good luck! 🌾
