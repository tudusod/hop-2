import mongoose from "mongoose"
import { Card } from "../../models/card.model.js"

export const getCard = async (req, res) => {
  try {
    const { cardId } = req.query

    if (cardId) {
      if (!mongoose.isValidObjectId(cardId)) {
        return res.status(400).json({ error: "Invalid card id" })
      }
      const card = await Card.findOne({ _id: cardId, user: req.user.id })
      if (!card) return res.status(404).json({ error: "Card not found" })
      return res.json(card)
    }

    const cards = await Card.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(cards)
  } catch (err) {
    console.log("GET CARD ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}