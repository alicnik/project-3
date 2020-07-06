import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import MapGL, { Marker } from 'react-map-gl'

export const RecAreaMap = () => {
  const [recAreasData, updateRecAreasData] = useState(
    []
  )
  useEffect(() => {
    axios.get('/api/recareas')
      .then(axiosResp => {
        updateRecAreasData(axiosResp.data)
      })
  }, [])


  // ! use the props on the page, instead of calling axios again


  const [viewPort, setViewPort] = useState({


    height: '100vh',
    width: '100vw',
    zoom: 3,
    latitude: 37.2761451,
    longitude: -104.6494972


  })

  // !change to longitude and latitude of camnpground area start view

  //! can change API token and  mapbox account

  return <MapGL

    mapboxApiAccessToken={'pk.eyJ1IjoiemNoYWJlayIsImEiOiJja2NhcDAwdWMxd3h6MzFsbXQzMXVobDh2In0.RIvofanub0AhjJm3Om2_HQ'}

    {...viewPort}

    onViewportChange={(viewPort) => setViewPort(viewPort)}>

    {recAreasData.map(recArea => {
      return <Marker
        key={recArea._id}
        latitude={recArea.latitude}
        longitude={recArea.longitude}
      >
        <div>

          <span><small>{recArea.name}</small></span> <br></br>
          🚩

          {/* <span>{recArea.name}</span>
          <span>{recArea.city}, {recArea.state}</span>
          <span>src={recArea.media[0].url}</span> */}

        </div>

      </Marker>

    })}

  </MapGL>
}

// ? two components into one page; rather than adding another route