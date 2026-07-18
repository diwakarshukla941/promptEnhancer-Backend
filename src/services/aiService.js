import OpenAI from 'openai'
import { promptRules } from '../config/promptRules.js'
import { provider, model, openaiApiKey, geminiApiKey } from '../config/provider.js'

const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null

const jsonSchemaFormat = (name, schema) => ({
  type: 'json_schema',
  name,
  schema,
  strict: true,
})

export async function structuredResponse(input, schema, name) {
  if (provider === 'gemini') {
    return geminiStructuredResponse(input, schema)
  }

  if (provider !== 'openai') {
    const error = new Error(`Unsupported AI_PROVIDER "${provider}". Use "openai" or "gemini".`)
    error.status = 503
    throw error
  }

  if (!openai) {
    const error = new Error('OPENAI_API_KEY is not configured. Add it to .env and restart npm run dev.')
    error.status = 503
    throw error
  }

  const response = await openai.responses.create({
    model,
    input: [
      { role: 'system', content: promptRules },
      { role: 'user', content: input },
    ],
    text: {
      format: jsonSchemaFormat(name, schema),
    },
  })

  return JSON.parse(response.output_text)
}

async function geminiStructuredResponse(input, schema) {
  if (!geminiApiKey) {
    const error = new Error('GEMINI_API_KEY is not configured. Add it to .env and restart npm run dev.')
    error.status = 503
    throw error
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
    geminiApiKey,
  )}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: promptRules }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: input }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseJsonSchema: schema,
      },
    }),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const error = new Error(data?.error?.message || `Gemini request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }

  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('')
  if (!text) {
    const error = new Error('Gemini returned an empty response.')
    error.status = 502
    throw error
  }

  return JSON.parse(text)
}
