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

## 📁 Project Structure

```id="tree1"
krishiAi/
├── backend/        # FastAPI (ML + APIs)
│   ├── app.py
│   ├── requirements.txt
│   └── ...
├── frontend/       # React + Vite UI
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

---

## ⚙️ Quick Start

### 1️⃣ Clone

```id="clone1"
git clone https://github.com/anubhavg2210/krishiAi.git
cd krishiAi
```

### 2️⃣ Backend (FastAPI)

```id="be1"
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

➡️ http://127.0.0.1:8000

---

### 3️⃣ Frontend (React + Vite)

```id="fe1"
cd frontend
npm install
npm run dev
```

➡️ http://localhost:5173

---

## 🔐 Environment Variables

Create `backend/.env`:

```id="env1"
OPENWEATHER_API_KEY=your_api_key_here
```

---

## 🧠 How It Works

1. User uploads crop image
2. Backend predicts disease
3. Weather API fetches current conditions
4. Advice engine combines both
5. Frontend displays results instantly

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS
* Framer Motion

**Backend**

* FastAPI
* Uvicorn
* Python

**APIs**

* OpenWeatherMap

---

## 📸 Screenshots (Add before final submission)

> Replace with your images

```id="ss1"
![Home](docs/home.png)
![Disease Detection](docs/disease.png)
![Results](docs/results.png)
```

---

## 🎯 Hackathon Impact

* 📈 Faster disease identification
* 🌱 Better crop management
* 🌍 Data-driven farming decisions

---

## 🤝 Contributing

```id="contrib1"
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
