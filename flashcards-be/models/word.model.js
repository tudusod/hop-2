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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
      required: true
    }
  },
);

export const WordModel = mongoose.model("Word", wordSchema);