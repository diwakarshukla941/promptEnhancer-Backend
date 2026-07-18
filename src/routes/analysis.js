import express from 'express'
import { structuredResponse } from '../services/aiService.js'
import { analysisSchema } from '../utils/schema.js'
import { normalizeAnalysisScores } from '../utils/normalize.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const prompt = String(req.body.prompt || '')
    const catalog = JSON.stringify(req.body.models || [])
    const result = await structuredResponse(
      `Analyze this prompt for a prompt engineering IDE.\nUse a 0-100 numeric score scale for overall quality and every sub-score.\nPrompt:\n${prompt}\nAvailable model catalog:\n${catalog}`,
      analysisSchema,
      'prompt_analysis',
    )
    res.json(normalizeAnalysisScores(result))
  } catch (error) {
    next(error)
  }
})

export default router
