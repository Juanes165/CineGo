from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from google.cloud.sql.connector import Connector, IPTypes
import os
from dotenv import load_dotenv

load_dotenv()

# load env vars
db_user = os.environ["DB_USER"]
db_pass = os.environ["DB_PASS"]
db_name = os.environ["DB_NAME"]
instance_connection_name = os.environ["INSTANCE_CONNECTION_NAME"]

print(db_user, db_pass, db_name, instance_connection_name)

# Connect to the database
def getconn():

    with Connector() as connector:
        conn = connector.connect(
            instance_connection_name, # Cloud SQL Instance Connection Name
            "pg8000",
            user=db_user,
            password=db_pass,
            db=db_name,
            ip_type= IPTypes.PUBLIC  # IPTypes.PRIVATE for private IP
        )
        return conn
    

# def create_databases(app):
#     """Creates databses and injects the main admin account into the user db"""
#     with app.app_context():
#         db.create_all()
#         if not db.session.execute(
#             db.select(User).filter_by(admin=True)
#         ).scalar_one_or_none():
#             admin = User(
#                 name=app.config["NAME"],
#                 lastname=app.config["LASTNAME"],
#                 phone=app.config["PHONE"],
#                 email=app.config["EMAIL"],
#                 password=app.config["PASSWORD"],
#                 admin=True,
#             )
#             db.session.add(admin)
#             db.session.commit()
#             db.close_all_sessions()



# Database instance
db = SQLAlchemy()

# JWT Manager instance
jwt = JWTManager()