import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.schema.js"

const makeToken = (user) =>
  jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ error: "Username, email and password are required" })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    const exists = await UserModel.findOne({
      $or: [{ username: username.trim() }, { email: email.trim().toLowerCase() }],
    })
    if (exists) {
      return res.status(409).json({ error: "Username or email already in use" })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
      username: username.trim(),
      email: email.trim(),
      password: hashed,
    })

    res.status(201).json({ token: makeToken(user) })
  } catch (err) {
    console.log("SIGNUP ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username?.trim() || !password) {
      return res.status(400).json({ error: "Username and password are required" })
    }

    const user = await UserModel.findOne({ username: username.trim() })
    if (!user) return res.status(401).json({ error: "Wrong username or password" })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(401).json({ error: "Wrong username or password" })

    res.json({ token: makeToken(user) })
  } catch (err) {
    console.log("LOGIN ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}