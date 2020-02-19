import ImportToken from '../../../../maha/admin/tokens/import'
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
        { name: 'First Name', key: 'first_name', type: 'text' },
        { name: 'Last Name', key: 'last_name', type: 'text' },
        { name: 'Email', key: 'email', type: 'text' },
        { name: 'Phone', key: 'phone', type: 'text' },
        { name: 'Street', key: 'street_1', type: 'text' },
        { name: 'City', key: 'city', type: 'text' },
        { name: 'State/Province', key: 'state_province', type: 'text' },
        { name: 'Postal Code', key: 'postal_code', type: 'text' },
        { name: 'Birthday', key: 'birthday', type: 'text' },
        { name: 'Spouse', key: 'spouse', type: 'text' }
      ] },
      { label: 'Classifications', fields: [
        { name: 'Interest', key: 'topic_id', type: 'select', endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$in', text: 'is interested in' },
          { value: '$nin', text: 'is not interested in' }
        ] },
        { name: 'List', key: 'list_id', type: 'select', endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$in', text: 'is subscribed to' },
          { value: '$nin', text: 'is not subscribed to' }
        ] },
        { name: 'Organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', subject: false, text: 'name', value: 'id', comparisons: [
          { value: '$in', text: 'belongs to' },
          { value: '$nin', text: 'does not belong to' }
        ] },
        { name: 'Tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id', subject: false, comparisons: [
          { value: '$in', text: 'is tagged with' },
          { value: '$nin', text: 'id not tagged with' }
        ] }
      ] },
      { label: 'Activities', fields: [
        { name: 'Form', key: 'form_id', type: 'select', endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$eq', text: 'filled out' },
          { value: '$neq', text: 'did not fill out' }
        ] },
        { name: 'Import', key: 'import_id', type: 'select', endpoint: '/api/admin/crm/imports', text: 'description', value: 'id', subject: false, format: ImportToken, comparisons: [
          { value: '$eq', text: 'was included in import' },
          { value: '$neq', text: 'was not included in import' }
        ] }

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
