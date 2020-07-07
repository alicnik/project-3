const RecArea = require('../models/recAreaModel')

function index(req, res) {
  RecArea
    .paginate({}, { offset: 30, limit: 10 })
    .then(recAreas => {
<<<<<<< HEAD
      // recAreas.length = 25
=======
>>>>>>> development
      res.send(recAreas)
    })
    .catch(err => console.log(err))
}

function getByState(req, res) {
  console.log(req.params.state)
  RecArea
    .find({ state: req.params.state })
    .then(recAreas => res.status(200).send(recAreas))
    .catch(err => console.log(err))
}

function getOneSpot(req, res) {
  RecArea
    .findById(req.params.id)
    .populate('reviews')
    .populate({
      path: 'reviews',
      populate: { path: 'user' }
    })
    .populate({
      path: 'reviews',
      populate: { path: 'comments' }
    })
    .populate({
      path: 'reviews',
      populate: {
        path: 'comments',
        populate: 'user'
      }
    })
    .populate('campgrounds')
    .then(recArea => {
      if (!recArea) return res.status(404).send({ message: 'Rec Area not found' })
      res.send(recArea)
    })
}


module.exports = {
  index,
  getOneSpot,
  getByState
}