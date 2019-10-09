import SenderToken from '../../tokens/sender'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Senders',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/senders',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sender', key: 'name', primary: true, format: SenderToken },
      { label: 'Program', key: 'program.title', primary: true }
    ],
    empty: 'You have not yet registered any senders',
    entity: 'sender',
    icon: 'paper-plane-o',
    link: (record) => `/api/admin/crm/senders/${record.id}`,
    new: () => <New program_id={ page.params.program_id } />,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Create Sender',
        modal: () => <New program_id={ page.params.program_id } />
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
