import Contacts from './contacts'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ contacts, list }) => ({
  items: [
    { label: 'Details', component: <Details list={ list } /> },
    { label: 'Contacts', component: <Contacts list={ list } contacts={ contacts } /> }
  ]
})

const getTasks = ({ list }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  contacts: `/api/admin/crm/programs/${props.params.program_id}/lists/${props.params.id}/subscriptions`,
  list: `/api/admin/crm/programs/${props.params.program_id}/lists/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'List',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
