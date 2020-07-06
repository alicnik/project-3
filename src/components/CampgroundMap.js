import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import MapGL, { Marker } from 'react-map-gl'

export const CampgroundMap = () => {
  const [campgroundsData, updateCampgroundsData] = useState(
    []
  )
  useEffect(() => {
    axios.get('/api/campgrounds')
      .then(axiosResp => {
        updateCampgroundsData(axiosResp.data)
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

    {campgroundsData.map(campground => {
      return <Marker
        key={campground._id}
        latitude={campground.latitude}
        longitude={campground.longitude}
      >
        <div>

          <span><small>{campground.name}</small></span> <br></br>
          🚩

          {/* <span>{campground.name}</span>
          <span>{campground.city}, {campground.state}</span>
          <span>src={campground.media[0].url}</span> */}

        </div>

      </Marker>

    })}

  </MapGL>
}

// ? two components into one page; rather than adding another route