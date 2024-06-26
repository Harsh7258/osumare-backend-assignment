# Task API

This API provides a RESTful interface for managing tasks, including Create, Read, Update, and Delete (CRUD) operations. It utilizes JWT (JSON Web Token) for authentication and cookie-based authorization to ensure secure access to your tasks.

## Prerequisites

Node.js and npm (or yarn) installed on your system.
Installation

## Clone this repository:

_Bash_
git clone https://github.com/Harsh7258/osumare-backend-assignment.git

Navigate to the project directory:

_Bash_
cd task-api

### Install dependencies:

_Bash_
npm install

### Running the API

Start the server:

_Bash_
npm start

This will start the API server on the default port 5000. You can access the API endpoints at http://localhost:5000/taskapi/v1/tasks.

_API Documentation:_

The API documentation is automatically generated using Postman and served at [Postman: TaskApi API docs link](https://documenter.getpostman.com/view/31106866/2sA3QmDEnk). You can explore the endpoints, request parameters, response codes, and data models directly in the browser.

### Authentication:

The API uses JWT authentication for secure access. To interact with the API, you'll need to obtain a JWT token.

_Registration:_ (Optional) This endpoint allows you to create a user account with a username and password. It's not mandatory if you're only using the API for read-only operations.

**POST /taskapi/v1/users**

> Request Body:

JSON

- {
  "email": "your_email_address"
  "username": "your_username",
  "password": "your_password"
- }

> Response:

JSON

- {
  "jwt": "your_jwt_token"
- }

_Login:_ This endpoint accepts a username and password to generate a JWT token.

**POST /taskapi/v1/user/login**

> Request Body:

JSON

- {
  "email": "your_email_addres",
  "password": "your_password"
- }

> Response:

JSON

- {
  "token": "your_jwt_token"
- }

### Authorization:

Once you have a JWT token stored as cookiee, include it in the Authorization header for subsequent API requests:

### Authorization: cookie('jwt')

_API Endpoints_

1. Create Task **(POST /taskapi/v1/tasks)**

Creates a new task.
_Requires authentication._

> Request Body:

JSON

- {
  "task": "task 1"
  "description": "Your task description",
- }

> Response:

JSON

- {
  "id": 1, // Auto-generated ID for the new task,
  "task": "task 1"
  "description": "Your task description",
  "createdAt": "time"
- }

2. Get All Tasks **(GET /taskapi/v1/tasks)**

Retrieves all tasks.

> Response:

JSON

- [
  - {
    "id": 1,
    "task": "task 1"
    "description": "Your task description",
    "createdAt": "time"
  - },
- - // ... other tasks
- ]

3. Get Task by ID **(GET /taskapi/v1/tasks/:id)**

Retrieves a specific task based on its ID.
_Requires authentication._

> Path Parameter:
> _:id_ - The ID of the task to retrieve.

> Response:

JSON

- {
  "id": 1,
  "task": "task 1"
  "description": "Your task description",
  "createdAt": "time"
- }

4. Update Task **(PUT /taskapi/v1/tasks/:id)**

Updates an existing task.
_Requires authentication._

> Path Parameter:
> _:id_ - The ID of the task to update.

> Request Body:

JSON

- {
  "task": "update task" (optional)
  "description": "Updated task description" (optional)
- }

> Response:

JSON

- {
  "id": 1,
  "task": "update task"
  "description": "Updated task description"
  "createdAt": "time"
- }

5. Delete Task **(PUT /taskapi/v1/tasks/:id)**

Deletes an existing task by ID.
_Requires authentication._
