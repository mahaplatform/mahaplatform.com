import ManagerToken from '../../tokens/manager'
import { Page } from 'maha-admin'
import React from 'react'
import Users from './users'

const mapResourcesToPage = (props, context, page) => ({
  fields: `/api/admin/sites_sites/${page.params.site_id}/fields`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Managers',
  collection: {
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'last_name', sort: 'last_name', primary: true, format: ManagerToken }
    ],
    endpoint: `/api/admin/sites/sites/${page.params.site_id}/managers`,
    empty: 'This site does not have any managers',
    entity: 'manager',
    icon: 'users',
    new: () => <Users site_id={ page.params.site_id } />,
    defaultSort: { key: 'created_at', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: 'Manage Managers', modal: () => <Users site_id={ page.params.site_id } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
