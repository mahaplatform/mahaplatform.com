import Numbers from '../../components/numbers'
import { Page } from 'maha-admin'
import React from 'react'

const NumberToken = ({ number, locality, region }) => (
  <div className="token">
    <strong>{ number }</strong><br />
    { locality }, { region }
  </div>
)

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Phone Numbers',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/programs/${page.params.program_id}/numbers`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Number', key: 'number', primary: true, format: NumberToken }
    ],
    recordTasks: (program) => [
      {
        label: 'Release Number',
        request: {
          endpoint: `/api/admin/crm/programs/${page.params.program_id}/numbers/${program.id}`,
          method: 'delete',
          onSuccess: () => {},
          onFailure: () => {}
        }
      }
    ],
    empty: 'You have not yet registered any phone numbers',
    entity: 'phone number',
    icon: 'hashtag',
    new: () => <Numbers program_id={ page.params.program_id } />,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Provision Phone Number',
        modal: () => <Numbers program_id={ page.params.program_id } />
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
