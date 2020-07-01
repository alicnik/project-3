const mongoose = require('mongoose')

const recAreaSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  phone: { type: String },
  email: { type: String },
  longitude: { type: Number },
  latitude: { type: Number },
  keywords: [ { type: String } ],
  lastUpdated: { type: String },
  ridbRecAreaId: { type: String },
  reviews: [{ type: mongoose.Schema.ObjectId, ref: 'Review' }],
  media: [{
    url: { type: String },
    title: { type: String }
  }],
  campsites: [{ type: mongoose.Schema.ObjectId, ref: 'Campsite' }]
})

module.exports = mongoose.model('RecArea', recAreaSchema)


