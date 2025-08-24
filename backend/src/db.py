import sqlite3
import os

DATABASE_FILE = os.environ.get("DATABASE_FILE", "whosaidthis.db")


def get_db_connection():
    conn = sqlite3.connect(DATABASE_FILE, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    conn = get_db_connection()
    with open("src/schema.sql") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()
