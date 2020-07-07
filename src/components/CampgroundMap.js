import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import MapGL, { Marker } from 'react-map-gl'
import { useLocation } from 'react-router-dom'

export const CampgroundMap = () => {
  const [campgroundsData, updateCampgroundsData] = useState(
    []
  )

  const [, recAreaId] = useLocation().pathname.match(/\/(\w+)\/(\w+)$/)


  useEffect(() => {
    axios.get(`/api/recareas/${recAreaId}/campgrounds`)
      .then(axiosResp => {
        updateCampgroundsData(axiosResp.data)
        setViewPort({
          ...viewPort,
          latitude: axiosResp.data[0].latitude,
          longitude: axiosResp.data[0].longitude

        })
      })
  }, [])


  // ! use the props on the page, instead of calling axios again


  const [viewPort, setViewPort] = useState({


    height: '80vh',
    width: '80vw',
    zoom: 8,
    // change to zoomed in for campground props
    // latitude: campgroundsData[0].latitude,
    // longitude: campgroundsData[0].longitude

    latitude: 37.2761451,
    longitude: -104.6494972


  })

  // !change to longitude and latitude of camnpground area start view

  //! can change API token and  mapbox account

  return <section id="map-container">
    <MapGL

      mapboxApiAccessToken={'pk.eyJ1IjoiemNoYWJlayIsImEiOiJja2NhcDAwdWMxd3h6MzFsbXQzMXVobDh2In0.RIvofanub0AhjJm3Om2_HQ'}

      {...viewPort}
      mapStyle="mapbox://styles/zchabek/ckcbqjm986dug1kpuzi036e6q"
      onViewportChange={(viewPort) => setViewPort(viewPort)}>

      {campgroundsData.map(campground => {
        return <Marker
          key={campground._id}
          latitude={campground.latitude}
          longitude={campground.longitude}
        >
          <div>

            <span><small>{campground.name}</small></span> <br></br>
            ⛺️

      {/* <span>{campground.name}</span>
      <span>{campground.city}, {campground.state}</span>
      <span>src={campground.media[0].url}</span> */}

          </div>

        </Marker>

      })}

    </MapGL>

  </section>

}

// ? two components into one page; rather than adding another route