import { Page } from 'maha-admin'
import Details from './details'
import Void from './void'
import React from 'react'

const getTabs = ({ refund }) => ({
  items: [
    { label: 'Details', component: <Details refund={ refund }/> }
  ]
})

const getTasks = ({ refund }) => ({
  items: [
    {
      label: 'Void Refund',
      modal: <Void refund={ refund } />
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  refund: `/api/admin/finance/refunds/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Refund',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
