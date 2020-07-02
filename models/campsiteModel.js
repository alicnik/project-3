const mongoose = require('mongoose')

const campgroundSchema = new mongoose.Schema({
  ridbCampgroundId: { type: String },
  ridbRecAreaId: { type: String },
  name: { type: String },
  description: { type: String },
  directions: { type: String },
  type: { type: String },
  phone: { type: String },
  website: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  accessible: { type: Boolean },
  longitude: { type: Number },
  latitude: { type: Number },
  attributes: [{
    name: String,
    value: String
  }],
  entityMedia: [{
    title: String,
    url: String
  }],
  reviews: { type: mongoose.Schema.ObjectId, ref: 'Review' }
})

module.exports = mongoose.model('Campground', campgroundSchema)