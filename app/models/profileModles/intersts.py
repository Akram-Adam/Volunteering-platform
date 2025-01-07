""" this file contains the model for the interests of the user """
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base




class Interest(BaseModel, Base):
    """This class defines the interests model"""
    __tablename__ = 'interests'
    name = Column(String(128), nullable=False)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)

    profile = relationship('Profile', back_populates='interests')

    def __init__(self, *args, **kwargs):
        """Initializes the interests"""
        super().__init__(*args, **kwargs)
