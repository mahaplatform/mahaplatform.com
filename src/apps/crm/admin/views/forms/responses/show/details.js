import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ form, response }) => {

  const contact = {
    label: response.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${response.contact.id}`
  }

  const list = {
    sections: [{
      items: [
        { label: 'Contact', content: <Button { ...contact }/> },
        { label: 'IP Address', content: response.ipaddress },
        { label: 'Submitted', content: response.created_at, format: 'datetime' }
      ]
    }, {
      title: 'Response Data',
      items: form.config.fields.map(field => ({
        label: field.label,
        content: response.data[field.name]
      }))
    }]
  }

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object,
  response: PropTypes.object
}

export default Details
