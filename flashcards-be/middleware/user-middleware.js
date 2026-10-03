import jwt from 'jsonwebtoken'

export const userMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization

        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' })
        }

        const token = header.split(' ')[1]
        const user = jwt.verify(token, 'MY_SECRET')

        req.user = user
        next()
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' })
        }
        return res.status(401).json({ error: 'Invalid token' })
    }
}