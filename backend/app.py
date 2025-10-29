from flask import Flask, request, jsonify
from flask_cors import CORS
from database import execute_query, get_table_names, get_table_info

app = Flask(__name__)
CORS(app)  # Allows frontend (React) to call the backend

@app.route("/api/run-query", methods=["POST"])
def run_query():
    data = request.get_json()
    query = data.get("query")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    result = execute_query(query)
    print(result)

    if "error" in result:
        return result, 400

    return jsonify({"data": result}), 200

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
    app.run(host="0.0.0.0", port=8000, debug=True)
