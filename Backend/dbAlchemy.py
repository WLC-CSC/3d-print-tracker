from sqlalchemy.orm import declarative_base, sessionmaker
import sqlalchemy as sqla
import os
from dotenv import load_dotenv
load_dotenv()

# import pandas as pd

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
                session.add(new_row)
                session.commit()
            else:
                raise ValueError('Bad type(s).')
            
        
    def readData(self, warriorID=None):
        with createSession() as session:
            if warriorID:
                result = session.query(Users).\
                    filter(Users.warriorID == warriorID).first()
            else:
                result = session.query(Users).all()
        
        return result