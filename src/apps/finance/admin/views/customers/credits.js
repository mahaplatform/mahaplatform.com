import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Credits = ({ credits }) => {

  const list = {
    items: []
  }

  return <List { ...list } />

}

Credits.propTypes = {
  credits: PropTypes.array
}

export default Credits
