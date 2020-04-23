import ContactImport from '../../components/contactimport'
import ContactToken from '../../tokens/contact'
import Interests from './interests'
import { Page } from 'maha-admin'
import criteria from './criteria'
import Lists from './lists'
import Tags from './tags'
import React from 'react'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      access_type: {
        $in: ['manage','edit']
      }
    }
  },
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
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone', format: 'phone' },
      { label: 'Organization', key: 'organization', visible: false },
      { label: 'Birthday', key: 'birthday', visible: false },
      { label: 'Spouse', key: 'spouse', visible: false }
    ],
    criteria,
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
        { label: 'Import Contacts', modal: <ContactImport programs={ resources.programs } /> }
      ]
    },
    entity: 'contact',
    onClick: (record) => context.router.history.push(`/admin/crm/contacts/${record.id}`),
    selectable: true,
    buttons: (selected, onSuccess) => [{
      label: 'Tag Contacts',
      color: 'red',
      modal: <Tags filter={ selected.filter } />
    },{
      label: 'Add Consent',
      color: 'red',
      modal: <Tags filter={ selected.filter } />
    },{
      label: 'Add to List',
      color: 'red',
      modal: <Lists filter={ selected.filter } />
    },{
      label: 'Add to Interest',
      color: 'red',
      modal: <Interests filter={ selected.filter } />
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
