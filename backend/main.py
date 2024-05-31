from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from extensions import db, jwt, getconn
from src.routes import Auth, Movies, Users, Sales
from dotenv import load_dotenv
from src.models.Movie import Movie

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


@app.route('/health')
def health():
    return 'OK'


@app.route('/json')
def json():
    return jsonify({'message': 'Hello, World!'})


@app.route('/health/db')
def health_db():
    try:
        db.session.execute('SELECT 1')
        return {'status': 'OK'}
    except Exception as e:
        return str(e)


@app.route('/movies/get')
@cross_origin()
def get_movies_eg():
    movies = Movie.query.all()
    return jsonify([movie.to_dict() for movie in movies])


if __name__ == '__main__':
    app.run(debug=True)