import os

from dotenv import load_dotenv
from igdb_requests import fetch_games
from flask import jsonify

load_dotenv()

from config import app

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
