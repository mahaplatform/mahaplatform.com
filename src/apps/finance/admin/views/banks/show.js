import { Page } from 'maha-admin'
import Details from './details'
import Sales from './sales'
import Edit from './edit'
import React from 'react'

const getTabs = ({ app, bank }) => ({
  items: [
    { label: 'Details', component: <Details bank={ bank } integration={ app.settings.integration } /> },
    { label: 'Sales', component: <Sales bank={ bank } /> }
  ]
})

const getTasks = ({ app, bank }) => {
  const items = [{
    label: 'Edit Bank',
    rights: ['finance:manage_configuration'],
    modal: <Edit bank={ bank } integration={ app.settings.integration } />
  }]
  if(!bank.braintree_id && !bank.applied_on) {
    items.push({
      label: 'Signup with Braintree',
      link: 'https://apply.braintreegateway.com/signup/us?partner_source=referrer_id=0062E00001GnA8AQAV_0032E00002bbcZ4QAI'
    })
  }
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  bank: `/api/admin/finance/banks/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Bank Account',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
