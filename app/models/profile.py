"""this is module for the user profile"""
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base


class profile(BaseModel, Base):
    """
    This class for the user profile
    handel multy roules for the user
    """
    __tablename__ = 'profiles'
    type = Column(String(128), nullable=False) # could be orgnization, individua volanter
    profilepic = Column(String(128), nullable=True) # path to the profile picture
    background = Column(String(128), nullable=True) # path to the background picture

    __mapper_args__ = {
        'polymorphic_on': type,
        'polymorphic_identity': 'profile'
    }

    

    def __init__(self, *args, **kwargs):
        
        """ This is the constructor of the calss """
        super().__init__(*args, **kwargs)

    