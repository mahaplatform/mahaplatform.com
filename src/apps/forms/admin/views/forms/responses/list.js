import ContactToken from '@apps/crm/admin/tokens/contact'
import Content from '@apps/forms/admin/tokens/content'
import { Page } from '@admin'
import React from 'react'
import _ from 'lodash'

const getConfig = (field) => {
  if(field.type === 'datefield') {
    return { type: 'daterange' }
  }
  if(field.type === 'checkbox') {
    return { type: 'checkbox' }
  }
  if(field.type === 'filefield') {
    return { type: 'file' }
  }
  if(_.includes(['dropdown','radiogroup'], field.type)) {
    return { type: 'select', options: field.options, search: false }
  }
  return { type: 'text' }
}

const getField = (field) => {
  const type = field.type === 'contactfield' ? field.contactfield.type : field.type
  if(type === 'addressfield') {
    return [
      { label: `${field.name.value} - Full Address`, key: `data.${field.code}.description` },
      { label: `${field.name.value} - Street 1`, key: `data.${field.code}.street_1` },
      { label: `${field.name.value} - Street 2`, key: `data.${field.code}.street_2` },
      { label: `${field.name.value} - City`, key: `data.${field.code}.city` },
      { label: `${field.name.value} - State/Province`, key: `data.${field.code}.state_province` },
      { label: `${field.name.value} - Postal Code`, key: `data.${field.code}.postal_code` },
      { label: `${field.name.value} - County`, key: `data.${field.code}.county` },
      { label: `${field.name.value} - Latitude`, key: `data.${field.code}.latitude` },
      { label: `${field.name.value} - Longitude`, key: `data.${field.code}.longitude` }
    ]
  }
  return [
    { label: field.name.value, key: `data.${field.code}` }
  ]
}

const mapPropsToPage = (props, context, resources, page) => {
  const payment = resources.form.config.fields.find(field => {
    return _.includes(['productfield','paymentfield'], field.type)
  }) !== undefined
  return {
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
      export: [
        ...resources.form.config.fields.filter(field => {
          return field.type !== 'text'
        }).reduce((fields, field) => [
          ...fields,
          ...getField(field)
        ], []),
        ...payment ? [
          { label: 'Payment - Method', key: 'payment.method' },
          { label: 'Payment - Reference', key: 'payment.reference' },
          { label: 'Payment - Amount', key: 'payment.amount' }
        ] : []
      ],
      empty: {
        icon: 'user',
        title: 'No Responses',
        text: 'There are no responses to this form'
      },
      defaultSort: { key: 'created_at', order: 'desc' },
      entity: 'responses',
      onClick: (record) => context.router.history.push(`/forms/forms/${props.params.form_id}/responses/${record.id}`)
    }
  }
}

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/forms/forms/${props.params.form_id}`
})

export default Page(mapResourcesToPage, mapPropsToPage)
