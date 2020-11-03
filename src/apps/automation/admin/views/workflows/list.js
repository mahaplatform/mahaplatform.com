import WorkflowToken from '../../tokens/workflow'
import { Logo, Page } from 'maha-admin'
import NewWorkflow from './new'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflows',
  rights: ['crm:manage_workflows'],
  collection: {
    endpoint: '/api/admin/crm/workflows',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'display_name', primary: true, format: WorkflowToken },
      { label: 'Program', key: 'program.title', sort: 'program', primary: true },
      { label: 'Enrolled', key: 'enrolled_count', collapsing: true, align: 'right' },
      { label: 'Active', key: 'active_count', collapsing: true, align: 'right' },
      { label: 'Lost', key: 'lost_count', collapsing: true, align: 'right' },
      { label: 'Converted', key: 'converted_count', collapsing: true, align: 'right' },
      { label: 'Completed', key: 'completed_count', collapsing: true, align: 'right' }
    ],
    criteria: {
      fields: [
        { label: 'Workflow', fields: [
          { name: 'Program', key: 'program_id', type: 'select', endpoint: '/api/admin/crm/programs', text: 'title', value: 'id' },
          { name: 'Type', key: 'trigger_type', type: 'select', options: ['manual','response','event'], text: 'text', value: 'value' }
        ] }
      ],
      system: resources.programs.map((program, index) => (
        { id: index, title: program.title, token: <Logo team={ program } width="24" />, config: {
          criteria: [
            { code: 'abc', data: null, field: null, operator: '$and', parent: null, value: null },
            { code: 'def', data: null, field: 'program_id', operator: '$eq', parent: 'abc', value: program.id }
          ]
        } }
      ))
    },
    empty: {
      icon: 'cogs',
      title: 'No Workflow',
      text: 'You have not yet created any workflows',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create New Campaign', modal: NewWorkflow }
      ] : null
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'workflow',
    onClick: (record) => context.router.history.push(`/crm/workflows/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    icon: 'plus',
    modal: NewWorkflow
  } : null
})

const mapResourcesToPage = (props, context) => ({
  programs: '/api/admin/crm/programs'
})

export default Page(mapResourcesToPage, mapPropsToPage)
