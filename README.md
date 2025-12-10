# Todo Full-Stack Web Application (Phase II)

This project implements a multi-user Todo web application as Phase II of a hackathon. It transforms a basic console-based Todo app into a full-stack web solution with persistent storage, user authentication, and a responsive frontend.

## 🚀 Objective

To build a modern, multi-user Todo web application that allows users to manage their personal tasks securely through a web interface.

## ✨ Features

-   **User Authentication:** Secure registration and login using JWTs.
-   **Personalized Task Management:** Each user can only view and manage their own tasks.
-   **Task CRUD:**
    -   **Add:** Create new tasks with title and optional description.
    -   **List:** View all tasks belonging to the authenticated user.
    -   **Update:** Modify task titles and descriptions.
    -   **Delete:** Remove tasks permanently.
    -   **Mark Complete:** Toggle the completion status of tasks.
-   **Responsive UI:** A user-friendly interface accessible across various devices.

## 💻 Tech Stack

### Frontend
-   **Framework:** Next.js 16+ (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Authentication:** Client-side JWT handling (stored in cookies)

### Backend
-   **Framework:** FastAPI (Python)
-   **ORM:** SQLModel
-   **Database:** Neon Serverless PostgreSQL
-   **Authentication:** JWT-based ("Better Auth" custom implementation)

## 📦 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (LTS version)
-   Python 3.9+
-   `npm` or `yarn` or `pnpm`
-   `pip`
-   A Neon PostgreSQL database instance (or any PostgreSQL compatible database)

### 1. Environment Variables

Create `.env` files in both the `backend/` and `frontend/` directories based on their respective `.env.example` templates.

#### `backend/.env`
```
DATABASE_URL="postgresql://user:password@host:port/database" # Your Neon DB URL
BETTER_AUTH_SECRET="your-super-secret-key" # A long, random string for JWT signing
```

#### `frontend/.env.local`
```
NEXT_PUBLIC_API_URL="http://localhost:8000" # URL where your FastAPI backend is running
```

### 2. Backend Setup

Navigate to the `backend/` directory, install dependencies, and run the server.

```bash
# Navigate to backend directory
cd backend

# Create and activate a Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run the FastAPI server
# This will also create database tables on startup if they don't exist
uvicorn app.main:app --reload
```
The backend API will be available at `http://localhost:8000`. You can access its interactive API documentation (Swagger UI) at `http://localhost:8000/docs`.

### 3. Frontend Setup

Navigate to the `frontend/` directory, install dependencies, and run the development server.

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install # or yarn install or pnpm install

# Run the Next.js development server
npm run dev # or yarn dev or pnpm dev
```
The frontend application will be available at `http://localhost:3000`.

## 🌐 Usage

1.  **Register:** Access `http://localhost:3000/register` to create a new user account.
2.  **Login:** Log in with your new credentials at `http://localhost:3000/login`.
3.  **Manage Tasks:** Upon successful login, you will be redirected to the dashboard (`http://localhost:3000/`) where you can add, view, update, delete, and mark tasks as complete. Each user's tasks are strictly isolated.

## 📝 Specifications

This project adheres to a Spec-Driven Development (SDD) approach. Detailed specifications for the application's features, API, database schema, and UI/UX can be found in the `/specs` directory.

## 🤝 Contributing

Contributions are welcome! Please follow the established specification-driven workflow.

## 📜 License

This project is licensed under the MIT License.
