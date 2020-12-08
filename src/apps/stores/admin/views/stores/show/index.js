import NewProduct from '../../../components/productform'
import Performance from './performance'
import Inventory from '../inventory'
import Workflows from './workflows'
import Products from './products'
import Details from './details'
import Inv from './inventory'
import { Page } from '@admin'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, products, store, workflows }) => ({
  items: [
    { label: 'Details', component: <Details store={ store } audits={ audits } /> },
    { label: 'Products', component: <Products store={ store } products={ products } /> },
    { label: 'Inventory', component: <Inv products={ products }/> },
    { label: 'Workflows', component: <Workflows store={ store } workflows={ workflows } /> },
    { label: 'Performance', component: <Performance store={ store } /> }
  ]
})

const getTasks = ({ products, store }, { flash, router }) => {

  if(store.deleted_at) return {}

  return {
    items: [
      { label: 'Edit Store', modal: <Edit store={ store } /> },
      { label: 'Create Product', modal: <NewProduct store={ store } /> },
      { label: 'Manage Inventory', modal: <Inventory store_id={ store.id } products={ products } /> },
      {
        label: 'Delete Store',
        confirm: `
          Are you sure you want to delete this store? You will also delete all of
          the associated products, orders, workflows, emails, and performance data
        `,
        request: {
          endpoint: `/api/admin/stores/stores/${store.id}`,
          method: 'delete',
          onFailure: () => {
            flash.set('error', 'Unable to delete this store')
          },
          onSuccess: () => {
            flash.set('success', 'The store was successfuly deleted')
            router.history.goBack()
          }

        }
      }
    ]
  }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/stores_stores/${props.params.id}/audits`,
  store: `/api/admin/stores/stores/${props.params.id}`,
  products: `/api/admin/stores/stores/${props.params.id}/products`,
  workflows: `/api/admin/stores/stores/${props.params.id}/workflows`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Store',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
