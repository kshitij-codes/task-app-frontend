# Task App Frontend
This repository contains the frontend code for the Task App application. It uses React.js + TypeScript and communicates with the backend API to manage tasks and user authentication and authorization

## Installation
To run the Task App frontend locally, follow these steps:
1. Clone the repository:
```
   git clone https://github.com/kshitij-codes/task-app-frontend.git
```
2. Navigate to the project directory:
```
    cd task-app-frontend
```
3. Install the dependencies:
```
   npm install
```
4. Start the development server:
```
   npm run dev
```
5. The Task App frontend should now be running on `http://localhost:5173`

## Usage
Once the Task App frontend is running, you can use the following features:

- View a list of tasks
- Add a new task
- Update the status of a task (completed or not)
- Edit the details of a task
- Delete a task

## API Integration
The Task App frontend communicates with the backend API to perform CRUD (Create, Read, Update, Delete) operations on tasks. The API endpoints used by the frontend are:

- GET `/api/tasks`: Retrieves a list of tasks
- POST `/api/tasks`: Creates a new task
- PUT `/api/tasks/:id`: Updates the details of a task
- DELETE `/api/tasks/:id`: Deletes a task

## Folder Structure
The folder structure of the Task App frontend is as follows:

- src: Contains the main source code
   - components: Contains reusable components
   - pages: Contains the main pages of the application
   - assets: Contains static assets such as images
   - zustand: Contains state management files

