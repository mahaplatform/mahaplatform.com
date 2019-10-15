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
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'book',
      title: 'No Topics',
      text: 'You have not yet created any topics',
      buttons: [
        { label: 'Create New Topic', modal: New }
      ]
    },
    entity: 'topic',
    onClick: (record) => context.router.history.push(`/admin/crm/topics/${record.id}`)
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Topic',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
