import Content from '@apps/forms/admin/tokens/content'
import { Button, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Details = ({ store, order }) => {

  const contact = {
    label: order.contact.display_name,
    className: 'link',
    route: `/admin/crm/contacts/${order.contact.id}`
  }

  const config = {
    sections: [
      {
        items: [
          { label: 'Contact', content: <Button { ...contact } /> },
          { label: 'Duration', content: `${order.duration} seconds` },
          { label: 'Contact Status', content: order.is_known ? 'KNOWN' : 'UNKNOWN' },
          { label: 'Submitted', content: order.created_at, format: 'datetime' },
          { label: 'Revenue', content: numeral(order.revenue).format('$0.00') }
        ]
      }, {
        title: 'Registration Data',
        items: [
          { label: 'First Name', content: order.data.first_name },
          { label: 'Last Name', content: order.data.last_name },
          { label: 'Email', content: order.data.email },
          ...store.contact_config.fields.filter(field => {
            return field.type !== 'text'
          }).map(field => ({
            label: field.name.value,
            content: <Content data={ order.data } field={ field } />
          }))
        ]
      }
    ]
  }

  if(order.invoice_id) {

    const invoice = {
      label: 'View Invoice',
      className: 'link',
      route: `/admin/finance/invoices/${order.invoice_id}`
    }

    config.sections[0].items.push({ label: 'Invoice', content: <Button { ...invoice } /> })

  }

  if(order.enrollment) {

    const enrollment = {
      label: 'View Enrollment',
      className: 'link',
      route: `/admin/automation/workflows/${order.enrollment.workflow_id}/enrollments/${order.enrollment.id}`
    }

    config.sections[0].items.push({ label: 'Workflow', content: <Button { ...enrollment } /> })

  }

  config.footer = <Comments entity={`stores_orders/${order.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  store: PropTypes.object,
  order: PropTypes.object
}

export default Details
