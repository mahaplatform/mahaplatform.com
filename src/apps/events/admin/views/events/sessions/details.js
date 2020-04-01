import { Audit, Comments, List } from 'maha-admin'
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
          { moment(session.date).format('MMM DD, YYYY') }, { moment(`2020-01-01 ${session.start_time}`).format('h:mm A') } - { moment(`2020-01-01 ${session.end_time}`).format('h:mm A') }
        </span>
      ) },
      { component: <Audit entries={ audits } /> }
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
