import { Page, ProgramToken } from 'maha-admin'
import New from './new'
import Edit from './edit'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Programs',
  rights: [],
  collection: {
    endpoint: '/api/admin/team/programs',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true, format: ProgramToken }
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
    link: (record) => `/admin/team/programs/${record.id}`,
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
