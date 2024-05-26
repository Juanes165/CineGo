from extensions import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash

# User model
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(), primary_key=True, default=str(uuid4()))
    email = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    password = db.Column(db.Text())


    def __repr__(self):
        return f'<User {self.email}>'
    

    def set_password(self, password):
        '''
        Set a given password in the database, the password is hashed before saving it

        Parameters:
            password (str): The password to be hashed and saved in the database
        '''
        self.password = generate_password_hash(password)


    def check_password(self, password):
        '''
        Check if the given password matches user password

        Parameters:
            password (str): The password to be checked

        Returns:
            bool: True if the password matches, False otherwise
        '''
        return check_password_hash(self.password, password)


    @classmethod
    def get_user_by_email(cls, email):
        '''
        Get a user by email

        Parameters:
            email (str): The email of the user to be fetched

        Returns:
            User: The user with the given email
        '''
        return cls.query.filter_by(email=email).first()
    

    def save(self):
        '''
        Save the user in the database
        '''
        db.session.add(self)
        db.session.commit()


    def delete(self):
        '''
        Delete the user from the database
        '''
        db.session.delete(self)
        db.session.commit()