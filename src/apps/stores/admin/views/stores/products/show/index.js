import Variants from './variants'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, product }) => ({
  items: [
    { label: 'Details', component: <Details product={ product } audits={ audits } /> },
    { label: 'Variants', component: <Variants /> }
  ]
})

const getTasks = ({ store }) => {

  const items = []

  // items.push({ label: 'Edit Store', modal: <Edit store={ store } /> })

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/stores_products/${props.params.id}/audits`,
  product: `/api/admin/stores/stores/${props.params.store_id}/products/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Product',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
