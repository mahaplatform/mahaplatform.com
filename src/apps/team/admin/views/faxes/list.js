import { Page } from 'maha-admin'
import Send from './send'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Faxes',
  collection: {
    endpoint: '/api/admin/team/faxes',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'From', key: 'from.number', primary: true },
      { label: 'To', key: 'to', primary: true }
    ],
    empty: 'You have not yet sent or received any faxes',
    entity: 'fax',
    icon: 'file-o',
    new: Send,
    defaultSort: { key: 'created_at', order: 'desc' }
  },
  task: {
    label: 'New Group',
    icon: 'plus',
    modal: Send,
    rights: ['team:manage_people']
  }
})

export default Page(null, mapPropsToPage)
