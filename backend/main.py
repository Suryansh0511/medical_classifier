from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine
import models
import schemas
import auth
from predict import predict_department
from hospitals import find_hospitals
from email_service import send_appointment_reminder
from typing import Optional

# Create tables in Supabase
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Medical Classifier API")

# CORS (IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# AUTH HELPER
# -------------------------------
def get_current_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not logged in")

    token = authorization.replace("Bearer ", "")
    email = auth.verify_token(token)

    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(models.User).filter(models.User.email == email).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


# -------------------------------
# AUTH ROUTES
# -------------------------------
@app.post("/auth/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=auth.hash_password(user.password),
        phone=user.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = auth.create_access_token({"sub": user.email})

    return {
        "token": token,
        "user": {
            "name": new_user.name,
            "email": new_user.email
        }
    }


@app.post("/auth/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user or not auth.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = auth.create_access_token({"sub": user.email})

    return {
        "token": token,
        "user": {
            "name": db_user.name,
            "email": db_user.email
        }
    }


# -------------------------------
# PREDICT
# -------------------------------
@app.post("/predict")
def predict(
    request: schemas.PredictRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    result = predict_department(request.symptoms)

    prediction = models.Prediction(
        user_id=user.id,
        symptoms=request.symptoms,
        department=result['department'],
        confidence=result['confidence'],
        severity=result['severity']
    )

    db.add(prediction)
    db.commit()

    hospitals = find_hospitals(result['department'])

    return {
        "department": result['department'],
        "confidence": result['confidence'],
        "severity": result['severity'],
        "hospitals": hospitals
    }


# -------------------------------
# HISTORY
# -------------------------------
@app.get("/history")
def get_history(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    predictions = db.query(models.Prediction).filter(
        models.Prediction.user_id == user.id
    ).order_by(models.Prediction.created_at.desc()).all()

    return predictions


# -------------------------------
# HOSPITALS
# -------------------------------
@app.get("/hospitals/{department}")
def get_hospitals(department: str):
    hospitals = find_hospitals(department)
    return {"hospitals": hospitals}


# -------------------------------
# APPOINTMENTS
# -------------------------------
@app.post("/appointment/book")
def book_appointment(
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    new_appointment = models.Appointment(
        user_id=user.id,
        hospital_name=appointment.hospital_name,
        hospital_address=appointment.hospital_address,
        department=appointment.department,
        date=appointment.date,
        time_slot=appointment.time_slot,
        symptoms=appointment.symptoms,
        email=appointment.email,
        status="confirmed"
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    send_appointment_reminder(
        to_email=appointment.email,
        patient_name=user.name,
        hospital_name=appointment.hospital_name,
        department=appointment.department,
        date=appointment.date,
        time_slot=appointment.time_slot,
        symptoms=appointment.symptoms
    )

    return {
        "message": "Appointment booked!",
        "appointment": new_appointment
    }


@app.get("/appointment/my")
def get_appointments(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    return db.query(models.Appointment).filter(
        models.Appointment.user_id == user.id
    ).order_by(models.Appointment.created_at.desc()).all()


@app.delete("/appointment/cancel/{id}")
def cancel_appointment(
    id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    appointment = db.query(models.Appointment).filter(
        models.Appointment.id == id,
        models.Appointment.user_id == user.id
    ).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    appointment.status = "cancelled"
    db.commit()

    return {"message": "Appointment cancelled!"}


# -------------------------------
# DASHBOARD
# -------------------------------
@app.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    predictions = db.query(models.Prediction).filter(
        models.Prediction.user_id == user.id
    ).all()

    appointments = db.query(models.Appointment).filter(
        models.Appointment.user_id == user.id
    ).all()

    dept_counts = {}

    for p in predictions:
        dept_counts[p.department] = dept_counts.get(p.department, 0) + 1

    return {
        "total_predictions": len(predictions),
        "total_appointments": len(appointments),
        "department_counts": dept_counts,
        "recent_predictions": predictions[:5]
    }