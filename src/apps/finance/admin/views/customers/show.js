import PaymentMethods from './payment_methods'
import Scholarships from './scholarships'
import Scholarship from './scholarship'
import { Page } from 'maha-admin'
import Invoices from './invoices'
import Payments from './payments'
import Details from './details'
import Credits from './credits'
import Credit from './credit'
import Sales from './sales'
import React from 'react'

const getTabs = ({ payment_methods, customer, invoices, payments, refunds, credits, scholarships }) => ({
  items: [
    { label: 'Details', component: <Details customer={ customer }/> },
    { label: 'Invoices', component: <Invoices invoices={ invoices }/> },
    { label: 'Payments', component: <Payments payments={ payments } /> },
    { label: 'Credits', component: <Credits credits={ credits }/> },
    { label: 'Scholarships', component: <Scholarships scholarships={ scholarships }/> },
    { label: 'Methods', component: <PaymentMethods payment_methods={ payment_methods }/> },
    { label: 'Sales', component: <Sales customer={ customer }/> }
  ]
})

const getTasks = ({ customer }) => ({
  items: [
    { label: 'Create Credit', modal: <Credit customer={ customer } /> },
    { label: 'Create Scholarship', modal: <Scholarship customer={ customer } /> }
  ]
})

const mapResourcesToPage = (props, context) => ({
  customer: `/api/admin/finance/customers/${props.params.id}`,
  credits: `/api/admin/finance/customers/${props.params.id}/credits`,
  invoices: `/api/admin/finance/customers/${props.params.id}/invoices`,
  payment_methods: `/api/admin/finance/customers/${props.params.id}/payment_methods`,
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
