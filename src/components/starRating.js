import React from 'react'
import Ratings from 'react-ratings-declarative'

// rating prop will be state in parent postreview?
export const StarRating = ({ rating, setRating }) => {

  return (
    <Ratings
      rating={rating}
      changeRating={setRating}
      widgetRatedColors="gold"
    >
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
    </Ratings>
  )


  
}


