import express from "express"
import { createCard } from "../controller/card/create.js"
import { getCard } from "../controller/card/get.js"
import { getWord } from "../controller/word/get-word.js"

const flashCardRoute = express.Router()

flashCardRoute.post("/create-card", userMiddleware, createCard)
flashCardRoute.get("/get-card", getCard)
flashCardRoute.get("/get-card-words/:cardId", getWord)

export default flashCardRoute