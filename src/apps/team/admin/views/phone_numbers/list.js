import NumberToken from '../../tokens/number'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Phone Numbers',
  rights: [],
  collection: {
    endpoint: '/api/admin/team/phone_numbers',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Number', key: 'number', primary: true, format: NumberToken },
      { label: 'Type', key: 'type' }
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
    empty: {
      icon: 'hashtag',
      title: 'No Phone Numbers',
      text: 'You have not yet created any phone numbers',
      buttons: [
        { label: 'Create Phone Number', modal: New }
      ]
    },
    entity: 'phone number',
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
