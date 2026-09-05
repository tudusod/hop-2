const jwt = require('jsonwebtoken');
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  const user = await jwt.verify(token, 'SECRET_KEY')
  console.log(user)
  if (user) {
    res.user = user
    next()
  } else {
    throw new Error('user bhgu bn')
  }
}

module.exports = authMiddleware