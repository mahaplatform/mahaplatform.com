import { Page } from 'maha-admin'
import Payments from './payments'
import Payment from './payment'
import Details from './details'
import Clone from './clone'
import Send from './send'
import Edit from './edit'
import Void from './void'
import React from 'react'

const getTabs = ({ audits, invoice, payments }) => {

  const items = [
    { label: 'Details', component: <Details audits={ audits } invoice={ invoice } /> }
  ]

  if(payments.length > 0) {
    items.push({ label: 'Payments', component: <Payments invoice={ invoice } payments={ payments } /> })
  }

  return { items }

}

const getTasks = ({ invoice }, { admin }) => {
  if(invoice.status === 'voided') return null
  const entity = invoice.status === 'paid' ? 'Receipt' : 'Invoice'
  const items = []
  if(invoice.status !== 'paid' && invoice.payments.length === 0) {
    items.push({ label: 'Edit Invoice', modal: <Edit invoice={ invoice } /> })
  }
  items.push({ label: 'Clone Invoice', modal: <Clone invoice={ invoice } /> })
  if(invoice.status !== 'paid' && invoice.payments.length === 0) {
    items.push({ label: 'Void Invoice', modal: <Void invoice={ invoice } />  })
  }
  if(invoice.status !== 'paid') {
    items.push({ label: 'Receive Payment', modal: <Payment invoice={ invoice } /> })
  }
  items.push({ label: `Send ${entity}`, modal: <Send invoice={ invoice } />  })
  items.push({ label: `View Public ${entity}`, link: `${process.env.WEB_HOST}/finance/invoices/${invoice.code}` })
  items.push({ label: 'Download Invoice', url: `${process.env.WEB_HOST}/finance/invoices/${invoice.code}/download` })
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_invoices/${props.params.id}/audits`,
  invoice: `/api/admin/finance/invoices/${props.params.id}`,
  payments: `/api/admin/finance/invoices/${props.params.id}/payments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Invoice',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
