import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ invoice }) => ({
  items: [
    { label: 'Details', component: <Details invoice={ invoice } /> },
    { label: 'Payments', component: <Details invoice={ invoice } /> }
  ]
})

const getTasks = ({ workflow, list }) => ({
  items: [
    {
      label: 'Edit Invoice'
    }, {
      label: 'Send Invoice'
    }, {
      label: 'Receive Payment'
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  invoice: `/api/admin/finance/invoices/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Invoice',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
