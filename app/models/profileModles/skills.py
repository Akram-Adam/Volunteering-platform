""" this module contains the skills model """
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base


class Skill(BaseModel, Base):
    """This class defines the skills model"""
    __tablename__ = 'skills'
    name = Column(String(128), nullable=False)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)

    profile = relationship('Profile', back_populates='skills')

    def __init__(self, *args, **kwargs):
        """Initializes the skills"""
        super().__init__(*args, **kwargs)