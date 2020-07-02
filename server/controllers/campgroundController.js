const Campground = require('../models/campgroundModel')


function index(req, res) {
  Campground
    .find()
    .then(campgrounds => {
      res.send(campgrounds)
    })
}

function getOneSpot(req, res) {
  Campground
    .findById(req.params.id)
    .populate('reviews')
    .then(campground => {
      if (!campground) return res.status(404).send({ message: 'Campground not found.' })
      res.send(campground)
    })
}

module.exports = {
  index,
  getOneSpot
}