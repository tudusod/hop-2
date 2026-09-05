import express from 'express'
import { login, signup } from '../controller/user.controller.js'

const userRouter = express.Router()

userRouter.post('/sign-up', signup)
userRouter.post('/login', login)

export default userRouter