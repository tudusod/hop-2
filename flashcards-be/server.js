import express from 'express'
import mongoose from 'mongoose'
import userRouter from './route/user.route.js'
import flashCardRoute from './route/flashcard.route.js'

const app = express()

app.use(express.json())
app.use('/', userRouter)
app.use('/', flashCardRoute)

const startServer = async () => {
  try {
    await mongoose.connect('mongodb+srv://tusod1103_db_user:rbctV5LAjz83wwzV@cluster0.mmysh8r.mongodb.net/test')
    console.log('Connected to MongoDB')

    app.listen(8080, () => {
      console.log('Example app listening on port 8080')
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

startServer()