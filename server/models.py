from db import db
from sqlalchemy_serializer import SerializerMixin
from extensions import bcrypt
from sqlalchemy.orm import validates

# Models
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), index=True, unique=True, nullable=False)
    email = db.Column(db.String(100), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    reviews = db.relationship('Review', backref='author')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f'User: {self.username}, ID: {self.id}'
    
    @validates('username')
    def validate_username(self, key, username):

        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters long")
        return username

    @validates('email')
    def validate_email(self, key, email):

        if not email or '@' not in email:
            raise ValueError("Invalid email format. Please try again.")
        return email

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(110), nullable=False)
    genre = db.Column(db.String(50))
    developer = db.Column(db.String(50))
    release_date = db.Column(db.Date)

    #Review relationship
    reviews = db.relationship('Review', backref='game')

    def __repr__(self):
        return f'Game Title: {self.title}'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)

    def __repr__(self):
        return f'Review ID {self.id} by {self.user_id}| Game: {self.game_id} '