import ProjectToken from '../../tokens/project'
import { Page, UserToken } from 'maha-admin'
import Merge from './merge'
import Edit from './edit'
import React from 'react'
import New from './new'

const _getIntegrationColumns = (integration) => {
  if(integration === 'accpac') {
    return [
      { label: 'Main Project Code', key: 'integration.main_project_code', collapsing: true, visible: false  },
      { label: 'Project Code', key: 'integration.project_code', collapsing: true, visible: false  },
      { label: 'Program Code', key: 'integration.program_code', collapsing: true, visible: false  },
      { label: 'Source Code', key: 'integration.source_code', collapsing: true, visible: false },
      { label: 'Match', key: 'integration.match', collapsing: true, visible: false  }
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
  app: '/api/admin/apps/finance/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Projects',
  collection: {
    endpoint: '/api/admin/finance/projects',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'project_code', sort: 'project_code', primary: true, format: ProjectToken },
      { label: 'Active', key: 'is_active', collapsing: true, primary: false, format: 'check' },
      ..._getIntegrationColumns(resources.app.settings.integration)
    ],
    filters: [
      { label: 'Member', name: 'user_id', type: 'select', multiple: false, endpoint: '/api/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'Type', name: 'type', type: 'select', options: [{value:'basic',text:'Basic Project'},{value:'tax',text:'Tax Account'}] },
      { label: 'Tax Account', name: 'tax_project_id', type: 'select', endpoint: '/api/admin/finance/projects/tax', value: 'id', text: 'title', format: ProjectToken },
      { label: 'Active', name: 'is_active', type: 'select', options: [{ value: '1', text: 'Active' }, { value: '0', text: 'Inactive' }] }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' },
      { label: 'Active', key: 'is_active' },
      ..._getIntegrationExports(resources.app.settings.integration)
    ],
    onClick: (record) => context.router.history.push(`/admin/finance/projects/${record.id}`),
    recordTasks: (record) => [
      {
        label: 'Edit Project',
        rights: ['finance:manage_configuration'],
        show: record.is_active,
        modal: <Edit project={ record } integration={ resources.app.settings.integration } />
      }, {
        label: 'Merge Project',
        show: record.is_active,
        modal: <Merge id={ record.id } />
      }, {
        label: 'Disable Project',
        rights: ['finance:manage_configuration'],
        show: record.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/finance/projects/${record.id}/disable`,
          onFailure: (result) => context.flash.set('error', 'Unable to disable this project')
        }
      }, {
        label: 'Enable Project',
        rights: ['finance:manage_configuration'],
        show: !record.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/finance/projects/${record.id}/enable`,
          onFailure: (result) => context.flash.set('error', 'Unable to enable this project')
        }
      }
    ],
    defaultSort: { key: 'project_code', order: 'asc' },
    empty: {
      icon: 'folder',
      title: 'No Projects',
      text: 'You have not yet created any projects',
      buttons: [
        { label: 'Create Project', modal: <New integration={ resources.app.settings.integration } /> }
      ]
    },
    entity: 'project'
  },
  task: {
    label: 'New Project',
    rights: ['finance:manage_configuration'],
    icon: 'plus',
    modal: <New integration={ resources.app.settings.integration } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
