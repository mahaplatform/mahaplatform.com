import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ form }) => {

  const list = {}

  list.items = [
    { label: 'Title', content: 'title' }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object
}

export default Details
