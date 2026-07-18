# PromptForge AI Backend

This repository contains the Express.js backend API for PromptForge AI.

## Overview

The backend serves as the AI engine layer for the PromptForge application. It receives prompt data from the frontend, forwards structured requests to the selected AI provider, and returns normalized JSON results.

Core responsibilities:
- validate incoming requests
- route prompt tasks to AI services
- enforce strict JSON schema output
- normalize score scales between providers
- expose health and status information

## Features

- **AI provider support** for `openai` or `gemini`
- **Structured prompt evaluation** with schema-based JSON responses
- **Prompt analysis** with detailed scoring and recommendations
- **Prompt optimization** for better prompt quality
- **Prompt comparison** between two prompt versions
- **Playground simulation** for original vs optimized prompt outputs
- **Prompt test execution** for pass/fail prompt validation
- **Health endpoint** for connectivity and configuration checks

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy the example environment file:
```bash
copy .env.example .env
```

3. Edit `.env` with your API keys and provider settings.

4. Start development server:
```bash
npm run dev
```

5. Start production server:
```bash
npm start
```

## Environment Variables

The backend uses these variables:

- `AI_PROVIDER` — `openai` or `gemini`
- `OPENAI_API_KEY` — required when `AI_PROVIDER=openai`
- `OPENAI_MODEL` — OpenAI model name (default: `gpt-5.6-terra`)
- `GEMINI_API_KEY` — required when `AI_PROVIDER=gemini`
- `GEMINI_MODEL` — Gemini model name (default: `gemini-3.1-flash-lite`)
- `PORT` — application port (default: `4000`)

Example OpenAI `.env`:
```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.6-terra
PORT=4000
```

Example Gemini `.env`:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
PORT=4000
```

## Architecture

- `src/index.js` — server entry point
- `src/routes/index.js` — router aggregator
- `src/routes/health.js` — health check endpoint
- `src/routes/analysis.js` — prompt analysis endpoint
- `src/routes/optimize.js` — prompt optimization endpoint
- `src/routes/compare.js` — prompt comparison endpoint
- `src/routes/playground.js` — playground simulation endpoint
- `src/routes/tests.js` — prompt test evaluation endpoint
- `src/services/aiService.js` — AI provider orchestration and schema request handling
- `src/config/provider.js` — environment and provider configuration
- `src/config/promptRules.js` — system prompt rules for model behavior
- `src/utils/schema.js` — JSON schema definitions for each response type
- `src/utils/normalize.js` — score normalization utilities

## API Reference

### `GET /api/health`

Returns server and provider status.

**Response**:
```json
{
  "ok": true,
  "provider": "openai",
  "model": "gpt-5.6-terra",
  "aiConfigured": true
}
```

### `POST /api/analyze`

Analyze a prompt and return a structured quality report.

**Request body**:
```json
{ "prompt": "...", "models": [...] }
```

**Response shape**:
```json
{
  "overallScore": 0,
  "scores": {
    "clarity": 0,
    "context": 0,
    "instructions": 0,
    "safety": 0,
    "specificity": 0,
    "formatting": 0
  },
  "missingContext": [],
  "lintWarnings": [],
  "securityWarnings": [],
  "hallucination": {
    "risk": "Low",
    "reason": "",
    "suggestion": ""
  },
  "complexity": "Easy",
  "modelRecommendation": {
    "bestModel": "",
    "reason": "",
    "estimatedCost": "",
    "alternative": ""
  },
  "explainMode": []
}
```

### `POST /api/optimize`

Generate an improved prompt version.

**Request body**:
```json
{ "prompt": "..." }
```

**Response shape**:
```json
{
  "optimizedPrompt": "...",
  "changes": ["..."]
}
```

### `POST /api/compare`

Compare two prompts and return a winner and comparison metrics.

**Request body**:
```json
{ "promptA": "...", "promptB": "..." }
```

**Response shape**:
```json
{
  "winner": "Prompt A",
  "summary": "...",
  "metrics": [
    { "metric": "Clarity", "promptA": "...", "promptB": "..." }
  ]
}
```

### `POST /api/playground`

Simulate outputs for original and optimized prompts using a sample input.

**Request body**:
```json
{ "originalPrompt": "...", "optimizedPrompt": "...", "testInput": "..." }
```

**Response shape**:
```json
{
  "originalOutput": "...",
  "optimizedOutput": "...",
  "verdict": "..."
}
```

### `POST /api/tests/run`

Run prompt test cases and return pass/fail results.

**Request body**:
```json
{ "prompt": "...", "tests": [{ "input": "...", "expected": "..." }] }
```

**Response shape**:
```json
{
  "results": [
    { "input": "...", "status": "Pass", "reason": "..." }
  ]
}
```

## AI Provider Behavior

The backend uses a strict schema-based request pattern:
- `openai.responses.create()` for OpenAI
- a JSON schema request for Gemini
- `promptRules` ensure consistent numeric scores and concise output
- `normalizeAnalysisScores()` converts 0–10 scores to 0–100 if needed

## Error Handling

- returns structured JSON errors on failure
- catches provider configuration issues
- rejects invalid provider values with HTTP 503
- includes a global Express error handler

## Deployment

Deploy to any Node hosting provider.

### Recommended steps

1. Set environment variables on the target host.
2. Install dependencies with `npm install`.
3. Start the service with `npm start`.
4. Ensure the frontend is configured to use the backend URL via `VITE_API_BASE_URL`.

### Platforms

- Vercel (backend via serverless functions)
- Render
- Railway
- Fly.io
- DigitalOcean App Platform

## Notes

- Keep API keys private and do not embed them in frontend code.
- Use the backend for all direct AI provider access.
- The frontend should only send prompt text and UI state.

## Development Scripts

- `npm run dev` — run the backend locally
- `npm start` — start the backend for production
