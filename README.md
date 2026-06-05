# AI Image Generator

A full-stack AI image generator built with React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, and Google Gemini image generation.

## Features
- React + TypeScript frontend
- Tailwind CSS modern UI
- Gemini-powered image generation through a backend API
- Download generated images
- MongoDB-backed image history
- Dark and light theme toggle
- Prompt templates
- Responsive mobile-first layout
- Deploy-ready for Vercel and Render

## Project structure
```text
ai-image-generator/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

## Tech stack
### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express
- TypeScript
- Mongoose
- Google Gemini API

## Local development

### 1. Install dependencies
```bash
cd client
npm install

cd ../server
npm install
```

### 2. Configure environment variables
Create the environment files from the examples.

Frontend `client/.env`
```bash
VITE_API_URL=http://localhost:5000/api
```

Backend `server/.env`
```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ai-image-generator
GEMINI_API_KEY=your_google_api_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Run the backend
```bash
cd server
npm run dev
```

### 4. Run the frontend
```bash
cd client
npm run dev
```

## API endpoints
- `POST /api/images/generate`
- `GET /api/images/history`
- `GET /api/health`

## Deploy frontend to Vercel
1. Import the `client` folder as a Vercel project.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. Add environment variable:
   - `VITE_API_URL=https://your-render-service-url/api`

## Deploy backend to Render
1. Create a new Web Service from the `server` folder.
2. Build command:
   - `npm install && npm run build`
3. Start command:
   - `npm run start`
4. Add environment variables:
   - `PORT=10000`
   - `MONGODB_URI=your_mongodb_connection_string`
   - `GEMINI_API_KEY=your_google_api_key`
   - `CLIENT_URL=https://your-vercel-domain.vercel.app`
   - `NODE_ENV=production`

## Notes
- The current version stores image base64 in MongoDB for fast MVP delivery.
- A future phase can add authentication, user-specific history, and cloud object storage.
