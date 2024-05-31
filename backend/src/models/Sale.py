from extensions import db

class Sale(db.Model):
    __tablename__ = 'sales'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    ticket_quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, default=db.func.current_timestamp())
    payment_method = db.Column(db.String(), nullable=False)
    state = db.Column(db.String(), nullable=False, default='pending')

    def __repr__(self):
        return f'<Sale {str(self.id)} {str(self.user_id)} {str(self.movie_id)} {str(self.purchase_date)} {str(self.is_active)}>'


    def save(self):
        '''
        Save the sale in the database
        '''
        db.session.add(self)
        db.session.commit()


    def delete(self):
        '''
        Delete the sale from the database
        '''
        db.session.delete(self)
        db.session.commit()


    def to_dict(self):
        return {
            'id': self.id,
            'ticket_quantity': self.ticket_quantity,
            'total_price': self.total_price,
            'created_at': self.created_at,
            'payment_method': self.payment_method,
            'state': self.state
        }