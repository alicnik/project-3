const RecArea = require('../models/recAreaModel')

function index(req, res) {
  RecArea
    .find()
    .then(recAreas => {
      recAreas.length = 10
      res.send(recAreas)
    })
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
  getOneSpot
}