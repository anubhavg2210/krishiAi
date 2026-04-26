# Kisan AI Sahayak

Kisan AI Sahayak is an interactive, highly responsive AI-powered agricultural tool specifically aimed at empowering farmers in Madhya Pradesh. 

The application consists of a **React-based frontend (Vite)** for a premium user experience and a **Python FastAPI backend** to handle API requests, mock disease analysis, and weather integrations.

## 🚀 Getting Started

Follow these steps to run both the Frontend and Backend locally on your machine.

### Prerequisites
Make sure you have the following installed on your computer:
1. **Node.js** (v18+ recommended) - For the frontend
2. **Python** (v3.9+ recommended) - For the backend

---

## 🛠️ 1. Environment Setup (.env)

Before running the project, you need to configure your environment variables. 
1. Copy the provided `.env.example` file and rename it to `.env` in the root folder.
2. Fill in the required API keys inside the `.env` file:
   - `VITE_GEMINI_API_KEY`: Required for the Frontend AI Voice Assistant (Get it from [Google AI Studio](https://aistudio.google.com/)).
   - `API_KEY`: Required for the Backend OpenWeatherMap integration (Get it from [OpenWeatherMap](https://openweathermap.org/)).

---

## 💻 2. Frontend Setup (React/Vite)

The frontend is built using React, Vite, and TailwindCSS.

1. Open your terminal and navigate to the frontend folder (or run it from root if `package.json` is there):
   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```
   *Key Dependencies: React, React Router, TailwindCSS, Framer Motion, Lucide React.*

3. **Run the Frontend Server**:
   ```bash
   npm run dev
   ```
   Your app will be live at `http://localhost:5173/`.

---

## ⚙️ 3. Backend Setup (FastAPI/Python)

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
   *Key Dependencies: FastAPI, Uvicorn, Python-Multipart, Requests, Python-Dotenv.*

4. **Run the Backend Server**:
   ```bash
   uvicorn app:app --reload
   ```
   Your backend will be live at `http://localhost:8000/`.

---

## 📁 Project Structure

This project uses a separated frontend-backend architecture for scalability.

```text
kisan-ai-sahayak/
├── .env.example             # Example environment variables (Safe for Git)
├── README.md                # Project documentation
│
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
