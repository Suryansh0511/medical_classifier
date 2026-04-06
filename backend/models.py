from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String(255), nullable=False)
    email      = Column(String(255), unique=True, nullable=False)
    password   = Column(String(255), nullable=False)
    phone      = Column(String(20), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    predictions  = relationship("Prediction", back_populates="user")
    appointments = relationship("Appointment", back_populates="user")


class Prediction(Base):
    __tablename__ = "predictions"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"))
    symptoms   = Column(Text, nullable=False)
    department = Column(String(100), nullable=False)
    confidence = Column(Float, nullable=False)
    severity   = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="predictions")


class Appointment(Base):
    __tablename__ = "appointments"

    id              = Column(Integer, primary_key=True, index=True)
    user_id         = Column(Integer, ForeignKey("users.id"))
    hospital_name   = Column(String(255), nullable=False)
    hospital_address= Column(String(255), nullable=False)
    department      = Column(String(100), nullable=False)
    date            = Column(String(50), nullable=False)
    time_slot       = Column(String(50), nullable=False)
    symptoms        = Column(Text, nullable=False)
    email           = Column(String(255), nullable=False)
    status          = Column(String(50), default="confirmed")
    created_at      = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="appointments")