# Todo App using PERN Stack

<!-- ![Todo App](todo_app_screenshot.png) -->

A basic Todo app built using the PERN stack (PostgreSQL, Express, React, Node).

## Introduction

This project is a simple Todo application that allows users to create, edit, and delete tasks. It utilizes the PERN stack, which stands for PostgreSQL, Express, React, and Node, to provide a seamless user experience.

## Folder Structure

The project contains the following files and directories:

├── index.js # Backend server entry point
├── db.js # Configuration for connecting to the PostgreSQL database
├── database.sql # SQL file for creating the necessary database tables
├── src
│ ├── App.js # Main component for the React frontend
│ ├── index.js # Entry point for the React frontend
│ ├── components
│ │ ├── EditTodo.jsx # Component for editing a todo item
│ │ ├── InputTodo.jsx # Component for adding new todo items
│ │ └── ListTodos.jsx # Component for displaying the list of todos

## Installation

To run this application locally, follow these steps:

1. Clone the repository to your local machine.
2. Install Node.js and PostgreSQL if you haven't already.
3. Set up the PostgreSQL database using the `database.sql` file provided in the root directory.
4. Navigate to the root directory and install the backend dependencies using `npm install`.
5. Navigate to the `src` folder and install the frontend dependencies using `npm install`.

## Running the Application

1. Start the backend server by running `nodemon index.js` in the root directory.
2. Start the frontend development server by running `npm start` in the `src` folder.

## Dependencies

The project uses the following npm packages:

- `express`: Web framework for the backend server.
- `pg`: Node.js modules for interfacing with PostgreSQL database.
- `cors`: Middleware to enable Cross-Origin Resource Sharing.
- `dotenv`: Loads environment variables from .env file.

## Contributing

Contributions to this project are welcome! Feel free to submit pull requests or report any issues you encounter.

## Contact

For any inquiries or questions about the project, you can reach me at [farazsci@gmail.com](mail).
