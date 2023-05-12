"""
Server document for Print Tracker.
This will use the flask and mariadb libraries.
"""
from flask import Flask, jsonify, request
from marshmallow import Schema, fields, ValidationError
import dbAlchemy as db
import json
app = Flask(__name__)

class AddUserSchema(Schema):
    """Fields being received from the post request."""
    warriorID = fields.Integer(required=True)
    firstName = fields.String(required=True)
    lastName = fields.String(required=True)
    isAdmin = fields.Boolean(required =True)
    
class CheckSchema(Schema):
    warriorID = fields.Integer(required=True)

class AddPrintSchema(Schema):
    userID = fields.Integer(required=True)
    description = fields.String(required=True)
    price = fields.Float(required=True)

class GetPrintsSchema(Schema):
    userID = fields.Integer(required=False)

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
        schema = AddUserSchema()
        try:
            result = schema.load(req)
            if (result):
                # Warrior ID must start with an integer greater than 0 and be exactly seven digits
                if result["warriorID"] < 1000000 or result["warriorID"] > 10000000:
                    return {"Status": 202, "Message": "Invalid warriorID value" }
                
                # first and last names must not be empty and must not contain only spaces
                first, last = result["firstName"], result["lastName"]
                if first.strip() == "":
                    return {"Status": 202, "Message": "Invalid firstName value"}
                elif len(first) > 50:
                    return {"Status": 202, "Message": "firstName is too long"}

                if last.strip() == "":
                    return {"Status": 202, "Message": "Invalid lastName value"}
                elif len(last) > 100:
                    return {"Status": 202, "Message": "lastName is too long"}
                
                userID = user.writeData(warriorID=result["warriorID"],fname=result["firstName"],lname=result["lastName"], isAdmin=result["isAdmin"])
                
                if userID == "Duplicate entry":
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
                return {"Status": 202, "Message": "User not found"}
            else:
                return {"Status": 200, "userID":result.userID, "firstName": result.firstName, "lastName":result.lastName}
            
        except ValidationError as err:
            return jsonify(err.messages), 400
    else:
        return "Content must be formatted as JSON", 400

@app.route('/addPrint', methods = ['POST'])
def addPrint():
    """
    {
    "userID":3,
    "description":"Tiny toothless statue",
    "price":4.59
    }
    """
    prints = db.Prints()
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        reqBody = request.json
        schema = AddPrintSchema()
        try:
            # Load the posted JSON properties and require the given headers
            result = schema.load(reqBody)
            if result:
                # Check taht price is valid
                price = result["price"]
                if price > 50.0 or price < 0.0 or result["description"].strip() == "":
                    return {"Status": 202, "Message": "Invalid price"}
                
                printID = prints.writeData(**result)
                if printID == "Bad Format":
                    return {"Status": 202, "Message": "Bad input"}
                else:
                    return {"Status": 200, "userID": printID}
            else:
                return {"Status": 202, "Message": "Unable to read post JSON"}
        
        except ValidationError as err:
            return jsonify(err.messages), 400

@app.route('/getPrints', methods = ['POST'])
def getPrints():
    """
    {
    "userId":3  # Optional field. Don't send to get all prints.
    }
    """
    prints = db.Prints()
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        reqBody = request.json
        schema = GetPrintsSchema()
        try:
            result = schema.load(reqBody)
            if "userID" in result:
                if result["userID"] > 0:
                    past_prints = prints.readData(userID=result["userID"])
                else:
                    return {"Status": 202, "Message": "Invalid userID"}
            else:
                past_prints = prints.readData()
                
            if past_prints == "No entry found":
                return {"Status": 202, "Message": "No prints found"}
            else:
                return {"Status": 200, "prints": past_prints}
        
        except ValidationError as err:
            return jsonify(err.messages), 400