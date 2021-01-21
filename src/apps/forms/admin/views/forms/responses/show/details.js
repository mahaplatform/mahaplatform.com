import { Button, Comments, List } from '@admin'
import Content from '../../../../tokens/content'
import PropTypes from 'prop-types'
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
        content: <Content data={ response.data } field={ field } />
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

  if(response.enrollment) {

    const enrollment = {
      label: 'View Enrollment',
      className: 'link',
      route: `/admin/automation/workflows/${response.enrollment.workflow_id}/enrollments/${response.enrollment.id}`
    }

    list.sections[0].items.push({ label: 'Workflow', content: <Button { ...enrollment } /> })

  }

  list.footer = <Comments entity={`crm_responses/${response.id}`} />

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object,
  response: PropTypes.object
}

export default Details
