import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ organization }) => {

  const list = {}

  list.items = [
    { label: 'Name', content: organization.name }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  organization: PropTypes.object
}

export default Details
