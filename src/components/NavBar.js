import React, { useContext } from 'react'
import { UserContext } from './Context'
import { Link, useLocation } from 'react-router-dom'

export const NavBar = () => {

  const { currentUser, logOut } = useContext(UserContext)
  const pathname = useLocation().pathname

  if (pathname === '/') return null

  return <nav id="navbar" role="navigation" aria-label="main">
    <p id="logo"><Link to="/home">Logo</Link></p>
    <ul>
      <li><Link to="/recareas">Explore</Link></li>
      {currentUser.isLoggedIn ? 
      <>
        <li><Link to="/account">My Account</Link></li>
        <li onClick={logOut}>Logout</li>
      </> :
      <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </>
      }
    </ul>

  </nav>

}