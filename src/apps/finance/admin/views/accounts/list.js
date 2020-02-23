import { Page } from 'maha-admin'
import React from 'react'
import Edit from './edit'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Accounts',
  collection: {
    endpoint: '/api/admin/finance/accounts',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
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
    empty: {
      icon: 'credit-card',
      title: 'No Accounts',
      text: 'You have not yet created any accounts',
      buttons: [
        { label: 'Create Account', modal: <New integration={ resources.app.settings.integration } /> }
      ]
    },
    entity: 'account'
  },
  task: {
    label: 'New Account',
    icon: 'plus',
    modal: <New integration={ resources.app.settings.integration } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
