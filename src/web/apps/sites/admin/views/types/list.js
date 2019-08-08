import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Types',
  collection: {
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    endpoint: `/api/admin/sites/sites/${page.params.site_id}/types`,
    empty: 'You have not yet created any types for this site',
    entity: 'type',
    icon: 'tag',
    link: (record) => `/admin/sites/sites/${page.params.site_id}/types/${record.id}`,
    new: () => <New site_id={ page.params.site_id } />,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: 'Add Type', modal: () => <New site_id={ page.params.site_id } /> }
    ]
  }
})

export default Page(null, mapPropsToPage)
