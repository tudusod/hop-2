import mongoose from "mongoose"

const wordSchema = new mongoose.Schema({
  card: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
  mnWord: { type: String, required: true, trim: true },
  enWord: { type: String, required: true, trim: true },
})

export const WordModel = mongoose.model("Word", wordSchema)