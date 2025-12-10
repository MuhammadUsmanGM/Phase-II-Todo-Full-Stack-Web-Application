# Spec: Task CRUD Features

This specification details the user stories for core task management functionality.

## User Story: Listing Tasks
- **As an authenticated user,**
- **I want to see a list of all my tasks,**
- **So that I can manage my workload.**

### Acceptance Criteria
- **Given** I am logged in,
- **When** I view the main task dashboard,
- **Then** I see a list containing only tasks created by me.
- **And** if I have no tasks, a message "You have no tasks." is displayed.

## User Story: Adding a Task
- **As an authenticated user,**
- **I want to add a new task,**
- **So that I can capture new work items.**

### Acceptance Criteria
- **Given** I am on the task dashboard,
- **When** I enter a title and description and click "Add Task",
- **Then** the new task appears in my task list.
- **And** it is marked as "incomplete" by default.

## User Story: Updating a Task
- **As an authenticated user,**
- **I want to edit the title and description of a task,**
- **So that I can update its details.**

### Acceptance Criteria
- **Given** I am viewing a task,
- **When** I enter an edit mode, change the text, and save,
- **Then** the task's information is updated in the list.

## User Story: Deleting a Task
- **As an authenticated user,**
- **I want to delete a task,**
- **So that I can remove completed or irrelevant items.**

### Acceptance Criteria
- **Given** I am viewing a task in my list,
- **When** I click the "Delete" button and confirm,
- **Then** the task is permanently removed from my list.

## User Story: Marking a Task as Complete
- **As an authenticated user,**
- **I want to toggle the completion status of a task,**
- **So that I can track my progress.**

### Acceptance Criteria
- **Given** I am viewing an incomplete task,
- **When** I click the checkbox next to it,
- **Then** the task is visually marked as "complete".
- **And when** I click the checkbox on a complete task,
- **Then** it is visually marked as "incomplete".