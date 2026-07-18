import express from 'express'
import { provider, model, openaiApiKey, geminiApiKey } from '../config/provider.js'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({
    ok: true,
    provider,
    model,
    aiConfigured: provider === 'gemini' ? Boolean(geminiApiKey) : Boolean(openaiApiKey),
  })
})

export default router
