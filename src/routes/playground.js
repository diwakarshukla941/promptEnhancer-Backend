import express from 'express'
import { structuredResponse } from '../services/aiService.js'
import { playgroundSchema } from '../utils/schema.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const originalPrompt = String(req.body.originalPrompt || '')
    const optimizedPrompt = String(req.body.optimizedPrompt || '')
    const testInput = String(req.body.testInput || 'Use a realistic sample input.')
    const result = await structuredResponse(
      `Simulate outputs for the original and optimized prompts using this input.\nInput: ${testInput}\nOriginal prompt:\n${originalPrompt}\nOptimized prompt:\n${optimizedPrompt}`,
      playgroundSchema,
      'prompt_playground',
    )
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
