import { Page } from 'maha-admin'
import Payments from './payments'
import Payment from './payment'
import Details from './details'
import Void from './void'
import React from 'react'

const getTabs = ({ audits, invoice, payments }) => {

  const items = [
    { label: 'Details', component: <Details audits={ audits } invoice={ invoice } /> }
  ]

  if(payments.length > 0) {
    items.push({ label: 'Payments', component: <Payments payments={ payments } /> })
  }

  return { items }

}

const getTasks = ({ invoice }) => {
  if(invoice.status === 'voided') return null
  const items = []
  if(invoice.status !== 'paid') {
    items.push({ label: 'Edit Invoice' })
    if(invoice.payments.length === 0) {
      items.push({ label: 'Void Invoice', modal: <Void invoice={ invoice } />  })
    }
    items.push({ label: 'Receive Payment', modal: <Payment invoice={ invoice } /> })
    items.push({ label: 'Send Invoice' })
  } else {
    items.push({ label: 'Send Receipt' })
  }
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_invoices/${props.params.id}/audits`,
  invoice: `/api/admin/finance/invoices/${props.params.id}`,
  payments: `/api/admin/finance/invoices/${props.params.id}/payments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Customer Invoice',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
