import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RatingIcons } from './RatingIcons'

export const ReviewListItem = ({ review, displayName = true, displayAvatar = true, enableComments = true }) => {

  const location = useLocation().pathname

  return <article className="review">
    {displayAvatar || 
      review.recAreaRef ? 
      <Link to={`/recareas/${review.recAreaRef?._id}`}>
        <h3>{review.recAreaRef?.name}</h3>
      </Link> : 
      <Link to={`/campgrounds/${review.campgroundRef?._id}`}>
        <h3>{review.campgroundRef?.name}</h3>
      </Link>
    }
    <h4>{review.title}</h4>
    {displayAvatar ? 
      <img src={review.user.avatar} alt='user avatar' /> :
      <img 
        src={review.recAreaRef?.media[0]?.url || review.campgroundRef?.media[0]?.url} 
        alt={review.recAreaRef?.name || review.campgroundRef?.name} 
      />
    }
    {displayName && <p>{review.user.firstName} {review.user.lastName}</p>}
    <p>{new Date(review.createdAt).toLocaleString()}</p>
    <RatingIcons rating={review.rating} showNumOfReviews={false}/>
    <p>{review.text}</p>
    {enableComments && 
      <>
      {review.comments.map((comment, i) => (
        <div className='comment' key={i}>
          <p>{comment.text}</p>
          <p>{comment.user.username} at {new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      ))}
      <Link to={{ 
        pathname: '/postcomment', 
        state: { reviewId: review._id, previousPage: location } 
      }}>
        <p>Add a comment</p>
      </Link>
      </>
    }
  </article>
}