import { Page } from 'maha-admin'
import Payments from './payments'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, credit, payments }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } credit={ credit }/> },
    { label: 'Payments', component: <Payments credit={ credit } payments={ payments }/> }
  ]
})

const getTasks = ({ customer }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_credits/${props.params.id}/audits`,
  credit: `/api/admin/finance/customers/${props.params.customer_id}/credits/${props.params.id}`,
  payments: `/api/admin/finance/customers/${props.params.customer_id}/credits/${props.params.id}/payments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Credit',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
