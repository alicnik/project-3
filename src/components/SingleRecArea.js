import React, { useEffect, useState } from 'react'
// import StarRating from 'react-ratings-declarative'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const SingleRecArea = (props) => {

  const [recArea, setRecArea] = useState()
  const recAreaId = props.location.state?.recAreaId || props.location.pathname.match(/\/(\w+)$/)[1]

  useEffect(() => {
    Axios.get(`/api/recareas/${recAreaId}`)
      .then(response => setRecArea(response.data))
  }, [recAreaId])

  if (!recArea) return <h1>Loading...</h1>

  return (
    <section>
      <div className="rec-area-info">
        <h1>{recArea.name}</h1>
        {recArea.reviews.length >= 1 ?
          <p>Rating: {recArea.avgRating} ({recArea.reviews.length})</p> :
          <p>No reviews yet. Have you been here? &nbsp;
            <Link to={{
              pathname: '/postreview',
              state: { siteCollection: 'recareas', siteId: recAreaId }
            }}>Leave a review.</Link>
          </p>
        }
        <div className="carousel-container">
          {recArea.media.map((image, i) => <img key={i} src={image.url} alt={image.title} />)}
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
                <p dangerouslySetInnerHTML={{ __html: recArea.description }}></p>
              </article>
              <Link to={{
                pathname: `/recareas/${recAreaId}/campgrounds`,
                state: { campgroundsData: recArea.campgrounds, longitude: recArea.longitude, latitude: recArea.latitude }
              }}>
                <button>Find Campsites</button>
              </Link>
            </div>
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