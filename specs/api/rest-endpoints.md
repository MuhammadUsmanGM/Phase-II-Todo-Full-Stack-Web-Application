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
  - `400 Bad Request`: If email is already registered.
  - `422 Unprocessable Entity`: If validation (e.g., email format, password strength) fails.

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
## Todos (Requires Authentication and Authorization)

### `GET /api/{user_id}/tasks`
- **Description:** Get all tasks for a specific user.
- **Request Body:** None.
- **Success Response (200 OK):**
  ```json
  [
    {
      "id": 1,
      "title": "Task 1",
      "description": "Description for task 1",
      "completed": false,
      "created_at": "2025-12-10T09:00:00.000Z",
      "updated_at": "2025-12-10T09:30:00.000Z",
      "owner_id": 1
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": null,
      "completed": true,
      "created_at": "2025-12-10T09:00:00.000Z",
      "updated_at": "2025-12-10T09:30:00.000Z",
      "owner_id": 1
    }
  ]
  ```
- **Error Responses:**
  - `401 Unauthorized`: Invalid or missing JWT.
  - `403 Forbidden`: If token user ID does not match `{user_id}`.

### `POST /api/{user_id}/tasks`
- **Description:** Create a new task for a user.
- **Request Body:**
  ```json
  {
    "title": "A brand new task",
    "description": "Optional description."
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "id": 3,
    "title": "A brand new task",
    "description": "Optional description.",
    "completed": false,
    "created_at": "2025-12-10T10:00:00.000Z",
    "updated_at": "2025-12-10T10:00:00.000Z",
    "owner_id": 1
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: Invalid or missing JWT.
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `422 Unprocessable Entity`: If validation (e.g., missing title) fails.

### `GET /api/{user_id}/tasks/{id}`
- **Description:** Get a single task by its ID.
- **Request Body:** None.
- **Success Response (200 OK):**
  ```json
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description for task 1",
    "completed": false,
    "created_at": "2025-12-10T09:00:00.000Z",
    "updated_at": "2025-12-10T09:30:00.000Z",
    "owner_id": 1
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: Invalid or missing JWT.
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `404 Not Found`: If task with `{id}` does not exist or does not belong to the user.

### `PUT /api/{user_id}/tasks/{id}`
- **Description:** **Partially update** a task's title and/or description and/or completed status. (Behaves like PATCH, allowing optional fields).
- **Request Body:**
  ```json
  {
    "title": "Updated title",
    "description": "Updated description.",
    "completed": true
  }
  ```
- **Success Response (200 OK):** The full updated task object.
  ```json
  {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description.",
    "completed": false,
    "created_at": "2025-12-10T09:00:00.000Z",
    "updated_at": "2025-12-10T11:00:00.000Z",
    "owner_id": 1
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: Invalid or missing JWT.
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `404 Not Found`: If task with `{id}` does not exist or does not belong to the user.
  - `422 Unprocessable Entity`: If validation fails.

### `DELETE /api/{user_id}/tasks/{id}`
- **Description:** Delete a task.
- **Request Body:** None.
- **Success Response (204 No Content):** An empty response.
- **Error Responses:**
  - `401 Unauthorized`: Invalid or missing JWT.
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `404 Not Found`: If task with `{id}` does not exist or does not belong to the user.

### `PATCH /api/{user_id}/tasks/{id}/complete`
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
    "created_at": "2025-12-10T09:00:00.000Z",
    "updated_at": "2025-12-10T12:00:00.000Z",
    "owner_id": 1
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: Invalid or missing JWT.
  - `403 Forbidden`: If token user ID does not match `{user_id}`.
  - `404 Not Found`: If task with `{id}` does not exist or does not belong to the user.