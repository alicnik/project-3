import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './Context'
import { Link } from 'react-router-dom'
import Axios from 'axios'

export const Home = () => {

  const { currentUser } = useContext(UserContext)

  const [randomRecAreaId, setRandomRecAreaId] = useState()

  useEffect(() => {
    Axios.get('/api/recareas')
      .then(response => {
        const randomRecArea = response.data.randomElement()
        setRandomRecAreaId(randomRecArea._id)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <section id="homepage">
      <div className="hero">
        <h1>Welcome to the Wilderness{currentUser.firstName && <>, <em>{currentUser.firstName}</em></>}</h1>
      </div>
      <div className="home-btns">
        <Link to='/recareas'>
          <button>Browse Rec Areas</button>
        </Link>
        <Link to={`/recareas/${randomRecAreaId}`}>
          <button>Inspiration</button>
        </Link>
        {currentUser.isLoggedIn ?
          <Link to='/account'>
            <button>My Account</button>
          </Link> :
          <Link to='/register'>
            <button>Register</button>
          </Link>}
      </div>
    </section>
  )

}