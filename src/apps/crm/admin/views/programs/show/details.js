import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ program }) => {

  const list = {}

  list.items = [
    { label: 'Title', content: program.title }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  program: PropTypes.object
}

export default Details
