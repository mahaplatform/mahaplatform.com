import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Phone Numbers',
  rights: [],
  collection: {
    endpoint: '/api/admin/fax/numbers',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Number', key: 'formatted', primary: true }
    ],
    recordTasks: (program) => [
      {
        label: 'Release Number',
        request: {
          endpoint: `/api/admin/team/phone_numbers/${program.id}`,
          method: 'delete',
          onSuccess: () => {},
          onFailure: () => {}
        }
      }
    ],
    empty: 'You have not yet registered any phone numbers',
    entity: 'phone number',
    icon: 'hashtag',
    new: New,
    defaultSort: { key: 'title', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Provision Number',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
