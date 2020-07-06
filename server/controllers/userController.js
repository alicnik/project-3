const User = require('../models/userModel')
const jsonwebtoken = require('jsonwebtoken')
const secret = 'campgrounds are the same as campsites and area 51 is a rec area but trump did not want you to know'
const defaultAvatarArray = ['https://i.ibb.co/DfJ5PWc/avatar-1.png', 'https://i.ibb.co/HTq3qfD/avatar-2.png', 'https://i.ibb.co/x38pzNJ/avatar-3.png', 'https://i.ibb.co/Y8nck2y/avatar-4.png', 'https://i.ibb.co/WF9Mxwb/avatar-5.png', 'https://i.ibb.co/17LGhrB/avatar-6.png']

Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)]
}

function register(req, res) {
  req.body.avatar = defaultAvatarArray.randomElement()
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
      if (!user) return res.status(404).send({ username: { message: 'User not found.' } })
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ password: { message: 'Passwords do not match' } })
      }
      const token = jsonwebtoken.sign({ sub: user._id }, secret, { expiresIn: '12h' })
      res.status(202).send({ 
        id: user._id,
        username: user.username, 
        firstName: user.firstName, 
        showWishList: user.showWishList,
        showVisited: user.showVisited,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        isVIP: user.isVIP,
        bio: user.bio,
        token })
    })
    .catch(error => res.status(403).send(error))
}
  
function getSingleUser(req, res) {
  User
    .findById(req.params.id)
    .populate('recAreaReviews')
    .populate('campgroundReviews')
    .populate('campgroundWishList')
    .populate('recAreaWishList')
    .populate('camproundsVisited')
    .populate('recAreasVisited')
    .then(user => {
      if (!user) return res.status(404).send({ username: { message: 'User not found.' } })
      res.status(200).send(user)
    })
    .catch(error => console.log(error))
}

function editUserProfile(req, res) {
  console.log('req.body: ', req.body)
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).send({ message: 'User not found' })
      if (!user._id.equals(req.currentUser._id)) return res.status(401).send({ message: 'You can\'t edit someone else\'s profile' })
      user.set(req.body)
      return user.save()
    })
    .then(updatedUser => res.status(201).send(updatedUser))
    .catch(error => {
      console.log(error)
      res.status(400).send(error)
    })
}

const getAllUsers = (req, res) => User.find().then(users => res.status(200).send(users))

module.exports = {
  register,
  login,
  getAllUsers,
  getSingleUser,
  editUserProfile
}