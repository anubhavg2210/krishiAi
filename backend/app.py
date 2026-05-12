
import os
import requests
from dotenv import load_dotenv
from services.plant_check import is_plant
from fastapi import FastAPI, File, HTTPException, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
from fastapi import Body
from weather_engine import run_engine
from fastapi import Form
import joblib
import pandas as pd

from pydantic import BaseModel
from typing import List, Optional

# Load crop model
CROP_MODEL_PATH = os.path.join(os.path.dirname(__file__), "crop_model.pkl")
try:
    crop_model = joblib.load(CROP_MODEL_PATH)
    print("Crop model loaded successfully!")
except Exception as e:
    print("Could not load crop model:", e)
    crop_model = None

class WeatherDay(BaseModel):
    day: str
    weather: str
    temperature: float
    humidity: float
    rain_probability: float

class SoilData(BaseModel):
    moisture: Optional[float] = None
    nitrogen: Optional[str] = None

class TimelineRequest(BaseModel):
    stage: str
    weather_data: List[WeatherDay]
    soil: Optional[SoilData] = None

load_dotenv()

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 THIS FIXES YOUR ISSUE
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = tf.keras.applications.MobileNetV2(weights="imagenet")

DISEASE_LIBRARY = {
    "early_blight": {
        "disease": "Early Blight",
        "confidence": 0.78,
        "crop": "General Crop",
        "symptoms": [
            "Patton par gol bhure daag dikhte hain.",
            "Daagon ke aas-paas peela hissa ban sakta hai.",
            "Neeche ke purane patte pehle affect hote hain.",
        ],
        "treatment": [
            "Zyada infected patte turant hata do.",
            "Copper based ya chlorothalonil fungicide label ke hisaab se spray karo.",
            "Paudhon ke beech hawa chalne do, overwatering mat karo.",
        ],
        "prevention": [
            "Patton par seedha paani dene se bacho.",
            "Crop rotation rakho, same field me baar-baar same crop mat lagao.",
            "Subah irrigation karo taaki patte jaldi sukh jayein.",
        ],
    },
    "late_blight": {
        "disease": "Late Blight",
        "confidence": 0.76,
        "crop": "General Crop",
        "symptoms": [
            "Patton par pani-soaked dark spots dikhte hain.",
            "Nami me patton ke niche safed fungal growth aa sakti hai.",
            "Fruit bhi jaldi sadne lagte hain.",
        ],
        "treatment": [
            "Affected leaves aur fruits hata kar field se bahar nikalo.",
            "Metalaxyl ya mancozeb based fungicide label ke hisaab se use karo.",
            "Field me water stagnation bilkul mat hone do.",
        ],
        "prevention": [
            "Nami control me rakho aur ventilation improve karo.",
            "Disease-free nursery/seedling use karo.",
            "Rain ke baad crop ko closely inspect karo.",
        ],
    },
    "leaf_spot": {
        "disease": "Leaf Spot",
        "confidence": 0.71,
        "crop": "General Leaf Crop",
        "symptoms": [
            "Patton par chhote kale ya bhure dots dikhte hain.",
            "Daag badhkar patch me convert ho sakte hain.",
            "Severe case me patte jaldi sukh sakte hain.",
        ],
        "treatment": [
            "Infected patte hatao aur field hygiene maintain karo.",
            "Need-based fungicide ya bactericide crop expert ki salah se use karo.",
            "Dense canopy ko halka karo taaki hawa pass ho sake.",
        ],
        "prevention": [
            "Clean tools use karo.",
            "Overhead irrigation avoid karo.",
            "Balanced nutrition do, especially potassium.",
        ],
    },
    "healthy": {
        "disease": "Healthy Leaf",
        "confidence": 0.84,
        "crop": "General Crop",
        "symptoms": [
            "Leaf color mostly uniform dikhta hai.",
            "Clear infection pattern visible nahi hai.",
            "Severe rot ya fungal patch nazar nahi aa raha.",
        ],
        "treatment": [
            "Abhi koi strong treatment ki zarurat nahi lag rahi.",
            "Regular scouting aur balanced nutrition continue rakho.",
            "Agar symptoms badhein to fresh image ke saath dobara analyze karo.",
        ],
        "prevention": [
            "Field monitoring routine bana kar rakho.",
            "Irrigation aur drainage balance me rakho.",
            "Kisi bhi naye daag par jaldi action lo.",
        ],
    },
}


