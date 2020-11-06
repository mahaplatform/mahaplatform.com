import PropTypes from 'prop-types'
import { List } from '@admin'
import React from 'react'

const Details = ({ resource }) => {

  const items = [
    { label: 'Title ', content: resource.title },
    { label: 'Description ', content: resource.description }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  resource: PropTypes.object
}

export default Details
