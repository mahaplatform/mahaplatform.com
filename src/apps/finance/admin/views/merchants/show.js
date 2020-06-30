import { Page } from 'maha-admin'
import Details from './details'
import Sales from './sales'
import Edit from './edit'
import React from 'react'

const getTabs = ({ app, merchant }) => ({
  items: [
    { label: 'Details', component: <Details merchant={ merchant } integration={ app.settings.integration } /> },
    { label: 'Sales', component: <Sales merchant={ merchant } /> }
  ]
})

const getTasks = ({ app, merchant }) => ({
  items: [{
    label: 'Edit Merchant',
    rights: ['finance:manage_configuration'],
    modal: <Edit merchant={ merchant } integration={ app.settings.integration } />
  }]
})

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  merchant: `/api/admin/finance/merchants/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Merchant Account',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
