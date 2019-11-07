import StatusToken from '../../tokens/status'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Forms',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/forms',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: StatusToken }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'check-square-o',
      title: 'No Forms',
      text: 'You have not yet created any forms',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create New Form', modal: New }
      ] : null
    },
    entity: 'form',
    onClick: (record) => context.router.history.push(`/admin/crm/forms/${record.id}`)
  },
  tasks: resources.programs.length > 0 ? {
    label: 'Create Form',
    modal: <New program_id={page.params.program_id} />
  } : null
})

const mapResourcesToPage = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      access_type: {
        $in: ['manage','edit']
      }
    }
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
