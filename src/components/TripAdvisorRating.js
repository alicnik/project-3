import React from 'react'
import { FaCircle } from 'react-icons/fa'

export const TripAdvisorRating = ({ rating }) => {
  return (
    <div className="tripadvisor-rating">
      {Array(5).fill(1).map((element, index) => (
        <FaCircle key={index} fill={ rating > index + 1 ? 'green' : 'none'} />
      ))}

    </div>
  )
}