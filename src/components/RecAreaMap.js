import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MapGL, { Marker, Popup, WebMercatorViewport, FlyToInterpolator } from 'react-map-gl'


//! can change API token and  mapbox account

export const RecAreaMap = ({ chosenState }) => {

  const [recAreasData, updateRecAreasData] = useState([])
  const [selectedRecArea, setSelectedRecArea] = useState(null)
  const [viewPort, setViewPort] = useState({
    altitude: 1.5,
    bearing: 0,
    height: '80vh',
    width: '80vw',
    zoom: 3,
    maxPitch: 60,
    maxZoom: 24,
    minZoom: 0,
    pitch: 0,
    latitude: 63.29777484,
    longitude: -151.0526568
  })

  function calculateBounds(array) {
    const values = array.reduce((bounds, location) => {
      if (location.latitude > bounds.maxlat) bounds.maxlat = location.latitude
      if (location.latitude < bounds.minlat) bounds.minlat = location.latitude
      if (location.longitude > bounds.maxlon) bounds.maxlon = location.longitude
      if (location.longitude < bounds.minlon) bounds.minlon = location.longitude
      return bounds
    }, { minlat: 90, maxlat: -90, minlon: 180, maxlon: -180 })
    return [[values.minlon, values.minlat], [values.maxlon, values.maxlat]]
  }

  useEffect(() => {
    axios.get(`/api/recareas/states/${chosenState}`)
      .then(axiosResp => {
        const recAreas = axiosResp.data
        updateRecAreasData(recAreas)
        const bounds = calculateBounds(recAreas)
        console.log('Line 38', viewPort)
        console.log('line 39', new WebMercatorViewport(viewPort))
        const { longitude, latitude, zoom } = new WebMercatorViewport(viewPort).fitBounds(bounds, { padding: 60, offset: [0, -50] })
        setViewPort({
          ...viewPort,
          longitude,
          latitude,
          zoom,
          transitionDuration: 3000,
          transitionInterpolator: new FlyToInterpolator()
        })
      })
      .catch(err => console.log(err))
  }, [chosenState])

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedRecArea(null)
      }
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])

  return (
    <section id="map-container">
      <MapGL
        className="rec-map"
        mapboxApiAccessToken={'pk.eyJ1IjoiemNoYWJlayIsImEiOiJja2NhcDAwdWMxd3h6MzFsbXQzMXVobDh2In0.RIvofanub0AhjJm3Om2_HQ'}
        {...viewPort}
        mapStyle="mapbox://styles/zchabek/ckcbrcts80cxf1ip9emnpyj48"
        onViewportChange={(viewPort) => setViewPort(viewPort)}
      >
        {recAreasData.map(recArea => {
          return (
            <Marker key={recArea._id} latitude={recArea.latitude} longitude={recArea.longitude}>
              <button className="markerButton" onClick={() => setSelectedRecArea(recArea)}>🚩</button>
            </Marker>
          )
        })}
        {selectedRecArea ? (
          <Popup
            closeOnClick={false}
            latitude={selectedRecArea.latitude}
            longitude={selectedRecArea.longitude}
            onClose={() => setSelectedRecArea(null)}
          >
            <Link to={`/recareas/${selectedRecArea._id}`}>
              <div className="popoutRec">
                <h3>{selectedRecArea.name}</h3>
                <img

                  src={selectedRecArea.media[0].url}
                  alt='rec area'
                />
              </div>
            </Link>
          </Popup>
        ) : null}
      </MapGL>
    </section>
  )
}