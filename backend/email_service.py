import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()

GMAIL_EMAIL    = os.getenv("GMAIL_EMAIL")
GMAIL_PASSWORD = os.getenv("GMAIL_PASSWORD")

def send_appointment_reminder(
    to_email, patient_name, hospital_name,
    department, date, time_slot, symptoms
):
    try:
        msg = MIMEMultipart()
        msg['From']    = GMAIL_EMAIL
        msg['To']      = to_email
        msg['Subject'] = f"Appointment Confirmed — {hospital_name}"

        body = f"""
Dear {patient_name},

Your appointment has been confirmed! 🏥

━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPOINTMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏥 Hospital   : {hospital_name}
🏥 Department : {department}
📅 Date       : {date}
🕐 Time       : {time_slot}
🔍 Symptoms   : {symptoms}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please arrive 15 minutes early.
Carry your ID and insurance card.

Stay healthy!
— MediClassify Team
        """

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(GMAIL_EMAIL, GMAIL_PASSWORD)
        server.sendmail(GMAIL_EMAIL, to_email, msg.as_string())
        server.quit()

        return True

    except Exception as e:
        print(f"Email error: {e}")
        return False