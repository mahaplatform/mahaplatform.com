import { Page } from 'maha-admin'
import Edit from './edit'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Rates',
  collection: {
    endpoint: '/api/admin/expenses/rates',
    table: [
      { label: 'Year', key: 'year', primary: true},
      { label: 'Value', key: 'value', primary: true }
    ],
    defaultSort: { key: 'year', order: 'asc' },
    entity: 'rate',
    icon: 'percent',
    new: New,
    recordTasks: [
      {
        label: 'Edit Rate',
        modal: (rate) => <Edit id={ rate.id } />
      }
    ]
  },
  task: {
    label: 'New Rate',
    rights: ['expenses:manage_configuration'],
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
