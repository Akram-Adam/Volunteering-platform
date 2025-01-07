""" this module contains the social media profile model """
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base
from models.profile import Profile  # Add this import




class Social(BaseModel, Base):
    """This class defines the social media profile model"""
    __tablename__ = 'social'
    name = Column(String(128), nullable=False)
    url = Column(String(128), nullable=False)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)

    profile = relationship('Profile', back_populates='socials')


    def __init__(self, *args, **kwargs):
        """Initializes the social media profile"""
        super().__init__(*args, **kwargs)