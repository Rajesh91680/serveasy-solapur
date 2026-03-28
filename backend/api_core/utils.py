# import random
# from django.core.mail import send_mail
# from django.utils.timezone import now

# def generate_otp():
#     return str(random.randint(100000, 999999))


# def send_otp_email(email, otp):
#     subject = "Email Verification OTP"
#     message = f"Your OTP is {otp}. It is valid for 5 minutes."
#     from_email = "serveasy9app@gmail.com"

#     send_mail(subject, message, from_email, [email])
import random
from django.core.mail import send_mail
from django.utils.timezone import now
from twilio.rest import Client


# =========================
# OTP FUNCTIONS
# =========================
def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(email, otp):
    subject = "Email Verification OTP"
    message = f"Your OTP is {otp}. It is valid for 5 minutes."
    from_email = "serveasy9app@gmail.com"

    send_mail(subject, message, from_email, [email])


# =========================
# WHATSAPP (TWILIO)
# =========================


# client = Client(ACCOUNT_SID, AUTH_TOKEN)


# def send_whatsapp_message(phone, provider_name, description):
#     message = f"""
# Hello {provider_name}! 👋

# Problem:
# {description}

# Reply:
# YES - Available
# NO - Not Available
# """

#     try:
#         client.messages.create(
#             from_='whatsapp:+14155238886',
#             body=message,
#             to=f'whatsapp:+91{phone}'
#         )
#         print("✅ WhatsApp sent")

#     except Exception as e:
#         print("❌ WhatsApp error:", str(e))