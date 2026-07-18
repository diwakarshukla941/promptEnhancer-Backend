import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import routes from './routes/index.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use('/api', routes)

app.use((error, _req, res, _next) => {
  const status = error.status || 500
  res.status(status).json({
    error: error.message || 'Unexpected server error',
  })
})

app.listen(port, () => {
  console.log(`PromptForge API listening on http://localhost:${port}`)
})
