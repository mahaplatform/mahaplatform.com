import { Page } from 'maha-admin'
import Edit from './edit'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Rates',
  collection: {
    endpoint: '/api/admin/finance/rates',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Year', key: 'year', primary: true},
      { label: 'Value', key: 'value', primary: true }
    ],
    defaultSort: { key: 'year', order: 'asc' },
    empty: {
      icon: 'percent',
      title: 'No Rates',
      text: 'You have not yet created any rates',
      buttons: [
        { label: 'Create Rate', modal: New }
      ]
    },
    entity: 'rate',
    recordTasks: (record) => [
      {
        label: 'Edit Rate',
        modal: <Edit id={ record.id } />
      }
    ]
  },
  task: {
    label: 'New Rate',
    rights: ['finance:manage_configuration'],
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
