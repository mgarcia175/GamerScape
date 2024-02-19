import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from models import User, Review, Game
from config import app, db, bcrypt
import requests
from igdb_requests import fetch_games, fetch_game_details, search_igdb_games, fetch_igdb_game_title

# Load environment variables
load_dotenv()

# Bcrypt initialization (if not already done in config.py)
bcrypt = Bcrypt(app)

# Secret key for session management
app.secret_key = os.getenv('SECRET_KEY')





@app.route('/api/signup', methods=['POST'])
def signup():
    json_data = request.get_json()

    if User.query.filter((User.username == json_data.get('username')) | (User.email == json_data.get('email'))).first():
        return jsonify({"message": "A user with that username or email already exists"}), 409

    try:
        user = User(
            username=json_data.get('username'),
            email=json_data.get('email')
        )
        user.set_password(json_data.get('password'))

        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        return jsonify({"message": "User created successfully", "user": user.to_dict()}), 201

    except Exception as err:
        db.session.rollback()
        return jsonify({"errors": str(err)}), 422

# Error handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.route('/')
def index():
    return '<h1>Welcome to the Project Server</h1>'

@app.route('/search_games')
def search_games():
    query = request.args.get('query')
    games_data = search_igdb_games(query)
    if games_data:
        return jsonify(games_data)
    else:
        return jsonify({'error': 'Failed to fetch games from IGDB'}), 500

@app.route('/games', methods=['GET'])
def games():
    games_data = fetch_games()
    return jsonify(games_data)

@app.route('/api/games', methods=['POST'])
def create_game():
    data = request.get_json()
    new_game = Game(title=data['title'], genre=data['genre'], summary=data['summary'])
    db.session.add(new_game)
    db.session.commit()
    return jsonify({
        'game_id': new_game.id,
        'title': new_game.title,
        'genre': new_game.genre,
        'summary': new_game.summary,
        'message': 'Game created successfully'
    }), 201

@app.route('/api/games/<int:game_id>', methods=['GET'])
def game_details(game_id):
    game_detail = fetch_game_details(game_id)
    return jsonify(game_detail)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/check_login_status')
def check_login_status():
    if 'user_id' in session:
        return jsonify({'logged_in': True}), 200
    else:
        return jsonify({'logged_in': False}), 200

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('user_id', None)  # Remove user_id from session
    return jsonify({'message': 'You have been logged out'}), 200

@app.route('/api/reviews', methods=['POST'])
def submit_review():
    if 'user_id' not in session:
        return jsonify({'message': 'Authentication required'}), 401

    data = request.get_json()
    user_id = session.get('user_id')

    game_id = None
    igdb_game_id = None

    print(data)

    if 'game_id' in data and data['game_id']:
        try:
            game_id = data['game_id']
        except ValueError:
            return jsonify({'message': 'Invalid game identifier'}), 400
    elif 'igdb_game_id' in data:
        igdb_game_id = data['igdb_game_id']

    if not game_id and not igdb_game_id:
        return jsonify({'message': 'Game identifier missing'}), 400

    try:
        new_review = Review(
            user_id=user_id,
            game_id=game_id,
            igdb_game_id=igdb_game_id,
            difficulty=data.get('difficulty'),
            graphics=data.get('graphics'),
            gameplay=data.get('gameplay'),
            storyline=data.get('storyline'),
            review=data.get('review')
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify({'message': 'Review submitted successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error submitting review', 'error': str(e)}), 500

@app.route('/user_profile', methods=['GET'])
def get_user_profile():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'message': 'User not logged in'}), 401

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    user_data = {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "reviews": []
    }

    reviews = Review.query.filter_by(user_id=user_id).all()
    for review in reviews:
        review_data = {
            'id': review.id,
            'difficulty': review.difficulty,
            'graphics': review.graphics,
            'gameplay': review.gameplay,
            'storyline': review.storyline,
            'review': review.review,
            'created_at': review.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

        if review.game_id:
            game = Game.query.get(review.game_id)
            review_data['game_title'] = game.title if game else 'Game not found'
            review_data['genre'] = game.genre if game else 'N/A'
        elif review.igdb_game_id:
            # This is a placeholder for the actual IGDB API call, which would set the game title
            # You'll need to implement fetch_igdb_game_title to make an API request to IGDB
            review_data['game_title'] = fetch_igdb_game_title(review.igdb_game_id)
            # IGDB genre and other details would be similarly fetched and set here
        else:
            review_data['game_title'] = 'N/A'

        user_data['reviews'].append(review_data)

    return jsonify(user_data)




if __name__ == '__main__':
    app.run(port=5555, debug=True)