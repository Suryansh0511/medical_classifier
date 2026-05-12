import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os
import threading

load_dotenv()

GMAIL_EMAIL    = os.getenv("GMAIL_EMAIL")
GMAIL_PASSWORD = os.getenv("GMAIL_PASSWORD")

def send_email_async(to_email, patient_name, hospital_name,
                     department, date, time_slot, symptoms):
    try:
        print(f"Sending email to {to_email}...")
        print(f"Using Gmail: {GMAIL_EMAIL}")

        msg            = MIMEMultipart('alternative')
        msg['From']    = f"MediClassify <{GMAIL_EMAIL}>"
        msg['To']      = to_email
        msg['Subject'] = f"✅ Appointment Confirmed — {hospital_name}"

        # Plain text version
        text = f"""
Dear {patient_name},

Your appointment has been confirmed!

APPOINTMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hospital   : {hospital_name}
Department : {department}
Date       : {date}
Time       : {time_slot}
Symptoms   : {symptoms}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please arrive 15 minutes early.
Carry your ID and insurance card.

Stay healthy!
MediClassify Team
        """

        # HTML version
        html = f"""
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #1a73e8; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">🏥 MediClassify</h1>
    </div>
    <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #27ae60;">✅ Appointment Confirmed!</h2>
        <p>Dear <b>{patient_name}</b>,</p>
        <p>Your appointment has been successfully booked!</p>
        <div style="background: white; padding: 20px; border-radius: 10px;
                    border-left: 4px solid #1a73e8; margin: 20px 0;">
            <p>🏥 <b>Hospital:</b> {hospital_name}</p>
            <p>🏥 <b>Department:</b> {department}</p>
            <p>📅 <b>Date:</b> {date}</p>
            <p>🕐 <b>Time:</b> {time_slot}</p>
            <p>🔍 <b>Symptoms:</b> {symptoms}</p>
        </div>
        <p style="color: #666;">Please arrive <b>15 minutes early</b>
        and carry your ID and insurance card.</p>
    </div>
    <div style="background: #1a73e8; padding: 15px; text-align: center;">
        <p style="color: white; margin: 0;">
            Stay healthy! — MediClassify Team
        </p>
    </div>
</body>
</html>
        """

        msg.attach(MIMEText(text, 'plain'))
        msg.attach(MIMEText(html,  'html'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(GMAIL_EMAIL, GMAIL_PASSWORD)
        server.sendmail(GMAIL_EMAIL, to_email, msg.as_string())
        server.quit()

        print(f"✅ Email sent successfully to {to_email}!")

    except smtplib.SMTPAuthenticationError:
        print("❌ Gmail authentication failed!")
        print("Please check your App Password in .env file")
    except smtplib.SMTPException as e:
        print(f"❌ SMTP error: {e}")
    except Exception as e:
        print(f"❌ Email error: {e}")

def send_appointment_reminder(to_email, patient_name, hospital_name,
                               department, date, time_slot, symptoms):
    thread = threading.Thread(
        target=send_email_async,
        args=(to_email, patient_name, hospital_name,
              department, date, time_slot, symptoms)
    )
    thread.daemon = True
    thread.start()
    return True