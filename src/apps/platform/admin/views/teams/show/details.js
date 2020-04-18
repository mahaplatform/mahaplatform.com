import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ team }) => {

  const list = {}

  if(team.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This team was deleted' }
  }

  list.items = [
    { label: 'Title ', content: team.title },
    { label: 'Team Name ', content: team.subdomain },
    { label: 'Authentication', content: team.authentication_strategy }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  team: PropTypes.object
}

export default Details
