# LearnFlow 🚀

**Turn YouTube videos into structured learning materials with AI.**

LearnFlow is a MERN stack application that converts YouTube videos into summaries, detailed notes, flashcards, and interactive quizzes.

## ✨ Features

- AI-powered video summaries and notes.
- Automatic flashcard and quiz generation.
- YouTube transcript extraction.
- Smart caching to avoid repeated AI API calls.
- Browse previously generated materials.
- Paginated video library.
- Interactive quizzes with instant score calculation.

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **AI:** Gemini API
- **Transcript:** YouTube transcript extraction package

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
cd LearnFlow
```

**2. Setup Backend**

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

**3. Setup Frontend**

```bash
cd learnflow-frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Start the frontend:

```bash
npm run dev
```

## 🔌 API Endpoints

Base URL: `/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/materials` | Generate or retrieve cached materials |
| GET | `/materials` | Get all materials with pagination |
| GET | `/materials/:videoId` | Get materials by video ID |

**Example request:**

```json
{
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```



---

⭐ If you find LearnFlow useful, consider giving it a star!