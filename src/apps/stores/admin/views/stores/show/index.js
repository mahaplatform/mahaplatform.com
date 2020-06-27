import NewProduct from '../../../components/productform'
import Performance from './performance'
import { Page } from 'maha-admin'
import Products from './products'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, products, store }) => ({
  items: [
    { label: 'Details', component: <Details store={ store } audits={ audits } /> },
    { label: 'Products', component: <Products store={ store } products={ products } /> },
    { label: 'Performance', component: <Performance /> }
  ]
})

const getTasks = ({ store }) => {

  const items = []

  if(!store.deleted_at) {
    items.push({ label: 'Edit Store', modal: <Edit store={ store } /> })
    items.push({ label: 'Create Product', modal: <NewProduct store={ store } /> })
    items.push({ label: 'View Public Store', link: store.url })
  }

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/stores_stores/${props.params.id}/audits`,
  store: `/api/admin/stores/stores/${props.params.id}`,
  products: `/api/admin/stores/stores/${props.params.id}/products`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Store',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
