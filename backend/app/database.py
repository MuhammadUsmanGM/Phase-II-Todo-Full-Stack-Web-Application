from sqlmodel import create_engine, SQLModel, Session
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create the engine
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    """Create database tables based on SQLModel metadata."""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Dependency to get a database session."""
    with Session(engine) as session:
        yield session
