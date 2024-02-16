import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from models import User, Review, Game
from config import app, db, bcrypt
import requests
from igdb_requests import fetch_games, fetch_game_details, search_igdb_games

# Load environment variables
load_dotenv()

# Bcrypt initialization (if not already done in config.py)
bcrypt = Bcrypt(app)

# Secret key for session management
app.secret_key = os.getenv('SECRET_KEY')

# API Resource Routes

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
    
    # Determine if the review is for an IGDB game or a user-created game
    igdb_game_id = data.get('igdb_game_id')
    game_id = data.get('game_id')

    try:
        new_review = Review(
            user_id=user_id,
            igdb_game_id=igdb_game_id if igdb_game_id else None,
            game_id=game_id if game_id else None,
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


#User info for profile page !!!!!Not working...!!!
@app.route('/user_profile', methods=['GET'])
def get_user_profile():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'message': 'User not logged in'}), 401
    
    user = User.query.filter_by(id=user_id).first()
    if user:
        # favorites
        favorites = Favorite.query.filter_by(user_id=user_id).all()
        favorites_data = [{'id': fav.id, 'igdb_game_id': fav.igdb_game_id, 'date_added': fav.date_added} for fav in favorites]
        
        # reviews
        reviews = Review.query.filter_by(user_id=user_id).all()
        reviews_data = [{'id': rev.id, 'comment': rev.comment, 'rating': rev.rating, 'igdb_game_id': rev.igdb_game_id, 'created_at': rev.created_at} for rev in reviews]
        
        # user info
        user_data = {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "favorites": favorites_data,
            "reviews": reviews_data,
        }
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'User not found'}), 404
#User info for profile page !!!!!Not working...!!!





if __name__ == '__main__':
    app.run(port=5555, debug=True)