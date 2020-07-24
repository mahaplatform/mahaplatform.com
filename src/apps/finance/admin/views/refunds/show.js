import Allocations from './allocations'
import { Page } from 'maha-admin'
import Details from './details'
import Void from './void'
import React from 'react'

const getTabs = ({ allocations, refund }) => ({
  items: [
    { label: 'Details', component: <Details refund={ refund }/> },
    { label: 'Allocations', component: <Allocations refund={ refund } allocations={ allocations }/> }
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
  allocations: `/api/admin/finance/refunds/${props.params.id}/allocations`,
  refund: `/api/admin/finance/refunds/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Refund',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
