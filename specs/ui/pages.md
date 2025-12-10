# Spec: UI Pages and States

This document outlines the pages and component states for the frontend application.

## 1. Public Pages (No Authentication Required)

### `/login` - Login Page
- **Purpose:** Allow users to sign in.
- **Components:**
    - `LoginForm`: Contains fields for email and password, a "Login" button, and a link to the Register page.
    - `ErrorMessage`: Displays authentication errors returned from the API.
- **States:**
    - **Default:** Ready for input.
    - **Loading:** After "Login" is clicked, button is disabled, and a spinner is shown.
    - **Error:** If API returns an error, `ErrorMessage` is displayed.

### `/register` - Registration Page
- **Purpose:** Allow new users to create an account.
- **Components:**
    - `RegisterForm`: Fields for email and password, and a "Register" button.
    - `ErrorMessage`: Displays validation errors (e.g., "Email already in use").
- **States:**
    - **Default:** Ready for input.
    - **Loading:** While registration API call is in progress.
    - **Error:** If registration fails.

## 2. Authenticated Pages

### `/` - Task Dashboard
- **Purpose:** Main view for managing tasks. Redirects to `/login` if user is not authenticated.
- **Components:**
    - `Header`: Displays app name and a "Logout" button.
    - `NewTaskForm`: An input field for the task title and an "Add Task" button.
    - `TaskList`: The list of all tasks for the user.
- **States:**
    - **Loading:** Initial state while tasks are being fetched from the API. A loading skeleton or spinner is shown.
    - **Empty:** If the user has no tasks, a message like "You have no tasks. Add one to get started!" is displayed.
    - **Populated:** The `TaskList` component renders a list of `TaskItem` components.

### `TaskItem` (Component)
- **Purpose:** Represents a single task in the list.
- **Components:**
    - `Checkbox`: Toggles the `completed` state of the task.
    - `TaskTitle`: Displays the task title. Can be clicked to enter "edit mode".
    - `DeleteButton`: A button to delete the task.
- **States:**
    - **Default:** Viewing the task title and completion status.
    - **Editing:** The `TaskTitle` becomes a text input, and "Save" / "Cancel" buttons appear.
    - **Deleting:** A confirmation modal could appear before deletion.
    - **Updating:** A visual indicator (e.g., spinner on the item) is shown while an API update is in progress.