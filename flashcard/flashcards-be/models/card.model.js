import mongoose from "mongoose"

const cardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String },
  },
  { timestamps: true }
)

export const Card = mongoose.model("Card", cardSchema)