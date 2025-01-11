from flask import Blueprint, request, jsonify
from services.encryption import derive_key, encrypt, decrypt
from services.authenticator import generate_authenticator_secret, verify_otp
from models.user import User
import bcrypt
import secrets

user_routes = Blueprint('user_routes', __name__)

# Register User Route
@user_routes.route('/register', methods=['POST'])
def register():
    db = user_routes.current_app.config['db']
    data = request.json

    # Generate 12-word mnemonic seed phrase
    mnemonic = " ".join([secrets.choice(["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine"]) for _ in range(12)])

    # Hash vault password and encrypt seed phrase
    vault_password = data['vault_password']
    salt = os.urandom(16)
    key = derive_key(vault_password, salt)
    hashed_vault_password = bcrypt.hashpw(vault_password.encode(), bcrypt.gensalt()).decode()
    encrypted_seed_phrase = encrypt(mnemonic, key)

    # Generate authenticator secret (for future use with 2FA)
    authenticator_secret = generate_authenticator_secret()

    # Save to MongoDB
    user = User(data['name'], data['email'], hashed_vault_password, encrypted_seed_phrase, salt.hex(), authenticator_secret)
    db.users.insert_one(user.to_dict())

    return jsonify({"message": "User registered successfully!", "mnemonic": mnemonic})

# Login User Route
@user_routes.route('/login', methods=['POST'])
def login():
    db = user_routes.current_app.config['db']
    data = request.json

    user_data = db.users.find_one({"email": data['email']})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    user = User.from_dict(user_data)
    key = derive_key(data['seed_phrase'], bytes.fromhex(user.salt))
    decrypted_seed_phrase = decrypt(user.encrypted_seed_phrase, key)

    if decrypted_seed_phrase != data['seed_phrase']:
        return jsonify({"error": "Invalid seed phrase"}), 401

    return jsonify({"message": "Login successful!"})

# Authenticate Vault Route
@user_routes.route('/authenticate-vault', methods=['POST'])
def authenticate_vault():
    db = user_routes.current_app.config['db']
    data = request.json

    user_data = db.users.find_one({"email": data['email']})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    user = User.from_dict(user_data)
    if not bcrypt.checkpw(data['vault_password'].encode(), user.hashed_vault_password.encode()):
        return jsonify({"error": "Invalid vault password"}), 401

    return jsonify({"message": "Vault authenticated!"})
