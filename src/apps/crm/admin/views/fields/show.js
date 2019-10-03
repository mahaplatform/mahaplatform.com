import { Fields, Page } from 'maha-admin'
import React from 'react'

const getTabs = () => ({
  items: [
    { label: 'Contacts', component: <Fields parent_type="crm_contacts" /> },
    { label: 'Organizations', component: <Fields parent_type="crm_organizations" /> }
  ]
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Custom Fields',
  tabs: getTabs()
})

export default Page(null, mapPropsToPage)
