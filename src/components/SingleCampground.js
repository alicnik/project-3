import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock as checkInTime, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faDog as petsAllowed, faClock as checkOutTime, faPhone, faAt } from '@fortawesome/free-solid-svg-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const SingleCampground = () => {
  const [campground, setCampground] = useState()
  const { pathname } = useLocation()
  const campgroundId = pathname.match(/campgrounds\/(\w+)$/)[1]
  const attributeIcons = { petsAllowed, checkInTime, checkOutTime }

  useEffect(() => {
    Axios.get(`/api/campgrounds/${campgroundId}`)
      .then(response => setCampground(response.data))
  }, [campgroundId])

  if (!campground) return <h1>Loading...</h1>

  return (
    <section id='single-campground'>
      <div className="rec-area-info">
        <h1>{campground.name}</h1>
        <div className="review-header">
          {campground.reviews.length >= 1 ?
            <p>Rating: {campground.avgRating} ({campground.reviews.length})</p> :
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
          {campground.media.map((image, i) => <img key={i} src={image.url} alt={image.title} />)}
        </div>
        <div className="campground-attributes">
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
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  )

}