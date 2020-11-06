import Allocations from './allocations'
import { Page } from '@admin'
import Details from './details'
import Void from './void'
import React from 'react'

const getTabs = ({ audits, allocations, refund }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } refund={ refund } /> },
    { label: 'Allocations', component: <Allocations refund={ refund } allocations={ allocations } /> }
  ]
})

const getTasks = ({ refund }) => {
  if(refund.voided_date) return null
  return {
    items: [
      {
        label: 'Void Refund',
        modal: <Void refund={ refund } />
      }
    ]
  }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_refunds/${props.params.id}/audits`,
  allocations: `/api/admin/finance/refunds/${props.params.id}/allocations`,
  refund: `/api/admin/finance/refunds/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Refund',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
