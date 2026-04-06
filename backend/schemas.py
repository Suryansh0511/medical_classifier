from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# User schemas
class UserCreate(BaseModel):
    name     : str
    email    : str
    password : str
    phone    : Optional[str] = None

class UserLogin(BaseModel):
    email    : str
    password : str

class UserResponse(BaseModel):
    id         : int
    name       : str
    email      : str
    created_at : datetime

    class Config:
        from_attributes = True

# Prediction schemas
class PredictRequest(BaseModel):
    symptoms : str

class PredictResponse(BaseModel):
    department : str
    confidence : float
    severity   : str

# Appointment schemas
class AppointmentCreate(BaseModel):
    hospital_name    : str
    hospital_address : str
    department       : str
    date             : str
    time_slot        : str
    symptoms         : str
    email            : str

class AppointmentResponse(BaseModel):
    id               : int
    hospital_name    : str
    hospital_address : str
    department       : str
    date             : str
    time_slot        : str
    symptoms         : str
    status           : str
    created_at       : datetime

    class Config:
        from_attributes = True