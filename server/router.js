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

router.route('/campgrounds/:campgroundId/reviews')
  .post(secureRoute, reviewController.createCampgroundReview)


router.route('/recareas')
  .get(recAreaController.index)

router.route('/recareas/:id')
  .get(recAreaController.getOneSpot)

router.route('/recareas/:recAreaId/reviews')
  .post(secureRoute, reviewController.createRecAreaReview)


router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

module.exports = router
