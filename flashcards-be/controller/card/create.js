import { Card } from "../../models/card.model.js"
import { WordModel } from "../../models/word.model.js"

export const createCard = async (req, res) => {
  try {
    const { name, words } = req.body

    const card = await Card.create({
      name,
      user: req.user.id,
      username: req.user.username,
    })

    if (Array.isArray(words) && words.length > 0) {
      await WordModel.insertMany(
        words.map((w) => ({
          mnWord: w.mnword,
          enWord: w.enword,
          card: card._id,
        }))
      )
    }

    res.json(card)
  } catch (err) {
    console.log("CREATE CARD ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}