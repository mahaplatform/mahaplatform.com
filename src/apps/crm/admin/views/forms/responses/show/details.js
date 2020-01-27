import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ form, response }) => {

  const list = {}

  list.items = [
    { label: 'Contact', content: 'Greg Kops' },
    { label: 'IP Address', content: response.ipaddress },
    ...form.config.fields.map(field => ({
      label: field.label,
      content: response.data[field.name]
    }))
  ]

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object,
  response: PropTypes.object
}

export default Details
