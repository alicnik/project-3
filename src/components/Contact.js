import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faAt, faMapMarkedAlt, faGlobe } from '@fortawesome/free-solid-svg-icons'

export const Contact = ({ site }) => {

  return (
    <address id="contact">
      <h2>Contact</h2>
      {site.phone && 
      <div className="phone">
        <FontAwesomeIcon icon={faPhone} color='green' />
        <p>{site.phone}</p>
      </div>
      }
      {site.email &&
          <div className="email">
            <FontAwesomeIcon icon={faAt} color='green' />
            <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
      }
      {site.address1 &&
      <div className="address">
        <FontAwesomeIcon icon={faMapMarkedAlt} color="green" />
        <p>
          {site.address1}<br/>
          {site.address2 && <>{site.address2}<br/></>}
          {site.city}, {site.state}
        </p>
      </div>
      }
      {site.website &&
      <div className="website">
        <FontAwesomeIcon icon={faGlobe} color="green" />
        <p><a href={site.website}>Official website</a></p>
      </div>
      }
    </address>
  )
}