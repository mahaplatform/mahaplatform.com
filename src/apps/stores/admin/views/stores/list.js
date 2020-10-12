import StoreToken from '../../tokens/store'
import { Logo, Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Stores',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: StoreToken },
      { label: 'Program', key: 'program.title', sort: 'program'}
    ],
    criteria: {
      fields: [
        { label: 'Event', fields: [
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
    empty: {
      icon: 'building-o',
      title: 'No Stores',
      text: 'You have not yet created any stores',
      buttons: [
        { label: 'Create Store', modal: New }
      ]
    },
    endpoint: '/api/admin/stores/stores',
    entity: 'store',
    defaultSort: { key: 'title', order: 'asc' },
    onClick: (record) => context.router.history.push(`/stores/stores/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

const mapResourcesToPage = (props, context) => ({
  programs: '/api/admin/crm/programs'
})

export default Page(mapResourcesToPage, mapPropsToPage)
