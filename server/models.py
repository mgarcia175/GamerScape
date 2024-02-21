from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
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
    reviews = db.relationship('Review', back_populates='user')
    games = db.relationship('Game', secondary='reviews', back_populates='users', overlaps="reviews")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    @validates('email', 'username')
    def validate_email_username(self, key, value):
        if key == 'email' and ('@' not in value or '.' not in value):
            raise ValueError("Invalid email format")
        if key == 'username' and len(value) < 3:
            raise ValueError("Username must be at least 3 characters long")
        return value

    def __repr__(self):
        return f'<User {self.username}>\n'


# Game Model
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.Text, nullable=False)

    # Relationship with Review
    reviews = db.relationship('Review', 
                              back_populates='game')
    users = db.relationship('User', secondary='reviews', back_populates='games', overlaps="reviews")

    def __repr__(self):
        return f'<Game Title: {self.title}>\n'

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

    # Relationship with User
    user = db.relationship('User', back_populates='reviews', overlaps="games,users")

    # Relationship with Game
    game = db.relationship('Game', back_populates='reviews', overlaps="games,users")

    def __repr__(self):
        return f"<{self.game} | Difficulty: {self.difficulty} | Graphics: {self.graphics} | Gameplay: {self.gameplay} | Storyline: {self.storyline} | Review Content: {self.review}>\n"