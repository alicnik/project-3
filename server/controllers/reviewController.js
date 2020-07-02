const Review = require('../models/reviewModel')
const Campground = require('../models/campgroundModel')
const RecArea = require('../models/recAreaModel')

function createCampgroundReview(req, res) {
  const review = req.body
  Review
    .create(review)
    .then(review => {
      review.user = req.user
      review.campgroundRef = req.params.campgroundId
      Campground.findById(req.params.campgroundId).then(campground => {
        campground.reviews.push(review)
        campground.save()
      })
      res.status(201).send({ message: 'Review successfully posted.' })
    })
    .catch(err => res.send(err))
}

function createRecAreaReview(req, res) {
  const review = req.body
  Review
    .create(review)
    .then(review => {
      review.user = req.user
      review.recAreaRef = req.params.recAreaId
      RecArea.findById(req.params.recAreaId).then(recArea => {
        recArea.reviews.push(review)
        recArea.save()
      })
      res.status(201).send({ message: 'Review successfully posted.' })
    })
    .catch(err => res.send(err))
}

function readAllForUser(req, res) {
  Review
    .find({ user: req.user })
    .populate('comments')
    .then(reviews => {
      res.status(200).send(reviews)
    })
    .catch(err => console.log(err))
}

module.exports = { createRecAreaReview, createCampgroundReview, readAllForUser }