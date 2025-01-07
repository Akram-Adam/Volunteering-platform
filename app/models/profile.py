"""this is module for the user profile"""
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base


class Profile(BaseModel, Base):
    """
    This class for the user profile
    handel multy roules for the user
    """
    __tablename__ = 'profiles'
    type = Column(String(128), nullable=False) # could be orgnization, individua volanter
    profilepic = Column(String(128), nullable=True) # path to the profile picture
    background = Column(String(128), nullable=True) # path to the background picture
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    user = relationship("User", back_populates="profile")
    certifications = relationship('Certification', back_populates='profile')
    educations = relationship('Education', back_populates='profile')
    experience = relationship('Experience', back_populates='profile')
    skills = relationship('Skill', back_populates='profile')
    languages = relationship('Language', back_populates='profile')
    interests = relationship('Interest', back_populates='profile')
    socials = relationship('Social', back_populates='profile') # Ensure this line is present
    volunteers = relationship('Volunteering', back_populates='profile')

    def __init__(self, *args, **kwargs):

        """ This is the constructor of the calss """
        super().__init__(*args, **kwargs)

