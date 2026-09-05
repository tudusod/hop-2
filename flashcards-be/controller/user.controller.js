import bcrypt from 'bcryptjs'
import { UserModel } from '../models/user.schema.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  const body = req.body

  try {
    const hashedPass = await bcrypt.hash(body.password, 10)
    const response = await UserModel.create({
      username: body.username,
      email: body.email,
      password: hashedPass
    })

    res.status(201).json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  const body = req.body

  try {
    const user = await UserModel.findOne({ email: body.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isValid = await bcrypt.compare(body.password, user.password)

    if (!isValid) {
      return res.status(400).json({ message: 'Wrong password' })
    }

    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
        id: user._id,
        _id: user._id
      },
      'MY_SECRET',
      { expiresIn: '1h' }
    )

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}