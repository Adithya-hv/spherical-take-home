# Spherical Take Home: Voices

A web app that gives people a platform to share their voices about the environment and current situation around the globe.  
Built with a live interactive map powered by Mapbox, with markers containing personal audio stories.

## Table of Contents

- [Demo](#demo)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Available Endpoints](#available-endpoints)

## Demo

Live Site: https://spherical-take-home.vercel.app/
API Server: https://spherical-take-home.onrender.com

## Screenshots

![Screenshot 1](./screenshots/Screenshot-1.png)
![Screenshot 2](./screenshots/Screenshot-2.png)
![Screenshot 3](./screenshots/Screenshot-3.png)

## Tech Stack

**Frontend:**

- Vue 3
- Vite
- TypeScript
- Pinia (State Management)
- Vue Router
- Axios
- Mapbox GL JS
- Playwright (E2E Testing)

**Backend:**

- Node.js
- Express
- Mongoose (MongoDB Atlas)
- TypeScript
- Nodemon

**Other Tools:**

- ESLint + Prettier (Code Linting & Formatting)
- UUID (ID generation)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Mapbox API Key

### Installation

```bash
# Clone the repo
git clone https://github.com/...
cd your-repo-name

# Install client dependencies
cd client
yarn install

# Install server dependencies
cd ../server
yarn install

# Start the backend
cd server
yarn dev

# Start the frontend
cd ../client
yarn dev
Make sure to add your .env files for both client and server.
```

## Environment Variables

### Frontend

VITE_MAPBOX_TOKEN = Mapbox Token
VITE_BASE_URL = http://localhost:PORT

### Backend

MONGO_URI = Mongo Token
PORT=3000
FRONTEND_URL=http://localhost:5173 (by default)

## Usage

Open the app in your browser (localhost:5173 by default).

Interact with the map.

Click on markers to listen to personal audio stories.
Click on the map to make comments which are restored on refresh

## Available Endpoints

**GET /comments** — Fetch all comments  
**POST /comments** — Add a new comment (requires body data)  
**GET /comments/by-browserId/:browserId** — Fetch comments by `browserId`  
**DELETE /comments/:commentId** — Delete a comment by `commentId`
