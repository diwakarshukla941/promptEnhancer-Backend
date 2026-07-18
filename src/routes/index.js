import express from 'express'
import healthRoutes from './health.js'
import analysisRoutes from './analysis.js'
import optimizeRoutes from './optimize.js'
import compareRoutes from './compare.js'
import playgroundRoutes from './playground.js'
import testsRoutes from './tests.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/analyze', analysisRoutes)
router.use('/optimize', optimizeRoutes)
router.use('/compare', compareRoutes)
router.use('/playground', playgroundRoutes)
router.use('/tests', testsRoutes)

export default router
