import PaymentToken from '@apps/events/admin/tokens/payment'
import OrderToken from '@apps/stores/admin/tokens/order'
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
  title: 'Orders',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', sort: 'contact', primary: true, format: OrderToken },
      { label: 'Submitted', key: 'created_at', format: 'datetime' },
      { label: 'Items', key: 'items_count', collapsing: true, align: 'right' },
      { label: 'Unfulfilled', key: 'unfulfilled_count', collapsing: true, align: 'right' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right' },
      { label: 'Status', key: 'is_paid', collapsing: true, format: PaymentToken }
    ],
    empty: {
      icon: 'shopping-bag',
      title: 'No orders',
      text: 'There are no orders for this store'
    },
    criteria: {
      fields: [
        { label: 'Order', fields: [
          {  name: 'Product', key: 'product_id',type: 'select', endpoint: `/api/admin/stores/stores/${resources.store.id}/products`, value: 'id', text: 'title' }
        ] }
      ]
    },
    export: [
      { label: 'ID', key: 'id' },
      { label: 'First Name', key: 'data.first_name' },
      { label: 'Last Name', key: 'data.last_name' },
      { label: 'Email', key: 'data.email' },
      ...resources.store.contact_config.fields.filter(field => {
        return field.type !== 'text'
      }).reduce((fields, field) => [
        ...fields,
        ...getField(field)
      ], []),
      ...resources.products.reduce((variants, product) => [
        ...variants,
        ...product.variants.reduce((variants, variant) => [
          ...variants,
          { label: `${product.title}`, key: `variant_totals[${variant.id}]` }
        ], [])
      ], []),
      { label: 'Order Date', key: 'created_at' },
      { label: 'Payment Method', key: 'payment.method' },
      { label: 'Payment Reference', key: 'payment.reference' },
      { label: 'Payment Amount', key: 'payment.amount' },
      { label: 'Payment Date', key: 'payment.date' }
    ],
    endpoint: `/api/admin/stores/stores/${props.params.store_id}/orders`,
    entity: 'order',
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/stores/stores/${props.params.store_id}/orders/${record.id}`)
  }
})

const mapResourcesToPage = (props, context) => ({
  products: `/api/admin/stores/stores/${props.params.store_id}/products`,
  store: `/api/admin/stores/stores/${props.params.store_id}`
})

export default Page(mapResourcesToPage, mapPropsToPage)
