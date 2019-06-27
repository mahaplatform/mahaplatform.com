import { Page } from 'maha-admin'
import React from 'react'
import Edit from './edit'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/expenses/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Accounts',
  collection: {
    endpoint: '/api/admin/expenses/accounts',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'name', primary: true }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' }
    ],
    recordTasks: (record) => [
      {
        label: 'Edit Account',
        modal: <Edit { ...record } integration={ resources.app.settings.integration } />
      }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'account',
    icon: 'credit-card',
    new: (props) => <New { ...props } integration={ resources.app.settings.integration } />
  },
  task: {
    label: 'New Account',
    icon: 'plus',
    modal: (props) => <New { ...props } integration={ resources.app.settings.integration } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
