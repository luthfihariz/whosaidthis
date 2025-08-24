# Who Said This - Backend

This is the backend service for the "Who Said This" guessing game. It provides APIs for submitting scores and displaying a leaderboard.

## Tech Stack

- **Python 3.11**
- **FastAPI**: A modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Uvicorn**: An ASGI server implementation, used to run the FastAPI application.
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- **Pipenv**: A tool that aims to bring the best of all packaging worlds (bundler, composer, npm, cargo, yarn, etc.) to the Python world.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.11
- Pipenv

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone <repository-url>
cd whosaidthis-be
```

### 2. Install dependencies

Install the project dependencies using Pipenv.

```bash
pipenv install
```

### 3. Activate the virtual environment

Activate the Pipenv shell.

```bash
pipenv shell
```

### 4. Run the application

Run the FastAPI application using Uvicorn. The `--reload` flag will automatically restart the server on code changes.

```bash
uvicorn src.app:app --reload
```

The application will be running at `http://127.0.0.1:8000`. You can access the API documentation at `http://127.0.0.1:8000/docs`.

## Project Structure

```
.
├── Pipfile
├── Pipfile.lock
├── README.md
├── src
│   ├── app.py
│   ├── db.py
│   └── schema.sql
└── whosaidthis.db
```

- `src/app.py`: The main application file containing the FastAPI setup and API endpoints.
- `src/db.py`: Contains database-related functions, such as creating a connection and initializing tables.
- `src/schema.sql`: The SQL schema for creating the database tables.
- `whosaidthis.db`: The SQLite database file.
- `Pipfile` & `Pipfile.lock`: Files for managing project dependencies with Pipenv.

## API Endpoints

- `POST /score`: Submit a score for a user.
  - **Request body**: `{"username": "string", "score": "integer"}`
  - **Response**: `{"status": true}`
- `GET /leaderboard`: Get the top 10 scores.
  - **Response**: `{"items": [{"username": "string", "score": "integer"}]}`
