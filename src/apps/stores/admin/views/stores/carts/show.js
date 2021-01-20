import { Page } from '@admin'
import Items from './items'
import React from 'react'

const getTabs = ({ carts, products }) => ({
  items: [
    { label: 'Items', component: <Items items={ carts.items } products={ products } /> },
  ]
})

const getTasks = ({ products, store }, { flash, router }) => {

}

const mapResourcesToPage = (props, context) => ({
  carts: `/api/admin/stores/stores/${props.params.store_id}/carts/${props.params.id}`,
  products: `/api/admin/stores/stores/${props.params.store_id}/products`,
  store: `/api/admin/stores/stores/${props.params.store_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Cart',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
