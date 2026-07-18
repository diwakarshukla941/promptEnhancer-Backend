import express from 'express'
import { structuredResponse } from '../services/aiService.js'
import { compareSchema } from '../utils/schema.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const promptA = String(req.body.promptA || '')
    const promptB = String(req.body.promptB || '')
    const result = await structuredResponse(
      `Compare two prompts for quality, cost, risk, specificity, and consistency.\nPrompt A:\n${promptA}\nPrompt B:\n${promptB}`,
      compareSchema,
      'prompt_comparison',
    )
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
