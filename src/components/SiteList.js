import React from 'react'

export const SiteList = ({ site }) => (
  <div className="site-list-item">
    <img src={site.media[0].url} alt={site.name}/>
    <h3>{site.name}</h3>
  </div>
)