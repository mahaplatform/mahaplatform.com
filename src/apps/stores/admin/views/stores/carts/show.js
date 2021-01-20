import { Page } from '@admin'
import Items from './items'
import React from 'react'

const getTabs = ({ cart, products }) => ({
  items: [
    { label: 'Items', component: <Items items={ cart.items } products={ products } /> },
  ]
})

const getTasks = ({ cart, store }, { flash, router }) => ({
  items: [
    {
      label: 'Delete Cart',
      show: cart.status !== 'ordered',
      confirm: 'Are you sure you want to delete this cart?',
      request: {
        endpoint: `/api/admin/stores/stores/${store.id}/carts/${cart.id}`,
        method: 'delete',
        onFailure: () => flash.set('error', 'Unable to delete cart'),
        onSuccess: () => {
          flash.set('success', 'Successfully deleted cart'),
          router.history.goBack()
        }
      }

    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  cart: `/api/admin/stores/stores/${props.params.store_id}/carts/${props.params.id}`,
  products: `/api/admin/stores/stores/${props.params.store_id}/products`,
  store: `/api/admin/stores/stores/${props.params.store_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Cart',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
