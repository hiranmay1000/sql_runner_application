from flask import jsonify
from mongo import users_collection
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
import jwt

SECRET_KEY = "this_is_a_secret_key"

def processSignup(data):
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    email = data.get("email")
    password = data.get("password")
 
    if not firstname or not email or not password:
        return jsonify({"error": "Full name, email, and password are required"}), 400

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "Email already registered"}), 409

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    users_collection.insert_one({
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": hashed_password
    })

    return processLogin({"email": email, "password": password})


def processLogin(data):
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found!"}), 401

    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Wrong password!"}), 401

    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "exp": datetime.now(timezone.utc) + timedelta(hours=12)  # expires in 12 hours
    }
    quit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    user_data = {
        "id": str(user["_id"]),
        "email": user["email"],
        "firstname": user.get("firstname", ""),
        "lastname": user.get("lastname", "")
    }

    return jsonify({"user": user_data, "token": token, "message": "Login successful"})