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
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship('users', back_populates='profile')
    certifications = relationship('certifications', back_populates='profile')
    education = relationship('educations', back_populates='profile')
    experience = relationship('experience', back_populates='profile')
    skills = relationship('skills', back_populates='profile')
    projects = relationship('projects', back_populates='profile')
    social = relationship('socials', back_populates='profile') # this refer to
    languages = relationship('languages', back_populates='profile')
    interests = relationship('interests', back_populates='profile')


    def __init__(self, *args, **kwargs):

        """ This is the constructor of the calss """
        super().__init__(*args, **kwargs)

    