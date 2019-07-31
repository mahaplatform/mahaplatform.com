import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ contact }) => {

  const list = {}

  list.items = [
    { label: 'Name', content: contact.full_name },
    { label: 'Email', content: contact.email },
    { label: 'Tags', content: contact.tags.map(tag => tag.text).join(', ') }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  contact: PropTypes.object
}

export default Details
