"""
Server document for Print Tracker.
This will use the flask and mariadb libraries.
"""
from flask import Flask, jsonify, request
from marshmallow import Schema, fields, ValidationError
import dbAlchemy as db
app = Flask(__name__)

class AddSchema(Schema):
    warriorID = fields.Integer(required=True)
    firstName = fields.String(required=True)
    lastName = fields.String(required=True)
    isAdmin = fields.Boolean(required =True)
    
class CheckSchema(Schema):
    warriorID = fields.Integer(required=True)

@app.route('/')
def health():
    return "Hello World"

@app.route('/addUser', methods = ['POST'])
def addUser():
    """
    {
    "warriorID":1235321,
    "firstName":"john",
    "lastName":"Wick",
    "isAdmin":false
    }
    """
    user = db.Users()
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        req = request.json            
        schema = AddSchema()
        try:
            result = schema.load(req)
            if (result):
                if len(str(result["warriorID"])) > 7 or len(str(result["warriorID"])) < 7:
                    return {"Status": 203, "WarriorID": "ID is longer than 7 characters" }
                userID = user.writeData(warriorID=result["warriorID"],fname=result["firstName"],lname=result["lastName"], isAdmin=result["isAdmin"])
                if userID == "Insert failed":
                    return {"Status": 202, "Message": "User not created"}
                elif userID == "Bad Format":
                    return {"Status": 202, "Message": "Bad input"}
                else:
                    return {"Status": 200, "userID": userID}
        except ValidationError as err:
            return jsonify(err.messages), 400

@app.route('/checkUser', methods = ['POST'])
def checkUser():
    """
    {
    "warriorID":1234566
    }
    """
    user = db.Users()
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        reqBody = request.json
        schema = CheckSchema()
        try:   
            req = schema.load(reqBody)
            result = user.readData(warriorID=req["warriorID"])
            if result == "No entry Found":
                print("No user")
                return {"Status": 202, "Message": "User not found"}
            else:
                return {"Status": 200, "userID":result.userID, "firstName": result.firstName, "lastName":result.lastName}
        except ValidationError as err:
            return jsonify(err.messages), 400
    else:
        return "Content must be formatted as JSON", 400