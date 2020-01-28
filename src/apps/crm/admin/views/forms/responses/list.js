import ContactToken from '../../../tokens/contact'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Responses',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/forms/${props.params.form_id}/responses`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Contact', key: 'contact.display_name', primary: true, format: ({ contact }) => <ContactToken { ...contact } /> },
      { label: 'IP Address', key: 'ipaddress', primary: true },
      { label: 'Created At', key: 'created_at', primary: true, format: 'datetime' }
    ],
    empty: {
      icon: 'user',
      title: 'No Responses',
      text: 'There are no responses to this form'
    },
    defaultSort: { key: 'created_at', order: 'asc' },
    entity: 'responses',
    onClick: (record) => context.router.history.push(`/admin/crm/forms/${props.params.form_id}/responses/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
