import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './Context'

import Svg from '../assets/splashscreen.svg'

export const Splashscreen = () => {

  const { currentUser } = useContext(UserContext)

  return (
    <section id="splashscreen">
      <Svg />
      <div className="buttons">
        <h1>Wilderness</h1>
        <Link to='/home'>
          <button>Explore the Wild</button>
        </Link>
        {!currentUser.isLoggedIn && <>
        <Link to='/login'>
          <button>Log into the Wild</button>
        </Link>
        <Link to='/register'>Not registered? Click here.</Link>
        </>}
      </div>
    </section>
  )
}