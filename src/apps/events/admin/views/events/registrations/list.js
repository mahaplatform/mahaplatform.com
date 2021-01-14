import RegistrationToken from '@apps/events/admin/tokens/registration'
import Content from '@apps/forms/admin/tokens/content'
import PaymentToken from '../../../tokens/payment'
import { Page } from '@admin'
import React from 'react'

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

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Registrations',
  collection: {
    endpoint: `/api/admin/events/events/${page.params.event_id}/registrations`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', sort: 'contact', primary: true, format: RegistrationToken },
      ...resources.event.contact_config.fields.map(field => ({
        label: field.name.value,
        key: `data.${field.code}`,
        sort: field.code,
        visible: false,
        format: ({ data }) => <Content data={ data } field={ field } />
      })),
      { label: 'Submitted', key: 'created_at', format: 'datetime' },
      { label: 'Tickets', key: 'tickets_count', collapsing: true, align: 'right' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right' },
      { label: 'Status', key: 'is_paid', collapsing: true, format: PaymentToken }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'First Name', key: 'data.first_name' },
      { label: 'Last Name', key: 'data.last_name' },
      { label: 'Email', key: 'data.email' },
      ...resources.event.contact_config.fields.filter(field => {
        return field.type !== 'text'
      }).reduce((fields, field) => [
        ...fields,
        ...getField(field)
      ], []),
      { label: 'Tickets', key: 'tickets_count' },
      { label: 'Revenue', key: 'revenue' },
      { label: 'Status', key: 'is_paid' },
      { label: 'Payment - Method', key: 'payment.method' },
      { label: 'Payment - Reference', key: 'payment.reference' },
      { label: 'Payment - Amount', key: 'payment.amount' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'user',
      title: 'No Registrations',
      text: 'No one has registered for this event',
      buttons: []
    },
    entity: 'event',
    onClick: (record) => context.router.history.push(`/events/events/${page.params.event_id}/registrations/${record.id}`)
  }
})

const mapResourcesToPage = (props, context) => ({
  event: `/api/admin/events/events/${props.params.event_id}`
})

export default Page(mapResourcesToPage, mapPropsToPage)
