""" this module contains the voluntering model """
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base
from datetime import datetime




class Volunteering(BaseModel, Base):
    """This class defines the volunteering model"""
    __tablename__ = 'volunteering'
    title = Column(String(128), nullable=False)
    organization = Column(String(128), nullable=False)
    location = Column(String(128), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    description = Column(String(1024), nullable=True)
    profile_id = Column(String(60), ForeignKey('profiles.id'), nullable=False)

    profile = relationship('Profile', back_populates='volunteers')

    def __init__(self, *args, **kwargs):
        """Initializes the volunteering"""
        super().__init__(*args, **kwargs)
        self.start_date = datetime.strptime(self.start_date, '%Y-%m-%d')
        self.end_date = datetime.strptime(self.end_date, '%Y-%m-%d')


