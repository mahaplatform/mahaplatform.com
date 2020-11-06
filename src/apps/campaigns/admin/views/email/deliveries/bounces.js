import BounceTypeToken from '@apps/automation/admin/tokens/bounce_type'
import ContactToken from '@apps/crm/admin/tokens/contact'
import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Deliveries',
  rights: [],
  collection: {
    endpoint: `/api/admin/campaigns/email/${props.params.email_id}/bounces`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (email) => <ContactToken { ...email.contact } property="rfc822" /> },
      { label: 'Bounce Type', key: 'bounce_type', primary: true, padded: true, collapsing: true, format: BounceTypeToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'envelope',
      title: 'No Deliveries',
      text: 'This email campaign has not yet been sent'
    },
    entity: 'email',
    onClick: (record) => context.router.history.push(`/campaigns/email/${props.params.email_id}/deliveries/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
