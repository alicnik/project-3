import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

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
    {recAreasData.map((recArea, index) => {
      console.log(recArea)
      return <section key={index} id="tile">
        <h3>{recArea.name} </h3>
        <h5>{recArea.city}, {recArea.state}</h5>
        <img src={recArea.media[0].url} alt={recArea.name} />
        {/* placeholder for star rating */}
        <p>Rating</p>
      </section>
    })}
  </section>
}
