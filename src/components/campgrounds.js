import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Campgrounds = (props) => {

  const campgroundsData = props.location.state?.campgroundsData

  if (!campgroundsData) return <h1>No campgrounds!</h1>

  return <section id="browse">
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


  </section >

}