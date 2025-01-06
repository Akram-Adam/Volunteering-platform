""" This file is for the user routes  for profile and user data  including the login and registeration """
from flask import blueprints, request, jsonify
from app.models import db_session
from app.validators import ERROR_EVENT
from app.validators.User import *
from app.models.user import User
import jwt



# import data validation


USER = blueprints('User', __name__) # Create the user blueprint








def generate_jwt(USER):
    """
    Generate a JWT with user email and expiry.
    """
    payload = {
        "USER": USER,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, "your_secret_key", algorithm="HS256") # dont forget to change the secret key


def verify_jwt(token):
    """
    Verify a JWT and return the payload if valid.
    """
    try:
        return jwt.decode(token, "your_secret_key", algorithms=["HS256"]) # dont forget to change the secret key
    except jwt.ExpiredSignatureError:
        return None  # Token expired
    except jwt.InvalidTokenError:
        return None  # Invalid token


@USER.route('/log-in', methods=['POST']) # this is the login route for the user Done
def log_in():

    data = request.json
    email = data.get("email")
    password = data.get("password")

    # check if the email and password are not None
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    UserData = User.login(email, password)

    if UserData:
        # Generate JWT
        token = generate_jwt(email)
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401


@USER.route('/sign-up', methods=['POST'])
def sign_up():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    conformingpassword = data.get("conformingpassword")
    phone = data.get("phone")
    if not isinstance(emailSignUpvalidaton(email), ERROR_EVENT):
        if not isinstance(check_password_validation(password, conformingpassword), ERROR_EVENT):
            if not phoneSignUpvalidaton(phone):
            # create the user
                new_user = User(email=email, password=password, phone=phone)
                db_session.new(new_user)
                db_session.save()
                return jsonify({"message": "User created successfully"}), 201
            return jsonify({"message": "Phone is not valid"}), 400
        
        return jsonify({"message": "Password is not valid"}), 400
    return jsonify({"message": "Email is not valid"}), 400


@USER.route('/reset-password', methods=['PUT'])



@USER.route('/forgot-password', methods=['POST'])



@USER.route('/Listprofiles', methods=['GET'])



@USER.route('/createprofile', methods=['POST'])



@USER.route('/updateprofile', methods=['PUT'])



@USER.route('/deleteprofile', methods=['DELETE'])



@USER.route('/chooseprofile', methods=['GET'])














@USER.route('/profile', methods=['GET'])
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





