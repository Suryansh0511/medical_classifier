import joblib
import re
import os
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')

# Get absolute path to ml folder
BASE_DIR   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'ml', 'model.pkl')
TFIDF_PATH = os.path.join(BASE_DIR, 'ml', 'tfidf.pkl')

print(f"Loading model from: {MODEL_PATH}")
print(f"Loading tfidf from: {TFIDF_PATH}")

# Load saved model and tfidf
model = joblib.load(MODEL_PATH)
tfidf = joblib.load(TFIDF_PATH)

print("✅ Model loaded successfully!")

# Load stopwords
stop_words = set(stopwords.words('english'))

def clean_text(text):
    text = str(text).lower()
    text = text.replace('_', ' ')
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    words = text.split()
    words = [w for w in words if w not in stop_words and len(w) > 2]
    return ' '.join(words)

def get_severity(confidence):
    if confidence >= 80:
        return "HIGH"
    elif confidence >= 50:
        return "MEDIUM"
    else:
        return "LOW"

def predict_department(symptoms: str):
    cleaned     = clean_text(symptoms)
    vectorized  = tfidf.transform([cleaned])
    result      = model.predict(vectorized)[0]
    probability = model.predict_proba(vectorized)[0]
    confidence  = round(float(max(probability)) * 100, 2)  # ← float()
    severity    = get_severity(confidence)

    return {
        "department" : str(result),      # ← str()
        "confidence" : float(confidence), # ← float()
        "severity"   : str(severity)     # ← str()
    }