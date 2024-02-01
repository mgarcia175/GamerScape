from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

from config import db

# Models go here!

class User(db.model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), index=True, unique=True, nullable=False)
    email = db.Column(db.String(100), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(100))

    reviews = db.relationship('Review', backref='author')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def _repr__(self):
        return f'User: {self.username}, ID: {self.id}'


class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.string(110), nullable=False)
    genre = db.Column(db.string(50))
    developer = db.Column(db.String(50))
    release_date = db.Column(db.Date)

    #Review relationship
    reviews = db.relationship('Review', backref='game')

    def __repr__(self):
        return f'Game Title: {self.title}'



