from flask import Flask
from flask_cors import CORS
from extensions import db, jwt
from auth import auth_bp

def create_app():

    app = Flask(__name__)
    CORS(app, origins='*')

    app.config.from_prefixed_env()

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)

    # Register auth blueprint
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app
