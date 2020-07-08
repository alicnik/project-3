import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { RatingIcons } from './RatingIcons'
import { RecAreaMap } from './RecAreaMap'
import loadingGif from '../assets/loading.gif'
import { states } from './helpers'

// TODO Provide an emoji icon for the areas which  have campgrounds ⛺️ or only hotels 🏨 

export const RecAreas = () => {
  const [recAreasData, updateRecAreasData] = useState([])
  const [query, setQuery] = useState({})
  const [chosenState, setChosenState] = useState('AK')

  useEffect(() => {
    axios.get(`/api/recareas/states/${chosenState}`)
      .then(axiosResp => {
        console.log(axiosResp)
        updateRecAreasData(axiosResp.data)
      })
  }, [chosenState])

  function handleChange(e) {
    setChosenState(e.target.value)
    setQuery({
      ...query,
      state: e.target.value
    })
  }



  if (!recAreasData.length)
    return <div id="loading-container">
      <img className="loading" src={loadingGif} alt="loading" />
      <h2>Loading...</h2>
    </div>


  return <section id="browse">
    <h1>Rec Areas</h1>

    <select name="state" id="state" value={query.state} onChange={handleChange}>
      {states.sort().map((state, i) => <option key={i} value={state}>{state}</option>)}
    </select>

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

        <RecAreaMap chosenState={chosenState} />
      </TabPanel>
    </Tabs>
  </section>
}
