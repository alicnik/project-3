import React, { useContext } from 'react'
import { UserContext } from './Context'
import { Link } from 'react-router-dom'

export const NavBar = () => {

  const { currentUser, logOut } = useContext(UserContext)

  function handleLogout() {
    logOut()
  }

  return <nav id="navbar" role="navigation" aria-label="main">
    <ul>
      <li id="logo"><Link to="/home">Logo</Link></li>
      <li><Link to="/recareas">Explore</Link></li>
      {currentUser.isLoggedIn ?
        <div id="nav-logged-in">
          <li><Link to="/myaccount">My Account</Link></li>
          <li onClick={handleLogout}><Link to="/">Logout</Link></li>
        </div> :
        <div id="nav-logged-out">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </div>
      }

    </ul>

  </nav>

}