#!/usr/bin/env python3

# Standard library imports
import os

# Remote library imports
from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Flask


# Local imports
from dotenv import load_dotenv
from igdb_requests import fetch_games

load_dotenv()


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
api = Api(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')


from models import User, Game, Review

# Routes
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/games', methods=['GET'])
def games():
    game_data = fetch_games()
    return jsonify(game_data)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
