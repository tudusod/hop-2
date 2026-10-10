import { Card } from "../../models/card.model.js"
import { WordModel } from "../../models/word.model.js"

export const createCard = async (req, res) => {
  try {
    const { name, words } = req.body

    if (!name?.trim()) return res.status(400).json({ error: "Name is required" })

    const cleanWords = (Array.isArray(words) ? words : []).filter(
      (w) => w.mnword?.trim() && w.enword?.trim()
    )
    if (cleanWords.length === 0)
      return res.status(400).json({ error: "Add at least one complete word pair" })

    const card = await Card.create({
      name: name.trim(),
      user: req.user.id,
      username: req.user.username,
    })

    try {
      await WordModel.insertMany(
        cleanWords.map((w) => ({
          mnWord: w.mnword.trim(),
          enWord: w.enword.trim(),
          card: card._id,
        }))
      )
    } catch (wordErr) {
      // don't leave a card without words
      await Card.deleteOne({ _id: card._id })
      throw wordErr
    }

    res.status(201).json(card)
  } catch (err) {
    console.log("CREATE CARD ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}