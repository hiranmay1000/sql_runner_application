import sqlite3
import os
from dotenv import load_dotenv
from collections import OrderedDict

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

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

        if cursor.description:
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            results = [list(row) for row in rows]
            print(columns)
            return {"columns": columns, "rows": results}
        else:
            return {"message": "Query executed successfully."}
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


# Index	            Column	                        Description
# 0	                cid	                            Column ID (integer)
# 1	                name	                        Column name
# 2	                type	                        Declared SQL type (TEXT, INTEGER, etc.)
# 3	                notnull	                        1 if NOT NULL, 0 otherwise
# 4	                dflt_value	                     Default value
# 5	                pk	                            1 if part of primary key

def get_table_info(table_name):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Fetch columns and types
        cursor.execute(f"PRAGMA table_info({table_name});")
        cols = cursor.fetchall()
        columns_names = [row[1] for row in cols]
        columns_types = [row[2] for row in cols]

        # Fetch data
        cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
        rows = cursor.fetchall()
        row_results = [list(row) for row in rows]
        return {"columns": columns_names, "types": columns_types, "rows": row_results}
    except sqlite3.Error as e:
        return {"error": str(e)}
    finally:
        close_db_connection(conn)
