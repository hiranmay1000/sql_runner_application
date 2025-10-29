# import sqlite3

# DATABASE_URL = "sql_runner.db"  # path to your SQLite database


# # Helper: Connect to database
# def get_db_connection():
#     conn = sqlite3.connect(DATABASE_URL)
#     conn.row_factory = sqlite3.Row  # allows dict-like row access
#     return conn


# # Helper: Close connection
# def close_db_connection(conn):
#     if conn:
#         conn.close()


# # Function: Get all table names
# def get_table_names():
#     conn = get_db_connection()
#     try:
#         cursor = conn.cursor()
#         cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
#         tables = [row["name"] for row in cursor.fetchall()]
#         return tables
#     except sqlite3.Error as e:
#         return {"error": str(e)}
#     finally:
#         close_db_connection(conn)


# # Function: Get info about a specific table
# def get_table_info(table_name):
#     conn = get_db_connection()
#     try:
#         cursor = conn.cursor()

#         # Get column info
#         cursor.execute(f"PRAGMA table_info({table_name});")
#         columns = [{"name": row[1], "type": row[2]} for row in cursor.fetchall()]

#         # Get sample rows
#         cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
#         sample_data = [dict(row) for row in cursor.fetchall()]

#         return {"columns": columns, "sample_data": sample_data}

#     except sqlite3.Error as e:
#         return {"error": str(e)}
#     finally:
#         close_db_connection(conn)


# # Function: Execute any SQL query
# def execute_query(query):
#     conn = get_db_connection()
#     try:
#         cursor = conn.cursor()
#         cursor.execute(query)
#         results = [dict(row) for row in cursor.fetchall()]
#         return results
#     except sqlite3.Error as e:
#         return {"error": str(e)}
#     finally:
#         close_db_connection(conn)


# # --- Example usage ---
# if __name__ == '__main__':
#     print("Available tables:", get_table_names())
#     print("\nCustomers table info:", get_table_info("Customers"))
#     results = execute_query("SELECT first_name, age FROM Customers WHERE age > 25;")
#     print("\nQuery results:", results)
