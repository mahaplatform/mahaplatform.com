import Timeline from '../../../components/timeline'
import Preferences from './preferences'
import { Page } from 'maha-admin'
import Details from './details'
import Header from './header'
import Edit from '../edit'
import React from 'react'

const getSidebar = (user, { contact, fields }) => {
  if(document.body.clientWidth <= 768) return null
  return (
    <div>
      <Header contact={ contact} />
      <Details contact={ contact } fields={ fields } />
    </div>
  )
}

const getTabs = (user, { contact, fields, preferences }) => {
  const header = document.body.clientWidth <= 768 ? <Header contact={ contact} /> : null
  const items = [
    { label: 'Activities', component: <Timeline contact={ contact } /> },
    { label: 'Preferences', component: <Preferences contact={ contact } preferences={ preferences } /> }
  ]
  if(document.body.clientWidth <= 768) {
    items.unshift({ label: 'Details', component: <Details contact={ contact } fields={ fields } /> })
  }
  return { header, items }
}

const getTasks = (user, { contact, fields }) => ({
  items: [
    { label: 'Edit Contact', modal: <Edit contact={ contact } fields={ fields } /> }
  ]
})

const mapResourcesToPage = (props, context) => ({
  contact: `/api/admin/crm/contacts/${props.params.id}`,
  preferences: `/api/admin/crm/contacts/${props.params.id}/preferences`,
  fields: '/api/admin/crm_contacts/fields'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contact',
  sidebar: getSidebar(props.user, resources),
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
