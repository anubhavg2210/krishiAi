import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
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
        decoded = decode_predictions(predictions, top=3)[0]

        print("Plant check:", decoded)

        plant_keywords = [
            "plant", "leaf", "tree", "flower", "fungus",
            "cabbage", "pepper", "potato", "tomato",
            "corn", "wheat", "grass", "herb", "fruit", "vegetable"
        ]

        #  primary check
        for _, label, confidence in decoded:
            label = label.lower()
            if confidence > 0.2 and any(keyword in label for keyword in plant_keywords):
                return True

        #  fallback 
        top_label = decoded[0][1].lower()
        top_conf = decoded[0][2]

        non_plant_keywords = ["person", "face", "car", "dog", "cat"]

        if any(word in top_label for word in non_plant_keywords):
             return False

        if top_conf < 0.45:
            return True
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