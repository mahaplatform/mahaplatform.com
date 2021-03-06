import VendorToken from '../../tokens/vendor'
import { Page } from '@admin'
import Merge from './merge'
import Edit from './edit'
import React from 'react'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Vendors',
  rights: ['finance:manage_configuration'], 
  collection: {
    endpoint: '/api/admin/finance/vendors',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'name', primary: true, format: VendorToken },
      { label: 'Items', key: 'items_count', collapsing: true, primary: true  }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' },
      { label: 'Items', key: 'items_count' }
    ],
    onClick: (record) => context.router.history.push(`/finance/vendors/${record.id}`),
    recordTasks: (record) => [
      {
        label: 'Merge Vendor',
        modal: <Merge id={ record.id } />
      }, {
        label: 'Edit Vendor',
        modal: <Edit integration={ resources.app.settings.integration } id={ record.id } />
      }
    ],
    defaultSort: { key: 'name', order: 'asc' },
    empty: {
      icon: 'percent',
      title: 'No Vendors',
      text: 'You have not yet created any vendors',
      buttons: [
        { label: 'Create Vendor', modal: <New integration={ resources.app.settings.integration } /> }
      ]
    },
    entity: 'vendor'
  },
  task: {
    label: 'New Vendor',
    icon: 'plus',
    modal: <New integration={ resources.app.settings.integration } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
