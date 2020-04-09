import ContactToken from '../../../tokens/contact'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Responses',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/forms/${props.params.form_id}/responses`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', sort: 'contact', primary: true, format: ({ contact }) => <ContactToken { ...contact } /> },
      { label: 'Created At', key: 'created_at', format: 'datetime' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right' }
    ],
    empty: {
      icon: 'user',
      title: 'No Responses',
      text: 'There are no responses to this form'
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'responses',
    onClick: (record) => context.router.history.push(`/admin/crm/forms/${props.params.form_id}/responses/${record.id}`)
  },
  tasks: {
    items: [
      {
        label: 'Export Data',
        handler: () => {
          const { token } = context.admin.team
          window.location.href = `/api/admin/crm/forms/${props.params.form_id}/responses/download.xlsx?filename=form-${resources.form.code}-responses&download=true&token=${token}`
        }
      }
    ]
  }
})

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/crm/forms/${props.params.form_id}`
})

export default Page(mapResourcesToPage, mapPropsToPage)
