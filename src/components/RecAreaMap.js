import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import MapGL, { Marker, Popup } from 'react-map-gl'

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


    height: '80vh',
    width: '80vw',
    zoom: 3,
    latitude: 37.2761451,
    longitude: -104.6494972

  })

  // !change to longitude and latitude of camnpground area start view

  //! can change API token and  mapbox account





  const [selectedRecArea, setSelectedRecArea] = useState(null)

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedRecArea(null)
      }
    }
    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])






  return <section id="map-container">
    <MapGL
      className="rec-map"
      mapboxApiAccessToken={'pk.eyJ1IjoiemNoYWJlayIsImEiOiJja2NhcDAwdWMxd3h6MzFsbXQzMXVobDh2In0.RIvofanub0AhjJm3Om2_HQ'}

      {...viewPort}
      mapStyle="mapbox://styles/zchabek/ckcbrcts80cxf1ip9emnpyj48"

      onViewportChange={(viewPort) => setViewPort(viewPort)}>

      {recAreasData.map(recArea => {
        return <Marker
          key={recArea._id}
          latitude={recArea.latitude}
          longitude={recArea.longitude}
        >



          <button
            className="markerButton"
            onClick={e => {
              e.preventDefault()
              setSelectedRecArea(recArea)
            }}
          >

            {/* <div> */}

            {/* <span><small>{recArea.name}</small></span> <br></br> */}
            🚩



            {/* <span>{recArea.name}</span>
      <span>{recArea.city}, {recArea.state}</span> */}


            {/* </div> */}

          </button>

        </Marker>
      })}


      {selectedRecArea ? (
        <Popup
          // options.closeOnClick={false}
          latitude={selectedRecArea.latitude}
          longitude={selectedRecArea.longitude}
          onClick={e => console.log(e)}
          onClose={() => {
            setSelectedRecArea(null)

          }}
        >

          {/* <Link to={{ pathname: `/recareas/${selectedRecArea._id}`, state: { recAreaId: selectedRecArea._id } }}> */}



          <div>

            {/* <Link to='/'> */}
            <span><small>{selectedRecArea.name}</small></span> <br></br>

            <p><Link to="/home">here</Link></p>
            <img onClick={e => console.log(e)}

              className="popoutRec"
              src={selectedRecArea.media[0].url} />


            {/* change lat; long?; set to dufault */}


            {/* // </Link> */}
          </div>

        </Popup>
      ) : null}

    </MapGL>
  </section >


}

// ? two components into one page; rather than adding another route