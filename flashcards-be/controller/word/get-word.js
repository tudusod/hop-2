import { WordModel } from "../../models/word.model.js"

export const getWord = async (req, res) => {
    const cardId = req.params/cardId
    console.log(params)

    const cardWords = await WordModel.find({
        card: cardId
    })
    res.json('success')
}