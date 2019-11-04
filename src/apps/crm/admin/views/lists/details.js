import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ list }) => {

  const contacts = {
    label: `${list.contacts_count} contacts`,
    className: 'link',
    route: `/admin/crm/lists/${list.id}/contacts`
  }

  const config = {}

  config.items = [
    { label: 'Title', content: list.title },
    { label: 'Type', content: list.type },
    { label: 'Contacts', content: <Button { ...contacts } /> }
  ]

  return <List { ...config } />

}

Details.propTypes = {
  list: PropTypes.object
}

export default Details
