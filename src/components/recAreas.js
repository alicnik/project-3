import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { RatingIcons } from './RatingIcons'

export const RecAreas = () => {
  const [recAreasData, updateRecAreasData] = useState([])

  useEffect(() => {
    axios.get('/api/recareas')
      .then(axiosResp => {
        updateRecAreasData(axiosResp.data)
      })
  }, [])

  return <section id="browse">
    <h1>Rec Areas</h1>
    {recAreasData.map((recArea, index) => {
      return (
        <Link to={{ pathname: `/recareas/${recArea._id}`, state: { recAreaId: recArea._id } }} key={index}>
          <article className="tile">
            <h2>{recArea.name}</h2>
            <h3>{recArea.city}, {recArea.state}</h3>
            <img src={recArea.media[0].url} alt={recArea.name} />
            <RatingIcons rating={recArea.avgRating} numOfReviews={recArea.reviews.length} />
          </article>
        </Link>
      )
    })}
  </section>
}

