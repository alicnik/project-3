import React, { useContext } from 'react'
import { UserContext, ThemeContext } from './Context'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

export const Settings = () => {

  const { currentUser, toggleListDisplay } = useContext(UserContext)
  const { darkModeOn, toggleDarkMode } = useContext(ThemeContext)
  const history = useHistory()
  
  function handleSubmit() {
    const token = localStorage.getItem('token')
    Axios.put(`/api/users/${currentUser.id}`, { 
      showVisited: currentUser.showVisited, 
      showWishList: currentUser.showWishList 
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => history.push('/account'))
      .catch(err => console.log(err))
  }

  return <section id="settings">
    <p>Dark mode</p>
    <label htmlFor="dark-mode">
      <input 
        onClick={toggleDarkMode} 
        defaultChecked={!darkModeOn}
        type="checkbox" 
        name="darkMode" 
        id="dark-mode"/>
      <span className="first-label-span">On</span>
      <span className="second-label-span">Off</span>
    </label>
    <p>Show wish list?</p>
    <label htmlFor="show-wish-list">
      <input 
        onClick={toggleListDisplay} 
        defaultChecked={!currentUser.showWishList}
        type="checkbox" 
        name="showWishList" 
        id="show-wish-list"/>
      <span className="first-label-span">On</span>
      <span className="second-label-span">Off</span>
    </label>
    <p>Show visited locations?</p>
    <label htmlFor="show-visited">
      <input 
        onClick={toggleListDisplay} 
        defaultChecked={!currentUser.showVisited}
        type="checkbox" 
        name="showVisited" 
        id="show-visited"/>
      <span className="first-label-span">On</span>
      <span className="second-label-span">Off</span>
    </label>
    <button onClick={handleSubmit}>Save Settings</button>
  </section>
}