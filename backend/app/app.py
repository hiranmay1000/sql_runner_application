from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from auth import processSignup, processLogin
from database import execute_query, get_table_names, get_table_info


load_dotenv()
flask_env = os.environ.get("FLASK_ENV", "production")
debug_mode = False
allowed_url_cors = [
    "https://sqlrunneronline.vercel.app",
    "http://localhost:3000"
]


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": allowed_url_cors}}, supports_credentials=True)
# CORS(app)

@app.route('/api/register', methods=['POST'])
def user_register():
    body = request.get_json()
    return processSignup(body)


@app.route("/api/login", methods=['POST'])
def user_login():
    body = request.get_json()
    return processLogin(body)


@app.route("/api/run-query", methods=["POST"])
def run_query():
    body = request.get_json()
    query = body.get("query")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    result = execute_query(query)

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
    if(flask_env == "production"):
        debug_mode = False

    port = int(os.environ.get("PORT", 8000))

    print(f"🚀 Starting ****FLASK SERVER**** in {flask_env} mode on port {port} (debug={debug_mode})")

    app.run(host="0.0.0.0", port=port, debug=debug_mode)

