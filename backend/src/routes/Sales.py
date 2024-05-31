from flask import Blueprint, jsonify, request
from src.models.Sale import Sale

sale_bp = Blueprint('sales', __name__, url_prefix='/sales')

@sale_bp.get('/all')
def get_all_sales():
    """
    Get all sales from the database
    ---
    tags:
      - sales

    responses:
        200:
            description: All sales
        500:
            description: Internal server error
    """
    sales = Sale.query.all()

    return jsonify([sale.to_dict() for sale in sales]), 200


@sale_bp.get('/<int:id>')
def get_sale(id):
    """
    Get a sale by id
    ---
    tags:
      - sales

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    responses:
        200:
            description: A sale
        404:
            description: Sale not found
        500:
            description: Internal server error
    """
    sale = Sale.query.get(id)

    if not sale:
        return jsonify({'error': 'Sale not found'}), 404

    return jsonify(sale), 200


@sale_bp.post('/create')
def create_sale():
    """
    Create a new sale in the database
    ---
    tags:
      - sales

    requestBody:
        required: true
        content:
            application/json:
            schema:
                type: object
                properties:
                user_id:
                    type: integer
                movie_id:
                    type: integer
                ticket_quantity:
                    type: integer
                total_price:
                    type: float

    responses:
        201:
            description: Sale created succesfully
        500:
            description: Internal server error
    """
    data = request.get_json()

    payment_method = data.get('payment_method')
    if payment_method == 'credit_card':
        state = 'approved'
    else:
        state = 'pending'

    new_sale = Sale(
        user_id=data.get('user_id'),
        movie_id=data.get('movie_id'),
        ticket_quantity=data.get('ticket_quantity'),
        total_price=data.get('total_price'),
        payment_method=data.get('payment_method'),
        state=state
    )

    new_sale.save()

    return jsonify(new_sale.to_dict()), 201


@sale_bp.get('/user/<int:id>')
def get_user_sales(id):
    """
    Get all sales from a user
    ---
    tags:
      - sales

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    responses:
        200:
            description: All sales from a user
        404:
            description: User not found
        500:
            description: Internal server error
    """
    sales = Sale.query.filter_by(user_id=id).all()

    if not sales:
        return jsonify({'error': 'User not found'}), 404

    return jsonify([sale.to_dict() for sale in sales]), 200


@sale_bp.get('/movie/<int:id>')
def get_movie_sales(id):
    """
    Get all sales from a movie
    ---
    tags:
      - sales

    parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer

    responses:
        200:
            description: All sales from a movie
        404:
            description: Movie not found
        500:
            description: Internal server error
    """
    sales = Sale.query.filter_by(movie_id=id).all()

    if not sales:
        return jsonify({'error': 'Movie not found'}), 404

    return jsonify([sale.to_dict() for sale in sales]), 200


@sale_bp.put('/<int:id>/update')
def update_sale(id):
    """
    Update a sale by id
    ---
    tags:
      - sales

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
                user_id:
                    type: integer
                movie_id:
                    type: integer
                ticket_quantity:
                    type: integer
                total_price:
                    type: float

    responses:
        200:
            description: Sale updated succesfully
        404:
            description: Sale not found
        500:
            description: Internal server error
    """
    data = request.get_json()

    sale = Sale.query.get(id)

    if not sale:
        return jsonify({'error': 'Sale not found'}), 404

    sale.state = data.get('state')

    sale.save()

    return jsonify(sale.to_dict()), 200