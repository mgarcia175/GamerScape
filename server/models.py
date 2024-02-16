from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt  # Make sure db and bcrypt are correctly initialized in config.py
from sqlalchemy.orm import validates
from datetime import datetime

# User Model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(40), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    # Relationships
    reviews = db.relationship('Review', backref='author', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

    @validates('email', 'username')
    def validate_email_username(self, key, value):
        if key == 'email' and ('@' not in value or '.' not in value):
            raise ValueError("Invalid email format")
        if key == 'username' and len(value) < 3:
            raise ValueError("Username must be at least 3 characters long")
        return value

# Game Model
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.Text, nullable=False)

    # Relationship with Review
    reviews = db.relationship('Review', backref='game', lazy='dynamic')

# Review Model
class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=True)
    igdb_game_id = db.Column(db.String, nullable=True)
    difficulty = db.Column(db.Integer)
    graphics = db.Column(db.Integer)
    gameplay = db.Column(db.Integer)
    storyline = db.Column(db.Integer)
    review = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
