# Spec: UI Pages and States

This document outlines the pages and component states for the frontend application, reflecting the current implementation.

## 1. Public Pages (No Authentication Required)

### `/login` - Login Page (`frontend/app/login/page.tsx`)
- **Purpose:** Allows existing users to sign in.
- **Components:**
    - Login Form: Uses `useState` for email/password, `useAuth` for `login` function, and `authApi.login` for API interaction. Displays loading state and errors.
    - Link to `/register` page.
- **UX Flow:**
    1.  User enters credentials.
    2.  Clicks "Login" (button shows "Logging in..." and is disabled).
    3.  On success, `useAuth().login()` is called, which stores JWT in cookies and redirects to `/`.
    4.  On error, displays error message.
- **States:**
    - **Default:** Input fields enabled, Login button active.
    - **Loading:** Login button disabled, text changes to "Logging in...", input fields disabled.
    - **Error:** Error message displayed above the form.

### `/register` - Registration Page (`frontend/app/register/page.tsx`)
- **Purpose:** Allows new users to create an account.
- **Components:**
    - Register Form: Uses `useState` for email/password, `useAuth` for `login` function, and `authApi.register` for API interaction. Displays loading state and errors.
    - Link to `/login` page.
- **UX Flow:**
    1.  User enters credentials.
    2.  Clicks "Register" (button shows "Registering..." and is disabled).
    3.  On success, `useAuth().login()` is called, which stores JWT in cookies and redirects to `/`.
    4.  On error, displays error message.
- **States:**
    - **Default:** Input fields enabled, Register button active.
    - **Loading:** Register button disabled, text changes to "Registering...", input fields disabled.
    - **Error:** Error message displayed above the form.

## 2. Authenticated Pages

### Frontend Middleware (`frontend/middleware.ts`)
- **Purpose:** Protects authenticated routes and handles redirection based on JWT presence in cookies.
- **Behavior:**
    - If an authenticated user (`token` exists) tries to access `/login` or `/register`, they are redirected to `/`.
    - If an unauthenticated user (`no token`) tries to access a protected route (e.g., `/`), they are redirected to `/login`.

### `/` - Task Dashboard (`frontend/app/(dashboard)/page.tsx`)
- **Purpose:** Main interface for authenticated users to view and manage their tasks.
- **Components:**
    - **Header:** Displays "Your Tasks" title and a "Logout" button. The "Logout" button calls `useAuth().logout()`.
    - **`NewTaskForm`:** (from `frontend/components/NewTaskForm.tsx`) For adding new tasks.
    - **`TaskList`:** (from `frontend/components/TaskList.tsx`) Displays the user's tasks.
    - Uses `useAuth` to get `userId`, `token`, `isAuthenticated`, `isLoading`, `logout`.
    - Fetches tasks via `tasksApi.getTasks`.
- **UX Flow:**
    1.  On page load, `useEffect` checks `isAuthenticated`. If false, redirects to `/login`.
    2.  If authenticated, `useEffect` fetches tasks using `tasksApi.getTasks`.
    3.  `NewTaskForm` allows creation; `TaskList` displays tasks, enabling update/delete/toggle completion via `TaskItem` components.
    4.  Errors during task fetching (e.g., 401/403) trigger `useAuth().logout()`.
- **States:**
    - **Loading Authentication:** Initial state while `AuthContext` determines authentication status.
    - **Loading Tasks:** Spinner or "Loading tasks..." message displayed while fetching tasks.
    - **Error:** Error message displayed (e.g., "Failed to fetch tasks.").
    - **Empty Tasks:** If no tasks, displays "You have no tasks. Add one to get started!".
    - **Populated Tasks:** Displays `TaskList` component.

### `NewTaskForm` (Component) (`frontend/components/NewTaskForm.tsx`)
- **Purpose:** Form for users to add new tasks.
- **Fields:** Title (required), Description (optional).
- **Interactions:** Submits `title` and `description` to `DashboardPage`'s `handleCreateTask` prop.
- **States:** Default, Loading (when submitting).

### `TaskList` (Component) (`frontend/components/TaskList.tsx`)
- **Purpose:** Renders a list of `TaskItem` components.
- **Props:** `tasks` array, `onTaskUpdate`, `onTaskDelete`.
- **States:** Empty list message if `tasks` array is empty, otherwise renders `TaskItem` for each task.

### `TaskItem` (Component) (`frontend/components/TaskItem.tsx`)
- **Purpose:** Displays and manages a single task (view, edit, delete, toggle completion).
- **Props:** `task` object, `onUpdate`, `onDelete`. Uses `useAuth` and `tasksApi`.
- **Interactions:**
    - Checkbox: Calls `tasksApi.toggleTaskCompletion` on change.
    - "Edit" button: Toggles `isEditing` state.
    - Save/Cancel buttons: Save calls `tasksApi.updateTask`, Cancel reverts changes.
    - "Delete" button: Calls `tasksApi.deleteTask` after confirmation.
- **States:**
    - **Default:** Displays title/description, checkbox, Edit/Delete buttons.
    - **Editing:** Title/description become input fields, Save/Cancel buttons appear.
    - **Loading:** Buttons/inputs disabled during API calls.
    - **Completed:** Task title/description get a `line-through` style.