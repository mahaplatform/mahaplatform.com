import { Audit, Button, List } from '@admin'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, topic }) => {

  const config = {}

  if(topic.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This topic was deleted' }
  }

  const contacts = {
    label: pluralize('contact', topic.contacts_count, true),
    className: 'link',
    route: `/crm/programs/${topic.program.id}/topics/${topic.id}/contacts`
  }

  config.items = [
    { label: 'Title', content: topic.title },
    { label: 'Program', content: topic.program.title },
    { label: 'Contacts', content: <Button { ...contacts } /> }
  ]

  config.items.push({ component: <Audit entries={ audits } /> })

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  topic: PropTypes.object
}

export default Details
