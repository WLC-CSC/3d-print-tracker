from sqlalchemy.orm import declarative_base, sessionmaker
import sqlalchemy as sqla
import os
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()
Base = declarative_base()

def createSession():
    try:
        user = os.getenv('DBUSER')
        password = os.getenv('DBPASSWORD')
        host = os.getenv('HOST')
        port = os.getenv('PORT')
        db = os.getenv('DATABASE')
        engine = sqla.create_engine(f"mariadb+mariadbconnector://{user}:{password}@{host}:{port}/{db}")

        Session = sessionmaker(bind=engine)
        return Session()
    except:
        raise ConnectionError(f'Cannot create a connection.')
    
    
class Users(Base):
    __tablename__ = 'users'
    userID = sqla.Column('userID', sqla.Integer, primary_key=True)
    warriorID = sqla.Column('warriorID', sqla.Integer, nullable=False)
    firstName = sqla.Column('firstName', sqla.Text, nullable=False)
    lastName = sqla.Column('lastName', sqla.Text, nullable=False)
    isAdmin = sqla.Column('isAdmin', sqla.Boolean, nullable=False)
    adminPass = sqla.Column('adminPass', sqla.Text, nullable=True)
    
    
    def writeData(self, warriorID, fname, lname, isAdmin):
        with createSession() as session:
            if type(fname) == str and type(lname) == str:
                new_row = Users(warriorID=warriorID, firstName=fname, lastName=lname, isAdmin=isAdmin)
                result = new_row.readData(warriorID=warriorID)
                if result == "No entry Found":
                    session.add(new_row)
                    session.commit()
                    return new_row.userID
                else:
                    if result.warriorID == warriorID:
                        return "Duplicate entry"
            else:
                return "Bad Format"
            
        
    def readData(self, warriorID=None):
        with createSession() as session:
            if warriorID:
                result = session.query(Users).\
                    filter(Users.warriorID == warriorID).first()
                if result:
                    return result
                else:
                    return "No entry Found"
            else:
                result = session.query(Users).all()
                return result


class Prints(Base):
    __tablename__ = 'prints'
    printID = sqla.Column('printID', sqla.Integer, primary_key=True)
    userID = sqla.Column('userID', sqla.Integer, nullable=False)
    description = sqla.Column('description', sqla.Text, nullable=False)
    price = sqla.Column('price', sqla.Float, nullable=False)
    printDate = sqla.Column('printDate', sqla.DateTime, nullable=False)
    invoiced = sqla.Column('invoiced', sqla.Boolean, nullable=True)
    
    
    def writeData(self, userID, description, price):
        with createSession() as session:
            if type(userID) == int and type(description) == str and type(price) == float:
                new_row = Prints(userID=userID,
                                 description=description,
                                 price=price,
                                 printDate=str(datetime.utcnow()),
                                 invoiced=False)
                session.add(new_row)
                session.commit()
                return new_row.printID
            else:
                return "Bad Format"
            
        
    def readData(self, userID=None):
        with createSession() as session:
            if userID:
                results = []
                result = session.query(Prints).filter(Prints.userID == userID).all()
                if result:
                    # Need to change the form otherwise flask can't apply json
                    # formatting to the default returned list of Alchemy objects
                    # It is converting it into a list of simple json key value objects
                    for r in result:
                        results.append({
                            'printID':r.printID,
                            'userID':r.userID,
                            'description':r.description,
                            'price':r.price,
                            'printDate':r.printDate,
                            'invoiced':r.invoiced
                        })
                    return results
                else:
                    return "No entry found"
            else:
                results = []
                result = session.query(Prints).all()
                if result:
                    for r in result:
                        results.append({
                            'printID':r.printID,
                            'userID':r.userID,
                            'description':r.description,
                            'price':r.price,
                            'printDate':r.printDate,
                            'invoiced':r.invoiced
                        })
                    return results
                else:
                    return "No entry found"