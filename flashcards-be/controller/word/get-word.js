import { WordModel } from "../../models/word.model.js"

export const getWord = async (req, res) => {
  try {
    const { cardId } = req.params
    const words = await WordModel.find({ card: cardId })
    res.json(words)
  } catch (err) {
    console.log("GET WORD ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}