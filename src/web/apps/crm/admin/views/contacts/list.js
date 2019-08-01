import ContactToken from '../../tokens/contact'
import { Page } from 'maha-admin'
import Import from './import'
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
      { label: 'Name', key: 'display_name', primary: true, format: ContactToken },
      { label: 'Email', key: 'email', primary: false },
      { label: 'Phone', key: 'phone', primary: false }
    ],
    filters: [
      { label: 'Tags', name: 'crm_taggings.tag_id', type: 'select', multiple: true, endpoint: '/api/admin/crm/tags', value: 'id', text: 'text' }
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
        modal: () => <Import />
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
