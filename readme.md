# Full-Stack Intern Assignment

This repository contains the submission for the Full-Stack Intern Assignment. It includes a React frontend built with TypeScript and Vite, and a Node.js backend using TypeScript, Express, Prisma, and MongoDB/PostgreSQL.

## Objective

The goal was to build a full-stack application based on a provided Figma design (for the login page) and specific technical requirements. The application implements user registration and login functionality.

**Note on Figma Design:** The provided Figma link only contained a design for the Login page. To create a fully functional application as required, the Registration page and a minimal Dashboard/Authenticated view were implemented based on the styling and components present in the provided Login design.

## Video Demonstration

[Link to Google Drive Video Demonstration](https://drive.google.com/file/d/1xaNJXe3KUiFaIc5QSh4iy56vDXGqv5F6/view?usp=sharing) - **<-- Replace this with your actual Google Drive link! Make sure it's accessible.**

## Features

*   User Registration (Email and Password)
*   User Login
*   Basic authenticated view/dashboard displayed after successful login.
*   Frontend form validation using Zod and React Hook Form.
*   API interaction managed with React Query for fetching, caching.
*   Type safety across frontend and backend using TypeScript.
*   Backend API built with Node.js and Express.
*   Database(mongodb) management using Prisma ORM.
*   Password hashing using bcrypt.
*   Basic API error handling.

## Tech Stack

**Frontend:**

*   React 18+
*   TypeScript
*   Vite (or Create React App)
*   React Router DOM (`react-router-dom`)
*   React Query (`@tanstack/react-query`)
*   React Hook Form (`react-hook-form`)
*   Zod (for schema validation)
*   Axios (for API calls)

**Backend:**

*   Node.js (LTS version recommended)
*   TypeScript
*   Express.js
*   Prisma ORM
*   <your-database-type> (e.g., MongoDB, PostgreSQL) - Specify which one you used!
*   `ts-node-dev` (for development)
*   `bcrypt` (for password hashing)
*   `cors`
*   `dotenv`


## Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (v16 or later recommended)
*   npm or yarn
*   Git
*   A running instance of `<your-database-type>` (e.g., MongoDB locally or via Atlas, PostgreSQL server)

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:P0SSIBLE-0/assignment.git
    cd <your-repo-name>
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        # or yarn install
        ```
    *   Create a `.env` file in the `backend` directory by copying the example (if you provide one) or creating it manually:
        ```bash
        # Example: cp .env.example .env
        # Or just create a new file named .env
        ```
    *   Edit the `.env` file and add your database connection string:
        ```dotenv
        # backend/.env
        # Example for MongoDB Atlas:
        DATABASE_URL="mongodb+srv://<username>:<password>@<your-cluster-url>/<your-database-name>?retryWrites=true&w=majority"

        # Example for PostgreSQL:
        # DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"

        # Optional: Define a port if needed (defaults often work)
        # PORT=3001
        ```
    *   **Initialize/Sync the database schema:**
        *   **If using MongoDB:** Push the schema to set up indexes.
            ```bash
            npx prisma db push
            ```
        *   **If using PostgreSQL (or other SQL DB):** Apply migrations.
            ```bash
            npx prisma migrate dev --name init
            ```
    *   Generate the Prisma Client:
        ```bash
        npx prisma generate
        ```

3.  **Frontend Setup:**
    *   Navigate to the frontend directory from the root:
        ```bash
        cd ../frontend
        # or just `cd frontend` if you are already in the root
        ```
    *   Install dependencies:
        ```bash
        npm install
        # or yarn install
        ```
    *   Create a `.env` file in the `frontend` directory:
        ```bash
        # Example: cp .env.example .env
        # Or just create a new file named .env
        ```
    *   Edit the `.env` file and add the base URL for your backend API:
        ```dotenv
        # frontend/.env
        # For Vite:
        VITE_API_BASE_URL=http://localhost:3001/api

        # For Create React App (prefix with REACT_APP_):
        # REACT_APP_API_BASE_URL=http://localhost:3001/api
        ```
        *(Ensure the port `3001` matches the port your backend will run on)*

## Running the Application Locally

You need to run both the backend and frontend servers simultaneously in separate terminals.

1.  **Start the Backend Server:**
    *   Navigate to the backend directory:
        ```bash
        cd path/to/your/project/backend
        ```
    *   Run the development server:
        ```bash
        npm run dev
        ```
    *   The backend should now be running (typically on `http://localhost:3001`).

2.  **Start the Frontend Server:**
    *   Open a **new terminal window/tab**.
    *   Navigate to the frontend directory:
        ```bash
        cd path/to/your/project/frontend
        ```
    *   Run the development server:
        ```bash
        npm run dev
        ```
    *   The frontend development server should start (typically on `http://localhost:5173` for Vite or `http://localhost:3000` for CRA). Open this URL in your browser.

## API Endpoints

The following backend API endpoints are available:

*   `POST /api/auth/register`: Creates a new user. Expects `email` and `password` in the request body.
*   `POST /api/auth/login`: Authenticates a user. Expects `email` and `password` in the request body.

