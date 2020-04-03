import PropTypes from 'prop-types'
import { Button, Comments, List } from 'maha-admin'
import numeral from 'numeral'
import React from 'react'

const Details = ({ registration }) => {

  const contact = {
    label: registration.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${registration.contact.id}`
  }

  const invoice = {
    label: 'View Invoice',
    className: 'link',
    route: `/admin/finance/invoices/${registration.invoice_id}`
  }

  const config = {
    items: [
      { label: 'Contact', content: <Button { ...contact } /> },
      { label: 'IP Address', content: registration.ipaddress },
      { label: 'Referer', content: registration.referer },
      { label: 'Duration', content: `${registration.duration} seconds` },
      { label: 'Contact Status', content: registration.is_known ? 'KNOWN' : 'UNKNOWN' },
      { label: 'Registered', content: registration.created_at, format: 'datetime' },
      { label: 'Invoice', content: <Button { ...invoice } /> },
      { label: 'Revenue', content: numeral(registration.revenue).format('$0.00') }
    ]
  }

  config.footer = <Comments entity={`events_registrations/${registration.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  registration: PropTypes.object
}

export default Details
