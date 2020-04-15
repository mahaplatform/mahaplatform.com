import { Page } from 'maha-admin'
import Contacts from './contacts'
import Details from './details'
import React from 'react'

const getTabs = ({ contacts, topic }) => ({
  items: [
    { label: 'Details', component: <Details topic={ topic } /> },
    { label: 'Contacts', component: <Contacts topic={ topic } contacts={ contacts } /> }
  ]
})

const getTasks = ({ topic }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  contacts: `/api/admin/crm/programs/${props.params.program_id}/topics/${props.params.id}/interests`,
  topic: `/api/admin/crm/programs/${props.params.program_id}/topics/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Topic',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
