from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.orm import validates
from datetime import datetime

# Models
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), index=True, unique=True, nullable=False)
    username = db.Column(db.String(40), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    # Relationships
    reviews = db.relationship('Review', backref='author')
    favorites = db.relationship('Favorite', backref='user')

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

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    igdb_game_id = db.Column(db.Integer, nullable=False)  # ID from my api - IGDB
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.utcnow) 

    def __repr__(self):
        return f'Favorite ID: {self.id}, IGDB Game ID: {self.igdb_game_id}, User ID: {self.user_id}'

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    igdb_game_id = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)  # Assuming difficulty is an integer
    graphics = db.Column(db.Integer, nullable=False)
    gameplay = db.Column(db.Integer, nullable=False)
    storyline = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
