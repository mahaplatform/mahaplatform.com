import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const getTabs = ({ bank }) => ({
  items: [
    { label: 'Details', component: <Details bank={ bank } /> }
  ]
})

const getTasks = ({ app, bank }) => {
  return {
    items: [
      {
        label: 'Edit Bank',
        modal: <Edit bank={ bank } />
      }
    ]
  }
}

const mapResourcesToPage = (props, context) => ({
  bank: `/api/admin/platform/banks/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Bank Account',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
