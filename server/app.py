import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from models import User, Review
from config import app, db, bcrypt

# Load environment variables
load_dotenv()

# Bcrypt initialization (if not already done in config.py)
bcrypt = Bcrypt(app)

# Secret key for session management
app.secret_key = os.getenv('SECRET_KEY')

# API Resource Routes


@app.route('/')
def index():
    return '<h1>Welcome to the Project Server</h1>'

@app.route('/games', methods=['GET'])
def games():
    # Implementation for fetching games
    return jsonify({'message': 'Games endpoint'})

@app.route('/games/<int:game_id>')
def get_game_details(game_id):
    # Implementation for fetching game details
    return jsonify({'message': 'Game details endpoint'})

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
    igdb_game_id = data.get('igdb_game_id')
    rating = data.get('rating')
    comment = data.get('comment')

    if not all([igdb_game_id, rating, comment]):
        return jsonify({'message': 'Missing data for review submission'}), 400

    new_review = Review(
        user_id=user_id,
        igdb_game_id=igdb_game_id,
        rating=rating,
        comment=comment
    )
    db.session.add(new_review)
    try:
        db.session.commit()
        return jsonify({'message': 'Review submitted successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error submitting review', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5555, debug=True)
