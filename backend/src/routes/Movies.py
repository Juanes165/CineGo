from flask import Blueprint, jsonify, request
from src.models.Movie import Movie

movies_bp = Blueprint('movies', __name__)

@movies_bp.post('/')
def create_movie():
    """
    Create a new movie
    ---
    tags:
      - movies

    requestBody:
        required: true
        content:
            application/json:
            schema:
                type: object
                properties:
                title:
                    type: string
                duration:
                    type: integer
                genre:
                    type: string
                image_url:
                    type: string
    
    responses:
        201:
            description: Movie created succesfully
        400:
            description: All fields are required
        500:
            description: Internal server error
    """
    data = request.get_json()

    # Validate the data
    if not data.get('title') or not data.get('duration') or not data.get('genre'):
        return jsonify({'message': 'All fields are required'}), 400

    try:
        new_movie = Movie(
            title=data.get('title'),
            duration=data.get('duration'),
            genre=data.get('genre'),
            image_url=data.get('image_url')
        )
        new_movie.save()
    except Exception as e:
        return jsonify({'message': str(e)}), 500

    return jsonify({ 'message': 'Movie added succesfully'}), 201


@movies_bp.get('/')
def get_movies():
    """
    Get all movies
    ---
    tags:
      - movies

    responses:
        200:
            description: A list of movies
        500:
            description: Internal server error
    """
    movies = Movie.query.all()
    return jsonify([movie.to_dict() for movie in movies])


@movies_bp.get('/<int:id>')
def get_movie(id):
    """
    Get a movie by id
    ---
    tags:
      - movies

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    responses:
        200:
            description: A movie
        404:
            description: Movie not found
        500:
            description: Internal server error
    """
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    return jsonify(movie.to_dict())


@movies_bp.put('/<int:id>')
def update_movie(id):
    """
    Update a movie by id
    ---
    tags:
      - movies

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    requestBody:
        required: true
        content:
            application/json:
            schema:
                type: object
                properties:
                title:
                    type: string
                duration:
                    type: integer
                genre:
                    type: string
                image_url:
                    type: string
    
    responses:
        200:
            description: Movie updated succesfully
        400:
            description: All fields are required
        404:
            description: Movie not found
        500:
            description: Internal server error
    """
    data = request.get_json()

    movie = Movie.query.get(id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404

    # Validate the data
    if not data.get('title') or not data.get('duration') or not data.get('genre'):
        return jsonify({'message': 'All fields are required'}), 400

    try:
        movie.title = data.get('title')
        movie.duration = data.get('duration')
        movie.genre = data.get('genre')
        movie.image_url = data.get('image_url')
        movie.save()
    except Exception as e:
        return jsonify({'message': str(e)}), 500

    return jsonify({ 'message': 'Movie updated succesfully'}), 200


@movies_bp.patch('/<int:id>')
def toggle_movie(id):
    """
    Toggle a movie by id
    ---
    tags:
      - movies

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    responses:
        200:
            description: Movie toggled succesfully
        404:
            description: Movie not found
        500:
            description: Internal server error
    """
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404

    movie.is_active = not movie.is_active
    movie.save()
    return jsonify({ 'message': 'Movie toggled succesfully'}), 200


@movies_bp.delete('/<int:id>')
def delete_movie(id):
    """
    Delete a movie by id
    ---
    tags:
      - movies

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    responses:
        200:
            description: Movie deleted succesfully
        404:
            description: Movie not found
        500:
            description: Internal server error
    """
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404

    movie.delete()
    return jsonify({ 'message': 'Movie deleted succesfully'}), 200