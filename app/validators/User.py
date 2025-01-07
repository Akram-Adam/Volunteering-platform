"""
This module contain method that gonna validate all the data in the request for user and profile
It should return True or ERROR_EVENT
"""
from validators import ERROR_EVENT
import re
    
# First for user data validation in sign up and password validation  

def check_password_validation(password, conformingpassword):
        """ Function to check the password if it valed to be a password or Not """
        SpecialSym = ['!', '@', '#', '"', ':', "'", '<', '>', ',', '\\', '/', '$', '%'
                      , '^', '&', '*', '(', ')', '{', '}' ,
                      '[', ']', '_', '+', '-', '=', '|', ';', '.', '?', '`', '~']

        # Check the lengnth of the password
        if not (len(password) >= 8 and len(password) < 61):
            return ERROR_EVENT(maasage=" The password length is out of the range ", code='1.1.0', typeevent='Usererror')

        # Check if the password has Number
        if not any(char.isdigit() for char in password):
            return ERROR_EVENT(maasage=" No digits ", code='1.1.1', typeevent='Usererror')

        # Check if there is any uppercases in the password
        if not any(char.isupper() for char in password):
            return ERROR_EVENT(maasage=" No upper letters ", code='1.1.2', typeevent='Usererror')

        # Check if there is any lowercase in the password
        if not any(char.islower() for char in password):
            return ERROR_EVENT(maasage=" No small letter ", code='1.1.3', typeevent='Usererror')

        # Check if there is any
        if not any(char in SpecialSym for char in password):
            return ERROR_EVENT(maasage=" No symbol ", code='1.1.4', typeevent='Usererror')

        # Check if the password and conforming password
        if password != conformingpassword:
            return ERROR_EVENT(maasage=" Password Dosn't match conforming password ", code='1.1.4', typeevent='Usererror')

        return True


def emailSignUpvalidaton(email=None):
    """
        Check if the email is exist
        return True: if user and email are valid and no matched
        return ERROR_event: if user is exist
    """

    if not email:
        return ERROR_EVENT(maasage=" Data is missing ", code='1.2.1', typeevent='Usererror')
    if not (len(email) > 0 and len(email) < 256):
        return ERROR_EVENT(maasage=" The email length is Out of the range ", code='1.2.2', typeevent='Usererror')
    if not checkEmailExit(email):
        return ERROR_EVENT(maasage=" The Account is exist ", code='1.2.0', typeevent='Usererror')   

    return True



def checkEmailExit(email=None):
        """
            Check if the email is exist
            return True: if user and email are valid and no matched
            return ERROR_event: if user is exist
        """
        from app.models import db_session
        check_data = db_session.account_check_existance(email)
        if check_data == None:
            return False
        
        return True


def phoneSignUpvalidaton(phone=None):
    """
        Check if the phone is exist
        return True: if user and phone are valid and no matched
        return ERROR_event: if user is exist
    """

    if not phone:
        return ERROR_EVENT(maasage=" Data is missing ", code='1.2.1', typeevent='Usererror')

    # Check if the phone number matches the pattern for any country
    phone_pattern = re.compile(r'^\+?[1-9]\d{1,14}$')
    if not phone_pattern.match(phone):
        return ERROR_EVENT(maasage=" Invalid phone number format ", code='1.2.3', typeevent='Usererror')
