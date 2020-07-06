import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle as emptyTick } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle as wholeTick } from '@fortawesome/free-solid-svg-icons'
import { useParams, useLocation } from 'react-router-dom'
import Axios from 'axios'

export const Visited = () => {

  const { currentUser, updateVisited } = useContext(UserContext)
  const { id: siteId } = useParams()
  const [hasVisited, setHasVisited] = useState(currentUser.campgroundsVisited?.includes(siteId) || currentUser.recAreasVisited?.includes(siteId))
  const { pathname } = useLocation()
  const collection = pathname.includes('recareas') ? 'recAreasVisited' : 'campgroundsVisited'

  useEffect(() => {
    const token = localStorage.getItem('token')
    Axios.put(`/api/users/${currentUser.id}`, { [collection]: siteId }, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  })

  const handleClick = () => {
    setHasVisited(previous => !previous)
    updateVisited(collection, siteId)
  }

  return (
    <FontAwesomeIcon
      onClick={handleClick}
      icon={hasVisited ? wholeTick : emptyTick}
      color='green'
    />
  )



}