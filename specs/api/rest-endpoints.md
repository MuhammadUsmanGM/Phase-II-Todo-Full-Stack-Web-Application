# Spec: REST API Endpoints

This document defines the API contract for the backend. All endpoints require a valid JWT for an authenticated user. The backend must validate that the user ID in the token matches the `{user_id}` in the URL path.

---
## Authentication

### `POST /auth/register`
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "a-strong-password"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "access_token": "your_jwt_token_here",
    "token_type": "bearer"
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: If email is invalid or already exists.
  - `422 Unprocessable Entity`: If validation fails.

### `POST /auth/login`
- **Description:** Authenticates a user and returns a JWT.
- **Request Body (form data):**
  ```
  username=user@example.com&password=a-strong-password
  ```
- **Success Response (200 OK):**
  ```json
  {
    "access_token": "your_jwt_token_here",
    "token_type": "bearer"
  }
  ```
- **Error Response (401 Unauthorized):** If credentials are incorrect.

---
## Todos (Requires Authentication)
- **Description:** Get all tasks for a specific user.
- **Request Body:** None.
- **Success Response (200 OK):**
  ```json
  [
    {
      "id": 1,
      "title": "Task 1",
      "description": "Description for task 1",
      "completed": false
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": null,
      "completed": true
    }
  ]
  ```
- **Error Response (403 Forbidden):** If token user ID does not match `{user_id}`.

---
## `POST /api/{user_id}/tasks`
- **Description:** Create a new task for a user.
- **Request Body:**
  ```json
  {
    "title": "A new task",
    "description": "Optional description."
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "id": 3,
    "title": "A new task",
    "description": "Optional description.",
    "completed": false,
    "created_at": "2025-12-10T10:00:00Z",
    "updated_at": "2025-12-10T10:00:00Z"
  }
  ```
- **Error Response (403 Forbidden):** If token user ID does not match `{user_id}`.

---
## `GET /api/{user_id}/tasks/{id}`
- **Description:** Get a single task by its ID.
- **Request Body:** None.
- **Success Response (200 OK):**
  ```json
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description for task 1",
    "completed": false,
    "created_at": "2025-12-10T09:00:00Z",
    "updated_at": "2025-12-10T09:30:00Z"
  }
  ```
- **Error Responses:**
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `404 Not Found`: If task with `{id}` does not exist for this user.

---
## `PUT /api/{user_id}/tasks/{id}`
- **Description:** Update a task's title and/or description.
- **Request Body:**
  ```json
  {
    "title": "Updated title",
    "description": "Updated description."
  }
  ```
- **Success Response (200 OK):** The full updated task object.
  ```json
  {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description.",
    "completed": false,
    "created_at": "2025-12-10T09:00:00Z",
    "updated_at": "2025-12-10T11:00:00Z"
  }
  ```
- **Error Responses:**
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `404 Not Found`: If task with `{id}` does not exist for this user.

---
## `DELETE /api/{user_id}/tasks/{id}`
- **Description:** Delete a task.
- **Request Body:** None.
- **Success Response (204 No Content):** An empty response.
- **Error Responses:**
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `404 Not Found`: If task with `{id}` does not exist for this user.

---
## `PATCH /api/{user_id}/tasks/{id}/complete`
- **Description:** Toggle the completion status of a task.
- **Request Body:**
  ```json
  {
    "completed": true
  }
  ```
- **Success Response (200 OK):** The full updated task object.
  ```json
  {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description.",
    "completed": true,
    "created_at": "2025-12-10T09:00:00Z",
    "updated_at": "2025-12-10T12:00:00Z"
  }
  ```
- **Error Responses:**
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `404 Not Found`: If task with `{id}` does not exist for this user.