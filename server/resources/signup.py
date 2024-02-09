# server/resources/signup.py

from flask import request, session
from flask_restful import Resource
from config import db
from models import User

class Signup(Resource):

    def post(self):
        json_data = request.get_json()

        if User.query.filter((User.username == json_data.get('username')) | (User.email == json_data.get('email'))).first():
            return {"message": "A user with that username or email already exists"}, 409

        try:
            user = User(
                username=json_data.get('username'),
                email=json_data.get('email')
            )
            user.set_password(json_data.get('password'))

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return {"message": "User created successfully", "user": user.to_dict()}, 201

        except Exception as err:
            db.session.rollback()  # Rollback session in case of an error
            return {"errors": str(err)}, 422