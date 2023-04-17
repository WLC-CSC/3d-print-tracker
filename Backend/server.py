"""
Server document for Print Tracker.
This will use the flask and mariadb libraries.
"""

from flask import Flask

app = Flask(__name__)

@app.route('/')
def health():
    return "Hello World"