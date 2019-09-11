import TemplateToken from '../../tokens/template'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Templates',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${page.params.program_id}/templates`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    empty: 'You have not yet created any templates',
    entity: 'template',
    icon: 'file-o',
    link: (record) => `/admin/crm/programs/${page.params.program_id}/templates/${record.id}`,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      { component: <TemplateToken value="email" /> },
      { component: <TemplateToken value="webpage" /> }
    ]
  }
})

export default Page(null, mapPropsToPage)
