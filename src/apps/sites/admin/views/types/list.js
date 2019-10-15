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
    empty: {
      icon: 'tag',
      title: 'No Types',
      text: 'You have not yet created any types for this site',
      buttons: [
        { label: 'Create Type', modal: <New site_id={ page.params.site_id } /> }
      ]
    },
    entity: 'type',
    link: (record) => `/admin/sites/sites/${page.params.site_id}/types/${record.id}`,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    modal: <New site_id={ page.params.site_id } />
  }
})

export default Page(null, mapPropsToPage)
