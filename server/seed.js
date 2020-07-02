const fs = require('fs')
const mongoose = require('mongoose')
// const User = require('./models/userModel')
const RecArea = require('./models/recAreaModel')
const Campground = require('./models/campgroundModel')

mongoose.connect('mongodb://localhost/wildernessdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err, db) => {
  if (err) return console.log(err)
  console.log('Mongoose connected!')
  db.dropDatabase()
    .then(() => {
      const facilitiesData = fs.readFileSync('./data/finalFacilities.json')
      const facilitiesContent = JSON.parse(facilitiesData)
      return Campground.create(facilitiesContent.map(facility => ({
        ridbCampgroundId: facility.FacilityID,
        ridbRecAreaId: facility.ParentRecAreaID,
        name: facility.FacilityName,
        description: facility.FacilityDescription,
        phone: facility.FacilityPhone,
        email: facility.FacilityEmail,
        address1: facility.address1,
        address2: facility.address2,
        city: facility.city,
        state: facility.state,
        accessible: facility.accessible,
        longitude: facility.longitude,
        latitude: facility.latitude,
        attributes: facility.attributes,
        media: facility.media
      })))
    })
    .then(returnedCampgrounds => {
      console.log(`${returnedCampgrounds.length} campgrounds created. Happy camping!`)
      const recAreaData = fs.readFileSync('./data/finalRecAreaData.json')
      const recAreaContent = JSON.parse(recAreaData)
      return RecArea.create(recAreaContent.map(recArea => ({
        ridbRecAreaId: recArea.RecAreaID,
        name: recArea.RecAreaName ,
        description: recArea.RecAreaDescription ,
        phone: recArea.RecAreaPhone ,
        email: recArea.RecAreaEmail ,
        address1: recArea.address1 ,
        address2: recArea.address2 ,
        website: recArea.website ,
        city: recArea.city ,
        state: recArea.state ,
        longitude: recArea.longitude ,
        latitude: recArea.latitude ,
        keywords: recArea.keywords,
        lastUpdated: recArea.lastUpdated,
        media: recArea.media,
        campgrounds: returnedCampgrounds.filter(campground => campground.ridbRecAreaId === recArea.RecAreaID)
      })))
    })
    .then(recAreas => console.log(`${recAreas.length} rec areas created. Time to get rickety-recked.`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})

