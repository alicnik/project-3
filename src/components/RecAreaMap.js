import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MapGL, { Marker, Popup } from 'react-map-gl'

//! can change API token and  mapbox account

export const RecAreaMap = ({ chosenState }) => {

  const [recAreasData, updateRecAreasData] = useState([])
  const [selectedRecArea, setSelectedRecArea] = useState(null)
  const [viewPort, setViewPort] = useState({
    height: '80vh',
    width: '80vw',
    zoom: 3,
    latitude: 37.2761451,
    longitude: -104.6494972
  })

  useEffect(() => {
    axios.get(`/api/recareas/states/${chosenState}`)
      .then(axiosResp => {
        const recAreas = axiosResp.data
        updateRecAreasData(recAreas)
        setViewPort({
          ...viewPort,
          latitude: recAreas[0].latitude,
          longitude: recAreas[0].longitude
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
              <div>
                <h3>{selectedRecArea.name}</h3>
                <img
                  onClick={e => console.log(e)}
                  className="popoutRec"
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