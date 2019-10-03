import { Page } from 'maha-admin'
import New from './new'
import Edit from './edit'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Programs',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/programs',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    recordTasks: (program) => [
      {
        label: 'Edit Program',
        modal: <Edit id={ program.id } />
      }
    ],
    empty: 'You have not yet created any programs',
    entity: 'program',
    icon: 'sitemap',
    link: (record) => `/admin/crm/programs/${record.id}`,
    new: New,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Program',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
