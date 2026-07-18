import 'dotenv/config'

export const provider = process.env.AI_PROVIDER || (process.env.GEMINI_API_KEY ? 'gemini' : 'openai')
export const model =
  provider === 'gemini'
    ? process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite'
    : process.env.OPENAI_MODEL || 'gpt-5.6-terra'
export const openaiApiKey = process.env.OPENAI_API_KEY || ''
export const geminiApiKey = process.env.GEMINI_API_KEY || ''
export const port = process.env.PORT || 4000
