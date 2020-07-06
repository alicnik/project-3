import React, { useEffect, useContext, useState } from 'react'
import Axios from 'axios'
import { UserContext } from './Context'
import { Link } from 'react-router-dom'

export const MyAccount = () => {

  const { currentUser } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    Axios.get(`/api/users/${currentUser.id}`)
      .then(response => setUserDetails(response.data))
  }, [])
  
  return (
    <section className="my-account">
      <h1>My Account</h1>
      <h2>{currentUser.firstName} {currentUser.lastName}</h2>
      <h3>Avatar</h3>
      <img src={currentUser.avatar} alt="user avatar"/>
      <Link to='account/settings'><p>Change avatar</p></Link>
      <h3>My bio:</h3>
      {currentUser.bio ?
        <p>{currentUser.bio}</p> :
        <p>No bio yet, would you <Link to='/account/settings'>like to add one</Link>?</p>
      }

      {/* TABS */}





    </section>
  )
}