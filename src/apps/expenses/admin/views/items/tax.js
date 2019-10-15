import CompactProjectToken from '../../tokens/project/compact'
import CompactTypeToken from '../../tokens/type/compact'
import StatusToken from '../../tokens/status_token'
import ProjectToken from '../../tokens/project'
import { Page, UserToken } from 'maha-admin'
import TypeToken from '../../tokens/type'
import Status from '../../tokens/status'
import React from 'react'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/expenses/settings'
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Tax',
  collection: {
    endpoint: '/api/admin/expenses/items/tax',
    table: [
      { label: 'ID', key: 'item_id', visible: false, collapsing: true },
      { label: null, key: 'type', collapsing: true, format: CompactTypeToken },
      { label: 'Date', key: 'date', format: 'date', collapsing: true },
      { label: 'User', key: 'user.full_name', sort: 'maha_users.last_name', primary: true },
      { label: 'Project', key: 'project.title', sort: 'expenses_projects.title', format: CompactProjectToken },
      { label: 'Tax Account', key: 'tax_project.title', sort: 'expenses_projects.title', format: (item) => <CompactProjectToken project={item.tax_project} /> },
      { label: 'Description', key: 'description' },
      { label: 'Tax', key: 'tax', primary: true, format: 'currency', collapsing: true },
      { label: 'Status', key: 'status', primary: true, sort: 'expenses_statuses.text', format: Status, collapsing: true }
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [ { value: 'expense', text: 'Expense' }, { value: 'check', text: 'Check Request' } ], format: TypeToken },
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Tax Account', name: 'tax_project_id', type: 'select', endpoint: '/api/admin/expenses/projects/tax', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
      { label: 'Status', name: 'status_id', type: 'select', multiple: true, endpoint: '/api/admin/expenses/statuses', value: 'id', text: 'name', sort: 'id', format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/expenses/${record.type}s/${record.item_id}`)

  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
