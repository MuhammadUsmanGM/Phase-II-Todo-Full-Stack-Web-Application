# Spec: Database Schema (SQLModel)

This file defines the database schema using Python's `SQLModel` library. This serves as the authoritative source for our backend data structures.

## User Model
- A simple model to hold user identity. In a real application, this would be more complex.
- The `id` will be the `user_id` used in API paths.

```python
from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel
import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str

    tasks: List["Task"] = Relationship(back_populates="owner")
```

## Task Model
- Represents a single todo item.
- Includes a foreign key relationship to the `User` model to enforce data isolation.

```python
from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
import datetime

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    completed: bool = False
    
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)

    owner_id: int = Field(foreign_key="user.id")
    owner: Optional["User"] = Relationship(back_populates="tasks")
```
## Notes
- `updated_at` should be programmatically updated on every modification.
- The `User` model is minimal for Phase II but can be extended with profile information in the future.
- The relationship management via `Relationship` and `back_populates` is a key SQLModel feature for ORM behavior.