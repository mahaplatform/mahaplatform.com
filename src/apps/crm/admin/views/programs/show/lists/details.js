import { Audit, Button, List } from '@admin'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, list }) => {

  const config = {}

  if(list.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This list was deleted' }
  }

  const contacts = {
    label: pluralize('contact', list.contacts_count, true),
    className: 'link',
    route: `/crm/programs/${list.program.id}/lists/${list.id}/contacts`
  }

  config.items = [
    { label: 'Title', content: list.title },
    { label: 'Program', content: list.program.title },
    { label: 'Contacts', content: <Button { ...contacts } /> }
  ]

  config.items.push({ component: <Audit entries={ audits } /> })

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  list: PropTypes.object
}

export default Details
