import StatusToken from '../../tokens/status'
import { Page } from 'maha-admin'
import New from './new'
import React from 'react'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Bank Accounts',
  rights: ['finance:manage_banks'],
  collection: {
    endpoint: '/api/admin/finance/banks',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: StatusToken  }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/finance/banks/${record.id}`),
    empty: {
      icon: 'university',
      title: 'No Bank Accounts',
      text: 'You have not yet added any bank accounts',
      buttons: [
        { label: 'Add Bank Account', modal: <New integration={ resources.app.settings.integration } /> }
      ]
    },
    entity: 'invoice'
  },
  task: {
    label: 'Add Bank Account',
    icon: 'plus',
    modal: <New integration={ resources.app.settings.integration } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
