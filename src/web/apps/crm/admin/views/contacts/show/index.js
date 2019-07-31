import { Page } from 'maha-admin'
import Details from './details'
import Header from './header'
import Edit from '../edit'
import React from 'react'

const getTabs = (user, { contact, fields }) => ({
  header: <Header contact={ contact} />,
  items: [
    { label: 'Details', component: <Details contact={ contact } fields={ fields } /> },
    { label: 'Activities', component: <Details contact={ contact } fields={ fields } /> }
  ]
})

const getTasks = (user, { contact, fields }) => ({
  items: [
    { label: 'Edit Contact', modal: <Edit contact={ contact } fields={ fields } /> }
  ]
})


const mapResourcesToPage = (props, context) => ({
  contact: `/api/admin/crm/contacts/${props.params.id}`,
  fields: '/api/admin/crm_contacts/fields'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.contact.display_name,
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
