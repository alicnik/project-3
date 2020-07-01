const mongoose = require('mongoose')

const campsiteSchema = new mongoose.Schema({
  ridbCampsiteId: { type: String },
  ridbFacilityId: { type: String },
  name: { type: String },
  type: { type: String },
  phone: { type: String },
  website: { type: String },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  accessible: { type: Boolean },
  longitude: { type: Number },
  latitude: { type: Number },
  attributes: [{
    name: String,
    value: String
  }],
  permittedEquipment: [{
    equipmentName: String,
    maxNumber: Number
  }],
  entityMedia: [{
    entityType: String,
    title: String,
    subtitle: String,
    description: String,
    url: String
  }],
  reviews: { type: mongoose.Schema.ObjectId, ref: 'Review' }
})

module.exports = mongoose.model('Campsite', campsiteSchema)