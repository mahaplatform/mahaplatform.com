import FormToken from '../../tokens/form'
import { Page, Logo } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Forms',
  rights: ['crm:manage_forms'],
  collection: {
    endpoint: '/api/admin/crm/forms',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: FormToken },
      { label: 'Program', key: 'program.title', sort: 'program' },
      { label: 'Respondents', key: 'respondents_count', collapsing: true, align: 'right' },
      { label: 'Responses', key: 'responses_count', collapsing: true, align: 'right' },
      { label: 'Revenue', key: 'revenue', collapsing: true, align: 'right', format: 'currency' }
    ],
    criteria: {
      fields: [
        { label: 'Form', fields: [
          { name: 'Program', key: 'program_id', type: 'select', endpoint: '/api/admin/crm/programs', text: 'title', value: 'id' }
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
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'check-square-o',
      title: 'No Forms',
      text: 'You have not yet created any forms',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create New Form', modal: New }
      ] : null
    },
    entity: 'form',
    onClick: (record) => context.router.history.push(`/crm/forms/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    label: 'Create Form',
    icon: 'plus',
    modal: New
  } : null
})

const mapResourcesToPage = (props, context) => ({
  programs: '/api/admin/crm/programs'
})

export default Page(mapResourcesToPage, mapPropsToPage)
