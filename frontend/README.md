# Who Said This? 🤔

A quote attribution quiz application that tests users' knowledge of famous quotes from both global and Indonesian figures. Users attempt to identify who said a particular quote by choosing from multiple-choice options.

## Project Purpose

**Who Said This?** is an interactive quiz game designed to test and expand knowledge of famous quotes from historical and contemporary figures. The application features:

- **Diverse Quote Collection**: Famous quotes from both global icons (Steve Jobs, Albert Einstein, etc.) and Indonesian figures (Soekarno, Mohammad Hatta, etc.)
- **Interactive Learning**: Multiple-choice format with immediate feedback
- **Session-based Gameplay**: Personalized experience with user sessions
- **Randomized Questions**: Each quiz session presents 5 random questions from the database

## Architecture Overview

### Technology Stack
- **Frontend Framework**: Next.js 15.4.5 with React 19
- **Styling**: Tailwind CSS v4 with custom design system
- **Language**: TypeScript for full type safety
- **Development**: Turbopack for fast development builds
- **State Management**: React hooks (useState, useEffect)
- **Session Management**: Client-side localStorage-based sessions

### Key Libraries
- `class-variance-authority` & `clsx` - Dynamic CSS class management
- `tailwind-merge` - Tailwind class conflict resolution  
- `lucide-react` - Icon components
- Custom utility functions for conditional styling

## Project Structure & Architecture Patterns

### Route-Based Architecture (Next.js App Router)
```
src/app/
├── (home)/              # Route group for home page
│   ├── components/      # Home-specific components
│   └── page.tsx        # Home page entry point
├── login/              # Authentication page
│   └── page.tsx        # Login page
├── quiz/               # Quiz functionality
│   ├── components/     # Quiz-specific components
│   ├── utils/          # Quiz logic and utilities
│   └── page.tsx        # Quiz page entry point
└── layout.tsx          # Root application layout
```

### Component Architecture

#### Page Components (`page.tsx` files)
- Handle routing, session validation, and high-level state
- Implement session guards and redirects
- Delegate rendering to specialized components

#### Feature Components
- `QuizContainer` - Main quiz orchestration and state management
- `QuizCard` - Individual question rendering and user interaction
- `MemberHomePage` - Dashboard for authenticated users
- `QuizFinishPage` - Quiz completion and navigation

#### Shared Components
- `PageHeader` - Consistent navigation and branding across pages
- UI components in `src/components/ui/` for reusable elements

## Application Flow

### Authentication Flow
```
User visits app → Check session → 
├─ Session exists → Redirect to Home
└─ No session → Show Login → Create session → Home
```

### Quiz Flow
```
Start Quiz → Initialize State → 
├─ Show Question → User Answers → 
├─ Show Feedback → Continue → Next Question
└─ 5 Questions Complete → Finish Page
```

### Navigation Flow
- **Route Guards**: All pages validate session status on load
- **Automatic Redirects**: 
  - Unauthenticated users → `/login`
  - Authenticated users trying to access login → `/` (home)
- **Quiz Isolation**: Quiz state resets on each new quiz session

### Key Features
- **Question Randomization**: Fisher-Yates shuffle algorithm ensures unique question order
- **Duplicate Prevention**: Tracks answered questions to avoid repetition
- **Visual Feedback**: Color-coded answer states (green=correct, red=incorrect)
- **Progress Tracking**: Real-time question counter and completion percentage
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Version 18.x or later
- **pnpm**: Package manager (recommended) or npm/yarn
- **Git**: For version control

### System Requirements
- **Operating System**: macOS, Windows, or Linux
- **Browser**: Modern web browser with JavaScript enabled
- **Memory**: At least 4GB RAM for development

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd whosaidthis-fe
```

### 2. Install Dependencies
Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Run the Development Server
```bash
pnpm dev
```

Or:
```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
pnpm build
pnpm start
```

### 5. Linting
```bash
pnpm lint
```

## Development Notes

- **Turbopack**: The project uses Turbopack for faster development builds
- **Client-Side Architecture**: No backend dependency - all data stored locally or statically
- **Static Data**: Quiz questions are stored in `src/data/quiz-questions.json`
- **Session Management**: Simple localStorage-based authentication without server complexity

## Project Structure Details

```
whosaidthis-fe/
├── src/
│   ├── app/                    # Next.js app router pages
│   ├── components/             # Reusable UI components
│   ├── data/                   # Static data and type definitions
│   └── lib/                    # Utility functions and helpers
├── public/                     # Static assets
├── package.json               # Project dependencies and scripts
├── next.config.ts             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

