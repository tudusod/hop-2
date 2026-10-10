import jwt from "jsonwebtoken"

export const userMiddleware = (req, res, next) => {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: "No token" })

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET) // { id, username, iat, exp }
    next()
  } catch {
    res.status(401).json({ error: "Invalid token" })
  }
}