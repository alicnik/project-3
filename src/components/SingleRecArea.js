import React, { useEffect, useState } from 'react'
import StarRating from 'react-ratings-declarative'
import Axios from 'axios'

export const SingleRecArea = ({ recAreaId }) => {

  const [recArea, setRecArea] = useState({})

  useEffect(() => {
    Axios.get(`/recareas/${recAreaId}`)
      .then(response => setRecArea(response.data))
  }, [recAreaId])

  return (
    <section>
      <div className="rec-area-info">
        <h1>{recArea.name}</h1>
        <StarRating rating={recArea.avgRating}/>
        <div className="carousel-container">
          {recArea.media.map((image, i) => <img key={i} src={image.url} alt={image.title} />)}
        </div>
      </div>
    </section>
  )

}

Array.prototype.randomElement = function() {

}