import OrderToken from '@apps/stores/admin/tokens/order'
import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Orders',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.display_name', sort: 'contact', primary: true, format: OrderToken }
    ],
    empty: {
      icon: 'shopping-bag',
      title: 'No orders',
      text: 'There are no orders for this store'
    },
    endpoint: `/api/admin/stores/stores/${props.params.store_id}/orders`,
    entity: 'cart',
    defaultSort: { key: 'created_at', order: 'asc' },
    onClick: (record) => context.router.history.push(`/stores/stores/${props.params.store_id}/orders/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
