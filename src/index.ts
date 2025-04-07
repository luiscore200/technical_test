import express from 'express'
import companyRoutes from './routes/company'

const app = express()

app.use(express.json())
app.use('/api', companyRoutes) // Esto está bien

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
