import React from 'react'

export const ReviewList = ({ review, displayName = true }) => (
  <article className="review">
    <h3>{review.title}</h3>, 
    {displayName && <p>{review.user.firstName} {review.user.lastName}</p>}
    <p>{new Date(review.createdAt).toLocaleString()}</p>
    <p>{review.text}</p>
  </article>
)