import React, { useContext } from 'react'
import { UserContext } from './Context'
import Axios from 'axios'

export const Settings = () => {

  const { currentUser, setListDisplay } = useContext(UserContext)

  function handleSubmit() {
    const token = localStorage.getItem('token')
    Axios.put(`/api/users/${currentUser.id}`, { 
      showVisited: currentUser.showVisited, 
      showWishList: currentUser.showWishList 
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  return <section id="settings">
    <h1>Settings</h1>
    <label htmlFor="show-wish-list">
      <input 
        onClick={setListDisplay} 
        // defaultChecked={}
        type="checkbox" 
        name="showWishList" 
        id="show-wish-list"/>
      <span className="first-label-span">On</span>
      <span className="second-label-span">Off</span>
    </label>
    <label htmlFor="show-visited">
      <input 
        onClick={setListDisplay} 
        // defaultChecked={}
        type="checkbox" 
        name="showVisited" 
        id="show-visited"/>
      <span className="first-label-span">On</span>
      <span className="second-label-span">Off</span>
    </label>
    <button onClick={handleSubmit}>Save Settings</button>
  </section>
}