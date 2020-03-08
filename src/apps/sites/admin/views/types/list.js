import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Types',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
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
    defaultSort: { key: 'title', order: 'asc' },
    onClick: (record) => context.router.history.push(`/admin/sites/sites/${page.params.site_id}/types/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: <New site_id={ page.params.site_id } />
  }
})

export default Page(null, mapPropsToPage)
