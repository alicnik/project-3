import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as emptyCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircle as solidCircle, faAdjust as halfCircle } from '@fortawesome/free-solid-svg-icons'


export const TripAdvisorRating = ({ rating, numOfReviews }) => {
  return (
    <div className="tripadvisor-rating">
      {Array(5).fill(1).map((element, index) => (
        <FontAwesomeIcon 
          key={index} 
          icon={rating > index && rating < index + 1 ? halfCircle :
            rating > index ? solidCircle : emptyCircle} 
          color='green'
        />
      ))}
      <span>{numOfReviews} reviews</span>
    </div>
  )
}