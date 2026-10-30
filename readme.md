# LearnFlow

## Backend

The Express server is in the `backend` directory. Start it with:

```powershell
cd backend
npm start
```

The server listens on port `3000` by default. Set `PORT` in `backend/src/.env` to
override it. A `GET /health` endpoint returns `{ "status": "ok" }`.