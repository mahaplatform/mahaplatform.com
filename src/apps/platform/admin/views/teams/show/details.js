import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import bytes from 'bytes'
import React from 'react'

const Details = ({ team }) => {

  const list = {}

  if(team.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This team was deleted' }
  }

  list.items = [
    { label: 'Title ', content: team.title },
    { label: 'Team Name ', content: team.subdomain },
    { label: 'Storage ', content: bytes(parseInt(team.storage), { decimalPlaces: 2, unitSeparator: ' ' }) },
    { label: 'Users ', content: team.users_count },
    { label: 'Phone Numbers ', content: team.phone_numbers_count },
    { label: 'Text Messages ', content: team.smses_count },
    { label: 'Calls ', content: team.calls_count },
    { label: 'Emails ', content: team.emails_count }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  team: PropTypes.object
}

export default Details
