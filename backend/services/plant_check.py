from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
import numpy as np
from PIL import Image

# STEP 3: Load model
model = MobileNetV2(weights='imagenet')


# STEP 4: Preprocess image
def preprocess_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img)
    img = preprocess_input(img)
    img = np.expand_dims(img, axis=0)
    return img


# STEP 5: Check if plant
from PIL import Image
import numpy as np

def is_plant(image_path):
    img = preprocess_image(image_path)

    preds = model.predict(img)
    results = decode_predictions(preds, top=5)[0]

    print("Predictions:", results)

    keywords = [
        "leaf", "plant", "tree", "flower",
        "vegetable", "grass", "fungus", "fruit"
    ]

    # 🔥 STEP 1: Check labels
    for _, label, confidence in results:
        label = label.lower()

        if any(word in label for word in keywords):
            return True

        # ❌ Reject human-related predictions
        if "person" in label or "face" in label:
            return False

    # 🔥 STEP 2: Green color check (OUTSIDE LOOP)
    img_arr = np.array(Image.open(image_path))
    green_ratio = np.mean(img_arr[:, :, 1]) / 255

    print("Green ratio:", green_ratio)

    if green_ratio > 0.4:
        return True

    return False


# STEP 6: Test (optional)
if __name__ == "__main__":
    print(is_plant("test.jpg"))