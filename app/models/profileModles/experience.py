""" this module contains the experience model """
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base
from datetime import datetime



class Experience(BaseModel, Base):
    """This class defines the experience model"""
    __tablename__ = 'experiences'
    title = Column(String(128), nullable=False)
    company = Column(String(128), nullable=False)
    location = Column(String(128), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    description = Column(String(1024), nullable=True)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)

    profile = relationship('Profile', back_populates='experience')

    def __init__(self, *args, **kwargs):
        """Initializes the experience"""
        super().__init__(*args, **kwargs)
        self.start_date = datetime.strptime(self.start_date, '%Y-%m-%d')
        self.end_date = datetime.strptime(self.end_date, '%Y-%m-%d')