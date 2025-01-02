from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta



app = Flask(__name__)
# app.config.from_object('config.Config')

CORS(app)  # Enable CORS to allow frontend to communicate with the backend


def generate_jwt(email):
    """
    Generate a JWT with user email and expiry.
    """
    payload = {
        "email": email,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, "your_secret_key", algorithm="HS256")


def verify_jwt(token):
    """
    Verify a JWT and return the payload if valid.
    """
    try:
        return jwt.decode(token, "your_secret_key", algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None  # Token expired
    except jwt.InvalidTokenError:
        return None  # Invalid token


@app.route('/log-in', methods=['POST'])
def log_in():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if email in users and users[email] == password:
        # Generate JWT
        token = generate_jwt(email)
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401


@app.route('/sign-up', methods=['POST'])
def sign_up():
    return


@app.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get("Authorization", "").split("Bearer ")[-1]
    if not token:
        return jsonify({"message": "Token is missing"}), 401

    # Verify token
    user_data = verify_jwt(token)
    # if user_data:
        # return jsonify({"email": user_data["email"], "profile": "User profile data"}), 200
        # here we will be returning the data that currosponds with the needs of the profile of the user
    return jsonify({"message": "Invalid or expired token"}), 401


if __name__ == '__main__':
    app.run(debug = True)
