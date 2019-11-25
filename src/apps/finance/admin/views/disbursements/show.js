import { Page } from 'maha-admin'
import Payments from './payments'
import Details from './details'
import React from 'react'

const getTabs = ({ disbursement, payments }) => ({
  items: [
    { label: 'Details', component: <Details disbursement={ disbursement } /> },
    { label: 'Payments', component: <Payments disbursement={ disbursement } payments={ payments } /> }
  ]
})

const mapResourcesToPage = (props, context) => ({
  disbursement: `/api/admin/finance/disbursements/${props.params.id}`,
  payments: `/api/admin/finance/disbursements/${props.params.id}/payments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Disbursement',
  tabs: getTabs(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
