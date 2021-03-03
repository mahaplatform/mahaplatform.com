import StatusToken from '@apps/finance/admin/tokens/status_token'
import Export from '@apps/finance/admin/components/export'
import Status from '@apps/finance/admin/tokens/status'
import { Page } from '@admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Invoices',
  rights: ['finance:manage_revenue'],
  collection: {
    endpoint: '/api/admin/finance/invoices',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Code', key: 'code', collapsing: true, primary: true },
      { label: 'Customer', key: 'customer.display_name', sort: 'customer', primary: true },
      { label: 'Program', key: 'program.title', sort: 'program', primary: true },
      { label: 'Date', key: 'date', collapsing: true, primary: true, format: 'date' },
      { label: 'Total', key: 'total', collapsing: true, primary: true, format: 'currency'  },
      { label: 'Status', key: 'status', collapsing: true, primary: true, format: Status  }
    ],
    filters: [
      { label: 'Program', name: 'program_id', type: 'select', multiple: true, endpoint: '/api/admin/crm/programs', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Customer', name: 'customer_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/customers', value: 'id', text: 'display_name', sort: { key: 'last_name', order: 'asc' } },
      { label: 'Project', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Form', name: 'form_id', type: 'select', multiple: true, endpoint: '/api/admin/forms/forms', value: 'id', text: 'title', sort: { key: 'created_at', order: 'desc' } },
      { label: 'Event', name: 'event_id', type: 'select', multiple: true, endpoint: '/api/admin/events/events', value: 'id', text: 'title', sort: { key: 'created_at', order: 'desc' } },
      { label: 'Store', name: 'store_id', type: 'select', multiple: true, endpoint: '/api/admin/stores/stores', value: 'id', text: 'title', sort: { key: 'created_at', order: 'desc' } },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
      { label: 'Status', name: 'status', type: 'select', multiple: true, options: ['paid','unpaid','voided'], padded: true, format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/finance/invoices/${record.id}`),
    empty: {
      icon: 'dollar',
      title: 'No Invoice',
      text: 'You have not yet created any invoices',
      buttons: [
        { label: 'Create Invoice', modal: New }
      ]
    },
    entity: 'invoice',
    selectable: true,
    buttons: (selected, onSuccess) => [
      {
        label: 'Export Invoices',
        color: 'red',
        modal: <Export filter={ selected.filter } onSuccess={ onSuccess } />
      }
    ]
  },
  task: {
    label: 'New Invoice',
    icon: 'plus',
    modal:  New
  }
})

export default Page(null, mapPropsToPage)
