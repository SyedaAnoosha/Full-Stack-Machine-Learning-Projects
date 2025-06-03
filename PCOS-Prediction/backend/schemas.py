# schemas.py

from pydantic import BaseModel

class PCOSInput(BaseModel):
    age: float
    bmi: float
    cycle_irregular: int  # 1 = irregular, 0 = regular
    cycle_length: float
    weight_gain: int
    hair_growth: int
    skin_darkening: int
    hair_loss: int
    pimples: int
    fast_food: int
    reg_exercise: int

class PCOSPrediction(BaseModel):
    prediction: int  # 0 = no PCOS, 1 = PCOS
    risk_score: float  # 0.0–1.0 probability
