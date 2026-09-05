const User = require('./models/user.schema');

const getUsers = async (req, res) => {
  const users = await User.find({}).populate('classId')
  res.json(users)
}

const getUserById = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)
        res.json(user)
    } catch (error) {
        res.json(error)
      
    }
}

module.exports = {
    getUsers,
    getUserById
}