import Details from './details'
import { Avatar, Page } from 'maha-admin'
import React from 'react'
import Edit from '../edit'

const getTabs = (user, { contact }) => ({
  header: <Avatar user={ contact } width="120" />,
  items: [
    { label: 'Details', component: <Details contact={ contact } /> }
  ]
})

const getTasks = (user, { contact }) => ({
  items: [
    { label: 'Edit Contact', modal: <Edit contact={ contact } /> }
  ]
})


const mapResourcesToPage = (props, context) => ({
  contact: `/api/admin/crm/contacts/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contact',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
