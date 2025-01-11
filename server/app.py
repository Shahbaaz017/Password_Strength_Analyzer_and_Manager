from flask import Flask
from routes.user_routes import user_routes
from pymongo import MongoClient



app = Flask(__name__)

# Configurations
app.config['MONGO_URI'] = "mongodb://localhost:27017/password_manager"  # MongoDB URI
app.config['SECRET_KEY'] = 'your-secret-key'

# Database connection
client = MongoClient(app.config['MONGO_URI'])
app.config['db'] = client.password_manager

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/users')

if __name__ == '__main__':
    app.run(debug=True)
