"""
Server document for Print Tracker.
This will use the flask and mariadb libraries.
"""

from flask import Flask
import database as db
app = Flask(__name__)

@app.route('/')
def health():
    conn = db.dbConnect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    for user in cursor:
        print(user)
    return "Hello World"