# Spec: Authentication and Authorization

This spec defines multi-user behavior and data isolation using "Better Auth" JWTs.

## User Story: User Registration
- **As a new visitor,**
- **I want to register for an account,**
- **So that I can have my own private task list.**

### Acceptance Criteria
- **Given** I am on the `/register` page,
- **When** I submit a unique email and a password,
- **Then** a new user account is created.
- **And** I am logged in and issued a JWT.

## User Story: User Login
- **As a registered user,**
- **I want to log in,**
- **So that I can access my tasks.**

### Acceptance Criteria
- **Given** I am on the `/login` page,
- **When** I submit my correct credentials,
- **Then** I am issued a JWT.
- **And** I am redirected to my task dashboard.

## Core Requirement: Data Isolation
- **As an authenticated user,**
- **I want to be sure that I can only access my own tasks,**
- **So that my data remains private.**

### Acceptance Criteria
- **Given** I am logged in as User A,
- **When** I make an API request to any `/api/{user_id}/tasks` endpoint,
- **Then** the backend **MUST** verify that my JWT's user ID matches `{user_id}`.
- **And if** the IDs do not match, the API **MUST** return a `403 Forbidden` error.
- **And if** the IDs match, the API **MUST** only perform database operations on tasks owned by me.