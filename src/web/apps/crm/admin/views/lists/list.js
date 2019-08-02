import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contacts',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/lists',
    table: [
      { label: 'Name', key: 'name', primary: true }
    ],
    empty: 'You have not yet created any lists',
    entity: 'list',
    icon: 'users',
    link: (record) => `/admin/crm/lists/${record.id}`,
    new: () => <New />,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add List',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
