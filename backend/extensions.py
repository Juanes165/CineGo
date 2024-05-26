from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Database instance
db = SQLAlchemy()

# JWT Manager instance
jwt = JWTManager()