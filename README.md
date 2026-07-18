# PromptForge AI Backend

This repository contains the Express backend for PromptForge AI.

## Overview

The backend provides a REST API for prompt analysis, optimization, comparison, playground simulation, and prompt test evaluation.

It supports both OpenAI and Gemini providers and is designed for secure API key handling behind the server.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
copy .env.example .env
```

3. Run locally:
```bash
npm run dev
```

4. Run in production:
```bash
npm start
```

## Environment Variables

Example OpenAI configuration:
```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.6-terra
PORT=4000
```

Example Gemini configuration:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
PORT=4000
```

## Project Structure

- `src/` – application code
- `src/routes/` – API route definitions
- `src/services/` – AI integration and request orchestration
- `src/config/` – environment and provider configuration
- `src/utils/` – helper utilities and response normalization

## API Endpoints

- `GET /api/health`
- `POST /api/analyze`
- `POST /api/optimize`
- `POST /api/compare`
- `POST /api/playground`
- `POST /api/tests/run`

## Deployment

Deploy this backend to Render, Railway, Fly.io, or another Node platform.

The frontend should point to the deployed backend URL using `VITE_API_BASE_URL`.
