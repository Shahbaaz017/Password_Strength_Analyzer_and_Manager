from flask import Flask
from routes.user_routes import user_routes
from pymongo import MongoClient
from routes.password_routes import password_routes  # Import password routes from the separate file
from services.encryption import derive_key, encrypt, decrypt
from models.user import User
from flask_cors import CORS
  # Enable CORS for all routes

import os
app = Flask(__name__)
CORS(app)

# Configurations
app.config['MONGO_URI'] = "mongodb://localhost:27017/password_manager"  # MongoDB URI
app.config['SECRET_KEY'] = 'your-secret-key'

# Database connection
client = MongoClient(app.config['MONGO_URI'])
app.config['db'] = client.password_manager

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/users')
app.register_blueprint(password_routes, url_prefix='/api/passwords')

if __name__ == '__main__':
    app.run(debug=True)
