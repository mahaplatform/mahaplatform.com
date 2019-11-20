import { Page } from 'maha-admin'
import React from 'react'
import Edit from './edit'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Coupons',
  collection: {
    endpoint: '/api/admin/finance/coupons',
    table: [
      { label: 'ID', key: 'id', primary: true, collapsing: true },
      { label: 'Code', key: 'code', sort: 'code', primary: true },
      { label: 'Active', key: 'is_active', primary: true, format: 'check' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'dollar',
      title: 'No Coupons',
      text: 'You have not yet created any coupons',
      buttons: [
        { label: 'Create Coupon', modal: New }
      ]

    },
    entity: 'coupon',
    recordTasks: (record) => [
      {
        label: 'Edit Coupon',
        modal: <Edit { ...record } />
      }
    ]
  },
  task: {
    label: 'New Coupon',
    icon: 'plus',
    modal:  New
  }
})

export default Page(null, mapPropsToPage)
