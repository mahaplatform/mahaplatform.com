import ProjectToken from '../../tokens/project'
import { Page, UserToken } from 'maha-admin'
import Merge from './merge'
import Edit from './edit'
import React from 'react'
import New from './new'

const _getIntegrationColumns = (integration) => {
  if(integration === 'accpac') {
    return [
      { label: 'Main Project Code', key: 'integration.main_project_code', visible: false, collapsing: true  },
      { label: 'Project Code', key: 'integration.project_code', visible: false, collapsing: true  },
      { label: 'Program Code', key: 'integration.program_code', visible: false, collapsing: true  },
      { label: 'Source Code', key: 'integration.source_code', visible: false, collapsing: true  },
      { label: 'Match', key: 'integration.match', visible: false, collapsing: true  }
    ]
  }
  return []
}

const _getIntegrationExports = (integration) => {
  if(integration === 'accpac') {
    return [
      { label: 'Main Project Code', key: 'integration.main_project_code' },
      { label: 'Project Code', key: 'integration.project_code' },
      { label: 'Program Code', key: 'integration.program_code' },
      { label: 'Source Code', key: 'integration.source_code' },
      { label: 'Match', key: 'integration.match' }
    ]
  }
  return []
}

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/expenses/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Projects',
  collection: {
    endpoint: '/api/admin/expenses/projects',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'integration->>\'project_code\'', primary: true, format: ProjectToken },
      { label: 'Active', key: 'is_active', primary: false, format: 'check' },
      ..._getIntegrationColumns(resources.app.settings.integration)
    ],
    filters: [
      { label: 'Member', name: 'user_id', type: 'select', multiple: false, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Tax Project', name: 'tax_project_id', type: 'select', endpoint: '/api/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Active', name: 'is_active', type: 'select', options: [{ value: '1', text: 'Active' }, { value: '0', text: 'Inactive' }] }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' },
      { label: 'Active', key: 'is_active' },
      ..._getIntegrationExports(resources.app.settings.integration)
    ],
    link: (record) => `/admin/expenses/projects/${record.id}`,
    recordTasks: (record) => [
      {
        label: 'Edit Project',
        rights: ['expenses:manage_configuration'],
        show: record.is_active,
        modal: <Edit project={ record } integration={ resources.app.settings.integration } />
      }, {
        label: 'Merge Project',
        show: record.is_active,
        modal: <Merge id={ record.id } />
      }, {
        label: 'Disable Project',
        rights: ['expenses:manage_configuration'],
        show: record.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/expenses/projects/${record.id}/disable`,
          onFailure: (result) => context.flash.set('error', 'Unable to disable this project')
        }
      }, {
        label: 'Enable Project',
        rights: ['expenses:manage_configuration'],
        show: !record.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/expenses/projects/${record.id}/enable`,
          onFailure: (result) => context.flash.set('error', 'Unable to enable this project')
        }
      }
    ],
    defaultSort: { key: 'integration->>\'project_code\'', order: 'asc' },
    entity: 'project',
    icon: 'folder',
    new: New
  },
  task: {
    label: 'New Project',
    rights: ['expenses:manage_configuration'],
    icon: 'plus',
    modal: (props) => <New { ...props } integration={ resources.app.settings.integration } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
