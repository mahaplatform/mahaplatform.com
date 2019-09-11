import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Phone Numbers',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${page.params.program_id}/numbers`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sender', key: 'name', primary: true }
    ],
    empty: 'You have not yet registered any phone numbers',
    entity: 'phone number',
    icon: 'hashtag',
    link: (record) => `/admin/crm/programs/${page.params.program_id}/numbers/${record.id}`,
    new: () => <New program_id={ page.params.program_id } />,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Provision Phone Number',
        modal: () => <New program_id={ page.params.program_id } />
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
