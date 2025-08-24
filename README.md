# Who Said This? 🤔

> **Workshop Project**: This application was developed as part of the **Effective Software Engineering with AI** workshop, held by DuniaCoding on Friday 22nd August and Saturday 23rd August. The project demonstrates practical AI-assisted development techniques and full-stack application architecture.

**Who Said This?** is an interactive quiz game designed to test and expand knowledge of famous quotes from historical and contemporary figures. The application provides a complete learning experience with scoring, leaderboards, and competitive gameplay.

Please check PROMPTS.md for all prompts used for both backend and frontend project during the project implementation.

## 🎯 Project Overview

### Key Features
- **Diverse Quote Collection**: Famous quotes from both global icons and Indonesian figures
- **Interactive Learning**: Multiple-choice format with immediate feedback and timing-based scoring
- **User Management**: Session-based authentication and user tracking
- **Competitive Gameplay**: Leaderboard system with scoring and rankings
- **Responsive Design**: Modern, mobile-first UI with excellent UX
- **Real-time Scoring**: Time-based bonus points for quick answers

## 🏗️ Architecture

This project consists of two main components working together:

### Frontend (`frontend`)
- **Framework**: Next.js 15.4.5 with React 19 and TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks and client-side session management
- **API Integration**: RESTful API calls to backend for scoring and leaderboards

### Backend (`backend`)
- **Framework**: FastAPI with Python 3.11
- **Database**: SQLite with custom database layer (no ORM)
- **Package Management**: Pipenv
- **Testing**: pytest with httpx for integration testing
- **Deployment**: Docker and Docker Compose ready

## 📁 Project Structure

```
whosaidthis/
├── frontend/                    # Frontend Application
│   ├── src/
│   │   ├── app/                 # Next.js app router pages
│   │   │   ├── (home)/          # Home page with leaderboard
│   │   │   ├── login/           # User authentication
│   │   │   ├── quiz/            # Quiz gameplay
│   │   │   └── api/             # API route handlers
│   │   ├── components/          # Reusable UI components
│   │   ├── data/                # Static data and types
│   │   └── lib/                 # Utility functions
│   ├── PROMPTS.md              # Development prompts and history
│   └── README.md               # Frontend-specific documentation
│
└── backend/                     # Backend API
    ├── src/
    │   ├── app.py               # FastAPI application
    │   ├── db.py                # Database connection management
    │   ├── schema.sql           # Database schema
    │   └── test/                # Test suite
    ├── Dockerfile               # Container configuration
    ├── docker-compose.yml       # Multi-container setup
    ├── CONTRACT.md              # API contract documentation
    ├── PROMPTS.md              # Development prompts and history
    └── README.md               # Backend-specific documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 18.x or later
- **Python**: Version 3.11 or later
- **pnpm**: Package manager (recommended)
- **pipenv**: Python dependency management
- **Docker** (optional): For containerized deployment

### Frontend Setup
```bash
cd frontend
pnpm install
pnpm dev
```
Access at: [http://localhost:3000](http://localhost:3000)

### Backend Setup
```bash
cd backend
pipenv install
pipenv shell
uvicorn src.app:app --reload
```
Access at: [http://localhost:8000](http://localhost:8000)

## 🔌 API Integration

The frontend communicates with the backend through RESTful APIs:

- **POST /score**: Submit user quiz scores
- **GET /leaderboard**: Retrieve top 10 user rankings
- **GET /**: Health check endpoint

Detailed API documentation is available in `backend/CONTRACT.md`.

## 🎮 Game Flow

1. **Authentication**: Users create/enter a session with their username
2. **Quiz Session**: 5 randomized questions with multiple-choice answers
3. **Scoring**: Points calculated based on correctness and response time
4. **Leaderboard**: Rankings updated and displayed on the home page

### Scoring System
- **Base Points**: 10 points per correct answer
- **Time Bonus**: Extra points for answers under 10 seconds (10s - response_time)
- **Example**: Answer in 5 seconds = 15 points (10 base + 5 bonus)