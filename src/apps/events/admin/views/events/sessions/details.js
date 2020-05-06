import { Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const Details = ({ audits, session }) => {

  const config = {
    items: [
      { label: 'Title', content: session.title },
      { label: 'Location', content: (
        session.is_online ? <span>ONLINE</span> : <span>
          { session.location.name }<br />
          { session.location.address.description }
        </span>
      ) },
      { label: 'Date', content: (
        <span>
          { moment(session.starts_at).format('MMM DD, YYYY, h:mm A') } - { moment(session.ends_at).format('h:mm A') }
        </span>
      ) }
    ]
  }

  config.footer = <Comments entity={`events_sessions/${session.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  session: PropTypes.object
}

export default Details
