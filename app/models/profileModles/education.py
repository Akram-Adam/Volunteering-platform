"""this module contains the education model"""
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base
from datetime import datetime



class Education(BaseModel, Base):
    """This class defines the education model"""
    __tablename__ = 'educations'
    school = Column(String(128), nullable=False)
    degree = Column(String(128), nullable=False)
    field_of_study = Column(String(128), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    grade = Column(String(128), nullable=True)
    activities = Column(String(128), nullable=True)
    description = Column(String(1024), nullable=True)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)

    profile = relationship('Profile', back_populates='educations')

    def __init__(self, *args, **kwargs):
        """Initializes the education"""
        super().__init__(*args, **kwargs)
        self.start_date = datetime.strptime(self.start_date, '%Y-%m-%d')
        self.end_date = datetime.strptime(self.end_date, '%Y-%m-%d')