import Details from './details'
import { Avatar, Page } from 'maha-admin'
import React from 'react'
import Edit from '../edit'

const getTabs = (user, { contact, fields }) => ({
  header: <Avatar user={ contact } width="120" />,
  items: [
    { label: 'Details', component: <Details contact={ contact } fields={ fields } /> }
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
  title: 'Contact',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
