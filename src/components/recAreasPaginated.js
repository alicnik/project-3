import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { RatingIcons } from './RatingIcons'
import { RecAreaMap } from './RecAreaMap'
import loadingGif from '../assets/loading.gif'

export const RecAreasPaginated = () => {
  const [recAreasData, updateRecAreasData] = useState([])

  useEffect(() => {
    axios.get('/api/recareas')
      .then(axiosResp => {
        console.log(axiosResp)
        updateRecAreasData(axiosResp.data.docs)
      })
  }, [])

  if (!recAreasData.length)
    return <div className="loading-container">
      <img className="loading" src={loadingGif} alt="loading" />
      <h2>Loading...</h2>
    </div>


  return <section id="browse">
    <h1>Rec Areas</h1>

    <Tabs>
      <TabList>
        <Tab>List</Tab>
        <Tab>Map</Tab>
      </TabList>

      <TabPanel>

        {recAreasData.map((recArea, index) => {
          return (
            <Link to={{ pathname: `/recareas/${recArea._id}`, state: { recAreaId: recArea._id } }} key={index}>
              <article className="tile">
                <h2>{recArea.name}</h2>
                <h3>{recArea.city}, {recArea.state}</h3>
                <img className="preview-img" src={recArea.media[0].url} alt={recArea.name} />
                <RatingIcons rating={recArea.avgRating} numOfReviews={recArea.reviews.length} />
              </article>
            </Link>
          )
        })}

      </TabPanel>
      <TabPanel>
        <h2>Map View</h2>

        <RecAreaMap />
      </TabPanel>
    </Tabs>
  </section>
}
