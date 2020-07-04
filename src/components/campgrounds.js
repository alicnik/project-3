import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

export const Campgrounds = () => {
  const [campgroundsData, updateCampgroundData] = useState([])

  useEffect(() => {
    axios.get('/api/campgrounds')
      .then(axiosResp => {
        updateCampgroundData(axiosResp.data)
      })
  }, [])

  return <section id="browse">
    <h1>Campgrounds</h1>
    {campgroundsData.map((campground, index) => {
      console.log(campground)
      return <section key={index} id="tile">
        <h3>{campground.name}</h3>
        <h5>{campground.city}, {campground.state}</h5>
        <img src={campground.media[0].url} alt={campground.name} />
        {/* Star rating from database */}
        <p>Rating</p>

      </section>
    })}


  </section >

}