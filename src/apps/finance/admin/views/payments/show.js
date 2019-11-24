import { Page } from 'maha-admin'
import Details from './details'
import Refunds from './refunds'
import React from 'react'

const getTabs = ({ payment, refunds }) => ({
  items: [
    { label: 'Details', component: <Details payment={ payment }/> },
    { label: 'Refunds', component: <Refunds refunds={ refunds }/> }
  ]
})

const getTasks = ({ invoice }) => ({
  items: [
    {
      label: 'Void Payment'
    }, {
      label: 'Issue Refund'
    }
  ]
})

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
