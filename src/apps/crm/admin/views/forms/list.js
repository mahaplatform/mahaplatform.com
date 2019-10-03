import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Forms',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${page.params.program_id}/forms`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: 'You have not yet created any forms',
    entity: 'form',
    icon: 'check-square-o',
    link: (record) => `/admin/crm/programs/${page.params.program_id}/forms/${record.id}`,
    new: New,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Form',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
