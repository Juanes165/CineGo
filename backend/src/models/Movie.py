from extensions import db

class Movie(db.Model):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float(), nullable=False)
    genre = db.Column(db.String(), nullable=False)
    image_url = db.Column(db.String())
    is_active = db.Column(db.Boolean, default=True)


    def __repr__(self):
        return f'<Movie {self.title} {str(self.duration)} {self.genre} {self.image_url} {str(self.id)}>'


    def save(self):
        '''
        Save the movie in the database
        '''
        db.session.add(self)
        db.session.commit()


    def delete(self):
        '''
        Delete the movie from the database
        '''
        db.session.delete(self)
        db.session.commit()


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'duration': self.duration,
            'price': self.price,
            'genre': self.genre,
            'image_url': self.image_url,
            'is_active': self.is_active
        }