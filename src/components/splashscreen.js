import React from 'react'
import { Link } from 'react-router-dom'

export const Splashscreen = () => {
  return <>
    <h1>Splashscreen</h1>
    <Link to='/home'>
      <button>Explore the Wild</button>
    </Link>
    <Link to='/login'>
      <button>Log into the Wild</button>
    </Link>
    <Link to='/register'>Not registered? Click here.</Link>
</>
}