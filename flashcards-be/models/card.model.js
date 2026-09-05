import mongoose from "mongoose"

const cardSchema = new mongoose.Schema(
  {
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const CardModel = mongoose.model("Card", cardSchema);