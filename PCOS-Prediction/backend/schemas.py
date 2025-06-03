from pydantic import BaseModel, Field
from typing import Optional

class PCOSPredictionRequest(BaseModel):
    age: float
    bmi: float
    cycle_irregular: int
    cycle_length: float
    weight_gain: int
    hair_growth: int
    skin_darkening: int
    hair_loss: int
    pimples: int
    fast_food: int
    reg_exercise: int
    marriage_years: Optional[float] = Field(0, alias="marriage_years")
    pregnant: int
    abortions: Optional[int] = Field(0, alias="abortions")
    hip: Optional[float] = Field(0, alias="hip")
    waist: Optional[float] = Field(0, alias="waist")
    waist_hip_ratio: Optional[float] = Field(0, alias="waist_hip_ratio")
    blood_group: str

class PCOSPrediction(BaseModel):
    prediction: int  # 0 = no PCOS, 1 = PCOS
    risk_score: float  # 0.0–1.0 probability
