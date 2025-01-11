from flask import Flask, Blueprint, request, jsonify, current_app
from services.encryption import derive_key, encrypt, decrypt
from services.authenticator import generate_authenticator_secret, verify_otp
from models.user import User
from mnemonic import Mnemonic  # Install via `pip install mnemonic`
import bcrypt
import os

app = Flask(__name__)
app.config['db'] = None  # Replace with your actual database connection
user_routes = Blueprint('user_routes', __name__)

# User Routes
@user_routes.route('/register', methods=['POST'])
def register():
    db = current_app.config['db']  # Access the database object from the app context
    data = request.json

    # Generate a secure 12-word mnemonic seed phrase using the Mnemonic library
    mnemo = Mnemonic("english")
    mnemonic = mnemo.generate(strength=128)  # 12-word seed phrase

    # Hash vault password and encrypt seed phrase
    vault_password = data['vault_password']
    salt = os.urandom(16)
    key = derive_key(vault_password, salt)
    hashed_vault_password = bcrypt.hashpw(vault_password.encode(), bcrypt.gensalt()).decode()
    encrypted_seed_phrase = encrypt(mnemonic, key)

    # Generate authenticator secret (for future use with 2FA)
    authenticator_secret = generate_authenticator_secret()

    # Save to MongoDB
    user = User(
        name=data['name'],
        email=data['email'],
        hashed_vault_password=hashed_vault_password,
        encrypted_seed_phrase=encrypted_seed_phrase,
        salt=salt.hex(),
        authenticator_secret=authenticator_secret
    )
    db.users.insert_one(user.to_dict())

    return jsonify({"message": "User registered successfully!", "mnemonic": mnemonic})


@user_routes.route('/login', methods=['POST'])
def login():
    db = current_app.config['db']
    data = request.json

    # Fetch user details from the database
    user_data = db.users.find_one({"email": data['email']})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    user = User.from_dict(user_data)
    key = derive_key(data['vault_password'], bytes.fromhex(user.salt))
    decrypted_seed_phrase = decrypt(user.encrypted_seed_phrase, key)

    if decrypted_seed_phrase != data['seed_phrase']:
        return jsonify({"error": "Invalid seed phrase"}), 401

    return jsonify({"message": "Login successful!","private_key":user.encrypted_seed_phrase})


@user_routes.route('/authenticate-vault', methods=['POST'])
def authenticate_vault():
    db = current_app.config['db']
    data = request.json

    # Fetch user details from the database
    user_data = db.users.find_one({"email": data['email']})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    user = User.from_dict(user_data)
    if not bcrypt.checkpw(data['vault_password'].encode(), user.hashed_vault_password.encode()):
        return jsonify({"error": "Invalid vault password"}), 401

    return jsonify({"message": "Vault authenticated!"})


@user_routes.route('/generate-otp', methods=['POST'])
def generate_otp():
    db = current_app.config['db']
    data = request.json

    # Generate and store a new OTP secret
    secret = generate_authenticator_secret()
    db.users.update_one({"email": data['email']}, {"$set": {"authenticator_secret": secret}})

    return jsonify({"otp_secret": secret})


@user_routes.route('/verify-otp', methods=['POST'])
def verify_user_otp():
    db = current_app.config['db']
    data = request.json

    # Fetch user details from the database
    user_data = db.users.find_one({"email": data['email']})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    secret = user_data['authenticator_secret']
    otp = data['otp']

    if verify_otp(secret, otp):
        return jsonify({"message": "OTP verified successfully!"})
    else:
        return jsonify({"error": "Invalid OTP"}), 401


# Initialize app and routes
app.register_blueprint(user_routes, url_prefix='/api/users')

# Placeholder for database initialization
@app.before_first_request
def initialize_database():
    # Initialize your MongoDB or other database here
    app.config['db'] = None  # Replace None with your actual database initialization logic


if __name__ == '__main__':
    app.run(debug=True)
