from services.encryption import derive_key, encrypt, decrypt
from models.password_model import Password
from flask import Blueprint, request, jsonify, current_app

password_routes = Blueprint('password_routes', __name__)

# Add a new password to the vault
@password_routes.route('/add', methods=['POST'])
def add_password():
    db = current_app.config['db']
    data = request.json

    # Fetch the user from the database
    user_data = db.users.find_one({"email": data['email']})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    # Derive the key from the vault password
    key = derive_key(data['vault_password'], bytes.fromhex(user_data['salt']))

    # Encrypt the password and store it
    encrypted_password = encrypt(data['password'], key)
    password = Password(data['email'], data['password_name'], encrypted_password)
    db.passwords.insert_one(password.to_dict())

    return jsonify({"message": "Password added successfully!"})

# Retrieve a password from the vault
@password_routes.route('/get', methods=['POST'])
def get_password():
    db = current_app.config['db']
    data = request.json

    # Fetch the user from the database
    user_data = db.users.find_one({"email": data['email']})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    # Fetch the password from the vault
    password_data = db.passwords.find_one({"user_id": data['email'], "password_name": data['password_name']})
    if not password_data:
        return jsonify({"error": "Password not found"}), 404

    # Derive the key from the vault password
    key = derive_key(data['vault_password'], bytes.fromhex(user_data['salt']))

    # Decrypt the password
    decrypted_password = decrypt(password_data['encrypted_password'], key)
    
    return jsonify({"password": decrypted_password})
@password_routes.route('/get-all', methods=['POST'])
def get_all_passwords():
    db = current_app.config['db']
    data = request.json

    # Fetch the user from the database
    user_data = db.users.find_one({"email": data['email']})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    # Fetch all passwords for the user from the vault
    passwords_data = db.passwords.find({"user_id": data['email']})
    if not passwords_data:
        return jsonify({"error": "No passwords found"}), 404

    # Decrypt each password before sending it to the client
    passwords = []
    for password_data in passwords_data:
        key = derive_key(data['vault_password'], bytes.fromhex(user_data['salt']))
        decrypted_password = decrypt(password_data['encrypted_password'], key)
        passwords.append({
            "website": password_data['password_name'],
            "username": password_data['user_id'],
            "password": decrypted_password,
            "link": f"https://www.{password_data['password_name'].lower()}.com",  # You can customize this for each website
        })

    return jsonify({"passwords": passwords})
