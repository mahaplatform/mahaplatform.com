import { Page } from '@admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Carts',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Cart', key: 'code' },
      { label: 'Expires', key: 'expires_at', format: 'from' },
      { label: 'Items', key: 'items_count', collapsing: true }
    ],
    empty: {
      icon: 'shopping-cart',
      title: 'No Carts',
      text: 'There are no carts'
    },
    endpoint: `/api/admin/stores/stores/${props.params.store_id}/carts`,
    entity: 'cart',
    defaultSort: { key: 'created_at', order: 'asc' },
    onClick: (record) => context.router.history.push(`/stores/stores/${props.params.store_id}/carts/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
