import os
from dotenv import load_dotenv
from flask import jsonify
from igdb_requests import fetch_games
from models import User

from config import app, api, db
from resources.signup import Signup

# Load environment variables
load_dotenv()

# API Resource Routes
api.add_resource(Signup, '/api/signup')



@app.route('/')
def index():
    return '<h1>Welcome to the Project Server</h1>'

@app.route('/games', methods=['GET'])
def games():
    game_data = fetch_games()
    return jsonify(game_data)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
