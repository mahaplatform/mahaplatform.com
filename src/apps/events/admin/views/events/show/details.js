import { Audit, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, event }) => {

  const config = {
    items: [
      { label: 'Title', content: event.title }
    ]
  }

  config.items.push({ component: <Audit entries={ audits } /> })

  config.footer = <Comments entity={`events_events/${event.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  event: PropTypes.object
}

export default Details
