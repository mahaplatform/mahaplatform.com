import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ session }) => {

  const config = {
    items: [
      { label: 'Title', content: session.title },
      { label: 'Location', content: (
        session.is_online ? <span>ONLINE</span> : <span>
          { session.location.name }<br />
          { session.location.address.description }
        </span>
      ) },
      { label: 'Date', content: session.date, format: 'date' },
      { label: 'Start', content: session.start_time, format: 'time' },
      { label: 'End', content: session.end_time, format: 'time' }
    ]
  }

  return <List { ...config } />

}

Details.propTypes = {
  session: PropTypes.object
}

export default Details
