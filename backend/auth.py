from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token
from models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.post('/register')
def register_user():
    """
    Register a new user in the database
    ---
    tags:
      - auth

    requestBody:
        required: true
        content:
            application/json:
            schema:
                type: object
                properties:
                email:
                    type: string
                name:
                    type: string
                last_name:
                    type: string
                phone:
                    type: string
                password:
                    type: string
    
    responses:
        201:
            description: User created succesfully
        409:
            description: User already exists
        500:
            description: Internal server error
    """
    data = request.get_json()

    user = User.get_user_by_email(data.get('email'))

    if user:
        return jsonify({'message': 'User already exists'}), 409
    
    try:
        new_user = User(
            email=data.get('email'),
            name=data.get('name'),
            last_name=data.get('last_name'),
            phone=data.get('phone')
        )
        new_user.set_password(data.get('password'))
        new_user.save()

        return jsonify({'message': 'User created succesfully'}), 201
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    


@auth_bp.post('/login')
def login_user():
    """
    Log in a user and return a JWT token
    """
    data = request.get_json()

    user = User.get_user_by_email(data.get('email'))

    if not user or not user.check_password(data.get('password')):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    access_token = create_access_token(identity=user.email)
    refresh_token = create_refresh_token(identity=user.email)

    return jsonify(
        {
            'message': 'Logged In Succesfully',
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    ), 200