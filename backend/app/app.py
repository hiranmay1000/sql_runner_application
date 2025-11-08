from flask import Flask, request, jsonify
from flask_cors import CORS
from database import execute_query, get_table_names, get_table_info
from mongo import users_collection
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
CORS(app)  # Allows frontend (React) to call the backend

@app.route('/api/register', methods=['POST'])
def user_register():
    data = request.get_json()

    full_name = data.get("fullname")
    email = data.get("email")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({"error": "Full name, email, and password are required"}), 400

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "Email already registered"}), 409

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    users_collection.insert_one({
        "fullname": full_name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201



@app.route("/api/login", methods=['POST'])
def user_login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = users_collection.find_one({"email": email})
    if not user: 
        return jsonify({"error": "User not found!"}), 401

    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Wrong password!"}), 401

    return jsonify({"message": "Login successfull"})


@app.route("/api/run-query", methods=["POST"])
def run_query():
    data = request.get_json()
    query = data.get("query")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    result = execute_query(query)
    print(result)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200

@app.route("/api/tables", methods=["GET"])
def tables():
    tables = get_table_names()
    return jsonify({"tables": tables})


@app.route("/api/table-info/<string:table_name>", methods=["GET"])
def table_info(table_name):
    info = get_table_info(table_name)
    return jsonify(info)


# root
@app.route("/", methods=["GET"])
def root():
    return jsonify({"message": "SQL Runner API is running!"})

if __name__ == "__main__":
    import os
    from dotenv import load_dotenv

    # Load .env if available
    load_dotenv()

    # Detect environment automatically
    flask_env = os.environ.get("FLASK_ENV", "production")
    if(flask_env == "production"):
        debug_mode = False
    else:     
        debug_mode = True
    port = int(os.environ.get("PORT", 8000))

    # Override behavior if in production (safe guard)
    if flask_env == "production":
        debug_mode = False 

    print(f"🚀 Starting Flask server in {flask_env} mode on port {port} (debug={debug_mode})")

    app.run(host="0.0.0.0", port=port, debug=debug_mode)

