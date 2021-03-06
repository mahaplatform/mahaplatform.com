import Timeline from '../../../components/timeline'
import Properties from './properties'
import { Page } from '@admin'
import Channels from './channels'
import Consent from './consent'
import Details from './details'
import Header from './header'
import Edit from '../edit'
import React from 'react'

const getSidebar = (user, { contact, duplicates, fields }) => {
  if(document.body.clientWidth <= 768) return null
  return (
    <div className="contact-sidebar">
      <Header contact={ contact} />
      <div className="contact-sidebar-body">
        <Details contact={ contact } duplicates={ duplicates } fields={ fields } />
      </div>
    </div>
  )
}

const getTabs = (user, { channels, contact, duplicates, fields, programs }) => {
  const header = document.body.clientWidth <= 768 ? <Header contact={ contact} /> : null
  const items = [
    { label: 'Timeline', component: <Timeline contact={ contact } /> },
    { label: 'Consent', component: <Consent contact={ contact } programs={ programs } channels={ channels } /> },
    { label: 'Channels', component: <Channels contact={ contact } programs={ programs } channels={ channels } /> },
    { label: 'Properties', component: <Properties contact={ contact } programs={ programs } fields={ fields } /> }
  ]
  if(document.body.clientWidth <= 768) {
    items.unshift({ label: 'Details', component: <Details contact={ contact } duplicates={ duplicates } fields={ fields } /> })
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
  channels: `/api/admin/crm/contacts/${props.params.id}/consent`,
  duplicates: `/api/admin/crm/contacts/${props.params.id}/duplicates`,
  fields: '/api/admin/crm/fields',
  programs: '/api/admin/crm/programs'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contact',
  sidebar: getSidebar(props.user, resources),
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
