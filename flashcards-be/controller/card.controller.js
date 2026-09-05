import { CardModel } from "../models/card.model.js"
import { WordModel } from "../models/word.model.js"
import jwt from 'jsonwebtoken'

export const createCard = async (req, res) => {
    const body = req.body
    const words = body.words
    const authtToken = req.headers.authorization.split(' ')[1]

    const user = jwt.verify(authtToken, 'MY_SECRET')
    const createdCard = await CardModel.create({
        username: body.name || body.usernames,
        description: body.description,
        user: 'user._id'
    })

    const cardWords = words.map((word) => {
        return{
            ...word,
            card: createdCard._id
        }
    })

    await WordModel.insertMany(cardWords)
    res.json("success")
}






    // [
    //     {
    //         enWord: 'hello',
    //         mnWord: 'sainu',
    //         card: createdCard.id
    //     },
    //     {
    //         enWord: 'bye',
    //         mnWord: 'baay',
    //     },
    //     {
    //         enWord: 'no',
    //         mnWord: 'ugu',
    //     }
    // ]