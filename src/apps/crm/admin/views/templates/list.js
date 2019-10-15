import TemplateToken from '../../tokens/template'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Templates',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/templates',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'file-o',
      title: 'No Templates',
      text: 'You have not yet created any templates',
      buttons: [
        { label: 'Create New Template', modal: New }
      ]
    },
    entity: 'template',
    link: (record) => `/admin/crm/templates/${record.id}`
  },
  tasks: {
    icon: 'plus',
    items: [
      { component: <TemplateToken value="document" />, modal: () => <New type="document" /> },
      { component: <TemplateToken value="email" />, modal: () => <New type="email" /> },
      { component: <TemplateToken value="webpage" />, modal: () => <New type="email" />  }
    ]
  }
})

export default Page(null, mapPropsToPage)
