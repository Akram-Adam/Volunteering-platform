from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
# from routes.User import USER
from models.user import User
from models import db_session


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your-secret-key'

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    app.register_blueprint(USER, url_prefix='/user')
    # app.register_blueprint(volunteer_bp, url_prefix='/api/volunteers')
    # app.register_blueprint(auth_bp, url_prefix='/api/auth')
    # app.register_blueprint(event_bp, url_prefix='/api/events')
    # add more blueprints here

    return app

# app = create_app()


# def generate_jwt(email):
#     """
#     Generate a JWT with user email and expiry.
#     """
#     payload = {
#         "email": email,
#         "exp": datetime.utcnow() + timedelta(hours=1)
#     }
#     return jwt.encode(payload, "your_secret_key", algorithm="HS256")


# def verify_jwt(token):
#     """
#     Verify a JWT and return the payload if valid.
#     """
#     try:
#         return jwt.decode(token, "your_secret_key", algorithms=["HS256"])
#     except jwt.ExpiredSignatureError:
#         return None  # Token expired
#     except jwt.InvalidTokenError:
#         return None  # Invalid token


# @app.route('/log-in', methods=['POST'])
# def log_in():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     if email in users and users[email] == password:
#         # Generate JWT
#         token = generate_jwt(email)
#         return jsonify({"token": token}), 200
#     return jsonify({"message": "Invalid credentials"}), 401


# @app.route('/sign-up', methods=['POST'])
# def sign_up():
#     return


# @app.route('/profile', methods=['GET'])
# def profile():
#     token = request.headers.get("Authorization", "").split("Bearer ")[-1]
#     if not token:
#         return jsonify({"message": "Token is missing"}), 401

#     # Verify token
#     user_data = verify_jwt(token)
#     # if user_data:
#         # return jsonify({"email": user_data["email"], "profile": "User profile data"}), 200
#         # here we will be returning the data that currosponds with the needs of the profile of the user
#     return jsonify({"message": "Invalid or expired token"}), 401


if __name__ == '__main__':

    # app.run(debug = True)

    # test user data
    db_session.reload()

    data_user = User(email="test@gmail.com", password="test123@123#TEST",
                     frist_name="test", last_name="test", phone_number="1234567890",
                     address="test address", city="test city", state="test state", zip_code="12345")
    data_user.save()
