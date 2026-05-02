# ⚡ KRISHI AI - QUICK START REFERENCE

## 🚀 Quick Deployment Commands

### Windows Users
```batch
# Setup (first time)
setup.bat

# Start Frontend (new terminal)
cd frontend
npm run dev

# Start Backend (new terminal)
cd backend
venv\Scripts\activate
uvicorn app:app --reload
```

### Mac/Linux Users
```bash
# Setup (first time)
bash setup.sh

# Start Frontend (new terminal)
cd frontend
npm run dev

# Start Backend (new terminal)
cd backend
source venv/bin/activate
uvicorn app:app --reload
```

---

## 📋 Critical Fixes Applied

✅ **Syntax Error Fixed** - `backend/app.py:279`  
✅ **CORS Configured** - Restricted origins  
✅ **TimelinePage Rewritten** - Uses real data  
✅ **Navbar Updated** - Timeline link added  
✅ **Env Variables** - Production templates created  
✅ **Documentation** - 4 guides provided  

---

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 🔑 Required API Keys

1. **Gemini API** (for voice assistant)
   - Get from: https://aistudio.google.com/app/apikey
   - Add to `.env` as: `VITE_GEMINI_API_KEY=your_key`

2. **OpenWeatherMap** (optional - app has free fallback)
   - Get from: https://openweathermap.org/api
   - Add to `.env` as: `API_KEY=your_key`

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | Local environment variables |
| `.env.example` | Template (safe to commit) |
| `.env.production` | Production template |
| `DEPLOYMENT.md` | Full deployment guide |
| `PRODUCTION_CHECKLIST.md` | Pre-deployment verification |
| `TESTING_GUIDE.md` | Test procedures |
| `Procfile` | Deployment config |

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Ensure venv is activated
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt

# Check if port 8000 is available
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows
```

### Frontend build error
```bash
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### CORS error
- Check backend CORS in `backend/app.py`
- Ensure `allow_origins` includes frontend URL
- Verify `VITE_API_URL` env var is set

### "Module not found" error
- Ensure all dependencies installed: `pip install -r requirements.txt`
- Clear Python cache: `find . -type d -name __pycache__ -exec rm -r {} +`

---

## ✅ Verify Installation

```bash
# Test backend
curl http://localhost:8000/

# Test disease endpoint (with image file)
curl -X POST -F "file=@image.jpg" http://localhost:8000/analyze

# Test timeline
curl -X POST -H "Content-Type: application/json" \
  -d '{"stage":"vegetative","weather_data":[],"soil":null}' \
  http://localhost:8000/smart-timeline
```

---

## 🚀 Deploy to Render (5 minutes)

1. Connect GitHub to Render.com
2. Create Backend service: 
   - Buildscript: `pip install -r backend/requirements.txt`
   - Start: `cd backend && gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app`
3. Create Frontend service:
   - Build: `cd frontend && npm install && npm run build`
   - Publish: `frontend/dist`
4. Add environment variables to both
5. Deploy!

Full guide: See `DEPLOYMENT.md`

---

## 📊 Project Structure

```
krishiAi/
├── frontend/              (React + Vite)
├── backend/               (FastAPI + Python)
├── DEPLOYMENT.md          (Deployment guide)
├── PRODUCTION_CHECKLIST.md (Pre-deployment checklist)
├── TESTING_GUIDE.md       (Test procedures)
├── PRODUCTION_REPORT.md   (Full analysis)
└── setup.bat/setup.sh     (Automated setup)
```

---

## 🎯 Features

✨ **Crop Suggestion** - AI-powered crop recommendations  
🔬 **Disease Detection** - Plant disease identification  
🌤️ **Weather Forecast** - Real-time weather data  
📅 **Smart Timeline** - Farming schedule generator  
🎙️ **Voice Assistant** - Hindi/English support  

---

## 🔍 Next Steps

1. ✅ Review all fixes
2. ✅ Test locally
3. ✅ Get API keys
4. ✅ Choose deployment platform
5. ✅ Follow DEPLOYMENT.md
6. ✅ Monitor in production

---

**Ready to deploy? 🚀**

Start with `setup.bat` (Windows) or `setup.sh` (Mac/Linux)

Questions? Check `PRODUCTION_CHECKLIST.md` or `DEPLOYMENT.md`
