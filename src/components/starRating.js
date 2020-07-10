import React, { useContext } from 'react'
import Ratings from 'react-ratings-declarative'
import { ThemeContext } from './context'

// rating prop will be state in parent postreview?
export const StarRating = ({ rating, setRating = f => f }) => {

  const { darkMode } = useContext(ThemeContext)

  return (
    <Ratings
      rating={rating}
      changeRating={setRating}
      widgetRatedColors={darkMode ? 'hotPink' : 'orange'}
    >
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
    </Ratings>
  )


  
}


