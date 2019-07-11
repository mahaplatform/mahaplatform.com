import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Reviews = ({ offering }) => {

  const list = {}

  return <List { ...list } />

}

Reviews.propTypes = {
  offering: PropTypes.object
}

export default Reviews
