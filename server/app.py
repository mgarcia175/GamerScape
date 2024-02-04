#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_migrate import Migrate

# Local imports
from dotenv import load_dotenv
import os

load_dotenv()

from flask import Flask, jsonify
from igdb_requests import fetch_games  # Adjust import path as needed

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from db import db

migrate = Migrate(app, db)
api = Api(app)

from models import User, Game, Review

# Routes
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/games')
def games():
    game_data = fetch_games()
    return render_template('games.html', games=game_data)







# #API TEST
# @app.route('/test-igdb')
# def test_igdb():
#     access_token = "kftq7gz858kcl8mk0d1pow9yaq4e75" #Access Token that was obtained
#     games = fetch_games(access_token)
#     return jsonify(games)  # Convert the list of games to JSON and return it
# #API TEST

if __name__ == '__main__':
    app.run(port=5555, debug=True)