import OrganizationToken from '../../tokens/organization'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapResourcesToPage = (props, context) => ({
  fields: '/api/admin/crm_organizations/fields'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Organizations',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/organizations',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'name', primary: true, format: OrganizationToken }
    ],
    filters: [
      { label: 'Tags', name: 'crm_taggings.tag_id', type: 'select', multiple: true, endpoint: '/api/admin/crm/tags', value: 'id', text: 'text' }
    ],
    defaultSort: { key: 'name', order: 'asc' },
    empty: {
      icon: 'building-o',
      title: 'No Organizations',
      text: 'You have not yet created any organizations',
      buttons: [
        { label: 'Create New Organization', modal: <New fields={ resources.fields } /> }
      ]
    },
    entity: 'organization',
    onClick: (record) => context.router.history.push(`/admin/crm/organizations/${record.id}`),
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' }
    ]
  },
  task: {
    icon: 'plus',
    rights: [],
    modal: <New fields={ resources.fields } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
