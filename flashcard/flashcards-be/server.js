import 'dotenv/config' // must stay the FIRST import
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './route/user.route.js'
import flashCardRoute from './route/flashcard.route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', userRouter)
app.use('/', flashCardRoute)

const startServer = async () => {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    console.error('Missing MONGODB_URI or JWT_SECRET in .env file')
    process.exit(1)
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    app.listen(8080, () => {
      console.log('Server listening on port 8080')
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

startServer()