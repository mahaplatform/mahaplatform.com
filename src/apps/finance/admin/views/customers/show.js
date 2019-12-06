import Scholarships from './scholarships'
import { Page } from 'maha-admin'
import Invoices from './invoices'
import Payments from './payments'
import Details from './details'
import Credits from './credits'
import Cards from './cards'
import Sales from './sales'
import React from 'react'

const getTabs = ({ cards, customer, invoices, payments, refunds, credits, scholarships }) => ({
  items: [
    { label: 'Details', component: <Details customer={ customer }/> },
    { label: 'Invoices', component: <Invoices invoices={ invoices }/> },
    { label: 'Payments', component: <Payments payments={ payments } /> },
    { label: 'Credits', component: <Credits credits={ credits }/> },
    { label: 'Scholarships', component: <Scholarships scholarships={ scholarships }/> },
    { label: 'Cards', component: <Cards cards={ cards }/> },
    { label: 'Sales', component: <Sales customer={ customer }/> }
  ]
})

const getTasks = ({ invoice }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  customer: `/api/admin/finance/customers/${props.params.id}`,
  cards: `/api/admin/finance/customers/${props.params.id}/cards`,
  credits: `/api/admin/finance/customers/${props.params.id}/credits`,
  invoices: `/api/admin/finance/customers/${props.params.id}/invoices`,
  payments: `/api/admin/finance/customers/${props.params.id}/payments`,
  refunds: `/api/admin/finance/customers/${props.params.id}/refunds`,
  scholarships: `/api/admin/finance/customers/${props.params.id}/scholarships`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Customer',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
