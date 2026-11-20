# LearnFlow

LearnFlow turns a YouTube video into a personal study set. It extracts the
video transcript, sends the transcript to Google Gemini, and creates:

- A concise summary
- Structured study notes
- Flashcards
- A multiple-choice quiz
- A video category

Generated materials are cached by user and video ID in MongoDB. Users can
browse their saved videos, open materials again, and submit quiz scores.

## Features

- Account registration and login
- HTTP-only access and refresh cookies
- YouTube transcript extraction
- AI-generated summaries, notes, flashcards, and quizzes
- Per-user material caching
- Paginated material library
- Quiz score calculation and profile statistics
- Protected React routes

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router 7, Vite 8, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens, HTTP-only cookies |
| AI | Google Gemini via `@google/genai` |
| Transcripts | `youtube-transcript` |

## Project Structure

```text
LearnFlow/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
└── learnflow-frontend/
    └── src/
        ├── components/
        ├── context/
        ├── layouts/
        ├── pages/
        └── services/
```

## Prerequisites

- Node.js 20 or later
- npm
- A MongoDB database
- A Google Gemini API key

## Getting Started

Clone the repository and enter the project directory:

```bash
git clone https://github.com/abirsutradhar2007/LearnFlow.git
cd LearnFlow
```

### 1. Configure the backend

```bash
cd backend
npm install
```

Create `backend/.env` with the following variables:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model_name

ACCESS_TOKEN_SECRET=use_a_long_random_secret
REFRESH_TOKEN_SECRET=use_a_different_long_random_secret
```

Generate suitable secrets in PowerShell:

```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run that command twice and use the results for the access and refresh secrets.

Start the API:

```bash
npm start
```

### 2. Configure the frontend

Open a second terminal from the project root:

```bash
cd learnflow-frontend
npm install
```

Create `learnflow-frontend/.env`:

```env
VITE_API_URL=your_backend_api_url
```

Start the Vite development server:

```bash
npm run dev
```

## Available Scripts

### Backend

| Command | Description |
|---|---|
| `npm start` | Start the API server |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## API Overview

Base URL: `/api/v1`

### Authentication

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/users/register` | No | Create an account |
| POST | `/users/login` | No | Log in and set cookies |
| POST | `/users/refresh` | Refresh cookie | Refresh the access token |
| POST | `/users/logout` | No | Revoke the refresh token and clear cookies |
| GET | `/users/profile` | Access cookie | Get profile and activity |
| POST | `/users/submitQuiz` | Access cookie | Submit a quiz percentage |

### Materials

All material endpoints require the access cookie.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/materials` | Generate or retrieve cached materials |
| GET | `/materials?page=1&limit=10` | List the user's materials |
| GET | `/materials/:videoId` | Get a material by YouTube video ID |

Generate materials with a JSON request body:

```json
{
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

## Production Notes

- Set `NODE_ENV=production` so authentication cookies use `secure: true`.
- Configure HTTPS and use a frontend/backend deployment setup that is compatible
  with the cookie `sameSite: "lax"` setting.
- Keep `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` private and unique.
- The frontend API URL must include the `/api/v1` suffix.
- Videos without an accessible transcript cannot be converted into materials.