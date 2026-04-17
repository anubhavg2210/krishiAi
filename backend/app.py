from dotenv import load_dotenv
from services.plant_check import is_plant
import os

load_dotenv()
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import requests
app = FastAPI()

# allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}
def get_weather():
    try:
        API_KEY = os.getenv("API_KEY")

        url = f"https://api.openweathermap.org/data/2.5/weather?q=Bhopal&appid={API_KEY}&units=metric"

        res = requests.get(url)
        data = res.json()

        temp = data["main"]["temp"]

        if temp > 35:
            return "hot"
        elif temp < 20:
            return "cold"
        else:
            return "normal"

    except:
        return "normal"   # fallback

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    # 🔥 STEP 1: Save uploaded image
    file_path = "temp.jpg"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # 🔥 STEP 2: Check if it's a plant
    if not is_plant(file_path):
        return {
            "error": "❌ This is not a plant image. Please upload a leaf 🌿"
        }

    # 🔥 STEP 3: Weather logic
    weather = get_weather()

    if weather == "hot":
        advice = "गर्मी ज्यादा है, सिंचाई बढ़ाएं और फसल को सूखने से बचाएं।"
    elif weather == "cold":
        advice = "ठंड अधिक है, फसल को सुरक्षित रखें और सिंचाई कम करें।"
    else:
        advice = "मौसम सामान्य है, नियमित देखभाल करें।"

    # 🔥 STEP 4: Dummy disease (replace later with model)
    disease = {
        "disease": "Early Blight",
        "confidence": 0.87
    }

    return {
        "disease": disease["disease"],
        "confidence": disease["confidence"],
        "weather": weather,
        "advice": advice
    }