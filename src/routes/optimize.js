import express from 'express'
import { structuredResponse } from '../services/aiService.js'
import { optimizeSchema } from '../utils/schema.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const prompt = String(req.body.prompt || '')
    const result = await structuredResponse(
      `Rewrite this prompt into a professional, structured prompt and explain the improvements.\nPrompt:\n${prompt}`,
      optimizeSchema,
      'prompt_optimization',
    )
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
