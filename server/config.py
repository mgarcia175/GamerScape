from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
import os

#Environment variable
from dotenv import load_dotenv
load_dotenv()

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Secret key from .env
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt(app)
db.init_app(app)

migrate = Migrate(app, db)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})