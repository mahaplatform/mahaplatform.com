import ExpenseTypeToken from '../../tokens/expense_type'
import { Page } from 'maha-admin'
import React from 'react'
import Edit from './edit'
import New from './new'

const _getIntegrationColumns = (integration) => {
  if(integration === 'accpac') {
    return [
      { label: 'Expense Code', key: 'integration.expense_code', visible: false, collapsing: true },
      { label: 'Source Code', key: 'integration.source_code', visible: false, collapsing: true }
    ]
  }
  return []
}

const _getIntegrationExports = (integration) => {
  if(integration === 'accpac') {
    return [
      { label: 'Expense Code', key: 'integration.expense_code' },
      { label: 'Source Code', key: 'integration.source_code' }
    ]
  }
  return []
}

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Expense Types',
  rights: ['finance:manage_configuration'],
  collection: {
    endpoint: '/api/admin/finance/expense_types',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', sort: 'expense_ code', primary: true, format: ExpenseTypeToken },
      { label: 'Active', key: 'is_active', primary: true, format: 'check' },
      ..._getIntegrationColumns(resources.app.settings.integration)
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' },
      { label: 'Description', key: 'description' },
      ..._getIntegrationExports(resources.app.settings.integration)
    ],
    recordTasks: (record) => [
      {
        label: 'Edit Type',
        modal: <Edit { ...record } integration={ resources.app.settings.integration } />
      }
    ],
    defaultSort: { key: 'expense_code', order: 'asc' },
    empty: {
      icon: 'tag',
      title: 'No Expense Types',
      text: 'You have not yet created any expense types',
      buttons: [
        { label: 'Create Expense Type', modal: <New integration={ resources.app.settings.integration } /> }
      ]
    },
    entity: 'expense_type'
  },
  task: {
    label: 'New Expense Type',
    icon: 'plus',
    modal:  <New integration={ resources.app.settings.integration } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
