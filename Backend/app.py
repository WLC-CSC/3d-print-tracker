"""
Server document for Print Tracker.
This will use the flask and mariadb libraries.
"""

from flask import Flask, request
# import database as db
import dbAlchemy as db
app = Flask(__name__)

@app.route('/')
def health():
    return "Hello World"

@app.route('/addUser', methods = ['POST'])
def addUser():
    user = db.Users()
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            json = request.json
            user.writeData(warriorID=json["warriorID"],fname=json["firstName"],lname=json["lastName"], isAdmin=json["isAdmin"])
            result = user.readData()
            for u in result:
                print(u.warriorID)
                return f"Added User: {json}"
        else:
            return "Content must be formatted as JSON"

@app.route('/checkUser', methods = ['POST'])
def checkUser():
    user = db.Users()
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        result = user.readData(warriorID=json["warriorID"])
        print(f"Result: {result.firstName}, {result.lastName}")
        return f"Found user: {result.firstName}, {result.lastName}"
    else:
        return "Content must be formatted as JSON"