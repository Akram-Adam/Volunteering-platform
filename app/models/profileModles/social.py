""" this module contains the social media profile model """
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base




class Social(BaseModel, Base):
    """This class defines the social media profile model"""
    __tablename__ = 'social_media'
    name = Column(String(128), nullable=False)
    url = Column(String(128), nullable=False)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)

    profile = relationship('profiles', back_populates='social')

    def __init__(self, *args, **kwargs):
        """Initializes the social media profile"""
        super().__init__(*args, **kwargs)