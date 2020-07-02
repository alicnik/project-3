const mongoose = require('mongoose')

const mongooseHidden = require('mongoose-hidden')
const bcrypt = require('bcrypt')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^.+@[^.].*\.[a-z]{2,}$/.test(email)
      },
      message: 'Email must be valid.'
    }
  },
  password: { type: String, required: true, match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/ },
  showWishList: { type: Boolean },
  campgroundWishList: [{ type: mongoose.Schema.ObjectId, ref: 'Campground' }],
  showVisited: { type: Boolean },
  campgroundsVisited: [{ type: mongoose.Schema.ObjectId, ref: 'Campground' }],
  avatarPhoto: { type: String },
  isAdmin: { type: Boolean },
  isVIP: { type: Boolean },
  bio: { type: String },
  recAreaReviews: [{ type: mongoose.Schema.ObjectId, ref: 'Review' }],
  campgroundReviews: [{ type: mongoose.Schema.ObjectId, ref: 'Review' }]
}, {
  timestamps: true
})

schema.plugin(mongooseHidden({ defautHidden: { password: true } }))
schema.plugin(mongooseUniqueValidator)

schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this.passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'should match')
    }
    next()
  })

schema
  .pre('save', function hashPassword(next) {
    console.log(this._passwordConfirmation)
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', schema) 