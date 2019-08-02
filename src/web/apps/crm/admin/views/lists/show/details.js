import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ list }) => {

  const config = {}

  config.items = [
    { label: 'Title', content: list.title },
    { label: 'Description', content: list.description }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  list: PropTypes.object
}

export default Details
