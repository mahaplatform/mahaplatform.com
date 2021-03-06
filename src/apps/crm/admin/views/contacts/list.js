import ContactImport from '../../components/contactimport'
import ContactToken from '../../tokens/contact'
import { Page } from '@admin'
import criteria from './criteria'
import Topics from './topics'
import Lists from './lists'
import React from 'react'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  programs: '/api/admin/crm/programs',
  fields: '/api/admin/crm/fields'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contacts',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/contacts',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'display_name', sort: 'last_name', primary: true, format: ContactToken },
      { label: 'Email', key: 'email', sort: 'primary_email' },
      { label: 'Phone', key: 'phone', sort: 'primary_phone', format: 'phone' },
      { label: 'Organization', key: 'organization', visible: false },
      { label: 'Birthday', key: 'birthday', visible: false, format: 'date' },
      { label: 'Spouse', key: 'spouse', visible: false }
    ],
    criteria: {
      fields: criteria(resources.fields),
      system: [
        { id: 0, title: 'Unknown Contacts', config: {
          criteria: [
            { code: 'abc', data: null, field: null, operator: '$and', parent: null, value: null },
            { code: 'def', data: null, field: 'first_name', operator: '$nl', parent: 'abc', value: null },
            { code: 'ghi', data: null, field: 'last_name', operator: '$nl', parent: 'abc', value: null }
          ]
        } },
        { id: 1, title: 'Potential Duplicates', config: {
          criteria: [
            { code: 'abc', data: null, field: null, operator: '$and', parent: null, value: null },
            { code: 'def', data: null, field: 'duplicate_id', operator: '$nnl', parent: 'abc', value: null }
          ]
        } }
      ]
    },
    defaultSort: { key: 'last_name', order: 'asc' },
    export: [
      { label: 'ID', key: 'id' },
      { label: 'First Name', key: 'first_name' },
      { label: 'Last Name', key: 'last_name' },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone' },
      { label: 'Address - Full Address', key: 'address.description' },
      { label: 'Address - Street 1', key: 'address.street_1' },
      { label: 'Address - Street 2', key: 'address.street_2' },
      { label: 'Address - City', key: 'address.city' },
      { label: 'Address - State/Province', key: 'address.state_province' },
      { label: 'Address - Postal Code', key: 'address.postal_code' },
      { label: 'Address - Latitude', key: 'address.latitude' },
      { label: 'Address - Longitude', key: 'address.longitude' },
      { label: 'Organization', key: 'organization' },
      { label: 'Job/Title', key: 'position' },
      { label: 'Birthday', key: 'birthday' },
      { label: 'Spouse', key: 'spouse' },
      ...resources.fields.reduce((fields, program) => [
        ...fields,
        ...program.fields.map(field => ({
          label: `${program.title} - ${field.name.value}`,
          key: `values.${field.code}`
        }))
      ], [])
    ],
    empty: {
      icon: 'user-circle',
      title: 'No Contacts',
      text: 'You have not yet created any contacts',
      buttons: [
        { label: 'Create Contact', modal: <New fields={ resources.fields } /> },
        { label: 'Import Contacts', modal: <ContactImport programs={ resources.programs } /> }
      ]
    },
    entity: 'contact',
    onClick: (record) => context.router.history.push(`/crm/contacts/${record.id}`),
    selectable: true,
    buttons: (selected, onSuccess) => [{
      label: 'Add to Lists',
      color: 'red',
      modal: <Lists filter={ selected.filter } />
    },{
      label: 'Add to Topics',
      color: 'red',
      modal: <Topics filter={ selected.filter } />
    }]
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Contact',
        modal: <New fields={ resources.fields } />
      }, {
        label: 'Import Contacts',
        modal: <ContactImport programs={ resources.programs } />
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
