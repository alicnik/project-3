import React, { useEffect, useState, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock as checkInTime, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faDog as petsAllowed, faClock as checkOutTime, faPhone, faAt, faCarSide } from '@fortawesome/free-solid-svg-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Carousel } from 'react-responsive-carousel'
import { ReviewListItem } from './ReviewList'
import { PostReviewButton } from './PostReviewButton'
import { StarRating } from './StarRating'
<<<<<<< HEAD
import { RatingIcons } from './RatingIcons'
import { UserContext } from './Context'
=======
import loadingGif from '../assets/loading.gif'
>>>>>>> development

export const SingleCampground = () => {

  const [campground, setCampground] = useState()
  const { pathname } = useLocation()
  const campgroundId = pathname.match(/campgrounds\/(\w+)$/)[1]
  const attributeIcons = { petsAllowed, checkInTime, checkOutTime }
  const [, siteCollection, siteId] = useLocation().pathname.match(/\/(\w+)\/(\w+)$/)
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    Axios.get(`/api/campgrounds/${campgroundId}`)
      .then(response => setCampground(response.data))
  }, [campgroundId])

  function reviewViaStarRating(e) {
    history.push({
      pathname: '/postreview',
      state: { siteCollection, siteId, rating: e }
    })
  }

  if (!campground) return <div className="loading-container">
    <img className="loading" src={loadingGif} alt="loading" />
    <h2>Loading...</h2>
  </div>

  return (
    <section id='single-campground'>
      <div className="rec-area-info">
        <h1>{campground.name}</h1>
        <div className="review-header">
          {campground.reviews.length >= 1 ?
            <>
<<<<<<< HEAD
            {currentUser.isLoggedIn ? 
              <StarRating rating={campground.avgRating} setRating={reviewViaStarRating}/> :
              <RatingIcons rating={campground.avgRating} showNumOfReviews={false}/>}
            <p>Rating: {campground.avgRating} ({campground.reviews.length})</p> 
=======
              <StarRating rating={campground.avgRating} setRating={reviewViaStarRating} />
              <p>Rating: {campground.avgRating} ({campground.reviews.length})</p>
>>>>>>> development
            </>
            :
            <>
              <FontAwesomeIcon icon={faQuestionCircle} color='green' />
              <p>No reviews yet. Have you been here? &nbsp;
                <Link to={{
                  pathname: '/postreview',
                  state: { siteCollection: 'campgrounds', siteId: campgroundId }
                }}>Leave a review.</Link>
              </p>
            </>
          }
        </div>

        <div className="carousel-container">
          <Carousel>
            {campground.media.map((image, i) => <img key={i} src={image.url} alt={image.title} />)}
          </Carousel>
        </div>
        <div className="campground-attributes">
          {<>
            <FontAwesomeIcon icon={faCarSide} color='green' />
            <p>Accessible by car? {campground.accessible ? 'Yes' : 'No'}</p>
          </>
          }
          {campground.attributes.map((attribute, i) => {
            return (
              <div key={i} className='single-attribute'>
                <FontAwesomeIcon icon={attributeIcons[attribute.name]} color='green' />
                <p>
                  {attribute.description}: {attribute.value === 'true' ? 'Yes' :
                    attribute.value === 'false' ? 'No' : attribute.value}
                </p>
              </div>
            )
          })}
        </div>
        <Tabs>
          <TabList>
            <Tab>Info</Tab>
            <Tab>Reviews</Tab>
          </TabList>
          <TabPanel>
            <div className='accordion-container'>
              <article className="description">
                <h2>Description</h2>
                <p dangerouslySetInnerHTML={{ __html: campground.description }}></p>
              </article>
            </div>
            <address className="contact">
              <h2>Contact Details</h2>
              {campground.phone &&
                <div className="phone">
                  <FontAwesomeIcon icon={faPhone} color='green' />
                  <p>Tel: {campground.phone}</p>
                </div>}
              {campground.email &&
                <div className="email">
                  <FontAwesomeIcon icon={faAt} color='green' />
                  <p>Email: {campground.email}</p>
                </div>}
            </address>
          </TabPanel>
          <TabPanel>
            <div className="reviews">
              <h2>Reviews</h2>
              <PostReviewButton />
              {campground.reviews.length ?
                campground.reviews.map((review, i) => <ReviewListItem
                  key={i}
                  review={review}
                  siteCollection='campgrounds'
                />) :
                <p>No reviews yet. Have you been here? &nbsp;
                  <Link to={{
                    pathname: '/postreview',
                    state: { siteCollection: 'campgrounds', siteId: campgroundId }
                  }}>Leave a review.</Link>
                </p>

              }
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  )

}