import ContactToken from '@apps/crm/admin/tokens/contact'
import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contacts',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${props.params.program_id}/topics/${props.params.topic_id}/contacts`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'full_name', primary: true, format: (contact) => <ContactToken { ...contact } /> },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone', format: 'phone' }
    ],
    empty: {
      icon: 'user',
      title: 'No Contacts',
      text: 'You have not yet added any contacts to this topic'
    },
    entity: 'program',
    defaultSort: { key: 'last_name', order: 'asc' },
    onClick: (record) => context.router.history.push(`/crm/contacts/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
