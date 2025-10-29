import sqlite3
import json
from collections import OrderedDict

DATABASE_URL = "sql_runner.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def close_db_connection(conn):
    if conn:
        conn.close()

def execute_query(query):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        conn.commit()

        columns = [desc[0] for desc in cursor.description] if cursor.description else []

        results = [OrderedDict(zip(columns, row)) for row in cursor.fetchall()]

        return results
    except sqlite3.Error as e:
        return {"error": str(e)}
    finally:
        close_db_connection(conn)


def get_table_names():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    close_db_connection(conn)
    return tables

def get_table_info(table_name):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = [{"name": row[1], "type": row[2]} for row in cursor.fetchall()]
        cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
        sample_data = [OrderedDict(zip(row.keys(), row)) for row in cursor.fetchall()] # this preserves column order -> OrderedDict
        return {"columns": columns, "sample_data": sample_data}
    except sqlite3.Error as e:
        return {"error": str(e)}
    finally:
        close_db_connection(conn)