@app.get("/")
def home():
    return {"message": "Backend Running"}


def get_weather():
    api_key = os.getenv("API_KEY")
    if not api_key:
        return "normal"

    url = f"https://api.openweathermap.org/data/2.5/weather?q=Bhopal&appid={api_key}&units=metric"

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        temp = data.get("main", {}).get("temp", 25)

        if temp > 35:
            return "hot"
        if temp < 20:
            return "cold"
        return "normal"
    except requests.RequestException:
        return "normal"


import random

def smart_disease_prediction(decoded):
    labels = [label.lower() for _, label, _ in decoded]

    print("Labels:", labels)

    if any(l in ["leaf", "tree", "plant"] for l in labels):
        return "leaf_spot"

    if any("pepper" in l or "tomato" in l for l in labels):
        return "early_blight"

    return random.choice([
        "early_blight",
        "late_blight",
        "leaf_spot",
        "healthy"
    ])


def build_weather_note(weather):
    if weather == "hot":
        return "Mausam garam hai, isliye irrigation aur leaf stress monitoring badhao."
    if weather == "cold":
        return "Mausam thanda hai, isliye paani kam do aur fungal spread par nazar rakho."
    return "Mausam normal hai, regular monitoring aur sanitation continue rakho."

def is_plant_image(file):
    try:
        image = Image.open(file.file).convert("RGB")
        image = image.resize((224, 224))

        img_array = np.array(image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        predictions = model.predict(img_array)
        decoded = decode_predictions(predictions, top=5)[0]

        print("Plant check:", decoded)

        plant_keywords = [
            "plant", "leaf", "tree", "flower", "fungus", "moss", "fern",
            "cabbage", "pepper", "potato", "tomato", "squash", "cucumber",
            "corn", "wheat", "grass", "herb", "fruit", "vegetable",
            "pot", "daisy", "vine", "crop", "seed", "sprout", "garden", "greenhouse",
            "agriculture", "farming", "lemon", "apple", "orange", "banana",
            "strawberry", "pineapple", "fig", "pomegranate", "acorn", "broccoli", "cauliflower"
        ]

        # Check top 5 predictions for any plant related keyword
        for _, label, confidence in decoded:
            label = label.lower()
            if any(keyword in label for keyword in plant_keywords):
                return True

        # If no plant keyword was found in top 5 predictions, it's not a plant
        return False

    except Exception as e:
        print("Error:", e)
        return False

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    #MOST IMPORTANT: reset file pointer before processing
    file.file.seek(0)
    if not is_plant_image(file):
        raise HTTPException(status_code=400, detail="This is not a plant image 🌱")

    # reset again before reading
    file.file.seek(0)

    # get predictions once
    image = Image.open(file.file).convert("RGB")
    image = image.resize((224, 224))

    img_array = np.array(image)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    predictions = model.predict(img_array)
    decoded = decode_predictions(predictions, top=3)[0]

    # new smart logic
    disease_key = smart_disease_prediction(decoded)
    disease_data = DISEASE_LIBRARY[disease_key]

    weather = get_weather()

    return {
        "disease": disease_data["disease"],
        "confidence": disease_data["confidence"],
        "weather": weather,
        "weatherNote": build_weather_note(weather),
        "crop": disease_data["crop"],
        "symptoms": disease_data["symptoms"],
        "treatment": disease_data["treatment"],
        "prevention": disease_data["prevention"],
        "advice": " ".join(disease_data["treatment"]),
        "diagnosisMode": "AI-assisted mock",
        "note": "Prediction based on visual features using pretrained model (demo version)",
    }

@app.post("/smart-timeline")
def smart_timeline(data: TimelineRequest):
    return run_engine(
        data.stage,
        [d.dict() for d in data.weather_data],
        data.soil.dict() if data.soil else None
    )

@app.post("/full-analysis")
async def full_analysis(file: UploadFile = File(...), stage: str = Form(...)):
    
    result = await analyze(file)

    weather_data = [
        {"day": "Mon", "weather": "Rain", "temperature": 32, "humidity": 85, "rain_probability": 70},
        {"day": "Tue", "weather": "Sunny", "temperature": 36, "humidity": 60, "rain_probability": 10},
    ]

    timeline_result = run_engine(stage, weather_data)

    return {
        "disease_analysis": result,
        "timeline": timeline_result["timeline"],
        "alerts": timeline_result["alerts"]
    }
@app.get("/dashboard")
def get_dashboard_data():
    return {
        "farmHealth": 85,
        "soilMoisture": "Moderate",
        "npkLevel": "Optimal",
        "waterUsage": "240L this week",
        "activeAlerts": 2,
        "weatherSummary": "Sunny with occasional clouds",
        "chartData": [
            {"name": "Mon", "health": 82},
            {"name": "Tue", "health": 84},
            {"name": "Wed", "health": 83},
            {"name": "Thu", "health": 86},
            {"name": "Fri", "health": 85},
            {"name": "Sat", "health": 87},
            {"name": "Sun", "health": 85},
        ]
    }

class CropRequest(BaseModel):
    city: str
    N: float
    P: float
    K: float
    ph: float

def fetch_real_weather(city: str):
    api_key = os.getenv("API_KEY")
    if not api_key:
        return {"temp": 22, "humidity": 60, "rainfall": 60}

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        temp = data.get("main", {}).get("temp", 25)
        humidity = data.get("main", {}).get("humidity", 60)
        
        rain_1h = data.get("rain", {}).get("1h", 0)
        rainfall = rain_1h * 50 if rain_1h > 0 else (100 if humidity > 70 else 40)
        
        return {"temp": temp, "humidity": humidity, "rainfall": rainfall}
    except Exception:
        return {"temp": 22, "humidity": 60, "rainfall": 60}

CROPS_IDEAL_RANGES = {
    "Rice": {"N": (80, 120), "P": (40, 60), "K": (40, 60), "ph": (5.5, 6.5)},
    "Maize": {"N": (100, 140), "P": (50, 70), "K": (40, 60), "ph": (6.0, 7.0)},
    "Cotton": {"N": (100, 150), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.5)},
    "Soybean": {"N": (20, 50), "P": (60, 80), "K": (40, 60), "ph": (6.0, 7.0)},
    "Groundnut": {"N": (20, 40), "P": (50, 70), "K": (30, 50), "ph": (6.0, 7.5)},
    "Bajra": {"N": (40, 60), "P": (20, 40), "K": (20, 40), "ph": (6.0, 8.0)},
    "Jowar": {"N": (60, 80), "P": (30, 50), "K": (30, 50), "ph": (6.0, 8.0)},
    "Wheat": {"N": (80, 120), "P": (40, 60), "K": (30, 50), "ph": (6.0, 7.5)},
    "Gram": {"N": (15, 35), "P": (40, 60), "K": (20, 40), "ph": (6.0, 7.5)},
    "Mustard": {"N": (60, 100), "P": (30, 50), "K": (20, 40), "ph": (5.5, 7.5)},
    "Peas": {"N": (20, 40), "P": (40, 60), "K": (20, 40), "ph": (6.0, 7.5)},
    "Barley": {"N": (60, 80), "P": (30, 50), "K": (20, 40), "ph": (6.0, 8.0)},
    "Watermelon": {"N": (80, 100), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.0)},
    "Muskmelon": {"N": (80, 100), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.0)},
    "Cucumber": {"N": (80, 100), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.5)},
    "Tomato": {"N": (100, 120), "P": (60, 80), "K": (60, 80), "ph": (6.0, 7.0)},
    "Onion": {"N": (80, 100), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.0)},
    "Sunflower": {"N": (60, 80), "P": (40, 60), "K": (30, 50), "ph": (6.0, 7.5)},
    "Moong": {"N": (10, 20), "P": (30, 50), "K": (20, 30), "ph": (6.0, 7.5)}
}

