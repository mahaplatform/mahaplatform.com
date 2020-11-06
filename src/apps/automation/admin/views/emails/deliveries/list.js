import ContactToken from '@apps/crm/admin/tokens/contact'
import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Deliveries',
  rights: [],
  collection: {
    endpoint: `/api/admin/automation/emails/${props.params.email_id}/deliveries`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (email) => <ContactToken { ...email.contact } /> },
      { label: 'Sent', key: 'sent_at', primary: true, format: 'datetime' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'envelope',
      title: 'No Deliveries',
      text: 'This email campaign has not yet been sent'
    },
    entity: 'email',
    onClick: (record) => context.router.history.push(`/emails/${record.code}`)
  }
})

export default Page(null, mapPropsToPage)
