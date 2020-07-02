const fs = require('fs')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const RecArea = require('./models/recAreaModel')
const Campground = require('./models/campgroundModel')
const { default: Axios } = require('axios')

mongoose.connect('mongodb://localhost/wildernessdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err, db) => {
  if (err) return console.log(err)
  console.log('Mongoose connected!')
})
