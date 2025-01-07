from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
import bcrypt
from models.profile import Profile

"""This gonna be user logic module for the app"""


class User(BaseModel, Base):
    """This class defines a user by various attributes"""
    __tablename__ = 'users'
    frist_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    phone = Column(String(128), nullable=True)
    city = Column(String(128), nullable=True)
    state = Column(String(128), nullable=True)
    country = Column(String(128), nullable=True)
    address = Column(String(128), nullable=True)
    zip_code = Column(String(128), nullable=True)
    # active, inactive :: default inactive change to active after email verification
    status = Column(String(128), nullable=True)
    role = Column(String(128), nullable=True)  # admin, user
    profile = relationship("Profile", back_populates="user")

    """Initializes a user
    Args:
        BaseModel (class): Base model class
    make check point for user data befor calling the constructor
    and change the password to hash
    
    """

    def __init__(self, *args, **kwargs):
        """Initializes a user"""
        super().__init__(*args, **kwargs)

    @staticmethod
    def login(self, email=None, password=None):
        """
        Login a user
        check if the email is valid
        check if the password is valid
        check if the email exist
        check if the password is correct
        if pass return the user data
        or None
        """
        from models import db_session

        UserData = db_session.getuser(email)
        # check the existance of the account
        if UserData:
            # check password not None
            if password:
              # check the password if is it corecct
                if UserData.verify_password(password):
                    return UserData
        return None

    def set_password(self, password_string_and_not_hashed):
        """
        Hash the password and store it.
        """
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(
            password_string_and_not_hashed.encode('utf-8'), salt)
        self.user_password = hashed_password.decode('utf-8')

    def verify_password(self, password):
        """
        Verify the provided password against the stored hashed password.
        """
        return bcrypt.checkpw(password.encode('utf-8'), self.user_password.encode('utf-8'))
