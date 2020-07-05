import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TripAdvisorRating } from './TripAdvisorRating'
import { testData } from './helpers'
// import Axios from 'axios'

export const Campgrounds = (props) => {

  const [hotelsData, setHotelsData] = useState([])
  const campgroundsData = props.location.state?.campgroundsData
  // const latitude = props.location.state?.latitude
  // const longitude = props.location.state?.longitude

  // useEffect(() => {
  //   if (!(longitude && latitude)) return
  //   Axios.get(`https://tripadvisor1.p.rapidapi.com/hotels/list-by-latlng?lang=en_US&limit=10&latitude=${latitude}&longitude=${longitude}`, { headers: { 
  //     'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com', 
  //     'x-rapidapi-key': 'b50bd94073msh2aef30ca2a2af07p1207f4jsne19499e10efe' } 
  //   })
  //     .then(response => setHotelsData(response.data.data))
  // }, [longitude, latitude])

  useEffect(() => {
    setHotelsData(testData)
  }, [])
  
  if (!campgroundsData || !campgroundsData.length) {
    console.log('HotelsData:', hotelsData)
    if (!hotelsData.length) return <h1>Loading...</h1>
    return (
      <section id="hotels">
        <h1>No campgrounds! How about a hotel instead?</h1>
        {hotelsData.map((hotel, i) => (
          <article key={i} className="hotel-tile">
            <img src={hotel.photo.images.medium.url} alt={hotel.name}/>
            <div className="hotel-info">
              <h2>{hotel.name}</h2>
              <p className="location">{hotel.location_string}</p>
              <p className="ranking">{hotel.ranking}</p>
              <TripAdvisorRating rating={Number(hotel.rating)} numOfReviews={Number(hotel.num_reviews)}/>
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

  return (
    <section id="browse">
      <h1>Campgrounds</h1>
      {campgroundsData.map((campground, index) => {
        return (
          <Link to={`/campgrounds/${campground._id}`} key={index}>
            <article id="tile">
              <h2>{campground.name}</h2>
              <h3>{campground.city}, {campground.state}</h3>
              <img src={campground.media[0].url} alt={campground.name} />
              {/* Star rating from database */}
              <p>Rating</p>
            </article>
          </Link>
        )
      })}
    </section>
  )

}



