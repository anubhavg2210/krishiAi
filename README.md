# 🌾 Krishi AI — Smart Farming Assistant

<p align="center">
  <b>AI-powered decision support for farmers</b><br/>
  Crop Disease Detection • Real-time Weather • Smart Advice
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React+Vite-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi" />
  <img src="https://img.shields.io/badge/AI-Computer%20Vision-orange" />
  <img src="https://img.shields.io/badge/Hackathon-Project-success" />
</p>

Kisan AI Sahayak is an interactive, highly responsive AI-powered agricultural tool specifically aimed at empowering farmers in Madhya Pradesh. 

The application consists of a **React-based frontend (Vite)** for a premium user experience and a **Python FastAPI backend** to handle API requests, mock disease analysis, and weather integrations.

---

## ✨ Why Krishi AI?

Farmers often lack timely insights about crop health and weather.
**Krishi AI bridges this gap** by combining AI + real-time data to deliver **actionable guidance** in seconds.

---

## 🔥 Key Features

### 🧪 Disease Detection

* Upload plant image
* AI predicts disease + confidence
* Instant **treatment advice**

### 🌦 Real-Time Weather

* Live weather via OpenWeatherMap
* Context-aware suggestions for farming decisions

### 🧠 Smart Advice Engine

* Combines **disease + weather**
* Produces practical, easy-to-follow steps

---

## 🛠️ Quick Start & Setup

Follow these steps to run both the Frontend and Backend locally on your machine.

### Prerequisites
Make sure you have the following installed on your computer:
1. **Node.js** (v18+ recommended) - For the frontend
2. **Python** (v3.9+ recommended) - For the backend

---

### 1. Environment Setup (.env)

Before running the project, you need to configure your environment variables. 
1. Copy the provided `.env.example` file and rename it to `.env` in the root folder.
2. Fill in the required API keys inside the `.env` file:
   - `VITE_GEMINI_API_KEY`: Required for the Frontend AI Voice Assistant (Get it from [Google AI Studio](https://aistudio.google.com/)).
   - `API_KEY`: Required for the Backend OpenWeatherMap integration (Get it from [OpenWeatherMap](https://openweathermap.org/)).

---

### 2. Frontend Setup (React/Vite)

The frontend is built using React, Vite, and TailwindCSS.

1. Open your terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend Server**:
   ```bash
   npm run dev
   ```
   Your app will be live at `http://localhost:5173/`.

---

### 3. Backend Setup (FastAPI/Python)

The backend is built with FastAPI and runs on Python to serve API endpoints.

1. Open a **new terminal window** and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. **Create a Virtual Environment** (Highly Recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```

3. **Install Backend Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Backend Server**:
   ```bash
   uvicorn app:app --reload
   ```
   Your backend will be live at `http://localhost:8000/`.

---

## 📁 Project Structure

This project uses a separated frontend-backend architecture for scalability.

```text
krishiAi/
├── backend/                 # Python FastAPI Backend
│   ├── app.py               # Main FastAPI server and API endpoints
│   └── requirements.txt     # Python dependencies list
│
└── frontend/                # React Vite Frontend
    ├── package.json         # Node.js dependencies and scripts
    ├── index.html           # Core HTML entry point
    └── src/                 # All React source code (Pages, Components, Context)
        ├── App.jsx          # Main Router component
        ├── index.css        # Tailwind global styling
        ├── components/      # UI Components (FloatingVoiceAssistant, Navbar)
        └── pages/           # Application views (Landing, Disease, Weather, etc.)
``` 

---

## 📸 Screenshots

> Replace with your images

![Home](docs/home.png)
![Disease Detection](docs/disease.png)
![Results](docs/results.png)

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature
git commit -m "Add feature"
git push
```

Then open a Pull Request 🚀

---

## 👨‍💻 Team

* Adarsh Malviya
* Anubhav Gupta
* Krishna Sharma
* Kratika Swarnkar

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
