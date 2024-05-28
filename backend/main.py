from flask import Flask
from flask_cors import CORS
from extensions import db, jwt
from src.routes import Auth, Movies
from dotenv import load_dotenv

def create_app():

    load_dotenv()

    app = Flask(__name__)
    CORS(app, origins='*')

    app.config.from_prefixed_env()

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)

    # Register auth blueprint
    app.register_blueprint(Auth.auth_bp, url_prefix='/auth')
    app.register_blueprint(Movies.movies_bp, url_prefix='/movies')

    return app
