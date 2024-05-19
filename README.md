# Task Management Application

## Overview

This Task Management application is a comprehensive tool designed to help users manage their tasks efficiently. It provides features for creating, assigning, tracking, and updating tasks. The application is built with a React Native frontend and an Express.js backend, using MongoDB for data storage.

## Features

- **User Authentication**: Secure user login and registration with JWT authentication.
- **Task Management**: Users can create, view, update, and delete tasks. Each task can have a status of pending, submitted, or done.
- **File Upload and Download**: Users can upload files related to tasks and download them when needed.
- **User-specific Tasks**: Fetch tasks specific to the logged-in user, ensuring personalized task management.
- **Responsive Design**: The application is designed to work seamlessly on various devices, thanks to Ant Design.

## Technologies Used

- **Frontend**: React Native
- **Backend**: Express.js
- **Database**: MongoDB
- **File Handling**: Multer for file uploads

## Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/Faishal24/task-management--frontend.git
    git clone https://github.com/Faishal24/task-management--backend.git
    ```

2. **Install dependencies for both frontend and backend:**
    ```bash
    # For backend
    cd backend
    npm install

    # For frontend
    cd ../frontend
    npm install
    ```
    
3. **Run the application:**
    ```
    # Start the backend server
    cd backend
    npm start

    # Start the frontend application
    cd ../frontend
    npm start
    ```

## Usage

1. **Login**: Use your credentials to log in.
2. **Manage Tasks**: Create new tasks, update their status, and upload or download related files.
3. **View Tasks**: See all tasks assigned to you and their current status.
4. **View Report**: See all worker and their tasks.

## Contributing

We welcome contributions to improve the Task Management application. Please fork the repository and submit pull requests.
