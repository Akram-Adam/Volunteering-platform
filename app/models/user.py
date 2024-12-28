from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
import bcrypt

"""This gonna be user logic module for the app"""


class User(BaseModel, Base):
    """This class defines a user by various attributes"""
    __tablename__ = 'users'
    name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    phone = Column(String(128), nullable=True)
    city = Column(String(128), nullable=True)
    state = Column(String(128), nullable=True)
    country = Column(String(128), nullable=True)
    address = Column(String(128), nullable=True)
    zip_code = Column(String(128), nullable=True)
    status = Column(String(128), nullable=True) # active, inactive :: default inactive change to active after email verification
    role = Column(String(128), nullable=True) # admin, user

    """Initializes a user
    Args:
        BaseModel (class): Base model class
    make check point for user data befor calling the constructor
    and change the password to hash
    // check if the email is valid
    // check if the phone is valid
    // check if the address is valid
    // check if the zip_code is valid
    // check if the city is valid
    // check if the state is valid
    // check if the country is valid
    // check if the role is valid
    // check if the status is valid
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

    def __set_password(self, password_string_and_not_hashed):
        """
        Hash the password and store it.
        """
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_string_and_not_hashed.encode('utf-8'), salt)
        self.user_password = hashed_password.decode('utf-8')

    def verify_password(self, password):
        """
        Verify the provided password against the stored hashed password.
        """
        return bcrypt.checkpw(password.encode('utf-8'), self.user_password.encode('utf-8'))

    # def __check_password_validation(password, conformingpassword):
    #     """ Function to check the password if it valed to be a password or Not """
    #     SpecialSym = ['!', '@', '#', '"', ':', "'", '<', '>', ',', '\\', '/', '$', '%'
    #                   , '^', '&', '*', '(', ')', '{', '}' ,
    #                   '[', ']', '_', '+', '-', '=', '|', ';', '.', '?', '`', '~']

    #     # Check the lengnth of the password
    #     if not (len(password) >= 8 and len(password) < 61):
    #         return ERROR_EVENT(maasage=" The password length is out of the range ", code='1.1.0', typeevent='Usererror')
    
    #     # Check if the password has Number
    #     if not any(char.isdigit() for char in password):
    #         return ERROR_EVENT(maasage=" No digits ", code='1.1.1', typeevent='Usererror')

    #     # Check if there is any uppercases in the password
    #     if not any(char.isupper() for char in password):
    #         return ERROR_EVENT(maasage=" No upper letters ", code='1.1.2', typeevent='Usererror')

    #     # Check if there is any lowercase in the password
    #     if not any(char.islower() for char in password):
    #         return ERROR_EVENT(maasage=" No small letter ", code='1.1.3', typeevent='Usererror')

    #     # Check if there is any
    #     if not any(char in SpecialSym for char in password):
    #         return ERROR_EVENT(maasage=" No symbol ", code='1.1.4', typeevent='Usererror')

    #     # Check if the password and conforming password
    #     if password != conformingpassword:
    #         return ERROR_EVENT(maasage=" Password Dosn't match conforming password ", code='1.1.4', typeevent='Usererror')

    #     return True

    # def __check_email_and_username(email=None, username=None):
    #     """
    #         Check if the email is exist
    #         return True: if user and email are valid and no matched
    #         return ERROR_event: if user is exist
    #     """
    #     from models import dp_incetnace
    #     check_data = dp_incetnace.account_check_existance(email, username)
    #     if check_data:
    #         if check_data[0] == True or check_data[1] == True:
    #             return ERROR_EVENT(maasage=" The Account is exist ", code='1.2.0', typeevent='Usererror')
    #         if check_data[0] is None and check_data[1] is None: # 
    #             return ERROR_EVENT(maasage=" Data is missing ", code='1.2.1', typeevent='Usererror') 
    #         if email:
    #             if not (len(email) > 0 and len(email) < 256):
    #                 return ERROR_EVENT(maasage=" The email length is Out of the range ", code='1.2.2', typeevent='Usererror')
    #         if username:
    #             if not (len(username) > 0 and len(username) < 256):
    #                 return ERROR_EVENT(maasage=" The username length is Out of the range ", code='1.2.3', typeevent='Usererror')
    #     return True

    

        
     
    
    