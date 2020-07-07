import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Favourite } from './Favourite'
import { UserContext } from './Context'
import { Visited } from './Visited'
import { Carousel } from 'react-responsive-carousel'
import { ReviewListItem } from './ReviewList'
import { PostReviewButton } from './PostReviewButton'
import { StarRating } from './StarRating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { RatingIcons } from './RatingIcons'
import loadingGif from '../assets/loading.gif'

export const SingleRecArea = (props) => {

  const [recArea, setRecArea] = useState()
  const { currentUser } = useContext(UserContext)
  const recAreaId = props.location.state?.recAreaId || props.location.pathname.match(/\/(\w+)$/)[1]
  const [, siteCollection, siteId] = useLocation().pathname.match(/\/(\w+)\/(\w+)$/)
  const history = useHistory()


  useEffect(() => {
    Axios.get(`/api/recareas/${recAreaId}`)
      .then(response => setRecArea(response.data))
  }, [recAreaId])

  function reviewViaStarRating(e) {
    history.push({
      pathname: '/postreview',
      state: { siteCollection, siteId, rating: e }
    })
  }

  if (!recArea) return <div className="loading-container">
    <img className="loading" src={loadingGif} alt="loading" />
    <h2>Loading...</h2>
  </div>

  return (
    <section>
      <div className="rec-area-info">
        <h1>{recArea.name}</h1>

        {recArea.reviews.length >= 1 ?
          <>
          {currentUser.isLoggedIn ? 
            <StarRating rating={recArea.avgRating} setRating={reviewViaStarRating}/> :
            <RatingIcons rating={recArea.avgRating} showNumOfReviews={false}/>}
          <p>({recArea.reviews.length} {recArea.reviews.length === 1 ? 'review' : 'reviews'})</p>
          </> :
          <>
            <FontAwesomeIcon icon={faQuestionCircle} color='green' />
            <p>No reviews yet. Have you been here? &nbsp;
              <Link to={{
                pathname: '/postreview',
                state: { siteCollection: 'recareas', siteId: recAreaId }
              }}>Leave a review.</Link>
            </p>
          </>
        }
        {currentUser.isLoggedIn && <> <Favourite /> <Visited /> </>}
        <div className="carousel-container">
          <Carousel>
            {recArea.media.map((image, i) => <img key={i} src={image.url} alt={image.title} />)}
          </Carousel>
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
              <PostReviewButton />
              {recArea.reviews.length ?
                recArea.reviews.map((review, i) => <ReviewListItem
                  key={i}
                  review={review}
                  siteCollection='recareas'
                />) :
                <p>No reviews yet. Have you been here? &nbsp;
                  <Link to={{
                    pathname: '/postreview',
                    state: { siteCollection: 'recareas', siteId: recAreaId }
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