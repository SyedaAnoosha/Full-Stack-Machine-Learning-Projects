# main.py

from fastapi import FastAPI
from schemas import PCOSPredictionRequest
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

@app.post("/predict")
def predict(data: PCOSPredictionRequest):
    # Extract data
    input_data = data.dict()
    
    # Convert blood_group to numeric encoding
    blood_group_map = {
        "A+": 0,
        "A-": 1,
        "B+": 2,
        "B-": 3,
        "AB+": 4,
        "AB-": 5,
        "O+": 6,
        "O-": 7
    }
    input_data['blood_group'] = blood_group_map.get(input_data['blood_group'], -1)  # default -1 for unknown
    
    # Prepare feature vector for model (order must match training)
    features = [
        input_data['age'],
        input_data['bmi'],
        input_data['cycle_irregular'],
        input_data['cycle_length'],
        input_data['weight_gain'],
        input_data['hair_growth'],
        input_data['skin_darkening'],
        input_data['hair_loss'],
        input_data['pimples'],
        input_data['fast_food'],
        input_data['reg_exercise'],
        input_data['marriage_years'],
        input_data['pregnant'],
        input_data['abortions'],
        input_data['hip'],
        input_data['waist'],
        input_data['waist_hip_ratio'],
        input_data['blood_group']
    ]
    
    # Here call your ML model for prediction
    # e.g. prediction, risk_score = model.predict(features)
    
    # Dummy example response
    prediction = 1  # 1 means PCOS positive, 0 means negative
    risk_score = 0.78  # example risk score from 0 to 1
    
    return {"prediction": prediction, "risk_score": risk_score}
