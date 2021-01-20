import { Page } from '@admin'
import Details from './details'
import Items from './items'
import React from 'react'

const getTabs = ({ audits, store, order, items }) => ({
  items: [
    { label: 'Details', component: <Details store={ store } order={ order } audits={ audits } /> },
    { label: 'Items', component: <Items store={ store } order={ order } items={ items } /> }
  ]
})

const getTasks = ({ campaign }) => {
  const items = []

  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/estores_registrations/${props.params.id}/audits`,
  store: `/api/admin/stores/stores/${props.params.store_id}`,
  order: `/api/admin/stores/stores/${props.params.store_id}/orders/${props.params.id}`,
  items: `/api/admin/stores/stores/${props.params.store_id}/orders/${props.params.id}/items`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Order',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
