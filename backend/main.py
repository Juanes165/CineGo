from flask import Flask
from flask_cors import CORS
from extensions import db, jwt, getconn
from src.routes import Auth, Movies, Users, Sales
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config.from_prefixed_env()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+pg8000://'
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'creator': getconn
}

# Initialize extensions
db.init_app(app)
jwt.init_app(app)

# Register auth blueprint
app.register_blueprint(Auth.auth_bp)
app.register_blueprint(Movies.movies_bp)
app.register_blueprint(Users.user_bp)
app.register_blueprint(Sales.sale_bp)

@app.route('/')
def index():
    return 'Welcome to the CineGo API'


if __name__ == '__main__':
    app.run(debug=True)