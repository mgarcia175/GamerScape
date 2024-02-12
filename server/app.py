import os
from dotenv import load_dotenv
from flask import request, jsonify, session
from igdb_requests import fetch_games, fetch_game_details
from models import User
from config import app, api, db, bcrypt
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

@app.route('/games/<int:game_id>')
def get_game_details(game_id):
    game_details = fetch_game_details(game_id)
    return jsonify(game_details)

@app.route('/login', methods=['POST'])
def login():
    # Get email and password from request
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    # Check if user exists and password is correct
    if user and bcrypt.check_password_hash(user.password_hash, password):
        # Authentication successful, set user_id in session
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401


@app.route('/logout')
def logout():
    session.pop('user_id', None)  # Remove user_id from session
    # or use session.clear() to remove everything in the session
    return jsonify({'message': 'You have been logged out'}), 200





if __name__ == '__main__':
    app.run(port=5555, debug=True)
