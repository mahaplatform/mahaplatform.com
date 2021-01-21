import Content from '@apps/forms/admin/tokens/content'
import { Button, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Details = ({ event, registration }) => {

  const contact = {
    label: registration.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${registration.contact.id}`
  }

  const config = {
    sections: [
      {
        items: [
          { label: 'Contact', content: <Button { ...contact } /> },
          { label: 'Duration', content: `${registration.duration} seconds` },
          { label: 'Contact Status', content: registration.is_known ? 'KNOWN' : 'UNKNOWN' },
          { label: 'Submitted', content: registration.created_at, format: 'datetime' },
          { label: 'Revenue', content: numeral(registration.revenue).format('$0.00') }
        ]
      }, {
        title: 'Registration Data',
        items: [
          { label: 'First Name', content: registration.data.first_name },
          { label: 'Last Name', content: registration.data.last_name },
          { label: 'Email', content: registration.data.email },
          ...event.contact_config.fields.filter(field => {
            return field.type !== 'text'
          }).map(field => ({
            label: field.name.value,
            content: <Content data={ registration.data } field={ field } />
          }))
        ]
      }
    ]
  }

  if(registration.invoice_id) {

    const invoice = {
      label: 'View Invoice',
      className: 'link',
      route: `/admin/finance/invoices/${registration.invoice_id}`
    }

    config.sections[0].items.push({ label: 'Invoice', content: <Button { ...invoice } /> })

  }

  if(registration.enrollment) {

    const enrollment = {
      label: 'View Enrollment',
      className: 'link',
      route: `/admin/automation/workflows/${registration.enrollment.workflow_id}/enrollments/${registration.enrollment.id}`
    }

    config.sections[0].items.push({ label: 'Workflow', content: <Button { ...enrollment } /> })

  }

  config.footer = <Comments entity={`events_registrations/${registration.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  event: PropTypes.object,
  registration: PropTypes.object
}

export default Details
