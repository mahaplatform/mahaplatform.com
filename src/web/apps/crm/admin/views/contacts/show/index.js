import { Page } from 'maha-admin'
import Details from './details'
import Header from './header'
import Edit from '../edit'
import React from 'react'

const getTabs = (user, { contact, fields }) => ({
  items: [
    // { label: 'Details', component: <Details contact={ contact } fields={ fields } /> },
    { label: 'One', component: <div>Foo</div> },
    { label: 'Two', component: <div>Bar</div> },
    { label: 'Three', component: <div>Baz</div> }
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
  sidebar: (
    <div>
      <Header contact={ resources.contact} />
      <Details contact={ resources.contact } fields={ resources.fields } />
    </div>
  ),
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
