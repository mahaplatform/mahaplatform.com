import PropTypes from 'prop-types'
import { Button, Comments, List } from 'maha-admin'
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
          { label: 'IP Address', content: registration.ipaddress },
          { label: 'Referer', content: registration.referer },
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
          { label: 'Email', content: registration.data.email }
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
      route: `/admin/crm/workflows/${registration.enrollment.workflow_id}/enrollments/${registration.enrollment.id}`
    }

    config.sections[0].items.push({ label: 'Workflow', content: <Button { ...enrollment } /> })

  }

  event.contact_config.fields.map(field => {
    config.sections[1].items.push({ label: field.name.value, content: registration.data[field.code] })
  })

  config.footer = <Comments entity={`events_registrations/${registration.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  event: PropTypes.object,
  registration: PropTypes.object
}

export default Details
