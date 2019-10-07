import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Topics',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/topics',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', primary: true }
    ],
    empty: 'You have not yet created any topics',
    entity: 'topic',
    icon: 'book',
    link: (record) => `/admin/crm/topics/${record.id}`,
    new: () => <New program_id={ page.params.program_id } />,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Topic',
        modal: () => <New program_id={ page.params.program_id } />
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
