from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from src.models.User import User

user_bp = Blueprint('users', __name__, url_prefix='/users')

@user_bp.get('/all')
@cross_origin()
def get_all_users():
    """
    Get all users from the database
    ---
    tags:
      - users

    responses:
        200:
            description: All users
        500:
            description: Internal server error
    """
    users = User.query.all()

    return jsonify([user.to_dict() for user in users]), 200


@user_bp.get('/<int:id>')
@cross_origin()
def get_user(id):
    """
    Get a user by id
    ---
    tags:
      - users

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    responses:
        200:
            description: A user
        404:
            description: User not found
        500:
            description: Internal server error
    """
    user = User.query.get(id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify(user), 200


@user_bp.patch('toggleactive/<int:id>')
@cross_origin()
def toggle_active(id):
    """
    Toggle user active status
    ---
    tags:
      - users

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    responses:
        200:
            description: User active status toggled
        404:
            description: User not found
        500:
            description: Internal server error
    """
    user = User.query.get(id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    try:
        user.is_active = not user.is_active
        user.save()
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

    return jsonify({ 'message': 'User updated succesfully' }), 200