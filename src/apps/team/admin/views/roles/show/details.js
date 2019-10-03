import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ role }) => {

  const items = [
    { label: 'Title ', content: role.title },
    { label: 'Description ', content: role.description }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  role: PropTypes.object
}

export default Details
