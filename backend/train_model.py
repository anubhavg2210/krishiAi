import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import joblib
import os

print("Generating synthetic crop dataset...")
# Crops: Wheat, Soybean, Mustard, Gram (Chana), Rice, Maize, Cotton
# Generating ~500 samples per crop with some noise

crops_config = {
    # Kharif Crops
    "Rice": {"N": (80, 120), "P": (40, 60), "K": (40, 60), "ph": (5.5, 6.5), "temp": (25, 35), "humidity": (80, 90), "rainfall": (200, 300)},
    "Maize": {"N": (100, 140), "P": (50, 70), "K": (40, 60), "ph": (6.0, 7.0), "temp": (25, 30), "humidity": (60, 80), "rainfall": (100, 150)},
    "Cotton": {"N": (100, 150), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.5), "temp": (25, 35), "humidity": (50, 70), "rainfall": (80, 120)},
    "Soybean": {"N": (20, 50), "P": (60, 80), "K": (40, 60), "ph": (6.0, 7.0), "temp": (20, 30), "humidity": (60, 80), "rainfall": (100, 200)},
    "Groundnut": {"N": (20, 40), "P": (50, 70), "K": (30, 50), "ph": (6.0, 7.5), "temp": (25, 35), "humidity": (50, 70), "rainfall": (50, 100)},
    "Bajra": {"N": (40, 60), "P": (20, 40), "K": (20, 40), "ph": (6.0, 8.0), "temp": (25, 40), "humidity": (40, 60), "rainfall": (30, 60)},
    "Jowar": {"N": (60, 80), "P": (30, 50), "K": (30, 50), "ph": (6.0, 8.0), "temp": (25, 35), "humidity": (40, 60), "rainfall": (40, 80)},
    
    # Rabi Crops
    "Wheat": {"N": (80, 120), "P": (40, 60), "K": (30, 50), "ph": (6.0, 7.5), "temp": (15, 25), "humidity": (50, 70), "rainfall": (40, 80)},
    "Gram": {"N": (15, 35), "P": (40, 60), "K": (20, 40), "ph": (6.0, 7.5), "temp": (20, 25), "humidity": (40, 60), "rainfall": (30, 60)},
    "Mustard": {"N": (60, 100), "P": (30, 50), "K": (20, 40), "ph": (5.5, 7.5), "temp": (10, 20), "humidity": (40, 60), "rainfall": (20, 50)},
    "Peas": {"N": (20, 40), "P": (40, 60), "K": (20, 40), "ph": (6.0, 7.5), "temp": (15, 20), "humidity": (50, 70), "rainfall": (40, 60)},
    "Barley": {"N": (60, 80), "P": (30, 50), "K": (20, 40), "ph": (6.0, 8.0), "temp": (15, 25), "humidity": (40, 60), "rainfall": (30, 60)},
    
    # Summer / Zaid Crops
    "Watermelon": {"N": (80, 100), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.0), "temp": (25, 35), "humidity": (50, 70), "rainfall": (20, 50)},
    "Muskmelon": {"N": (80, 100), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.0), "temp": (25, 35), "humidity": (50, 70), "rainfall": (20, 50)},
    "Cucumber": {"N": (80, 100), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.5), "temp": (20, 30), "humidity": (60, 80), "rainfall": (30, 60)},
    "Tomato": {"N": (100, 120), "P": (60, 80), "K": (60, 80), "ph": (6.0, 7.0), "temp": (20, 30), "humidity": (60, 80), "rainfall": (40, 80)},
    "Onion": {"N": (80, 100), "P": (40, 60), "K": (40, 60), "ph": (6.0, 7.0), "temp": (15, 25), "humidity": (50, 70), "rainfall": (30, 60)},
    "Sunflower": {"N": (60, 80), "P": (40, 60), "K": (30, 50), "ph": (6.0, 7.5), "temp": (20, 30), "humidity": (50, 70), "rainfall": (30, 60)},
    "Moong": {"N": (10, 20), "P": (30, 50), "K": (20, 30), "ph": (6.0, 7.5), "temp": (25, 35), "humidity": (50, 70), "rainfall": (30, 60)}
}

data = []
samples_per_crop = 500

for crop, reqs in crops_config.items():
    for _ in range(samples_per_crop):
        N = np.random.uniform(*reqs["N"])
        P = np.random.uniform(*reqs["P"])
        K = np.random.uniform(*reqs["K"])
        ph = np.random.uniform(*reqs["ph"])
        temp = np.random.uniform(*reqs["temp"])
        humidity = np.random.uniform(*reqs["humidity"])
        rainfall = np.random.uniform(*reqs["rainfall"])
        
        # Add a tiny bit of random noise
        N += np.random.normal(0, 2)
        P += np.random.normal(0, 2)
        K += np.random.normal(0, 2)
        ph += np.random.normal(0, 0.2)
        temp += np.random.normal(0, 1)
        humidity += np.random.normal(0, 2)
        rainfall += np.random.normal(0, 5)

        data.append([max(0, N), max(0, P), max(0, K), max(4, ph), temp, humidity, max(0, rainfall), crop])

df = pd.DataFrame(data, columns=["N", "P", "K", "ph", "temperature", "humidity", "rainfall", "label"])

print(f"Dataset generated with {len(df)} samples.")

X = df.drop("label", axis=1)
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(n_estimators=100, random_state=42))
])

print("Training RandomForest model...")
pipeline.fit(X_train, y_train)

accuracy = pipeline.score(X_test, y_test)
print(f"Model trained. Test Accuracy: {accuracy:.4f}")

model_path = os.path.join(os.path.dirname(__file__), "crop_model.pkl")
joblib.dump(pipeline, model_path)
print(f"Model saved to {model_path}")
