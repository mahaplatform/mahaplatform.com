import Fulfill from '@apps/stores/admin/components/fulfill'
import Details from './details'
import { Page } from '@admin'
import Items from './items'
import React from 'react'

const getTabs = ({ audits, store, order }) => ({
  items: [
    { label: 'Details', component: <Details store={ store } order={ order } audits={ audits } /> },
    { label: 'Items', component: <Items store={ store } order={ order } /> }
  ]
})

const getTasks = ({ order, store }) => {
  const items = [
    { label: 'Fulfill Order', modal: <Fulfill order={ order } store={ store } /> }
  ]

  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/estores_registrations/${props.params.id}/audits`,
  store: `/api/admin/stores/stores/${props.params.store_id}`,
  order: `/api/admin/stores/stores/${props.params.store_id}/orders/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Order',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
