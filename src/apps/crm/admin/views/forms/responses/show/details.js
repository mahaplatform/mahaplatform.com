import { Button, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import Content from './content'
import numeral from 'numeral'
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
        { label: 'Contact', content: <Button { ...contact } /> },
        { label: 'IP Address', content: response.ipaddress },
        { label: 'Referer', content: response.referer },
        { label: 'Duration', content: `${response.duration} seconds` },
        { label: 'Contact Status', content: response.is_known ? 'KNOWN' : 'UNKNOWN' },
        { label: 'Submitted', content: response.created_at, format: 'datetime' },
        { label: 'Revenue', content: numeral(response.revenue).format('$0.00') }
      ]
    }, {
      title: 'Response Data',
      items: form.config.fields.filter(field => {
        return field.type !== 'text'
      }).map(field => ({
        label: field.name.value,
        content: <Content form={ form } response={ response } field={ field } />
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

  list.footer = <Comments entity={`crm_responses/${response.id}`} />

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object,
  response: PropTypes.object
}

export default Details
