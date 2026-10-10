import { Card } from "../../models/card.model.js"
import { WordModel } from "../../models/word.model.js"

export const getCardWords = async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id, user: req.user.id })
    if (!card) return res.status(404).json({ error: "Card not found" })

    const words = await WordModel.find({ card: card._id })
    res.json(words)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}