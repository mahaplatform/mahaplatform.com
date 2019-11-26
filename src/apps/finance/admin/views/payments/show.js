import { Page } from 'maha-admin'
import Details from './details'
import Refunds from './refunds'
import Refund from './refund'
import Void from './void'
import React from 'react'

const getTabs = ({ payment, refunds }) => {

  const items = [
    { label: 'Details', component: <Details payment={ payment }/> }
  ]

  if(refunds.length > 0) {
    items.push({ label: 'Refunds', component: <Refunds refunds={ refunds }/> })
  }

  return { items }

}

const getTasks = ({ payment }) => {

  const items = []

  if(payment.braintree_id === null || payment.status === 'captured') {
    items.push({
      label: 'Void Payment',
      modal: <Void payment={ payment } />
    })
  }

  if(payment.braintree_id === null || payment.status !== 'captured') {
    items.push({
      label: 'Issue Refund',
      modal: <Refund payment={ payment } />
    })
  }

  return { items }
}

const mapResourcesToPage = (props, context) => ({
  payment: `/api/admin/finance/payments/${props.params.id}`,
  refunds: `/api/admin/finance/payments/${props.params.id}/refunds`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Payment',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
