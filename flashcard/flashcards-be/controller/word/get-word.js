import mongoose from "mongoose"
import { Card } from "../../models/card.model.js"
import { WordModel } from "../../models/word.model.js"

export const getWord = async (req, res) => {
  try {
    const { cardId } = req.params

    if (!mongoose.isValidObjectId(cardId)) {
      return res.status(400).json({ error: "Invalid card id" })
    }

    // make sure this card belongs to the logged-in user
    const card = await Card.findOne({ _id: cardId, user: req.user.id })
    if (!card) return res.status(404).json({ error: "Card not found" })

    const words = await WordModel.find({ card: card._id })
    res.json(words)
  } catch (err) {
    console.log("GET WORD ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}