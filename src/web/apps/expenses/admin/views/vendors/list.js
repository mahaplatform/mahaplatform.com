import VendorToken from '../../tokens/vendor_token'
import { Page } from 'maha-admin'
import Merge from './merge'
import Edit from './edit'
import React from 'react'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/expenses/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Vendors',
  collection: {
    endpoint: '/api/admin/expenses/vendors',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'name', primary: true, format: VendorToken },
      { label: 'Items', key: 'items_count', primary: true, collapsing: true  }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' },
      { label: 'Items', key: 'items_count' }
    ],
    link: (record) => `/admin/expenses/reports?$filter[vendor_id][$in][0]=${record.id}`,
    recordTasks: [
      {
        label: 'Merge Vendor',
        modal: (vendor) => <Merge id={ vendor.id } />
      }, {
        label: 'Edit Vendor',
        modal: (vendor) => <Edit integration={ resources.app.settings.integration } id={ vendor.id } />
      }
    ],
    defaultSort: { key: 'name', order: 'asc' },
    entity: 'vendor',
    icon: 'shop',
    new: () => <New integration={ resources.app.settings.integration } />
  },
  task: {
    label: 'New Vendor',
    icon: 'plus',
    modal: () => <New integration={ resources.app.settings.integration } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
