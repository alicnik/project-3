import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as wholeHeart } from '@fortawesome/free-solid-svg-icons'
import { useParams, useLocation } from 'react-router-dom'
import Axios from 'axios'

export const Favourite = () => {

  const { currentUser, updateWishList } = useContext(UserContext)
  const { id: siteId } = useParams()
  const [isFavourite, setIsFavourite] = useState(currentUser.camproundWishList?.includes(siteId) || currentUser.recAreaWishList?.includes(siteId))
  const { pathname } = useLocation()
  const collection = pathname.includes('recareas') ? 'recAreaWishList' : 'campgroundWishList'

  useEffect(() => {
    const token = localStorage.getItem('token')
    Axios.put(`/api/users/${currentUser.id}`, { [collection]: siteId }, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [isFavourite])

  const handleClick = () => {
    setIsFavourite(previous => !previous)
    updateWishList(collection, siteId)
  }

  return (
    <FontAwesomeIcon 
      onClick={handleClick} 
      icon={isFavourite ? wholeHeart : emptyHeart}   
      color="red"
    />
  )
}