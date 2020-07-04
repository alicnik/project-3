import React, { useContext } from 'react'
import { UserContext } from './Context'
import { Link } from 'react-router-dom'

export const Home = () => {

  const { currentUser } = useContext(UserContext)

  return (
    <section id="homepage">
      <div className="hero">
        <h1>Welcome<br/><em>to the</em><br/>Wilderness</h1>
      </div>
      <Link to='/recareas'>
        <button>Browse Rec Areas</button>
      </Link>
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