const express = require('express'); 
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const userRoute = require('./route/user.route')
const classRoute = require('./route/class.route')
const port = 8080

const connectDb = async () => {
   const res = await mongoose.connect('mongodb+srv://tusod1103_db_user:rbctV5LAjz83wwzV@cluster0.mmysh8r.mongodb.net')
}
connectDb()

app.use('/user', userRoute )
app.user('/class', classRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})