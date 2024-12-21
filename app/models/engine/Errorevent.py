""" 
    This is The Error Event mudule  
    This module should handel the Error that will delever to the user 
    and the System failures
    - Frist Type : System failers
    - UserError : Error the should delver to the User
"""

import json


class ERROR_EVENT:
    """
    Class to handel Error massage
    This class Should handel the Error that will delever to the user 
    and the System failures
    - Frist Type : System failers
    - UserError : Error the should delver to the User
    """
    
    def __init__(self, maasage, code, typeevent, *args, **kwargs):
        """ 
        This is the constructor of the class
        - user : ERROR massage 
        - code of the Error
        - type of the Error
        """
        self.ERROR_MASSAGE = maasage
        self.ERROR_CODE = code
        self.ERROR_TYPE = typeevent
        
    def __str__(self) -> str:
        return f"[ERROR] '{self.ERROR_CODE}' :\n {self.ERROR_CODE}\n Type: {self.ERROR_MASSAGE}"

    def json_rep(self):
        """ Return the JSON representation of the class """
        return json.dumps(self.__dict__)