const router = require('express').Router()
const campgroundController = require('./controllers/campgroundController')
const recAreaController = require('./controllers/recAreaController')
const userController = require('./controllers/userController')
const reviewController = require('./controllers/reviewController')

const secureRoute = require('./lib/secureRoute')

router.route('/campgrounds')
  .get(campgroundController.index)

router.route('/campgrounds/:id')
  .get(campgroundController.getOneSpot)

router.route('/campgrounds/:siteId/reviews')
  .post(secureRoute, reviewController.createReview)


router.route('/recareas')
  .get(recAreaController.index)

router.route('/recareas/:id')
  .get(recAreaController.getOneSpot)

router.route('/recareas/:siteId/reviews')
  .post(secureRoute, reviewController.createReview)

router.route('/reviews/:id')
  .put(secureRoute, reviewController.editReview)
  .delete(secureRoute, reviewController.deleteReview)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

module.exports = router
