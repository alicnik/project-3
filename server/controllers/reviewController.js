const Review = require('../models/reviewModel')
const Campground = require('../models/campgroundModel')
const RecArea = require('../models/recAreaModel')

function createCampgroundReview(req, res) {
  const review = req.body
  const campgroundId = req.params.campgroundId
  Campground
    .findById(campgroundId)
    .then(campground => {
      Review
        .create(review)
        .then(review => {
          review.user = req.user
          review.campgroundRef = campgroundId
          campground.reviews.push(review)
          campground.save()
          res.status(201).send({ message: 'Review successfully posted.' })
        })
        .catch(err => res.status(400).send(err))
    })
    .catch(err => res.status(400).send(err))
}

function createRecAreaReview(req, res) {
  const review = req.body
  const recAreaId = req.params.recAreaId
  RecArea
    .findById(recAreaId)
    .then(recArea => {
      console.log('log', recArea)
      Review
        .create(review)
        .then(review => {
          review.user = req.user
          review.recAreaRef = recAreaId
          recArea.reviews.push(review)
          recArea.save()
          res.status(201).send({ message: 'Review successfully posted.' })
        })
        .catch(err => res.status(400).send(err))
    })
    .catch(err => res.status(400).send(err))
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