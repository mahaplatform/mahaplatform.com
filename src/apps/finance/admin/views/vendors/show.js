import { Page } from '@admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const getTabs = ({ audits, app, vendor }) => ({
  items: [
    { label: 'Details', component: <Details vendor={ vendor } audits={ audits } integration={ app.settings.integration } /> }
  ]
})

const getTasks = ({ audits, app, vendor }) => ({
  items: [
    {
      label: 'Edit Vendor',
      modal: <Edit vendor={ vendor } integration={ app.settings.integration } />
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_vendors/${props.params.id}/audits`,
  app: '/api/admin/apps/finance/settings',
  vendor: `/api/admin/finance/vendors/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Vendor',
  tabs: getTabs(resources, props),
  tasks: getTasks(resources, props, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
