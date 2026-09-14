# Chinese Auntie AI 👵

> Sometimes you don't need an AI assistant. Sometimes you just need an auntie to tell you that you're doing everything wrong. 🌟

Chinese Auntie AI is a full-stack web app that channels the energy of a traditional Chinese auntie into an AI chatbot. She's caring, opinionated, dramatic, and blunt — she'll ask if you've eaten yet, complain gently when you sleep too late, drop some Singlish/Chinglish ("Aiya!"), and give you unsolicited life advice whether you asked for it or not.

This project was inspired by my mom, who has spent the entire year lecturing me every time we talk on the phone. So I solved the problem the only reasonable way: I built an AI to lecture me for her. 🎎

## ✨ Features

- **Authentic auntie energy** — The chatbot speaks with a custom system prompt that makes Gemini act like a traditional Chinese auntie: dramatic, blunt, a bit naggy, and deeply caring.
- **Multi-turn conversations** — Auntie remembers the conversation and keeps up to ~20 recent messages for context.
- **Persistent chat history** — Your conversation with Auntie is saved to `localStorage` and restored when you come back. A "Refresh chat" button in the top-right of the chat clears it.
- **Polished chat UI** — Typing indicator with animated dots, auto-scroll to the newest message, and a warm Tailwind-styled interface with a sidebar explaining the project.
- **Night patrol mode** — Message her after 11 PM and she will *not* be happy about your sleeping habits. 🚨

## 🧱 Tech Stack

### Backend (`backend/`)
- **Node.js** + **Express** — REST API
- **Google Gemini** (`@google/genai`) — AI model powering Auntie (`gemini-3.6-flash`)
- **dotenv** — environment variable management
- **nodemon** — dev server auto-reload

### Client (`client/`)
- **React 19** + **TypeScript** — frontend UI
- **Vite** — build tool & dev server (proxies `/api` to the backend)
- **Tailwind CSS** — styling and the hand-written "Patrick Hand" font
- **ESLint** — linting

## 📁 Project Structure

```
chinese-auntie/
├── backend/                 # Express + Gemini AI server
│   ├── server.js            # API server & chat endpoint
│   └── package.json
└── client/                  # React + Vite frontend
    ├── index.html
    ├── vite.config.js       # Dev server + /api proxy config
    └── src/
        ├── App.tsx          # Layout: Sidebar + Chatbox
        ├── main.tsx         # App entry point
        ├── context/
        │   └── ChatContext.tsx   # Chat state, history & API calls
        └── components/
            ├── Chatbox.tsx       # Message bubbles & typing indicator
            ├── ChatInput.tsx     # Message input + send button
            └── Sidebar.tsx       # Project intro panel
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18+ recommended)
- A **Google Gemini API key** from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone & install

```bash
git clone git@github.com:gingerbreadmocha/auntie-knows-best.git chinese-auntie
cd chinese-auntie
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with your Gemini API key:

```env
GEMINI_API_KEY=your-api-key-here
PORT=3000            # optional, defaults to 3000
```

Start the API server:

```bash
npm run dev          # dev mode (nodemon, auto-reloads on changes)
# or
npm start            # production mode
```

You should see: `Server is running on port: 3000`

### 3. Client setup

In a second terminal:

```bash
cd client
npm install
```

The client's `vite.config.js` proxies `/api` requests to the backend (default `http://localhost:3000`). To point it elsewhere, add a `.env` in `client/`:

```env
API_PROXY_TARGET=http://localhost:3000   # optional
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and say hi to Auntie to get started! 🎉

## 📡 API Reference

### `POST /api/chat`

Sends a message to Auntie and gets her reply.

**Request body:**

```json
{
  "message": "I slept at 3am last night",
  "history": [
    { "role": "user", "parts": [{ "text": "hi auntie" }] },
    { "role": "model", "parts": [{ "text": "Aiya, have you eaten yet?" }] }
  ]
}
```

| Field     | Type   | Required | Description                                   |
|-----------|--------|----------|-----------------------------------------------|
| `message` | string | yes      | The user's new message                        |
| `history` | array  | no       | Prior turns (`role` + `parts`) for context    |

**Success response (`200`):**

```json
{
  "reply": "AIYA! 3am?! You think your liver is made of iron, is it? Drink some water and go sleep NOW. Auntie is very worried about you!"
}
```

**Error responses:** `400` if `message` is missing, `500` if the AI call fails.

## 🛠️ Development

### Available scripts

| Directory | Command        | Description                                   |
|-----------|----------------|-----------------------------------------------|
| `backend` | `npm run dev`  | Run API server with auto-reload (nodemon)     |
| `backend` | `npm start`    | Run API server                                |
| `client`  | `npm run dev`  | Start Vite dev server with HMR                |
| `client`  | `npm run build`| Build production bundle to `client/dist/`     |
| `client`  | `npm run preview` | Preview the production build              |
| `client`  | `npm run lint` | Run ESLint                                    |

### Tweaking Auntie's personality

Auntie's entire personality lives in the `AUNTIE_SYSTEM_INSTRUCTION` constant at the top of [`backend/server.js`](backend/server.js). Want her to nag less about sleep or complain more about spending? Edit it there, restart the server, and go cause trouble.

## 🙏 Acknowledgments

- **My mom**, the original inspiration and source of all the bedtime lectures. ❤️
- **Google Gemini** for bringing Auntie to life.
