import { Page } from 'maha-admin'
import Payment from './payment'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, invoice }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } invoice={ invoice } /> }
  ]
})

const getTasks = ({ invoice }) => ({
  items: [
    {
      label: 'Edit Invoice'
    }, {
      label: 'Send Invoice'
    }, {
      label: 'Receive Payment',
      modal: <Payment invoice={ invoice } />
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_invoices/${props.params.id}/audits`,
  invoice: `/api/admin/finance/invoices/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Invoice',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
