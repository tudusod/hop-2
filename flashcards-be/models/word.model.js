import mongoose from "mongoose"

const wordSchema = new mongoose.Schema(
  {
    enWord: {
      type: String,
      required: true,
    },
    mnWord: {
      type: String,
      required: true,
    },
    card: {
      ref: "Card",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const WordModel = mongoose.model("Word", wordSchema)