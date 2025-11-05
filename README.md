# Test-Practical-Git
Testing common Git functionality, such as version control operations and using GitHub as a cloud-based repository.

🧾 Cheat Sheet Project

Intro
At the beginning, this project started as a simple test area to practice Git and Git Bash features.
The main idea remained the same, but later I decided to turn it into a kind of cheat sheet.

Over time, I made it more generic — not limited to a single topic, but suitable for organizing and summarizing any topic I might work on in the future.


🧩 Project Architecture Overview

This project follows a modular three-layer architecture, designed to keep the codebase clean, scalable, and maintainable.
Each part of the system has a clear and independent responsibility, ensuring a well-structured flow of data between the user interface, the server, and the database.

🔹 Frontend (Public Folder)

The frontend represents the user-facing part of the application.
It is built with vanilla JavaScript, HTML, and CSS, focusing on user interaction and dynamic interface behavior.
User actions are captured through event listeners, and the frontend communicates with the backend via HTTP requests.

Main responsibilities:

Manage the user interface and handle DOM interactions.

Capture and respond to user input.

Communicate with the backend through the Fetch API.

Render responses and update the UI dynamically.

🔹 Backend (Server Layer – Express)

The backend serves as the communication bridge between the frontend and the database.
It is built with Express.js, a flexible web framework for Node.js.
This layer handles incoming HTTP requests, executes business logic, and returns responses to the client.

Main responsibilities:

Listen for and route client requests.

Process and validate incoming data.

Communicate with the database layer for data operations.

Return responses in JSON or other formats.

Handle errors gracefully using try/catch mechanisms.

🔹 Database Layer (SQLite)

The database layer is responsible for data persistence and structure.
This project uses SQLite, a lightweight and self-contained database that integrates seamlessly with Node.js.
It is ideal for small to medium-sized applications and requires no external server.

Main responsibilities:

Initialize and manage the local database file (.db).

Define and create tables using SQL schemas.

Handle all data operations (CRUD).

Maintain separation between business logic and data storage.

[Frontend (HTML + JS)]  ⇄  [Backend (Express)]  ⇄  [Database (SQLite)]
        ↑                         ↑                         ↑
        │                         │                         │
     User Input              Request Handling           Data Storage