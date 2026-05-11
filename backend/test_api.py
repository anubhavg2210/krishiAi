import pandas as pd
import joblib

# Test model loading
try:
    model = joblib.load("crop_model.pkl")
    print("Model classes:", model.classes_)
    
    # Test predict
    df = pd.DataFrame([{
        "N": 50,
        "P": 50,
        "K": 50,
        "ph": 6.5,
        "temperature": 25,
        "humidity": 60,
        "rainfall": 100
    }])
    probs = model.predict_proba(df)
    print("Predictions probabilities:", probs)
    print("Top class:", model.classes_[probs[0].argmax()])
except Exception as e:
    print("Error:", e)
