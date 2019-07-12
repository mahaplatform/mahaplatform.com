import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ user, assignment }) => {

  const list = {}

  list.items = [
  ]



  return <List { ...list } />

}

Details.propTypes = {
  assignment: PropTypes.object,
  user: PropTypes.object
}

export default Details
