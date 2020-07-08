import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RatingIcons } from './RatingIcons'

export const ReviewListItem = ({ review, displayName = true, displayAvatar = true, enableComments = true }) => {

  const location = useLocation().pathname

  const dateCreated = new Date(review.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const timeCreated = new Date(review.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return <article id="review-container">

    <div className="review-avatar">
      {displayAvatar ? 
        <img src={review.user.avatar} alt='user avatar' /> :
        <img 
          src={review.recAreaRef?.media[0]?.url || review.campgroundRef?.media[0]?.url} 
          alt={review.recAreaRef?.name || review.campgroundRef?.name} 
        />
      }
      {displayAvatar || 
        review.recAreaRef ? 
        <Link to={`/recareas/${review.recAreaRef?._id}`}>
          <h3>{review.recAreaRef?.name}</h3>
        </Link> : 
        <Link to={`/campgrounds/${review.campgroundRef?._id}`}>
          <h3>{review.campgroundRef?.name}</h3>
        </Link>
      }
    </div>

    <div className="review-content">
      <h4>{review.title}</h4>

      {displayName ? <p>{review.user.firstName} {review.user.lastName}</p> : <p>Anonymous</p>}
      <p>{}</p>
      <RatingIcons rating={review.rating} showNumOfReviews={false}/>
      <p>{review.text}</p>
  
      {enableComments && 
        <>
        {review.comments.map((comment, i) => (
          <div className='comment' key={i}>
            <p>{comment.user.username} at {new Date(comment.createdAt).toLocaleString()}</p>
            <p>{comment.text}</p>
          </div>
        ))}
        <Link to={{ 
          pathname: '/postcomment', 
          state: { reviewId: review._id, previousPage: location } 
        }}>
          <p>Reply</p>
        </Link>
        </>
      }
    </div>
  </article>
}