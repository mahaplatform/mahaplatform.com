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
    table: [
      { label: 'Name', key: 'name', primary: true, format: OrganizationToken }
    ],
    endpoint: '/api/admin/crm/organizations',
    empty: 'You have not yet created any organizations',
    entity: 'organization',
    icon: 'building-o',
    link: (record) => `/admin/crm/organizations/${record.id}`,
    new: () => <New fields={ resources.fields } />,
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' }
    ],
    defaultSort: { key: 'name', order: 'asc' }
  },
  task: {
    icon: 'plus',
    rights: [],
    modal: () => <New fields={ resources.fields } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
