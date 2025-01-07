""" this module contains the languages model """
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base




class Language(BaseModel, Base):
    """This class defines the languages model"""
    __tablename__ = 'languages'
    name = Column(String(128), nullable=False)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)

    profile = relationship('Profile', back_populates='languages')

    def __init__(self, *args, **kwargs):
        """Initializes the languages"""
        super().__init__(*args, **kwargs)