import React, { useContext } from 'react'
import { UserContext } from './context'
import { Link } from 'react-router-dom'

export const Home = () => {

  const { currentUser } = useContext(UserContext)

  return (
    <section id="homepage">
      <div className="hero">
        <h1>Welcome <br/><em>to the</em><br/> Wilderness</h1>
      </div>
      <button>Browse Rec Areas</button>
      <button>Inspiration</button>
      {currentUser.isLoggedIn ? 
        <Link to='/account'>
          <button>My Account</button>
        </Link> : 
        <Link to='/register'>
          <button>Register</button>
        </Link>}
    </section>
  )

}