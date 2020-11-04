import Content from '../../../../../forms/admin/tokens/content'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

const Details = ({ event, ticket }) => {

  const { hidden } = event.ticket_config

  const config = {
    items: [
      { label: 'Name', content: ticket.name },
      { label: 'Code', content: ticket.code }
    ]
  }

  if(!_.includes(hidden, 'gender')) {
    config.items.push({ label: 'Gender', content: ticket.values.gender })
  }

  if(!_.includes(hidden, 'age')) {
    config.items.push({ label: 'Age', content: ticket.values.age })
  }

  if(!_.includes(hidden, 'race')) {
    config.items.push({ label: 'Race', content: ticket.values.race })
  }

  if(!_.includes(hidden, 'ethnicity')) {
    config.items.push({ label: 'Ethnicity', content: ticket.values.ethnicity })
  }

  event.ticket_config.fields.map(field => {
    config.items.push({ label: field.name.value, content: <Content data={ ticket.values } field={ field } /> })
  })

  return <List { ...config } />

}

Details.propTypes = {
  event: PropTypes.object,
  ticket: PropTypes.object
}

export default Details
