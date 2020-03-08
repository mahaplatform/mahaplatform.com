import ContactToken from '../../tokens/contact'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Activities',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/campaigns/email/${props.params.email_id}/activities`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (email) => <ContactToken { ...email.contact } /> },
      { label: 'Description', key: 'description' },
      { label: 'Created At', key: 'created_at', format: 'datetime' }
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: ['open','click','share','forward','webview']}
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'envelope',
      title: 'No Activities',
      text: 'This email campaign has not yet been sent'
    },
    entity: 'email',
    onClick: (record) => context.router.history.push(`/admin/crm/campaigns/email/${props.params.email_id}/deliveries/${record.email_id}`)
  }
})

export default Page(null, mapPropsToPage)
