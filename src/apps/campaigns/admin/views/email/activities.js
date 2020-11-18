import ContactToken from '@apps/crm/admin/tokens/contact'
import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Activities',
  rights: [],
  collection: {
    endpoint: `/api/admin/campaigns/email/${props.params.email_id}/activities`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (email) => <ContactToken { ...email.contact } property="rfc822" /> },
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
    onClick: (record) => context.router.history.push(`/emails/${record.email.code}`)
  }
})

export default Page(null, mapPropsToPage)
