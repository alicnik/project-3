import React, { createContext, useState } from 'react'
import jwt from 'jsonwebtoken'

// CURRENT USER CONTEXT

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: !!localStorage.getItem('token'),
    id: jwt.decode(localStorage.getItem('token'))?.sub
  })

  const logIn = (data) => {
    localStorage.setItem('token', data.token)
    setCurrentUser({ 
      id: data.id, 
      isLoggedIn: true, 
      showWishList: data.showWishList ?? true, 
      showVisited: data.showVisited ?? true 
    })
  }

  const logOut = () => {
    localStorage.removeItem('token')
    setCurrentUser({
      ...currentUser,
      isLoggedIn: false
    })
  }

  const toggleListDisplay = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: !e.target.checked
    })
  }

  const setListDisplay = (data) => {
    setCurrentUser({
      ...currentUser,
      showWishList: data.showWishList ?? true, 
      showVisited: data.showVisited ?? true 
    })
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logIn, logOut, toggleListDisplay, setListDisplay }}>
      {children}
    </UserContext.Provider>
  )

}


// DARK/LIGHT MODE THEME CONTEXT

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

  const [darkModeOn, setDarkModeOn] = useState(false)

  const setLightMode = () => setDarkModeOn(false)
  const setDarkMode = () => setDarkModeOn(true)

  return (
    <ThemeContext.Provider value={{ darkModeOn, setLightMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )

}