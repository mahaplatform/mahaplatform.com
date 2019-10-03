import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ competency }) => {

  const list = {
    items: [
      { label: 'Title', content: competency.title },
      { label: 'Description', content: competency.description },
      { label: 'Category', content: competency.category },
      { label: 'Level', content: competency.level }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  competency: PropTypes.object
}

export default Details
