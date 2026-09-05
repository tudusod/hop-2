const express = require('express')
const { model } = require('mongoose')
const { getUsers, getUserById } = require('../controller/user.controller')
const authMiddleware = require('../middleware/auth-middleware')

const userRoute = express.Router()

userRoute.get('', authMiddleware, getUsers)

userRoute.get('/:userId',authMiddleware, getUserById)

module.exports = userRoute