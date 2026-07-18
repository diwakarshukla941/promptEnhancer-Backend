import express from 'express'
import { structuredResponse } from '../services/aiService.js'
import { testsSchema } from '../utils/schema.js'

const router = express.Router()

router.post('/run', async (req, res, next) => {
  try {
    const prompt = String(req.body.prompt || '')
    const tests = JSON.stringify(req.body.tests || [])
    const result = await structuredResponse(
      `Evaluate whether this prompt will pass each unit test. Return pass/fail and a brief reason.\nPrompt:\n${prompt}\nTests:\n${tests}`,
      testsSchema,
      'prompt_tests',
    )
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
