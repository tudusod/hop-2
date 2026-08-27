const express = require('express'); 
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const User = require('./models/user.schema');
const ClassModel = require('./models/class.schema');
const {compare, hash} = require('bcrypt')
const port = 8080

const connectDb = async () => {
   const res = await mongoose.connect('mongodb+srv://tusod1103_db_user:rbctV5LAjz83wwzV@cluster0.mmysh8r.mongodb.net')
}
connectDb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user/create', async (req, res) => {
  const body = req.body
  const hashedPassword = await hash(req.body.password, 10)
  try {
      const response = await User.create({
        username: body.username,
        email: body.email,
        password: hashedPassword,
        age: body.age,
        classId: body.classId
      })
      res.json(response).status(200)
  } catch (error) {
    res.json(error)  
  }
})

app.post('/login', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    username: body.username
  })

  const isValid = await compare(body.password, user.password)

  if(isValid){
    res.json({message: "success"}).status(200)
  } 
  else{
    res.json({message: "nc try buddy"}).status(200)
  }
})

app.get('/user', async (req, res) => {
  const users = await User.find({}).populate('classId')
  res.json(users)
})

app.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)
        res.json(user)
    } catch (error) {
        res.json(error)
      
    }
})

app.post('/class', async (req, res) => {
  const body = req.body

    try {
        const response = await ClassModel.create({
          name: body.name,
          teachers: body.teachers,
          roomNumber: body.roomNumber
        })
        res.json(response)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})