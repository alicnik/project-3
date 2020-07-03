const User = require('../models/userModel')
const jsonwebtoken = require('jsonwebtoken')
const secret = 'campgrounds are the same as campsites and area 51 is a rec area but trump did not want you to know'

function register(req, res) {
  User
    .create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(error => res.status(400).send(error))
}

function login(req, res) {
  User
    .findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
    .then(user => {
<<<<<<< Updated upstream
      if (!user) return res.status(401).send({ message: 'User not found' })
=======
      if (!user) return res.status(404).send({ message: 'User not found.' })
>>>>>>> Stashed changes
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Passwords do not match' })
      }
      const token = jsonwebtoken.sign({ sub: user._id }, secret, { expiresIn: '12h' })
      res.status(202).send({ message: `Welcome back to the Wilderness ${user.username}`, token })
    })
    .catch(error => res.status(403).send(error))
}

const getAllUsers = (req, res) => User.find().then(users => res.status(200).send(users))

module.exports = {
  register,
  login,
  getAllUsers
}