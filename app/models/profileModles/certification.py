''' This module contains the model for the certification table '''
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base


class Certification(BaseModel, Base):
    ''' This class defines the certification model '''
    __tablename__ = 'certifications'
    title = Column(String(128), nullable=False)
    description = Column(String(128), nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship('profiles', back_populates='certifications')

    def __init__(self, *args, **kwargs):
        ''' Initializes the certification '''
        super().__init__(*args, **kwargs)
