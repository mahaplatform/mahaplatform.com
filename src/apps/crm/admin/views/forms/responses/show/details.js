import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Content = ({ field, data }) => {
  if(field.type === 'productfield') {
    return <span>products</span>
  } else if(field.type === 'checkbox') {
    return <span>{ `${data}` }</span>
  }
  return <span>{ data }</span>
}

const Details = ({ form, response }) => {

  const contact = {
    label: response.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${response.contact.id}`
  }

  const list = {
    sections: [{
      items: [
        { label: 'Contact', content: <Button { ...contact } /> },
        { label: 'IP Address', content: response.ipaddress },
        { label: 'Submitted', content: response.created_at, format: 'datetime' }
      ]
    }, {
      title: 'Response Data',
      items: form.config.fields.map(field => ({
        label: field.name.value,
        content: <Content field={ field } data={ response.data[field.code] } />
      }))
    }]
  }

  if(response.invoice_id) {
    const invoice = {
      label: 'View Invoice',
      className: 'link',
      route: `/admin/finance/invoices/${response.invoice_id}`
    }

    list.sections[0].items.push({ label: 'Invoice', content: <Button { ...invoice } /> })

  }

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object,
  response: PropTypes.object
}

export default Details
