import ContactToken from '../../../../../crm/admin/tokens/contact'
import { Page } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

const getConfig = (field) => {
  if(field.type === 'datefield') {
    return {
      type: 'daterange'
    }
  }
  if(field.type === 'checkbox') {
    return {
      type: 'checkbox'
    }
  }
  if(field.type === 'filefield') {
    return {
      type: 'file'
    }
  }
  if(_.includes(['dropdown','radiogroup'], field.type)) {
    return {
      type: 'select',
      options: field.options,
      search: false
    }
  }
  return {
    type: 'text'
  }
}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Responses',
  rights: [],
  collection: {
    endpoint: `/api/admin/forms/forms/${props.params.form_id}/responses`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', sort: 'contact', primary: true, format: ({ contact }) => <ContactToken { ...contact } /> },
      { label: 'Created At', key: 'created_at', format: 'datetime' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right' }
    ],
    criteria: {
      fields: [
        { label: 'Form', fields: resources.form.config.fields.filter(field => {
          return field.type !== 'text'
        }).map(field => ({
          name: field.name.value,
          key: field.code,
          ...getConfig(field)
        })) }
      ]
    },
    empty: {
      icon: 'user',
      title: 'No Responses',
      text: 'There are no responses to this form'
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'responses',
    onClick: (record) => context.router.history.push(`/forms/forms/${props.params.form_id}/responses/${record.id}`)
  },
  tasks: {
    items: [
      {
        label: 'Export Data',
        handler: () => {
          const { token } = context.admin.team
          window.location.href = `/api/admin/forms/forms/${props.params.form_id}/responses/download.xlsx?filename=form-${resources.form.code}-responses&download=true&token=${token}`
        }
      }
    ]
  }
})

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/forms/forms/${props.params.form_id}`
})

export default Page(mapResourcesToPage, mapPropsToPage)
