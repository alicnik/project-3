const fs = require('fs')

const recAreaData = fs.readFileSync('./archive/RecAreas_API_v1.json')
const recAreaContent = JSON.parse(recAreaData).RECDATA
  .filter(recArea => {
    return (
      recArea.RecAreaPhone && 
      recArea.RecAreaEmail && 
      recArea.RecAreaName && 
      recArea.RecAreaDescription &&
      recArea.RecAreaLongitude && 
      recArea.RecAreaLatitude
    )
  })
  .map(recArea => ({
    RecAreaID: recArea.RecAreaID,
    RecAreaName: recArea.RecAreaName,
    RecAreaDescription: recArea.RecAreaDescription,
    RecAreaPhone: recArea.RecAreaPhone,
    RecAreaEmail: recArea.RecAreaEmail,
    RecAreaMapURL: recArea.RecAreaMapURL,
    RecAreaLongitude: recArea.RecAreaLongitude,
    RecAreaLatitude: recArea.RecAreaLatitude,
    keywords: recArea.keywords,
    lastUpdated: recArea.LastUpdatedDate
  }))
const arrayOfAllRecAreaIds = recAreaContent.map(recArea => recArea.RecAreaID)

const recAreaAddressData = fs.readFileSync('./archive/RecAreaAddresses_API_v1.json')
const recAreaAddressContent = JSON.parse(recAreaAddressData).RECDATA
  .filter(recAreaAddress => arrayOfAllRecAreaIds.includes(recAreaAddress.RecAreaID))

const recAreasWithAddresses = recAreaContent.map(recArea => {
  const matchedAddress = recAreaAddressContent.find(recAreaAddress => recAreaAddress.RecAreaID === recArea.RecAreaID)
  if (!matchedAddress) return
  return {
    ...recArea,
    address1: matchedAddress.RecAreaStreetAddress1,
    address2: matchedAddress.RecAreaStreetAddress2,
    city: matchedAddress.City,
    state: matchedAddress.PostalCode
  }
}).filter(recArea => recArea)

const mediaData = fs.readFileSync('./archive/Media_API_v1.json')
const mediaContent = JSON.parse(mediaData).RECDATA.filter(media => media.MediaType === 'Image')
const recAreasWithAddressesAndMedia = recAreasWithAddresses.map(recArea => {
  const matchedMedia = mediaContent
    .filter(media => media.EntityID === recArea.EntityID)
    .map(media => ({
      title: media.Title,
      url: media.URL
    }))
  return {
    ...recArea,
    media: matchedMedia
  }
}).filter(recArea => recArea)


fs.writeFile('finalRecAreaData.json', JSON.stringify(recAreasWithAddressesAndMedia), err => console.log(err) )