import jwt from 'jsonwebtoken'
export const userMiddleware = (req, res, next) => {
    const authtToken = req.headers.authorization.split(' ')[1]
    
    const user = jwt.verify(authtToken, 'MY_SECRET')

    if(!user) return res.json('you r not authenticated')

    req.user = user
    next()
} 