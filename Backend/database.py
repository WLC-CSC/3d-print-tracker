import os
import mysql.connector as database
import sys

# Connect to MariaDB Platform
try:
    conn = database.connect(
        user="root",
        password="superSketchyPassword",
        host="localhost",
        port=3306,
        database="printtracker"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
except database.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Get Cursor
cur = conn.cursor()