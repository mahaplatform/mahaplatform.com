import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ event, ticket }) => {

  const config = {
    items: [
      { label: 'Name', content: ticket.name },
      { label: 'Code', content: ticket.code }
    ]
  }

  return <List { ...config } />

}

Details.propTypes = {
  event: PropTypes.object,
  ticket: PropTypes.object
}

export default Details
