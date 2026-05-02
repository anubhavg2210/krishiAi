# backend/services/weather_engine.py

def evaluate_day(day_data, stage, soil=None):
    weather = day_data.get("weather", "Clear")
    temp = day_data.get("temperature", 25)
    humidity = day_data.get("humidity", 50)
    rain_prob = day_data.get("rain_probability", 0)

    risk = "Low"
    action = "No action"

    # Rain rule
    if rain_prob > 60:
        action = "Avoid irrigation and pesticide"
        risk = "Medium"

    # Disease risk
    if humidity > 80:
        risk = "High"
        action = "Monitor for fungal disease"

    # Heat rule
    if temp > 35:
        action = "Increase irrigation"
        risk = "High"

    # Cold rule
    if temp < 10:
        risk = "High"

    # Crop stage logic
    if stage == "seed":
        action = "Light irrigation"
    elif stage == "vegetative":
        action = "Apply fertilizer"
    elif stage == "flowering":
        action = "Avoid heavy spraying"
    elif stage == "harvesting":
        action = "Avoid irrigation"

    # Soil logic
    if soil:
        moisture = soil.get("moisture", 50)
        nitrogen = soil.get("nitrogen", "normal")

        if moisture < 30:
            action = "Irrigation needed"

        if nitrogen == "low":
            action = "Apply nitrogen fertilizer"

    return {
        "weather": weather,
        "risk": risk,
        "action": action
    }

def generate_timeline(weather_data, stage, soil=None):
    timeline = []

    for i, day in enumerate(weather_data):
        result = evaluate_day(day, stage, soil)

        timeline.append({
            "day": day.get("day", f"Day {i+1}"),
            "weather": result["weather"],
            "risk": result["risk"],
            "action": result["action"]
        })

    return timeline

def generate_alerts(weather_data):
    alerts = []

    for i, day in enumerate(weather_data):
        rain_prob = day.get("rain_probability", 0)
        temp = day.get("temperature", 25)
        humidity = day.get("humidity", 50)

        # Rain alert
        if rain_prob > 60 and i < 2:
            alerts.append({
                "type": "Rain Alert",
                "message": "Heavy rain expected soon",
                "action": "Avoid irrigation"
            })

        # Heat alert
        if temp > 35:
            alerts.append({
                "type": "Heat Alert",
                "message": "High temperature expected",
                "action": "Increase irrigation"
            })

        # Disease alert
        if humidity > 80:
            alerts.append({
                "type": "Disease Alert",
                "message": "High humidity may cause fungal disease",
                "action": "Monitor crops closely"
            })

    return alerts

def run_engine(stage, weather_data, soil=None):
    timeline = generate_timeline(weather_data, stage, soil)
    alerts = generate_alerts(weather_data)

    return {
        "timeline": timeline,
        "alerts": alerts
    }