import ContactToken from '../../tokens/contact'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Deliveries',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/emails/${props.params.id}/deliveries`,
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: (email) => <ContactToken { ...email.contact } /> }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'envelope',
      title: 'No Deliveries',
      text: 'This email campaign has not yet been sent'
    },
    entity: 'email'
  }
})

export default Page(null, mapPropsToPage)
