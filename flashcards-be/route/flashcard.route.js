import express from "express"
import { createCard } from "../controller/card/create.js"
import { getCard } from "../controller/card/get.js"
import { getWord } from "../controller/word/get-word.js"
import { userMiddleware } from "../middleware/user-middleware.js"

const flashCardRoute = express.Router()

flashCardRoute.post("/create-card", userMiddleware, createCard)
flashCardRoute.get("/get-card", userMiddleware, getCard)
flashCardRoute.get("/get-card-words/:cardId", userMiddleware, getWord)

export default flashCardRoute   