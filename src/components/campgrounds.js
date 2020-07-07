import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RatingIcons } from './RatingIcons'
import { testData } from './helpers'
import Axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { CampgroundMap } from './CampgroundMap'
import loadingGif from '../assets/loading.gif'

export const Campgrounds = (props) => {

  const [campgroundsData, setCampgroundsData] = useState()
  const [hotelsData, setHotelsData] = useState([])
  // const latitude = props.location.state?.latitude
  // const longitude = props.location.state?.longitude

  useEffect(() => {
    if (!campgroundsData) {
      const recAreaId = props.location.pathname.match(/recareas\/(\w+)\/campgrounds/)[1]
      Axios.get(`/api/recareas/${recAreaId}/campgrounds`)
        .then(response => {
          console.log(response)
          setCampgroundsData(response.data)
        })
        .catch(err => console.log(err))
    }

    // if (!(longitude && latitude)) return
    // Axios.get(`https://tripadvisor1.p.rapidapi.com/hotels/list-by-latlng?lang=en_US&limit=10&latitude=${latitude}&longitude=${longitude}`, { headers: { 
    //   'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com', 
    //   'x-rapidapi-key': 'b50bd94073msh2aef30ca2a2af07p1207f4jsne19499e10efe' } 
    // })
    //   .then(response => setHotelsData(response.data.data))
  }, [])

  useEffect(() => {
    setHotelsData(testData)
  }, [])

  if (campgroundsData?.length === 0) {
    if (!hotelsData.length) return <div className="loading-container">
      <img className="loading" src={loadingGif} alt="loading" />
      <h2>Loading...</h2>
    </div>
    return (
      <section id="hotels">
        <h1>No campgrounds! How about a hotel instead?</h1>
        {hotelsData.map((hotel, i) => (
          <article key={i} className="hotel-tile">
            <img src={hotel.photo.images.medium.url} alt={hotel.name} />
            <div className="hotel-info">
              <h2>{hotel.name}</h2>
              <p className="location">{hotel.location_string}</p>
              <p className="ranking">{hotel.ranking}</p>
              <RatingIcons iconStyle='circle' color='green' rating={Number(hotel.rating)} numOfReviews={Number(hotel.num_reviews)} />
              <p className="price">Price: {hotel.price}</p>
              <a href={`https://www.tripadvisor.co.uk/Search?q=${hotel.name.replace(/\W+/g, '%20')}`} target='_blank' rel='noreferrer'>
                <button>Find out more</button>
              </a>
            </div>
          </article>
        ))}
      </section>
    )
  }

  if (!campgroundsData) return <h1>Loading...</h1>

  return (
    <section id="browse">
      <h1>Campgrounds</h1>
      <Tabs>
        <TabList>
          <Tab>List</Tab>
          <Tab>Map</Tab>
        </TabList>
        <TabPanel>
          {campgroundsData.map((campground, index) => {
            return (
              <Link to={`/campgrounds/${campground._id}`} key={index}>
                <article id="tile">
                  <h2>{campground.name}</h2>
                  <h3>{campground.city}, {campground.state}</h3>
                  <img className="preview-img" src={campground.media[0].url} alt={campground.name} />
                  <RatingIcons iconStyle='star' color='orange' rating={Number(campground.avgRating)} numOfReviews={Number(campground.reviews.length)} />
                  <p>Rating</p>
                </article>
              </Link>
            )
          })}
        </TabPanel>
        <TabPanel>
          <h2>Map View</h2>
          <CampgroundMap />
        </TabPanel>
      </Tabs>

    </section>
  )

}