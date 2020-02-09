import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Content = ({ form, response, field }) => {
  const data = response.data[field.code]
  const type = field.type === 'contactfield' ? field.contactfield.type : field.type
  if(type === 'productfield') {
    return <span>products</span>
  } else if(type === 'addressfield') {
    return <span>{ data.description }</span>
  } else if(type === 'checkbox') {
    return <span>{ `${data}` }</span>
  } else if(type === 'filefield') {
    return (
      <div>
        { data.map((file, index) => (
          <div key={`file_${index}`}>
            <Button label={ file.file_name } className="link" route={`/admin/crm/forms/${form.id}/responses/${response.id}/uploads/${file.id}`} />
          </div>
        ))}
      </div>
    )
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

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object,
  response: PropTypes.object
}

export default Details
