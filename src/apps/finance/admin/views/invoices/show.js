import { Page } from 'maha-admin'
import Payments from './payments'
import Payment from './payment'
import Details from './details'
import Void from './void'
import React from 'react'

const getTabs = ({ audits, invoice, payments }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } invoice={ invoice } /> },
    { label: 'Payments', component: <Payments payments={ payments } /> }
  ]
})

const getTasks = ({ invoice }) => ({
  items: [
    {
      label: 'Edit Invoice'
    }, {
      label: 'Send Invoice'
    }, {
      label: 'Void Invoice',
      modal: <Void invoice={ invoice } />
    }, {
      label: 'Receive Payment',
      modal: <Payment invoice={ invoice } />
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_invoices/${props.params.id}/audits`,
  invoice: `/api/admin/finance/invoices/${props.params.id}`,
  payments: `/api/admin/finance/invoices/${props.params.id}/payments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Invoice',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
