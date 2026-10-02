import { Card } from "../../models/card.model.js"

export const getCard = async (req, res) => {
  try {
    const { cardId } = req.query

    // /get-card?cardId=123 returns one card, /get-card returns all cards
    if (cardId) {
      const card = await Card.findById(cardId)
      if (!card) return res.status(404).json({ error: "Card not found" })
      return res.json(card)
    }

    const cards = await Card.find()
    res.json(cards)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}