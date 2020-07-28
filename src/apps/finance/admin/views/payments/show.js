import Allocations from './allocations'
import { Page } from 'maha-admin'
import Details from './details'
import Refunds from './refunds'
import Refund from './refund'
import Void from './void'
import React from 'react'
import _ from 'lodash'

const getTabs = ({ audits, allocations, payment, refunds }) => {

  const items = [
    { label: 'Details', component: <Details audits={ audits } payment={ payment } /> },
    { label: 'Allocations', component: <Allocations payment={ payment } allocations={ allocations } /> }
  ]

  if(refunds.length > 0) {
    items.push({ label: 'Refunds', component: <Refunds payment={ payment } refunds={ refunds }/> })
  }

  return { items }

}

const getTasks = ({ allocations, payment }) => {

  const items = []

  if(!_.includes(['credit','scholarship'], payment.method) && (payment.braintree_id === null || payment.status === 'captured')) {
    items.push({
      label: 'Void Payment',
      modal: <Void payment={ payment } />
    })
  }

  if(payment.braintree_id !== null && !_.includes(['captured','voided'], payment.status) && payment.refundable > 0) {
    items.push({
      label: 'Issue Refund',
      modal: <Refund allocations={ allocations } payment={ payment } />
    })
  }

  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_payments/${props.params.id}/audits`,
  payment: `/api/admin/finance/payments/${props.params.id}`,
  allocations: `/api/admin/finance/payments/${props.params.id}/allocations`,
  refunds: `/api/admin/finance/payments/${props.params.id}/refunds`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Payment',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
