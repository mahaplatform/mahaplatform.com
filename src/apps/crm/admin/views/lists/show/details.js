import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ list }) => {

  const config = {}

  config.items = [
    { label: 'Name', content: list.name },
    { label: 'Description', content: list.description },
    { label: 'Type', content: list.type }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  list: PropTypes.object
}

export default Details
