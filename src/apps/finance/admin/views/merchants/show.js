import { Page } from 'maha-admin'
import Details from './details'
import Sales from './sales'
import React from 'react'

const getTabs = ({ merchant }) => ({
  items: [
    { label: 'Details', component: <Details merchant={ merchant }/> },
    { label: 'Sales', component: <Sales merchant={ merchant }/> }
  ]
})

const getTasks = ({ invoice }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  merchant: `/api/admin/finance/merchants/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Merchant Account',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
