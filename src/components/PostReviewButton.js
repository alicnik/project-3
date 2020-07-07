import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export const PostReviewButton = () => {

  const [, siteCollection, siteId] = useLocation().pathname.match(/\/(\w+)\/(\w+)$/)

  return (
    <Link to={{
      pathname: '/postreview',
      state: { siteCollection, siteId }
    }}>
      <button>Post a review</button>
    </Link>
  )
}