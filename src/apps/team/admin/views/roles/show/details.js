import { List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ role }) => {

  const items = [
    { label: 'Title ', content: role.title }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  role: PropTypes.object
}

export default Details
