import express from 'express'
import { createCard } from '../controller/card.controller.js'

const flashCardRoute = express.Router()

flashCardRoute.post('/create', createCard)
export default flashCardRoute