def calculate_param_score(value, ideal_min, ideal_max):
    if ideal_min <= value <= ideal_max:
        return 1.0

    distance = min(
        abs(value - ideal_min),
        abs(value - ideal_max)
    )

    tolerance = (ideal_max - ideal_min) + 20
    score = max(0.0, 1 - (distance / tolerance))
    return round(score, 2)

@app.post("/crop-recommendation")
def recommend_crop(req: CropRequest):
    weather = fetch_real_weather(req.city)
    
    if not crop_model:
        return {"error": "Model not loaded"}

    input_data = pd.DataFrame([{
        "N": req.N,
        "P": req.P,
        "K": req.K,
        "ph": req.ph,
        "temperature": weather["temp"],
        "humidity": weather["humidity"],
        "rainfall": weather["rainfall"]
    }])

    probabilities = crop_model.predict_proba(input_data)[0]
    
    crop_scores = []
    for idx, crop_name in enumerate(crop_model.classes_):
        base_probability = float(probabilities[idx])

        if crop_name not in CROPS_IDEAL_RANGES:
            continue

        ideal = CROPS_IDEAL_RANGES[crop_name]

        n_score = calculate_param_score(req.N, ideal["N"][0], ideal["N"][1])
        p_score = calculate_param_score(req.P, ideal["P"][0], ideal["P"][1])
        k_score = calculate_param_score(req.K, ideal["K"][0], ideal["K"][1])
        ph_score = calculate_param_score(req.ph, ideal["ph"][0], ideal["ph"][1])

        npk_score = (n_score + p_score + k_score + ph_score) / 4

        # 60% soil priority
        # 40% weather/model priority
        final_score = (npk_score * 0.60) + (base_probability * 0.40)

        reasons = []
        if n_score >= 0.9:
            reasons.append("Excellent Nitrogen compatibility")
        if p_score >= 0.9:
            reasons.append("Excellent Phosphorus compatibility")
        if k_score >= 0.9:
            reasons.append("Excellent Potassium compatibility")
        if ph_score >= 0.9:
            reasons.append("Excellent pH compatibility")

        if not reasons:
            reasons.append("Good overall soil compatibility")

        recommended_reason = ", ".join(reasons[:2])

        crop_scores.append({
            "crop": crop_name,
            "confidence": f"{round(final_score * 100, 1)}%",
            "smart_insight": (
                f"Your soil profile strongly supports {crop_name} cultivation "
                f"with favorable nutrient compatibility."
            ),
            "soil_match": f"{round(npk_score * 100)}%",
            "weather_match": f"{round(base_probability * 100)}%",
            "recommended_reason": recommended_reason,
            "final_score": round(final_score, 4)
        })

    crop_scores = sorted(crop_scores, key=lambda x: x["final_score"], reverse=True)
    top_3_recommendations = crop_scores[:3]

    return {
        "recommended_crop": top_3_recommendations[0]["crop"] if top_3_recommendations else "Wheat",
        "top_3_recommendations": top_3_recommendations,
        "recommendations": top_3_recommendations,
        "weather_used": weather
    }

@app.get("/alerts")
def get_alerts():
    return [
        {"id": 1, "type": "Weather", "title": "Heavy Rain Expected", "message": "Avoid pesticide spray for the next 48 hours."},
        {"id": 2, "type": "Disease", "title": "High Humidity Warning", "message": "Conditions favorable for early blight. Monitor crops closely."}
    ]

@app.post("/api/groq-chat")
async def groq_chat_proxy(req: Request):
    body = await req.json()
    auth_header = req.headers.get("Authorization")
    
    if not auth_header:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    r = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        json=body,
        headers={"Authorization": auth_header, "Content-Type": "application/json"},
        stream=True
    )
    if r.status_code != 200:
        raise HTTPException(status_code=r.status_code, detail=r.text)

    def stream_generator():
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                yield chunk

    return StreamingResponse(stream_generator(), media_type="text/event-stream")

