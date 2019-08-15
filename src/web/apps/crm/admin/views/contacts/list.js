import ContactToken from '../../tokens/contact'
import { Page } from 'maha-admin'
import ContactImport from './import'
import React from 'react'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  fields: '/api/admin/crm_contacts/fields'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contacts',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/contacts',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'display_name', sort: 'last_name', primary: true, format: ContactToken },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone', visible: false }
    ],
    criteria: [
      { label: 'Contact', fields: [
        { name: 'first name', key: 'first_name', type: 'text' },
        { name: 'last name', key: 'last_name', type: 'text' },
        { name: 'email', key: 'email', type: 'text' },
        { name: 'phone', key: 'phone', type: 'text' },
        { name: 'user', key: 'user_id', type: 'select', endpoint: '/api/admin/users', text: 'full_name', value: 'id' }
      ] }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'full_name' },
      { label: 'Email', key: 'email' }
    ],
    empty: 'You have not yet created any contacts',
    entity: 'contact',
    icon: 'user-circle',
    link: (record) => `/admin/crm/contacts/${record.id}`,
    new: () => <New fields={ resources.fields } />,
    defaultSort: { key: 'last_name', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Contact',
        modal: () => <New fields={ resources.fields } />
      }, {
        label: 'Import Contacts',
        modal: ContactImport
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
