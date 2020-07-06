import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const RecAreas = () => {
  const [recAreasData, updateRecAreasData] = useState([])

  useEffect(() => {
    axios.get('/api/recareas')
      .then(axiosResp => {
        updateRecAreasData(axiosResp.data)
      })
  }, [])

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
                <img src={recArea.media[0].url} alt={recArea.name} />
                {/* placeholder for star rating */}
                <p>Rating</p>
              </article>
            </Link>
          )
        })}

      </TabPanel>
      <TabPanel>
        <h2>Map View</h2>
      </TabPanel>
    </Tabs>
  </section>

}

