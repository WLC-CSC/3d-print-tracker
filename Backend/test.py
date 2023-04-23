from sqlalchemy.orm import declarative_base, sessionmaker
import sqlalchemy as sqla
import pandas as pd

Base = declarative_base()

# engine = sqla.create_engine("mariadb+mariadbconnector://app_user:superSketchyPassword@127.0.0.1:3306/printtracker")
def createSession():
    try:
        engine = sqla.create_engine("mariadb+mariadbconnector://app_user:superSketchyPassword@127.0.0.1:3306/printtracker")
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
    adminPass = sqla.Column('adminPass', sqla.Text, nullable=False)
    
    
    def writeData(self, fname, lname):
        with createSession() as session:
            if type(fname) == str and type(lname) == str:
                new_row = Users(firstName=fname, lastName=lname)
                session.add(new_row)
                session.commit()
            else:
                raise ValueError('Bad type(s).')
            
        
    def readData(self, lname_filter=None):
        with createSession() as session:
            if lname_filter:
                result = session.query(Users).\
                    filter(Users.lastName == lname_filter).first()
            else:
                result = session.query(Users).all()
        
        return result
    
    # def deleteData(self, lname_filter=None):
    #     with createSession() as session:
    #         if lname_filter:
    #             result = session.query(Authors).\
    #                 filter(Authors.lastName == lname_filter).delete()
    #         session.commit()
  
if __name__ == "__main__":
    user = Users()
    u = user.readData()
    print(u)