from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter(prefix="/history", tags=["History"])


@router.get("/")
def get_history(db: Session = Depends(get_db)):
    data = db.query(models.Prediction).all()
    return data