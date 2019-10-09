import ContactToken from '../../../tokens/contact'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Campaigns',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/campaigns/email/${props.params.id}/deliveries`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (email) => <ContactToken { ...email.contact } /> }
    ],
    empty: 'This email campaign has not yet been sent',
    entity: 'email',
    icon: 'envelope',
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(null, mapPropsToPage)
