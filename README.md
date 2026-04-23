# WebSocket Chat Application

A real-time chat application built with React (Vite) frontend and Spring Boot backend using STOMP over WebSocket.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite |
| WebSocket | STOMP + SockJS |
| Backend | Spring Boot 4.0.5 |
| Protocol | WebSocket (STOMP) |

## Project Structure

```
WEBSOCKET/
├── src/
│   ├── components/
│   │   ├── Chat.jsx         # Main WebSocket connection
│   │   ├── MessageInput.jsx
│   │   └── MessageList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── polyfills.js        # Browser polyfills
├── vite.config.js
└── package.json
```

## Prerequisites

- Node.js 18+
- Java 21+
- Maven (for backend)

## Setup

### 1. Backend (Spring Boot)

```bash
cd Demo_WebSocket
mvn spring-boot:run
```

Backend runs on **http://localhost:8080**

### 2. Frontend

```bash
cd WEBSOCKET
npm install
npm run dev
```

Frontend runs on **http://localhost:5173** (or available port)

## Usage

1. Start the Spring Boot backend first
2. Start the frontend with `npm run dev`
3. Open http://localhost:5173 in browser
4. Enter a username and send messages

## WebSocket Configuration

| Setting | Value |
|---------|-------|
| Endpoint | `/ws` |
| Subscribe | `/topic/messages` |
| Publish | `/app/chat` |

## Dependencies

### Frontend
- `@stomp/stompjs` - STOMP WebSocket client
- `sockjs-client` - SockJS fallback

### Backend
- Spring WebSocket
- Spring Messaging
- Spring Boot Starter# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
