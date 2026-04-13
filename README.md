# 🏥 MediClassify

AI-powered medical department classifier with hospital search and appointment booking system.

---

## 🚀 Overview

**MediClassify** is a full-stack healthcare web application that predicts the appropriate medical department based on user symptoms.
It also enables users to find nearby hospitals and book appointments efficiently.

---

## ✨ Features

* 🔐 User Authentication (JWT-based login/signup)
* 🤖 Symptom → Department Prediction using Machine Learning
* 📊 Confidence Score & Severity Detection
* 🏥 Hospital Search using OpenStreetMap API
* 📅 Appointment Booking System
* 📧 Email Notifications (Gmail SMTP)
* 📜 Patient History Tracking
* 📈 User Dashboard

---

## 🧠 Machine Learning

* Algorithm: Logistic Regression
* Vectorization: TF-IDF
* Accuracy: ~85%
* Departments:

  * Dermatology
  * Gastroenterology
  * Infectious Disease
  * Endocrinology
  * Cardiology
  * Pulmonology
  * Urology
  * Orthopedics
  * Neurology

---

## 🛠️ Tech Stack

### Frontend

* React (Create React App)
* Axios
* React Router

### Backend

* FastAPI (Python)
* SQLAlchemy
* JWT Authentication

### Database

* PostgreSQL

### Other Integrations

* OpenStreetMap Overpass API (Hospital search)
* Gmail SMTP (Email reminders)

---

## 📁 Project Structure

```id="1x1r4n"
Medical_Classification/
├── backend/
├── frontend/
├── ml/
├── dataset/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash id="1w7mtf"
git clone https://github.com/suryansh0511/mediclassify.git
cd mediclassify
```

---

### 2️⃣ Backend Setup

```bash id="p4yzc3"
cd backend
pip install -r requirements.txt
```

Create `.env` file:

```id="7z3z6l"
DATABASE_URL=postgresql://username:password@localhost:5432/medical_classifier
SECRET_KEY=your_secret_key
GMAIL_EMAIL=your_email
GMAIL_PASSWORD=your_app_password
```

Run backend:

```bash id="rz2u7k"
uvicorn main:app --reload --port 8001
```

---

### 3️⃣ Frontend Setup

```bash id="61dq2y"
cd frontend
npm install
npm start
```

Frontend runs on:

```id="6rfkyr"
http://localhost:3000
```

Backend runs on:

```id="jxzj2k"
http://localhost:8001
```

---

## 🌐 API Endpoints

* `POST /auth/signup`
* `POST /auth/login`
* `POST /predict`
* `GET /history`
* `GET /hospitals/{department}`
* `POST /appointment/book`
* `GET /appointment/my`
* `DELETE /appointment/cancel/{id}`
* `GET /dashboard`

---

## 🔐 Environment Variables

```id="ht7lqj"
DATABASE_URL=
SECRET_KEY=
GMAIL_EMAIL=
GMAIL_PASSWORD=
```

---

## 🎯 Future Improvements

* 🌍 Multi-city hospital support
* 📱 Mobile app version
* 🧠 Advanced ML models
* 🔊 Voice-based symptom input

---

## 👨‍💻 Author

**Suryansh Mishra**