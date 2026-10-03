import { Card } from "../../models/card.model.js"

export const getCard = async (req, res) => {
  try {
    const { cardId } = req.query

    if (cardId) {
      const card = await Card.findOne({ _id: cardId, username: req.user.username })
      if (!card) return res.status(404).json({ error: "Card not found" })
      return res.json(card)
    }

    const cards = await Card.find({ username: req.user.username })
    res.json(cards)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}