import pyotp

def generate_authenticator_secret():
    totp = pyotp.TOTP(pyotp.random_base32())
    return totp.secret

def verify_otp(secret, otp):
    totp = pyotp.TOTP(secret)
    return totp.verify(otp)
