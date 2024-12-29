''' This module contains the model for the certification table '''
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base
from datetime import datetime


class Certification(BaseModel, Base):
    ''' This class defines the certification model '''
    __tablename__ = 'certifications'
    title = Column(String(128), nullable=False)
    description = Column(String(1024), nullable=False)
    filePath =  Column(String(128), nullable=True)
    issuing_organization = Column(String(128), nullable=False)
    issue_date = Column(DateTime, nullable=False)
    expiration_date = Column(DateTime, nullable=True)
    credential_ID = Column(String(1024), nullable=True)
    credential_URL = Column(String(1024), nullable=True)
    associated_skill = Column(String(128), nullable=True)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)

    profile = relationship('profiles', back_populates='certifications')

    def __init__(self, *args, **kwargs):
        ''' Initializes the certification '''
        super().__init__(*args, **kwargs)
        self.issue_date = datetime.strptime(self.issue_date, '%Y-%m-%d')
        self.expiration_date = datetime.strptime(self.expiration_date, '%Y-%m-%d')

