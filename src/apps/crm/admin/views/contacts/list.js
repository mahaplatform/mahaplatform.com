import ContactImport from '../../components/contactimport'
import ContactToken from '../../tokens/contact'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  fields: '/api/admin/crm/fields'
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
      { label: 'Phone', key: 'phone', format: 'phone' },
      { label: 'Organization', key: 'organization', visible: false },
      { label: 'Birthday', key: 'birthday', visible: false },
      { label: 'Spouse', key: 'spouse', visible: false }
    ],
    criteria: [
      { label: 'Contact', fields: [
        { name: 'first name', key: 'first_name', type: 'text' },
        { name: 'last name', key: 'last_name', type: 'text' },
        { name: 'email', key: 'email', type: 'text' },
        { name: 'phone', key: 'phone', type: 'text' },
        { name: 'street_1', key: 'street_1', type: 'text' },
        { name: 'city', key: 'city', type: 'text' },
        { name: 'state/province', key: 'state_province', type: 'text' },
        { name: 'postal code', key: 'postal_code', type: 'text' },
        { name: 'birthday', key: 'birthday', type: 'text' },
        { name: 'spouse', key: 'spouse', type: 'text' }
      ] },
      { label: 'Classifications', fields: [
        { name: 'interests', key: 'topic_id', type: 'select', endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', comparisons: [
          { value: '$eq', text: 'is interested in' },
          { value: '$neq', text: 'is not interested in' },
          { value: '$in', text: 'is interested in one of' },
          { value: '$nin', text: 'is not interested in one of' }
        ] },
        { name: 'lists', key: 'list_id', type: 'select', endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', comparisons: [
          { value: '$eq', text: 'belongs to' },
          { value: '$neq', text: 'does not belong to' },
          { value: '$in', text: 'belongs to one of' },
          { value: '$nin', text: 'does not belongs to one of' }
        ] },
        { name: 'organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', text: 'name', value: 'id' },
        { name: 'tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id' }
      ] }
    ],
    defaultSort: { key: 'last_name', order: 'asc' },
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'full_name' },
      { label: 'Email', key: 'email' }
    ],
    empty: {
      icon: 'user-circle',
      title: 'No Contacts',
      text: 'You have not yet created any contacts',
      buttons: [
        { label: 'Create Contact', modal: <New fields={ resources.fields } /> },
        { label: 'Import Contacts', modal: ContactImport }
      ]
    },
    entity: 'contact',
    onClick: (record) => context.router.history.push(`/admin/crm/contacts/${record.id}`),
    selectable: true,
    buttons: ({ selected }) => selected.length > 0 ? [{
      color: 'red',
      text: 'Add to List'
    },{
      color: 'red',
      text: 'Add to Interest'
    }] : null
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Contact',
        modal: <New fields={ resources.fields } />
      }, {
        label: 'Import Contacts',
        modal: ContactImport
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
