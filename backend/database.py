from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Debug (optional - remove later)
print("DATABASE_URL:", DATABASE_URL)

# 🚨 Safety check
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in environment variables")

# ✅ Engine with SSL support (IMPORTANT for Supabase)
engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": "require"} if "supabase" in DATABASE_URL else {}
)

# Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base model
Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()