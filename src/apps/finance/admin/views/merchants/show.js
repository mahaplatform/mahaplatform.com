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

const getTasks = ({ app, merchant }) => {
  const items = [{
    label: 'Edit Merchant',
    rights: ['finance:manage_configuration'],
    modal: <Edit merchant={ merchant } integration={ app.settings.integration } />
  }]
  if(!merchant.braintree_id && !merchant.applied_on) {
    items.push({
      label: 'Signup with Braintree',
      link: 'https://apply.braintreegateway.com/signup/us?partner_source=referrer_id=0062E00001GnA8AQAV_0032E00002bbcZ4QAI'
    })
  }
  return { items }
}

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
