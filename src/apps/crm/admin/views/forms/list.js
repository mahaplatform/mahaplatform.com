import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Forms',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/forms',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'check-square-o',
      title: 'No Forms',
      text: 'You have not yet created any forms',
      buttons: [
        { label: 'Create New Form', modal: New }
      ]
    },
    entity: 'form',
    link: (record) => `/admin/crm/forms/${record.id}`
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Form',
        modal: <New program_id={page.params.program_id} />
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
