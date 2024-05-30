from flask import Blueprint, jsonify, request
from src.models.Movie import Movie
from src.services.StorageService import StorageService
import time

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
            multipart/form-data:
            schema:
                type: object
                properties:
                title:
                    type: string
                description:
                    type: string
                duration:
                    type: integer
                price:
                    type: number
                genre:
                    type: string
                image:
                    type: string
    
    responses:
        201:
            description: Movie created succesfully
        400:
            description: All fields are required
        500:
            description: Internal server error
    """
    title = request.form.get('title')
    description = request.form.get('description')
    duration = request.form.get('duration')
    price = request.form.get('price')
    genre = request.form.get('genre')
    image = request.files.get('image')

    # Validate the data
    if not title or not description or not duration or not price or not genre or not image:
        return jsonify({'message': 'All fields are required'}), 400
    
    # File name in storage, format title_date_time.extension
    # e.g. 'the_godfather_2021_09_01_at_12_00_00.jpg'
    file_title = title.replace(' ', '_').lower()
    date_time = time.strftime("%Y_%m_%d_at_%H_%M_%S")
    extension = image.content_type.split('/')[1]
    filename = f"{file_title}_{date_time}.{extension}"

    image_url = StorageService.upload_file(image, filename)

    try:
        new_movie = Movie(
            title=title,
            description=description,
            duration=duration,
            price=price,
            genre=genre,
            image_url=image_url
        )
        new_movie.save()
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

    return jsonify({ 'message': 'Movie added succesfully'}), 201


@movies_bp.get('/search/')
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
    movies = Movie.query.filter_by(is_active=True).all()
    return jsonify([movie.to_dict() for movie in movies])


@movies_bp.get('/search/<string:query>')
def search_movies(query):
    """
    Search movies by title
    ---
    tags:
      - movies

    parameters:
        - in: path
          name: query
          required: true
          schema:
            type: string

    responses:
        200:
            description: A list of movies
        500:
            description: Internal server error
    """
    
    movies = Movie.query.filter(Movie.title.ilike(f'%{query}%')).filter(Movie.is_active==True).all()
    return jsonify([movie.to_dict() for movie in movies])


@movies_bp.get('/all')
def get_all_movies():
    """
    Get all movies (including inactive)
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


@movies_bp.patch('/update/<int:id>')
def change_movie_basic_info(id):
    """
    Change basic info of a movie by id
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
                description:
                    type: string
                duration:
                    type: integer
                price:
                    type: number
                genre:
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
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'message': 'All fields are required'}), 400

    try:
        movie.title = data['title']
        movie.description = data['description']
        movie.duration = data['duration']
        movie.price = data['price']
        movie.genre = data['genre']
        movie.save()
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
    return jsonify({ 'message': 'Movie updated succesfully'}), 200


@movies_bp.post('/update/image/<int:id>')
def change_movie_image(id):
    """
    Change image of a movie by id
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
            multipart/form-data:
            schema:
                type: object
                properties:
                image:
                    type: string
    
    responses:
        200:
            description: Movie image updated succesfully
        400:
            description: Image is required
        404:
            description: Movie not found
        500:
            description: Internal server error
    """
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404

    image = request.files.get('image')
    if not image:
        return jsonify({'message': 'Image is required'}), 400

    # get the current url to delete the old image from storage
    # cut the url after .com
    current_image = movie.image_url.split('.com/')[-1]

    # File name in storage, format title_date_time.extension
    # e.g. 'the_godfather_2021_09_01_at_12_00_00.jpg'
    file_title = movie.title.replace(' ', '_').lower()
    date_time = time.strftime("%Y_%m_%d_at_%H_%M_%S")
    extension = image.content_type.split('/')[1]
    filename = f"{file_title}_{date_time}.{extension}"

    image_url = StorageService.upload_file(image, filename)
    StorageService.delete_file(current_image)

    try:
        movie.image_url = image_url
        movie.save()
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
    return jsonify({ 'message': 'Movie image updated succesfully', 'image_url': image_url}), 200


@movies_bp.patch('/toggle/<int:id>')
def toggle_movie(id):
    """
    Deactivate a movie by id
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
    
    try:
        movie.is_active = not movie.is_active
        movie.save()
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
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