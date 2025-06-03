# main.py

from fastapi import FastAPI
from schemas import PCOSInput, PCOSPrediction
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PCOS Risk Predictor")

origins = [
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("models/pcos_model.pkl")
scaler = joblib.load("models/scaler.pkl")

@app.get("/")
def root():
    return {"status": "PCOS Predictor API is running"}

@app.post("/predict", response_model=PCOSPrediction)
def predict_pcos(data: PCOSInput):
    input_array = np.array([
        data.age,
        data.bmi,
        data.cycle_irregular,
        data.cycle_length,
        data.weight_gain,
        data.hair_growth,
        data.skin_darkening,
        data.hair_loss,
        data.pimples,
        data.fast_food,
        data.reg_exercise
    ]).reshape(1, -1)

    input_scaled = scaler.transform(input_array)
    prediction = int(model.predict(input_scaled)[0])
    risk_score = float(model.predict_proba(input_scaled)[0][1])

    return PCOSPrediction(prediction=prediction, risk_score=round(risk_score, 4))
