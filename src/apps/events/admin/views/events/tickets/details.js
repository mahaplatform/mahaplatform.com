import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ event, ticket }) => {

  const config = {
    items: [
      { label: 'Full Name', content: ticket.full_name },
      { label: 'Email', content: ticket.email },
      { label: 'Code', content: ticket.code },
      { label: 'Created', content: ticket.created_at, format: 'datetime' }
    ]
  }

  return <List { ...config } />

}

Details.propTypes = {
  event: PropTypes.object,
  ticket: PropTypes.object
}

export default Details
